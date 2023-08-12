import { useEffect, useRef } from 'react'
import styled, { css } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { stopDrop } from '../redux/dragNdropSlice'
import { aiMakesMove, userMakesMove } from '../redux/dominoSlice'
import { getNumbers } from '../util/tileOperations'

const Container = styled.div`
  ${({ highLighted }) => (
    highLighted && css`
    box-shadow: aquamarine 0px 0px 0px 1px inset;
  `
  )}
  border-radius: 2px;
  line-height: 0.5;
  font-size: 3.5rem;
`

const TileSymbol = styled.span`
  visibility: hidden;
`

const DropPlaceholder = ({
  digit,
  first = false, // false means this is a right (last) placeholder
}) => {
  const ref = useRef()
  const dispatch = useDispatch()
  const { draggedTile, droppedTile } = useSelector((state) => state.dragNdrop)

  const isDroppable = (movedTile) => (movedTile
    && (getNumbers(movedTile).includes(digit)))

  // drop observer
  useEffect(() => {
    if (isDroppable(droppedTile)) {
      // screen position of a droppable tile (in the playline)
      const tileCoords = ref.current.getBoundingClientRect()
      // center of a tile being dropped
      const dropCenterX = droppedTile.lastCoords.x + droppedTile.lastCoords.width / 2
      const dropCenterY = droppedTile.lastCoords.y + droppedTile.lastCoords.height / 2
      // conditions met when droppable and dropped tile are close to each other
      const tilesFitHorizontally = (dropCenterX >= tileCoords.x)
      && (dropCenterX <= (tileCoords.x + tileCoords.width))
      const tilesFitVertically = (dropCenterY >= tileCoords.y)
      && (dropCenterY <= (tileCoords.y + tileCoords.height))
      if (tilesFitHorizontally && tilesFitVertically) {
        dispatchMoves()
      }
    }
  }, [droppedTile])

  const dispatchMoves = () => {
    dispatch(userMakesMove({
      tile: droppedTile,
      position: first,
    }))
    dispatch(stopDrop())
    setTimeout(() => {
      dispatch(aiMakesMove())
    }, 600)
  }

  return (
    <Container
      ref={ref}
      highLighted={isDroppable(draggedTile)}
    >
      <TileSymbol>
        &#127024;
      </TileSymbol>
    </Container>

  )
}

export default DropPlaceholder
