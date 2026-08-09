import { useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import EventBannerCard from '../../../designsystem/components/card/admin/AdminEventBannerCard';
import { mockBanners } from '../constants/dashboardDummy';

// TODO: mockBanners 대신 실제 API 데이터로 교체
export default function BannerSection() {
  const [expanded, setExpanded] = useState(false);
  const [banners] = useState(mockBanners);

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
      title="배너 등록/수정"
      count={banners.length}
    >
      <Accordion.ActionButton
        buttonText="이벤트 등록하기 +"
        onClick={handleAdd}
      />
      {banners.map((banner) => (
        <EventBannerCard
          key={banner.id}
          endDate={banner.endDate}
          startDate={banner.startDate}
          title={banner.title}
          onClick={() => handleClick(banner.id)}
          onDelete={() => handleDelete(banner.id)}
          onEdit={() => handleEdit(banner.id)}
        />
      ))}
    </Accordion>
  );
}
