import { api } from "~/trpc/server";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  const user = await api.user.get.query({ id: params.id });
  if (!user) {
    return <div>404</div>;
  }

  return (
    <main className="container mx-auto">
      <div className="flex items-center justify-between pt-4">
        <h1 className="text-lg font-bold">{user.name}</h1>
        {user.image ? (
          <img
            src={user.image}
            alt="profile picture"
            width={64}
            height={64}
            className="rounded-full"
          />
        ) : (
          <p>no image</p>
        )}
      </div>

      <ul className="pt-8">
        {user.recipes.map((recipe) => (
          <div
            key={recipe.id}
            className="flex flex-col gap-2 rounded-xl bg-blue-400 p-4 hover:bg-blue-300"
          >
            <Link href={`../../recipe/${recipe.id}`}>
              <h2 className="text-2xl font-bold">{recipe.name}</h2>
              <p className="text-lg">{recipe.description}</p>
            </Link>
          </div>
        ))}
      </ul>
    </main>
  );
}
