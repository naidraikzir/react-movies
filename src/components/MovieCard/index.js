import React from 'react';
import {
  useColorModeValue,
  Box,
  Heading,
  Image
} from '@chakra-ui/react';

const MovieCard = ({
  Poster,
  onPosterClick,
  Title
}) => {
  const titleBg = useColorModeValue('gray.100', 'gray.800');
  return (
    <Box pos="relative">
      <Image
        src={Poster}
        cursor="pointer"
        width="100%"
        height="300px"
        fit="cover"
        rounded="xl"
        onClick={(evt) => {
          evt.stopPropagation();
          onPosterClick(Poster);
        }}
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
      >
        {Title}
      </Heading>
    </Box>
  );
};

export default MovieCard;
