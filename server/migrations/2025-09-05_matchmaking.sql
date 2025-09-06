-- Matchmaking minimal schema
-- Up migration

CREATE TABLE IF NOT EXISTS match_tickets (
  ticket_id INT PRIMARY KEY AUTO_INCREMENT,
  party_id INT NULL,
  user_id INT NULL,
  mode INT NOT NULL,
  map INT NOT NULL,
  size TINYINT NOT NULL,
  mmr INT NOT NULL,
  team1_count TINYINT NOT NULL DEFAULT 0,
  team2_count TINYINT NOT NULL DEFAULT 0,
  status ENUM('queued','cancelled') NOT NULL DEFAULT 'queued',
  claimed_by VARCHAR(64) NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_ticket_party (party_id),
  UNIQUE KEY uq_ticket_user (user_id)
);

CREATE TABLE IF NOT EXISTS matches (
  match_id INT PRIMARY KEY AUTO_INCREMENT,
  mode INT NOT NULL,
  map INT NOT NULL,
  status ENUM('queued','live','completed','cancelled') NOT NULL DEFAULT 'queued',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS match_participants (
  match_id INT NOT NULL,
  user_id INT NOT NULL,
  party_id INT NULL,
  team ENUM('team1','team2') NOT NULL,
  char_class VARCHAR(50) NULL,
  PRIMARY KEY (match_id, user_id),
  KEY ix_mp_party (party_id)
);

-- Optional: tighten parties.status to 4 states (comment out if not ready)
ALTER TABLE parties MODIFY status ENUM('queued','live','completed','cancelled') NULL;

-- Down migration
-- DROP TABLE IF EXISTS match_participants;
-- DROP TABLE IF EXISTS matches;
-- DROP TABLE IF EXISTS match_tickets;
