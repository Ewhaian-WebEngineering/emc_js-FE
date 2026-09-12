import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '../../../designsystem/components/divider/Divider';
import ManagementBoothCard from '../../../designsystem/components/card/management/ManagementBoothCard';
import ManagementFairCard from '../../../designsystem/components/card/management/ManagementFairCard';
import CongestionBottomSheet from '../../admin/components/CongestionBottomSheet.jsx';
import { ADMIN_ROUTES, MANAGE_ROUTES } from '../../../constants/routes';
import {
  useUpdateCongestion,
  useCongestionStream,
} from '@/api/feature/my/useMyData';

export default function MyAdminContent({ data }) {
  const navigate = useNavigate();
  const { mutate: updateCongestion } = useUpdateCongestion();
  useCongestionStream();

  const [isCongestionSheetOpen, setIsCongestionSheetOpen] = useState(false);

  const congestionLevel = data.congestion;

  const handleCongestionClick = () => setIsCongestionSheetOpen(true);
  const handleCongestionSheetClose = () => setIsCongestionSheetOpen(false);
  const handleCongestionSave = (value) => {
    if (!value) return;
    updateCongestion({ level: value });
  };

  const handleBoothLinkClick = (id) => {
    navigate(MANAGE_ROUTES.BOOTH_PREVIEW(id));
  };

  return (
    <>
      <ManagementFairCard
        congestionLevel={congestionLevel}
        onCongestionClick={handleCongestionClick}
        onLinkClick={() => navigate(ADMIN_ROUTES.DASHBOARD)}
        visitorCount={data.site.totalUv}
      />

      <Divider size="sm" />
      {data.booths.map((booth) => (
        <ManagementBoothCard
          key={booth.id}
          boothName={booth.name}
          onLinkClick={() => handleBoothLinkClick(booth.id)}
          scrapCount={booth.scrapCount}
          visitorCount={booth.totalUv}
        />
      ))}

      <CongestionBottomSheet
        isOpen={isCongestionSheetOpen}
        onClose={handleCongestionSheetClose}
        value={congestionLevel}
        onSave={handleCongestionSave}
      />
    </>
  );
}
