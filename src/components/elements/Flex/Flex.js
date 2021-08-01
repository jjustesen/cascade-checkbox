import styled from "styled-components";
import { flexbox, border } from "styled-system";
import { Box } from "../Box/Box";

export const Flex = styled(Box)`
  ${flexbox};
  ${border};
`;
Flex.defaultProps = {
  display: "flex",
};
