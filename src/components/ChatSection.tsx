import React, { useEffect, useRef } from "react";
import "./ChatSection.scss";
import ChatBubble from "./ChatBubble";
import TextArea from "./TextArea";

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
    { text: "Hello!", isMine: true },
    { text: "Hi there!", isMine: false },
    { text: "How are you?", isMine: false },
    {
      text: "I am good, thanks! I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!",
      isMine: false,
    },
    { text: "Hello!", isMine: true },
    { text: "Hi there!", isMine: false },
    { text: "How are you?", isMine: false },
    {
      text: "I am good, thanks! I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!",
      isMine: false,
    },
    { text: "Hello!", isMine: true },
    { text: "Hi there!", isMine: false },
    { text: "How are you?", isMine: false },
    {
      text: "I am good, thanks! I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!",
      isMine: false,
    },
    { text: "Hello!", isMine: true },
    { text: "Hi there!", isMine: false },
    { text: "How are you?", isMine: false },
    {
      text: "I am good, thanks! I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!I am good, thanks!",
      isMine: false,
    },
  ];
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="chat-section">
      <header>LGTM Channel</header>
      <div className="chat-section__chat" ref={chatRef}>
        {messages.map((message, index) => (
          <ChatBubble
            key={index}
            message={message.text}
            isMine={message.isMine}
            timestamp={new Date()}
            avatarUrl={"https://www.blexar.com/avatar.png"}
          />
        ))}
      </div>

      <div className="chat-section__text-area">
        <TextArea />
      </div>
    </div>
  );
};

export default ChatSection;
