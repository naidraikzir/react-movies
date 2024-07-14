import React, { useState } from 'react';
import {
  useColorModeValue,
  Box,
  Heading,
  Image
} from '@chakra-ui/react';
import none from 'assets/none.png'

const MovieCard = ({
  Poster,
  onPosterClick,
  Title,
  onTitleClick,
}) => {
  const [imageIsError, setImageIsError] = useState(false)
  const titleBg = useColorModeValue('white', 'gray.800');

  return (
    <Box
      pos="relative"
      cursor="pointer"
    >
      <Image
        src={!imageIsError ? Poster : none}
        alt={Title}
        width="100%"
        height="300px"
        fit="cover"
        rounded="xl"
        onClick={(evt) => {
          evt.stopPropagation();
          !imageIsError && onPosterClick();
        }}
        onError={() => setImageIsError(true)}
      />
      <Heading
        bg={titleBg}
        p="3"
        size="sm"
        pos="absolute"
        bottom="-2em"
        left="1em"
        right="1em"
        rounded="md"
        shadow="lg"
        onClick={onTitleClick}
      >
        {Title}
      </Heading>
    </Box>
  );
};

export default MovieCard;
