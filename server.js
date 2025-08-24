// server.js

// Credits to https://www.programiz.com/javascript/examples/generate-random-strings for helping create random string code

// Setup server and requirements
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const path = require("path");
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3002;

// Parsers
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

// Webpack
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const config = require("./webpack.config.js");
const compiler = webpack(config);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath,
  })
);

app.use(webpackHotMiddleware(compiler));

const cloneDeep = require("lodash.clonedeep");

app.use(express.static(path.join(__dirname, "dist")));

// List of names
const names = [];
// Dictionary of parties
const parties = {};
// Dictionary of games
const games = {};

// Debug logging removed for production cleanliness

// Default endpoint
app.get("/", (req, res) => {
  if (!req.cookies["name"]) {
    // If no name cookie, redirect to welcome screen
    res.redirect("/welcome");
  } else {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
  }
});

// Welcome screen
app.get("/welcome", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "welcome.html"));
});

app.get("/partyfull", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "/Errors/partyfull.html"));
});

app.get("/cannotjoin", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "/Errors/cannotjoin.html"));
});

app.get("/partynotfound", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "/Errors/partynotfound.html"));
});

// Game endpoint
app.get("/game/:gameid", (req, res) => {
  if (!req.cookies["name"]) {
    return res.redirect("/welcome"); // If no name cookie, redirect to welcome screen
  }

  const gameId = req.params.gameid; // Get game id from url
  const username = req.cookies.name; // Get name from cookies

  let personFound = false;

  if (games[gameId]) {
    // Checks to see if the person is in the game to allow them to enter
    for (const teamKey in games[gameId]) {
      let team = games[gameId][teamKey]; // For each team in the game
      for (const personKey in team) {
        // For each person in the team
        if (team[personKey]["name"] === username) {
          personFound = true;
        }
      }
    }
  }
  // If the person was found, they can enter
  if (personFound) {
    res.sendFile(path.join(__dirname, "dist", "game.html"));
  } else {
    // If the person was not found, it sends them an error message
    res.sendFile(path.join(__dirname, "dist", "/Errors/cannotjoin.html"));
  }
});

app.post("/create-name", (req, res) => {
  const name = req.body.name;
  if (name && !names.includes(name)) {
    // Checks if name already exists inside of the name list
    names.push(name);
    return res.status(200).json({ message: "success" }); // Returns success status
  } else {
    return res.status(400).json({ message: "name taken" }); // Returns not found status
  }
});

// Returns a list of players inside of the gameid for both user and op team
app.post("/players", (req, res) => {
  const gameId = req.body.gameId;
  const username = req.body.username;
  let userTeam = {};
  let opTeam = {};
  for (const teamKey in games[gameId]) {
    const team = games[gameId][teamKey];
    let tempTeam = {};
    for (const playerKey in team) {
      const player = team[playerKey];
      tempTeam[player.name] = {
        character: player.character,
        spawnPlatform: player.spawnPlatform,
        spawn: player.spawn,
      };
    }
    if (username in tempTeam) {
      // If the user is in the team, then it will be called userTeam
      userTeam = tempTeam;
    } else {
      opTeam = tempTeam;
    }
  }

  return res.status(200).json({ userTeam, opTeam });
});

app.post("/party-members", (req, res) => {
  const partyId = req.body.partyId;

  if (!parties[partyId]) {
    return res.sendFile(
      path.join(__dirname, "dist", "/Errors/partynotfound.html")
    );
  }
  const membersCount = parties[partyId].length - 1; // Returns members in the party. -1 accounts for the metadata
  return res.status(200).json({ membersCount, members: parties[partyId] }); // Returns party members data also
});

