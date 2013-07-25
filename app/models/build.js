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
    var url = '/repos/' + repositoryName + '/builds';
    return this.getTravisData(url);
  },

  /*
   @public

   Fetches the build with the given id for the given repository.

   @method findMineByRepositoryNameAndId
   @param  repositoryName {String}
   @param  buildId {String}
   @returns {Ember.RSVP.Promise}
   */
  //https://api.travis-ci.org/repos/yapplabs/glazier/builds/9271771
  findBuildByRepositoryNameAndId: function(repositoryName, buildId) {
    var url = '/repos/' + repositoryName + '/builds/' + buildId;
    return this.getTravisData(url);
  },


  /*
   @public

   Makes a get call to the travis api with the relative url.

   @method getTravisData
   @param  relativeUrl {String}
   @returns {Ember.RSVP.Promise}
   */
  getTravisData: function(relativeUrl) {
    var service = card.consumers.fullXhr;

    return service.request("ajax", {
      url: card.baseTravisUrl + '/' + relativeUrl,
      type: 'get',
      dataType: 'json'
    });
  }

};

export default Build;
