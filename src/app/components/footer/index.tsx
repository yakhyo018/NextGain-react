/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Markup only. Social and contact icons come from @mui/icons-material because
 * the svg files the old footer pointed at are missing from public/icons.
 * ========================================================================== */

import { Box, Container, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TelegramIcon from "@mui/icons-material/Telegram";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import MailIcon from "@mui/icons-material/MailOutline";
import PlaceIcon from "@mui/icons-material/PlaceOutlined";

export default function Footer() {
  return (
    <footer className="ng-footer">
      <Container>
        <Stack className="foot-top">
          <Stack className="foot-brand">
            <Box className="ng-logo">
              <span className="ng-logo-a">NEXT</span>
              <span className="ng-logo-b">GAIN</span>
            </Box>
            <Box className="foot-desc-txt">
              Premium supplements for strength, recovery and results.
            </Box>
            <Box className="sns-context">
              <a href="https://facebook.com" aria-label="Facebook">
                <FacebookIcon sx={{ fontSize: 17 }} />
              </a>
              <a href="https://instagram.com" aria-label="Instagram">
                <InstagramIcon sx={{ fontSize: 17 }} />
              </a>
              <a href="https://youtube.com" aria-label="YouTube">
                <YouTubeIcon sx={{ fontSize: 17 }} />
              </a>
              <a href="https://telegram.org" aria-label="Telegram">
                <TelegramIcon sx={{ fontSize: 17 }} />
              </a>
            </Box>
          </Stack>

          <Stack className="foot-columns">
            <Box>
              <Box className="foot-category-title">Shop</Box>
              <Box className="foot-category-link">
                <Link to="/products">All Products</Link>
                <Link to="/products?sort=best">Best Sellers</Link>
                <Link to="/products?sort=new">New Arrivals</Link>
                <Link to="/products?tag=offers">Special Offers</Link>
              </Box>
            </Box>

            <Box>
              <Box className="foot-category-title">Customer Service</Box>
              <Box className="foot-category-link">
                <Link to="/help">Help Center</Link>
                <Link to="/orders">Track My Order</Link>
                <Link to="/help">Shipping &amp; Delivery</Link>
                <Link to="/help">Returns &amp; Exchanges</Link>
              </Box>
            </Box>

            <Box>
              <Box className="foot-category-title">Company</Box>
              <Box className="foot-category-link">
                <Link to="/help">About Us</Link>
                <Link to="/help">Careers</Link>
                <Link to="/help">Terms &amp; Conditions</Link>
                <Link to="/help">Privacy Policy</Link>
              </Box>
            </Box>

            <Box>
              <Box className="foot-category-title">Contact Us</Box>
              <Box className="foot-category-link">
                <Box className="find-us">
                  <PhoneIcon />
                  <div>+998 90 123 45 67</div>
                </Box>
                <Box className="find-us">
                  <MailIcon />
                  <div>support@nextgain.com</div>
                </Box>
                <Box className="find-us">
                  <PlaceIcon />
                  <div>125 Fitness St, Tashkent, Uzbekistan</div>
                </Box>
              </Box>
            </Box>
          </Stack>
        </Stack>

        <Box className="foot-divider" />

        <Stack className="copyright-txt">
          <Box>© 2026 NextGain Store. All rights reserved.</Box>
          <Box className="payment-icons">
            <img src={"/icons/visa-card.svg"} alt="Visa" />
            <img src={"/icons/master-card.svg"} alt="Mastercard" />
            <img src={"/icons/paypal-card.svg"} alt="PayPal" />
          </Box>
        </Stack>
      </Container>
    </footer>
  );
}
