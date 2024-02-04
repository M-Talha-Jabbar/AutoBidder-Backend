-- MariaDB dump 10.17  Distrib 10.4.14-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: AutoBidder
-- ------------------------------------------------------
-- Server version	10.4.14-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ad_boosting`
--

DROP TABLE IF EXISTS `ad_boosting`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ad_boosting` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `no_of_days` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ad_boosting`
--

LOCK TABLES `ad_boosting` WRITE;
/*!40000 ALTER TABLE `ad_boosting` DISABLE KEYS */;
INSERT INTO `ad_boosting` VALUES (1,'Basic',4,2000);
/*!40000 ALTER TABLE `ad_boosting` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auctions`
--

DROP TABLE IF EXISTS `auctions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `auctions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `start_date_time` datetime NOT NULL,
  `end_date_time` datetime NOT NULL,
  `sellerID` int(11) NOT NULL,
  `startingPrice` int(20) DEFAULT NULL,
  `closing_bid` int(11) DEFAULT NULL,
  `status` varchar(20) NOT NULL,
  `auc_winner` int(11) DEFAULT NULL,
  `auc_vehicle` varchar(20) NOT NULL,
  `buyNow` int(25) DEFAULT NULL,
  `total_bids_placed` int(11) DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `auc_vehicle` (`auc_vehicle`),
  KEY `sellerID` (`sellerID`),
  KEY `auc_winner` (`auc_winner`),
  CONSTRAINT `auctions_ibfk_1` FOREIGN KEY (`auc_vehicle`) REFERENCES `vehicles` (`RegNo`),
  CONSTRAINT `auctions_ibfk_2` FOREIGN KEY (`sellerID`) REFERENCES `sellers` (`Id`),
  CONSTRAINT `auctions_ibfk_3` FOREIGN KEY (`auc_winner`) REFERENCES `bidders` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auctions`
--

LOCK TABLES `auctions` WRITE;
/*!40000 ALTER TABLE `auctions` DISABLE KEYS */;
INSERT INTO `auctions` VALUES (1,'2021-12-21 08:02:16','2021-12-24 08:02:16',1,NULL,NULL,'undefined',NULL,'ALE-663',NULL,0),(9,'2022-02-15 13:00:34','2022-02-25 13:00:34',2,NULL,NULL,'undefined',NULL,'ANP-455',NULL,0),(12,'2022-03-08 00:00:00','2022-03-12 00:00:00',4,33323232,NULL,'undefined',NULL,'ALE-663',23423,0),(13,'2022-03-19 00:00:00','2022-04-08 06:32:00',6,500000,900000,'undefined',27,'TZY-666',1000000,4),(14,'2022-03-23 00:00:00','2022-04-08 06:02:00',6,100000,300000,'undefined',30,'TZY-665',1000000,2);
/*!40000 ALTER TABLE `auctions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bidders`
--

DROP TABLE IF EXISTS `bidders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bidders` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `UserCNIC` varchar(15) NOT NULL,
  `AuctionID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `UserCNIC` (`UserCNIC`),
  KEY `AuctionID` (`AuctionID`),
  CONSTRAINT `bidders_ibfk_1` FOREIGN KEY (`UserCNIC`) REFERENCES `users` (`CNIC`),
  CONSTRAINT `bidders_ibfk_2` FOREIGN KEY (`AuctionID`) REFERENCES `auctions` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bidders`
--

LOCK TABLES `bidders` WRITE;
/*!40000 ALTER TABLE `bidders` DISABLE KEYS */;
INSERT INTO `bidders` VALUES (27,'42101-22325-151',13),(28,'42201-3236405-6',13),(30,'42201-3236405-6',14),(31,'42101-22325-151',14),(32,'42101-22325-224',14),(33,'42101-22325-224',13);
/*!40000 ALTER TABLE `bidders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bidders_bid`
--

DROP TABLE IF EXISTS `bidders_bid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bidders_bid` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `last_bid_amount` int(11) NOT NULL,
  `bid_count` int(11) NOT NULL,
  `BidderID` int(11) NOT NULL,
  `AuctionID` int(11) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `BidderID` (`BidderID`),
  KEY `bidders_bid_ibfk2` (`AuctionID`),
  CONSTRAINT `bidders_bid_ibfk2` FOREIGN KEY (`AuctionID`) REFERENCES `auctions` (`ID`),
  CONSTRAINT `bidders_bid_ibfk_1` FOREIGN KEY (`BidderID`) REFERENCES `bidders` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=131 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bidders_bid`
