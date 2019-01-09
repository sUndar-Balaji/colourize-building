const chai = require('chai');
const {
    askQuestions,
    generateGrid,
    isBuildingSizeValid,
    isRobotInputCorrect,
    isCommandValid
} = require('../helper');

const expect = chai.expect;

describe('Helpers Tests', function () {
    describe('askQuestions helper method Tests', function () {
        it('Should ask questions and return the result', function (done) {
            const expectedAnswer = 'Test Question Answered';
            const interface = {
                resolve: () => {},
                question: (question, cb) => {
                    const answer = 'Test Question Answered';
                    cb(answer);
                }
            };

            askQuestions(interface, 'Test')
                .then((answer) => {
                    expect(answer).to.be.equal(expectedAnswer);
                    done();
                })
                .catch((e) => {
                    done(e);
                });
        });
    });

    describe('generateGrid helper method Tests', function () {
        it('Should generate grid based on given input', function () {
            const gridDimension = {
                height: 6,
                width: 5
            };
            const expectedGridDetails = [
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
            ];
            const gridDetails = generateGrid(gridDimension);

            expect(gridDetails).to.be.a('array');
            expect(gridDetails.length).to.be.equal(6);
            expect(gridDetails).to.deep.equal(expectedGridDetails);
        });

        it('Should return empty array when creating grid with invalid input', function () {
            const gridDimension = {
                height: 'k',
                width: 'e'
            };

            expect(generateGrid(gridDimension)).to.deep.equal([]);
        });
    });

    describe('isBuildingSizeValid helper method Tests', function () {
        it('Should validate the proper building size is valid or not', function () {
            expect(isBuildingSizeValid(4, 5)).to.be.equal(true);
        });

        it('Should validate the improper building size is valid or not', function () {
            expect(isBuildingSizeValid('e', 15)).to.be.equal(false);
        });
    });

    describe('isRobotInputCorrect helper method Tests', function () {
        it('Should validate the correct robot inputs are valid or not', function () {
            const robotDetails = {
                x: 4,
                y: 0,
                direction: 'N',
                color: 'R'
            };
            const gridHeight = 5;
            const gridWidth = 5;

            expect(isRobotInputCorrect(robotDetails, gridWidth, gridHeight)).to.be.equal(true);
        });

        it('Should validate the robot inputs with improper direction is valid or not', function () {
            const robotDetails = {
                x: 4,
                y: 0,
                direction: 'K',
                color: 'R'
            };
            const gridHeight = 5;
            const gridWidth = 5;

            expect(isRobotInputCorrect(robotDetails, gridWidth, gridHeight)).to.be.equal(false);
        });

        it('Should validate the robot inputs with improper color is valid or not', function () {
            const robotDetails = {
                x: 4,
                y: 0,
                direction: 'N',
                color: 'B'
            };
            const gridHeight = 5;
            const gridWidth = 5;

            expect(isRobotInputCorrect(robotDetails, gridWidth, gridHeight)).to.be.equal(false);
        });

        it('Should validate the robot inputs with improper grid location is valid or not', function () {
            const robotDetails = {
                x: 5,
                y: -1,
                direction: 'N',
                color: 'R'
            };
            const gridHeight = 5;
            const gridWidth = 5;

            expect(isRobotInputCorrect(robotDetails, gridWidth, gridHeight)).to.be.equal(false);
        });
    });

    describe('isCommandValid helper method Tests', function () {
        it('Should validate the correct robot command is valid or not', function () {
            const robotCommand = 'L';

            expect(isCommandValid(robotCommand)).to.be.equal(true);
        });

        it('Should validate the improper robot command is valid or not', function () {
            const robotCommand = 'T';

            expect(isCommandValid(robotCommand)).to.be.equal(false);
        });
    });
});