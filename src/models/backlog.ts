import { Schema, model, models } from "mongoose";

const BacklogItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  status: { type: String, enum: ["todo", "doing", "done"], default: "todo" },
});

const Backlog = models.BacklogItem || model("BacklogItem", BacklogItemSchema)
export default Backlog;
