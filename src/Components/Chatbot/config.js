import { createChatBotMessage } from 'react-chatbot-kit';

const config = {
  initialMessages: [
    createChatBotMessage("Hi! I'm Shiv's assistant. How can I help you today?"),
  ],
  botName: "Assistant",
  customComponents: {
    /**  
     * Replace the default header with an empty fragment  
     * → this removes the header entirely  
     */
    header: () => null
  },
  // … your other config …
  customStyles: {
    botMessageBox: {
      backgroundColor: "black",
    },
    chatButton: {
      backgroundColor: "black",
    },
  },
};

export default config; 