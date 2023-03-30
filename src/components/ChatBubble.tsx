import React, { useState } from "react";
import Icons from "./Icons";
import "./ChatBubble.scss";

type Props = {
  message: string;
  isActiveUser: boolean;
  timestamp: string;
  avatarUrl: string;
  handleDelete: Function;
  handleRetry: Function;
  messageId: string;
  delivered?: "pending" | "success" | "failed";
  userName: string;
};

type Confirmation = {
  type?: string | null;
};

const ChatBubble: React.FC<Props> = ({
  message,
  isActiveUser,
  avatarUrl,
  timestamp,
  delivered,
  handleDelete,
  handleRetry,
  messageId,
  userName,
}) => {
  const bubbleClasses = `chat-bubble ${isActiveUser ? "active" : "not-active"}`;
  const [confirmation, setConfirmation] = useState<Confirmation>({
    type: null,
  });
  const [isDeleted, setisDeleted] = useState(false);
  const avatarClasses = `chat-bubble-avatar ${
    isActiveUser ? "active" : "not-active"
  }`;
  let containerClasses = `chat-bubble-container ${
    isActiveUser ? "flex-row-reverse" : "not-active"
  } ${isDeleted ? "delete-animation" : ""}`;

  const handleConfirmation = () => {
    if (confirmation.type === "retry") {
      handleRetry(message, messageId);
    } else {
      setisDeleted(true);
      setTimeout(() => {
        handleDelete(messageId);
      }, 100);
    }
  };

  return (
    <div className={containerClasses}>
      <div className="chat-bubble__avatar-container">
        <img className={avatarClasses} src={avatarUrl} alt="Avatar" />
        <span>{userName}</span>
      </div>
      <div className={bubbleClasses}>
        <div className="chat-bubble-content">{message}</div>
      </div>
      {delivered !== "failed" && (
        <div className="chat-bubble__time-stamp">{timestamp}</div>
      )}
      {isActiveUser && (
        <div>
          {delivered === "pending" && <Icons name={"check-one"} />}
          {delivered === "success" && <Icons name={"check-all"} />}
          {delivered === "failed" && (
            <div>
              {confirmation.type === null ? (
                <div className="chat-bubble__icons-failed">
                  <div onClick={() => setConfirmation({ type: "retry" })}>
                    <Icons name={"retry"} />
                  </div>
                  <div onClick={() => setConfirmation({ type: "trash" })}>
                    <Icons name={"trash"} />
                  </div>
                </div>
              ) : (
                <div className="chat-bubble__icons-failed">
                  <div onClick={() => setConfirmation({ type: null })}>
                    <Icons name={"close"} />
                  </div>
                  <div onClick={() => handleConfirmation()}>
                    <Icons name={"check"} />
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