// Matchmaking
app.get("/matchmaking/:partyid", (req, res) => {
  if (!req.cookies["name"]) {
    return res.redirect("/welcome"); // If no name cookie, redirect to welcome screen
  }

  const partyId = req.params.partyid; // Grabs party id from the url
  const username = req.cookies.name; // Grabs username from the cookie

  // If the party exists and it is in matchmaking
  if (parties[partyId] && parties[partyId][0]["matchmaking"] === true) {
    let personFound = false;
    for (const person in parties[partyId]) {
      // If the user is found in the party, they can proceed
      if (parties[partyId][person]["name"]) {
        if (parties[partyId][person]["name"] === username) {
          personFound = true;
        }
      }
    }

    // If the user is in the party, they can go to the matchmaking screen
    if (personFound) {
      res.sendFile(path.join(__dirname, "dist", "matchmaking.html"));
    } else {
      return res.sendFile(
        path.join(__dirname, "dist", "/Errors/cannotjoin.html")
      );
    }
  } else {
    // If the party doesn't exist or it isn't in matchmaking, it will send an error message
    return res.sendFile(
      path.join(__dirname, "dist", "/Errors/cannotjoin.html")
    );
  }

  const party1 = req.params.partyid; // Party 1 (aka user party)
  const neededPlayers = parties[party1][0]["mode"] * 2; // Number of players needed to find is calculated by finding the id of the mode and multiplying it by two.
  const players = Object.keys(parties[party1]).length - 1; // Number of players inside of the party minus the metadata
  const playersToFind = neededPlayers - players; // The amount of players to find is calculated by subtracting the needed players minus the players in the party
  function checkParties() {
    for (const party2 in parties) {
      // For each party in the parties dictionary
      const partyToFind = parties[party2];
      if (party1 !== party2) {
        // If the party is not equal to your party
        const party2Players = Object.keys(partyToFind).length - 1;
        const party2Matchmaking = partyToFind[0]["matchmaking"] === true;
        const party2Map = partyToFind[0]["map"];
        const party1Map = parties[partyId][0]["map"];
        if (
          party2Matchmaking &&
          party2Players === playersToFind &&
          party2Map === party1Map // If it fulfills the player requirement
        ) {
          // The server has found a party to matchmake with and will not enter matchmaking

          // Set the variables
          parties[party1][0]["matchmaking"] = false;
          parties[party2][0]["matchmaking"] = false;
          parties[party1][0]["gameStarted"] = true;
          parties[party2][0]["gameStarted"] = true;

          // Clone the dictionaries
          const party1Dict = clonePlayers(party1);
          const party2Dict = clonePlayers(party2);

          // Create a unique gameid for the party
          const gameId = randomString(20);
          games[gameId] = {};
          games[gameId][party1] = party1Dict; // Set the party id of the first party equal to the dictionary
          games[gameId][party2] = party2Dict; // Set the party id of the second party equal to the dictionary

          // Array to pick a random party
          const array = [party1, party2];
          const randomParty = array[Math.floor(Math.random() * array.length)]; // Randomly pick a party

          const party1Players = games[gameId][party1];
          const party2Players = games[gameId][party2];

          // Assign spawn properties based on party affiliation
          if (randomParty === party1) {
            setSpawnProperties(party1Players, "top");
            setSpawnProperties(party2Players, "bottom");
          } else {
            setSpawnProperties(party1Players, "bottom");
            setSpawnProperties(party2Players, "top");
          }

          const map = parties[partyId][0]["map"];
          // Broadcast In Battle status to both parties' lobbies
          try {
            const p1Arr = parties[party1];
            const p2Arr = parties[party2];
            if (Array.isArray(p1Arr)) {
              const statuses = [];
              for (let i = 1; i < p1Arr.length; i++) {
                const m = p1Arr[i];
                if (m && m.name) {
                  m.status = "In Battle";
                  statuses.push({ name: m.name, status: m.status });
                }
              }
              io.emit("status-bulk", { partyId: party1, statuses });
            }
            if (Array.isArray(p2Arr)) {
              const statuses = [];
              for (let i = 1; i < p2Arr.length; i++) {
                const m = p2Arr[i];
                if (m && m.name) {
                  m.status = "In Battle";
                  statuses.push({ name: m.name, status: m.status });
                }
              }
              io.emit("status-bulk", { partyId: party2, statuses });
            }
          } catch (e) {
            // swallow
          }
          // After 1 second, game-started will be emit. This is to give time for the players, to enter the matchmaking screen.
          setTimeout(() => {
            io.emit("game-started", {
              partyId: party1,
              foundId: party2,
              gameId,
              gameData: games[gameId],
              partyMembers: games[gameId][party1].length,
              map,
            });
          }, 1000);
        } else {
          // candidate not suitable
        }
      }
    }
  }

  checkParties(); // Check parties function is called
});

