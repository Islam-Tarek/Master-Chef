CREATE Table comments(
    id         VARCHAR PRIMARY KEY,
    comment    VARCHAR NOT NULL,
    userId     VARCHAR NOT NULL,
    postId     VARCHAR Not NULL,
    postedAt   VARCHAR NOT NULL,
    FOREIGN key (userId) REFERENCES users (id),
    FOREIGN KEY (postId) REFERENCES posts (id)
);

CREATE INDEX idx_id_comments ON comments(id);