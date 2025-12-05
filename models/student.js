const db = require('../config/db');

const createStudent = async (name, email) => {
  const result = await db.query(
    'INSERT INTO students (name, email) VALUES ($1, $2) RETURNING *',
    [name, email]
  );
  return result.rows[0];
};

const getAllStudents = async (page, limit) => {
  const offset = (page - 1) * limit;
  const dataResult = await db.query(
    'SELECT * FROM students ORDER BY id ASC LIMIT $1 OFFSET $2',
    [limit, offset]
  );
  const countResult = await db.query('SELECT COUNT(*) FROM students');
  return {
    data: dataResult.rows,
    total: parseInt(countResult.rows[0].count),
  };
};

const getStudentById = async (id) => {
  const studentResult = await db.query('SELECT * FROM students WHERE id = $1', [id]);
  if (studentResult.rows.length === 0) return null;

  const marksResult = await db.query('SELECT * FROM marks WHERE student_id = $1', [id]);
  return {
    ...studentResult.rows[0],
    marks: marksResult.rows,
  };
};

const updateStudent = async (id, name, email) => {
  const result = await db.query(
    'UPDATE students SET name = $1, email = $2 WHERE id = $3 RETURNING *',
    [name, email, id]
  );
  return result.rows[0];
};

const deleteStudent = async (id) => {
  const result = await db.query('DELETE FROM students WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  createStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
};