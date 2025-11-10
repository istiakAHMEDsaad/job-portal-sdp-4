import { Webhook } from "svix";
import User from "../models/User.js";

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    // create a svix instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Veryfying header
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Getting data from request body
    const { data, type } = req.body; // user update, user delete, user edit, payload user

    // switch case for different events
    switch (type) {
      case "user.created": {
      }

      case "user.updated": {
      }

      case "user.deleted": {
      }

      default:
        break;
    }
  } catch (err) {
    console.error(err.message);
  }
};
