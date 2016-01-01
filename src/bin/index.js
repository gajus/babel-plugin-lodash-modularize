/**
 * Used to generate map of the function categories.
 */
import _ from 'lodash';
import fs from 'fs';
import path from 'path';

let categoryDirectoryNames,
    lodashModuleDirectory,
    mapDeclaration,
    mappedFunctions;

mappedFunctions = [];
mapDeclaration = [];

lodashModuleDirectory = path.dirname(require.resolve('lodash'));

categoryDirectoryNames = fs.readdirSync(lodashModuleDirectory);

_.forEach(categoryDirectoryNames, (categoryDirectoryName) => {
    let categoryDirectoryPath,
        modulesInCategory,
        stat;

    categoryDirectoryPath = path.join(lodashModuleDirectory, categoryDirectoryName);

    stat = fs.statSync(categoryDirectoryPath);

    if (!stat.isDirectory()) {
        return;
    }

    modulesInCategory = fs.readdirSync(categoryDirectoryPath);
    modulesInCategory = _.map(modulesInCategory, (fileName) => {
        return fileName.slice(0, -3);
    });

    // modulesInCategory

    _.forEach(modulesInCategory, (moduleName) => {
        // Some (collection/math max, min) functions are declared as aliases.

        if (_.includes(mappedFunctions, moduleName)) {
            return;
        }

        mappedFunctions.push(moduleName);

        mapDeclaration.push(moduleName + ': \'' + categoryDirectoryName + '\'');
    });
});

mapDeclaration = 'export default {\n' + mapDeclaration.sort().map((moduleName) => { return '    ' + moduleName; }).join(',\n') + '\n};';

console.log(mapDeclaration);
