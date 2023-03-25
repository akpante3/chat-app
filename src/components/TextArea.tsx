import React, { useState } from "react";
import './TextArea.scss'

interface Props {}

const TextArea: React.FC<Props> = (props) => {
  const [input, setInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle the form submission here
  };

  return (
    <form onSubmit={handleSubmit} className="text-area">
      <textarea
        className="text-area__input"
        rows={1}
        value={input}
        onChange={handleInputChange}
        maxLength={250}
        placeholder="Type your message here..."
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-full text-white font-medium focus:outline-none focus:ring-2 focus:ring-opacity-50"
      >
        Send
      </button>
    </form>
  );
};

export default TextArea;
