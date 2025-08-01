import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  
  // 👇 Add custom rules in a separate object
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-ignore": false,
          "ts-nocheck": true,
          "ts-check": true,
          "ts-expect-error": true,
        },
      ],
    },
  },
];


export default eslintConfig;

// ye customize hai iska kahi wrapper bna l and use karte rahio bcz isse hi hamm  ts-ignore kar sakte hai aur any bhi de sakte hai okkh!..;
