import { useEffect } from "react";
import { Route as rootRoute } from "./__root";
import { useNavigate } from "@tanstack/react-router";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function Index() {
    const navigate = useNavigate();

    useEffect(() => {
      navigate({ to: "/save-menu" });
    }, [navigate]);

    return null;
  },
});
