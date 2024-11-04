export interface Item {
    name: string;
    tradable_price: number | null;
    non_tradable_price: number | null;
  }
  
export interface ApiItem {
    name: string;
    min_price: number | null;
    min_price_untradable: number | null;
}
  
export interface SkinportItem {
    market_hash_name: string;
    min_price: number | null;
    max_price: number | null;
}
