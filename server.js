const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dbConfig = require("./app/config/db.config");
const chatbot = require("./app/controllers/dialogflow.controller");
const app = express();

global.__basedir = __dirname;


var corsOptions = {
    origin: "*"
};

app.use(cors(corsOptions));
app.use(express.json())


// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

db.mongoose
    .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Successfully connect to MongoDB.");
        initial();
    })
    .catch(err => {
        console.error("Connection error", err);
        process.exit();
    });

// simple route
app.get("/", (req, res) => {
    res.json({ message: "miroir miroir dis moi qui est la plus belle?" });
});

// routes
require("./app/routes/auth.routes")(app);
//require("./app/controllers/dialogflow.controller")(app);


// set port, listen for requests
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

function initial() {
    console.log("Hama");

}





 const quizAngular = new Map([['What will be the result of the program below?', '101'],
 ['In Angular, you can pass data from parent component to child component using ...', 'Input'],
 ['In Angular, you can pass data from the child component to the parent component using ...', 'Output'],
 ['A directive, which modifies the DOM hierarchy, is called ...','Structural directive'],
 ['In Angular routing, the bottom tag is used to make the corresponding component via an active route.','<router>']]);
 
  



 global.skills = []
 const dfff = require('dialogflow-fulfillment');
 app.post("/", (req, res) => {
  const agent = new dfff.WebhookClient({
    request : req,
    response : res
  });

  
  function userName(agent){
    var name = agent.context.get("await_name").parameters['person'].name;

    console.log(name);

    agent.add("Nice to meet you "+ name + ", What is your email address ?")


    /*const response = {
      "richContent": [
        [
          {
            "type": "accordion",
            "title": "Accordion title",
            "subtitle": "Accordion subtitle",
            "image": {
              "src": {
                "rawUrl": "https://example.com/images/logo.png"
              }
            },
            "text": "Accordion text"
          }
        ]
      ]
    };
    agent.add(new dfff.Payload(agent.UNSPECIFIED, response, { rawPayload: true, sendAsMessage: true}));*/
  }
  
  function userEmail(agent){
    var email = agent.context.get("await_email").parameters['email'];

    console.log(email);

    agent.add("whats your date of birth ?")
  }
  
  function userBirthday(agent){
    var birthday = agent.context.get("await_birthdayDate");

    console.log(birthday);

    agent.add("What is your gender ?")
  }
  
  function userCountry(agent){
    var country = agent.context.get("await_country").parameters['geo-country'];

    console.log(country);

    //agent.add("whats your date of birth ?")
  }
  function userSkills(agent){
    var exist = 0;
    var skill = agent.context.get("await_skills").parameters['skillType'];

    console.log(skill);

    skills.forEach(function(item, index, array) {
      if(item==skill){
        exist = 1;
      }
    });
    if(exist==0){
      skills.push(skill)
    }

    
    console.log(skills.length);
    skills.forEach(function(item, index, array) {
      console.log(item, index);
    });
    
  }

  function userQuiz(agent){

    if(skills.length==1){
      agent.add("okay great! you have "+ skills.toString()+" quiz waiting for you! to start the quiz type 'begin "+skills.toString()+"' " )
    }else{
      agent.add("okay great! you have "
      + skills.length+ " skills : " 
      + skills.toString() +
       ", so you have "+ skills.length+
        " Quizs, which skill you want to test first ")
    }
    
  }

  /********************************************************************** */

  var q1,q2,q3,q4,q5;
  
  
  function angularQuestion2(agent){
    
    
    skills.forEach(function(item, index, array) {
      if(item=="Angular"){
        skills.splice(index, 1)
      }
    });

    
    console.log(skills);
    q1 = agent.context.get("angular_q1").parameters['any']

    /*if(quizAngular.get(1)==q1){
      global.r1 = 1;
    }
    else r1 = 0;
    console.log(quizAngular.get(1));*/
    console.log(q1);
    console.log(r1);


      
    if(q1=='101'){
      global.r1 = 1;
    }else r1 = 0;
    
  }
  

  function angularQuestion3(agent){
    q2 = agent.context.get("angular_q2").parameters['any']

    console.log(q2);
    if(q2=='Input'){
      global.r2 = 1 ;
    }else global.r2 = 0;

  }


  function angularQuestion4(agent){
    q3 = agent.context.get("angular_q3").parameters['any']

    console.log(q3);

    if(q3=='Output'){
      global.r3 = 1 ;
    }else global.r3 = 0;
  }

  function angularQuestion5(agent){
    q4 = agent.context.get("angular_q4").parameters['any']

    console.log(q4);

    if(q4=='Attribute directive'){
      global.r4 = 1 ;
    }else global.r4 = 0;
  }
  
  function angularResult(agent){
    q5 = agent.context.get("angular_q5").parameters['any']

    console.log(q5);

    if(q5=='<router>'){
      global.r5 = 1 ;
    }else global.r5 = 0;
    
    result = r1+r2+r3+r4+r5
    console.log(result);
    
    if((result)<4){
      agent.add("Your score is "+result+" ! Sorry you didn't pass the test")
    }else{
      agent.add("Your score is "+result+" ! Congratulations you pass the test")
    }
    
  }

  /********************************************************************** */

  var qf1,qf2,qf3,qf4,qf5;
  
  
  function bflutterQuestion2(agent){

    skills.forEach(function(item, index, array) {
      if(item=="Flutter"){
        skills.splice(index, 1)
      }
    });
    console.log(skills);

    qf1 = agent.context.get("flutter_q1").parameters['any']

    console.log(qf1);

    if(qf1=='A'){
      global.rf1 = 1;
    }else rf1 = 0;
    
  }
  

  function bflutterQuestion3(agent){
    qf2 = agent.context.get("flutter_q2").parameters['any']

    console.log(qf2);
    if(qf2=='B'){
      global.rf2 = 1 ;
    }else global.rf2 = 0;

  }


  function bflutterQuestion4(agent){
    qf3 = agent.context.get("flutter_q3").parameters['any']

    console.log(qf3);

    if(qf3=='Air plane mode'){
      global.rf3 = 1 ;
    }else global.rf3 = 0;
  }

  function bflutterQuestion5(agent){
    qf4 = agent.context.get("flutter_q4").parameters['any']

    console.log(qf4);

    if(qf4=='C'){
      global.rf4 = 1 ;
    }else global.rf4 = 0;
  }
  
  function bflutterResult(agent){
    qf5 = agent.context.get("flutter_q5").parameters['any']

    console.log(qf5);

    if(qf5=='SQlite'){
      global.rf5 = 1 ;
    }else global.rf5 = 0;
    
    result = rf1+rf2+rf3+rf4+rf5
    console.log(result);
    if((result)<4){
      agent.add("Your score is "+result+" ! Sorry you didn't pass the test")
    }else{
      agent.add("Your score is "+result+" ! Congratulations you pass the test")
    }
    if (skills.length==0){
      agent.add("You finish all the quizs")
    }else if(skills.length==1){
      agent.add("last one! "+ skills.toString()+" quiz waiting for you! to start the quiz type 'begin "+skills.toString()+"' " )
    }else{
      agent.add("you still have "
      + skills.length+ " skills : " 
      + skills.toString() +
       ", so you have "+ skills.length+
        " Quizs, which skill you want to test")
    }
    
  }


  var intentMap = new Map();

  /**************************************************/
 // intentMap.set('Default Welcome Intent', welcome)
  intentMap.set('user.provides.name', userName)
  intentMap.set('user.provides.email', userEmail)
  intentMap.set('user.provides.birthday', userBirthday)
  intentMap.set('user.provides.country', userCountry)
  intentMap.set('user.provide.skills', userSkills)
  intentMap.set('user.provide.noSkill', userQuiz)
  /**************************************************/
  intentMap.set('angularQuestion2', angularQuestion2)
  intentMap.set('angularQuestion3', angularQuestion3)
  intentMap.set('angularQuestion4', angularQuestion4)
  intentMap.set('angularQuestion5', angularQuestion5)
  intentMap.set('angularResult', angularResult)
  /**************************************************/
  intentMap.set('bflutterQuestion2', bflutterQuestion2)
  intentMap.set('bflutterQuestion3', bflutterQuestion3)
  intentMap.set('bflutterQuestion4', bflutterQuestion4)
  intentMap.set('bflutterQuestion5', bflutterQuestion5)
  intentMap.set('bflutterResult', bflutterResult)
  /**************************************************/

  agent.handleRequest(intentMap);


  

});


const http = require('http').Server(app);
const io = require('socket.io')(http);
const documents = {};




io.on('connection', socket => {
  let previousId;

  const safeJoin = currentId => {
    socket.leave(previousId);
    socket.join(currentId, () => console.log(`Socket ${socket.id} joined room ${currentId}`));
    previousId = currentId;
  };

  socket.on("getDoc", docId => {
    safeJoin(docId);
    socket.emit("document", documents[docId]);
  });

  socket.on("addDoc", doc => {
    documents[doc.id] = doc;
    safeJoin(doc.id);
    io.emit("documents", Object.keys(documents));
    socket.emit("document", doc);
  });

  socket.on("editDoc", doc => {
    documents[doc.id] = doc;
    socket.to(doc.id).emit("document", doc);
  });


  socket.on('message', (msg) => {
    console.log("aaaa",msg);
    socket.broadcast.emit('message-broadcast', msg);
   });

  io.emit("documents", Object.keys(documents));
  console.log(`Socket ${socket.id} has connected`);
});

http.listen(4444, () => {
  console.log('Listening on port 4444');
});