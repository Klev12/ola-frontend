import { useLocation } from "react-router";

export default function useQueryPath() {
  return new URLSearchParams(useLocation().search);
}
