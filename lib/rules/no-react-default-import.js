module.exports = {
  meta: {
    type: 'problem',
    schema: [],
  },
  create (context) {
    return {
      ImportDeclaration(node) {
        console.log(node);
        if (node.source.value === 'react' && node.importKind === 'value') {
          context.report({
            node,
            message: 'Do not use the default React import, use named or namespace import instead.',
          });
        }
      },
    };
  }
};
