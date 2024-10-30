import { model, models, Schema, type InferSchemaType, type Model } from "mongoose";

const userSchema = new Schema(
   {
      name: { type: String, required: [true, "Please enter your full name"] },
      email: { type: String, required: [true, "Please enter your email"], unique: true, index: "ascending" },
   },
   { timestamps: true }
);

export type UserDocument = InferSchemaType<typeof userSchema>;

export const userModel: Model<UserDocument> = models.users ?? model("users", userSchema);
