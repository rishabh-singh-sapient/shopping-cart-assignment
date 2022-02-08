import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { StoreProducts } from "../actions/actions";
import useHttp from "../hooks/useHttp";
import { IStoreData } from "../interfaces/IStoreData";
import { CategoryModel } from "../models/CategoryModel";
import { ProductModel } from "../models/ProductModel";
import ErrorPage from "./ErrorPage";
import Loader from "./Loader";
import ProductCategory from "./ProductCategory";
import ProductItem from "./ProductItem";

export default function Products() {
  const { fetchData, loading, error } = useHttp();
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [isActiveCategoryId, setActiveCategoryId] = useState<string>("");
  const products = useSelector((state: IStoreData) => state.products);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const productsHandler = (data: ProductModel[]) =>
      dispatch(StoreProducts(data));
    const categoriesHandler = (data: any) => setCategories(data);
    fetchData({ keyword: "categories" }, categoriesHandler);
    fetchData({ keyword: "products" }, productsHandler);
  }, [fetchData, dispatch]);

  const params = new URLSearchParams(location.search);
  const cId = params.get("cid");
  useEffect(() => {
    setActiveCategoryId((curId: string) => {
      if (!!cId) {
        return cId;
      } else {
        return curId;
      }
    });
  }, [cId]);

  const activeIdHandler = (activeId: string) => {
    setActiveCategoryId((curActId) => {
      if (curActId === activeId) {
        return "";
      } else {
        return activeId;
      }
    });
  };

  let activeCategoryName = "All Categories";

  const categoryList = categories
    .sort((a: CategoryModel, b: CategoryModel) => (a.order > b.order ? 1 : -1))
    .filter((c: CategoryModel) => c.enabled)
    .map((c: CategoryModel) => {
      if (c.id === isActiveCategoryId || c.id === cId) {
        activeCategoryName = c.name;
      }
      return (
        <ProductCategory
          key={c.id}
          {...c}
          activeId={!!isActiveCategoryId ? isActiveCategoryId : cId}
          onSetActiveCategory={activeIdHandler}
        />
      );
    });

  const productList = isActiveCategoryId
    ? products
        .filter((p: ProductModel) => p.category === isActiveCategoryId)
        .map((p: ProductModel) => <ProductItem key={p.id} {...p} />)
    : products.map((p: ProductModel) => <ProductItem key={p.id} {...p} />);

  let content = <Loader />;
  if (error) {
    content = <ErrorPage />;
  }
  if (!loading && !error) {
    content = (
      <main className="d-flex row flex-row w-100 product-page mx-auto">
        <aside
          id="category"
          className="accordion col-md-2 col-sm-12 mb-0 alert-info p-0 rounded-0"
        >
          <div className="accordion-item p-0">
            <button
              className="accordion-button collapsed bg-danger text-white rounded-0 shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#product-category"
              aria-expanded="false"
              aria-controls="product-category"
            >
              {`${activeCategoryName}`}
            </button>
            <ul
              className="list-group alert-info accordion-collapse collapse accordion-body p-0"
              id="product-category"
              data-bs-parent="#category"
            >
              {categoryList}
            </ul>
          </div>
        </aside>
        <section className="col-md-10 col-sm-12 d-flex flex-wrap pb-1 product-list">
          {productList}
        </section>
      </main>
    );
  }

  return content;
}
