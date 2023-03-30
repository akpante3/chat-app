import { useContext, useEffect } from "react";
import { useQuery, QueryResult } from "@apollo/client";
import { GET_LATEST_MESSAGES } from "../graphql/query";
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

interface Result {
  lastestMessageData: any;
  loading: boolean;
  error?: string | undefined;
  refetchLatestMessage: () => Promise<any>;
}

const useLatestMessages = (activeChannel: string): Result => {
  const {
    setMessages,
    setpendingMessages,
    activeUser,
    textAreaValue,
    setTextAreaValue,
  } = useContext(Context);

  const updatePendingMessages = () => {
    let getPendingMessages = localStorage.getItem(
      `${activeChannel}-${activeUser}-pending`
    );

    if (
      typeof getPendingMessages === "string" &&
      JSON.parse(getPendingMessages).length
    ) {
      setpendingMessages([...JSON.parse(getPendingMessages)]);
    } else {
      setpendingMessages([]);
    }
  };

  const updateTextArea = () => {
    const getTextAreaValue = localStorage.getItem(
      `${activeChannel}-${activeUser}-text-area`
    );
    if (getTextAreaValue) setTextAreaValue(getTextAreaValue);
    
  };


  useEffect(() => {
    localStorage.setItem(
      `${activeChannel}-${activeUser}-text-area`,
      textAreaValue
    );
  }, [textAreaValue]);

  useEffect(() => {
    updatePendingMessages();
    updateTextArea()
  }, [activeUser, activeChannel]);

  const {
    data: lastestMessageData,
    loading,
    error,
    refetch: refetchLatestMessage,
  } = useQuery(GET_LATEST_MESSAGES, {
    variables: { channelId: activeChannel },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data) {
        let result = data.fetchLatestMessages;

        result = result.map((message: Message) => ({
          ...message,
          delivered: "success",
        }));

        updatePendingMessages();

        setMessages(result);
      }
    },
  });

  return { lastestMessageData, loading, refetchLatestMessage };
};

export default useLatestMessages;
