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
