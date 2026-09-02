-- Arcube AI Room Redesign — Database Schema (MySQL on cPanel)

CREATE TABLE IF NOT EXISTS generation_attempts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  contact VARCHAR(100),        -- phone or email
  ip_address VARCHAR(45),
  fingerprint_hash VARCHAR(64),
  room_type VARCHAR(50),
  style VARCHAR(50),
  extra_note TEXT,
  image_path VARCHAR(255),     -- where the generated result is saved
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_contact (contact),
  INDEX idx_fingerprint (fingerprint_hash)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Contact Leads captured from completed room redesigns
CREATE TABLE IF NOT EXISTS redesign_leads (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  preferred_image_path VARCHAR(255),
  message TEXT,
  fingerprint_hash VARCHAR(64),
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

