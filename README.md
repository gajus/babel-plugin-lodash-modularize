# babel-plugin-lodash-modularize

[![NPM version](http://img.shields.io/npm/v/babel-plugin-lodash-modularize.svg?style=flat-square)](https://www.npmjs.org/package/babel-plugin-lodash-modularize)
[![Travis build status](http://img.shields.io/travis/gajus/babel-plugin-lodash-modularize/master.svg?style=flat-square)](https://travis-ci.org/gajus/babel-plugin-lodash-modularize)
[![js-canonical-style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)

Babel plugin that replaces lodash library import statement to individual module imports.

Using individual module imports excludes the unused lodash code from the final bundle when using module bundlers such as webpack or Browserify.

## Example

Converts:

```js
import _ from 'lodash';

_.map();
```

To:

```js
import map from 'lodash/collection/map';

map();
```

## Usage

Add to `.babelrc`:

```js
{
    "plugins": [
        [
            "lodash-modularize",
            {
                "lodashVersion": "3.0.0"
            }
        ]
    ]
}
```

`lodashVersion` option defines the version of the lodash that you are using. It is used to resolve the correct path of the individual modules.

## Difference from babel-plugin-lodash

[`babel-plugin-lodash`](https://github.com/megawac/babel-plugin-lodash) [attempts to resolve](https://github.com/megawac/babel-plugin-lodash/blob/v1.0.1/src/lodash-modules.js) lodash module associated with the target script. The assumptions that `babel-plugin-lodash` makes about the `node_modules` path depend on the NPM version and the execution context. `babel-plugin-lodash-modularize` is using a [hard-coded map](https://github.com/gajus/babel-plugin-lodash-modularize/blob/v0.1.0/src/methodMap.js) to construct the module import path (see [discussion](https://github.com/gajus/babel-plugin-lodash-modularize/commit/52636687519bf7adc3f115bc9e5eb84c19c687cc#commitcomment-15228353)).

`babel-plugin-lodash` supports `lodash-fp` (`babel-plugin-lodash-modularize` does not).

`babel-plugin-lodash-modularize` can be used against a code base that does not use lodash at all, i.e. `babel-plugin-lodash-modularize` can become part of a greater Babel [preset](https://babeljs.io/docs/plugins/#presets).

## Development

Use `npm run module-map` to generate a new module map. The new module map is generated against the lodash version installed as a dependency of the `babel-plugin-lodash-modularize` plugin.

This approach will need to change when a new version of lodash comes out that does no longer use the same directory structure. `lodashVersion` plugin option is used as a form of defensive design to ensure that when such change happens we do not introduce a backwards incompatible change.
