import ArrowDownIcon from '@/assets/svg/16px/ic_arrow_down.svg?react';
import {
  AccordionDescriptionWrapper,
  AccordionDescriptionTitle,
  AccordionDescriptionText,
  AccordionDescriptionButton,
} from './style';
import { motion } from 'framer-motion';
import { useLayoutEffect, useRef, useState } from 'react';

const COLLAPSED_HEIGHT = 38; // caption2Regular line-height * 2

export default function AccordionDescription({
  title,
  description,
  expanded,
  onToggle,
}) {
  const measureRef = useRef(null);
  const [fullHeight, setFullHeight] = useState(COLLAPSED_HEIGHT);

  useLayoutEffect(() => {
    if (measureRef.current) {
      setFullHeight(measureRef.current.scrollHeight);
    }
  }, [description]);

  return (
    <AccordionDescriptionWrapper>
      <AccordionDescriptionTitle>{title}</AccordionDescriptionTitle>
      <motion.div
        initial={false}
        animate={{ height: expanded ? fullHeight : COLLAPSED_HEIGHT }}
        style={{ overflow: 'hidden' }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
      >
        <AccordionDescriptionText expanded={expanded}>
          {description}
        </AccordionDescriptionText>
      </motion.div>

      {/* 높이 측정용 복제본 */}
      <AccordionDescriptionText
        ref={measureRef}
        expanded={true}
        style={{
          position: 'absolute',
          visibility: 'hidden',
          height: 'auto',
          pointerEvents: 'none',
          width: '100%',
        }}
        aria-hidden="true"
      >
        {description}
      </AccordionDescriptionText>

      <AccordionDescriptionButton onClick={onToggle} expanded={expanded}>
        {expanded ? '접기' : '더보기'}
        <ArrowDownIcon />
      </AccordionDescriptionButton>
    </AccordionDescriptionWrapper>
  );
}
