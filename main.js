class MemoryGame {
  constructor() {
    this.tileContainer = document.querySelector(".tiles");
    this.colors = [
      "purple",
      "pink",
      "white",
      "orange",
      "blue",
      "green",
      "yellow",
      "red",
    ];
    this.colorsPicklist = [...this.colors, ...this.colors];
    this.tileCount = this.colorsPicklist.length;
    this.revealedCount = 0;
    this.activeTile = null;
    this.awaitingEndOfMove = false;
  }

  buildTile(color) {
    const element = document.createElement("div");

    element.classList.add("tile");
    element.setAttribute("data-color", color);
    element.setAttribute("data-revealed", "false");

    element.addEventListener("click", () => {
      const revealed = element.getAttribute("data-revealed");

      if (
        this.awaitingEndOfMove ||
        revealed === "true" ||
        element == this.activeTile
      ) {
        return;
      }

      // Reveal this color
      element.style.backgroundColor = color;

      if (!this.activeTile) {
        this.activeTile = element;

        return;
      }

      const colorToMatch = this.activeTile.getAttribute("data-color");

      if (colorToMatch === color) {
        element.setAttribute("data-revealed", "true");
        this.activeTile.setAttribute("data-revealed", "true");

        this.activeTile = null;
        this.awaitingEndOfMove = false;
        this.revealedCount += 2;

        if (this.revealedCount === this.tileCount) {
          setTimeout(() => {
            alert("Congratulations! You have won!");
          }, 1);
        }

        return;
      }

      this.awaitingEndOfMove = true;

      setTimeout(() => {
        this.activeTile.style.backgroundColor = null;
        element.style.backgroundColor = null;

        this.awaitingEndOfMove = false;
        this.activeTile = null;
      }, 1000);
    });

    return element;
  }

  init() {
    // Build up tiles
    for (let i = 0; i < this.tileCount; i++) {
      const randomIndex = Math.floor(
        Math.random() * this.colorsPicklist.length
      );
      const color = this.colorsPicklist[randomIndex];
      const tile = this.buildTile(color);

      this.colorsPicklist.splice(randomIndex, 1);
      this.tileContainer.appendChild(tile);
    }
  }
}

const game = new MemoryGame();
game.init();
