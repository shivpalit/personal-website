import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage("Hi! I'm Shiv's assistant. How can I help you today?"),
  ],
  botName: "Assistant",
  customComponents: {
    header: () => null
  },
  customStyles: {
    // (you can leave this blank if you’re using your CSS module)
  },
};

export default config;
