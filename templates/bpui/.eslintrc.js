module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'standard',
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/typescript",
  ],
  globals: {
    $: true,
  },
  plugins: ['html', 'vue'],
  // add your custom rules here
  rules: {
    // 2: error, 1: warn, 0: off
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // "comma-dangle": [2, "never"], // 对象、数组最后一个元素不能有逗号
    "arrow-spacing": 0,
    "brace-style": 0,
    "camelcase": 0,
    "curly": 0,
    "eol-last": 0,
    "eqeqeq": 0,
    "func-call-spacing": [2, "never"], // 函数调用，函数名和括号间不能有空格
    // allow async-await
    "generator-star-spacing": 0,
    "import/no-duplicates": 0,
    "indent": 0,
    "key-spacing": 2, // 属性:前不加空格，后加空格
    "keyword-spacing": 2, // 关键词前后加空格
    "no-console": 0,
    "no-debugger": process.env.NODE_ENV === "production" ? 1 : 0,
    "no-duplicate-imports": 0,
    "no-undef": 0,
    "no-multiple-empty-lines": 0,
    // semi: 1, // 封号结尾
    "no-unused-vars": 0,
    "no-trailing-spaces": 0, // 拖尾空格
    "no-prototype-builtins": 0,
    "no-useless-catch": 0,
    "no-empty-function": 0,
    "padded-blocks": 0,
    "space-before-function-paren": 0, // 函数参数前后有空格
    "space-before-blocks": 2, // 代码块空格
    "space-infix-ops": [2, { int32Hint: false }], // 操作符前后加空格
    "spaced-comment": 0,
    "standard/object-curly-even-spacing": 0,
    "yoda": 0,
    "vue/no-parsing-error": ["off"],
    "vue/no-unused-components": process.env.NODE_ENV === "production" ? 1 : 2,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-empty-function": 0,
    "@typescript-eslint/explicit-module-boundary-types": 0,
  },
}
