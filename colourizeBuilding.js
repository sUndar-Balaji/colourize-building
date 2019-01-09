const rl = require('readline');

const Building = require('./building');
const Robot = require('./robot');
const { 
    askQuestions,
    isBuildingSizeValid,
    isRobotInputCorrect
} = require('./helper');
const { 
    QUESTIONS,
    ERRORS
} = require('./appConstants');

const interface = rl.createInterface(process.stdin, process.stdout);

/**
 * getGridDetails method is only used to get grid details
 * input from the user and parse them and validate them
 */
const getGridDetails = () => {
    return new Promise(async (resolve) => {
        let buildingDimension = await askQuestions(interface, QUESTIONS.GRID_DETAIL);
        let [buildingWidthInGrid, buildingHeightInGrid] = buildingDimension.split(' ');
        buildingWidthInGrid = parseInt(buildingWidthInGrid, 10);
        buildingHeightInGrid = parseInt(buildingHeightInGrid, 10);

        if (!isBuildingSizeValid(buildingWidthInGrid, buildingHeightInGrid)) {
            console.log(ERRORS.GRID_SIZE_INVALID);
            process.exit(0);
        }

        resolve([buildingWidthInGrid, buildingHeightInGrid]);
    });
};

/**
 * getRobotDetailsAndPerformActions method is only used to get robot
 * details from the user and parse them and validate and perform
 * actions based on the given input by the user.
 */
const getRobotDetailsAndPerformActions = (robots, robotCounter, buildingWidthInGrid, buildingHeightInGrid, officeBuilding) => {
    return new Promise(async (resolve) => {
        let robotDetails = await askQuestions(interface, QUESTIONS.ROBOT_DETAILS + `${robotCounter} \n`);
        const robotInstructions = await askQuestions(interface, QUESTIONS.ROBOT_INSTRUCTIONS + `${robotCounter}\n`);
        robotDetails = robotDetails.split(' ');
        robotDetails = {
            x: parseInt(robotDetails[0], 10),
            y: parseInt(robotDetails[1], 10),
            direction: robotDetails[2],
            color: robotDetails[3]
        }
        
        if (isRobotInputCorrect(robotDetails, buildingWidthInGrid, buildingHeightInGrid)) {
            const workerRobot = new Robot({ x: robotDetails.x, y: buildingHeightInGrid - robotDetails.y - 1 }, robotDetails.direction, robotDetails.color);
            workerRobot.executeCommands(robotInstructions, officeBuilding);
            robots.push(workerRobot);
        } else {
            console.log(ERRORS.ROBOT_INPUT_INVALID);
        }

        resolve();
    });
}

/**
 * startColoring is a Bootstrapping method,
 * from here the application starts.
 * 
 * It has the only main goal of connecting
 * related functions / methods and using this
 * any number of robot's can be used to colourize
 * the building.
 */
const startColoring = async () => {
    let [buildingWidthInGrid, buildingHeightInGrid] = await getGridDetails();
    const officeBuilding = new Building({ height: buildingHeightInGrid, width: buildingWidthInGrid });
    let robotCounter = 0;
    const robots = [];

    while (true) {
        robotCounter++;
        await getRobotDetailsAndPerformActions(robots, robotCounter, buildingWidthInGrid, buildingHeightInGrid, officeBuilding);
        console.log(officeBuilding.prettyPrintGrid());
    }
}

startColoring();