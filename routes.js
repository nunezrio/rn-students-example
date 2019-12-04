const express = require("express");
const studentRoutes = express.Router();
const pool = require("./connection");

studentRoutes.get("/students", (req, res) => {
  // If the request has a ?name= parameter, only respond w/ matching students
  if (req.query.name) {
    const sql = "SELECT * FROM api_student WHERE name LIKE $1::TEXT";
    const params = ["%" + req.query.name + "%"];
    pool.query(sql, params).then(result => {
      // .json sends response as JSON
      res.json(result.rows);
    });
  } else {
    // else respond with ALL students.
    const sql = "SELECT * FROM api_student";
    pool.query(sql).then(result => {
      // .json sends response as JSON
      res.json(result.rows);
    });
  }
});

studentRoutes.get("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const sql = "SELECT * FROM api_student WHERE id = $1::int";
  const params = [id];
  pool.query(sql, params).then(result => {
    if (result.rows.length === 0) {
      // Set response code to 404
      res.status(404);
      res.json({ error: `ID ${id} Not Found` });
    } else {
      res.json(result.rows[0]);
    }
  });
});

studentRoutes.post("/students", (req, res) => {
  const student = req.body;

  const sql = `INSERT INTO api_student (name, present, birth_year)
               VALUES ($1::TEXT, $2::BOOLEAN, $3::INT) RETURNING *`;
  const params = [student.name, student.present, student.birth_year];
  pool.query(sql, params).then(result => {
    // Set response code to 201
    res.status(201);
    res.json(result.rows[0]);
  });
});

studentRoutes.put("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const student = req.body;

  const sql = `UPDATE api_student
               SET name=$1::TEXT, present=$2::BOOLEAN, birth_year=$3::INT
               WHERE id = $4::INT RETURNING *`;
  const params = [student.name, student.present, student.birth_year, id];
  pool.query(sql, params).then(result => {
    res.json(result.rows[0]);
  });
});

studentRoutes.delete("/students/:id", (req, res) => {
  const id = parseInt(req.params.id);

  const sql = `DELETE FROM api_student
               WHERE id = $1::INT`;
  const params = [id];
  pool.query(sql, params).then(result => {
    // Set response code to 204. Send no content.
    res.sendStatus(204);
  });
});

module.exports = studentRoutes;
