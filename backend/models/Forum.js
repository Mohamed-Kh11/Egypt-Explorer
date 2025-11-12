import mongoose from "mongoose";

const ForumSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },     // user's display name at time of posting
    email: { type: String, required: true },    // user's email
    content: { type: String, required: true, maxlength: 2000 }, // the post text
    date: { type: Date, default: Date.now },    // timestamp of the post
  },
  { timestamps: true, collection: "forum" }
);

export default mongoose.models.Forum || mongoose.model("Forum", ForumSchema);
