import React, { useCallback, useEffect, useState } from "react";
import './SortingVisualizer.css';
import BubbleSortAnimation from '../sortingAnimations/BubbleSortAnimation.jsx';
import MergeSortAnimation from '../sortingAnimations/MergeSortAnimation.jsx';
import QuickSortAnimation from '../sortingAnimations/QuickSortAnimation.jsx';
import InsertionSortAnimation from '../sortingAnimations/InsertionSortAnimation.jsx';


export default function SortingVisualizer() {

    const [array, setarray] = useState([]);
    const [ANIMATION_SPEED_MS, setANIMATION_SPEED_MS] = useState(23);
    const [NUMBER_OF_ARRAY_BARS, setNUMBER_OF_ARRAY_BARS] = useState(150);
    const [PRIMARY_COLOR, setPRIMARY_COLOR] = useState('turquoise');
    const [SECONDARY_COLOR, setSECONDARY_COLOR] = useState('red');
    const [widthofbar, setwidthofbar] = useState(2);
    const [heightdiff, setheightdiff] = useState(0);
    const [algorithm, setAlgorithm] = useState("");

    const [showModal, setShowModal] = useState(false);
    const [userInput, setUserInput] = useState("");

    useEffect(() => {
        resetArray();
    }, [NUMBER_OF_ARRAY_BARS]);

    function resetArray() {
        const arr = [];
        var maxValue = 0;
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            arr.push(randomIntFromInterval(5, 500));
            maxValue = Math.max(maxValue, arr[i]);
        }
        arr[NUMBER_OF_ARRAY_BARS - 1] = maxValue;
        setarray(arr);
        setheightdiff(maxValue - 500);
        
        const container = document.getElementById("array-container");
        if(container) {
             const numWidth = Math.floor(container.clientWidth / (NUMBER_OF_ARRAY_BARS * 3));
             setwidthofbar(numWidth);
        }
    }

    function handleCustomInputSubmit() {
        const newArr = userInput.split(',').map(str => {
            const num = Number(str.trim());
            return isNaN(num) ? null : num;
        }).filter(n => n !== null);

        if (newArr.length === 0) {
            alert("Please enter valid numbers.");
            return;
        }

        let maxValue = 0;
        newArr.forEach(val => maxValue = Math.max(maxValue, val));
        
        setarray(newArr);
        setheightdiff(maxValue - 500);
        setANIMATION_SPEED_MS(3500 / newArr.length);

        const container = document.getElementById("array-container");
        if (container) {
            const numWidth = Math.floor(container.clientWidth / (newArr.length * 3)); 
            setwidthofbar(numWidth > 0 ? numWidth : 1); 
        }

        setShowModal(false);
    }

    function handleChange(event) {
        const n = event.target.value;
        setNUMBER_OF_ARRAY_BARS(event.target.value);
        const val2 = 3500 / n;
        setANIMATION_SPEED_MS(val2);
    }

    function handleClick(event) {
        const selectedAlgo = event.target.innerText;
        setAlgorithm(selectedAlgo);
    }

    function visualizeAlgorithm() {
        if (algorithm === "Merge Sort") {
            MergeSortAnimation(array, PRIMARY_COLOR, SECONDARY_COLOR, ANIMATION_SPEED_MS);
        }
        else if (algorithm === "Quick Sort") {
            QuickSortAnimation(array, PRIMARY_COLOR, SECONDARY_COLOR, ANIMATION_SPEED_MS);
        }
        else if (algorithm === "Bubble Sort") {
            BubbleSortAnimation(array, PRIMARY_COLOR, SECONDARY_COLOR, ANIMATION_SPEED_MS);
        }
        else if (algorithm === "Insertion Sort") {
            InsertionSortAnimation(array, PRIMARY_COLOR, SECONDARY_COLOR, ANIMATION_SPEED_MS);
        }
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    return (
        <span>
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Set Custom Array</h3>
                        <p style={{fontSize: '14px', color: '#666'}}>Enter numbers separated by commas:</p>
                        <textarea 
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            placeholder="e.g. 100, 50, 200, 30, 45"
                        />
                        <div className="modal-actions">
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                            <button className="btn btn-primary" onClick={handleCustomInputSubmit}>OK</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="tool-bar">
                <button className="btn" onClick={resetArray}>Generate New Array</button>
                
                <input 
                    type="range" 
                    className="form-range" 
                    min="10" 
                    max="300" 
                    id="customRange3" 
                    value={NUMBER_OF_ARRAY_BARS} 
                    onChange={handleChange}
                ></input>

                <button className="btn" onClick={() => setShowModal(true)}>Set Custom Array</button>

                <button className={`btn ${algorithm === "Merge Sort" ? 'btn-selected' : ''}`} id="Merge Sort" onClick={handleClick}>Merge Sort</button>
                <button className={`btn ${algorithm === "Quick Sort" ? 'btn-selected' : ''}`} id="Quick Sort" onClick={handleClick}>Quick Sort</button>
                <button className={`btn ${algorithm === "Bubble Sort" ? 'btn-selected' : ''}`} id="Bubble Sort" onClick={handleClick}>Bubble Sort</button>
                <button className={`btn ${algorithm === "Insertion Sort" ? 'btn-selected' : ''}`} id="Insertion Sort" onClick={handleClick}>Insertion Sort</button>
                {algorithm !== "" && (
                    <button className="btn" style={{backgroundColor: '#28a745'}} onClick={visualizeAlgorithm}>Visualize {algorithm}!</button>
                )}
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
