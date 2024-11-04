-- Таблица пользователей
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance NUMERIC(10, 2) DEFAULT 0
);

CREATE TABLE IF NOT EXISTS items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    available BOOLEAN DEFAULT TRUE
);

CREATE TABLE IF NOT EXISTS purchases (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    item_id INT REFERENCES items(id),
    price NUMERIC(10, 2) NOT NULL,
    purchase_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, password, balance)
VALUES 
    ('user1', '$2a$10$wIoPV1X.yygOUQUGBZvzFujYDXLFhnxL/oRvsfffZw4dbL2S0lvfW', 1000),  -- pass: password123, balance: 1000
    ('user2', '$2a$10$WiKP3iklrxxyLvAHnjc5hO4CCUMabJFvd5wsB0vMCZ.6t1TKY/hZa', 500)    -- pass: mypassword, balance: 500
ON CONFLICT (username) DO NOTHING;

INSERT INTO items (name, price)
VALUES 
    ('XM1014 | Ziggy (Field-Tested)', 0.32),
    ('XM1014 | Ziggy (Minimal Wear)', 0.68),
    ('XM1014 | Ziggy (Well-Worn)', 0.4),
    ('XM1014 | Zombie Offensive (Battle-Scarred)', 0.28),
    ('XM1014 | Zombie Offensive (Factory New)', 1.19),
    ('XM1014 | Zombie Offensive (Field-Tested)', 0.27),
    ('XM1014 | Zombie Offensive (Minimal Wear)', 0.51),
    ('XM1014 | Zombie Offensive (Well-Worn)', 0.3),
    ('X-Ray P250 Package', 2.38),
    ('Zeus x27 | Dragon Snore (Battle-Scarred)', 23.95),
    ('Zeus x27 | Dragon Snore (Factory New)', 91.36),
    ('Zeus x27 | Dragon Snore (Field-Tested)', 26.26),
    ('Zeus x27 | Dragon Snore (Minimal Wear)', 55.66),
    ('Zeus x27 | Olympus (Battle-Scarred)', 5.66),
    ('Zeus x27 | Olympus (Factory New)', 15.58),
    ('Zeus x27 | Olympus (Field-Tested)', 6.52),
    ('Zeus x27 | Olympus (Minimal Wear)', 9.8),
    ('Zeus x27 | Olympus (Well-Worn)', 7.25)
ON CONFLICT DO NOTHING;
