const express = require('express');
const { signupvalidation, loginvalidation } = require('../middleware/authvalidation');
const { signup, login, addExpense, getExpenses, updateExpense, deleteExpenses, } = require('../controllers/authcontrollers');
const multer = require('multer');
const upload = require('../middleware/upload');
const router = express.Router();


router.post('/login', loginvalidation, login)

router.post('/register', signupvalidation, signup);

router.post('/expenses',upload.single('image'), addExpense);

router.get('/expenses', getExpenses);

router.put('/expenses/:id',updateExpense)

router.delete('/expenses/:id',deleteExpenses)

module.exports = router