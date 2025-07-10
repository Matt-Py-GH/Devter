import { Schema, model, models } from "mongoose";

const CommandSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  command: { type: String, required: true }
});

const Command = models.CommandItem || model("CommandItem", CommandSchema)
export default Command;
