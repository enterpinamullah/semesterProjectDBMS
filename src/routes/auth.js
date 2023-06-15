import express from 'express';
import validate from 'express-validation';

import * as userController from '../controllers/user/user.controller';
import * as userValidator from '../controllers/user/user.validator';

const router = express.Router();




router.post(
    '/v1/login',
    validate(userValidator.login),
    userController.login,
  );
router.post(
  '/v1/register',
  validate(userValidator.register),
  userController.register,
);


router.post(
  '/v1/verifyRegistration',
  userController.verifyRegistration,
);
router.post(
  '/v1/resendOTP',
  userController.resendOTP,
);
router.post(
  '/v1/forgotPassword',
  userController.forgotPassword,
);
router.post(
  '/v1/resetPassword',
  userController.resetPassword,
);
router.post(
  '/v1/connectpatient',
  userController.connectPatient,
)
router.get(
  '/v1/serverStatus',
  async (req, res) => {
    try {
      return res.send('Server is up and running.');
    } catch (error) {
      return res.status(501).send(error.message);
    }
  }
);





module.exports = router;
