// Import the Patient model
const { Patient,
  ObservationVitalSigns,
  ObservationLaboratory,
  AllergyIntolerance,
  Immunization,
  Procedures,
  Condition,
  Encounter,
  MedicationRequest,
  Coverage} = require('../../models');

// Get all patients
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.findAll();
    res.status(200).json(patients);
  } catch (error) {
    console.error('Error retrieving patients:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Get patient by ID
exports.getPatientById = async (req, res) => {
  const { id } = req.params;
  try {
    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error retrieving patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Create a new patient
exports.createPatient = async (req, res) => {
  const { name, dob, cnic, telephone, email, address, insuranceId } = req.body;
  try {
    const patient = await Patient.create({ name, dob, cnic, telephone, email, address, insuranceId });
    res.status(201).json(patient);
  } catch (error) {
    console.error('Error creating patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Update an existing patient
exports.updatePatient = async (req, res) => {
  const { patientId } = req.params;
  const { name, dob, cnic, telephone, email, address, insuranceId } = req.body;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await patient.update({ name, dob, cnic, telephone, email, address, insuranceId });
    res.status(200).json(patient);
  } catch (error) {
    console.error('Error updating patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Delete a patient
exports.deletePatient = async (req, res) => {
  const { patientId } = req.params;
  try {
    const patient = await Patient.findByPk(patientId);
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    await patient.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting patient:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Controller function to retrieve all resources linked to a patient
exports.getPatientResources = async (req, res) => {
  const { patientId } = req.params;

  try {
    // Find the patient by ID
    const patient = await Patient.findOne({
      where: { patientId },
      include: [
        ObservationVitalSigns,
        ObservationLaboratory,
        AllergyIntolerance,
        Immunization,
        Procedures,
        Condition,
        Encounter,
        MedicationRequest,
        Coverage,
      ],
    });

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }


    // Return the linked resources
    return res.json(patient.dataValues);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server error' });
  }
};