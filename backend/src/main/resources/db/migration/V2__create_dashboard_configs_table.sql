-- V2: Create dashboard_configs table
CREATE TABLE dashboard_configs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL UNIQUE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE dashboard_items (
    config_id BIGINT NOT NULL,
    dashboard_id VARCHAR(100) NOT NULL,
    position INTEGER NOT NULL,
    PRIMARY KEY (config_id, position),
    FOREIGN KEY (config_id) REFERENCES dashboard_configs(id) ON DELETE CASCADE
);

CREATE INDEX idx_dashboard_configs_user_id ON dashboard_configs(user_id);
