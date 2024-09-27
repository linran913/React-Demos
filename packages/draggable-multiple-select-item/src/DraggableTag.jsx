import React, {useState} from 'react';
import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import {Flex, Tag} from 'antd';
const commonStyle = {
  cursor: 'move',
  transition: 'unset', // Prevent element from shaking after drag
};
const DraggableTag = props => {
  const {tag} = props;
  const {listeners, transform, transition, isDragging, setNodeRef} =
    useSortable({
      id: tag.id,
    });
  const style = transform
    ? {
        ...commonStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging ? 'unset' : transition, // Improve performance/visual effect when dragging
      }
    : commonStyle;
  return (
    <Tag style={style} ref={setNodeRef} {...listeners}>
      {tag.text}
    </Tag>
  );
};
const DraggableTagList = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      text: 'Tag 1',
    },
    {
      id: 2,
      text: 'Tag 2',
    },
    {
      id: 3,
      text: 'Tag 3',
    },
  ]);
  const sensors = useSensors(useSensor(PointerSensor));
  const handleDragEnd = event => {
    const {active, over} = event;
    if (!over) {
      return;
    }
    if (active.id !== over.id) {
      setItems(data => {
        const oldIndex = data.findIndex(item => item.id === active.id);
        const newIndex = data.findIndex(item => item.id === over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  };
  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}>
      <SortableContext items={items} strategy={horizontalListSortingStrategy}>
        <Flex gap="4px 0" wrap>
          {items.map(item => (
            <DraggableTag tag={item} key={item.id} />
          ))}
        </Flex>
      </SortableContext>
    </DndContext>
  );
};
export default DraggableTagList;
