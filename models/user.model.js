import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name is required"],
      trim: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: [true, "User Password is required"],
      minLength: 6,
    },
  },
  { timestamps: true }
);
//* timestamps creates createdAt and updatedAt fields in the database

//* Creating a model for user having userschema
const User = mongoose.model("User", userSchema);

export default User;
