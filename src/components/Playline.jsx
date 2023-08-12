import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Tile from './Tile'
import { StockContainer as SC, Title } from './styled'

const StockContainer = styled(SC)`
  margin-left: -0.5rem;
  
`

const PlayLine = () => {
  const { playline } = useSelector((state) => state.domino)

  return (
    <>
      <Title>Play Line</Title>
      <StockContainer>
        {playline?.map((tile, i, a) => (
          <Tile
            tile={tile}
            key={tile.id}
            tileStyle="horizontal"
            first={i === 0}
            last={i === a.length - 1}
          />
        ))}
      </StockContainer>
    </>
  )
}

export default PlayLine
