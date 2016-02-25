angular.module('components', [])
  .directive('treeSelect', function() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        default: '@',
        tree: '=',
        selected: '=',
        majors: '='
      },
      controller: function($scope, $element) {
        $scope.select = function(node, $event) {
        	if(node.type && node.type == 'major-up') {
          	var root = $scope.visibleTree[1].parentMajor;
            if(root.parentMajor) {
            	$scope.visibleTree = [{ name: '...', type: 'major-up' }, root];
            } else {
            	$scope.visibleTree = [root];
            }
            $event.stopPropagation();
          } else {
          	$scope.selectedNode = node;
            var root = findMajorFromNode(node.parentMajor);
            console.log(node);
            console.log(root);
            if(!root) {
	            if(node.parentMajor) {
	            	$scope.visibleTree = [node.parentMajor];
              } else {
              	$scope.visibleTree = [node];
              }
            } else {
	            $scope.visibleTree = [{ name: '...', type: 'major-up' }, node.parentMajor];
            }
          }
        };

        function attachMajors(tree, major) {
          for (var i = 0; i < tree.length; i++) {
            tree[i].parentMajor = major;
            if (tree[i].children) {
              var m = !major || tree[i].major ? tree[i] : major;
              attachMajors(tree[i].children, m);
            }
          }
        }

        function findSelectedById(tree, id) {
          for (var i = 0; i < tree.length; i++) {
            if (tree[i].id == id) {
              return tree[i];
            }
          }
          for (var i = 0; i < tree.length; i++) {
	          if (tree[i].children) {
  	          obj = findSelectedById(tree[i].children, id);
    	        if (obj) {
      	        return obj;
              }
            }
          }
        }
        
        function findMajorFromNode(node) {
        	if(!node) {
	          return;
          }
        	if(node.major) {
	          return node;
          }
          return findMajorFromNode(node.parentMajor);
        }

        var selected = findSelectedById($scope.tree, $scope.selected);
        attachMajors($scope.tree);
        $scope.select(selected);
        $scope.visibleTree = [{ name: '...', type: 'major-up' }, findMajorFromNode(selected)];
      },
      templateUrl: 'components/tree-select/tree-select.view.html',
      replace: true
    };
  });