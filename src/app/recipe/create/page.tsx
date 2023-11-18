"use client";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import type { RecipeDifficulty, Recipe } from "@prisma/client";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import TagInput from "./tagInput";
import { api } from "~/trpc/react";
import "rsuite/dist/rsuite-no-reset.min.css";

export default function Page() {
  const schema = z.object({
    name: z.string().min(3, "Names must be at least 3 characters long"),
    description: z.string().nullable(),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD", "EXPERT"]),
    tags: z
      .array(
        z
          .string({ invalid_type_error: "Tags must be strings" })
          .regex(/^[a-z]+$/, "Tags can only contain lowercase characters"),
      )
      .max(10, "A recipe can only have 10 tags")
      .refine((items) => new Set(items).size === items.length, {
        message: "Must be an array of unique strings",
      }),
  });

  const { register, handleSubmit, control, reset, getValues } = useForm<Recipe>(
    {
      resolver: zodResolver(schema),
    },
  );

  const mutation = api.recipe.create.useMutation({
    onSuccess: () => {
      reset();
    },
  });

  const onSubmit = (data: Recipe) => {
    mutation.mutate({
      name: data.name,
      description: data.description,
      difficulty: data.difficulty,
      steps: [],
      tags: data.tags,
    });
  };

  return (
    <>
      <form>
        <div className="flex gap-4">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState }) => (
              <Input
                autoFocus
                isRequired
                label="Name"
                description="Enter recipe name"
                variant="bordered"
                {...field}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="difficulty"
            render={({ field, fieldState }) => (
              <Select
                label="Difficulty"
                description="Select recipe difficulty"
                variant="bordered"
                {...field}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              >
                {["EASY", "MEDIUM", "HARD", "EXPERT"].map((difficulty) => (
                  <SelectItem
                    key={difficulty}
                    value={difficulty as RecipeDifficulty}
                  >
                    {difficulty}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </div>

        <Controller
          control={control}
          name="description"
          render={({ fieldState }) => (
            <Textarea
              minRows={2}
              label="Description"
              description="Enter recipe description"
              variant="bordered"
              {...register("description", { required: false })}
              isInvalid={!!fieldState.error}
              errorMessage={fieldState.error?.message}
            />
          )}
        />

        {/* <Controller
          control={control}
          name="tags"
          render={({ field, fieldState }) => (
            <div>
              <TagInput
                trigger={["Enter", "Space", "Comma"]}
                placeholder="Enter tags"
                style={{ width: 300 }}
                menuStyle={{ width: 300 }}
                {...field}
              />
              {fieldState.error?.message}
            </div>
          )}
        />*/}

        <Controller
          control={control}
          name="tags"
          render={() => (
            <TagInput
              control={control}
              register={register}
              getValues={getValues}
            />
          )}
        />

        <Button color="primary" onClick={handleSubmit(onSubmit)}>
          Submit
        </Button>
      </form>
    </>
  );
}
