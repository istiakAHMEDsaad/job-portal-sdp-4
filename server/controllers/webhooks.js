import { Webhook } from 'svix';
import User from '../models/User.js';
import { CLERK_WEBHOOK_SECRET } from '../config/env.js';

// API Controller Function to Manage Clerk User with database
export const clerkWebhooks = async (req, res) => {
  try {
    const whook = new Webhook(CLERK_WEBHOOK_SECRET);

    const payload = req.body.toString(); // raw string

    const evt = whook.verify(payload, {
      'svix-id': req.headers['svix-id'],
      'svix-timestamp': req.headers['svix-timestamp'],
      'svix-signature': req.headers['svix-signature'],
    });

    const { data, type } = evt;

    // switch case for different events (user.created / email.created)
    switch (type) {
      case 'user.created': {
        const userData = {
          _id: data.id,
          email: data.email_addresses[0].email_address,
          name: data.first_name + ' ' + data.last_name,
          image: data.image_url,
          resume: '',
        };

        await User.create(userData);
        res
          .status(201)
          .json({ success: true, message: 'Account Created Successfully' });
        break;
      }

      case 'user.updated': {
        const userData = {
          email: data.email_addresses[0].email_address,
          name: data.first_name + ' ' + data.last_name,
          image: data.image_url,
        };

        await User.findByIdAndUpdate(data.id, userData);
        res.status(200).json({ success: true });
        break;
      }

      case 'user.deleted': {
        await User.findByIdAndDelete(data.id);
        res.status(200).json({ success: true });
        break;
      }

      default:
        return res.status(200).json({ received: true });
    }
  } catch (err) {
    console.log(err.message);
    res.status(400).json({ success: false, message: 'Webhook error' });
  }
};
