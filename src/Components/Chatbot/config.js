import {
  createChatBotMessage,
  createCustomMessage,
} from 'react-chatbot-kit';
import CustomMessage from './CustomMessage';
import { Loader, DogPicture } from './Widgets'

const config = {
  initialMessages: [
    createChatBotMessage("Hi! I'm Shiv's assistant. How can I help you today?")
  ],
  botName: "Assistant",
  customComponents: {
    header: () => null
  },
  customMessages: {
    custom: (props) => <CustomMessage {...props} />,
  },
  widgets: [
    {
      widgetName: "loader",
      widgetFunc: (props) => <Loader {...props} />,
      // you don’t need any state mapped, so mapStateToProps can be omitted
    },
    {
      widgetName: 'dogPicture',
      widgetFunc: (props) => <DogPicture {...props} />,
    },
  ]
};

export default config;
