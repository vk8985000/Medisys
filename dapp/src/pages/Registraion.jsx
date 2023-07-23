import React, { useState, useEffect } from "react";
import {
  Input,
  FormControl,
  Button,
  MenuItem,
  InputLabel,
  Select,
} from "@mui/material";
import { register } from "../contract/methods";

const Registraion = () => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      await register(name, sex, parseInt(age));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>Registraion</div>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1.5rem",
          marginTop: "1.5rem",
        }}
        onSubmit={handleSubmit}
      >
        <FormControl style={{ width: "25%" }}>
          <Input
            id="name"
            aria-describedby="enter-name"
            type="text"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </FormControl>
        <FormControl style={{ width: "25%" }}>
          <InputLabel id="demo-simple-select-label">Sex</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sex}
            label="Sex"
            onChange={(e) => {
              setSex(e.target.value);
            }}
          >
            <MenuItem value={"MALE"}>MALE</MenuItem>
            <MenuItem value={"FEMALE"}>FEMALE</MenuItem>
            <MenuItem value={"OTHER"}>OTHER</MenuItem>
          </Select>
        </FormControl>
        <FormControl style={{ width: "25%" }}>
          <Input
            id="age"
            aria-describedby="enter-age"
            type="number"
            placeholder="Age"
            onChange={(e) => {
              setAge(e.target.value);
            }}
            value={age}
          />
        </FormControl>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Registraion;
