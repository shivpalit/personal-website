class MessageParser {
  constructor(actionProvider, state) {
    this.actionProvider = actionProvider;
    this.state = state;
  }

  parse(message) {
    this.actionProvider.handleAIResponse(message, this.state);
    // this.actionProvider.handleDefault(message, this.state);
    // this.actionProvider.handleLoaderTest(message, this.state);

    // const lowerCaseMessage = message.toLowerCase();
    // if (lowerCaseMessage.includes("hello") || lowerCaseMessage.includes("hi")) {
    //   this.actionProvider.handleHello();
    // } else if (lowerCaseMessage.includes("project") || lowerCaseMessage.includes("work")) {
    //   this.actionProvider.handleProjects();
    // } else if (lowerCaseMessage.includes("contact") || lowerCaseMessage.includes("email")) {
    //   this.actionProvider.handleContact();
    // } else {
    //   this.actionProvider.handleDefault(message, this.state);
    // }
  }
}

export default MessageParser; 