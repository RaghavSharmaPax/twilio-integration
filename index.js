import axios from 'axios';
import express from 'express';
import client, { MessagingResponse } from './message-handler.js';

const app = express();
const port = 3120;

app.use(
    express.urlencoded({
        extended: true,
    })
);

app.post('/', async (req, res) => {
    console.log('req of post', req)
    console.log('request body', req.body);
    client.messages(req.body.MessageSid).update({ body: '' }).then(_msg => console.log('redacted body from logs')).catch(err => console.log('message redaction failed', err));

    const engineRes = await axios.post(`http://127.0.0.1:8080/chatbotEngine?` + new URLSearchParams({
        JWT_TOKEN: `${process.env.CHATBOT_TOKEN}`
    }), { "type": "static", "input": { "type": "text", "message": "General_Greetings", "logMessage": false }, "additionalData": { "source": "web", "tla": "abc" } })
    console.log(engineRes.data)
    if (req.body.Body === "Hi") {
        client.messages
            .create({
                messagingServiceSid: "MGc112dfc10d82d553d50fdcb24d256f17",
                contentSid: 'HX68e97ded69be5fb751dc7035ee829275',
                from: 'whatsapp:+14155238886',
                contentVariables: JSON.stringify({
                    1: engineRes.data.data[0].message,
                    2: 'What can I do for you',
                    3: engineRes.data.data[1].data.options.options[0].label,
                    4: engineRes.data.data[1].data.options.options[1].label,
                    5: engineRes.data.data[1].data.options.options[2].label
                }),
                to: 'whatsapp:+918360088431'
            })
            .then(message => {
                console.log(message);
                client.messages(message.sid).update({ body: '' }).then(_msg => console.log('redacted body from logs')).catch(err => console.log('message redaction failed', err));
                return res.status(200).send()
            })
            .catch(error => {
                console.log('Error in creating message', error);
                return res.status(500).send(error)
            })
    } else {
        client.messages
            .create({
                from: 'whatsapp:+14155238886',
                body: "Paybotus",
                to: 'whatsapp:+918360088431'
            })
            .then(message => {
                console.log(message);
                client.messages(message.sid).update({ body: '' }).then(_msg => console.log('redacted body from logs')).catch(err => console.log('message redaction failed', err));
                return res.status(200).send();
            })
            .catch(error => {
                console.log('Error in creating message', error);
                return res.status(500).send(error)
            })
    }

    return res.send();
})

app.get('/', (req, res) => {
    console.log('recieved in get request', req)
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
