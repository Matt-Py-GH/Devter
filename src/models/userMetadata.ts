import { Schema, model, models } from "mongoose";

const UserMetadataSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true, unique: true },
  projectTitle: { type: String, default: "" },
});

const UserMetadata = models.UserMetadata || model("UserMetadata", UserMetadataSchema);
export default UserMetadata;
