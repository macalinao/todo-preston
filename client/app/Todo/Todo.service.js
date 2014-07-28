'use strict';

angular.module('todoRestifierApp')
  .factory('Todo', function(Restangular) {
    return Restangular.service('api/todos');
  });
