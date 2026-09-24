import EventForm from './EventForm';
import { useParams } from 'react-router-dom';
import { useEvent, useUpdateEvent } from '@/api/feature/admin/useEventData';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

export default function EventEditScreen() {
  const { eventId } = useParams();
  const { data: event } = useEvent(eventId);
  const { mutateAsync: updateEvent } = useUpdateEvent();
  const { toast } = useToastContext();

  const handleSubmit = async (payload) => {
    await updateEvent({
      eid: eventId,
      ...payload,
      errorModal: {
        title: '저장에 실패했습니다.',
        description: '잠시 후 다시 시도해주세요.',
      },
    });
    toast({ message: '변경사항이 저장되었어요.' });
  };

  return <EventForm mode="edit" initialData={event} onSubmit={handleSubmit} />;
}
