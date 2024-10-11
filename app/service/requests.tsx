export const getAnime = (arg: string) => {
  console.log(`https://api.jikan.moe/v4/anime?${arg}`)

  if (arg.length == 0) {
    return fetch(`https://api.jikan.moe/v4/anime`)
      .then(response => response.json());
  }
  else {
    return fetch(`https://api.jikan.moe/v4/anime?${arg}`)
    .then(response => response.json());
  }
};



export const getAnimeById = (id: string) => {
  return fetch(`https://api.jikan.moe/v4/anime/${id}`)
    .then(response => response.json());
};