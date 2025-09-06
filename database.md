mysql> describe match_participants;
+------------+-----------------------+------+-----+---------+-------+
| Field      | Type                  | Null | Key | Default | Extra |
+------------+-----------------------+------+-----+---------+-------+
| match_id   | int                   | NO   | PRI | NULL    |       |
| user_id    | int                   | NO   | PRI | NULL    |       |
| party_id   | int                   | YES  | MUL | NULL    |       |
| team       | enum('team1','team2') | NO   |     | NULL    |       |
| char_class | varchar(50)           | YES  |     | NULL    |       |
+------------+-----------------------+------+-----+---------+-------+
5 rows in set (0.00 sec)

mysql> describe match_tickets;
+-------------+----------------------------+------+-----+-------------------+-------------------+
| Field       | Type                       | Null | Key | Default           | Extra             |
+-------------+----------------------------+------+-----+-------------------+-------------------+
| ticket_id   | int                        | NO   | PRI | NULL              | auto_increment    |
| party_id    | int                        | YES  | UNI | NULL              |                   |
| user_id     | int                        | YES  | UNI | NULL              |                   |
| mode        | int                        | NO   |     | NULL              |                   |
| map         | int                        | NO   |     | NULL              |                   |
| size        | tinyint                    | NO   |     | NULL              |                   |
| mmr         | int                        | NO   |     | NULL              |                   |
| team1_count | tinyint                    | NO   |     | 0                 |                   |
| team2_count | tinyint                    | NO   |     | 0                 |                   |
| status      | enum('queued','cancelled') | NO   |     | queued            |                   |
| claimed_by  | varchar(64)                | YES  |     | NULL              |                   |
| created_at  | timestamp                  | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+-------------+----------------------------+------+-----+-------------------+-------------------+
12 rows in set (0.00 sec)

mysql> describe matches;
+------------+-----------------------------------------------+------+-----+-------------------+-------------------+
| Field      | Type                                          | Null | Key | Default           | Extra             |
+------------+-----------------------------------------------+------+-----+-------------------+-------------------+
| match_id   | int                                           | NO   | PRI | NULL              | auto_increment    |
| mode       | int                                           | NO   |     | NULL              |                   |
| map        | int                                           | NO   |     | NULL              |                   |
| status     | enum('queued','live','completed','cancelled') | NO   |     | queued            |                   |
| created_at | timestamp                                     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+-----------------------------------------------+------+-----+-------------------+-------------------+
5 rows in set (0.00 sec)

mysql> describe users;
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| Field       | Type         | Null | Key | Default           | Extra                                         |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
| user_id     | int          | NO   | PRI | NULL              | auto_increment                                |
| name        | varchar(50)  | NO   | UNI | NULL              |                                               |
| socket_id   | varchar(100) | YES  |     | NULL              |                                               |
| char_class  | varchar(50)  | YES  |     | NULL              |                                               |
| status      | varchar(50)  | YES  |     | NULL              |                                               |
| expires_at  | datetime     | YES  |     | NULL              |                                               |
| char_levels | json         | YES  |     | NULL              |                                               |
| coins       | int          | YES  |     | 0                 |                                               |
| gems        | int          | YES  |     | 0                 |                                               |
| trophies    | int          | YES  |     | NULL              |                                               |
| password    | text         | YES  |     | NULL              |                                               |
| created_at  | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at  | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
13 rows in set (0.00 sec)

mysql> describe parties;
+------------+--------------------------------------------+------+-----+-------------------+-------------------+
| Field      | Type                                       | Null | Key | Default           | Extra             |
+------------+--------------------------------------------+------+-----+-------------------+-------------------+
| party_id   | int                                        | NO   | PRI | NULL              | auto_increment    |
| status     | enum('idle','queued','ready_check','live') | NO   |     | idle              |                   |
| mode       | int                                        | YES  |     | NULL              |                   |
| map        | int                                        | YES  |     | NULL              |                   |
| created_at | timestamp                                  | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+--------------------------------------------+------+-----+-------------------+-------------------+
5 rows in set (0.03 sec)

mysql> describe party_members;
+-----------+-----------------------+------+-----+-------------------+-----------------------------------------------+
| Field     | Type                  | Null | Key | Default           | Extra                                         |
+-----------+-----------------------+------+-----+-------------------+-----------------------------------------------+
| party_id  | int                   | NO   | PRI | NULL              |                                               |
| name      | varchar(50)           | NO   | PRI | NULL              |                                               |
| team      | enum('team1','team2') | NO   |     | NULL              |                                               |
| joined_at | timestamp             | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| last_seen | timestamp             | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+-----------+-----------------------+------+-----+-------------------+-----------------------------------------------+
5 rows in set (0.00 sec)

mysql>