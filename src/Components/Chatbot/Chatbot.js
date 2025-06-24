import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import styles from './Chatbot.module.css';

import config from './config';
import MessageParser from './MessageParser';
import ActionProvider from './ActionProvider';

const ChatbotComponent = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className={styles.chatbotContainer}>
      <div className={styles.chatbotHeader} onClick={() => setIsMinimized(!isMinimized)}>
        <span>Chat with me</span>
        <button className={styles.minimizeButton}>
          {isMinimized ? '+' : '-'}
        </button>
      </div>
      
      <div style={{ display: isMinimized ? 'none' : 'block' }} className={styles.chatbotContent}>
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      </div>
    </div>
  );
};

export default ChatbotComponent; 