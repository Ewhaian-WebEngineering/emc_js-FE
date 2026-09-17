import { useState } from 'react';
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
import SponsorItemGroupSection from './SponsorItemGroupSection';
import AdminSpProductCard from '@/designsystem/components/card/admin/AdminSpProductCard';

export default function SponsorItemList({
  sections,
  onSectionsChange,
  onEditItem,
  onDeleteItem,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const [activeItem, setActiveItem] = useState(null);

  const visibleSections = sections.filter(
    (section) => section.items.length > 0,
  );

  const findItem = (itemId) => {
    for (const section of sections) {
      const found = section.items.find((i) => i.id === itemId);
      if (found) return found;
    }
    return null;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.data.current?.type === 'product') {
      setActiveItem(findItem(active.id));
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

      const movingItem = fromSection.items.find((i) => i.id === active.id);
      if (!movingItem) return prev;

      const updatedItem = {
        ...movingItem,
        groupId: toSection.isUngrouped ? null : toSection.id,
      };

      const overItemId = overData?.type === 'product' ? over.id : null;
      const insertIndex = overItemId
        ? toSection.items.findIndex((i) => i.id === overItemId)
        : toSection.items.length;

      return prev.map((s) => {
        if (s.id === fromSectionId) {
          return { ...s, items: s.items.filter((i) => i.id !== active.id) };
        }
        if (s.id === toSectionId) {
          const next = [...s.items];
          next.splice(insertIndex, 0, updatedItem);
          return { ...s, items: next };
        }
        return s;
      });
    });
  };

  const handleDragEnd = (event) => {
    setActiveItem(null);

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
          const oldIndex = s.items.findIndex((i) => i.id === active.id);
          const newIndex = s.items.findIndex((i) => i.id === over.id);
          if (oldIndex === -1 || newIndex === -1) return s;
          return { ...s, items: arrayMove(s.items, oldIndex, newIndex) };
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
          <SponsorItemGroupSection
            key={section.id}
            section={section}
            onEditItem={onEditItem}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </SortableContext>

      <DragOverlay>
        {activeItem && (
          <AdminSpProductCard
            thumbnail={activeItem.imageUrl}
            title={activeItem.name}
            content={activeItem.description}
          />
        )}
      </DragOverlay>
    </DndContext>
  );
}
