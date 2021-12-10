module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "@vue/typescript",
    "@vue/typescript/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    quotes: ["error", "double", {allowTemplateLiterals: true}],
    semi: "error",
    "indent": ["error", 2],
    "prefer-const": ["error"],
    "vue/valid-v-slot": ["error", {
      allowModifiers: true,
    }]
  },
};
