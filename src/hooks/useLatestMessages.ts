import { useQuery, QueryResult } from "@apollo/client";
import { GET_LATEST_MESSAGES } from "../graphql/query";

interface Message {
  // define the properties of your Message type
}

interface LatestMessagesQueryData {
  fetchLatestMessages: Message[];
}

interface LatestMessagesQueryVariables {
  channelId: string;
}

// function useLatestMessages(activeChannel: string): QueryResult<LatestMessagesQueryData, LatestMessagesQueryVariables> {
//   const { data, loading, error, refetch: refetchLatestMessage } = useQuery<LatestMessagesQueryData, LatestMessagesQueryVariables>(GET_LATEST_MESSAGES, {
//     variables: { channelId: activeChannel },
//     fetchPolicy: "network-only",
//     onCompleted: (data) => {
//       if (data) {
//         let result = data.fetchLatestMessages;

//         result = result.map((message: Message) => ({
//           ...message,
//           delivered: "success",
//         }));

//         updatePendingMessages()

//         setMessages(result);
//       }
//     },
//   });

//   return { data, loading, error, refetchLatestMessage };
// }

// export default useLatestMessages;