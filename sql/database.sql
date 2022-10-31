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
CREATE TABLE "Roles"
(
    role          SERIAL       NOT NULL,
    "roleName"    VARCHAR(200) NOT NULL,
    "defaultRole" BOOLEAN      NOT NULL DEFAULT FALSE
PRIMARY KEY ("role")
);
CREATE TABLE "AccountRoles"
(
    account INTEGER NOT NULL,
    role    INTEGER NOT NULL,
    PRIMARY KEY ("account", "role"),
    FOREIGN KEY ("role") REFERENCES "Roles",
    FOREIGN KEY ("account") REFERENCES "Accounts"
);

CREATE TABLE "Permissions"
(
    "permission" SERIAL       NOT NULL,
    role         INTEGER      NOT NULL,
    "routeName"  VARCHAR(200) NOT NULL,
    PRIMARY KEY ("permission"),
    FOREIGN KEY ("role") REFERENCES "Roles"
);
CREATE TABLE "Petitions"
(
    petition       SERIAL  NOT NULL,
    "permission"   INTEGER NOT NULL,
    "petitionName" VARCHAR(10),
    PRIMARY KEY ("petition", "permission"),
    FOREIGN KEY ("permission") REFERENCES "Permissions"
);

INSERT INTO "Roles"(role, "roleName", "defaultRole")
VALUES (default, 'customer_user', true), (default, 'admin_user', false);
