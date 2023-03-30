import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import {MdCheck, MdClose} from "react-icons/md";
import {
  BsFillSendFill,
  BsArrowDownCircle,
  BsArrowUpCircle,
  BsChevronDoubleLeft,
  BsCheckAll,
  BsCheck,
  BsTrash,
  BsArrowCounterclockwise,
} from "react-icons/bs";

interface Props {
  name:
    | "arrow-up"
    | "arrow-down"
    | "send"
    | "hamburger"
    | "chevronDouble"
    | "check-all"
    | "check-one"
    | "trash" | "retry" | "close" | "check";
  size?: string;
}

const Icons: React.FC<Props> = ({ name, size }) => {
  // use dynamic imports to fix this
  const iconMap = {
    "arrow-up": <BsArrowUpCircle size={size || "18px"} />,
    "arrow-down": <BsArrowDownCircle size={size || "18px"} />,
    send: <BsFillSendFill size={size || "18px"} />,
    hamburger: <GiHamburgerMenu size={size || "18px"} />,
    chevronDouble: <BsChevronDoubleLeft size={size || "18px"} />,
    "check-one": <BsCheck size={size || "18px"} />,
    "check-all": <BsCheckAll size={size || "18px"} />,
    trash: <BsTrash size={size || "18px"} />,
    'retry': <BsArrowCounterclockwise size={size || "18px"} />,
    'check': <MdCheck size={size|| '18px'} />,
    'close': <MdClose size={size|| '18px'} />
  };
  return iconMap[name];
};

export default Icons;
