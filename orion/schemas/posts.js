Posts.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Title'
  },
  body: orion.attribute('froala', {
      label: orion.helpers.getTranslation('posts.schema.body') // We use this function to make i18n work in autoform
  }),
  /**
   * This attribute sets the user id of the user that created this post automatically.
   */
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));
