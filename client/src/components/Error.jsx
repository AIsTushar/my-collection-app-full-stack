import { useRouteError } from "react-router-dom";

function Error() {
  const error = useRouteError();
  return (
    <div className="min-h-[90vh]">
      <div>
        <h1>Something went wrong 😢</h1>
        <p>{error.data || error.message}</p>
      </div>
    </div>
  );
}

export default Error;
