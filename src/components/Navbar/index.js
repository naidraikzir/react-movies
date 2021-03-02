import React from 'react';
import {
  Flex,
  Heading
} from '@chakra-ui/react';
import { ColorModeSwitcher } from 'components/ColorModeSwitcher';

const Navbar = () => (
  <Flex p="4">
    <Heading ml="1">Movies</Heading>
    <ColorModeSwitcher justifySelf="flex-end" ml="auto" />
  </Flex>
);

export default Navbar;
