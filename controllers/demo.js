var tree = [{
  id: 0,
  name: 'Slalom Consulting',
  major: true,
  children: [{
    id: 1,
    name: 'Slalom Atlanta',
    major: true,
    children: [{
      id: 2,
      name: 'Experience Strategy & Design',
      major: false,
      children: []
    }, {
      id: 3,
      name: 'Information Management & Analytics',
      major: false,
      children: []
    }, {
      id: 4,
      name: 'Market',
      major: false,
      children: []
    }, {
      id: 5,
      name: 'Technology Enablement',
      major: true,
      children: [{
        id: 6,
        name: 'Portals & Collaboration',
        major: false,
        children: [{
          id: 7,
          name: 'Salesforce',
          major: false,
          children: []
        }]
      }, {
        id: 8,
        name: 'Architecture & Development',
        major: false,
        children: []
      }]
    }, {
      id: 9,
      name: 'Business Development',
      major: false,
      children: []
    }, {
      id: 10,
      name: 'Organizational Effectiveness',
      major: false,
      children: []
    }, {
      id: 11,
      name: 'Business Advisory Services',
      major: false,
      children: [{
        id: 12,
        name: 'Strategy & Operations',
        major: false,
        children: []
      }, {
        id: 13,
        name: 'Financial Planning & Services',
        major: false,
        children: []
      }]
    }]
  }, {
    id: 14,
    name: 'X Market',
    major: true,
    children: [{
      id: 15,
      name: 'Information Management & Analytics',
      major: false,
      children: []
    }]
  }, {
    id: 16,
    name: 'Chicago',
    major: true,
    children: [{
      id: 17,
      name: 'Information Management & Analytics',
      major: false,
      children: [],
    }],
  }]
}];

angular.module('app', ['components']).controller('TestCtrl', function($scope, $locale) {
  $scope.departments = tree;
});
