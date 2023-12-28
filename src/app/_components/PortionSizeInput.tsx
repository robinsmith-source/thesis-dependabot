"use client";
import { Input } from "@nextui-org/react";
import { usePortionSizeContext } from "~/utils/portion-size-provider";

export default function PortionSizeInput() {
  const { portionSize, setPortionSize } = usePortionSizeContext();
  return (
    <div className="flex flex-col items-center gap-4 md:flex-row">
      <span className="mb-2 md:mb-0">Ingredients for:</span>
      <Input
        onValueChange={(value) => {
          console.log(value);
          setPortionSize(parseInt(value));
        }}
        size="sm"
        type="number"
        min={0}
        defaultValue={portionSize + ""}
        placeholder="requiered portion"
        className="w-40"
      />
    </div>
  );
}
