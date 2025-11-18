import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    avatar: {
      type: {
        url: String,
        local_path: String,
      },
      default: {
        url: "",
        local_path: "",
      },
    },
    username: {
      type: String,
      unique: true,
      toLowerCase: true,
      index: true,
      required: [true, "Username is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      toLowerCase: true,
      required: [true, "Email is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    fullName: {
      type: String,
      required: [true, "Please enter your Full Name"],
      trim: true,
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationTokenExpiry: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiry: {
      type: Date,
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
    },
    process.env.accessTokenSecret,
    { expiresIn: process.env.accessTokenExpiry }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.refreshTokenSecret,
    { expiresIn: process.env.refreshTokenExpiry }
  );
};

userSchema.methods.createTemporaryToken = async function () {
  const unhashedToken = crypto.randomBytes(20).toString("hex");
  const hashedToken = crypto
    .createHash("sha256")
    .update(unhashedToken)
    .digest("hex");
  const tokenExpiry = Date.now + 20 * 60 * 1000;
  return { unhashedToken, hashedToken, tokenExpiry };
};
const User = mongoose.model("User", userSchema);
export default User;
