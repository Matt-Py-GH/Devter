import { Schema, model, models } from "mongoose";

const NoteSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  content: {
    type: String,
  },
});

const Note = models.note || model("note", NoteSchema);
export default Note;
