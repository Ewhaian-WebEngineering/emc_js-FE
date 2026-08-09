import BannerForm from './BannerForm';

export default function EventCreateScreen() {
  const handleSubmit = (payload) => {
    console.log('create payload', payload); // TODO: API로 교체
  };

  return <BannerForm mode="create" onSubmit={handleSubmit} />;
}
