import card from 'card';
import Conductor from 'conductor';
import Build from 'app/models/build';

function fetch() {
  var repoName = card.data.repositoryName;
  var user = card.data.user;

  var hash = {};
  return Build.findBuildsByRepositoryName(repoName).then(function(builds){
    hash.builds = builds;
    var currentBuildId = builds[0].id
    return Build.findBuildByRepositoryNameAndId(repoName, currentBuildId);
  }).then(function(currentBuild){
      hash.currentBuild = currentBuild;
      return hash;
  }).then(null, function(reason){
      console.log("travis failure: " + reason)
  });
}

var ApplicationRoute = Ember.Route.extend({

  model: function(){
    var buildController = this.controllerFor('build');
    var historyController = this.controllerFor('history');

    return fetch().then(function(hash) {
      buildController.set('content', hash.currentBuild);
      historyController.set('content', hash.builds);
      return []; //can error if return other things
    });
  },
  setupController: function(controller, model) {
    controller.set('repositoryName', card.data.repositoryName);
  }
});

export default ApplicationRoute;
