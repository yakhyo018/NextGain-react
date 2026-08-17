import { Member } from "./member";
import { Order } from "./order";
import { Product } from "./product";

/**. REACT APP STATE     * */
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
  ordersPage: OrderPageState;
}

/**  HOMEPAGE   **/
export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

/**  PRODUCTS PAGE   **/
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

/**  ORDER PAGE  **/
export interface OrderPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
