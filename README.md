# Habit Tracker

![open issues](https://img.shields.io/github/issues/bashbunni/habit-tracker)
![forks](https://img.shields.io/github/forks/bashbunni/habit-tracker)
![stars](https://img.shields.io/github/stars/bashbunni/habit-tracker)
![contributions](https://img.shields.io/badge/contributions-open-blueviolet)

## About

My project is a web and desktop application that allows you to track and visualize your consistency with your habits over time with a calendar heatmap.
This allows you to track any habits you’d like and see how you’re progressing towards your goals.
I hope that this tool can help those who struggle with being consistent or disciplined.

![habit page](https://user-images.githubusercontent.com/15822994/145179044-4c153162-075f-4842-9068-691660c6c2bd.png)
![navigation menu](https://user-images.githubusercontent.com/15822994/145179071-fec54a58-9dfc-4280-badf-c8ce962aa8fa.png)
![log activity menu](https://user-images.githubusercontent.com/15822994/145179136-37aca325-ca19-42e0-83d9-2ea3e4498729.png)

## How to Run

### Dependencies

#### Frontend

- all frontend dependencies are included in the `package.json` file
- you can install these dependencies by navigating to the `frontend` folder then running `npm i`

#### Backend

- [Wails](https://wails.app/gettingstarted/) and its dependencies
  - Please follow their 'Getting Started' guide to install all project dependencies
- Dependencies listed in `go.mod`
  - install these dependencies by running `go get` in the backend/root directory (same level as main.go)
- Since auth isn't set up yet, you will need a `.env` file with the following values:

```
DB_USERNAME=insertusername
DB_PASSWORD=insertpassword
HOST=inserthost
PORT=insertport
DATABASE=insertdatabase
```

**_note_: You must use a MySQL db for this project**\
For example, if you're running a local MySQL database your .env file might look something like this:

```
DB_USERNAME=root
DB_PASSWORD=root
HOST=localhost
PORT=3306
DATABASE=HABIT_TRACKER
```

### Running the App

- In a terminal window, in the root folder (same folder as `main.go`) run `wails serve` to start the backend.
- In a new terminal window, navigate to the frontend folder, then run `npm run serve` to start the frontend.
  This runs the development server for the desktop application on `http://localhost:3000`

## How to Contribute

1. Create an issue\*
2. Fork the repository
3. Create a solution that solves _exactly_ the features that are mentioned in the issue
4. Create a pull request with a link to the issue following the format:

```
## Completed
- [x] add timer functionality
- [x] create timer component
- [x] integrate timer React component with timer functionality

## Goal
Build out the pomodoro timer as outlined in feature request issue #10
```

- the list of tasks completed will likely match your commit messages if you're writing meaningful commit messages, if not, it will add clarity to the pull request.

\*issues should include a clear description. For bugs this means including screenshots of related error messages and code snippets that you suspect are involved along with your OS, Go, Wails, Node versions.
For feature requests, please include a description of the feature, with a user story outlining the problem-space it aims to solve.

## Next Steps

### Add Pomodoro functionality

This includes

- a timer component
- incrementing the count for a habit that has pomodoro enabled

![pomodoro page](https://user-images.githubusercontent.com/15822994/145179376-d87d1354-7497-4cef-90d0-ac7690438457.png)

### Add Authentication

I would like for users to be able to keep track of their own habits and separate data by user for production.

### Release Production Build

Habit Tracker is currently in release for development only, meaning that a stable production release still needs to be developed.
I'm planning on migrating the project to Wails v2 which has a lot of bug fixes available.
Once I've finished the migration I'll be working on building the executable desktop programs for Mac, Linux, and Windows.
That will be the first major release
