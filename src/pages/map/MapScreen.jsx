import BoothMap from '@/assets/svg/map/booth_map.svg?react';
import FillCenterHeader from '@/designsystem/components/header/FillCenterHeader';
import { useGoBack } from '@/hooks/useGoBack';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';
import {
  MapArea,
  MapScreenWrapper,
  NoticeTagContent,
  NoticeTagWrapper,
  boothSelectionStyles,
} from './style';
import MapBottomSheet from './components/MapBottomSheet';
import Tag from '@/designsystem/components/tag/Tag';
import NoticeIcon from '@/assets/svg/16px/ic_announce.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import NoticeBottomSheet from './components/NoticeBottomSheet';
import { Global } from '@emotion/react';
import { useLocation } from 'react-router-dom';

const MAP_WIDTH = 813;
const MAP_HEIGHT = 939;

const INITIAL_SCALE = 1.1;
const MAX_SCALE = 1.8;

const savedTransforms = new Map();

const clamp = (v, min, max) => Math.min(max, Math.max(min, v));

export default function MapScreen() {
  const location = useLocation();
  const latestTransformRef = useRef(null);

  const handleBack = useGoBack();
  const [showNotice, setShowNotice] = useState(false);
  const containerRef = useRef(null);
  const [transformConfig, setTransformConfig] = useState(null);

  const [selectedBooth, setSelectedBooth] = useState(null);
  const mapContentRef = useRef(null);

  useEffect(() => {
    const container = mapContentRef.current;
    if (!container) return;
    container
      .querySelectorAll('.selected')
      .forEach((el) => el.classList.remove('selected'));
    if (selectedBooth) {
      const id =
        selectedBooth.type === 'sponsor'
          ? `sponsor-booth-${selectedBooth.number}`
          : `booth-${selectedBooth.number}`;
      container.querySelector(`#${id}`)?.classList.add('selected');
    }
  }, [selectedBooth]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const { width, height } = el.getBoundingClientRect();

    const minScale = height / MAP_HEIGHT;
    const saved = savedTransforms.get(location.key) ?? null;

    setTransformConfig({
      minScale,
      initialScale: saved
        ? clamp(saved.scale, minScale, MAX_SCALE)
        : INITIAL_SCALE,
      initialPositionX: saved
        ? saved.positionX
        : -(MAP_WIDTH * INITIAL_SCALE - width),
      initialPositionY: saved ? saved.positionY : 0,
    });
  }, []);

  useEffect(() => {
    const key = location.key;
    return () => {
      if (!latestTransformRef.current) return;
      savedTransforms.set(key, latestTransformRef.current);
    };
  }, [location.key]);

  const saveTransformState = (ref) => {
    const { scale, positionX, positionY } = ref.state;
    latestTransformRef.current = { scale, positionX, positionY };
  };

  const handleMapClick = (e) => {
    if (showNotice) {
      setShowNotice(false);
      return;
    }

    const boothEl = e.target.closest('[id^="booth-"], [id^="sponsor-booth-"]');
    if (!boothEl) {
      setSelectedBooth(null);
      return;
    }
    const isSponsor = boothEl.id.startsWith('sponsor-booth-');
    const number = parseInt(
      isSponsor
        ? boothEl.id.replace('sponsor-booth-', '')
        : boothEl.id.replace('booth-', ''),
      10,
    );
    const type = isSponsor ? 'sponsor' : 'general';

    setSelectedBooth((prev) =>
      prev && prev.type === type && prev.number === number
        ? null
        : { type, number },
    );
  };

  return (
    <MapScreenWrapper>
      <Global styles={boothSelectionStyles} />
      <FillCenterHeader onBack={handleBack} title="배치도" />
      <MapArea ref={containerRef}>
        <NoticeTagWrapper>
          <Tag
            label={
              <NoticeTagContent>
                <NoticeIcon
                  color={
                    showNotice
                      ? semantic.iconNormalInverse
                      : semantic.secondaryYellowDefault
                  }
                />
                안내사항
              </NoticeTagContent>
            }
            variant="notice"
            selected={showNotice}
            onClick={() => setShowNotice((prev) => !prev)}
          />
        </NoticeTagWrapper>
        {transformConfig !== null && (
          <TransformWrapper
            initialScale={transformConfig.initialScale}
            minScale={transformConfig.minScale}
            maxScale={MAX_SCALE}
            initialPositionX={transformConfig.initialPositionX}
            initialPositionY={transformConfig.initialPositionY}
            onPanningStop={saveTransformState}
            onPinchingStop={saveTransformState}
            onWheelStop={saveTransformState}
            onZoomStop={saveTransformState}
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
              <div
                ref={mapContentRef}
                style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
                onClick={handleMapClick}
              >
                <BoothMap />
              </div>
            </TransformComponent>
          </TransformWrapper>
        )}
      </MapArea>
      {showNotice ? (
        <NoticeBottomSheet onClose={() => setShowNotice(false)} />
      ) : (
        <MapBottomSheet
          isExpanded={selectedBooth !== null}
          selectedBooth={selectedBooth}
        />
      )}
    </MapScreenWrapper>
  );
}
