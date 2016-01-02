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

[`babel-plugin-lodash`](https://github.com/megawac/babel-plugin-lodash) [attempts to resolve](https://github.com/megawac/babel-plugin-lodash/blob/v1.0.1/src/lodash-modules.js) lodash module associated with the target script. `babel-plugin-lodash-modularize` is using a hard-coded map to construct the module import path.

In addition, `babel-plugin-lodash` supports `lodash-fp` (`babel-plugin-lodash-modularize` does not).

`babel-plugin-lodash-modularize` will support [`_.chain`](https://lodash.com/docs#chain).
