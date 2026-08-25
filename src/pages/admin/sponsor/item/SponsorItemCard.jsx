import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import AdminSpProductCard from '@/designsystem/components/card/admin/AdminSpProductCard';

export default function SponsorItemCard({ item, sectionId, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
    data: { type: 'product', sectionId },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <AdminSpProductCard
        thumbnail={item.thumbnail}
        title={item.name}
        content={item.description}
        onEdit={() => onEdit(item.id)}
        onDelete={() => onDelete(item.id)}
      />
    </div>
  );
}
