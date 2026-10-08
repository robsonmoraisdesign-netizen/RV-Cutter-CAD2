var Vs = 1;
var Hs = 3;
var ar = 0, or = 1, lr = 2, cr = 3, hr = 4, ur = 5, fr = 6, dr = 7, Gs = 0, Ws = 1, Xs = 2;
var Er = 1, Ar = 2, Cr = 3, Rr = 4, Pr = 5, Ir = 6, Lr = 7;
var Dr = 300, qs = 301, Ur = 302;
var $s = 306, pr = 1e3, Mn = 1001, mr = 1002;
var Nr = 1006;
var Ys = 1008;
var Zs = 1009;
var Js = 1015;
var Ks = 1023;
var Tn = 2300, si = 2301, ii = 2302, gr = 2303, vr = 2400, _r = 2401, xr = 2402;
var Fr = "", at = "srgb", yr = "srgb-linear", Sr = "linear", ri = "srgb";
var js = 35044;
var bn = 2e3, Mr = 2001;
function _l(a13) {
  for (let e = a13.length - 1; e >= 0; --e) if (a13[e] >= 65535) return true;
  return false;
}
function xl(a13) {
  return ArrayBuffer.isView(a13) && !(a13 instanceof DataView);
}
function br(a13) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", a13);
}
var Es = {}, ai = null;
function Qs(a13) {
  let e = a13[0];
  if (typeof e == "string" && e.startsWith("TSL:")) {
    let t = a13[1];
    t && t.isStackTrace ? a13[0] += " " + t.getLocation() : a13[1] = 'Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.';
  }
  return a13;
}
function Pe(...a13) {
  a13 = Qs(a13);
  let e = "THREE." + a13.shift();
  if (ai) ai("warn", e, ...a13);
  else {
    let t = a13[0];
    t && t.isStackTrace ? console.warn(t.getError(e)) : console.warn(e, ...a13);
  }
}
function Se(...a13) {
  a13 = Qs(a13);
  let e = "THREE." + a13.shift();
  if (ai) ai("error", e, ...a13);
  else {
    let t = a13[0];
    t && t.isStackTrace ? console.error(t.getError(e)) : console.error(e, ...a13);
  }
}
function cn(...a13) {
  let e = a13.join(" ");
  e in Es || (Es[e] = true, Pe(...a13));
}
var yl = { [ar]: or, [lr]: fr, [hr]: dr, [cr]: ur, [or]: ar, [fr]: lr, [dr]: hr, [ur]: cr }, Wt = class {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    let n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  hasEventListener(e, t) {
    let n = this._listeners;
    return n === void 0 ? false : n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    let n = this._listeners;
    if (n === void 0) return;
    let i = n[e];
    if (i !== void 0) {
      let r = i.indexOf(t);
      r !== -1 && i.splice(r, 1);
    }
  }
  dispatchEvent(e) {
    let t = this._listeners;
    if (t === void 0) return;
    let n = t[e.type];
    if (n !== void 0) {
      e.target = this;
      let i = n.slice(0);
      for (let r = 0, s = i.length; r < s; r++) i[r].call(this, e);
      e.target = null;
    }
  }
}, Ge = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], As = 1234567, Or = Math.PI / 180, Br = 180 / Math.PI;
function Pn() {
  let a13 = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (Ge[a13 & 255] + Ge[a13 >> 8 & 255] + Ge[a13 >> 16 & 255] + Ge[a13 >> 24 & 255] + "-" + Ge[e & 255] + Ge[e >> 8 & 255] + "-" + Ge[e >> 16 & 15 | 64] + Ge[e >> 24 & 255] + "-" + Ge[t & 63 | 128] + Ge[t >> 8 & 255] + "-" + Ge[t >> 16 & 255] + Ge[t >> 24 & 255] + Ge[n & 255] + Ge[n >> 8 & 255] + Ge[n >> 16 & 255] + Ge[n >> 24 & 255]).toLowerCase();
}
function ee(a13, e, t) {
  return Math.max(e, Math.min(t, a13));
}
function zr(a13, e) {
  return (a13 % e + e) % e;
}
function Sl(a13, e, t, n, i) {
  return n + (a13 - e) * (i - n) / (t - e);
}
function Ml(a13, e, t) {
  return a13 !== e ? (t - a13) / (e - a13) : 0;
}
function wn(a13, e, t) {
  return (1 - t) * a13 + t * e;
}
function bl(a13, e, t, n) {
  return wn(a13, e, 1 - Math.exp(-t * n));
}
function wl(a13, e = 1) {
  return e - Math.abs(zr(a13, e * 2) - e);
}
function Tl(a13, e, t) {
  return a13 <= e ? 0 : a13 >= t ? 1 : (a13 = (a13 - e) / (t - e), a13 * a13 * (3 - 2 * a13));
}
function El(a13, e, t) {
  return a13 <= e ? 0 : a13 >= t ? 1 : (a13 = (a13 - e) / (t - e), a13 * a13 * a13 * (a13 * (a13 * 6 - 15) + 10));
}
function Al(a13, e) {
  return a13 + Math.floor(Math.random() * (e - a13 + 1));
}
function Cl(a13, e) {
  return a13 + Math.random() * (e - a13);
}
function Rl(a13) {
  return a13 * (0.5 - Math.random());
}
function Pl(a13) {
  a13 !== void 0 && (As = a13);
  let e = As += 1831565813;
  return e = Math.imul(e ^ e >>> 15, e | 1), e ^= e + Math.imul(e ^ e >>> 7, e | 61), ((e ^ e >>> 14) >>> 0) / 4294967296;
}
function Il(a13) {
  return a13 * Or;
}
function Ll(a13) {
  return a13 * Br;
}
function Dl(a13) {
  return a13 > 0 && Number.isInteger(a13) && 2 ** Math.round(Math.log2(a13)) === a13;
}
function Ul(a13) {
  return Math.pow(2, Math.ceil(Math.log(a13) / Math.LN2));
}
function Nl(a13) {
  return Math.pow(2, Math.floor(Math.log(a13) / Math.LN2));
}
function Fl(a13, e, t, n, i) {
  let r = Math.cos, s = Math.sin, h = r(t / 2), c = s(t / 2), u = r((e + n) / 2), f = s((e + n) / 2), d = r((e - n) / 2), v = s((e - n) / 2), m = r((n - e) / 2), g = s((n - e) / 2);
  switch (i) {
    case "XYX":
      a13.set(h * f, c * d, c * v, h * u);
      break;
    case "YZY":
      a13.set(c * v, h * f, c * d, h * u);
      break;
    case "ZXZ":
      a13.set(c * d, c * v, h * f, h * u);
      break;
    case "XZX":
      a13.set(h * f, c * g, c * m, h * u);
      break;
    case "YXY":
      a13.set(c * m, h * f, c * g, h * u);
      break;
    case "ZYZ":
      a13.set(c * g, c * m, h * f, h * u);
      break;
    default:
      Pe("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + i);
  }
}
function ln(a13, e) {
  switch (e.constructor) {
    case Float32Array:
      return a13;
    case Uint32Array:
      return a13 / 4294967295;
    case Uint16Array:
      return a13 / 65535;
    case Uint8Array:
    case Uint8ClampedArray:
      return a13 / 255;
    case Int32Array:
      return Math.max(a13 / 2147483647, -1);
    case Int16Array:
      return Math.max(a13 / 32767, -1);
    case Int8Array:
      return Math.max(a13 / 127, -1);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
function Ze(a13, e) {
  switch (e.constructor) {
    case Float32Array:
      return a13;
    case Uint32Array:
      return Math.round(a13 * 4294967295);
    case Uint16Array:
      return Math.round(a13 * 65535);
    case Uint8Array:
    case Uint8ClampedArray:
      return Math.round(a13 * 255);
    case Int32Array:
      return Math.round(a13 * 2147483647);
    case Int16Array:
      return Math.round(a13 * 32767);
    case Int8Array:
      return Math.round(a13 * 127);
    default:
      throw new Error("THREE.MathUtils: Invalid component type.");
  }
}
var kr = { DEG2RAD: Or, RAD2DEG: Br, generateUUID: Pn, clamp: ee, euclideanModulo: zr, mapLinear: Sl, inverseLerp: Ml, lerp: wn, damp: bl, pingpong: wl, smoothstep: Tl, smootherstep: El, randInt: Al, randFloat: Cl, randFloatSpread: Rl, seededRandom: Pl, degToRad: Il, radToDeg: Ll, isPowerOfTwo: Dl, ceilPowerOfTwo: Ul, floorPowerOfTwo: Nl, setQuaternionFromProperEuler: Fl, normalize: Ze, denormalize: ln }, Je = class a {
  static {
    a.prototype.isVector2 = true;
  }
  constructor(e = 0, t = 0) {
    this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("THREE.Vector2: index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    let t = this.x, n = this.y, i = e.elements;
    return this.x = i[0] * t + i[3] * n + i[6], this.y = i[1] * t + i[4] * n + i[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = ee(this.x, e.x, t.x), this.y = ee(this.y, e.y, t.y), this;
  }
  clampScalar(e, t) {
    return this.x = ee(this.x, e, t), this.y = ee(this.y, e, t), this;
  }
  clampLength(e, t) {
    let n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(ee(n, e, t));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    let t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    let n = this.dot(e) / t;
    return Math.acos(ee(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    let t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    let n = Math.cos(t), i = Math.sin(t), r = this.x - e.x, s = this.y - e.y;
    return this.x = r * n - s * i + e.x, this.y = r * i + s * n + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}, Mt = class {
  constructor(e = 0, t = 0, n = 0, i = 1) {
    this.isQuaternion = true, this._x = e, this._y = t, this._z = n, this._w = i;
  }
  static slerpFlat(e, t, n, i, r, s, h) {
    let c = n[i + 0], u = n[i + 1], f = n[i + 2], d = n[i + 3], v = r[s + 0], m = r[s + 1], g = r[s + 2], _ = r[s + 3];
    if (d !== _ || c !== v || u !== m || f !== g) {
      let b = c * v + u * m + f * g + d * _;
      b < 0 && (v = -v, m = -m, g = -g, _ = -_, b = -b);
      let A = 1 - h;
      if (b < 0.9995) {
        let R = Math.acos(b), F = Math.sin(R);
        A = Math.sin(A * R) / F, h = Math.sin(h * R) / F, c = c * A + v * h, u = u * A + m * h, f = f * A + g * h, d = d * A + _ * h;
      } else {
        c = c * A + v * h, u = u * A + m * h, f = f * A + g * h, d = d * A + _ * h;
        let R = 1 / Math.sqrt(c * c + u * u + f * f + d * d);
        c *= R, u *= R, f *= R, d *= R;
      }
    }
    e[t] = c, e[t + 1] = u, e[t + 2] = f, e[t + 3] = d;
  }
  static multiplyQuaternionsFlat(e, t, n, i, r, s) {
    let h = n[i], c = n[i + 1], u = n[i + 2], f = n[i + 3], d = r[s], v = r[s + 1], m = r[s + 2], g = r[s + 3];
    return e[t] = h * g + f * d + c * m - u * v, e[t + 1] = c * g + f * v + u * d - h * m, e[t + 2] = u * g + f * m + h * v - c * d, e[t + 3] = f * g - h * d - c * v - u * m, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, i) {
    return this._x = e, this._y = t, this._z = n, this._w = i, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = true) {
    let n = e._x, i = e._y, r = e._z, s = e._order, h = Math.cos, c = Math.sin, u = h(n / 2), f = h(i / 2), d = h(r / 2), v = c(n / 2), m = c(i / 2), g = c(r / 2);
    switch (s) {
      case "XYZ":
        this._x = v * f * d + u * m * g, this._y = u * m * d - v * f * g, this._z = u * f * g + v * m * d, this._w = u * f * d - v * m * g;
        break;
      case "YXZ":
        this._x = v * f * d + u * m * g, this._y = u * m * d - v * f * g, this._z = u * f * g - v * m * d, this._w = u * f * d + v * m * g;
        break;
      case "ZXY":
        this._x = v * f * d - u * m * g, this._y = u * m * d + v * f * g, this._z = u * f * g + v * m * d, this._w = u * f * d - v * m * g;
        break;
      case "ZYX":
        this._x = v * f * d - u * m * g, this._y = u * m * d + v * f * g, this._z = u * f * g - v * m * d, this._w = u * f * d + v * m * g;
        break;
      case "YZX":
        this._x = v * f * d + u * m * g, this._y = u * m * d + v * f * g, this._z = u * f * g - v * m * d, this._w = u * f * d - v * m * g;
        break;
      case "XZY":
        this._x = v * f * d - u * m * g, this._y = u * m * d - v * f * g, this._z = u * f * g + v * m * d, this._w = u * f * d + v * m * g;
        break;
      default:
        Pe("Quaternion: .setFromEuler() encountered an unknown order: " + s);
    }
    return t === true && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    let n = t / 2, i = Math.sin(n);
    return this._x = e.x * i, this._y = e.y * i, this._z = e.z * i, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    let t = e.elements, n = t[0], i = t[4], r = t[8], s = t[1], h = t[5], c = t[9], u = t[2], f = t[6], d = t[10], v = n + h + d;
    if (v > 0) {
      let m = 0.5 / Math.sqrt(v + 1);
      this._w = 0.25 / m, this._x = (f - c) * m, this._y = (r - u) * m, this._z = (s - i) * m;
    } else if (n > h && n > d) {
      let m = 2 * Math.sqrt(1 + n - h - d);
      this._w = (f - c) / m, this._x = 0.25 * m, this._y = (i + s) / m, this._z = (r + u) / m;
    } else if (h > d) {
      let m = 2 * Math.sqrt(1 + h - n - d);
      this._w = (r - u) / m, this._x = (i + s) / m, this._y = 0.25 * m, this._z = (c + f) / m;
    } else {
      let m = 2 * Math.sqrt(1 + d - n - h);
      this._w = (s - i) / m, this._x = (r + u) / m, this._y = (c + f) / m, this._z = 0.25 * m;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < 1e-8 ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(ee(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    let n = this.angleTo(e);
    if (n === 0) return this;
    let i = Math.min(1, t / n);
    return this.slerp(e, i), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    let n = e._x, i = e._y, r = e._z, s = e._w, h = t._x, c = t._y, u = t._z, f = t._w;
    return this._x = n * f + s * h + i * u - r * c, this._y = i * f + s * c + r * h - n * u, this._z = r * f + s * u + n * c - i * h, this._w = s * f - n * h - i * c - r * u, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    let n = e._x, i = e._y, r = e._z, s = e._w, h = this.dot(e);
    h < 0 && (n = -n, i = -i, r = -r, s = -s, h = -h);
    let c = 1 - t;
    if (h < 0.9995) {
      let u = Math.acos(h), f = Math.sin(u);
      c = Math.sin(c * u) / f, t = Math.sin(t * u) / f, this._x = this._x * c + n * t, this._y = this._y * c + i * t, this._z = this._z * c + r * t, this._w = this._w * c + s * t, this._onChangeCallback();
    } else this._x = this._x * c + n * t, this._y = this._y * c + i * t, this._z = this._z * c + r * t, this._w = this._w * c + s * t, this.normalize();
    return this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    let e = 2 * Math.PI * Math.random(), t = 2 * Math.PI * Math.random(), n = Math.random(), i = Math.sqrt(1 - n), r = Math.sqrt(n);
    return this.set(i * Math.sin(e), i * Math.cos(e), r * Math.sin(t), r * Math.cos(t));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}, U = class a2 {
  static {
    a2.prototype.isVector3 = true;
  }
  constructor(e = 0, t = 0, n = 0) {
    this.x = e, this.y = t, this.z = n;
  }
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("THREE.Vector3: index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(Cs.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(Cs.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    let t = this.x, n = this.y, i = this.z, r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6] * i, this.y = r[1] * t + r[4] * n + r[7] * i, this.z = r[2] * t + r[5] * n + r[8] * i, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    let t = this.x, n = this.y, i = this.z, r = e.elements, s = 1 / (r[3] * t + r[7] * n + r[11] * i + r[15]);
    return this.x = (r[0] * t + r[4] * n + r[8] * i + r[12]) * s, this.y = (r[1] * t + r[5] * n + r[9] * i + r[13]) * s, this.z = (r[2] * t + r[6] * n + r[10] * i + r[14]) * s, this;
  }
  applyQuaternion(e) {
    let t = this.x, n = this.y, i = this.z, r = e.x, s = e.y, h = e.z, c = e.w, u = 2 * (s * i - h * n), f = 2 * (h * t - r * i), d = 2 * (r * n - s * t);
    return this.x = t + c * u + s * d - h * f, this.y = n + c * f + h * u - r * d, this.z = i + c * d + r * f - s * u, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    let t = this.x, n = this.y, i = this.z, r = e.elements;
    return this.x = r[0] * t + r[4] * n + r[8] * i, this.y = r[1] * t + r[5] * n + r[9] * i, this.z = r[2] * t + r[6] * n + r[10] * i, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = ee(this.x, e.x, t.x), this.y = ee(this.y, e.y, t.y), this.z = ee(this.z, e.z, t.z), this;
  }
  clampScalar(e, t) {
    return this.x = ee(this.x, e, t), this.y = ee(this.y, e, t), this.z = ee(this.z, e, t), this;
  }
  clampLength(e, t) {
    let n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(ee(n, e, t));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    let n = e.x, i = e.y, r = e.z, s = t.x, h = t.y, c = t.z;
    return this.x = i * c - r * h, this.y = r * s - n * c, this.z = n * h - i * s, this;
  }
  projectOnVector(e) {
    let t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    let n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  projectOnPlane(e) {
    return Hi.copy(this).projectOnVector(e), this.sub(Hi);
  }
  reflect(e) {
    return this.sub(Hi.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    let t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    let n = this.dot(e) / t;
    return Math.acos(ee(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    let t = this.x - e.x, n = this.y - e.y, i = this.z - e.z;
    return t * t + n * n + i * i;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, n) {
    let i = Math.sin(t) * e;
    return this.x = i * Math.sin(n), this.y = Math.cos(t) * e, this.z = i * Math.cos(n), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    let t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    let t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), i = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = i, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    let e = Math.random() * Math.PI * 2, t = Math.random() * 2 - 1, n = Math.sqrt(1 - t * t);
    return this.x = n * Math.cos(e), this.y = t, this.z = n * Math.sin(e), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}, Hi = new U(), Cs = new Mt(), J = class a3 {
  static {
    a3.prototype.isMatrix3 = true;
  }
  constructor(e, t, n, i, r, s, h, c, u) {
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1], e !== void 0 && this.set(e, t, n, i, r, s, h, c, u);
  }
  set(e, t, n, i, r, s, h, c, u) {
    let f = this.elements;
    return f[0] = e, f[1] = i, f[2] = h, f[3] = t, f[4] = r, f[5] = c, f[6] = n, f[7] = s, f[8] = u, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 1, 0, 0, 0, 1), this;
  }
  copy(e) {
    let t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    let t = e.elements;
    return this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    let n = e.elements, i = t.elements, r = this.elements, s = n[0], h = n[3], c = n[6], u = n[1], f = n[4], d = n[7], v = n[2], m = n[5], g = n[8], _ = i[0], b = i[3], A = i[6], R = i[1], F = i[4], k = i[7], L = i[2], O = i[5], G = i[8];
    return r[0] = s * _ + h * R + c * L, r[3] = s * b + h * F + c * O, r[6] = s * A + h * k + c * G, r[1] = u * _ + f * R + d * L, r[4] = u * b + f * F + d * O, r[7] = u * A + f * k + d * G, r[2] = v * _ + m * R + g * L, r[5] = v * b + m * F + g * O, r[8] = v * A + m * k + g * G, this;
  }
  multiplyScalar(e) {
    let t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    let e = this.elements, t = e[0], n = e[1], i = e[2], r = e[3], s = e[4], h = e[5], c = e[6], u = e[7], f = e[8];
    return t * s * f - t * h * u - n * r * f + n * h * c + i * r * u - i * s * c;
  }
  invert() {
    let e = this.elements, t = e[0], n = e[1], i = e[2], r = e[3], s = e[4], h = e[5], c = e[6], u = e[7], f = e[8], d = f * s - h * u, v = h * c - f * r, m = u * r - s * c, g = t * d + n * v + i * m;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    let _ = 1 / g;
    return e[0] = d * _, e[1] = (i * u - f * n) * _, e[2] = (h * n - i * s) * _, e[3] = v * _, e[4] = (f * t - i * c) * _, e[5] = (i * r - h * t) * _, e[6] = m * _, e[7] = (n * c - u * t) * _, e[8] = (s * t - n * r) * _, this;
  }
  transpose() {
    let e, t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    let t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, n, i, r, s, h) {
    let c = Math.cos(r), u = Math.sin(r);
    return this.set(n * c, n * u, -n * (c * s + u * h) + s + e, -i * u, i * c, -i * (-u * s + c * h) + h + t, 0, 0, 1), this;
  }
  scale(e, t) {
    return cn("Matrix3: .scale() is deprecated. Use .makeScale() instead."), this.premultiply(Gi.makeScale(e, t)), this;
  }
  rotate(e) {
    return cn("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."), this.premultiply(Gi.makeRotation(-e)), this;
  }
  translate(e, t) {
    return cn("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."), this.premultiply(Gi.makeTranslation(e, t)), this;
  }
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1) : this.set(1, 0, e, 0, 1, t, 0, 0, 1), this;
  }
  makeRotation(e) {
    let t = Math.cos(e), n = Math.sin(e);
    return this.set(t, -n, 0, n, t, 0, 0, 0, 1), this;
  }
  makeScale(e, t) {
    return this.set(e, 0, 0, 0, t, 0, 0, 0, 1), this;
  }
  equals(e) {
    let t = this.elements, n = e.elements;
    for (let i = 0; i < 9; i++) if (t[i] !== n[i]) return false;
    return true;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++) this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    let n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}, Gi = new J(), Rs = new J().set(0.4123908, 0.3575843, 0.1804808, 0.212639, 0.7151687, 0.0721923, 0.0193308, 0.1191948, 0.9505322), Ps = new J().set(3.2409699, -1.5373832, -0.4986108, -0.9692436, 1.8759675, 0.0415551, 0.0556301, -0.203977, 1.0569715);
function Ol() {
  let a13 = { enabled: true, workingColorSpace: yr, spaces: {}, convert: function(i, r, s) {
    return this.enabled === false || r === s || !r || !s || (this.spaces[r].transfer === ri && (i.r = St(i.r), i.g = St(i.g), i.b = St(i.b)), this.spaces[r].primaries !== this.spaces[s].primaries && (i.applyMatrix3(this.spaces[r].toXYZ), i.applyMatrix3(this.spaces[s].fromXYZ)), this.spaces[s].transfer === ri && (i.r = hn(i.r), i.g = hn(i.g), i.b = hn(i.b))), i;
  }, workingToColorSpace: function(i, r) {
    return this.convert(i, this.workingColorSpace, r);
  }, colorSpaceToWorking: function(i, r) {
    return this.convert(i, r, this.workingColorSpace);
  }, getPrimaries: function(i) {
    return this.spaces[i].primaries;
  }, getTransfer: function(i) {
    return i === Fr ? Sr : this.spaces[i].transfer;
  }, getToneMappingMode: function(i) {
    return this.spaces[i].outputColorSpaceConfig.toneMappingMode || "standard";
  }, getLuminanceCoefficients: function(i, r = this.workingColorSpace) {
    return i.fromArray(this.spaces[r].luminanceCoefficients);
  }, define: function(i) {
    Object.assign(this.spaces, i);
  }, _getMatrix: function(i, r, s) {
    return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[s].fromXYZ);
  }, _getDrawingBufferColorSpace: function(i) {
    return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace;
  }, _getUnpackColorSpace: function(i = this.workingColorSpace) {
    return this.spaces[i].workingColorSpaceConfig.unpackColorSpace;
  }, fromWorkingColorSpace: function(i, r) {
    return cn("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."), a13.workingToColorSpace(i, r);
  }, toWorkingColorSpace: function(i, r) {
    return cn("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."), a13.colorSpaceToWorking(i, r);
  } }, e = [0.64, 0.33, 0.3, 0.6, 0.15, 0.06], t = [0.2126, 0.7152, 0.0722], n = [0.3127, 0.329];
  return a13.define({ [yr]: { primaries: e, whitePoint: n, transfer: Sr, toXYZ: Rs, fromXYZ: Ps, luminanceCoefficients: t, workingColorSpaceConfig: { unpackColorSpace: at }, outputColorSpaceConfig: { drawingBufferColorSpace: at } }, [at]: { primaries: e, whitePoint: n, transfer: ri, toXYZ: Rs, fromXYZ: Ps, luminanceCoefficients: t, outputColorSpaceConfig: { drawingBufferColorSpace: at } } }), a13;
}
var st = Ol();
function St(a13) {
  return a13 < 0.04045 ? a13 * 0.0773993808 : Math.pow(a13 * 0.9478672986 + 0.0521327014, 2.4);
}
function hn(a13) {
  return a13 < 31308e-7 ? a13 * 12.92 : 1.055 * Math.pow(a13, 0.41666) - 0.055;
}
var Jt, oi = class {
  static getDataURL(e, t = "image/png") {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u") return e.src;
    let n;
    if (e instanceof HTMLCanvasElement) n = e;
    else {
      Jt === void 0 && (Jt = br("canvas")), Jt.width = e.width, Jt.height = e.height;
      let i = Jt.getContext("2d");
      e instanceof ImageData ? i.putImageData(e, 0, 0) : i.drawImage(e, 0, 0, e.width, e.height), n = Jt;
    }
    return n.toDataURL(t);
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      let t = br("canvas");
      t.width = e.width, t.height = e.height;
      let n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      let i = n.getImageData(0, 0, e.width, e.height), r = i.data;
      for (let s = 0; s < r.length; s++) r[s] = St(r[s] / 255) * 255;
      return n.putImageData(i, 0, 0), t;
    } else if (e.data) {
      let t = e.data.slice(0);
      for (let n = 0; n < t.length; n++) t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(St(t[n] / 255) * 255) : t[n] = St(t[n]);
      return { data: t, width: e.width, height: e.height };
    } else return Pe("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}, Bl = 0, li = class {
  constructor(e = null) {
    this.isTextureSource = true, Object.defineProperty(this, "id", { value: Bl++ }), this.uuid = Pn(), this.data = e, this.dataReady = true, this.version = 0;
  }
  getSize(e) {
    let t = this.data;
    return typeof HTMLVideoElement < "u" && t instanceof HTMLVideoElement ? e.set(t.videoWidth, t.videoHeight, 0) : typeof VideoFrame < "u" && t instanceof VideoFrame ? e.set(t.displayWidth, t.displayHeight, 0) : t !== null ? e.set(t.width, t.height, t.depth || 0) : e.set(0, 0, 0), e;
  }
  set needsUpdate(e) {
    e === true && this.version++;
  }
  toJSON(e) {
    let t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0) return e.images[this.uuid];
    let n = { uuid: this.uuid, url: "" }, i = this.data;
    if (i !== null) {
      let r;
      if (Array.isArray(i)) {
        r = [];
        for (let s = 0, h = i.length; s < h; s++) i[s].isDataTexture ? r.push(Wi(i[s].image)) : r.push(Wi(i[s]));
      } else r = Wi(i);
      n.url = r;
    }
    return t || (e.images[this.uuid] = n), n;
  }
};
function Wi(a13) {
  return typeof HTMLImageElement < "u" && a13 instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && a13 instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && a13 instanceof ImageBitmap ? oi.getDataURL(a13) : a13.data ? { data: Array.from(a13.data), width: a13.width, height: a13.height, type: a13.data.constructor.name } : (Pe("Texture: Unable to serialize Texture."), {});
}
var zl = 0, Xi = new U(), un = class a4 extends Wt {
  constructor(e = a4.DEFAULT_IMAGE, t = a4.DEFAULT_MAPPING, n = Mn, i = Mn, r = Nr, s = Ys, h = Ks, c = Zs, u = a4.DEFAULT_ANISOTROPY, f = Fr) {
    super(), this.isTexture = true, Object.defineProperty(this, "id", { value: zl++ }), this.uuid = Pn(), this.name = "", this.source = new li(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = i, this.magFilter = r, this.minFilter = s, this.anisotropy = u, this.format = h, this.internalFormat = null, this.type = c, this.offset = new Je(0, 0), this.repeat = new Je(1, 1), this.center = new Je(0, 0), this.rotation = 0, this.matrixAutoUpdate = true, this.matrix = new J(), this.generateMipmaps = true, this.premultiplyAlpha = false, this.flipY = true, this.unpackAlignment = 4, this.colorSpace = f, this.userData = {}, this.updateRanges = [], this.version = 0, this.onUpdate = null, this.renderTarget = null, this.isRenderTargetTexture = false, this.isArrayTexture = !!(e && e.depth && e.depth > 1), this.pmremVersion = 0, this.normalized = false;
  }
  get width() {
    return this.source.getSize(Xi).x;
  }
  get height() {
    return this.source.getSize(Xi).y;
  }
  get depth() {
    return this.source.getSize(Xi).z;
  }
  get image() {
    return this.source.data;
  }
  set image(e) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.normalized = e.normalized, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.renderTarget = e.renderTarget, this.isRenderTargetTexture = e.isRenderTargetTexture, this.isArrayTexture = e.isArrayTexture, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = true, this;
  }
  setValues(e) {
    for (let t in e) {
      let n = e[t];
      if (n === void 0) {
        Pe(`Texture.setValues(): parameter '${t}' has value of undefined.`);
        continue;
      }
      let i = this[t];
      if (i === void 0) {
        Pe(`Texture.setValues(): property '${t}' does not exist.`);
        continue;
      }
      i && n && i.isVector2 && n.isVector2 || i && n && i.isVector3 && n.isVector3 || i && n && i.isMatrix3 && n.isMatrix3 ? i.copy(n) : this[t] = n;
    }
  }
  toJSON(e) {
    let t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0) return e.textures[this.uuid];
    let n = { metadata: { version: 4.7, type: "Texture", generator: "Texture.toJSON" }, uuid: this.uuid, name: this.name, image: this.source.toJSON(e).uuid, mapping: this.mapping, channel: this.channel, repeat: [this.repeat.x, this.repeat.y], offset: [this.offset.x, this.offset.y], center: [this.center.x, this.center.y], rotation: this.rotation, wrap: [this.wrapS, this.wrapT], format: this.format, internalFormat: this.internalFormat, type: this.type, normalized: this.normalized, colorSpace: this.colorSpace, minFilter: this.minFilter, magFilter: this.magFilter, anisotropy: this.anisotropy, flipY: this.flipY, generateMipmaps: this.generateMipmaps, premultiplyAlpha: this.premultiplyAlpha, unpackAlignment: this.unpackAlignment };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== Dr) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1) switch (this.wrapS) {
      case pr:
        e.x = e.x - Math.floor(e.x);
        break;
      case Mn:
        e.x = e.x < 0 ? 0 : 1;
        break;
      case mr:
        Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
        break;
    }
    if (e.y < 0 || e.y > 1) switch (this.wrapT) {
      case pr:
        e.y = e.y - Math.floor(e.y);
        break;
      case Mn:
        e.y = e.y < 0 ? 0 : 1;
        break;
      case mr:
        Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
        break;
    }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === true && (this.version++, this.source.needsUpdate = true);
  }
  set needsPMREMUpdate(e) {
    e === true && this.pmremVersion++;
  }
};
un.DEFAULT_IMAGE = null;
un.DEFAULT_MAPPING = Dr;
un.DEFAULT_ANISOTROPY = 1;
var fn = class a5 {
  static {
    a5.prototype.isVector4 = true;
  }
  constructor(e = 0, t = 0, n = 0, i = 1) {
    this.x = e, this.y = t, this.z = n, this.w = i;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, n, i) {
    return this.x = e, this.y = t, this.z = n, this.w = i, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("THREE.Vector4: index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    let t = this.x, n = this.y, i = this.z, r = this.w, s = e.elements;
    return this.x = s[0] * t + s[4] * n + s[8] * i + s[12] * r, this.y = s[1] * t + s[5] * n + s[9] * i + s[13] * r, this.z = s[2] * t + s[6] * n + s[10] * i + s[14] * r, this.w = s[3] * t + s[7] * n + s[11] * i + s[15] * r, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this.w /= e.w, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    let t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, n, i, r, c = e.elements, u = c[0], f = c[4], d = c[8], v = c[1], m = c[5], g = c[9], _ = c[2], b = c[6], A = c[10];
    if (Math.abs(f - v) < 0.01 && Math.abs(d - _) < 0.01 && Math.abs(g - b) < 0.01) {
      if (Math.abs(f + v) < 0.1 && Math.abs(d + _) < 0.1 && Math.abs(g + b) < 0.1 && Math.abs(u + m + A - 3) < 0.1) return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      let F = (u + 1) / 2, k = (m + 1) / 2, L = (A + 1) / 2, O = (f + v) / 4, G = (d + _) / 4, N = (g + b) / 4;
      return F > k && F > L ? F < 0.01 ? (n = 0, i = 0.707106781, r = 0.707106781) : (n = Math.sqrt(F), i = O / n, r = G / n) : k > L ? k < 0.01 ? (n = 0.707106781, i = 0, r = 0.707106781) : (i = Math.sqrt(k), n = O / i, r = N / i) : L < 0.01 ? (n = 0.707106781, i = 0.707106781, r = 0) : (r = Math.sqrt(L), n = G / r, i = N / r), this.set(n, i, r, t), this;
    }
    let R = Math.sqrt((b - g) * (b - g) + (d - _) * (d - _) + (v - f) * (v - f));
    return Math.abs(R) < 1e-3 && (R = 1), this.x = (b - g) / R, this.y = (d - _) / R, this.z = (v - f) / R, this.w = Math.acos((u + m + A - 1) / 2), this;
  }
  setFromMatrixPosition(e) {
    let t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this.w = t[15], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = ee(this.x, e.x, t.x), this.y = ee(this.y, e.y, t.y), this.z = ee(this.z, e.z, t.z), this.w = ee(this.w, e.w, t.w), this;
  }
  clampScalar(e, t) {
    return this.x = ee(this.x, e, t), this.y = ee(this.y, e, t), this.z = ee(this.z, e, t), this.w = ee(this.w, e, t), this;
  }
  clampLength(e, t) {
    let n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(ee(n, e, t));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
};
var dt = class a6 {
  static {
    a6.prototype.isMatrix4 = true;
  }
  constructor(e, t, n, i, r, s, h, c, u, f, d, v, m, g, _, b) {
    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], e !== void 0 && this.set(e, t, n, i, r, s, h, c, u, f, d, v, m, g, _, b);
  }
  set(e, t, n, i, r, s, h, c, u, f, d, v, m, g, _, b) {
    let A = this.elements;
    return A[0] = e, A[4] = t, A[8] = n, A[12] = i, A[1] = r, A[5] = s, A[9] = h, A[13] = c, A[2] = u, A[6] = f, A[10] = d, A[14] = v, A[3] = m, A[7] = g, A[11] = _, A[15] = b, this;
  }
  identity() {
    return this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  clone() {
    return new a6().fromArray(this.elements);
  }
  copy(e) {
    let t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  copyPosition(e) {
    let t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  setFromMatrix3(e) {
    let t = e.elements;
    return this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1), this;
  }
  extractBasis(e, t, n) {
    return this.determinantAffine() === 0 ? (e.set(1, 0, 0), t.set(0, 1, 0), n.set(0, 0, 1), this) : (e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this);
  }
  makeBasis(e, t, n) {
    return this.set(e.x, t.x, n.x, 0, e.y, t.y, n.y, 0, e.z, t.z, n.z, 0, 0, 0, 0, 1), this;
  }
  extractRotation(e) {
    if (e.determinantAffine() === 0) return this.identity();
    let t = this.elements, n = e.elements, i = 1 / Kt.setFromMatrixColumn(e, 0).length(), r = 1 / Kt.setFromMatrixColumn(e, 1).length(), s = 1 / Kt.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * i, t[1] = n[1] * i, t[2] = n[2] * i, t[3] = 0, t[4] = n[4] * r, t[5] = n[5] * r, t[6] = n[6] * r, t[7] = 0, t[8] = n[8] * s, t[9] = n[9] * s, t[10] = n[10] * s, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    let t = this.elements, n = e.x, i = e.y, r = e.z, s = Math.cos(n), h = Math.sin(n), c = Math.cos(i), u = Math.sin(i), f = Math.cos(r), d = Math.sin(r);
    if (e.order === "XYZ") {
      let v = s * f, m = s * d, g = h * f, _ = h * d;
      t[0] = c * f, t[4] = -c * d, t[8] = u, t[1] = m + g * u, t[5] = v - _ * u, t[9] = -h * c, t[2] = _ - v * u, t[6] = g + m * u, t[10] = s * c;
    } else if (e.order === "YXZ") {
      let v = c * f, m = c * d, g = u * f, _ = u * d;
      t[0] = v + _ * h, t[4] = g * h - m, t[8] = s * u, t[1] = s * d, t[5] = s * f, t[9] = -h, t[2] = m * h - g, t[6] = _ + v * h, t[10] = s * c;
    } else if (e.order === "ZXY") {
      let v = c * f, m = c * d, g = u * f, _ = u * d;
      t[0] = v - _ * h, t[4] = -s * d, t[8] = g + m * h, t[1] = m + g * h, t[5] = s * f, t[9] = _ - v * h, t[2] = -s * u, t[6] = h, t[10] = s * c;
    } else if (e.order === "ZYX") {
      let v = s * f, m = s * d, g = h * f, _ = h * d;
      t[0] = c * f, t[4] = g * u - m, t[8] = v * u + _, t[1] = c * d, t[5] = _ * u + v, t[9] = m * u - g, t[2] = -u, t[6] = h * c, t[10] = s * c;
    } else if (e.order === "YZX") {
      let v = s * c, m = s * u, g = h * c, _ = h * u;
      t[0] = c * f, t[4] = _ - v * d, t[8] = g * d + m, t[1] = d, t[5] = s * f, t[9] = -h * f, t[2] = -u * f, t[6] = m * d + g, t[10] = v - _ * d;
    } else if (e.order === "XZY") {
      let v = s * c, m = s * u, g = h * c, _ = h * u;
      t[0] = c * f, t[4] = -d, t[8] = u * f, t[1] = v * d + _, t[5] = s * f, t[9] = m * d - g, t[2] = g * d - m, t[6] = h * f, t[10] = _ * d + v;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(kl, e, Vl);
  }
  lookAt(e, t, n) {
    let i = this.elements;
    return et.subVectors(e, t), et.lengthSq() === 0 && (et.z = 1), et.normalize(), Ct.crossVectors(n, et), Ct.lengthSq() === 0 && (Math.abs(n.z) === 1 ? et.x += 1e-4 : et.z += 1e-4, et.normalize(), Ct.crossVectors(n, et)), Ct.normalize(), $n.crossVectors(et, Ct), i[0] = Ct.x, i[4] = $n.x, i[8] = et.x, i[1] = Ct.y, i[5] = $n.y, i[9] = et.y, i[2] = Ct.z, i[6] = $n.z, i[10] = et.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    let n = e.elements, i = t.elements, r = this.elements, s = n[0], h = n[4], c = n[8], u = n[12], f = n[1], d = n[5], v = n[9], m = n[13], g = n[2], _ = n[6], b = n[10], A = n[14], R = n[3], F = n[7], k = n[11], L = n[15], O = i[0], G = i[4], N = i[8], D = i[12], V = i[1], $ = i[5], Y = i[9], H = i[13], K = i[2], W = i[6], ce = i[10], se = i[14], Z = i[3], de = i[7], qe = i[11], be = i[15];
    return r[0] = s * O + h * V + c * K + u * Z, r[4] = s * G + h * $ + c * W + u * de, r[8] = s * N + h * Y + c * ce + u * qe, r[12] = s * D + h * H + c * se + u * be, r[1] = f * O + d * V + v * K + m * Z, r[5] = f * G + d * $ + v * W + m * de, r[9] = f * N + d * Y + v * ce + m * qe, r[13] = f * D + d * H + v * se + m * be, r[2] = g * O + _ * V + b * K + A * Z, r[6] = g * G + _ * $ + b * W + A * de, r[10] = g * N + _ * Y + b * ce + A * qe, r[14] = g * D + _ * H + b * se + A * be, r[3] = R * O + F * V + k * K + L * Z, r[7] = R * G + F * $ + k * W + L * de, r[11] = R * N + F * Y + k * ce + L * qe, r[15] = R * D + F * H + k * se + L * be, this;
  }
  multiplyScalar(e) {
    let t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    let e = this.elements, t = e[0], n = e[4], i = e[8], r = e[12], s = e[1], h = e[5], c = e[9], u = e[13], f = e[2], d = e[6], v = e[10], m = e[14], g = e[3], _ = e[7], b = e[11], A = e[15], R = c * m - u * v, F = h * m - u * d, k = h * v - c * d, L = s * m - u * f, O = s * v - c * f, G = s * d - h * f;
    return t * (_ * R - b * F + A * k) - n * (g * R - b * L + A * O) + i * (g * F - _ * L + A * G) - r * (g * k - _ * O + b * G);
  }
  determinantAffine() {
    let e = this.elements, t = e[0], n = e[4], i = e[8], r = e[1], s = e[5], h = e[9], c = e[2], u = e[6], f = e[10];
    return t * (s * f - h * u) - n * (r * f - h * c) + i * (r * u - s * c);
  }
  transpose() {
    let e = this.elements, t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, n) {
    let i = this.elements;
    return e.isVector3 ? (i[12] = e.x, i[13] = e.y, i[14] = e.z) : (i[12] = e, i[13] = t, i[14] = n), this;
  }
  invert() {
    let e = this.elements, t = e[0], n = e[1], i = e[2], r = e[3], s = e[4], h = e[5], c = e[6], u = e[7], f = e[8], d = e[9], v = e[10], m = e[11], g = e[12], _ = e[13], b = e[14], A = e[15], R = t * h - n * s, F = t * c - i * s, k = t * u - r * s, L = n * c - i * h, O = n * u - r * h, G = i * u - r * c, N = f * _ - d * g, D = f * b - v * g, V = f * A - m * g, $ = d * b - v * _, Y = d * A - m * _, H = v * A - m * b, K = R * H - F * Y + k * $ + L * V - O * D + G * N;
    if (K === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    let W = 1 / K;
    return e[0] = (h * H - c * Y + u * $) * W, e[1] = (i * Y - n * H - r * $) * W, e[2] = (_ * G - b * O + A * L) * W, e[3] = (v * O - d * G - m * L) * W, e[4] = (c * V - s * H - u * D) * W, e[5] = (t * H - i * V + r * D) * W, e[6] = (b * k - g * G - A * F) * W, e[7] = (f * G - v * k + m * F) * W, e[8] = (s * Y - h * V + u * N) * W, e[9] = (n * V - t * Y - r * N) * W, e[10] = (g * O - _ * k + A * R) * W, e[11] = (d * k - f * O - m * R) * W, e[12] = (h * D - s * $ - c * N) * W, e[13] = (t * $ - n * D + i * N) * W, e[14] = (_ * F - g * L - b * R) * W, e[15] = (f * L - d * F + v * R) * W, this;
  }
  scale(e) {
    let t = this.elements, n = e.x, i = e.y, r = e.z;
    return t[0] *= n, t[4] *= i, t[8] *= r, t[1] *= n, t[5] *= i, t[9] *= r, t[2] *= n, t[6] *= i, t[10] *= r, t[3] *= n, t[7] *= i, t[11] *= r, this;
  }
  getMaxScaleOnAxis() {
    let e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], i = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, i));
  }
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1) : this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, n, 0, 0, 0, 1), this;
  }
  makeRotationX(e) {
    let t = Math.cos(e), n = Math.sin(e);
    return this.set(1, 0, 0, 0, 0, t, -n, 0, 0, n, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationY(e) {
    let t = Math.cos(e), n = Math.sin(e);
    return this.set(t, 0, n, 0, 0, 1, 0, 0, -n, 0, t, 0, 0, 0, 0, 1), this;
  }
  makeRotationZ(e) {
    let t = Math.cos(e), n = Math.sin(e);
    return this.set(t, -n, 0, 0, n, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1), this;
  }
  makeRotationAxis(e, t) {
    let n = Math.cos(t), i = Math.sin(t), r = 1 - n, s = e.x, h = e.y, c = e.z, u = r * s, f = r * h;
    return this.set(u * s + n, u * h - i * c, u * c + i * h, 0, u * h + i * c, f * h + n, f * c - i * s, 0, u * c - i * h, f * c + i * s, r * c * c + n, 0, 0, 0, 0, 1), this;
  }
  makeScale(e, t, n) {
    return this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, n, 0, 0, 0, 0, 1), this;
  }
  makeShear(e, t, n, i, r, s) {
    return this.set(1, n, r, 0, e, 1, s, 0, t, i, 1, 0, 0, 0, 0, 1), this;
  }
  compose(e, t, n) {
    let i = this.elements, r = t._x, s = t._y, h = t._z, c = t._w, u = r + r, f = s + s, d = h + h, v = r * u, m = r * f, g = r * d, _ = s * f, b = s * d, A = h * d, R = c * u, F = c * f, k = c * d, L = n.x, O = n.y, G = n.z;
    return i[0] = (1 - (_ + A)) * L, i[1] = (m + k) * L, i[2] = (g - F) * L, i[3] = 0, i[4] = (m - k) * O, i[5] = (1 - (v + A)) * O, i[6] = (b + R) * O, i[7] = 0, i[8] = (g + F) * G, i[9] = (b - R) * G, i[10] = (1 - (v + _)) * G, i[11] = 0, i[12] = e.x, i[13] = e.y, i[14] = e.z, i[15] = 1, this;
  }
  decompose(e, t, n) {
    let i = this.elements;
    e.x = i[12], e.y = i[13], e.z = i[14];
    let r = this.determinantAffine();
    if (r === 0) return n.set(1, 1, 1), t.identity(), this;
    let s = Kt.set(i[0], i[1], i[2]).length(), h = Kt.set(i[4], i[5], i[6]).length(), c = Kt.set(i[8], i[9], i[10]).length();
    r < 0 && (s = -s), ct.copy(this);
    let u = 1 / s, f = 1 / h, d = 1 / c;
    return ct.elements[0] *= u, ct.elements[1] *= u, ct.elements[2] *= u, ct.elements[4] *= f, ct.elements[5] *= f, ct.elements[6] *= f, ct.elements[8] *= d, ct.elements[9] *= d, ct.elements[10] *= d, t.setFromRotationMatrix(ct), n.x = s, n.y = h, n.z = c, this;
  }
  makePerspective(e, t, n, i, r, s, h = bn, c = false) {
    let u = this.elements, f = 2 * r / (t - e), d = 2 * r / (n - i), v = (t + e) / (t - e), m = (n + i) / (n - i), g, _;
    if (c) g = r / (s - r), _ = s * r / (s - r);
    else if (h === bn) g = -(s + r) / (s - r), _ = -2 * s * r / (s - r);
    else if (h === Mr) g = -s / (s - r), _ = -s * r / (s - r);
    else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + h);
    return u[0] = f, u[4] = 0, u[8] = v, u[12] = 0, u[1] = 0, u[5] = d, u[9] = m, u[13] = 0, u[2] = 0, u[6] = 0, u[10] = g, u[14] = _, u[3] = 0, u[7] = 0, u[11] = -1, u[15] = 0, this;
  }
  makeOrthographic(e, t, n, i, r, s, h = bn, c = false) {
    let u = this.elements, f = 2 / (t - e), d = 2 / (n - i), v = -(t + e) / (t - e), m = -(n + i) / (n - i), g, _;
    if (c) g = 1 / (s - r), _ = s / (s - r);
    else if (h === bn) g = -2 / (s - r), _ = -(s + r) / (s - r);
    else if (h === Mr) g = -1 / (s - r), _ = -r / (s - r);
    else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + h);
    return u[0] = f, u[4] = 0, u[8] = 0, u[12] = v, u[1] = 0, u[5] = d, u[9] = 0, u[13] = m, u[2] = 0, u[6] = 0, u[10] = g, u[14] = _, u[3] = 0, u[7] = 0, u[11] = 0, u[15] = 1, this;
  }
  equals(e) {
    let t = this.elements, n = e.elements;
    for (let i = 0; i < 16; i++) if (t[i] !== n[i]) return false;
    return true;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++) this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    let n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
}, Kt = new U(), ct = new dt(), kl = new U(0, 0, 0), Vl = new U(1, 1, 1), Ct = new U(), $n = new U(), et = new U(), Is = new dt(), Ls = new Mt(), En = class a7 {
  constructor(e = 0, t = 0, n = 0, i = a7.DEFAULT_ORDER) {
    this.isEuler = true, this._x = e, this._y = t, this._z = n, this._order = i;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, n, i = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = i, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, n = true) {
    let i = e.elements, r = i[0], s = i[4], h = i[8], c = i[1], u = i[5], f = i[9], d = i[2], v = i[6], m = i[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(ee(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._x = Math.atan2(-f, m), this._z = Math.atan2(-s, r)) : (this._x = Math.atan2(v, u), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-ee(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._y = Math.atan2(h, m), this._z = Math.atan2(c, u)) : (this._y = Math.atan2(-d, r), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(ee(v, -1, 1)), Math.abs(v) < 0.9999999 ? (this._y = Math.atan2(-d, m), this._z = Math.atan2(-s, u)) : (this._y = 0, this._z = Math.atan2(c, r));
        break;
      case "ZYX":
        this._y = Math.asin(-ee(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(v, m), this._z = Math.atan2(c, r)) : (this._x = 0, this._z = Math.atan2(-s, u));
        break;
      case "YZX":
        this._z = Math.asin(ee(c, -1, 1)), Math.abs(c) < 0.9999999 ? (this._x = Math.atan2(-f, u), this._y = Math.atan2(-d, r)) : (this._x = 0, this._y = Math.atan2(h, m));
        break;
      case "XZY":
        this._z = Math.asin(-ee(s, -1, 1)), Math.abs(s) < 0.9999999 ? (this._x = Math.atan2(v, u), this._y = Math.atan2(h, r)) : (this._x = Math.atan2(-f, m), this._y = 0);
        break;
      default:
        Pe("Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === true && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return Is.makeRotationFromQuaternion(e), this.setFromRotationMatrix(Is, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return Ls.setFromEuler(this), this.setFromQuaternion(Ls, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
};
En.DEFAULT_ORDER = "XYZ";
var ci = class {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}, Hl = 0, Ds = new U(), jt = new Mt(), vt = new dt(), Yn = new U(), _n = new U(), Gl = new U(), Wl = new Mt(), Us = new U(1, 0, 0), Ns = new U(0, 1, 0), Fs = new U(0, 0, 1), Os = { type: "added" }, Xl = { type: "removed" }, Qt = { type: "childadded", child: null }, qi = { type: "childremoved", child: null }, Xt = class a8 extends Wt {
  constructor() {
    super(), this.isObject3D = true, Object.defineProperty(this, "id", { value: Hl++ }), this.uuid = Pn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = a8.DEFAULT_UP.clone();
    let e = new U(), t = new En(), n = new Mt(), i = new U(1, 1, 1);
    function r() {
      n.setFromEuler(t, false);
    }
    function s() {
      t.setFromQuaternion(n, void 0, false);
    }
    t._onChange(r), n._onChange(s), Object.defineProperties(this, { position: { configurable: true, enumerable: true, value: e }, rotation: { configurable: true, enumerable: true, value: t }, quaternion: { configurable: true, enumerable: true, value: n }, scale: { configurable: true, enumerable: true, value: i }, modelViewMatrix: { value: new dt() }, normalMatrix: { value: new J() } }), this.matrix = new dt(), this.matrixWorld = new dt(), this.matrixAutoUpdate = a8.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = a8.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = false, this.layers = new ci(), this.visible = true, this.castShadow = false, this.receiveShadow = false, this.frustumCulled = true, this.renderOrder = 0, this.animations = [], this.customDepthMaterial = void 0, this.customDistanceMaterial = void 0, this.static = false, this.userData = {}, this.pivot = null;
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, true);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return jt.setFromAxisAngle(e, t), this.quaternion.multiply(jt), this;
  }
  rotateOnWorldAxis(e, t) {
    return jt.setFromAxisAngle(e, t), this.quaternion.premultiply(jt), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(Us, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(Ns, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(Fs, e);
  }
  translateOnAxis(e, t) {
    return Ds.copy(e).applyQuaternion(this.quaternion), this.position.add(Ds.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(Us, e);
  }
  translateY(e) {
    return this.translateOnAxis(Ns, e);
  }
  translateZ(e) {
    return this.translateOnAxis(Fs, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(true, false), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(true, false), e.applyMatrix4(vt.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? Yn.copy(e) : Yn.set(e, t, n);
    let i = this.parent;
    this.updateWorldMatrix(true, false), _n.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? vt.lookAt(_n, Yn, this.up) : vt.lookAt(Yn, _n, this.up), this.quaternion.setFromRotationMatrix(vt), i && (vt.extractRotation(i.matrixWorld), jt.setFromRotationMatrix(vt), this.quaternion.premultiply(jt.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++) this.add(arguments[t]);
      return this;
    }
    return e === this ? (Se("Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.removeFromParent(), e.parent = this, this.children.push(e), e.dispatchEvent(Os), Qt.child = e, this.dispatchEvent(Qt), Qt.child = null) : Se("Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++) this.remove(arguments[n]);
      return this;
    }
    let t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Xl), qi.child = e, this.dispatchEvent(qi), qi.child = null), this;
  }
  removeFromParent() {
    let e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(true, false), vt.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(true, false), vt.multiply(e.parent.matrixWorld)), e.applyMatrix4(vt), e.removeFromParent(), e.parent = this, this.children.push(e), e.updateWorldMatrix(false, true), e.dispatchEvent(Os), Qt.child = e, this.dispatchEvent(Qt), Qt.child = null, this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, i = this.children.length; n < i; n++) {
      let s = this.children[n].getObjectByProperty(e, t);
      if (s !== void 0) return s;
    }
  }
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    let i = this.children;
    for (let r = 0, s = i.length; r < s; r++) i[r].getObjectsByProperty(e, t, n);
    return n;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(true, false), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(_n, e, Gl), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(true, false), this.matrixWorld.decompose(_n, Wl, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(true, false);
    let t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {
  }
  intersectsFrustum() {
  }
  traverse(e) {
    e(this);
    let t = this.children;
    for (let n = 0, i = t.length; n < i; n++) t[n].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === false) return;
    e(this);
    let t = this.children;
    for (let n = 0, i = t.length; n < i; n++) t[n].traverseVisible(e);
  }
  traverseAncestors(e) {
    let t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    let e = this.pivot;
    if (e !== null) {
      let t = e.x, n = e.y, i = e.z, r = this.matrix.elements;
      r[12] += t - r[0] * t - r[4] * n - r[8] * i, r[13] += n - r[1] * t - r[5] * n - r[9] * i, r[14] += i - r[2] * t - r[6] * n - r[10] * i;
    }
    this.matrixWorldNeedsUpdate = true;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.matrixWorldAutoUpdate === true && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = false, e = true);
    let t = this.children;
    for (let n = 0, i = t.length; n < i; n++) t[n].updateMatrixWorld(e);
  }
  updateWorldMatrix(e, t, n = false) {
    let i = this.parent;
    if (e === true && i !== null && i.updateWorldMatrix(true, false), this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || n) && (this.matrixWorldAutoUpdate === true && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix)), this.matrixWorldNeedsUpdate = false, n = true), t === true) {
      let r = this.children;
      for (let s = 0, h = r.length; s < h; s++) r[s].updateWorldMatrix(false, true, n);
    }
  }
  toJSON(e) {
    let t = e === void 0 || typeof e == "string", n = {};
    t && (e = { geometries: {}, materials: {}, textures: {}, images: {}, shapes: {}, skeletons: {}, animations: {}, nodes: {} }, n.metadata = { version: 4.7, type: "Object", generator: "Object3D.toJSON" });
    let i = {};
    i.uuid = this.uuid, i.type = this.type, i.name = this.name, i.castShadow = this.castShadow, i.receiveShadow = this.receiveShadow, i.visible = this.visible, i.frustumCulled = this.frustumCulled, i.renderOrder = this.renderOrder, i.static = this.static, i.matrixAutoUpdate = this.matrixAutoUpdate, Object.keys(this.userData).length > 0 && (i.userData = this.userData), i.layers = this.layers.mask, i.matrix = this.matrix.toArray(), i.up = this.up.toArray(), this.pivot !== null && (i.pivot = this.pivot.toArray()), this.morphTargetDictionary !== void 0 && (i.morphTargetDictionary = Object.assign({}, this.morphTargetDictionary)), this.morphTargetInfluences !== void 0 && (i.morphTargetInfluences = this.morphTargetInfluences.slice()), this.isInstancedMesh && (i.type = "InstancedMesh", i.count = this.count, i.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (i.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (i.type = "BatchedMesh", i.perObjectFrustumCulled = this.perObjectFrustumCulled, i.sortObjects = this.sortObjects, i.drawRanges = this._drawRanges, i.reservedRanges = this._reservedRanges, i.geometryInfo = this._geometryInfo.map((h) => ({ ...h, boundingBox: h.boundingBox ? h.boundingBox.toJSON() : void 0, boundingSphere: h.boundingSphere ? h.boundingSphere.toJSON() : void 0 })), i.instanceInfo = this._instanceInfo.map((h) => ({ ...h })), i.availableInstanceIds = this._availableInstanceIds.slice(), i.availableGeometryIds = this._availableGeometryIds.slice(), i.nextIndexStart = this._nextIndexStart, i.nextVertexStart = this._nextVertexStart, i.geometryCount = this._geometryCount, i.maxInstanceCount = this._maxInstanceCount, i.maxVertexCount = this._maxVertexCount, i.maxIndexCount = this._maxIndexCount, i.geometryInitialized = this._geometryInitialized, i.matricesTexture = this._matricesTexture.toJSON(e), i.indirectTexture = this._indirectTexture.toJSON(e), this._colorsTexture !== null && (i.colorsTexture = this._colorsTexture.toJSON(e)), this.boundingSphere !== null && (i.boundingSphere = this.boundingSphere.toJSON()), this.boundingBox !== null && (i.boundingBox = this.boundingBox.toJSON()));
    function r(h, c) {
      return h[c.uuid] === void 0 && (h[c.uuid] = c.toJSON(e)), c.uuid;
    }
    if (this.isScene) this.background && (this.background.isColor ? i.background = this.background.toJSON() : this.background.isTexture && (i.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true && (i.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      i.geometry = r(e.geometries, this.geometry);
      let h = this.geometry.parameters;
      if (h !== void 0 && h.shapes !== void 0) {
        let c = h.shapes;
        if (Array.isArray(c)) for (let u = 0, f = c.length; u < f; u++) {
          let d = c[u];
          r(e.shapes, d);
        }
        else r(e.shapes, c);
      }
    }
    if (this.isSkinnedMesh && (i.bindMode = this.bindMode, i.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (r(e.skeletons, this.skeleton), i.skeleton = this.skeleton.uuid)), this.material !== void 0) if (Array.isArray(this.material)) {
      let h = [];
      for (let c = 0, u = this.material.length; c < u; c++) h.push(r(e.materials, this.material[c]));
      i.material = h;
    } else i.material = r(e.materials, this.material);
    if (this.children.length > 0) {
      i.children = [];
      for (let h = 0; h < this.children.length; h++) i.children.push(this.children[h].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      i.animations = [];
      for (let h = 0; h < this.animations.length; h++) {
        let c = this.animations[h];
        i.animations.push(r(e.animations, c));
      }
    }
    if (t) {
      let h = s(e.geometries), c = s(e.materials), u = s(e.textures), f = s(e.images), d = s(e.shapes), v = s(e.skeletons), m = s(e.animations), g = s(e.nodes);
      h.length > 0 && (n.geometries = h), c.length > 0 && (n.materials = c), u.length > 0 && (n.textures = u), f.length > 0 && (n.images = f), d.length > 0 && (n.shapes = d), v.length > 0 && (n.skeletons = v), m.length > 0 && (n.animations = m), g.length > 0 && (n.nodes = g);
    }
    return n.object = i, n;
    function s(h) {
      let c = [];
      for (let u in h) {
        let f = h[u];
        delete f.metadata, c.push(f);
      }
      return c;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = true) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.pivot = e.pivot !== null ? e.pivot.clone() : null, this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.static = e.static, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === true) for (let n = 0; n < e.children.length; n++) {
      let i = e.children[n];
      this.add(i.clone());
    }
    return this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
};
Xt.DEFAULT_UP = new U(0, 1, 0);
Xt.DEFAULT_MATRIX_AUTO_UPDATE = true;
Xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
var ea = { aliceblue: 15792383, antiquewhite: 16444375, aqua: 65535, aquamarine: 8388564, azure: 15794175, beige: 16119260, bisque: 16770244, black: 0, blanchedalmond: 16772045, blue: 255, blueviolet: 9055202, brown: 10824234, burlywood: 14596231, cadetblue: 6266528, chartreuse: 8388352, chocolate: 13789470, coral: 16744272, cornflowerblue: 6591981, cornsilk: 16775388, crimson: 14423100, cyan: 65535, darkblue: 139, darkcyan: 35723, darkgoldenrod: 12092939, darkgray: 11119017, darkgreen: 25600, darkgrey: 11119017, darkkhaki: 12433259, darkmagenta: 9109643, darkolivegreen: 5597999, darkorange: 16747520, darkorchid: 10040012, darkred: 9109504, darksalmon: 15308410, darkseagreen: 9419919, darkslateblue: 4734347, darkslategray: 3100495, darkslategrey: 3100495, darkturquoise: 52945, darkviolet: 9699539, deeppink: 16716947, deepskyblue: 49151, dimgray: 6908265, dimgrey: 6908265, dodgerblue: 2003199, firebrick: 11674146, floralwhite: 16775920, forestgreen: 2263842, fuchsia: 16711935, gainsboro: 14474460, ghostwhite: 16316671, gold: 16766720, goldenrod: 14329120, gray: 8421504, green: 32768, greenyellow: 11403055, grey: 8421504, honeydew: 15794160, hotpink: 16738740, indianred: 13458524, indigo: 4915330, ivory: 16777200, khaki: 15787660, lavender: 15132410, lavenderblush: 16773365, lawngreen: 8190976, lemonchiffon: 16775885, lightblue: 11393254, lightcoral: 15761536, lightcyan: 14745599, lightgoldenrodyellow: 16448210, lightgray: 13882323, lightgreen: 9498256, lightgrey: 13882323, lightpink: 16758465, lightsalmon: 16752762, lightseagreen: 2142890, lightskyblue: 8900346, lightslategray: 7833753, lightslategrey: 7833753, lightsteelblue: 11584734, lightyellow: 16777184, lime: 65280, limegreen: 3329330, linen: 16445670, magenta: 16711935, maroon: 8388608, mediumaquamarine: 6737322, mediumblue: 205, mediumorchid: 12211667, mediumpurple: 9662683, mediumseagreen: 3978097, mediumslateblue: 8087790, mediumspringgreen: 64154, mediumturquoise: 4772300, mediumvioletred: 13047173, midnightblue: 1644912, mintcream: 16121850, mistyrose: 16770273, moccasin: 16770229, navajowhite: 16768685, navy: 128, oldlace: 16643558, olive: 8421376, olivedrab: 7048739, orange: 16753920, orangered: 16729344, orchid: 14315734, palegoldenrod: 15657130, palegreen: 10025880, paleturquoise: 11529966, palevioletred: 14381203, papayawhip: 16773077, peachpuff: 16767673, peru: 13468991, pink: 16761035, plum: 14524637, powderblue: 11591910, purple: 8388736, rebeccapurple: 6697881, red: 16711680, rosybrown: 12357519, royalblue: 4286945, saddlebrown: 9127187, salmon: 16416882, sandybrown: 16032864, seagreen: 3050327, seashell: 16774638, sienna: 10506797, silver: 12632256, skyblue: 8900331, slateblue: 6970061, slategray: 7372944, slategrey: 7372944, snow: 16775930, springgreen: 65407, steelblue: 4620980, tan: 13808780, teal: 32896, thistle: 14204888, tomato: 16737095, turquoise: 4251856, violet: 15631086, wheat: 16113331, white: 16777215, whitesmoke: 16119285, yellow: 16776960, yellowgreen: 10145074 }, Rt = { h: 0, s: 0, l: 0 }, Zn = { h: 0, s: 0, l: 0 };
function $i(a13, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? a13 + (e - a13) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? a13 + (e - a13) * 6 * (2 / 3 - t) : a13;
}
var Ie = class {
  constructor(e, t, n) {
    return this.isColor = true, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      let i = e;
      i && i.isColor ? this.copy(i) : typeof i == "number" ? this.setHex(i) : typeof i == "string" && this.setStyle(i);
    } else this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = at) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, st.colorSpaceToWorking(this, t), this;
  }
  setRGB(e, t, n, i = st.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, st.colorSpaceToWorking(this, i), this;
  }
  setHSL(e, t, n, i = st.workingColorSpace) {
    if (e = zr(e, 1), t = ee(t, 0, 1), n = ee(n, 0, 1), t === 0) this.r = this.g = this.b = n;
    else {
      let r = n <= 0.5 ? n * (1 + t) : n + t - n * t, s = 2 * n - r;
      this.r = $i(s, r, e + 1 / 3), this.g = $i(s, r, e), this.b = $i(s, r, e - 1 / 3);
    }
    return st.colorSpaceToWorking(this, i), this;
  }
  setStyle(e, t = at) {
    function n(r) {
      r !== void 0 && parseFloat(r) < 1 && Pe("Color: Alpha component of " + e + " will be ignored.");
    }
    let i;
    if (i = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let r, s = i[1], h = i[2];
      switch (s) {
        case "rgb":
        case "rgba":
          if (r = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h)) return n(r[4]), this.setRGB(Math.min(255, parseInt(r[1], 10)) / 255, Math.min(255, parseInt(r[2], 10)) / 255, Math.min(255, parseInt(r[3], 10)) / 255, t);
          if (r = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h)) return n(r[4]), this.setRGB(Math.min(100, parseInt(r[1], 10)) / 100, Math.min(100, parseInt(r[2], 10)) / 100, Math.min(100, parseInt(r[3], 10)) / 100, t);
          break;
        case "hsl":
        case "hsla":
          if (r = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(h)) return n(r[4]), this.setHSL(parseFloat(r[1]) / 360, parseFloat(r[2]) / 100, parseFloat(r[3]) / 100, t);
          break;
        default:
          Pe("Color: Unknown color model " + e);
      }
    } else if (i = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      let r = i[1], s = r.length;
      if (s === 3) return this.setRGB(parseInt(r.charAt(0), 16) / 15, parseInt(r.charAt(1), 16) / 15, parseInt(r.charAt(2), 16) / 15, t);
      if (s === 6) return this.setHex(parseInt(r, 16), t);
      Pe("Color: Invalid hex color " + e);
    } else if (e && e.length > 0) return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = at) {
    let n = ea[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : Pe("Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = St(e.r), this.g = St(e.g), this.b = St(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = hn(e.r), this.g = hn(e.g), this.b = hn(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = at) {
    return st.workingToColorSpace(We.copy(this), e), Math.round(ee(We.r * 255, 0, 255)) * 65536 + Math.round(ee(We.g * 255, 0, 255)) * 256 + Math.round(ee(We.b * 255, 0, 255));
  }
  getHexString(e = at) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = st.workingColorSpace) {
    st.workingToColorSpace(We.copy(this), t);
    let n = We.r, i = We.g, r = We.b, s = Math.max(n, i, r), h = Math.min(n, i, r), c, u, f = (h + s) / 2;
    if (h === s) c = 0, u = 0;
    else {
      let d = s - h;
      switch (u = f <= 0.5 ? d / (s + h) : d / (2 - s - h), s) {
        case n:
          c = (i - r) / d + (i < r ? 6 : 0);
          break;
        case i:
          c = (r - n) / d + 2;
          break;
        case r:
          c = (n - i) / d + 4;
          break;
      }
      c /= 6;
    }
    return e.h = c, e.s = u, e.l = f, e;
  }
  getRGB(e, t = st.workingColorSpace) {
    return st.workingToColorSpace(We.copy(this), t), e.r = We.r, e.g = We.g, e.b = We.b, e;
  }
  getStyle(e = at) {
    st.workingToColorSpace(We.copy(this), e);
    let t = We.r, n = We.g, i = We.b;
    return e !== at ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(i * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(Rt), this.setHSL(Rt.h + e, Rt.s + t, Rt.l + n);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(Rt), e.getHSL(Zn);
    let n = wn(Rt.h, Zn.h, t), i = wn(Rt.s, Zn.s, t), r = wn(Rt.l, Zn.l, t);
    return this.setHSL(n, i, r), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    let t = this.r, n = this.g, i = this.b, r = e.elements;
    return this.r = r[0] * t + r[3] * n + r[6] * i, this.g = r[1] * t + r[4] * n + r[7] * i, this.b = r[2] * t + r[5] * n + r[8] * i, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}, We = new Ie();
Ie.NAMES = ea;
var ht = new U(), _t = new U(), Yi = new U(), xt = new U(), en = new U(), tn = new U(), Bs = new U(), Zi = new U(), Ji = new U(), Ki = new U(), ji = new fn(), Qi = new fn(), er = new fn(), hi = class a9 {
  constructor(e = new U(), t = new U(), n = new U()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, i) {
    i.subVectors(n, t), ht.subVectors(e, t), i.cross(ht);
    let r = i.lengthSq();
    return r > 0 ? i.multiplyScalar(1 / Math.sqrt(r)) : i.set(0, 0, 0);
  }
  static getBarycoord(e, t, n, i, r) {
    ht.subVectors(i, t), _t.subVectors(n, t), Yi.subVectors(e, t);
    let s = ht.dot(ht), h = ht.dot(_t), c = ht.dot(Yi), u = _t.dot(_t), f = _t.dot(Yi), d = s * u - h * h;
    if (d === 0) return r.set(0, 0, 0), null;
    let v = 1 / d, m = (u * c - h * f) * v, g = (s * f - h * c) * v;
    return r.set(1 - m - g, g, m);
  }
  static containsPoint(e, t, n, i) {
    return this.getBarycoord(e, t, n, i, xt) === null ? false : xt.x >= 0 && xt.y >= 0 && xt.x + xt.y <= 1;
  }
  static getInterpolation(e, t, n, i, r, s, h, c) {
    return this.getBarycoord(e, t, n, i, xt) === null ? (c.x = 0, c.y = 0, "z" in c && (c.z = 0), "w" in c && (c.w = 0), null) : (c.setScalar(0), c.addScaledVector(r, xt.x), c.addScaledVector(s, xt.y), c.addScaledVector(h, xt.z), c);
  }
  static getInterpolatedAttribute(e, t, n, i, r, s) {
    return ji.setScalar(0), Qi.setScalar(0), er.setScalar(0), ji.fromBufferAttribute(e, t), Qi.fromBufferAttribute(e, n), er.fromBufferAttribute(e, i), s.setScalar(0), s.addScaledVector(ji, r.x), s.addScaledVector(Qi, r.y), s.addScaledVector(er, r.z), s;
  }
  static isFrontFacing(e, t, n, i) {
    return ht.subVectors(n, t), _t.subVectors(e, t), ht.cross(_t).dot(i) < 0;
  }
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  setFromPointsAndIndices(e, t, n, i) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[i]), this;
  }
  setFromAttributeAndIndices(e, t, n, i) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, i), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return ht.subVectors(this.c, this.b), _t.subVectors(this.a, this.b), ht.cross(_t).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return a9.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return a9.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getInterpolation(e, t, n, i, r) {
    return a9.getInterpolation(e, this.a, this.b, this.c, t, n, i, r);
  }
  containsPoint(e) {
    return a9.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return a9.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    let n = this.a, i = this.b, r = this.c, s, h;
    en.subVectors(i, n), tn.subVectors(r, n), Zi.subVectors(e, n);
    let c = en.dot(Zi), u = tn.dot(Zi);
    if (c <= 0 && u <= 0) return t.copy(n);
    Ji.subVectors(e, i);
    let f = en.dot(Ji), d = tn.dot(Ji);
    if (f >= 0 && d <= f) return t.copy(i);
    let v = c * d - f * u;
    if (v <= 0 && c >= 0 && f <= 0) return s = c / (c - f), t.copy(n).addScaledVector(en, s);
    Ki.subVectors(e, r);
    let m = en.dot(Ki), g = tn.dot(Ki);
    if (g >= 0 && m <= g) return t.copy(r);
    let _ = m * u - c * g;
    if (_ <= 0 && u >= 0 && g <= 0) return h = u / (u - g), t.copy(n).addScaledVector(tn, h);
    let b = f * g - m * d;
    if (b <= 0 && d - f >= 0 && m - g >= 0) return Bs.subVectors(r, i), h = (d - f) / (d - f + (m - g)), t.copy(i).addScaledVector(Bs, h);
    let A = 1 / (b + _ + v);
    return s = _ * A, h = v * A, t.copy(n).addScaledVector(en, s).addScaledVector(tn, h);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}, Lt = class {
  constructor(e = new U(1 / 0, 1 / 0, 1 / 0), t = new U(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = true, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3) this.expandByPoint(ut.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++) this.expandByPoint(ut.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++) this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    let n = ut.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = false) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = false) {
    e.updateWorldMatrix(false, false);
    let n = e.geometry;
    if (n !== void 0) {
      let r = n.getAttribute("position");
      if (t === true && r !== void 0 && e.isInstancedMesh !== true) for (let s = 0, h = r.count; s < h; s++) e.isMesh === true ? e.getVertexPosition(s, ut) : ut.fromBufferAttribute(r, s), ut.applyMatrix4(e.matrixWorld), this.expandByPoint(ut);
      else e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), Jn.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), Jn.copy(n.boundingBox)), Jn.applyMatrix4(e.matrixWorld), this.union(Jn);
    }
    let i = e.children;
    for (let r = 0, s = i.length; r < s; r++) this.expandByObject(i[r], t);
    return this;
  }
  containsPoint(e) {
    return e.x >= this.min.x && e.x <= this.max.x && e.y >= this.min.y && e.y <= this.max.y && e.z >= this.min.z && e.z <= this.max.z;
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(e) {
    return e.max.x >= this.min.x && e.min.x <= this.max.x && e.max.y >= this.min.y && e.min.y <= this.max.y && e.max.z >= this.min.z && e.min.z <= this.max.z;
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, ut), ut.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) return false;
    this.getCenter(xn), Kn.subVectors(this.max, xn), nn.subVectors(e.a, xn), rn.subVectors(e.b, xn), sn.subVectors(e.c, xn), Pt.subVectors(rn, nn), It.subVectors(sn, rn), Ht.subVectors(nn, sn);
    let t = [0, -Pt.z, Pt.y, 0, -It.z, It.y, 0, -Ht.z, Ht.y, Pt.z, 0, -Pt.x, It.z, 0, -It.x, Ht.z, 0, -Ht.x, -Pt.y, Pt.x, 0, -It.y, It.x, 0, -Ht.y, Ht.x, 0];
    return !tr(t, nn, rn, sn, Kn) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !tr(t, nn, rn, sn, Kn)) ? false : (jn.crossVectors(Pt, It), t = [jn.x, jn.y, jn.z], tr(t, nn, rn, sn, Kn));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, ut).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(ut).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (yt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), yt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), yt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), yt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), yt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), yt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), yt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), yt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(yt), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
  toJSON() {
    return { min: this.min.toArray(), max: this.max.toArray() };
  }
  fromJSON(e) {
    return this.min.fromArray(e.min), this.max.fromArray(e.max), this;
  }
}, yt = [new U(), new U(), new U(), new U(), new U(), new U(), new U(), new U()], ut = new U(), Jn = new Lt(), nn = new U(), rn = new U(), sn = new U(), Pt = new U(), It = new U(), Ht = new U(), xn = new U(), Kn = new U(), jn = new U(), Gt = new U();
function tr(a13, e, t, n, i) {
  for (let r = 0, s = a13.length - 3; r <= s; r += 3) {
    Gt.fromArray(a13, r);
    let h = i.x * Math.abs(Gt.x) + i.y * Math.abs(Gt.y) + i.z * Math.abs(Gt.z), c = e.dot(Gt), u = t.dot(Gt), f = n.dot(Gt);
    if (Math.max(-Math.max(c, u, f), Math.min(c, u, f)) > h) return false;
  }
  return true;
}
var Ae = new U(), Qn = new Je(), ql = 0, Ve = class extends Wt {
  constructor(e, t, n = false) {
    if (super(), Array.isArray(e)) throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = true, Object.defineProperty(this, "id", { value: ql++ }), this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = js, this.updateRanges = [], this.gpuType = Js, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === true && this.version++;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let i = 0, r = this.itemSize; i < r; i++) this.array[e + i] = t.array[n + i];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2) for (let t = 0, n = this.count; t < n; t++) Qn.fromBufferAttribute(this, t), Qn.applyMatrix3(e), this.setXY(t, Qn.x, Qn.y);
    else if (this.itemSize === 3) for (let t = 0, n = this.count; t < n; t++) Ae.fromBufferAttribute(this, t), Ae.applyMatrix3(e), this.setXYZ(t, Ae.x, Ae.y, Ae.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++) Ae.fromBufferAttribute(this, t), Ae.applyMatrix4(e), this.setXYZ(t, Ae.x, Ae.y, Ae.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++) Ae.fromBufferAttribute(this, t), Ae.applyNormalMatrix(e), this.setXYZ(t, Ae.x, Ae.y, Ae.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++) Ae.fromBufferAttribute(this, t), Ae.transformDirection(e), this.setXYZ(t, Ae.x, Ae.y, Ae.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = ln(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = Ze(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = ln(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = ln(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = ln(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = ln(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = Ze(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, i) {
    return e *= this.itemSize, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array), i = Ze(i, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this;
  }
  setXYZW(e, t, n, i, r) {
    return e *= this.itemSize, this.normalized && (t = Ze(t, this.array), n = Ze(n, this.array), i = Ze(i, this.array), r = Ze(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = i, this.array[e + 3] = r, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    let e = { itemSize: this.itemSize, type: this.array.constructor.name, array: Array.from(this.array), normalized: this.normalized };
    return e.name = this.name, e.usage = this.usage, e.gpuType = this.gpuType, e;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
};
var ui = class extends Ve {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
};
var fi = class extends Ve {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
};
var An = class extends Ve {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}, $l = new Lt(), yn = new U(), nr = new U(), di = class {
  constructor(e = new U(), t = -1) {
    this.isSphere = true, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    let n = this.center;
    t !== void 0 ? n.copy(t) : $l.setFromPoints(e).getCenter(n);
    let i = 0;
    for (let r = 0, s = e.length; r < s; r++) i = Math.max(i, n.distanceToSquared(e[r]));
    return this.radius = Math.sqrt(i), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    let t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    let n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty()) return this.center.copy(e), this.radius = 0, this;
    yn.subVectors(e, this.center);
    let t = yn.lengthSq();
    if (t > this.radius * this.radius) {
      let n = Math.sqrt(t), i = (n - this.radius) * 0.5;
      this.center.addScaledVector(yn, i / n), this.radius += i;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === true ? this.radius = Math.max(this.radius, e.radius) : (nr.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(yn.copy(e.center).add(nr)), this.expandByPoint(yn.copy(e.center).sub(nr))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  toJSON() {
    return { radius: this.radius, center: this.center.toArray() };
  }
  fromJSON(e) {
    return this.radius = e.radius, this.center.fromArray(e.center), this;
  }
}, Yl = 0, rt = new dt(), ir = new Xt(), an = new U(), tt = new Lt(), Sn = new Lt(), Fe = new U(), pt = class a10 extends Wt {
  constructor() {
    super(), this.isBufferGeometry = true, Object.defineProperty(this, "id", { value: Yl++ }), this.uuid = Pn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.indirect = null, this.indirectOffset = 0, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = false, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {}, this._transformed = false;
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new (_l(e) ? fi : ui)(e, 1) : this.index = e, this;
  }
  setIndirect(e, t = 0) {
    return this.indirect = e, this.indirectOffset = t, this;
  }
  getIndirect() {
    return this.indirect;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, n = 0) {
    this.groups.push({ start: e, count: t, materialIndex: n });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    let t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = true);
    let n = this.attributes.normal;
    if (n !== void 0) {
      let r = new J().getNormalMatrix(e);
      n.applyNormalMatrix(r), n.needsUpdate = true;
    }
    let i = this.attributes.tangent;
    return i !== void 0 && (i.transformDirection(e), i.needsUpdate = true), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this._transformed = true, this;
  }
  applyQuaternion(e) {
    return rt.makeRotationFromQuaternion(e), this.applyMatrix4(rt), this;
  }
  rotateX(e) {
    return rt.makeRotationX(e), this.applyMatrix4(rt), this;
  }
  rotateY(e) {
    return rt.makeRotationY(e), this.applyMatrix4(rt), this;
  }
  rotateZ(e) {
    return rt.makeRotationZ(e), this.applyMatrix4(rt), this;
  }
  translate(e, t, n) {
    return rt.makeTranslation(e, t, n), this.applyMatrix4(rt), this;
  }
  scale(e, t, n) {
    return rt.makeScale(e, t, n), this.applyMatrix4(rt), this;
  }
  lookAt(e) {
    return ir.lookAt(e), ir.updateMatrix(), this.applyMatrix4(ir.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(an).negate(), this.translate(an.x, an.y, an.z), this;
  }
  setFromPoints(e) {
    let t = this.getAttribute("position");
    if (t === void 0) {
      let n = [];
      for (let i = 0, r = e.length; i < r; i++) {
        let s = e[i];
        n.push(s.x, s.y, s.z || 0);
      }
      this.setAttribute("position", new An(n, 3));
    } else {
      let n = Math.min(e.length, t.count);
      for (let i = 0; i < n; i++) {
        let r = e[i];
        t.setXYZ(i, r.x, r.y, r.z || 0);
      }
      e.length > t.count && Pe("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."), t.needsUpdate = true;
    }
    return this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Lt());
    let e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      Se("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.", this), this.boundingBox.set(new U(-1 / 0, -1 / 0, -1 / 0), new U(1 / 0, 1 / 0, 1 / 0));
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t) for (let n = 0, i = t.length; n < i; n++) {
        let r = t[n];
        tt.setFromBufferAttribute(r), this.morphTargetsRelative ? (Fe.addVectors(this.boundingBox.min, tt.min), this.boundingBox.expandByPoint(Fe), Fe.addVectors(this.boundingBox.max, tt.max), this.boundingBox.expandByPoint(Fe)) : (this.boundingBox.expandByPoint(tt.min), this.boundingBox.expandByPoint(tt.max));
      }
    } else this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && Se('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new di());
    let e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      Se("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.", this), this.boundingSphere.set(new U(), 1 / 0);
      return;
    }
    if (e) {
      let n = this.boundingSphere.center;
      if (tt.setFromBufferAttribute(e), t) for (let r = 0, s = t.length; r < s; r++) {
        let h = t[r];
        Sn.setFromBufferAttribute(h), this.morphTargetsRelative ? (Fe.addVectors(tt.min, Sn.min), tt.expandByPoint(Fe), Fe.addVectors(tt.max, Sn.max), tt.expandByPoint(Fe)) : (tt.expandByPoint(Sn.min), tt.expandByPoint(Sn.max));
      }
      tt.getCenter(n);
      let i = 0;
      for (let r = 0, s = e.count; r < s; r++) Fe.fromBufferAttribute(e, r), i = Math.max(i, n.distanceToSquared(Fe));
      if (t) for (let r = 0, s = t.length; r < s; r++) {
        let h = t[r], c = this.morphTargetsRelative;
        for (let u = 0, f = h.count; u < f; u++) Fe.fromBufferAttribute(h, u), c && (an.fromBufferAttribute(e, u), Fe.add(an)), i = Math.max(i, n.distanceToSquared(Fe));
      }
      this.boundingSphere.radius = Math.sqrt(i), isNaN(this.boundingSphere.radius) && Se('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    let e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      Se("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    let n = t.position, i = t.normal, r = t.uv, s = this.getAttribute("tangent");
    (s === void 0 || s.count !== n.count) && (s = new Ve(new Float32Array(4 * n.count), 4), this.setAttribute("tangent", s));
    let h = [], c = [];
    for (let N = 0; N < n.count; N++) h[N] = new U(), c[N] = new U();
    let u = new U(), f = new U(), d = new U(), v = new Je(), m = new Je(), g = new Je(), _ = new U(), b = new U();
    function A(N, D, V) {
      u.fromBufferAttribute(n, N), f.fromBufferAttribute(n, D), d.fromBufferAttribute(n, V), v.fromBufferAttribute(r, N), m.fromBufferAttribute(r, D), g.fromBufferAttribute(r, V), f.sub(u), d.sub(u), m.sub(v), g.sub(v);
      let $ = 1 / (m.x * g.y - g.x * m.y);
      isFinite($) && (_.copy(f).multiplyScalar(g.y).addScaledVector(d, -m.y).multiplyScalar($), b.copy(d).multiplyScalar(m.x).addScaledVector(f, -g.x).multiplyScalar($), h[N].add(_), h[D].add(_), h[V].add(_), c[N].add(b), c[D].add(b), c[V].add(b));
    }
    let R = this.groups;
    R.length === 0 && (R = [{ start: 0, count: e.count }]);
    for (let N = 0, D = R.length; N < D; ++N) {
      let V = R[N], $ = V.start, Y = V.count;
      for (let H = $, K = $ + Y; H < K; H += 3) A(e.getX(H + 0), e.getX(H + 1), e.getX(H + 2));
    }
    let F = new U(), k = new U(), L = new U(), O = new U();
    function G(N) {
      L.fromBufferAttribute(i, N), O.copy(L);
      let D = h[N];
      F.copy(D), F.sub(L.multiplyScalar(L.dot(D))).normalize(), k.crossVectors(O, D);
      let $ = k.dot(c[N]) < 0 ? -1 : 1;
      s.setXYZW(N, F.x, F.y, F.z, $);
    }
    for (let N = 0, D = R.length; N < D; ++N) {
      let V = R[N], $ = V.start, Y = V.count;
      for (let H = $, K = $ + Y; H < K; H += 3) G(e.getX(H + 0)), G(e.getX(H + 1)), G(e.getX(H + 2));
    }
    this._transformed = true;
  }
  computeVertexNormals() {
    let e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0 || n.count !== t.count) n = new Ve(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else for (let v = 0, m = n.count; v < m; v++) n.setXYZ(v, 0, 0, 0);
      let i = new U(), r = new U(), s = new U(), h = new U(), c = new U(), u = new U(), f = new U(), d = new U();
      if (e) for (let v = 0, m = e.count; v < m; v += 3) {
        let g = e.getX(v + 0), _ = e.getX(v + 1), b = e.getX(v + 2);
        i.fromBufferAttribute(t, g), r.fromBufferAttribute(t, _), s.fromBufferAttribute(t, b), f.subVectors(s, r), d.subVectors(i, r), f.cross(d), h.fromBufferAttribute(n, g), c.fromBufferAttribute(n, _), u.fromBufferAttribute(n, b), h.add(f), c.add(f), u.add(f), n.setXYZ(g, h.x, h.y, h.z), n.setXYZ(_, c.x, c.y, c.z), n.setXYZ(b, u.x, u.y, u.z);
      }
      else for (let v = 0, m = t.count; v < m; v += 3) i.fromBufferAttribute(t, v + 0), r.fromBufferAttribute(t, v + 1), s.fromBufferAttribute(t, v + 2), f.subVectors(s, r), d.subVectors(i, r), f.cross(d), n.setXYZ(v + 0, f.x, f.y, f.z), n.setXYZ(v + 1, f.x, f.y, f.z), n.setXYZ(v + 2, f.x, f.y, f.z);
      this.normalizeNormals(), n.needsUpdate = true;
    }
  }
  normalizeNormals() {
    let e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++) Fe.fromBufferAttribute(e, t), Fe.normalize(), e.setXYZ(t, Fe.x, Fe.y, Fe.z);
  }
  toNonIndexed() {
    function e(h, c) {
      let u = h.array, f = h.itemSize, d = h.normalized, v = new u.constructor(c.length * f), m = 0, g = 0;
      for (let _ = 0, b = c.length; _ < b; _++) {
        h.isInterleavedBufferAttribute ? m = c[_] * h.data.stride + h.offset : m = c[_] * f;
        for (let A = 0; A < f; A++) v[g++] = u[m++];
      }
      return new Ve(v, f, d);
    }
    if (this.index === null) return Pe("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    let t = new a10(), n = this.index.array, i = this.attributes;
    for (let h in i) {
      let c = i[h], u = e(c, n);
      t.setAttribute(h, u);
    }
    let r = this.morphAttributes;
    for (let h in r) {
      let c = [], u = r[h];
      for (let f = 0, d = u.length; f < d; f++) {
        let v = u[f], m = e(v, n);
        c.push(m);
      }
      t.morphAttributes[h] = c;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    let s = this.groups;
    for (let h = 0, c = s.length; h < c; h++) {
      let u = s[h];
      t.addGroup(u.start, u.count, u.materialIndex);
    }
    return t;
  }
  toJSON() {
    let e = { metadata: { version: 4.7, type: "BufferGeometry", generator: "BufferGeometry.toJSON" } };
    if (e.uuid = this.uuid, e.type = this.parameters !== void 0 && this._transformed === true ? "BufferGeometry" : this.type, e.name = this.name, Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0 && this._transformed !== true) {
      let c = this.parameters;
      for (let u in c) c[u] !== void 0 && (e[u] = c[u]);
      return e;
    }
    e.data = { attributes: {} };
    let t = this.index;
    t !== null && (e.data.index = { type: t.array.constructor.name, array: Array.prototype.slice.call(t.array) });
    let n = this.attributes;
    for (let c in n) {
      let u = n[c];
      e.data.attributes[c] = u.toJSON(e.data);
    }
    let i = {}, r = false;
    for (let c in this.morphAttributes) {
      let u = this.morphAttributes[c], f = [];
      for (let d = 0, v = u.length; d < v; d++) {
        let m = u[d];
        f.push(m.toJSON(e.data));
      }
      f.length > 0 && (i[c] = f, r = true);
    }
    r && (e.data.morphAttributes = i, e.data.morphTargetsRelative = this.morphTargetsRelative);
    let s = this.groups;
    s.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(s)));
    let h = this.boundingSphere;
    return h !== null && (e.data.boundingSphere = h.toJSON()), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    let t = {};
    this.name = e.name;
    let n = e.index;
    n !== null && this.setIndex(n.clone());
    let i = e.attributes;
    for (let u in i) {
      let f = i[u];
      this.setAttribute(u, f.clone(t));
    }
    let r = e.morphAttributes;
    for (let u in r) {
      let f = [], d = r[u];
      for (let v = 0, m = d.length; v < m; v++) f.push(d[v].clone(t));
      this.morphAttributes[u] = f;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    let s = e.groups;
    for (let u = 0, f = s.length; u < f; u++) {
      let d = s[u];
      this.addGroup(d.start, d.count, d.materialIndex);
    }
    let h = e.boundingBox;
    h !== null && (this.boundingBox = h.clone());
    let c = e.boundingSphere;
    return c !== null && (this.boundingSphere = c.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this._transformed = e._transformed, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
};
var ei = new U(), ti = new U(), rr = new U(), ni = new hi(), Cn = class extends pt {
  constructor(e = null, t = 1) {
    if (super(), this.type = "EdgesGeometry", this.parameters = { geometry: e, thresholdAngle: t }, e !== null) {
      let i = Math.pow(10, 4), r = Math.cos(Or * t), s = e.getIndex(), h = e.getAttribute("position"), c = s ? s.count : h.count, u = [0, 0, 0], f = ["a", "b", "c"], d = new Array(3), v = {}, m = [];
      for (let g = 0; g < c; g += 3) {
        s ? (u[0] = s.getX(g), u[1] = s.getX(g + 1), u[2] = s.getX(g + 2)) : (u[0] = g, u[1] = g + 1, u[2] = g + 2);
        let { a: _, b, c: A } = ni;
        if (_.fromBufferAttribute(h, u[0]), b.fromBufferAttribute(h, u[1]), A.fromBufferAttribute(h, u[2]), ni.getNormal(rr), d[0] = `${Math.round(_.x * i)},${Math.round(_.y * i)},${Math.round(_.z * i)}`, d[1] = `${Math.round(b.x * i)},${Math.round(b.y * i)},${Math.round(b.z * i)}`, d[2] = `${Math.round(A.x * i)},${Math.round(A.y * i)},${Math.round(A.z * i)}`, !(d[0] === d[1] || d[1] === d[2] || d[2] === d[0])) for (let R = 0; R < 3; R++) {
          let F = (R + 1) % 3, k = d[R], L = d[F], O = ni[f[R]], G = ni[f[F]], N = `${k}_${L}`, D = `${L}_${k}`;
          D in v && v[D] ? (rr.dot(v[D].normal) <= r && (m.push(O.x, O.y, O.z), m.push(G.x, G.y, G.z)), v[D] = null) : N in v || (v[N] = { index0: u[R], index1: u[F], normal: rr.clone() });
        }
      }
      for (let g in v) if (v[g]) {
        let { index0: _, index1: b } = v[g];
        ei.fromBufferAttribute(h, _), ti.fromBufferAttribute(h, b), m.push(ei.x, ei.y, ei.z), m.push(ti.x, ti.y, ti.z);
      }
      this.setAttribute("position", new An(m, 3));
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
};
function ta(a13) {
  let e = {};
  for (let t in a13) {
    e[t] = {};
    for (let n in a13[t]) {
      let i = a13[t][n];
      if (zs(i)) i.isRenderTargetTexture ? (Pe("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = i.clone();
      else if (Array.isArray(i)) if (zs(i[0])) {
        let r = [];
        for (let s = 0, h = i.length; s < h; s++) r[s] = i[s].clone();
        e[t][n] = r;
      } else e[t][n] = i.slice();
      else e[t][n] = i;
    }
  }
  return e;
}
function Ke(a13) {
  let e = {};
  for (let t = 0; t < a13.length; t++) {
    let n = ta(a13[t]);
    for (let i in n) e[i] = n[i];
  }
  return e;
}
function zs(a13) {
  return a13 && (a13.isColor || a13.isMatrix3 || a13.isMatrix4 || a13.isVector2 || a13.isVector3 || a13.isVector4 || a13.isTexture || a13.isQuaternion);
}
function on(a13, e) {
  return !a13 || a13.constructor === e ? a13 : typeof e.BYTES_PER_ELEMENT == "number" ? new e(a13) : Array.prototype.slice.call(a13);
}
function sr(a13) {
  return a13 !== void 0 && a13.inTangents !== void 0 && a13.outTangents !== void 0;
}
var Dt = class {
  constructor(e, t, n, i) {
    this.parameterPositions = e, this._cachedIndex = 0, this.resultBuffer = i !== void 0 ? i : new t.constructor(n), this.sampleValues = t, this.valueSize = n, this.settings = null, this.DefaultSettings_ = {};
  }
  evaluate(e) {
    let t = this.parameterPositions, n = this._cachedIndex, i = t[n], r = t[n - 1];
    n: {
      e: {
        let s;
        t: {
          i: if (!(e < i)) {
            for (let h = n + 2; ; ) {
              if (i === void 0) {
                if (e < r) break i;
                return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
              }
              if (n === h) break;
              if (r = i, i = t[++n], e < i) break e;
            }
            s = t.length;
            break t;
          }
          if (!(e >= r)) {
            let h = t[1];
            e < h && (n = 2, r = h);
            for (let c = n - 2; ; ) {
              if (r === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
              if (n === c) break;
              if (i = r, r = t[--n - 1], e >= r) break e;
            }
            s = n, n = 0;
            break t;
          }
          break n;
        }
        for (; n < s; ) {
          let h = n + s >>> 1;
          e < t[h] ? s = h : n = h + 1;
        }
        if (i = t[n], r = t[n - 1], r === void 0) return this._cachedIndex = 0, this.copySampleValue_(0);
        if (i === void 0) return n = t.length, this._cachedIndex = n, this.copySampleValue_(n - 1);
      }
      this._cachedIndex = n, this.intervalChanged_(n, r, i);
    }
    return this.interpolate_(n, r, e, i);
  }
  getSettings_() {
    return this.settings || this.DefaultSettings_;
  }
  copySampleValue_(e) {
    let t = this.resultBuffer, n = this.sampleValues, i = this.valueSize, r = e * i;
    for (let s = 0; s !== i; ++s) t[s] = n[r + s];
    return t;
  }
  interpolate_() {
    throw new Error("THREE.Interpolant: Call to abstract method.");
  }
  intervalChanged_() {
  }
}, pi = class extends Dt {
  constructor(e, t, n, i) {
    super(e, t, n, i), this._weightPrev = -0, this._offsetPrev = -0, this._weightNext = -0, this._offsetNext = -0, this.DefaultSettings_ = { endingStart: vr, endingEnd: vr };
  }
  intervalChanged_(e, t, n) {
    let i = this.parameterPositions, r = e - 2, s = e + 1, h = i[r], c = i[s];
    if (h === void 0) switch (this.getSettings_().endingStart) {
      case _r:
        r = e, h = 2 * t - n;
        break;
      case xr:
        r = i.length - 2, h = t + i[r] - i[r + 1];
        break;
      default:
        r = e, h = n;
    }
    if (c === void 0) switch (this.getSettings_().endingEnd) {
      case _r:
        s = e, c = 2 * n - t;
        break;
      case xr:
        s = 1, c = n + i[1] - i[0];
        break;
      default:
        s = e - 1, c = t;
    }
    let u = (n - t) * 0.5, f = this.valueSize;
    this._weightPrev = u / (t - h), this._weightNext = u / (c - n), this._offsetPrev = r * f, this._offsetNext = s * f;
  }
  interpolate_(e, t, n, i) {
    let r = this.resultBuffer, s = this.sampleValues, h = this.valueSize, c = e * h, u = c - h, f = this._offsetPrev, d = this._offsetNext, v = this._weightPrev, m = this._weightNext, g = (n - t) / (i - t), _ = g * g, b = _ * g, A = -v * b + 2 * v * _ - v * g, R = (1 + v) * b + (-1.5 - 2 * v) * _ + (-0.5 + v) * g + 1, F = (-1 - m) * b + (1.5 + m) * _ + 0.5 * g, k = m * b - m * _;
    for (let L = 0; L !== h; ++L) r[L] = A * s[f + L] + R * s[u + L] + F * s[c + L] + k * s[d + L];
    return r;
  }
}, mi = class extends Dt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e, t, n, i) {
    let r = this.resultBuffer, s = this.sampleValues, h = this.valueSize, c = e * h, u = c - h, f = (n - t) / (i - t), d = 1 - f;
    for (let v = 0; v !== h; ++v) r[v] = s[u + v] * d + s[c + v] * f;
    return r;
  }
}, gi = class extends Dt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e) {
    return this.copySampleValue_(e - 1);
  }
}, vi = class extends Dt {
  interpolate_(e, t, n, i) {
    let r = this.resultBuffer, s = this.sampleValues, h = this.valueSize, c = e * h, u = c - h, f = this.inTangents, d = this.outTangents;
    if (!f || !d) {
      let g = (n - t) / (i - t), _ = 1 - g;
      for (let b = 0; b !== h; ++b) r[b] = s[u + b] * _ + s[c + b] * g;
      return r;
    }
    let v = h * 2, m = e - 1;
    for (let g = 0; g !== h; ++g) {
      let _ = s[u + g], b = s[c + g], A = m * v + g * 2, R = d[A], F = d[A + 1], k = e * v + g * 2, L = f[k], O = f[k + 1], G = Jl(n, t, R, L, i);
      r[g] = na(G, _, F, O, b);
    }
    return r;
  }
};
function na(a13, e, t, n, i) {
  let r = 1 - a13;
  return r * r * r * e + 3 * r * r * a13 * t + 3 * r * a13 * a13 * n + a13 * a13 * a13 * i;
}
function Zl(a13, e, t, n, i) {
  let r = 1 - a13;
  return 3 * r * r * (t - e) + 6 * r * a13 * (n - t) + 3 * a13 * a13 * (i - n);
}
function Jl(a13, e, t, n, i) {
  let r = (a13 - e) / (i - e);
  for (let s = 0; s < 8; s++) {
    let h = na(r, e, t, n, i) - a13;
    if (Math.abs(h) < 1e-10) break;
    let c = Zl(r, e, t, n, i);
    if (Math.abs(c) < 1e-10) break;
    r = Math.max(0, Math.min(1, r - h / c));
  }
  return r;
}
var nt = class {
  constructor(e, t, n, i) {
    if (e === void 0) throw new Error("THREE.KeyframeTrack: track name is undefined");
    if (t === void 0 || t.length === 0) throw new Error("THREE.KeyframeTrack: no keyframes in track named " + e);
    this.name = e, this.times = on(t, this.TimeBufferType), this.values = on(n, this.ValueBufferType), this.setInterpolation(i || this.DefaultInterpolation);
  }
  static toJSON(e) {
    let t = e.constructor, n;
    if (t.toJSON !== this.toJSON) n = t.toJSON(e);
    else {
      n = { name: e.name, times: on(e.times, Array), values: on(e.values, Array) };
      let i = e.getInterpolation();
      i !== e.DefaultInterpolation && (n.interpolation = i), sr(e.settings) && (n.settings = { inTangents: on(e.settings.inTangents, Array), outTangents: on(e.settings.outTangents, Array) });
    }
    return n.type = e.ValueTypeName, n;
  }
  InterpolantFactoryMethodDiscrete(e) {
    return new gi(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodLinear(e) {
    return new mi(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodSmooth(e) {
    return new pi(this.times, this.values, this.getValueSize(), e);
  }
  InterpolantFactoryMethodBezier(e) {
    let t = new vi(this.times, this.values, this.getValueSize(), e);
    return this.settings && (t.inTangents = this.settings.inTangents, t.outTangents = this.settings.outTangents), t;
  }
  setInterpolation(e) {
    let t;
    switch (e) {
      case Tn:
        t = this.InterpolantFactoryMethodDiscrete;
        break;
      case si:
        t = this.InterpolantFactoryMethodLinear;
        break;
      case ii:
        t = this.InterpolantFactoryMethodSmooth;
        break;
      case gr:
        t = this.InterpolantFactoryMethodBezier;
        break;
    }
    if (t === void 0) {
      let n = "unsupported interpolation for " + this.ValueTypeName + " keyframe track named " + this.name;
      if (this.createInterpolant === void 0) if (e !== this.DefaultInterpolation) this.setInterpolation(this.DefaultInterpolation);
      else throw new Error(n);
      return Pe("KeyframeTrack:", n), this;
    }
    return this.createInterpolant = t, this;
  }
  getInterpolation() {
    switch (this.createInterpolant) {
      case this.InterpolantFactoryMethodDiscrete:
        return Tn;
      case this.InterpolantFactoryMethodLinear:
        return si;
      case this.InterpolantFactoryMethodSmooth:
        return ii;
      case this.InterpolantFactoryMethodBezier:
        return gr;
    }
  }
  getValueSize() {
    return this.values.length / this.times.length;
  }
  shift(e) {
    if (e !== 0) {
      let t = this.times;
      for (let n = 0, i = t.length; n !== i; ++n) t[n] += e;
    }
    return this;
  }
  scale(e) {
    if (e !== 1) {
      let t = this.times;
      for (let n = 0, i = t.length; n !== i; ++n) t[n] *= e;
      sr(this.settings) && (ks(this.settings.inTangents, e), ks(this.settings.outTangents, e));
    }
    return this;
  }
  trim(e, t) {
    let n = this.times, i = n.length, r = 0, s = i - 1;
    for (; r !== i && n[r] < e; ) ++r;
    for (; s !== -1 && n[s] > t; ) --s;
    if (++s, r !== 0 || s !== i) {
      r >= s && (s = Math.max(s, 1), r = s - 1);
      let h = this.getValueSize();
      this.times = n.slice(r, s), this.values = this.values.slice(r * h, s * h);
    }
    return this;
  }
  validate() {
    let e = true, t = this.getValueSize();
    t - Math.floor(t) !== 0 && (Se("KeyframeTrack: Invalid value size in track.", this), e = false);
    let n = this.times, i = this.values, r = n.length;
    r === 0 && (Se("KeyframeTrack: Track is empty.", this), e = false);
    let s = null;
    for (let h = 0; h !== r; h++) {
      let c = n[h];
      if (typeof c == "number" && isNaN(c)) {
        Se("KeyframeTrack: Time is not a valid number.", this, h, c), e = false;
        break;
      }
      if (s !== null && s > c) {
        Se("KeyframeTrack: Out of order keys.", this, h, c, s), e = false;
        break;
      }
      s = c;
    }
    if (i !== void 0 && xl(i)) for (let h = 0, c = i.length; h !== c; ++h) {
      let u = i[h];
      if (isNaN(u)) {
        Se("KeyframeTrack: Value is not a valid number.", this, h, u), e = false;
        break;
      }
    }
    return e;
  }
  optimize() {
    let e = this.times.slice(), t = this.values.slice(), n = this.getValueSize(), i = this.getInterpolation() === ii, r = e.length - 1, s = 1;
    for (let h = 1; h < r; ++h) {
      let c = false, u = e[h], f = e[h + 1];
      if (u !== f && (h !== 1 || u !== e[0])) if (i) c = true;
      else {
        let d = h * n, v = d - n, m = d + n;
        for (let g = 0; g !== n; ++g) {
          let _ = t[d + g];
          if (_ !== t[v + g] || _ !== t[m + g]) {
            c = true;
            break;
          }
        }
      }
      if (c) {
        if (h !== s) {
          e[s] = e[h];
          let d = h * n, v = s * n;
          for (let m = 0; m !== n; ++m) t[v + m] = t[d + m];
        }
        ++s;
      }
    }
    if (r > 0) {
      e[s] = e[r];
      for (let h = r * n, c = s * n, u = 0; u !== n; ++u) t[c + u] = t[h + u];
      ++s;
    }
    return s !== e.length ? (this.times = e.slice(0, s), this.values = t.slice(0, s * n)) : (this.times = e, this.values = t), this;
  }
  clone() {
    let e = this.times.slice(), t = this.values.slice(), n = this.constructor, i = new n(this.name, e, t);
    return i.createInterpolant = this.createInterpolant, sr(this.settings) && (i.settings = { inTangents: this.settings.inTangents.slice(), outTangents: this.settings.outTangents.slice() }), i;
  }
};
function ks(a13, e) {
  for (let t = 0, n = a13.length; t !== n; t += 2) a13[t] *= e;
}
nt.prototype.ValueTypeName = "";
nt.prototype.TimeBufferType = Float32Array;
nt.prototype.ValueBufferType = Float32Array;
nt.prototype.DefaultInterpolation = si;
var Ut = class extends nt {
  constructor(e, t, n) {
    super(e, t, n);
  }
};
Ut.prototype.ValueTypeName = "bool";
Ut.prototype.ValueBufferType = Array;
Ut.prototype.DefaultInterpolation = Tn;
Ut.prototype.InterpolantFactoryMethodLinear = void 0;
Ut.prototype.InterpolantFactoryMethodSmooth = void 0;
var _i = class extends nt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
_i.prototype.ValueTypeName = "color";
var xi = class extends nt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
xi.prototype.ValueTypeName = "number";
var yi = class extends Dt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  interpolate_(e, t, n, i) {
    let r = this.resultBuffer, s = this.sampleValues, h = this.valueSize, c = (n - t) / (i - t), u = e * h;
    for (let f = u + h; u !== f; u += 4) Mt.slerpFlat(r, 0, s, u - h, s, u, c);
    return r;
  }
}, Rn = class extends nt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
  InterpolantFactoryMethodLinear(e) {
    return new yi(this.times, this.values, this.getValueSize(), e);
  }
};
Rn.prototype.ValueTypeName = "quaternion";
Rn.prototype.InterpolantFactoryMethodSmooth = void 0;
var Nt = class extends nt {
  constructor(e, t, n) {
    super(e, t, n);
  }
};
Nt.prototype.ValueTypeName = "string";
Nt.prototype.ValueBufferType = Array;
Nt.prototype.DefaultInterpolation = Tn;
Nt.prototype.InterpolantFactoryMethodLinear = void 0;
Nt.prototype.InterpolantFactoryMethodSmooth = void 0;
var Si = class extends nt {
  constructor(e, t, n, i) {
    super(e, t, n, i);
  }
};
Si.prototype.ValueTypeName = "vector";
var Mi = class {
  constructor(e, t, n) {
    let i = this, r = false, s = 0, h = 0, c, u = [];
    this.onStart = void 0, this.onLoad = e, this.onProgress = t, this.onError = n, this._abortController = null, this.itemStart = function(f) {
      h++, r === false && i.onStart !== void 0 && i.onStart(f, s, h), r = true;
    }, this.itemEnd = function(f) {
      s++, i.onProgress !== void 0 && i.onProgress(f, s, h), s === h && (r = false, i.onLoad !== void 0 && i.onLoad());
    }, this.itemError = function(f) {
      i.onError !== void 0 && i.onError(f);
    }, this.resolveURL = function(f) {
      return f = f.normalize("NFC"), c ? c(f) : f;
    }, this.setURLModifier = function(f) {
      return c = f, this;
    }, this.addHandler = function(f, d) {
      return u.push(f, d), this;
    }, this.removeHandler = function(f) {
      let d = u.indexOf(f);
      return d !== -1 && u.splice(d, 2), this;
    }, this.getHandler = function(f) {
      for (let d = 0, v = u.length; d < v; d += 2) {
        let m = u[d], g = u[d + 1];
        if (m.global && (m.lastIndex = 0), m.test(f)) return g;
      }
      return null;
    }, this.abort = function() {
      return this.abortController.abort(), this._abortController = null, this;
    };
  }
  get abortController() {
    return this._abortController || (this._abortController = new AbortController()), this._abortController;
  }
}, ia = new Mi(), bi = class {
  constructor(e) {
    this.manager = e !== void 0 ? e : ia, this.crossOrigin = "anonymous", this.withCredentials = false, this.path = "", this.resourcePath = "", this.requestHeader = {}, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  load() {
  }
  loadAsync(e, t) {
    let n = this;
    return new Promise(function(i, r) {
      n.load(e, i, t, r);
    });
  }
  parse() {
  }
  setCrossOrigin(e) {
    return this.crossOrigin = e, this;
  }
  setWithCredentials(e) {
    return this.withCredentials = e, this;
  }
  setPath(e) {
    return this.path = e, this;
  }
  setResourcePath(e) {
    return this.resourcePath = e, this;
  }
  setRequestHeader(e) {
    return this.requestHeader = e, this;
  }
  abort() {
    return this;
  }
};
bi.DEFAULT_MATERIAL_NAME = "__DEFAULT";
var Vr = "\\[\\]\\.:\\/", Kl = new RegExp("[" + Vr + "]", "g"), Hr = "[^" + Vr + "]", jl = "[^" + Vr.replace("\\.", "") + "]", Ql = /((?:WC+[\/:])*)/.source.replace("WC", Hr), ec = /(WCOD+)?/.source.replace("WCOD", jl), tc = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC", Hr), nc = /\.(WC+)(?:\[(.+)\])?/.source.replace("WC", Hr), ic = new RegExp("^" + Ql + ec + tc + nc + "$"), rc = ["material", "materials", "bones", "map"], wr = class {
  constructor(e, t, n) {
    let i = n || ve.parseTrackName(t);
    this._targetGroup = e, this._bindings = e.subscribe_(t, i);
  }
  getValue(e, t) {
    this.bind();
    let n = this._targetGroup.nCachedObjects_, i = this._bindings[n];
    i !== void 0 && i.getValue(e, t);
  }
  setValue(e, t) {
    let n = this._bindings;
    for (let i = this._targetGroup.nCachedObjects_, r = n.length; i !== r; ++i) n[i].setValue(e, t);
  }
  bind() {
    let e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].bind();
  }
  unbind() {
    let e = this._bindings;
    for (let t = this._targetGroup.nCachedObjects_, n = e.length; t !== n; ++t) e[t].unbind();
  }
}, ve = class a11 {
  constructor(e, t, n) {
    this.path = t, this.parsedPath = n || a11.parseTrackName(t), this.node = a11.findNode(e, this.parsedPath.nodeName), this.rootNode = e, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
  static create(e, t, n) {
    return e && e.isAnimationObjectGroup ? new a11.Composite(e, t, n) : new a11(e, t, n);
  }
  static sanitizeNodeName(e) {
    return e.replace(/\s/g, "_").replace(Kl, "");
  }
  static parseTrackName(e) {
    let t = ic.exec(e);
    if (t === null) throw new Error("THREE.PropertyBinding: Cannot parse trackName: " + e);
    let n = { nodeName: t[2], objectName: t[3], objectIndex: t[4], propertyName: t[5], propertyIndex: t[6] }, i = n.nodeName && n.nodeName.lastIndexOf(".");
    if (i !== void 0 && i !== -1) {
      let r = n.nodeName.substring(i + 1);
      rc.indexOf(r) !== -1 && (n.nodeName = n.nodeName.substring(0, i), n.objectName = r);
    }
    if (n.propertyName === null || n.propertyName.length === 0) throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: " + e);
    return n;
  }
  static findNode(e, t) {
    if (t === void 0 || t === "" || t === "." || t === -1 || t === e.name || t === e.uuid) return e;
    if (e.skeleton) {
      let n = e.skeleton.getBoneByName(t);
      if (n !== void 0) return n;
    }
    if (e.children) {
      let n = function(r) {
        for (let s = 0; s < r.length; s++) {
          let h = r[s];
          if (h.name === t || h.uuid === t) return h;
          let c = n(h.children);
          if (c) return c;
        }
        return null;
      }, i = n(e.children);
      if (i) return i;
    }
    return null;
  }
  _getValue_unavailable() {
  }
  _setValue_unavailable() {
  }
  _getValue_direct(e, t) {
    e[t] = this.targetObject[this.propertyName];
  }
  _getValue_array(e, t) {
    let n = this.resolvedProperty;
    for (let i = 0, r = n.length; i !== r; ++i) e[t++] = n[i];
  }
  _getValue_arrayElement(e, t) {
    e[t] = this.resolvedProperty[this.propertyIndex];
  }
  _getValue_toArray(e, t) {
    this.resolvedProperty.toArray(e, t);
  }
  _setValue_direct(e, t) {
    this.targetObject[this.propertyName] = e[t];
  }
  _setValue_direct_setNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.needsUpdate = true;
  }
  _setValue_direct_setMatrixWorldNeedsUpdate(e, t) {
    this.targetObject[this.propertyName] = e[t], this.targetObject.matrixWorldNeedsUpdate = true;
  }
  _setValue_array(e, t) {
    let n = this.resolvedProperty;
    for (let i = 0, r = n.length; i !== r; ++i) n[i] = e[t++];
  }
  _setValue_array_setNeedsUpdate(e, t) {
    let n = this.resolvedProperty;
    for (let i = 0, r = n.length; i !== r; ++i) n[i] = e[t++];
    this.targetObject.needsUpdate = true;
  }
  _setValue_array_setMatrixWorldNeedsUpdate(e, t) {
    let n = this.resolvedProperty;
    for (let i = 0, r = n.length; i !== r; ++i) n[i] = e[t++];
    this.targetObject.matrixWorldNeedsUpdate = true;
  }
  _setValue_arrayElement(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t];
  }
  _setValue_arrayElement_setNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.needsUpdate = true;
  }
  _setValue_arrayElement_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty[this.propertyIndex] = e[t], this.targetObject.matrixWorldNeedsUpdate = true;
  }
  _setValue_fromArray(e, t) {
    this.resolvedProperty.fromArray(e, t);
  }
  _setValue_fromArray_setNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.needsUpdate = true;
  }
  _setValue_fromArray_setMatrixWorldNeedsUpdate(e, t) {
    this.resolvedProperty.fromArray(e, t), this.targetObject.matrixWorldNeedsUpdate = true;
  }
  _getValue_unbound(e, t) {
    this.bind(), this.getValue(e, t);
  }
  _setValue_unbound(e, t) {
    this.bind(), this.setValue(e, t);
  }
  bind() {
    let e = this.node, t = this.parsedPath, n = t.objectName, i = t.propertyName, r = t.propertyIndex;
    if (e || (e = a11.findNode(this.rootNode, t.nodeName), this.node = e), this.getValue = this._getValue_unavailable, this.setValue = this._setValue_unavailable, !e) {
      Pe("PropertyBinding: No target node found for track: " + this.path + ".");
      return;
    }
    if (n) {
      let u = t.objectIndex;
      switch (n) {
        case "materials":
          if (!e.material) {
            Se("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!e.material.materials) {
            Se("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.", this);
            return;
          }
          e = e.material.materials;
          break;
        case "bones":
          if (!e.skeleton) {
            Se("PropertyBinding: Can not bind to bones as node does not have a skeleton.", this);
            return;
          }
          e = e.skeleton.bones;
          for (let f = 0; f < e.length; f++) if (e[f].name === u) {
            u = f;
            break;
          }
          break;
        case "map":
          if ("map" in e) {
            e = e.map;
            break;
          }
          if (!e.material) {
            Se("PropertyBinding: Can not bind to material as node does not have a material.", this);
            return;
          }
          if (!e.material.map) {
            Se("PropertyBinding: Can not bind to material.map as node.material does not have a map.", this);
            return;
          }
          e = e.material.map;
          break;
        default:
          if (e[n] === void 0) {
            Se("PropertyBinding: Can not bind to objectName of node undefined.", this);
            return;
          }
          e = e[n];
      }
      if (u !== void 0) {
        if (e[u] === void 0) {
          Se("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.", this, e);
          return;
        }
        e = e[u];
      }
    }
    let s = e[i];
    if (s === void 0) {
      let u = t.nodeName;
      Se("PropertyBinding: Trying to update property for track: " + u + "." + i + " but it wasn't found.", e);
      return;
    }
    let h = this.Versioning.None;
    this.targetObject = e, e.isMaterial === true ? h = this.Versioning.NeedsUpdate : e.isObject3D === true && (h = this.Versioning.MatrixWorldNeedsUpdate);
    let c = this.BindingType.Direct;
    if (r !== void 0) {
      if (i === "morphTargetInfluences") {
        if (!e.geometry) {
          Se("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.", this);
          return;
        }
        if (!e.geometry.morphAttributes) {
          Se("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.", this);
          return;
        }
        e.morphTargetDictionary[r] !== void 0 && (r = e.morphTargetDictionary[r]);
      }
      c = this.BindingType.ArrayElement, this.resolvedProperty = s, this.propertyIndex = r;
    } else s.fromArray !== void 0 && s.toArray !== void 0 ? (c = this.BindingType.HasFromToArray, this.resolvedProperty = s) : Array.isArray(s) ? (c = this.BindingType.EntireArray, this.resolvedProperty = s) : this.propertyName = i;
    this.getValue = this.GetterByBindingType[c], this.setValue = this.SetterByBindingTypeAndVersioning[c][h];
  }
  unbind() {
    this.node = null, this.getValue = this._getValue_unbound, this.setValue = this._setValue_unbound;
  }
};
ve.Composite = wr;
ve.prototype.BindingType = { Direct: 0, EntireArray: 1, ArrayElement: 2, HasFromToArray: 3 };
ve.prototype.Versioning = { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 };
ve.prototype.GetterByBindingType = [ve.prototype._getValue_direct, ve.prototype._getValue_array, ve.prototype._getValue_arrayElement, ve.prototype._getValue_toArray];
ve.prototype.SetterByBindingTypeAndVersioning = [[ve.prototype._setValue_direct, ve.prototype._setValue_direct_setNeedsUpdate, ve.prototype._setValue_direct_setMatrixWorldNeedsUpdate], [ve.prototype._setValue_array, ve.prototype._setValue_array_setNeedsUpdate, ve.prototype._setValue_array_setMatrixWorldNeedsUpdate], [ve.prototype._setValue_arrayElement, ve.prototype._setValue_arrayElement_setNeedsUpdate, ve.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate], [ve.prototype._setValue_fromArray, ve.prototype._setValue_fromArray_setNeedsUpdate, ve.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];
var Sf = new Float32Array(1);
var Tr = class a12 {
  static {
    a12.prototype.isMatrix2 = true;
  }
  constructor(e, t, n, i) {
    this.elements = [1, 0, 0, 1], e !== void 0 && this.set(e, t, n, i);
  }
  identity() {
    return this.set(1, 0, 0, 1), this;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 4; n++) this.elements[n] = e[n + t];
    return this;
  }
  set(e, t, n, i) {
    let r = this.elements;
    return r[0] = e, r[2] = t, r[1] = n, r[3] = i, this;
  }
};
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: { revision: "186" } }));
typeof window < "u" && (window.__THREE__ ? Pe("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = "186");
var fc = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, dc = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, pc = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, mc = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, gc = `#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`, vc = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, _c = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, xc = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, yc = `#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`, Sc = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`, Mc = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, bc = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, wc = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, Tc = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, Ec = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, Ac = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`, Cc = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, Rc = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, Pc = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, Ic = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`, Lc = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`, Dc = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`, Uc = `#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`, Nc = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Fc = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Oc = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`, Bc = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, zc = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, kc = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Vc = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, Hc = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Gc = `vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`, Wc = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`, Xc = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`, qc = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, $c = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Yc = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Zc = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Jc = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Kc = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, jc = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Qc = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, eh = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, th = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, nh = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, ih = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`, rh = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`, sh = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, ah = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, oh = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, lh = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, ch = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, hh = `uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, uh = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, fh = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, dh = `#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, ph = `#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`, mh = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, gh = `#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, vh = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, _h = `#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`, xh = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, yh = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, Sh = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, Mh = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, bh = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, wh = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, Th = `#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`, Eh = `#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, Ah = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Ch = `#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`, Rh = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`, Ph = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, Ih = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, Lh = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Dh = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, Uh = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`, Nh = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Fh = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, Oh = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, Bh = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, zh = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, kh = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Vh = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`, Hh = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Gh = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Wh = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Xh = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, qh = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, $h = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Yh = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`, Zh = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, Jh = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Kh = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, jh = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Qh = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, eu = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, tu = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, nu = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, iu = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, ru = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, su = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, au = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, ou = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, lu = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, cu = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, hu = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, uu = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`, fu = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, du = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, pu = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, mu = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, gu = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, vu = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, _u = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, xu = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`, yu = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, Su = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`, Mu = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, bu = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, wu = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Tu = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Eu = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, Au = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Cu = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Ru = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Pu = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, Iu = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Lu = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, Du = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, Uu = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Nu = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Fu = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, Ou = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, Bu = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, zu = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, ku = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Vu = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Hu = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Gu = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, Wu = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Xu = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, te = { alphahash_fragment: fc, alphahash_pars_fragment: dc, alphamap_fragment: pc, alphamap_pars_fragment: mc, alphatest_fragment: gc, alphatest_pars_fragment: vc, aomap_fragment: _c, aomap_pars_fragment: xc, batching_pars_vertex: yc, batching_vertex: Sc, begin_vertex: Mc, beginnormal_vertex: bc, bsdfs: wc, iridescence_fragment: Tc, bumpmap_pars_fragment: Ec, clipping_planes_fragment: Ac, clipping_planes_pars_fragment: Cc, clipping_planes_pars_vertex: Rc, clipping_planes_vertex: Pc, color_fragment: Ic, color_pars_fragment: Lc, color_pars_vertex: Dc, color_vertex: Uc, common: Nc, cube_uv_reflection_fragment: Fc, defaultnormal_vertex: Oc, displacementmap_pars_vertex: Bc, displacementmap_vertex: zc, emissivemap_fragment: kc, emissivemap_pars_fragment: Vc, colorspace_fragment: Hc, colorspace_pars_fragment: Gc, envmap_fragment: Wc, envmap_common_pars_fragment: Xc, envmap_pars_fragment: qc, envmap_pars_vertex: $c, envmap_physical_pars_fragment: rh, envmap_vertex: Yc, fog_vertex: Zc, fog_pars_vertex: Jc, fog_fragment: Kc, fog_pars_fragment: jc, gradientmap_pars_fragment: Qc, lightmap_pars_fragment: eh, lights_lambert_fragment: th, lights_lambert_pars_fragment: nh, lights_pars_begin: ih, lights_toon_fragment: sh, lights_toon_pars_fragment: ah, lights_phong_fragment: oh, lights_phong_pars_fragment: lh, lights_physical_fragment: ch, lights_physical_pars_fragment: hh, lights_fragment_begin: uh, lights_fragment_maps: fh, lights_fragment_end: dh, lightprobes_pars_fragment: ph, logdepthbuf_fragment: mh, logdepthbuf_pars_fragment: gh, logdepthbuf_pars_vertex: vh, logdepthbuf_vertex: _h, map_fragment: xh, map_pars_fragment: yh, map_particle_fragment: Sh, map_particle_pars_fragment: Mh, metalnessmap_fragment: bh, metalnessmap_pars_fragment: wh, morphinstance_vertex: Th, morphcolor_vertex: Eh, morphnormal_vertex: Ah, morphtarget_pars_vertex: Ch, morphtarget_vertex: Rh, normal_fragment_begin: Ph, normal_fragment_maps: Ih, normal_pars_fragment: Lh, normal_pars_vertex: Dh, normal_vertex: Uh, normalmap_pars_fragment: Nh, clearcoat_normal_fragment_begin: Fh, clearcoat_normal_fragment_maps: Oh, clearcoat_pars_fragment: Bh, iridescence_pars_fragment: zh, opaque_fragment: kh, packing: Vh, premultiplied_alpha_fragment: Hh, project_vertex: Gh, dithering_fragment: Wh, dithering_pars_fragment: Xh, roughnessmap_fragment: qh, roughnessmap_pars_fragment: $h, shadowmap_pars_fragment: Yh, shadowmap_pars_vertex: Zh, shadowmap_vertex: Jh, shadowmask_pars_fragment: Kh, skinbase_vertex: jh, skinning_pars_vertex: Qh, skinning_vertex: eu, skinnormal_vertex: tu, specularmap_fragment: nu, specularmap_pars_fragment: iu, tonemapping_fragment: ru, tonemapping_pars_fragment: su, transmission_fragment: au, transmission_pars_fragment: ou, uv_pars_fragment: lu, uv_pars_vertex: cu, uv_vertex: hu, worldpos_vertex: uu, background_vert: fu, background_frag: du, backgroundCube_vert: pu, backgroundCube_frag: mu, cube_vert: gu, cube_frag: vu, depth_vert: _u, depth_frag: xu, distance_vert: yu, distance_frag: Su, equirect_vert: Mu, equirect_frag: bu, linedashed_vert: wu, linedashed_frag: Tu, meshbasic_vert: Eu, meshbasic_frag: Au, meshlambert_vert: Cu, meshlambert_frag: Ru, meshmatcap_vert: Pu, meshmatcap_frag: Iu, meshnormal_vert: Lu, meshnormal_frag: Du, meshphong_vert: Uu, meshphong_frag: Nu, meshphysical_vert: Fu, meshphysical_frag: Ou, meshtoon_vert: Bu, meshtoon_frag: zu, points_vert: ku, points_frag: Vu, shadow_vert: Hu, shadow_frag: Gu, sprite_vert: Wu, sprite_frag: Xu }, z = { common: { diffuse: { value: new Ie(16777215) }, opacity: { value: 1 }, map: { value: null }, mapTransform: { value: new J() }, alphaMap: { value: null }, alphaMapTransform: { value: new J() }, alphaTest: { value: 0 } }, specularmap: { specularMap: { value: null }, specularMapTransform: { value: new J() } }, envmap: { envMap: { value: null }, envMapRotation: { value: new J() }, reflectivity: { value: 1 }, ior: { value: 1.5 }, refractionRatio: { value: 0.98 }, dfgLUT: { value: null } }, aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 }, aoMapTransform: { value: new J() } }, lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 }, lightMapTransform: { value: new J() } }, bumpmap: { bumpMap: { value: null }, bumpMapTransform: { value: new J() }, bumpScale: { value: 1 } }, normalmap: { normalMap: { value: null }, normalMapTransform: { value: new J() }, normalScale: { value: new Je(1, 1) } }, displacementmap: { displacementMap: { value: null }, displacementMapTransform: { value: new J() }, displacementScale: { value: 1 }, displacementBias: { value: 0 } }, emissivemap: { emissiveMap: { value: null }, emissiveMapTransform: { value: new J() } }, metalnessmap: { metalnessMap: { value: null }, metalnessMapTransform: { value: new J() } }, roughnessmap: { roughnessMap: { value: null }, roughnessMapTransform: { value: new J() } }, gradientmap: { gradientMap: { value: null } }, fog: { fogDensity: { value: 25e-5 }, fogNear: { value: 1 }, fogFar: { value: 2e3 }, fogColor: { value: new Ie(16777215) } }, lights: { ambientLightColor: { value: [] }, lightProbe: { value: [] }, sunLights: { value: [], properties: { direction: {}, color: {} } }, sunLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, sunShadowMatrix: { value: [] }, sunShadowCascade: { value: [] }, directionalLights: { value: [], properties: { direction: {}, color: {} } }, directionalLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, directionalShadowMatrix: { value: [] }, spotLights: { value: [], properties: { color: {}, position: {}, direction: {}, distance: {}, coneCos: {}, penumbraCos: {}, decay: {} } }, spotLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {} } }, spotLightMap: { value: [] }, spotLightMatrix: { value: [] }, pointLights: { value: [], properties: { color: {}, position: {}, decay: {}, distance: {} } }, pointLightShadows: { value: [], properties: { shadowIntensity: 1, shadowBias: {}, shadowNormalBias: {}, shadowRadius: {}, shadowMapSize: {}, shadowCameraNear: {}, shadowCameraFar: {} } }, pointShadowMatrix: { value: [] }, hemisphereLights: { value: [], properties: { direction: {}, skyColor: {}, groundColor: {} } }, rectAreaLights: { value: [], properties: { color: {}, position: {}, width: {}, height: {} } }, ltc_1: { value: null }, ltc_2: { value: null }, probesSH: { value: null }, probesMin: { value: new U() }, probesMax: { value: new U() }, probesResolution: { value: new U() } }, points: { diffuse: { value: new Ie(16777215) }, opacity: { value: 1 }, size: { value: 1 }, scale: { value: 1 }, map: { value: null }, alphaMap: { value: null }, alphaMapTransform: { value: new J() }, alphaTest: { value: 0 }, uvTransform: { value: new J() } }, sprite: { diffuse: { value: new Ie(16777215) }, opacity: { value: 1 }, center: { value: new Je(0.5, 0.5) }, rotation: { value: 0 }, map: { value: null }, mapTransform: { value: new J() }, alphaMap: { value: null }, alphaMapTransform: { value: new J() }, alphaTest: { value: 0 } } }, ra = { basic: { uniforms: Ke([z.common, z.specularmap, z.envmap, z.aomap, z.lightmap, z.fog]), vertexShader: te.meshbasic_vert, fragmentShader: te.meshbasic_frag }, lambert: { uniforms: Ke([z.common, z.specularmap, z.envmap, z.aomap, z.lightmap, z.emissivemap, z.bumpmap, z.normalmap, z.displacementmap, z.fog, z.lights, { emissive: { value: new Ie(0) }, envMapIntensity: { value: 1 } }]), vertexShader: te.meshlambert_vert, fragmentShader: te.meshlambert_frag }, phong: { uniforms: Ke([z.common, z.specularmap, z.envmap, z.aomap, z.lightmap, z.emissivemap, z.bumpmap, z.normalmap, z.displacementmap, z.fog, z.lights, { emissive: { value: new Ie(0) }, specular: { value: new Ie(1118481) }, shininess: { value: 30 }, envMapIntensity: { value: 1 } }]), vertexShader: te.meshphong_vert, fragmentShader: te.meshphong_frag }, standard: { uniforms: Ke([z.common, z.envmap, z.aomap, z.lightmap, z.emissivemap, z.bumpmap, z.normalmap, z.displacementmap, z.roughnessmap, z.metalnessmap, z.fog, z.lights, { emissive: { value: new Ie(0) }, roughness: { value: 1 }, metalness: { value: 0 }, envMapIntensity: { value: 1 } }]), vertexShader: te.meshphysical_vert, fragmentShader: te.meshphysical_frag }, toon: { uniforms: Ke([z.common, z.aomap, z.lightmap, z.emissivemap, z.bumpmap, z.normalmap, z.displacementmap, z.gradientmap, z.fog, z.lights, { emissive: { value: new Ie(0) } }]), vertexShader: te.meshtoon_vert, fragmentShader: te.meshtoon_frag }, matcap: { uniforms: Ke([z.common, z.bumpmap, z.normalmap, z.displacementmap, z.fog, { matcap: { value: null } }]), vertexShader: te.meshmatcap_vert, fragmentShader: te.meshmatcap_frag }, points: { uniforms: Ke([z.points, z.fog]), vertexShader: te.points_vert, fragmentShader: te.points_frag }, dashed: { uniforms: Ke([z.common, z.fog, { scale: { value: 1 }, dashSize: { value: 1 }, totalSize: { value: 2 } }]), vertexShader: te.linedashed_vert, fragmentShader: te.linedashed_frag }, depth: { uniforms: Ke([z.common, z.displacementmap]), vertexShader: te.depth_vert, fragmentShader: te.depth_frag }, normal: { uniforms: Ke([z.common, z.bumpmap, z.normalmap, z.displacementmap, { opacity: { value: 1 } }]), vertexShader: te.meshnormal_vert, fragmentShader: te.meshnormal_frag }, sprite: { uniforms: Ke([z.sprite, z.fog]), vertexShader: te.sprite_vert, fragmentShader: te.sprite_frag }, background: { uniforms: { uvTransform: { value: new J() }, t2D: { value: null }, backgroundIntensity: { value: 1 } }, vertexShader: te.background_vert, fragmentShader: te.background_frag }, backgroundCube: { uniforms: { envMap: { value: null }, backgroundBlurriness: { value: 0 }, backgroundIntensity: { value: 1 }, backgroundRotation: { value: new J() } }, vertexShader: te.backgroundCube_vert, fragmentShader: te.backgroundCube_frag }, cube: { uniforms: { tCube: { value: null }, tFlip: { value: -1 }, opacity: { value: 1 } }, vertexShader: te.cube_vert, fragmentShader: te.cube_frag }, equirect: { uniforms: { tEquirect: { value: null } }, vertexShader: te.equirect_vert, fragmentShader: te.equirect_frag }, distance: { uniforms: Ke([z.common, z.displacementmap, { referencePosition: { value: new U() }, nearDistance: { value: 1 }, farDistance: { value: 1e3 } }]), vertexShader: te.distance_vert, fragmentShader: te.distance_frag }, shadow: { uniforms: Ke([z.lights, z.fog, { color: { value: new Ie(0) }, opacity: { value: 1 } }]), vertexShader: te.shadow_vert, fragmentShader: te.shadow_frag } };
ra.physical = { uniforms: Ke([ra.standard.uniforms, { clearcoat: { value: 0 }, clearcoatMap: { value: null }, clearcoatMapTransform: { value: new J() }, clearcoatNormalMap: { value: null }, clearcoatNormalMapTransform: { value: new J() }, clearcoatNormalScale: { value: new Je(1, 1) }, clearcoatRoughness: { value: 0 }, clearcoatRoughnessMap: { value: null }, clearcoatRoughnessMapTransform: { value: new J() }, dispersion: { value: 0 }, retroreflectivity: { value: 0 }, iridescence: { value: 0 }, iridescenceMap: { value: null }, iridescenceMapTransform: { value: new J() }, iridescenceIOR: { value: 1.3 }, iridescenceThicknessMinimum: { value: 100 }, iridescenceThicknessMaximum: { value: 400 }, iridescenceThicknessMap: { value: null }, iridescenceThicknessMapTransform: { value: new J() }, sheen: { value: 0 }, sheenColor: { value: new Ie(0) }, sheenColorMap: { value: null }, sheenColorMapTransform: { value: new J() }, sheenRoughness: { value: 1 }, sheenRoughnessMap: { value: null }, sheenRoughnessMapTransform: { value: new J() }, transmission: { value: 0 }, transmissionMap: { value: null }, transmissionMapTransform: { value: new J() }, transmissionSamplerSize: { value: new Je() }, transmissionSamplerMap: { value: null }, thickness: { value: 0 }, thicknessMap: { value: null }, thicknessMapTransform: { value: new J() }, attenuationDistance: { value: 0 }, attenuationColor: { value: new Ie(0) }, specularColor: { value: new Ie(1, 1, 1) }, specularColorMap: { value: null }, specularColorMapTransform: { value: new J() }, specularIntensity: { value: 1 }, specularIntensityMap: { value: null }, specularIntensityMapTransform: { value: new J() }, anisotropyVector: { value: new Je() }, anisotropyMap: { value: null }, anisotropyMapTransform: { value: new J() } }]), vertexShader: te.meshphysical_vert, fragmentShader: te.meshphysical_frag };
var qu = new J();
qu.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
var kv = { [Er]: "LINEAR_TONE_MAPPING", [Ar]: "REINHARD_TONE_MAPPING", [Cr]: "CINEON_TONE_MAPPING", [Rr]: "ACES_FILMIC_TONE_MAPPING", [Ir]: "AGX_TONE_MAPPING", [Lr]: "NEUTRAL_TONE_MAPPING", [Pr]: "CUSTOM_TONE_MAPPING" };
var Vv = new Float32Array(16), Hv = new Float32Array(9), Gv = new Float32Array(4);
var Wv = { [Er]: "Linear", [Ar]: "Reinhard", [Cr]: "Cineon", [Rr]: "ACESFilmic", [Ir]: "AgX", [Lr]: "Neutral", [Pr]: "Custom" };
var Xv = { [Vs]: "SHADOWMAP_TYPE_PCF", [Hs]: "SHADOWMAP_TYPE_VSM" };
var qv = { [qs]: "ENVMAP_TYPE_CUBE", [Ur]: "ENVMAP_TYPE_CUBE", [$s]: "ENVMAP_TYPE_CUBE_UV" };
var $v = { [Ur]: "ENVMAP_MODE_REFRACTION" };
var Yv = { [Gs]: "ENVMAP_BLENDING_MULTIPLY", [Ws]: "ENVMAP_BLENDING_MIX", [Xs]: "ENVMAP_BLENDING_ADD" };
var $u = new J();
$u.set(-1, 0, 0, 0, 1, 0, 0, 0, 1);
var Zv = new Uint16Array([12469, 15057, 12620, 14925, 13266, 14620, 13807, 14376, 14323, 13990, 14545, 13625, 14713, 13328, 14840, 12882, 14931, 12528, 14996, 12233, 15039, 11829, 15066, 11525, 15080, 11295, 15085, 10976, 15082, 10705, 15073, 10495, 13880, 14564, 13898, 14542, 13977, 14430, 14158, 14124, 14393, 13732, 14556, 13410, 14702, 12996, 14814, 12596, 14891, 12291, 14937, 11834, 14957, 11489, 14958, 11194, 14943, 10803, 14921, 10506, 14893, 10278, 14858, 9960, 14484, 14039, 14487, 14025, 14499, 13941, 14524, 13740, 14574, 13468, 14654, 13106, 14743, 12678, 14818, 12344, 14867, 11893, 14889, 11509, 14893, 11180, 14881, 10751, 14852, 10428, 14812, 10128, 14765, 9754, 14712, 9466, 14764, 13480, 14764, 13475, 14766, 13440, 14766, 13347, 14769, 13070, 14786, 12713, 14816, 12387, 14844, 11957, 14860, 11549, 14868, 11215, 14855, 10751, 14825, 10403, 14782, 10044, 14729, 9651, 14666, 9352, 14599, 9029, 14967, 12835, 14966, 12831, 14963, 12804, 14954, 12723, 14936, 12564, 14917, 12347, 14900, 11958, 14886, 11569, 14878, 11247, 14859, 10765, 14828, 10401, 14784, 10011, 14727, 9600, 14660, 9289, 14586, 8893, 14508, 8533, 15111, 12234, 15110, 12234, 15104, 12216, 15092, 12156, 15067, 12010, 15028, 11776, 14981, 11500, 14942, 11205, 14902, 10752, 14861, 10393, 14812, 9991, 14752, 9570, 14682, 9252, 14603, 8808, 14519, 8445, 14431, 8145, 15209, 11449, 15208, 11451, 15202, 11451, 15190, 11438, 15163, 11384, 15117, 11274, 15055, 10979, 14994, 10648, 14932, 10343, 14871, 9936, 14803, 9532, 14729, 9218, 14645, 8742, 14556, 8381, 14461, 8020, 14365, 7603, 15273, 10603, 15272, 10607, 15267, 10619, 15256, 10631, 15231, 10614, 15182, 10535, 15118, 10389, 15042, 10167, 14963, 9787, 14883, 9447, 14800, 9115, 14710, 8665, 14615, 8318, 14514, 7911, 14411, 7507, 14279, 7198, 15314, 9675, 15313, 9683, 15309, 9712, 15298, 9759, 15277, 9797, 15229, 9773, 15166, 9668, 15084, 9487, 14995, 9274, 14898, 8910, 14800, 8539, 14697, 8234, 14590, 7790, 14479, 7409, 14367, 7067, 14178, 6621, 15337, 8619, 15337, 8631, 15333, 8677, 15325, 8769, 15305, 8871, 15264, 8940, 15202, 8909, 15119, 8775, 15022, 8565, 14916, 8328, 14804, 8009, 14688, 7614, 14569, 7287, 14448, 6888, 14321, 6483, 14088, 6171, 15350, 7402, 15350, 7419, 15347, 7480, 15340, 7613, 15322, 7804, 15287, 7973, 15229, 8057, 15148, 8012, 15046, 7846, 14933, 7611, 14810, 7357, 14682, 7069, 14552, 6656, 14421, 6316, 14251, 5948, 14007, 5528, 15356, 5942, 15356, 5977, 15353, 6119, 15348, 6294, 15332, 6551, 15302, 6824, 15249, 7044, 15171, 7122, 15070, 7050, 14949, 6861, 14818, 6611, 14679, 6349, 14538, 6067, 14398, 5651, 14189, 5311, 13935, 4958, 15359, 4123, 15359, 4153, 15356, 4296, 15353, 4646, 15338, 5160, 15311, 5508, 15263, 5829, 15188, 6042, 15088, 6094, 14966, 6001, 14826, 5796, 14678, 5543, 14527, 5287, 14377, 4985, 14133, 4586, 13869, 4257, 15360, 1563, 15360, 1642, 15358, 2076, 15354, 2636, 15341, 3350, 15317, 4019, 15273, 4429, 15203, 4732, 15105, 4911, 14981, 4932, 14836, 4818, 14679, 4621, 14517, 4386, 14359, 4156, 14083, 3795, 13808, 3437, 15360, 122, 15360, 137, 15358, 285, 15355, 636, 15344, 1274, 15322, 2177, 15281, 2765, 15215, 3223, 15120, 3451, 14995, 3569, 14846, 3567, 14681, 3466, 14511, 3305, 14344, 3121, 14037, 2800, 13753, 2467, 15360, 0, 15360, 1, 15359, 21, 15355, 89, 15346, 253, 15325, 479, 15287, 796, 15225, 1148, 15133, 1492, 15008, 1749, 14856, 1882, 14685, 1886, 14506, 1783, 14324, 1608, 13996, 1398, 13702, 1183]);
var aa = "14.28.15-cad-4", Gr = Object.freeze({ faceColor: "#45aaf2", edgeColor: "#182934", background: "#f7fafc", edgeThreshold: 28, smoothAngle: 35, edgeWidth: 1.08, edgeDepthBias: 2e-6, roughness: 0.62, metalness: 0, ambient: 0.72, key: 2.25, fill: 0.28, gridOpacity: 0.24 });
function oa(a13, e = Gr.edgeThreshold) {
  let t = new pt();
  t.setAttribute("position", new Ve(a13.positions, 3)), t.setIndex(new Ve(a13.indices, 1));
  let n = new Cn(t, e), i = n.getAttribute("position")?.array, r = i ? new Float32Array(i) : new Float32Array();
  return n.dispose(), t.dispose(), r;
}
var Yu = { cutterBase: { enabled: false, type: "parallel", mode: "overlay", rotation: 28, color: "#65584d", thickness: 0.12, scale: 4.8, intensity: 0.42 }, blade: { enabled: false, type: "parallel", mode: "overlay", rotation: -28, color: "#65584d", thickness: 0.11, scale: 4, intensity: 0.38 }, reinforcement: { enabled: false, type: "parallel", mode: "overlay", rotation: 18, color: "#65584d", thickness: 0.11, scale: 4.2, intensity: 0.38 }, stampBase: { enabled: false, type: "cross", mode: "overlay", rotation: 42, color: "#65584d", thickness: 0.1, scale: 5.2, intensity: 0.38 }, relief: { enabled: false, type: "double45", mode: "overlay", rotation: 18, color: "#65584d", thickness: 0.09, scale: 3.6, intensity: 0.34 }, shadow: { enabled: false, type: "cross", mode: "replace", rotation: 45, color: "#4d443e", thickness: 0.1, scale: 4.4, intensity: 0.44 } }, t_ = { style: "illustrated", shadeSoftness: 0.65, background: "#a9eaf8", modelColor: "#ffba24", componentColors: true, colors: { cutterBase: "#e18e25", blade: "#ffbf28", reinforcement: "#a75cff", stampBase: "#38bfb8", relief: "#f07891" }, lightAzimuth: -40, lightElevation: 55, lightIntensity: 2.4, ambient: 0.8, shadows: true, groundDistance: 4, projectedShadows: true, modelShadows: true, modelShadowMode: "soft", aoIntensity: 0.32, aoRadius: 1.4, shadowOpacity: 0.3, shadowSoftness: 3, lineColor: "#382a24", lineWidth: 1.4, internalEdges: true, hatching: 0.45, hatchMaster: false, hatchProfiles: structuredClone(Yu), projection: "perspective", showDims: false, transparent: false, exportSize: 1600 };
function la(a13, e = {}, t = null) {
  let n = a13.attributes.position.array, i = a13.index?.array || Uint32Array.from({ length: n.length / 3 }, (m, g) => g), r = [], s = [], h = [], c = /* @__PURE__ */ new Map(), u = (e.height ?? 0) - (e.chamferHeight ?? 0), f = Math.cos(kr.degToRad(Gr.smoothAngle)), d = 1e5;
  for (let m = 0; m < i.length; m += 3) {
    let g = [i[m], i[m + 1], i[m + 2]], _ = g.map((V) => [n[V * 3], n[V * 3 + 1], n[V * 3 + 2]]), b = _[1].map((V, $) => V - _[0][$]), A = _[2].map((V, $) => V - _[0][$]), R = [b[1] * A[2] - b[2] * A[1], b[2] * A[0] - b[0] * A[2], b[0] * A[1] - b[1] * A[0]], F = Math.hypot(...R);
    if (F < 1e-15) continue;
    R = R.map((V) => V / F);
    let k = _.map((V) => V[2]), L = Math.min(...k), O = Math.max(...k), G = Math.abs(R[2]) > 0.9999, N = t === "blade" && e.chamfer && L >= u - 1e-4 && O > u + 1e-4 && !G, D = G ? "cap:" + Math.round(k[0] * 1e4) : N ? "bevel" : "wall";
    for (let V = 0; V < 3; V++) {
      let $ = _[V].map((Z) => Math.round(Z * d)).join(","), Y = D + ":" + $, H = c.get(Y);
      H || (H = [], c.set(Y, H));
      let K = H.find((Z) => Z.n[0] * R[0] + Z.n[1] * R[1] + Z.n[2] * R[2] >= f);
      K || (K = { n: [...R], id: r.length / 3 }, H.push(K), r.push(..._[V]), s.push(0, 0, 0));
      let W = _[(V + 1) % 3].map((Z, de) => Z - _[V][de]), ce = _[(V + 2) % 3].map((Z, de) => Z - _[V][de]), se = Math.acos(Math.max(-1, Math.min(1, (W[0] * ce[0] + W[1] * ce[1] + W[2] * ce[2]) / (Math.hypot(...W) * Math.hypot(...ce) || 1))));
      for (let Z = 0; Z < 3; Z++) s[K.id * 3 + Z] += R[Z] * se;
      h.push(K.id);
    }
  }
  for (let m = 0; m < s.length; m += 3) {
    let g = Math.hypot(s[m], s[m + 1], s[m + 2]) || 1;
    for (let _ = 0; _ < 3; _++) s[m + _] /= g;
  }
  let v = new pt();
  return v.setAttribute("position", new Ve(new Float32Array(r), 3)), v.setAttribute("normal", new Ve(new Float32Array(s), 3)), v.setIndex(h), v;
}
async function Zu(a13 = {}) {
  var e, t = a13, n = !!globalThis.window, i = !!globalThis.WorkerGlobalScope, r = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
  if (r) {
    let { createRequire: o } = await import("node:module");
    var s = o(import.meta.url);
  }
  var h = false;
  t.setup = function() {
    if (h) return;
    h = true, t.initTBB();
    function o(y, M, E = ((P) => P)) {
      if (M) for (let P of M) y.push_back(E(P));
      return y;
    }
    function l(y, M = ((E) => E)) {
      let E = [], P = y.size();
      for (let q = 0; q < P; q++) E.push(M(y.get(q)));
      return E;
    }
    function p(y, M = ((E) => E)) {
      let E = [], P = y.size();
      for (let q = 0; q < P; q++) {
        let Q = y.get(q), fe = Q.size(), ke = [];
        for (let Me = 0; Me < fe; Me++) ke.push(M(Q.get(Me)));
        E.push(ke);
      }
      return E;
    }
    function x(y) {
      return y[0].length < 3 && (y = [y]), o(new t.Vector2_vec2(), y, (M) => o(new t.Vector_vec2(), M, (E) => E instanceof Array ? { x: E[0], y: E[1] } : E));
    }
    function S(y) {
      for (let M = 0; M < y.size(); M++) y.get(M).delete();
      y.delete();
    }
    function w(y) {
      return y[0] instanceof Array ? { x: y[0][0], y: y[0][1] } : typeof y[0] == "number" ? { x: y[0] || 0, y: y[1] || 0 } : y[0];
    }
    function T(y) {
      return y[0] instanceof Array ? { x: y[0][0], y: y[0][1], z: y[0][2] } : typeof y[0] == "number" ? { x: y[0] || 0, y: y[1] || 0, z: y[2] || 0 } : y[0];
    }
    function C(y) {
      return y == "EvenOdd" ? 0 : y == "NonZero" ? 1 : y == "Negative" ? 3 : 2;
    }
    function I(y) {
      return y == "Round" ? 1 : y == "Miter" ? 2 : 0;
    }
    let B = t.CrossSection;
    function X(y, M = "Positive") {
      if (y instanceof B) return y;
      {
        let E = x(y), P = new B(E, C(M));
        return S(E), P;
      }
    }
    t.CrossSection.prototype.translate = function(...y) {
      return this._Translate(w(y));
    }, t.CrossSection.prototype.scale = function(y) {
      return typeof y == "number" ? this._Scale({ x: y, y }) : this._Scale(w([y]));
    }, t.CrossSection.prototype.mirror = function(y) {
      return this._Mirror(w([y]));
    }, t.CrossSection.prototype.warp = function(y) {
      let M = zt(function(P) {
        let q = ue(P, "double"), Q = ue(P + 8, "double"), fe = [q, Q];
        y(fe), De(P, fe[0], "double"), De(P + 8, fe[1], "double");
      }, "vi"), E = this._Warp(M);
      return kt(M), E;
    }, t.CrossSection.prototype.decompose = function() {
      let y = this._Decompose(), M = l(y);
      return y.delete(), M;
    }, t.CrossSection.prototype.bounds = function() {
      let y = this._Bounds();
      return { min: ["x", "y"].map((M) => y.min[M]), max: ["x", "y"].map((M) => y.max[M]) };
    }, t.CrossSection.prototype.offset = function(y, M = "Round", E = 2, P = 0) {
      return this._Offset(y, I(M), E, P);
    }, t.CrossSection.prototype.simplify = function(y = 1e-6) {
      return this._Simplify(y);
    }, t.CrossSection.prototype.extrude = function(y, M = 0, E = 0, P = [1, 1], q = false) {
      P = w([P]);
      let Q = t._Extrude(this._ToPolygons(), y, M, E, P);
      return q ? Q.translate([0, 0, -y / 2]) : Q;
    }, t.CrossSection.prototype.revolve = function(y = 0, M = 360) {
      return t._Revolve(this._ToPolygons(), y, M);
    }, t.CrossSection.prototype.add = function(y) {
      return this._add(X(y));
    }, t.CrossSection.prototype.subtract = function(y) {
      return this._subtract(X(y));
    }, t.CrossSection.prototype.intersect = function(y) {
      return this._intersect(X(y));
    }, t.CrossSection.prototype.toPolygons = function() {
      let y = this._ToPolygons(), M = p(y, (E) => [E.x, E.y]);
      return y.delete(), M;
    }, t.Manifold.prototype.smoothOut = function(y = 52.5, M = 0) {
      return this._SmoothOut(y, M);
    }, t.Manifold.prototype.warp = function(y) {
      let M = zt(function(q) {
        let Q = ue(q, "double"), fe = ue(q + 8, "double"), ke = ue(q + 16, "double"), Me = [Q, fe, ke];
        y(Me), De(q, Me[0], "double"), De(q + 8, Me[1], "double"), De(q + 16, Me[2], "double");
      }, "vi"), E = this._Warp(M);
      kt(M);
      let P = E.status();
      if (P !== "NoError") throw new t.ManifoldError(P);
      return E;
    }, t.Manifold.prototype.warpBatch = function(y) {
      let M = zt(function(q, Q) {
        let fe = t.HEAPF64 ?? W;
        if (!fe) throw new Error("WASM heap is not initialized (HEAPF64 unavailable)");
        let ke = new Float64Array(fe.buffer, q, Q * 3);
        y(ke, Q);
      }, "vii"), E = this._WarpBatch(M);
      kt(M);
      let P = E.status();
      if (P !== "NoError") throw new t.ManifoldError(P);
      return E;
    }, t.Manifold.prototype.calculateNormals = function(y = 0, M = 52.5) {
      return this._CalculateNormals(y, M);
    }, t.Manifold.prototype.smoothByNormals = function(y = 0) {
      return this._SmoothByNormals(y);
    }, t.Manifold.prototype.setProperties = function(y, M) {
      let E = this.numProp(), P = zt(function(Q, fe, ke) {
        let Me = [];
        for (let ge = 0; ge < y; ++ge) Me[ge] = ue(Q + 8 * ge, "double");
        let Et = [];
        for (let ge = 0; ge < 3; ++ge) Et[ge] = ue(fe + 8 * ge, "double");
        let At = [];
        for (let ge = 0; ge < E; ++ge) At[ge] = ue(ke + 8 * ge, "double");
        M(Me, Et, At);
        for (let ge = 0; ge < y; ++ge) De(Q + 8 * ge, Me[ge], "double");
      }, "viii"), q = this._SetProperties(y, P);
      return kt(P), q;
    }, t.Manifold.prototype.translate = function(...y) {
      return this._Translate(T(y));
    }, t.Manifold.prototype.rotate = function(y, M, E) {
      return Array.isArray(y) ? this._Rotate(...y) : this._Rotate(y, M || 0, E || 0);
    }, t.Manifold.prototype.scale = function(y) {
      return typeof y == "number" ? this._Scale({ x: y, y, z: y }) : this._Scale(T([y]));
    }, t.Manifold.prototype.mirror = function(y) {
      return this._Mirror(T([y]));
    }, t.Manifold.prototype.trimByPlane = function(y, M = 0) {
      return this._TrimByPlane(T([y]), M);
    }, t.Manifold.prototype.slice = function(y = 0) {
      let M = this._Slice(y), E = new B(M, C("Positive"));
      return S(M), E;
    }, t.Manifold.prototype.project = function() {
      let y = this._Project(), M = new B(y, C("Positive"));
      return S(y), M;
    }, t.Manifold.prototype.rayCast = function(y, M) {
      let E = this._RayCast(T([y]), T([M])), P = l(E, (q) => ({ faceID: q.faceID, distance: q.distance, position: ["x", "y", "z"].map((Q) => q.position[Q]), normal: ["x", "y", "z"].map((Q) => q.normal[Q]) }));
      return E.delete(), P;
    }, t.Manifold.prototype.split = function(y) {
      let M = this._Split(y), E = l(M);
      return M.delete(), E;
    }, t.Manifold.prototype.splitByPlane = function(y, M = 0) {
      let E = this._SplitByPlane(T([y]), M), P = l(E);
      return E.delete(), P;
    }, t.Manifold.prototype.decompose = function() {
      let y = this._Decompose(), M = l(y);
      return y.delete(), M;
    }, t.Manifold.prototype.boundingBox = function() {
      let y = this._boundingBox();
      return { min: ["x", "y", "z"].map((M) => y.min[M]), max: ["x", "y", "z"].map((M) => y.max[M]) };
    }, t.Manifold.prototype.simplify = function(y = 0) {
      return this._Simplify(y);
    };
    class ne {
      constructor({ numProp: M = 3, triVerts: E = new Uint32Array(), vertProperties: P = new Float32Array(), mergeFromVert: q, mergeToVert: Q, runIndex: fe, runOriginalID: ke, faceID: Me, halfedgeTangent: Et, runTransform: At, runFlags: ge, tolerance: Vi = 0 } = {}) {
        this.numProp = M, this.triVerts = E, this.vertProperties = P, this.mergeFromVert = q, this.mergeToVert = Q, this.runIndex = fe, this.runOriginalID = ke, this.faceID = Me, this.halfedgeTangent = Et, this.runTransform = At, this.runFlags = ge, this.tolerance = Vi;
      }
      get numTri() {
        return this.triVerts.length / 3;
      }
      get numVert() {
        return this.vertProperties.length / this.numProp;
      }
      get numRun() {
        return this.runOriginalID.length;
      }
      merge() {
        let { changed: M, mesh: E } = t._Merge(this);
        return Object.assign(this, { ...E }), M;
      }
      verts(M) {
        return this.triVerts.subarray(3 * M, 3 * (M + 1));
      }
      position(M) {
        return this.vertProperties.subarray(this.numProp * M, this.numProp * M + 3);
      }
      extras(M) {
        return this.vertProperties.subarray(this.numProp * M + 3, this.numProp * (M + 1));
      }
      tangent(M) {
        return this.halfedgeTangent.subarray(4 * M, 4 * (M + 1));
      }
      transform(M) {
        let E = new Array(16);
        for (let P of [0, 1, 2, 3]) for (let q of [0, 1, 2]) E[4 * P + q] = this.runTransform[12 * M + 3 * P + q];
        return E[15] = 1, E;
      }
      backside(M) {
        return this.runFlags != null && M < this.runFlags.length && (this.runFlags[M] & 1) !== 0;
      }
      hasNormals(M) {
        return this.runFlags != null && M < this.runFlags.length && (this.runFlags[M] & 2) !== 0;
      }
    }
    t.Mesh = ne, t.Manifold.prototype.getMesh = function(y = -1) {
      return new ne(this._GetMeshJS(y));
    }, t.ManifoldError = function(M, ...E) {
      let P = "Unknown error";
      switch (M) {
        case "NonFiniteVertex":
          P = "Non-finite vertex";
          break;
        case "NotManifold":
          P = "Not manifold";
          break;
        case "VertexOutOfBounds":
          P = "Vertex index out of bounds";
          break;
        case "PropertiesWrongLength":
          P = "Properties have wrong length";
          break;
        case "MissingPositionProperties":
          P = "Less than three properties";
          break;
        case "MergeVectorsDifferentLengths":
          P = "Merge vectors have different lengths";
          break;
        case "MergeIndexOutOfBounds":
          P = "Merge index out of bounds";
          break;
        case "TransformWrongLength":
          P = "Transform vector has wrong length";
          break;
        case "RunIndexWrongLength":
          P = "Run index vector has wrong length";
          break;
        case "FaceIDWrongLength":
          P = "Face ID vector has wrong length";
          break;
        case "InvalidConstruction":
          P = "Manifold constructed with invalid parameters";
          break;
        case "ResultTooLarge":
          P = "Result exceeds maximum size";
          break;
        case "InvalidTangents":
          P = "Invalid halfedge tangents";
          break;
      }
      let q = Error.apply(this, [P, ...E]);
      q.name = this.name = "ManifoldError", this.message = q.message, this.stack = q.stack, this.code = M;
    }, t.ManifoldError.prototype = Object.create(Error.prototype, { constructor: { value: t.ManifoldError, writable: true, configurable: true } }), t.CrossSection = function(y, M = "Positive") {
      let E = x(y), P = new B(E, C(M));
      return S(E), P;
    }, t.CrossSection.ofPolygons = function(y, M = "Positive") {
      return new t.CrossSection(y, M);
    }, t.CrossSection.square = function(...y) {
      let M;
      y.length == 0 ? M = { x: 1, y: 1 } : typeof y[0] == "number" ? M = { x: y[0], y: y[0] } : M = w(y);
      let E = y[1] || false;
      return t._Square(M, E);
    }, t.CrossSection.circle = function(y, M = 0) {
      return t._Circle(y, M);
    };
    function re(y) {
      return function(...M) {
        M.length == 1 && (M = M[0]);
        let E = new t.Vector_crossSection();
        for (let q of M) E.push_back(X(q));
        let P = t["_crossSection" + y](E);
        return E.delete(), P;
      };
    }
    t.CrossSection.compose = re("Compose"), t.CrossSection.union = re("UnionN"), t.CrossSection.difference = re("DifferenceN"), t.CrossSection.intersection = re("IntersectionN");
    function ie(y, M) {
      o(y, M, (E) => E instanceof Array ? { x: E[0], y: E[1] } : E);
    }
    t.CrossSection.hull = function(...y) {
      y.length == 1 && (y = y[0]);
      let M = new t.Vector_vec2();
      for (let P of y) if (P instanceof B) t._crossSectionCollectVertices(M, P);
      else if (P instanceof Array && P.length == 2 && typeof P[0] == "number") M.push_back({ x: P[0], y: P[1] });
      else if (P.x) M.push_back(P);
      else {
        let Q = P[0].length == 2 && typeof P[0][0] == "number" || P[0].x ? [P] : P;
        for (let fe of Q) ie(M, fe);
      }
      let E = t._crossSectionHullPoints(M);
      return M.delete(), E;
    }, t.CrossSection.prototype = Object.create(B.prototype), Object.defineProperty(t.CrossSection, Symbol.hasInstance, { get: () => (y) => y instanceof B });
    let me = t.Manifold;
    t.Manifold = function(y) {
      let M = new me(y), E = M.status();
      if (E !== "NoError") throw new t.ManifoldError(E);
      return M;
    }, t.Manifold.ofMesh = function(y) {
      return new t.Manifold(y);
    }, t.Manifold.tetrahedron = function() {
      return t._Tetrahedron();
    }, t.Manifold.cube = function(...y) {
      let M;
      y.length == 0 ? M = { x: 1, y: 1, z: 1 } : typeof y[0] == "number" ? M = { x: y[0], y: y[0], z: y[0] } : M = T(y);
      let E = y[1] || false;
      return t._Cube(M, E);
    }, t.Manifold.cylinder = function(y, M, E = -1, P = 0, q = false) {
      return t._Cylinder(y, M, E, P, q);
    }, t.Manifold.sphere = function(y, M = 0) {
      return t._Sphere(y, M);
    }, t.Manifold.smooth = function(y, M = []) {
      let E = new t.Vector_smoothness();
      o(E, M);
      let P = t._Smooth(y, E);
      return E.delete(), P;
    }, t.Manifold.extrude = function(y, M, E = 0, P = 0, q = [1, 1], Q = false) {
      return (y instanceof B ? y : t.CrossSection(y, "Positive")).extrude(M, E, P, q, Q);
    }, t.Manifold.revolve = function(y, M = 0, E = 360) {
      return (y instanceof B ? y : t.CrossSection(y, "Positive")).revolve(M, E);
    }, t.Manifold.reserveIDs = function(y) {
      return t._ReserveIDs(y);
    };
    function Ne(y) {
      return function(...M) {
        M.length == 1 && (M = M[0]);
        let E = new t.Vector_manifold();
        for (let q of M) E.push_back(q);
        let P = t["_manifold" + y + "N"](E);
        return E.delete(), P;
      };
    }
    t.Manifold.union = Ne("Union"), t.Manifold.compose = t.Manifold.union, t.Manifold.difference = Ne("Difference"), t.Manifold.intersection = Ne("Intersection"), t.Manifold.levelSet = function(y, M, E, P = 0, q = -1) {
      let Q = { min: { x: M.min[0], y: M.min[1], z: M.min[2] }, max: { x: M.max[0], y: M.max[1], z: M.max[2] } }, fe = zt(function(Me) {
        let Et = ue(Me, "double"), At = ue(Me + 8, "double"), ge = ue(Me + 16, "double");
        return y([Et, At, ge]);
      }, "di"), ke = t._LevelSet(fe, Q, E, P, q);
      return kt(fe), ke;
    }, t.ExecutionContext.prototype.fromMesh = function(y) {
      return this._FromMesh(y);
    }, t.ExecutionContext.prototype.smooth = function(y, M = []) {
      let E = new t.Vector_smoothness();
      o(E, M);
      let P = this._Smooth(y, E);
      return E.delete(), P;
    }, t.ExecutionContext.prototype.levelSet = function(y, M, E, P = 0, q = -1) {
      let Q = { min: { x: M.min[0], y: M.min[1], z: M.min[2] }, max: { x: M.max[0], y: M.max[1], z: M.max[2] } }, fe = zt(function(Me) {
        let Et = ue(Me, "double"), At = ue(Me + 8, "double"), ge = ue(Me + 16, "double");
        return y([Et, At, ge]);
      }, "di"), ke = this._LevelSet(fe, Q, E, P, q);
      return kt(fe), ke;
    };
    function Qe(y, M) {
      o(y, M, (E) => E instanceof Array ? { x: E[0], y: E[1], z: E[2] } : E);
    }
    t.Manifold.hull = function(...y) {
      y.length == 1 && (y = y[0]);
      let M = new t.Vector_vec3();
      for (let P of y) P instanceof me ? t._manifoldCollectVertices(M, P) : P instanceof Array && P.length == 3 && typeof P[0] == "number" ? M.push_back({ x: P[0], y: P[1], z: P[2] }) : P.x ? M.push_back(P) : Qe(M, P);
      let E = t._manifoldHullPoints(M);
      return M.delete(), E;
    }, t.Manifold.prototype = Object.create(me.prototype), Object.defineProperty(t.Manifold, Symbol.hasInstance, { get: () => (y) => y instanceof me }), t.triangulate = function(y, M = -1, E = true) {
      let P = x(y), q = l(t._Triangulate(P, M, E), (Q) => [Q[0], Q[1], Q[2]]);
      return S(P), q;
    };
  };
  var c = [], u = "./this.program", f = (o, l) => {
    throw l;
  }, d = import.meta.url, v = "";
  function m(o) {
    return t.locateFile ? t.locateFile(o, v) : v + o;
  }
  var g, _;
  if (r) {
    var b = s("node:fs");
    d.startsWith("file:") && (v = s("node:path").dirname(s("node:url").fileURLToPath(d)) + "/"), _ = (o) => {
      o = L(o) ? new URL(o) : o;
      var l = b.readFileSync(o);
      return l;
    }, g = async (o, l = true) => {
      o = L(o) ? new URL(o) : o;
      var p = b.readFileSync(o, l ? void 0 : "utf8");
      return p;
    }, process.argv.length > 1 && (u = process.argv[1].replace(/\\/g, "/")), c = process.argv.slice(2), f = (o, l) => {
      throw process.exitCode = o, l;
    };
  } else if (n || i) {
    try {
      v = new URL(".", d).href;
    } catch {
    }
    i && (_ = (o) => {
      var l = new XMLHttpRequest();
      return l.open("GET", o, false), l.responseType = "arraybuffer", l.send(null), new Uint8Array(l.response);
    }), g = async (o) => {
      if (L(o)) return new Promise((p, x) => {
        var S = new XMLHttpRequest();
        S.open("GET", o, true), S.responseType = "arraybuffer", S.onload = () => {
          if (S.status == 200 || S.status == 0 && S.response) {
            p(S.response);
            return;
          }
          x(S.status);
        }, S.onerror = x, S.send(null);
      });
      var l = await fetch(o, { credentials: "same-origin" });
      if (l.ok) return l.arrayBuffer();
      throw new Error(l.status + " : " + l.url);
    };
  }
  var A = console.log.bind(console), R = console.error.bind(console), F, k = false, L = (o) => o.startsWith("file://"), O, G, N, D, V, $, Y, H, K, W, ce, se, Z = false;
  function de() {
    var o = qn.buffer;
    N = new Int8Array(o), V = new Int16Array(o), D = new Uint8Array(o), $ = new Uint16Array(o), Y = new Int32Array(o), H = new Uint32Array(o), K = new Float32Array(o), W = new Float64Array(o), ce = new BigInt64Array(o), se = new BigUint64Array(o);
  }
  function qe() {
    if (t.preRun) for (typeof t.preRun == "function" && (t.preRun = [t.preRun]); t.preRun.length; ) pe(t.preRun.shift());
    Be(ze);
  }
  function be() {
    Z = true, Vt.J();
  }
  function ft() {
    if (t.postRun) for (typeof t.postRun == "function" && (t.postRun = [t.postRun]); t.postRun.length; ) Te(t.postRun.shift());
    Be(he);
  }
  function $e(o) {
    t.onAbort?.(o), o = "Aborted(" + o + ")", R(o), k = true, o += ". Build with -sASSERTIONS for more info.";
    var l = new WebAssembly.RuntimeError(o);
    throw G?.(l), l;
  }
  var Le;
  function _e() {
    return t.locateFile ? m("manifold.wasm") : new URL("manifold.wasm", import.meta.url).href;
  }
  function Oe(o) {
    if (o == Le && F) return new Uint8Array(F);
    if (_) return _(o);
    throw "both async and sync fetching of the wasm failed";
  }
  async function ae(o) {
    if (!F) try {
      var l = await g(o);
      return new Uint8Array(l);
    } catch {
    }
    return Oe(o);
  }
  async function j(o, l) {
    try {
      var p = await ae(o), x = await WebAssembly.instantiate(p, l);
      return x;
    } catch (S) {
      R(`failed to asynchronously prepare wasm: ${S}`), $e(S);
    }
  }
  async function xe(o, l, p) {
    if (!o && !L(l) && !r) try {
      var x = fetch(l, { credentials: "same-origin" }), S = await WebAssembly.instantiateStreaming(x, p);
      return S;
    } catch (w) {
      R(`wasm streaming compile failed: ${w}`), R("falling back to ArrayBuffer instantiation");
    }
    return j(l, p);
  }
  function we() {
    var o = { a: ml };
    return o;
  }
  async function ye() {
    function o(w, T) {
      return Vt = w.exports, Vt = gl(Vt), pl(Vt), de(), Vt;
    }
    function l(w) {
      return o(w.instance);
    }
    var p = we();
    if (t.instantiateWasm) return new Promise((w, T) => {
      t.instantiateWasm(p, (C, I) => {
        w(o(C, I));
      });
    });
    Le ??= _e();
    var x = await xe(F, Le, p), S = l(x);
    return S;
  }
  class Ce {
    name = "ExitStatus";
    constructor(l) {
      this.message = `Program terminated with exit(${l})`, this.status = l;
    }
  }
  var Be = (o) => {
    for (; o.length > 0; ) o.shift()(t);
  }, he = [], Te = (o) => he.push(o), ze = [], pe = (o) => ze.push(o);
  function ue(o, l = "i8") {
    switch (l.endsWith("*") && (l = "*"), l) {
      case "i1":
        return N[o >>> 0];
      case "i8":
        return N[o >>> 0];
      case "i16":
        return V[o >>> 1 >>> 0];
      case "i32":
        return Y[o >>> 2 >>> 0];
      case "i64":
        return ce[o >>> 3 >>> 0];
      case "float":
        return K[o >>> 2 >>> 0];
      case "double":
        return W[o >>> 3 >>> 0];
      case "*":
        return H[o >>> 2 >>> 0];
      default:
        $e(`invalid type for getValue: ${l}`);
    }
  }
  var Re = true;
  function De(o, l, p = "i8") {
    switch (p.endsWith("*") && (p = "*"), p) {
      case "i1":
        N[o >>> 0] = l;
        break;
      case "i8":
        N[o >>> 0] = l;
        break;
      case "i16":
        V[o >>> 1 >>> 0] = l;
        break;
      case "i32":
        Y[o >>> 2 >>> 0] = l;
        break;
      case "i64":
        ce[o >>> 3 >>> 0] = BigInt(l);
        break;
      case "float":
        K[o >>> 2 >>> 0] = l;
        break;
      case "double":
        W[o >>> 3 >>> 0] = l;
        break;
      case "*":
        H[o >>> 2 >>> 0] = l;
        break;
      default:
        $e(`invalid type for setValue: ${p}`);
    }
  }
  class $t {
    constructor(l) {
      this.excPtr = l, this.ptr = l - 24;
    }
    set_type(l) {
      H[this.ptr + 4 >>> 2 >>> 0] = l;
    }
    get_type() {
      return H[this.ptr + 4 >>> 2 >>> 0];
    }
    set_destructor(l) {
      H[this.ptr + 8 >>> 2 >>> 0] = l;
    }
    get_destructor() {
      return H[this.ptr + 8 >>> 2 >>> 0];
    }
    set_caught(l) {
      l = l ? 1 : 0, N[this.ptr + 12 >>> 0] = l;
    }
    get_caught() {
      return N[this.ptr + 12 >>> 0] != 0;
    }
    set_rethrown(l) {
      l = l ? 1 : 0, N[this.ptr + 13 >>> 0] = l;
    }
    get_rethrown() {
      return N[this.ptr + 13 >>> 0] != 0;
    }
    init(l, p) {
      this.set_adjusted_ptr(0), this.set_type(l), this.set_destructor(p);
    }
    set_adjusted_ptr(l) {
      H[this.ptr + 16 >>> 2 >>> 0] = l;
    }
    get_adjusted_ptr() {
      return H[this.ptr + 16 >>> 2 >>> 0];
    }
  }
  var Ye = 0, Yt = 0;
  function mt(o, l, p) {
    o >>>= 0, l >>>= 0, p >>>= 0;
    var x = new $t(o);
    throw x.init(l, p), Ye = o, Yt++, Ye;
  }
  var Nn = () => $e(""), Fn = {}, Ci = (o) => {
    for (; o.length; ) {
      var l = o.pop(), p = o.pop();
      p(l);
    }
  };
  function dn(o) {
    return this.fromWireType(H[o >>> 2 >>> 0]);
  }
  var Zt = {}, Ft = {}, On = {}, za = class extends Error {
    constructor(l) {
      super(l), this.name = "InternalError";
    }
  }, Bn = (o) => {
    throw new za(o);
  }, Tt = (o, l, p) => {
    o.forEach((C) => On[C] = l);
    function x(C) {
      var I = p(C);
      I.length !== o.length && Bn("Mismatched type converter count");
      for (var B = 0; B < o.length; ++B) je(o[B], I[B]);
    }
    var S = new Array(l.length), w = [], T = 0;
    for (let [C, I] of l.entries()) Ft.hasOwnProperty(I) ? S[C] = Ft[I] : (w.push(I), Zt.hasOwnProperty(I) || (Zt[I] = []), Zt[I].push(() => {
      S[C] = Ft[I], ++T, T === w.length && x(S);
    }));
    w.length === 0 && x(S);
  }, ka = function(o) {
    o >>>= 0;
    var l = Fn[o];
    delete Fn[o];
    var p = l.rawConstructor, x = l.rawDestructor, S = l.fields, w = S.map((T) => T.getterReturnType).concat(S.map((T) => T.setterArgumentType));
    Tt([o], w, (T) => {
      var C = {};
      for (var [I, B] of S.entries()) {
        let X = T[I], ne = B.getter, re = B.getterContext, ie = T[I + S.length], me = B.setter, Ne = B.setterContext;
        C[B.fieldName] = { read: (Qe) => X.fromWireType(ne(re, Qe)), write: (Qe, y) => {
          var M = [];
          me(Ne, Qe, ie.toWireType(M, y)), Ci(M);
        }, optional: X.optional };
      }
      return [{ name: l.name, fromWireType: (X) => {
        var ne = {};
        for (var re in C) ne[re] = C[re].read(X);
        return x(X), ne;
      }, toWireType: (X, ne) => {
        for (var re in C) if (!(re in ne) && !C[re].optional) throw new TypeError(`Missing field: "${re}"`);
        var ie = p();
        for (re in C) C[re].write(ie, ne[re]);
        return X !== null && X.push(x, ie), ie;
      }, readValueFromPointer: dn, destructorFunction: x }];
    });
  }, Ee = (o) => {
    o >>>= 0;
    for (var l = ""; ; ) {
      var p = D[o++ >>> 0];
      if (!p) return l;
      l += String.fromCharCode(p);
    }
  }, pn = class extends Error {
    constructor(l) {
      super(l), this.name = "BindingError";
    }
  }, oe = (o) => {
    throw new pn(o);
  };
  function Va(o, l, p = {}) {
    var x = l.name;
    if (o || oe(`type "${x}" must have a positive integer typeid pointer`), Ft.hasOwnProperty(o)) {
      if (p.ignoreDuplicateRegistrations) return;
      oe(`Cannot register type '${x}' twice`);
    }
    if (Ft[o] = l, delete On[o], Zt.hasOwnProperty(o)) {
      var S = Zt[o];
      delete Zt[o], S.forEach((w) => w());
    }
  }
  function je(o, l, p = {}) {
    return Va(o, l, p);
  }
  var ss = (o, l, p) => {
    switch (l) {
      case 1:
        return p ? (x) => N[x >>> 0] : (x) => D[x >>> 0];
      case 2:
        return p ? (x) => V[x >>> 1 >>> 0] : (x) => $[x >>> 1 >>> 0];
      case 4:
        return p ? (x) => Y[x >>> 2 >>> 0] : (x) => H[x >>> 2 >>> 0];
      case 8:
        return p ? (x) => ce[x >>> 3 >>> 0] : (x) => se[x >>> 3 >>> 0];
      default:
        throw new TypeError(`invalid integer width (${l}): ${o}`);
    }
  }, Ha = function(o, l, p, x, S) {
    o >>>= 0, l >>>= 0, p >>>= 0, l = Ee(l);
    let w = x === 0n, T = (C) => C;
    if (w) {
      let C = p * 8;
      T = (I) => BigInt.asUintN(C, I), S = T(S);
    }
    je(o, { name: l, fromWireType: T, toWireType: (C, I) => (typeof I == "number" && (I = BigInt(I)), I), readValueFromPointer: ss(l, p, !w), destructorFunction: null });
  };
  function Ga(o, l, p, x) {
    o >>>= 0, l >>>= 0, l = Ee(l), je(o, { name: l, fromWireType: function(S) {
      return !!S;
    }, toWireType: function(S, w) {
      return w ? p : x;
    }, readValueFromPointer: function(S) {
      return this.fromWireType(D[S >>> 0]);
    }, destructorFunction: null });
  }
  var Wa = (o) => ({ count: o.count, deleteScheduled: o.deleteScheduled, preservePointerOnDelete: o.preservePointerOnDelete, ptr: o.ptr, ptrType: o.ptrType, smartPtr: o.smartPtr, smartPtrType: o.smartPtrType }), Ri = (o) => {
    function l(p) {
      return p.$$.ptrType.registeredClass.name;
    }
    oe(l(o) + " instance already deleted");
  }, Pi = false, as = (o) => {
  }, Xa = (o) => {
    o.smartPtr ? o.smartPtrType.rawDestructor(o.smartPtr) : o.ptrType.registeredClass.rawDestructor(o.ptr);
  }, os = (o) => {
    o.count.value -= 1;
    var l = o.count.value === 0;
    l && Xa(o);
  }, mn = (o) => globalThis.FinalizationRegistry ? (Pi = new FinalizationRegistry((l) => {
    os(l.$$);
  }), mn = (l) => {
    var p = l.$$, x = !!p.smartPtr;
    if (x) {
      var S = { $$: p };
      Pi.register(l, S, l);
    }
    return l;
  }, as = (l) => Pi.unregister(l), mn(o)) : (mn = (l) => l, o), zn = [], qa = () => {
    for (; zn.length; ) {
      var o = zn.pop();
      o.$$.deleteScheduled = false, o.delete();
    }
  }, ls, $a = () => {
    let o = kn.prototype;
    Object.assign(o, { isAliasOf(p) {
      if (!(this instanceof kn) || !(p instanceof kn)) return false;
      var x = this.$$.ptrType.registeredClass, S = this.$$.ptr;
      p.$$ = p.$$;
      for (var w = p.$$.ptrType.registeredClass, T = p.$$.ptr; x.baseClass; ) S = x.upcast(S), x = x.baseClass;
      for (; w.baseClass; ) T = w.upcast(T), w = w.baseClass;
      return x === w && S === T;
    }, clone() {
      if (this.$$.ptr || Ri(this), this.$$.preservePointerOnDelete) return this.$$.count.value += 1, this;
      var p = mn(Object.create(Object.getPrototypeOf(this), { $$: { value: Wa(this.$$) } }));
      return p.$$.count.value += 1, p.$$.deleteScheduled = false, p;
    }, delete() {
      this.$$.ptr || Ri(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && oe("Object already scheduled for deletion"), as(this), os(this.$$), this.$$.preservePointerOnDelete || (this.$$.smartPtr = void 0, this.$$.ptr = void 0);
    }, isDeleted() {
      return !this.$$.ptr;
    }, deleteLater() {
      return this.$$.ptr || Ri(this), this.$$.deleteScheduled && !this.$$.preservePointerOnDelete && oe("Object already scheduled for deletion"), zn.push(this), zn.length === 1 && ls && ls(qa), this.$$.deleteScheduled = true, this;
    } });
    let l = Symbol.dispose;
    l && (o[l] = o.delete);
  };
  function kn() {
  }
  var Vn = (o, l) => Object.defineProperty(l, "name", { value: o }), cs = {}, hs = (o, l, p) => {
    if (o[l].overloadTable === void 0) {
      var x = o[l];
      o[l] = function(...S) {
        return o[l].overloadTable.hasOwnProperty(S.length) || oe(`Function '${p}' called with an invalid number of arguments (${S.length}) - expects one of (${o[l].overloadTable})!`), o[l].overloadTable[S.length].apply(this, S);
      }, o[l].overloadTable = [], o[l].overloadTable[x.argCount] = x;
    }
  }, gn = (o, l, p) => {
    t.hasOwnProperty(o) ? ((p === void 0 || t[o].overloadTable !== void 0 && t[o].overloadTable[p] !== void 0) && oe(`Cannot register public name '${o}' twice`), hs(t, o, o), t[o].overloadTable.hasOwnProperty(p) && oe(`Cannot register multiple overloads of a function with the same number of arguments (${p})!`), t[o].overloadTable[p] = l) : (t[o] = l, t[o].argCount = p);
  }, Ya = 48, Za = 57, Ja = (o) => {
    o = o.replace(/[^a-zA-Z0-9_]/g, "$");
    var l = o.charCodeAt(0);
    return l >= Ya && l <= Za ? `_${o}` : o;
  };
  function Ka(o, l, p, x, S, w, T, C) {
    this.name = o, this.constructor = l, this.instancePrototype = p, this.rawDestructor = x, this.baseClass = S, this.getActualType = w, this.upcast = T, this.downcast = C, this.pureVirtualFunctions = [];
  }
  var Ii = (o, l, p) => {
    for (; l !== p; ) l.upcast || oe(`Expected null or instance of ${p.name}, got an instance of ${l.name}`), o = l.upcast(o), l = l.baseClass;
    return o;
  }, Li = (o) => {
    if (o === null) return "null";
    var l = typeof o;
    return l === "object" || l === "array" || l === "function" ? o.toString() : "" + o;
  };
  function ja(o, l) {
    if (l === null) return this.isReference && oe(`null is not a valid ${this.name}`), 0;
    l.$$ || oe(`Cannot pass "${Li(l)}" as a ${this.name}`), l.$$.ptr || oe(`Cannot pass deleted object as a pointer of type ${this.name}`);
    var p = l.$$.ptrType.registeredClass, x = Ii(l.$$.ptr, p, this.registeredClass);
    return x;
  }
  function Qa(o, l) {
    var p;
    if (l === null) return this.isReference && oe(`null is not a valid ${this.name}`), this.isSmartPointer ? (p = this.rawConstructor(), o !== null && o.push(this.rawDestructor, p), p) : 0;
    (!l || !l.$$) && oe(`Cannot pass "${Li(l)}" as a ${this.name}`), l.$$.ptr || oe(`Cannot pass deleted object as a pointer of type ${this.name}`), !this.isConst && l.$$.ptrType.isConst && oe(`Cannot convert argument of type ${l.$$.smartPtrType ? l.$$.smartPtrType.name : l.$$.ptrType.name} to parameter type ${this.name}`);
    var x = l.$$.ptrType.registeredClass;
    if (p = Ii(l.$$.ptr, x, this.registeredClass), this.isSmartPointer) switch (l.$$.smartPtr === void 0 && oe("Passing raw pointer to smart pointer is illegal"), this.sharingPolicy) {
      case 0:
        l.$$.smartPtrType === this ? p = l.$$.smartPtr : oe(`Cannot convert argument of type ${l.$$.smartPtrType ? l.$$.smartPtrType.name : l.$$.ptrType.name} to parameter type ${this.name}`);
        break;
      case 1:
        p = l.$$.smartPtr;
        break;
      case 2:
        if (l.$$.smartPtrType === this) p = l.$$.smartPtr;
        else {
          var S = l.clone();
          p = this.rawShare(p, Ue.toHandle(() => S.delete())), o !== null && o.push(this.rawDestructor, p);
        }
        break;
      default:
        oe("Unsupported sharing policy");
    }
    return p;
  }
  function eo(o, l) {
    if (l === null) return this.isReference && oe(`null is not a valid ${this.name}`), 0;
    l.$$ || oe(`Cannot pass "${Li(l)}" as a ${this.name}`), l.$$.ptr || oe(`Cannot pass deleted object as a pointer of type ${this.name}`), l.$$.ptrType.isConst && oe(`Cannot convert argument of type ${l.$$.ptrType.name} to parameter type ${this.name}`);
    var p = l.$$.ptrType.registeredClass, x = Ii(l.$$.ptr, p, this.registeredClass);
    return x;
  }
  var us = (o, l, p) => {
    if (l === p) return o;
    if (p.baseClass === void 0) return null;
    var x = us(o, l, p.baseClass);
    return x === null ? null : p.downcast(x);
  }, to = {}, no = (o, l) => {
    for (l === void 0 && oe("ptr should not be undefined"); o.baseClass; ) l = o.upcast(l), o = o.baseClass;
    return l;
  }, io = (o, l) => (l = no(o, l), to[l]), Hn = (o, l) => {
    (!l.ptrType || !l.ptr) && Bn("makeClassHandle requires ptr and ptrType");
    var p = !!l.smartPtrType, x = !!l.smartPtr;
    return p !== x && Bn("Both smartPtrType and smartPtr must be specified"), l.count = { value: 1 }, mn(Object.create(o, { $$: { value: l, writable: true } }));
  };
  function ro(o) {
    var l = this.getPointee(o);
    if (!l) return this.destructor(o), null;
    var p = io(this.registeredClass, l);
    if (p !== void 0) {
      if (p.$$.count.value === 0) return p.$$.ptr = l, p.$$.smartPtr = o, p.clone();
      var x = p.clone();
      return this.destructor(o), x;
    }
    function S() {
      return this.isSmartPointer ? Hn(this.registeredClass.instancePrototype, { ptrType: this.pointeeType, ptr: l, smartPtrType: this, smartPtr: o }) : Hn(this.registeredClass.instancePrototype, { ptrType: this, ptr: o });
    }
    var w = this.registeredClass.getActualType(l), T = cs[w];
    if (!T) return S.call(this);
    var C;
    this.isConst ? C = T.constPointerType : C = T.pointerType;
    var I = us(l, this.registeredClass, C.registeredClass);
    return I === null ? S.call(this) : this.isSmartPointer ? Hn(C.registeredClass.instancePrototype, { ptrType: C, ptr: I, smartPtrType: this, smartPtr: o }) : Hn(C.registeredClass.instancePrototype, { ptrType: C, ptr: I });
  }
  var so = () => {
    Object.assign(Gn.prototype, { getPointee(o) {
      return this.rawGetPointee && (o = this.rawGetPointee(o)), o;
    }, destructor(o) {
      this.rawDestructor?.(o);
    }, readValueFromPointer: dn, fromWireType: ro });
  };
  function Gn(o, l, p, x, S, w, T, C, I, B, X) {
    this.name = o, this.registeredClass = l, this.isReference = p, this.isConst = x, this.isSmartPointer = S, this.pointeeType = w, this.sharingPolicy = T, this.rawGetPointee = C, this.rawConstructor = I, this.rawShare = B, this.rawDestructor = X, !S && l.baseClass === void 0 ? x ? (this.toWireType = ja, this.destructorFunction = null) : (this.toWireType = eo, this.destructorFunction = null) : this.toWireType = Qa;
  }
  var fs = (o, l, p) => {
    t.hasOwnProperty(o) || Bn("Replacing nonexistent public symbol"), t[o].overloadTable !== void 0 && p !== void 0 ? t[o].overloadTable[p] = l : (t[o] = l, t[o].argCount = p);
  }, Wn = (o) => vn.get(o), ao = (o, l, p = [], x = false) => {
    var S = Wn(l), w = S(...p);
    function T(C) {
      return o[0] == "p" ? C >>> 0 : C;
    }
    return T(w);
  }, oo = (o, l, p = false) => (...x) => ao(o, l, x, p), lt = (o, l, p = false) => {
    o = Ee(o);
    function x() {
      if (o.includes("p")) return oo(o, l, p);
      var w = Wn(l);
      return w;
    }
    var S = x();
    return typeof S != "function" && oe(`unknown function pointer with signature ${o}: ${l}`), S;
  };
  class lo extends Error {
  }
  var ds = (o) => {
    var l = Ts(o), p = Ee(l);
    return gt(l), p;
  }, Xn = (o, l) => {
    var p = [], x = {};
    function S(w) {
      if (!x[w] && !Ft[w]) {
        if (On[w]) {
          On[w].forEach(S);
          return;
        }
        p.push(w), x[w] = true;
      }
    }
    throw l.forEach(S), new lo(`${o}: ` + p.map(ds).join([", "]));
  };
  function co(o, l, p, x, S, w, T, C, I, B, X, ne, re) {
    o >>>= 0, l >>>= 0, p >>>= 0, x >>>= 0, S >>>= 0, w >>>= 0, T >>>= 0, C >>>= 0, I >>>= 0, B >>>= 0, X >>>= 0, ne >>>= 0, re >>>= 0, X = Ee(X), w = lt(S, w), C &&= lt(T, C), B &&= lt(I, B), re = lt(ne, re);
    var ie = Ja(X);
    gn(ie, function() {
      Xn(`Cannot construct ${X} due to unbound types`, [x]);
    }), Tt([o, l, p], x ? [x] : [], (me) => {
      me = me[0];
      var Ne, Qe;
      x ? (Ne = me.registeredClass, Qe = Ne.instancePrototype) : Qe = kn.prototype;
      var y = Vn(X, function(...fe) {
        if (Object.getPrototypeOf(this) !== M) throw new pn(`Use 'new' to construct ${X}`);
        if (E.constructor_body === void 0) throw new pn(`${X} has no accessible constructor`);
        var ke = E.constructor_body[fe.length];
        if (ke === void 0) throw new pn(`Tried to invoke ctor of ${X} with invalid number of parameters (${fe.length}) - expected (${Object.keys(E.constructor_body).toString()}) parameters instead!`);
        return ke.apply(this, fe);
      }), M = Object.create(Qe, { constructor: { value: y } });
      y.prototype = M;
      var E = new Ka(X, y, M, re, Ne, w, C, B);
      E.baseClass && (E.baseClass.__derivedClasses ??= [], E.baseClass.__derivedClasses.push(E));
      var P = new Gn(X, E, true, false, false), q = new Gn(X + "*", E, false, false, false), Q = new Gn(X + " const*", E, false, true, false);
      return cs[o] = { pointerType: q, constPointerType: Q }, fs(ie, y), [P, q, Q];
    });
  }
  var Di = (o, l) => {
    for (var p = [], x = 0; x < o; x++) p.push(H[l + x * 4 >>> 2 >>> 0]);
    return p;
  };
  function ps(o) {
    for (var l = 1; l < o.length; ++l) if (o[l] !== null && o[l].destructorFunction === void 0) return true;
    return false;
  }
  function ho(o, l, p, x) {
    var S = ps(o), w = o.length - 2, T = [], C = ["fn"];
    l && C.push("thisWired");
    for (var I = 0; I < w; ++I) T.push(`arg${I}`), C.push(`arg${I}Wired`);
    T = T.join(","), C = C.join(",");
    var B = `return function (${T}) {
`;
    S && (B += `var destructors = [];
`);
    var X = S ? "destructors" : "null", ne = ["humanName", "throwBindingError", "invoker", "fn", "runDestructors", "fromRetWire", "toClassParamWire"];
    l && (B += `var thisWired = toClassParamWire(${X}, this);
`);
    for (var I = 0; I < w; ++I) {
      var re = `toArg${I}Wire`;
      B += `var arg${I}Wired = ${re}(${X}, arg${I});
`, ne.push(re);
    }
    if (B += (p || x ? "var rv = " : "") + `invoker(${C});
`, S) B += `runDestructors(destructors);
`;
    else for (var I = l ? 1 : 2; I < o.length; ++I) {
      var ie = I === 1 ? "thisWired" : "arg" + (I - 2) + "Wired";
      o[I].destructorFunction !== null && (B += `${ie}_dtor(${ie});
`, ne.push(`${ie}_dtor`));
    }
    return p && (B += `var ret = fromRetWire(rv);
return ret;
`), B += `}
`, new Function(ne, B);
  }
  function Ui(o, l, p, x, S, w) {
    var T = l.length;
    T < 2 && oe("argTypes array size mismatch! Must at least get return value and 'this' types!");
    for (var C = l[1] !== null && p !== null, I = ps(l), B = !l[0].isVoid, X = l[0], ne = l[1], re = [o, oe, x, S, Ci, X.fromWireType.bind(X), ne?.toWireType.bind(ne)], ie = 2; ie < T; ++ie) {
      var me = l[ie];
      re.push(me.toWireType.bind(me));
    }
    if (!I) for (var ie = C ? 1 : 2; ie < l.length; ++ie) l[ie].destructorFunction !== null && re.push(l[ie].destructorFunction);
    var Qe = ho(l, C, B, w)(...re);
    return Vn(o, Qe);
  }
  var uo = function(o, l, p, x, S, w) {
    o >>>= 0, p >>>= 0, x >>>= 0, S >>>= 0, w >>>= 0;
    var T = Di(l, p);
    S = lt(x, S), Tt([], [o], (C) => {
      C = C[0];
      var I = `constructor ${C.name}`;
      if (C.registeredClass.constructor_body === void 0 && (C.registeredClass.constructor_body = []), C.registeredClass.constructor_body[l - 1] !== void 0) throw new pn(`Cannot register multiple constructors with identical number of parameters (${l - 1}) for class '${C.name}'! Overload resolution is currently only performed using the parameter count, not actual type info!`);
      return C.registeredClass.constructor_body[l - 1] = () => {
        Xn(`Cannot construct ${C.name} due to unbound types`, T);
      }, Tt([], T, (B) => (B.splice(1, 0, null), C.registeredClass.constructor_body[l - 1] = Ui(I, B, null, S, w), [])), [];
    });
  }, ms = (o) => {
    o = o.trim();
    let l = o.indexOf("(");
    return l === -1 ? o : o.slice(0, l);
  }, fo = function(o, l, p, x, S, w, T, C, I, B) {
    o >>>= 0, l >>>= 0, x >>>= 0, S >>>= 0, w >>>= 0, T >>>= 0;
    var X = Di(p, x);
    l = Ee(l), l = ms(l), w = lt(S, w, I), Tt([], [o], (ne) => {
      ne = ne[0];
      var re = `${ne.name}.${l}`;
      l.startsWith("@@") && (l = Symbol[l.substring(2)]), C && ne.registeredClass.pureVirtualFunctions.push(l);
      function ie() {
        Xn(`Cannot call ${re} due to unbound types`, X);
      }
      var me = ne.registeredClass.instancePrototype, Ne = me[l];
      return Ne === void 0 || Ne.overloadTable === void 0 && Ne.className !== ne.name && Ne.argCount === p - 2 ? (ie.argCount = p - 2, ie.className = ne.name, me[l] = ie) : (hs(me, l, re), me[l].overloadTable[p - 2] = ie), Tt([], X, (Qe) => {
        var y = Ui(re, Qe, ne, w, T, I);
        return me[l].overloadTable === void 0 ? (y.argCount = p - 2, me[l] = y) : me[l].overloadTable[p - 2] = y, [];
      }), [];
    });
  }, gs = [], Ot = [0, 1, , 1, null, 1, true, 1, false, 1];
  function Ni(o) {
    o >>>= 0, o > 9 && --Ot[o + 1] === 0 && (Ot[o] = void 0, gs.push(o));
  }
  var Ue = { toValue: (o) => (o || oe(`Cannot use deleted val. handle = ${o}`), Ot[o]), toHandle: (o) => {
    switch (o) {
      case void 0:
        return 2;
      case null:
        return 4;
      case true:
        return 6;
      case false:
        return 8;
      default: {
        let l = gs.pop() || Ot.length;
        return Ot[l] = o, Ot[l + 1] = 1, l;
      }
    }
  } }, vs = { name: "emscripten::val", fromWireType: (o) => {
    var l = Ue.toValue(o);
    return Ni(o), l;
  }, toWireType: (o, l) => Ue.toHandle(l), readValueFromPointer: dn, destructorFunction: null };
  function po(o) {
    return o >>>= 0, je(o, vs);
  }
  var Fi = (o, l, p) => {
    switch (l) {
      case 1:
        return p ? function(x) {
          return this.fromWireType(N[x >>> 0]);
        } : function(x) {
          return this.fromWireType(D[x >>> 0]);
        };
      case 2:
        return p ? function(x) {
          return this.fromWireType(V[x >>> 1 >>> 0]);
        } : function(x) {
          return this.fromWireType($[x >>> 1 >>> 0]);
        };
      case 4:
        return p ? function(x) {
          return this.fromWireType(Y[x >>> 2 >>> 0]);
        } : function(x) {
          return this.fromWireType(H[x >>> 2 >>> 0]);
        };
      default:
        throw new TypeError(`invalid integer width (${l}): ${o}`);
    }
  };
  function mo(o) {
    return o === 0 ? "object" : o === 1 ? "number" : "string";
  }
  function go(o, l, p, x, S) {
    o >>>= 0, l >>>= 0, p >>>= 0, l = Ee(l);
    let w = mo(S);
    switch (w) {
      case "object": {
        let B = function() {
        };
        B.values = {}, je(o, { name: l, constructor: B, valueType: w, fromWireType: function(X) {
          return this.constructor.values[X];
        }, toWireType: (X, ne) => ne.value, readValueFromPointer: Fi(l, p, x), destructorFunction: null }), gn(l, B);
        break;
      }
      case "number": {
        var T = {};
        je(o, { name: l, keysMap: T, valueType: w, fromWireType: (B) => B, toWireType: (B, X) => X, readValueFromPointer: Fi(l, p, x), destructorFunction: null }), gn(l, T), delete t[l].argCount;
        break;
      }
      case "string": {
        var C = {}, I = {}, T = {};
        je(o, { name: l, valuesMap: C, reverseMap: I, keysMap: T, valueType: w, fromWireType: function(X) {
          return this.reverseMap[X];
        }, toWireType: function(X, ne) {
          return this.valuesMap[ne];
        }, readValueFromPointer: Fi(l, p, x), destructorFunction: null }), gn(l, T), delete t[l].argCount;
        break;
      }
    }
  }
  var _s = (o, l) => {
    var p = Ft[o];
    return p === void 0 && oe(`${l} has unknown type ${ds(o)}`), p;
  };
  function vo(o, l, p) {
    o >>>= 0, l >>>= 0;
    var x = _s(o, "enum");
    switch (l = Ee(l), x.valueType) {
      case "object": {
        var S = x.constructor, w = Object.create(x.constructor.prototype, { value: { value: p }, constructor: { value: Vn(`${x.name}_${l}`, function() {
        }) } });
        S.values[p] = w, S[l] = w;
        break;
      }
      case "number": {
        x.keysMap[l] = p;
        break;
      }
      case "string": {
        x.valuesMap[l] = p, x.reverseMap[p] = l, x.keysMap[l] = l;
        break;
      }
    }
  }
  var _o = (o, l) => {
    switch (l) {
      case 4:
        return function(p) {
          return this.fromWireType(K[p >>> 2 >>> 0]);
        };
      case 8:
        return function(p) {
          return this.fromWireType(W[p >>> 3 >>> 0]);
        };
      default:
        throw new TypeError(`invalid float width (${l}): ${o}`);
    }
  }, xo = function(o, l, p) {
    o >>>= 0, l >>>= 0, p >>>= 0, l = Ee(l), je(o, { name: l, fromWireType: (x) => x, toWireType: (x, S) => S, readValueFromPointer: _o(l, p), destructorFunction: null });
  };
  function yo(o, l, p, x, S, w, T, C) {
    o >>>= 0, p >>>= 0, x >>>= 0, S >>>= 0, w >>>= 0;
    var I = Di(l, p);
    o = Ee(o), o = ms(o), S = lt(x, S, T), gn(o, function() {
      Xn(`Cannot call ${o} due to unbound types`, I);
    }, l - 1), Tt([], I, (B) => {
      var X = [B[0], null].concat(B.slice(1));
      return fs(o, Ui(o, X, null, S, w, T), l - 1), [];
    });
  }
  var So = function(o, l, p, x, S) {
    o >>>= 0, l >>>= 0, p >>>= 0, l = Ee(l);
    let w = x === 0, T = (I) => I;
    if (w) {
      var C = 32 - 8 * p;
      T = (I) => I << C >>> C, S = T(S);
    }
    je(o, { name: l, fromWireType: T, toWireType: (I, B) => B, readValueFromPointer: ss(l, p, x !== 0), destructorFunction: null });
  }, Mo = (o, l, p) => {
    let x = (S, w) => {
      let T = 0;
      return { next() {
        if (T >= S) return { done: true };
        let C = T;
        return T++, { value: w(C), done: false };
      }, [Symbol.iterator]() {
        return this;
      } };
    };
    o[Symbol.iterator] || (o[Symbol.iterator] = function() {
      let S = this[l]();
      return x(S, (w) => this[p](w));
    });
  }, bo = function(o, l, p, x) {
    o >>>= 0, l >>>= 0, p >>>= 0, x >>>= 0, p = Ee(p), x = Ee(x), Tt([], [o, l], (S) => {
      let w = S[0];
      return Mo(w.registeredClass.instancePrototype, p, x), [];
    });
  };
  function wo(o, l, p) {
    o >>>= 0, p >>>= 0;
    var x = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array, BigInt64Array, BigUint64Array], S = x[l];
    function w(T) {
      var C = H[T >>> 2 >>> 0], I = H[T + 4 >>> 2 >>> 0];
      return new S(N.buffer, I, C);
    }
    p = Ee(p), je(o, { name: p, fromWireType: w, readValueFromPointer: w }, { ignoreDuplicateRegistrations: true });
  }
  var To = Object.assign({ optional: true }, vs);
  function Eo(o, l) {
    o >>>= 0, l >>>= 0, je(o, To);
  }
  var Ao = (o, l, p, x) => {
    if (p >>>= 0, !(x > 0)) return 0;
    for (var S = p, w = p + x - 1, T = 0; T < o.length; ++T) {
      var C = o.codePointAt(T);
      if (C <= 127) {
        if (p >= w) break;
        l[p++ >>> 0] = C;
      } else if (C <= 2047) {
        if (p + 1 >= w) break;
        l[p++ >>> 0] = 192 | C >> 6, l[p++ >>> 0] = 128 | C & 63;
      } else if (C <= 65535) {
        if (p + 2 >= w) break;
        l[p++ >>> 0] = 224 | C >> 12, l[p++ >>> 0] = 128 | C >> 6 & 63, l[p++ >>> 0] = 128 | C & 63;
      } else {
        if (p + 3 >= w) break;
        l[p++ >>> 0] = 240 | C >> 18, l[p++ >>> 0] = 128 | C >> 12 & 63, l[p++ >>> 0] = 128 | C >> 6 & 63, l[p++ >>> 0] = 128 | C & 63, T++;
      }
    }
    return l[p >>> 0] = 0, p - S;
  }, Co = (o, l, p) => Ao(o, D, l, p), Ro = (o) => {
    for (var l = 0, p = 0; p < o.length; ++p) {
      var x = o.charCodeAt(p);
      x <= 127 ? l++ : x <= 2047 ? l += 2 : x >= 55296 && x <= 57343 ? (l += 4, ++p) : l += 3;
    }
    return l;
  }, xs = globalThis.TextDecoder && new TextDecoder(), ys = (o, l, p, x) => {
    var S = l + p;
    if (x) return S;
    for (; o[l] && !(l >= S); ) ++l;
    return l;
  }, Po = (o, l = 0, p, x) => {
    l >>>= 0;
    var S = ys(o, l, p, x);
    if (S - l > 16 && o.buffer && xs) return xs.decode(o.subarray(l, S));
    for (var w = ""; l < S; ) {
      var T = o[l++];
      if (!(T & 128)) {
        w += String.fromCharCode(T);
        continue;
      }
      var C = o[l++] & 63;
      if ((T & 224) == 192) {
        w += String.fromCharCode((T & 31) << 6 | C);
        continue;
      }
      var I = o[l++] & 63;
      if ((T & 240) == 224 ? T = (T & 15) << 12 | C << 6 | I : T = (T & 7) << 18 | C << 12 | I << 6 | o[l++] & 63, T < 65536) w += String.fromCharCode(T);
      else {
        var B = T - 65536;
        w += String.fromCharCode(55296 | B >> 10, 56320 | B & 1023);
      }
    }
    return w;
  }, Io = (o, l, p) => (o >>>= 0, o ? Po(D, o, l, p) : "");
  function Lo(o, l) {
    o >>>= 0, l >>>= 0, l = Ee(l);
    var p = true;
    je(o, { name: l, fromWireType(x) {
      var S = H[x >>> 2 >>> 0], w = x + 4, T;
      if (p) T = Io(w, S, true);
      else {
        T = "";
        for (var C = 0; C < S; ++C) T += String.fromCharCode(D[w + C >>> 0]);
      }
      return gt(x), T;
    }, toWireType(x, S) {
      S instanceof ArrayBuffer && (S = new Uint8Array(S));
      var w, T = typeof S == "string";
      T || ArrayBuffer.isView(S) && S.BYTES_PER_ELEMENT == 1 || oe("Cannot pass non-string to std::string"), p && T ? w = Ro(S) : w = S.length;
      var C = ki(4 + w + 1), I = C + 4;
      if (H[C >>> 2 >>> 0] = w, T) if (p) Co(S, I, w + 1);
      else for (var B = 0; B < w; ++B) {
        var X = S.charCodeAt(B);
        X > 255 && (gt(C), oe("String has UTF-16 code units that do not fit in 8 bits")), D[I + B >>> 0] = X;
      }
      else D.set(S, I >>> 0);
      return x !== null && x.push(gt, C), C;
    }, readValueFromPointer: dn, destructorFunction(x) {
      gt(x);
    } });
  }
  var Ss = globalThis.TextDecoder ? new TextDecoder("utf-16le") : void 0, Do = (o, l, p) => {
    var x = o >>> 1, S = ys($, x, l / 2, p);
    if (S - x > 16 && Ss) return Ss.decode($.subarray(x >>> 0, S >>> 0));
    for (var w = "", T = x; T < S; ++T) {
      var C = $[T >>> 0];
      w += String.fromCharCode(C);
    }
    return w;
  }, Uo = (o, l, p) => {
    if (p ??= 2147483647, p < 2) return 0;
    p -= 2;
    for (var x = l, S = p < o.length * 2 ? p / 2 : o.length, w = 0; w < S; ++w) {
      var T = o.charCodeAt(w);
      V[l >>> 1 >>> 0] = T, l += 2;
    }
    return V[l >>> 1 >>> 0] = 0, l - x;
  }, No = (o) => o.length * 2, Fo = (o, l, p) => {
    for (var x = "", S = o >>> 2, w = 0; !(w >= l / 4); w++) {
      var T = H[S + w >>> 0];
      if (!T && !p) break;
      x += String.fromCodePoint(T);
    }
    return x;
  }, Oo = (o, l, p) => {
    if (l >>>= 0, p ??= 2147483647, p < 4) return 0;
    for (var x = l, S = x + p - 4, w = 0; w < o.length; ++w) {
      var T = o.codePointAt(w);
      if (T > 65535 && w++, Y[l >>> 2 >>> 0] = T, l += 4, l + 4 > S) break;
    }
    return Y[l >>> 2 >>> 0] = 0, l - x;
  }, Bo = (o) => {
    for (var l = 0, p = 0; p < o.length; ++p) {
      var x = o.codePointAt(p);
      x > 65535 && p++, l += 4;
    }
    return l;
  };
  function zo(o, l, p) {
    o >>>= 0, l >>>= 0, p >>>= 0, p = Ee(p);
    var x, S, w;
    l === 2 ? (x = Do, S = Uo, w = No) : (x = Fo, S = Oo, w = Bo), je(o, { name: p, fromWireType: (T) => {
      var C = H[T >>> 2 >>> 0], I = x(T + 4, C * l, true);
      return gt(T), I;
    }, toWireType: (T, C) => {
      typeof C != "string" && oe(`Cannot pass non-string to C++ string type ${p}`);
      var I = w(C), B = ki(4 + I + l);
      return H[B >>> 2 >>> 0] = I / l, S(C, B + 4, I + l), T !== null && T.push(gt, B), B;
    }, readValueFromPointer: dn, destructorFunction(T) {
      gt(T);
    } });
  }
  function ko(o, l, p, x, S, w) {
    o >>>= 0, l >>>= 0, p >>>= 0, x >>>= 0, S >>>= 0, w >>>= 0, Fn[o] = { name: Ee(l), rawConstructor: lt(p, x), rawDestructor: lt(S, w), fields: [] };
  }
  function Vo(o, l, p, x, S, w, T, C, I, B) {
    o >>>= 0, l >>>= 0, p >>>= 0, x >>>= 0, S >>>= 0, w >>>= 0, T >>>= 0, C >>>= 0, I >>>= 0, B >>>= 0, Fn[o].fields.push({ fieldName: Ee(l), getterReturnType: p, getter: lt(x, S), getterContext: w, setterArgumentType: T, setter: lt(C, I), setterContext: B });
  }
  var Ho = function(o, l) {
    o >>>= 0, l >>>= 0, l = Ee(l), je(o, { isVoid: true, name: l, fromWireType: () => {
    }, toWireType: (p, x) => {
    } });
  };
  function Go(o, l) {
    o >>>= 0, l >>>= 0, o = Ue.toValue(o), l = Ue.toValue(l), o.set(l);
  }
  var Oi = [], Wo = (o) => {
    var l = Oi.length;
    return Oi.push(o), l;
  }, Xo = (o, l) => {
    for (var p = new Array(o), x = 0; x < o; ++x) p[x] = _s(H[l + x * 4 >>> 2 >>> 0], `parameter ${x}`);
    return p;
  }, qo = (o, l, p) => {
    var x = [], S = o(x, p);
    return x.length && (H[l >>> 2 >>> 0] = Ue.toHandle(x)), S;
  }, $o = {}, Ms = (o) => {
    var l = $o[o];
    return l === void 0 ? Ee(o) : l;
  }, Yo = function(o, l, p) {
    l >>>= 0;
    var x = 8, [S, ...w] = Xo(o, l), T = S.toWireType.bind(S), C = w.map((ie) => ie.readValueFromPointer.bind(ie));
    o--;
    var I = { toValue: Ue.toValue }, B = C.map((ie, me) => {
      var Ne = `argFromPtr${me}`;
      return I[Ne] = ie, `${Ne}(args${me ? "+" + me * x : ""})`;
    }), X;
    switch (p) {
      case 0:
        X = "toValue(handle)";
        break;
      case 2:
        X = "new (toValue(handle))";
        break;
      case 3:
        X = "";
        break;
      case 1:
        I.getStringOrSymbol = Ms, X = "toValue(handle)[getStringOrSymbol(methodName)]";
        break;
    }
    X += `(${B})`, S.isVoid || (I.toReturnWire = T, I.emval_returnValue = qo, X = `return emval_returnValue(toReturnWire, destructorsRef, ${X})`), X = `return function (handle, methodName, destructorsRef, args) {
${X}
}`;
    var ne = new Function(Object.keys(I), X)(...Object.values(I)), re = `methodCaller<(${w.map((ie) => ie.name)}) => ${S.name}>`;
    return Wo(Vn(re, ne));
  };
  function Zo(o, l) {
    return o >>>= 0, l >>>= 0, o = Ue.toValue(o), l = Ue.toValue(l), o == l;
  }
  function Jo(o, l) {
    return o >>>= 0, l >>>= 0, o = Ue.toValue(o), l = Ue.toValue(l), Ue.toHandle(o[l]);
  }
  function Ko(o) {
    o >>>= 0, o > 9 && (Ot[o + 1] += 1);
  }
  function jo(o, l, p, x, S) {
    return o >>>= 0, l >>>= 0, p >>>= 0, x >>>= 0, S >>>= 0, Oi[o](l, p, x, S);
  }
  function Qo(o) {
    return o >>>= 0, Ue.toHandle(Ms(o));
  }
  function el() {
    return Ue.toHandle({});
  }
  function tl(o) {
    o >>>= 0;
    var l = Ue.toValue(o);
    Ci(l), Ni(o);
  }
  function nl(o, l, p) {
    o >>>= 0, l >>>= 0, p >>>= 0, o = Ue.toValue(o), l = Ue.toValue(l), p = Ue.toValue(p), o[l] = p;
  }
  var il = () => 4294901760, rl = (o, l) => Math.ceil(o / l) * l, sl = (o) => {
    var l = qn.buffer.byteLength, p = (o - l + 65535) / 65536 | 0;
    try {
      return qn.grow(p), de(), 1;
    } catch {
    }
  };
  function al(o) {
    o >>>= 0;
    var l = D.length, p = il();
    if (o > p) return false;
    for (var x = 1; x <= 4; x *= 2) {
      var S = l * (1 + 0.2 / x);
      S = Math.min(S, o + 100663296);
      var w = Math.min(p, rl(Math.max(o, S), 65536)), T = sl(w);
      if (T) return true;
    }
    return false;
  }
  var ol = (o, l) => {
    if (Bt) for (var p = o; p < o + l; p++) {
      var x = Wn(p);
      x && Bt.set(x, p);
    }
  }, Bt, ll = (o) => (Bt || (Bt = /* @__PURE__ */ new WeakMap(), ol(0, vn.length)), Bt.get(o) || 0), Bi = [], cl = () => Bi.length ? Bi.pop() : vn.grow(1), zi = (o, l) => vn.set(o, l), bs = (o) => {
    let l = o.length;
    return [l % 128 | 128, l >> 7, ...o];
  }, hl = { i: 127, p: 127, j: 126, f: 125, d: 124, e: 111 }, ws = (o) => bs(Array.from(o, (l) => {
    var p = hl[l];
    return p;
  })), ul = (o, l) => {
    var p = Uint8Array.of(0, 97, 115, 109, 1, 0, 0, 0, 1, ...bs([1, 96, ...ws(l.slice(1)), ...ws(l[0] === "v" ? "" : l[0])]), 2, 7, 1, 1, 101, 1, 102, 0, 0, 7, 5, 1, 1, 102, 0, 0), x = new WebAssembly.Module(p), S = new WebAssembly.Instance(x, { e: { f: o } }), w = S.exports.f;
    return w;
  }, zt = (o, l) => {
    var p = ll(o);
    if (p) return p;
    var x = cl();
    try {
      zi(x, o);
    } catch (w) {
      if (!(w instanceof TypeError)) throw w;
      var S = ul(o, l);
      zi(x, S);
    }
    return Bt.set(o, x), x;
  }, kt = (o) => {
    Bt.delete(Wn(o)), zi(o, null), Bi.push(o);
  };
  if ($a(), so(), t.noExitRuntime && (Re = t.noExitRuntime), t.print && (A = t.print), t.printErr && (R = t.printErr), t.wasmBinary && (F = t.wasmBinary), t.arguments && (c = t.arguments), t.thisProgram && (u = t.thisProgram), t.preInit) for (typeof t.preInit == "function" && (t.preInit = [t.preInit]); t.preInit.length > 0; ) t.preInit.shift()();
  t.addFunction = zt, t.removeFunction = kt;
  var Ts, ki, gt, fl, dl, qn, vn;
  function pl(o) {
    Ts = o.K, ki = o.M, gt = o.N, fl = qn = o.I, dl = vn = o.L;
  }
  var ml = { l: mt, C: Nn, q: ka, z: Ha, G: Ga, j: co, i: uo, a: fo, E: po, x: go, d: vo, y: xo, c: yo, p: So, m: bo, h: wo, n: Eo, F: Lo, w: zo, r: ko, k: Vo, H: Ho, u: Go, g: Yo, b: Ni, o: Zo, B: Jo, t: Ko, f: jo, s: Qo, A: el, e: tl, v: nl, D: al };
  function gl(o) {
    o = Object.assign({}, o);
    var l = (x) => (S) => x(S) >>> 0, p = (x) => () => x() >>> 0;
    return o.K = l(o.K), o.M = l(o.M), o._emscripten_stack_alloc = l(o._emscripten_stack_alloc), o.emscripten_stack_get_current = p(o.emscripten_stack_get_current), o;
  }
  function vl() {
    qe();
    function o() {
      t.calledRun = true, !k && (be(), O?.(t), t.onRuntimeInitialized?.(), ft());
    }
    t.setStatus ? (t.setStatus("Running..."), setTimeout(() => {
      setTimeout(() => t.setStatus(""), 1), o();
    }, 1)) : o();
  }
  var Vt;
  return Vt = await ye(), vl(), Z ? e = t : e = new Promise((o, l) => {
    O = o, G = l;
  }), e;
}
var ca = Zu;
async function ha(a13 = {}) {
  let e = await ca(a13);
  return e.setup(), e;
}
var Wr = { size: 75, wall: 0.8, height: 12.5, rim: 4, base: 2.5, relief: 4.5, reliefInverted: false, reliefSeparate: false, reliefOut: 4.5, reliefIn: 1, clearance: 0.9, detailOffset: 0, outlineOffset: 0, mode: "integrated", mirror: true, threshold: 160, tolerance: 0.04, stampBase: 2.5, stampInset: 0, stampExpansion: 0, removeOutline: false, outlineBand: 0.8, chamfer: false, tip: 0.4, chamferHeight: 2, bladeReinforcement: false, reinforcementHeight: 2, reinforcementWidth: 1.5, logoEnabled: false, logoText: "FIORI", logoFont: "helvetiker", logoSize: 8, logoHeight: 1.2, logoBaseWidthExtra: 0, logoBaseWidth: 0, logoBaseDepth: 0, logoBaseGap: 0, logoPosition: 0, logoOffset: 0, logoOrientationMode: "autoOffset", logoRotationOffset: 0, logoRotationAbsolute: 0, logoBaseRotation: 0, logoTextRotation: 0, logoCentralAxis: false, wallEdits: [], cornerRadius: 2 };
function ot(a13) {
  return a13.reduce((e, t, n) => {
    let i = a13[(n + 1) % a13.length];
    return e + t[0] * i[1] - i[0] * t[1];
  }, 0) / 2;
}
function Ju(a13, e) {
  if (a13.length < 5) return a13;
  let t = (s, h, c) => {
    let u = c[0] - h[0], f = c[1] - h[1], d = Math.max(0, Math.min(1, ((s[0] - h[0]) * u + (s[1] - h[1]) * f) / (u * u + f * f || 1)));
    return Math.hypot(s[0] - h[0] - d * u, s[1] - h[1] - d * f);
  }, n = (s) => {
    let h = 0, c = 0;
    for (let u = 1; u < s.length - 1; u++) {
      let f = t(s[u], s[0], s.at(-1));
      f > h && (h = f, c = u);
    }
    return h > e ? [...n(s.slice(0, c + 1)).slice(0, -1), ...n(s.slice(c))] : [s[0], s.at(-1)];
  }, i = 1, r = 0;
  for (let s = 1; s < a13.length; s++) {
    let h = Math.hypot(a13[s][0] - a13[0][0], a13[s][1] - a13[0][1]);
    h > r && (r = h, i = s);
  }
  return [...n(a13.slice(0, i + 1)).slice(0, -1), ...n([...a13.slice(i), a13[0]]).slice(0, -1)];
}
function Ku(a13) {
  let e = a13.flat();
  if (!e.length) throw Error("Nenhum contorno fechado encontrado.");
  let t = 1 / 0, n = -1 / 0, i = 1 / 0, r = -1 / 0;
  for (let [h, c] of e) t = Math.min(h, t), n = Math.max(h, n), i = Math.min(c, i), r = Math.max(c, r);
  let s = Math.max(n - t, r - i);
  if (!(s > 0)) throw Error("Arte sem dimensão.");
  return a13.map((h) => h.map(([c, u]) => [(c - (t + n) / 2) / s, (u - (i + r) / 2) / s]));
}
function ua(a13, e, t, n = 160) {
  let i = (m, g) => {
    if (m <= 0 || g <= 0 || m >= e - 1 || g >= t - 1) return 255;
    let _ = (g * e + m) * 4, b = a13[_ + 3] / 255;
    return (a13[_] * 0.2126 + a13[_ + 1] * 0.7152 + a13[_ + 2] * 0.0722) * b + 255 * (1 - b);
  }, r = /* @__PURE__ */ new Map(), s = /* @__PURE__ */ new Map(), h = (m, g) => `h${m},${g}`, c = (m, g) => `v${m},${g}`, u = { 1: [[3, 0]], 2: [[0, 1]], 3: [[3, 1]], 4: [[1, 2]], 6: [[0, 2]], 7: [[3, 2]], 8: [[2, 3]], 9: [[2, 0]], 11: [[2, 1]], 12: [[1, 3]], 13: [[1, 0]], 14: [[0, 3]] };
  function f(m, g) {
    r.has(m) || r.set(m, []), r.has(g) || r.set(g, []), r.get(m).push(g), r.get(g).push(m);
  }
  for (let m = 0; m < t - 1; m++) for (let g = 0; g < e - 1; g++) {
    let _ = [i(g, m), i(g + 1, m), i(g + 1, m + 1), i(g, m + 1)], b = _.reduce((L, O, G) => L + (O < n ? 1 << G : 0), 0);
    if (!b || b === 15) continue;
    let A = [h(g, m), c(g + 1, m), h(g, m + 1), c(g, m)], R = (L, O) => (n - L) / (O - L || 1), F = [[g + R(_[0], _[1]), m], [g + 1, m + R(_[1], _[2])], [g + R(_[3], _[2]), m + 1], [g, m + R(_[0], _[3])]], k = u[b];
    if (b === 5 || b === 10) {
      let L = _.reduce((O, G) => O + G) / 4 < n;
      k = b === 5 === L ? [[0, 1], [2, 3]] : [[3, 0], [1, 2]];
    }
    for (let [L, O] of k) s.set(A[L], F[L]), s.set(A[O], F[O]), f(A[L], A[O]);
  }
  let d = /* @__PURE__ */ new Set(), v = [];
  for (let m of r.keys()) {
    if (d.has(m)) continue;
    let g = m, _ = null, b = [];
    for (; !d.has(g); ) {
      d.add(g), b.push(s.get(g));
      let R = r.get(g).find((F) => F !== _);
      if (_ = g, g = R, !g) break;
    }
    g === m && b.length >= 8 && Math.abs(ot(b)) >= 3 && v.push(b.map(([A, R]) => [A, -R]));
  }
  if (v.sort((m, g) => Math.abs(ot(g)) - Math.abs(ot(m))), !v.length) throw Error("Não encontrei linhas escuras. Ajuste o limiar ou use arte preta sobre branco.");
  return Ku(v);
}
function ju(a13, e) {
  let t = e.flat(), n = a13.triangulate(e, 1e-8, false).map((s) => Array.from(s)), i = (s, h, c) => (t[h][0] - t[s][0]) * (t[c][1] - t[s][1]) - (t[h][1] - t[s][1]) * (t[c][0] - t[s][0]), r = (s, h) => (t[s][0] - t[h][0]) ** 2 + (t[s][1] - t[h][1]) ** 2;
  for (let s = 0; s < 12; s++) {
    let h = 0, c = /* @__PURE__ */ new Map(), u = /* @__PURE__ */ new Set();
    for (let f = 0; f < n.length; f++) for (let d = 0; d < 3; d++) {
      let v = n[f][d], m = n[f][(d + 1) % 3], g = n[f][(d + 2) % 3], _ = v < m ? v + "," + m : m + "," + v, b = c.get(_);
      if (!b) {
        c.set(_, { i: f, a: v, b: m, c: g });
        continue;
      }
      if (u.has(f) || u.has(b.i)) continue;
      let A = b.c;
      r(g, A) + 1e-10 >= r(v, m) || i(g, A, m) <= 1e-12 || i(A, g, v) <= 1e-12 || (n[f] = [g, A, m], n[b.i] = [A, g, v], u.add(f), u.add(b.i), h++);
    }
    if (!h) break;
  }
  return n;
}
function Qu(a13, e = 0.6) {
  let t = [];
  for (let n = 0; n < a13.length; n++) {
    let i = a13[n], r = a13[(n + 1) % a13.length], s = Math.hypot(r[0] - i[0], r[1] - i[1]), h = Math.max(1, Math.ceil(s / e));
    for (let c = 0; c < h; c++) {
      let u = c / h;
      t.push([i[0] + (r[0] - i[0]) * u, i[1] + (r[1] - i[1]) * u]);
    }
  }
  return t;
}
function Xr(a13, e, t, n, i, r = n - 1, s = []) {
  let h = (_) => ot(_) > 0 ? _.map((b) => b.slice()) : _.slice().reverse().map((b) => b.slice()), c = [{ poly: e, z: r }, { poly: e, z: n }, ...s, { poly: t, z: i }].map((_) => ({ ..._, poly: h(_.poly) })), u = [], f = [], d = [];
  for (let _ of c) {
    d.push(u.length / 3);
    for (let b of _.poly) u.push(b[0], b[1], _.z);
  }
  let v = c[0].poly, m = v.length;
  for (let _ of a13.triangulate([v], 1e-8, false)) f.push(_[2], _[1], _[0]);
  for (let _ = 0; _ < m; _++) {
    let b = (_ + 1) % m;
    f.push(_, b, m + b, _, m + b, m + _);
  }
  for (let _ = 1; _ < c.length - 1; _++) {
    let b = c[_].poly, A = c[_ + 1].poly, R = b.length, F = A.length, k = (L) => L < R ? d[_] + L : d[_ + 1] + F - 1 - (L - R);
    for (let L of ju(a13, [b, A.slice().reverse()])) f.push(...L.map(k));
  }
  let g = c.length - 1;
  for (let _ of a13.triangulate([c[g].poly], 1e-8, false)) f.push(..._.map((b) => b + d[g]));
  return new a13.Manifold(new a13.Mesh({ numProp: 3, vertProperties: new Float32Array(u), triVerts: new Uint32Array(f) }));
}
var RV_LOGO_FONT_IDS = ["helvetiker", "helvetiker-bold", "optimer", "gentilis", "allerta-stencil", "arimo", "balthazar", "baumans", "bebas-neue", "comic-neue", "courier-prime", "didact-gothic", "droid-sans-mono", "inconsolata", "inter", "michroma", "mplus-rounded-1c", "noto-sans", "noto-sans-sc", "noto-sans-tc", "noto-sans-jp", "noto-sans-kr", "noto-serif"], RV_LOGO_STYLES = { "helvetiker": { family: "Arial, Helvetica, sans-serif", weight: 600, stretch: 1 }, "helvetiker-bold": { family: "Arial Black, Arial, Helvetica, sans-serif", weight: 900, stretch: 1.02 }, "optimer": { family: "Trebuchet MS, Arial, sans-serif", weight: 600, stretch: 0.98 }, "gentilis": { family: "Georgia, Times New Roman, serif", weight: 700, stretch: 1 }, "allerta-stencil": { family: '"Allerta Stencil", Impact, Arial Black, sans-serif', weight: 400, stretch: 1 }, "arimo": { family: "Arimo, Arial, Helvetica, sans-serif", weight: 500, stretch: 1 }, "balthazar": { family: "Balthazar, Georgia, Times New Roman, serif", weight: 500, stretch: 0.98 }, "baumans": { family: 'Baumans, "Bauhaus 93", "Century Gothic", sans-serif', weight: 500, stretch: 1 }, "bebas-neue": { family: '"Bebas Neue", "Arial Narrow", Impact, sans-serif', weight: 500, stretch: 0.82 }, "comic-neue": { family: '"Comic Neue", "Comic Sans MS", cursive', weight: 500, stretch: 1 }, "courier-prime": { family: '"Courier Prime", "Courier New", monospace', weight: 500, stretch: 1 }, "didact-gothic": { family: '"Didact Gothic", "Century Gothic", "Segoe UI", sans-serif', weight: 500, stretch: 1 }, "droid-sans-mono": { family: '"Droid Sans Mono", Consolas, "Courier New", monospace', weight: 500, stretch: 1 }, "inconsolata": { family: 'Inconsolata, Consolas, "Courier New", monospace', weight: 500, stretch: 0.94 }, "inter": { family: 'Inter, "Segoe UI", Arial, sans-serif', weight: 550, stretch: 1 }, "michroma": { family: 'Michroma, Eurostile, "Bank Gothic", Arial, sans-serif', weight: 500, stretch: 1.06 }, "mplus-rounded-1c": { family: '"M PLUS Rounded 1c", "Arial Rounded MT Bold", "Segoe UI", sans-serif', weight: 500, stretch: 1 }, "noto-sans": { family: '"Noto Sans", "Segoe UI", Arial, sans-serif', weight: 500, stretch: 1 }, "noto-sans-sc": { family: '"Noto Sans SC", "Microsoft YaHei UI", "Microsoft YaHei", sans-serif', weight: 500, stretch: 1 }, "noto-sans-tc": { family: '"Noto Sans TC", "Microsoft JhengHei UI", "Microsoft JhengHei", sans-serif', weight: 500, stretch: 1 }, "noto-sans-jp": { family: '"Noto Sans JP", "Yu Gothic UI", Meiryo, sans-serif', weight: 500, stretch: 1 }, "noto-sans-kr": { family: '"Noto Sans KR", "Malgun Gothic", sans-serif', weight: 500, stretch: 1 }, "noto-serif": { family: '"Noto Serif", Georgia, "Times New Roman", serif', weight: 600, stretch: 1 } };
function rvLogoText(v) {
  return String(v ?? "").replace(/\s+/g, " ").trim().slice(0, 32);
}
function rvLogoFallback(text, font, size) {
  let st2 = RV_LOGO_STYLES[font] || RV_LOGO_STYLES.helvetiker, h = size, w = h * 0.62 * st2.stretch, gap = h * 0.15, loops = [], x = 0;
  for (let ch2 of text) {
    if (ch2 === " ") {
      x += w * 0.7;
      continue;
    }
    let ww = /[ilI1]/.test(ch2) ? w * 0.42 : /[mwMW]/.test(ch2) ? w * 1.25 : w;
    loops.push([[x, 0], [x + ww, 0], [x + ww, h], [x, h]]);
    x += ww + gap;
  }
  if (!loops.length) return null;
  let maxX = Math.max(...loops.flat().map((p) => p[0])), cx = maxX / 2, cy = h / 2;
  return { text, font, size, loops: loops.map((poly) => poly.map(([px, py]) => [px - cx, py - cy])), width: maxX, height: h, fallback: true };
}
function rvTraceText(data, w, h, threshold = 160) {
  let val = (x, y) => {
    if (x <= 0 || y <= 0 || x >= w - 1 || y >= h - 1) return 255;
    let i = (y * w + x) * 4, a13 = data[i + 3] / 255;
    return (data[i] * 0.2126 + data[i + 1] * 0.7152 + data[i + 2] * 0.0722) * a13 + 255 * (1 - a13);
  }, links = /* @__PURE__ */ new Map(), coords = /* @__PURE__ */ new Map(), H = (x, y) => `h${x},${y}`, V = (x, y) => `v${x},${y}`, table = { 1: [[3, 0]], 2: [[0, 1]], 3: [[3, 1]], 4: [[1, 2]], 6: [[0, 2]], 7: [[3, 2]], 8: [[2, 3]], 9: [[2, 0]], 11: [[2, 1]], 12: [[1, 3]], 13: [[1, 0]], 14: [[0, 3]] }, add = (a13, b) => {
    links.has(a13) || links.set(a13, []);
    links.has(b) || links.set(b, []);
    links.get(a13).push(b);
    links.get(b).push(a13);
  };
  for (let y = 0; y < h - 1; y++) for (let x = 0; x < w - 1; x++) {
    let v = [val(x, y), val(x + 1, y), val(x + 1, y + 1), val(x, y + 1)], code = v.reduce((n, a13, i) => n + (a13 < threshold ? 1 << i : 0), 0);
    if (!code || code === 15) continue;
    let keys = [H(x, y), V(x + 1, y), H(x, y + 1), V(x, y)], interp = (a13, b) => (threshold - a13) / (b - a13 || 1), xy = [[x + interp(v[0], v[1]), y], [x + 1, y + interp(v[1], v[2])], [x + interp(v[3], v[2]), y + 1], [x, y + interp(v[0], v[3])]], pairs = table[code];
    if (code === 5 || code === 10) {
      let c = v.reduce((s, n) => s + n) / 4 < threshold;
      pairs = code === 5 === c ? [[0, 1], [2, 3]] : [[3, 0], [1, 2]];
    }
    for (let [a13, b] of pairs) {
      coords.set(keys[a13], xy[a13]);
      coords.set(keys[b], xy[b]);
      add(keys[a13], keys[b]);
    }
  }
  let seen = /* @__PURE__ */ new Set(), loops = [];
  for (let start of links.keys()) {
    if (seen.has(start)) continue;
    let cur = start, prev = null, p = [];
    while (!seen.has(cur)) {
      seen.add(cur);
      p.push(coords.get(cur));
      let ns2 = links.get(cur), next = ns2.find((n) => n !== prev);
      prev = cur;
      cur = next;
      if (!cur) break;
    }
    cur === start && p.length >= 6 && loops.push(p);
  }
  return loops;
}
function rvLogoProfile(value, fontId = "helvetiker", size = 8, curveSegments = 8) {
  let text = rvLogoText(value);
  if (!text) return null;
  let physicalSize = Number(size);
  if (!Number.isFinite(physicalSize) || physicalSize <= 0) throw Error("Tamanho da logo inválido.");
  fontId = RV_LOGO_FONT_IDS.includes(fontId) ? fontId : "helvetiker";
  if (typeof OffscreenCanvas === "undefined") return rvLogoFallback(text, fontId, physicalSize);
  let st2 = RV_LOGO_STYLES[fontId] || RV_LOGO_STYLES.helvetiker, px = Math.max(96, Math.min(280, Math.round(physicalSize * 24))), pad = Math.ceil(px * 0.38), probe = new OffscreenCanvas(16, 16), pc2 = probe.getContext("2d", { willReadFrequently: true });
  if (!pc2) return rvLogoFallback(text, fontId, physicalSize);
  pc2.font = `${st2.weight} ${px}px ${st2.family}`;
  let measured = pc2.measureText(text), width = Math.max(8, Math.ceil(measured.width * st2.stretch)), canvas = new OffscreenCanvas(width + pad * 2, Math.ceil(px * 1.8) + pad * 2), ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return rvLogoFallback(text, fontId, physicalSize);
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#000";
  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";
  ctx.font = `${st2.weight} ${px}px ${st2.family}`;
  let baseline = pad + px * 1.25;
  ctx.save();
  ctx.translate(pad, 0);
  ctx.scale(st2.stretch, 1);
  ctx.fillText(text, 0, baseline);
  ctx.restore();
  let loops = rvTraceText(ctx.getImageData(0, 0, canvas.width, canvas.height).data, canvas.width, canvas.height, 160).filter((p) => p.length >= 6);
  if (!loops.length) return rvLogoFallback(text, fontId, physicalSize);
  let minX = 1 / 0, minY = 1 / 0, maxX = -1 / 0, maxY = -1 / 0;
  for (let [x, y] of loops.flat()) minX = Math.min(minX, x), minY = Math.min(minY, y), maxX = Math.max(maxX, x), maxY = Math.max(maxY, y);
  let rasterH = maxY - minY;
  if (!(rasterH > 0)) return rvLogoFallback(text, fontId, physicalSize);
  let scale = physicalSize / rasterH, cx = (minX + maxX) / 2, cy = (minY + maxY) / 2, simplified = loops.map(poly=>Ju(poly.map(([x,y])=>[(x-cx)*scale,(cy-y)*scale]),.01)).filter((p) => p.length >= 3);
  return { text, font: fontId, size: physicalSize, loops: simplified, width: (maxX - minX) * scale, height: physicalSize, fallback: false };
}
function rvContains(poly, p) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    let a13 = poly[i], b = poly[j];
    a13[1] > p[1] != b[1] > p[1] && p[0] < (b[0] - a13[0]) * (p[1] - a13[1]) / (b[1] - a13[1]) + a13[0] && (inside = !inside);
  }
  return inside;
}
function rvLogoNormalizeAngle(angle) {
  let a13 = (Number(angle) || 0) % 360;
  if (a13 > 180) a13 -= 360;
  if (a13 <= -180) a13 += 360;
  return a13;
}
function rvResolveLogoOrientation(autoAngle, p = {}) {
  let mode = ["auto", "autoOffset", "manual"].includes(p.logoOrientationMode) ? p.logoOrientationMode : "autoOffset", automatic = rvLogoNormalizeAngle(autoAngle), offset = Math.max(-45, Math.min(45, Number(p.logoRotationOffset) || 0)), absolute = rvLogoNormalizeAngle(p.logoRotationAbsolute), finalAngle = mode === "manual" ? absolute : mode === "autoOffset" ? rvLogoNormalizeAngle(automatic + offset) : automatic;
  return { mode, autoAngle: automatic, rotationOffset: offset, rotationAbsolute: absolute, finalAngle };
}
function rvLogoPlace(poly, p, profile) {
  if (!p.logoEnabled || p.mode === "stamp") return null;
  if (!profile?.loops?.length) throw Error("Perfil vetorial da logo não foi preparado.");
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let [x, y] of poly) {
    minX = Math.min(minX, x);
    minY = Math.min(minY, y);
    maxX = Math.max(maxX, x);
    maxY = Math.max(maxY, y);
  }
  let center = [(minX + maxX) / 2, (minY + maxY) / 2], cross = (a13, b) => a13[0] * b[1] - a13[1] * b[0], n = poly.length, ray = [0, -1], anchor = null, segment = 0, best = -Infinity;
  for (let i = 0; i < n; i++) {
    let a13 = poly[i], b = poly[(i + 1) % n], e = [b[0] - a13[0], b[1] - a13[1]], den = cross(ray, e);
    if (Math.abs(den) < 1e-9) continue;
    let ac = [a13[0] - center[0], a13[1] - center[1]], t = cross(ac, e) / den, u = cross(ac, ray) / den;
    if (t >= 0 && u >= -1e-7 && u <= 1 + 1e-7 && t > best) {
      best = t;
      anchor = [center[0], center[1] - t];
      segment = i;
    }
  }
  if (!anchor) {
    let idx = 0;
    for (let i = 1; i < n; i++) if (poly[i][1] < poly[idx][1] || Math.abs(poly[i][1] - poly[idx][1]) < 1e-7 && Math.abs(poly[i][0] - center[0]) < Math.abs(poly[idx][0] - center[0])) idx = i;
    anchor = poly[idx].slice();
    segment = (idx + n - 1) % n;
  }
  let forward = [anchor];
  for (let step = 1; step <= n; step++) forward.push(poly[(segment + step) % n].slice());
  forward.push(anchor);
  let firstVector = (path2) => {
    for (let i = 1; i < path2.length; i++) {
      let dx2 = path2[i][0] - path2[0][0], dy2 = path2[i][1] - path2[0][1], l = Math.hypot(dx2, dy2);
      if (l > 1e-8) return [dx2 / l, dy2 / l];
    }
    return [1, 0];
  }, path = forward, ft = firstVector(forward);
  if (ft[0] < -1e-6) path = forward.slice().reverse();
  let lengths = [0];
  for (let i = 1; i < path.length; i++) lengths.push(lengths.at(-1) + Math.hypot(path[i][0] - path[i - 1][0], path[i][1] - path[i - 1][1]));
  let perimeter = lengths.at(-1) || 1, target = perimeter * (p.logoPosition / 100);
  let atArc = (arc) => {
    arc = (arc % perimeter + perimeter) % perimeter;
    let i = 1;
    while (i < lengths.length - 1 && lengths[i] < arc) i++;
    let a13 = path[i - 1], b = path[i], seg = Math.max(1e-9, lengths[i] - lengths[i - 1]), u = (arc - lengths[i - 1]) / seg;
    return [a13[0] + (b[0] - a13[0]) * u, a13[1] + (b[1] - a13[1]) * u];
  };
  let hit = atArc(target), smoothWindow = Math.max(0.35, Math.min(2.5, (p.logoSize || 8) * 0.12, perimeter * 0.015)), before = atArc(target - smoothWindow), after = atArc(target + smoothWindow), dx = after[0] - before[0], dy = after[1] - before[1], dl = Math.hypot(dx, dy), raw;
  if (dl > 1e-8) raw = [dx / dl, dy / dl];
  else {
    let k = 1;
    while (k < lengths.length - 1 && lengths[k] < target) k++;
    let a13 = path[k - 1], b = path[k], seg = Math.max(1e-9, lengths[k] - lengths[k - 1]);
    raw = [(b[0] - a13[0]) / seg, (b[1] - a13[1]) / seg];
  }
  let autoTangent = raw.slice();
  if (autoTangent[0] < 0) autoTangent = [-autoTangent[0], -autoTangent[1]];
  let autoAngle = Math.atan2(autoTangent[1], autoTangent[0]) * 180 / Math.PI, orientation = rvResolveLogoOrientation(autoAngle, p), seedAngle = orientation.finalAngle, baseAngle = rvLogoNormalizeAngle(seedAngle + (Number(p.logoBaseRotation) || 0)), textSeed = p.logoCentralAxis ? baseAngle : seedAngle, textAngle = rvLogoNormalizeAngle(textSeed + (Number(p.logoTextRotation) || 0));
  let radial = [hit[0] - center[0], hit[1] - center[1]], rl = Math.hypot(...radial) || 1, radialNormal = [radial[0] / rl, radial[1] / rl], localLeft = [-raw[1], raw[0]], localRight = [raw[1], -raw[0]], probe = Math.max(0.03, (p.size || 75) * 8e-4), leftInside = rvContains(poly, [hit[0] + localLeft[0] * probe, hit[1] + localLeft[1] * probe]), rightInside = rvContains(poly, [hit[0] + localRight[0] * probe, hit[1] + localRight[1] * probe]), normal;
  if (leftInside !== rightInside) normal = leftInside ? localRight : localLeft;
  else normal = localLeft[0] * radialNormal[0] + localLeft[1] * radialNormal[1] > localRight[0] * radialNormal[0] + localRight[1] * radialNormal[1] ? localLeft : localRight;
  // Size the supporting plaque in its own rotated frame; never leave floating glyphs.
  const relative=(textAngle-baseAngle)*Math.PI/180;
  const textSpanW=Math.abs(Math.cos(relative))*profile.width+Math.abs(Math.sin(relative))*profile.height;
  const textSpanD=Math.abs(Math.sin(relative))*profile.width+Math.abs(Math.cos(relative))*profile.height;
  let pad=Math.max(1,Math.min(2.5,p.logoSize*.16)), minBaseW=Math.max(6,textSpanW+pad*2), minBaseD=Math.max(5,textSpanD+pad*2);
  let autoBaseW=minBaseW+p.logoBaseWidthExtra, autoBaseD=minBaseD;
  let plaqueW=p.logoBaseWidth>0?Math.max(minBaseW,p.logoBaseWidth):autoBaseW;
  let plaqueD=p.logoBaseDepth>0?Math.max(minBaseD,p.logoBaseDepth):autoBaseD;
  let autoExpanded=(p.logoBaseWidth>0&&p.logoBaseWidth<minBaseW)||(p.logoBaseDepth>0&&p.logoBaseDepth<minBaseD);
  let gap=Math.max(0,Number(p.logoBaseGap)||0);
  const radians=baseAngle*Math.PI/180, along=[Math.cos(radians),Math.sin(radians)], across=[-along[1],along[0]];
  // Global/manual rotation defines a real local frame for the whole logo support.
  // The support and its connector use one of the plaque axes, never the cutter tangent,
  // so a horizontal logo gets a horizontal plaque with a straight vertical/horizontal extension.
  const axisCandidates=[
    {axis:"width",sign:1,dir:along,half:plaqueW/2,span:plaqueD},
    {axis:"width",sign:-1,dir:[-along[0],-along[1]],half:plaqueW/2,span:plaqueD},
    {axis:"depth",sign:1,dir:across,half:plaqueD/2,span:plaqueW},
    {axis:"depth",sign:-1,dir:[-across[0],-across[1]],half:plaqueD/2,span:plaqueW}
  ];
  let supportAxis=axisCandidates[0], supportDot=-Infinity;
  for(const candidate of axisCandidates){
    const dot=candidate.dir[0]*normal[0]+candidate.dir[1]*normal[1];
    if(dot>supportDot){supportDot=dot;supportAxis=candidate;}
  }
  const outward=supportAxis.dir, inward=[-outward[0],-outward[1]];
  let plaqueCenter=[hit[0]+outward[0]*(gap+supportAxis.half),hit[1]+outward[1]*(gap+supportAxis.half)];
  let plaqueTangent = [Math.cos(baseAngle * Math.PI / 180), Math.sin(baseAngle * Math.PI / 180)], plaqueLeft = [-plaqueTangent[1], plaqueTangent[0]], textTangent = [Math.cos(textAngle * Math.PI / 180), Math.sin(textAngle * Math.PI / 180)], textLeft = [-textTangent[1], textTangent[0]];
  let localToWorld = (q, c = plaqueCenter, t = plaqueTangent, l = plaqueLeft) => [c[0] + q[0] * t[0] + q[1] * l[0], c[1] + q[0] * t[1] + q[1] * l[1]], roundedRect = (w, h, r = Math.min(2, h * 0.28), steps = 12) => {
    let pts = [], corners = [[w / 2 - r, h / 2 - r, 0], [-w / 2 + r, h / 2 - r, Math.PI / 2], [-w / 2 + r, -h / 2 + r, Math.PI], [w / 2 - r, -h / 2 + r, Math.PI * 1.5]];
    for (let [cx, cy, startAngle] of corners) for (let i = 0; i <= steps; i++) {
      let angle = startAngle + i * Math.PI / (2 * steps);
      pts.push([cx + Math.cos(angle) * r, cy + Math.sin(angle) * r]);
    }
    return pts;
  };
  let plaque = roundedRect(plaqueW, plaqueD).map((q) => localToWorld(q, plaqueCenter, plaqueTangent, plaqueLeft));
  const cutterInset=0.75, connectorAxis=supportAxis.axis;
  const transverse=[-outward[1],outward[0]], halfSpan=supportAxis.span/2;
  // Reach beyond the rounded inner corners, so the two side walls are continuous.
  const cornerRadius=Math.min(2,plaqueD*.28);
  const near=-supportAxis.half+cornerRadius+0.05;
  const projected=poly.map(q=>{const dx=q[0]-plaqueCenter[0],dy=q[1]-plaqueCenter[1];return [dx*transverse[0]+dy*transverse[1],dx*outward[0]+dy*outward[1]];});
  // Exact piecewise-linear visible boundary across the full width of the support.
  // Include each contour vertex: no sampling gaps on curved or concave outlines.
  const cuts=[-halfSpan,halfSpan,...projected.map(q=>q[0]).filter(x=>x>-halfSpan&&x<halfSpan)].sort((a,b)=>a-b).filter((x,i,a)=>!i||x-a[i-1]>1e-8);
  const far=[];
  for(let j=0;j<cuts.length-1;j++){
    const lo=cuts[j],hi=cuts[j+1],mid=(lo+hi)/2;
    let edge=null,best=-Infinity;
    for(let k=0;k<projected.length;k++){
      const a=projected[k],b=projected[(k+1)%projected.length];
      if(Math.abs(b[0]-a[0])<1e-10||mid<Math.min(a[0],b[0])||mid>Math.max(a[0],b[0]))continue;
      const y=a[1]+(mid-a[0])*(b[1]-a[1])/(b[0]-a[0]);
      if(y>best){best=y;edge=[a,b];}
    }
    for(const x of [lo,hi]){
      const y=edge?edge[0][1]+(x-edge[0][0])*(edge[1][1]-edge[0][1])/(edge[1][0]-edge[0][0]):-supportAxis.half-gap;
      far.push([x,Math.min(near-0.05,y-cutterInset)]);
    }
  }
  const connectorLocal=[[-halfSpan,near],[halfSpan,near],...far.reverse()].filter((q,i,a)=>!i||Math.hypot(q[0]-a[i-1][0],q[1]-a[i-1][1])>1e-8);
  const connector=connectorLocal.map(([x,y])=>[plaqueCenter[0]+transverse[0]*x+outward[0]*y,plaqueCenter[1]+transverse[1]*x+outward[1]*y]);
  let textLoops = profile.loops.map((loop) => loop.map((q) => localToWorld(q, plaqueCenter, textTangent, textLeft)));
  return { textLoops, plaque, connector, plaqueCenter, minBaseW, minBaseD, autoExpanded, anchor: hit, tangent: plaqueTangent, normal, angle: textAngle, autoAngle: orientation.autoAngle, finalAngle: seedAngle, orientationMode: orientation.mode, rotationOffset: orientation.rotationOffset, rotationAbsolute: orientation.rotationAbsolute, position: p.logoPosition, baseWidth: plaqueW, baseDepth: plaqueD, baseWidthAuto: autoBaseW, baseDepthAuto: autoBaseD, baseGap: gap, connectorMode: "axisAlignedFullSpan", connectorAxis, connectorDirection: outward, connectorWidth: connectorAxis==="depth"?plaqueW:plaqueD, connectorDepth: gap+cutterInset, textWidth: profile.width, textHeight: profile.height, baseAngle, textAngle, baseRotation: rvLogoNormalizeAngle(p.logoBaseRotation), textRotation: rvLogoNormalizeAngle(p.logoTextRotation), centralAxis: !!p.logoCentralAxis };

}
function qr(a13 = {}) {
  let e = { ...Wr, ...a13, stampBase: a13.stampBase ?? a13.base ?? Wr.stampBase };
  e.reliefSeparate = !!e.reliefSeparate;
  e.logoEnabled = !!e.logoEnabled;
  e.logoCentralAxis = !!e.logoCentralAxis;
  e.logoText = rvLogoText(e.logoText) || Wr.logoText;
  e.logoFont = RV_LOGO_FONT_IDS.includes(e.logoFont) ? e.logoFont : Wr.logoFont;
  e.logoPosition = Math.max(0, Math.min(100, Number(e.logoPosition) || 0));
  e.logoBaseWidthExtra = Math.max(0, Math.min(40, Number(e.logoBaseWidthExtra) || 0));
  e.logoBaseWidth = Math.max(0, Math.min(120, Number(e.logoBaseWidth) || 0));
  e.logoBaseDepth = Math.max(0, Math.min(60, Number(e.logoBaseDepth) || 0));
  e.logoBaseGap = Math.max(0, Math.min(20, Number(a13.logoBaseGap ?? (Number(a13.logoOffset) || 0)) || 0));
  e.logoOrientationMode = ["auto", "autoOffset", "manual"].includes(e.logoOrientationMode) ? e.logoOrientationMode : Wr.logoOrientationMode;
  e.logoRotationOffset = Math.max(-45, Math.min(45, Number(e.logoRotationOffset) || 0));
  e.logoRotationAbsolute = rvLogoNormalizeAngle(e.logoRotationAbsolute);
  e.logoBaseRotation = rvLogoNormalizeAngle(e.logoBaseRotation);
  e.logoTextRotation = rvLogoNormalizeAngle(e.logoTextRotation);
  Number.isFinite(e.reliefOut) || (e.reliefOut = e.reliefInverted ? Wr.relief : e.relief);
  Number.isFinite(e.reliefIn) || (e.reliefIn = e.reliefInverted ? e.relief : Math.min(1, Math.max(0.1, (e.mode === "integrated" ? e.base : e.stampBase) * 0.4)));
  return e;
}
function fa(a13, e, t, n = null, i = {}) {
  let r = performance.now(), s = qr(t), h = [], c = (g) => (h.push(g), g), u = a13.CrossSection, f = a13.Manifold, d = ["size", "wall", "height", "rim", "base", "stampBase", "stampInset", "stampExpansion", "outlineBand", "tip", "chamferHeight", "reinforcementHeight", "reinforcementWidth", "logoSize", "logoHeight", "logoBaseWidthExtra", "logoBaseWidth", "logoBaseDepth", "logoBaseGap", "logoPosition", "logoOffset", "logoRotationOffset", "logoRotationAbsolute", "logoBaseRotation", "logoTextRotation", "clearance", "detailOffset", "outlineOffset", "tolerance", "cornerRadius", "relief"];
  for (let g of d) if (!Number.isFinite(s[g])) throw Error(`Valor inválido em ${g}: informe um número finito.`);
  let v = [["size", 0.1], ["wall", 0.01], ["height", 0.05], ["base", 0.01], ["stampBase", 0.01], ["outlineBand", 1e-3], ["tip", 1e-3], ["chamferHeight", 1e-3], ["reinforcementHeight", 1e-3], ["reinforcementWidth", 1e-3], ["logoSize", 1], ["logoHeight", 0.05], ["tolerance", 1e-4], ["relief", 1e-3]];
  for (let [g, _] of v) if (s[g] < _) throw Error(`Valor inválido em ${g}: use um valor maior ou igual a ${_}.`);
  if (s.rim < 0 || s.cornerRadius < 0 || s.clearance < 0) throw Error("Base de apoio, proteção de cantos e folga não podem ser negativas.");
  if (s.logoOffset < -3 || s.logoOffset > 20) throw Error("O afastamento legado da logo deve ficar entre -3 e 20 mm.");
  if (s.logoBaseGap < 0 || s.logoBaseGap > 20) throw Error("A distância da base da logo deve ficar entre 0 e 20 mm.");
  if (s.logoBaseWidth < 0 || s.logoBaseWidth > 120 || s.logoBaseDepth < 0 || s.logoBaseDepth > 60) throw Error("As dimensões da base da logo estão fora do intervalo permitido.");
  if (s.logoEnabled && s.mode !== "stamp" && s.base + s.logoHeight >= s.height) throw Error("A altura da logo deve terminar abaixo da borda de corte.");
  let m = s.mode === "integrated" ? s.base : s.stampBase;
  if (s.mode !== "stamp" && s.base >= s.height) throw Error("A base do cortador deve ser menor que a altura total.");
  if (s.mode === "integrated" && s.base + s.relief >= s.height) throw Error("Base + relevo precisam ficar abaixo da borda de corte.");
  if (s.chamfer && s.mode !== "stamp" && (s.tip > s.wall || s.chamferHeight > s.height - s.base)) throw Error("O chanfro deve caber acima da base; a ponta não pode superar a espessura da lâmina.");
  if (s.bladeReinforcement && s.mode !== "stamp") {
    let g = Math.max(0, Math.max(s.rim, s.wall) - s.wall);
    if (s.reinforcementWidth > g + 1e-6) throw Error("A largura do reforço deve caber dentro da base de apoio. Aumente a base de apoio ou reduza a largura do reforço.");
    let _ = s.height - s.base - (s.chamfer ? s.chamferHeight : 0);
    if (s.reinforcementHeight > _ + 1e-6) throw Error("A altura do reforço deve terminar antes do chanfro da ponta.");
  }
  if (!["integrated", "separate", "cutter", "stamp"].includes(s.mode)) throw Error("Modo de peça inválido.");
  try {
    let g = (ae, j) => n ? n.memo(ae, j) : j(), _ = s.mode === "separate" || s.mode === "cutter" ? n?.get("cutter") : null, b = (s.mode === "separate" || s.mode === "stamp") && !s.reliefSeparate ? n?.get("stamp") : null, A = g("source", () => e.map((ae) => Ju(ae, s.tolerance / s.size).map(([j, xe]) => [j * s.size * (s.mirror ? -1 : 1), xe * s.size])).sort((ae, j) => Math.abs(ot(j)) - Math.abs(ot(ae)))), R = A.reduce((ae, j) => ae + j.length, 0), F = i.buildProfile || "normal", k = F === "normal" && (R > 1400 || A.length > 48), L = F === "recovery" ? "recovery" : F === "safe" || k ? "safe" : "normal", O = L === "recovery" ? 64 : L === "safe" ? 112 : 256, G = L === "recovery" ? 48 : L === "safe" ? 80 : 128, N = L === "recovery" ? 12 : L === "safe" ? 24 : 64, D = (ae) => {
      let j = ae.toPolygons().sort((xe, we) => Math.abs(ot(we)) - Math.abs(ot(xe)));
      if (!j.length) throw Error("O recuo eliminou o contorno. Reduza o valor.");
      return c(new u([j[0]], "EvenOdd"));
    }, V = s.mode === "separate" ? s.stampExpansion : 0, $ = c(new u([A[0]], "EvenOdd")), Y = c(new u(g("outer", () => D(c(c($.offset(s.outlineOffset + V, "Round", 2, O)).simplify(2e-3))).toPolygons()), "EvenOdd")), H, K, W, ce, se, Z, de, qe, rvBase, rvLogoSolid, rvLogoOutline = _?.logoOutline || [], rvLogoPlacement = _?.logoPlacement || null, rvLogoPath = _?.logoPathOutline || [], be = [], ft = [], $e = [], Le = [];
    if (s.mode !== "stamp" && !_) {
      let ae = g("inner", () => {
        if (W = D(c(Y.offset(s.clearance, "Round", 2, O))), s.cornerRadius > 0) {
          let he = s.cornerRadius + s.wall, Te = c(c(W.offset(he, "Round", 2, O)).offset(-he, "Round", 2, O));
          W = D(c(u.union([W, Te])));
        }
        return W.toPolygons();
      });
      if (W = c(new u(ae, "EvenOdd")), !Array.isArray(s.wallEdits) || s.wallEdits.length > 100) throw Error("Excesso de ajustes locais na lâmina.");
      let j = (he, Te = 1) => {
        let ze = D(c(W.offset(he, "Round", 2, O)));
        for (let pe of s.wallEdits) {
          if (!Number.isFinite(pe.delta) || Math.abs(pe.delta) > 2 || !Array.isArray(pe.region) || pe.region.length !== 4 || !pe.region.flat().every(Number.isFinite)) throw Error("Ajuste local inválido.");
          let ue = c(new u([pe.region.map(([De, $t]) => [De * s.size * (s.mirror ? -1 : 1), $t * s.size])], "EvenOdd")), Re = c(ze.offset(pe.delta * Te, "Round", 2, O));
          ze = D(c(u.union([c(ze.subtract(ue)), c(Re.intersect(ue))])));
        }
        if (s.wallEdits.length) {
          let pe = Math.max(0.3, Math.min(he, Math.max(0.3, s.tip + 0.02))), ue = Math.max(5, s.wall + s.reinforcementWidth + 2);
          ze = D(c(c(u.union([ze, c(W.offset(pe, "Round", 2, O))])).intersect(c(W.offset(ue, "Round", 2, O)))));
        }
        return ze;
      }, xe = (he = 1) => {
        let Te = s.chamfer ? s.tip + (s.wall - s.tip) * he : s.wall;
        return j(Te, he);
      }, we = (he = 1) => j(s.wall + s.reinforcementWidth * he, 1), ye = g("blade", () => {
        let he = xe(), Te = D(c(W.offset(s.tip, "Round", 2, O))), ze = [];
        if (s.chamfer && (s.tip < s.wall - 1e-6 || s.wallEdits.length)) {
          let pe = Math.max(2, Math.min(N, Math.ceil((s.wall - s.tip + s.wallEdits.reduce((Re, De) => Re + Math.abs(De.delta), 0)) / 0.025))), ue = he;
          for (let Re = 1; Re < pe; Re++) {
            let De = xe(1 - Re / pe);
            s.wallEdits.length && (De = D(c(u.union([c(De.intersect(ue)), Te])))), ze.push({ poly: De.toPolygons()[0], fraction: Re / pe }), ue = De;
          }
        }
        return { outer: he.toPolygons(), tip: Te.toPolygons(), rings: ze };
      }), Ce = c(new u(ye.outer, "EvenOdd"));
      K = c(new u(g("rim", () => D(c(u.union([c(W.offset(Math.max(s.rim, s.wall), "Round", 2, O)), Ce]))).toPolygons()), "EvenOdd")), rvLogoPath = K.toPolygons()[0] || [], rvBase = K, s.logoEnabled && s.mode !== "stamp" && (() => {
        let rv = rvLogoPlace(K.toPolygons()[0], s, i.logoProfile);
        if (rv) {
          rvLogoPlacement = { plaqueCenter:rv.plaqueCenter, minBaseW:rv.minBaseW,minBaseD:rv.minBaseD,autoExpanded:rv.autoExpanded, anchor: rv.anchor, tangent: rv.tangent, normal: rv.normal, angle: rv.angle, autoAngle: rv.autoAngle, finalAngle: rv.finalAngle, orientationMode: rv.orientationMode, rotationOffset: rv.rotationOffset, rotationAbsolute: rv.rotationAbsolute, position: rv.position, baseWidth: rv.baseWidth, baseDepth: rv.baseDepth, baseWidthAuto: rv.baseWidthAuto, baseDepthAuto: rv.baseDepthAuto, baseGap: rv.baseGap, connectorMode: rv.connectorMode, connectorAxis: rv.connectorAxis, connectorDirection: rv.connectorDirection, connectorWidth: rv.connectorWidth, connectorDepth: rv.connectorDepth, textWidth: rv.textWidth, textHeight: rv.textHeight, baseAngle: rv.baseAngle, textAngle: rv.textAngle, baseRotation: rv.baseRotation, textRotation: rv.textRotation, centralAxis: rv.centralAxis };
          let p1 = c(new u([rv.plaque], "EvenOdd")), p2 = c(new u([rv.connector], "EvenOdd"));
          rvBase = D(c(u.union([K, p1, p2])));
          let rs2 = c(new u(rv.textLoops, "EvenOdd"));
          rvLogoOutline = rv.textLoops;
          rvLogoSolid = c(c(rs2.extrude(s.logoHeight + Math.min(0.02, s.base))).translate([0, 0, Math.max(0, s.base - 0.02)]));
        }
      })(), be = c(Ce.subtract(W)).toPolygons(), s.bladeReinforcement && ($e = we(1).toPolygons()[0] || [], Le = Ce.toPolygons()[0] || []);
      let Be = n?.getSolid?.("bladeSolid");
      if (Be) H = c(Be.translate([0, 0, 0]));
      else {
        if (s.bladeReinforcement) {
          let he = we(1);
          $e = he.toPolygons()[0] || [], Le = Ce.toPolygons()[0] || [];
          let Te = s.base, ze = s.base + s.reinforcementHeight, pe = [], ue = Math.max(0.25, Math.min(0.7, s.size / 180)), Re = (Ye) => Qu(Ye, ue), De = Math.max(2, Math.min(N, Math.ceil(s.reinforcementWidth / 0.025))), $t = he;
          for (let Ye = 1; Ye < De; Ye++) {
            let Yt = Ye / De, mt = we(1 - Yt);
            s.wallEdits.length && (mt = D(c(mt.intersect($t)))), pe.push({ poly: Re(mt.toPolygons()[0]), z: Te + s.reinforcementHeight * Yt }), $t = mt;
          }
          if (pe.push({ poly: Re(Ce.toPolygons()[0]), z: ze }), s.chamfer && (s.tip < s.wall - 1e-6 || s.wallEdits.length)) {
            let Ye = s.height - s.chamferHeight, Yt = c(new u(ye.tip, "EvenOdd"));
            ze < Ye - 1e-6 && pe.push({ poly: Re(Ce.toPolygons()[0]), z: Ye });
            for (let Nn of ye.rings) pe.push({ poly: Re(Nn.poly), z: Ye + s.chamferHeight * Nn.fraction });
            let mt = c(Xr(a13, Re(he.toPolygons()[0]), Re(Yt.toPolygons()[0]), Te, s.height, Math.max(0, Te - 0.02), pe));
            if (mt.status() !== "NoError") throw Error("Não foi possível fechar a lâmina com reforço. Reduza a altura ou a largura do reforço.");
            H = c(mt.subtract(c(W.extrude(s.height + 1))));
          } else {
            let Ye = c(Xr(a13, Re(he.toPolygons()[0]), Re(Ce.toPolygons()[0]), Te, s.height, Math.max(0, Te - 0.02), pe));
            if (Ye.status() !== "NoError") throw Error("Não foi possível fechar a lâmina com reforço. Reduza a altura ou a largura do reforço.");
            H = c(Ye.subtract(c(W.extrude(s.height + 1))));
          }
        } else if (s.chamfer && (s.tip < s.wall - 1e-6 || s.wallEdits.length)) {
          let he = s.height - s.chamferHeight, Te = c(new u(ye.tip, "EvenOdd")), ze = ye.rings.map((ue) => ({ poly: ue.poly, z: he + s.chamferHeight * ue.fraction })), pe = c(Xr(a13, Ce.toPolygons()[0], Te.toPolygons()[0], he, s.height, Math.max(0, s.base - 0.02), ze));
          if (pe.status() !== "NoError") throw Error("Não foi possível fechar o chanfro. Reduza sua altura ou revise o contorno.");
          H = c(pe.subtract(c(W.extrude(s.height + 1))));
        } else H = c(c(c(Ce.subtract(W)).extrude(s.height - s.base + Math.min(0.02, s.base))).translate([0, 0, Math.max(0, s.base - 0.02)]));
        n?.setSolid?.("bladeSolid", H.translate([0, 0, 0]));
      }
      s.mode !== "integrated" && (() => {
        let rvBand = c((rvBase || K).subtract(W)), rvSolid = c(rvBand.extrude(s.base));
        ce = c(f.union(rvLogoSolid ? [H, rvSolid, rvLogoSolid] : [H, rvSolid]));
      })();
    }
    if (s.mode !== "cutter" && !b) {
      let ae = g("art", () => {
        let ye = c(new u(A, "EvenOdd"));
        s.detailOffset && (ye = c(ye.offset(s.detailOffset, "Round", 2, G))), s.removeOutline && (ye = c(ye.intersect(c($.offset(-s.outlineBand, "Round", 2, O)))));
        let Ce = s.mode === "integrated" ? Y : D(c($.offset(-s.stampInset, "Round", 2, O))), Be = c(ye.intersect(Ce));
        if (Be.isEmpty()) throw Error("Nenhum detalhe restou no carimbo. Reduza a remoção de borda ou o recuo.");
        return Be.toPolygons();
      });
      ft = ae;
      let j = c(new u(ae, "EvenOdd")), xe = s.mode === "integrated" ? s.base : s.stampBase, we = c(new u(g("footprint", () => {
        let ye = s.mode === "integrated" ? Y : D(c($.offset(-s.stampInset, "Round", 2, O)));
        return (s.mode !== "integrated" && s.stampExpansion > 0 ? D(c($.offset(s.stampExpansion - s.stampInset, "Round", 2, O))) : ye).toPolygons();
      }), "EvenOdd"));
      if (s.mode !== "integrated" && (de = c(we.extrude(s.stampBase))), s.reliefInverted) {
        let ye = s.mode === "integrated" ? W : we, Ce = c(c(ye.extrude(s.relief + 0.02)).translate([0, 0, xe - 0.02]));
        se = c(c(j.extrude(s.relief + 0.02)).translate([0, 0, xe]));
        let Be = c(Ce.subtract(se));
        if (s.mode !== "integrated") {
          if (Z = c(f.union([de, Be])), s.reliefSeparate) {
            let he = c(c(we.extrude(s.relief)).translate([0, 0, xe])), Te = c(c(j.extrude(s.relief + 0.02)).translate([0, 0, xe - 0.01]));
            qe = c(he.subtract(Te));
          }
        } else Z = Be;
      } else se = c(c(j.extrude(s.relief + Math.min(0.02, xe))).translate([0, 0, Math.max(0, xe - 0.02)])), s.mode !== "integrated" && (Z = c(f.union([de, se])), s.reliefSeparate && (qe = c(c(j.extrude(s.relief)).translate([0, 0, xe]))));
    }
    let _e = [];
    if (s.mode === "integrated") {
      let ae = c((rvBase || K).extrude(s.base)), j = s.reliefInverted ? c(f.union([ae, Z])) : c(f.union([ae, se])), rvIntegrated = c(f.union(rvLogoSolid ? [H, j, rvLogoSolid] : [H, j]));
      _e = [{ name: "Cortador integrado", solid: rvIntegrated }];
    } else s.mode === "separate" ? _e = s.reliefSeparate ? [{ name: "Cortador", solid: ce }, { name: "Base do carimbo", solid: de }, { name: "Relevo", solid: qe }] : [{ name: "Cortador", solid: ce }, { name: "Carimbo", solid: Z }] : s.mode === "stamp" ? _e = s.reliefSeparate ? [{ name: "Base do carimbo", solid: de }, { name: "Relevo", solid: qe }] : [{ name: "Carimbo", solid: Z }] : _e = [{ name: "Cortador", solid: ce }];
    let Oe = { parts: _e.map(({ name: ae, solid: j }) => {
      if (ae === "Cortador" && _) return _.part;
      if (ae === "Carimbo" && b) return b.part;
      if (j = c(j.setTolerance(1e-3)), j.status() !== "NoError" || j.isEmpty()) throw Error(`${ae}: falha na construção do sólido (${j.status()}).`);
      let xe = ef(j.getMesh()), we = tf(xe);
      if (we.open || we.nonmanifold || !we.finite) throw Error(`${ae}: malha inválida (${JSON.stringify(we)}), exportação bloqueada.`);
      let ye = j.decompose(), Ce = ye.length;
      return ye.forEach((Be) => Be.delete()), { name: ae, positions: Float32Array.from(xe.vertProperties), indices: Uint32Array.from(xe.triVerts), stride: xe.numProp, volume: j.volume(), bounds: j.boundingBox(), stats: we, bodies: Ce };
    }), outline: Y.toPolygons(), reliefOutline: b?.reliefOutline || ft, cuttingOutline: _?.cuttingOutline || W?.toPolygons() || [], bladeProfile: _?.bladeProfile || be, reinforcementRootOutline: _?.reinforcementRootOutline || $e, reinforcementTransitionOutline: _?.reinforcementTransitionOutline || Le, logoOutline: rvLogoOutline, logoPlacement: rvLogoPlacement, logoPathOutline: rvLogoPath, params: s, buildProfile: L, sourcePoints: R };
    for (let ae of Oe.parts) ae.name === "Cortador" && !_ && n?.set("cutter", { part: ae, cuttingOutline: Oe.cuttingOutline, bladeProfile: Oe.bladeProfile, reinforcementRootOutline: Oe.reinforcementRootOutline, reinforcementTransitionOutline: Oe.reinforcementTransitionOutline, logoOutline: Oe.logoOutline, logoPlacement: Oe.logoPlacement, logoPathOutline: Oe.logoPathOutline }), ae.name === "Carimbo" && !b && n?.set("stamp", { part: ae, reliefOutline: Oe.reliefOutline });
    return Oe.elapsed = performance.now() - r, Oe;
  } finally {
    h.reverse().forEach((g) => g.delete());
  }
}
function da(a13, e, t) {
  let n = [], i = (s) => (n.push(s), s), r = a13.CrossSection;
  try {
    let s = i(new r(e, "EvenOdd")), h;
    if (t.type === "thickness") {
      let u = i(s.offset(t.distance / t.size / 2, "Round", 2, 128));
      if (t.region) {
        let f = i(new r([t.region], "EvenOdd"));
        h = i(r.union([i(s.subtract(f)), i(u.intersect(f))]));
      } else h = u;
    } else if (t.type === "offset") {
      let u = i(new r([e[t.selected]], "EvenOdd")), f = i(u.offset(t.distance / t.size, "Round", 2, 128)), d = e.filter((v, m) => m !== t.selected);
      return d.push(...f.toPolygons()), d.sort((v, m) => Math.abs(ot(m)) - Math.abs(ot(v)));
    } else if (t.type === "shape") {
      let u = i(new r([t.points], "EvenOdd"));
      h = i(t.subtract ? s.subtract(u) : r.union([s, u]));
    } else if (t.type === "stroke") {
      let u = t.width / t.size / 2, f = [];
      for (let v = 0; v < t.points.length; v++) if (f.push(i(i(r.circle(u, 16)).translate(t.points[v]))), v) {
        let m = t.points[v - 1], g = t.points[v], _ = g[0] - m[0], b = g[1] - m[1], A = Math.hypot(_, b);
        if (A > 1e-9) {
          let R = -b / A * u, F = _ / A * u;
          f.push(i(new r([[[m[0] + R, m[1] + F], [m[0] - R, m[1] - F], [g[0] - R, g[1] - F], [g[0] + R, g[1] + F]]], "EvenOdd")));
        }
      }
      let d = i(r.union(f));
      h = i(t.subtract ? s.subtract(d) : r.union([s, d]));
    }
    if (!h || h.isEmpty()) throw Error("A edição apagaria toda a arte.");
    return h.toPolygons().sort((u, f) => Math.abs(ot(f)) - Math.abs(ot(u)));
  } finally {
    n.reverse().forEach((s) => s.delete());
  }
}
function ef(a13) {
  let e = /* @__PURE__ */ new Map(), t = [], n = [];
  for (let r = 0; r < a13.vertProperties.length; r += a13.numProp) {
    let s = Array.from(a13.vertProperties.slice(r, r + 3)), h = s.join(",");
    e.has(h) || (e.set(h, t.length / 3), t.push(...s)), n.push(e.get(h));
  }
  let i = [];
  for (let r = 0; r < a13.triVerts.length; r += 3) {
    let s = n[a13.triVerts[r]], h = n[a13.triVerts[r + 1]], c = n[a13.triVerts[r + 2]];
    s !== h && h !== c && c !== s && i.push(s, h, c);
  }
  return { numProp: 3, vertProperties: new Float32Array(t), triVerts: new Uint32Array(i) };
}
function tf(a13) {
  let e = /* @__PURE__ */ new Map(), t = true;
  for (let c of a13.vertProperties) Number.isFinite(c) || (t = false);
  let n = /* @__PURE__ */ new Map(), i = [], r = a13.numProp;
  for (let c = 0; c < a13.vertProperties.length; c += r) {
    let u = [0, 1, 2].map((f) => String(a13.vertProperties[c + f])).join(",");
    n.has(u) || n.set(u, n.size), i.push(n.get(u));
  }
  for (let c = 0; c < a13.triVerts.length; c += 3) for (let u = 0; u < 3; u++) {
    let f = i[a13.triVerts[c + u]], d = i[a13.triVerts[c + (u + 1) % 3]], v = f < d ? `${f}:${d}` : `${d}:${f}`;
    e.set(v, (e.get(v) || 0) + 1);
  }
  let s = 0, h = 0;
  for (let c of e.values()) c === 1 && s++, c > 2 && h++;
  return { open: s, nonmanifold: h, finite: t, triangles: a13.triVerts.length / 3 };
}
function pa(a13) {
  let e = a13.indices.length / 3, t = new ArrayBuffer(84 + e * 50), n = new DataView(t);
  n.setUint32(80, e, true);
  let i = 84;
  for (let r = 0; r < a13.indices.length; r += 3) {
    let s = [0, 1, 2].map((d) => Array.from(a13.positions.slice(a13.indices[r + d] * a13.stride, a13.indices[r + d] * a13.stride + 3))), h = s[1].map((d, v) => d - s[0][v]), c = s[2].map((d, v) => d - s[0][v]), u = [h[1] * c[2] - h[2] * c[1], h[2] * c[0] - h[0] * c[2], h[0] * c[1] - h[1] * c[0]], f = Math.hypot(...u) || 1;
    for (let d of [...u.map((v) => v / f), ...s.flat()]) n.setFloat32(i, d, true), i += 4;
    i += 2;
  }
  return t;
}
function $r(a13, e) {
  let t = false;
  for (let n = 0, i = a13.length - 1; n < a13.length; i = n++) {
    let r = a13[n], s = a13[i];
    r[1] > e[1] != s[1] > e[1] && e[0] < (s[0] - r[0]) * (e[1] - r[1]) / (s[1] - r[1]) + r[0] && (t = !t);
  }
  return t;
}
function In(a13, e) {
  return !!a13?.length && a13.reduce((t, n) => t !== $r(n, e), false);
}
function nf(a13, e) {
  return e.map((t) => [a13.positions[t * a13.stride], a13.positions[t * a13.stride + 1], a13.positions[t * a13.stride + 2]]);
}
function ma(a13) {
  let e = a13[0], t = a13[1].map((s, h) => s - e[h]), n = a13[2].map((s, h) => s - e[h]), i = [t[1] * n[2] - t[2] * n[1], t[2] * n[0] - t[0] * n[2], t[0] * n[1] - t[1] * n[0]], r = Math.hypot(...i) || 1;
  return i.map((s) => s / r);
}
function ga(a13, e, t) {
  let n = e.params, i = nf(a13, t), r = [0, 0, 0];
  for (let u of i) for (let f = 0; f < 3; f++) r[f] += u[f] / 3;
  if (n.logoEnabled && e.logoOutline?.length && r[2] >= n.base - 0.02 && r[2] <= n.base + n.logoHeight + 0.02) {
    let rv = In(e.logoOutline, r);
    if (!rv) {
      let rvn = ma(i), rvl = Math.hypot(rvn[0], rvn[1]);
      if (rvl > 1e-8) {
        let rve = Math.max(3e-3, (n.logoSize || 8) * 1e-3), rvx = rvn[0] / rvl * rve, rvy = rvn[1] / rvl * rve;
        rv = In(e.logoOutline, [r[0] + rvx, r[1] + rvy]) || In(e.logoOutline, [r[0] - rvx, r[1] - rvy]);
      }
    }
    if (rv) return "cutterBase";
  }
  if (n.bladeReinforcement && ["Cortador", "Cortador integrado"].includes(a13.name) && r[2] > n.base + 1e-3 && r[2] < n.base + n.reinforcementHeight + 1e-3 && ma(i)[2] > 1e-3 && !In(e.cuttingOutline, r)) return "reinforcement";
  if (a13.name === "Cortador") return r[2] <= n.base + 1e-3 ? "cutterBase" : "blade";
  if (a13.name === "Base do carimbo") return "stampBase";
  if (a13.name === "Relevo") return "relief";
  let s = a13.name !== "Carimbo", h = s ? n.base : n.stampBase;
  if (n.reliefInverted) {
    let u = h, f = h + n.relief, d = Math.max(1e-3, Math.abs(f) * 1e-5), v = false;
    if (r[2] >= u - d && r[2] <= f + d && (v = In(e.reliefOutline, r), !v)) {
      let g = ma(i), _ = Math.hypot(g[0], g[1]);
      if (_ > 1e-8) {
        let b = Math.max(3e-3, (n.size || 75) * 5e-5), A = g[0] / _ * b, R = g[1] / _ * b;
        v = In(e.reliefOutline, [r[0] + A, r[1] + R]) || In(e.reliefOutline, [r[0] - A, r[1] - R]);
      }
    }
    if (!s) return v ? "relief" : "stampBase";
    if (v) return "relief";
    let m = e.cuttingOutline?.length ? In(e.cuttingOutline, r) : false;
    if (r[2] > n.base + 1e-3 && m) return "stampBase";
  }
  if (!s) return r[2] <= n.stampBase + 1e-3 ? "stampBase" : "relief";
  let c = e.outline?.[0] ? $r(e.outline[0], r) : true;
  return r[2] <= n.base + 1e-3 ? c ? "stampBase" : "cutterBase" : c ? "relief" : "blade";
}
function va(a13) {
  for (let e of a13.parts) {
    if (!e.renderData) {
      let t = { cutterBase: [], blade: [], reinforcement: [], stampBase: [], relief: [] }, n = a13.params;
      for (let i = 0; i < e.indices.length; i += 3) {
        let r = [e.indices[i], e.indices[i + 1], e.indices[i + 2]], s = ga(e, a13, r);
        t[s].push(...r);
      }
      e.renderData = {};
      for (let [i, r] of Object.entries(t)) {
        if (!r.length) continue;
        let s = new pt();
        s.setAttribute("position", new Ve(e.positions, e.stride)), s.setIndex(r);
        let h = la(s, n, i);
        e.renderData[i] = { positions: h.attributes.position.array, normals: h.attributes.normal.array, indices: h.index.array }, s.dispose(), h.dispose();
      }
    }
    e.cadEdges instanceof Float32Array || (e.cadEdges = oa(e));
  }
  return a13;
}
function _a(a13) {
  return a13.parts.flatMap((e) => [e.positions.buffer, e.indices.buffer, ...e.cadEdges instanceof Float32Array ? [e.cadEdges.buffer] : [], ...Object.values(e.renderData || {}).flatMap((t) => [t.positions.buffer, t.normals.buffer, t.indices.buffer])]);
}
var Xe = Uint8Array, it = Uint16Array, Qr = Int32Array, es = new Xe([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]), ts = new Xe([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]), xa = new Xe([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), Ea = function(a13, e) {
  for (var t = new it(31), n = 0; n < 31; ++n) t[n] = e += 1 << a13[n - 1];
  for (var i = new Qr(t[30]), n = 1; n < 30; ++n) for (var r = t[n]; r < t[n + 1]; ++r) i[r] = r - t[n] << 5 | n;
  return { b: t, r: i };
}, Aa = Ea(es, 2), rf = Aa.b, Zr = Aa.r;
rf[28] = 258, Zr[258] = 28;
var Ca = Ea(ts, 0), v_ = Ca.b, ya = Ca.r, Jr = new it(32768);
for (le = 0; le < 32768; ++le) bt = (le & 43690) >> 1 | (le & 21845) << 1, bt = (bt & 52428) >> 2 | (bt & 13107) << 2, bt = (bt & 61680) >> 4 | (bt & 3855) << 4, Jr[le] = ((bt & 65280) >> 8 | (bt & 255) << 8) >> 1;
var bt, le, Un = (function(a13, e, t) {
  for (var n = a13.length, i = 0, r = new it(e); i < n; ++i) a13[i] && ++r[a13[i] - 1];
  var s = new it(e);
  for (i = 1; i < e; ++i) s[i] = s[i - 1] + r[i - 1] << 1;
  var h;
  if (t) {
    h = new it(1 << e);
    var c = 15 - e;
    for (i = 0; i < n; ++i) if (a13[i]) for (var u = i << 4 | a13[i], f = e - a13[i], d = s[a13[i] - 1]++ << f, v = d | (1 << f) - 1; d <= v; ++d) h[Jr[d] >> c] = u;
  } else for (h = new it(n), i = 0; i < n; ++i) a13[i] && (h[i] = Jr[s[a13[i] - 1]++] >> 15 - a13[i]);
  return h;
}), qt = new Xe(288);
for (le = 0; le < 144; ++le) qt[le] = 8;
var le;
for (le = 144; le < 256; ++le) qt[le] = 9;
var le;
for (le = 256; le < 280; ++le) qt[le] = 7;
var le;
for (le = 280; le < 288; ++le) qt[le] = 8;
var le, wi = new Xe(32);
for (le = 0; le < 32; ++le) wi[le] = 5;
var le, sf = Un(qt, 9, 0);
var af = Un(wi, 5, 0);
var Ra = function(a13) {
  return (a13 + 7) / 8 | 0;
}, Pa = function(a13, e, t) {
  return (e == null || e < 0) && (e = 0), (t == null || t > a13.length) && (t = a13.length), new Xe(a13.subarray(e, t));
};
var of = ["unexpected EOF", "invalid block type", "invalid length/literal", "invalid distance", "stream finished", "no stream handler", , "no callback", "invalid UTF-8 data", "extra field too long", "date not in range 1980-2099", "filename too long", "stream finishing", "invalid zip data"], Ti = function(a13, e, t) {
  var n = new Error(e || of[a13]);
  if (n.code = a13, Error.captureStackTrace && Error.captureStackTrace(n, Ti), !t) throw n;
  return n;
};
var wt = function(a13, e, t) {
  t <<= e & 7;
  var n = e / 8 | 0;
  a13[n] |= t, a13[n + 1] |= t >> 8;
}, Ln = function(a13, e, t) {
  t <<= e & 7;
  var n = e / 8 | 0;
  a13[n] |= t, a13[n + 1] |= t >> 8, a13[n + 2] |= t >> 16;
}, Yr = function(a13, e) {
  for (var t = [], n = 0; n < a13.length; ++n) a13[n] && t.push({ s: n, f: a13[n] });
  var i = t.length, r = t.slice();
  if (!i) return { t: La, l: 0 };
  if (i == 1) {
    var s = new Xe(t[0].s + 1);
    return s[t[0].s] = 1, { t: s, l: 1 };
  }
  t.sort(function(L, O) {
    return L.f - O.f;
  }), t.push({ s: -1, f: 25001 });
  var h = t[0], c = t[1], u = 0, f = 1, d = 2;
  for (t[0] = { s: -1, f: h.f + c.f, l: h, r: c }; f != i - 1; ) h = t[t[u].f < t[d].f ? u++ : d++], c = t[u != f && t[u].f < t[d].f ? u++ : d++], t[f++] = { s: -1, f: h.f + c.f, l: h, r: c };
  for (var v = r[0].s, n = 1; n < i; ++n) r[n].s > v && (v = r[n].s);
  var m = new it(v + 1), g = Kr(t[f - 1], m, 0);
  if (g > e) {
    var n = 0, _ = 0, b = g - e, A = 1 << b;
    for (r.sort(function(O, G) {
      return m[G.s] - m[O.s] || O.f - G.f;
    }); n < i; ++n) {
      var R = r[n].s;
      if (m[R] > e) _ += A - (1 << g - m[R]), m[R] = e;
      else break;
    }
    for (_ >>= b; _ > 0; ) {
      var F = r[n].s;
      m[F] < e ? _ -= 1 << e - m[F]++ - 1 : ++n;
    }
    for (; n >= 0 && _; --n) {
      var k = r[n].s;
      m[k] == e && (--m[k], ++_);
    }
    g = e;
  }
  return { t: new Xe(m), l: g };
}, Kr = function(a13, e, t) {
  return a13.s == -1 ? Math.max(Kr(a13.l, e, t + 1), Kr(a13.r, e, t + 1)) : e[a13.s] = t;
}, Sa = function(a13) {
  for (var e = a13.length; e && !a13[--e]; ) ;
  for (var t = new it(++e), n = 0, i = a13[0], r = 1, s = function(c) {
    t[n++] = c;
  }, h = 1; h <= e; ++h) if (a13[h] == i && h != e) ++r;
  else {
    if (!i && r > 2) {
      for (; r > 138; r -= 138) s(32754);
      r > 2 && (s(r > 10 ? r - 11 << 5 | 28690 : r - 3 << 5 | 12305), r = 0);
    } else if (r > 3) {
      for (s(i), --r; r > 6; r -= 6) s(8304);
      r > 2 && (s(r - 3 << 5 | 8208), r = 0);
    }
    for (; r--; ) s(i);
    r = 1, i = a13[h];
  }
  return { c: t.subarray(0, n), n: e };
}, Dn = function(a13, e) {
  for (var t = 0, n = 0; n < e.length; ++n) t += a13[n] * e[n];
  return t;
}, Ia = function(a13, e, t) {
  var n = t.length, i = Ra(e + 2);
  a13[i] = n & 255, a13[i + 1] = n >> 8, a13[i + 2] = a13[i] ^ 255, a13[i + 3] = a13[i + 1] ^ 255;
  for (var r = 0; r < n; ++r) a13[i + r + 4] = t[r];
  return (i + 4 + n) * 8;
}, Ma = function(a13, e, t, n, i, r, s, h, c, u, f) {
  wt(e, f++, t), ++i[256];
  for (var d = Yr(i, 15), v = d.t, m = d.l, g = Yr(r, 15), _ = g.t, b = g.l, A = Sa(v), R = A.c, F = A.n, k = Sa(_), L = k.c, O = k.n, G = new it(19), N = 0; N < R.length; ++N) ++G[R[N] & 31];
  for (var N = 0; N < L.length; ++N) ++G[L[N] & 31];
  for (var D = Yr(G, 7), V = D.t, $ = D.l, Y = 19; Y > 4 && !V[xa[Y - 1]]; --Y) ;
  var H = u + 5 << 3, K = Dn(i, qt) + Dn(r, wi) + s, W = Dn(i, v) + Dn(r, _) + s + 14 + 3 * Y + Dn(G, V) + 2 * G[16] + 3 * G[17] + 7 * G[18];
  if (c >= 0 && H <= K && H <= W) return Ia(e, f, a13.subarray(c, c + u));
  var ce, se, Z, de;
  if (wt(e, f, 1 + (W < K)), f += 2, W < K) {
    ce = Un(v, m, 0), se = v, Z = Un(_, b, 0), de = _;
    var qe = Un(V, $, 0);
    wt(e, f, F - 257), wt(e, f + 5, O - 1), wt(e, f + 10, Y - 4), f += 14;
    for (var N = 0; N < Y; ++N) wt(e, f + 3 * N, V[xa[N]]);
    f += 3 * Y;
    for (var be = [R, L], ft = 0; ft < 2; ++ft) for (var $e = be[ft], N = 0; N < $e.length; ++N) {
      var Le = $e[N] & 31;
      wt(e, f, qe[Le]), f += V[Le], Le > 15 && (wt(e, f, $e[N] >> 5 & 127), f += $e[N] >> 12);
    }
  } else ce = sf, se = qt, Z = af, de = wi;
  for (var N = 0; N < h; ++N) {
    var _e = n[N];
    if (_e > 255) {
      var Le = _e >> 18 & 31;
      Ln(e, f, ce[Le + 257]), f += se[Le + 257], Le > 7 && (wt(e, f, _e >> 23 & 31), f += es[Le]);
      var Oe = _e & 31;
      Ln(e, f, Z[Oe]), f += de[Oe], Oe > 3 && (Ln(e, f, _e >> 5 & 8191), f += ts[Oe]);
    } else Ln(e, f, ce[_e]), f += se[_e];
  }
  return Ln(e, f, ce[256]), f + se[256];
}, lf = new Qr([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]), La = new Xe(0), cf = function(a13, e, t, n, i, r) {
  var s = r.z || a13.length, h = new Xe(n + s + 5 * (1 + Math.ceil(s / 7e3)) + i), c = h.subarray(n, h.length - i), u = r.l, f = (r.r || 0) & 7;
  if (e) {
    f && (c[0] = r.r >> 3);
    for (var d = lf[e - 1], v = d >> 13, m = d & 8191, g = (1 << t) - 1, _ = r.p || new it(32768), b = r.h || new it(g + 1), A = Math.ceil(t / 3), R = 2 * A, F = function(he) {
      return (a13[he] ^ a13[he + 1] << A ^ a13[he + 2] << R) & g;
    }, k = new Qr(25e3), L = new it(288), O = new it(32), G = 0, N = 0, D = r.i || 0, V = 0, $ = r.w || 0, Y = 0; D + 2 < s; ++D) {
      var H = F(D), K = D & 32767, W = b[H];
      if (_[K] = W, b[H] = K, $ <= D) {
        var ce = s - D;
        if ((G > 7e3 || V > 24576) && (ce > 423 || !u)) {
          f = Ma(a13, c, 0, k, L, O, N, V, Y, D - Y, f), V = G = N = 0, Y = D;
          for (var se = 0; se < 286; ++se) L[se] = 0;
          for (var se = 0; se < 30; ++se) O[se] = 0;
        }
        var Z = 2, de = 0, qe = m, be = K - W & 32767;
        if (ce > 2 && H == F(D - be)) for (var ft = Math.min(v, ce) - 1, $e = Math.min(32767, D), Le = Math.min(258, ce); be <= $e && --qe && K != W; ) {
          if (a13[D + Z] == a13[D + Z - be]) {
            for (var _e = 0; _e < Le && a13[D + _e] == a13[D + _e - be]; ++_e) ;
            if (_e > Z) {
              if (Z = _e, de = be, _e > ft) break;
              for (var Oe = Math.min(be, _e - 2), ae = 0, se = 0; se < Oe; ++se) {
                var j = D - be + se & 32767, xe = _[j], we = j - xe & 32767;
                we > ae && (ae = we, W = j);
              }
            }
          }
          K = W, W = _[K], be += K - W & 32767;
        }
        if (de) {
          k[V++] = 268435456 | Zr[Z] << 18 | ya[de];
          var ye = Zr[Z] & 31, Ce = ya[de] & 31;
          N += es[ye] + ts[Ce], ++L[257 + ye], ++O[Ce], $ = D + Z, ++G;
        } else k[V++] = a13[D], ++L[a13[D]];
      }
    }
    for (D = Math.max(D, $); D < s; ++D) k[V++] = a13[D], ++L[a13[D]];
    f = Ma(a13, c, u, k, L, O, N, V, Y, D - Y, f), u || (r.r = f & 7 | c[f / 8 | 0] << 3, f -= 7, r.h = b, r.p = _, r.i = D, r.w = $);
  } else {
    for (var D = r.w || 0; D < s + u; D += 65535) {
      var Be = D + 65535;
      Be >= s && (c[f / 8 | 0] = u, Be = s), f = Ia(c, f + 1, a13.subarray(D, Be));
    }
    r.i = s;
  }
  return Pa(h, 0, n + Ra(f) + i);
}, hf = (function() {
  for (var a13 = new Int32Array(256), e = 0; e < 256; ++e) {
    for (var t = e, n = 9; --n; ) t = (t & 1 && -306674912) ^ t >>> 1;
    a13[e] = t;
  }
  return a13;
})(), uf = function() {
  var a13 = -1;
  return { p: function(e) {
    for (var t = a13, n = 0; n < e.length; ++n) t = hf[t & 255 ^ e[n]] ^ t >>> 8;
    a13 = t;
  }, d: function() {
    return ~a13;
  } };
};
var ff = function(a13, e, t, n, i) {
  if (!i && (i = { l: 1 }, e.dictionary)) {
    var r = e.dictionary.subarray(-32768), s = new Xe(r.length + a13.length);
    s.set(r), s.set(a13, r.length), a13 = s, i.w = r.length;
  }
  return cf(a13, e.level == null ? 6 : e.level, e.mem == null ? i.l ? Math.ceil(Math.max(8, Math.min(13, Math.log(a13.length))) * 1.5) : 20 : 12 + e.mem, t, n, i);
}, Da = function(a13, e) {
  var t = {};
  for (var n in a13) t[n] = a13[n];
  for (var n in e) t[n] = e[n];
  return t;
};
var He = function(a13, e, t) {
  for (; t; ++e) a13[e] = t, t >>>= 8;
};
function df(a13, e) {
  return ff(a13, e || {}, 0, 0);
}
var Ua = function(a13, e, t, n) {
  for (var i in a13) {
    var r = a13[i], s = e + i, h = n;
    Array.isArray(r) && (h = Da(n, r[1]), r = r[0]), ArrayBuffer.isView(r) ? t[s] = [r, h] : (t[s += "/"] = [new Xe(0), h], Ua(r, s, t, n));
  }
}, ba = typeof TextEncoder < "u" && new TextEncoder(), pf = typeof TextDecoder < "u" && new TextDecoder(), mf = 0;
try {
  pf.decode(La, { stream: true }), mf = 1;
} catch {
}
function wa(a13, e) {
  if (e) {
    for (var t = new Xe(a13.length), n = 0; n < a13.length; ++n) t[n] = a13.charCodeAt(n);
    return t;
  }
  if (ba) return ba.encode(a13);
  for (var i = a13.length, r = new Xe(a13.length + (a13.length >> 1)), s = 0, h = function(f) {
    r[s++] = f;
  }, n = 0; n < i; ++n) {
    if (s + 5 > r.length) {
      var c = new Xe(s + 8 + (i - n << 1));
      c.set(r), r = c;
    }
    var u = a13.charCodeAt(n);
    u < 128 || e ? h(u) : u < 2048 ? (h(192 | u >> 6), h(128 | u & 63)) : u > 55295 && u < 57344 ? (u = 65536 + (u & 1047552) | a13.charCodeAt(++n) & 1023, h(240 | u >> 18), h(128 | u >> 12 & 63), h(128 | u >> 6 & 63), h(128 | u & 63)) : (h(224 | u >> 12), h(128 | u >> 6 & 63), h(128 | u & 63));
  }
  return Pa(r, 0, s);
}
var jr = function(a13) {
  var e = 0;
  if (a13) for (var t in a13) {
    var n = a13[t].length;
    n > 65535 && Ti(9), e += n + 4;
  }
  return e;
}, Ta = function(a13, e, t, n, i, r, s, h) {
  var c = n.length, u = t.extra, f = h && h.length, d = jr(u);
  He(a13, e, s != null ? 33639248 : 67324752), e += 4, s != null && (a13[e++] = 20, a13[e++] = t.os), a13[e] = 20, e += 2, a13[e++] = t.flag << 1 | (r < 0 && 8), a13[e++] = i && 8, a13[e++] = t.compression & 255, a13[e++] = t.compression >> 8;
  var v = new Date(t.mtime == null ? Date.now() : t.mtime), m = v.getFullYear() - 1980;
  if ((m < 0 || m > 119) && Ti(10), He(a13, e, m << 25 | v.getMonth() + 1 << 21 | v.getDate() << 16 | v.getHours() << 11 | v.getMinutes() << 5 | v.getSeconds() >> 1), e += 4, r != -1 && (He(a13, e, t.crc), He(a13, e + 4, r < 0 ? -r - 2 : r), He(a13, e + 8, t.size)), He(a13, e + 12, c), He(a13, e + 14, d), e += 16, s != null && (He(a13, e, f), He(a13, e + 6, t.attrs), He(a13, e + 10, s), e += 14), a13.set(n, e), e += c, d) for (var g in u) {
    var _ = u[g], b = _.length;
    He(a13, e, +g), He(a13, e + 2, b), a13.set(_, e + 4), e += 4 + b;
  }
  return f && (a13.set(h, e), e += f), e;
}, gf = function(a13, e, t, n, i) {
  He(a13, e, 101010256), He(a13, e + 8, t), He(a13, e + 10, t), He(a13, e + 12, n), He(a13, e + 16, i);
};
function Na(a13, e) {
  e || (e = {});
  var t = {}, n = [];
  Ua(a13, "", t, e);
  var i = 0, r = 0;
  for (var s in t) {
    var h = t[s], c = h[0], u = h[1], f = u.level == 0 ? 0 : 8, d = wa(s), v = d.length, m = u.comment, g = m && wa(m), _ = g && g.length, b = jr(u.extra);
    v > 65535 && Ti(11);
    var A = f ? df(c, u) : c, R = A.length, F = uf();
    F.p(c), n.push(Da(u, { size: c.length, crc: F.d(), c: A, f: d, m: g, u: v != s.length || g && m.length != _, o: i, compression: f })), i += 30 + v + b + R, r += 76 + 2 * (v + b) + (_ || 0) + R;
  }
  for (var k = new Xe(r + 22), L = i, O = r - i, G = 0; G < n.length; ++G) {
    var d = n[G];
    Ta(k, d.o, d, d.f, d.u, d.c.length);
    var N = 30 + d.f.length + jr(d.extra);
    k.set(d.c, d.o + N), Ta(k, i, d, d.f, d.u, d.c.length, d.o, d.m), i += 16 + N + (d.m ? d.m.length : 0);
  }
  return gf(k, i, n.length, O, L), k;
}
var ns = "14.28.28", Fa = ["size", "mirror", "tolerance"], vf = { source: { parents: [], params: Fa }, outer: { parents: ["source"], params: ["outlineOffset", "mode", "stampExpansion"] }, inner: { parents: ["outer"], params: ["clearance", "cornerRadius", "wall"] }, blade: { parents: ["inner"], params: ["wall", "tip", "chamfer", "wallEdits"] }, rim: { parents: ["blade"], params: ["rim"] }, bladeSolid: { parents: ["blade"], params: ["base", "height", "rim", "chamferHeight", "bladeReinforcement", "reinforcementHeight", "reinforcementWidth"] }, art: { parents: ["source"], params: ["detailOffset", "removeOutline", "outlineBand", "stampInset", "mode", "outlineOffset"] }, footprint: { parents: ["outer"], params: ["stampInset", "stampExpansion"] }, cutter: { parents: ["rim", "bladeSolid"], params: ["base", "height", "chamferHeight", "bladeReinforcement", "reinforcementHeight", "reinforcementWidth", "logoEnabled", "logoText", "logoFont", "logoSize", "logoHeight", "logoBaseWidthExtra", "logoBaseWidth", "logoBaseDepth", "logoBaseGap", "logoPosition", "logoOffset", "logoOrientationMode", "logoRotationOffset", "logoRotationAbsolute", "logoBaseRotation", "logoTextRotation", "logoCentralAxis", "mode"] }, stamp: { parents: ["art", "footprint"], params: ["stampBase", "base", "relief", "reliefInverted", "mode"] }, integrated: { parents: ["cutter", "stamp"], params: ["base", "relief", "reliefInverted"] } };
function _f(a13, e) {
  let t = {};
  for (let [n, i] of Object.entries(vf)) {
    let r = new Set(i.params);
    for (let s of i.parents) for (let h of t[s].fields) r.add(h);
    if (n === "stamp" && e.mode !== "integrated") {
      r.clear();
      for (let s of [...Fa, "mode", "stampInset", "stampExpansion", "detailOffset", "removeOutline", "outlineBand", "stampBase", "relief", "reliefInverted", "reliefSeparate"]) r.add(s);
    }
    t[n] = { fields: [...r].sort() }, t[n].key = ns + ":" + a13 + ":" + n + ":" + JSON.stringify(t[n].fields.map((s) => [s, e[s]]));
  }
  return t;
}
function Oa(a13) {
  if (ArrayBuffer.isView(a13) || a13 instanceof ArrayBuffer) return a13.byteLength;
  if (typeof a13 == "string") return a13.length * 2;
  if (typeof a13 == "number") return 8;
  if (!a13 || typeof a13 != "object") return 4;
  let e = 48;
  for (let t of Object.values(a13)) e += Oa(t) + 8;
  return e;
}
var Ei = class {
  constructor(e = 48 * 1024 * 1024) {
    this.limit = e, this.bytes = 0, this.entries = /* @__PURE__ */ new Map(), this.hits = 0, this.misses = 0;
  }
  get(e) {
    let t = this.entries.get(e);
    if (!t) {
      this.misses++;
      return;
    }
    return this.entries.delete(e), this.entries.set(e, t), this.hits++, t.value;
  }
  set(e, t) {
    let n = Oa(t) + e.length * 2, i = this.entries.get(e);
    if (i && (this.bytes -= i.bytes, this.entries.delete(e)), n > this.limit) return t;
    for (; this.bytes + n > this.limit && this.entries.size; ) {
      let [r, s] = this.entries.entries().next().value;
      this.entries.delete(r), this.bytes -= s.bytes;
    }
    return this.entries.set(e, { bytes: n, value: t }), this.bytes += n, t;
  }
  clear() {
    this.entries.clear(), this.bytes = 0;
  }
  stats() {
    return { bytes: this.bytes, limit: this.limit, entries: this.entries.size, hits: this.hits, misses: this.misses };
  }
};
function Ba(a13, e, t, n = null) {
  let i = _f(e, t), r = [], s = [];
  return { keys: i, computed: r, reused: s, getSolid(h) {
    let c = n?.get(i[h].key);
    return c && s.push(h), c;
  }, setSolid(h, c) {
    r.push(h), n ? n.set(i[h].key, c) : c.delete();
  }, memo(h, c) {
    let u = i[h].key, f = a13.get(u);
    return f !== void 0 ? (s.push(h), f) : (r.push(h), a13.set(u, c()));
  }, get(h) {
    let c = a13.get(i[h].key);
    return c !== void 0 && s.push(h), c;
  }, set(h, c) {
    return r.push(h), a13.set(i[h].key, c);
  } };
}
var Ai = class {
  constructor(e = 24 * 1024 * 1024) {
    this.limit = e, this.bytes = 0, this.entries = /* @__PURE__ */ new Map();
  }
  get(e) {
    let t = this.entries.get(e);
    if (t) return this.entries.delete(e), this.entries.set(e, t), t.solid;
  }
  set(e, t) {
    let n;
    try {
      let r = t.getMesh();
      n = (r.vertProperties.byteLength + r.triVerts.byteLength) * 6;
    } catch (r) {
      throw t.delete(), r;
    }
    if (n > this.limit) {
      t.delete();
      return;
    }
    let i = this.entries.get(e);
    for (i && (i.solid.delete(), this.bytes -= i.bytes, this.entries.delete(e)); this.entries.size && (this.bytes + n > this.limit || this.entries.size >= 4); ) {
      let [r, s] = this.entries.entries().next().value;
      s.solid.delete(), this.bytes -= s.bytes, this.entries.delete(r);
    }
    this.entries.set(e, { solid: t, bytes: n }), this.bytes += n;
  }
  clear() {
    for (let e of this.entries.values()) e.solid.delete();
    this.entries.clear(), this.bytes = 0;
  }
};
var xf, is = 0, rs = new Ei(48 * 1024 * 1024), yf = new Ai(), rvLogoProfiles = /* @__PURE__ */ new Map();
function rvPreparedLogo(p) {
  if (!p.logoEnabled || p.mode === "stamp") return null;
  let key = JSON.stringify([p.logoText, p.logoFont, p.logoSize]);
  if (rvLogoProfiles.has(key)) {
    let val2 = rvLogoProfiles.get(key);
    return rvLogoProfiles.delete(key), rvLogoProfiles.set(key, val2), val2;
  }
  let val = rvLogoProfile(p.logoText, p.logoFont, p.logoSize, 10);
  for (; rvLogoProfiles.size >= 16; ) rvLogoProfiles.delete(rvLogoProfiles.keys().next().value);
  return rvLogoProfiles.set(key, val), val;
}
self.onmessage = async ({ data: a13 }) => {
  try {
    if (a13.action === "stl") {
      let h = new Uint8Array(pa(a13.mesh));
      self.postMessage({ id: a13.id, result: h }, [h.buffer]);
      return;
    }
    if (a13.action === "zip") {
      let h = Na(a13.files, { level: 3 });
      self.postMessage({ id: a13.id, result: h }, [h.buffer]);
      return;
    }
    if (a13.action === "trace") {
      self.postMessage({ id: a13.id, loops: ua(a13.pixels, a13.w, a13.h, a13.threshold) });
      return;
    }
    if (a13.action === "stats") {
      self.postMessage({ id: a13.id, result: { ...rs.stats(), completed: is } });
      return;
    }
    let e = await (xf ??= ha({ locateFile: () => new URL("manifold.wasm", self.location.href).href }));
    if (a13.action === "edit") {
      self.postMessage({ id: a13.id, loops: da(e, a13.loops, a13.op) });
      return;
    }
    if (a13.action === "svg") {
      let h = a13.shapes.map((u) => new e.CrossSection(u, "EvenOdd")), c;
      try {
        c = e.CrossSection.union(h), self.postMessage({ id: a13.id, loops: c.toPolygons() });
      } finally {
        c?.delete(), h.forEach((u) => u.delete());
      }
      return;
    }
    let t = qr(a13.params), n = a13.sourceHash || JSON.stringify(a13.loops), i = Ba(rs, n, t, yf), rvProfile = rvPreparedLogo(t), r = fa(e, a13.loops, t, i, { buildProfile: a13.buildProfile || "normal", logoProfile: rvProfile });
    is++;
    let s = va(structuredClone(r));
    s.calculation = { version: ns, displayVersion: aa, computed: i.computed, reused: i.reused, cache: rs.stats(), completed: is, buildProfile: r.buildProfile || a13.buildProfile || "normal", sourcePoints: r.sourcePoints || 0 }, self.postMessage({ id: a13.id, result: s }, _a(s));
  } catch (e) {
    self.postMessage({ id: a13.id, error: e.message });
  }
};
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/




