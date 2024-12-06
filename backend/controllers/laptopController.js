const Laptop = require('../models/Laptop');

// Add a laptop
exports.addLaptop = async (req, res) => {
  try {
    const { brand, model, serialNumber, status, purchaseDate } = req.body;

    const newLaptop = new Laptop({
      brand,
      model,
      serialNumber,
      status,
      purchaseDate,
    });

    await newLaptop.save();
    res.status(201).json({ message: 'Laptop added successfully!', laptop: newLaptop });
  } catch (error) {
    console.error('Error adding laptop:', error);
    res.status(500).json({ message: 'Server error while adding laptop.' });
  }
};

// Get all laptops
exports.getLaptops = async (req, res) => {
  try {
    const laptops = await Laptop.find();
    res.status(200).json(laptops);
  } catch (error) {
    console.error('Error fetching laptops:', error);
    res.status(500).json({ message: 'Server error while fetching laptops.' });
  }
};

// Update laptop details
exports.updateLaptop = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedLaptop = await Laptop.findByIdAndUpdate(id, updates, { new: true });

    if (!updatedLaptop) {
      return res.status(404).json({ message: 'Laptop not found.' });
    }

    res.status(200).json({ message: 'Laptop updated successfully!', laptop: updatedLaptop });
  } catch (error) {
    console.error('Error updating laptop:', error);
    res.status(500).json({ message: 'Server error while updating laptop.' });
  }
};

// Delete a laptop
exports.deleteLaptop = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedLaptop = await Laptop.findByIdAndDelete(id);

    if (!deletedLaptop) {
      return res.status(404).json({ message: 'Laptop not found.' });
    }

    res.status(200).json({ message: 'Laptop deleted successfully!' });
  } catch (error) {
    console.error('Error deleting laptop:', error);
    res.status(500).json({ message: 'Server error while deleting laptop.' });
  }
};
