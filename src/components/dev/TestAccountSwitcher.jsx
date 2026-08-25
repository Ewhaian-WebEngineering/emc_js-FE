import { DEV_TEST_ACCOUNTS } from '@/api/core/devAccounts';
import { clearTokens } from '@/api/core/tokenStorage';

const LOGOUT_VALUE = 'logout';

export function TestAccountSwitcher() {
  const handleChange = (e) => {
    const value = e.target.value;

    if (value === LOGOUT_VALUE) {
      clearTokens();
      window.location.reload();
      return;
    }

    const account = DEV_TEST_ACCOUNTS.find((a) => String(a.userId) === value);
    if (!account) return;

    localStorage.setItem('access_token', account.token);
    localStorage.setItem('user_role', account.role);
    window.location.reload();
  };

  return (
    <select
      onChange={handleChange}
      style={{ position: 'fixed', bottom: 8, right: 8, zIndex: 9999 }}
    >
      <option value="">테스트 계정 선택</option>
      <option value={LOGOUT_VALUE}>🚪 로그아웃 상태</option>
      {DEV_TEST_ACCOUNTS.map((a) => (
        <option key={a.userId} value={a.userId}>
          {a.label}
        </option>
      ))}
    </select>
  );
}
