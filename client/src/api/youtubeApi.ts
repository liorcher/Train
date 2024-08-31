import appConfig from '@/configs/appConfig';
import axios from 'axios';

const {
  youtube: { apiUrl, youtubeWatchUrl, youtubeSearchUrl },
} = appConfig;

const VITE_YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const YoutubeApi = axios.create({
  baseURL: apiUrl,
});

const fetchFirstYouTubeVideo = async (
  title: string
): Promise<{ isSuccessful: boolean; link: string }> => {
  try {
    const response = await YoutubeApi.get(
      `/search?part=snippet&type=video&maxResults=1&q=${encodeURIComponent(
        title
      )}&key=${VITE_YOUTUBE_API_KEY}`
    );

    const data = response.data;
    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      return { isSuccessful: true, link: `${youtubeWatchUrl}${videoId}` };
    }
  } catch (error) {
    console.error('Failed to fetch video link', error);
  }

  // If fetch fails, return a search URL
  return {
    isSuccessful: false,
    link: `${youtubeSearchUrl}${encodeURIComponent(title)}`,
  };
};

export default { YoutubeApi, fetchFirstYouTubeVideo };
