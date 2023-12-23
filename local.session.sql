CREATE TABLE `yugi`.`organizador` (
  `id_organizador` INT NOT NULL AUTO_INCREMENT,
  `nome_organizador` VARCHAR(45) NULL,
  `email_organizador` VARCHAR(45) NULL,
  `senha` VARCHAR(45) NULL,
  `status` boolean,
  PRIMARY KEY (`id_organizador`),
  UNIQUE INDEX `idorganizador_UNIQUE` (`id_organizador` ASC) VISIBLE);

CREATE TABLE `yugi`.`semestral` (
  `id_semestral` INT NOT NULL AUTO_INCREMENT,
  `semestral` VARCHAR(45) NULL,
  `id_organizador` INT NOT NULL,
  `status` TINYINT NULL,
  PRIMARY KEY (`id_semestral`),
  UNIQUE INDEX `id_semestral_UNIQUE` (`id_semestral` ASC) VISIBLE,
  INDEX `id_organizador_idx` (`id_organizador` ASC) VISIBLE,
  CONSTRAINT `id_organizador`
    FOREIGN KEY (`id_organizador`)
    REFERENCES `yugi`.`organizador` (`id_organizador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `yugi`.`player` (
  `id_player` INT NOT NULL AUTO_INCREMENT,
  `player` VARCHAR(60) NULL,
  `deck` VARCHAR(45) NULL,
  `cidade` VARCHAR(45) NULL,
  `id_semestral` INT NOT NULL,
  PRIMARY KEY (`id_player`),
  UNIQUE INDEX `id_player_UNIQUE` (`id_player` ASC) VISIBLE,
  INDEX `id_semestral_idx` (`id_semestral` ASC) VISIBLE,
  CONSTRAINT `id_semestral`
    FOREIGN KEY (`id_semestral`)
    REFERENCES `yugi`.`semestral` (`id_semestral`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `yugi`.`semanal` (
  `id_semanal` INT NOT NULL AUTO_INCREMENT,
  `semanal_data` VARCHAR(45) NULL,
  `id_semestral` INT NULL,
  `status_semanal` TINYINT NULL,
  PRIMARY KEY (`id_semanal`),
  UNIQUE INDEX `id_semanal_UNIQUE` (`id_semanal` ASC) VISIBLE,
  INDEX `id_semestral_idx` (`id_semestral` ASC) VISIBLE,
  CONSTRAINT `id_semestre`
    FOREIGN KEY (`id_semestral`)
    REFERENCES `yugi`.`semestral` (`id_semestral`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);


CREATE TABLE `yugi`.`rounds` (
  `id_rounds` INT NOT NULL AUTO_INCREMENT,
  `player_1` INT NULL,
  `player_2` INT NULL,
  `round_status` TINYINT NOT NULL,
  `id_semanal` INT NULL,
  `id_rodada` INT NULL,
  PRIMARY KEY (`id_rounds`),
  UNIQUE INDEX `id_rounds_UNIQUE` (`id_rounds` ASC) VISIBLE,
  INDEX `id_semanal_idx` (`id_semanal` ASC) VISIBLE,
  INDEX `player_1_idx` (`player_1` ASC) VISIBLE,
  INDEX `player_2_idx` (`player_2` ASC) VISIBLE,
  CONSTRAINT `id_semanal`
    FOREIGN KEY (`id_semanal`)
    REFERENCES `yugi`.`semanal` (`id_semanal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `player_1`
    FOREIGN KEY (`player_1`)
    REFERENCES `yugi`.`player` (`id_player`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `player_2`
    FOREIGN KEY (`player_2`)
    REFERENCES `yugi`.`player` (`id_player`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
      CONSTRAINT `rodada`
    FOREIGN KEY (`id_rodada`)
    REFERENCES `yugi`.`rodada` (`id_rodada`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
    

    CREATE TABLE `yugi`.`rodada` (
  `id_rodada` INT NOT NULL AUTO_INCREMENT,
  `id_semanal` INT NULL,
  PRIMARY KEY (`id_rodada`),
  UNIQUE INDEX `id_rodada_UNIQUE` (`id_rodada` ASC) VISIBLE,
  INDEX `semanal_idx` (`id_semanal` ASC) VISIBLE,
  CONSTRAINT `semanal`
    FOREIGN KEY (`id_semanal`)
    REFERENCES `yugi`.`semanal` (`id_semanal`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);



CREATE TABLE `yugi`.`ranking` (
  `id_ranking` INT NOT NULL AUTO_INCREMENT,
  `pontos` INT NULL,
  `id_rank` INT NOT NULL,
  `id_player` INT NOT NULL,
  PRIMARY KEY (`id_ranking`),
  UNIQUE INDEX `id_ranking_UNIQUE` (`id_ranking` ASC) VISIBLE,
  UNIQUE INDEX `id_player_UNIQUE` (`id_player` ASC) VISIBLE,
  INDEX `duelista_idx` (`id_player` ASC) VISIBLE,
  INDEX `rank_idx` (`id_rank` ASC) VISIBLE,
  CONSTRAINT `duelista`
    FOREIGN KEY (`id_player`)
    REFERENCES `yugi`.`player` (`id_player`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `rank`
    FOREIGN KEY (`id_rank`)
    REFERENCES `yugi`.`ranked` (`id_rank`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

    CREATE TABLE `yugi`.`ranked` (
  `id_rank` INT NOT NULL AUTO_INCREMENT,
  `id_semestral` INT NOT NULL,
  PRIMARY KEY (`id_rank`),
  UNIQUE INDEX `id_rank_UNIQUE` (`id_rank` ASC) VISIBLE,
  INDEX `semestre_idx` (`id_semestral` ASC) VISIBLE,
  CONSTRAINT `semestre`
    FOREIGN KEY (`id_semestral`)
    REFERENCES `yugi`.`semestral` (`id_semestral`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);
