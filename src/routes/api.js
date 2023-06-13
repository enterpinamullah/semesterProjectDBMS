import express from 'express';
import validate from 'express-validation';
import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';
import * as insuranceController from '../controllers/insurance/insurance.controller';
import * as practitionerController from '../controllers/practitioner/practitioner.controller';
import * as patientController from '../controllers/patient/patient.controller';
import * as medicationRequestController from '../controllers/medicationRequest/medicationRequest.controller';
import * as observationVitalSignsController from '../controllers/observationVitalSigns/observationVitalSigns.controller';
import * as observationLaboratoryController from '../controllers/observationLabs/observationLabs.controller';
import * as coverageController from '../controllers/coverage/coverage.controller';
import * as proceduresController from '../controllers/procedures/procedures.controller';
import * as medicationStatementController from '../controllers/medicationStatement/medicationStatement.controller';
import * as allergyIntoleranceController from '../controllers/allergyIntolerance/allergyIntolerance.controller';
import * as immunizationController from '../controllers/immunization/immunization.controller';
import * as conditionController from '../controllers/condition/condition.controller';
import * as encounterController from '../controllers/encounter/encounter.controller';
import * as medicationKnowledgeController from '../controllers/medicationKnowledge/medicationKnowledge.controller';
import * as claimsController from '../controllers/claims/claims.controller';


const router = express.Router();

//= ===============================
// API routes
//= ===============================
router.get('/v1/me', userController.profile);
router.post(
  '/v1/changePassword',
  validate(userValidator.changePassword),
  userController.changePassword,
);

// Insurance routes
router.get('/v1/insurance', insuranceController.getAllInsurances);
router.get('/v1/insurance/:insuranceId', insuranceController.getInsuranceById);
router.post('/v1/insurance', insuranceController.createInsurance);
router.put('/v1/insurance/:insuranceId', insuranceController.updateInsurance);
router.delete('/v1/insurance/:insuranceId', insuranceController.deleteInsurance);

// Practitioner routes
router.get('/v1/practitioner', practitionerController.getAllPractitioners);
router.get('/v1/practitioner/:practitionerId', practitionerController.getPractitionerById);
router.post('/v1/practitioner', practitionerController.createPractitioner);
router.put('/v1/practitioner/:practitionerId', practitionerController.updatePractitioner);
router.delete('/v1/practitioner/:practitionerId', practitionerController.deletePractitioner);

// Patient routes
router.get('/v1/patient', patientController.getAllPatients);
router.get('/v1/patient/:id', patientController.getPatientById);
router.post('/v1/patient', patientController.createPatient);
router.put('/v1/patient/:id', patientController.updatePatient);
router.delete('/v1/patient/:id', patientController.deletePatient);
router.get('/v1/patient/:patientId/resources', patientController.getPatientResources);


// Observation Vital Signs routes
router.get('/v1/observation/vitalsigns', observationVitalSignsController.getAllVitalSigns);
router.get('/v1/observation/vitalsigns/:observationVitalSignsId', observationVitalSignsController.getVitalSignsById);
router.get('/v1/observation/vitalsigns/patient/:patientId', observationVitalSignsController.getVitalSignsByPatientId);
router.post('/v1/observation/vitalsigns', observationVitalSignsController.createVitalSigns);
router.put('/v1/observation/vitalsigns/:observationVitalSignsId', observationVitalSignsController.updateVitalSigns);
router.delete('/v1/observation/vitalsigns/:observationVitalSignsId', observationVitalSignsController.deleteVitalSigns);

// Observation Laboratory routes
router.get('/v1/observation/laboratory', observationLaboratoryController.getAllLaboratory);
router.get('/v1/observation/laboratory/:observationLaboratoryId', observationLaboratoryController.getLaboratoryById);
router.get('/v1/observation/laboratory/patient/:patientId', observationLaboratoryController.getLaboratoryByPatientId);
router.post('/v1/observation/laboratory', observationLaboratoryController.createLaboratory);
router.put('/v1/observation/laboratory/:observationLaboratoryId', observationLaboratoryController.updateLaboratory);
router.delete('/v1/observation/laboratory/:observationLaboratoryId', observationLaboratoryController.deleteLaboratory);

// Allergy Intolerance routes
router.get('/v1/allergy', allergyIntoleranceController.getAllAllergyIntolerances);
router.get('/v1/allergy/:allergyIntoleranceId', allergyIntoleranceController.getAllergyIntoleranceById);
router.get('/v1/allergy/patient/:patientId', allergyIntoleranceController.getAllergyByPatientId);
router.post('/v1/allergy', allergyIntoleranceController.createAllergyIntolerance);
router.put('/v1/allergy/:allergyIntoleranceId', allergyIntoleranceController.updateAllergyIntolerance);
router.delete('/v1/allergy/:allergyIntoleranceId', allergyIntoleranceController.deleteAllergyIntolerance);

