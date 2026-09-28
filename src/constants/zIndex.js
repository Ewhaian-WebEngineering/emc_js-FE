/**
 * 앱 전역 z-index 스케일입니다.
 * 값이 클수록 위에 렌더링됩니다. 새 레이어가 필요하면 이 파일에 추가해주세요.
 */
export const Z_INDEX = {
  base: 1,

  header: 10,
  card: 10,
  map: 10,

  navigationBar: 100,
  bottomSheetScrim: 90,
  floatingOverScrim: 95,
  bottomSheet: 101,
  datepicker: 100,

  errorScreen: 150,

  select: 200,
  toast: 300,

  modalScrim: 1000,
  modal: 1001,
};
