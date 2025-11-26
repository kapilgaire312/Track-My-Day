import { Schema, model, models } from "mongoose";

const activitySchema = new Schema({
  isSelected: { type: Boolean, required: true, default: false },
  value: { type: String },
  category: { type: String }
},
  { _id: false }
);

const finalSchema = new Schema(
  {
    date: { type: String, required: true },
    activity: { type: [activitySchema] }

  }
)

const activitiesSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },

  activities: { type: [finalSchema] },

}

)

const Activity = models?.Activity || model("Activity", activitiesSchema)

export default Activity