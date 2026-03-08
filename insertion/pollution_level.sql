
INSERT INTO pollution_levels (level_name, min_value, max_value, color_code, description) VALUES
('Good',           0,   50,  '#00e400', 'Air quality is satisfactory'),
('Moderate',       51,  100, '#ffff00', 'Acceptable air quality'),
('Unhealthy',      101, 150, '#ff7e00', 'Sensitive groups may be affected'),
('Very Unhealthy', 151, 200, '#ff0000', 'Health alert for everyone'),
('Hazardous',      201, 300, '#8f3f97', 'Emergency conditions');