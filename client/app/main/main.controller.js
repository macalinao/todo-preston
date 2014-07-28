'use strict';

angular.module('todoRestifierApp')
  .controller('MainCtrl', function($q, $scope, $http, Todo) {
    $scope.todos = [];
    Todo.getList().then(function(todos) {
      $scope.todos = todos;
    });

    $scope.newTodo = {
      title: ''
    };

    $scope.filterTodos = function() {
      switch ($scope.mode) {
        case 'All':
          return {};
        case 'Active':
          return {
            completed: false
          };
        case 'Completed':
          return {
            completed: true
          };
      }
    };

    $scope.$watch('todos', function() {
      $scope.remainingCount = $scope.todos.filter(function(todo) {
        return !todo.completed;
      }).length;
      $scope.completedCount = $scope.todos.length - $scope.remainingCount;
      $scope.allChecked = !$scope.remainingCount;
    }, true);

    $scope.addTodo = function() {
      Todo.post($scope.newTodo).then(function(todo) {
        $scope.todos.push(todo);
      });
      $scope.newTodo = {
        title: ''
      };
    };

    $scope.doneEditing = function(todo, $index) {
      $scope.editedTodo = null;
      todo.title = todo.title.trim();

      if (!todo.title) {
        $scope.removeTodo(todo);
      } else {
        todo.put();
      }
    };

    $scope.revertEditing = function(todo, $index) {
      $scope.todos[$index] = $scope.originalTodo;
      $scope.doneEditing($scope.originalTodo, $index);
    };

    $scope.clearCompletedTodos = function() {
      var completedTodos = $scope.todos.filter(function(val) {
        return val.completed;
      });
      var promises = completedTodos.map(function(todo) {
        return todo.remove();
      });
      $q.all(promises).then(function() {
        return $scope.todos.getList();
      }).then(function(todos) {
        $scope.todos = todos;
      });
    };

    $scope.mark = function(todo) {
      var todoHandle = todo.one(todo._id);
      todoHandle.completed = todo.completed = !todo.completed;
      todoHandle.put();
    };

    $scope.markAll = function(completed) {
      $scope.todos.map(function(todo) {
        todo.completed = !completed;
        todo.put();
      });
    };
  });
