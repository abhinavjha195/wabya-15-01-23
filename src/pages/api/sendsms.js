// pages/api/sendSMS.js
import twilio from 'twilio';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { to, message } = req.body;

    // Initialize Twilio client with your credentials
    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    try {
      // Send SMS
      const result = await client.messages.create({
        body: message,
        to,
        from: process.env.TWILIO_PHONE_NUMBER,
      });

      // Return success response
      res.status(200).json({ success: true, messageSid: result.sid });
    } catch (error) {
      // Return error response
      //console.error(error);
      res.status(500).json({ success: false, error: "error" });
    }
  } else {
    // Return method not allowed response
    res.status(405).end();
  }
}
