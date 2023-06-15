

const { Encounter } = require('../../models');



exports.getAllEncounters = async (req, res) => {
  try {
    const encounters = await Encounter.findAll();
    res.status(200).json(encounters);
  } catch (error) {
    console.error('Error retrieving encounters:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getEncounterById = async (req, res) => {
  const { encounterId } = req.params;
  try {
    const encounter = await Encounter.findByPk(encounterId);
    if (!encounter) {
      return res.status(404).json({ message: 'Encounter not found' });
    }
    res.status(200).json(encounter);
  } catch (error) {
    console.error('Error retrieving encounter:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.createEncounter = async (req, res) => {
  const { patientId, practitionerId, date, diagnosis,  type } = req.body;
  try {
    const encounter = await Encounter.create({ patientId, practitionerId, date, diagnosis, class: req.body.class, type });
    res.status(201).json(encounter);
  } catch (error) {
    console.error('Error creating encounter:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.updateEncounter = async (req, res) => {
  const { encounterId } = req.params;
  const { patientId, practitionerId, date, diagnosis,  type } = req.body;
  try {
    const encounter = await Encounter.findByPk(encounterId);
    if (!encounter) {
      return res.status(404).json({ message: 'Encounter not found' });
    }
    await encounter.update({ patientId, practitionerId, date, diagnosis, class:req.body.class, type });
    res.status(200).json(encounter);
  } catch (error) {
    console.error('Error updating encounter:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getEncounterByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const encounter = await Encounter.findAll({ where: { patientId } });
    res.json(encounter);
  } catch (error) {
    console.error('Error retrieving Encounter:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.deleteEncounter = async (req, res) => {
  const { encounterId } = req.params;
  try {
    const encounter = await Encounter.findByPk(encounterId);
    if (!encounter) {
      return res.status(404).json({ message: 'Encounter not found' });
    }
    await encounter.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting encounter:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
