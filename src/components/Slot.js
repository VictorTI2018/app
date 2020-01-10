import { Children, cloneElement } from 'react'
import { node, string } from 'prop-types'

export function Slot (props) {
  const { children, name } = props
  return Children.toArray(children)
    .filter(child => child.props.slot === name)
    .map(child => cloneElement(child, {
      ...props,
      ...child.props,
      style: [ props.style, child.props.style ]
    }))
}

Slot.propTypes = {
  children: node,
  name: string.isRequired
}