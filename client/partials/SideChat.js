Template.SideChat.onCreated(function() {
  var self = this;
  self.autorun(function() {
    var studyId = FlowRouter.getParam('studyId');
    self.subscribe('messages', studyId);
    self.subscribe('users');
  });
});

Template.SideChat.helpers({
  messages: () => { return Messages.find(); },
  users: () => { return Meteor.users.find(); },
});

Template.SideChat.events = {
  'keypress .chat-new-message-box': function (e, template) {
    if (e.which === 13) {
      $(e.target).closest('form').submit();
      $chatBox = $(e.target).closest('.side-chat').find('.chat-message-list');
      $chatBox.scrollTop($chatBox.prop('scrollHeight'));
    }
  },
  'mouseover .chat-label': function(e, target) {
    $chatBox = $('.chat-message-list');
    $chatBox.scrollTop($chatBox.prop('scrollHeight'));
  }
};
