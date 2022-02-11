import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Widget from './Widget';

interface ISortableWidgetProps {
  id: string;
  title?: string;
  faded?: boolean;
}

const SortableWidgets = (props: ISortableWidgetProps) => {
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
