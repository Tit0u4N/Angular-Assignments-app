[![Open in Codespaces](https://classroom.github.com/assets/launch-codespace-2972f46106e565e64193e422d61a12cf1da4916b45550586e14ef0a7c637dd04.svg)](https://classroom.github.com/open-in-codespaces?assignment_repo_id=16036098)

# Angular-Start | Titouan Lacombe-Fabre

Michel Buffa, Leo Donati, Université Côte d'Azur  
Starter repository for Angular lab assignments.

- Frontend Link: [https://angular-tit0u4n-front.onrender.com](https://angular-tit0u4n-front.onrender.com)
- Backend Link: [https://angular-tit0u4n-server.onrender.com](https://angular-tit0u4n-server.onrender.com)
> ⚠️ When you go to the page you need to wait 30s / 1min for the frontend and the backend to be up and running.

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Set up the frontend:
   ```bash
   cd assignment-app
   npm install
   ng serve
   ```
3. Set up the backend:
   ```bash
   cd api
   npm install
   npm start
   ```

## Technologies Used

- **Frontend:** Angular, TailwindCSS, TypeScript
- **Backend:** Node.js, Express.js, MongoDB

## Features

### Authentication

- Three levels of authentication:
    - Unauthenticated users
    - Authenticated users
    - Administrators

### User Features

- Assignment management:
    - **Create**: Add new assignments.
    - **Edit**: Modify existing assignments.
    - **Delete**: Remove assignments.

### Admin Features

- **User Management**:
    - Create new users with mocked data for testing purposes.
    - Edit user information.
    - Delete users (including all associated data).
- **Log Management**:
    - View logs for system events.
    - Delete logs when no longer needed.

### Other Features
- Loading indicators for asynchronous operations.
- Toast notifications for user feedback.
- Filter assignments by status.
- Pagination for assignment list.

## Technical Details

### Technologies

This application leverages **TailwindCSS** for styling, allowing for minimal custom CSS usage. This approach enhances
code readability and reduces development time by using pre-defined utility classes for styling.

### Authentication

You can loggin for user withou password, just click on the login button but for admin you need to use the following
credentials for login and password: `admin`

### Assignment Service

The assignment service is responsible for managing assignment data. It uses a REST API to communicate with the backend.
In my case for handle reload of the assignment from the backend I use the `BehaviorSubject` from RxJS.
And all my components using the assignment service are subscribed to the `BehaviorSubject` to get the latest data. With
this approach, I can ensure that the data is always up-to-date, when the is updated from the front end.
We can easly add feature in next version of the application like server side event to get the latest data from the
backend.

### Deployment
The frontend and the backend are deployed on [Render](https://render.com). When a new commit is pushed to the main branch, the application is automatically deployed.

For the first connection to the frontend you need to wait 30s / 1min for frontend and the backend to be up and running.
