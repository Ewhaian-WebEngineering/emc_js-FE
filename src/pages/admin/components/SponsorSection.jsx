import { useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import SpCard from '../../../designsystem/components/card/admin/AdminSpCard';
import { mockSponsors } from '../constants/dashboardDummy';
import AddIcon from '@/assets/svg/20px/ic_add.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { ButtonContent, CardWrapper } from './style';

//TODO: mockSponsors 대신 실제 API 데이터로 교체

export default function SponsorSection() {
  const [expanded, setExpanded] = useState(false);
  const sponsors = mockSponsors;

  // TODO: 등록 화면 이동 로직 연결
  const handleAdd = () => {};
  // TODO: id로 수정 화면 라우팅
  const handleEdit = (id) => {};
  // TODO: DELETE 요청 시 모달 노출
  const handleDelete = (id) => {};
  const handleClick = (id) => {};

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="협찬사 등록/수정"
      count={sponsors.length}
    >
      <Accordion.ActionButton
        buttonText={
          <ButtonContent>
            협찬사 등록하기
            <AddIcon color={semantic.iconNormalInverse} />
          </ButtonContent>
        }
        onClick={handleAdd}
      />
      <CardWrapper>
        {sponsors.map((sponsor) => (
          <SpCard
            key={sponsor.id}
            content={sponsor.content}
            title={sponsor.title}
            onClick={() => handleClick(sponsor.id)}
            onDelete={() => handleDelete(sponsor.id)}
            onEdit={() => handleEdit(sponsor.id)}
          />
        ))}
      </CardWrapper>
    </Accordion>
  );
}
