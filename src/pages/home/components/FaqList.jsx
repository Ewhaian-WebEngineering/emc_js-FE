import AccordionLine from '@/designsystem/components/accordion/AccordionLine';
import { FaqAnswer, FaqListWrapper } from '../style';
import { useState } from 'react';

export default function FaqList({ list }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <FaqListWrapper>
      {list.map((faq) => (
        <AccordionLine
          size="md"
          key={faq.id}
          title={`Q. ${faq.question}`}
          expanded={openIndex === faq.id}
          onToggle={() =>
            setOpenIndex((prev) => (prev === faq.id ? null : faq.id))
          }
        >
          <FaqAnswer>{faq.answer}</FaqAnswer>
        </AccordionLine>
      ))}
    </FaqListWrapper>
  );
}
