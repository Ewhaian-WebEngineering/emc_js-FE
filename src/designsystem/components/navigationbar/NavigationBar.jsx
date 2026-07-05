import { useLocation, useNavigate } from 'react-router-dom';
import { NAVIGATION_ITEMS } from '../../../constants/navigation';
import {
  NavigationBarContainer,
  NavigationBarItem,
  NavigationBarLabel,
} from './style';

/**
 * 웹앱 하단에 고정되는 네비게이션 바 컴포넌트입니다.
 * 현재 경로에 따라 활성 탭을 표시하고, 탭 클릭 시 해당 경로로 이동합니다.
 */
export default function NavigationBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <NavigationBarContainer>
      {NAVIGATION_ITEMS.map(({ path, label, IconFill, IconStroke }) => {
        const isActive = pathname === path;
        const Icon = isActive ? IconFill : IconStroke;

        return (
          <NavigationBarItem
            key={path}
            type="button"
            isActive={isActive}
            onClick={() => navigate(path)}
          >
            <Icon />
            <NavigationBarLabel isActive={isActive}>{label}</NavigationBarLabel>
          </NavigationBarItem>
        );
      })}
    </NavigationBarContainer>
  );
}
