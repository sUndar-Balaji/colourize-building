const { 
    CARDINAL_DIRECTIONS, 
    ROBOT_DIRECTIONS,
    ERRORS
} = require('./appConstants');
const { isCommandValid } = require('./helper');

/**
 * A Robot Class which maintains the 
 * functionalities / properties related to the robot.
 * 
 * Method Details:
 * 
 * getCurrentPosition: returns the current position of the robot
 * 
 * getCurrentDirection: returns the current direction of the robot
 * 
 * getColor: returns the robot's painting color
 * 
 * performInstruction: this method executes each instruction set
 * received from the user, which has only one main purpose of 
 * performing instruction.
 * 
 * executeCommands: receives the instruction set from the user and
 * parses them and gives the separate instructions to the robot
 */
class Robot {
    constructor(position, direction, color) {
        this.x = position.x;
        this.y = position.y;
        this.color = color;
        this.currentDirection = direction;
    };

    getCurrentPosition() {
        return { x: this.x, y: this.y };
    }

    getCurrentDirection() {
        return { direction: this.currentDirection };
    }

    getColor() {
        return { color: this.color };
    }

    performInstruction(instruction, building) {
        if (['L', 'R'].indexOf(instruction) !== -1) {
            this.currentDirection = CARDINAL_DIRECTIONS[this.currentDirection][instruction];
        } else if (instruction === 'F') {
            const movingInstruction = ROBOT_DIRECTIONS[this.currentDirection];
            if (!building.isPositionInGrid(this.x + movingInstruction.x, this.y + movingInstruction.y)) {
                console.log(ERRORS.MOVING_OUT_OF_GRID);
                return;
            }

            this.x += movingInstruction.x;
            this.y += movingInstruction.y;
        } else {
            building.setGridColor(this.x, this.y, this.color);
        }
    }

    executeCommands(commands, building) {
        const self = this;
        commands.split('').forEach(command => {
            if (isCommandValid(command)) {
                self.performInstruction(command, building);
            } else {
                console.log(ERRORS.ROBOT_INPUT_INVALID);
            }
            return;
        });

        return this;
    }
};

module.exports = Robot;