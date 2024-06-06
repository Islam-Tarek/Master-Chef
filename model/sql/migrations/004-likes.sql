CREATE Table likes(
    id         VARCHAR PRIMARY KEY,
    userId     VARCHAR NOT NULL,
    postId     VARCHAR NOT NULL,
    FOREIGN KEY (userId) REFERENCES users (id),
    FOREIGN KEY (postId) REFERENCES posts (id)
);

CREATE INDEX idx_id_likes ON likes(id);