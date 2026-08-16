import EventForm from './EventForm';
import { mockEvent } from '../constants/eventDummy';

export default function EventEditScreen() {
  const handleSubmit = (payload) => {
    // TODO: api로 교체
    console.log('edit payload', payload);
  };

  return (
    <EventForm mode="edit" initialData={mockEvent} onSubmit={handleSubmit} />
  );
}
