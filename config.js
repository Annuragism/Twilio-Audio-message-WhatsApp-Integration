// Define app configuration in a single location, but pull in values from
// system environment variables (so we don't check them in to source control!)
module.exports = {
    // Twilio Account SID - found on your dashboard
    accountSid: process.env.TWILIO_ACCOUNT_SID || 'AC1527eb4cc5d3800a54123c4ad88ba69b',

    // Twilio Auth Token - found on your dashboard
    authToken: process.env.TWILIO_AUTH_TOKEN || '69d0f40ad977913727ada74d6558eacc',

    // A Twilio number that you have purchased through the twilio.com web
    // interface or API
    twilioNumber: process.env.TWILIO_NUMBER || '+1 253 201 4490',//+44 1274 003883',

    // The port your web application will run on
    port: process.env.PORT || 5000,
};
