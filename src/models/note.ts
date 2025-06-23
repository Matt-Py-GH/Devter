import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Note = models.note || model("note", NoteSchema);
export default Note;
