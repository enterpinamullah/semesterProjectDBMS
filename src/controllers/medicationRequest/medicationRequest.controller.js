

const { MedicationRequest } = require('../../models');



exports.getAllMedicationRequests = async (req, res) => {
  try {
    const medicationRequests = await MedicationRequest.findAll();
    res.status(200).json(medicationRequests);
  } catch (error) {
    console.error('Error retrieving medication requests:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



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
