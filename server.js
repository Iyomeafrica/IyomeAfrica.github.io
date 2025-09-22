const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public')); // Serve your frontend files (html, css, js)

// Contact form endpoint
app.post('/contact', (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Setup Nodemailer transporter (use Gmail or any SMTP)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'youremail@gmail.com', // replace with your email
            pass: 'yourpassword'        // replace with your email password or app password
        }
    });

    const mailOptions = {
        from: email,
        to: 'youremail@gmail.com',      // your email to receive messages
        subject: `New contact form submission from ${name}`,
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ error: 'Email could not be sent' });
        } else {
            console.log('Email sent: ' + info.response);
            return res.status(200).json({ message: 'Message sent successfully' });
        }
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
