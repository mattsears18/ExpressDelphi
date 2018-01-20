import Studies from './Studies';
import Tabular from 'meteor/aldeed:tabular';

StudiesTabular = new Tabular.Table({
  name: "Studies",
  collection: Studies,
  columns: [
    {
       data: "name",
       title: "Name",
       render: function(data, type, row, meta){
          data = '<a href="/studies/' + row._id + '">' + data + '</a>';
          return data;
       }
    },
    {data: "currentRound", title: "Current Round"},
    {
       title: "Results",
       render: function(data, type, row, meta){
          data = '<a href="/studies/' + row._id + '/results" class="btn btn-primary"><i class="fa fa-table"></i>&nbsp;&nbsp;View Study Results</a>';
          return data;
       }
    },
  ],
  searching: false,
  lengthChange: false,
  paging_type: 'full_numbers',
});