app.post("/party-creation", (req, res) => {
  const partyId = randomString(10);
  parties[partyId] = [
    { mode: "1", map: "1", matchmaking: false, gameStarted: false },
  ]; // Adds the party to the parties dictionary with default values
  return res.status(200).json({ partyId });
});

app.get("/party/:partyid", (req, res) => {
  if (!req.cookies["name"]) {
    return res.redirect("/welcome"); // If no name cookie, redirect to welcome screen
  }

  const partyId = req.params.partyid;
  if (parties[partyId] && parties[partyId][0]["matchmaking"] === true) {
    parties[partyId][0]["matchmaking"] = false; // Sets matchmaking to false
    io.emit("matchmaking-disconnect", { partyId }); // If a player from a party with matchmaking set to true leaves, it will send a disconnect message to all the users.
  }
  let extraSubtract = 0; // Extra subtract in case player reloading is not removed
  if (partyId in parties) {
    const username = req.cookies["name"];
    for (const user in parties[partyId]) {
      if (parties[partyId][user]["name"] === username) {
        // Sometimes when reloading the user stays in the party so we must check for that
        extraSubtract--;
        //delete parties[partyId][user]
      }
    }
    const mode = Number(parties[partyId][0]["mode"]) * 2;
    if (Object.keys(parties[partyId]).length - 1 + extraSubtract === mode) {
      // Check if it is full account for 0 index

      return res.sendFile(
        path.join(__dirname, "dist", "/Errors/partyfull.html")
      );
    } else {
      return res.sendFile(path.join(__dirname, "dist", "party.html"));
    }
  } else {
    return res.sendFile(
      path.join(__dirname, "dist", "/Errors/partynotfound.html")
    );
  }
});

// Not found endpoint
app.use((req, res, next) => {
  return res.sendFile(path.join(__dirname, "dist", "/Errors/404.html"));
});

