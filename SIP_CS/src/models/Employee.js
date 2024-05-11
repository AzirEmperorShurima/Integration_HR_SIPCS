import mongoose from "mongoose";


const EmployeeSchema = new mongoose.Schema({
  employeeId: {
    type: String,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  vacationDays: {
    type: Number,
    required: true,
  },
  paidToDate: {
    type: Number,
    required: true,
  },
  paidLastYear: {
    type: Number,
    required: true,
  },
  payRate: {
    type: Number,
    required: true,
  },
  payRateId: {
    type: Number,
    required: true,
  }
},
  {
    timestamps: true,
    versionKey: false,
  }
)

export default mongoose.model("employee", EmployeeSchema);