import { Fragment, useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import EventBannerCard from '../../../designsystem/components/card/admin/AdminEventBannerCard';
import { mockEvents, EVENT_PHASE_LABEL } from '../constants/dashboardDummy';
import AddIcon from '@/assets/svg/20px/ic_add.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { ButtonContent, SectionTitle, CardWrapper } from './style';
import useModal from '@/hooks/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';

const PHASE_ORDER = ['pre', 'onsite', 'post'];

// TODO: mockEvents 대신 실제 API 데이터로 교체
export default function EventSection() {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const [expanded, setExpanded] = useState(false);
  const [events, setEvents] = useState(mockEvents);

  const groupedEvents = PHASE_ORDER.map((phase) => ({
    phase,
    label: EVENT_PHASE_LABEL[phase],
    items: events.filter((event) => event.phase === phase),
  }));

  const handleAdd = () => {
    navigate(ADMIN_ROUTES.EVENT);
  };

  const handleEdit = (id) => {
    navigate(ADMIN_ROUTES.EVENT_EDIT(id));
  };

  const handleDelete = async (id) => {
    const result = await showModal({
      variant: 'danger',
      title: '이벤트를 삭제하시겠습니까?',
      description: '삭제하시면 다시 되돌릴 수 없어요.',
      cancelText: '취소',
      confirmText: '삭제',
    });

    if (!result.confirmed) return;

    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="이벤트 등록/수정"
      count={events.length}
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
              {items.map((event) => (
                <EventBannerCard
                  key={event.id}
                  endDate={event.endDate}
                  startDate={event.startDate}
                  title={event.title}
                  onDelete={() => handleDelete(event.id)}
                  onEdit={() => handleEdit(event.id)}
                />
              ))}
            </Fragment>
          ))}
      </CardWrapper>
    </Accordion>
  );
}
