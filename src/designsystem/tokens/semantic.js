import { common, gray, blue, yellow, pink, red, green } from './colors.js';

export const semantic = {
  fillPrimaryNormal: blue[400],
  fillPrimaryAssistive: blue[50],
  fillNormalWhite: common[0],
  fillNormalStrong: gray[100],
  fillNormalNormal: gray[50],
  fillInteractionPressed: gray[200],
  fillInteractionPrimaryHover: blue[500],
  fillInteractionDisabled: gray[100],

  textPrimaryNormal: blue[400],
  textNormalStrong: gray[900],
  textNormalNormal: gray[700],
  textNormalAssistive: gray[400],
  textNormalInverse: common[0],

  borderNormalStrong: gray[300],
  borderNormalNormal: gray[200],
  borderNormalAssistive: gray[100],
  borderPrimaryNormal: blue[400],

  iconPrimaryNormal: blue[400],
  iconNormalStrong: gray[800],
  iconNormalNormal: gray[600],
  iconNormalAssistive: gray[300],
  iconNormalInverse: common[0],

  secondaryYellowDefault: yellow[400],
  secondaryYellowLighten: yellow[50],
  secondaryPinkDefault: pink[400],
  secondaryPinkLighten: pink[50],

  staticWhite: common[0],
  staticBlack: common[1000],

  materialStrong: 'rgba(36, 38, 40, 0.9)',
  materialNormal: 'rgba(36, 38, 40, 0.6)',
  materialAssistive: 'rgba(36, 38, 40, 0.4)',

  statusInfo: blue[400],
  statusInfoSubtle: blue[50],
  statusWarning: yellow[400],
  statusWarningSubtle: yellow[50],
  statusDanger: red[500],
  statusDangerSubtle1: red[50],
  statusDangerSubtle2: red[100],
  statusSuccess: green[500],
  statusSuccessSubtle: green[50],
};
