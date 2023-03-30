/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState, useContext } from "react";
import "./ChatSection.scss";
import ChatBubble from "./ChatBubble";
import TextArea from "./TextArea";
import Button from "./Button";
import { useChat } from "../hooks/index";
import useLatestMessages from "../hooks/useLatestMessage";
import Icons from "./Icons";
import { Context } from "../context/index";
import InfoBox from "./InfoBox";
import {
  formatTime,
  sortChat,
  scrollToTop,
  scrollToBottom,
} from "../utils/utils";

type Props = {
  headerText: string;
  handleToggleSidebar: Function;
};



const ChatSection = ({ headerText, handleToggleSidebar }: Props) => {
  const {
    pendingMessages,
    setpendingMessages,
    messages,
    isAtTopOfPage,
    activeChannel,
    activeUser,
    channels,
    disableTextArea,
    textAreaValue,
    setTextAreaValue,
    chatInfo,
    setChatInfo,
  } = useContext(Context);
  const chatRef = useRef<HTMLDivElement>(null);
  const {
    handlePageScroll,
    postMessage,
    deletePendingMessage,
    fetchOlderMessages,
  } = useChat();
  const { lastestMessageData } = useLatestMessages(activeChannel);

  // fetch recent messages
  const fetchRecentMessages = () => {
    return fetchOlderMessages(false).then((data) => {
      console.log("you return?");
      setTimeout(() => {
        scrollToBottom(chatRef);
      }, 100);
    });
  };
// fetch prev messages
  const fetchOldMessages = () => {
    fetchOlderMessages(true).then((data) => {
      setTimeout(() => {
        scrollToTop(chatRef);
      }, 100);
    });
  };

  // handleMessageRetry: retry failed messages
  const handleMessageRetry = (message: string, messageId: string) => {
    handleSubmit(message, messageId);
  };

  useEffect(() => {
    scrollToBottom(chatRef);
  }, [lastestMessageData, pendingMessages]);

  useEffect(() => {
    handlePageScroll(chatRef);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setChatInfo({ active: false, message: "" });
    }, 4000);
  }, [chatInfo]);


// handleSubmit 
  const handleSubmit = (text: string, pendingId?: string) => {
    const date = new Date();

    const getChannelId = channels.find(
      (channel) => channel.name === activeChannel
    );

    const data = {
      channelId: getChannelId?.channelId,
      messageId:
        pendingId || `${Math.floor(Math.random() * 1000000000000) + 1}`,
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

    if (!pendingId) {
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
        {isAtTopOfPage && (
          <Button
            text={"Read More"}
            icon={"arrow-up"}
            handleClick={() => fetchOldMessages()}
            isDisabled={disableTextArea}
          />
        )}
      </header>
      <div className="chat-section__info-box">
        <InfoBox active={chatInfo.active} message={chatInfo.message} />
      </div>
      <div className="chat-section__chat" ref={chatRef}>
        {messages &&
          [...sortChat(messages), ...sortChat(pendingMessages)].map(
            (message: any, index: number) => (
              <ChatBubble
                key={message.messageId}
                messageId={message.messageId}
                message={message.text}
                isActiveUser={message.userId === activeUser}
                userName={message.userId}
                timestamp={formatTime(message.datetime)}
                delivered={message?.delivered}
                avatarUrl={
                  "https://play-lh.googleusercontent.com/byKGvBzx-QauMgiDgitW3sz6D6xkBVx2-96BAqanlI8m229BL8zj5UllvViPLoFoqPc"
                }
                handleDelete={(messageId: any) =>
                  deletePendingMessage(messageId)
                }
                handleRetry={(message: string, messageId: string) =>
                  handleMessageRetry(message, messageId)
                }
              />
            )
          )}
      </div>
      <div className="chat-section__text-area">
        {/* {!isAtTopOfPage && ( */}
          <div className="chat-section__text-area-button">
            <Button
              text={"Read More"}
              icon={"arrow-down"}
              handleClick={() => fetchRecentMessages()}
              isDisabled={disableTextArea}
            />
          </div>
        {/* )} */}
        <TextArea
          isDisabled={disableTextArea}
          handleMessageSubmit={(text: string) => handleSubmit(text)}
          inputValue={textAreaValue}
          setInputValue={setTextAreaValue}
        />
      </div>
    </div>
  );
};

export default ChatSection;
