CREATE TABLE users( 
    id        VARCHAR PRIMARY KEY,
    firstName VARCHAR NOT NULL,
    lastName  VARCHAR NOT NULL,
    email     VARCHAR UNIQUE NOT NULL,
    userName  VARCHAR UNIQUE NOT NULL,
    password  VARCHAR NOT NULL
);

CREATE INDEX idx_id_users ON users(id);