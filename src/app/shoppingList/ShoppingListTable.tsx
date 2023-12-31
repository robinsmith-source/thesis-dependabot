"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { convertUnitName } from "~/app/utils";
import type { ShoppingList, ShoppingListItem } from "@prisma/client";
import ShoppingListFormHandler, {
  Modes,
} from "~/app/recipe/[id]/ShoppingListFormHandler";

interface ShoppingListTableProps {
  shoppingList: ShoppingList & {
    items: ShoppingListItem[];
  };
}

export default function ShoppingListTable({
  shoppingList,
}: ShoppingListTableProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-8">
        <h2>{shoppingList.name}</h2>
        <ShoppingListFormHandler
          mode={Modes.EDIT}
          shoppingList={
            shoppingList as { id: string; name: string; description: string }
          }
        />
      </div>
      <p>{shoppingList.description}</p>

      <Table
        aria-label="Ingredient Table"
        className="w-64 py-4"
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
          {shoppingList.items.map((ingredient, index) => (
            <TableRow key={index}>
              <TableCell className="text-right">
                {`${ingredient.quantity} ${convertUnitName(ingredient.unit)}`}
              </TableCell>
              <TableCell>{ingredient.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
