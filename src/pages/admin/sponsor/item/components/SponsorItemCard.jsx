import AdminSpProductCard from '@/designsystem/components/card/admin/AdminSpProductCard';
import { SortableProductWrapper } from '@/pages/manage/booth/style';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { memo } from 'react';

function SponsorItemCard({
  item,
  sectionId,
  selected,
  onEdit,
  onDelete,
  onClick,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: { type: 'item', sectionId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <SortableProductWrapper
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <AdminSpProductCard
        thumbnail={item.imageUrl}
        title={item.name}
        content={item.description}
        selected={selected}
        onEdit={() => onEdit(item.id)}
        onDelete={() => onDelete(item.id)}
        onClick={onClick}
      />
    </SortableProductWrapper>
  );
}

export default memo(SponsorItemCard);
