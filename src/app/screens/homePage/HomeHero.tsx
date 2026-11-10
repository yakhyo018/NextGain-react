/* ==========================================================================
 * @claude-change  2026-11-10  |  Soft Pastel redesign
 * NEW FILE
 *
 * Home hero after design concept 9: a lilac welcome card on the left and
 * four pastel category tiles on the right, then a row of perk pills.
 * Each tile opens /products already filtered to that collection.
 * ========================================================================== */

import { Box, Button, Container } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { ProductCollection } from "../../../lib/enums/product.enum";
import { useGlobals } from "../../hooks/useGlobals";

const TILES: {
  collection: ProductCollection;
  title: string;
  note: string;
  image: string;
  tone: string;
}[] = [
  {
    collection: ProductCollection.PROTEIN,
    title: "Protein",
    note: "Build & recover",
    image: "/img/categories/protein.webp",
    tone: "mint",
  },
  {
    collection: ProductCollection.PRE_WORKOUT,
    title: "Pre-workout",
    note: "Energy & focus",
    image: "/img/categories/pre-workout.png",
    tone: "peach",
  },
  {
    collection: ProductCollection.CREATINE,
    title: "Creatine",
    note: "Strength & power",
    image: "/img/categories/creatine.webp",
    tone: "sky",
  },
  {
    collection: ProductCollection.MASS_GAINER,
    title: "Mass gainer",
    note: "Size & calories",
    image: "/img/categories/mass-gainer.webp",
    tone: "lemon",
  },
];

const PERKS = [
  "🚚 Free delivery over $100",
  "✅ 100% original",
  "⏱ 24h service",
  "💬 Friendly support",
];

export default function HomeHero() {
  const history = useHistory();
  const { authMember } = useGlobals();

  return (
    <div className="home-hero-frame">
      <Container>
        <Box className="home-hero">
          <Box className="hero-welcome">
            <span className="hero-hey">
              👋 {authMember ? `Hey ${authMember.memberNick}, ` : "Hey, "}
              ready to level up?
            </span>
            <h1 className="hero-title">
              Healthy gains,
              <br />
              happy you.
            </h1>
            <p className="hero-sub">
              Friendly nutrition for every goal — protein, energy and recovery
              without the confusion.
            </p>
            <Box className="hero-actions">
              <Button
                variant="contained"
                className="ng-btn ng-btn--primary hero-btn"
                onClick={() => history.push("/products")}
              >
                Start shopping
              </Button>
              <Button
                className="ng-btn ng-btn--ghost hero-btn"
                onClick={() => history.push(authMember ? "/help" : "/register")}
              >
                {authMember ? "Help me choose" : "Create account"}
              </Button>
            </Box>
          </Box>

          <Box className="hero-tiles">
            {TILES.map((tile) => (
              <Link
                key={tile.collection}
                to={`/products?collection=${tile.collection}`}
                className={`hero-tile hero-tile--${tile.tone}`}
              >
                <b>{tile.title}</b>
                <span>{tile.note}</span>
                <img src={tile.image} alt="" />
                <i className="hero-tile-go" aria-hidden="true">
                  →
                </i>
              </Link>
            ))}
          </Box>
        </Box>

        <Box className="home-perks">
          {PERKS.map((perk) => (
            <span key={perk}>{perk}</span>
          ))}
        </Box>
      </Container>
    </div>
  );
}
