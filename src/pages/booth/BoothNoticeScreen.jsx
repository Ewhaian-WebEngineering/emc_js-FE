import { BOOTH_ROUTES } from '@/constants/routes';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useGoBack } from '@/hooks/useGoBack';
import { useParams } from 'react-router-dom';
import { DUMMY_NOTICE } from './constants/dummyNotice';
import AccordionLine from '@/designsystem/components/accordion/AccordionLine';
import { useState } from 'react';
import { NoticeContentText, WhiteSpace } from './style';

export default function BoothNoticeScreen() {
  const { boothId } = useParams();
  const handleBack = useGoBack({
    fallback: BOOTH_ROUTES.DETAIL(boothId),
  });

  // TODO: 서버 데이터로 변경
  const noticeList = DUMMY_NOTICE;

  const [openNoticeIds, setOpenNoticeIds] = useState(new Set());
  const handleToggle = (id) => {
    setOpenNoticeIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <>
      <FillCenterHeader onBack={handleBack} title="부스 공지사항" border />
      {noticeList.map((notice) => (
        <AccordionLine
          key={notice.id}
          size="md"
          title={notice.title}
          subtitle={notice.createdAt}
          expanded={openNoticeIds.has(notice.id)}
          onToggle={() => handleToggle(notice.id)}
        >
          <NoticeContentText>{notice.content}</NoticeContentText>
        </AccordionLine>
      ))}
      <WhiteSpace />
    </>
  );
}
