import React from "react";

export default function getInsertionSortAnimations(array){
    const animations=[];
    insertionSortHelper(array,animations);
    return animations;
}


function insertionSortHelper(array,animations){
    const n=array.length;
    for(var i=0;i<n;i++){
        var j=i;
        while(j>0)
        {
            animations.push([2,j,j-1]);
            animations.push([1,j,j-1]);
            if(array[j]<array[j-1]){
                animations.push([0,j, array[j-1],j-1, array[j]]);
                var temp=array[j];
                array[j]=array[j-1];
                array[j-1]=temp;
            }
            j--;
        }
    }
}

