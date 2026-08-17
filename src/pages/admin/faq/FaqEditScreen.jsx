import FaqForm from './FaqForm';
import { useNavigate } from 'react-router-dom';
import { mockFaq } from '../constants/mockFaq';

export default function FaqEditScreen() {
  const navigate = useNavigate();
  const handleSubmit = (payload) => {
    // TODO: api로 교체
    console.log('edit payload', payload);
    navigate('/admin/dashboard');
  };

  return <FaqForm mode="edit" initialData={mockFaq} onSubmit={handleSubmit} />;
}
