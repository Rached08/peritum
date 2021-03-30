

const dialogflow = require('@google-cloud/dialogflow');
const uuid = require('uuid');

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample(){
    // A unique identifier for the given session
    const sessionId = uuid.v4();
  
    // Create a new session
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename:"D:/Users/EVADAM/Desktop/backend-Mohamed/peritumbot-uvbc-4051f4e9b03c.json"
    });
    const sessionPath = sessionClient.projectAgentSessionPath('peritumbot-uvbc', sessionId);
  
    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: req.body.msg,
          // The language used by the client (en-US)
          languageCode: 'en-US',
        },
      },
    };
  
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
      res.status(200).send({ "Response": result.fulfillmentText});
      return;
    } else {
      console.log(`  No intent matched.`);
      res.status(400).send({ "Response": "noooo"});
      return;

    }
  }
runSample();

/*module.exports = function(app){
app.get("/c",runSample());
};
 */
