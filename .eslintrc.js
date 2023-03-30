module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/vue3-essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    indent: 0,
    // 关闭函数前空格校验
    'space-before-function-paren': 0,
    'eol-last': 0,
    // 关闭组件命名规则
    'vue/multi-word-component-names': 'off'
  }
}
