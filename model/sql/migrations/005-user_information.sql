CREATE TABLE user_information (
        userId    VARCHAR NOT NULL,
        joinedAt  VARCHAR NOT NULL,
        about     VARCHAR NOT NULL,
        FOREIGN KEY (userId) REFERENCES users (id)
    );