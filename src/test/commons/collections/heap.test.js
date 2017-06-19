describe("A test suite Heap", function () {
  beforeEach(function () {
  });
  afterEach(function () {
  });

  it('should be add values and peek is minimum success', function () {
    var heapMin = new Heap(function (a, b) {
      return a - b;
    });

    heapMin.add(10);
    heapMin.add(9);
    heapMin.add(8);
    heapMin.add(7);
    heapMin.add(220020);
    heapMin.add(5);
    heapMin.add(4);
    heapMin.add(3);
    heapMin.add(2);
    heapMin.add(1);
    heapMin.add(0);

    assert.equal(0, heapMin.peek());
  });

  it('should be add and remove values and peek is minimum success', function () {
    var heapMin = new Heap(function (a, b) {
      return a - b;
    });

    heapMin.add(10);
    heapMin.add(9);
    heapMin.add(8);
    heapMin.add(7);
    heapMin.poll();
    heapMin.poll();
    heapMin.poll();
    heapMin.add(3);
    heapMin.add(2);
    heapMin.poll();
    heapMin.add(0);

    assert.equal(0, heapMin.peek());
  });

  it('should be add values and peek is maximum success', function () {
    var heapMax = new Heap(function (a, b) {
      return b - a;
    });

    heapMax.add(10);
    heapMax.add(9);
    heapMax.add(8);
    heapMax.add(7);
    heapMax.add(220020);
    heapMax.add(5);
    heapMax.add(4);
    heapMax.add(3);
    heapMax.add(2);
    heapMax.add(1);
    heapMax.add(0);
    
    assert.equal(220020, heapMax.peek());
  });

  it('should be add and remove values and peek is maximum success', function () {
    var heapMax = new Heap(function (a, b) {
      return b - a;
    });

    heapMax.add(9);
    heapMax.add(8);
    heapMax.add(7);
    heapMax.poll();
    heapMax.poll();
    heapMax.add(10);
    heapMax.poll();
    heapMax.add(3);
    heapMax.add(2);
    heapMax.poll();
    heapMax.add(0);

    assert.equal(3, heapMax.peek());
  });

  it('should be push values and length heap success', function () {
    var heapMax = new Heap(function (a, b) {
      return b - a;
    });

    heapMax.add(1);
    heapMax.add(2);
    heapMax.add(3);
    heapMax.add(4);
    heapMax.add(5);
    heapMax.add(6);

    assert.equal(6, heapMax.length);
  });

  it('should be add values and empty heap success', function () {
    var heapMax = new Heap(function (a, b) {
      return b - a;
    });

    heapMax.add(1);
    heapMax.add(2);
    heapMax.add(3);
    heapMax.add(4);
    heapMax.add(5);
    heapMax.add(6);

    while (!heapMax.empty) {
      heapMax.poll()
    }

    assert.equal(true, heapMax.empty);
  });

  it('should be push values and clear heap success', function () {
    var heapMax = new Heap(function (a, b) {
      return b - a;
    });

    heapMax.add(1);
    heapMax.add(2);
    heapMax.add(3);
    heapMax.add(4);
    heapMax.add(5);
    heapMax.add(6);

    heapMax.clear();

    assert.equal(0, heapMax.length);

    for ( var node in heapMax._items) {
      assert.equal(undefined, node);
    }
  });
});