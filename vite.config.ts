import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import * as path from "path";

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
// });
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [tailwindcss(), react()],
    resolve: {
      alias: {
        "@app": path.resolve(__dirname, "./src"),
      },
    },
    define: {
      __APP_ENV__: env.APP_ENV,
    },
    server: {
      port: Number(env.VITE_PORT),
    },
  };
});
