export const MIN_ANIMATION_SPEED = 100;
export const MAX_ANIMATION_SPEED = 400; 
import {SelectOptionsType,SortingAlgorithmType} from "./types"
import {generateBubbleSortAnimationArray} from "@/Algorithms/Bubble"
import {generateQuickSortAnimationArray} from "@/Algorithms/Qucik"
import{generateMergeSortAnimationArray} from "@/Algorithms/Merge"
import{generateInsertionSortAnimationArray} from "@/Algorithms/Insertions"
import {generateSelectionSortAnimationArray} from "@/Algorithms/Selection"
 
export function generateRandomNumber(min:number, max:number){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export const  algorithmOptions: SelectOptionsType[]  = [
  { label: "Bubble", value: "bubble" },
  { label: "Quick", value: "quick" },
  { label: "Merge", value: "merge" },
  { label: "Insertion", value: "insertion" },
  { label: "Selection", value: "selection" },
]

export function generateAnimationArray(
  selectedAlgorithm: SortingAlgorithmType,
  isSorting: boolean,
  array: number[],
  runAnimation: (animations: [number[], boolean][]) => void
) {
  switch (selectedAlgorithm) {
    case "bubble":
      generateBubbleSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "quick":
      generateQuickSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "merge":
      generateMergeSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "insertion":
      generateInsertionSortAnimationArray(isSorting, array, runAnimation);
      break;
    case "selection":
      generateSelectionSortAnimationArray(isSorting, array, runAnimation);
      break;
    default:
      break;
  }
}