// Whenever a user joins, all of this will occur. This is the socket configuration for multi-player setup
io.on("connection", (socket) => {
  socket.on("user-joined", (data) => {
    const party = parties[data.partyId];
    if (!party) {
      socket.emit("room-deleted");
      return;
    }

    // Try to find existing member by name
    let foundIndex = -1;
    for (let i = 0; i < party.length; i++) {
      const m = party[i];
      if (m && m.name === data.name) {
        foundIndex = i;
        break;
      }
    }

    if (foundIndex !== -1) {
      // Update socketId and normalize state; allow reconnect regardless of ready flag
      party[foundIndex].socketId = socket.id;
      party[foundIndex].ready = false; // back to lobby by default
      party[foundIndex].dead = false;
      // Update character if provided
      if (data.character || data.selectedValue) {
        party[foundIndex].character = data.character || data.selectedValue;
      }
      // Ensure party-level flags reflect lobby state
      party[0]["matchmaking"] = false;
      party[0]["gameStarted"] = false;
      // Notify matchmaking UI to stop if needed
      io.emit("matchmaking-disconnect", { partyId: data.partyId });
      // Send current party roster to this client
      socket.emit("connection", { partyMembers: party });
      // Inform others that this user reconnected
      socket.broadcast.emit("user-joined", {
        name: data.name,
        partyId: data.partyId,
        character: party[foundIndex].character || "ninja",
      });
      return;
    }

    // Not found: add a new member
    party.push({
      socketId: socket.id,
      name: data.name,
      character: data.character || data.selectedValue || "ninja",
      ready: false,
      dead: false,
      team: "",
    });
    socket.emit("connection", { partyMembers: party });
    socket.broadcast.emit("user-joined", {
      name: data.name,
      partyId: data.partyId,
      character: data.character || data.selectedValue || "ninja",
    });
  });
  // When a player joins, a message is sent to everyone else
  socket.on("player-joined", (data) => {
    socket.broadcast.emit("player-joined", { username: data.username });
  });
  // When a player moves, a message is sent to everyone else
  socket.on("move", (data) => {
    // Persist last known position for death animations & potential validation
    try {
      for (const gameId in games) {
        const game = games[gameId];
        for (const teamKey in game) {
          const team = game[teamKey];
          for (const playerKey in team) {
            if (team[playerKey]["name"] === data.username) {
              team[playerKey].x = data.x;
              team[playerKey].y = data.y;
            }
          }
        }
      }
    } catch (e) {
      // swallow
    }
    socket.broadcast.emit("move", data);
  });
  // When a player attacks, a message is sent to everyone else
  socket.on("attack", (data) => {
    socket.broadcast.emit("attack", data);
  });
  // Removed projectile-update/destroy (deterministic client simulation now)

  // Server-authoritative health: client reports a successful hit it originated; server updates health & broadcasts
  socket.on("hit", (data) => {
    // data: { attacker, target, damage, gameId }
    const { attacker, target, damage, gameId } = data;
    if (!games[gameId]) return; // Unknown game
    let targetPlayerObj;
    let targetTeam;
    for (const teamKey in games[gameId]) {
      const team = games[gameId][teamKey];
      for (const playerIdx in team) {
        const p = team[playerIdx];
        if (p.name === target) {
          // Initialize health if not present (backwards compatibility)
          if (typeof p.currentHealth !== "number") {
            p.maxHealth = 8000;
            p.currentHealth = 8000;
          }
          p.currentHealth -= damage;
          if (p.currentHealth < 0) p.currentHealth = 0;
          targetPlayerObj = p;
          targetTeam = team;
        }
      }
    }
    if (!targetPlayerObj) return;
    // Broadcast new health value
    io.emit("health-update", {
      username: target,
      health: targetPlayerObj.currentHealth,
      gameId,
    });

    // If dead trigger death + game over logic
    if (targetPlayerObj.currentHealth === 0 && targetPlayerObj.dead !== true) {
      targetPlayerObj.dead = true;
      // Find position if tracked
      const deathX = targetPlayerObj.x || 0;
      const deathY = targetPlayerObj.y || 0;
      io.emit("death", { username: target, gameId, x: deathX, y: deathY });

      // Check if entire team is dead
      let allPlayersDead = true;
      const losers = [];
      for (const playerIdx in targetTeam) {
        const p = targetTeam[playerIdx];
        losers.push(p.name);
        if (p.dead !== true) allPlayersDead = false;
      }
      if (allPlayersDead && games[gameId]) {
        const gameParties = Object.keys(games[gameId]);
        for (const pId of gameParties) {
          const partyArr = parties[pId];
          if (partyArr) {
            // Reset party-level flags
            partyArr[0]["gameStarted"] = false;
            partyArr[0]["matchmaking"] = false;
            // Normalize all members back to lobby state and set status
            const statuses = [];
            for (let i = 1; i < partyArr.length; i++) {
              if (partyArr[i]) {
                partyArr[i].ready = false;
                partyArr[i].dead = false;
                partyArr[i].status = "End Screen (Game Over)";
                statuses.push({
                  name: partyArr[i].name,
                  status: partyArr[i].status,
                });
                // Also emit explicit ready reset so UIs update
                io.emit("ready", {
                  name: partyArr[i].name,
                  ready: false,
                  party: pId,
                });
              }
            }
            io.emit("status-bulk", { partyId: pId, statuses });
          }
        }
        io.emit("game-over", { username: target, gameId, losers });
        // Ensure all losers have a final health-update of 0 (in case of any missed packet)
        losers.forEach((loser) => {
          io.emit("health-update", { username: loser, health: 0, gameId });
        });
        delete games[gameId];
      }
    }
  });
  // When a player dies
  socket.on("death", (data) => {
    // Legacy client support: treat as hit to zero health if still alive
    try {
      if (!games[data.gameId]) return;
      for (const teamKey in games[data.gameId]) {
        const team = games[data.gameId][teamKey];
        for (const playerKey in team) {
          if (team[playerKey]["name"] === data.username) {
            if (team[playerKey].dead !== true) {
              team[playerKey].currentHealth = 0;
              team[playerKey].dead = true;
              io.emit("health-update", {
                username: data.username,
                health: 0,
                gameId: data.gameId,
              });
            }
          }
        }
      }
    } catch (e) {
      // swallow
    }
  });

  // When a player changes character, persist on the member and broadcast
  socket.on("character-change", (data) => {
    const party = parties[data.partyId];
    if (!party) return;
    const newChar = data.selectedValue || data.character || "ninja";
    for (let i = 1; i < party.length; i++) {
      const m = party[i];
      if (m && m.name === data.username) {
        m.character = newChar;
        break;
      }
    }
    io.emit("character-change", {
      partyId: data.partyId,
      character: newChar,
      username: data.username,
    });
  });

  // When a player changes the mode, a message is sent to everyone else
  socket.on("mode-change", (data) => {
    parties[data.partyId][0]["mode"] = data.selectedValue; // Sets server value
    io.emit("mode-change", {
      partyId: data.partyId,
      mode: data.selectedValue,
      members: data.members,
    });
  });

  // When a player changes the map, a message is sent to everyone else
  socket.on("map-change", (data) => {
    parties[data.partyId][0]["map"] = data.selectedValue; // Sets server value
    io.emit("map-change", { partyId: data.partyId, map: data.selectedValue });
  });

  // When a player changes side, a message is sent to everyone else
  socket.on("team-update", (data) => {
    for (member in parties[data.partyId]) {
      if (data.tempName === parties[data.partyId][member]["name"]) {
        parties[data.partyId][member]["team"] = data.team; // Sets server value
      }
    }
  });

  // When a player drags and drops a player to another td, a message is sent to everyone else
  socket.on("drop", (data) => {
    socket.broadcast.emit("drop", data);
  });

  // When a player readies up, a message is sent to everyone else
  socket.on("ready", (data) => {
    let readyMembers = 0;
    try {
      if (!data.partyId || !parties[data.partyId]) {
        // Attempt to infer partyId from username
        for (const pid in parties) {
          if (
            Array.isArray(parties[pid]) &&
            parties[pid].some((m) => m && m.name === data.username)
          ) {
            data.partyId = pid;
            break;
          }
        }
        if (!data.partyId || !parties[data.partyId]) {
          return; // Still can't resolve
        }
      }
      const partyArr = Array.isArray(parties[data.partyId])
        ? parties[data.partyId]
        : [];
      partyArr.forEach((member) => {
        if (data.username === member.name) {
          member.ready = data.ready; // Sets server value
          // If the client included character here, keep server in sync
          if (data.character) {
            member.character = data.character;
          }
          io.emit("ready", {
            name: data.username,
            ready: data.ready,
            party: data.partyId,
          });
        }
        if (member.ready === true) {
          readyMembers += 1; // Adds a number to readyMembers
        }
      });
      if (
        readyMembers ===
        Number(Object.keys(parties[data.partyId]).length) - 1 // If all members are ready besides the metadata
      ) {
        let players = Number(data.mode);
        players *= 2; // The value needs to be multiplied by 2
        if (readyMembers < players) {
          // If the party needs to find players
          parties[data.partyId][0]["matchmaking"] = true; // The party is now in matchmaking
          const membersToFind = Number(parties[data.partyId][0]["mode"]) * 2;
          const members = parties[data.partyId].length - 1;
          io.emit("matchmaking", {
            // Emits matchmaking message with data
            partyId: data.partyId,
            members,
            membersToFind,
          });
        } else {
          // If the party already has the right amount of players
          parties[data.partyId][0]["gameStarted"] = true;

          // Below code sets up the game for the team
          let yourTeam = [];
          let opTeam = [];

          for (member in parties[data.partyId]) {
            if (parties[data.partyId][member]["team"] === "your-team") {
              yourTeam.push(parties[data.partyId][member]); // If team is "your-team" user is pushed to yourTeam
            } else if (parties[data.partyId][member]["team"] === "op-team") {
              opTeam.push(parties[data.partyId][member]); // If team is "op-team", user is pushed to opTeam
            }
          }

          // Clones the parties
          const party1 = cloneTeam(yourTeam);
          const party2 = cloneTeam(opTeam);

          // Clone function
          function cloneTeam(team) {
            const playersCopy = [];
            for (const playerId in yourTeam) {
              const player = team[playerId];

              const playerCopy = cloneDeep(team[playerId]);
              playersCopy.push(playerCopy);
            }
            return playersCopy;
          }

          // Generates a random string
          const gameId = randomString(20);
          games[gameId] = {};
          games[gameId][data.partyId] = party1; // This key is set to the partyid. This is so that gamestarted can be set to false when the game is over. See death socket comment.
          games[gameId]["Party 2"] = party2; // This key is set to "Party 2"

          // Array to pick a random party
          const array = [party1, party2];
          const randomParty = array[Math.floor(Math.random() * array.length)]; // Picks a random party

          // Sets the spawns if the party that was picked is party1
          if (randomParty === party1) {
            setSpawnProperties(party1, "top");
            setSpawnProperties(party2, "bottom");
          } else {
            // Sets the spawns if the party that was picked is party2
            setSpawnProperties(party1, "bottom");
            setSpawnProperties(party2, "top");
          }

          const map = parties[data.partyId][0]["map"];
          // Broadcast In Battle status for direct start
          try {
            const pArr = parties[data.partyId];
            if (Array.isArray(pArr)) {
              const statuses = [];
              for (let i = 1; i < pArr.length; i++) {
                const m = pArr[i];
                if (m && m.name) {
                  m.status = "In Battle";
                  statuses.push({ name: m.name, status: m.status });
                }
              }
              io.emit("status-bulk", { partyId: data.partyId, statuses });
            }
          } catch (e) {}
          // Emits game started
          io.emit("game-started", {
            partyId: data.partyId,
            gameId,
            gameData: games[gameId],
            partyMembers: games[gameId][data.partyId].length,
            map,
          });
        }
      } else {
        // If not all members are ready, the variables are set to false just in case they are true
        parties[data.partyId][0]["matchmaking"] = false;
        parties[data.partyId][0]["gameStarted"] = false;
      }
    } catch (error) {
      // swallow
    }
  });

  // When a player disconnects
  socket.on("disconnect", () => {
    let playerName;
    let partyIdToRemove;

    for (const partyId in parties) {
      const disconnectedPlayer = parties[partyId].find(
        // Finds player by socket id
        (player) => player.socketId === socket.id
      );
      if (
        disconnectedPlayer &&
        parties[partyId][0]["matchmaking"] !== true && // If the party was not in matchmaking for game started. This is because the player disonnects when going into matchmaking and the game.
        parties[partyId][0]["gameStarted"] !== true
      ) {
        playerName = disconnectedPlayer.name;
        socket.broadcast.emit("user-disconnected", {
          // Emits a message to all other users that the player disonnected
          name: playerName,
          partyId,
        });
        parties[partyId] = parties[partyId].filter(
          (player) => player.socketId !== socket.id
        );

        if (parties[partyId].length === 1) {
          // If the party is empty (besides the metadata)
          partyIdToRemove = partyId;
          setTimeout(() => {
            if (
              parties[partyIdToRemove] &&
              parties[partyIdToRemove].length === 1 // If the party is still empty after 20 seconds
            ) {
              delete parties[partyIdToRemove]; // The party is deleted after 20 seconds of inactivity.
            }
          }, 20000);
        }
        break;
      }
    }
  });
});

// Start the server
server.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`); // Sets up the server to listen on port 3000
});

// Random string (see credits at the very top for thanks for this code)
function randomString(length) {
  const letters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let string = "";
  const charactersLength = letters.length;

  for (let i = 0; i < length; i++) {
    string += letters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return string;
}

// Clone players function that is used in matchmaking
function clonePlayers(partyId) {
  const playersCopy = [];
  for (const playerId in parties[partyId]) {
    const player = parties[partyId][playerId];
    if (!player.hasOwnProperty("mode")) {
      // Skip the party metadata
      const playerCopy = cloneDeep(parties[partyId][playerId]); // Clones each member and adds them to playersCopy
      playersCopy.push(playerCopy);
    }
  }
  return playersCopy;
}

// Sets spawn points for each player
function setSpawnProperties(players, spawnPlatform) {
  let spawnCounter = 1;
  for (const player of players) {
    player["spawnPlatform"] = spawnPlatform;
    player["spawn"] = spawnCounter++; // Spawn counter is used to figure out where to place the user in game.js
  }
}