// Immunization routes
router.get('/v1/immunization', immunizationController.getAllImmunizations);
router.get('/v1/immunization/:immunizationId', immunizationController.getImmunizationById);
router.get('/v1/immunization/patient/:patientId', immunizationController.getImmunizationByPatientId);
router.post('/v1/immunization', immunizationController.createImmunization);
router.put('/v1/immunization/:immunizationId', immunizationController.updateImmunization);
router.delete('/v1/immunization/:immunizationId', immunizationController.deleteImmunization);

// Procedures routes
router.get('/v1/procedures', proceduresController.getAllProcedures);
router.get('/v1/procedures/:procedureId', proceduresController.getProcedureById);
router.get('/v1/procedures/patient/:patientId', proceduresController.getProcedureByPatientId);
router.post('/v1/procedures', proceduresController.createProcedure);
router.put('/v1/procedures/:procedureId', proceduresController.updateProcedure);
router.delete('/v1/procedures/:procedureId', proceduresController.deleteProcedure);

// Condition routes
router.get('/v1/condition', conditionController.getAllConditions);
router.get('/v1/condition/:conditionId', conditionController.getConditionById);
router.get('/v1/condition/patient/:patientId', conditionController.getConditionByPatientId);
router.post('/v1/condition', conditionController.createCondition);
router.put('/v1/condition/:conditionId', conditionController.updateCondition);
router.delete('/v1/condition/:conditionId', conditionController.deleteCondition);

// Encounter routes
router.get('/v1/encounter', encounterController.getAllEncounters);
router.get('/v1/encounter/:encounterId', encounterController.getEncounterById);
router.get('/v1/encounter/patient/:patientId', encounterController.getEncounterByPatientId);
router.post('/v1/encounter', encounterController.createEncounter);
router.put('/v1/encounter/:encounterId', encounterController.updateEncounter);
router.delete('/v1/encounter/:encounterId', encounterController.deleteEncounter);

// Medication Knowledge routes
router.get('/v1/medicationknowledge', medicationKnowledgeController.getAllMedicationKnowledge);
router.get('/v1/medicationknowledge/:medicationKnowledgeId', medicationKnowledgeController.getMedicationKnowledgeById);
router.post('/v1/medicationknowledge', medicationKnowledgeController.createMedicationKnowledge);
router.put('/v1/medicationknowledge/:medicationKnowledgeId', medicationKnowledgeController.updateMedicationKnowledge);
router.delete('/v1/medicationknowledge/:medicationKnowledgeId', medicationKnowledgeController.deleteMedicationKnowledge);

// Medication Request routes
router.get('/v1/medicationrequest', medicationRequestController.getAllMedicationRequests);
router.get('/v1/medicationrequest/:medicationRequestId', medicationRequestController.getMedicationRequestById);
router.get('/v1/medicationrequest/patient/:patientId', medicationRequestController.getMedicationRequestByPatientId);
router.post('/v1/medicationrequest', medicationRequestController.createMedicationRequest);
router.put('/v1/medicationrequest/:medicationRequestId', medicationRequestController.updateMedicationRequest);
router.delete('/v1/medicationrequest/:medicationRequestId', medicationRequestController.deleteMedicationRequest);

// Coverage routes
router.get('/v1/coverage', coverageController.getAllCoverages);
router.get('/v1/coverage/:coverageId', coverageController.getCoverageById);
router.get('/v1/coverage/patient/:patientId', coverageController.getCoverageByPatientId);
router.post('/v1/coverage', coverageController.createCoverage);
router.put('/v1/coverage/:coverageId', coverageController.updateCoverage);
router.delete('/v1/coverage/:coverageId', coverageController.deleteCoverage);

// Claims routes
router.get('/v1/claims', claimsController.getAllClaims);
router.get('/v1/claims/:claimId', claimsController.getClaimById);
router.get('/v1/claims/coverage/:coverageId', claimsController.getClaimByCoverageId);
router.post('/v1/claims', claimsController.createClaim);
router.put('/v1/claims/:claimId', claimsController.updateClaim);
router.delete('/v1/claims/:claimId', claimsController.deleteClaim);

// Medication Statement routes
router.get('/v1/medicationstatement', medicationStatementController.getAllMedicationStatements);
router.get('/v1/medicationstatement/:medicationStatementId', medicationStatementController.getMedicationStatementById);
router.post('/v1/medicationstatement', medicationStatementController.createMedicationStatement);
router.put('/v1/medicationstatement/:medicationStatementId', medicationStatementController.updateMedicationStatement);
router.delete('/v1/medicationstatement/:medicationStatementId', medicationStatementController.deleteMedicationStatement);

module.exports = router;