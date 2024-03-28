const express = require('express');
const router = express.Router();
const Contract = require('../models/Contract');
const Inventory =require('../models/Inventory');
const Training = require('../models/Training');
router.get('/', async (req, res) => {
    try {
      const contracts = await Contract.findAll({
        
      });
      res.json(contracts);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  router.get('/training', async (req, res) => {
    try {
      const training = await Training.findAll({
        
      });
      res.json(training);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

router.post('/', async (req, res) => {
    try {
        // Parse request body to extract form data
        const formData = req.body;

        // Convert equipments array to string representation
        formData.equipments = JSON.stringify(formData.equipments);

        // Create a new instance of the Contract model with the validated data
        const newContract = await Contract.create(formData);

        // Send a success response with the newly created contract data
        res.status(201).json(newContract);
    } catch (error) {
        // Handle errors
        console.error('Error inserting contract data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/training', async (req, res) => {
  try {
      // Parse request body to extract form data
      const formData = req.body;

      // Create a new instance of the Contract model with the validated data
      const newTraining = await Training.create(formData);

      // Send a success response with the newly created contract data
      res.status(201).json(newTraining);
  } catch (error) {
      // Handle errors
      console.error('Error inserting training data:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});


router.get('/inventory', async (req, res) => {
  try {
    const equipments = await Inventory.findAll({
      where:{

      status:'Active',
      }
      
    });
    
    res.json(equipments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

  module.exports = router;