import { useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import SpCard from '../../../designsystem/components/card/admin/AdminSpCard';
import { mockFaqs } from '../constants/dashboardDummy';

// TODO: mockFaqs 대신 실제 API 데이터로 교체
export default function FaqSection() {
  const [expanded, setExpanded] = useState(false);
  const [faqs] = useState(mockFaqs);

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
      title="FAQ 등록/수정"
      count={faqs.length}
    >
      <Accordion.ActionButton buttonText="FAQ 등록하기 +" onClick={handleAdd} />
      {faqs.map((faq) => (
        <SpCard
          key={faq.id}
          content={faq.content}
          title={faq.title}
          onClick={() => handleClick(faq.id)}
          onDelete={() => handleDelete(faq.id)}
          onEdit={() => handleEdit(faq.id)}
        />
      ))}
    </Accordion>
  );
}
