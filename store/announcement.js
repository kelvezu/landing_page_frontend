export const state = () => ({
  description: null,
  loading: false,
  announcements: null,
  editDialog: false,
  editForm: {
    id: null,
    description: null,
    is_published: null
  },
  deleteDialog: false,
  deleteForm: {
    id: null,
    index: null,
    description: null,
    is_published: null
  },
  addDialog: false
});

export const getters = {
  GET_DESCRIPTION: state => state.description,
  GET_LOADING: state => state.loading,
  GET_ANNOUNCEMENTS: state => state.announcements,
  GET_EDIT_DIALOG: state => state.editDialog,
  GET_DELETE_DIALOG: state => state.deleteDialog,
  GET_DELETE_FORM: state => state.deleteForm,
  GET_ADD_DIALOG: state => state.addDialog
};

export const actions = {
  async addAnnouncement({ state, commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await this.$axios.$post('/v1/announcements', {
        description: state.description
      });
      console.log(response);
      commit('SET_DESCRIPTION', response);
      commit('SET_NEW_ANNOUNCEMENT', response);
      this.commit('utils/snackbar/SET_SNACKBAR_ATTR', {
        textMessage: 'User has been added successfully'
      });
    } catch (error) {
      console.error(`Failed to post annoucement ERROR:${error}`);
      return error;
    } finally {
      commit('SET_LOADING');
      commit('SET_ADD_DIALOG');
    }
  },
  async fetchAnnouncements({ commit }) {
    commit('SET_LOADING', true);
    try {
      const response = await this.$axios.$get('/v1/announcements');
      commit('SET_ANNOUNCEMENTS', response.data);
    } catch (error) {
      return error;
    } finally {
      commit('SET_LOADING');
    }
  },
  async updateAnnouncement({ commit, dispatch, state }) {
    commit('SET_LOADING', true);
    try {
      await this.$axios.$put(`/v1/announcements/${state.editForm.id}`, {
        description: this.getters['richTextEditor/GET_CONTENT']
      });
      this.commit('utils/snackbar/SET_SNACKBAR_ATTR', {
        textMessage: 'Announcement has been updated successfully'
      });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch('fetchAnnouncements');
      commit('SET_LOADING');
    }
  },

  async deleteAnnouncement({ commit, state }) {
    commit('SET_LOADING', true);
    try {
      await this.$axios.$delete(`/v1/announcements/${state.deleteForm.id}`);
      await commit('REMOVE_DELETED_ANNOUNCEMENT', state.deleteForm.index);
      this.commit('utils/snackbar/SET_SNACKBAR_ATTR', {
        textMessage: 'Announcement has been deleted successfully'
      });
      console.log('Deleted!');
    } catch (error) {
      console.error(error);
    } finally {
      commit('SET_LOADING');
      commit('SET_DELETE_DIALOG');
    }
  }
};

export const mutations = {
  SET_DESCRIPTION(state, payload) {
    state.description = payload;
  },
  SET_LOADING(state, payload = false) {
    state.loading = payload;
  },
  SET_ANNOUNCEMENTS(state, payload) {
    state.announcements = payload;
  },
  SET_NEW_ANNOUNCEMENT(state, payload) {
    state.announcements.unshift(payload);
  },
  SET_EDIT_DIALOG(state, payload = false) {
    state.editDialog = payload;
  },
  SET_DELETE_DIALOG(state, payload = false) {
    state.deleteDialog = payload;
  },
  REMOVE_DELETED_ANNOUNCEMENT(state, index) {
    state.announcements.splice(index, 1);
  },
  SET_EDIT_FORM(state, { id = null, description = null, is_published = null }) {
    state.editForm.id = id;
    state.editForm.description = description;
    state.editForm.is_published = is_published;
  },
  SET_DELETE_FORM(
    state,
    { id = null, description = null, is_published = null, index = null }
  ) {
    state.deleteForm.id = id;
    state.deleteForm.description = description;
    state.deleteForm.is_published = is_published;
    state.deleteForm.index = index;
  },
  SET_ADD_DIALOG(state, payload) {
    state.addDialog = payload;
  }
};
