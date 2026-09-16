import { useDeleteAccount } from '@/api/feature/auth/useAuth';

export default function DevScreen() {
  const { mutate, isPending, isSuccess, isError } = useDeleteAccount();

  return (
    <div
      style={{
        padding: 32,
        gap: 16,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <h2>회원 탈퇴 테스트</h2>
      <button
        onClick={() => mutate()}
        disabled={isPending}
        style={{ width: '200px', padding: 8, fontSize: 16 }}
      >
        {isPending ? '삭제 중...' : '회원 탈퇴'}
      </button>
      {isSuccess && <p>탈퇴 완료</p>}
      {isError && <p>실패</p>}
    </div>
  );
}
