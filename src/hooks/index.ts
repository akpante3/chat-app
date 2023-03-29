/* eslint-disable react-hooks/rules-of-hooks */
import { useState, RefObject, useContext, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { POST_MESSAGE, GET_LATEST_MESSAGES } from "../graphql/query";
import { Context } from "../context/index";

interface Message {
  channelId: string;
  text: string;
  userId: string;
  messageId?: number;
  datetime?: string | Date;
  delivered?: "pending" | "success" | "failed";
  postMessage?: Object;
}


export const useChat = (): [
  boolean,
  (ref: RefObject<HTMLDivElement>) => void,
  (message: Message, pendingId: string) => void,
  (id: string) => any[],
  (variables?: Partial<{ channelId: string; }> | undefined) => Promise<any>,
  (messageId: string) => Promise<boolean>
] => {
  const [isAtTop, setIsAtTop] = useState(false);
  const {
    pendingMessages,
    setpendingMessages,
    setMessages,
    activeChannel,
    activeUser,
    setDisableTextArea,
  } = useContext(Context);

  const updatePendingMessages = () => {
    let getPendingMessages = localStorage.getItem(
      `${activeChannel}-${activeUser}-pending`
    );


    if (
      typeof getPendingMessages === "string" &&
      JSON.parse(getPendingMessages).length
    ) {
      setpendingMessages([...JSON.parse(getPendingMessages)])
    } else {
      setpendingMessages([])
    }
  }

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

    return refetchLatestMessage()
      .then((data) => {
        setpendingMessages(pendingMessages);
        return true;
      })
  };

  const { data, loading, error, refetch: refetchLatestMessage } = useQuery(GET_LATEST_MESSAGES, {
    variables: { channelId: activeChannel },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data) {
        let result = data.fetchLatestMessages;

        result = result.map((message: Message) => ({
          ...message,
          delivered: "success",
        }));

        updatePendingMessages()

        setMessages(result);

      }
    },
  });

  
  useEffect(() => {
    console.log('you dey change self')
    updatePendingMessages()
  },[activeUser, activeUser, activeChannel])
  

  const [createMessage] = useMutation(POST_MESSAGE, {
    onCompleted: (payload) => {
      return payload;
    },
  });

  const handlePageScroll = (ref: RefObject<HTMLDivElement>): void => {
    const handleScroll = (): void => {
      const div = ref.current;
      if (div) {
        setIsAtTop(div.scrollTop === 0);
      }
    };

    const div = ref.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
    }
  };

  const postMessage = (message: Message, pendingId: string) => {
    setDisableTextArea(true)

    createMessage({
      variables: message,
    })
      .then((response) => {
        console.log(response.data);

          const removeFromPendingList = pendingMessages.filter(
            (item: any) => item.messageId !== pendingId
          );

          console.log({message, pendingId, removeFromPendingList: removeFromPendingList, pendingMessages})
          refetchLatestMessage().then((data) => {
            setpendingMessages(removeFromPendingList);
            deletePendingMessage(pendingId)
            setDisableTextArea(false);
          });
          console.log({message, pendingId, removeFromPendingList: removeFromPendingList})
      })
      .catch((error: any) => {
        
        const updatedMessages = pendingMessages
          .filter((item: any) => item.messageId !== pendingId)
          .concat({ ...message, delivered: "failed", messageId: pendingId });

        setpendingMessages(updatedMessages);

        localStorage.setItem(
          `${activeChannel}-${activeUser}-pending`,
          JSON.stringify(updatedMessages)
        );
        setDisableTextArea(false);
      });

      
  };

  const fetchMessages = (id: string) => {
    return [data, loading, error];
  };

  return [isAtTop, handlePageScroll, postMessage, fetchMessages, refetchLatestMessage, deletePendingMessage];
};
