import 'dotenv/config'
import Twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = Twilio(accountSid, authToken);

const { MessagingResponse } = Twilio.twiml
export { MessagingResponse, Twilio }
export default client;