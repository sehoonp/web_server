use csci401;
DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS loan_request;
DROP TABLE IF EXISTS contract;

CREATE TABLE user (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    create_time TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE loan_request (
    loan_id INT AUTO_INCREMENT PRIMARY KEY,
    amount DOUBLE,
    currency VARCHAR(45),
    lendee_id INT,
    status VARCHAR(45),
    last_updated TIMESTAMP,
    create_time TIMESTAMP
) ENGINE=InnoDB AUTO_INCREMENT=4198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE contract (
    contract_id INT AUTO_INCREMENT PRIMARY KEY,
    status VARCHAR(45),
    lender_id INT,
    lendee_id INT,
    loan_request_id INT
) ENGINE=InnoDB AUTO_INCREMENT=4198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;