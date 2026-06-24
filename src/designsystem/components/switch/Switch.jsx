import { SwitchThumb, SwitchWrapper } from './style';

export default function Switch({ checked, onChange }) {
  return (
    <SwitchWrapper checked={checked} onClick={() => onChange(!checked)}>
      <SwitchThumb checked={checked} />
    </SwitchWrapper>
  );
}
