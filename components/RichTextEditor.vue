<template>
  <div>
    <ClientOnly>
      <!-- Use the component in the right place of the template -->
      <tiptap-vuetify
        v-model="contentData"
        :extensions="extensions"
        placeholder="Write something"
        class="border-black mb-3"
        :card-props="{ flat: true, color: 'grey lighten-5' }"
      />

      <template #placeholder> Loading... </template>
      
    </ClientOnly>
  </div>
</template>
   

<script>
// import the component and the necessary extensions
import {
  TiptapVuetify,
  Heading,
  Bold,
  Italic,
  Strike,
  Underline,
  Code,
  Paragraph,
  BulletList,
  OrderedList,
  ListItem,
  Link,
  Blockquote,
  HardBreak,
  HorizontalRule,
  History,
} from 'tiptap-vuetify'
import { getSet } from '~/utils'

export default {
  // specify TiptapVuetify component in "components"
  components: { TiptapVuetify },
  data: () => ({
    // declare extensions you want to use
    extensions: [
      History,
      Blockquote,
      Link,
      Underline,
      Strike,
      Italic,
      ListItem,
      BulletList,
      OrderedList,
      [
        Heading,
        {
          options: {
            levels: [1, 2, 3],
          },
        },
      ],
      Bold,
      Link,
      Code,
      HorizontalRule,
      Paragraph,
      HardBreak,
    ],
  }),

  computed: {
    contentData: getSet('richTextEditor/GET_CONTENT', 'richTextEditor/SET_CONTENT', 500)
  },
}
</script>