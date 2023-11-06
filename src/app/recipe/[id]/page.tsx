import { api } from "~/trpc/server";
import Difficulty from "~/app/_components/Difficulty";
import RecipeStep from "~/app/_components/RecipeStep";

export default async function Page({ params }: { params: { id: string } }) {
  const recipe = await api.recipe.get.query({ id: params.id });
  if (!recipe) {
    return <div>404</div>;
  }

  return (
    <main className="container mx-auto p-4">
      <img
        className="h-96 w-2/3 rounded-lg object-cover shadow-lg"
        src="https://placekitten.com/500/300"
        alt="Recipe header"
      />
      <div className="flex items-center gap-2">
        <h1 className="text-lg font-bold">{recipe.name}</h1>
        <Difficulty difficulty={recipe.difficulty} />
      </div>
      <p>{recipe.description}</p>
      <div className="grid  grid-cols-2">
        {recipe.steps.map((step) => (
          <RecipeStep step={step} key={step.id} />
        ))}
      </div>
    </main>
  );
}
