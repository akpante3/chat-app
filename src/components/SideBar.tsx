import React from "react";
import "./SideBar.scss";
import Icons from "./Icons";

type AppProps = {
  classes?: string[];
  handleToggleSidebar: Function;
  channels:{
    name: string,
    channelId: string
  }[],
  users:string[],
  handleUserChange: (event: React.ChangeEvent<HTMLSelectElement>) => any,
  handleChannelClick: (channel: object) => {},
  activeChannel: string
};

const SideBar = ({ activeChannel, classes, handleToggleSidebar, channels, users, handleUserChange, handleChannelClick }: AppProps) => {

  return (
    <aside className={`side-bar ${classes?.join(" ")}`}>
      <div className="side-bar__hamburger">
        <span onClick={() => handleToggleSidebar()}>
          <Icons name={"hamburger"} size={"40px"} />
        </span>
      </div>
      <div className="side-bar__option-section">
        <h1 className="side-bar__header">Choose your user</h1>
        <select onChange={(e:any) => handleUserChange(e.target.value)}>
          {users.map((user: string) => <option key={user} value={user}>{user}</option>)}
        </select>
      </div>

      <div className="side-bar__option-section">
        <h1 className="side-bar__header">Choose your user</h1>
        <ul>
          {channels.map((channel: any) => <li className={`${activeChannel === channel.name ? 'side-bar__channel-active': ''} side-bar__channel-section`} onClick={() => handleChannelClick(channel.name)} key={channel.channelId} value="">{channel.name}</li>)}
        </ul>
      </div>
    </aside>
  );
};

export default SideBar;
