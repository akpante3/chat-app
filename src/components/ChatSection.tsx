/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState, useContext } from "react";
import "./ChatSection.scss";
import ChatBubble from "./ChatBubble";
import TextArea from "./TextArea";
import Button from "./Button";
import { useChat } from "../hooks/index";
import Icons from "./Icons";
import { Context } from "../context/index";

type Props = {
  headerText: string,
  handleToggleSidebar: Function;
};

interface Message {
  channelId: string;
  text: string;
  userId: string;
  messageId?: number;
  datetime?: string | Date;
  delivered?: "pending" | "success" | "failed";
  postMessage?: Object;
}

const ChatSection = ({ headerText, handleToggleSidebar }: Props) => {
  const {
    pendingMessages,
    setpendingMessages,
    messages,
    setMessages,
    activeChannel,
    activeUser,
    channels,
    disableTextArea,
  } = useContext(Context);
  const chatRef = useRef<HTMLDivElement>(null);
  const [
    isAtTop,
    handlePageScroll,
    postMessage,
    fetchMessages,
    refetchLatestMessage,
    deletePendingMessage,
  ] = useChat();
  const [data, loading, error] = fetchMessages(activeChannel);

  const formatTime = (timestamp: string) => {
    const dateObj = new Date(timestamp);

    const formattedTime = dateObj.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return formattedTime;
  };

  const scrollToBottom = () => {
    if (chatRef && chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  };

  const scrollToTop = () => {
    if (chatRef && chatRef.current) {
      chatRef.current.scrollTop = 0;
    }
  };
  // sort chat
  const sortChat = (data:Message[] | Object[]) => {
    return [...data].sort((a: any, b: any) => {
      if (a.datetime && b.datetime) {
        return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
      } else {
        return 0;
      }
    });
  };

  // handleMessageRetry: retry failed messages
  const handleMessageRetry = (message: string, messageId: string) => {
      handleSubmit(message, messageId);
  };

  useEffect(() => {
    scrollToBottom();
  }, [data, pendingMessages]);

  useEffect(() => {
    handlePageScroll(chatRef);
  }, []);



  const handleSubmit = (text: string, pendingId?: string) => {
    const date = new Date();


    const getChannelId = channels.find(
      (channel) => channel.name === activeChannel
    );

    const data = {
      channelId: getChannelId?.channelId,
      messageId: pendingId || `${Math.floor(Math.random() * 1000000000000) + 1}`,
      text,
      datetime: date.toISOString(),
      userId: activeUser,
      delivered: "pending",
    };

    postMessage(
      {
        channelId: getChannelId?.channelId || "1",
        text,
        userId: activeUser,
      },
      data.messageId 
    );

    if(!pendingId) {
      setpendingMessages((PrevState: any) => [...PrevState, data]);
    }
    
  };

  return (
    <div className="chat-section">
      <header>
        <div className="chat-section__nav">
          <span
            className="chat-section__nav-icon"
            onClick={() => handleToggleSidebar()}
          >
            <Icons name={"hamburger"} size={"30px"} />
          </span>

          <div className="ml-2">{headerText}</div>
        </div>
        {/* {!isAtTop && (
          <Button
            text={"Read More"}
            icon={"arrow-up"}
            handleClick={() => scrollToTop()}
          />
        )} */}
      </header>
      <div className="chat-section__chat" ref={chatRef}>
        {messages &&
          [...sortChat(messages), ...sortChat(pendingMessages)].map((message: any, index: number) => (
            <ChatBubble
              key={message.messageId}
              messageId={message.messageId}
              message={message.text}
              isActiveUser={message.userId === activeUser}
              timestamp={formatTime(message.datetime)}
              delivered={message?.delivered}
              avatarUrl={
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyu_6qtbLHBt4nJH-r7H5zjugtH0cwK7uMlw&usqp=CAU"
              }
              handleDelete={(messageId: string) =>
                deletePendingMessage(messageId)
              }
              handleRetry={(message: string, messageId:string) =>
                handleMessageRetry(message, messageId)
              }
            />
          ))}
      </div>
      <div className="chat-section__text-area">
        {isAtTop && (
          <div className="chat-section__text-area-button">
            <Button
              text={"Read More"}
              icon={"arrow-down"}
              handleClick={() => scrollToBottom()}
              isDisabled={disableTextArea}
            />
          </div>
        )}
        <TextArea
          isDisabled={disableTextArea}
          handleMessageSubmit={(text: string) => handleSubmit(text)}
        />
      </div>
    </div>
  );
};

export default ChatSection;
