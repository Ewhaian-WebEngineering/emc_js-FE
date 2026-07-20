import { HomeIconButtonWrapper } from '../style';

export default function HomeIconButton({ label, icon: Icon }) {
  return (
    <HomeIconButtonWrapper>
      <Icon aria-label={label} />
      <p>{label}</p>
    </HomeIconButtonWrapper>
  );
}
