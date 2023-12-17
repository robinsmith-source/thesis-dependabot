import { Chip } from "@nextui-org/react";
import { RecipeStepType } from "@prisma/client";
import {
  FaFireAlt,
  FaHandPointRight,
  FaHandSparkles,
  FaRegClock,
  FaUtensils,
  FaUtensilSpoon,
} from "react-icons/fa";

export default function StepTypeChip({
  stepType,
}: {
  stepType: RecipeStepType;
}) {
  let stepIcon = <></>;
  switch (stepType) {
    case RecipeStepType.REST:
      stepIcon = <FaRegClock></FaRegClock>;
      break;
    case RecipeStepType.COOK:
      stepIcon = <FaFireAlt></FaFireAlt>;
      break;
    case RecipeStepType.PREP:
      stepIcon = <FaHandPointRight></FaHandPointRight>;
      break;
    case RecipeStepType.SERVE:
      stepIcon = <FaUtensils></FaUtensils>;
      break;
    case RecipeStepType.MIX:
      stepIcon = <FaUtensilSpoon></FaUtensilSpoon>;
      break;
    case RecipeStepType.SEASON:
      stepIcon = <FaHandSparkles></FaHandSparkles>;
      break;
  }
  return <Chip className="capitalize">{stepIcon}</Chip>;
}
