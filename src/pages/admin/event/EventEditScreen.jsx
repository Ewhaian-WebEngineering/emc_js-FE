import EventForm from './EventForm';
import { useNavigate, useParams } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useEvent, useUpdateEvent } from '@/api/feature/admin/useEventData';

export default function EventEditScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const { data: event } = useEvent(eventId);
  const { mutate: updateEvent } = useUpdateEvent();

  const handleSubmit = (payload) => {
    updateEvent(
      { eid: eventId, ...payload },
      {
        onSuccess: () => {
          navigate(ADMIN_ROUTES.DASHBOARD);
        },
      },
    );
  };

  return <EventForm mode="edit" initialData={event} onSubmit={handleSubmit} />;
}
