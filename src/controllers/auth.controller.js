import User from "../models/user.model.js";
import {
  sendEmail,
  emailVerificationContent,
  forgotPasswordEmailContent,
} from "../utils/mail.utils.js";
import asyncHandler from "express-async-handler";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const userRefreshToken = await user.generateRefreshToken();
    const userAccessToken = await user.generateAccessToken();
    user.refreshToken = userRefreshToken;
    user.userAccessToken = userAccessToken;
    await user.save({ validateBeforeSave: false });
    return { userAccessToken, userRefreshToken };
  } catch (error) {
    throw new ApiError(500, "Error generating tokens", [error.message]);
  }
};

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, username, password } = req.body;
  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    throw new ApiError(
      409,
      "User with the provided username or email already exists in our database.",
      []
    );
  }

  const user = await User.create({
    name,
    email,
    username,
    password,
  });

  const { unhasedToken, hashedToken, tokenExpiry } =
    user.createTemporaryToken();
  user.emailVerificationToken = hashedToken;
  user.emailVerificationTokenExpiry = tokenExpiry;
  await user.save();

  const verificationLink = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/verify-email/${unhasedToken}/${user?.email}`;
  const mailOptions = {
    receiverEmail: user.email,
    subject: `Email Verification - ${process?.env?.WEBSITE_NAME}`,
    mailgenContent: emailVerificationContent(user.username, verificationLink),
  };

  const createdUser = User.findById(user._id).select(
    "-password, -refreshToken, -emailVerificationToken, -emailVerificationTokenExpiry, -resetPasswordToken, -resetPasswordTokenExpiry"
  );
  await sendEmail(mailOptions);
  if (!createdUser) {
    throw new ApiError(500, "Error creating user", []);
  }
  res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "User registered. An email to verify the email address has been sent to the user",
        { user }
      )
    );
});

export { registerUser, generateAccessAndRefreshTokens };
