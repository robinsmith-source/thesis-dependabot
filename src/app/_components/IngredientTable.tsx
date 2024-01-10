"use client";
import type { Selection } from "@nextui-org/react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { convertUnitName } from "~/app/utils";
import {
  calculateIngredients,
  type Ingredient,
} from "~/utils/IngredientCalculator";
import type { Unit } from "@prisma/client";

export default function IngredientTable({
  className,
  isSelectable = false,
  isPortionable = false,
  removeWrapper = false,
  ingredients,
  onSelect,
}: {
  className?: string;
  isSelectable?: boolean;
  isPortionable?: boolean;
  removeWrapper?: boolean;
  ingredients: {
    id: string;
    quantity: number;
    unit: Unit;
    name: string;
  }[];
  onSelect?: (selectedIngredients: Ingredient[]) => void;
}) {
  const [portionSize, setPortionSize] = useState<number>(1);
  const summarizedIngredients = calculateIngredients(ingredients, portionSize);

  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());
  const [shouldEmitSelection, setShouldEmitSelection] =
    useState<boolean>(false);

  const selectedIngredients =
    selectedKeys === "all"
      ? summarizedIngredients
      : summarizedIngredients.filter((_, index) =>
          selectedKeys.has(index.toString()),
        );

  useEffect(() => {
    if (!shouldEmitSelection) return;
    if (onSelect) {
      onSelect(selectedIngredients);
    }
    setShouldEmitSelection(false);
  }, [selectedIngredients, shouldEmitSelection, onSelect]);

  const ingredientsIds = summarizedIngredients
    .map((ingredient) => ingredient.id)
    .join(",");
  useEffect(() => {
    if (isSelectable) {
      setSelectedKeys(new Set());
    }
  }, [isSelectable, ingredientsIds]);

  function handleSelect(keys: Selection) {
    setSelectedKeys(keys);
    setShouldEmitSelection(true);
  }

  function handlePortionSize(count: number) {
    if (portionSize + count > 0) {
      setPortionSize(portionSize + count);
    }
  }

  return (
    <>
      {isPortionable && (
        <>
          <label
            htmlFor="quantity-input"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Choose portion size:
          </label>
          <div className="relative flex max-w-[8rem] items-center">
            <button
              type="button"
              id="decrement-button"
              onClick={() => {
                handlePortionSize(-1);
              }}
              data-input-counter-decrement="quantity-input"
              className="h-11 rounded-s-lg border border-gray-300 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <svg
                className="h-3 w-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h16"
                />
              </svg>
            </button>
            <input
              onChange={({ target }) => {
                const parsedValue = parseInt(target.value);
                if (!isNaN(parsedValue) && parsedValue > 0) {
                  setPortionSize(parsedValue);
                }
              }}
              type="text"
              id="quantity-input"
              value={portionSize + ""}
              data-input-counter
              disabled
              aria-describedby="helper-text-explanation"
              className="block h-11 w-full border-x-0 border-gray-300 py-2.5 text-center text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
            <button
              type="button"
              id="increment-button"
              onClick={() => {
                handlePortionSize(1);
              }}
              data-input-counter-increment="quantity-input"
              className="h-11 rounded-e-lg border border-gray-300 p-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 dark:border-gray-800 dark:hover:bg-gray-600 dark:focus:ring-gray-700"
            >
              <svg
                className="h-3 w-3 text-gray-900 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 1v16M1 9h16"
                />
              </svg>
            </button>
          </div>
        </>
      )}
      <Table
        aria-label="Ingredient Table"
        className={`max-w-xs ${className}`}
        selectionMode={isSelectable ? "multiple" : "none"}
        removeWrapper={removeWrapper}
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelect}
        isCompact
        isStriped
      >
        <TableHeader>
          <TableColumn maxWidth={40} className="text-right">
            Amount
          </TableColumn>
          <TableColumn minWidth={40}>Ingredient</TableColumn>
        </TableHeader>
        <TableBody>
          {summarizedIngredients.map((ingredient, index) => (
            <TableRow key={index}>
              <TableCell className="text-right">
                {`${ingredient.quantity} ${convertUnitName(ingredient.unit)}`}
              </TableCell>
              <TableCell>{ingredient.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
