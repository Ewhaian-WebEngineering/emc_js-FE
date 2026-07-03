import ArrowDownIcon from '@/assets/svg/24px/ic_arrow_down.svg?react';
import { formatDate } from '@/utils/formatDate';
import {
  AccordionLineWrapper,
  AccordionLineHeader,
  AccordionLineTextWrapper,
  AccordionLineTitle,
  AccordionLineSubtitle,
  AccordionLineIcon,
  AccordionLineContent,
  AccordionLineContentGuideText,
} from './style';
import BoxButton from '../button/boxbutton/BoxButton';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * 제목만 보여주는 아코디언 컴포넌트입니다.
 *
 * @param {string} title - 아코디언의 제목
 * @param {boolean} required - 제목 옆에 필수 표시를 할지 여부
 * @param {string} subtitle - 아코디언의 부제목 (YYYY. MM. DD)
 * @param {string} size - 아코디언의 크기 (md, lg) (기본값 lg)
 * @param {boolean} expanded - 아코디언이 펼쳐져 있는지 여부
 * @param {function} onToggle - 아코디언을 펼치거나 접는 함수
 * @param {React.ReactNode} children - 아코디언 안에 들어갈 콘텐츠
 * @returns
 */
export default function AccordionLine({
  title,
  required,
  subtitle,
  size = 'lg',
  expanded,
  onToggle,
  children,
}) {
  return (
    <AccordionLineWrapper>
      {/* 아코디언 헤더 */}
      <AccordionLineHeader>
        <AccordionLineTextWrapper>
          <AccordionLineTitle size={size}>
            {title}
            {required && <span>*</span>}
          </AccordionLineTitle>
          {subtitle && (
            <AccordionLineSubtitle size={size}>
              {formatDate(subtitle)}
            </AccordionLineSubtitle>
          )}
        </AccordionLineTextWrapper>
        <AccordionLineIcon onClick={onToggle} expanded={expanded}>
          <ArrowDownIcon />
        </AccordionLineIcon>
      </AccordionLineHeader>

      {/* 아코디언 콘텐츠 */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <AccordionLineContent>{children}</AccordionLineContent>
          </motion.div>
        )}
      </AnimatePresence>
    </AccordionLineWrapper>
  );
}

/**
 * 아코디언 콘텐츠 내부 가이드 텍스트 컴포넌트입니다.
 *
 * @param {string} param0.description - 가이드 텍스트 내용
 * @returns
 */
function AccordionLineContentGuide({ description }) {
  return (
    <AccordionLineContentGuideText>{description}</AccordionLineContentGuideText>
  );
}

/**
 * 아코디언 콘텐츠 내부 버튼 컴포넌트입니다.
 *
 * @param {string} param0.buttonText - 버튼 텍스트
 * @param {function} param0.onClick - 버튼 클릭 시 실행될 함수
 * @returns
 */
function AccordionLineActionButton({ buttonText, onClick }) {
  return (
    <BoxButton type="primary" size="md" onClick={() => onClick()}>
      {buttonText}
    </BoxButton>
  );
}

/**
 * AccordionLine 컴포넌트에 하위 컴포넌트를 붙여서 사용할 수 있도록 합니다.
 *
 * AccordionLine.ContentGuide: 아코디언 콘텐츠 내부 가이드 텍스트 컴포넌트
 * AccordionLine.ActionButton: 아코디언 콘텐츠 내부 버튼 컴포넌트
 */
AccordionLine.ContentGuide = AccordionLineContentGuide;
AccordionLine.ActionButton = AccordionLineActionButton;
