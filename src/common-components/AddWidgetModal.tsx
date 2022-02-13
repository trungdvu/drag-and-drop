import { Form, Input, Modal, ModalProps, Select } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { IDashboard } from '../interfaces/common-interfaces';
import { TDispatch, TRootState } from '../store';

type TAddWidgetModalProps = {
  dashboard: IDashboard;
  onClose: () => void;
} & ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const AddWidgetModal: React.FC<ModalProps & TAddWidgetModalProps> = (props) => {
  const _title = props.title || 'Create a new Widget';
  const _okText = props.okText || 'Add to dashboard';
  const [form] = Form.useForm();

  const _onFinish = async (values: any) => {
    const newWidget = {
      ...values,
      configs: {
        id: uuidv4(),
      },
    };
    const widgets = props.dashboard.widgets
      ? [newWidget, ...props.dashboard.widgets]
      : [newWidget];

    const payload = {
      ...props.dashboard,
      widgets,
    };

    const result = await props.doCreateOrUpdateDashboard(payload);
    if (result) {
      props.onClose();
      form.resetFields();
    }
  };

  const _onCancel = () => {
    form.resetFields();
    props.onClose();
  };

  const _onOk = () => {
    form.submit();
  };

  return (
    <Modal
      {...props}
      title={_title}
      okText={_okText}
      onOk={_onOk}
      onCancel={_onCancel}
    >
      <Form
        form={form}
        name="login"
        layout="vertical"
        onFinish={_onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input placeholder="Eg. My Todos" />
        </Form.Item>
        <Form.Item
          label="Type"
          name="widgetType"
          rules={[{ required: true, message: 'Please select a type!' }]}
        >
          <Select placeholder="Select a type..." onChange={() => {}}>
            <Select.Option value="WIDGET_TEXT">Text Widget</Select.Option>
            {/* <Select.Option value="TODO">Todo list</Select.Option>
            <Select.Option value="CONTACT">Contact</Select.Option>
            <Select.Option value="CHART">Chart</Select.Option> */}
          </Select>
        </Form.Item>
        <Form.Item label="Minimum width (px)" name="minWidth">
          <Input type={'number'} />
        </Form.Item>
        <Form.Item label="Minimum height (px)" name="minHeight">
          <Input type={'number'} />
        </Form.Item>
      </Form>
      {props.children}
    </Modal>
  );
};

const mapState = (state: TRootState) => ({});

const mapDispatch = (dispatch: TDispatch) => ({
  doCreateOrUpdateDashboard: dispatch.dashboards.doCreateOrUpdateDashboard,
});

export default connect(mapState, mapDispatch)(AddWidgetModal);
