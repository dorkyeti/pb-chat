import { Link as ReactRouterLink, LinkProps } from 'react-router-dom'
import { Link as ChakraLink } from '@chakra-ui/react'

export const Link = (props: LinkProps) => {
  return (
    <ChakraLink as={ReactRouterLink} {...props}>
      {props.children}
    </ChakraLink>
  )
}