--

LOCK TABLES `bidders_bid` WRITE;
/*!40000 ALTER TABLE `bidders_bid` DISABLE KEYS */;
INSERT INTO `bidders_bid` VALUES (125,200000,1,31,14),(126,300000,1,30,14),(129,900000,3,27,13),(130,700000,1,28,13);
/*!40000 ALTER TABLE `bidders_bid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `complaints`
--

DROP TABLE IF EXISTS `complaints`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `complaints` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) NOT NULL,
  `resolved` tinyint(1) NOT NULL DEFAULT 0,
  `date_time` datetime NOT NULL DEFAULT current_timestamp(),
  `UserCNIC` varchar(15) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `UserCNIC` (`UserCNIC`),
  CONSTRAINT `complaints_ibfk_1` FOREIGN KEY (`UserCNIC`) REFERENCES `users` (`CNIC`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `complaints`
--

LOCK TABLES `complaints` WRITE;
/*!40000 ALTER TABLE `complaints` DISABLE KEYS */;
INSERT INTO `complaints` VALUES (1,'xyz....',0,'2022-01-08 15:47:53','42101-22325-121'),(7,'I want to make a change....',0,'2022-01-08 17:54:24','42102-886655-99'),(8,'abc....',0,'2022-01-08 21:45:13','42102-886655-99');
/*!40000 ALTER TABLE `complaints` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `featured_ads`
--

DROP TABLE IF EXISTS `featured_ads`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `featured_ads` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `PackageID` int(11) NOT NULL,
  `AuctionID` int(11) NOT NULL,
  `expiry` datetime NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `PackageID` (`PackageID`),
  KEY `AuctionID` (`AuctionID`),
  CONSTRAINT `featured_ads_ibfk_1` FOREIGN KEY (`PackageID`) REFERENCES `ad_boosting` (`ID`),
  CONSTRAINT `featured_ads_ibfk_2` FOREIGN KEY (`AuctionID`) REFERENCES `auctions` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `featured_ads`
--

LOCK TABLES `featured_ads` WRITE;
/*!40000 ALTER TABLE `featured_ads` DISABLE KEYS */;
INSERT INTO `featured_ads` VALUES (1,1,1,'2021-12-24 08:09:47');
/*!40000 ALTER TABLE `featured_ads` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mechanics`
--

DROP TABLE IF EXISTS `mechanics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mechanics` (
  `CNIC` varchar(15) NOT NULL,
  `full_name` varchar(20) NOT NULL,
  `contact_no` varchar(15) NOT NULL,
  `location` varchar(255) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  PRIMARY KEY (`CNIC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mechanics`
--

LOCK TABLES `mechanics` WRITE;
/*!40000 ALTER TABLE `mechanics` DISABLE KEYS */;
INSERT INTO `mechanics` VALUES ('42101-2232504-6','M.Aslam','03332218174','E 32 Block B Nazimabad ,Karachi',NULL),('42201-1234557-1','Yaqoob Bansari','03310857426','North Karachi',NULL),('42201-1234567-8','Saleem Ansari','03210787426','Block A Gulshan',NULL);
/*!40000 ALTER TABLE `mechanics` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership_registrations`
--

DROP TABLE IF EXISTS `membership_registrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `membership_registrations` (
  `RegID` int(11) NOT NULL AUTO_INCREMENT,
  `TypeID` int(11) NOT NULL,
  `UserCNIC` varchar(15) NOT NULL,
  `TransactionID` int(11) NOT NULL,
  `RemainingAuction` int(11) NOT NULL,
  PRIMARY KEY (`RegID`),
  KEY `UserCNIC` (`UserCNIC`),
  KEY `TypeID` (`TypeID`),
  KEY `membership_registerations_ibfk_4` (`TransactionID`),
  CONSTRAINT `membership_registrations_ibfk_2` FOREIGN KEY (`UserCNIC`) REFERENCES `users` (`CNIC`),
  CONSTRAINT `membership_registrations_ibfk_3` FOREIGN KEY (`TypeID`) REFERENCES `membership_types` (`Id`),
  CONSTRAINT `membership_registrations_ibfk_4` FOREIGN KEY (`TransactionID`) REFERENCES `transactions` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership_registrations`
--

LOCK TABLES `membership_registrations` WRITE;
/*!40000 ALTER TABLE `membership_registrations` DISABLE KEYS */;
INSERT INTO `membership_registrations` VALUES (1,1,'42101-22325-224',1,3),(2,2,'42101-22325-151',2,23),(3,2,'42201-3236405-6',3,23);
/*!40000 ALTER TABLE `membership_registrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `membership_types`
--

DROP TABLE IF EXISTS `membership_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `membership_types` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(25) NOT NULL,
  `amount` int(11) NOT NULL,
  `no_of_auctions` int(11) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `membership_types`
--

LOCK TABLES `membership_types` WRITE;
/*!40000 ALTER TABLE `membership_types` DISABLE KEYS */;
INSERT INTO `membership_types` VALUES (1,'Basic',500,5),(2,'Premium',2000,25);
/*!40000 ALTER TABLE `membership_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sellers`
--

DROP TABLE IF EXISTS `sellers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sellers` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `UserCNIC` varchar(15) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `UserCNIC` (`UserCNIC`),
  CONSTRAINT `sellers_ibfk_1` FOREIGN KEY (`UserCNIC`) REFERENCES `users` (`CNIC`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sellers`
--

LOCK TABLES `sellers` WRITE;
/*!40000 ALTER TABLE `sellers` DISABLE KEYS */;
INSERT INTO `sellers` VALUES (1,'42101-22325-121'),(3,'42101-22325-224'),(4,'42101-886655-94'),(2,'42101-886655-99'),(6,'42201-3236405-8');
/*!40000 ALTER TABLE `sellers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sellers_history`
--

DROP TABLE IF EXISTS `sellers_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sellers_history` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `sellerID` int(11) NOT NULL,
  `AuctionID` int(11) NOT NULL,
  `vehicle_was_sold` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`ID`),
  KEY `sellerID` (`sellerID`),
  KEY `AuctionID` (`AuctionID`),
  CONSTRAINT `sellers_history_ibfk_1` FOREIGN KEY (`sellerID`) REFERENCES `sellers` (`Id`),
  CONSTRAINT `sellers_history_ibfk_2` FOREIGN KEY (`AuctionID`) REFERENCES `auctions` (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sellers_history`
--

LOCK TABLES `sellers_history` WRITE;
/*!40000 ALTER TABLE `sellers_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `sellers_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `amount` int(11) NOT NULL,
  `gateway` varchar(25) NOT NULL,
  `date_time` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
INSERT INTO `transactions` VALUES (1,2000,'EasyPaisa','2021-12-20 08:07:01'),(2,5000,'EasyPaisa','2021-12-20 08:24:31'),(3,5000,'EasyPaisa','2021-12-19 08:33:06');
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `CNIC` varchar(15) NOT NULL,
  `full_name` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `contact_no` varchar(11) NOT NULL,
  `location` varchar(255) NOT NULL,
  `isSeller` tinyint(1) NOT NULL DEFAULT 0,
  `isBuyer` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`CNIC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('42101-22325-121','Abdul Ahad','xyz@gmail.com','qwerty','1253264854','R 34 A block Gulberg Karachi',1,0),('42101-22325-151','Hussain Talat','abc@gmail.com','qwerty','1253264152','W4 Block A Gulshan,Karachi ',0,1),('42101-22325-224','M.Abdullah ','Abdullah@gmail.com','qwerty','1253264855','E4 Block 13D Gulshan,Karachi',1,1),('42101-886655-88','Usman Ahsan','usmanahsan65@gmail.com','qwerty','03322663358','R49 sector 5L North Karachi,Karachi',0,1),('42101-886655-94','Osama Ahsan','osamaahsan652@gmail.com','qwerty','03322663318','R21 sector 5L North Karachi,Karachi',1,0),('42101-886655-99','Osama Ahsan','osamaahsan65@gmail.com','qwerty','03322663358','R49 sector 5L North Karachi,Karachi',1,1),('42102-886655-99','Zuhair Ahsan','zuhairahsan65@gmail.com','qwerty','03322663558','R49 sector 5L North Karachi,Karachi',0,1),('42201-3236405-6','Huzaifa Jabbar','huzaifajabbar@gmail.com','qwerty','03232186361','Gulshan-e-Iqbal, Karachi',0,1),('42201-3236405-8','Talha Jabbar','muhammadtalha61940@gmail.com','qwerty','03232186360','Gulshan-e-Iqbal, Karachi',1,1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicle_reports`
--

DROP TABLE IF EXISTS `vehicle_reports`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicle_reports` (
  `name` varchar(255) NOT NULL,
  `VehicleRegNo` varchar(20) NOT NULL,
  `MechanicCNIC` varchar(15) NOT NULL,
  `date_time` datetime NOT NULL,
  `total_points` int(11) NOT NULL,
  PRIMARY KEY (`name`),
  KEY `VehicleRegNo` (`VehicleRegNo`),
  KEY `MechanicCNIC` (`MechanicCNIC`),
  CONSTRAINT `vehicle_reports_ibfk_1` FOREIGN KEY (`VehicleRegNo`) REFERENCES `vehicles` (`RegNo`),
  CONSTRAINT `vehicle_reports_ibfk_2` FOREIGN KEY (`MechanicCNIC`) REFERENCES `mechanics` (`CNIC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicle_reports`
--

LOCK TABLES `vehicle_reports` WRITE;
/*!40000 ALTER TABLE `vehicle_reports` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicle_reports` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicles` (
  `RegNo` varchar(20) NOT NULL,
  `name` varchar(20) NOT NULL,
  `manufacturer` varchar(20) NOT NULL,
  `modelNo` varchar(10) NOT NULL,
  `no_of_seats` int(11) NOT NULL,
  `body_type` varchar(25) NOT NULL,
  `km_driven` int(11) NOT NULL,
  `engine_type` varchar(256) NOT NULL,
  `fuel_type` varchar(25) NOT NULL,
  `description` varchar(255) NOT NULL,
  `ownerCNIC` varchar(15) DEFAULT NULL,
  `Image` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`RegNo`),
  UNIQUE KEY `Image` (`Image`),
  KEY `Fk1` (`ownerCNIC`),
  CONSTRAINT `Fk1` FOREIGN KEY (`ownerCNIC`) REFERENCES `users` (`CNIC`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
INSERT INTO `vehicles` VALUES ('ALE-123','XLI','Toyota','2020',5,'SEDAN',2552,'Internal combustion engines.','Petrol','nice car with orignal parts','42101-886655-88','/images/cars/HC21.jpg'),('ALE-663','Prado','Toyota','2019',5,'hachback',2022,'Euro II (fuel engine)','Diesel','prado limited edition built in A/C heater mobilizers 2 original keys bumper to bumper genuine olly rims installed music system life time token tax paid no time waste call only serious buyers please.\nMention PakWheels.com when calling Seller to get a goo','42101-886655-94','/images/cars/LC18.jpg'),('ANP-455','GLI','Toyota','2018',5,'sedan',20000,'VVTI','petrol','first owner slightly used just like new scratch less car sealed by sealed geniune 100% guarented back camer imbolizer key screen all orignal\r\nMention PakWheels.com when calling Seller to get a good deal','42101-886655-94','/images/cars/TC16.jpg'),('TZY-665','Civic','Honda','2019',5,'SEDAN',25000,'Hybrid engine (Internal combustion engine + electric engine)','Petrol','Honda Civic 2021 for Sale','42201-3236405-8','/images/cars/Capture1.png'),('TZY-666','Corolla','Toyota','2018',5,'SEDAN',19328,'Hybrid engine (Internal combustion engine + electric engine)','Petrol','Toyota Corolla 2018 for Sale','42201-3236405-8','/images/cars/Capture.png');
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'car_tijarat'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-05-11  0:21:19

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY ''; 
flush privileges;