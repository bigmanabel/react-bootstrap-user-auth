const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Create JSONWebToken
const createToken = ({id}) => {
  return jwt.sign({id}, process.env.SECRET, { expiresIn: '1h'});
}

// Login User
const loginUser = async (req, res) => {
    const { email , password } = req.body;

    const emptyFields = [];

    if (email == '') {
        emptyFields.push('email');
    }

    if (password == '') {
        emptyFields.push('password');
    }

    if (emptyFields.length !== 0) {
        return res.status(400).json({
            'error': 'All fields are required'
        });
    }

    const user = await prisma.user.findUnique({
        select: {
            id: true,
            email: true,
        },
        where : {
            email: email,
        }
    });

    if (!user) {
        return res.status(400).json({
            'error': 'User does not exist'
        });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        return res.status(400).json({
            'error': 'Password is incorrect'
        });
    }

    const token = createToken({id: user.id});

    return res.status(200).json({user: user.email, token});
}

// Register User
const registerUser = async (req, res) => {
    const {email , password, confirmPassword } = req.body;

    const userExists = await prisma.user.findUnique({
        where: {
            email,
        }
    });

    if (userExists) {
        return res.status(400).json({
            'error': 'Email already in use'
        });
    }

    if(password !== confirmPassword) {
        return res.status(400).json({
            'error': 'Passwords do not match'
        });
    }

    
    const newUser = await prisma.user.create({
        data: {
            email,
            password: await bcrypt.hash(password, 12),
        }
    });

    return res.status(201).json(newUser);
}

module.exports = {
    loginUser,
    registerUser
}