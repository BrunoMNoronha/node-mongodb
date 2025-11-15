const { connect } = require('../../src/lib/mongo');
const Person = require('../../src/models/person');

module.exports = async (req, res) => {
  try {
    await connect();

    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'id é necessário' });

    if (req.method === 'GET') {
      const doc = await Person.findById(id).lean();
      if (!doc) return res.status(404).json({ error: 'Pessoa não encontrada' });
      return res.status(200).json(doc);
    }

    if (req.method === 'PUT') {
      const updated = await Person.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!updated) return res.status(404).json({ error: 'Pessoa não encontrada' });
      return res.status(200).json(updated);
    }

    if (req.method === 'DELETE') {
      const removed = await Person.findByIdAndDelete(id);
      if (!removed) return res.status(404).json({ error: 'Pessoa não encontrada' });
      return res.status(200).json({ message: 'Pessoa removida' });
    }

    res.setHeader('Allow', 'GET,PUT,DELETE');
    return res.status(405).end();
  } catch (err) {
    console.error('api/persons/[id] error', err);
    return res.status(500).json({ error: 'server error' });
  }
};
