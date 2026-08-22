/* ==========================================================================
 * @claude-change  2026-08-22  |  NextGain design rewrite
 * REWRITTEN
 *
 * Terms / FAQ / Contact tabs restyled; the contact tab is now a two-column
 * layout with a details card next to the form.
 * ========================================================================== */

import React from "react";
import { Box, Container, Stack, Tabs } from "@mui/material";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PhoneIcon from "@mui/icons-material/PhoneOutlined";
import MailIcon from "@mui/icons-material/MailOutline";
import PlaceIcon from "@mui/icons-material/PlaceOutlined";
import ScheduleIcon from "@mui/icons-material/ScheduleOutlined";
import Button from "@mui/material/Button";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import "../../../css/help.css";
import { faq } from "../../../lib/data/faq";
import { terms } from "../../../lib/data/terms";

export default function HelpPage() {
  const [value, setValue] = React.useState("1");

  /** HANDLERS **/

  const handleChange = (e: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={"help-page"}>
      <Container className={"help-container"}>
        <TabContext value={value}>
          <Box className={"help-menu"}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="help sections"
                className={"table_list"}
              >
                <Tab label="Terms" value={"1"} />
                <Tab label="FAQ" value={"2"} />
                <Tab label="Contact" value={"3"} />
              </Tabs>
            </Box>
          </Box>

          <Stack className={"help-main-content"}>
            {/* ---------- terms ---------- */}
            <TabPanel value={"1"}>
              <Stack className={"rules-box"}>
                <Box className={"rules-frame"}>
                  {terms.map((value, number) => (
                    <p key={number}>{value}</p>
                  ))}
                </Box>
              </Stack>
            </TabPanel>

            {/* ---------- faq ---------- */}
            <TabPanel value={"2"}>
              <Stack className={"accordion-menu"}>
                {faq.map((value, number) => (
                  <Accordion key={number} disableGutters>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`faq-${number}-content`}
                      id={`faq-${number}-header`}
                    >
                      <Typography>{value.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography>{value.answer}</Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Stack>
            </TabPanel>

            {/* ---------- contact ---------- */}
            <TabPanel value={"3"}>
              <Box className={"contact-grid"}>
                <Box className={"contact-card"}>
                  <h4>Contact us</h4>
                  <p>We usually reply within one business day.</p>
                  <Box className={"contact-line"}>
                    <PhoneIcon />
                    <div>+998 90 123 45 67</div>
                  </Box>
                  <Box className={"contact-line"}>
                    <MailIcon />
                    <div>support@nextgain.com</div>
                  </Box>
                  <Box className={"contact-line"}>
                    <PlaceIcon />
                    <div>125 Fitness St, Tashkent, Uzbekistan</div>
                  </Box>
                  <Box className={"contact-line"}>
                    <ScheduleIcon />
                    <div>Mon – Sat, 09:00 – 20:00</div>
                  </Box>
                </Box>

                <form
                  action={"#"}
                  method={"POST"}
                  className={"admin-letter-frame"}
                >
                  <div className={"admin-input-box"}>
                    <label>Full name</label>
                    <input
                      type={"text"}
                      name={"memberNick"}
                      placeholder={"Type your name here"}
                    />
                  </div>
                  <div className={"admin-input-box"}>
                    <label>Email</label>
                    <input
                      type={"text"}
                      name={"memberEmail"}
                      placeholder={"Type your email here"}
                    />
                  </div>
                  <div className={"admin-input-box"}>
                    <label>Message</label>
                    <textarea
                      name={"memberMsg"}
                      placeholder={"How can we help you?"}
                    ></textarea>
                  </div>
                  <Box display={"flex"} justifyContent={"flex-end"}>
                    <Button
                      type={"submit"}
                      className="ng-btn ng-btn--primary"
                      variant="contained"
                    >
                      Send Message
                    </Button>
                  </Box>
                </form>
              </Box>
            </TabPanel>
          </Stack>
        </TabContext>
      </Container>
    </div>
  );
}
