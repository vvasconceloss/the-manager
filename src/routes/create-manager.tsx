import { Route as rootRoute } from "./__root";
import { createRoute } from "@tanstack/react-router";

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create-manager",
  component: function CreateManager() {
    return (
      <div style={{ padding: "2rem" }}>
        <h1>Create Manager</h1>
        <p>Placeholder - to be implemented</p>
      </div>
    );
  },
});
