
import { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Context } from "../context/index";
import { FETCH_MORE_QUERY } from "../graphql/query";


interface Result {
    fetchOlderMessages: () => Promise<any>;
  }
const usePostNewMessage = (activeChannel: string): Result => {

    const {
        setMessages,
        messages,
      } = useContext(Context);

    const { loading:fetchMoreloading, error: fetchMoreError, data: fetchMoreData, fetchMore:fetchMoreMessages } = useQuery(FETCH_MORE_QUERY, {
        variables: { channelId: activeChannel, messageId: messages[0]?.messageId || `8547721563293334503`, old: true },
        fetchPolicy: 'network-only',
        onCompleted: (data) => {
          if (data) {
              console.log(data, '+++++ thsis is data???')
          }
          return data
        },
      });

      const fetchOlderMessages = async () => {
        console.log(messages[0]?.messageId)
       return fetchMoreMessages({
          variables: {
            channelId: activeChannel,
            messageId: messages[0]?.messageId || `8547721563293334503`,
            old: true,
          },
        }).then((data:any) => {
          const result = data?.data.fetchMoreMessages
          setMessages((prevState:any)=> [...result, ...prevState])
          return result
        });
      };

    return {fetchOlderMessages}
}

export default usePostNewMessage