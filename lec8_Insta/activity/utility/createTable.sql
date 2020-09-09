-- insta_pp database
-- CREATE TABLE IF NOT EXISTS user(
--     uid VARCHAR(80) PRIMARY KEY,
--     username VARCHAR(100) NOT NULL UNIQUE,
--     email_id VARCHAR(50) UNIQUE,
--     phone BIGINT(10) UNIQUE,
--     bio VARCHAR(150),
--     is_verified BOOLEAN DEFAULT false,
--     is_public BOOLEAN DEFAULT true,
--     p_img_url VARCHAR(255)
-- );

CREATE TABLE IF NOT EXISTS user_follower(
    uid VARCHAR(80) NOT NULL,
    follower_id VARCHAR(80) NOT NULL,
    is_pending BOOLEAN DEFAULT true,
    INDEX(uid)
);