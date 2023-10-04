## Description

Application for keeping all your contacts in one place.

### Installation

Clone this project:
```bash
$ git clone <repo.link>
```

Install packages
```bash
$ npm install
```

### DB set up:
Create a .env file in the project root directory and copy the following into it...
```bash
DATABASE_URL="file:./dev.db"
```
... then run
```bash
$ npx prisma migrate deploy
```

### Running the app
Make it run in localhost
```bash
$ npm run dev
```
