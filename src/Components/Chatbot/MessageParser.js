class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    const lowerCaseMessage = message.toLowerCase();
    
    if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
      this.actionProvider.handleHello();
    } else if (lowerCaseMessage.includes("project") || lowerCaseMessage.includes("work")) {
      this.actionProvider.handleProjects();
    } else if (lowerCaseMessage.includes("contact") || lowerCaseMessage.includes("email")) {
      this.actionProvider.handleContact();
    } else {
      this.actionProvider.handleDefault();
    }
  }
}

export default MessageParser; 