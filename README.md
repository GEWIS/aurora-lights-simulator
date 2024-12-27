# Aurora Lights Simulator
This repository contains a simulator for Aurora light groups. The simulator mocks
[aurora-lights-proxy](https://github.com/gewis/aurora-lights-proxy), a physical ARTnet
controller, and different types of fixtures. The goal of this application is to test
whether Aurora correctly applies colors/effects to light groups and their fixtures,
without the need for physical devices.

## Prerequisites
- NodeJS 22.
- A locally running copy of [aurora-core](https://github.com/gewis/narrowcasting-core).
  This repository should be cloned next to the core repository, so in the folder `../aurora-core`.
  This is necessary to generate the required API client files (installation step 2).

## Installation
1. Run `yarn install`.
2. Run `yarn gen-client` to generate the Typescript files required to communicate with the core.
3. Run `yarn dev`.
4. The application should now be running at http://localhost:8082.

## Deployment
This repository should not be deployed in a production environment, because it is for testing purposes only.

## Copyright
Copyright © 2023-2024 Study Association GEWIS - Some rights reserved.
You can use our software freely within the limits of our license.
However, we worked very hard on this project and invested a lot of time in it
so we ask you to leave our copyright marks in place when modifying our software.
Of course, you are free to add your own.

## License
Aurora uses the [AGPL-3.0 license](LICENSE).
