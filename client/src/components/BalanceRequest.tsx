import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

type BalanceRequestProps = {
  onClickGetBalance: (account: string) => void;
};

const BalanceRequest = (props: BalanceRequestProps) => {
  let [input, setInput] = useState<string>("");

  return (
    <InputGroup className="mb-3" size="sm">
      <FormControl
        placeholder="Ethereum address..."
        aria-label="Ethereum address..."
        aria-describedby="basic-addon2"
        onChange={(event) => setInput(event.target.value)}
        value={input}
      />
      <InputGroup.Append>
        <Button variant="dark" onClick={() => props.onClickGetBalance(input)}>
          Get balance
        </Button>
      </InputGroup.Append>
    </InputGroup>
  );
};

export default BalanceRequest;
