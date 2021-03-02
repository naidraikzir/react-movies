import React from 'react';
import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import { CloseIcon } from '@chakra-ui/icons';

const Search = ({
  value,
  onInput,
  onReset,
}) => (
  <InputGroup>
    <Input
      value={value}
      onInput={onInput}
      shadow="lg"
      placeholder="Type to search movies..."
    />
    {value.length && <InputRightElement p="5">
      <Button
        borderRadius="full"
        size="xs"
        onClick={onReset}
      >
        <CloseIcon color="gray.400" />
      </Button>
    </InputRightElement>}
  </InputGroup>
);

export default Search;
