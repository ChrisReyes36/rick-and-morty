import { createStore } from "vuex";

export default createStore({
  state: {
    characters: [],
    charactersFilter: [],
  },
  getters: {},
  mutations: {
    setCharacters(state, payload) {
      state.characters = payload;
    },
    setCharactersFilter(state, payload) {
      state.charactersFilter = payload;
    },
  },
  actions: {
    async getCharacters({ commit }) {
      const url = "https://rickandmortyapi.com/api/character";
      try {
        const response = await fetch(url);
        const { results } = await response.json();
        commit("setCharacters", results);
        commit("setCharactersFilter", results);
      } catch (error) {
        console.error(error);
      }
    },
    filterByStatus({ commit, state }, status) {
      const results = state.characters.filter((character) => {
        return character.status.includes(status);
      });
      commit("setCharactersFilter", results);
    },
    filterByName({ commit, state }, name) {
      const formatName = name.toLowerCase();
      const results = state.characters.filter((character) => {
        const characterName = character.name.toLowerCase();
        if (characterName.includes(formatName)) {
          return character;
        }
      });
      commit("setCharactersFilter", results);
    },
  },
  modules: {},
});
