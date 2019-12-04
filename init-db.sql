CREATE TABLE api_student (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255),
  present BOOLEAN,
  birth_year SMALLINT
);

INSERT INTO api_student (name, present, birth_year)
VALUES ('Grant Chirpus', TRUE, 2013);
INSERT INTO api_student (name, present, birth_year)
VALUES ('Indira Gandhi', FALSE, 1917);
INSERT INTO api_student (name, present, birth_year)
VALUES ('Mahatma Gandhi', FALSE, 1869);