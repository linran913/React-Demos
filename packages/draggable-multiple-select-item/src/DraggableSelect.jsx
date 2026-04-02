import {Select, Tag} from 'antd';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';
import {useState} from 'react';

const options = [
  {
    value: 'gold',
  },
  {
    value: 'lime',
  },
  {
    value: 'green',
  },
  {
    value: 'cyan',
  },
  {
    value: 'magenta',
  },
  {
    value: 'volcano',
  },
  {
    value: 'orange',
  },
  {
    value: 'blue',
  },
  {
    value: 'geekblue',
  },
  {
    value: 'purple',
  },
  {
    value: 'red',
  },
];

const commonStyle = {
  marginInlineEnd: 4,
  cursor: 'move',
};

const TagItemRender = props => {
  const {
    activeId,
    tag: {label, value, closable, onClose},
  } = props;

  const onPreventMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const {attributes, listeners, transform, transition, isDragging, setNodeRef} =
    useSortable({
      id: value.id,
    });

  const style = {
    ...commonStyle,
    opacity: isDragging && activeId === value.id ? 0 : 1,
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'unset' : transition,
  };

  return (
    <Tag
      key={value.id}
      color={value.text}
      style={style}
      closable={closable}
      onClose={onClose}
      onMouseDown={onPreventMouseDown}
      ref={setNodeRef}
      {...attributes}
      {...listeners}>
      {label}
    </Tag>
  );
};

const DragOverlayTag = ({item}) => {
  if (!item) {
    return null;
  }

  return (
    <Tag color={item.value.text} style={commonStyle}>
      {item.label}
    </Tag>
  );
};

const DraggableSelect = () => {
  const [tagItems, setTagItems] = useState([
    {
      key: 1,
      label: 'gold',
      value: {
        id: 1,
        text: 'gold',
      },
    },
    {
      key: 2,
      label: 'cyan',
      value: {
        id: 2,
        text: 'cyan',
      },
    },
    {
      key: 3,
      label: 'purple',
      value: {
        id: 3,
        text: 'purple',
      },
    },
    {
      key: 4,
      label: 'geekblue',
      value: {
        id: 4,
        text: 'geekblue',
      },
    },
  ]);
  const [activeTagId, setActiveTagId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 4,
      },
    }),
  );

  const activeTag = tagItems.find(item => item.value.id === activeTagId);

  const handleDragStart = event => {
    setActiveTagId(event.active.id);
  };

  const clearActiveTag = () => {
    requestAnimationFrame(() => {
      setActiveTagId(null);
    });
  };

  const handleDragEnd = event => {
    const {active, over} = event;

    if (!over) {
      clearActiveTag();
      return;
    }

    if (active.id !== over.id) {
      setTagItems(data => {
        const oldIndex = data.findIndex(item => item.value.id === active.id);
        const newIndex = data.findIndex(item => item.value.id === over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }

    clearActiveTag();
  };

  const handleDragCancel = () => {
    setActiveTagId(null);
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      collisionDetection={closestCenter}>
      <SortableContext
        items={tagItems.map(item => item.value.id)}
        strategy={horizontalListSortingStrategy}>
        <Select
          mode="multiple"
          tagRender={tag => (
            <TagItemRender tag={tag} activeId={activeTagId} key={tag.label} />
          )}
          value={tagItems}
          style={{
            width: '100%',
          }}
          options={options}
        />
      </SortableContext>
      <DragOverlay dropAnimation={null}>
        <DragOverlayTag item={activeTag} />
      </DragOverlay>
    </DndContext>
  );
};
export default DraggableSelect;
