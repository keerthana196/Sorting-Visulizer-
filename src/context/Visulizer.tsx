"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { SortingAlgorithmType } from "@/lib/types";
import { MAX_ANIMATION_SPEED } from "@/lib/utils";
import { useRef } from "react";
import { generateRandomNumber } from "@/lib/utils"; 
import { AnimationArrayType }  from "@/lib/types"
// yarn dev 
interface SortingAlgorithmContextType{   //obj 
    arrayToSort: number[];
    selectedAlgorithm: SortingAlgorithmType;
    isSorting: boolean;
    setSelectedAlgorithm: (algorithm: SortingAlgorithmType) => void;  // way of declaring the functions (parms: type) => return type 
    setIsSorting: (isSorting: boolean) => void;
    animationSpeed: number;
    setAnimationSpeed: (speed: number) => void;
    resetArrayAndAnimation: () => void;
    runAnimation: (animations: AnimationArrayType) => void;
    isAnimationComplete: boolean;
    requiresReset: boolean;
}

const SortingAlgorithmContext = createContext<SortingAlgorithmContextType | undefined>(undefined)

export const SortingAlgorithmProvider = ({children}:{children: React.ReactNode}) =>{
    const[arrayToSort,setArrayToSort] = useState<number[]>([100,21,34,55,22,75,10,120,334,222,5,123,4,211]); // arr of elements
    const[selectedAlgorithm,setSelectedAlgorithm]  = useState<SortingAlgorithmType>("bubble")
    const[isSorting,setIsSorting] = useState<boolean>(false);
    const[isAnimationComplete,setIsAnimationComplete] = useState<boolean>(false);
    const[animationSpeed,setAnimationSpeed] = useState<number>(MAX_ANIMATION_SPEED);
    const requiresReset = isAnimationComplete || isSorting;
    

    useEffect(() =>{
        resetArrayAndAnimation();
        window.addEventListener("resize",resetArrayAndAnimation);
        // check this later
        // return() =>{
        //     window.removeEventListener("resize",resetArrayAndAnimation);
        // }
    },[])

    const resetArrayAndAnimation = () =>{
      const conentConatiner = document.getElementById("content-container");
      if(!conentConatiner) return;

      const temp: number[] = []; 
      const conentConatinerWidth = conentConatiner.clientWidth;
      let numLines = conentConatinerWidth/8;
      const numLinesheigth = Math.max(window.innerHeight-420,100);
      for(let i =0;i<=numLines;i++){
          temp.push(generateRandomNumber(50,numLinesheigth));
      }

      setArrayToSort(temp);
      setIsSorting(false);
      setIsAnimationComplete(false);

      const highestId = window.setTimeout(() => {
        for (let i = highestId; i >= 0; i--) {
          window.clearInterval(i);
        }
      }, 0);
  
      setTimeout(() => {
        const arrLines = document.getElementsByClassName("array-line");
        for (let i = 0; i < arrLines.length; i++) {
          arrLines[i].classList.remove("change-line-color");
          arrLines[i].classList.add("default-line-color");
        }
      }, 0);

    }

    const runAnimation = (animations: AnimationArrayType) => {
      setIsSorting(true);
  
      const inverseSpeed = (1 / animationSpeed) * 200;
      const arrLines = document.getElementsByClassName(
        "array-line"
      ) as HTMLCollectionOf<HTMLElement>;
  
      const updateClassList = (
        indexes: number[],
        addClassName: string,
        removeClassName: string
      ) => {
        indexes.forEach((index) => {
          arrLines[index].classList.add(addClassName);
          arrLines[index].classList.remove(removeClassName);
        });
      };
  
      const updateHeightValue = (
        lineIndex: number,
        newHeight: number | undefined
      ) => {
        arrLines[lineIndex].style.height = `${newHeight}px`;
      };
  
      animations.forEach((animation, index) => {
        setTimeout(() => {
          const [lineIndexes, isSwap] = animation;
          if (!isSwap) {
            updateClassList(
              lineIndexes,
              "change-line-color",
              "default-line-color"
            );
            setTimeout(
              () =>
                updateClassList(
                  lineIndexes,
                  "default-line-color",
                  "change-line-color"
                ),
              inverseSpeed
            );
          } else {
            const [lineIndex, newHeight] = lineIndexes;
            updateHeightValue(lineIndex, newHeight);
          }
        }, index * inverseSpeed);
      });
    }

    const value= {
      arrayToSort,
      selectedAlgorithm,
      setSelectedAlgorithm,
      isSorting,
      setIsSorting,
      animationSpeed,
      setAnimationSpeed,
      isAnimationComplete,
      resetArrayAndAnimation,
      runAnimation,
      requiresReset,
    }

    return (
        <SortingAlgorithmContext.Provider value={value}>
          {children}
        </SortingAlgorithmContext.Provider>
      );
}

export const useSortingAlgorithmContext = (): SortingAlgorithmContextType => {
    const context = useContext(SortingAlgorithmContext);
    if (context === undefined) {
      throw new Error(
        "useSortingAlgorithmContext must be used within a SortingAlgorithmProvider"
      );
    }
    return context;
};