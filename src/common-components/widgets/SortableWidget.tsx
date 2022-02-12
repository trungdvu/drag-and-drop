import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import { IWidget } from '../../interfaces/common-interfaces';
import Widget from './Widget';

type TSortableWidgetProps = {
  id: string;
  widget: IWidget;
};

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

export default SortableWidgets;
