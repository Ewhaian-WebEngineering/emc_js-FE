import FaqForm from './FaqForm';
import { useParams } from 'react-router-dom';
import { useFaq, useUpdateFaq } from '@/api/feature/admin/useFaqData';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';
import { InfiniteScrollLoader } from '@/components/common/style';
import Spinner from '@/designsystem/components/spinner/Spinner';

export default function FaqEditScreen() {
  const { faqId } = useParams();
  const { data: faq, isPending } = useFaq(faqId);
  const { mutateAsync: updateFaq } = useUpdateFaq();
  const { toast } = useToastContext();

  if (isPending) {
    return (
      <InfiniteScrollLoader>
        <Spinner />
      </InfiniteScrollLoader>
    );
  }

  const handleSubmit = async ({ que, ans }) => {
    await updateFaq({ fid: faqId, question: que, answer: ans });
    toast({ message: '변경사항이 저장되었어요.' });
  };

  return (
    <FaqForm
      mode="edit"
      initialData={{ que: faq?.question, ans: faq?.answer }}
      onSubmit={handleSubmit}
    />
  );
}
