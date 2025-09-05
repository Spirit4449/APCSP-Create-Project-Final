-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: game
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `parties`
--

DROP TABLE IF EXISTS `parties`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parties` (
  `party_id` int NOT NULL AUTO_INCREMENT,
  `status` text,
  `mode` int DEFAULT NULL,
  `map` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`party_id`)
) ENGINE=InnoDB AUTO_INCREMENT=100184 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parties`
--

LOCK TABLES `parties` WRITE;
/*!40000 ALTER TABLE `parties` DISABLE KEYS */;
INSERT INTO `parties` VALUES (100176,'lobby',1,1,'2025-09-05 01:58:56'),(100177,'lobby',1,1,'2025-09-05 02:10:14'),(100178,'lobby',1,1,'2025-09-05 02:14:39'),(100183,'lobby',1,1,'2025-09-05 02:27:21');
/*!40000 ALTER TABLE `parties` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `party_members`
--

DROP TABLE IF EXISTS `party_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `party_members` (
  `party_id` int NOT NULL,
  `name` varchar(50) NOT NULL,
  `team` enum('team1','team2') NOT NULL,
  `joined_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `last_seen` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`party_id`,`name`),
  KEY `name` (`name`),
  CONSTRAINT `party_members_ibfk_1` FOREIGN KEY (`party_id`) REFERENCES `parties` (`party_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `party_members_ibfk_2` FOREIGN KEY (`name`) REFERENCES `users` (`name`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `party_members`
--

LOCK TABLES `party_members` WRITE;
/*!40000 ALTER TABLE `party_members` DISABLE KEYS */;
INSERT INTO `party_members` VALUES (100176,'asdfsadf','team2','2025-09-05 01:59:01','2025-09-05 01:59:11'),(100177,'Guest168620','team1','2025-09-05 02:10:14','2025-09-05 02:10:42'),(100178,'nischay','team1','2025-09-05 02:14:39','2025-09-05 02:15:00'),(100183,'Akshar','team2','2025-09-05 02:27:24','2025-09-05 02:27:57'),(100183,'Guest574895','team1','2025-09-05 02:27:21','2025-09-05 02:27:58');
/*!40000 ALTER TABLE `party_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `socket_id` varchar(100) DEFAULT NULL,
  `char_class` varchar(50) DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  `char_levels` json DEFAULT NULL,
  `coins` int DEFAULT '0',
  `gems` int DEFAULT '0',
  `password` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (24,'sadfasf',NULL,'ninja','offline',NULL,'{\"ninja\": 5.0, \"thorg\": 5.0, \"draven\": 5.0}',1000,9720,'asdfasdf','2025-09-01 13:46:28','2025-09-01 20:44:54'),(26,'122',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$tRH9jH3ktsCk1hzvzGb9/OQkLyhbPjoTCsFLUX7AMeLDZ/mA1AS6O','2025-09-01 14:47:18','2025-09-04 14:46:40'),(28,'23233232323415143545415',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$0CtIfuy6XdmZoMXHfoZ1TewRLpgChjHEAb53IMCxOROBucMg6VvU.','2025-09-01 14:49:04','2025-09-04 14:46:40'),(29,'232152351235',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$cLmtmplE6GZiJiouojD3ped7r0XZBGhCubTu60F88yYt.HkWkV95e','2025-09-01 14:50:50','2025-09-04 14:46:40'),(31,'nischay',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$TZ6BP5kF/iW77JVF11UFXOO1m6UOYqSi0zS0yEhK94.itnWWzcH8u','2025-09-01 15:23:55','2025-09-04 22:15:04'),(33,'asdfasdf',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$.NIlHfC1eHiKidsNme3QMuysFJCBovAxj0R7M8/L./S2is.cnTJhG','2025-09-01 15:29:11','2025-09-04 14:46:40'),(34,'asdfasdfasdf',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$SN1QQH5rX3j1JjnscJAp4uaNLMWFxJ1VygHzePpYrmF6fXnK0b1qq','2025-09-01 15:29:30','2025-09-04 14:46:40'),(35,'aadsfa',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$WmHyEL2m9rDAKCozUCSb6uagg0kLNmrrL7Kk7vMilr6oqtTqIXq.m','2025-09-01 15:30:43','2025-09-04 14:46:40'),(57,'safwfwawef',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$1IS94jmPvqiM8SkTAakcX.//fQw0fV1wfylHLdmJ4DxUMuk..sPWC','2025-09-01 15:33:22','2025-09-04 14:46:40'),(58,'asdf',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$sBShbCCgVxTxHIGwhN9g0erVqy3kc5/v48hgFtGo/q/.K3FLBMuWe','2025-09-01 15:33:50','2025-09-04 14:46:40'),(72,'lsadfsadf',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$lQMNgzcCG5Z5km1kNC0yfOGV7eJxX7LP0joRrRMJgA0ph.pQq/me.','2025-09-01 21:48:15','2025-09-01 21:55:51'),(147,'Akshar','GXobt8oKFRFPs4tRAAAB','draven','online',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 1}',0,720,'$2b$12$NTD0Sgvphy.QPAtcBtI2JusiIN4UhOBLR5Ei/.SDjKnG.7wAbPN86','2025-09-04 21:07:32','2025-09-04 22:27:46'),(148,'Guest448831',NULL,'ninja','offline','2025-09-04 23:22:47','{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,NULL,'2025-09-04 21:22:47','2025-09-04 21:27:30'),(149,'Guest750370',NULL,'ninja','offline','2025-09-04 23:23:03','{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,NULL,'2025-09-04 21:23:02','2025-09-04 21:23:33'),(150,'asdfsadf',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$tD0yI9WXp5OpqytHpz.V6Oi07gynR1ksaurLPveHjU1JEB8UlLZ7.','2025-09-04 21:53:33','2025-09-04 21:59:16'),(151,'asdfsdf',NULL,'ninja','offline',NULL,'{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,'$2b$12$Q6/ZVPRgT106aXsHfqKsROy36NiPzh7IVy58BdV984VtFc0eTIkpG','2025-09-04 21:59:16','2025-09-04 21:59:31'),(152,'Guest168620',NULL,'ninja','offline','2025-09-04 23:59:35','{\"ninja\": 1, \"thorg\": 1, \"draven\": 0}',0,0,NULL,'2025-09-04 21:59:34','2025-09-04 22:11:30'),(153,'Guest574895','IrvrJie0Vi8oorjIAAAD','ninja','online','2025-09-05 00:15:03','{\"ninja\": 2, \"thorg\": 1, \"draven\": 3}',200,720,NULL,'2025-09-04 22:15:03','2025-09-04 22:27:47');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-09-04 22:37:17
