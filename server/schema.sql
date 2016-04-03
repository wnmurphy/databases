CREATE DATABASE chat;

USE chat;

CREATE TABLE users (
  userID      int NOT NULL AUTO_INCREMENT,
  userName    varchar(20),
  PRIMARY KEY (userID)
);

CREATE TABLE messages (
  messageID   int NOT NULL AUTO_INCREMENT,
  userID      int NOT NULL,
  roomName    varchar(20),
  messageText varchar(200),
  createdAt   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (messageID)
);
