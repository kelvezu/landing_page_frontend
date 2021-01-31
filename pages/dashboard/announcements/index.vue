<template>
  <div>
    <h2>Announcement Settings</h2>
    <announcement-dialog-edit-form :formFunction="updateAnnouncement" />
    <announcement-dialog-delete-form :formFunction="deleteAnnouncement" />
    <announcement-dialog-add-form
      class="mb-2"
      :formFunction="addAnnouncement"
    />

    <div
      v-for="announcement in announcements"
      :key="announcement.data.announcement_id"
    >
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card :elevation="hover ? 24 : 6" class="pa-2 mb-3" height="20%">
            <p
              class="pa-2"
              v-html="announcement.data.attributes.description"
            ></p>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="primary"
                @click.stop="editAnnouncement(announcement)"
                >Edit</v-btn
              >
              <v-btn
                @click.stop="
                  removeAnnouncement(
                    announcement,
                    announcements.indexOf(announcement)
                  )
                "
                color="error"
                >Delete</v-btn
              >
            </v-card-actions>
          </v-card>
        </template>
      </v-hover>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  layout: 'dashboard',
  data: () => ({
    editDialog: false,
  }),
  async asyncData({ store }) {
    const announcements = await store.dispatch(
      'announcement/fetchAnnouncements'
    );

    store.commit('announcement/SET_EDIT_FORM', {})
    store.commit('announcement/SET_DELETE_FORM', {})

  },
  methods: {
    async addAnnouncement() {
      const getContent = this.$store.getters['richTextEditor/GET_CONTENT']
      await this.$store.commit('announcement/SET_DESCRIPTION', getContent)
      await this.$store.dispatch('announcement/addAnnouncement')
      await this.$store.commit('richTextEditor/SET_CONTENT')
    },
    editAnnouncement(announcement) {
      const {
        data: {
          announcement_id,
          attributes: { description, is_published },
        },
      } = announcement

      this.$store.commit('announcement/SET_EDIT_FORM', {
        id: announcement_id,
        description: description,
        is_published: is_published,
      })
      this.$store.commit('richTextEditor/SET_CONTENT', description)
      this.$store.commit('announcement/SET_EDIT_DIALOG', true)
    },
    async updateAnnouncement() {
      await this.$store.dispatch('announcement/updateAnnouncement')
    },
    removeAnnouncement({ data }, index) {
      const {
        announcement_id,
        attributes: { description, is_published },
      } = data
      this.$store.commit('announcement/SET_DELETE_FORM', {
        id: announcement_id,
        description: description,
        is_published: is_published,
        index: index,
      })
      this.$store.commit('announcement/SET_DELETE_DIALOG', true)
    },
    async deleteAnnouncement() {
      console.log('Deleting...')
      await this.$store.dispatch('announcement/deleteAnnouncement')
    },
  },
  computed: {
    ...mapGetters({
      announcements: 'announcement/GET_ANNOUNCEMENTS',
    }),
  },
}
</script>

<style>
</style>