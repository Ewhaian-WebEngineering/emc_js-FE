import EventForm from './EventForm';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '@/constants/routes';
import { useCreateEvent } from '@/api/feature/admin/useEventData';

export default function EventCreateScreen() {
  const navigate = useNavigate();
  const { mutateAsync: createEvent } = useCreateEvent();

  const handleSubmit = async (payload) => {
    await createEvent({
      ...payload,
      errorModal: {
        title: '등록에 실패했습니다.',
        description: '잠시 후 다시 시도해주세요.',
      },
    });
    navigate(ADMIN_ROUTES.DASHBOARD);
  };

  return <EventForm mode="create" onSubmit={handleSubmit} />;
}
