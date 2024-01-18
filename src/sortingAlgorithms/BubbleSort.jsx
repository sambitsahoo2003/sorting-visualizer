import React from "react";

export default function getBubbleSortAnimations(array){
    const animations=[];
    bubbleSortHelper(array,animations);
    console.log(array);
    return animations;
}

function bubbleSortHelper(array,animations){
    var n = array.length;
    for (var i = 0; i < n; i++) {
        var isSwapped=false;
        for (var j = 0; j < n - i - 1; j++) {
            animations.push([2,j, j+1]);
            animations.push([1,j, j+1]);
            if (array[j] > array[j + 1]) {
                animations.push([0,j, array[j+1],j+1, array[j]]);
                var temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;
                isSwapped=true;
            }
        }
        if(!isSwapped) break;
    }
}