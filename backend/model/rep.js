import mongoose from "mongoose";

const repSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    reps: {
      type: Number,
      required: true,
    },

    waktu: {
      type: String,
      required: true,
    },
  },
  { Timestamp: true }
);

const Rep = mongoose.model("Rep", repSchema);

export default Rep;
