import { useContext } from "react";
import { POST_MESSAGE } from "../graphql/query";
import { useMutation } from "@apollo/client";
import { Context } from "../context/index";
import useLatestMessages from "./useLatestMessage";

interface Message {
  channelId: string;
  text: string;
  userId: string;
  messageId?: number;
  datetime?: string | Date;
  delivered?: "pending" | "success" | "failed";
  postMessage?: Object;
}

interface Result {
  deletePendingMessage: (messageId: string) => Promise<boolean>;
  postMessage: (message: Message, pendingId: string) => void;
}

const usePostNewMessage = (activeChannel: string): Result => {
  const { refetchLatestMessage } = useLatestMessages(activeChannel);
  const {
    pendingMessages,
    setpendingMessages,
    activeUser,
    setDisableTextArea,
    setChatInfo
  } = useContext(Context);

  const [createMessage] = useMutation(POST_MESSAGE, {
    onCompleted: (payload) => {
      return payload;
    },
  });

  const deletePendingMessage = async (messageId: string) => {
    const getPendingMessages = localStorage.getItem(
      `${activeChannel}-${activeUser}-pending`
    );

    const pendingMessages = getPendingMessages
      ? JSON.parse(getPendingMessages).filter((item: any) => {
          return item.messageId !== messageId;
        })
      : [];

    localStorage.setItem(
      `${activeChannel}-${activeUser}-pending`,
      JSON.stringify(pendingMessages)
    );

    return refetchLatestMessage().then((data) => {
      setpendingMessages(pendingMessages);
      return true;
    });
  };

  const postMessage = (message: Message, pendingId: string) => {
    setDisableTextArea(true);

    createMessage({
      variables: message,
    })
      .then((response) => {
        console.log(response.data);

        const removeFromPendingList = pendingMessages.filter(
          (item: any) => item.messageId !== pendingId
        );

        refetchLatestMessage().then((data) => {
          setpendingMessages(removeFromPendingList);
          deletePendingMessage(pendingId);
          setDisableTextArea(false);
        });
        console.log({
          message,
          pendingId,
          removeFromPendingList: removeFromPendingList,
        });
      })
      .catch((error: any) => {
        const updatedMessages = pendingMessages
          .filter((item: any) => item.messageId !== pendingId)
          .concat({ ...message, delivered: "failed", messageId: pendingId });

        setpendingMessages(updatedMessages);
        setChatInfo({
          active: true,
          message: "Error, Failed Could post message",
        });

        localStorage.setItem(
          `${activeChannel}-${activeUser}-pending`,
          JSON.stringify(updatedMessages)
        );
        setDisableTextArea(false);
      });
  };

  return { deletePendingMessage, postMessage };
};

export default usePostNewMessage;
