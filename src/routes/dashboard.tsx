import { Route as rootRoute } from "./__root";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: function Dashboard() {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Dashboard</h1>
        <p>Placeholder - to be implemented</p>
      </div>
    );
  },
});
