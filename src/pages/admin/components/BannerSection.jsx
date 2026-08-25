import { useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import EventBannerCard from '../../../designsystem/components/card/admin/AdminEventBannerCard';
import { mockBanners } from '../constants/dashboardDummy';
import AddIcon from '@/assets/svg/20px/ic_add.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { ButtonContent, CardWrapper } from './style';
import useModal from '@/hooks/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';

// TODO: mockBanners 대신 실제 API 데이터로 교체
export default function BannerSection() {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const [expanded, setExpanded] = useState(false);
  const [banners, setBanners] = useState(mockBanners);

  const handleAdd = () => {
    navigate(ADMIN_ROUTES.BANNER);
  };

  const handleEdit = (id) => {
    navigate(ADMIN_ROUTES.BANNER_EDIT(id));
  };

  const handleDelete = async (id) => {
    const result = await showModal({
      variant: 'danger',
      title: '배너를 삭제하시겠습니까?',
      description: '삭제하시면 다시 되돌릴 수 없어요.',
      cancelText: '취소',
      confirmText: '삭제',
    });

    if (!result.confirmed) return;

    setBanners((prev) => prev.filter((banner) => banner.id !== id));
  };

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="배너 등록/수정"
      count={banners.length}
    >
      <Accordion.ActionButton
        buttonText={
          <ButtonContent>
            배너 등록하기
            <AddIcon color={semantic.iconNormalInverse} />
          </ButtonContent>
        }
        onClick={handleAdd}
      />
      <CardWrapper>
        {banners.map((banner) => (
          <EventBannerCard
            key={banner.id}
            endDate={banner.endDate}
            startDate={banner.startDate}
            title={banner.title}
            onDelete={() => handleDelete(banner.id)}
            onEdit={() => handleEdit(banner.id)}
          />
        ))}
      </CardWrapper>
    </Accordion>
  );
}
