import { api } from "~/trpc/server";
import { Image } from "@nextui-org/react";
import NextImage from "next/image";
import RecipeCardsSection from "~/app/_components/RecipeCardsSection";
import { FadeIn } from "~/app/lib/animations/FadeIn";

export const dynamic = "force-dynamic";

export default async function Home() {
  const featuredRecipes = await api.recipe.getRecipeCards.query({
    take: 4,
    //Sort by total rating or something
  });
  const latestRecipes = await api.recipe.getRecipeCards.query({
    take: 4,
    orderBy: "NEWEST",
  });

  return (
    <main className="flex flex-col items-center">
      <FadeIn>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="ml-5">
            <h1 className="text-7xl font-bold">Welcome to Goose Chef!</h1>
            <p className="mt-8 text-4xl font-semibold">
              The cooking website with your favourite Recipes!
            </p>
            <p className="mt-8 text-2xl">
              Add your own Recipes, share them with Friends and Family. Or
              explore new Recipes from other Cooking-Enthusiasts!
            </p>
          </div>
          <div className="mb-4 flex justify-center">
            {/* Goose chef logo */}
            <Image
              as={NextImage}
              width={500}
              height={500}
              src="/images/goose_chef_paperbag.png"
              alt="Logo"
              className="h-120 w-120 mb-2 object-contain"
            />
          </div>
        </div>
      </FadeIn>

      <section className="flex h-screen flex-col items-start justify-center gap-32">
        <FadeIn direction="left">
          <div className="mb-4 text-start">
            <h2 className="text-4xl font-semibold">Featured Recipes</h2>
            <h2 className="text-2xl font-light text-foreground-600">
              Here are some of our favourite Recipes!
            </h2>
          </div>
          <RecipeCardsSection recipes={featuredRecipes} layout="flex" />
        </FadeIn>

        <FadeIn direction="left">
          <div className="mb-4 text-start">
            <h2 className="text-4xl font-semibold"> Latest Recipes </h2>
            <h2 className="text-2xl font-light text-foreground-600">
              Here are some of our latest Recipes!
            </h2>
          </div>
          <RecipeCardsSection recipes={latestRecipes} layout="flex" />
        </FadeIn>
      </section>
    </main>
  );
}
