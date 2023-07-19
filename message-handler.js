import 'dotenv/config'
import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken);

const { MessagingResponse } = Twilio.twiml
export { MessagingResponse }

client.chat.v2.services(process.env.TWILIO_MESSAGING_SERVICE_ID)
    .update({
        preWebhookUrl: process.env.TWILIO_WEBHOOK_URL,
        postWebhookUrl: process.env.TWILIO_WEBHOOK_URL,
        webhookMethod: 'POST'
    })
    .then(service => console.log(service.friendlyName));

export default client;