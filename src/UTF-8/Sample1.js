const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speechOutput = 'いらっしゃいませ。コーヒーショップへようこそ。今日は何にしますか?';
        const reprompt = '今日は何にしますか？';
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
    }
};

const OrderIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'OrderIntent';
    },
    handle(handlerInput) {
        const speechOutput = 'コーヒーですね、ありがとうございます。今日は天気がいいので全部100円でいいですよ。またの御利用をお待ちしております。';
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechOutput = 'コーヒーショップをご利用ありがとうございました。';
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        return handlerInput.responseBuilder.getResponse();
    }
};

const ErrorHandler = {
    canHandle () {
      return true
    },
    handle (handlerInput, error) {
      console.log(`Error handled: ${error.message}`)
      const message = "すみません、なんだかうまく行かないようです。もう一度お試しください。";
      return handlerInput.responseBuilder
        .speak(message)
        .getResponse()
    }
}

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    OrderIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
