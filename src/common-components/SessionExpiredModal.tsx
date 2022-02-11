import { Modal, ModalProps } from 'antd';

function SessionExpiredModal(props: ModalProps) {
  const _title = props.title || 'Your session has been expired!';
  const _cancelButtonProps = {
    hidden: true,
    ...props.cancelButtonProps,
  };
  const _okText = props.okText || 'Go to login page';

  return (
    <Modal
      {...props}
      title={_title}
      cancelButtonProps={_cancelButtonProps}
      okText={_okText}
    >
      <p>Please try to login again...</p>
    </Modal>
  );
}

export default SessionExpiredModal;
