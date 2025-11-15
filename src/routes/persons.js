const express = require('express');
const router = express.Router();
const Person = require('../models/person');

// Create
router.post('/', async (req, res) => {
  try {
    const p = new Person(req.body);
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.code === 11000) { // duplicate key
      return res.status(409).json({ error: 'Email já existe' });
    }
    res.status(400).json({ error: err.message });
  }
});

// Read all
router.get('/', async (req, res) => {
  try {
    const list = await Person.find();
    res.json(list);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read one
router.get('/:id', async (req, res) => {
  try {
    const doc = await Person.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Pessoa não encontrada' });
    res.json(doc);
  } catch (err) {
    res.status(400).json({ error: 'ID inválido' });
  }
});

// Update
router.put('/:id', async (req, res) => {
  try {
    const updated = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ error: 'Pessoa não encontrada' });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete
router.delete('/:id', async (req, res) => {
  try {
    const removed = await Person.findByIdAndDelete(req.params.id);
    if (!removed) return res.status(404).json({ error: 'Pessoa não encontrada' });
    res.json({ message: 'Pessoa removida' });
  } catch (err) {
    res.status(400).json({ error: 'ID inválido' });
  }
});

module.exports = router;
