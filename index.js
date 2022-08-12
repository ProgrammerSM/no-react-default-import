module.exports = {
  rules: {
    "no-react-default": {
      meta: {
        type: 'problem',
        fixable: 'code',
        messages: {
          match: 'Do not use the default React import, use named or namespace import instead.'
        },
        schema: [],
      },
      create: (context) => ({
        Program: (node) => {
          if (
            node.source.value === 'react' &&
            // Only look for imports of react itself, not `import type`
            node.importKind === 'value'
          ) {
            // If there's only one default import, we can make an autofix
            if (node.specifiers.length === 1 && node.specifiers[0].type === 'ImportDefaultSpecifier') {
              context.report({
                node,
                messageId: "match",
                fix(fixer) {
                  return fixer.replaceText(node.specifiers[0], '* as React');
                },
              });
            }
            // Mixing default and named imports, cannot autofix
            else if (node.specifiers.some((specifier) => specifier.type === 'ImportDefaultSpecifier')) {
              context.report({
                node,
                messageId: "match",
              });
            }
          }
        },
      }),
    }
  }
};
