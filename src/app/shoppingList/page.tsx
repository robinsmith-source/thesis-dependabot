import { api } from "~/trpc/server";
import ShoppingListTable from "~/app/shoppingList/ShoppingListTable";

export const dynamic = "force-dynamic";
export default async function Page() {
  const shoppingLists = await api.shoppingList.getAllTableData.query();
  return (
    <main>
      <h1>Shopping Lists</h1>
      <section className="grid grid-cols-1 place-items-center items-center justify-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {shoppingLists.map((shoppingList) => (
          <ShoppingListTable
            shoppingList={shoppingList}
            key={shoppingList.id}
          />
        ))}
      </section>
    </main>
  );
}
