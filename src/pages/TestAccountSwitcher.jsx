import { setTokens } from '@/api/core/tokenStorage';

const DEV_TEST_ACCOUNTS = JSON.parse(
  import.meta.env.VITE_DEV_ACCOUNTS_JSON || '[]',
);

export function TestAccountSwitcher() {
  const handleChange = (e) => {
    const value = e.target.value;
    const account = DEV_TEST_ACCOUNTS.find((a) => String(a.userId) === value);
    if (!account) return;

    setTokens({
      accessToken: account.token,
      refreshToken: account.token,
      userRole: account.role,
      userId: account.userId,
    });
    window.location.reload();
  };

  return (
    <select
      onChange={handleChange}
      style={{ position: 'fixed', bottom: 8, right: 8, zIndex: 9999 }}
    >
      <option value="">테스트 계정 선택</option>
      {DEV_TEST_ACCOUNTS.map((a) => (
        <option key={a.userId} value={a.userId}>
          {a.label}
        </option>
      ))}
    </select>
  );
}
