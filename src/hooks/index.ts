/* eslint-disable react-hooks/rules-of-hooks */
import { RefObject, useContext, useEffect } from "react";
import { Context } from "../context/index";
import useLatestMessages from "./useLatestMessage";
import usePostNewMessage from "./usePostNewMessage";
import useFetchMore from "./useFetchMore";
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
  handlePageScroll: (ref: RefObject<HTMLDivElement>) => void ,
  postMessage: (message: Message, pendingId: string) => void,
  refetchLatestMessage: () => Promise<any>,
  deletePendingMessage: (messageId: string) => Promise<boolean>,
  fetchOlderMessages: () => Promise<boolean>,
}

export const useChat = (): Result => {
  
  const { activeChannel, setIsAtTopOfPage } = useContext(Context);

  const { refetchLatestMessage } = useLatestMessages(activeChannel);

  const { deletePendingMessage, postMessage } =
    usePostNewMessage(activeChannel);
  const { fetchOlderMessages } = useFetchMore(activeChannel);


  const handlePageScroll = (ref: RefObject<HTMLDivElement>): void => {
    const handleScroll = (): void => {
      const div = ref.current;
      if (div) {
        const scrollTop = div.scrollTop;
        const scrollHeight = div.scrollHeight;
        setIsAtTopOfPage(scrollTop <= scrollHeight * 0.3 && scrollTop >= 0);
      }
    };

    const div = ref.current;
    if (div) {
      div.addEventListener("scroll", handleScroll);
    }
  };


  return {
    handlePageScroll,
    postMessage,
    refetchLatestMessage,
    deletePendingMessage,
    fetchOlderMessages,
  };
};
