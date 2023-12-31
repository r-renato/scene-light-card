
import {rgb_to_hsv, hsv_to_rgb} from "./colorsys/colorsys"

// var colorsys = require('colorsys')

type NamedTuple<K extends keyof any, T> = {
    [P in K]: T;
};

const round = (n: number, dp: number): number => {
    const h = +('1'.padEnd(dp + 1, '0')) // 10 or 100 or 1000 or etc
    return Math.round(n * h) / h
  }


class RGBColor implements NamedTuple<string, any> {
    r: number;
    g: number;
    b: number;
    
    constructor(r: number, g: number, b: number) {
        this.r = r ;
        this.g = g ;
        this.b = b ;
    }
}

const COLORS = {
    "aliceblue": new RGBColor(240, 248, 255),
    "antiquewhite": new RGBColor(250, 235, 215),
    "aqua": new RGBColor(0, 255, 255),
    "aquamarine": new RGBColor(127, 255, 212),
    "azure": new RGBColor(240, 255, 255),
    "beige": new RGBColor(245, 245, 220),
    "bisque": new RGBColor(255, 228, 196),
    "black": new RGBColor(0, 0, 0),
    "blanchedalmond": new RGBColor(255, 235, 205),
    "blue": new RGBColor(0, 0, 255),
    "blueviolet": new RGBColor(138, 43, 226),
    "brown": new RGBColor(165, 42, 42),
    "burlywood": new RGBColor(222, 184, 135),
    "cadetblue": new RGBColor(95, 158, 160),
    "chartreuse": new RGBColor(127, 255, 0),
    "chocolate": new RGBColor(210, 105, 30),
    "coral": new RGBColor(255, 127, 80),
    "cornflowerblue": new RGBColor(100, 149, 237),
    "cornsilk": new RGBColor(255, 248, 220),
    "crimson": new RGBColor(220, 20, 60),
    "cyan": new RGBColor(0, 255, 255),
    "darkblue": new RGBColor(0, 0, 139),
    "darkcyan": new RGBColor(0, 139, 139),
    "darkgoldenrod": new RGBColor(184, 134, 11),
    "darkgray": new RGBColor(169, 169, 169),
    "darkgreen": new RGBColor(0, 100, 0),
    "darkgrey": new RGBColor(169, 169, 169),
    "darkkhaki": new RGBColor(189, 183, 107),
    "darkmagenta": new RGBColor(139, 0, 139),
    "darkolivegreen": new RGBColor(85, 107, 47),
    "darkorange": new RGBColor(255, 140, 0),
    "darkorchid": new RGBColor(153, 50, 204),
    "darkred": new RGBColor(139, 0, 0),
    "darksalmon": new RGBColor(233, 150, 122),
    "darkseagreen": new RGBColor(143, 188, 143),
    "darkslateblue": new RGBColor(72, 61, 139),
    "darkslategray": new RGBColor(47, 79, 79),
    "darkslategrey": new RGBColor(47, 79, 79),
    "darkturquoise": new RGBColor(0, 206, 209),
    "darkviolet": new RGBColor(148, 0, 211),
    "deeppink": new RGBColor(255, 20, 147),
    "deepskyblue": new RGBColor(0, 191, 255),
    "dimgray": new RGBColor(105, 105, 105),
    "dimgrey": new RGBColor(105, 105, 105),
    "dodgerblue": new RGBColor(30, 144, 255),
    "firebrick": new RGBColor(178, 34, 34),
    "floralwhite": new RGBColor(255, 250, 240),
    "forestgreen": new RGBColor(34, 139, 34),
    "fuchsia": new RGBColor(255, 0, 255),
    "gainsboro": new RGBColor(220, 220, 220),
    "ghostwhite": new RGBColor(248, 248, 255),
    "gold": new RGBColor(255, 215, 0),
    "goldenrod": new RGBColor(218, 165, 32),
    "gray": new RGBColor(128, 128, 128),
    "green": new RGBColor(0, 128, 0),
    "greenyellow": new RGBColor(173, 255, 47),
    "grey": new RGBColor(128, 128, 128),
    "honeydew": new RGBColor(240, 255, 240),
    "hotpink": new RGBColor(255, 105, 180),
    "indianred": new RGBColor(205, 92, 92),
    "indigo": new RGBColor(75, 0, 130),
    "ivory": new RGBColor(255, 255, 240),
    "khaki": new RGBColor(240, 230, 140),
    "lavender": new RGBColor(230, 230, 250),
    "lavenderblush": new RGBColor(255, 240, 245),
    "lawngreen": new RGBColor(124, 252, 0),
    "lemonchiffon": new RGBColor(255, 250, 205),
    "lightblue": new RGBColor(173, 216, 230),
    "lightcoral": new RGBColor(240, 128, 128),
    "lightcyan": new RGBColor(224, 255, 255),
    "lightgoldenrodyellow": new RGBColor(250, 250, 210),
    "lightgray": new RGBColor(211, 211, 211),
    "lightgreen": new RGBColor(144, 238, 144),
    "lightgrey": new RGBColor(211, 211, 211),
    "lightpink": new RGBColor(255, 182, 193),
    "lightsalmon": new RGBColor(255, 160, 122),
    "lightseagreen": new RGBColor(32, 178, 170),
    "lightskyblue": new RGBColor(135, 206, 250),
    "lightslategray": new RGBColor(119, 136, 153),
    "lightslategrey": new RGBColor(119, 136, 153),
    "lightsteelblue": new RGBColor(176, 196, 222),
    "lightyellow": new RGBColor(255, 255, 224),
    "lime": new RGBColor(0, 255, 0),
    "limegreen": new RGBColor(50, 205, 50),
    "linen": new RGBColor(250, 240, 230),
    "magenta": new RGBColor(255, 0, 255),
    "maroon": new RGBColor(128, 0, 0),
    "mediumaquamarine": new RGBColor(102, 205, 170),
    "mediumblue": new RGBColor(0, 0, 205),
    "mediumorchid": new RGBColor(186, 85, 211),
    "mediumpurple": new RGBColor(147, 112, 219),
    "mediumseagreen": new RGBColor(60, 179, 113),
    "mediumslateblue": new RGBColor(123, 104, 238),
    "mediumspringgreen": new RGBColor(0, 250, 154),
    "mediumturquoise": new RGBColor(72, 209, 204),
    "mediumvioletred": new RGBColor(199, 21, 133),
    "midnightblue": new RGBColor(25, 25, 112),
    "mintcream": new RGBColor(245, 255, 250),
    "mistyrose": new RGBColor(255, 228, 225),
    "moccasin": new RGBColor(255, 228, 181),
    "navajowhite": new RGBColor(255, 222, 173),
    "navy": new RGBColor(0, 0, 128),
    "navyblue": new RGBColor(0, 0, 128),
    "oldlace": new RGBColor(253, 245, 230),
    "olive": new RGBColor(128, 128, 0),
    "olivedrab": new RGBColor(107, 142, 35),
    "orange": new RGBColor(255, 165, 0),
    "orangered": new RGBColor(255, 69, 0),
    "orchid": new RGBColor(218, 112, 214),
    "palegoldenrod": new RGBColor(238, 232, 170),
    "palegreen": new RGBColor(152, 251, 152),
    "paleturquoise": new RGBColor(175, 238, 238),
    "palevioletred": new RGBColor(219, 112, 147),
    "papayawhip": new RGBColor(255, 239, 213),
    "peachpuff": new RGBColor(255, 218, 185),
    "peru": new RGBColor(205, 133, 63),
    "pink": new RGBColor(255, 192, 203),
    "plum": new RGBColor(221, 160, 221),
    "powderblue": new RGBColor(176, 224, 230),
    "purple": new RGBColor(128, 0, 128),
    "red": new RGBColor(255, 0, 0),
    "rosybrown": new RGBColor(188, 143, 143),
    "royalblue": new RGBColor(65, 105, 225),
    "saddlebrown": new RGBColor(139, 69, 19),
    "salmon": new RGBColor(250, 128, 114),
    "sandybrown": new RGBColor(244, 164, 96),
    "seagreen": new RGBColor(46, 139, 87),
    "seashell": new RGBColor(255, 245, 238),
    "sienna": new RGBColor(160, 82, 45),
    "silver": new RGBColor(192, 192, 192),
    "skyblue": new RGBColor(135, 206, 235),
    "slateblue": new RGBColor(106, 90, 205),
    "slategray": new RGBColor(112, 128, 144),
    "slategrey": new RGBColor(112, 128, 144),
    "snow": new RGBColor(255, 250, 250),
    "springgreen": new RGBColor(0, 255, 127),
    "steelblue": new RGBColor(70, 130, 180),
    "tan": new RGBColor(210, 180, 140),
    "teal": new RGBColor(0, 128, 128),
    "thistle": new RGBColor(216, 191, 216),
    "tomato": new RGBColor(255, 99, 71),
    "turquoise": new RGBColor(64, 224, 208),
    "violet": new RGBColor(238, 130, 238),
    "wheat": new RGBColor(245, 222, 179),
    "white": new RGBColor(255, 255, 255),
    "whitesmoke": new RGBColor(245, 245, 245),
    "yellow": new RGBColor(255, 255, 0),
    "yellowgreen": new RGBColor(154, 205, 50),
    "homeassistant": new RGBColor(24, 188, 242),
};

