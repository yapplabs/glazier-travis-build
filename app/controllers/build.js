var BuildController = Ember.ObjectController.extend({
  statusMsgMap: {0: "passed", 1: "failed"},
  statusMsg: function(){
    //specific build api calls return a status; history api calls returns result
    var status = this.get('status') || this.get('result');
    if (Ember.isNone(status)) {
      return "status null";
    }
    return this.get('statusMsgMap')[status];
  }.property("status","result"),
  durationMsg: function(){
    var duration = this.get("duration");
    var secs = ("0" + (duration % 60)).slice(-2);
    return  "" + Math.floor(duration/60) + ":" + secs;
  }.property("duration"),
  finishedAtMsg: function(){
    var time = this.get("finished_at");
    if (Ember.isEmpty(time)) return "";
    time = time.replace("T", " ");
    return time.replace("Z", "");
  }.property("finishedAt")
});

export default BuildController;
