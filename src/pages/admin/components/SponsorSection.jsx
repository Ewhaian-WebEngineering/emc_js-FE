import { useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import SpCard from '../../../designsystem/components/card/admin/AdminSpCard';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import useModal from '@/hooks/modal/useModal';
import { useDeleteSponsor } from '@/api/feature/admin/useAdminData';
import { CardWrapper } from './style';

export default function SponsorSection({ sponsors = [] }) {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { mutateAsync: deleteSponsor } = useDeleteSponsor();

  const [expanded, setExpanded] = useState(false);

  const reversedSponsors = [...sponsors].reverse();

  const handleEdit = (id) => {
    navigate(ADMIN_ROUTES.SPONSOR_EDIT(id));
  };

  const handleDelete = async (id) => {
    const result = await showModal({
      variant: 'danger',
      title: '협찬사를 삭제하시겠습니까?',
      description: '삭제하시면 다시 되돌릴 수 없어요.',
      cancelText: '취소',
      confirmText: '삭제',
    });

    if (!result.confirmed) return;

    await deleteSponsor({ sid: id });
  };

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="협찬사 등록/수정"
      count={sponsors.length}
    >
      <CardWrapper>
        {reversedSponsors.map((sponsor) => (
          <SpCard
            key={sponsor.id}
            content={sponsor.introShort}
            title={sponsor.name}
            onDelete={() => handleDelete(sponsor.id)}
            onEdit={() => handleEdit(sponsor.id)}
          />
        ))}
      </CardWrapper>
    </Accordion>
  );
}
