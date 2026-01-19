-- Migration V5: Add password and authentication fields to users table
-- Author: Hub Smart Solutions Team
-- Date: 2026-01-19

-- Add password hash column (nullable for SSO-only users)
ALTER TABLE users ADD COLUMN password_hash VARCHAR(255);

-- Add account security columns
ALTER TABLE users ADD COLUMN account_non_locked BOOLEAN DEFAULT TRUE;
ALTER TABLE users ADD COLUMN failed_login_attempts INTEGER DEFAULT 0;
ALTER TABLE users ADD COLUMN last_login_at TIMESTAMP;

-- Add password reset columns
ALTER TABLE users ADD COLUMN password_reset_token VARCHAR(255);
ALTER TABLE users ADD COLUMN password_reset_expires_at TIMESTAMP;

-- Add indexes for performance
CREATE INDEX idx_users_password_reset_token ON users(password_reset_token);
CREATE INDEX idx_users_email_active ON users(email) WHERE account_non_locked = TRUE;

-- Insert test user Jean Dupont with password "Test1234!"
-- BCrypt hash with cost factor 10
INSERT INTO users (email, name, role, password_hash, preferred_language, notification_enabled, account_non_locked)
VALUES (
    'jean.dupont@smartsolutions.fr',
    'Jean Dupont',
    'operationnel',
    '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', -- "Test1234!"
    'fr',
    true,
    true
)
ON CONFLICT (email) DO UPDATE SET 
    password_hash = EXCLUDED.password_hash,
    account_non_locked = EXCLUDED.account_non_locked;

-- Add comment to document password
COMMENT ON COLUMN users.password_hash IS 'BCrypt hashed password (cost factor 10). NULL for SSO-only users.';
COMMENT ON COLUMN users.account_non_locked IS 'Account status. FALSE if locked after failed login attempts.';
COMMENT ON COLUMN users.failed_login_attempts IS 'Counter for failed login attempts. Reset on successful login.';
COMMENT ON COLUMN users.password_reset_token IS 'Temporary token for password reset (UUID). Expires after 1 hour.';
COMMENT ON COLUMN users.password_reset_expires_at IS 'Expiration timestamp for password reset token.';
