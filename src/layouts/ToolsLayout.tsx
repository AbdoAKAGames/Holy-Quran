// layouts/ToolsLayout.tsx
import { Outlet } from "react-router-dom";
import { Tools } from "../components/tools/Tools";

export default function ToolsLayout() {
  return (
    <>
      <Outlet />
      <Tools />
    </>
  );
}
