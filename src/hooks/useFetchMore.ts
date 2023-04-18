import { useContext, useState } from "react";
import { useQuery } from "@apollo/client";
import { Context } from "../context/index";
import { FETCH_MORE_QUERY } from "../graphql/query";

interface Result {
  fetchOlderMessages: (isOld: boolean) => Promise<any>;
}
const usePostNewMessage = (activeChannel: string): Result => {
  const { setMessages, messages, setChatInfo } = useContext(Context);
  const [moreMessages, setMoreMessages] = useState([])


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

        console.log(result)

        if (result.length === 0) {
          setChatInfo({ active: true, message: infoText });
          return [];
        }

        // if (result.length === moreMessages.length) {
        //   return []
        // }

        result = result.map((msg: any) => {
          msg.messageId = `${msg.messageId}${
            Math.floor(Math.random() * 1000000000000) + 1
          }`;

          msg.delivered = 'success'

          return msg;
        });
        console.log(result, 'this is result', moreMessages)
        setMoreMessages(result)
        setMessages((prevState: any) => [...result, ...prevState]);

        return result;
      })
      .catch((e) => {
        console.log(e)
        setChatInfo({ active: true, message: "Error, Could not fetch messages" });
      });
  };

  return { fetchOlderMessages };
};

export default usePostNewMessage;
