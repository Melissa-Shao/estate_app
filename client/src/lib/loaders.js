import apiRequest from "./apiRequest"
import { defer } from "react-router-dom"

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id)
  return res.data;
}

export const listPageLoader = async ({ request, params }) => {
  // console.log(request)
  const query = request.url.split("?")[1];
  // console.log(query)

  const postPromise = apiRequest("/posts?" + query)
  // console.log(res.data)
  return defer({
    postResponse: postPromise,
  });
}


export const profilePageLoader = async () => {
  try {
    const postPromise = apiRequest("/users/profilePosts");
    const chatPromise = apiRequest("/chats");

    const [postResponse, chatResponse] = await Promise.all([postPromise, chatPromise]);

    return defer({
      postResponse,
      chatResponse,
    });
  } catch (error) {
    console.error("Error loading profile page data:", error);
    throw error;
  }
};