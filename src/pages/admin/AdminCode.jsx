import { useState } from 'react';
import Header from '../../designsystem/components/header/FillCenterHeader';
import TextFeild from '../../designsystem/components/textinput/textfield/TextField';
import BoxButton from '../../designsystem/components/button/boxbutton/BoxButton';
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

  return (
    <AdminAuthContainer>
      <Header onBack={() => {}} title="Title" />

      <AdminAuthContent>
        <AdminAuthDescription>
          이화이언을 통해 안내받은
          <br />
          <AdminAuthHighlight>관리자 코드</AdminAuthHighlight>를 입력해주세요
        </AdminAuthDescription>

        <TextFeild
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
