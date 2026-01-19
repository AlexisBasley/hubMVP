-- V7: Create user_preferences table
-- This table stores user-specific preferences in JSON format

CREATE TABLE user_preferences (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    preferences JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_user_preferences_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create index on user_id for faster lookups
CREATE INDEX idx_user_preferences_user_id ON user_preferences(user_id);

-- Create GIN index on preferences JSONB column for efficient querying
CREATE INDEX idx_user_preferences_preferences ON user_preferences USING GIN (preferences);

COMMENT ON TABLE user_preferences IS 'Stores user-specific preferences like tools, dashboards, settings';
COMMENT ON COLUMN user_preferences.preferences IS 'JSON object containing tools, dashboards, selectedSite, sidebarOpen, language, notifications';
