AutoForm.hooks({
  insertStudyForm: {
    onSuccess: function(formType, studyId) {
      window.location = "/studies/" + studyId;
    },
  }
});
