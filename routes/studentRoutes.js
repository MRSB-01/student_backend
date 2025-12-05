const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

router.post('/students', studentController.createStudent);
router.get('/students', studentController.getStudents);
router.get('/students/:id', studentController.getStudent);
router.put('/students/:id', studentController.updateStudent);
router.delete('/students/:id', studentController.deleteStudent);

// Marks routes
router.post('/students/:id/marks', studentController.addMark);
router.put('/marks/:markId', studentController.updateMark);
router.delete('/marks/:markId', studentController.deleteMark);

module.exports = router;