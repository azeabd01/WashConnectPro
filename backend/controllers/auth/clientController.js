const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');

exports.registerClient = async (req, res) => {
    try {
        const { name, email, password, phone, address } = req.body;

        const existing = await User.findOne({ email });
        if (existing) return res.status(400).json({ message: "Email already in use" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            phone,
            address
        });

        await user.save();
        res.status(201).json({ message: 'Client registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginClient = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await bcrypt.compare(password, user.password)))
            return res.status(401).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id: user._id, role: 'client' }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
