# my-shell-with-mfe-and-nonmfe

This project is a monorepo that contains multiple React applications, including Micro Front Ends (MFE) and standalone applications. The structure is designed to facilitate the development and deployment of these applications using Rush for package management.

## Project Structure

- **my-app1**: Contains two subprojects:
  - **my-app1-mfe**: A Micro Front End application that can be consumed by other applications.
  - **my-app1-standalone**: A standalone application that loads the MFE for testing and deployment.

- **my-app2**: A regular React application that is not a Micro Front End.

- **my-shell-app**: The shell application that integrates both `my-app1` (as MFE) and `my-app2` (loaded via iframe or other methods).

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)
- Rush (installed globally)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-shell-with-mfe-and-nonmfe
   ```

2. Install Rush:
   ```
   npm install -g @microsoft/rush
   ```

3. Install dependencies:
   ```
   rush update
   ```

### Running the Applications

- To run `my-app1-mfe`:
  ```
  cd my-app1/my-app1-mfe
  npm start
  ```

- To run `my-app1-standalone`:
  ```
  cd my-app1/my-app1-standalone
  npm start
  ```

- To run `my-app2`:
  ```
  cd my-app2
  npm start
  ```

- To run `my-shell-app`:
  ```
  cd my-shell-app
  npm start
  ```

## Deployment

Each application can be deployed independently. Follow the respective README files in each subproject for specific deployment instructions.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License. See the LICENSE file for details.