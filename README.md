# Part 7 — React router, custom hooks and styling

Exercises for [Full Stack Open](https://fullstackopen.com) part 7
(CSM141083): routing, custom hooks, styling, and the extended bloglist
application.

## Apps

| App | Topic |
| --- | --- |
| `bloglist/` | the extended bloglist — React Query, context, routing; `server/` (Express + Mongoose) and `client/` (Vite + React) |
| `routed-anecdotes/` | anecdotes with react-router and the `useField` / `useAnecdotes` hooks |

Each app has a matching `-tests` directory with Playwright e2e suites.

## Run

```bash
# bloglist
cd bloglist/server && npm install && MONGODB_URI=mongodb://localhost:27017/bloglist npm run dev
cd ../client && npm install && npm run dev    # http://localhost:5173

# routed-anecdotes
cd routed-anecdotes && npm install && npm run dev
```

Both apps can also be run together with Docker (`bloglist/docker-compose.dev.yml`).

## Test

```bash
cd bloglist-tests && npm install && TEST_MONGODB_URI=mongodb://localhost:27017/bloglist-test npm test
cd routed-anecdotes-tests && npm install && npm test
```

## Test in CI

`.github/workflows/ci.yml` runs both Playwright suites on every push
and pull request, with a MongoDB service container for the bloglist
backend. This directory is self-contained — copy its contents into a
new repository and CI works without any extra setup.
