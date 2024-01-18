import React from "react";

const buttons=document.getElementsByClassName("btn");

function Disable(){
    for(var i=0;i<buttons.length;i++){
      buttons[i].disabled=true;
    }
    document.getElementById("customRange3").disabled=true;
}

function Enable(time){
    setTimeout(() => {
        for(var i=0;i<buttons.length;i++){
        buttons[i].disabled=false;
      }
      document.getElementById("customRange3").disabled=false;
    },time);
}


export {Disable,Enable};