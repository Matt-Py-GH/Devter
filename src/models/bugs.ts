import { Schema, model, models } from "mongoose";

const ErrorItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["bug", "fixing", "fixed"], default: "bug" },
});

const Error = models.ErrorItem || model("ErrorItem", ErrorItemSchema)
export default Error;
