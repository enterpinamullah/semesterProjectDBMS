

const { MedicationKnowledge } = require('../../models');



exports.getAllMedicationKnowledge = async (req, res) => {
  try {
    const medicationKnowledge = await MedicationKnowledge.findAll();
    res.status(200).json(medicationKnowledge);
  } catch (error) {
    console.error('Error retrieving medication knowledge:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getMedicationKnowledgeById = async (req, res) => {
  const { medicationKnowledgeId } = req.params;
  try {
    const medicationKnowledge = await MedicationKnowledge.findByPk(medicationKnowledgeId);
    if (!medicationKnowledge) {
      return res.status(404).json({ message: 'Medication knowledge not found' });
    }
    res.status(200).json(medicationKnowledge);
  } catch (error) {
    console.error('Error retrieving medication knowledge:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.createMedicationKnowledge = async (req, res) => {
  const { name, status, price } = req.body;
  try {
    const medicationKnowledge = await MedicationKnowledge.create({ name, status, price });
    res.status(201).json(medicationKnowledge);
  } catch (error) {
    console.error('Error creating medication knowledge:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.updateMedicationKnowledge = async (req, res) => {
  const { medicationKnowledgeId } = req.params;
  const { name, status, price } = req.body;
  try {
    const medicationKnowledge = await MedicationKnowledge.findByPk(medicationKnowledgeId);
    if (!medicationKnowledge) {
      return res.status(404).json({ message: 'Medication knowledge not found' });
    }
    await medicationKnowledge.update({ name, status, price });
    res.status(200).json(medicationKnowledge);
  } catch (error) {
    console.error('Error updating medication knowledge:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.deleteMedicationKnowledge = async (req, res) => {
  const { medicationKnowledgeId } = req.params;
  try {
    const medicationKnowledge = await MedicationKnowledge.findByPk(medicationKnowledgeId);
    if (!medicationKnowledge) {
      return res.status(404).json({ message: 'Medication knowledge not found' });
    }
    await medicationKnowledge.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting medication knowledge:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
