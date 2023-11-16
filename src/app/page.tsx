import { api } from "~/trpc/server";
import RecipeCard from "~/app/_components/RecipeCard"
import {Button, Input, Link} from '@nextui-org/react';

export default async function Home() {
  const featuredRecipes = await api.recipe.getFeaturedRecipes.query({
    take: 6,
  });

    return (
        <main className="flex flex-col items-center">
            <div className="w-full flex flex-col items-center justify-center mb-4">
                {/* Goose chef logo */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="w-24 h-24 object-contain mb-4"
                    src="/images/Logo_round_V2.png"
                    alt="Logo"
                />
                <div className="flex flex-col items-end w-[40rem]">
                <Link href={"/recipes/public/advanced"} color="secondary">Advanced</Link>
                <Input className="mb-4"
                    type="text"
                    //value={searchQuery}
                    //onChange={(e) => setSearchQuery(e.target.value)}
                    //onKeyPress={handleKeyPress}
                    placeholder="Search recipes..."
                    //bordered
                    //size="large"
                    fullWidth
                />
            </div>
            </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
            {featuredRecipes ? (
              featuredRecipes.map((recipe) => (
                <RecipeCard recipeId={recipe.id} key={recipe.id} />
              ))
            ) : (
              <h2>No recipes found...</h2>
            )}
          </div>
        </main>
    );
}
