import { useState } from 'react';
import Header from '../../designsystem/components/header/Header';
import CodeInput from '../../designsystem/components/textinput/codeinput/CodeInput';
import BoxButton from '../../designsystem/components/button/boxbutton/BoxButton';
import arrowLeftIcon from '../../assets/svg/28px/ic_arrow_left.svg';
import {
  AdminAuthContainer,
  AdminAuthContent,
  AdminAuthDescription,
  AdminAuthHighlight,
  AdminAuthFooter,
  AdminAuthBackButton,
  AdminAuthButtonWrapper,
  AdminAuthHeaderTitle,
} from './style.js';

export default function AdminAuth() {
  const [code, setCode] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    setCode(e.target.value);
    if (hasError) setHasError(false);
  };

  const handleConfirm = async () => {
    try {
      // 관리자 코드 인증 API 호출

      setHasError(false);
    } catch (err) {
      setHasError(true);
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <AdminAuthContainer>
      <Header
        left={
          <AdminAuthBackButton onClick={handleBack}>
            <img src={arrowLeftIcon} alt="뒤로가기" />
          </AdminAuthBackButton>
        }
        center={<AdminAuthHeaderTitle>관리자 인증</AdminAuthHeaderTitle>}
      />

      <AdminAuthContent>
        <AdminAuthDescription>
          이화이언을 통해 안내받은
          <br />
          <AdminAuthHighlight>관리자 코드</AdminAuthHighlight>를 입력해주세요
        </AdminAuthDescription>

        <CodeInput
          value={code}
          onChange={handleChange}
          placeholder="관리자 코드를 입력해주세요. 예) CODE"
          maxLength={20}
          hasError={hasError}
          helperText={
            hasError ? '코드가 일치하지 않습니다. 다시 확인해 주세요.' : ''
          }
        />
      </AdminAuthContent>

      <AdminAuthFooter>
        <AdminAuthButtonWrapper>
          <BoxButton
            size="md"
            type="primary"
            disabled={!code}
            onClick={handleConfirm}
          >
            확인
          </BoxButton>
        </AdminAuthButtonWrapper>
      </AdminAuthFooter>
    </AdminAuthContainer>
  );
}
