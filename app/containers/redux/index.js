import { all } from 'redux-saga/effects';

import Base from './base';

const todo = new Base('todo', '/api/v1/todo/');

export default {
  todo: todo.reducer
};

export function* saga() {
  yield all([
    todo.saga()
  ]);
}
