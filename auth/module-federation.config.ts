export const mfConfig = {
  name: "auth",
  filename: "remoteEntry.js",
  exposes: {'./auth': './src/App.tsx'},
  shared: {
    react: { singleton: true, requiredVersion: "^19.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
    "react-router-dom": { singleton: true },
  },
};
