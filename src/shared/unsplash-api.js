import { createApi } from "unsplash-js";

export const unsplashApi = createApi({
    accessKey: process.env.REACT_APP_API_UNSPLASH_KEY,
})
