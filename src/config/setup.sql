DROP TABLE IF EXISTS cars;
CREATE TABLE cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    `year` TEXT NOT NULL,
    crest_url TEXT,
    kilometres TEXT NOT NULL,
    color TEXT NOT NULL,
    air_conditioning BOOLEAN NOT NULL,
    passengers INTEGER NOT NULL,
    gearbox TEXT NOT NULL,
    created_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,
    updated_at DATE DEFAULT (datetime('now', 'localtime')) NOT NULL
);
