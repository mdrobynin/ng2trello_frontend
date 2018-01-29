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
