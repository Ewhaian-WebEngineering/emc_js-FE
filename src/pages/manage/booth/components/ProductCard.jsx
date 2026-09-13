import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableProductWrapper } from '../style';
import AdminProductCard from '@/designsystem/components/card/admin/AdminProductCard';
import { memo } from 'react';

function ProductCard({
  product,
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
    id: product.id,
    data: { type: 'product', sectionId },
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
      <AdminProductCard
        thumbnail={product.imageUrl}
        title={product.name}
        price={product.price}
        selected={selected}
        onEdit={() => onEdit(product.id)}
        onDelete={() => onDelete(product.id)}
        onClick={onClick}
      />
    </SortableProductWrapper>
  );
}

export default memo(ProductCard);
