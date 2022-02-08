import { useNavigate } from "react-router-dom";
import { ICategory } from "../interfaces/ICategory";

export default function Tab(props: ICategory) {
  const navigate = useNavigate();
  const ImgPane = ({ src, name }: any) => {
    return (
      <img src={src} className="image-pane col-md-6" alt={`Alt ${name}`} />
    );
  };
  const DesPane = (props: any) => {
    return (
      <section className="d-flex flex-column col-md-6 align-items-center justify-content-center">
        <h4>{props.name}</h4>
        <p>{props.description}</p>
        <button
          className="btn btn-danger"
          onClick={() => {
            navigate(`/products?category=${props.buttonText}&cid=${props.id}`);
          }}
        >{`Explore ${props.buttonText}`}</button>
      </section>
    );
  };
  return (
    <main className="d-flex column align-items-center justify-content-around categories p-2">
      {props.category.order % 2 ? (
        <>
          <ImgPane src={props.category.imageUrl} name={props.category.name} />
          <DesPane
            id={props.category.id}
            name={props.category.name}
            description={props.category.description}
            buttonText={props.buttonText}
          />
        </>
      ) : (
        <>
          <DesPane
            id={props.category.id}
            name={props.category.name}
            description={props.category.description}
            buttonText={props.buttonText}
          />
          <ImgPane src={props.category.imageUrl} name={props.category.name} />
        </>
      )}
    </main>
  );
}
