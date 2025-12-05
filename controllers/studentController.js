const Student = require('../models/student');
const Mark = require('../models/mark');

const createStudent = async (req, res) => {
    const { name, email } = req.body;
    try {
        const student = await Student.createStudent(name, email);
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudents = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    try {
        const { data, total } = await Student.getAllStudents(page, limit);
        res.json({
            data,
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.getStudentById(id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateStudent = async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const student = await Student.updateStudent(id, name, email);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.json(student);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteStudent = async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.deleteStudent(id);
        if (!student) return res.status(404).json({ error: 'Student not found' });
        res.json({ message: 'Student deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Additional controllers for marks (since student with marks)
const addMark = async (req, res) => {
    const { id } = req.params; // student_id
    const { subject, mark } = req.body;
    try {
        const newMark = await Mark.createMark(id, subject, mark);
        res.status(201).json(newMark);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateMark = async (req, res) => {
    const { markId } = req.params;
    const { subject, mark } = req.body;
    try {
        const updatedMark = await Mark.updateMark(markId, subject, mark);
        if (!updatedMark) return res.status(404).json({ error: 'Mark not found' });
        res.json(updatedMark);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteMark = async (req, res) => {
    const { markId } = req.params;
    try {
        const deletedMark = await Mark.deleteMark(markId);
        if (!deletedMark) return res.status(404).json({ error: 'Mark not found' });
        res.json({ message: 'Mark deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
    addMark,
    updateMark,
    deleteMark,
};