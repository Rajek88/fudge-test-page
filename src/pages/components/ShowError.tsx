import { Callout } from "components/Callout";
import React from "react";

type Props = {
  message: string;
};

const ShowError = (props: Props) => {
  return <Callout variant="error">{props.message}</Callout>;
};

export default ShowError;
