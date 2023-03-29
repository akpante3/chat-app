import React, { useState,  useContext } from "react";
import SideBar from "./components/SideBar";
import ChatSection from "./components/ChatSection";
import { Context } from "./context";
import "./App.scss";

const App: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
 const {setActiveUser, activeChannel, activeUser, channels, setActiveChannel, users} = useContext(Context);


  return (
      <main className="main-container">
        <div>
          <SideBar
            handleToggleSidebar={() =>
              setShowSidebar((prevState) => !prevState)
            }
            activeChannel={activeChannel}
            channels={channels}
            users={users}
            handleUserChange={(value:any) => setActiveUser(value)}
            handleChannelClick= {(value) => setActiveChannel(value)}
            classes={[
              "main-container__side-bar",
              showSidebar
                ? "main-container__side-bar--open"
                : "main-container__side-bar--closed",
            ]}
          />
        </div>
        <section className="main-container__chat-section">
          {" "}
          <ChatSection
            headerText={activeChannel}
            handleToggleSidebar={() =>
              setShowSidebar((prevState) => !prevState)
            }
          />
        </section>
      </main>
  );
};

export default App;
