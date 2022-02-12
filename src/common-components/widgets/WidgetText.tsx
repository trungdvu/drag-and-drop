import React from 'react';

type TWidgetText = {
  text?: string;
};

const WidgetText: React.FC<TWidgetText> = (props) => {
  return <p>{props.text}</p>;
};

export default WidgetText;
