import { useRef, useState } from 'react';
import {
  closestCorners,
  DndContext,
  DragOverlay,
  MeasuringFrequency,
  MeasuringStrategy,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import ProductGroupSection from './ProductGroupSection';
import AdminProductCard from '@/designsystem/components/card/admin/AdminProductCard';

export default function ProductGroupList({
  sections,
  onSectionsChange,
  onEditProduct,
  onDeleteProduct,
  onReorderProducts,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const [activeProduct, setActiveProduct] = useState(null);
  const dragOriginSectionId = useRef(null);

  const visibleSections = sections.filter(
    (section) =>
      section.products.length > 0 || section.id === dragOriginSectionId.current,
  );

  const findProduct = (productId) => {
    for (const section of sections) {
      const found = section.products.find((p) => p.id === productId);
      if (found) return found;
    }
    return null;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.data.current?.type === 'product') {
      setActiveProduct(findProduct(active.id));
      dragOriginSectionId.current = active.data.current.sectionId;
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;
    if (activeData?.type !== 'product') return;

    const fromSectionId = activeData.sectionId;
    const toSectionId =
      overData?.type === 'product'
        ? overData.sectionId
        : overData?.type === 'container'
          ? overData.sectionId
          : null;

    if (!toSectionId || fromSectionId === toSectionId) return;

    onSectionsChange((prev) => {
      const fromSection = prev.find((s) => s.id === fromSectionId);
      const toSection = prev.find((s) => s.id === toSectionId);
      if (!fromSection || !toSection) return prev;

      const movingProduct = fromSection.products.find(
        (p) => p.id === active.id,
      );
      if (!movingProduct) return prev;

      const updatedProduct = {
        ...movingProduct,
        groupId: toSection.isUngrouped ? null : toSection.id,
      };

      const overProductId = overData?.type === 'product' ? over.id : null;
      const insertIndex = overProductId
        ? toSection.products.findIndex((p) => p.id === overProductId)
        : toSection.products.length;

      return prev.map((s) => {
        if (s.id === fromSectionId) {
          return {
            ...s,
            products: s.products.filter((p) => p.id !== active.id),
          };
        }
        if (s.id === toSectionId) {
          const next = [...s.products];
          next.splice(insertIndex, 0, updatedProduct);
          return { ...s, products: next };
        }
        return s;
      });
    });
  };

  const handleDragEnd = (event) => {
    setActiveProduct(null);

    const { active, over } = event;
    const originSectionId = dragOriginSectionId.current;
    dragOriginSectionId.current = null;

    if (!over || active.id === over.id) return;

    const activeData = active.data.current;

    if (activeData?.type === 'section') {
      const activeIndex = sections.findIndex(
        (s) => `section:${s.id}` === active.id,
      );
      const overIndex = sections.findIndex(
        (s) => `section:${s.id}` === over.id,
      );
      if (activeIndex === -1 || overIndex === -1) return;
      onSectionsChange(arrayMove(sections, activeIndex, overIndex));
      return;
    }

    if (activeData?.type === 'product') {
      const currentSection = sections.find((s) =>
        s.products.some((p) => p.id === active.id),
      );
      if (!currentSection) return;

      if (originSectionId && originSectionId !== currentSection.id) {
        const originSection = sections.find((s) => s.id === originSectionId);
        const reorderedProducts = [originSection, currentSection]
          .filter(Boolean)
          .flatMap((section) =>
            section.products.map((product, index) => ({
              ...product,
              groupId: section.isUngrouped ? null : section.id,
              displayOrder: index,
            })),
          );
        onReorderProducts?.(reorderedProducts);
        return;
      }

      onSectionsChange((prev) =>
        prev.map((s) => {
          if (s.id !== currentSection.id) return s;
          const oldIndex = s.products.findIndex((p) => p.id === active.id);
          const newIndex = s.products.findIndex((p) => p.id === over.id);
          if (oldIndex === -1 || newIndex === -1) return s;
          const reordered = arrayMove(s.products, oldIndex, newIndex);
          onReorderProducts?.(
            reordered.map((product, index) => ({
              ...product,
              groupId: s.isUngrouped ? null : s.id,
              displayOrder: index,
            })),
          );
          return { ...s, products: reordered };
        }),
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      measuring={{
        droppable: {
          strategy: MeasuringStrategy.Always,
          frequency: MeasuringFrequency.Optimized,
        },
      }}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={visibleSections.map((s) => `section:${s.id}`)}
        strategy={verticalListSortingStrategy}
      >
        {visibleSections.map((section) => (
          <ProductGroupSection
            key={section.id}
            section={section}
            onEditProduct={onEditProduct}
            onDeleteProduct={onDeleteProduct}
          />
        ))}
      </SortableContext>

      <DragOverlay>
        {activeProduct && (
          <AdminProductCard
            thumbnail={activeProduct.imageUrl}
            title={activeProduct.name}
            price={activeProduct.price}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
