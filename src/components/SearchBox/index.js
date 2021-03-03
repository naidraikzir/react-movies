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
  onEnter,
  onReset,
}) => (
  <InputGroup>
    <Input
      value={value}
      onInput={onInput}
      onKeyUp={evt => evt.key === 'Enter' && onEnter(evt)}
      shadow="lg"
      placeholder="Type and press enter to search movies..."
    />
    {value.length && <InputRightElement p="5">
      <Button
        borderRadius="full"
        size="xs"
        onClick={onReset}
      >
        <CloseIcon color="gray.500" />
      </Button>
    </InputRightElement>}
  </InputGroup>
);

export default Search;
