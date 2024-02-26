CREATE DATABASE imageData;

CREATE TABLE Image(
    image_id SERIAL PRIMARY KEY,
    name VARCHAR(255), 
    images VARCHAR(255),
    slug VARCHAR(255)

)


INSERT INTO Image(name, images, slug) VALUES('Afiq', '/images/Hazim-Sya/DSC02934.jpg', 'hazim-sya')

SELECT * FROM Image