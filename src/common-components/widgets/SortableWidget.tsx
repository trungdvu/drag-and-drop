import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import Widget from './Widget';

type TSortableWidgetProps = {
  id: string;
  title?: string;
  faded?: boolean;
};

const SortableWidgets = (props: TSortableWidgetProps) => {
  const sortable = useSortable({ id: props.id });
  const { attributes, listeners, setNodeRef, transform, transition } = sortable;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Widget
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}
    />
  );
};

export default SortableWidgets;
