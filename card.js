import Consumer from 'conductor';

Conductor.require('/vendor/jquery.js');
Conductor.require('/vendor/handlebars.js');
Conductor.require('/vendor/ember-latest.js');
Conductor.require('/vendor/loader.js');
Conductor.requireCSS('/css/glazier_card.css');
Conductor.requireCSS('card.css');

import TestConsumer from 'app/consumers/test';

var card = Conductor.card({
  consumers: {
    'test': TestConsumer,
    'repository': Conductor.Oasis.Consumer
  },

  App: null,

  defaultTemplate: "<div id=\"card\">Hello Bootstrap.  Click me.</div>",

  render: function (intent, dimensions) {
    document.body.innerHTML = this.defaultTemplate;
    Ember.run(this.App, 'advanceReadiness');
  },

  defaultOnActivation: function(){
    card.consumers.repository.request('getRepository').then(function(name) {
      $('#card').click(function() {
        alert('You clicked me in ' + name);
      });
    });
  },

  activate: function() {
    this.App = requireModule('app/application');
    this.defaultOnActivation()
  },

  metadata: {
    document: function(promise) {
      promise.resolve({
        title: "Travis Build Status"
      });
    }
  }

//  resize: function(dimensions) {
//  }
});

export default card;

