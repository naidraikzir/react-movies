import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import { WarningTwoIcon } from '@chakra-ui/icons';

const Error = ({
  error,
}) => (
  <Box
    color="gray.300"
    my="20"
    textAlign="center"
  >
    <WarningTwoIcon
      w="20"
      h="20"
    />
    <Heading
      size="lg"
      mt="4"
    >
      {error}
    </Heading>
  </Box>
);

export default Error;
