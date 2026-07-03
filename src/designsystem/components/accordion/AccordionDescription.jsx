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

/**
 * 설명 영역이 있는 아코디언 컴포넌트입니다.
 *
 * @param {string} title - 아코디언의 제목
 * @param {string} description - 아코디언의 설명 텍스트
 * @param {boolean} expanded - 아코디언이 펼쳐져 있는지 여부
 * @param {function} onToggle - 아코디언을 펼치거나 접는 함수
 */
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

      {/* 높이 측정용 복제본: line-clamp 없이 전체 높이를 재기 위해 화면 밖에 렌더링 */}
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
