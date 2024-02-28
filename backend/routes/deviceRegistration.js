// routes/registration.js
const express = require('express');
const router = express.Router();
const Inventorys = require('../models/Inventory');
const multer = require('multer');
const path = require('path');

// Multer configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Destination folder for storing images
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// POST create a new user with image upload
router.post('/', upload.single('equipmentImage'), async (req, res) => {
  const {  equipmentName, model, serialNumber, equipmentDepartment,
    equipmentDescription, maintenanceHistory, manufacturer,
    countryOfOrigin, warrantyExpiryDate, status } = req.body;
  const equipmentImage = req.file ? req.file.path : null; // Store image path if uploaded, otherwise null

  try {
    const newDevice = await Inventorys.create({ equipmentName, model, serialNumber, equipmentDepartment,
        equipmentDescription, maintenanceHistory, manufacturer,
        countryOfOrigin, warrantyExpiryDate,equipmentImage, status});
    res.json(newDevice);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// GET all devices
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventorys.findAll({
      where:{
        status: 'Active'
      }
    });
    res.json(inventory);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
///////////////////////////////////////
router.get('/Piechart', async (req, res) => {
  try {
    // Fetch data from the database
    const inventory = await Inventorys.findAll();
    // Process data to get counts by category
    const countsByCategory = {};
    inventory.forEach(item => {
      countsByCategory[item.status] = countsByCategory[item.status] ? countsByCategory[item.status] + 1 : 1;
    });

    // Convert data to format expected by frontend
    const pieChartData = Object.keys(countsByCategory).map(status => ({
      status,
      count: countsByCategory[status]
    }));
    res.json(pieChartData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
/////////////////////////////////////////////////
router.get('/byDepartment', async (req, res) => {
  try {
    // Fetch data from the database
    const inventory = await Inventorys.findAll();
    // Process data to get counts by category
    const countsByCategory = {};
    inventory.forEach(item => {
      countsByCategory[item.equipmentDepartment] = countsByCategory[item.equipmentDepartment] ? countsByCategory[item.equipmentDepartment] + 1 : 1;
    });

    // Convert data to format expected by frontend
    const pieChartData = Object.keys(countsByCategory).map(equipmentDepartment => ({
      equipmentDepartment,
      count: countsByCategory[equipmentDepartment]
    }));
    res.json(pieChartData);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
////////////////////////////////////////////////


router.get('/disposed', async (req, res) => {
  try {
    const disposed = await Inventorys.findAll({
      where: {
        status : 'disposed'
      }
    });
    res.json(disposed);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

//post by device id
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    let disposal = await Inventorys.findByPk(req.params.id);
    if (!disposal) {
      return res.status(404).json({ msg: ' not found' });
    }
    disposal.status = status;
    await disposal.save();
    res.json(disposal);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// DELETE a device by ID
router.delete('/:id', async (req, res) => {
  const deviceId = req.params.id;
  try {
    const deletedDevice = await Disposed.destroy({
      where: {
        id: deviceId
      }
    });

    if (deletedDevice) {
      res.json({ message: 'Device deleted successfully' });
    } else {
      res.status(404).json({ error: 'Device not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});



router.get('/getByDepartment', async(req, res) => {
 try{
  const equipment = req.query.equipmentDepartment;
  const devices = await Inventorys.findAll({
    where:{
        equipmentDepartment: equipment
    }
  });
  // Send the filtered equipments as response
  res.json(devices);
  console.log('devices:',devices);
 }catch(error){
     console.error(error.message);
 } 
});

//get by id
router.get('/getById', async(req,res)=>{
  try{
    const equipment = req.query.id;
  const devices = await Inventorys.findAll({
    where:{
      id: equipment
  }
  })
  res.json(devices);

  }catch(error){
    console.error('the error is:', error.message);
  }
  
})

module.exports = router;
