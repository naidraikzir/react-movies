import React from 'react';
import {
  Flex,
  Heading,
  Spacer
} from '@chakra-ui/react';
import { ColorModeSwitcher } from 'components/ColorModeSwitcher';

const Navbar = () => (
  <Flex p="4">
    <Heading ml="1">Movies</Heading>
    <Spacer />
    <ColorModeSwitcher justifySelf="flex-end" />
  </Flex>
);

export default Navbar;
