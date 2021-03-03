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
  onOpen,
  onClose,
}) => (
  <Modal
    isOpen={isOpen}
    onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent>
      <Img src={image} />
    </ModalContent>
  </Modal>
);

export default LightBox;
