# Block
The goal of the project is to create a extremely addictive game. Which will enable the player to forget something they don't want to remember. I think this will help many people😁😁.


# Matte Blocks

A straightforward, endless block puzzle game. Built entirely in a single HTML file with no build steps, no frameworks, and no external dependencies (aside from a Google Font).

## How to run it

There is no setup required. Just download the HTML file and double-click it to open it in any web browser. It works perfectly offline.

## How to play

- Drag shapes from the bottom dock and drop them onto the 8x8 grid.
- Fill an entire row or column to clear it and score points.
- Clear multiple lines at the same time to trigger a combo multiplier.
- The game ends when you run out of space and can no longer fit any of the available shapes on the board.

## Features

- **Cross-platform support:** Uses both touch events for mobile devices and mouse events for desktop.
- **Mobile-friendly dragging:** On touch devices, the piece is offset slightly above your finger so your hand doesn't block your view of where it will land.
- **Local persistence:** High scores are saved to the browser's `localStorage` and persist between sessions.
- **Zero bloat:** No canvas or heavy game engines. It uses plain vanilla JavaScript to manipulate DOM elements.

## Modifying the game

If you want to tweak the game, open the HTML file in any text editor:

- **Colors:** The matte aesthetic is defined right at the top of the `<style>` block in the `:root` variables.
- **Grid Size:** The board dimensions are controlled by the `ROWS = 8` and `COLS = 8` variables in the script. 
- **Block Shapes:** New shapes can be added by editing the `rawShapes` array. They are built using simple 2D arrays (matrices) where `1` is a solid block and `0` is empty space.
