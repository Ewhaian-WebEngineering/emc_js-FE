import BannerForm from './BannerForm';
import { useNavigate } from 'react-router-dom';

export default function BannerCreateScreen() {
  const navigate = useNavigate();
  const handleSubmit = (payload) => {
    console.log('create payload', payload); // TODO: API로 교체
    navigate('/admin/dashboard');
  };

  return <BannerForm mode="create" onSubmit={handleSubmit} />;
}
