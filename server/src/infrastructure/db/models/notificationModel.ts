import mongoose, { Schema, model } from "mongoose";
import { Notification } from "../../../entities/notification";

const notificaionSchema = new Schema<Notification>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const NotificationModel = model("Notification", notificaionSchema);
