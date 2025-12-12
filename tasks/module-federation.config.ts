export const mfConfig = {
  name: "tasks",
  filename: "remoteEntry.js",
  exposes: { './tasks': './src/TaskApp.tsx' },
  shared: {
    react: { singleton: true, requiredVersion: "^19.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
    "react-router-dom": { singleton: true }
  },
};
