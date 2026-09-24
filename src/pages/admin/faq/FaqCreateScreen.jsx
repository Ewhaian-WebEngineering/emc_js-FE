import FaqForm from './FaqForm';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useCreateFaq } from '@/api/feature/admin/useFaqData';

export default function FaqCreateScreen() {
  const navigate = useNavigate();
  const { mutateAsync: createFaq } = useCreateFaq();

  const handleSubmit = async ({ que, ans }) => {
    await createFaq({ question: que, answer: ans });
    navigate(ADMIN_ROUTES.DASHBOARD);
  };

  return <FaqForm mode="create" onSubmit={handleSubmit} />;
}
