const {
    EMPTY_GRID_NOTATION,
    DIRECTIONS,
    GRID_COLORS,
    INSTRUCTIONS
} = require('./appConstants');

const askQuestions = (interface, question) => {
    return new Promise((resolve) => {
        interface.question(question, (answer) => {
            resolve(answer);
        });
    });
};

const generateGrid = (dimension) => {
    const grid = [];
    for (let i = 0; i < dimension.height; i++) {
        const row = [];
        grid.push(row);
        for (let j = 0; j < dimension.width; j++) {
            row.push(EMPTY_GRID_NOTATION || 'E');
        }
    }

    return grid;
}

const isBuildingSizeValid = (height, width) => {
    if (isNaN(height) || isNaN(width)) {
        return false;
    }

    return true;
}

const isRobotInputCorrect = (robotDetails, width, height) => {
    if (Object.keys(robotDetails).length !== 4 
        || isNaN(robotDetails.x)
        || isNaN(robotDetails.y)
        || (robotDetails.x < 0 || robotDetails.x >= width )
        || (robotDetails.y < 0 || robotDetails.y >= height)
        || DIRECTIONS.indexOf(robotDetails.direction) === -1
        || GRID_COLORS.indexOf(robotDetails.color) === -1) {
        return false;
    }

    return true;
}

const isCommandValid = (command) => {
    if (INSTRUCTIONS.indexOf(command) === -1) return false;
    return true;
}

module.exports = {
    askQuestions,
    generateGrid,
    isBuildingSizeValid,
    isRobotInputCorrect,
    isCommandValid
}