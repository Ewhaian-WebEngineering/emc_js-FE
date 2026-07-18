import { useState } from 'react';
import Header from '../../designsystem/components/header/FillCenterHeader';
import TextInput from '../../designsystem/components/textinput/TextInput';
import BoxButton from '../../designsystem/components/button/boxbutton/BoxButton';
import {
  AdminAuthContainer,
  AdminAuthContent,
  AdminAuthTitle,
  AdminAuthFooter,
} from './style.js';
import { useNavigate } from 'react-router-dom';
import { ADMIN_ROUTES } from '../../constants/routes';

export default function AdminCodeScreen() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    setCode(e.target.value);
    if (hasError) setHasError(false);
  };

  const handleConfirm = async () => {
    try {
      // TODO: 관리자 코드 인증 API 호출

      setHasError(false);
      navigate(ADMIN_ROUTES.DASHBOARD);
    } catch (err) {
      setHasError(true);
    }
  };

  return (
    <AdminAuthContainer>
      <Header onBack={() => {}} title="관리자 인증" />

      <AdminAuthContent>
        <AdminAuthTitle>
          이화이언을 통해 안내받은
          <br />
          <span>관리자 코드</span>를 입력해주세요
        </AdminAuthTitle>

        <TextInput
          isPassword
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
        <BoxButton
          size="md"
          type="primary"
          disabled={!code}
          onClick={handleConfirm}
        >
          확인
        </BoxButton>
      </AdminAuthFooter>
    </AdminAuthContainer>
  );
}
