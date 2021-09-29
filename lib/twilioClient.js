var twilio = require('twilio');
var VoiceResponse = twilio.twiml.VoiceResponse;
var config = require('../config');
const client = require('twilio')(config.accountSid, config.authToken);
const axios = require('axios').default;

module.exports = {
  createCall: (name, phoneNumber, headersHost, twilioClient = client) => {
    let url = headersHost + '/outbound/' + encodeURIComponent(name);
    let options = {
        to: phoneNumber,
        from: config.twilioNumber,
        twiml: `<Response><Say>Hello ${name} ,How Are You!</Say></Response>`,
        // url: 'http://demo.twilio.com/docs/voice.xml',
    };
    return twilioClient.calls.create(options)
      .then((message) => {
        // console.log(message);
        return Promise.resolve('Thank you! We will be calling you shortly.')
      })
      .catch((error) => {
        // console.log(error);
        return Promise.reject(error);
      });
  },
  createMsg: (toNumber,msgbody, headersHost, twilioClient = client)=>{
    let options = {
      body: msgbody, 
      from: config.twilioNumber, 
      to: toNumber
    }
    return twilioClient.messages.create(options)
    .then((message) => {
      // console.log(message.responseText);
      return Promise.resolve('Message Sent !')
    })
    .catch((error) => {
      // console.log(error);
      return Promise.reject(error);
    });
  },
  whatsAppMsg: (toNumber,msgbody, headersHost, twilioClient = client) => {

    let a =toNumber.split(" ").join("")
    let b =config.twilioNumber.split(" ").join("");
    let options = {
      body: msgbody, 
      from: 'whatsapp:'+b, 
      to: 'whatsapp:'+a,
      }
      // console.log(options);
      // let postData = {
      //   To: `whatsapp:${a}`,
      //   From: `whatsapp:${b}`, 
      //   Body: msgbody, 
      //   }
      //   console.log(postData);
      // axios.post('https://api.twilio.com/2010-04-01/Accounts/AC1527eb4cc5d3800a54123c4ad88ba69b/Messages.json', postData,{
      //   auth: {
      //     username: config.accountSid,
      //     password: config.authToken
      //   }
      // })
      // .then((message) => {
      //     console.log(message);
      //     return Promise.resolve('Message Sent !')
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //     return Promise.reject(error);
      //   });
      
      return twilioClient.messages.create({
        from: 'whatsapp:+14155238886',
        body: msgbody,
        to: 'whatsapp:'+a,
      })
      .then((message) => {
        console.log(message);
        return Promise.resolve('Message Sent !')
      })
      .catch((error) => {
        // console.log(error);
        return Promise.reject(error);
      });
  },
  voiceResponse: (salesNumber, Voice = VoiceResponse) => {
    let twimlResponse = new Voice();

    twimlResponse.say('Thanks for contacting our sales department. Our ' +
                      'next available representative will take your call. ',
                      { voice: 'alice' });
    twimlResponse.dial(salesNumber);

    return twimlResponse.toString();
  }
}
