export class RGBA {
  //prettier-ignore
  constructor(
    public readonly r: number, 
    public readonly g: number, 
    public readonly b: number, 
    public readonly a: number
  ) {}

  normalize() {
    return new RGBA(this.r / 255, this.g / 255, this.b / 255, this.a / 255);
  }
}
