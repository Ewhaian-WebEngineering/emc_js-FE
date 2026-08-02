import { TAB_ROUTES } from '@/constants/routes';
import { useLocation, useNavigate } from 'react-router-dom';

export function useGoBack(fallback = TAB_ROUTES.HOME) {
  const navigate = useNavigate();
  const location = useLocation();

  return () => {
    if (location.key === 'default') {
      navigate(fallback);
    } else {
      navigate(-1);
    }
  };
}
