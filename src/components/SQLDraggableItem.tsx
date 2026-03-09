import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SQLElement } from '../types';

interface SQLDraggableItemProps {
  element: SQLElement;
}

const SQLDraggableItem: React.FC<SQLDraggableItemProps> = ({ element }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: element.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getElementTypeColor = (type: SQLElement['type']) => {
    switch (type) {
      case 'keyword':
        return 'bg-blue-500 text-white border-blue-600';
      case 'identifier':
        return 'bg-green-700 text-white border-green-800';
      case 'operator':
        return 'bg-gray-500 text-white border-gray-600';
      case 'value':
        return 'bg-yellow-500 text-white border-yellow-600';
      case 'function':
        return 'bg-purple-500 text-white border-purple-600';
      default:
        return 'bg-gray-400 text-white border-gray-500';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`
        ${getElementTypeColor(element.type)}
        px-4 py-2 m-1 rounded-lg border-2 cursor-move
        hover:scale-105 transition-transform duration-200
        font-mono text-sm font-semibold
        shadow-md hover:shadow-lg
        select-none
      `}
    >
      {element.content}
    </div>
  );
};

export default SQLDraggableItem;
