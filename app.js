/* jshint node:true */
var watchify = require('watchify');
var fs = require('fs');

var site = require('apostrophe-site')({

  // This line is required and allows apostrophe-site to use require() and manage our NPM modules for us.
  root: module,
  shortName: 'as-database',
  hostName: 'apostrophe-sandbox',
  title: 'Apostrophe Sandbox',
  sessionSecret: 'apostrophe sandbox demo party',
  adminPassword: 'demo',

  // Force a2 to prefix all of its URLs. It still
  // listens on its own port, but you can configure
  // your reverse proxy to send it traffic only
  // for URLs with this prefix. With this option
  // "/" becomes a 404, which is supposed to happen!

  // prefix: '/test',

  // If true, new tags can only be added by admins accessing
  // the tag editor modal via the admin bar. Sometimes useful
  // if your folksonomy has gotten completely out of hand
  lockTags: false,

  // Give users a chance to log in if they attempt to visit a page
  // which requires login
  secondChanceLogin: true,

  locals:  require('./lib/locals.js'),

  // you can define lockups for areas here
  // lockups: {},

  // Here we define what page templates we have and what they will be called in the Page Types menu.

  // For html templates, the 'name' property refers to the filename in ./views/pages, e.g. 'default'
  // refers to '/views/pages/default.html'.

  // The name property can also refer to a module, in the case of 'blog', 'map', 'events', etc.

  pages: {
    types: [
      { name: 'default', label: 'Default Page' },
      { name: 'home', label: 'Home Page' },
      { name: 'blog', label: 'Blog' },
      { name: 'contact', label: 'Contact'},
      { name: 'equipe', label: 'equipe' },
      { name: 'simplePage', label: 'Simple Page'}
    ]
  },

  lockups: {
    left: {
      label: 'Left',
      tooltip: 'Inset Left',
      icon: 'icon-arrow-left',
      widgets: [ 'slideshow', 'video' ],
      slideshow: {
        size: 'one-half'
      }
    },
    right: {
      label: 'Right',
      tooltip: 'Inset Right',
      icon: 'icon-arrow-right',
      widgets: [ 'slideshow', 'video' ],
      slideshow: {
        size: 'one-half'
      }
    }
  },

  // These are the modules we want to bring into the project.
  modules: {
    // Styles required by the new editor, must go FIRST
    'apostrophe-editor-2': {},
    'apostrophe-ui-2': {},
    'apostrophe-blog-2': {
      perPage: 5,
      pieces: {
        addFields: [
          {
            name: '_author',
            type: 'joinByOne',
            withType: 'person',
            idField: 'authorId',
            label: 'Author'
          }
        ]
      }
    },
    'apostrophe-blocks': {
      types: [
        {
          name: 'one',
          label: 'One Column'
        },
        {
          name: 'two',
          label: 'Two Column'
        }
      ]
    },
    'apostrophe-people': {
      addFields: [
        {
          name: '_blogPosts',
          type: 'joinByOneReverse',
          withType: 'blogPost',
          idField: 'authorId',
          label: 'Author',
          withJoins: [ '_editor' ]
        },
        {
          name: 'thumbnail',
          type: 'singleton',
          widgetType: 'slideshow',
          label: 'Picture',
          options: {
            aspectRatio: [100,100]
          }
        }
      ]
    },
    'apostrophe-groups': {},
    'apostrophe-browserify': {
      files: ["./public/js/modules/_site.js"]
    }///,
    ///'apostrophe-demo-login': {
    ///}
  },

  // These are assets we want to push to the browser.
  // The scripts array contains the names of JS files in /public/js,
  // while stylesheets contains the names of LESS files in /public/css
  assets: {
    stylesheets: ['site'],
    scripts: ['vendor/adminbar/adminbar','_site-compiled']
  },

  sanitizeHtml: {
    // Any options that can be passed to the sanitize-html
    // module are valid here. Used to adjust the way we filter
    // HTML saved in the rich text editor. You probably want
    // to stick with our standard set of allowed tags and
    // encourage users to respect your design rather than
    // fighting it
  },

  afterInit: function(callback) {
    // We're going to do a special console log now that the
    // server has started. Are we in development or production?
    var locals = require('./data/local');
    if(locals.development || !locals.minify) {
      console.log('Apostrophe Sandbox is running in development.');
    } else {
      console.log('Apostrophe Sandbox is running in production.');
    }

    callback(null);
  }


});
