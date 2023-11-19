"use client";
import { Button, Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import type { Recipe, RecipeDifficulty } from "@prisma/client";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import TagInput from "./tagInput";
import { api } from "~/trpc/react";

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

  const methods = useForm<Recipe>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      difficulty: "EASY",
      tags: [],
    },
  });

  const mutation = api.recipe.create.useMutation({
    onSuccess: () => {
      methods.reset({
        name: "",
        description: "",
        difficulty: "EASY",
        tags: [],
      });
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
      <FormProvider {...methods}>
        <form>
          <div className="flex gap-4">
            <Controller
              control={methods.control}
              name="name"
              render={({ fieldState }) => (
                <Input
                  isRequired
                  autoFocus
                  label="Name"
                  description="Enter recipe name"
                  variant="bordered"
                  {...methods.register("name", { required: true })}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                />
              )}
            />

            <Controller
              control={methods.control}
              name="difficulty"
              render={({ field, fieldState }) => (
                <Select
                  isRequired
                  label="Difficulty"
                  description="Select recipe difficulty"
                  variant="bordered"
                  {...methods.register("difficulty", { required: true })}
                  isInvalid={!!fieldState.error}
                  errorMessage={fieldState.error?.message}
                  selectedKeys={[field.value]}
                >
                  {["EASY", "MEDIUM", "HARD", "EXPERT"].map((difficulty) => (
                    <SelectItem
                      key={difficulty}
                      value={difficulty as RecipeDifficulty | ""}
                    >
                      {difficulty}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>

          <Controller
            control={methods.control}
            name="description"
            render={({ fieldState }) => (
              <Textarea
                minRows={2}
                label="Description"
                description="Enter recipe description"
                variant="bordered"
                {...methods.register("description", { required: false })}
                isInvalid={!!fieldState.error}
                errorMessage={fieldState.error?.message}
              />
            )}
          />

          <Controller
            control={methods.control}
            name="tags"
            render={() => <TagInput />}
          />

          <Button color="primary" onClick={methods.handleSubmit(onSubmit)}>
            Submit
          </Button>
        </form>
      </FormProvider>
    </>
  );
}
