import card from 'card';
import Conductor from 'conductor';
import Build from 'app/models/build';

function fetch() {
  var repositoryName = card.data.repositoryName;
  var user = card.data.user;

  var hash = {};
  hash.builds = Build.findBuildsByRepositoryName(repositoryName);
  //latestBuildId = 4 //todo get this from allBuild
  //hash.latestBuild = Build.findBuildByRepositoryNameAndId(latestBuildId)

  return Ember.RSVP.hash(hash);
}

var ApplicationRoute = Ember.Route.extend({

  model: function(){
    var applicationController = this.controllerFor('application');
    applicationController.set('repositoryName', card.data.repositoryName);

//    todo
    return fetch().then(function(hash) {
      applicationController.set('builds', hash.builds);
      return []; //hash.latestBuild;
    });
  }
});

export default ApplicationRoute;
