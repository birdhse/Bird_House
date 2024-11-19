-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: birdhouse
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
INSERT INTO `acomodacoes` VALUES (1,'Suíte com Cozinha',3,500,1,5),(2,'Chalé Família',0,0,1,1),(3,'Cabana',0,0,1,1),(4,'Domo',0,0,1,1),(5,'Bus',0,0,1,1),(6,'Estacionamento de Overlands',0,0,1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cargos`
--

LOCK TABLES `cargos` WRITE;
/*!40000 ALTER TABLE `cargos` DISABLE KEYS */;
INSERT INTO `cargos` VALUES (1,'administrador');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comodidades`
--

LOCK TABLES `comodidades` WRITE;
/*!40000 ALTER TABLE `comodidades` DISABLE KEYS */;
INSERT INTO `comodidades` VALUES (1,1,1,1,1,1,1,1,1,1,1),(2,1,0,0,1,0,0,1,0,0,0);
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
  PRIMARY KEY (`id_hospede`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospedes`
--

LOCK TABLES `hospedes` WRITE;
/*!40000 ALTER TABLE `hospedes` DISABLE KEYS */;
INSERT INTO `hospedes` VALUES (1,'Michael Jackson','27987654321','mechamadilord@gmail.com','1958-08-29','1982'),(2,'Joaquina Dark','27111111111','jdark@gmail.com','1310-04-02','00000');
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
  `checkin` datetime NOT NULL,
  `checkout` datetime NOT NULL,
  `qntd_hospedes` int(11) NOT NULL,
  `num_dias` int(11) NOT NULL,
  `valor_total` float NOT NULL,
  `observacao` varchar(500) DEFAULT NULL,
  `id_hospede` int(11) NOT NULL,
  `id_status_reserva` int(11) NOT NULL,
  `id_acomodacao` int(11) NOT NULL,
  PRIMARY KEY (`id_reserva`),
  KEY `fk_reservas_hospedes1_idx` (`id_hospede`),
  KEY `fk_reservas_status1_idx` (`id_status_reserva`),
  KEY `fk_reservas_acomodacoes1_idx` (`id_acomodacao`),
  CONSTRAINT `fk_reservas_acomodacoes1` FOREIGN KEY (`id_acomodacao`) REFERENCES `acomodacoes` (`id_acomodacao`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_hospedes` FOREIGN KEY (`id_hospede`) REFERENCES `hospedes` (`id_hospede`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_status_reservas` FOREIGN KEY (`id_status_reserva`) REFERENCES `status_reservas` (`id_status_reservas`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reservas`
--

LOCK TABLES `reservas` WRITE;
/*!40000 ALTER TABLE `reservas` DISABLE KEYS */;
INSERT INTO `reservas` VALUES (1,'2024-11-07 00:00:00','2024-11-12 00:00:00',3,4,2000,'Grocada de 30',1,1,1),(2,'2024-11-07 00:00:00','2024-11-10 00:00:00',2,3,1500,'É LORD',1,2,1),(15,'2024-11-10 03:00:00','2024-11-15 03:00:00',3,5,1800,'i\'am the monster raw raw raw',1,2,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
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
  PRIMARY KEY (`id_usuario`),
  KEY `fk_usuarios_cargos` (`id_cargo`),
  CONSTRAINT `fk_usuarios_cargos1` FOREIGN KEY (`id_cargo`) REFERENCES `cargos` (`id_cargo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'sarah','sarah@gmail','sarah','123',1);
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-11-19 16:17:37
