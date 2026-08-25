import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { memo } from 'react';
import DragHandleIcon from '@/assets/svg/20px/ic_drag_handle.svg?react';
import SponsorItemCard from './SponsorItemCard';
import {
  GroupHandle,
  GroupHeader,
  GroupName,
  GroupProductList,
  GroupSectionWrapper,
} from '@/pages/manage/booth/style';

function SponsorItemGroupSection({ section, onEditItem, onDeleteItem }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: `section:${section.id}`, data: { type: 'section' } });

  const { setNodeRef: setDropRef } = useDroppable({
    id: `container:${section.id}`,
    data: { type: 'container', sectionId: section.id },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <GroupSectionWrapper ref={setNodeRef} style={style}>
      <GroupHeader>
        <GroupHandle {...attributes} {...listeners}>
          <DragHandleIcon />
          <GroupName>{section.name}</GroupName>
        </GroupHandle>
      </GroupHeader>

      <SortableContext
        items={section.items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <GroupProductList ref={setDropRef}>
          {section.items.map((item) => (
            <SponsorItemCard
              key={item.id}
              item={item}
              sectionId={section.id}
              onEdit={onEditItem}
              onDelete={onDeleteItem}
            />
          ))}
        </GroupProductList>
      </SortableContext>
    </GroupSectionWrapper>
  );
}

export default memo(SponsorItemGroupSection);
