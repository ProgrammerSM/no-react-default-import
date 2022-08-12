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
          if (node.local.name === 'React') {
            context.report(
              node,
              messageId: 'match'
            );
          }
        },
      }),
    }
  }
};
