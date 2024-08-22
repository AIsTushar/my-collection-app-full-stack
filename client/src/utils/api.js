import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000/api",
});

export const createUser = async (user, token) => {
  try {
    await api.post(
      `/auth/signup`,
      {
        auth0Id: user.sub,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Failed to sign up user", error);
  }
};

export const getUserData = async (token) => {
  try {
    const response = await api.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch user data", error);
  }
};

export const getHomePageData = async () => {
  try {
    const topCollections = await api.get(`/collections/top`);
    const latestItems = await api.get(`/items/latest`);
    const tagCloud = await api.get(`/tags/cloud`);

    return {
      topCollections: topCollections.data,
      latestItems: latestItems.data,
      tagCloud: tagCloud.data,
    };
  } catch (error) {}
};

export const getCollectionPageData = async (collectionId) => {
  try {
    const response = await api.get(`/collections/${collectionId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch collection data", error);
  }
};

export const getItemPageData = async (itemId) => {
  try {
    const response = await api.get(`/items/${itemId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch item data", error);
  }
};

// Create Collection
export const createCollection = async (data, token) => {
  try {
    const response = await api.post(`/collections`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create collection", error);
  }
};

// Profile page data
export const getProfilePageData = async (token) => {
  try {
    const response = await api.get(`/user/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch profile data", error);
  }
};

// Update profile
export const updateProfile = async (data, token) => {
  try {
    await api.put(`/user/updateMe`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {}
};

// ADD comment
export const addComment = async (itemId, comment, token) => {
  try {
    await api.post(
      `/items/${itemId}/comments`,
      {
        content: comment,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Failed to fetch item data", error);
  }
};

// Like item
export const likeItem = async (itemId, token) => {
  try {
    await api.post(
      `/items/${itemId}/like`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.error("Failed to like item", error);
  }
};

// Unlike item
export const unlikeItem = async (itemId, token) => {
  try {
    await api.delete(`/items/${itemId}/unlike`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to unlike item", error);
  }
};

// Get All tags
export const getTags = async () => {
  try {
    const response = await api.get(`/tags`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tags", error);
  }
};

// Get All Categories
export const getCategories = async () => {
  try {
    const response = await api.get(`/categories`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch categories", error);
  }
};

// Get my collections
export const getMyCollections = async (token) => {
  try {
    const response = await api.get(`/collections/myColections`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my collections", error);
  }
};

// Get my items
export const getMyItems = async (token) => {
  try {
    const response = await api.get(`/items/myItems`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch my items", error);
  }
};

// Create Item
export const createItem = async (data, token) => {
  try {
    const response = await api.post(`/items`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to create item", error);
  }
};

// Update Item
export const updateItem = async (itemId, data, token) => {
  try {
    const response = await api.put(`/items/${itemId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to update item", error);
  }
};

// Delete Item
export const deleteItem = async (itemId, token) => {
  try {
    await api.delete(`/items/${itemId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Failed to update item", error);
  }
  return null;
};
