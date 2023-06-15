import jwt from 'jsonwebtoken';
import crypto, { randomUUID } from 'crypto';
import { User, VerificationCodes, Patient } from '../../models';
import { successResponse, errorResponse, uniqueId } from '../../helpers';
import { mailService } from '../../../utils/nodemailer';
// export const getUsers = async (req, res) => {
//   try {
//     // const page = req.params.page || 1;
//     // const limit = 2;
//     // const users = await User.findAndCountAll({
//     //   order: [['createdAt', 'DESC'], ['firstName', 'ASC']],
//     //   offset: (page - 1) * limit,
//     //   limit,
//     // });
//     // eslint-disable-next-line camelcase
//     const { user_uuid } = req.user;
//     const user = await User.findOne({
//       where: { user_uuid },
//     });
//     return successResponse(req, res, { user });
//   } catch (error) {
//     return errorResponse(req, res, error.message);
//   }
// };

export const register = async (req, res) => {
  try {
    const {
      email, password, firstName, lastName,
    } = req.body;

    const user = await User.findOne({
      where: { email },
    });
    if (user) {
      throw new Error('User already exists with same email');
    }
    const reqPass = crypto
      .createHash('md5')
      .update(password)
      .digest('hex');
    const payload = {
      user_uuid: randomUUID(),
      email,
      firstName,
      lastName,
      password: reqPass,
      isVerified: false,
      verifyToken: uniqueId(),
    };

    const newUser = await User.create(payload);
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const verificationCodePayload = {
      code_id: randomUUID(),
      user_uuid: newUser.dataValues.user_uuid,
      email: newUser.dataValues.email,
      code: randomNumber,
      expires: new Date(Date.now() + 9999999),
    };
    const codeCreated = await VerificationCodes.create(verificationCodePayload);
    mailService({
      to: newUser.dataValues.email,
      subject: 'Account Verification Code',
      body: `Your verification code is ${codeCreated.dataValues.code}`,
    });
    return successResponse(req, res, { newUser });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if (!user) {
      throw new Error('Incorrect Email Id/Password');
    } else if (user.dataValues.isVerified === false) {
      throw new Error(`Please verify your account first`);
    // eslint-disable-next-line no-empty
    } else {}
    const reqPass = crypto
      .createHash('md5')
      .update(req.body.password || '')
      .digest('hex');
    if (reqPass !== user.password) {
      throw new Error('Incorrect Email Id/Password');
    }
    const token = jwt.sign(
      {
        user: {
          user_uuid: user.id,
          email: user.email,
          createdAt: new Date(),
        },
      },
      process.env.SECRET, { expiresIn: '28800s' },
    );
    delete user.dataValues.password;
    return successResponse(req, res, { user, token });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const verifyRegistration = async (req, res) => {
  try {
    const verificationCode = await VerificationCodes.findOne({
      where: { email: req.body.email },
    });
    if (!verificationCode || (Date.now() > verificationCode.dataValues.expires)) {
      throw new Error('Please resend verification Code!');
    }
    if (req.body.verificationCode !== verificationCode.dataValues.code) {
      throw new Error('Incorrect Verification code!');
    }
    await User.update({ isVerified: true },
      { where: { email: req.body.email } });
    await VerificationCodes.destroy({ where: { code_id: verificationCode.dataValues.code_id } });
    return successResponse(req, res, { message: 'Verification Successful' });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const connectPatient = async (req,res) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    });
    if(!user){
      throw new Error('User with the given Email not found!')
    }
    if (user.dataValues.patientId) {
      throw new Error('patientId exists already for User');
    }
    const patient = await Patient.findOne({
      where: { patientId: req.body.patientId },
    });
    if(!patient){
      throw new Error('Sorry but we have not yet received your data!');
    }
    await User.update({ patientId: req.body.patientId },
      { where: { email: req.body.email } });
    return successResponse(req, res, { message: 'User connected with Master Patient Successful' });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
}
export const resendOTP = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      throw new Error('User not found');
    }
    const verificationCode = await VerificationCodes.findOne({
      where: { email: req.body.email },
    });
    if (verificationCode && (Date.now() > verificationCode.dataValues.expires)) {
      await VerificationCodes.destroy({ where: { code_id: verificationCode.dataValues.code_id } });
    } else if (verificationCode && (Date.now() < verificationCode.dataValues.expires)) {
      mailService({
        to: user.dataValues.email,
        subject: 'Account Verification Code',
        body: `Your verification code is ${verificationCode.dataValues.code}`,
      });
      return successResponse(req, res, { message: 'Verification code sent successfully' });
    // eslint-disable-next-line no-empty
    } else {}

    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const verificationCodePayload = {
      code_id: randomUUID(),
      user_uuid: user.dataValues.user_uuid,
      email: user.dataValues.email,
      code: randomNumber,
      expires: new Date(Date.now() + 9999999),
    };
    const codeCreated = await VerificationCodes.create(verificationCodePayload);
    mailService({
      to: user.dataValues.email,
      subject: 'Account Verification Code',
      body: `Your verification code is ${codeCreated.dataValues.code}`,
    });
    return successResponse(req, res, { message: 'Verification code sent successfully' });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
