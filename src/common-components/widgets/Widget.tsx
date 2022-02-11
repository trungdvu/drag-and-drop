import classNames from 'classnames';
import React from 'react';

type TWidgetProps = {
  id: string;
  title?: string;
  faded?: boolean;
} & React.HtmlHTMLAttributes<HTMLElement>;

const Widget = React.forwardRef<any, TWidgetProps>((props, ref) => {
  const styles = {
    container: classNames('min-h-[480px] origin-center bg-slate-200 rounded', {
      'opacity-30': props.faded,
      [`${props.className}`]: props.className,
    }),
  };

  return (
    <div ref={ref} {...props} className={styles.container}>
      <div className="flex items-center p-2 bg-blue-500 rounded-t">
        <h3 className="m-0 text-base">{props.title}</h3>
      </div>
      {props.children}
    </div>
  );
});

export default Widget;
