# Clean Architecture Todo List

## Overview
This project is a study on Clean Architecture principles applied to a Node.js application. It implements a simple CRUD (Create, Read, Update, Delete) Todo List using Clean Architecture concepts such as repositories and use cases to separate concerns and ensure maintainability.

## Technologies Used
- **Node.js (v19.8.1)** - JavaScript runtime
- **Express** - Web framework for Node.js
- **Jest** - Testing framework

## Project Structure
The project follows the Clean Architecture principles, organizing the code into different layers:

```
/src
│── application
│   ├── useCases
│   │   │── todo  
│   │   │   ├── CreateTodo.js
│   │   │   ├── GetTodos.js
│   │   │   ├── UpdateTodo.js
│   │   │   ├── DeleteTodo.js
│── domain
│   ├── entities
│   │   ├── Todo.js
│── infrastructure
│   ├── repositories
│   │   ├── TodoRepositoryMongo.js
│── interfaces
│   ├── controllers
│   │   ├── TodoController.js
│   ├── routes
│   │   ├── todoRoute.js
│── server.ts
```

### Layers Explanation
- **Application Layer**: Contains business logic and use cases.
- **Domain Layer**: Defines entities and core business rules.
- **Infrastructure Layer**: Handles database operations and external integrations.
- **Interfaces Layer**: Manages HTTP requests and responses.

## Installation and Setup

1. Clone the repository:
   ```sh
   git clone https://github.com/jinascimento/clean-architecture-todo-list.git
   cd clean-architecture-todo-list
   ```

2. Install dependencies:
   ```sh
   yarn
   ```

3. Start the application:
   ```sh
   yarn dev
   ```

4. Run tests:
   ```sh
   yarn test
   ```

5. Run tests coverage:
   ```sh
   yarn test:coverage
   ```

## API Endpoints
- `POST api/todos` - Create a new todo
- `GET api/todos` - Retrieve all todos
- `GET api/todos/:id` - Retrieve a specific todo
- `PUT api/todos/:id` - Update a todo
- `DELETE api/todos/:id` - Delete a todo

## Contributing
Contributions are welcome! Feel free to submit pull requests or open issues.

## License
This project is open-source and available under the [MIT License](LICENSE).

