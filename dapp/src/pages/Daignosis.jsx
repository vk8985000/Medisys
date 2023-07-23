import React from "react";
import Navbar from "../components/Navbar";
import {
  FormControl,
  InputLabel,
  Table,
  TableBody,
  TableCell,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { symptoms, categorizedSymtoms } from "../utils/CONSTANTS";

const Daignosis = ({ currentAccount, onClickDisconnect }) => {
  return (
    <div>
      <Navbar
        currentAccount={currentAccount}
        onClickDisconnect={onClickDisconnect}
      />
      <div style={{ marginTop: "1rem" }}>Daignosis</div>
      <p>Fill the below Symptoms Form</p>
      <form
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {Object.keys(categorizedSymtoms).map((category, index) => (
          <div
            style={{
              minWidth: "20%",
              maxWidth: "25%",
            }}
            key={index}
          >
            <h2 style={{ display: "flex", justifyContent: "center" }}>
              {category}
            </h2>

            <FormGroup>
              {Object.keys(categorizedSymtoms[category]).map(
                (symptom, index) => (
                  <FormControlLabel
                    key={index}
                    padding="checkbox"
                    control={
                      <Checkbox
                        color="primary"
                        value={categorizedSymtoms[category][symptom]}
                      />
                    }
                    label={symptom}
                  />
                )
              )}
            </FormGroup>
          </div>
        ))}
        <div style={{ width: "100%", marginBottom: "1rem" }}>
          <Button
            type="submit"
            variant="contained"
            style={{ alignSelf: "center" }}
          >
            Daignosis
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Daignosis;
