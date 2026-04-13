
export type Game = {
  id: number,
  cover: {id: number, image_id: string},
  first_release_date: number,
  name: string,
  summary: string,
  game_type: number,
  image: string,
  company: string,
  genres: string[]
}

export async function getDailyGame(): Promise<Game> {
    'use cache'    
    const token = await getToken()
    return await getGames(token)
}

export async function getToken() {
  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, 
    { 
      method: 'POST',
      next: { revalidate: 86400 } // Cache the token for 24 hours
    }
  )
  const data = await response.json()
  return data.access_token
}

export async function getGames(token: string) {
  const response = await fetch(
    "https://api.igdb.com/v4/games",
    { 
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.TWITCH_CLIENT_ID!,
        'Authorization': `Bearer ${token}`,
      },
      body: `
        fields cover.image_id, first_release_date, genres.name, involved_companies.company, name, summary, total_rating, follows;
        where 
          cover != null & 
          first_release_date != null & 
          involved_companies != null & 
          genres != null &
          total_rating >= 80;
        limit 50;
      `,
      next: { revalidate: 86400 } // Cache the games for 24 hours
    }
  );
  const data = await response.json();
  
  // Check if API returned an error instead of data
  if(data.error || !Array.isArray(data))
  {
    console.error('IGDB API Error:', data);
    throw new Error('IGDB API returned an error');
  }
  
  if(data.length === 0)
  {
    console.warn('No games found with current filters');
    throw new Error('No games found - try different filters');
  }
  
  // deterministic daily selection
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  const gameIndex = dayOfYear % data.length;
  const selectedGame = data[gameIndex];
  const imageId = selectedGame.cover.image_id;
  const gameImage = await getGameImage(imageId);
  const gameCompany = await getGameCompany(token, selectedGame.involved_companies[0])

  const gameGenres = selectedGame.genres.slice(0, 2).map((item: {id: number, name: string}) => item.name)

  return {...selectedGame, image: gameImage, company: gameCompany, genres: gameGenres};
}

export async function getGameImage(id: string) {
  const imageUrl = `https://images.igdb.com/igdb/image/upload/t_1080p/${id}.jpg`;
  return imageUrl;
}

export async function getGameCompany(token: string, ids: {id: number, company: number}) {
  const response = await fetch(
    "https://api.igdb.com/v4/companies",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': process.env.TWITCH_CLIENT_ID!,
        'Authorization': `Bearer ${token}`,
      },
      body: `fields name; where id = ${ids.company}; limit 1;`,
    });
    const data = await response.json();
    return data[0].name
}