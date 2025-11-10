import { Webhook } from "svix";
import User from "../models/User.js";

export const clerkWebhooks = async (req, res) => {
  try {
    // Create Svix webhook instance
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    // Raw payload
    const payload = req.body.toString();
    const headers = {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    };

    // Verify signature
    await whook.verify(payload, headers);

    // Parse event data
    const event = JSON.parse(payload);
    const { data, type } = event;

    switch (type) {
      case "user.created": {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          userName: data.username,
          image: data.image_url,
          resume: "",
        };

        await User.create(userData);
        console.log("✅ User created:", userData.email);
        res.status(200).json({ success: true });
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`,
          userName: data.username,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        console.log("✏️ User updated:", userData.email);
        res.status(200).json({ success: true });
        break;
      }

      case "user.deleted": {
        await User.findByIdAndDelete(data.id);
        console.log("🗑️ User deleted:", data.id);
        res.status(200).json({ success: true });
        break;
      }

      default:
        res.status(200).json({ success: true });
        break;
    }
  } catch (err) {
    console.error("❌ Webhook error:", err.message);
    res.status(400).json({ success: false, message: "Webhook error" });
  }
};
