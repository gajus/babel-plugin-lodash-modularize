import methodMap from './methodMap';
import semver from 'semver';

export default (methodName, version) => {
    if (!methodMap[methodName]) {
        throw new Error('lodash method "' + methodName + '" does not exist. If you think it is an error, report it at https://github.com/gajus/babel-plugin-lodash-modularize/issues/1.');
    }

    if (semver.gte(version, '4.0.0')) {
        return 'lodash/' + methodName;
    }

    if (semver.gte(version, '3.0.0')) {
        return 'lodash/' + methodMap[methodName] + '/' + methodName;
    }

    throw new Error('Unknown lodash version.');
};
