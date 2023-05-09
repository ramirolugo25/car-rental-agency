DROP TABLE IF EXISTS cars;
CREATE TABLE cars (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    brand TEXT NOT NULL,
    model TEXT NOT NULL,
    `year` TEXT NOT NULL,
    crestUrl TEXT,
    kilometres TEXT NOT NULL,
    color TEXT NOT NULL,
    airConditioning BOOLEAN NOT NULL,
    passengers INTEGER NOT NULL,
    gearbox TEXT NOT NULL,
    lastUpdated DATE DEFAULT (datetime('now', 'localtime')) NOT NULL,
    createdAt DATE DEFAULT (datetime('now', 'localtime')) NOT NULL
);

