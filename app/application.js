import Resolver from 'resolver';

var App = Ember.Application.create({
  modulePrefix: 'app',
  rootElement: '#card',
  Resolver: Resolver
});

App.deferReadiness();
requireModule('templates');

export default App;
