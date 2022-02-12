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
import { Button, Divider } from 'antd';
import * as React from 'react';
import { connect } from 'react-redux';
import Dashboard from '../common-components/Dashboard';
import Grid from '../common-components/Grid';
import AddWidgetPlaceholder from '../common-components/widgets/AddWidgetPlaceholder';
import SortableWidgets from '../common-components/widgets/SortableWidget';
import Widget from '../common-components/widgets/Widget';
import { TDispatch, TRootState } from '../store';

type TDashboardPageProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const DashboardsPage: React.FC<TDashboardPageProps> = (props) => {
  React.useEffect(() => {
    props.doFetchDashboards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col gap-5">
      {props.dashboards &&
        props.dashboards.map((d, i) => <Dashboard key={i} dashboard={d} />)}
    </div>
  );
};

const mapState = (state: TRootState) => ({
  dashboards: state.dashboards,
});

const mapDispatch = (dispatch: TDispatch) => ({
  doFetchDashboards: dispatch.dashboards.doFetchDashboards,
});

export default connect(mapState, mapDispatch)(DashboardsPage);
