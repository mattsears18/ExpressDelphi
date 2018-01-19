import datatables from 'datatables.net';
import datatables_bs from 'datatables.net-bs';
import 'datatables.net-bs/css/dataTables.bootstrap.css';

Template.Test.onCreated(function() {
  var self = this;
  self.autorun(function() {
    //datatables(window, $);
    //datatables_bst  (window, $);
  });
});

Template.Test.onRendered(function() {
  var self = this;
  self.autorun(function() {
    $(document).ready(function() {
      $('table').DataTable();
    });
  });
});
