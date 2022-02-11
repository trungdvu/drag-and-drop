import React from 'react';

interface IWidgetProps {
  url?: any;
  index?: any;
  faded?: any;
  style?: any;
}
const Widget: React.FC<IWidgetProps> = React.forwardRef(
  ({ url, index, faded, style, ...props }, ref: any) => {
    const inlineStyles = {
      opacity: faded ? '0.2' : '1',
      transformOrigin: '0 0',
      height: index === 0 ? 300 : 300,
      gridRowStart: index === 0 ? null : null,
      gridColumnStart: index === 0 ? null : null,
      backgroundImage: `url("${url}")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundColor: 'grey',
      ...style,
    };

    return <div ref={ref} style={inlineStyles} {...props} />;
  }
);

export default Widget;
