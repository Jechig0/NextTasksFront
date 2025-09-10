export const mfConfig = {
  name: "host",
  exposes: {},
  remotes : {
    tasks: "tasks@http://localhost:8083/remoteEntry.js",
    dashboard: "dashboard@http://localhost:8084/remoteEntry.js",
    boards: "boards@http://localhost:8081/remoteEntry.js",
    auth: "auth@http://localhost:8082/remoteEntry.js"
  },
  shared: {
    react: { singleton: true, requiredVersion: "^19.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
    "react-router-dom": { singleton: true }
  },
};
