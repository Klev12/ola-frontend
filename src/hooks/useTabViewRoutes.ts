import { TabViewTabChangeEvent } from "primereact/tabview";

import { useLocation, useNavigate } from "react-router";

interface UseTabViewRoutesProps {
  routes: string[];
}
/**
 * const {currentTabIndex, onBeforeTabChange} =
 * useTabViewRoutes({routes: [
 *  ROUTES.DASHBOARD.COMMERCIAL.ME // -> tabIndex 0,
 *  ROUTES.DASHBOARD.COMMERCIAL.TRANSACTIONS // -> tabIndex 1
 * ]})
 */
const useTabViewRoutes = ({ routes }: UseTabViewRoutesProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const onBeforeTabChange = (tab: TabViewTabChangeEvent) => {
    navigate(routes?.[tab.index]);
  };

  return {
    activeIndex: routes.findIndex((route) => route === location.pathname),
    onBeforeTabChange,
  };
};

export default useTabViewRoutes;
