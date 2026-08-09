import Divider from '../../../designsystem/components/divider/Divider';
import ManagementBoothCard from '../../../designsystem/components/card/management/ManagementBoothCard';
import ManagementFairCard from '../../../designsystem/components/card/management/ManagementFairCard';

export default function MyAdminContent({
  fairVisitorCount,
  boothName,
  scrapCount,
  visitorCount,
}) {
  return (
    <>
      <ManagementFairCard
        congestionLevel="crowded"
        onCongestionClick={() => {}}
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
    </>
  );
}
