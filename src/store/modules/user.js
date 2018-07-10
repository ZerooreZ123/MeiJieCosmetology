import * as types from "../mutation-types";

const state = {
  id: 0,
  name: "",
  headPortrait: ""
};

const getters = {};

const actions = {};

const mutations = {
  [types.UPDATE_USER_ID](state, { id }) {
    state.id = id;
  },
  [types.UPDATE_USER_NAME](state, { name }) {
    state.name = name;
  },
  [types.UPDATE_USER_HEAD](state, { headPortrait }) {
    state.headPortrait = headPortrait;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
