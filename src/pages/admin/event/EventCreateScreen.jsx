import { useState } from 'react';
import EventForm from './EventForm';
import {
  useCreateEvent,
  useUpdateEvent,
} from '@/api/feature/admin/useEventData';
import { useToastContext } from '@/designsystem/components/toast/ToastContext';

export default function EventCreateScreen() {
  const { mutateAsync: createEvent } = useCreateEvent();
  const { mutateAsync: updateEvent } = useUpdateEvent();
  const { toast } = useToastContext();

  const [createdId, setCreatedId] = useState(null);

  const handleSubmit = async (payload) => {
    if (createdId) {
      await updateEvent({
        eid: createdId,
        ...payload,
        errorModal: {
          title: '저장에 실패했습니다.',
          description: '잠시 후 다시 시도해주세요.',
        },
      });
    } else {
      const created = await createEvent({
        ...payload,
        errorModal: {
          title: '등록에 실패했습니다.',
          description: '잠시 후 다시 시도해주세요.',
        },
      });
      setCreatedId(created?.id);
    }

    toast({ message: '변경사항이 저장되었어요.' });
  };

  return (
    <EventForm mode={createdId ? 'edit' : 'create'} onSubmit={handleSubmit} />
  );
}
