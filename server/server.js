const express = require('express');
const bodParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const app = express();

app.use(bodParser.urlencoded({ extended: true }));
app.use(bodParser.json())

app.get('/api', async (req, res) => {
    const users = await prisma.user.findMany({
        select : {
            id: true,
            email: true,
            password: true,
        }
    })

    return res.json(users);
});

app.post('/api/login', async (req, res) => {
    const { email , password } = req.body;

    const user = await prisma.user.findUnique({
        select: {
            id: true,
            email: true,
            password: true,
        },
        where : {
            email: email,
        }
    });

    if (email == user.email && password == bcrypt.compare(password, user.password)) {
        return res.status(200).json({
            message: 'Login successful'
        });
    }
});

app.post('/api/register', async (req, res) => {
    const {email , password, confirmPassword } = req.body;

    const userExists = await prisma.user.findUnique({
        where: {
            email,
        },
        select: {
            id: true,
            email: true,
            password: true,
        }
    });

    if (userExists) {
        res.status(400).json({
            'error': 'Email already in use'
        });
    }

    else if(password !== confirmPassword) {
        res.status(400).json({
            'error': 'Passwords do not match'
        });
    }

    else {
        const newUser = await prisma.user.create({
            data: {
                email,
                password: await bcrypt.hash(password, 12),
            }
        })

        return res.status(201).json(newUser);
    }

});

app.listen(5000, () => {
  console.log('Server started on port 5000');
})