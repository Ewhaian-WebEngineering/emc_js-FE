import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Divider from '../../../designsystem/components/divider/Divider';
import ManagementBoothCard from '../../../designsystem/components/card/management/ManagementBoothCard';
import ManagementFairCard from '../../../designsystem/components/card/management/ManagementFairCard';
import CongestionBottomSheet from '../../admin/components/CongestionBottomSheet.jsx';
import { ADMIN_ROUTES } from '../../../constants/routes';

const CONGESTION_API_TO_LEVEL = {
  green: 'relaxed',
  yellow: 'normal',
  red: 'crowded',
};

export default function MyAdminContent({ data }) {
  const navigate = useNavigate();
  const [congestionLevel, setCongestionLevel] = useState(
    CONGESTION_API_TO_LEVEL[data.congestion] ?? data.congestion,
  );
  const [isCongestionSheetOpen, setIsCongestionSheetOpen] = useState(false);
  const handleCongestionClick = () => setIsCongestionSheetOpen(true);
  const handleCongestionSheetClose = () => setIsCongestionSheetOpen(false);
  const handleCongestionSave = (value) => {
    if (value) setCongestionLevel(value);
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
          onLinkClick={() => {}}
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
