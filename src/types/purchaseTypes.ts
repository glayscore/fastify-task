export interface PurchaseRequestBody {
    userId: number;
    itemId: number;
}

export interface PurchaseResult {
  newBalance: number;
}

export interface User {
  id: number;
  balance: number;
}

export interface Item {
  id: number;
  price: number;
  available: boolean;
}
