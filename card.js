import Consumer from 'conductor';

Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/loader.js');
Conductor.requireCSS('/css/glazier_card.css');
Conductor.requireCSS('card.css');

import TestConsumer from 'app/consumers/test';

var card = Conductor.card({

  baseTravisUrl: "https://api.travis-ci.org",

  consumers: {
    'test': TestConsumer,
    'fullXhr': Conductor.Oasis.Consumer
  },

  App: null,

  defaultTemplate: "<div id=\"card\"></div>",

  render: function (intent, dimensions) {
    document.body.innerHTML = this.defaultTemplate;
    Ember.run(this.App, 'advanceReadiness');
  },

  activate: function() {
    this.App = requireModule('app/application');
  },

  metadata: {
    document: function(promise) {
      promise.resolve({
        title: "Travis Build Status"
      });
    }
  }

});

export default card;

