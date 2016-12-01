var express = require('express');
var router = express.Router();
var path = require('path');
var ms = require('microseconds');

var mergeSort = require("js-sorting").mergeSort;
//var quickSort = require("js-sorting").quicksort;
//var heapSort = require("js-sorting").heapsort;
var insertionSort = require("js-sorting").insertionSort;
var radixSort = require("js-sorting").radixSort;

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.get('/sort', function (req, res) {

    console.log(req.query);

    var num = req.query.number;
    //var numbers = new Array(parseInt(num));
    var numbers = [];
    function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }
    
    for (var i = 0; i < num; i++) {
        numbers.push(i);
    }
    numbers = shuffle(numbers);

    console.log(numbers); 
    

    // QUICK SORT 
    var hrstartQ = ms.now();

    var q = quickSort(numbers, 0, numbers.length - 1);
    //console.log(q);
    function quickSort(arr, left, right) {
        var len = arr.length,
        pivot,
        partitionIndex;


        if (left < right) {
            pivot = right;
            partitionIndex = partition(arr, pivot, left, right);

            //sort left and right
            quickSort(arr, left, partitionIndex - 1);
            quickSort(arr, partitionIndex + 1, right);
        }
        return arr;
    }

    function partition(arr, pivot, left, right) {
        var pivotValue = arr[pivot],
            partitionIndex = left;

        for (var i = left; i < right; i++) {
            if (arr[i] < pivotValue) {
                swap(arr, i, partitionIndex);
                partitionIndex++;
            }
        }
        swap(arr, right, partitionIndex);
        return partitionIndex;
    }

    function swap(arr, i, j) {
        var temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }

    elapsedQuick = ms.since(hrstartQ);

    //HEAP SORT 
    var hrstartH = ms.now();

    var h = heapSort(numbers);
    //console.log(h);
    function heapSort(arr) {
        var len = arr.length,
            end = len - 1;

        heapify(arr, len);

        while (end > 0) {
            swap(arr, end--, 0);
            siftDown(arr, 0, end);
        }
        return arr;
    }

    function heapify(arr, len) {
        // break the array into root + two sides, to create tree (heap)
        var mid = Math.floor((len - 2) / 2);
        while (mid >= 0) {
            siftDown(arr, mid--, len - 1);
        }
    }

    function siftDown(arr, start, end) {
        var root = start,
            child = root * 2 + 1,
            toSwap = root;
        while (child <= end) {
            if (arr[toSwap] < arr[child]) {
                swap(arr, toSwap, child);
            }
            if (child + 1 <= end && arr[toSwap] < arr[child + 1]) {
                swap(arr, toSwap, child + 1)
            }
            if (toSwap != root) {
                swap(arr, root, toSwap);
                root = toSwap;
            }
            else {
                return;
            }
            toSwap = root;
            child = root * 2 + 1
        }
    }

    elapsedHeap = ms.since(hrstartH);

    //INSERTION SORT 
    var hrstartI = ms.now();

    var u = insertionSort(numbers);
    //console.log(u);

    //function insertionSort(unsortedList) {
    //    var len = unsortedList.length;
    //    for (var i = 0; i < len; i++) {
    //        var tmp = unsortedList[i]; //Copy of the current element. 
    //        /*Check through the sorted part and compare with the number in tmp. If large, shift the number*/
    //        for (var j = i - 1; j >= 0 && (unsortedList[j] > tmp) ; j--) {
    //            //Shift the number
    //            unsortedList[j + 1] = unsortedList[j];
    //        }
    //        //Insert the copied number at the correct position
    //        //in sorted part. 
    //        unsortedList[j + 1] = tmp;
    //    }
    //}

    elapsedInsertion = ms.since(hrstartI);

    //RADIX SORT 
    var hrstartR = ms.now();

    var r = radixSort(numbers); 

    elapsedRadix = ms.since(hrstartR);

    //MERGE SORT 
    var hrstartm = ms.now();

    var m = mergeSort(numbers);

    console.log(m);

    elapsedMerge = ms.since(hrstartm);

    var data = {
        numbers: numbers,
        time: [elapsedMerge, elapsedQuick, elapsedHeap, elapsedInsertion, elapsedRadix]
    };

    res.send(data);
});

module.exports = router;