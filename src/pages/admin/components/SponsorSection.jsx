import { useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import SpCard from '../../../designsystem/components/card/admin/AdminSpCard';
import AddIcon from '@/assets/svg/20px/ic_add.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { ButtonContent, CardWrapper } from './style';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import useModal from '@/hooks/modal/useModal';
import { useDeleteSponsor } from '@/api/feature/admin/useAdminData';

export default function SponsorSection({ sponsors: initialSponsors = [] }) {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { mutateAsync: deleteSponsor } = useDeleteSponsor();

  const [expanded, setExpanded] = useState(false);
  const [sponsors, setSponsors] = useState(initialSponsors);

  const handleAdd = () => {
    navigate(ADMIN_ROUTES.SPONSOR_CREATE);
  };

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

    setSponsors((prev) => prev.filter((sponsor) => sponsor.id !== id));
  };

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="협찬사 등록/수정"
      count={sponsors.length}
    >
      <Accordion.ActionButton
        buttonText={
          <ButtonContent>
            협찬사 등록하기
            <AddIcon color={semantic.iconNormalInverse} />
          </ButtonContent>
        }
        onClick={handleAdd}
      />
      <CardWrapper>
        {sponsors.map((sponsor) => (
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
