INSERT INTO products (name, price, category, description) VALUES
    ('Classic Flannel Set', 29.99, 'Sets', 'Warm brushed flannel'),
    ('Silk Dreams Two-Piece', 89.99, 'Sets', 'Luxury silk pajama set'),
    ('Cloud Nine Onesie', 49.99, 'Onesies', 'Soft fleece onesie'),
    ('Bamboo Shorts Set', 39.99, 'Sets', 'Breathable bamboo fabric'),
    ('Holiday Plaid Long PJs', 34.99, 'Sets', 'Festive plaid design')
ON CONFLICT DO NOTHING;