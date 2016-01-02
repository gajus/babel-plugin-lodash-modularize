import resolveMethod from './resolveMethod';
import semver from 'semver';

const LODASH_DEFAULT_VERSION = '3.0.0';

export default ({
    types: t
}) => {
    let importMethod,
        lodashObjects,
        lodashVersion,
        selectedMethods,
        specified;

    importMethod = (methodName, file) => {
        if (!selectedMethods[methodName]) {
            selectedMethods[methodName] = file.addImport(resolveMethod(methodName), 'default', methodName);
        }

        return selectedMethods[methodName];
    };

    return {
        visitor: {
            CallExpression (path) {
                let file,
                    name,
                    node;

                ({node} = path);
                ({name} = node.callee);
                ({file} = path.hub);

                if (!t.isIdentifier(node.callee)) {
                    return;
                }

                if (specified[name]) {
                    node.callee = importMethod(specified[name], file);
                }

                if (lodashObjects[name]) {
                    node.callee = importMethod('chain', file);
                }
            },
            ImportDeclaration (path) {
                let node,
                    value;

                ({node} = path);
                ({value} = node.source);

                if (value !== 'lodash') {
                    return;
                }

                node.specifiers.forEach((specifier) => {
                    if (t.isImportSpecifier(specifier)) {
                        specified[specifier.local.name] = specifier.imported.name;
                    } else {
                        lodashObjects[specifier.local.name] = true;
                    }
                });

                path.remove();
            },
            MemberExpression (path) {
                let file,
                    node;

                ({node} = path);
                ({file} = path.hub);

                if (!lodashObjects[node.object.name]) {
                    return;
                }

                path.replaceWith(importMethod(node.property.name, file));
            },
            Program: {
                enter (path, state) {
                    lodashObjects = {};
                    specified = {};
                    selectedMethods = {};
                    lodashVersion = state.opts.lodashVersion || LODASH_DEFAULT_VERSION;

                    if (semver.lt(lodashVersion, '3.0.0')) {
                        throw new Error('lodash prior to version 3 is unsupported.');
                    }
                }
            }
        }
    };
};
