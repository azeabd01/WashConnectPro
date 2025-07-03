const Client = require('../../models/Client');

exports.getProfile = async (req, res) => {
    res.json({ client: req.client });
};

exports.updateProfile = async (req, res) => {
    const update = req.body;
    const client = await Client.findByIdAndUpdate(req.client._id, update, { new: true });
    res.json({ client });
};
