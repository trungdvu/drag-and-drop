import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import React from 'react';
import { IDashboard } from '../../interfaces/common-interfaces';
import AddWidgetModal from '../AddWidgetModal';

type AddWidgetPlaceholderProps = {
  dashboard: IDashboard;
};

const AddWidgetPlaceholder: React.FC<AddWidgetPlaceholderProps> = (props) => {
  const [isAddWidgetModalOpen, setIsAddWidgetModalOpen] = React.useState(false);

  const _handleAddWidgetModalOpen = () => {
    setIsAddWidgetModalOpen(true);
  };

  const _handleAddWidgetModalClose = () => {
    setIsAddWidgetModalOpen(false);
  };

  return (
    <>
      <AddWidgetModal
        visible={isAddWidgetModalOpen}
        dashboard={props.dashboard}
        onClose={_handleAddWidgetModalClose}
      />
      <section className="relative min-h-[480px] origin-center bg-slate-50 shadow-md rounded">
        <div className="p-2 bg-blue-500 rounded-t select-none">
          <h3 className="m-0 text-lg text-white">Add Widget</h3>
        </div>
        <div className="absolute top-0 left-0 w-full h-full">
          <Button
            type="ghost"
            icon={
              <PlusOutlined
                style={{
                  fontSize: '4rem',
                  color: 'rgb(163 163 163)',
                }}
              />
            }
            style={{ height: '100%', width: '100%' }}
            onClick={_handleAddWidgetModalOpen}
          />
        </div>
      </section>
    </>
  );
};

export default AddWidgetPlaceholder;
