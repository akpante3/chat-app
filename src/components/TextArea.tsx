import React, { useState } from "react";
import Button from "./Button";
import './TextArea.scss'

interface Props {
  handleMessageSubmit: Function,
  isDisabled?: boolean,
  inputValue: string,
  setInputValue: Function
}

const TextArea: React.FC<Props> = ({handleMessageSubmit, isDisabled= false, inputValue, setInputValue }) => {

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement> | React.KeyboardEvent) => {
    event.preventDefault();
    handleMessageSubmit(inputValue)
    setInputValue('')
  };

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if ( e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e); 
    }
  }


  return (
    <form onSubmit={handleSubmit} className="text-area">
      <div  className="text-area__text">
        <textarea
          className="text-area__input"
          rows={1}
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
          maxLength={250}
          disabled={isDisabled}
          placeholder="Type your message here..."
        />
        <Button  classes={['text-area__button']}width={'50px'} icon={'send'} isDisabled={isDisabled} />
      </div>
    </form>
  );
};

export default TextArea;
