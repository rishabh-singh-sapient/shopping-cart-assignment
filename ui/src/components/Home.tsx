import React, { useEffect, useState } from "react";
import useHttp from "../hooks/useHttp";
import Tab from "../Layouts/Tab";
import Loader from "./Loader";
import { CategoryModel } from "../models/CategoryModel";
import ErrorPage from "./ErrorPage";

export default function Home() {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const { fetchData, loading, error } = useHttp();

  const categoriesHandler = (data: CategoryModel[]) => {
    setCategories(data);
  };

  useEffect(() => {
    const reqConfig = {
      keyword: "categories",
    };
    fetchData(reqConfig, categoriesHandler);
  }, [fetchData]);

  const CategoriesItem = categories
    .sort((a: CategoryModel, b: CategoryModel) => (a.order > b.order ? 1 : -1))
    .filter((c: CategoryModel) => c.enabled)
    .map((c: CategoryModel) => (
      <Tab key={c.id} category={c} buttonText={c.key} />
    ));

  let content = <Loader />;
  if (error) {
    content = <ErrorPage err={error} />;
  }
  if (!loading && !error) {
    content = <main className="pb-4">{CategoriesItem}</main>;
  }

  return content;
}
