const db = require('../config/db');

const createMark = async (student_id, subject, mark) => {
  const result = await db.query(
    'INSERT INTO marks (student_id, subject, marks) VALUES ($1, $2, $3) RETURNING *',
    [student_id, subject, mark]
  );
  return result.rows[0];
};

const updateMark = async (id, subject, mark) => {
  const result = await db.query(
    'UPDATE marks SET subject = $1, marks = $2 WHERE id = $3 RETURNING *',
    [subject, mark, id]
  );
  return result.rows[0];
};

const deleteMark = async (id) => {
  const result = await db.query('DELETE FROM marks WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
};

module.exports = {
  createMark,
  updateMark,
  deleteMark,
};