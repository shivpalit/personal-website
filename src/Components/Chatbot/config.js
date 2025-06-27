import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [
    createChatBotMessage("Hi! I'm Shiv's assistant. How can I help you today?"),
  ],
  botName: "Assistant",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#black",
    },
  },
};

export default config; 