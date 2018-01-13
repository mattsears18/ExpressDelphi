AutoForm.hooks({
  insertStudyForm: {
    onSuccess: function(formType, studyId) {
      FlowRouter.go('/');
    //  window.location = "/studies/" + studyId;
    },
  }
});
