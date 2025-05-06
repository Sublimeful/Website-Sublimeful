class MersenneTwister {
  private static readonly N = 624;
  private static readonly M = 397;
  private static readonly MATRIX_A = 0x9908b0df;
  private static readonly UPPER_MASK = 0x80000000;
  private static readonly LOWER_MASK = 0x7fffffff;

  private mt: number[];
  private mti: number;

  constructor(seed?: number) {
    seed = seed ?? new Date().getTime();
    this.mt = new Array(MersenneTwister.N).fill(0);
    this.mti = MersenneTwister.N + 1;
    this.init_genrand(seed);
  }

  public init_genrand(s: number): void {
    this.mt[0] = s >>> 0;
    for (this.mti = 1; this.mti < MersenneTwister.N; this.mti++) {
      const s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
      this.mt[this.mti] =
        ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
        (s & 0x0000ffff) * 1812433253 +
        this.mti;
      this.mt[this.mti] >>>= 0;
    }
  }

  public init_by_array(init_key: number[], key_length?: number): void {
    let k = key_length ?? init_key.length;
    k = Math.max(k, init_key.length);
    this.init_genrand(19650218);

    let i = 1,
      j = 0;
    for (let len = Math.max(MersenneTwister.N, k); len > 0; len--) {
      const s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] =
        (this.mt[i] ^
          (((((s & 0xffff0000) >>> 16) * 1664525) << 16) +
            (s & 0x0000ffff) * 1664525)) +
        init_key[j] +
        j;
      this.mt[i] >>>= 0;
      i++;
      j++;
      if (i >= MersenneTwister.N) {
        this.mt[0] = this.mt[MersenneTwister.N - 1];
        i = 1;
      }
      if (j >= init_key.length) j = 0;
    }

    for (let len = MersenneTwister.N - 1; len > 0; len--) {
      const s = this.mt[i - 1] ^ (this.mt[i - 1] >>> 30);
      this.mt[i] =
        (this.mt[i] ^
          (((((s & 0xffff0000) >>> 16) * 1566083941) << 16) +
            (s & 0x0000ffff) * 1566083941)) -
        i;
      this.mt[i] >>>= 0;
      i++;
      if (i >= MersenneTwister.N) {
        this.mt[0] = this.mt[MersenneTwister.N - 1];
        i = 1;
      }
    }
    this.mt[0] = 0x80000000;
  }

  public genrand_int32(): number {
    const mag01 = [0x0, MersenneTwister.MATRIX_A];
    let y: number;

    if (this.mti >= MersenneTwister.N) {
      let kk: number;

      if (this.mti === MersenneTwister.N + 1) {
        this.init_genrand(5489);
      }

      for (kk = 0; kk < MersenneTwister.N - MersenneTwister.M; kk++) {
        y =
          (this.mt[kk] & MersenneTwister.UPPER_MASK) |
          (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
        this.mt[kk] =
          this.mt[kk + MersenneTwister.M] ^ (y >>> 1) ^ mag01[y & 1];
      }
      for (; kk < MersenneTwister.N - 1; kk++) {
        y =
          (this.mt[kk] & MersenneTwister.UPPER_MASK) |
          (this.mt[kk + 1] & MersenneTwister.LOWER_MASK);
        this.mt[kk] =
          this.mt[kk + (MersenneTwister.M - MersenneTwister.N)] ^
          (y >>> 1) ^
          mag01[y & 1];
      }
      y =
        (this.mt[MersenneTwister.N - 1] & MersenneTwister.UPPER_MASK) |
        (this.mt[0] & MersenneTwister.LOWER_MASK);
      this.mt[MersenneTwister.N - 1] =
        this.mt[MersenneTwister.M - 1] ^ (y >>> 1) ^ mag01[y & 1];
      this.mti = 0;
    }

    y = this.mt[this.mti++];

    y ^= y >>> 11;
    y ^= (y << 7) & 0x9d2c5680;
    y ^= (y << 15) & 0xefc60000;
    y ^= y >>> 18;

    return y >>> 0;
  }

  public genrand_int31(): number {
    return this.genrand_int32() >>> 1;
  }

  public genrand_real1(): number {
    return this.genrand_int32() * (1.0 / 4294967295.0);
  }

  public random(): number {
    return this.genrand_int32() * (1.0 / 4294967296.0);
  }

  public genrand_real3(): number {
    return (this.genrand_int32() + 0.5) * (1.0 / 4294967296.0);
  }

  public genrand_res53(): number {
    const a = this.genrand_int32() >>> 5;
    const b = this.genrand_int32() >>> 6;
    return (a * 67108864.0 + b) * (1.0 / 9007199254740992.0);
  }
}

/* shuffle array in place with seed */
export function shuffleArrayWithSeed(arr: Array<any>, seed: number) {
  const twister = new MersenneTwister(seed);
  for (let i = 0; i < arr.length; i++) {
    const j = Math.floor(arr.length * twister.random());
    const t = arr[i];
    arr[i] = arr[j];
    arr[j] = t;
  }
}
