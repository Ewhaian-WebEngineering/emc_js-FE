import BoothMap from '@/assets/svg/map/booth_map.svg?react';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useGoBack } from '@/hooks/useGoBack';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import { MapArea, MapScreenWrapper, NoticeTagWrapper } from './style';
import MapBottomSheet from './components/MapBottomSheet';
import Tag from '@/designsystem/components/tag/Tag';
import NoticeIcon from '@/assets/svg/16px/ic_announce.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { useLayoutEffect, useRef, useState } from 'react';
import NoticeBottomSheet from './components/NoticeBottomSheet';

const MAP_WIDTH = 813;
const MAP_HEIGHT = 939;

const INITIAL_SCALE = 1.1;
const MAX_SCALE = 1.8;

export default function MapScreen() {
  const handleBack = useGoBack();
  const [showNotice, setShowNotice] = useState(false);
  const containerRef = useRef(null);
  const [transformConfig, setTransformConfig] = useState(null);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();

    const minScale = height / MAP_HEIGHT; // 세로가 화면(컨테이너) 높이에 딱 맞는 배율
    const initialPositionX = -(MAP_WIDTH * INITIAL_SCALE - width);

    setTransformConfig({ minScale, initialPositionX });
  }, []);

  return (
    <MapScreenWrapper>
      <FillCenterHeader onBack={handleBack} title="배치도" />
      <MapArea ref={containerRef}>
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
        {transformConfig !== null && (
          <TransformWrapper
            initialScale={INITIAL_SCALE}
            minScale={transformConfig.minScale}
            maxScale={MAX_SCALE}
            initialPositionX={transformConfig.initialPositionX}
            initialPositionY={0}
            limitToBounds
            centerZoomedOut={true}
            wheel={{ step: 0.1 }}
            pinch={{ step: 3 }}
            velocityAnimation={{ disabled: true }}
            doubleClick={{ disabled: true }}
          >
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
            >
              <div style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}>
                <BoothMap />
              </div>
            </TransformComponent>
          </TransformWrapper>
        )}
      </MapArea>
      {showNotice ? (
        <NoticeBottomSheet onClose={() => setShowNotice(false)} />
      ) : (
        <MapBottomSheet />
      )}
    </MapScreenWrapper>
  );
}
