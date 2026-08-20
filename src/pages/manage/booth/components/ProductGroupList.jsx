import { useState } from 'react';
import {
  closestCorners,
  DndContext,
  DragOverlay,
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
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const [activeProduct, setActiveProduct] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const visibleSections = sections.filter(
    (section) => section.products.length > 0,
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
    }
    if (active.data.current?.type === 'section') {
      const sectionId = active.id.replace('section:', '');
      setActiveSection(sections.find((s) => String(s.id) === sectionId));
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
    setActiveSection(null);

    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const activeData = active.data.current;
    const overData = over.data.current;

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
      const sectionId = activeData.sectionId;
      const overSectionId = overData?.sectionId;
      if (sectionId !== overSectionId) return;

      onSectionsChange((prev) =>
        prev.map((s) => {
          if (s.id !== sectionId) return s;
          const oldIndex = s.products.findIndex((p) => p.id === active.id);
          const newIndex = s.products.findIndex((p) => p.id === over.id);
          if (oldIndex === -1 || newIndex === -1) return s;
          return { ...s, products: arrayMove(s.products, oldIndex, newIndex) };
        }),
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      measuring={{ droppable: { strategy: MeasuringStrategy.Always } }}
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
            thumbnail={activeProduct.thumbnail}
            title={activeProduct.name}
            price={activeProduct.price}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
