CREATE TABLE "Accounts"
(
    "account"     SERIAL      NOT NULL,
    email         VARCHAR(50) NOT NULL UNIQUE,
    hash          VARCHAR     NOT NULL,
    "emailGoogle" VARCHAR(50) UNIQUE,
    salt          VARCHAR,
    "accountName" VARCHAR UNIQUE,
    PRIMARY KEY ("account")
);

CREATE TABLE "Artists"
(
    "artist"    SERIAL      NOT NULL,
    "fistName"  VARCHAR(50) NOT NULL,
    "lastName"  VARCHAR(50) NOT NULL,
    "gender"    VARCHAR(50) NOT NULL,
    "birthdate" DATE        NOT NULL,
    "height"    FLOAT         NOT NULL,
    PRIMARY KEY ("artist")
);
CREATE TABLE "Movies"
(
    "movie"       SERIAL       NOT NULL,
    "name"        VARCHAR(150) NOT NULL,
    "budget"      VARCHAR(50),
    "boxOffice"   VARCHAR(50),
    "gender"      VARCHAR(50)  NOT NULL,
    "releaseDate" DATE         NOT NULL,
    "duration"    TIME         NOT NULL,
    "languages"   VARCHAR(200),
    "director"    INT          NOT NULL,
    FOREIGN KEY ("director") REFERENCES "Artists",
    PRIMARY KEY ("movie")
);
CREATE TABLE "MovieCharacters"
(
    "movieCharacter" SERIAL       NOT NULL,
    "actor"          INT          NOT NULL,
    "movie"          INT          NOT NULL,
    "name"           VARCHAR(100) NOT NULL,
    "gender"         VARCHAR(50)  NOT NULL,
    FOREIGN KEY ("actor") REFERENCES "Artists",
    FOREIGN KEY ("movie") REFERENCES "Movies",
    PRIMARY KEY ("movieCharacter", "movie", "actor")
);
CREATE TABLE "TVShows"
(
    "TVShow"      SERIAL       NOT NULL,
    "name"        VARCHAR(150) NOT NULL,
    "gender"      VARCHAR(50)  NOT NULL,
    "releaseDate" DATE         NOT NULL,
    "languages"   VARCHAR(200),
    "director"    INT          NOT NULL,
    "description" VARCHAR(200),
    FOREIGN KEY ("director") REFERENCES "Artists",
    PRIMARY KEY ("TVShow")
);
CREATE TABLE "TVShowCharacters"
(
    "TVShowCharacter" SERIAL       NOT NULL,
    "actor"          INT          NOT NULL,
    "TVShow"          INT          NOT NULL,
    "name"           VARCHAR(100) NOT NULL,
    "gender"         VARCHAR(50)  NOT NULL,
    FOREIGN KEY ("actor") REFERENCES "Artists",
    FOREIGN KEY ("TVShow") REFERENCES "TVShows",
    PRIMARY KEY ("TVShowCharacter", "TVShow", "actor")
);
CREATE TABLE "Seasons"
(
    "season" SERIAL NOT NULL,
    "name"   VARCHAR(50) NOT NULL,
    "description" VARCHAR (200),
    "TVShow" INT NOT NULL,
    FOREIGN KEY ("TVShow") REFERENCES "TVShows",
    PRIMARY KEY ("season","TVShow")
);
CREATE TABLE "Episodes"
(
    "episode" SERIAL NOT NULL,
    "number" INT,
    "name" VARCHAR (50),
    "description" VARCHAR (200),
    "director" INT,
    "TVShow" INT NOT NULL,
    "season" INT NOT NULL,
    FOREIGN KEY ("season", "TVShow") REFERENCES "Seasons",
    FOREIGN KEY ("director") REFERENCES "Artists",
    PRIMARY KEY ("episode","season", "TVShow")
);
