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
import { Prisma } from "@prisma/client";
import { convertUnitName } from "~/app/utils";
import { calculateIngredients } from "~/utils/IngredientCalculator";

const recipeWithIngredients = Prisma.validator<Prisma.RecipeStepDefaultArgs>()({
  include: { ingredients: true },
});

type RecipeStepWithIngredients = Prisma.RecipeStepGetPayload<
  typeof recipeWithIngredients
>;

export default function IngredientTable({
  recipeSteps,
  className,
}: {
  recipeSteps: RecipeStepWithIngredients[];
  className?: string;
}) {
  const [portionSize, setPortionSize] = useState<number>(1);
  const ingredients = recipeSteps.flatMap((step) => step.ingredients);
  const result = calculateIngredients(ingredients, portionSize);

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
          {result.map((ingredient, index) => (
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
