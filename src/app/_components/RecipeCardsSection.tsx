import RecipeCard, { type RecipeCardProps } from "~/app/_components/RecipeCard";

export default function RecipeCardsSection({
  className,
  recipes,
}: {
  className?: string;
  recipes: RecipeCardProps[];
}) {
  return (
    <>
      {recipes.length === 0 ? (
        <h3 className="text-warning-300">Oh no, you&apos;ll starve!</h3>
      ) : (
        <section
          className={`${className} grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}
        >
          {recipes.map((recipe) => <RecipeCard key={recipe.id} recipe={recipe} />)}
        </section>
      )}
    </>
  );
}