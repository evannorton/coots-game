import getTileset from "../functions/definables/getTileset";
import drawImage from "../functions/draw/drawImage";
import getDrawStartX from "../functions/getDrawStartX";
import getDrawStartY from "../functions/getDrawStartY";
import Coords from "../interfaces/Coords";
import TilemapData from "../interfaces/TilemapData";
import Definable from "./Definable";
import Tileset from "./Tileset";

class Tilemap extends Definable {
  private readonly _data: TilemapData;

  public constructor(slug: string, data: TilemapData) {
    super(slug);
    this._data = data;
  }

  public get tileWidth(): number {
    return this._data.tilewidth;
  }

  public get tileHeight(): number {
    return this._data.tileheight;
  }

  public draw(): void {
    const startX: number = getDrawStartX();
    const startY: number = getDrawStartY();
    this._data.layers.forEach((layer) => {
      if (layer.visible) {
        layer.chunks.forEach((chunk) => {
          chunk.data.forEach((datum, datumIndex) => {
            if (datum > 0) {
              const datumX: number = datumIndex % chunk.width;
              const datumY: number = Math.floor(datumIndex / chunk.width);
              const tileset = this.getDatumTileset(datum);
              const tilesetIndex = this.getDatumTilesetIndex(datum);
              const tileSourceX = (tilesetIndex % tileset.columns) * tileset.tileWidth;
              const tileSourceY = Math.floor(tilesetIndex / tileset.columns) * tileset.tileHeight;
              const tileX = (
                startX
                + (datumX * this.tileWidth / 2)
                - (datumY * this.tileWidth / 2)
                + (chunk.x * this.tileWidth / 2)
                - (chunk.y * this.tileWidth / 2)
                - (this.tileWidth / 2)
              );
              const tileY = (
                startY
                + (datumX * this.tileHeight / 2)
                + (datumY * this.tileHeight / 2)
                + (chunk.x * this.tileHeight / 2)
                + (chunk.y * this.tileHeight / 2)
                - this.tileHeight
              );
              drawImage("tilesets/tiles", tileSourceX, tileSourceY, tileset.tileWidth, tileset.tileHeight, tileX, tileY, tileset.tileWidth, tileset.tileHeight);
            }
          });
        });
      }
    });
  }

  public getCenterScreenCoordsOfTile(x: number, y: number): Coords {
    return {
      x: (
        getDrawStartX()
        + (x * this.tileWidth / 2)
        - (y * this.tileWidth / 2)
        - 1
      ),
      y: (
        getDrawStartY()
        + (x * this.tileHeight / 2)
        + (y * this.tileHeight / 2)
        - 3
      )
    };
  }

  private getDatumTileset(datum: number): Tileset {
    const gid = datum;
    const found = this._data.tilesets.find(({ firstgid }) => gid >= firstgid);
    if (!found) {
      throw new Error(`Could not get Tileset for datum ${datum} of Tilemap "${this.slug}"`);
    }
    const tilesetSlug = found.source.substring(12, found.source.length - 5);
    return getTileset(tilesetSlug);
  }

  private getDatumTilesetIndex(datum: number): number {
    const gid = datum;
    const found = this._data.tilesets.find(({ firstgid }) => gid >= firstgid);
    if (!found) {
      throw new Error(`Could not get Tileset for datum ${datum} of Tilemap "${this.slug}"`);
    }
    return gid - found.firstgid;
  }
}

export default Tilemap;