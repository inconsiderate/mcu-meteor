
Movies = new orion.collection('movies', {
  singularName: orion.helpers.getTranslation('movies.singularName'), // The name of one of this items
  pluralName: orion.helpers.getTranslation('movies.pluralName'), // The name of more than one of this items
  title: orion.helpers.getTranslation('movies.title'), // The title of the page
  link: {
    /**
     * The text that you want to show in the sidebar. The default value is the name of the collection, so in this case is not necesary
     */
    title: orion.helpers.getTranslation('movies.title')
  },
  /**
   * Tabular settings for this collection
   */
  tabular: {
    columns: [
      { data: 'title', title: orion.helpers.getTranslation('movies.schema.title') },
      { data: 'releaseDate', title: orion.helpers.getTranslation('movies.schema.releaseDate') },
      orion.attributeColumn('image', 'logo', orion.helpers.getTranslation('movies.schema.logo')),
      orion.attributeColumn('image', 'banner', orion.helpers.getTranslation('movies.schema.banner')),
      { data: 'studio', title: 'studio'}
    ]
  }
});

/**
 * Now we will attach the schema for that collection. Orion will automatically create the corresponding form.
 */

Movies.attachSchema(new SimpleSchema({
  title: {
    type: String,
    label: 'Title'
  },
  attributes: {
    type: [String],
      label: "attributes",
      autoform: {
        afFieldInput: {
          type: "select-checkbox-inline",
          options: function () {
            return { mcu: 'Marvel Shared Universe', animated: 'Animated', liveAction: 'Live Action', tv: 'TV Show', featureFilm: 'Feature Film' };
          }
        }
      }
  },
  studio: {
    type: String,
    label: 'Studio',
    optional: true
  },
  rumourSource: {
    type: String,
    label: 'Rumour Source',
    optional: true
  },  
  confirmationSource: {
    type: String,
    label: 'Confirmation Source',
    optional: true
  },  
  estimatedDate: {
    type: String,
    label: 'Estimated Date',
    optional: true
  },
  releaseDate: {
    type: Date,
      label: "Release Date",
      autoform: {
        afFieldInput: {
          type: "datetime-local",
        }
      },
      optional: true
  },
  endDate: {
    type: Date,
      label: "End Date",
      autoform: {
        afFieldInput: {
          type: "datetime-local",
        }
      },
      optional: true
  },
  description: orion.attribute('froala', {
      label: orion.helpers.getTranslation('movies.schema.description'), // We use this function to make i18n work in autoform
      optional: true
  }),
  trailer: {
    type: String,
    label: 'Trailer',
    optional: true
  },
  watchnow: {
    type: String,
    label: 'Watch Now',
    optional: true
  },
  trakt: {
    type: String,
    label: 'Trakt',
    optional: true
  },
  /**
   * WARNING: the url of the image will not be saved in .image, it will be saved in .image.url.
   */
  logo: orion.attribute('image', {
      label: 'Logo Image',
      optional: true
  }),
  poster: orion.attribute('image', {
      label: 'Poster Image',
      optional: true
  }),
  banner: orion.attribute('image', {
      label: 'Banner Image',
      optional: true
  }),
  /**
   * This attribute sets the user id of the user that created this post automatically.
   */
  createdBy: orion.attribute('createdBy'),
  createdAt: orion.attribute('createdAt')
}));

Movies.helpers({
  getCreator: function () {
    return Meteor.users.findOne({ _id: this.createdBy });
  }
});

