CREATE DATABASE smart_vehicle_smog_detection;

USE smart_vehicle_smog_detection;

CREATE TABLE users (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(100),
  email VARCHAR(100),
  is_active TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE sensors (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  sensor_name VARCHAR(100) NOT NULL,
  location VARCHAR(150),
  is_online TINYINT(1) DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pollution_levels (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  level_name VARCHAR(50) NOT NULL,
  min_value DECIMAL(10,2) NOT NULL,
  max_value DECIMAL(10,2) NOT NULL,
  color_code VARCHAR(20),
  description TEXT
);

CREATE TABLE smog_readings (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  sensor_id INT(11) NOT NULL,
  pollution_level_id INT(11) NOT NULL,
  smog_level DECIMAL(10,2) NOT NULL,
  recorded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sensor_id) REFERENCES sensors(id),
  FOREIGN KEY (pollution_level_id) REFERENCES pollution_levels(id)
);

CREATE TABLE alerts (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  sensor_id INT(11) NOT NULL,
  pollution_level_id INT(11) NOT NULL,
  smog_level DECIMAL(10,2) NOT NULL,
  alert_message VARCHAR(255),
  triggered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sensor_id) REFERENCES sensors(id),
  FOREIGN KEY (pollution_level_id) REFERENCES pollution_levels(id)
);

CREATE TABLE activity_logs (
  id INT(11) AUTO_INCREMENT PRIMARY KEY,
  user_id INT(11) NOT NULL,
  action ENUM('LOGIN','LOGOUT','VIEW_DASHBOARD','VIEW_LIVE_MONITORING','VIEW_POLLUTION_LEVELS','VIEW_ALERTS','VIEW_SETTINGS') NOT NULL,
  description TEXT,
  ip_address VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);