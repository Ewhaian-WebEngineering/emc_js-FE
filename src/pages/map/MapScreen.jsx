import BoothMap from '@/assets/svg/map/booth_map.svg?react';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useGoBack } from '@/hooks/useGoBack';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { MapArea, MapScreenWrapper } from './style';

export default function MapScreen() {
  const handleBack = useGoBack();

  return (
    <MapScreenWrapper>
      <FillCenterHeader onBack={handleBack} title="배치도" />
      <MapArea>
        <TransformWrapper
          initialScale={1}
          minScale={1}
          maxScale={4}
          centerOnInit
          limitToBounds
          doubleClick={{ disabled: true }}
        >
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
            <BoothMap />
          </TransformComponent>
        </TransformWrapper>
      </MapArea>
    </MapScreenWrapper>
  );
}
