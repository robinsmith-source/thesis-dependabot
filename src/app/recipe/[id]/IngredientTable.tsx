"use client";
import {
  Input,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Prisma, Unit } from "@prisma/client";
import { convertUnitName } from "~/app/utils";

const recipeWithIngredients = Prisma.validator<Prisma.RecipeStepDefaultArgs>()({
  include: { ingredients: true },
});

type RecipeStepWithIngredients = Prisma.RecipeStepGetPayload<
  typeof recipeWithIngredients
>;

type Ingredient = {
  name: string;
  quantity: number;
  unit: Unit | null;
};

export default function IngredientTable({
  recipeSteps,
  className,
}: {
  recipeSteps: RecipeStepWithIngredients[];
  className?: string;
}) {
  const [portionSize, setPortionSize] = useState<number>(1);
  const ingredientMap = new Map<string, Ingredient>();

  recipeSteps.forEach((step) => {
    step.ingredients.forEach((ingredient) => {
      const key = `${ingredient.name.toUpperCase()}-${ingredient.unit || ""}`;
      const existingIngredient = ingredientMap.get(key);

      if (existingIngredient) {
        existingIngredient.quantity += ingredient.quantity * portionSize;
      } else {
        ingredientMap.set(key, {
          ...ingredient,
          quantity: ingredient.quantity * portionSize,
        });
      }
    });
  });

  const summarizedIngredients = Array.from(ingredientMap.values()).reduce(
    (result: Ingredient[], ingredient) => {
      function convertUnit(
        convertedUnit: Unit | null,
        conversionFactor: number,
      ) {
        const existingIngredient = result.find(
          (item) =>
            item.name === ingredient.name && item.unit === convertedUnit,
        );

        if (existingIngredient) {
          existingIngredient.quantity +=
            ingredient.quantity >= 1000
              ? ingredient.quantity / conversionFactor
              : ingredient.quantity;
        } else if (ingredient.quantity >= 1000) {
          result.push({
            ...ingredient,
            quantity: ingredient.quantity / conversionFactor,
            unit: convertedUnit,
          });
        } else {
          result.push(ingredient);
        }
      }

      switch (ingredient.unit) {
        case "GRAM":
          convertUnit("KILOGRAM", 1000);
          break;
        case "MILLILITER":
          convertUnit("MILLILITER", 1000);
          break;
        default:
          result.push(ingredient);
      }
      return result;
    },
    [],
  );

  return (
    <>
      <Table
        aria-label="Ingredient Table"
        className={`max-w-xs py-4 ${className}`}
        hideHeader
        isCompact
      >
        <TableHeader>
          <TableColumn maxWidth={40}>Amount</TableColumn>
          <TableColumn minWidth={40}>Ingredient</TableColumn>
        </TableHeader>
        <TableBody>
          {summarizedIngredients.map((ingredient, index) => (
            <TableRow key={index}>
              <TableCell className="text-right">
                {ingredient.quantity} {convertUnitName(ingredient.unit)}
              </TableCell>
              <TableCell>{ingredient.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Input
        onValueChange={(value) => {
          setPortionSize(parseInt(value));
        }}
        size="sm"
        type="number"
        min={1}
        defaultValue={portionSize + ""}
        placeholder="required portion"
        className="w-40"
      />
    </>
  );
}
