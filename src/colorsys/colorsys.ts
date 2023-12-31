const RGB_MAX: number = 255 ;
const HUE_MAX: number = 360 ;
const SV_MAX: number = 100 ;

export interface RGB {
    r: number;
    g: number;
    b: number;
  }

export interface HSV {
    h: number;
    s: number;
    v: number;
  }



export function rgb_to_hsv( r: number, g: number, b: number): HSV {
    // if (typeof r === 'object') {
    //   const args = r
    //   r = args.r; g = args.g; b = args.b;
    // }
  
    // It converts [0,255] format, to [0,1]
    r = (r === RGB_MAX) ? 1 : (r % RGB_MAX / (RGB_MAX))
    g = (g === RGB_MAX) ? 1 : (g % RGB_MAX / (RGB_MAX))
    b = (b === RGB_MAX) ? 1 : (b % RGB_MAX / (RGB_MAX))
  
    let max = Math.max(r, g, b)
    let min = Math.min(r, g, b)
    let h: number, s: number, v: number = max
  
    var d = max - min
  
    s = max === 0 ? 0 : d / max
  
    if (max === min) {
      h = 0 // achromatic
    } else {
      h = 0
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }
  
    return {
      h: Math.round(h * HUE_MAX),
      s: Math.round(s * SV_MAX),
      v: Math.round(v * SV_MAX)
    }
  }

  export function hsv_to_rgb( h: number, s: number, v: number): RGB {
    // if (typeof h === 'object') {
    //   const args = h
    //   h = args.h; s = args.s; v = args.v;
    // }
  
    h = _normalizeAngle(h)
    h = (h === HUE_MAX) ? 1 : (h % HUE_MAX / (HUE_MAX) * 6)
    s = (s === SV_MAX) ? 1 : (s % SV_MAX / (SV_MAX))
    v = (v === SV_MAX) ? 1 : (v % SV_MAX / (SV_MAX))
  
    let i = Math.floor(h)
    let f = h - i
    let p = v * (1 - s)
    let q = v * (1 - f * s)
    let t = v * (1 - (1 - f) * s)
    let mod = i % 6
    let r = [v, q, p, p, t, v][mod]
    let g = [t, v, v, q, p, p][mod]
    let b = [p, p, t, v, v, q][mod]
  
    return {
      r: Math.floor(r * RGB_MAX),
      g: Math.floor(g * RGB_MAX),
      b: Math.floor(b * RGB_MAX),
    }
  }
  
  function _normalizeAngle (degrees: number) {
    return (degrees % 360 + 360) % 360;
  }