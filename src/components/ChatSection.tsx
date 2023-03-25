import React from "react";
import "./ChatSection.scss";
import ChatBubble from "./ChatBubble";

type AppProps = {
  message: string;
};

type Message = {
    text: string;
    isMine: boolean;
    avatarUrl: string;
    timestamp: Date;
  };

const ChatSection = ({ message }: AppProps) => {
    const messages = [
        { text: 'Hello!', isMine: true },
        { text: 'Hi there!', isMine: false },
        { text: 'How are you?', isMine: false },
        { text: 'I am good, thanks! I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!', isMine: false },
      ];

      return (
        <div>
          {messages.map((message, index) => (
            <ChatBubble key={index} message={message.text} isMine={message.isMine} timestamp={new Date} avatarUrl={"https://www.blexar.com/avatar.png"} />
          ))}
        </div>
      );
};

export default ChatSection;
