CREATE Table posts(
    id         VARCHAR PRIMARY KEY,
    title      VARCHAR NOT NULL,
    content    VARCHAR NOT NULL,
    userId     VARCHAR NOT NULL,
    postedAt   VARCHAR NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id)
);

CREATE INDEX idx_id_posts ON posts(id);