import React, { useCallback, useEffect, useState } from "react";
import './SortingVisualizer.css';
import BubbleSortAnimation from '../sortingAnimations/BubbleSortAnimation.jsx';
import MergeSortAnimation from '../sortingAnimations/MergeSortAnimation.jsx';
import QuickSortAnimation from '../sortingAnimations/QuickSortAnimation.jsx';
import InsertionSortAnimation from '../sortingAnimations/InsertionSortAnimation.jsx';


export default function SortingVisualizer(){

    const [array, setarray]=useState([]);
    const [ANIMATION_SPEED_MS, setANIMATION_SPEED_MS]=useState(23);
    const [NUMBER_OF_ARRAY_BARS, setNUMBER_OF_ARRAY_BARS]=useState(150);
    const [PRIMARY_COLOR, setPRIMARY_COLOR]=useState('turquoise');
    const [SECONDARY_COLOR, setSECONDARY_COLOR]=useState('red');
    const [widthofbar, setwidthofbar]=useState(2);
    const [heightdiff, setheightdiff]=useState(0);
    const [algorithm,setAlgorithm]=useState("");


     useEffect(() => {
        resetArray();
     },[NUMBER_OF_ARRAY_BARS]
     );



    function resetArray() {
        const arr = [];
        var maxValue=0;
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
          arr.push(randomIntFromInterval(5, 600));
          maxValue=Math.max(maxValue,arr[i]);
        }
        arr[NUMBER_OF_ARRAY_BARS-1]=maxValue;
        setarray(arr);
        setheightdiff(maxValue-600);
        const numWidth = Math.floor(document.getElementById("array-container").clientWidth/ (NUMBER_OF_ARRAY_BARS * 3));
        setwidthofbar(numWidth);
      }
    

    function handleChange(event){
        const n=event.target.value;
        setNUMBER_OF_ARRAY_BARS(event.target.value);
        const val2=3500/n;
        setANIMATION_SPEED_MS(val2);
      }



    function handleClick(event){
        const selectedAlgo=event.target.innerText;
        setAlgorithm(selectedAlgo);
    } 
      
      
    function startAnimation(){
        if(algorithm==="Merge Sort"){
          MergeSortAnimation(array,PRIMARY_COLOR,SECONDARY_COLOR,ANIMATION_SPEED_MS);
        }
        else if(algorithm==="Quick Sort"){
          QuickSortAnimation(array,PRIMARY_COLOR,SECONDARY_COLOR,ANIMATION_SPEED_MS);
        }
        else if(algorithm==="Bubble Sort"){
          BubbleSortAnimation(array,PRIMARY_COLOR,SECONDARY_COLOR,ANIMATION_SPEED_MS);
        }
        else if(algorithm==="Insertion Sort"){
          InsertionSortAnimation(array,PRIMARY_COLOR,SECONDARY_COLOR,ANIMATION_SPEED_MS);
        }
    }
      
      
      
      
      
      
      function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
      }




      
      


    return (
        <span>
            <div className="tool-bar">
                <button className="btn btn-primary"  onClick={resetArray}>Generate New Array</button>
                <input type="range" className="form-range" min="10" max="300" id="customRange3" value={NUMBER_OF_ARRAY_BARS} onChange={handleChange}></input>
                <button className="btn btn-primary"  id="Merge Sort" onClick={handleClick}>Merge Sort</button>
                <button className="btn btn-primary"  id="Quick Sort" onClick={handleClick}>Quick Sort</button>
                <button className="btn btn-primary"  id="Bubble Sort" onClick={handleClick}>Bubble Sort</button>
                <button className="btn btn-primary"  id="Insertion Sort" onClick={handleClick}>Insertion Sort</button>
                {(algorithm!="") && <button className="btn btn-primary"  onClick={startAnimation}>Start {algorithm}!</button>}
            </div>
      <div id="array-container">
        {array.map((value, idx) => (
          <div
            className="array-bar"
            key={idx}
            style={{
              backgroundColor: PRIMARY_COLOR,
              height: `${value}px`,
              width: `${widthofbar}px`,
              bottom: `${heightdiff}px`
            }}></div>
        ))}
        </div>
        </span>
    );
}