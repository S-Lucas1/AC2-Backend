const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const user = new User({ name, email, password, role });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    console.log('User registered:', user); // Log de depuração
    res.status(201).json({ success: true, message: 'User created successfully' });
  } catch (error) {
    console.error('Error registering user:', error.message); // Log de depuração
    res.status(400).json({ success: false, error: error.message });
  }
};


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found:', email); // Log de depuração
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    console.log('User found:', user); // Log de depuração
    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch); // Log de depuração
    if (!isMatch) {
      console.log('Password does not match for user:', email); // Log de depuração
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    console.log('Login successful for user:', email); // Log de depuração
    res.json({ success: true, token });
  } catch (error) {
    console.error('Error during login:', error.message); // Log de depuração
    res.status(500).json({ success: false, error: error.message });
  }
};

