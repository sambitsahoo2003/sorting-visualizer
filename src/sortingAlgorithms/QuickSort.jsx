import React from "react";

export function getQuickSortAnimations(array){
    const animations=[];
    var n=array.length;
    quickSortHelper(0,n-1,array,animations);
    return animations;
    
}

function quickSortHelper(low,high,array,animations){
    if(low>=high) return;
    var ptind=partition(low,high,array,animations);
    quickSortHelper(low,ptind-1,array,animations);
    quickSortHelper(ptind+1,high,array,animations);
}

function partition(low,high,array,animations){
    const pivot=array[low];
    var i=low;
    var j=high;
    while(i<j)
    {
        while(i<high && array[i]<=pivot){
            animations.push([2,i,low]);
            animations.push([1,i,low]);
            i++;
        }
        while(j>low && array[j]>pivot){
            animations.push([2,j,low]);
            animations.push([1,j,low]);
            j--;
        }
        
        if(i<j)
        {
            animations.push([0,i,array[j]]);
            animations.push([0,j,array[i]]);
            var temp=array[i];
            array[i]=array[j];
            array[j]=temp;
        }
    }
    animations.push([0,low,array[j]]);
    animations.push([0,j,array[low]]);
    var temp=array[j];
    array[j]=array[low];
    array[low]=temp;

    return j;
}