// const urlToFetch = `${baseUrl}/genre/movie/list${requestParams}`

export const fetchData = async (urlToFetch) => {

    try {
      const response = await fetch(urlToFetch);

      if (response.ok) {
        const jsonResponse = await response.json();
        // const genres = jsonResponse.genres;
        // setGenres(genres);
        return jsonResponse
      }
    } catch (error) {
      console.log(error);
    }
  };




