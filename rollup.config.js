import { createPlugins } from "rollup-plugin-atomic"

const plugins = createPlugins([["ts", { tsconfig: "./src/tsconfig.json" }, true], "js"])

const RollupConfig = [
  {
    input: "src/main.ts",
    output: [
      {
        dir: "dist",
        format: "cjs",
        sourcemap: true,
      },
    ],
    plugins,
  },
]
export default RollupConfig
