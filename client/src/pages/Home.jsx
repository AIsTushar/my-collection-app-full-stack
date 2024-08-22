import { useLoaderData } from "react-router-dom";
import Hero from "../components/Hero/Hero";
import LatestItems from "../components/LatestItems/LatestItems";
import TagCloud from "../components/TagCloud/TagCloud";
import TopCollections from "../components/TopCollections/TopCollections";

function Home() {
  const data = useLoaderData();
  const { topCollections, latestItems, tagCloud } = data;

  return (
    <>
      <Hero />
      <LatestItems latestItems={latestItems} />
      <TopCollections topCollections={topCollections.collections} />
      <TagCloud tagCloud={tagCloud} />
    </>
  );
}

export default Home;
