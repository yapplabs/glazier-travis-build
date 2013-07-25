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
    var applicationController = this.controllerFor('application');
    applicationController.set('repositoryName', card.data.repositoryName);

    return fetch().then(function(hash) {
      applicationController.set('builds', hash.builds);
      applicationController.set('currentBuild', hash.currentBuild);
      return []; //if return hash.currentBuild throws error
    });
  }
});

export default ApplicationRoute;
