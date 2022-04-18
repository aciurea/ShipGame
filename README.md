# Tic tac toe Ship Game

## Available Scripts

In the project directory, you can run:

### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## About the game

There are 2 mods to play:

- 1 vs 1
- 1 vs computer

Each player can click on a box. After each click, there can be a hit or a miss displayed accordingly by `red X` or `grey circle`.

On Each hit the corresponding ship will have a `red X`. This will continue until that ship is sank and a grey color will be displayed.

If all the ships are sank, the game will end and the winner will be displayed.

### Game configuration

The game can be configured to play against the computer or againts another player. Each player name is configurable.

The user has to chose the following configuration

- tableSize (minimum size should be 5). The table will have 5 rows and 5 columns
- Battleship: number
- Crusier: number
- Carrier: number
- Destroyer: number
- Submarine: number

A label will be displayed at the top of the page showing the number of ships available. The user cannot configure more ships than available.

The number of ships is at most 60% of tableSize. E.g

- if `tableSize = 5`, the `maximumCapacity is 25` (5 rows \* 5 columns)
- `numberOfShipsAvailable = 15`, `maxmimumCapacity * 0.6 // 25 * 0.6 = 15`

### Future improvements.

- If there is no chance for the other player to win the game, stop the game immediately and display the winner.
