interface Message {
  channelId: string;
  text: string;
  userId: string;
  messageId?: number;
  datetime?: string | Date;
  delivered?: "pending" | "success" | "failed";
  postMessage?: Object;
}

export  const formatTime = (timestamp: string) => {
    const dateObj = new Date(timestamp);

    const formattedTime = dateObj.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return formattedTime;
  };

  export  const sortChat = (data: Message[] | Object[]) => {
    return [...data].sort((a: any, b: any) => {
      if (a.datetime && b.datetime) {
        return new Date(a.datetime).getTime() - new Date(b.datetime).getTime();
      } else {
        return 0;
      }
    });
  };

  export  const scrollToTop = (ref: any) => {
    if (ref && ref.current) {
      ref.current.scrollTop = 0;
    }
};

export const scrollToBottom = (ref: any) => {
  if (ref && ref.current) {
    ref.current.scrollTop = ref.current.scrollHeight;
  }
}