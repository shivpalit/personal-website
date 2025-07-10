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
        <span><i className="fa fa-comments"></i></span>
          {/* <button className={styles.minimizeButton}>
            {isMinimized ? '' : '-'}
          </button> */}
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