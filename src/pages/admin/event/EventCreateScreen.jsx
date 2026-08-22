import EventForm from './EventForm';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';

export default function EventCreateScreen() {
  const navigate = useNavigate();
  const handleSubmit = (payload) => {
    // TODO: API로 교체
    console.log('create payload', payload);
    navigate(ADMIN_ROUTES.DASHBOARD);
  };

  return <EventForm mode="create" onSubmit={handleSubmit} />;
}
