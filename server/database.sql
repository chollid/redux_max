CREATE DATABASE reduxposts;

CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content VARCHAR(556),
  author VARCHAR(255)
);