// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

const port = 5000;

export const environment = {
  production: false,
  todolist: `http://localhost:${port}/api/todolist`,
  todo: `http://localhost:${port}/api/todo`,
  board: `http://localhost:${port}/api/board`,
  cardAction: `http://localhost:${port}/api/cardAction`,
  card: `http://localhost:${port}/api/card`,
  column: `http://localhost:${port}/api/column`,
  comment: `http://localhost:${port}/api/comment`,
  content: `http://localhost:${port}/api/content`,
  team: `http://localhost:${port}/api/team`,
  account: `http://localhost:${port}/api/account`
};
