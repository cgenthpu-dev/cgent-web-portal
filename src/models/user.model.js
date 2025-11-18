import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
const User = mongoose.model("User", userSchema);
export default User;
