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
const port = 3000;

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
    // Checks to see if the person is in the game to allow them in
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
    return res.sendFile(path.join(__dirname, "dist", "/Errors/partynotfound.html"));
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
      return res.sendFile(path.join(__dirname, "dist", "/Errors/cannotjoin.html"));
    }
  } else {
    // If the party doesn't exist or it isn't in matchmaking, it will send an error message
    return res.sendFile(path.join(__dirname, "dist", "/Errors/cannotjoin.html"));
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
        if (
          partyToFind[0]["matchmaking"] === true && // If it is in matchmaking
          Object.keys(partyToFind).length - 1 === playersToFind && 
          partyToFind[0]['map'] === parties[partyId][0]['map']  // If it fulfills the player requirement
        ) {
          // The server has found a party to matchmake with and will not enter matchmaking

          // Set the variables
          parties[party1][0]["matchmaking"] = false;
          parties[party2][0]["matchmaking"] = false;
          parties[party1][0]["gameStarted"] = true;
          parties[party2][0]["gameStarted"] = true;

          // If there is an unbalance of players, it will be evened out
          while (party1.length !== party2.length) {
            if (party1.length < party2.length) {
              // Add one player from party2 to party1
              party1.push(party2.pop());
            } else {
              // Add one player from party1 to party2
              party2.push(party1.pop());
            }
          }

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

          const map = parties[partyId][0]["map"]
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
          console.log("not found");
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
        console.log(parties[partyId]);
      }
    }
    const mode = Number(parties[partyId][0]["mode"]) * 2;
    if (Object.keys(parties[partyId]).length - 1 + extraSubtract === mode) {
      // Check if it is full account for 0 index

      return res.sendFile(path.join(__dirname, "dist", "/Errors/partyfull.html"));
    } else {
      return res.sendFile(path.join(__dirname, "dist", "party.html"));
    }
  } else {
    return res.sendFile(path.join(__dirname, "dist", "/Errors/partynotfound.html"));
  }
});


// Not found endpoint
app.use((req, res, next) => {
  return res.sendFile(path.join(__dirname, "dist", "/Errors/404.html"));
});

// Whenever a user joins, all of this will occur. This is the socket configuration for multi-player setup
io.on("connection", (socket) => {
  socket.on("user-joined", (data) => {
    if (parties[data.partyId]) {
      for (const person in parties[data.partyId]) {
        if (parties[data.partyId][person]["name"]) {
          if (parties[data.partyId][person]["name"] === data.name) {
            // If the person is found in the party already, there is no need to add them again. In this case the function will return
            if (parties[data.partyId][person]["ready"] === true) {
              // If the person was ready, it will be set to fasel
              parties[data.partyId][person]["ready"] = false;
              parties[data.partyId][person]["socketId"] = socket.id;
              parties[data.partyId][0]["matchmaking"] = false;
              parties[data.partyId][0]["gameStarted"] = false;

              io.emit("matchmaking-disconnect", { partyId: data.partyId }); // Emits matchmaking disconnect if the player disconnected with matchmaking
              // Emits connection for the user
              socket.emit("connection", {
                partyMembers: parties[data.partyId],
              });
            } else {
              socket.emit("room-deleted"); // Takes the user back to the home screen
            }
            return;
          }
        }
      }
      // Pushes the user into the party with the default values
      parties[data.partyId].push({
        socketId: socket.id,
        name: data.name,
        character: "Ninja",
        ready: false,
        dead: false,
        team: "",
      });
      // Emits connection just for that user
      socket.emit("connection", { partyMembers: parties[data.partyId] });
      // Emits connection for everyone but that user
      socket.broadcast.emit("user-joined", {
        name: data.name,
        partyId: data.partyId,
      });
    } else {
      socket.emit("room-deleted");
    }
  });
  // When a player joins, a message is sent to everyone else
  socket.on("player-joined", (data) => {
    socket.broadcast.emit("player-joined", { username: data.username });
  });
  // When a player moves, a message is sent to everyone else
  socket.on("move", (data) => {
    socket.broadcast.emit("move", data);
  });
  // When a player attacks, a message is sent to everyone else
  socket.on("attack", (data) => {
    socket.broadcast.emit("attack", data);
  });
  // When a player dies
  socket.on("death", (data) => {
    let playerTeam;
    for (const teamKey in games[data.gameId]) {
      const team = games[data.gameId][teamKey];
      for (const playerKey in team) {
        if (team[playerKey]["name"] === data.username) {
          team[playerKey]["dead"] = true; // Sets the dead variable for that user to true
          playerTeam = team; // Sets the team of that player
        }
      }
    }
    let allPlayersDead = true;
    let losers = [];
    for (const playerKey in playerTeam) {
      losers.push(playerTeam[playerKey]["name"]); // If everyone was dead, the player is added to the list of losers
      if (playerTeam[playerKey]["dead"] === false) {
        // If someone is not dead, then allPlayersDead is false
        allPlayersDead = false;
      }
    }
    // Emits death message to all users
    socket.broadcast.emit("death", data);
    // If everyone is dead
    if (allPlayersDead && games[data.gameId]) {
      const gameParties = Object.keys(games[data.gameId]);
      for (const party of gameParties) {
        if (parties[party]) {
          // Checks if the game was an internal game (no matchmaking occured since the party was already full)
          parties[party][0]["gameStarted"] = false; // Set game to end
        }
      }
      // Emits game over message
      io.emit("game-over", {
        username: data.username,
        gameId: data.gameId,
        losers, // If the player is not found in the losers dictionary, it will say they won
      });
      // Deletes the game from the games dicitonary
      //delete games[data.gameId];
    }
  });

  // When a player changes character, a message is sent to everyone else
  socket.on("character-change", (data) => {
    parties[data.partyId][0]["character"] = data.selectedValue; // Sets server value
    io.emit("character-change", {
      partyId: data.partyId,
      character: data.selectedValue,
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
      parties[data.partyId].forEach((member) => {
        if (data.username === member.name) {
          member.ready = data.ready; // Sets server value
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

          const map = parties[data.partyId][0]["map"]
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
      console.log(error);
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
              console.log(`Party ${partyIdToRemove} deleted due to inactivity`);
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
