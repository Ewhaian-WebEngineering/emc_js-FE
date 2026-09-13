import EventForm from './EventForm';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useCreateEvent } from '@/api/feature/admin/useEventData';

export default function EventCreateScreen() {
  const navigate = useNavigate();
  const { mutate: createEvent } = useCreateEvent();

  const handleSubmit = (payload) => {
    createEvent(payload, {
      onSuccess: () => {
        navigate(ADMIN_ROUTES.DASHBOARD);
      },
    });
  };

  return <EventForm mode="create" onSubmit={handleSubmit} />;
}
