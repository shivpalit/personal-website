class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleHello() {
    const message = this.createChatBotMessage("Hello! Nice to meet you!");
    this.updateChatbotState(message);
  }

  handleProjects() {
    const message = this.createChatBotMessage(
      "I'd be happy to tell you about my projects. You can check them out in the portfolio section above!"
    );
    this.updateChatbotState(message);
  }

  handleContact() {
    const message = this.createChatBotMessage(
      "You can reach out to me through the contact form in the contact section!"
    );
    this.updateChatbotState(message);
  }

  handleDefault() {
    const message = this.createChatBotMessage(
      "I'm not sure I understand. Could you rephrase that?"
    );
    this.updateChatbotState(message);
  }

  updateChatbotState(message) {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message]
    }));
  }
}

export default ActionProvider; 