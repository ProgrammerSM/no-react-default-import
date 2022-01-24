module.exports = {
  rules: {
    "no-testing": {
      meta: {
        type: "problem",
        docs: {
          description:
            "If you knew what you were doing, you wouldn't need to test it",
        },
        messages: {
          match:
            "Found '{{filename}}' .spec file. If you knew what you were doing, you wouldn't need to test it.",
        },
      },
      create: (context) => ({
        Program: (node) => {
          const filename = context.getFilename();
          if (filename.includes(".spec")) {
            context.report({
              node,
              messageId: "match",
              data: {
                filename,
              },
            });
          }
        },
      }),
    },
  },
};
