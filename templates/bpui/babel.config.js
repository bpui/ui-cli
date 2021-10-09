

module.exports = {
  presets: [
    [
      "@vue/cli-plugin-babel/preset",
      {
        useBuiltIns: "entry",
      }
    ],
    [
      "@babel/preset-env",
      {
        targets: {
          chrome: "50",
          ie: "10",
          firefox: "40",
          safari: "11"
        },
        modules: false,
        spec: true,
        useBuiltIns: "entry",
        forceAllTransforms: true,
        corejs: 3
      }
    ]
  ]
};
