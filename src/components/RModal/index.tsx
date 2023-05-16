import {
  BoxProps,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalProps,
  useColorMode
} from '@chakra-ui/react'
import type { FC } from 'react'

interface Props extends ModalProps {
  isOpen: boolean
  title?: string
  actions?: React.ReactNode
  maxWidth?: number
  padding?: BoxProps['padding']
  headerRightElements?: React.ReactNode
  hideCloseButton?: boolean
}

/**
 * @render react
 * @name RModal component
 * @description RModal component.
 */

const RModal: FC<Props> = ({
  actions,
  children,
  isOpen,
  onClose,
  title,
  colorScheme,
  maxWidth,
  headerRightElements,
  hideCloseButton,
  ...rest
}) => {
  const { colorMode } = useColorMode()

  return (
    <Modal onClose={onClose} isOpen={isOpen} {...rest}>
      <ModalOverlay />
      <ModalContent borderRadius="xl" marginX={6} maxWidth={maxWidth}>
        {title && (
          <ModalHeader
            alignItems="center"
            borderTopRadius="xl"
            borderBottomWidth={title ? 1 : 0}
            justifyContent="space-between"
            minHeight={16}
            position="relative"
          >
            {title}
            <HStack
              paddingRight={hideCloseButton ? 0 : 6}
              height="100%"
              position="absolute"
              right={0}
              top="0"
            >
              {headerRightElements}
              {!hideCloseButton && <ModalCloseButton rounded="full" top="auto" />}
            </HStack>
          </ModalHeader>
        )}
        <ModalBody paddingY={6} padding={rest.padding}>
          {children}
        </ModalBody>
        {actions && (
          <ModalFooter
            backgroundColor={colorMode === 'light' ? 'gray.50' : 'gray.700'}
            borderBottomRadius="xl"
            borderColor={colorMode === 'light' ? 'gray.100' : 'gray.600'}
            borderTopWidth={1}
          >
            {actions}
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

RModal.defaultProps = {
  motionPreset: 'slideInBottom'
}

export default RModal
