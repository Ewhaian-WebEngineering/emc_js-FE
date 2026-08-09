import BoothMap from '@/assets/svg/map/booth_map.svg?react';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useGoBack } from '@/hooks/useGoBack';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { MapArea, MapScreenWrapper, NoticeTagWrapper } from './style';
import MapBottomSheet from './components/MapBottomSheet';
import Tag from '@/designsystem/components/tag/Tag';
import NoticeIcon from '@/assets/svg/16px/ic_announce.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { useState } from 'react';
import NoticeBottomSheet from './components/NoticeBottomSheet';

export default function MapScreen() {
  const handleBack = useGoBack();
  const [showNotice, setShowNotice] = useState(false);

  return (
    <MapScreenWrapper>
      <FillCenterHeader onBack={handleBack} title="배치도" />
      <MapArea>
        <NoticeTagWrapper>
          <Tag
            label={
              <>
                <NoticeIcon
                  color={
                    showNotice
                      ? semantic.iconNormalInverse
                      : semantic.secondaryYellowDefault
                  }
                />
                안내사항
              </>
            }
            variant="notice"
            selected={showNotice}
            onClick={() => setShowNotice((prev) => !prev)}
          />
        </NoticeTagWrapper>
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
      {showNotice ? (
        <NoticeBottomSheet onClose={() => setShowNotice(false)} />
      ) : (
        <MapBottomSheet />
      )}
    </MapScreenWrapper>
  );
}
