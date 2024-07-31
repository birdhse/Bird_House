create database birdhouse;
use birdhouse;

CREATE TABLE IF NOT EXISTS `birdhouse`.`cad_hosped` (
  `nome_h` VARCHAR(60) NOT NULL,
  `cpf_h` VARCHAR(12) NOT NULL,
  `dtnasc_h` DATETIME NOT NULL,
  `contato_h` VARCHAR(12) NOT NULL,
  PRIMARY KEY (`nome_h`))
  ;


insert into cad_hosped values(
"João Gabriel Oliveira Matos",
"898241005-97",
"2003-06-03",
"31998245492"
);

insert into cad_hosped values(
"Gabriel Gonçalves Pereira",
"952241005-97",
"2007-02-28",
"25998349492"
);

CREATE TABLE IF NOT EXISTS `birdhouse`.`cad_reservas` (
  `id_r` INT NOT NULL,
  `dt_entrada` DATETIME NOT NULL,
  `dt_saida` DATETIME NOT NULL,
  `uh` VARCHAR(45) NOT NULL,
  `valor_diaria` FLOAT NOT NULL,
  `num_h` INT NOT NULL,
  `nome_h` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`id_r`),
    FOREIGN KEY (`nome_h`) REFERENCES `birdhouse`.`cad_hosped` (`nome_h`)
    );

insert into cad_reservas values(
null,
'2023-05-10',
'2023-05-15',
"Bus",
300,
2,
"Gabriel Gonçalves Pereira"
);
