import { useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import BoothCard from '../../../designsystem/components/card/admin/AdminBoothCard';
import { mockBooths } from '../constants/dashboardDumy';

// TODO: mockBooths 대신 실제 API 데이터로 교체
export default function BoothSection() {
  const [expanded, setExpanded] = useState(false);
  const [booths] = useState(mockBooths);

  // TODO: id로 수정 화면 라우팅
  const handleEdit = (id) => {};
  // TODO: id로 부스 상세 화면 라우팅
  const handlePreview = (id) => {};
  const handleClick = (id) => {};

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="부스 관리"
      count={booths.length}
    >
      <Accordion.ContentGuide description="모든 셀러 부스를 관리할 수 있습니다." />
      {booths.map((booth) => (
        <BoothCard
          key={booth.id}
          cardNumber={booth.cardNumber}
          content={booth.content}
          title={booth.title}
          onClick={() => handleClick(booth.id)}
          onEdit={() => handleEdit(booth.id)}
          onPreview={() => handlePreview(booth.id)}
        />
      ))}
    </Accordion>
  );
}
