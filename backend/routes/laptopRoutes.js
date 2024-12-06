const express = require('express');
const { addLaptop, getLaptops, updateLaptop, deleteLaptop } = require('../controllers/laptopController');
const { authenticate, authorize } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/', authenticate, authorize(['admin']), addLaptop);
router.get('/', authenticate, getLaptops);
router.put('/:id', authenticate, authorize(['admin']), updateLaptop);
router.delete('/:id', authenticate, authorize(['admin']), deleteLaptop);

module.exports = router;
