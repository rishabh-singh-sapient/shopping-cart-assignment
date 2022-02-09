import { useNavigate } from "react-router-dom";
import useWindowDimensions from "../hooks/useWindowDimensions";

interface IProductCategory {
  id: string;
  name: string;
  activeId: string | null;
  onSetActiveCategory: (id: string) => void;
}

export default function ProductCategory(props: IProductCategory) {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();
  const { id, name } = props;

  return (
    <button
      id={id}
      tabIndex={0}
      role="listitem"
      data-bs-toggle={width > 768 ? "" : "collapse"}
      data-bs-target="#product-category"
      aria-label={`${name} ${props.activeId === id ? "selected" : ""}`}
      className={`btn ${
        props.activeId === id && "btn-info"
      } border-0 p-3 border-bottom border-info rounded-0 shadow-none `}
      onClick={() => {
        props.onSetActiveCategory(id);
        navigate("/products");
      }}
    >
      {name}
    </button>
  );
}
