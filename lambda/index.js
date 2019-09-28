import {welcomeMessage,outputMessage,helpMeMessage,states,killMessage,shutdownMessage} from './constants';

const Alexa = require('ask-sdk');

let alexa;

let APP_ID = process.env.APP_ID;

const sessionHandlers = {
    'LaunchRequest': function () {
        this.handler.state = states.SEARCHMODE;
        this.response.speak(skillName + " " + welcomeMessage).listen(welcomeMessage);
        this.emit(':responseReady');
    },
    "searchIntent": function()
    {
        this.handler.state = states.SEARCHMODE;
        this.emitWithState("TranslateInAlbanianIntent");
    },
    'Unhandled': function () {
        this.response.speak(HelpMeMessage).listen(HelpMeMessage);
        this.emit(':responseReady');
    },
};

const startSearchHandlers = Alexa.CreateStateHandler(states.SEARCHMODE, {
    'AMAZON.YesIntent': function () {
        outputMessage = welcomeMessage;
        alexa.response.speak(outputMessage).listen(welcomeMessage);
        this.emit(':responseReady');
    },

    'AMAZON.NoIntent': function () {
        this.response.speak(shutdownMessage);
        this.emit(':responseReady');
    },

    'AMAZON.RepeatIntent': function () {
        this.response.speak(outputMessage).listen(HelpMeMessage);
    },
    'TranslateInAlbanianIntent': function () {
        const slotValue = this.event.request.intent.slots.QUERY.value;
        if (slotValue != undefined)
        {
            //TODO Add implementation for Translation
        }
        else{
            this.response.speak("I couldn't find what word do you want to Translate").listen("I couldn't find what word do you want to Translate");
        }

        this.emit(':responseReady');
    },

    'AMAZON.HelpIntent': function () {
        this.response.speak(HelpMeMessage).listen(HelpMeMessage);
        this.emit(':responseReady');
    },

    'AMAZON.StopIntent': function () {
        this.response.speak(killMessage);
    },

    'AMAZON.CancelIntent': function () {
        this.response.speak(killMessage);
    },

    'SessionEndedRequest': function () {
        this.emit('AMAZON.StopIntent');
    },

    'Unhandled': function () {
        this.response.speak(HelpMeMessage).listen(HelpMeMessage);
        this.emit(':responseReady');
    }
});

exports.handler = function (event, context, callback) {
    alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
    alexa.registerHandlers(sessionHandlers, startSearchHandlers);
    alexa.execute();
};