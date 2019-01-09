## Overview

This(coloring building using robot's) application is a fully interactive console based node.js application. By using the interactive console we can interact with the application.

This application doesn't use any third party libraries / frameworks for the development. All the modules used are node.js built-in modules.

For testing purposes **Mocha** testing framework and **Chai** assertion libraries has been used.

### How to Run the Application?
Since the application doesn't have any third-party dependencies, we can directly run the application.

After navigating to the application folder, run the either of the below two commands.

> node colourizeBuilding.js
> npm run start

### How to Run Testcases?
Before running test cases we need to install the dependencies.

Please follow the below steps / commands to install dependencies and run test cases.

>npm install
>npm run test

### Attaching Application Screenshots:

![InputGridDetails](https://i.imgur.com/3jmiO0q.png)

As per the above screenshot, after running the application we have to enter grid size details.(For ex) 5 5

![InputRobotDetails](https://i.imgur.com/dvBWOz0.png)

As per the above screenshot, we have to enter details like robot position, direction and color after that we have to enter the instruction set for the robot. Then it'll follow that instructions to fill the grids. 

Then the same process continues for the robot#2. We can use as many number of robots we want. To close the application we have to press ctrl+c.