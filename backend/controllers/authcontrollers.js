const Usermodel = require('../models/user');
const Expense = require('../models/Expense')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await Usermodel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Email already exists", sucess: false });
        }

        const usermodel = new Usermodel({
            username,
            email,
            password
        })
        const saltRounds = 10;
        usermodel.password = await bcrypt.hash(password, saltRounds);
        await usermodel.save();
        res.status(201).json({ message: "User created successfully", sucess: true });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", sucess: false });
        console.log(error);

    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Usermodel.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: "Invalid email or password", sucess: false });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(403).json({ message: "Invalid password", sucess: false });
        }

        const jwttoken = jwt.sign
            ({ email: user.email, _id: user._id }, process.env.SECRET, { expiresIn: '1  hour' });

        res.status(201).json({ message: "Log In Successfully", sucess: true, jwttoken, email, username: user.username });

    } catch (error) {
        res.status(500).json({ message: "Internal server error", sucess: false });
        console.log(error);

    }
}

const addExpense = async (req, res) => {
    try {
        // Validate request body
        const { amount, description, date, category, paymentMethod } = req.body;

        // Check if all required fields are present
        if (!amount || !description || !date || !category || !paymentMethod) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Create a new instance of the Expense model
        const expense = new Expense({
            amount,
            description,
            date,
            category,
            paymentMethod,
            // Add other fields if needed, such as image URL if you're handling file uploads
        });

        // Save the expense to the database
        await expense.save();

        // Respond with the created expense
        res.status(201).json(expense);
    } catch (error) {
        // Handle any errors that occur during the saving process
        console.error('Error adding expense:', error); // Log the error for debugging
        res.status(500).json({ message: 'An error occurred while adding the expense' });
    }
};

const getExpenses = async (req, res) => {
    try {
        const expenses = await Expense.find(); // Fetch all expenses from the database
        res.status(200).json(expenses); // Respond with the expenses as JSON
    } catch (error) {
        console.error('Error fetching expenses:', error); // Log the error for debugging
        res.status(500).json({ message: error.message }); // Respond with an error message
    }
};

const updateExpense = async (req, res) => {
    try {
        const { amount, description, date, category, paymentMethod } = req.body;
        const updatedExpense = await Expense.findByIdAndUpdate(
            req.params.id,
            { amount, description, date, category, paymentMethod },
            { new: true } // Return the updated document
        );

        if (!updatedExpense) {
            return res.status(404).send('Expense not found');
        }

        res.status(200).json(updatedExpense);
    } catch (error) {
        console.error('Error updating expense:', error);
        res.status(500).send('Server error');
    }
};

const deleteExpenses = async (req,res) => {
    try {
        const { id } = req.params;
        const result = await Expense.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send('Expense not found');
        }

        res.status(200).send('Expense deleted successfully');
    } catch (error) {
        res.status(500).send('Server error');
    }
}

module.exports = {
    signup,
    login,
    addExpense,
    getExpenses,
    updateExpense,
    deleteExpenses
};