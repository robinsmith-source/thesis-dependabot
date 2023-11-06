import React from "react";
import Link from "next/link";
import Difficulty from "~/app/_components/Difficulty";
import type { Prisma } from "@prisma/client";
import type { api } from "~/trpc/server";

type Recipe = Prisma.PromiseReturnType<typeof api.recipe.get.query>;

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  if (!recipe) {
    return null;
  }
  return (
    <Link
      href={`/recipe/${recipe.id}`}
      className="relative block h-64 overflow-hidden rounded-xl bg-gray-100 bg-cover bg-center shadow-md transition-shadow hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-400"
      style={{ backgroundImage: "url(https://placekitten.com/500/200)" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent from-50% to-gray-700/70"></div>

      <div className="absolute inset-0 flex h-full flex-col justify-end p-4 text-white">
        <div className="space-x-2">
          <span className="text-xl font-bold">{recipe.name}</span>
          <Difficulty difficulty={recipe.difficulty} />
        </div>
        <p>{recipe.description}</p>
      </div>
    </Link>
  );
}
