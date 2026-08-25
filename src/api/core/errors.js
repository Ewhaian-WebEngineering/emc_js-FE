export class ApiError extends Error {
  constructor({ code, message, status }) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
  }

  static from(error) {
    const response = error.response;

    if (!response) {
      return new ApiError({
        code: 'NETWORK_ERROR',
        message: '네트워크 연결을 확인해주세요.',
        status: 0,
      });
    }

    // TODO: 실제 에러 응답 형태 확인
    const { code, message } = response.data?.error ?? response.data ?? {};
    return new ApiError({
      code: code ?? 'UNKNOWN_ERROR',
      message: message ?? '알 수 없는 오류가 발생했습니다.',
      status: response.status,
    });
  }
}
