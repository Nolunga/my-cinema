import { StackProps, VStack } from '@chakra-ui/react'
import { FC } from 'react'
import { ScrollView } from '../components'

interface Props extends StackProps {
  title: string
  centerElements?: React.ReactNode
  rightElements?: React.ReactNode
  parentPath?: string
}

const PageWrap: FC<Props> = ({
  children,
  parentPath,
  title,
  centerElements,
  rightElements,
  ...rest
}) => {
  return (
    <ScrollView overflowX="hidden" overflowY="scroll">
      <VStack width="100%" padding={5} {...rest}>
        {children}
      </VStack>
    </ScrollView>
  )
}

PageWrap.defaultProps = {
  paddingTop: 0,
  spacing: 0
}

export default PageWrap
