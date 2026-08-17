// TODO: 실제 API 연동으로 교체

export const fetchBoothNotice = ({ boothId, noticeId }) => {
  return Promise.resolve({
    boothId,
    id: Number(noticeId) || 1,
    title: '이전에 입력한 공지 제목입니다.',
    content: '이전에 입력한 공지 내용입니다.',
  });
};

export const createBoothNotice = ({ boothId, title, content }) => {
  return Promise.resolve({ id: Date.now(), boothId, title, content });
};

export const updateBoothNotice = ({ boothId, noticeId, title, content }) => {
  return Promise.resolve({ boothId, noticeId, title, content });
};

export const deleteBoothNotice = ({ boothId, noticeId }) => {
  return Promise.resolve({ boothId, noticeId });
};
