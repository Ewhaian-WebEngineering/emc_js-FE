import { SwitchThumb, SwitchWrapper } from './style';

/**
 * 켜기/끄기 상태를 전환하는 Switch 컴포넌트입니다.
 *
 * @param {boolean} checked - 스위치 켜짐 여부
 * @param {function} onChange - 스위치 클릭 시 호출되는 함수
 */
export default function Switch({ checked, onChange }) {
  return (
    <SwitchWrapper checked={checked} onClick={() => onChange(!checked)}>
      <SwitchThumb checked={checked} />
    </SwitchWrapper>
  );
}
