CREATE SCHEMA IF NOT EXISTS `birdhouse` DEFAULT CHARACTER SET utf8 ;
USE `birdhouse` ;

-- -----------------------------------------------------
-- Table `birdhouse`.`hospedes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `birdhouse`.`hospedes` (
  `id_hospede` INT NOT NULL,
  `nome_hospede` VARCHAR(45) NOT NULL,
  `num_celular` VARCHAR(45) NOT NULL,
  `email_hospede` VARCHAR(45) NOT NULL,
  `data_nascimento` DATE NOT NULL,
  `cpf_hospede` VARCHAR(11) NOT NULL,
  PRIMARY KEY (`id_hospede`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `birdhouse`.`cargos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `birdhouse`.`cargos` (
  `id_cargo` INT NOT NULL,
  `nome_cargo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_cargo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `birdhouse`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `birdhouse`.`usuarios` (
  `id_usuario` INT NOT NULL,
  `nome_usuario` VARCHAR(45) NOT NULL,
  `email_usuario` VARCHAR(45) NOT NULL,
  `login_usuario` VARCHAR(45) NOT NULL,
  `senha` VARCHAR(45) NOT NULL,
  `id_cargo` INT NOT NULL,
  PRIMARY KEY (`id_usuario`),
  INDEX `fk_usuarios_cargos` (`id_cargo` ASC) ,
  CONSTRAINT `fk_usuarios_cargos1`
    FOREIGN KEY (`id_cargo`)
    REFERENCES `birdhouse`.`cargos` (`id_cargo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `birdhouse`.`status_reservas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `birdhouse`.`status_reservas` (
  `id_status_reservas` INT NOT NULL,
  `condicao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_status_reservas`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `birdhouse`.`comodidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `birdhouse`.`comodidades` (
  `id_comodidade` INT NOT NULL,
  `camas_casal` INT NOT NULL,
  `camas_solteiro` INT NOT NULL,
  `arcondicionado` TINYINT NOT NULL,
  `wifi` TINYINT NOT NULL,
  `tv` TINYINT NOT NULL,
  `cozinha` TINYINT NOT NULL,
  `toalha` TINYINT NOT NULL,
  `frigobar` TINYINT NOT NULL,
  `ducha` TINYINT NOT NULL,
  `banheira` TINYINT NOT NULL,
  PRIMARY KEY (`id_comodidade`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `birdhouse`.`status_acomodacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `birdhouse`.`status_acomodacoes` (
  `id_status_acomodacao` INT NOT NULL,
  `condicao` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id_status_acomodacao`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `birdhouse`.`acomodacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `birdhouse`.`acomodacoes` (
  `id_acomodacao` INT NOT NULL,
  `nome_acomodacao` VARCHAR(45) NOT NULL,
  `lotacao` INT NOT NULL,
  `valor_diaria` FLOAT NOT NULL,
  `id_comodidade` INT NOT NULL,
  `id_status_acomodocao` INT NOT NULL,
  PRIMARY KEY (`id_acomodacao`, `id_comodidade`, `id_status_acomodocao`),
  INDEX `fk_acomodacoes_comodidades1_idx` (`id_comodidade` ASC),
  INDEX `fk_acomodacoes_status_reservas_copy11_idx` (`id_status_acomodocao` ASC) ,
  CONSTRAINT `fk_acomodacoes_comodidades1`
    FOREIGN KEY (`id_comodidade`)
    REFERENCES `birdhouse`.`comodidades` (`id_comodidade`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_acomodacoes_status_reservas_copy11`
    FOREIGN KEY (`id_status_acomodocao`)
    REFERENCES `birdhouse`.`status_acomodacoes` (`id_status_acomodacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `birdhouse`.`reservas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `birdhouse`.`reservas` (
  `id_reserva` INT NOT NULL,
  `checkin` DATETIME NOT NULL,
  `checkout` DATETIME NOT NULL,
  `qntd_hospedes` INT NOT NULL,
  `num_dias` INT NOT NULL,
  `valor_total` FLOAT NOT NULL,
  `observacao` VARCHAR(500) NULL,
  `validacao` TINYINT NOT NULL,
  `id_hospede` INT NOT NULL,
  `id_status` INT NOT NULL,
  `id_acomodacao` INT NOT NULL,
  PRIMARY KEY (`id_reserva`, `id_hospede`, `id_status`, `id_acomodacao`),
  INDEX `fk_reservas_hospedes1_idx` (`id_hospede` ASC) ,
  INDEX `fk_reservas_status1_idx` (`id_status` ASC) ,
  INDEX `fk_reservas_acomodacoes1_idx` (`id_acomodacao` ASC) ,
  CONSTRAINT `fk_reservas_hospedes1`
    FOREIGN KEY (`id_hospede`)
    REFERENCES `birdhouse`.`hospedes` (`id_hospede`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_status1`
    FOREIGN KEY (`id_status`)
    REFERENCES `birdhouse`.`status_reservas` (`id_status_reservas`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_reservas_acomodacoes1`
    FOREIGN KEY (`id_acomodacao`)
    REFERENCES `birdhouse`.`acomodacoes` (`id_acomodacao`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;