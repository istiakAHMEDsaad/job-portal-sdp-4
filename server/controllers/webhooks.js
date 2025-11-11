import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // Create Svix webhook instance with clerk webhook secret
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // verifying headers
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // getting data from the request body
    const { data, type } = req.body;

    // switch case for different events
    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          userName: data.username,
          image: data.image_url,
          resume: "",
        };

        await User.create(userData);
        res.status(200).json({ success: true });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + " " + data.last_name,
          userName: data.username,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.status(200).json({ success: true });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        res.status(200).json({ success: true });
        break;
      }

      default:
        break;
    }
  } catch (err) {
    console.error("Webhook error:", err.message);
    res.status(400).json({ success: false, message: "Webhook error" });
  }
};
