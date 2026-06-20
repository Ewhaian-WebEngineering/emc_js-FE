import { semantic } from './designsystem/tokens/semantic';
import { typography } from './designsystem/tokens/typography';
import Logo from './assets/svg/logo/ic_logo_text.svg?react';

function App() {
  return (
    <>
      <h2
        style={{
          color: semantic.fillPrimaryNormal,
          ...typography.body1Semibold,
        }}
      >
        폰트 적용 확인
      </h2>
      <Logo width="200" height="50" />
    </>
  );
}

export default App;
