import {
  useDeleteSponsor,
  useUpdateSponsor,
} from '@/api/feature/admin/useAdminData';
import { ADMIN_ROUTES } from '@/constants/routes';
import useModal from '@/hooks/modal/useModal';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CardWrapper } from './style';
import { SortableItem, SortableList } from '@/components/SortableList';
import SpCard from '../../../designsystem/components/card/admin/AdminSpCard';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';

export default function SponsorSection({ sponsors = [] }) {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { mutateAsync: deleteSponsor } = useDeleteSponsor();
  const { mutateAsync: updateSponsor } = useUpdateSponsor();

  const [expanded, setExpanded] = useState(false);
  const [localSponsors, setLocalSponsors] = useState(sponsors);

  useEffect(() => {
    setLocalSponsors(sponsors);
  }, [sponsors]);

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

  const handleReorder = async (reordered) => {
    setLocalSponsors(reordered);

    const changed = reordered
      .map((sponsor, index) => ({ sponsor, index }))
      .filter(({ sponsor, index }) => sponsor.displayOrder !== index);

    await Promise.all(
      changed.map(({ sponsor, index }) =>
        updateSponsor({
          sponsorId: sponsor.id,
          payload: { displayOrder: index },
        }),
      ),
    );
  };

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="협찬사 등록/수정"
      count={localSponsors.length}
    >
      <CardWrapper>
        <SortableList
          items={localSponsors}
          getId={(s) => s.id}
          onReorder={handleReorder}
        >
          {localSponsors.map((sponsor) => (
            <SortableItem key={sponsor.id} id={sponsor.id}>
              <SpCard
                content={sponsor.introShort}
                title={sponsor.name}
                onDelete={() => handleDelete(sponsor.id)}
                onEdit={() => handleEdit(sponsor.id)}
              />
            </SortableItem>
          ))}
        </SortableList>
      </CardWrapper>
    </Accordion>
  );
}
