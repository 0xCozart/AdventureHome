import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

type explorerBar = {
  setuseraccount: React.Dispatch<React.SetStateAction<string>>;
  setisconnected: React.Dispatch<React.SetStateAction<boolean>>;
  connected: boolean;
};

const BalanceRequest = (props: explorerBar) => {
  let [input, setInput] = useState<string>("");

  return (
    <InputGroup className="mb-3" size="sm">
      <FormControl
        placeholder="Ethereum address..."
        aria-label="Ethereum address..."
        aria-describedby="basic-addon2"
        onChange={(event) => setInput(event.target.value)}
      />
      <InputGroup.Append>
        <Button
          variant="dark"
          onClick={() => {
            props.setuseraccount(input);
            props.setisconnected(!props.connected);
          }}
        >
          Get balance
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default BalanceRequest;
