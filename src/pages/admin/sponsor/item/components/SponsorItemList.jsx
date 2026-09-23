import { useRef, useState } from 'react';
import {
  pointerWithin,
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
import SponsorItemSection from './SponsorItemSection';
import AdminSpProductCard from '@/designsystem/components/card/admin/AdminSpProductCard';

export default function SponsorItemList({
  sections,
  onSectionsChange,
  onEditItem,
  onDeleteItem,
  onReorderItems,
  onReorderGroups,
}) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  const [activeItem, setActiveItem] = useState(null);
  const dragOriginSectionId = useRef(null);

  const findItem = (itemId) => {
    for (const section of sections) {
      const found = section.items.find((i) => i.id === itemId);
      if (found) return found;
    }
    return null;
  };

  const handleDragStart = (event) => {
    const { active } = event;
    if (active.data.current?.type === 'item') {
      setActiveItem(findItem(active.id));
      dragOriginSectionId.current = active.data.current.sectionId;
    }
  };

  const handleDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;
    if (activeData?.type !== 'item') return;

    const fromSectionId = activeData.sectionId;
    const toSectionId =
      overData?.type === 'item'
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

      const overItemId = overData?.type === 'item' ? over.id : null;
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
    const originSectionId = dragOriginSectionId.current;
    dragOriginSectionId.current = null;

    if (!over) return;

    const activeData = active.data.current;
    const overData = over.data.current;

    if (activeData?.type === 'section') {
      const activeSectionId = String(active.id).replace('section:', '');

      let overSectionId = null;
      if (overData?.type === 'section') {
        overSectionId = String(over.id).replace('section:', '');
      } else if (overData?.sectionId) {
        overSectionId = overData.sectionId;
      }

      if (!overSectionId || overSectionId === activeSectionId) return;

      const activeIndex = sections.findIndex((s) => s.id === activeSectionId);
      const overIndex = sections.findIndex((s) => s.id === overSectionId);
      if (activeIndex === -1 || overIndex === -1) return;

      const reordered = arrayMove(sections, activeIndex, overIndex);
      onSectionsChange(reordered);
      onReorderGroups?.(reordered);
      return;
    }

    if (activeData?.type === 'item') {
      if (active.id === over.id) return;

      const currentSection = sections.find((s) =>
        s.items.some((i) => i.id === active.id),
      );
      if (!currentSection) return;

      if (originSectionId && originSectionId !== currentSection.id) {
        const originSection = sections.find((s) => s.id === originSectionId);
        const reorderedItems = [originSection, currentSection]
          .filter(Boolean)
          .flatMap((section) =>
            section.items.map((item, index) => ({
              ...item,
              groupId: section.isUngrouped ? null : section.id,
              displayOrder: index,
            })),
          );
        onReorderItems?.(reorderedItems);
        return;
      }

      onSectionsChange((prev) =>
        prev.map((s) => {
          if (s.id !== currentSection.id) return s;
          const oldIndex = s.items.findIndex((i) => i.id === active.id);
          const newIndex = s.items.findIndex((i) => i.id === over.id);
          if (oldIndex === -1 || newIndex === -1) return s;
          const reordered = arrayMove(s.items, oldIndex, newIndex);
          onReorderItems?.(
            reordered.map((item, index) => ({
              ...item,
              groupId: s.isUngrouped ? null : s.id,
              displayOrder: index,
            })),
          );
          return { ...s, items: reordered };
        }),
      );
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={pointerWithin}
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
        items={sections.map((s) => `section:${s.id}`)}
        strategy={verticalListSortingStrategy}
      >
        {sections.map((section) => (
          <SponsorItemSection
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
