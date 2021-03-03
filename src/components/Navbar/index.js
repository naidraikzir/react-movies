import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Flex,
  Heading,
  Spacer
} from '@chakra-ui/react';
import { ColorModeSwitcher } from 'components/ColorModeSwitcher';

const Navbar = ({
  onTitleClick,
}) => {
  const history = useHistory();

  return (
    <Flex p="4">
      <Heading
        cursor="pointer"
        ml="1"
        onClick={() => history.push('/')}
      >
        Movies
      </Heading>
      <Spacer />
      <ColorModeSwitcher justifySelf="flex-end" />
    </Flex>
  );
};

export default Navbar;
