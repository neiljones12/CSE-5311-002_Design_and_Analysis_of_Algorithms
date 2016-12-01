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

    //console.log(no);

    var uniqueNumber = new UniqueNumber();
    var numbers = [];
    for (var i = 0; i < no ; i++) {
        numbers.push(uniqueNumber.generate());
    }

    var hrTime = process.hrtime()
    console.log(hrTime[0] * 1000000 + hrTime[1] / 1000)

    //MERGE SORT
    var hrTime = process.hrtime()
    var mergeStart = hrTime[0] * 1000000 + hrTime[1] / 1000;

    console.log(mergeSort(numbers));

    hrTime = process.hrtime()
    var mergeStop = hrTime[0] * 1000000 + hrTime[1] / 1000;

    elapsedMerge = mergeStop - mergeStart;

    // QUICK SORT 
    hrTime = process.hrtime()
    var quickStart = hrTime[0] * 1000000 + hrTime[1] / 1000;

    console.log(quickSort(numbers));

    hrTime = process.hrtime()
    var quickStop = hrTime[0] * 1000000 + hrTime[1] / 1000;

    elapsedQuick = quickStop - quickStart;

    //HEAP SORT 
    hrTime = process.hrtime()
    var heapStart = hrTime[0] * 1000000 + hrTime[1] / 1000;

    console.log(heapSort(numbers));

    hrTime = process.hrtime()
    var heapStop = hrTime[0] * 1000000 + hrTime[1] / 1000;

    elapsedHeap = heapStop - heapStart;

    //INSERTION SORT 
    hrTime = process.hrtime()
    var insertionStart = hrTime[0] * 1000000 + hrTime[1] / 1000;

    console.log(insertionSort(numbers));

    hrTime = process.hrtime()
    var insertionStop = hrTime[0] * 1000000 + hrTime[1] / 1000;

    elapsedInsertion = insertionStop - insertionStart;

    //RADIX SORT 
    hrTime = process.hrtime()
    var radixStart = hrTime[0] * 1000000 + hrTime[1] / 1000;

    console.log(radixSort(numbers));

    hrTime = process.hrtime()
    var radixStop = hrTime[0] * 1000000 + hrTime[1] / 1000;

    elapsedRadix = radixStop - radixStart;

    var data = {
        numbers: numbers,
        time: [elapsedMerge, elapsedQuick, elapsedHeap, elapsedInsertion, elapsedRadix]
    };

    res.send(data);
});

module.exports = router;