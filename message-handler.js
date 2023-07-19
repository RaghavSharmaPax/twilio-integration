import 'dotenv/config'
import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken);

const { MessagingResponse } = Twilio.twiml
export { MessagingResponse }



const webhookUrl = "https://gentle-houses-march.loca.lt"
client.preview
    .twilio
    .update({
        smsUrl: webhookUrl
    })
    .then(sandbox => console.log('Webhook URL set for Twilio Sandbox:', sandbox.status))
    .catch(error => console.error('Error updating webhook URL for Twilio Sandbox:', error.message));

export default client;