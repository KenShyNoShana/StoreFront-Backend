/* Replace with your SQL commands */
CREATE TABLE users (id SERIAL PRIMARY KEY, firstname VARCHAR(70), lastname VARCHAR(70), username VARCHAR(100), password VARCHAR(200));

INSERT INTO users (firstname, lastname, username, password) VALUES ('Peter', 'Schneider', 'PeterSchneider', '$2b$13$rBwVetvgCgb69zbGCwUi/u0i57f8xx/HTO/oHJNjdF3yghdMKYus6');
INSERT INTO users (firstname, lastname, username, password) VALUES ('Anna', 'Wagner', 'AnnaWagner', '$2b$13$tQ/RHWGoKFh6Ngye2OIe..iyr.4zSWTq/uO54mCPXhoJjF8XSCMIq');
INSERT INTO users (firstname, lastname, username, password) VALUES ('Dieter', 'Mueller', 'DieterMueller', '$2b$13$XkgTFMlZY6vAywqhqAWKJuCWmj1SQ4N5QYShWWLj8F7.OhzdWaTUu');