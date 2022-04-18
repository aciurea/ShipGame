import styled from 'styled-components';
import GameReact from './componets/game-react/Game';

const Container = styled.section`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <Container>
      <GameReact />
    </Container>
  );
}

export default App;
