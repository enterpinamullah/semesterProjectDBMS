

const { Claims } = require('../../models');



exports.getAllClaims = async (req, res) => {
  try {
    const claims = await Claims.findAll();
    res.status(200).json(claims);
  } catch (error) {
    console.error('Error retrieving claims:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getClaimById = async (req, res) => {
  const { claimId } = req.params;
  try {
    const claim = await Claims.findByPk(claimId);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    res.status(200).json(claim);
  } catch (error) {
    console.error('Error retrieving claim:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.createClaim = async (req, res) => {
  const { medicationRequestId, coverageId, claimDate, claimAmount, description, status } = req.body;
  try {
    const claim = await Claims.create({ medicationRequestId, coverageId, claimDate, claimAmount, description, status });
    res.status(201).json(claim);
  } catch (error) {
    console.error('Error creating claim:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.updateClaim = async (req, res) => {
  const { claimId } = req.params;
  const { medicationRequestId, coverageId, claimDate, claimAmount, description, status } = req.body;
  try {
    const claim = await Claims.findByPk(claimId);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    await claim.update({ medicationRequestId, coverageId, claimDate, claimAmount, description, status });
    res.status(200).json(claim);
  } catch (error) {
    console.error('Error updating claim:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};



exports.getClaimByCoverageId = async (req, res) => {
  try {
    const { coverageId } = req.params;
    const claim = await Claims.findAll({ where: { coverageId } });
    res.json(claim);
  } catch (error) {
    console.error('Error retrieving Coverage:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.deleteClaim = async (req, res) => {
  const { claimId } = req.params;
  try {
    const claim = await Claims.findByPk(claimId);
    if (!claim) {
      return res.status(404).json({ message: 'Claim not found' });
    }
    await claim.destroy();
    res.status(204).end();
  } catch (error) {
    console.error('Error deleting claim:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
