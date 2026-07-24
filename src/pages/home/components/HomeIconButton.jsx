import { HomeIconButtonWrapper } from '../style';

export default function HomeIconButton({ label, icon: Icon, onClick }) {
  return (
    <HomeIconButtonWrapper onClick={onClick}>
      <Icon aria-label={label} />
      <p>{label}</p>
    </HomeIconButtonWrapper>
  );
}
