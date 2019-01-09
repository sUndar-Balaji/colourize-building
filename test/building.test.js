const chai = require('chai');
const Building = require('../building');

const expect = chai.expect;

describe('Building Class Tests', function () {
    describe('Building instance creation Tests', function () {
        it('Should create a new building instance', function () {
            const expectedGridDetails = [
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',]
            ];
            const building = new Building({ height: 7, width: 5 });
            const gridDimension = building.getGridDimension();
            const gridDetails = building.getRawGridDetails();

            expect(building).to.be.a('object');
            expect(gridDimension.height).to.be.equal(7);
            expect(gridDimension.width).to.be.equal(5);
            expect(gridDetails).to.deep.equal(expectedGridDetails);
        });

        it('Should not create a building instance without necessary arguments', function () {
            expect(function () {
                const building = new Building();
            }).to.throw();
        });
    });

    describe('Building Class functionality Tests', function () {
        it('Should print the grid details in human readable form', function () {
            const prettyPrintedDetailsExpected = `E|E|E|E|E\nE|E|E|E|E\nE|E|E|E|E\nE|E|E|E|E\nE|E|E|E|E\nE|E|E|E|E\nE|E|E|E|E\n`;
            const building = new Building({ height: 7, width: 5 });
            const gridFormatted = building.prettyPrintGrid();

            expect(gridFormatted).to.be.equal(prettyPrintedDetailsExpected);
        });

        it('Should check the grid position resides inside the grid space is valid or not', function () {
            const building = new Building({ height: 7, width: 8 });
            const gridPosition = building.isPositionInGrid(7, 0);

            expect(gridPosition).to.be.equal(true);
        });

        it('Should check the grid position resides outside grid space is valid or not', function () {
            const building = new Building({ height: 7, width: 8 });
            const gridPosition = building.isPositionInGrid(10, -1);

            expect(gridPosition).to.be.equal(false);
        });

        it('Should properly set the grid color in the given position', function () {
            const expectedGridDetails = [
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'R', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',]
            ];
            const building = new Building({ height: 7, width: 5 });
            building.setGridColor(3, 4, 'R');
            const gridDetails = building.getRawGridDetails();
            
            expect(gridDetails).to.deep.equal(expectedGridDetails);
        });

        it('Should mix the new color with the existing one and produce new color', function () {
            const expectedGridDetails = [
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'Y', 'E',],
                ['E', 'E', 'E', 'E', 'E',],
                ['E', 'E', 'E', 'E', 'E',]
            ];
            const building = new Building({ height: 7, width: 5 });
            building.setGridColor(3, 4, 'R');
            building.setGridColor(3, 4, 'G');
            const gridDetails = building.getRawGridDetails();
            
            expect(gridDetails).to.deep.equal(expectedGridDetails);
        });

        it('Should return the proper grid dimension details', function () {
            const building = new Building({ height: 7, width: 5 });
            const { height, width } = building.getGridDimension();
            
            expect(height).to.be.a('number');
            expect(height).to.equal(7);
            expect(width).to.be.a('number');
            expect(width).to.equal(5);
        });
    })
});