import BoothMap from '@/assets/svg/map/booth_map.svg?react';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useGoBack } from '@/hooks/useGoBack';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { MapArea, MapScreenWrapper } from './style';
import MapBottomSheet from './components/MapBottomSheet';

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
          initialPositionX={0}
          initialPositionY={0}
          limitToBounds
          alignmentAnimation={{ sizeX: 0, sizeY: 0 }}
          doubleClick={{ disabled: true }}
        >
          <TransformComponent wrapperStyle={{ width: '100%', height: '100%' }}>
            <BoothMap />
          </TransformComponent>
        </TransformWrapper>
      </MapArea>
      <MapBottomSheet />
    </MapScreenWrapper>
  );
}
