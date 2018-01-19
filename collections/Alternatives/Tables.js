import Alternatives from './Alternatives';
import Tabular from 'meteor/aldeed:tabular';
import Studies from '../Studies/Studies';


AlternativesTabular = new Tabular.Table({
  name: "Alternatives",
  collection: Alternatives,
  columns: [
    {data: "number", title: "Number"},
    {
       data: "name",
       title: "Name",
       render: function(data, type, row, meta){
          data = '<a href="/studies/' + FlowRouter.getParam('studyId') + '/alternatives/' + row._id + '">' + data + '</a>';
          return data;
       }
    },
    {data: "desc", title: "Description"},
  ],
  lengthChange: false,
});







resultsColumns = [
  {data: "number", title: "Number"},
  {
     data: "name",
     title: "Alternative",
     render: function(data, type, row, meta){
        data = '<a href="/studies/' + FlowRouter.getParam('studyId') + '/alternatives/' + row._id + '">' + data + '</a>';
        return data;
     }
  },
];

resultsColumns.push(
  {data: "desc", title: "Description"},
);

resultsColumns.push(
  {data: "desc", title: "Description"},
);

AlternativeResultsTabular = new Tabular.Table({
  name: "AlternativeResults",
  collection: Alternatives,
  columns: resultsColumns,
  lengthChange: false,
  searching: false,
});
