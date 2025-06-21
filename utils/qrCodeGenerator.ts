export interface QRCodeData {
  id: string;
  name: string;
  email: string;
}

export class QRCodeGenerator {
  private static readonly QR_SIZE = 200;
  private static readonly CELL_SIZE = 4;
  private static readonly GRID_SIZE = Math.floor(this.QR_SIZE / this.CELL_SIZE);

  // Convert string to binary pattern
  private static stringToBinary(str: string): string {
    return str
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"))
      .join("");
  }

  // Create a simple hash pattern from data
  private static createHashPattern(data: string): boolean[][] {
    const binary = this.stringToBinary(data);
    const pattern: boolean[][] = [];

    for (let i = 0; i < this.GRID_SIZE; i++) {
      pattern[i] = [];
      for (let j = 0; j < this.GRID_SIZE; j++) {
        const index = (i * this.GRID_SIZE + j) % binary.length;
        pattern[i][j] = binary[index] === "1";
      }
    }

    return pattern;
  }

  public static generateQRPattern(data: QRCodeData): boolean[][] {
    const jsonString = JSON.stringify(data);
    return this.createHashPattern(jsonString);
  }

  public static getDimensions() {
    return {
      size: this.QR_SIZE,
      cellSize: this.CELL_SIZE,
      gridSize: this.GRID_SIZE,
    };
  }
}
