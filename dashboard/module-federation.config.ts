export const mfConfig = {
  name: "dashboard",
  filename: "remoteEntry.js",
  exposes: {'./dashboard': './src/App.tsx'},
  shared: {
    react: { singleton: true, requiredVersion: "^19.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
    "react-router-dom": { singleton: true }
  },
};
