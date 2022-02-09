export default function Success(props: { message: string }) {
  return (
    <div className="position-absolute bg-dark card w-100 text-white p-2 text-center d-flex justify-content-center">
      {props.message}
    </div>
  );
}
