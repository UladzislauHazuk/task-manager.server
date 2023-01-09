CREATE DATABASE task_manager;

CREATE TABLE users (
	id SERIAL PRIMARY KEY, 
	name VARCHAR(30) NOT NULL,
	surname	VARCHAR(30) NOT NULL,
	email VARCHAR(60) NOT NULL,
	pwd	VARCHAR(255) NOT NULL,
	status INT DEFAULT 0
)

CREATE TABLE tasks (
	id SERIAL PRIMARY KEY, 
	task VARCHAR(255) NOT NULL,
	user_id INT,
	FOREIGN KEY (user_id) REFERENCES users (id)
)

SELECT * FROM users;