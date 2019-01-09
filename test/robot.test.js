const chai = require('chai');
const Robot = require('../robot');
const Building = require('../building');

const expect = chai.expect;

describe('Robot Class Tests', function () {
    describe('Robot Instance Creation Test', function () {
        it('Should create a new proper robot instance', function () {
            const robot = new Robot({ x: 4, y: 0 }, 'N', 'R');
            const robotPosition = robot.getCurrentPosition();
            const { direction } = robot.getCurrentDirection();
            const { color } = robot.getColor();

            expect(robot).to.be.a('object');
            expect(robotPosition.x).to.equal(4);
            expect(robotPosition.y).to.equal(0);
            expect(direction).to.equal('N');
            expect(color).to.equal('R');
        });

        it('Should not create proper Robot instance without necessary fields', function () {
            const robot = new Robot({ x: 4, y: 0 });
            const { direction } = robot.getCurrentDirection();
            const { color } = robot.getColor();

            expect(robot).to.be.a('object');
            expect(direction).to.equal(undefined);
            expect(color).to.equal(undefined);
        });
    });

    describe('Robot functionalities Test', function () {
        it('Should make the Robot execute the instructions given', function () {
            const expectedGridDetails = [
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'R', 'R', 'E', 'E'],
                ['E', 'E', 'R', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
            ];
            const robotInputPosition = { x: 0, y: 0 };
            const buildingSize = { height: 5, width: 5 }; 
            const robot = new Robot({ x: robotInputPosition.x, y: buildingSize.height - robotInputPosition.y -1 }, 'N', 'R');
            const building = new Building({ height: buildingSize.height, width: buildingSize.width });
            const robotInstructions = 'FFRFIFIRFIF';
            robot.executeCommands(robotInstructions, building);
            const gridDetails = building.getRawGridDetails();

            expect(gridDetails).to.be.a('array');
            expect(gridDetails.length).to.equal(buildingSize.height);
            expect(gridDetails).to.deep.equal(expectedGridDetails);
        });

        it('Should avoid the instructions which makes the robot to go outside of the grid space', function () {
            const expectedGridDetails = [
                ['E', 'R', 'R', 'E', 'E'],
                ['E', 'E', 'R', 'R', 'R'],
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
            ];
            const robotInputPosition = { x: 1, y: 4 };
            const buildingSize = { height: 5, width: 5 };
            const robot = new Robot({ x: robotInputPosition.x, y: buildingSize.height - robotInputPosition.y -1 }, 'N', 'R');
            const building = new Building({ height: buildingSize.height, width: buildingSize.width });
            const robotInstructions = 'FFFFFIRFIRFILFIFIFF';
            robot.executeCommands(robotInstructions, building);
            const gridDetails = building.getRawGridDetails();

            expect(gridDetails).to.be.a('array');
            expect(gridDetails.length).to.equal(buildingSize.height);
            expect(gridDetails).to.deep.equal(expectedGridDetails);
        });

        it('Should make the robot to perform a single Installation instruction', function () {
            const expectedGridDetails = [
                ['E', 'R', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
                ['E', 'E', 'E', 'E', 'E'],
            ];
            const robotInputPosition = { x: 1, y: 4 };
            const buildingSize = { height: 5, width: 5 };
            const robot = new Robot({ x: robotInputPosition.x, y: buildingSize.height - robotInputPosition.y -1 }, 'N', 'R');
            const building = new Building({ height: buildingSize.height, width: buildingSize.width });
            const robotInstruction = 'I';
            robot.performInstruction(robotInstruction, building);
            const gridDetails = building.getRawGridDetails();

            expect(gridDetails).to.be.a('array');
            expect(gridDetails.length).to.equal(buildingSize.height);
            expect(gridDetails).to.deep.equal(expectedGridDetails);
        });

        it('Should make the robot to perform a single Forward instruction', function () {
            const robotInputPosition = { x: 2, y: 3 };
            const buildingSize = { height: 5, width: 5 };
            const robot = new Robot({ x: robotInputPosition.x, y: buildingSize.height - robotInputPosition.y -1 }, 'N', 'R');
            const building = new Building({ height: buildingSize.height, width: buildingSize.width });
            const robotInstruction = 'F';
            robot.performInstruction(robotInstruction, building);
            const { x, y } = robot.getCurrentPosition();

            expect(x).to.be.a('number');
            expect(x).to.be.equal(2);
            expect(y).to.be.a('number');
            expect(y).to.be.equal(0);
        });

        it('Should make the robot to perform a single Left instruction', function () {
            const robotInputPosition = { x: 2, y: 3 };
            const buildingSize = { height: 5, width: 5 };
            const robot = new Robot({ x: robotInputPosition.x, y: buildingSize.height - robotInputPosition.y -1 }, 'N', 'R');
            const building = new Building({ height: buildingSize.height, width: buildingSize.width });
            const robotInstruction = 'L';
            robot.performInstruction(robotInstruction, building);
            const { direction } = robot.getCurrentDirection();

            expect(direction).to.be.a('string');
            expect(direction).to.have.lengthOf(1);
            expect(direction).to.be.equal('W');
        });

        it('Should make the robot to perform a single Right instruction', function () {
            const robotInputPosition = { x: 2, y: 3 };
            const buildingSize = { height: 5, width: 5 };
            const robot = new Robot({ x: robotInputPosition.x, y: buildingSize.height - robotInputPosition.y -1 }, 'E', 'R');
            const building = new Building({ height: buildingSize.height, width: buildingSize.width });
            const robotInstruction = 'R';
            robot.performInstruction(robotInstruction, building);
            const { direction } = robot.getCurrentDirection();

            expect(direction).to.be.a('string');
            expect(direction).to.have.lengthOf(1);
            expect(direction).to.be.equal('S');
        });
    });
})