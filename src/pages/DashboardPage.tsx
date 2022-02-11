import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, RootState } from '../store';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';
import Grid from '../common-components/Grid';
import Widget from '../common-components/widgets/Widget';
import SortableWidgets from '../common-components/widgets/SortableWidgets';
import widgets from './widgets.json';

type DashboardPageProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const DashboardPage: React.FC<DashboardPageProps> = (props) => {
  const [items, setItems] = React.useState(widgets);
  const [activeId, setActiveId] = React.useState(null);
  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  function handleDragStart(event: any) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  function handleDragCancel() {
    setActiveId(null);
  }
  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <SortableContext items={items} strategy={rectSortingStrategy}>
          <Grid columns={3}>
            {items.map((url, index) => (
              <SortableWidgets key={url} url={url} index={index} />
            ))}
          </Grid>
        </SortableContext>

        <DragOverlay adjustScale={true}>
          {activeId ? (
            <Widget url={activeId} index={items.indexOf(activeId)} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
};

const mapState = (state: RootState) => ({
  currentUser: state.auth.currentUser,
});

const mapDispatch = (dispatch: Dispatch) => ({
  doLogin: dispatch.auth.doLogin,
});

export default connect(mapState, mapDispatch)(DashboardPage);
