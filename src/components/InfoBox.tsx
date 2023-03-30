import React from "react";
import './InfoBox.scss';

interface Props {
  active: boolean;
  message: string
}

const InfoBox: React.FC<Props> = ({ active, message='I am info-box' }) => {
  return (
<div className={`${active ? 'info-box-active':  'info-box-inactive'} info-box`} >{message}</div>
  );
};

export default InfoBox;
