"use client";

import React from "react";
import { Card } from "../ui/card";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "../ui/input-group";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const search = data.searchField;

    const params = new URLSearchParams();
    params.set("search", search as string);
    router.push(`/browse-jobs?${params.toString()}`);
  };

  return (
    <Card
      aria-label="Job search"
      className="gap-0 rounded-xl border border-black/8 bg-white p-2 ring-0 dark:border-white/6 dark:bg-[#0e0e0e]"
    >
      <form
        onSubmit={handleSearch}
        className="flex flex-col gap-2 sm:flex-row sm:items-center"
      >
        <InputGroup className="h-11 flex-1 rounded-lg border-black/10 bg-transparent dark:border-white/8 dark:bg-transparent">
          <InputGroupAddon className="pl-2.5 text-neutral-400 dark:text-white/35">
            <Search aria-hidden />
          </InputGroupAddon>
          <InputGroupInput
            type="search"
            name="searchField"
            aria-label="Search by job title, keywords, or company"
            placeholder="Search by job title, keywords..."
            className="text-sm placeholder:text-neutral-400 dark:placeholder:text-white/30"
          />
        </InputGroup>

        <Button
          type="submit"
          className="h-11 shrink-0 rounded-lg bg-neutral-900 px-6 text-sm font-semibold text-white hover:bg-neutral-800 dark:bg-white dark:text-neutral-900 dark:hover:bg-white/90"
        >
          Search Jobs
        </Button>
      </form>
    </Card>
  );
};

export default SearchBar;
