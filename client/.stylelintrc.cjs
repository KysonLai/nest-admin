module.exports = {
  root: true,
  extends: ['stylelint-config-standard-scss', 'stylelint-config-recess-order'],
  customSyntax: 'postcss-html',
  rules: {
    'selector-id-pattern': [
      '^([a-z][a-z0-9]*)(-[a-z0-9]+)*$',
      {
        message: 'Expected id rule to be kebab-case'
      }
    ],
    'selector-class-pattern': [
      '^([a-z][a-z0-9]*)((-|--|__)[a-z0-9]+)*$',
      {
        message: 'Expected class rule to be kebab-case'
      }
    ],
    'no-descending-specificity': null,
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep']
      }
    ],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global']
      }
    ],
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'extend', 'content', 'include', 'for'] }],
    'font-family-no-missing-generic-family-keyword': null
  }
}
