module.exports = {
  // root property sets this file as parent scope for the rules (i.e. rules will apply to ALL files in project)
  root: true,
  // babel
  parser: 'babel-eslint',
  // set parser options to module since this project uses ES2015 modules
  parserOptions: {
    sourceType: "module"
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // extend standard eslint rules to include html
  extends: "standard",
  // required to lint *.vue files
  plugins: ["html"]
};