export const profile = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { user_uuid } = req.user;
    const user = await User.findOne({ where: { user_uuid } });
    return successResponse(req, res, { user });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      throw new Error('User not found');
    }
    const passResetCode = await VerificationCodes.findOne({
      where: { email: req.body.email },
    });
    if (passResetCode && (Date.now() > passResetCode.dataValues.expires)) {
      await VerificationCodes.destroy({ where: { code_id: passResetCode.dataValues.code_id } });
    } else if (passResetCode && (Date.now() < passResetCode.dataValues.expires)) {
      mailService({
        to: user.dataValues.email,
        subject: 'Password Reset Code',
        body: `Your Password Reset Code is: ${passResetCode.dataValues.code}`,
      });
      return successResponse(req, res, { message: 'Password Reset Code sent successfully' });
    // eslint-disable-next-line no-empty
    } else {}
    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    const passResetCodePayload = {
      code_id: randomUUID(),
      user_uuid: user.dataValues.user_uuid,
      email: req.body.email,
      code: randomNumber,
      expires: new Date(Date.now() + 9999999),
    };
    const codeCreated = await VerificationCodes.create(passResetCodePayload);
    mailService({
      to: user.dataValues.email,
      subject: 'Password Reset Code',
      body: `Your Password Reset code is ${codeCreated.dataValues.code}`,
    });
    return successResponse(req, res, { message: 'Password reset code sent to email!' });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const resetPassword = async (req, res) => {
  try {
    const passResetCodeInDB = await VerificationCodes.findOne({
      where: { email: req.body.email },
    });
    if (!passResetCodeInDB || (Date.now() > passResetCodeInDB.dataValues.expires)) {
      throw new Error('Please go and click forgot password to get password reset code!');
    }
    if (req.body.passwordReset !== passResetCodeInDB.dataValues.code) {
      throw new Error('Incorrect Password reset code!');
    }
    const newPass = passResetCodeInDB.dataValues.code + Math.floor(100000 + Math.random() * 900000)
    const reqPass = crypto
      .createHash('md5')
      .update(newPass || '')
      .digest('hex');
    await User.update({ password: reqPass },
      { where: { email: req.body.email } });
    await VerificationCodes.destroy({ where: { code_id: passResetCodeInDB.dataValues.code_id } });
    mailService({
      to: passResetCodeInDB.dataValues.email,
      subject: 'Password Reset Successful',
      body: `Your Password has been reset successfully. Your new password is: ${newPass}`,
    });
    return successResponse(req, res, { message: 'Your new password has been sent to your Email!' });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};

export const changePassword = async (req, res) => {
  try {
    // eslint-disable-next-line camelcase
    const { user_uuid } = req.user;
    const user = await User.findOne({
      where: { user_uuid },
    });

    const reqPass = crypto
      .createHash('md5')
      .update(req.body.oldPassword)
      .digest('hex');
    if (reqPass !== user.password) {
      throw new Error('Old password is incorrect');
    }

    const newPass = crypto
      .createHash('md5')
      .update(req.body.newPassword)
      .digest('hex');

    await User.update({ password: newPass }, { where: { user_uuid: user.user_uuid } });
    return successResponse(req, res, {});
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
