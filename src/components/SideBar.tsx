import React from "react";
import "./SideBar.scss";
import tw from 'tailwindcss'

type AppProps = {
  message: string;
};

const SideBar = ({ message }: AppProps) => {
  return (
    <section className="side-bar">
      <div className="side-bar__option-section">
        <h1 className="side-bar__header">Choose your user</h1>
        <select>
          <option value="">hello world</option>
          <option value="">hello world</option>
          <option value="">hello world</option>
          <option value="">hello world</option>
        </select>
      </div>

      <div className="side-bar__option-section">
        <h1 className="side-bar__header">Choose your user</h1>
        <ul>
          <li>General Channel</li>
          <li>Technology Channel</li>
          <li>LGTM Channel</li>
        </ul>
      </div>
    </section>
  );
};

export default SideBar;
