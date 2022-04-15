import styled from 'styled-components';

const getCols = ({ size }: { size: number }) => {
  let cols = '';
  for (let i = 0; i < size; i++) cols += ' minmax(30px, 1fr)';

  return cols;
};

const Container = styled.section`
  width: 100%;
  height: 100%;
  padding: 20px;
  overflow: auto;

  .header {
    display: flex;
  }

  .game {
    padding: 20px;
    display: grid;
    width: 100%;

    @media (max-width: 1100px) {
      grid-template-columns: 1fr;
      row-gap: 20px;
    }

    @media (min-width: 1101px) {
      grid-template-columns: minmax(300px, 20%) minmax(500px, 30%) minmax(300px, 20%);
      column-gap: 20px;
      grid-template-rows: minmax(500px 30%);
    }

    .board {
      border: 3px solid #e8ba10;
      background-color: #afb0b3;
      width: 100%;
      height: 100%;
      display: grid;
      row-gap: 2px;
      grid-template-rows: ${getCols};

      .row {
        width: 100%;
        height: 100%;
        display: grid;
        column-gap: 2px;
        grid-template-columns: ${getCols};
      }

      .col {
        background-color: white;
        cursor: pointer;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  .table {
    display: flex;
    flex-direction: column;
  }
`;

export default Container;
