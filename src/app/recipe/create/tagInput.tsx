import { Chip, Input } from "@nextui-org/react";
import { useState } from "react";
import {
  Control,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
} from "react-hook-form";
import { Recipe } from "@prisma/client";

interface TagInputProps {
  control: Control<Recipe>;
  register: UseFormRegister<Recipe>;
  getValues: UseFormGetValues<Recipe>;
}
export default function TagInput({
  control,
  register,
  getValues,
}: TagInputProps) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "tags",
  });

  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === " " || event.key === ",") {
      event.preventDefault();
      addTag();
    }
  };

  const addTag = () => {
    if (inputValue.trim() !== "") {
      append(inputValue.trim());
      setInputValue("");
    }
  };

  const handleClose = (tagToRemove: number) => {
    remove(tagToRemove);
  };

  return (
    <>
      <Input
        type="text"
        label="Tags"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
      />
      <div className="flex gap-2">
        {fields.map((field, index) => (
          <Chip
            key={field.id}
            onClose={() => handleClose(index)}
            color="secondary"
            variant="faded"
            {...register(`tags.${index}`)}
          >
            {getValues(`tags.${index}`)}
          </Chip>
        ))}
      </div>
    </>
  );
}
