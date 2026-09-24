import { useState } from 'react';
import FaqForm from './FaqForm';
import { useCreateFaq, useUpdateFaq } from '@/api/feature/admin/useFaqData';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

export default function FaqCreateScreen() {
  const { mutateAsync: createFaq } = useCreateFaq();
  const { mutateAsync: updateFaq } = useUpdateFaq();
  const { toast } = useToastContext();

  const [createdId, setCreatedId] = useState(null);

  const handleSubmit = async ({ que, ans }) => {
    if (createdId) {
      await updateFaq({ fid: createdId, question: que, answer: ans });
    } else {
      const created = await createFaq({ question: que, answer: ans });
      setCreatedId(created?.id);
    }

    toast({ message: '변경사항이 저장되었어요.' });
  };

  return (
    <FaqForm mode={createdId ? 'edit' : 'create'} onSubmit={handleSubmit} />
  );
}
