"use client"
import {Select} from "@/components/input/Select"
import {Slider} from "@/components/input/Slider";
import { useSortingAlgorithmContext } from "@/context/Visulizer";
import { algorithmOptions , generateAnimationArray} from "@/lib/utils";
import {SortingAlgorithmType} from "@/lib/types"
import React from 'react'; 
import { RxReset } from "react-icons/rx";
import { FaPlayCircle } from "react-icons/fa";
export default function Home() {
   const {
      arrayToSort,
      isSorting,
      setAnimationSpeed,
      animationSpeed,
      selectedAlgorithm,
      setSelectedAlgorithm,
      requiresReset,
      resetArrayAndAnimation,
      runAnimation,
      
    } = useSortingAlgorithmContext();

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
      setSelectedAlgorithm(e.target.value as SortingAlgorithmType);
    }

    const handlePlay = () =>{
      if(requiresReset){
        resetArrayAndAnimation();
        return;
      }
      
      //generate animation array

      generateAnimationArray(
        selectedAlgorithm,
        isSorting,
        arrayToSort,
        runAnimation
      );

      
    }

  return (
    <main className="absolute top-0 h-screen w-screen z-[-2] bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#150229_1px)] bg-[size:40px_40px]">
      <div className="flex h-full justify-center">
        <div
          id="content-container"
          className="flex max-w-[1020px] w-full flex-col lg:px-0 px-4"
        >
          <div className="h-[66px] relative flex items-center justify-between w-full">
            <h1 className="text-gray-300 text-2xl font-light hidden md:flex">
              Sorting Visulizer
            </h1>
            <div className="flex items-center justify-center gap-4">
              
              <Slider
                isDisabled={isSorting}
                value={animationSpeed}
                handleChange={(e) => setAnimationSpeed(Number(e.target.value))}
              />
                 <Select
                    options={algorithmOptions}
                    defaultValue={selectedAlgorithm}
                    onChange={handleSelectChange}
                    isDisabled={isSorting}
                  />
              <button
                className="flex items-center justify-center"
                onClick={handlePlay}
              >
                {requiresReset ? (
                  <RxReset className="text-gray-400 h-8 w-8" />
                ) : (
                  <FaPlayCircle className="text-system-green60 h-8 w-8" />
                )}
              </button>
            </div>

           
          </div>
          <div className="relative h-[calc(100vh-66px)] w-full">
            <div className="absolute bottom-[32px] w-full mx-auto left-0 right-0 flex justify-center items-end">
              {arrayToSort.map((value, index) => (
                <div
                  key={index}
                  className="array-line relative w-1 mx-0.5 shadow-lg opacity-70 rounded-lg default-line-color"
                  style={{ height: `${value}px` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
