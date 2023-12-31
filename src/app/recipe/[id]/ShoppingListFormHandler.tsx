"use client";
import { api } from "~/trpc/react";
import toast from "react-hot-toast";
import { Button, useDisclosure } from "@nextui-org/react";
import ShoppingListFormModal from "~/app/_components/ShoppingListFormModal";
import { FaPenToSquare, FaPlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";

export enum Modes {
  CREATE,
  EDIT,
}

export type ShoppingListFormType = {
  name: string;
  description?: string | null;
};

interface ShoppingListFormHandlerProps {
  mode: Modes;
  shoppingList?: {
    id: string;
    name: string;
    description?: string | null;
  } | null;
}

export default function ShoppingListFormHandler({
  mode,
  shoppingList,
}: ShoppingListFormHandlerProps) {
  if (mode === Modes.EDIT && !shoppingList) {
    throw new Error(
      "Shopping list form handler in edit mode requires a shopping list",
    );
  }
  const { onOpen, isOpen, onOpenChange, onClose } = useDisclosure();
  const router = useRouter();

  const onCreate = (data: ShoppingListFormType) => {
    createMutation.mutate({
      name: data.name,
      description: data.description ?? "",
    });
  };

  const createMutation = api.shoppingList.create.useMutation({
    onSuccess: () => {
      toast.success("Shopping list submitted successfully");
      router.refresh();
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const onEdit = (data: ShoppingListFormType) => {
    if (!shoppingList) {
      throw new Error("No shopping list provided");
    }
    editMutation.mutate({
      shoppingListId: shoppingList.id,
      name: data.name,
      description: data.description ?? "",
    });
  };

  const editMutation = api.shoppingList.update.useMutation({
    onSuccess: () => {
      toast.success("Shopping list edited successfully");
      router.refresh();
      onClose();
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return (
    <>
      {mode === Modes.CREATE ? (
        <Button isIconOnly color="success" onPress={onOpen}>
          <FaPlus />
        </Button>
      ) : (
        <Button isIconOnly color="success" onPress={onOpen}>
          <FaPenToSquare />
        </Button>
      )}

      <ShoppingListFormModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        formValue={
          mode === Modes.EDIT
            ? {
                id: shoppingList?.id ?? "",
                name: shoppingList?.name ?? "",
                description: shoppingList?.description ?? null,
              }
            : null
        }
        submit={mode === Modes.CREATE ? onCreate : onEdit}
      />
    </>
  );
}
