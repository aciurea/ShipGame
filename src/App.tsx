import styled from 'styled-components';
import GameReact from './componets/game-react/Game';
import { GameComponent } from './componets/game/Game';

const Container = styled.section`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <Container>
      {/* <GameComponent /> */}
      <GameReact />
    </Container>
  );
}

export default App;
