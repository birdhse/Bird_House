-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: birdhouse
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acomodacoes`
--

DROP TABLE IF EXISTS `acomodacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acomodacoes` (
  `id_acomodacao` int(11) NOT NULL AUTO_INCREMENT,
  `nome_acomodacao` varchar(45) NOT NULL,
  `lotacao` int(11) NOT NULL,
  `valor_diaria` float NOT NULL,
  `id_comodidade` int(11) NOT NULL,
  `id_status_acomodacao` int(11) NOT NULL,
  PRIMARY KEY (`id_acomodacao`,`id_comodidade`,`id_status_acomodacao`),
  KEY `fk_acomodacoes_comodidades1_idx` (`id_comodidade`),
  KEY `fk_acomodacoes_status_reservas_copy11_idx` (`id_status_acomodacao`),
  CONSTRAINT `fk_acomodacoes_comodidades1` FOREIGN KEY (`id_comodidade`) REFERENCES `comodidades` (`id_comodidade`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_acomodacoes_status_reservas_copy11` FOREIGN KEY (`id_status_acomodacao`) REFERENCES `status_acomodacoes` (`id_status_acomodacao`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acomodacoes`
--

LOCK TABLES `acomodacoes` WRITE;
/*!40000 ALTER TABLE `acomodacoes` DISABLE KEYS */;
INSERT INTO `acomodacoes` VALUES (1,'Suíte com Cozinha',3,390,1,2),(2,'Chalé Família',10,590,1,1),(3,'Cabana',4,490,1,2),(4,'Domo',2,590,2,1),(5,'Charrua (Bus)',2,490,3,3),(6,'Estacionamento de Overlands',5,100,4,3);
/*!40000 ALTER TABLE `acomodacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cargos`
--

DROP TABLE IF EXISTS `cargos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cargos` (
  `id_cargo` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cargo` varchar(45) NOT NULL,
  PRIMARY KEY (`id_cargo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
INSERT INTO `cargos` VALUES (1,'administrador'),(2,'servidor');
/*!40000 ALTER TABLE `cargos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comodidades`
--

DROP TABLE IF EXISTS `comodidades`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comodidades` (
  `id_comodidade` int(11) NOT NULL AUTO_INCREMENT,
  `camas_casal` int(11) NOT NULL,
  `camas_solteiro` int(11) NOT NULL,
  `arcondicionado` tinyint(4) NOT NULL,
  `wifi` tinyint(4) NOT NULL,
  `tv` tinyint(4) NOT NULL,
  `cozinha` tinyint(4) NOT NULL,
  `toalha` tinyint(4) NOT NULL,
  `frigobar` tinyint(4) NOT NULL,
  `ducha` tinyint(4) NOT NULL,
  `banheira` tinyint(4) NOT NULL,
  PRIMARY KEY (`id_comodidade`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comodidades`
--

LOCK TABLES `comodidades` WRITE;
/*!40000 ALTER TABLE `comodidades` DISABLE KEYS */;
INSERT INTO `comodidades` VALUES (1,1,1,1,1,1,1,1,0,0,0),(2,1,0,1,1,1,1,1,1,1,0),(3,1,0,1,1,1,1,1,1,1,1),(4,0,0,0,1,0,0,0,0,1,0);
/*!40000 ALTER TABLE `comodidades` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospedes`
--

DROP TABLE IF EXISTS `hospedes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospedes` (
  `id_hospede` int(11) NOT NULL AUTO_INCREMENT,
  `nome_hospede` varchar(45) NOT NULL,
  `num_celular` varchar(45) NOT NULL,
  `email_hospede` varchar(45) NOT NULL,
  `data_nascimento` date NOT NULL,
  `cpf_hospede` varchar(11) NOT NULL,
  `ativo` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_hospede`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospedes`
--

LOCK TABLES `hospedes` WRITE;
/*!40000 ALTER TABLE `hospedes` DISABLE KEYS */;
INSERT INTO `hospedes` VALUES (1,'vitor','27992912308','vitor@gmail.com','2003-07-23','17719821793',1),(2,'amanda','27992912308','amanda@gmail.com','2004-11-25','14495153714',1),(3,'matheus','27992912308','matheus@gmail.com','2004-03-19','13590117737',1),(4,'sarah','27992912308','sarah@gmail.com','2004-10-27','22389829732',1),(5,'heloisa','27992912308','heloisa@gmail.com','2004-11-11','21296442799',1),(6,'marco','27992912308','marco@gmail.com','2004-01-06','10186497784',1),(7,'pietro','27992912308','pietro@gmail.com','2004-08-19','17688810736',1),(8,'isaac','27992912308','isaac@gmail.com','2004-09-09','44445329045',1),(9,'mauricio','27999763836','mdavel@gmail.com','1993-01-01','66273158070',1),(10,'gabriel','27999763836','gabriel@gmail.com','1992-10-21','39787359031',1);
/*!40000 ALTER TABLE `hospedes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reservas`
--

DROP TABLE IF EXISTS `reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reservas` (
  `id_reserva` int(11) NOT NULL AUTO_INCREMENT,
  `checkin` date NOT NULL,
  `checkout` date NOT NULL,
  `qntd_hospedes` int(11) NOT NULL,
  `num_dias` int(11) NOT NULL,
  `valor_total` float NOT NULL,
  `observacao` varchar(500) DEFAULT NULL,
  `id_hospede` int(11) NOT NULL,
  `id_status_reserva` int(11) NOT NULL,
  `id_acomodacao` int(11) NOT NULL,
  `ativo` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_reserva`),
  KEY `fk_reservas_hospedes1_idx` (`id_hospede`),
  KEY `fk_reservas_status1_idx` (`id_status_reserva`),
  KEY `fk_reservas_acomodacoes1_idx` (`id_acomodacao`),
  CONSTRAINT `fk_reservas_acomodacoes1` FOREIGN KEY (`id_acomodacao`) REFERENCES `acomodacoes` (`id_acomodacao`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_hospedes` FOREIGN KEY (`id_hospede`) REFERENCES `hospedes` (`id_hospede`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_status_reservas` FOREIGN KEY (`id_status_reserva`) REFERENCES `status_reservas` (`id_status_reservas`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,'2024-12-12','2024-12-14',2,2,780,'duas cama de solteiro ',2,3,1,1),(2,'2024-12-12','2024-12-14',5,2,1176,'animais de estimação',3,2,2,1),(3,'2024-12-12','2024-12-14',3,2,980,'cachorro',7,3,3,1),(4,'2024-12-12','2024-12-14',2,2,1175,'cama de casal',4,4,4,1),(5,'2024-12-12','2024-12-14',1,2,980,'',1,5,5,1),(6,'2024-12-15','2024-12-21',3,6,2340,'uma cama de casal e uma cama de solteiro',9,1,1,1),(7,'2024-12-15','2024-12-21',7,6,3535,'3 camas de casal e uma de solteiro',8,2,2,1),(8,'2024-12-15','2024-12-21',2,6,2937,'cachorro',6,3,3,1),(9,'2024-12-15','2024-12-21',1,6,3540,'',10,4,4,1),(10,'2024-12-15','2024-12-21',2,6,2932,'',2,5,5,1),(11,'2024-12-22','2024-12-28',2,6,3535,'',4,3,4,1),(12,'2024-12-29','2024-12-31',2,2,1177,'',8,2,4,1),(13,'2025-01-01','2025-01-04',2,3,1770,'',4,2,4,1),(14,'2025-01-09','2025-01-11',3,2,200,'',8,2,6,1),(15,'2024-12-12','2024-12-14',2,2,200,'',8,5,6,1);
/*!40000 ALTER TABLE `reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_acomodacoes`
--

DROP TABLE IF EXISTS `status_acomodacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_acomodacoes` (
  `id_status_acomodacao` int(11) NOT NULL AUTO_INCREMENT,
  `condicao` varchar(45) NOT NULL,
  PRIMARY KEY (`id_status_acomodacao`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_acomodacoes`
--

LOCK TABLES `status_acomodacoes` WRITE;
/*!40000 ALTER TABLE `status_acomodacoes` DISABLE KEYS */;
INSERT INTO `status_acomodacoes` VALUES (1,'pendente_confirmacao'),(2,'indisponivel'),(3,'em_limpeza'),(4,'manutenção'),(5,'disponivel');
/*!40000 ALTER TABLE `status_acomodacoes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status_reservas`
--

DROP TABLE IF EXISTS `status_reservas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status_reservas` (
  `id_status_reservas` int(11) NOT NULL AUTO_INCREMENT,
  `condicao` varchar(45) NOT NULL,
  PRIMARY KEY (`id_status_reservas`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status_reservas`
--

LOCK TABLES `status_reservas` WRITE;
/*!40000 ALTER TABLE `status_reservas` DISABLE KEYS */;
INSERT INTO `status_reservas` VALUES (1,'solicitada'),(2,'reservada'),(3,'hospedada'),(4,'atrasada'),(5,'cancelada'),(6,'finalizada');
/*!40000 ALTER TABLE `status_reservas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `tabelageral`
--

DROP TABLE IF EXISTS `tabelageral`;
/*!50001 DROP VIEW IF EXISTS `tabelageral`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tabelageral` AS SELECT 
 1 AS `id_acomodacao`,
 1 AS `nome_acomodacao`,
 1 AS `id_status_acomodacao`,
 1 AS `condicao`,
 1 AS `id_hospede`,
 1 AS `nome_hospede`,
 1 AS `id_reserva`,
 1 AS `checkin`,
 1 AS `checkout`,
 1 AS `id_status_reserva`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `tabelareservas`
--

DROP TABLE IF EXISTS `tabelareservas`;
/*!50001 DROP VIEW IF EXISTS `tabelareservas`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tabelareservas` AS SELECT 
 1 AS `id_reserva`,
 1 AS `id_status_reserva`,
 1 AS `nome_hospede`,
 1 AS `nome_acomodacao`,
 1 AS `checkin`,
 1 AS `checkout`,
 1 AS `qntd_hospedes`,
 1 AS `ativo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `tabelausuarios`
--

DROP TABLE IF EXISTS `tabelausuarios`;
/*!50001 DROP VIEW IF EXISTS `tabelausuarios`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `tabelausuarios` AS SELECT 
 1 AS `id_usuario`,
 1 AS `nome_usuario`,
 1 AS `email_usuario`,
 1 AS `login_usuario`,
 1 AS `senha`,
 1 AS `nome_cargo`,
 1 AS `ativo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `umareserva`
--

DROP TABLE IF EXISTS `umareserva`;
/*!50001 DROP VIEW IF EXISTS `umareserva`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `umareserva` AS SELECT 
 1 AS `id_reserva`,
 1 AS `id_status_reserva`,
 1 AS `nome_hospede`,
 1 AS `id_acomodacao`,
 1 AS `checkin`,
 1 AS `checkout`,
 1 AS `qntd_hospedes`,
 1 AS `valor_total`,
 1 AS `observacao`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL AUTO_INCREMENT,
  `nome_usuario` varchar(45) NOT NULL,
  `email_usuario` varchar(45) NOT NULL,
  `login_usuario` varchar(45) NOT NULL,
  `senha` varchar(45) NOT NULL,
  `id_cargo` int(11) NOT NULL,
  `ativo` int(11) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id_usuario`),
  KEY `fk_usuarios_cargos` (`id_cargo`),
  CONSTRAINT `fk_usuarios_cargos1` FOREIGN KEY (`id_cargo`) REFERENCES `cargos` (`id_cargo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'sarah','sarah@gmail.com','sarah','1234567',1,1),(3,'greg','veloso@gmail','greg','1234567',1,1),(4,'Matheus','matheus@gmail.com','matheus','1234567',2,1),(5,'amanda xavier nascimento','amanda@gmail.com','amanda','1234567',1,1),(6,'vitor parajara','vitor@gmail.com','vitor','1234567',2,1),(7,'adm','adm@gmail.com','adm','1234567',1,1),(8,'joaquim','joquinha@gmail.com','joaquim','1234567',2,1),(9,'Mariana barbosa','mbarbosa@gmail.com','mariana','1234567',2,1),(10,'Renata Miguel','renata@gmail.com','renata','1234567',1,1),(11,'Gabriela Vilett','gvilett@gmail.com','gabriela','1234567',2,1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `tabelageral`
--

/*!50001 DROP VIEW IF EXISTS `tabelageral`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tabelageral` AS select `a`.`id_acomodacao` AS `id_acomodacao`,`a`.`nome_acomodacao` AS `nome_acomodacao`,`a`.`id_status_acomodacao` AS `id_status_acomodacao`,`s`.`condicao` AS `condicao`,`h`.`id_hospede` AS `id_hospede`,`h`.`nome_hospede` AS `nome_hospede`,`r`.`id_reserva` AS `id_reserva`,`r`.`checkin` AS `checkin`,`r`.`checkout` AS `checkout`,`r`.`id_status_reserva` AS `id_status_reserva` from (((`acomodacoes` `a` join `reservas` `r` on(`a`.`id_acomodacao` = `r`.`id_acomodacao`)) join `hospedes` `h` on(`r`.`id_hospede` = `h`.`id_hospede`)) join `status_acomodacoes` `s` on(`a`.`id_status_acomodacao` = `s`.`id_status_acomodacao`)) where `r`.`ativo` = 1 */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tabelareservas`
--

/*!50001 DROP VIEW IF EXISTS `tabelareservas`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tabelareservas` AS select `r`.`id_reserva` AS `id_reserva`,`r`.`id_status_reserva` AS `id_status_reserva`,`h`.`nome_hospede` AS `nome_hospede`,`a`.`nome_acomodacao` AS `nome_acomodacao`,`r`.`checkin` AS `checkin`,`r`.`checkout` AS `checkout`,`r`.`qntd_hospedes` AS `qntd_hospedes`,`r`.`ativo` AS `ativo` from ((`reservas` `r` join `hospedes` `h` on(`r`.`id_hospede` = `h`.`id_hospede`)) join `acomodacoes` `a` on(`r`.`id_acomodacao` = `a`.`id_acomodacao`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `tabelausuarios`
--

/*!50001 DROP VIEW IF EXISTS `tabelausuarios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `tabelausuarios` AS select `u`.`id_usuario` AS `id_usuario`,`u`.`nome_usuario` AS `nome_usuario`,`u`.`email_usuario` AS `email_usuario`,`u`.`login_usuario` AS `login_usuario`,`u`.`senha` AS `senha`,`c`.`nome_cargo` AS `nome_cargo`,`u`.`ativo` AS `ativo` from (`usuarios` `u` join `cargos` `c` on(`u`.`id_cargo` = `c`.`id_cargo`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `umareserva`
--

/*!50001 DROP VIEW IF EXISTS `umareserva`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `umareserva` AS select `r`.`id_reserva` AS `id_reserva`,`r`.`id_status_reserva` AS `id_status_reserva`,`h`.`nome_hospede` AS `nome_hospede`,`r`.`id_acomodacao` AS `id_acomodacao`,`r`.`checkin` AS `checkin`,`r`.`checkout` AS `checkout`,`r`.`qntd_hospedes` AS `qntd_hospedes`,`r`.`valor_total` AS `valor_total`,`r`.`observacao` AS `observacao` from (`reservas` `r` join `hospedes` `h` on(`r`.`id_hospede` = `h`.`id_hospede`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-12 13:34:02
