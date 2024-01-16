"use client";

import {
  Button,
  Card,
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { FaFilter, FaMagnifyingGlass } from "react-icons/fa6";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import DifficultyInput from "./DifficultyInput";
import LabelSelect from "./LabelSelect";
import { useState } from "react";
import { motion } from "framer-motion";

type AdvancedRecipeSearchProps = {
  categories: { name: string; RecipeLabel: { name: string }[] }[];
};

export default function AdvancedRecipeSearch({
  categories,
}: AdvancedRecipeSearchProps) {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = useDebouncedCallback(
    (name?: string, order?: string, pageSize?: string) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1");

      name ? params.set("name", name) : params.delete("name");
      order ? params.set("order", order) : params.delete("order");
      pageSize
        ? params.set("pageSize", pageSize)
        : params.delete("pageSize");

      router.replace(`${pathname}?${params.toString()}`);
    },
    333,
  ); // debounce in ms

  const [isCollapsed, setIsCollapsed] = useState(true);
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="mb-3 w-full justify-center">
      <Card>
        <div className="m-2 flex flex-row items-center justify-between space-x-2">
          <Button
            size="lg"
            variant="flat"
            color="secondary"
            startContent={<FaFilter />}
            onClick={() => toggleCollapse()}
          >
            Filters
          </Button>
          <Input
            type="text"
            className="w-1/2"
            defaultValue={searchParams.get("name")?.toString()}
            startContent={<FaMagnifyingGlass className="mr-1" />}
            placeholder="Search recipes"
            onValueChange={(value: string) =>
              handleSearch(
                value,
                searchParams.get("order") ?? "",
                searchParams.get("pageSize") ?? ""
              )
            }
          />
          <span className="whitespace-nowrap font-extralight">Sort By</span>
          <Select
            fullWidth={false}
            size="sm"
            className="w-32"
            selectionMode="single"
            defaultSelectedKeys={searchParams.get("order") ?? "NEWEST"}
            onSelectionChange={(value) =>
              handleSearch(
                searchParams.get("name") ?? "",
                Array.from(value)[0]?.toString() ?? "",
                searchParams.get("pageSize") ?? "",
              )
            }
          >
            <SelectItem key="NEWEST" value="NEWEST">
              newest
            </SelectItem>
            <SelectItem key="OLDEST" value="OLDEST">
              oldest
            </SelectItem>
          </Select>
          <span className="whitespace-nowrap font-extralight">
            Items per page
          </span>
          <Select
            fullWidth={false}
            size="sm"
            className="w-24"
            selectionMode="single"
            onSelectionChange={(value) =>
              handleSearch(
                searchParams.get("name") ?? "",
                searchParams.get("order") ?? "",
                Array.from(value)[0]?.toString(),
              )
            }
          >
            <SelectItem key="4" value="4">
              4
            </SelectItem>
            <SelectItem key="6" value="6">
              6
            </SelectItem>
            <SelectItem key="12" value="12">
              12
            </SelectItem>
          </Select>
        </div>
        <motion.div
          className="mx-4 mb-2 flex w-full flex-row items-center justify-between"
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: !isCollapsed ? 1 : 0,
            height: !isCollapsed ? "auto" : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex w-1/2 flex-row items-center justify-start">
            <span className="font-bold text-default-600">Difficulty</span>
            <DifficultyInput />
          </div>
          <div className="mr-5 flex w-1/2 flex-row items-center justify-start">
            <span className="font-bold text-default-600">Labels</span>
            <LabelSelect categories={categories} className="ml-2 w-2/3" />
          </div>
        </motion.div>
      </Card>
    </div>
  );
}
