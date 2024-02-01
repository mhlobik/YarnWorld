# Yarn World 
Online Yarn Patterns Web Application

## Project Overview

This web application is an online platform developed using Angular and the Primeng framework for components, designed specifically for yarn enthusiasts and crafters. It connects pattern authors with crafters to the world of yarn, crochet and knitting, allowing users to explore, search, and discover a wide variety of patterns. The application includes the following key features:

### Features

1. **Pattern Library**: Users can browse an extensive collection of patterns, including knitting, crochet, and other craft projects. Patterns are categorized by type.

2. **Search for Patterns**: The application offers a search functionality, enabling users to find specific yarn patterns based on title or author.

3. **Pattern Details**: Users can access detailed information about each pattern, including images, pattern category or craft type. Users can also navigate to pattern url to get written instructions.

4. **User Accounts**: Users need to create accounts to search patterns. More features comming...

5. **Admin Panel (Authorized Users)**: Authorized administrators have access to an admin panel where they can manage the pattern library, add new patterns, and edit the content.

### Technologies Used

- **Angular**: The frontend of the application is developed using Angular 17.

- **Primeng**: The PrimeNG framework provides a rich set of UI components, ensuring an intuitive and user-friendly interface for crafters. Version used is PrimeNG 17

- **json-server**: The application uses a mock server using the json-server library to simulate API calls.

- **Node.js**: Angular17 is compatible with Node.js version ^18.13.0 || ^20.9.0
- **Jasmine and Karma**: Frameworks for unit testing Angular application


### Getting Started

To begin working on this project, follow these steps:

1. **Clone the Repository**: Clone this GitHub repository to your local machine.

2. **Install Dependencies**: Run `npm install` to install the project dependencies.

3. **Development Server**: Start a development server with `ng serve`. The application will be available by default at `http://localhost:4200/`.

4. **Mock Server**: To get response from API you need to start mock server. Open new terminal and start with ` npm run mock:api`. The mock server will be available at `http://localhost:4000/`.

5. **Admin Access**: If you require access to the admin panel, please contact the project administrator for authentication.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### License

This project is open-source and released under the [MIT License](LICENSE).
