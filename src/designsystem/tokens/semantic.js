import { common, gray, blue, yellow, pink, red, green } from './colors.js';

export const semantic = {
  fillPrimaryNormal: blue[400],
  fillPrimaryAssistive: blue[50],
  fillNormalNormal: common[0],
  fillNormalStrong: gray[100],
  fillInteractionHover: gray[300],
  fillInteractionPrimaryHover: blue[500],
  fillInteractionInactive: gray[200],

  textPrimaryNormal: blue[400],
  textNormalStrong: gray[950],
  textNormalNormal: gray[900],
  textNormalAssistive: gray[600],
  textNormalInverse: common[0],

  lineNormalStrong: gray[400],
  lineNormalNormal: gray[300],
  lineNormalAssistive: gray[200],
  linePrimaryNormal: blue[400],

  iconNormalStrong: gray[950],
  iconNormalNormal: gray[900],
  iconNormalAssistive: gray[600],
  iconNormalInverse: common[0],

  secondaryYellowDefault: yellow[400],
  secondaryYellowLighten: yellow[50],
  secondaryPinkDefault: pink[400],
  secondaryPinkLighten: pink[50],

  backgroundNormalNormal: common[0],

  staticWhite: common[0],
  staticBlack: common[1000],

  materialScrim: 'rgba(0, 0, 0, 0.1)',

  systemInfo: blue[400],
  systemInfoSubtle: blue[50],
  systemWarning: yellow[500],
  systemWarningSubtle: yellow[50],
  systemDanger: red[500],
  systemDangerSubtle: red[50],
  systemSuccess: green[500],
  systemSuccessSubtle: green[50],
};
