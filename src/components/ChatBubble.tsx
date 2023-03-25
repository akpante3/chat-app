import React from "react";
import "./ChatBubble.scss";

type ChatBubbleProps = {
  message: string;
  isMine: boolean;
  timestamp: Date;
  avatarUrl: string;
};

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  isMine,
  avatarUrl,
  timestamp,
}) => {
  const containerClasses = `chat-bubble-container ${
    isMine ? "active" : "theirs"
  }`;
  const bubbleClasses = `chat-bubble ${isMine ? "active" : "theirs"}`;
  const avatarClasses = `chat-bubble-avatar ${isMine ? "active" : "theirs"}`;

  return (
    <div className={containerClasses}>
      {!isMine && (
          <div className="chat-bubble__avatar-container">
            <img className={avatarClasses} src={avatarUrl} alt="Avatar" />
          </div>
      )}
      {isMine &&  (<div className="chat-bubble__time-stamp"> 12:30 PM</div>) }

      <div className={bubbleClasses}>
        <div className="chat-bubble-content">{message}</div>
      </div>
      {isMine && (
        <div className="chat-bubble__avatar-container">
          <img className={avatarClasses} src={avatarUrl} alt="Avatar" />
        </div>
      )}
      {!isMine &&  (<div className="chat-bubble__time-stamp"> 12:30 PM</div>) }
    </div>
  );
};

export default ChatBubble;
