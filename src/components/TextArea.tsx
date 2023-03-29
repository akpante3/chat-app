import React, { useState } from "react";
import Button from "./Button";
import './TextArea.scss'

interface Props {
  handleMessageSubmit: Function,
  isDisabled?: boolean
}

const TextArea: React.FC<Props> = ({handleMessageSubmit, isDisabled= false}) => {
  const [input, setInput] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log('submit bitch')
    handleMessageSubmit(input)
    // Handle the form submission here
  };


  return (
    <form onSubmit={handleSubmit} className="text-area">
      <div  className="text-area__text">
        <textarea
          className="text-area__input"
          rows={1}
          value={input}
          onChange={handleInputChange}
          maxLength={250}
          disabled={isDisabled}
          placeholder="Type your message here..."
        />
      </div>
      <div className="text-area__footer">
        <Button text={'Send'} icon={'send'} isDisabled={isDisabled} />
        <div className="text-area__footer-text-counter">{`${input.length}/250`}</div>
      </div>
    </form>
  );
};

export default TextArea;
