import { common, gray, blue, yellow, pink, red, green } from './colors.js';

export const semantic = {
  'fill-primary-normal': blue[400],
  'fill-primary-assistive': blue[50],
  'fill-normal-normal': common[0],
  'fill-normal-strong': gray[100],
  'fill-interaction-hover': gray[300],
  'fill-interaction-primary-hover': blue[500],
  'fill-interaction-inactive': gray[200],

  'text-primary-normal': blue[400],
  'text-normal-strong': gray[950],
  'text-normal-normal': gray[900],
  'text-normal-assistive': gray[600],
  'text-normal-inverse': common[0],

  'line-normal-strong': gray[400],
  'line-normal-normal': gray[300],
  'line-normal-assistive': gray[200],
  'line-primary-normal': blue[400],

  'icon-normal-strong': gray[950],
  'icon-normal-normal': gray[900],
  'icon-normal-assistive': gray[600],
  'icon-normal-inverse': common[0],

  'secondary-yellow-default': yellow[400],
  'secondary-yellow-lighten': yellow[50],
  'secondary-pink-default': pink[400],
  'secondary-pink-lighten': pink[50],

  'background-normal-normal': common[0],

  'static-white': common[0],
  'static-black': common[1000],

  'material-scrim': 'rgba(0, 0, 0, 0.1)',

  'system-info': blue[400],
  'system-info-subtle': blue[50],
  'system-warning': yellow[500],
  'system-warning-subtle': yellow[50],
  'system-danger': red[500],
  'system-danger-subtle': red[50],
  'system-success': green[500],
  'system-success-subtle': green[50],
};
