import type { Prisma } from "@prisma/client";
import DurationDisplay from "~/app/_components/DurationDisplay";

type RecipeStep = Prisma.RecipeStepGetPayload<{
  include: { ingredients: true };
}>;

export default function RecipeStep({ step }: { step: RecipeStep }) {
  return (
    <>
      <div>
        <ul>
          {step.ingredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.name}</li>
          ))}
        </ul>
        <DurationDisplay duration={step.duration} />
      </div>
      <p>{step.description}</p>
    </>
  );
}
