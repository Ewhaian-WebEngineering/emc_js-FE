import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import DragHandleIcon from '@/assets/svg/20px/ic_drag_handle.svg?react';
import SponsorItemCard from './SponsorItemCard';
import { memo } from 'react';
import {
  GroupHandle,
  GroupHeader,
  GroupName,
  GroupProductList,
  GroupSectionWrapper,
} from '@/pages/manage/booth/style';
import { measurement } from '@/designsystem/tokens/measurement';

function SponsorItemSection({ section, onEditItem, onDeleteItem }) {
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

  const isEmpty = section.items.length === 0;

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    ...(isEmpty && { marginTop: `calc(-1 * ${measurement.spacing16})` }),
  };

  return (
    <GroupSectionWrapper ref={setNodeRef} style={style}>
      <GroupHeader style={isEmpty ? { display: 'none' } : undefined}>
        <GroupHandle {...attributes} {...listeners}>
          <DragHandleIcon />
          <GroupName>{section.name}</GroupName>
        </GroupHandle>
      </GroupHeader>

      <SortableContext
        items={section.items.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <GroupProductList
          ref={setDropRef}
          style={isEmpty ? { minHeight: 1 } : undefined}
        >
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

export default memo(SponsorItemSection);
