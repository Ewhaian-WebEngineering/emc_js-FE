import ContactTab from './components/ContactTab';
import NoticeTab from './components/NoticeTab';
import ProductListTab from './components/ProductListTab';

export const BOOTH_DETAIL_TABS = [
  {
    id: 'products',
    label: '제품목록',
    render: (booth) => <ProductListTab productGroups={booth.productGroups} />,
  },
  {
    id: 'notice',
    label: '안내사항',
    render: (booth) => <NoticeTab content={booth.notice} />,
  },
  {
    id: 'qna',
    label: '고객문의',
    render: (booth) => <ContactTab contactUrl={booth.contactUrl} />,
  },
];
