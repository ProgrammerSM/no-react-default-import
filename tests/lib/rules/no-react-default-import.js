const rule = require('./no-react-default-import');
const RuleTester = require('eslint').RuleTester;

const ruleTester = new RuleTester({
  parser: require.resolve('@typescript-eslint/parser'),
});

ruleTester.run('no-react-default-import', rule, {
  valid: [
    {
      code: 'import * as React from "react";',
    },
    {
      code: 'import React from "preact";',
    },
    {
      code: 'import {useState} from "react";',
    },
    {
      code: 'import type React from "react";',
    },
    {
      code: 'const React = require("react");',
    },
  ],

  invalid: [
    {
      code: 'import React from "react";',
      errors: [{ message: 'Do not use the default React import, use named or namespace import instead.' }],
      output: 'import * as React from "react";',
    },
    {
      code: 'import React, {useState} from "react";',
      errors: [{ message: 'Do not use the default React import, use named or namespace import instead.' }],
    },
  ],
});
