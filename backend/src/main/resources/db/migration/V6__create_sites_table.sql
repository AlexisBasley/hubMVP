-- Migration V6: Create sites table for multi-tenant access control
-- Author: Hub Smart Solutions Team
-- Date: 2026-01-19

-- Create sites table
CREATE TABLE sites (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    status VARCHAR(50) DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for performance
CREATE INDEX idx_sites_status ON sites(status);
CREATE INDEX idx_sites_location ON sites(location);

-- Insert test construction sites
INSERT INTO sites (name, location, status) VALUES
    ('Chantier Paris - La Défense', 'Paris', 'active'),
    ('Chantier Lyon - Confluence', 'Lyon', 'active'),
    ('Chantier Marseille - Vieux Port', 'Marseille', 'active'),
    ('Chantier Lille - Cité Administrative', 'Lille', 'active');

-- Assign sites to Catherine Faster (user_id=3)
-- She should only have access to La Défense (site_id=1) and Vieux Port (site_id=3)
INSERT INTO user_sites (user_id, site_id) VALUES 
    (3, 1), -- Catherine -> La Défense
    (3, 3); -- Catherine -> Vieux Port

-- Add comments for documentation
COMMENT ON TABLE sites IS 'Construction sites for multi-tenant access control';
COMMENT ON COLUMN sites.status IS 'Site status: active, inactive, completed';
COMMENT ON COLUMN sites.location IS 'Geographic location/city of the construction site';
