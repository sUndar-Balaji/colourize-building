module.exports = {
    'EMPTY_GRID_NOTATION': 'E',
    'CARDINAL_DIRECTIONS': {
        'N': {
            'L': 'W',
            'R': 'E'
        },
        'E': {
            'L': 'N',
            'R': 'S'
        },
        'W': {
            'L': 'S',
            'R': 'N'
        },
        'S': {
            'L': 'E',
            'R': 'W'
        }
    },
    'ROBOT_DIRECTIONS': {
        'N': {
            'x': 0,
            'y': -1
        },
        'S': {
            'x': 0,
            'y': 1
        },
        'E': {
            'x': 1,
            'y': 0
        },
        'W': {
            'x': -1,
            'y': 0
        }
    },
    'GRID_COLORS': ['R', 'G', 'Y'],
    'GRID_COLORS_WEIGHT': [1, 2, 3],
    'COMBINED_GRID_COLOR_WEIGHT': 6,
    'DIRECTIONS': ['N', 'W', 'E', 'S'],
    'INSTRUCTIONS': ['L', 'R', 'F', 'I'],
    'QUESTIONS': {
        'GRID_DETAIL': 'Enter grid details with space inbetween \n',
        'ROBOT_DETAILS': '\nEnter co-ordinates and direction and color for robot #',
        'ROBOT_INSTRUCTIONS': '\nEnter instructions for Robot #'
    },
    'ERRORS': {
        'MOVING_OUT_OF_GRID': '\nRobot can only move inside the building grid space and cant move outside',
        'ROBOT_INPUT_INVALID': '\nInvalid Input for Robot',
        'GRID_SIZE_INVALID': '\nInvalid building size'
    }
}