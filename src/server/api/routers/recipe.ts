import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const recipeRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(({ input, ctx }) => {
      return ctx.db.recipe.findFirst({
        where: { id: input.id },
        include: {
          steps: {
            include: {
              ingredients: true,
            },
          },
          reviews: {
            include: {
              author: true,
            },
          },
          labels: true,
        },
      });
    }),
  create: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().nullable(),
        requiredUtensils: z.array(z.string()),
        difficulty: z.enum(["EASY", "MEDIUM", "HARD", "EXPERT"]),
        steps: z.array(
          z.object({
            description: z.string(),
            duration: z.number().min(0), //may be changed to 1
            stepType: z.enum(["PREP", "COOK", "REST"]),
            ingredients: z.array(
              z.object({
                name: z.string().min(0), //may be changed to 1
                quantity: z.number().min(0), //may be changed to 1
                unit: z.string().optional(),
              }),
            ),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.recipe.create({
        data: {
          name: input.name,
          description: input.name,
          requiredUtensils: input.requiredUtensils,
          difficulty: input.difficulty,
          steps: {
            createMany: {
              data: input.steps.map((step) => ({
                description: step.description,
                duration: step.duration,
                stepType: step.stepType,
                ingredients: {
                  createMany: {
                    data: step.ingredients.map((ingredient) => ({
                      name: ingredient.name,
                      quantity: ingredient.quantity,
                      unit: ingredient.unit,
                    })),
                  },
                },
              })),
            },
          },
          author: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.recipe.findFirst({
      orderBy: { createdAt: "desc" },
      where: { author: { id: ctx.session.user.id } },
    });
  }),

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.recipe.findMany({
      orderBy: { createdAt: "desc" },
      where: { author: { id: ctx.session.user.id } },
    });
  }),
});
