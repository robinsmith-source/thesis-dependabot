"use client";
import { FaStar } from "react-icons/fa6";
import { RecipeDifficulty } from "@prisma/client";
import { ReactNode } from "react";

const difMapEnum = { EASY: 1, MEDIUM: 2, HARD: 3, EXPERT: 4 };
export default function Difficulty({
  difficulty,
}: {
  difficulty: RecipeDifficulty;
}): ReactNode {
  const difficultyInNumber = difMapEnum[difficulty];
  return (
    <>
      {Array.from(Array(difficultyInNumber), () => (
        <FaStar className={"mr-1 inline last:mr-0"} />
      ))}
    </>
  );
}
