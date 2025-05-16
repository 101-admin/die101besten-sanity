import React from 'react'
import {PortableTextBlock} from '@portabletext/types'

interface Props {
  children: React.ReactNode
  value: PortableTextBlock
}

export const ColoredTextDecorator = ({children}: Props) => {
  return <span style={{color: '#B65033'}}>{children}</span>
}
