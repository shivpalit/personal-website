import { Loader, DogPicture } from './Widgets'

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  updateChatbotState(message, id) {
    this.setState(prev => {
      // copy the array so we don’t mutate
      const messages = [...prev.messages];
  
      if (id) {
        const idx = messages.findIndex(m => m.id === id);
        if (idx > -1) {
          // if `message` looks like a full ChatBotMessage obj, replace it wholesale…
          if (message && message.id !== undefined && message.type !== undefined) {
            messages[idx] = message;
          } 
          // …otherwise assume it’s just the new text, so swap .message
          else {
            messages[idx] = { ...messages[idx], message };
          }
        }
      } else {
        // no id → append as before
        messages.push(message);
      }
  
      return { ...prev, messages };
    });
  }
  

  handleAIResponse(input, state) {

    const loadingMsg = this.createChatBotMessage(<Loader />, 
      {
        id: 'loading'
      }
    );
    this.updateChatbotState(loadingMsg);

    const apiUrl = process.env.NODE_ENV === 'production'
      ? process.env.REACT_APP_API_URL + '/api/ai-response'
      : 'http://localhost:80/api/ai-response';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages: state.messages, input: input })
      })
        .then(response => response.json())
        .then(data => {
          const message = this.createChatBotMessage(data.response);
          this.updateChatbotState(message, 'loading');
        })
        .catch(error => { 
          console.error('Error fetching AI response:', error);
          const message = this.createChatBotMessage('Error fetching AI response:'+ error.message);
          this.updateChatbotState(message, 'loading');
        });

      console.log(state.messages);
    }



  handleDefault(input, state) {
    const message = this.createChatBotMessage('You said: ' + input, 
      {
        loading:false
      });
    this.updateChatbotState(message);
  }

  handleLoaderTest(input, state) {
    const loadingMsg = this.createChatBotMessage(<Loader />, 
      {
        id: 'loading'
      }
    );
    this.updateChatbotState(loadingMsg);

    setTimeout(() => {
      const message = this.createChatBotMessage("hello");

      this.updateChatbotState(message, 'loading');
    }, 10000);  // time in ms
  }

}

export default ActionProvider; 