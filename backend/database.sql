CREATE DATABASE dxcassignment;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

CREATE TABLE users (
  id uuid DEFAULT uuid_generate_v4(),
  username varchar(50),
  password varchar(100),
  admin boolean,
  PRIMARY KEY (id)
);

ALTER TABLE users ADD CONSTRAINT username_unique UNIQUE (username);
