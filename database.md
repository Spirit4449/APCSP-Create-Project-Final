mysql> describe parties;
+------------+-----------+------+-----+-------------------+-------------------+
| Field      | Type      | Null | Key | Default           | Extra             |
+------------+-----------+------+-----+-------------------+-------------------+
| party_id   | int       | NO   | PRI | NULL              | auto_increment    |
| status     | text      | YES  |     | NULL              |                   |
| mode       | int       | YES  |     | NULL              |                   |
| map        | int       | YES  |     | NULL              |                   |
| created_at | timestamp | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
+------------+-----------+------+-----+-------------------+-------------------+
5 rows in set (0.01 sec)

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
| password    | text         | YES  |     | NULL              |                                               |
| created_at  | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED                             |
| updated_at  | datetime     | NO   |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED on update CURRENT_TIMESTAMP |
+-------------+--------------+------+-----+-------------------+-----------------------------------------------+
12 rows in set (0.00 sec)

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