import methodMap from './methodMap';

export default (methodName) => {
    if (!methodMap[methodName]) {
        throw new Error('lodash method "' + methodName + '" does not exist. If you think it is an error, report it at https://github.com/gajus/babel-plugin-lodash-modularize/issues/1.');
    }

    return 'lodash/' + methodMap[methodName] + '/' + methodName;
};
