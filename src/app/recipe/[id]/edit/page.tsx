import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import Form from "./Form";

export default async function Page({ params }: { params: { id: string } }) {
  const session = await getServerAuthSession();
  const recipe = await api.recipe.get.query({
    id: params.id,
  });

  if (!recipe || !session || recipe.authorId !== session?.user.id) {
    return "NOIDONTTHINKSO";
  }
  return <Form recipe={recipe} />;
}
