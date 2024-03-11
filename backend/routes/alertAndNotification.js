// routes/announcements.js
const express = require('express');
const router = express.Router();
const AlertAndNotifications = require('../models/AlertAndNotification');

// GET all announcements
router.get('/getByType', async (req, res) => {
    const {notificationType} = req.query;
  try {
    const notifications = await AlertAndNotifications.findAll({
        where:{
            NotificationType: notificationType
        }
    });
    res.json(notifications);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// POST create a new announcement
router.post('/', async (req, res) => {
  const { NotificationType } = req.body;
  try {
    const newNotification = await AlertAndNotifications.create({NotificationType});
    res.json(newNotification);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// DELETE an announcement
router.delete('/notification', async (req, res) => {
    const { notificationType } = req.query;
    try {
      const notifications = await AlertAndNotifications.findAll({
        where: {
          NotificationType: notificationType
        }
      });
      if (!notifications || notifications.length === 0) {
        return res.status(404).json({ msg: 'Notifications not found' });
      }
      await Promise.all(notifications.map(async notification => {
        await notification.destroy();
      }));
      res.json({ msg: 'Deleted' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });
  

module.exports = router;
