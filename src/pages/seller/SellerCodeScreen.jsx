import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import TextInput from '@/designsystem/components/textinput/TextInput';
import BoxButton from '@/designsystem/components/button/boxbutton/BoxButton';
import { BOOTH_ROUTES } from '@/constants/routes';
import { sellerBoothDummy } from './constants/sellerDummy';
import {
  SellerAuthContainer,
  SellerAuthContent,
  SellerAuthTitle,
  SellerAuthFooter,
} from './style';

export default function SellerCodeScreen() {
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [hasError, setHasError] = useState(false);

  const handleChange = (e) => {
    setCode(e.target.value);
    if (hasError) setHasError(false);
  };

  const handleConfirm = () => {
    const matchedBooth = sellerBoothDummy.find(
      (booth) => booth.sellercode === code,
    );

    if (matchedBooth) {
      setHasError(false);
      const boothId = matchedBooth.id;
      navigate(BOOTH_ROUTES.DETAIL(boothId));
    } else {
      setHasError(true);
    }
  };

  return (
    <SellerAuthContainer>
      <FillCenterHeader onBack={() => navigate(-1)} title="셀러 인증" />

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
          hasError={hasError}
          helperText={
            hasError ? '코드가 일치하지 않습니다. 다시 확인해 주세요.' : ''
          }
        />
      </SellerAuthContent>

      <SellerAuthFooter>
        <BoxButton
          size="md"
          type="primary"
          disabled={!code}
          onClick={handleConfirm}
        >
          확인
        </BoxButton>
      </SellerAuthFooter>
    </SellerAuthContainer>
  );
}
