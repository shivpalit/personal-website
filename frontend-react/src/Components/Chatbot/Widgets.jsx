import React, { useEffect, useState } from 'react';

// 1) Make them named exports (or one default + others named)

export const Loader = () => (
  <div className="chatbot-loader-container">
    <svg
      id="dots"
      width="50px"
      height="21px"
      viewBox="0 0 132 58"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g stroke="none" fill="none">
        <g id="chatbot-loader" fill="#fff">
          <circle id="chatbot-loader-dot1" cx="25" cy="30" r="13" />
          <circle id="chatbot-loader-dot2" cx="65" cy="30" r="13" />
          <circle id="chatbot-loader-dot3" cx="105" cy="30" r="13" />
        </g>
      </g>
    </svg>
  </div>
);

export const DogPicture = () => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => res.json())
      .then((data) => setImageUrl(data.message));
  }, []);

  return <img src={imageUrl} alt="a dog" />;
};
