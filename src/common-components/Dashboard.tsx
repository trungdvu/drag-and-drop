import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import { Divider } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '../common-components/Grid';
import AddWidgetPlaceholder from '../common-components/widgets/AddWidgetPlaceholder';
import SortableWidgets from '../common-components/widgets/SortableWidget';
import Widget from '../common-components/widgets/Widget';
import { IDashboard } from '../interfaces/common-interfaces';
import { TDispatch, TRootState } from '../store';

type TDashboardProps = {
  dashboard: IDashboard;
} & ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const mapState = (state: TRootState) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatch = (dispatch: TDispatch) => ({
  doFetchDashboards: dispatch.dashboards.doFetchDashboards,
  doUpdateWidgets: dispatch.dashboards.doUpdateWidgets,
});

const Dashboard: React.FC<TDashboardProps> = (props) => {
  const [items, setItems] = React.useState(props.dashboard.widgets || []);
  const [activeId, setActiveId] = React.useState('');
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const _handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  React.useEffect(() => {
    setItems(props.dashboard.widgets || []);
  }, [props.dashboard]);

  const _handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex(
          (item) => item.configs.id === active.id
        );
        const newIndex = items.findIndex((item) => item.configs.id === over.id);
        const sorted = arrayMove(items, oldIndex, newIndex);
        props.doUpdateWidgets({ ...props.dashboard, widgets: sorted });
        return sorted;
      });
    }
    setActiveId('');
  };

  const _handleDragCancel = () => {
    setActiveId('');
  };

  return (
    <div className="px-2 py-5 shadow-lg bg-slate-100">
      <h1 className="text-2xl">{props.dashboard.title}</h1>
      <Divider />
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={_handleDragStart}
        onDragEnd={_handleDragEnd}
        onDragCancel={_handleDragCancel}
      >
        <SortableContext
          items={items.map((item) => ({ ...item, id: item.configs?.id }))}
          strategy={rectSortingStrategy}
        >
          <Grid columns={3}>
            {items.map((item, index) => (
              <SortableWidgets
                dashboard={props.dashboard}
                key={item.configs?.id || index}
                id={item.configs?.id}
                widget={item}
              />
            ))}
            <AddWidgetPlaceholder dashboard={props.dashboard} />
          </Grid>
        </SortableContext>
        <DragOverlay adjustScale={true}>
          {activeId ? (
            <Widget
              id={activeId}
              dashboard={props.dashboard}
              widget={items.find((item) => item.configs?.id === activeId)}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

export default connect(mapState, mapDispatch)(Dashboard);
