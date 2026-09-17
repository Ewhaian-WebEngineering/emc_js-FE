import FaqForm from './FaqForm';
import { useParams } from 'react-router-dom';
import { useFaq, useUpdateFaq } from '@/api/feature/admin/useFaqData';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

export default function FaqEditScreen() {
  const { faqId } = useParams();
  const { data: faq } = useFaq(faqId);
  const { mutate: updateFaq } = useUpdateFaq();
  const { toast } = useToastContext();

  const handleSubmit = ({ que, ans }) => {
    updateFaq(
      { fid: faqId, question: que, answer: ans },
      {
        onSuccess: () => {
          toast({ message: '변경 사항이 저장되었어요.' });
        },
      },
    );
  };

  return (
    <FaqForm
      mode="edit"
      initialData={{ que: faq.question, ans: faq.answer }}
      onSubmit={handleSubmit}
    />
  );
}
