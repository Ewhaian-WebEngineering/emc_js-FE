import { DEV_TEST_ACCOUNTS } from '@/api/core/devAccounts';

export function TestAccountSwitcher() {
  const handleChange = (e) => {
    const value = e.target.value;

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
      {DEV_TEST_ACCOUNTS.map((a) => (
        <option key={a.userId} value={a.userId}>
          {a.label}
        </option>
      ))}
    </select>
  );
}
