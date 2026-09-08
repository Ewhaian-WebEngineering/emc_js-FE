import FaqForm from './FaqForm';
import { useNavigate, useParams } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useFaq, useUpdateFaq } from '@/api/feature/admin/useFaqData';

export default function FaqEditScreen() {
  const navigate = useNavigate();
  const { faqId } = useParams();
  const { data: faq } = useFaq(faqId);
  const { mutate: updateFaq } = useUpdateFaq();

  const handleSubmit = ({ que, ans }) => {
    updateFaq(
      { fid: faqId, question: que, answer: ans },
      {
        onSuccess: () => {
          navigate(ADMIN_ROUTES.DASHBOARD);
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
