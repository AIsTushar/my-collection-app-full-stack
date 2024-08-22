import Button from "../Button/Button";

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center h-96">
      <h1 className="text-2xl text-bold sm:text-4xl  lg:text-5xl">
        Manage Your Collections Effortlessly.
      </h1>
      <p className="text-xs mt-4 sm:text-lg">
        Create, manage, and share your personal collections with ease.
      </p>
      <div className="mt-8">
        <Button design="primary">explore</Button>
      </div>
    </div>
  );
}

export default Hero;
