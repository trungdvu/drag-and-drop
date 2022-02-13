import { Form, Input, Modal, ModalProps } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { TDispatch, TRootState } from '../store';

type TAddDashboardModalProps = {
  onClose: () => void;
} & ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const AddDashboardModal: React.FC<ModalProps & TAddDashboardModalProps> = (
  props
) => {
  const _title = props.title || 'Add a new Dashboard';
  const _okText = props.okText || 'Create';
  const [form] = Form.useForm();

  const _onFinish = async (values: any) => {
    const payload = {
      title: values.dashboardTitle,
    };
    const result = await props.doCreateOrUpdateDashboard(payload);
    if (result) {
      props.onClose();
      form.resetFields();
    }
  };

  const _onCancel = () => {
    props.onClose();
    form.resetFields();
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
          label="Dashboard title"
          name="dashboardTitle"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input placeholder="Eg. My beautiful board" />
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

export default connect(mapState, mapDispatch)(AddDashboardModal);
