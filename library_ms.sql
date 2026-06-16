CREATE DATABASE library_ms;
USE library_ms;

SELECT * FROM users WHERE role = 'student';

--- USER TABLE 
CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(100) NOT NULL, email VARCHAR(100) UNIQUE NOT NULL, 
password VARCHAR(255) NOT NULL, image VARCHAR(255), role ENUM('admin','student') DEFAULT 'student',
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
INSERT INTO users (name,email,password,role)
VALUES ('Admin','admin@gmail.com','123456','admin');
SELECT * FROM users;
ALTER TABLE users ADD phone VARCHAR(20), ADD department VARCHAR(100), ADD semester VARCHAR(50), ADD section VARCHAR(50),
 ADD roll_no VARCHAR(50),ADD father_name VARCHAR(100), ADD address TEXT, ADD admission_date DATE,
 ADD profile_completed TINYINT(1) DEFAULT 0;
 SELECT * FROM users;
 







# book table 
;

CREATE TABLE books (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, author VARCHAR(255) NOT NULL, description TEXT, 
image VARCHAR(255), status ENUM('available','issued') DEFAULT 'available', created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
SELECT * FROM books ;




--- ISSUES BOOK    TABLE ---
CREATE TABLE issued_books (id INT AUTO_INCREMENT PRIMARY KEY, student_name VARCHAR(255) NOT NULL, book_name VARCHAR(255) NOT NULL, 
issue_date DATE, return_date DATE, fine INT DEFAULT 0, status VARCHAR(50) DEFAULT 'Issued', 
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);
SELECT * FROM issued_books;
DROP TABLE issued_books;




---  new ISSUES BOOK    TABLE ---
CREATE TABLE issued_books (id INT AUTO_INCREMENT PRIMARY KEY,student_id INT,book_id INT,student_name VARCHAR(255),book_name VARCHAR(255),
issue_date DATE,return_date DATE,status ENUM('Issued','Returned') DEFAULT 'Issued',fine INT DEFAULT 0,returned_at TIMESTAMP NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
SELECT * FROM issued_books;
DESCRIBE issued_books;
DELETE FROM issued_books;
SET SQL_SAFE_UPDATES = 0;
SELECT * FROM issued_books;