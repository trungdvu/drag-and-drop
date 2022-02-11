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
import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '../common-components/Grid';
import SortableWidgets from '../common-components/widgets/SortableWidget';
import Widget from '../common-components/widgets/Widget';
import { TDispatch, TRootState } from '../store';

const widgets = [
  {
    id: '0',
    title: 'hello 1',
  },
  {
    id: '1',
    title: 'hello 2',
  },
  {
    id: '2',
    title: 'hellp 3',
  },
  {
    id: '3',
    title: 'hellp 4',
  },
  {
    id: '4',
    title: 'hellp 5',
  },
];

type TDashboardPageProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const DashboardPage: React.FC<TDashboardPageProps> = (props) => {
  const [items, setItems] = React.useState(widgets);
  const [activeId, setActiveId] = React.useState('');
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const _handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const _handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId('');
  };

  const _handleDragCancel = () => {
    setActiveId('');
  };
  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={_handleDragStart}
        onDragEnd={_handleDragEnd}
        onDragCancel={_handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid columns={3}>
            {items.map((item) => (
              <SortableWidgets
                key={item.id}
                id={item.id}
                faded={item.id === activeId ? true : false}
                title={item.title}
              />
            ))}
          </Grid>
        </SortableContext>
        <DragOverlay adjustScale={true}>
          {activeId ? (
            <Widget
              id={activeId}
              title={items.find((item) => item.id === activeId)?.title}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

const mapState = (state: TRootState) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatch = (dispatch: TDispatch) => ({
  doLogin: dispatch.auth.doLogin,
});

export default connect(mapState, mapDispatch)(DashboardPage);
