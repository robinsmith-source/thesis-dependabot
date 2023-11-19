import { Chip, Input } from "@nextui-org/react";
import React, { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function TagInput() {
  const methods = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "tags",
  });
  const fieldState = methods.getFieldState("tags");

  const [inputValue, setInputValue] = useState<string>("");
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" || event.key === " " || event.key === ",") {
      event.preventDefault();
      addTag();
    }
    if (event.key === "Backspace" && inputValue === "" && fields.length > 0) {
      remove(fields.length - 1);
    }
  };

  const addTag = async () => {
    if (inputValue.trim() !== "") {
      append(inputValue.trim());
      await methods.trigger("tags");
      setInputValue("");
    }
  };

  const handleClose = (tagToRemove: number) => {
    remove(tagToRemove);
  };

  // @ts-ignore Unfortunately due to the way zod validation works this is an array of potential errors or null
  const errorMessage = fieldState?.error?.filter((e) => !!e)?.[0]?.message;

  console.log(fieldState);
  return (
    <>
      <Input
        type="text"
        label="Tags"
        labelPlacement="outside"
        size="lg"
        className="mb-2"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        isInvalid={!!fieldState?.invalid && errorMessage}
        errorMessage={errorMessage}
        variant="bordered"
        startContent={
          fields.length > 0 ? (
            <div className="flex items-center gap-2">
              {fields.map((field, index) => (
                <Chip
                  key={field.id}
                  onClose={() => handleClose(index)}
                  color="secondary"
                  variant="faded"
                  {...methods.register(`tags.${index}`)}
                >
                  {methods.getValues(`tags.${index}`)}
                </Chip>
              ))}
            </div>
          ) : null
        }
        placeholder={
          fields.length === 0 ? "Enter tags, separated by comma" : ""
        }
      />
    </>
  );
}
