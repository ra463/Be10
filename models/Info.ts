import mongoose, { Schema, model, Document } from "mongoose";

mongoose.Promise = global.Promise;

interface MInfo extends Document {
  message: string;
}

const infoSchema = new Schema<MInfo>(
  {
    message: {
      type: String,
      required: [true, "Message is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models?.Info || model<MInfo>("Info", infoSchema);
