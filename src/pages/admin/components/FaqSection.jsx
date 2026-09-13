import { useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import SpCard from '../../../designsystem/components/card/admin/AdminSpCard';
import AddIcon from '@/assets/svg/20px/ic_add.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { ButtonContent, CardWrapper } from './style';
import useModal from '@/hooks/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useDeleteFaq } from '@/api/feature/admin/useAdminData';

export default function FaqSection({ faqs = [] }) {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { mutateAsync: deleteFaq } = useDeleteFaq();

  const [expanded, setExpanded] = useState(false);

  const handleAdd = () => {
    navigate(ADMIN_ROUTES.FAQ);
  };

  const handleEdit = (id) => {
    navigate(ADMIN_ROUTES.FAQ_EDIT(id));
  };

  const handleDelete = async (id) => {
    const result = await showModal({
      variant: 'danger',
      title: 'FAQ를 삭제하시겠습니까?',
      description: '삭제하시면 다시 되돌릴 수 없어요.',
      cancelText: '취소',
      confirmText: '삭제',
    });

    if (!result.confirmed) return;

    await deleteFaq({ fid: id });
  };

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="FAQ 등록/수정"
      count={faqs.length}
    >
      <Accordion.ActionButton
        buttonText={
          <ButtonContent>
            FAQ 등록하기
            <AddIcon color={semantic.iconNormalInverse} />
          </ButtonContent>
        }
        onClick={handleAdd}
      />
      <CardWrapper>
        {faqs.map((faq) => (
          <SpCard
            key={faq.id}
            content={faq.answer}
            title={faq.question}
            onDelete={() => handleDelete(faq.id)}
            onEdit={() => handleEdit(faq.id)}
          />
        ))}
      </CardWrapper>
    </Accordion>
  );
}
