import { useEffect, useState } from 'react';
import Accordion from '../../../designsystem/components/accordion/AccordionLine';
import SpCard from '../../../designsystem/components/card/admin/AdminSpCard';
import AddIcon from '@/assets/svg/20px/ic_add.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { ButtonContent, CardWrapper } from './style';
import useModal from '@/hooks/modal/useModal';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useDeleteFaq } from '@/api/feature/admin/useAdminData';
import { SortableItem, SortableList } from '@/components/SortableList';
import { useUpdateFaq } from '@/api/feature/admin/useFaqData';

export default function FaqSection({ faqs = [] }) {
  const navigate = useNavigate();
  const { showModal } = useModal();
  const { mutateAsync: deleteFaq } = useDeleteFaq();
  const { mutateAsync: updateFaq } = useUpdateFaq();

  const [expanded, setExpanded] = useState(false);
  const [localFaqs, setLocalFaqs] = useState(faqs);

  useEffect(() => {
    setLocalFaqs(faqs);
  }, [faqs]);

  const handleAdd = () => navigate(ADMIN_ROUTES.FAQ);
  const handleEdit = (id) => navigate(ADMIN_ROUTES.FAQ_EDIT(id));

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

  const handleReorder = async (reordered) => {
    setLocalFaqs(reordered);

    const changed = reordered
      .map((faq, index) => ({ faq, index }))
      .filter(({ faq, index }) => faq.displayOrder !== index);

    await Promise.all(
      changed.map(({ faq, index }) =>
        updateFaq({
          fid: faq.id,
          question: faq.question,
          answer: faq.answer,
          displayOrder: index,
        }),
      ),
    );
  };

  return (
    <Accordion
      expanded={expanded}
      onToggle={() => setExpanded((prev) => !prev)}
      size="lg"
      title="FAQ 등록/수정"
      count={localFaqs.length}
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
        <SortableList
          items={localFaqs}
          getId={(f) => f.id}
          onReorder={handleReorder}
        >
          {localFaqs.map((faq) => (
            <SortableItem key={faq.id} id={faq.id}>
              <SpCard
                content={faq.answer}
                title={faq.question}
                onDelete={() => handleDelete(faq.id)}
                onEdit={() => handleEdit(faq.id)}
              />
            </SortableItem>
          ))}
        </SortableList>
      </CardWrapper>
    </Accordion>
  );
}
