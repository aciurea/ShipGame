import styled from 'styled-components';
import { GameComponent } from './componets/game/Game';

const Container = styled.section`
  width: 100%;
  height: 100%;
`;

function App() {
  return (
    <Container>
      <GameComponent />
    </Container>
  );
}

export default App;
