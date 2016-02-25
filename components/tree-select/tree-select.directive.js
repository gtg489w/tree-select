angular.module('components', [])
	.directive('treeSelect', function() {
		return {
			restrict: 'E',
			transclude: true,
			templateUrl: 'components/tree-select/tree-select.view.html',
			replace: true,
			scope: {
				default: '@',
				tree: '=',
				selected: '=',
				majors: '='
			},
			controller: function($scope, $element, $timeout) {

				var focusElement;
				var focusTimeout;

				function findFocusElement() {
					var children = $element.children();
					for(var i=0; i<children.length; i++) {
						if(children[i].className == 'tree-select-focus') {
							// angular.element(children[i]).focus();
							focusElement = children[i];
						}
					}
					
				}

				function focus() {
					if(!focusElement) {
						findFocusElement();
					}
					focusElement.focus();
					if(focusTimeout) {
						$timeout.cancel(focusTimeout);
					}
				}

				$scope.open = function($event) {
					$scope.opened = !$scope.opened;
					focus();
				};

				$scope.blur = function() {
					focusTimeout = $timeout(function() {
						$scope.opened = false;
					}, 300);
				};

				$scope.select = function(node, $event) {
					if(!node) {
						$scope.visibleTree = $scope.tree;
					} else if(node.type && node.type == 'major-up') {
						var root = $scope.visibleTree[1];
						if(root.parentMajor && root.parentMajor.parentMajor) {
							$scope.visibleTree = [{ name: '...', type: 'major-up' }, root.parentMajor];
						} else if(root.parentMajor) {
							$scope.visibleTree = [root.parentMajor];
						} else {
							// uber fallback
							$scope.visibleTree = $scope.tree;
						}
						$event.stopPropagation();
						focus();
					} else {
						$scope.selectedNode = node;
						if(node.major) {
							// don't traverse up if it's a major node
							if(node.parentMajor) {
								$scope.visibleTree = [{ name: '...', type: 'major-up' }, node];
							} else {
								$scope.visibleTree = [node];
							}
						} else {
							// traverse up to find the next major node (unless there isn't one and we should just use the root)
							if(node.parentMajor) {
								if(node.parentMajor.parentMajor) {
									$scope.visibleTree = [{ name: '...', type: 'major-up' }, node.parentMajor];
								} else {
									$scope.visibleTree = [node.parentMajor];
								}
							} else {
								$scope.visibleTree = $scope.tree;
							}
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
					var i;
					for (i = 0; i < tree.length; i++) {
						if (tree[i].id == id) {
							return tree[i];
						}
					}
					for (i = 0; i < tree.length; i++) {
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

				attachMajors($scope.tree);
				$scope.select(findSelectedById($scope.tree, $scope.selected));



			}
		};
	});