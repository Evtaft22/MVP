// GET LYRICS FROM API
const getLyrics = (artist, song) => {
  const options = {
    method: 'GET',
    url: `https://api.lyrics.ovh/v1/${artist}/${song}`,
    headers: {
      
    }
  };
  return axios(options)
  .then(data => data)
  .catch(err => console.error(err, 'Lyrics API error'));
};