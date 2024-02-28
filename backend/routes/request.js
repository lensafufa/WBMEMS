// routes/announcements.js
const express = require('express');
const router = express.Router();
const Request = require('../models/Request');

// GET all announcements
router.get('/', async (req, res) => {
  try {
    const request = await Request.findAll();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET a single announcement by ID
router.get('/request/:id', async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST create a new announcement
router.post('/', async (req, res) => {
  const { title, description, announcement_time, stat} = req.body;
  try {
    const newRequest = await Request.create({ title, description, announcement_time, stat});
    res.json(newRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.put('/:id', async (req, res) => {
  const { stat } = req.body;
  try {
    let request = await Request.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }
    request.stat = stat;
    await request.save();
    res.json(request);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.delete('/request/:id', async (req, res) => {
  try {
    const request = await Request.findByPk(req.params.id);
    if (!request) {
      return res.status(404).json({ msg: 'Request not found' });
    }
    await request.destroy();
    res.json({ msg: 'Request deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
