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
  onInput
}) => (
  <InputGroup>
    <Input
      value={value}
      onInput={({ target }) => onInput(target.value)}
      shadow="lg"
      placeholder="Type to search movies..."
    />
    {value.length && <InputRightElement p="5">
      <Button
        borderRadius="full"
        size="xs"
        onClick={() => onInput('')}
      >
        <CloseIcon color="gray.400" />
      </Button>
    </InputRightElement>}
  </InputGroup>
);

export default Search;
