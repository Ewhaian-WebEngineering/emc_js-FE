import {
  useSortable,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import DragHandleIcon from '@/assets/svg/20px/ic_drag_handle.svg?react';
import ProductCard from './ProductCard';
import {
  GroupSectionWrapper,
  GroupHeader,
  GroupHandle,
  GroupName,
  GroupProductList,
} from '../style';
import { memo } from 'react';

function ProductGroupSection({ section, onEditProduct, onDeleteProduct }) {
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
        items={section.products.map((p) => p.id)}
        strategy={verticalListSortingStrategy}
      >
        <GroupProductList ref={setDropRef}>
          {section.products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              sectionId={section.id}
              onEdit={onEditProduct}
              onDelete={onDeleteProduct}
            />
          ))}
        </GroupProductList>
      </SortableContext>
    </GroupSectionWrapper>
  );
}

export default memo(ProductGroupSection);
