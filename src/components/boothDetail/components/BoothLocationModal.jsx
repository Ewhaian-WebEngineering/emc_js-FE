import { useLayoutEffect, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  CloseButton,
  ModalCard,
  ModalFooter,
  ModalHeader,
  Overlay,
  PreviewViewport,
} from './style';
import CloseIcon from '@/assets/svg/28px/ic_close.svg?react';
import { semantic } from '@/designsystem/tokens/semantic';
import BoothMap from '@/assets/svg/map/booth_map.svg?react';
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch';

const SCALE = 4;

export default function BoothLocationModal({ boothTargetId, onClose }) {
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const wrapperApiRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useLayoutEffect(() => {
    const targetEl = stageRef.current?.querySelector(`#${boothTargetId}`);
    const viewportEl = viewportRef.current;
    if (!targetEl || !viewportEl || !wrapperApiRef.current) return;

    const rectEl = targetEl.querySelector('rect');
    if (rectEl) {
      rectEl.style.stroke = semantic.fillPrimaryNormal;
      rectEl.style.strokeWidth = '2';
    }

    const numberPaths = targetEl.querySelectorAll('path[fill="#3D3F41"]');
    numberPaths.forEach((path) => {
      path.style.fill = '#0f66fd';
    });

    const applyTransform = () => {
      const viewportSize = viewportEl.getBoundingClientRect().width;
      const bbox = targetEl.getBBox();
      const centerX = bbox.x + bbox.width / 2;
      const centerY = bbox.y + bbox.height / 2;

      const x = viewportSize / 2 - centerX * SCALE;
      const y = viewportSize / 2 - centerY * SCALE;

      wrapperApiRef.current.setTransform(x, y, SCALE, 0);
      setReady(true);
    };

    applyTransform();

    const ro = new ResizeObserver(applyTransform);
    ro.observe(viewportEl);
    return () => ro.disconnect();
  }, [boothTargetId]);

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalCard>
        <ModalHeader>
          <CloseButton onClick={onClose}>
            <CloseIcon color={semantic.iconNormalNormal} />
          </CloseButton>
        </ModalHeader>

        <PreviewViewport
          ref={viewportRef}
          onClick={(e) => e.stopPropagation()}
          style={{ opacity: ready ? 1 : 0 }}
        >
          <TransformWrapper
            ref={wrapperApiRef}
            initialScale={1}
            minScale={1}
            maxScale={8}
            limitToBounds={true}
          >
            <TransformComponent
              wrapperStyle={{ width: '100%', height: '100%' }}
            >
              <div ref={stageRef}>
                <BoothMap />
              </div>
            </TransformComponent>
          </TransformWrapper>
        </PreviewViewport>

        <ModalFooter />
      </ModalCard>
    </Overlay>,
    document.body,
  );
}
