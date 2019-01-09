const { 
    GRID_COLORS, 
    GRID_COLORS_WEIGHT, 
    COMBINED_GRID_COLOR_WEIGHT,
    EMPTY_GRID_NOTATION
} = require('./appConstants');
const { generateGrid } = require('./helper');

/**
 * A Building Class which maintains the 
 * functionalities / properties related to the Buildings
 * 
 * Methods Details:
 * prettyPrintGrid: pretty prints the grid details
 * isPositionInGrid: checks whether the given position is inside grid or not
 * setGridColor: takes care of applying colors and combining 
 * two colors and apply them
 */

class Building {
    constructor(gridDimension) {
        this.grid = generateGrid(gridDimension);
        this.gridDimension = gridDimension;
    }

    getGridDimension() {
        return this.gridDimension;
    }

    getRawGridDetails() {
        return this.grid;
    }

    prettyPrintGrid() {
        return this.grid.reduce((gridDetails, rowDetails) => {
            return `${gridDetails}${rowDetails.join('|')}\n`;
        }, '');
    }

    isPositionInGrid(x, y) {
        if (x < 0 || x >= this.gridDimension.width
            || y < 0 || y >= this.gridDimension.height) {
            return false;
        }

        return true;
    }

    setGridColor(x, y, color) {
        if (this.grid[y][x] !== EMPTY_GRID_NOTATION && this.grid[y][x] !== color) {
            const combinedColorWeight = GRID_COLORS_WEIGHT[GRID_COLORS.indexOf(this.grid[y][x])] 
                + GRID_COLORS_WEIGHT[GRID_COLORS.indexOf(color)];
            const finalColorIndex = GRID_COLORS_WEIGHT.indexOf(COMBINED_GRID_COLOR_WEIGHT - combinedColorWeight);
            this.grid[y][x] = GRID_COLORS[finalColorIndex];
        } else {
            this.grid[y][x] = color;
        }

        return this;
    }
};

module.exports = Building;