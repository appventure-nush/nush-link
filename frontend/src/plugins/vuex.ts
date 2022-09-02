import Vue from "vue";
import Vuex from "vuex";
import {UserData} from "@/types/UserData";

Vue.use(Vuex);

type State = {
  user: UserData | null
}

const store = new Vuex.Store<State>({
  state: {
    user: null
  },
  mutations: {
    user(state: State, user: UserData | null) {
      state.user = user;
    }
  },
  getters: {
    canCreateRedirect(state): boolean {
      return state.user?.can_create_redirect == true;
    },
    canAuthorizeStudents(state): boolean {
      return state.user?.can_authorize_students == true;
    }
  }
});

export default store;

