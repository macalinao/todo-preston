'use strict';

describe('Service: Todo', function () {

  // load the service's module
  beforeEach(module('todoRestifierApp'));

  // instantiate service
  var Todo;
  beforeEach(inject(function (_Todo_) {
    Todo = _Todo_;
  }));

  it('should do something', function () {
    expect(!!Todo).toBe(true);
  });

});
