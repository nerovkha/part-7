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
The production image (`bloglist/Dockerfile`) serves the built client from
the Express server when `NODE_ENV=production`.

## Test

```bash
cd bloglist-tests && npm install && TEST_MONGODB_URI=mongodb://localhost:27017/bloglist-test npm test
cd routed-anecdotes-tests && npm install && npm test
```

## CI/CD pipeline (Full Stack Open part 11, exercises 11.20–11.21)

Live bloglist: https://nerovkha-bloglist.fly.dev

`.github/workflows/pipeline.yml` (Deployment pipeline) runs on every push
to `main` and on every pull request:

1. lints and builds the bloglist client,
2. runs both Playwright suites (bloglist against a MongoDB service
   container, routed-anecdotes on its own),
3. on pushes to `main` only: deploys `bloglist/` to Fly.io
   (`bloglist/fly.toml`, app `nerovkha-bloglist`) and checks `/health`,
4. tags the release (`vX.Y.Z`, patch bump).

`.github/workflows/health_check.yml` pings `/health` every six hours.

The deploy steps run only when the `FLY_API_TOKEN` repository secret is
set, so a copy of this directory in a new repository still gets a green
CI without any secrets. The production database URL (`MONGODB_URI`) and
JWT `SECRET` live in Fly secrets, never in git.

`main` is protected (exercise 11.21): changes land only through pull
requests that pass the `bloglist` and `routed-anecdotes` checks and get
one approving review, and the rule applies to administrators too.
