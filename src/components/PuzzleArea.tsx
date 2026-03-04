import React from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SQLElement } from '../types';
import SQLDraggableItem from './SQLDraggableItem';

interface PuzzleAreaProps {
  elements: SQLElement[];
  onElementsChange: (elements: SQLElement[]) => void;
  disabled?: boolean;
}

const PuzzleArea: React.FC<PuzzleAreaProps> = ({ 
  elements, 
  onElementsChange, 
  disabled = false 
}) => {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = elements.findIndex((element) => element.id === active.id);
      const newIndex = elements.findIndex((element) => element.id === over?.id);
      
      const newElements = arrayMove(elements, oldIndex, newIndex);
      onElementsChange(newElements);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-gray-100 rounded-lg p-6 min-h-[200px] border-2 border-gray-300 border-dashed">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={elements.map(el => el.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-wrap gap-2 justify-center items-center min-h-[120px]">
              {elements.length === 0 ? (
                <div className="text-gray-400 text-center py-8">
                  <p className="text-lg">Drop SQL elements here</p>
                  <p className="text-sm mt-2">Drag and drop to arrange them in the correct order</p>
                </div>
              ) : (
                elements.map((element) => (
                  <SQLDraggableItem key={element.id} element={element} />
                ))
              )}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default PuzzleArea;
