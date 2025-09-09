export const mfConfig = {
  name: "boards",
  filename: "remoteEntry.js",
  exposes: { './boards': './src/App.tsx' },
  shared: {
    react: { singleton: true, requiredVersion: "^19.0.0" },
    "react-dom": { singleton: true, requiredVersion: "^19.0.0" },
    "react-router-dom": { singleton: true }
  }
};
