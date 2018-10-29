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
        var amount = handlerInput.requestEnvelope.request.intent.slots.amount.value;
        var menu = handlerInput.requestEnvelope.request.intent.slots.menu.value;
        if (menu == undefined){
            const speechOutput = 'コーヒー、カフェラテ、カプチーノからお選びいただけます。どれにしますか？';
            const reprompt = '何にしますか？';
            return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
        } else {
            let status = handlerInput.requestEnvelope.request.intent.slots.menu.resolutions.resolutionsPerAuthority[0].status.code;
            console.log(status);
            if (status === "ER_SUCCESS_MATCH"){
                menu = handlerInput.requestEnvelope.request.intent.slots.menu.resolutions.resolutionsPerAuthority[0].values[0].value.name;
            }

            if (amount === undefined){
                const speechOutput = menu + 'ですね。ありがとうございます。今日は天気がいいので全部100円でいいですよ。またの御利用をお待ちしております。';
                return handlerInput.responseBuilder
                .speak(speechOutput)
                .getResponse();
            } else {
                const speechOutput = menu + 'を' + amount + 'つですね、ありがとうございます。今日は天気がいいので全部100円でいいですよ。またの御利用をお待ちしております。';
                return handlerInput.responseBuilder
                .speak(speechOutput)
                .getResponse();
            }
        }
    }
};

const RecommendIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RecommendIntent';
    },
    handle(handlerInput) {
        const speechOutput = '今日は甘さスッキリのカフェラテがおすすめです。';
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechOutput = 'コーヒーショップです。挽きたての美味しいコーヒーをお届けしています。今日は何にしますか?';
        const reprompt = '今日は何にしますか？';
        return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(reprompt)
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
      return true;
    },
    handle (handlerInput, error) {
      console.log(`Error handled: ${error.message}`);
      const message = "すみません、うまく聞き取れませんでした。もう一度言ってください。";
      return handlerInput.responseBuilder
        .speak(message)
        .reprompt(message)
        .getResponse()
    }
};

const skillBuilder = Alexa.SkillBuilders.custom();
exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    OrderIntentHandler,
    RecommendIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
