import AccordionLine from '@/designsystem/components/accordion/AccordionLine';
import { FaqAnswer, FaqListWrapper } from '../style';
import { useState } from 'react';

export default function FaqList({ list }) {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <FaqListWrapper>
      {list.map(({ question, answer }, index) => (
        <AccordionLine
          size="md"
          key={index}
          title={`Q. ${question}`}
          expanded={openIndex === index}
          onToggle={() =>
            setOpenIndex((prev) => (prev === index ? null : index))
          }
        >
          <FaqAnswer>{answer}</FaqAnswer>
        </AccordionLine>
      ))}
    </FaqListWrapper>
  );
}
