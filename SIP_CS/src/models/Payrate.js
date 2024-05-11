import mongoose from "mongoose";

const payrateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    value: {
      type: Number,
      default: 0,
    },
    taxPercentage: {
        type: Number,
        default: 0.1,
    },
    type: Number,
    amount: Number
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default mongoose.model("Payrate", payrateSchema);
