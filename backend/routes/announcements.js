// routes/announcements.js
const express = require('express');
const router = express.Router();
const Announcement = require('../models/Announcement');

// GET all announcements
router.get('/', async (req, res) => {
  try {
    const announcements = await Announcement.findAll();
    res.json(announcements);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// GET a single announcement by ID
router.get('/announcements/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);
    if (!announcement) {
      return res.status(404).json({ msg: 'Announcement not found' });
    }
    res.json(announcement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST create a new announcement
router.post('/', async (req, res) => {
  const { title, description, announcement_time } = req.body;
  try {
    const newAnnouncement = await Announcement.create({ title, description, announcement_time});
    res.json(newAnnouncement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// PUT update an existing announcement
router.put('/announcements/:id', async (req, res) => {
  const { title, description, announcement_time } = req.body;
  try {
    let announcement = await Announcement.findByPk(req.params.id);
    if (!announcement) {
      return res.status(404).json({ msg: 'Announcement not found' });
    }
    announcement.title = title;
    announcement.description = description;
    announcement.announcement_time = announcement_time;
    await announcement.save();
    res.json(announcement);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE an announcement
router.delete('/announcements/:id', async (req, res) => {
  try {
    const announcement = await Announcement.findByPk(req.params.id);
    if (!announcement) {
      return res.status(404).json({ msg: 'Announcement not found' });
    }
    await announcement.destroy();
    res.json({ msg: 'Announcement deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
