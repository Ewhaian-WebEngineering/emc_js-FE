import EventForm from './EventForm';

export default function EventCreateScreen() {
  const handleSubmit = (payload) => {
    console.log('create payload', payload); // TODO: API로 교체
  };

  return <EventForm mode="create" onSubmit={handleSubmit} />;
}
