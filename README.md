# Monty Hall Problem Simulation

This JavaScript script simulates the famous probability puzzle known as the Monty Hall problem. The simulation runs multiple rounds of the game, demonstrating the statistical advantage of switching doors.

## Description

The Monty Hall problem is a probability puzzle based on a game show scenario. The game involves three doors, one hiding a valuable prize (a diamond) and the other two concealing non-valuable items (goats). The contestant selects one door, and before revealing the selected door's content, the host, who knows the location of the prize, opens another door showing a goat. Then, the contestant is given the choice to either stick with their initial door choice or switch to the remaining unopened door.

## How to Use

1. Clone or download the repository to your local machine.
2. Open the `index.js` file in a JavaScript environment (e.g., Node.js, a web browser console).
3. Customize parameters such as the number of rounds or the initial setup if necessary.
4. Run the script and observe the output in the console.

## Files

- `index.js`: Contains the JavaScript code for the Monty Hall problem simulation.

## Simulation Logic

The script simulates multiple rounds of the Monty Hall problem by following these steps for each round:

1. Generates a random door containing the diamond.
2. Allows the user to make an initial door selection.
3. Reveals a door with a goat that isn't the user's selected door.
4. Asks the user whether they want to switch their selection.
5. Determines the final outcome (win or lose) based on the user's final choice.

## Customization

- Adjust the number of rounds simulated by modifying the loop in the code.
- Modify initial setups or change the number of doors to simulate variations of the problem.

## Results

The script outputs the winning and failing percentages after running the simulation, showcasing the statistical advantage of switching doors based on the outcomes of all simulated rounds.

## Dependencies

None
