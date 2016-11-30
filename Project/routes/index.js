var express = require('express');
var router = express.Router();
var path = require('path');
var UniqueNumber = require("unique-number");

var mergeSort = require("js-sorting").mergeSort;
var quickSort = require("js-sorting").quicksort;
var heapSort = require("js-sorting").heapsort;
var insertionSort = require("js-sorting").insertionSort;
var radixSort = require("js-sorting").radixSort;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/sort', function (req, res) {
    var no = req.param('no');

    console.log(no);

    var uniqueNumber = new UniqueNumber();
    var numbers = [];
    for (var i = 0; i < no ; i++) {
        numbers.push(uniqueNumber.generate());
    }

    //MERGE SORT
    var startMerge = new Date().getMilliseconds();
    console.log(mergeSort(numbers));
    var elapsedMerge = (new Date().getMilliseconds() - startMerge) / 1000000;
    console.log(elapsedMerge);

    // QUICK SORT
    var startQuick = new Date().getMilliseconds();
    console.log(quickSort(numbers));
    var elapsedQuick = (new Date().getMilliseconds() - startQuick) / 1000000;
    console.log(elapsedQuick);

    //HEAP SORT
    var startHeap = new Date().getMilliseconds();
    console.log(heapSort(numbers));
    var elapsedHeap = (new Date().getMilliseconds() - startHeap) / 1000000;
    console.log(elapsedHeap);

    //INSERTION SORT
    var startInsertion = new Date().getMilliseconds();
    console.log(insertionSort(numbers));
    var elapsedInsertion = (new Date().getMilliseconds() - startInsertion) / 100000;
    console.log(elapsedInsertion);

    //RADIX SORT
    var startRadix = new Date().getMilliseconds();
    console.log(radixSort(numbers));
    var elapsedRadix = (new Date().getMilliseconds() - startRadix) / 1000000;
    console.log(elapsedRadix);

    var data = {
        numbers: numbers,
        time: [elapsedMerge, elapsedQuick, elapsedHeap, elapsedInsertion, elapsedRadix]
    };

});

module.exports = router;