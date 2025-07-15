import { Schema, model, models } from "mongoose";

const SnippetItemSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
  title: { type: String, required: true },
  description: { type: String },
  code: {type: String}
});

const Snippet = models.SnippetItem || model("SnippetItem", SnippetItemSchema)
export default Snippet;
