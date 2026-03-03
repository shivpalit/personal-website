import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import styles from './Chatbot.module.css';

import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const ChatbotComponent = ({ isMinimized, setChatMinimized }) => {
  return (
    <div className={`${styles.chatbotContainer} ${isMinimized ? styles.minimized : ''}`}>
      <div className={styles.chatbotHeader} onClick={() => setChatMinimized(!isMinimized)}>
          <img src="https://www.svgrepo.com/download/315660/bot.svg" alt="chat" width="32" height="32" style={{filter: 'invert(1)'}} />
          {/* <img src="https://www.svgrepo.com/download/339963/chat-bot.svg" alt="chat" width="32" height="32" style={{filter: 'invert(1)'}} /> */}
      </div>
      
      <div style={{ display: isMinimized ? 'none' : 'block' }} className={styles.chatbotContent}>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
          // messageHistory={messageHistory}
          // saveMessages={saveMessages}
        />
      </div>
    </div>
  );
};

export default ChatbotComponent; 