class XYPoint {
    x: number;
    y: number;
    constructor(x: number, y: number) {
        this.x = x ; this.y = y ;
    }
}

class GamutType {
    red: XYPoint;
    green: XYPoint;
    blue: XYPoint;

    constructor(r: XYPoint, g: XYPoint, b: XYPoint) {
        this.red = r ; this.green = g ; this.blue = b ;
    }
}


export function color_name_to_rgb(color_name: string): RGBColor {
    const hex_value = COLORS[color_name.replace(" ", "").toLowerCase()];
    if (!hex_value) {
        throw new Error("Unknown color");
    }
    return hex_value;
}

export function color_RGB_to_xy(iR: number, iG: number, iB: number, Gamut: GamutType | null = null): [number, number] {
    return (<[number, number]> color_RGB_to_xy_brightness(iR, iG, iB, Gamut).slice(0, 2));
}

function color_RGB_to_xy_brightness(iR: number, iG: number, iB: number, Gamut: GamutType | null = null): [number, number, number] {
    if (iR + iG + iB === 0) {
        return [0.0, 0.0, 0];
    }
    let R = iR / 255;
    let B = iB / 255;
    let G = iG / 255;
    R = (R > 0.04045) ? Math.pow((R + 0.055) / (1.0 + 0.055), 2.4) : R / 12.92;
    G = (G > 0.04045) ? Math.pow((G + 0.055) / (1.0 + 0.055), 2.4) : G / 12.92;
    B = (B > 0.04045) ? Math.pow((B + 0.055) / (1.0 + 0.055), 2.4) : B / 12.92;
    const X = R * 0.664511 + G * 0.154324 + B * 0.162028;
    let Y = R * 0.283881 + G * 0.668433 + B * 0.047685;
    const Z = R * 0.000088 + G * 0.072310 + B * 0.986039;
    let x: number = X / (X + Y + Z);
    let y = Y / (X + Y + Z);
    Y = (Y > 1) ? 1 : Y;
    const brightness = Math.round(Y * 255);
    if (Gamut) {
        const in_reach = check_point_in_lamps_reach([x, y], Gamut);
        if (!in_reach) {
            const xy_closest = get_closest_point_to_point([x, y], Gamut);
            x = xy_closest[0];
            y = xy_closest[1];
        }
    } 
    return [round(x,3), round(y, 3), brightness];
}

