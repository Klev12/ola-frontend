import { useNavigate } from "react-router";

const useNavigateTo = () => {
  const navigate = useNavigate();

  const navigateTo = ({
    tabIndex,
    route,
    index,
  }: {
    tabIndex: number;
    route: string;
    index: number;
  }) => {
    if (index === tabIndex) navigate(route);
  };

  return navigateTo;
};

export default useNavigateTo;
