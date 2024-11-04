import axios from 'axios';
import { getCache, setCache } from '../utils/cacheUtils';
import { config } from '../config';
import { Item, SkinportItem } from '../types/itemTypes';
import { CACHE_KEYS, CACHE_EXPIRATION } from '../constants/cacheConfig';

export async function getMinPrices(): Promise<Item[]> {
  const cachedData = await getCache(CACHE_KEYS.ITEMS_MIN_PRICES);
  if (cachedData) {
    console.log('Data loaded from Redis cache');
    return JSON.parse(cachedData);
  }

  const response = await axios.get<SkinportItem[]>(`${config.skinport.apiUrl}`, {
    params: {
      app_id: config.skinport.appId,
      currency: config.skinport.currency,
    },
  });

  const items: Item[] = response.data.map((item) => ({
    name: item.market_hash_name,
    tradable_price: item.min_price !== null ? item.min_price : null,
    non_tradable_price: item.max_price !== null ? item.max_price : null,
  }));

  await setCache(CACHE_KEYS.ITEMS_MIN_PRICES, JSON.stringify(items), CACHE_EXPIRATION);

  console.log('Data saved to Redis cache');
  return items;
}
