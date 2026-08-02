import { useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import EventBannerCard from '../../../designsystem/components/card/admin/AdminEventBannerCard';
import { mockEvents } from '../constants/dashboardDumy';

// TODO: mockEvents 대신 실제 API 데이터로 교체
export default function EventSection() {
  const [expanded, setExpanded] = useState(false);
  const [events] = useState(mockEvents);

  // TODO: 등록 화면 이동 로직 연결
  const handleAdd = () => {};
  // TODO: id로 수정 화면 라우팅
  const handleEdit = (id) => {};
  // TODO: DELETE 요청 후 목록 refetch
  const handleDelete = (id) => {};
  const handleClick = (id) => {};

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="이벤트 등록/수정"
      count={events.length}
    >
      <Accordion.ActionButton
        buttonText="이벤트 등록하기 +"
        onClick={handleAdd}
      />
      {events.map((event) => (
        <EventBannerCard
          key={event.id}
          endDate={event.endDate}
          startDate={event.startDate}
          title={event.title}
          onClick={() => handleClick(event.id)}
          onDelete={() => handleDelete(event.id)}
          onEdit={() => handleEdit(event.id)}
        />
      ))}
    </Accordion>
  );
}
