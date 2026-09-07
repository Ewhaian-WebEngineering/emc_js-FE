import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import TextInput from '@/designsystem/components/textinput/TextInput';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import { BOOTH_ROUTES, TAB_ROUTES } from '@/constants/routes';
import { useSellerVerify } from '@/api/feature/seller/useSellerData';
import { setTokens } from '@/api/core/tokenStorage';
import {
  SellerAuthContainer,
  SellerAuthContent,
  SellerAuthTitle,
  SellerAuthFooter,
} from './style';

export default function SellerCodeScreen() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { mutate: verifySellerCode, isPending } = useSellerVerify();

  const handleChange = (e) => {
    setCode(e.target.value);
    if (errorMessage) setErrorMessage('');
  };

  const handleConfirm = () => {
    verifySellerCode(code.trim(), {
      onSuccess: (data) => {
        setTokens({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          userRole: 'seller',
        });
        setErrorMessage('');
        navigate(BOOTH_ROUTES.DETAIL(data.boothId));
      },
      onError: (error) => {
        if (error?.status === 401) {
          setErrorMessage('코드가 일치하지 않습니다. 다시 확인해 주세요.');
        } else {
          setErrorMessage(
            '인증 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
          );
        }
      },
    });
  };

  return (
    <SellerAuthContainer>
      <FillCenterHeader
        onBack={() => navigate(TAB_ROUTES.MY)}
        title="셀러 인증"
        border
      />

      <SellerAuthContent>
        <SellerAuthTitle>
          이화이언을 통해 안내받은
          <br />
          <span>셀러 코드</span>를 입력해주세요
        </SellerAuthTitle>

        <TextInput
          isPassword
          value={code}
          onChange={handleChange}
          placeholder="셀러 코드를 입력해주세요. 예) CODE"
          maxLength={20}
          hasError={!!errorMessage}
          helperText={errorMessage}
          disabled={isPending}
        />
      </SellerAuthContent>

      <SellerAuthFooter>
        <BoxButton
          size="md"
          type="primary"
          disabled={!code.trim() || isPending}
          onClick={handleConfirm}
        >
          {isPending ? '확인 중...' : '확인'}
        </BoxButton>
      </SellerAuthFooter>
    </SellerAuthContainer>
  );
}
