import { useState } from 'react';
import Divider from '../../../designsystem/components/divider/Divider';
import ManagementBoothCard from '../../../designsystem/components/card/management/ManagementBoothCard';
import ManagementFairCard from '../../../designsystem/components/card/management/ManagementFairCard';
import CongestionBottomSheet from '../../admin/components/CongestionBottomSheet.jsx';
import { CONGESTION_LEVEL } from '@/constants/congestionLevel';

export default function MyAdminContent({
  fairVisitorCount,
  boothName,
  scrapCount,
  visitorCount,
}) {
  const [congestionLevel, setCongestionLevel] = useState('crowded');
  const [isCongestionSheetOpen, setIsCongestionSheetOpen] = useState(false);

  const congestion = CONGESTION_LEVEL[congestionLevel];

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
        onLinkClick={() => {}}
        visitorCount={fairVisitorCount}
      />

      <Divider size="sm" />
      <ManagementBoothCard
        boothName={boothName}
        onLinkClick={() => {}}
        scrapCount={scrapCount}
        visitorCount={visitorCount}
      />

      <CongestionBottomSheet
        isOpen={isCongestionSheetOpen}
        onClose={handleCongestionSheetClose}
        value={congestionLevel}
        onSave={handleCongestionSave}
      />
    </>
  );
}
