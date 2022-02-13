import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { connect } from 'react-redux';
import { IDashboard, IWidget } from '../../interfaces/common-interfaces';
import { TDispatch, TRootState } from '../../store';
import Widget from './Widget';

type TSortableWidgetProps = {
  id: string;
  widget: IWidget;
  dashboard: IDashboard;
  mode?: 'VIEW' | 'EDIT';
} & ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;

const SortableWidgets = (props: TSortableWidgetProps) => {
  const sortable = useSortable({ id: props.id });
  const {
    attributes,
    listeners,
    setNodeRef,
    isDragging,
    transform,
    transition,
  } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Widget
      ref={setNodeRef}
      style={style}
      isDragging={isDragging}
      dragAttributes={attributes}
      dragListeners={listeners}
      {...props}
    />
  );
};

const mapState = (state: TRootState) => ({});

const mapDispatch = (dispatch: TDispatch) => ({
  doRemoveWidget: dispatch.dashboards.doRemoveWidget,
});

export default connect(mapState, mapDispatch)(SortableWidgets);
