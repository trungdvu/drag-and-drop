import {
  CloseOutlined,
  DragOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { IDashboard, IWidget } from '../../interfaces/common-interfaces';
import WidgetText from './WidgetText';

type TWidgetProps = {
  id: string;
  widget?: IWidget;
  mode?: 'VIEW' | 'EDIT';
  dashboard: IDashboard;
  isDragging?: boolean;
  dragAttributes?: any;
  dragListeners?: any;
} & React.HtmlHTMLAttributes<HTMLElement>;

const Widget = React.forwardRef<any, TWidgetProps>(
  (
    {
      id,
      widget,
      dashboard,
      isDragging,
      dragAttributes,
      dragListeners,
      ...props
    },
    ref
  ) => {
    const _handleRemove = () => {};

    const _handleSetting = () => {};

    const _renderWidget = (widget?: IWidget) => {
      if (!widget) {
        return null;
      } else if (widget.widgetType === 'WIDGET_TEXT') {
        return <WidgetText dashboard={dashboard} widget={widget} />;
      } else {
        return null;
      }
    };

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
            {props.mode === 'EDIT' && (
              <React.Fragment>
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
              </React.Fragment>
            )}
          </div>
        </div>
        {_renderWidget(widget)}
        {props.children}
      </section>
    );
  }
);

export default Widget;
