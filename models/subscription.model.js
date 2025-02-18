import mongoose from "mongoose";

const subsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name is required"],
      minLength: 3,
      maxLength: 50,
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price can't be negative"],
    },
    currency: {
      type: String,
      enum: ["INR", "USD", "EUR", "GBP"],
      default: "INR",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "half-yearly", "yearly"],
      required: [true, "Frequency is required"],
    },
    category: {
      type: String,
      enum: [
        "sports",
        "entertainment",
        "education",
        "health",
        "food",
        "news",
        "lifestyle",
        "technology",
        "finance",
        "others",
      ],
      required: [true, "Category is required"],
      default: "others",
    },
    payment: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    startDate: {
      type: Date,
      required: true,
      validate: {
        validator: function (v) {
          return v <= new Date();
          //* new Date() returns current date
        },
        message: "Start date can't be in the future",
      },
    },
    renewalDate: {
      type: Date,
      validate: {
        validator: function (v) {
          return v > this.startDate;
          //* this.startDate refers to startDate field
        },
        message: "Renewal date must be after start date",
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      //* It's like having a pointer that connects a subscription to its specific user.
      ref: "User",
      required: true,
      index: true,
    },
  },
  { timestamps: true }
);

//* Auto-calculates the renewal date if not provided
//* This code runs right before a subscription is saved to the database.
subsSchema.pre("save", function (next) {
  if (!this.renewalDate) {
    const renewperiod = {
      daily: 1,
      weekly: 7,
      monthly: 30,
      "half-yearly": 180,
      yearly: 365,
    };

    this.renewalDate = new Date(this.startDate);
    //* creates a new Date object that copies the value of this.startDate and assigns it to this.renewalDate.
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewperiod[this.frequency]
    );
  }

  //* Auto-update the status if renewal date has expired
  if (this.renewalDate < new Date()) {
    this.status = "expired";
  }

  //~ it calls next() to let the saving process continue with all the changes applied.
  next();
});

const subsModel = mongoose.model("Subscription", subsSchema);

export default subsModel;
