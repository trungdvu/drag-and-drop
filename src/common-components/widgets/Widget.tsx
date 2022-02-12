import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
import {
  CloseOutlined,
  DragOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { IWidget } from '../../interfaces/common-interfaces';

type TWidgetProps = {
  id: string;
  widget?: IWidget;
  isDragging?: boolean;
  dragAttributes?: any;
  dragListeners?: any;
} & React.HtmlHTMLAttributes<HTMLElement>;

const Widget = React.forwardRef<any, TWidgetProps>(
  (
    { id, widget, isDragging, dragAttributes, dragListeners, ...props },
    ref
  ) => {
    const _handleRemove = () => {};

    const _handleSetting = () => {};

    const styles = {
      container: classNames(
        'min-h-[480px] origin-center bg-slate-50 shadow-md rounded',
        {
          'opacity-25': isDragging,
          [`${props.className}`]: props.className,
        }
      ),
    };

    return (
      <section ref={ref} {...props} className={styles.container}>
        <div className="flex items-center justify-between p-2 bg-blue-500 rounded-t select-none">
          <h3 className="m-0 text-lg text-white">{widget?.title}</h3>
          <div className="flex items-center">
            <Button
              {...dragAttributes}
              {...dragListeners}
              type="text"
              shape="circle"
              icon={<DragOutlined style={{ color: '#fff' }} />}
            />
            <Button
              type="text"
              shape="circle"
              icon={<SettingOutlined style={{ color: '#fff' }} />}
              onClick={_handleSetting}
            />
            <Button
              type="text"
              shape="circle"
              icon={<CloseOutlined style={{ color: '#fff' }} />}
              onClick={_handleRemove}
            />
          </div>
        </div>
        {props.children}
      </section>
    );
  }
);

export default Widget;
