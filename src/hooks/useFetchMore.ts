import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Context } from "../context/index";
import { FETCH_MORE_QUERY } from "../graphql/query";

interface Result {
  fetchOlderMessages: (isOld: boolean) => Promise<any>;
}
const usePostNewMessage = (activeChannel: string): Result => {
  const { setMessages, messages, setChatInfo } = useContext(Context);

  const {
    loading: fetchMoreloading,
    error: fetchMoreError,
    data: fetchMoreData,
    fetchMore: fetchMoreMessages,
  } = useQuery(FETCH_MORE_QUERY, {
    variables: {
      channelId: activeChannel,
      messageId: messages[0]?.messageId || `8547721563293334503`,
      old: false,
    },
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data) {
        console.log(data, "+++++ thsis is data???");
      }
      return data;
    },
  });

  const fetchOlderMessages = async (isOld: boolean) => {
    return fetchMoreMessages({
      variables: {
        channelId: activeChannel,
        messageId: messages[0]?.messageId || `8547721563293334503`,
        old: isOld || false,
      },
    })
      .then((data: any) => {
        let result = data?.data.fetchMoreMessages;
        let infoText = isOld ? 'Could not fetch previous messages' : 'No recent messages'


        if (result.length === 0) {
          setChatInfo({ active: true, message: infoText });
          return [];
        }

        result = result.map((msg: any) => {
          msg.messageId = `${msg.messageId}${
            Math.floor(Math.random() * 1000000000000) + 1
          }`;

          return msg;
        });

        setMessages((prevState: any) => [...result, ...prevState]);

        return result;
      })
      .catch(() => {
        setChatInfo({ active: true, message: "Error, Could not fetch messages" });
      });
  };

  return { fetchOlderMessages };
};

export default usePostNewMessage;
