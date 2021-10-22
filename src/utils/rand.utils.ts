export class Xmur3 {
  private str: string;
  private h: number;
  constructor(str: string) {
    this.str = str;
    for (let i = 0; i < str.length; i++) {
      this.h = Math.imul(this.h ^ str.charCodeAt(i), 3432918353);
      this.h = (this.h << 13) | (this.h >>> 19);
    }
  }
  public getHash(): number {
    this.h = Math.imul(this.h ^ (this.h >>> 16), 2246822507);
    this.h = Math.imul(this.h ^ (this.h >>> 13), 3266489909);
    return (this.h ^= this.h >>> 16) >>> 0;
  }
}

export class Mulberry32 {
  private seed: number;
  constructor(seed: number) {
    this.seed = seed;
  }
  public random(): number {
    let t = (this.seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
}
