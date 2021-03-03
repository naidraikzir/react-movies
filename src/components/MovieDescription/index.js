import React from 'react';
import {
  Box,
  Flex,
  Tag,
  TagLabel,
  Text,
  chakra,
  useColorModeValue,
} from '@chakra-ui/react';

const MovieDescription = ({
  Title,
  Year,
  imdbRating,
  Genre,
  Plot,
  Actors,
}) => {
  const detailBg = useColorModeValue('rgba(255, 255, 255, 0.5)', 'gray.800');

  return (
    <Box
      bg={detailBg}
      p={{ sm: 8 }}
      py={{ base: 4, sm: 8 }}
      rounded={{ md: '2xl' }}
      shadow={{ md: 'xl' }}
      pos="relative"
      left={{ md: '-5em' }}
      top={{ base: '-20em', md: '5em' }}
      sx={{ backdropFilter: 'blur(20px)' }}
    >
      <Text
        fontSize={['2xl', '3xl', '4xl']}
        fontWeight="bold"
      >
        {Title} {(
          <chakra.span
            fontSize="0.8em"
            opacity="0.8"
            ml="2"
          >
            {Year}
          </chakra.span>
        )}
      </Text>

      <Flex
        alignItems="center"
        mt="4"
      >
        <chakra.span
          fontSize="xl"
          mr="6"
        >
          ⭐️ {imdbRating} / <chakra.sub>10</chakra.sub>
        </chakra.span>
        <Tag
          size="sm"
          variant="outline"
          colorScheme="orange"
        >
          <TagLabel>{Genre}</TagLabel>
        </Tag>
      </Flex>

      <Text mt="6">
        {Plot}
      </Text>

      <Box mt="14">
        <Text>Stars: {Actors}</Text>
      </Box>
    </Box>
  );
};

export default MovieDescription;
