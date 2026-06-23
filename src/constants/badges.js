import {
  blue,
  cyan,
  pink,
  purple,
  yellow,
  green,
  mint,
} from '../designsystem/tokens/colors';

const BADGE_MAP = {
  performance: {
    label: '퍼포먼스',
    color: blue[300],
    backgroundColor: blue[50],
  },
  stationery: {
    label: '문구류',
    color: cyan[500],
    backgroundColor: cyan[50],
  },
  craft: {
    label: '공예',
    color: purple[400],
    backgroundColor: purple[50],
  },
  fashionBeauty: {
    label: '패션/뷰티',
    color: pink[300],
    backgroundColor: pink[50],
  },
  food: {
    label: '수제 먹거리',
    color: yellow[400],
    backgroundColor: yellow[50],
  },
  eco: {
    label: '친환경',
    color: green[400],
    backgroundColor: green[50],
  },
  vegan: {
    label: '비건',
    color: mint[400],
    backgroundColor: mint[50],
  },
};

export default BADGE_MAP;
