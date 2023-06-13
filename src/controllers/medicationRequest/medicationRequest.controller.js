// Import the MedicationRequest model
const { MedicationRequest } = require('../../models');

// Get all medication requests
exports.getAllMedicationRequests = async (req, res) => {
  try {
    const medicationRequests = await MedicationRequest.findAll();
    res.status(200).json(medicationRequests);
  } catch (error) {
    console.error('Error retrieving medication requests:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get MedicationRequest by Patient ID
exports.getMedicationRequestByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const medicationRequest = await MedicationRequest.findAll({ where: { patientId } });
    res.json(medicationRequest);
  } catch (error) {
    console.error('Error retrieving MedicationRequest:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
// Get medication request by ID
exports.getMedicationRequestById = async (req, res) => {
  const { medicationRequestId } = req.params;
  try {
    const medicationRequest = await MedicationRequest.findByPk(medicationRequestId);
    if (!medicationRequest) {
      return res.status(404).json({ message: 'Medication request not found' });
    }
    res.status(200).json(medicationRequest);
  } catch (error) {
    console.error('Error retrieving medication request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new medication request
exports.createMedicationRequest = async (req, res) => {
  const { patientId, medication, dosage, startDate, endDate } = req.body;
  try {
    const medicationRequest = await MedicationRequest.create({ patientId, medication, dosage, startDate, endDate });
    res.status(201).json(medicationRequest);
  } catch (error) {
    console.error('Error creating medication request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing medication request
exports.updateMedicationRequest = async (req, res) => {
  const { medicationRequestId } = req.params;
  const { patientId, medication, dosage, startDate, endDate } = req.body;
  try {
    const medicationRequest = await MedicationRequest.findByPk(medicationRequestId);
    if (!medicationRequest) {
      return res.status(404).json({ message: 'Medication request not found' });
    }
    await medicationRequest.update({ patientId, medication, dosage, startDate, endDate });
    res.status(200).json(medicationRequest);
  } catch (error) {
    console.error('Error updating medication request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a medication request
exports.deleteMedicationRequest = async (req, res) => {
  const { medicationRequestId } = req.params;
  try {
    const medicationRequest = await MedicationRequest.findByPk(medicationRequestId);
    if (!medicationRequest) {
      return res.status(404).json({ message: 'Medication request not found' });
    }
    await medicationRequest.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting medication request:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
