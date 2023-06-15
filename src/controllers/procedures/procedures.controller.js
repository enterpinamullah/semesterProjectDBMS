
const { Procedures } = require('../../models');
exports.getAllProcedures = async (req, res) => {
  try {
    const procedures = await Procedures.findAll();
    res.status(200).json(procedures);
  } catch (error) {
    console.error('Error retrieving procedures:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getProcedureById = async (req, res) => {
  const { procedureId } = req.params;
  try {
    const procedure = await Procedures.findByPk(procedureId);
    if (!procedure) {
      return res.status(404).json({ message: 'Procedure not found' });
    }
    res.status(200).json(procedure);
  } catch (error) {
    console.error('Error retrieving procedure:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
exports.getProcedureByPatientId = async (req, res) => {
  const { patientId } = req.params;
  try {
    const procedure = await Procedures.findAll({
      where: {
        patientId
      }
    });
    if (!procedure) {
      return res.status(404).json({ message: 'Procedure not found' });
    }
    res.status(200).json(procedure);
  } catch (error) {
    console.error('Error retrieving procedure:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};


exports.createProcedure = async (req, res) => {
  const { name, description } = req.body;
  try {
    const procedure = await Procedures.create({ name, description });
    res.status(201).json(procedure);
  } catch (error) {
    console.error('Error creating procedure:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.updateProcedure = async (req, res) => {
  const { procedureId } = req.params;
  const { name, description } = req.body;
  try {
    const procedure = await Procedures.findByPk(procedureId);
    if (!procedure) {
      return res.status(404).json({ message: 'Procedure not found' });
    }
    await procedure.update({ name, description });
    res.status(200).json(procedure);
  } catch (error) {
    console.error('Error updating procedure:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.deleteProcedure = async (req, res) => {
  const { procedureId } = req.params;
  try {
    const procedure = await Procedures.findByPk(procedureId);
    if (!procedure) {
      return res.status(404).json({ message: 'Procedure not found' });
    }
    await procedure.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting procedure:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
