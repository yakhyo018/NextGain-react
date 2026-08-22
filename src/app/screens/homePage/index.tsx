/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * EDITED
 *
 *   - takes onAdd and passes it to the two product rows
 *   - the ProductCollection.DISH filter was dropped (that value no longer
 *     exists in product.enum.ts), so the home rows now fetch all collections
 *   - SpecialOffer added, the lower sections share one Container
 * ========================================================================== */

import { useEffect } from "react";
import ActiveUsers from "./ActiveUsers";
import Advertisement from "./Advertisement";
import Events from "./Events";
import NewDishes from "./NewDishes";
import PopularDishes from "./PopularDishes";
import SpecialOffer from "./SpecialOffer";
import Statistics from "./Statistics";
import { Container, Stack } from "@mui/material";
import "../../../css/home.css";

import { useDispatch } from "react-redux";
import { Dispatch } from "@reduxjs/toolkit";
import { setNewDishes, setPopularDishes, setTopUsers } from "./slice";
import { Product } from "../../../lib/types/product";
import ProductService from "../../services/ProductService";
import { Member } from "../../../lib/types/member";
import MemberService from "../../services/MemberService";
import { CartItem } from "../../../lib/types/search";

/** REDUX SLICE & SELECTOR **/
const actionDispatch = (dispatch: Dispatch) => ({
  setPopularDishes: (data: Product[]) => dispatch(setPopularDishes(data)),
  setNewDishes: (data: Product[]) => dispatch(setNewDishes(data)),
  setTopUsers: (data: Member[]) => dispatch(setTopUsers(data)),
});

interface HomePageProps {
  onAdd: (item: CartItem) => void;
}

export default function HomePage(props: HomePageProps) {
  const { onAdd } = props;
  // selector: Data => Store
  const { setPopularDishes, setNewDishes, setTopUsers } =
    actionDispatch(useDispatch());

  useEffect(() => {
    // Backend server data fetch => Data
    const product = new ProductService();
    product
      .getProducts({
        page: 1,
        limit: 5,
        order: "productViews",
      })
      .then((data) => {
        setPopularDishes(data);
      })
      .catch((err) => console.log(err));

    product
      .getProducts({
        page: 1,
        limit: 5,
        order: "createdAt",
      })
      .then((data) => {
        setNewDishes(data);
      })
      .catch((err) => console.log(err));

    const member = new MemberService();
    member
      .getTopUsers()
      .then((data) => setTopUsers(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className={"homepage"}>
      <Statistics />
      <PopularDishes onAdd={onAdd} />
      <NewDishes onAdd={onAdd} />

      <Container>
        <Advertisement />
        <Stack className={"home-split"}>
          <ActiveUsers />
          <SpecialOffer />
        </Stack>
        <Events />
      </Container>
    </div>
  );
}
