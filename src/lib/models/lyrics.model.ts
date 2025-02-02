import mongoose, { model, Model, Schema, Types } from "mongoose";

interface ILyric {
  title: string;
  user_id: Types.ObjectId;
  lyric: string;
  artist: string;
}

const lyricSchema = new Schema<ILyric>({
  title: { type: String, required: true },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  lyric: { type: String, required: true },
  artist: { type: String, required: false },
});

const Lyric: Model<ILyric, {}> =
  mongoose.models?.Lyric || model<ILyric>("Lyric", lyricSchema);

export default Lyric;
