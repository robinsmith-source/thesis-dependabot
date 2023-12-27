"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Button } from "@nextui-org/react";
import { FaTrash } from "react-icons/fa6";
import { api } from "~/trpc/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export default function ConfirmationButton({ recipeId }: { recipeId: string }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  async function handleDelete() {
    deleteMutation.mutate({
      id: recipeId,
    });
  }

  const router = useRouter();
  const deleteMutation = api.recipe.delete.useMutation({
    onSuccess: () => {
      console.log("deleted");
      toast.success("Recipe deleted");
      router.push("/");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to delete recipe");
    },
  });
  return (
    <>
      <Button onPress={onOpen} isIconOnly>
        <FaTrash />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Delete Recipe
              </ModalHeader>
              <ModalBody>
                <p>Are you sure to delete this?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={handleDelete}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
