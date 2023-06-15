

const { Coverage } = require('../../models');



exports.getAllCoverages = async (req, res) => {
  try {
    const coverages = await Coverage.findAll();
    res.status(200).json(coverages);
  } catch (error) {
    console.error('Error retrieving coverages:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.getCoverageByPatientId = async (req, res) => {
    try {
      const { patientId } = req.params;
      const coverage = await Coverage.findAll({ where: { patientId } });
      res.json(coverage);
    } catch (error) {
      console.error('Error retrieving Coverage:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


exports.getCoverageById = async (req, res) => {
  const { coverageId } = req.params;
  try {
    const coverage = await Coverage.findByPk(coverageId);
    if (!coverage) {
      return res.status(404).json({ message: 'Coverage not found' });
    }
    res.status(200).json(coverage);
  } catch (error) {
    console.error('Error retrieving coverage:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.createCoverage = async (req, res) => {
  const { patientId, insuranceId, status, name } = req.body;
  try {
    const coverage = await Coverage.create({ patientId, insuranceId, status, name });
    res.status(201).json(coverage);
  } catch (error) {
    console.error('Error creating coverage:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.updateCoverage = async (req, res) => {
  const { coverageId } = req.params;
  const { patientId, insuranceId, status, name } = req.body;
  try {
    const coverage = await Coverage.findByPk(coverageId);
    if (!coverage) {
      return res.status(404).json({ message: 'Coverage not found' });
    }
    await coverage.update({ patientId, insuranceId, status, name });
    res.status(200).json(coverage);
  } catch (error) {
    console.error('Error updating coverage:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.deleteCoverage = async (req, res) => {
  const { patientId } = req.params;
  try {
    const coverage = await Coverage.findByPk(patientId);
    if (!coverage) {
      return res.status(404).json({ message: 'Coverage not found' });
    }
    await coverage.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting coverage:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
