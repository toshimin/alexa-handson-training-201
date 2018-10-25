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
            && (handlerInput.requestEnvelope.request.intent.name === 'OrderIntent' ||
                handlerInput.requestEnvelope.request.intent.name === 'AmountIntent');
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        let amount = attributes.amount;
        let menu = attributes.menu;
        if (amount === undefined){
            if (handlerInput.requestEnvelope.request.intent.slots.amount) {
                amount = handlerInput.requestEnvelope.request.intent.slots.amount.value;
            }
        }
        if (menu === undefined){
            if (handlerInput.requestEnvelope.request.intent.slots.menu) {
                menu = handlerInput.requestEnvelope.request.intent.slots.menu.value;
            }
        }

        if(menu === undefined){
            const speechOutput = 'コーヒー、カフェラテ、カプチーノからお選びいただけます。どれにしますか？';
            const reprompt = '何にしますか？';
            return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
        }else if(amount === undefined){
            attributes.menu = menu;
            handlerInput.attributesManager.setSessionAttributes(attributes);

            const speechOutput = menu + 'ですね。おいくつご用意しましょうか？';
            const reprompt = 'おいくつご用意しますか？';
            return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
        }else{
            attributes.menu = menu;
            attributes.amount = amount;
            handlerInput.attributesManager.setSessionAttributes(attributes);

            const speechOutput = menu + 'を' + amount + 'つですね。お砂糖はおつけしますか？';
            const reprompt = 'お砂糖はおつけしますか？';
            return handlerInput.responseBuilder
            .speak(speechOutput)
            .reprompt(reprompt)
            .getResponse();
        }
    }
};

const YesIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.YesIntent';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const amount = attributes.amount;
        const menu = attributes.menu;

        const speechOutput = menu + 'を' + amount + 'つ。お砂糖をつけてご用意いたします。ご利用ありがとうございました。';
        return handlerInput.responseBuilder
        .speak(speechOutput)
        .getResponse();
    }
};

const NoIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NoIntent';
    },
    handle(handlerInput) {
        const attributes = handlerInput.attributesManager.getSessionAttributes();
        const amount = attributes.amount;
        const menu = attributes.menu;

        const speechOutput = menu + 'を' + amount + 'つ。お砂糖なしでご用意いたします。ご利用ありがとうございました。';
        return handlerInput.responseBuilder
        .speak(speechOutput)
        .getResponse();
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
    YesIntentHandler,
    NoIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();