import EventForm from './EventForm';
import { mockEvent } from '../constants/eventDummy';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';

export default function EventEditScreen() {
  const navigate = useNavigate();
  const handleSubmit = (payload) => {
    // TODO: api로 교체
    console.log('edit payload', payload);
    navigate(ADMIN_ROUTES.DASHBOARD);
  };

  return (
    <EventForm mode="edit" initialData={mockEvent} onSubmit={handleSubmit} />
  );
}
