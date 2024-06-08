import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  home_phone: {
    type: String,
    required: true,
  },
  work_phone: {
    type: String,
    required: true,
  },
});

export const People = mongoose.model("People", peopleSchema);
