import FaqForm from './FaqForm';
import { useNavigate } from 'react-router-dom';

export default function FaqCreateScreen() {
  const navigate = useNavigate();
  const handleSubmit = (payload) => {
    console.log('create payload', payload); // TODO: API로 교체
    navigate('/admin/dashboard');
  };

  return <FaqForm mode="create" onSubmit={handleSubmit} />;
}
