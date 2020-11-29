module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
  ],
  rules: {
    'indent': ['warn', 2],
    'comma-dangle': ['warn', 'always-multiline'],
    'semi': ['error', 'always'],
    'quotes': ['warn', 'single', { 'avoidEscape': false }],
    'vue/comma-dangle': ['warn', 'always-multiline'],
    'vue/max-attributes-per-line': 'off',
  }
}
