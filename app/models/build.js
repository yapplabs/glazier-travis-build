import card from 'card';

var Build = {
  /*
   @public

   Fetches all builds given a repository name.

   @method findStatusByRepositoryName
   @param  repositoryName {String}
   @returns {Ember.RSVP.Promise}
   */
  //https://api.travis-ci.org/repos/yapplabs/glazier/builds
  findBuildsByRepositoryName: function(repositoryName) {
    console.log("findBuildsByRepositoryName: get travis builds")
    var service = card.consumers.fullXhr;

    return service.request("ajax", {
      url: card.baseTravisUrl + '/repos/' + repositoryName + '/builds',
      type: 'get',
      dataType: 'json'
    });
  },

  /*
   @public

   Fetches the current issues given a repository name.

   @method findMineByRepositoryName
   @param  repositoryName {String}
   @returns {Ember.RSVP.Promise}
   */
  //https://api.travis-ci.org/repos/yapplabs/glazier/builds/9271771
  findBuildByRepositoryNameAndId: function(repositoryName, creator) {
//    return card.consumers.authenticatedGithubApi.request("ajax", {
//      url: '/repos/' + repositoryName + '/issues?creator=' + creator,
//      dataType: 'json'
//    });
    return [];  //todo
  }
};

export default Build;
