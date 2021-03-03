import React from 'react';
import {
  Img,
  Modal,
  ModalOverlay,
  ModalContent,
} from '@chakra-ui/react';

const LightBox = ({
  image,
  isOpen,
  onClose,
}) => (
  <Modal
    id="light-box"
    isOpen={isOpen}
    onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent>
      <Img
        src={image}
        alt="Poster"
      />
    </ModalContent>
  </Modal>
);

export default LightBox;
