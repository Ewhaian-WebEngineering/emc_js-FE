import FaqForm from './FaqForm';
import { useNavigate } from 'react-router-dom';
import { mockFaq } from '../constants/mockFaq';
import { ADMIN_ROUTES } from '@/constants/routes';

export default function FaqEditScreen() {
  const navigate = useNavigate();
  const handleSubmit = (payload) => {
    // TODO: api로 교체
    console.log('edit payload', payload);
    navigate(ADMIN_ROUTES.DASHBOARD);
  };

  return <FaqForm mode="edit" initialData={mockFaq} onSubmit={handleSubmit} />;
}
