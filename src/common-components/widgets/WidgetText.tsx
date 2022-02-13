import { Input } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { IDashboard, IWidget } from '../../interfaces/common-interfaces';
import { TDispatch, TRootState } from '../../store';

type TWidgetText = {
  widget: IWidget;
  dashboard: IDashboard;
} & ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const WidgetText: React.FC<TWidgetText> = (props) => {
  const timeoutRef = React.useRef<any>();
  const [text, setText] = React.useState(props.widget.configs.text || '');

  // React.useEffect(() => {
  //   return () => {
  //     if (timeoutRef.current) {
  //       // eslint-disable-next-line react-hooks/exhaustive-deps
  //       clearTimeout(timeoutRef.current);
  //     }
  //   };
  // }, []);

  const _onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setText(value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      const payload = {
        dashboard: props.dashboard,
        widget: {
          ...props.widget,
          configs: {
            ...props.widget.configs,
            text: value,
          },
        },
      };
      props.doUpdateWidgetText(payload);
    }, 500);
  };

  return (
    <Input.TextArea
      value={text}
      onChange={_onChange}
      style={{ minHeight: '432px', backgroundColor: 'transparent' }}
    >
      {props.widget.configs.text}
    </Input.TextArea>
  );
};

const mapState = (state: TRootState) => ({});

const mapDispatch = (dispatch: TDispatch) => ({
  doUpdateWidgetText: dispatch.dashboards.doUpdateWidgetText,
});

export default connect(mapState, mapDispatch)(WidgetText);
