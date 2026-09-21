import { Fragment, useEffect, useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import EventBannerCard from '../../../designsystem/components/card/admin/AdminEventBannerCard';
import AddIcon from '@/assets/svg/20px/ic_add.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { ButtonContent, SectionTitle, CardWrapper } from './style';
import useModal from '@/hooks/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useDeleteEvent } from '@/api/feature/admin/useAdminData';
import { useUpdateEvent } from '@/api/feature/admin/useEventData';
import { SortableItem, SortableList } from '@/components/SortableList';

const PHASE_ORDER = ['pre', 'live', 'post'];

const PHASE_LABEL = {
  pre: '사전 이벤트',
  live: '현장 이벤트',
  post: '사후 이벤트',
};

export default function EventSection({
  events = { pre: [], live: [], post: [] },
  defaultExpanded = false,
}) {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { mutateAsync: deleteEvent } = useDeleteEvent();
  const { mutateAsync: updateEvent } = useUpdateEvent();

  const [expanded, setExpanded] = useState(defaultExpanded);
  const [localEvents, setLocalEvents] = useState(events);

  useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const groupedEvents = PHASE_ORDER.map((phase) => ({
    phase,
    label: PHASE_LABEL[phase],
    items: localEvents[phase] ?? [],
  }));

  const totalCount = PHASE_ORDER.reduce(
    (sum, phase) => sum + (localEvents[phase]?.length ?? 0),
    0,
  );

  const handleAdd = () => navigate(ADMIN_ROUTES.EVENT);
  const handleEdit = (id) => navigate(ADMIN_ROUTES.EVENT_EDIT(id));

  const handleDelete = async (id) => {
    const result = await showModal({
      variant: 'danger',
      title: '이벤트를 삭제하시겠습니까?',
      description: '삭제하시면 다시 되돌릴 수 없어요.',
      cancelText: '취소',
      confirmText: '삭제',
    });

    if (!result.confirmed) return;

    await deleteEvent({ eid: id });
  };

  const handleReorder = async (phase, reordered) => {
    setLocalEvents((prev) => ({ ...prev, [phase]: reordered }));

    const changed = reordered
      .map((event, index) => ({ event, index }))
      .filter(({ event, index }) => event.displayOrder !== index);

    await Promise.all(
      changed.map(({ event, index }) =>
        updateEvent({
          eid: event.id,
          displayOrder: index,
        }),
      ),
    );
  };

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="이벤트 등록/수정"
      count={totalCount}
    >
      <Accordion.ActionButton
        buttonText={
          <ButtonContent>
            이벤트 등록하기
            <AddIcon color={semantic.iconNormalInverse} />
          </ButtonContent>
        }
        onClick={handleAdd}
      />
      <CardWrapper>
        {groupedEvents
          .filter((group) => group.items.length > 0)
          .map(({ phase, label, items }, index) => (
            <Fragment key={phase}>
              <SectionTitle isFirst={index === 0}>{label}</SectionTitle>
              <SortableList
                items={items}
                getId={(e) => e.id}
                onReorder={(reordered) => handleReorder(phase, reordered)}
              >
                {items.map((event) => (
                  <SortableItem key={event.id} id={event.id}>
                    <EventBannerCard
                      endDate={event.endDate}
                      startDate={event.startDate}
                      title={event.title}
                      onDelete={() => handleDelete(event.id)}
                      onEdit={() => handleEdit(event.id)}
                    />
                  </SortableItem>
                ))}
              </SortableList>
            </Fragment>
          ))}
      </CardWrapper>
    </Accordion>
  );
}
