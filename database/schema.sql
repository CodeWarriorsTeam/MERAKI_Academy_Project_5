 DROP DATABASE sql11473349;
CREATE DATABASE sql11473349;

 USE sql11473349;


CREATE TABLE roles (
    id INT AUTO_INCREMENT NOT NULL,
    role_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE users(
    id INT AUTO_INCREMENT NOT NULL,
    profile_image VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    country VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL,
    pass VARCHAR(255) NOT NULL,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);



CREATE TABLE donation(
id INT AUTO_INCREMENT NOT NULL,
IBAN VARCHAR(255),
amount INT,
case_id INT,
donor_id INT,
FOREIGN KEY (donor_id) REFERENCES users(id),
is_deleted TINYINT DEFAULT 0,
PRIMARY KEY (id)
);


CREATE TABLE cases (
    id INT AUTO_INCREMENT NOT NULL,
    category VARCHAR(255),
    case_image VARCHAR(255),
    title VARCHAR(255),
    case_description VARCHAR(255),
    TheAmountRequired INT,
    donations INT,
    donor INT,
    donation_id INT,
    FOREIGN KEY(donor) REFERENCES donation(donor_id),
    FOREIGN KEY (donation_id) REFERENCES donation(id),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);


CREATE TABLE gallery (
    id INT AUTO_INCREMENT NOT NULL,
   
    image_1 VARCHAR(3000),

    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)
);


CREATE TABLE volunteer (
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    address_1 VARCHAR(255),
    phonenumber VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
    PRIMARY KEY (id)

);