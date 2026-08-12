// TODO: 실제 API 연동으로 교체

export const fetchBoothNotice = ({ boothId, noticeId }) => {
  // TODO: GET /booths/:boothId/notices/:noticeId 호출
  return Promise.resolve({
    boothId,
    id: Number(noticeId) || 1,
    title: '[필독] 현장 재고는 조기 소진될 수 있습니다.',
    content:
      '현장 재고는 조기 소진될 수 있으며, 조기 소진 시 판매가 종료됩니다.',
  });
};

export const createBoothNotice = ({ boothId, title, content }) => {
  // TODO: POST /booths/:boothId/notices 호출
  return Promise.resolve({ id: Date.now(), boothId, title, content });
};

export const updateBoothNotice = ({ boothId, noticeId, title, content }) => {
  // TODO: PATCH /booths/:boothId/notices/:noticeId 호출
  return Promise.resolve({ boothId, noticeId, title, content });
};

export const deleteBoothNotice = ({ boothId, noticeId }) => {
  // TODO: DELETE /booths/:boothId/notices/:noticeId 호출
  return Promise.resolve({ boothId, noticeId });
};
