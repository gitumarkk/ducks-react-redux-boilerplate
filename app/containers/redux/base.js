// Npm
import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { fromJS } from 'immutable';
import { createSelector } from 'reselect';
import Axios from 'utils/axios';

// App
import { BASE_URL } from 'utils/constants';


class Base {
  constructor(appName, relativePath) {
    this.APP_NAME = appName;

    this.URL = `${BASE_URL}${relativePath}`;

    this.GET_REQUEST = `${this.APP_NAME}/GET_REQUEST`;
    this.GET_SUCCESS = `${this.APP_NAME}/GET_SUCCESS`;
    this.GET_ERROR = `${this.APP_NAME}/GET_ERROR`;

    this.GET_DETAIL_REQUEST = `${this.APP_NAME}/GET_DETAIL_REQUEST`;
    this.GET_DETAIL_SUCCESS = `${this.APP_NAME}/GET_DETAIL_SUCCESS`;
    this.GET_DETAIL_ERROR = `${this.APP_NAME}/GET_DETAIL_ERROR`;

    this.POST_REQUEST = `${this.APP_NAME}/POST_REQUEST`;
    this.POST_SUCCESS = `${this.APP_NAME}/POST_SUCCESS`;
    this.POST_ERROR = `${this.APP_NAME}/POST_ERROR`;

    this.DELETE_REQUEST = `${this.APP_NAME}/DELETE_REQUEST`;
    this.DELETE_SUCCESS = `${this.APP_NAME}/DELETE_SUCCESS`;
    this.DELETE_ERROR = `${this.APP_NAME}/DELETE_ERROR`;

    this.reducer = this.reducer.bind(this);
    this.selectGlobal = this.selectGlobal.bind(this);
    this.makeSelectList = this.makeSelectList.bind(this);
    this.makeSelectDetail = this.makeSelectDetail.bind(this);

    this.saga = this.saga.bind(this);

    this.get = this.get.bind(this);
    this.getDetail = this.getDetail.bind(this);
    this.post = this.post.bind(this);
    this.getError = this.getError.bind(this);
  }

  getRequest() {
    return {
      type: this.GET_REQUEST
    };
  }

  getSuccess(data) {
    return {
      type: this.GET_SUCCESS,
      data
    };
  }

  getError() {
    return {
      type: this.GET_ERROR
    };
  }

  getDetailRequest(id) {
    return {
      type: this.GET_DETAIL_REQUEST,
      id
    };
  }

  getDetailSuccess(data) {
    return {
      type: this.GET_DETAIL_SUCCESS,
      data
    };
  }

  getDetailError() {
    return {
      type: this.GET_DETAIL_ERROR
    };
  }

  postRequest(data) {
    return {
      type: this.POST_REQUEST,
      data
    };
  }

  postSuccess(data) {
    return {
      type: this.POST_SUCCESS,
      data
    };
  }

  postError() {
    return {
      type: this.POST_ERROR
    };
  }

  deleteRequest(data) {
    return {
      type: this.DELETE_REQUEST,
      data
    };
  }

  deleteSuccess(data) {
    return {
      type: this.DELETE_SUCCESS,
      data
    };
  }

  deleteError() {
    return {
      type: this.DELETE_ERROR
    };
  }

  reducer(state = fromJS({
    list: [],
    detail: {},
    loading: false
  }), action) {
    switch (action.type) {
      case this.GET_REQUEST: {
        return state
          .set('loading', true);
      }

      case this.GET_SUCCESS: {
        return state
          .set('loading', false)
          .set('list', action.data);
      }

      case this.GET_ERROR: {
        return state
          .set('error', action.error)
          .set('loading', false);
      }

      case this.GET_DETAIL_REQUEST: {
        return state
          .set('loading', true);
      }

      case this.GET_DETAIL_SUCCESS: {
        return state
          .set('loading', false)
          .set('detail', action.data);
      }

      case this.GET_DETAIL_ERROR: {
        return state
          .set('error', action.error)
          .set('loading', false);
      }

      case this.POST_REQUEST: {
        return state;
      }

      case this.POST_SUCCESS: {
        return state
          .set('detail', action.data);
      }

      default:
        return state;
    }
  }

  * get() {
    try {
      // Call using the request helper
      const resp = yield Axios.get(this.URL);
      yield put(this.getSuccess(resp.data));
    } catch (err) {
      yield put(this.getError(err));
    }
  }

  * getDetail(action) {
    const url = `${this.URL}${action.id}/`;
    try {
      // Call using the request helper
      const resp = yield Axios.get(url);
      yield put(this.getDetailSuccess(resp.data));
    } catch (err) {
      yield put(this.getDetailError(err));
    }
  }

  * post(action) {
    try {
      const url = `${this.URL}${action.data.id ? (`${action.data.id  }/`) : ''}`;
      // Call using the request helper
      const resp = yield Axios({
        method: action.data.id ? 'put' : 'post',
        url,
        data: action.data
      });
      yield put(this.postSuccess(resp));

      if (action.data.id) yield put(this.getDetailRequest(action.data.id));
      yield put(this.getRequest());
    } catch (err) {
      yield console.log(err);
    }
  }

  * deleteDetail(action) {
    try {
      const url = `${this.URL}${action.data.id}/`;
      // Call using the request helper
      yield Axios({
        method: 'delete',
        url
      });
      yield put(this.getRequest());
    } catch (err) {
      console.error(err);
    }
  }

  * saga() {
    yield all([
      takeLatest(this.GET_REQUEST, this.get),
      takeLatest(this.GET_DETAIL_REQUEST, this.getDetail),
      takeLatest(this.POST_REQUEST, this.post),
      takeLatest(this.DELETE_REQUEST, this.deleteDetail),
    ]);
  }

  selectGlobal(state) {
    return state.get(this.APP_NAME);
  }

  makeSelectList() {
    return createSelector(
      this.selectGlobal,
      (globalState) => globalState.get('list')
    );
  }

  makeSelectDetail() {
    return createSelector(
      this.selectGlobal,
      (globalState) => globalState.get('detail')
    );
  }
}

export default Base;
