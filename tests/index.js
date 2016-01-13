/* eslint-disable max-nested-callbacks */

import _ from 'lodash';
import {
    expect
} from 'chai';
import {
    transform
} from 'babel-core';
import plugin from './../src';
import fs from 'fs';
import path from 'path';

let loadFixtures;

loadFixtures = (groupName) => {
    let fixtures,
        fixturesPath;

    fixtures = [];

    fixturesPath = path.resolve(__dirname, './' + groupName);

    fs.readdirSync(fixturesPath).map((caseName) => {
        let actualSource,
            expectedSource;

        actualSource = _.trim(fs.readFileSync(path.resolve(fixturesPath, caseName, 'actual'), 'utf8'));
        expectedSource = _.trim(fs.readFileSync(path.resolve(fixturesPath, caseName, 'expected'), 'utf8'));

        fixtures.push({
            actualSource,
            caseName,
            expectedSource
        });
    });

    return fixtures;
};

describe('plugin', () => {
    context('unsupported version', () => {
        it('throws an error', () => {
            expect(() => {
                transform('', {
                    babelrc: false,
                    plugins: [
                        [
                            plugin,
                            {
                                lodashVersion: '2.0.0'
                            }
                        ]
                    ]
                });
            }).to.throw(Error, 'lodash prior to version 3 is unsupported.');
        });
    });

    context('v3', () => {
        describe('error', () => {
            let errorFixtures;

            errorFixtures = loadFixtures('v3/error-fixtures');

            _.forEach(errorFixtures, (fixture) => {
                it('OK ' + fixture.caseName, () => {
                    expect(() => {
                        transform(fixture.actualSource, {
                            babelrc: false,
                            plugins: [
                                [
                                    plugin,
                                    {
                                        lodashVersion: '3.0.0'
                                    }
                                ]
                            ]
                        });
                    }).to.throw(Error);
                });
            });
        });

        describe('success', () => {
            let successFixtures;

            successFixtures = loadFixtures('v3/success-fixtures');

            _.forEach(successFixtures, (fixture) => {
                it('OK ' + fixture.caseName, () => {
                    let resultSource;

                    resultSource = transform(fixture.actualSource, {
                        babelrc: false,
                        plugins: [
                            [
                                plugin,
                                {
                                    lodashVersion: '3.0.0'
                                }
                            ]
                        ]
                    }).code;

                    resultSource = _.trim(resultSource);

                    expect(fixture.expectedSource).to.equal(resultSource);
                });
            });
        });
    });

    context('v4', () => {
        /* describe('error', () => {
            let errorFixtures;

            errorFixtures = loadFixtures('v4/error-fixtures');

            _.forEach(errorFixtures, (fixture) => {
                it('OK ' + fixture.caseName, () => {
                    expect(() => {
                        transform(fixture.actualSource, {
                            babelrc: false,
                            plugins: [
                                [
                                    plugin,
                                    {
                                        lodashVersion: '4.0.0'
                                    }
                                ]
                            ]
                        });
                    }).to.throw(Error);
                });
            });
        }); */

        describe('success', () => {
            let successFixtures;

            successFixtures = loadFixtures('v4/success-fixtures');

            _.forEach(successFixtures, (fixture) => {
                it('OK ' + fixture.caseName, () => {
                    let resultSource;

                    resultSource = transform(fixture.actualSource, {
                        babelrc: false,
                        plugins: [
                                [
                                    plugin,
                                    {
                                        lodashVersion: '4.0.0'
                                    }
                                ]
                            ]
                    }).code;

                    resultSource = _.trim(resultSource);

                    expect(fixture.expectedSource).to.equal(resultSource);
                });
            });
        });
    });
});
