import {
  getHomePageData,
  getCollectionPageData,
  getItemPageData,
  getCategories,
  getTags,
} from "./api";

export async function homePageloader() {
  const homePageData = await getHomePageData();
  return homePageData;
}

export async function collectionPageloader(params) {
  const collectionPageData = await getCollectionPageData(params);
  return collectionPageData;
}

export async function itemPageloader(params) {
  const itemPageData = await getItemPageData(params);
  return itemPageData;
}
// Tag loader
export const tagLoader = async () => {
  const tags = await getTags();
  return tags;
};

// Category loader
export const categoryLoader = async () => {
  const categories = await getCategories();
  return categories;
};
