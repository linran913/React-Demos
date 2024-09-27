import {Select, Tag} from 'antd';
import {
  DndContext,
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

const tagRender = props => <TagItemRender tag={props} key={props.label} />;

const commonStyle = {
  marginInlineEnd: 4,
  cursor: 'move',
  transition: 'unset', // Prevent element from shaking after drag
};

const TagItemRender = props => {
  const {
    tag: {label, value, closable, onClose},
  } = props;

  const onPreventMouseDown = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const {listeners, transform, transition, isDragging, setNodeRef} =
    useSortable({
      id: value.id,
    });
  console.log('useSortable', transform);
  const style = transform
    ? {
        ...commonStyle,
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        transition: isDragging ? 'unset' : transition, // Improve performance/visual effect when dragging
      }
    : commonStyle;
  return (
    <Tag
      key={value.id}
      color={value.text}
      style={style}
      closable={closable}
      onClose={onClose}
      ref={setNodeRef}
      {...listeners}>
      {label}
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
  const sensors = useSensor(PointerSensor);
  const handleDragEnd = event => {
    const {active, over} = event;
    if (!over) {
      return;
    }
    if (active.id !== over.id) {
      setTagItems(data => {
        const oldIndex = data.findIndex(item => item.key === active.id);
        const newIndex = data.findIndex(item => item.key === over.id);
        return arrayMove(data, oldIndex, newIndex);
      });
    }
  };
  return (
    <DndContext
      sensors={[sensors]}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}>
      <SortableContext
        items={tagItems}
        strategy={horizontalListSortingStrategy}>
        <Select
          mode="multiple"
          tagRender={tagRender}
          value={tagItems}
          style={{
            width: '100%',
          }}
          options={options}
        />
      </SortableContext>
    </DndContext>
  );
};
export default DraggableSelect;
