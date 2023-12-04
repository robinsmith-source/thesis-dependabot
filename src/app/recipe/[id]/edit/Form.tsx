"use client";

import { api } from "~/trpc/react";
import RecipeForm, { RecipeFormValues } from "../../_common/RecipeForm";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function Form({ recipe }: { recipe: RecipeFormValues }) {
  const router = useRouter();
  const mutation = api.recipe.create.useMutation({
    onSuccess: (id) => {
      toast.success("Recipe created!");
      router.push(`/recipe/${id}`);
    },
  });

  const onSubmit = (data: RecipeFormValues) => {
    mutation.mutate({
      name: data.name,
      description: data.description,
      difficulty: data.difficulty,
      tags: data.tags,
      images: data.images,
      steps: data.steps.map((step) => ({
        description: step.description,
        duration: step.duration,
        stepType: step.stepType,
        ingredients: step.ingredients.map((ingredient) => ({
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
        })),
      })),
    });
  };

  return (
    <>
      <Toaster />
      <RecipeForm submit={onSubmit} formValue={recipe} />
    </>
  );
}