function color_xy_to_RGB(vX: number, vY: number, Gamut: GamutType | null = null): [number, number, number] {
    return color_xy_brightness_to_RGB(vX, vY, 255, Gamut);
}

export function color_xy_brightness_to_RGB(vX: number, vY: number, ibrightness: number, Gamut: GamutType | null = null): [number, number, number] {
    if (Gamut && !check_point_in_lamps_reach([vX, vY], Gamut)) {
        const xy_closest = get_closest_point_to_point([vX, vY], Gamut);
        vX = xy_closest[0];
        vY = xy_closest[1];
    }
    const brightness = ibrightness / 255.0;
    if (brightness === 0.0) {
        return [0, 0, 0];
    }
    const Y = brightness;
    if (vY === 0.0) {
        vY += 0.00000000001;
    }
    const X = (Y / vY) * vX;
    const Z = (Y / vY) * (1 - vX - vY);
    let r = X * 1.656492 - Y * 0.354851 - Z * 0.255038;
    let g = -X * 0.707196 + Y * 1.655397 + Z * 0.036152;
    let b = X * 0.051713 - Y * 0.121364 + Z * 1.011530;
    [r, g, b] = [(r <= 0.0031308) ? 12.92 * r : (1.0 + 0.055) * Math.pow(r, (1.0 / 2.4)) - 0.055, (g <= 0.0031308) ? 12.92 * g : (1.0 + 0.055) * Math.pow(g, (1.0 / 2.4)) - 0.055, (b <= 0.0031308) ? 12.92 * b : (1.0 + 0.055) * Math.pow(b, (1.0 / 2.4)) - 0.055];
    [r, g, b] = [Math.max(0, r), Math.max(0, g), Math.max(0, b)];
    const max_component = Math.max(r, g, b);
    if (max_component > 1) {
        [r, g, b] = [r / max_component, g / max_component, b / max_component];
    }
    const [ir, ig, ib] = [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
    return [ir, ig, ib];
}

export function color_hsb_to_RGB(fH: number, fS: number, fB: number): [number, number, number] {
    if (fS === 0.0) {
        const fV = Math.round(fB * 255);
        return [fV, fV, fV];
    }
    let r = 0, g = 0, b = 0;
    const h = fH / 60;
    const f = h - Math.floor(h);
    const p = fB * (1 - fS);
    const q = fB * (1 - fS * f);
    const t = fB * (1 - (fS * (1 - f)));
    if (Math.floor(h) === 0) {
        r = Math.round(fB * 255);
        g = Math.round(t * 255);
        b = Math.round(p * 255);
    }
    else if (Math.floor(h) === 1) {
        r = Math.round(q * 255);
        g = Math.round(fB * 255);
        b = Math.round(p * 255);
    }
    else if (Math.floor(h) === 2) {
        r = Math.round(p * 255);
        g = Math.round(fB * 255);
        b = Math.round(t * 255);
    }
    else if (Math.floor(h) === 3) {
        r = Math.round(p * 255);
        g = Math.round(q * 255);
        b = Math.round(fB * 255);
    }
    else if (Math.floor(h) === 4) {
        r = Math.round(t * 255);
        g = Math.round(p * 255);
        b = Math.round(fB * 255);
    }
    else if (Math.floor(h) === 5) {
        r = Math.round(fB * 255);
        g = Math.round(p * 255);
        b = Math.round(q * 255);
    }
    return [r, g, b];
}

function color_RGB_to_hsv(iR: number, iG: number, iB: number): [number, number, number] {
    const fHSV = rgb_to_hsv(iR / 255.0, iG / 255.0, iB / 255.0);
    return [round(fHSV[0] * 360, 3), round(fHSV[1] * 100, 3), round(fHSV[2] * 100, 3)];
}

function color_RGB_to_hs(iR: number, iG: number, iB: number): [number, number] {
    return <[number, number]> color_RGB_to_hsv(iR, iG, iB).slice(0, 2);
}

function color_hsv_to_RGB(iH: number, iS: number, iV: number): [number, number, number] {
    const fRGB = hsv_to_rgb(iH / 360, iS / 100, iV / 100);
    return [Math.round(fRGB[0] * 255), Math.round(fRGB[1] * 255), Math.round(fRGB[2] * 255)];
}

function color_hs_to_RGB(iH: number, iS: number): [number, number, number] {
    return color_hsv_to_RGB(iH, iS, 100);
}

export function color_xy_to_hs(vX: number, vY: number, Gamut: GamutType | null = null): [number, number] {
    const [h, s, x] = color_RGB_to_hsv(...color_xy_to_RGB(vX, vY, Gamut));
    console.log( x ) ;
    return [h, s];
}

export function color_hs_to_xy(iH: number, iS: number, Gamut: GamutType | null = null): [number, number] {
    return color_RGB_to_xy(...color_hs_to_RGB(iH, iS), Gamut);
}

function match_max_scale(input_colors: number[], output_colors: number[]): number[] {
    const max_in = Math.max(...input_colors);
    const max_out = Math.max(...output_colors);
    const factor = (max_out === 0) ? 0.0 : max_in / max_out;
    return output_colors.map((x) => Math.round(x * factor));
}

export function color_rgb_to_rgbw(r: number, g: number, b: number): [number, number, number, number] {
    const w = Math.min(r, g, b);
    const rgbw = [r - w, g - w, b - w, w];
    return <[number, number, number, number]> match_max_scale([r, g, b], rgbw);
}

export function color_rgbw_to_rgb(r: number, g: number, b: number, w: number): [number, number, number] {
    const rgb = [r + w, g + w, b + w];
    return <[number, number, number]> match_max_scale([r, g, b, w], rgb);
}

export function color_rgb_to_rgbww(r: number, g: number, b: number, min_kelvin: number, max_kelvin: number): [number, number, number, number, number] {
    const max_mireds = color_temperature_kelvin_to_mired(min_kelvin);
    const min_mireds = color_temperature_kelvin_to_mired(max_kelvin);
    const mired_range = max_mireds - min_mireds;
    const mired_midpoint = min_mireds + mired_range / 2;
    const color_temp_kelvin = color_temperature_mired_to_kelvin(mired_midpoint);
    const [w_r, w_g, w_b] = color_temperature_to_rgb(color_temp_kelvin);
    const white_level = Math.min(r / w_r, g / w_g, b / w_b);
    const rgb = [r - w_r * white_level, g - w_g * white_level, b - w_b * white_level];
    const rgbww = [...rgb, Math.round(white_level * 255), Math.round(white_level * 255)];
    return <[number, number, number, number, number]> match_max_scale([r, g, b], rgbww);
}

export function color_rgbww_to_rgb(r: number, g: number, b: number, cw: number, ww: number, min_kelvin: number, max_kelvin: number): [number, number, number] {
    const max_mireds = color_temperature_kelvin_to_mired(min_kelvin);
    const min_mireds = color_temperature_kelvin_to_mired(max_kelvin);
    const mired_range = max_mireds - min_mireds;
    const ct_ratio = ww / (cw + ww);
    const color_temp_mired = min_mireds + ct_ratio * mired_range;
    const color_temp_kelvin = (color_temp_mired) ? color_temperature_mired_to_kelvin(color_temp_mired) : 0;
    const [w_r, w_g, w_b] = color_temperature_to_rgb(color_temp_kelvin);
    const white_level = Math.max(cw, ww) / 255;
    const rgb = [r + w_r * white_level, g + w_g * white_level, b + w_b * white_level];
    return <[number, number, number]> match_max_scale([r, g, b, cw, ww], rgb);
}

export function color_rgb_to_hex(r: number, g: number, b: number): string {
    return `${Math.round(r).toString(16).padStart(2, '0')}${Math.round(g).toString(16).padStart(2, '0')}${Math.round(b).toString(16).padStart(2, '0')}`;
}

export function rgb_hex_to_rgb_list(hex_string: string): number[] {
    return [
        parseInt(hex_string.slice(0, hex_string.length / 3), 16),
        parseInt(hex_string.slice(hex_string.length / 3, 2 * hex_string.length / 3), 16),
        parseInt(hex_string.slice(2 * hex_string.length / 3), 16)
    ];
}

export function color_temperature_to_hs(color_temperature_kelvin: number): [number, number] {
    return color_RGB_to_hs(...color_temperature_to_rgb(color_temperature_kelvin));
}

export function color_temperature_to_rgb(color_temperature_kelvin: number): [number, number, number] {
    if (color_temperature_kelvin < 1000) {
        color_temperature_kelvin = 1000;
    } else if (color_temperature_kelvin > 40000) {
        color_temperature_kelvin = 40000;
    }
    const tmp_internal = color_temperature_kelvin / 100.0;
    const red = _get_red(tmp_internal);
    const green = _get_green(tmp_internal);
    const blue = _get_blue(tmp_internal);
    return [red, green, blue];
}

export function color_temperature_to_rgbww(temperature: number, brightness: number, min_kelvin: number, max_kelvin: number): [number, number, number, number, number] {
    const max_mireds = color_temperature_kelvin_to_mired(min_kelvin);
    const min_mireds = color_temperature_kelvin_to_mired(max_kelvin);
    temperature = color_temperature_kelvin_to_mired(temperature);
    const mired_range = max_mireds - min_mireds;
    const cold = ((max_mireds - temperature) / mired_range) * brightness;
    const warm = brightness - cold;
    return [0, 0, 0, Math.round(cold), Math.round(warm)];
}

export function rgbww_to_color_temperature(rgbww: [number, number, number, number, number], min_kelvin: number, max_kelvin: number): [number, number] {
    const [, , , cold, warm] = rgbww;
    return _white_levels_to_color_temperature(cold, warm, min_kelvin, max_kelvin);
}

function _white_levels_to_color_temperature(cold: number, warm: number, min_kelvin: number, max_kelvin: number): [number, number] {
    const max_mireds = color_temperature_kelvin_to_mired(min_kelvin);
    const min_mireds = color_temperature_kelvin_to_mired(max_kelvin);
    const brightness = warm / 255 + cold / 255;
    if (brightness === 0) {
        return [min_kelvin, 0];
    }
    return [
        Math.round(
            color_temperature_mired_to_kelvin(
                ((cold / 255 / brightness) * (min_mireds - max_mireds)) + max_mireds
            )
        ),
        Math.min(255, Math.round(brightness * 255))
    ];
}
  
  function _clamp(color_component: number, minimum: number = 0, maximum: number = 255): number {
    const color_component_out = Math.max(color_component, minimum);
    return Math.min(color_component_out, maximum);
  }
  
  function _get_red(temperature: number): number {
    if (temperature <= 66) {
      return 255;
    }
    const tmp_red = 329.698727446 * Math.pow(temperature - 60, -0.1332047592);
    return _clamp(tmp_red);
  }
  
  function _get_green(temperature: number): number {
    let green;
    if (temperature <= 66) {
      green = 99.4708025861 * Math.log(temperature) - 161.1195681661;
    } else {
      green = 288.1221695283 * Math.pow(temperature - 60, -0.0755148492);
    }
    return _clamp(green);
  }
  
  function _get_blue(temperature: number): number {
    if (temperature >= 66) {
      return 255;
    }
    if (temperature <= 19) {
      return 0;
    }
    const blue = 138.5177312231 * Math.log(temperature - 10) - 305.0447927307;
    return _clamp(blue);
  }
  
  function color_temperature_mired_to_kelvin(mired_temperature: number): number {
    return Math.floor(1000000 / mired_temperature);
  }
  
  function color_temperature_kelvin_to_mired(kelvin_temperature: number): number {
    return Math.floor(1000000 / kelvin_temperature);
  }
  
  function cross_product(p1: XYPoint, p2: XYPoint): number {
    return p1.x * p2.y - p1.y * p2.x;
  }
  
  function get_distance_between_two_points(one: XYPoint, two: XYPoint): number {
    const dx = one.x - two.x;
    const dy = one.y - two.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
  
  function get_closest_point_to_line(A: XYPoint, B: XYPoint, P: XYPoint): XYPoint {
    const AP = { x: P.x - A.x, y: P.y - A.y };
    const AB = { x: B.x - A.x, y: B.y - A.y };
    const ab2 = AB.x * AB.x + AB.y * AB.y;
    const ap_ab = AP.x * AB.x + AP.y * AB.y;
    let t = ap_ab / ab2;
    if (t < 0.0) {
      t = 0.0;
    } else if (t > 1.0) {
      t = 1.0;
    }
    return { x: A.x + AB.x * t, y: A.y + AB.y * t };
  }
  
  function get_closest_point_to_point(
    xy_tuple: [number, number],
    Gamut: GamutType
  ): [number, number] {
    const xy_point: XYPoint = { x: xy_tuple[0], y: xy_tuple[1] };
  
    const pAB = get_closest_point_to_line(Gamut.red, Gamut.green, xy_point);
    const pAC = get_closest_point_to_line(Gamut.blue, Gamut.red, xy_point);
    const pBC = get_closest_point_to_line(Gamut.green, Gamut.blue, xy_point);
  
    const dAB = get_distance_between_two_points(xy_point, pAB);
    const dAC = get_distance_between_two_points(xy_point, pAC);
    const dBC = get_distance_between_two_points(xy_point, pBC);
    let lowest = dAB;
    let closest_point = pAB;
    if (dAC < lowest) {
      lowest = dAC;
      closest_point = pAC;
    }
    if (dBC < lowest) {
      lowest = dBC;
      closest_point = pBC;
    }
  
    const cx = closest_point.x;
    const cy = closest_point.y;
    return [cx, cy];
  }
  
  function check_point_in_lamps_reach(p: [number, number], Gamut: GamutType): boolean {
    const v1 = { x: Gamut.green.x - Gamut.red.x, y: Gamut.green.y - Gamut.red.y };
    const v2 = { x: Gamut.blue.x - Gamut.red.x, y: Gamut.blue.y - Gamut.red.y };
    const q = { x: p[0] - Gamut.red.x, y: p[1] - Gamut.red.y };
    const s = cross_product(q, v2) / cross_product(v1, v2);
    const t = cross_product(v1, q) / cross_product(v1, v2);
    return s >= 0.0 && t >= 0.0 && s + t <= 1.0;
  }
  
  export function check_valid_gamut(Gamut: GamutType): boolean {
    const v1 = { x: Gamut.green.x - Gamut.red.x, y: Gamut.green.y - Gamut.red.y };
    const v2 = { x: Gamut.blue.x - Gamut.red.x, y: Gamut.blue.y - Gamut.red.y };
    const not_on_line = cross_product(v1, v2) > 0.0001;
  
    const red_valid =
      Gamut.red.x >= 0 && Gamut.red.x <= 1 && Gamut.red.y >= 0 && Gamut.red.y <= 1;
    const green_valid =
      Gamut.green.x >= 0 && Gamut.green.x <= 1 && Gamut.green.y >= 0 && Gamut.green.y <= 1;
    const blue_valid =
      Gamut.blue.x >= 0 && Gamut.blue.x <= 1 && Gamut.blue.y >= 0 && Gamut.blue.y <= 1;
    return not_on_line && red_valid && green_valid && blue_valid;
  }
  
  
  