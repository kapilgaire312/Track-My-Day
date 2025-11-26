import { model, models, Schema } from "mongoose";


const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isNotVerified: { type: Boolean, default: true },
    verificationSentAt: { type: Date },
    activities: { type: Schema.Types.ObjectId, ref: 'Activity' }
  }
)


const User = models?.User || model("User", userSchema);

export default User