import React, { createContext, useState, ReactNode } from "react";

interface ContextType {
  messages: Message[];
  setMessages: Function;
  channels: {
    name: string,
    channelId: string
  }[];
  users: string[];
  activeChannel: string;
  setActiveChannel: Function;
  activeUser: string;
  setActiveUser: Function;
  pendingMessages: Object[],
  setpendingMessages: Function,
  disableTextArea: boolean,
  setDisableTextArea: Function,
}

interface Message {
  channelId: string;
  text: string;
  userId: string;
  messageId?: number;
  datetime?: string | Date;
  delivered?: 'pending' | 'success' | 'failed';
  postMessage?: Object
}

interface ProviderProps {
  children: ReactNode;
}

const Context = createContext<ContextType>({
  messages: [],
  setMessages: () => {},
  channels: [],
  users: [],
  activeChannel: "",
  activeUser: "",
  setActiveUser: () => {},
  setActiveChannel: () => "",
  pendingMessages: [],
  setpendingMessages: () => {},
  disableTextArea: false,
  setDisableTextArea: () => {},
});

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [activeChannel, setActiveChannel] = useState("General");
  const [activeUser, setActiveUser] = useState("Sam");
  const [pendingMessages, setpendingMessages] = useState<Message[]>([])
  const [disableTextArea, setDisableTextArea] = useState(false);
  const channels = [
    {
      channelId: "1",
      name: "General",
    },
    {
      channelId: "2",
      name: "Technology",
    },
    {
      channelId: "3",
      name: "LGTM",
    },
  ]
  const users = ["Sam", "Russell", "Joyse"]

  const contextValue = {
    messages,
    setMessages,
    users,
    activeChannel,
    activeUser,
    setActiveChannel,
    setActiveUser,
    pendingMessages,
    setpendingMessages,
    disableTextArea,
    setDisableTextArea,
    channels,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};

export { Context, Provider };
