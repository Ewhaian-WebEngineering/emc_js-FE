import { useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import BoothCard from '../../../designsystem/components/card/admin/AdminBoothCard';
import { mockBooths } from '../constants/dashboardDummy';
import { CardWrapper } from './style';
import { MANAGE_ROUTES } from '@/constants/routes';
import { useNavigate } from 'react-router-dom';

// TODO: mockBooths 대신 실제 API 데이터로 교체
export default function BoothSection() {
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const booths = mockBooths;

  const handleEdit = (id) => {
    navigate(MANAGE_ROUTES.BOOTH_EDIT(id));
  };

  const handlePreview = (id) => {
    navigate(MANAGE_ROUTES.BOOTH_PREVIEW(id));
  };

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="부스 관리"
      count={booths.length}
    >
      <Accordion.ContentGuide description="모든 셀러 부스를 관리할 수 있습니다." />
      <CardWrapper>
        {booths.map((booth) => (
          <BoothCard
            key={booth.id}
            cardNumber={booth.cardNumber}
            content={booth.content}
            title={booth.title}
            onEdit={() => handleEdit(booth.id)}
            onPreview={() => handlePreview(booth.id)}
          />
        ))}
      </CardWrapper>
    </Accordion>
  );
}
