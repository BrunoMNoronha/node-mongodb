const { connect } = require('../src/lib/mongo');
const Person = require('../src/models/person');

module.exports = async (req, res) => {
  try {
    await connect();

    if (req.method === 'GET') {
      const list = await Person.find().lean();
      return res.status(200).json(list);
    }

    if (req.method === 'POST') {
      const { name, email, age } = req.body;
      if (!name || !email) return res.status(400).json({ error: 'name and email are required' });
      const created = await Person.create({ name, email, age });
      return res.status(201).json(created);
    }

    res.setHeader('Allow', 'GET,POST');
    return res.status(405).end();
  } catch (err) {
    console.error('api/persons error', err);
    if (err && err.code === 11000) return res.status(409).json({ error: 'email duplicado' });
    return res.status(500).json({ error: 'server error' });
  }
};
