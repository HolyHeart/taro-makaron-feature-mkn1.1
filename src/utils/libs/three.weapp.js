import { atob, btoa } from '../base64'
let THREE = null

;(function (l, fa) {
  'object' === typeof exports && 'undefined' !== typeof module
    ? fa(exports)
    : 'function' === typeof define && define.amd
    ? define(['exports'], fa)
    : ((l = l || self), fa((l.THREE = {})))
})(this, function (l) {
  function fa() {}
  function fb(e, h) {
    if (!(e instanceof h))
      throw new TypeError('Cannot call a class as a function')
  }
  function Oh(e, h) {
    for (var a = 0; a < h.length; a++) {
      var b = h[a]
      b.enumerable = b.enumerable || !1
      b.configurable = !0
      'value' in b && (b.writable = !0)
      Object.defineProperty(e, b.key, b)
    }
  }
  function Ve(e, h, a) {
    h && Oh(e.prototype, h)
    a && Oh(e, a)
    return e
  }
  function Wb(e, h) {
    if ('function' !== typeof h && null !== h)
      throw new TypeError('Super expression must either be null or a function')
    e.prototype = Object.create(h && h.prototype, {
      constructor: { value: e, writable: !0, configurable: !0 },
    })
    h && mg(e, h)
  }
  function sb(e) {
    sb = Object.setPrototypeOf
      ? Object.getPrototypeOf
      : function (e) {
          return e.__proto__ || Object.getPrototypeOf(e)
        }
    return sb(e)
  }
  function mg(e, h) {
    mg =
      Object.setPrototypeOf ||
      function (a, b) {
        a.__proto__ = b
        return a
      }
    return mg(e, h)
  }
  function tb(e) {
    if (void 0 === e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      )
    return e
  }
  function Xb(e, h) {
    return !h || ('object' !== typeof h && 'function' !== typeof h) ? tb(e) : h
  }
  function ng(e) {
    if (Array.isArray(e)) {
      var h = 0
      for (var a = Array(e.length); h < e.length; h++) a[h] = e[h]
      h = a
    } else h = void 0
    h ||
      (h =
        Symbol.iterator in Object(e) ||
        '[object Arguments]' === Object.prototype.toString.call(e)
          ? Array.from(e)
          : void 0)
    if (!(e = h))
      throw new TypeError('Invalid attempt to spread non-iterable instance')
    return e
  }
  function Ph(e, h) {
    'parentNode' in e ||
      Object.defineProperty(e, 'parentNode', {
        enumerable: !0,
        get:
          0 === h
            ? function () {
                return null
              }
            : 1 === h
            ? function () {
                return V.documentElement
              }
            : function () {
                return V.body
              },
      })
    'parentElement' in e ||
      Object.defineProperty(e, 'parentElement', {
        enumerable: !0,
        get:
          0 === h
            ? function () {
                return null
              }
            : 1 === h
            ? function () {
                return V.documentElement
              }
            : function () {
                return V.body
              },
      })
  }
  function Nj(e) {
    'clientLeft' in e || ((e.clientLeft = 0), (e.clientTop = 0))
    'clientWidth' in e || ((e.clientWidth = Kc), (e.clientHeight = Lc))
    'getBoundingClientRect' in e ||
      (e.getBoundingClientRect = function () {
        var e = {
          x: 0,
          y: 0,
          top: 0,
          left: 0,
          width: this.clientWidth,
          height: this.clientHeight,
        }
        e.right = e.width
        e.bottom = e.height
        return e
      })
  }
  function Qh(e) {
    var h = function () {}
    e.classList = []
    e.classList.add = h
    e.classList.remove = h
    e.classList.contains = h
    e.classList.toggle = h
  }
  function og(e, h) {
    var a = !0,
      b = !1,
      c = void 0
    try {
      for (
        var d = Object.getOwnPropertyNames(h)[Symbol.iterator](), f;
        !(a = (f = d.next()).done);
        a = !0
      ) {
        var g = f.value
        if ('constructor' !== g && 'prototype' !== g && 'name' !== g) {
          var k = Object.getOwnPropertyDescriptor(h, g)
          Object.defineProperty(e, g, k)
        }
      }
    } catch (m) {
      ;(b = !0), (c = m)
    } finally {
      try {
        if (!a && null != d['return']) d['return']()
      } finally {
        if (b) throw c
      }
    }
  }
  function Rh() {
    var e = ra
    if (!e) throw Error('please register a canvas')
    e = e.createImage()
    'tagName' in e || (e.tagName = 'IMG')
    Ph(e)
    Qh(e)
    return e
  }
  function Sh(e) {
    return function () {
      V.visibilityState = e ? 'visible' : 'hidden'
      var h = !e
      V.hidden !== h &&
        ((V.hidden = h),
        (h = new pg('visibilitychange')),
        (h.target = V),
        (h.timeStamp = Date.now()),
        V.dispatchEvent(h))
    }
  }
  function Yb(e) {
    var h = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
    h.target = h.target || this
    'function' === typeof this['on'.concat(e)] &&
      this['on'.concat(e)].call(this, h)
  }
  function We(e) {
    var h = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : {}
    this.readyState = e
    h.readyState = e
    Yb.call(this, 'readystatechange', h)
  }
  function Th(e, h) {
    V.addEventListener(e, h)
  }
  function Uh(e, h) {
    V.removeEventListener(e, h)
  }
  function Ra() {}
  function z(e, h) {
    this.x = e || 0
    this.y = h || 0
  }
  function ya(e, h, a, b) {
    this._x = e || 0
    this._y = h || 0
    this._z = a || 0
    this._w = void 0 !== b ? b : 1
  }
  function q(e, h, a) {
    this.x = e || 0
    this.y = h || 0
    this.z = a || 0
  }
  function ka() {
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1]
    0 < arguments.length &&
      console.error(
        'THREE.Matrix3: the constructor no longer reads arguments. use .set() instead.',
      )
  }
  function S(e, h, a, b, c, d, f, g, k, m) {
    Object.defineProperty(this, 'id', { value: Oj++ })
    this.uuid = N.generateUUID()
    this.name = ''
    this.image = void 0 !== e ? e : S.DEFAULT_IMAGE
    this.mipmaps = []
    this.mapping = void 0 !== h ? h : S.DEFAULT_MAPPING
    this.wrapS = void 0 !== a ? a : 1001
    this.wrapT = void 0 !== b ? b : 1001
    this.magFilter = void 0 !== c ? c : 1006
    this.minFilter = void 0 !== d ? d : 1008
    this.anisotropy = void 0 !== k ? k : 1
    this.format = void 0 !== f ? f : 1023
    this.type = void 0 !== g ? g : 1009
    this.offset = new z(0, 0)
    this.repeat = new z(1, 1)
    this.center = new z(0, 0)
    this.rotation = 0
    this.matrixAutoUpdate = !0
    this.matrix = new ka()
    this.generateMipmaps = !0
    this.premultiplyAlpha = !1
    this.flipY = !0
    this.unpackAlignment = 4
    this.encoding = void 0 !== m ? m : 3e3
    this.version = 0
    this.onUpdate = null
  }
  function ca(e, h, a, b) {
    this.x = e || 0
    this.y = h || 0
    this.z = a || 0
    this.w = void 0 !== b ? b : 1
  }
  function sa(e, h, a) {
    this.width = e
    this.height = h
    this.scissor = new ca(0, 0, e, h)
    this.scissorTest = !1
    this.viewport = new ca(0, 0, e, h)
    a = a || {}
    this.texture = new S(
      void 0,
      void 0,
      a.wrapS,
      a.wrapT,
      a.magFilter,
      a.minFilter,
      a.format,
      a.type,
      a.anisotropy,
      a.encoding,
    )
    this.texture.image = {}
    this.texture.image.width = e
    this.texture.image.height = h
    this.texture.generateMipmaps =
      void 0 !== a.generateMipmaps ? a.generateMipmaps : !1
    this.texture.minFilter = void 0 !== a.minFilter ? a.minFilter : 1006
    this.depthBuffer = void 0 !== a.depthBuffer ? a.depthBuffer : !0
    this.stencilBuffer = void 0 !== a.stencilBuffer ? a.stencilBuffer : !0
    this.depthTexture = void 0 !== a.depthTexture ? a.depthTexture : null
  }
  function qg(e, h, a) {
    sa.call(this, e, h, a)
    this.samples = 4
  }
  function I() {
    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]
    0 < arguments.length &&
      console.error(
        'THREE.Matrix4: the constructor no longer reads arguments. use .set() instead.',
      )
  }
  function Zb(e, h, a, b) {
    this._x = e || 0
    this._y = h || 0
    this._z = a || 0
    this._order = b || Zb.DefaultOrder
  }
  function rg() {
    this.mask = 1
  }
  function E() {
    Object.defineProperty(this, 'id', { value: Pj++ })
    this.uuid = N.generateUUID()
    this.name = ''
    this.type = 'Object3D'
    this.parent = null
    this.children = []
    this.up = E.DefaultUp.clone()
    var e = new q(),
      h = new Zb(),
      a = new ya(),
      b = new q(1, 1, 1)
    h._onChange(function () {
      a.setFromEuler(h, !1)
    })
    a._onChange(function () {
      h.setFromQuaternion(a, void 0, !1)
    })
    Object.defineProperties(this, {
      position: { configurable: !0, enumerable: !0, value: e },
      rotation: { configurable: !0, enumerable: !0, value: h },
      quaternion: { configurable: !0, enumerable: !0, value: a },
      scale: { configurable: !0, enumerable: !0, value: b },
      modelViewMatrix: { value: new I() },
      normalMatrix: { value: new ka() },
    })
    this.matrix = new I()
    this.matrixWorld = new I()
    this.matrixAutoUpdate = E.DefaultMatrixAutoUpdate
    this.matrixWorldNeedsUpdate = !1
    this.layers = new rg()
    this.visible = !0
    this.receiveShadow = this.castShadow = !1
    this.frustumCulled = !0
    this.renderOrder = 0
    this.userData = {}
  }
  function Kd() {
    E.call(this)
    this.type = 'Scene'
    this.overrideMaterial = this.fog = this.background = null
    this.autoUpdate = !0
    'undefined' !== typeof __THREE_DEVTOOLS__ &&
      __THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent('observe', { detail: this }),
      )
  }
  function gb(e, h) {
    this.min = void 0 !== e ? e : new q(Infinity, Infinity, Infinity)
    this.max = void 0 !== h ? h : new q(-Infinity, -Infinity, -Infinity)
  }
  function sg(e, h, a, b, c) {
    var d
    var f = 0
    for (d = e.length - 3; f <= d; f += 3) {
      $b.fromArray(e, f)
      var g =
          c.x * Math.abs($b.x) + c.y * Math.abs($b.y) + c.z * Math.abs($b.z),
        k = h.dot($b),
        m = a.dot($b),
        n = b.dot($b)
      if (Math.max(-Math.max(k, m, n), Math.min(k, m, n)) > g) return !1
    }
    return !0
  }
  function ub(e, h) {
    this.center = void 0 !== e ? e : new q()
    this.radius = void 0 !== h ? h : 0
  }
  function ac(e, h) {
    this.origin = void 0 !== e ? e : new q()
    this.direction = void 0 !== h ? h : new q()
  }
  function Sa(e, h) {
    this.normal = void 0 !== e ? e : new q(1, 0, 0)
    this.constant = void 0 !== h ? h : 0
  }
  function va(e, h, a) {
    this.a = void 0 !== e ? e : new q()
    this.b = void 0 !== h ? h : new q()
    this.c = void 0 !== a ? a : new q()
  }
  function D(e, h, a) {
    return void 0 === h && void 0 === a ? this.set(e) : this.setRGB(e, h, a)
  }
  function tg(e, h, a) {
    0 > a && (a += 1)
    1 < a && --a
    return a < 1 / 6
      ? e + 6 * (h - e) * a
      : 0.5 > a
      ? h
      : a < 2 / 3
      ? e + 6 * (h - e) * (2 / 3 - a)
      : e
  }
  function ug(e) {
    return 0.04045 > e
      ? 0.0773993808 * e
      : Math.pow(0.9478672986 * e + 0.0521327014, 2.4)
  }
  function vg(e) {
    return 0.0031308 > e ? 12.92 * e : 1.055 * Math.pow(e, 0.41666) - 0.055
  }
  function Mc(e, h, a, b, c, d) {
    this.a = e
    this.b = h
    this.c = a
    this.normal = b && b.isVector3 ? b : new q()
    this.vertexNormals = Array.isArray(b) ? b : []
    this.color = c && c.isColor ? c : new D()
    this.vertexColors = Array.isArray(c) ? c : []
    this.materialIndex = void 0 !== d ? d : 0
  }
  function R() {
    Object.defineProperty(this, 'id', { value: Qj++ })
    this.uuid = N.generateUUID()
    this.name = ''
    this.type = 'Material'
    this.fog = !0
    this.blending = 1
    this.side = 0
    this.vertexTangents = this.flatShading = !1
    this.vertexColors = 0
    this.opacity = 1
    this.transparent = !1
    this.blendSrc = 204
    this.blendDst = 205
    this.blendEquation = 100
    this.blendEquationAlpha = this.blendDstAlpha = this.blendSrcAlpha = null
    this.depthFunc = 3
    this.depthWrite = this.depthTest = !0
    this.stencilWriteMask = 255
    this.stencilFunc = 519
    this.stencilRef = 0
    this.stencilFuncMask = 255
    this.stencilZPass = this.stencilZFail = this.stencilFail = 7680
    this.stencilWrite = !1
    this.clippingPlanes = null
    this.clipShadows = this.clipIntersection = !1
    this.shadowSide = null
    this.colorWrite = !0
    this.precision = null
    this.polygonOffset = !1
    this.polygonOffsetUnits = this.polygonOffsetFactor = 0
    this.dithering = !1
    this.alphaTest = 0
    this.premultipliedAlpha = !1
    this.toneMapped = this.visible = !0
    this.userData = {}
    this.needsUpdate = !0
  }
  function Ia(e) {
    R.call(this)
    this.type = 'MeshBasicMaterial'
    this.color = new D(16777215)
    this.lightMap = this.map = null
    this.lightMapIntensity = 1
    this.aoMap = null
    this.aoMapIntensity = 1
    this.envMap = this.alphaMap = this.specularMap = null
    this.combine = 0
    this.reflectivity = 1
    this.refractionRatio = 0.98
    this.wireframe = !1
    this.wireframeLinewidth = 1
    this.wireframeLinejoin = this.wireframeLinecap = 'round'
    this.morphTargets = this.skinning = !1
    this.setValues(e)
  }
  function O(e, h, a) {
    if (Array.isArray(e))
      throw new TypeError(
        'THREE.BufferAttribute: array should be a Typed Array.',
      )
    this.name = ''
    this.array = e
    this.itemSize = h
    this.count = void 0 !== e ? e.length / h : 0
    this.normalized = !0 === a
    this.usage = 35044
    this.updateRange = { offset: 0, count: -1 }
    this.version = 0
  }
  function Ld(e, h, a) {
    O.call(this, new Int8Array(e), h, a)
  }
  function Md(e, h, a) {
    O.call(this, new Uint8Array(e), h, a)
  }
  function Nd(e, h, a) {
    O.call(this, new Uint8ClampedArray(e), h, a)
  }
  function Od(e, h, a) {
    O.call(this, new Int16Array(e), h, a)
  }
  function bc(e, h, a) {
    O.call(this, new Uint16Array(e), h, a)
  }
  function Pd(e, h, a) {
    O.call(this, new Int32Array(e), h, a)
  }
  function cc(e, h, a) {
    O.call(this, new Uint32Array(e), h, a)
  }
  function F(e, h, a) {
    O.call(this, new Float32Array(e), h, a)
  }
  function Qd(e, h, a) {
    O.call(this, new Float64Array(e), h, a)
  }
  function Vh() {
    this.vertices = []
    this.normals = []
    this.colors = []
    this.uvs = []
    this.uvs2 = []
    this.groups = []
    this.morphTargets = {}
    this.skinWeights = []
    this.skinIndices = []
    this.boundingSphere = this.boundingBox = null
    this.groupsNeedUpdate = this.uvsNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.verticesNeedUpdate = !1
  }
  function Wh(e) {
    if (0 === e.length) return -Infinity
    for (var h = e[0], a = 1, b = e.length; a < b; ++a) e[a] > h && (h = e[a])
    return h
  }
  function G() {
    Object.defineProperty(this, 'id', { value: (Rj += 2) })
    this.uuid = N.generateUUID()
    this.name = ''
    this.type = 'BufferGeometry'
    this.index = null
    this.attributes = {}
    this.morphAttributes = {}
    this.groups = []
    this.boundingSphere = this.boundingBox = null
    this.drawRange = { start: 0, count: Infinity }
    this.userData = {}
  }
  function ia(e, h) {
    E.call(this)
    this.type = 'Mesh'
    this.geometry = void 0 !== e ? e : new G()
    this.material =
      void 0 !== h ? h : new Ia({ color: 16777215 * Math.random() })
    this.drawMode = 0
    this.updateMorphTargets()
  }
  function Xh(e, h, a, b, c, d, f, g) {
    if (
      null ===
      (1 === h.side
        ? b.intersectTriangle(f, d, c, !0, g)
        : b.intersectTriangle(c, d, f, 2 !== h.side, g))
    )
      return null
    Xe.copy(g)
    Xe.applyMatrix4(e.matrixWorld)
    h = a.ray.origin.distanceTo(Xe)
    return h < a.near || h > a.far
      ? null
      : { distance: h, point: Xe.clone(), object: e }
  }
  function Ye(e, h, a, b, c, d, f, g, k, m, n) {
    dc.fromBufferAttribute(c, k)
    ec.fromBufferAttribute(c, m)
    fc.fromBufferAttribute(c, n)
    c = e.morphTargetInfluences
    if (h.morphTargets && d && c) {
      wg.set(0, 0, 0)
      xg.set(0, 0, 0)
      yg.set(0, 0, 0)
      for (var p = 0, y = d.length; p < y; p++) {
        var t = c[p],
          r = d[p]
        0 !== t &&
          (Yh.fromBufferAttribute(r, k),
          Zh.fromBufferAttribute(r, m),
          $h.fromBufferAttribute(r, n),
          wg.addScaledVector(Yh.sub(dc), t),
          xg.addScaledVector(Zh.sub(ec), t),
          yg.addScaledVector($h.sub(fc), t))
      }
      dc.add(wg)
      ec.add(xg)
      fc.add(yg)
    }
    if ((e = Xh(e, h, a, b, dc, ec, fc, Rd)))
      f &&
        (Nc.fromBufferAttribute(f, k),
        Oc.fromBufferAttribute(f, m),
        Pc.fromBufferAttribute(f, n),
        (e.uv = va.getUV(Rd, dc, ec, fc, Nc, Oc, Pc, new z()))),
        g &&
          (Nc.fromBufferAttribute(g, k),
          Oc.fromBufferAttribute(g, m),
          Pc.fromBufferAttribute(g, n),
          (e.uv2 = va.getUV(Rd, dc, ec, fc, Nc, Oc, Pc, new z()))),
        (f = new Mc(k, m, n)),
        va.getNormal(dc, ec, fc, f.normal),
        (e.face = f)
    return e
  }
  function P() {
    Object.defineProperty(this, 'id', { value: (Sj += 2) })
    this.uuid = N.generateUUID()
    this.name = ''
    this.type = 'Geometry'
    this.vertices = []
    this.colors = []
    this.faces = []
    this.faceVertexUvs = [[]]
    this.morphTargets = []
    this.morphNormals = []
    this.skinWeights = []
    this.skinIndices = []
    this.lineDistances = []
    this.boundingSphere = this.boundingBox = null
    this.groupsNeedUpdate = this.lineDistancesNeedUpdate = this.colorsNeedUpdate = this.normalsNeedUpdate = this.uvsNeedUpdate = this.verticesNeedUpdate = this.elementsNeedUpdate = !1
  }
  function gc(e) {
    var h = {},
      a
    for (a in e) {
      h[a] = {}
      for (var b in e[a]) {
        var c = e[a][b]
        c &&
        (c.isColor ||
          c.isMatrix3 ||
          c.isMatrix4 ||
          c.isVector2 ||
          c.isVector3 ||
          c.isVector4 ||
          c.isTexture)
          ? (h[a][b] = c.clone())
          : Array.isArray(c)
          ? (h[a][b] = c.slice())
          : (h[a][b] = c)
      }
    }
    return h
  }
  function za(e) {
    for (var h = {}, a = 0; a < e.length; a++) {
      var b = gc(e[a]),
        c
      for (c in b) h[c] = b[c]
    }
    return h
  }
  function Aa(e) {
    R.call(this)
    this.type = 'ShaderMaterial'
    this.defines = {}
    this.uniforms = {}
    this.vertexShader =
      'void main() {\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}'
    this.fragmentShader =
      'void main() {\n\tgl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );\n}'
    this.linewidth = 1
    this.wireframe = !1
    this.wireframeLinewidth = 1
    this.morphNormals = this.morphTargets = this.skinning = this.clipping = this.lights = this.fog = !1
    this.extensions = {
      derivatives: !1,
      fragDepth: !1,
      drawBuffers: !1,
      shaderTextureLOD: !1,
    }
    this.defaultAttributeValues = { color: [1, 1, 1], uv: [0, 0], uv2: [0, 0] }
    this.index0AttributeName = void 0
    this.uniformsNeedUpdate = !1
    void 0 !== e &&
      (void 0 !== e.attributes &&
        console.error(
          'THREE.ShaderMaterial: attributes should now be defined in THREE.BufferGeometry instead.',
        ),
      this.setValues(e))
  }
  function hb() {
    E.call(this)
    this.type = 'Camera'
    this.matrixWorldInverse = new I()
    this.projectionMatrix = new I()
    this.projectionMatrixInverse = new I()
  }
  function na(e, h, a, b) {
    hb.call(this)
    this.type = 'PerspectiveCamera'
    this.fov = void 0 !== e ? e : 50
    this.zoom = 1
    this.near = void 0 !== a ? a : 0.1
    this.far = void 0 !== b ? b : 2e3
    this.focus = 10
    this.aspect = void 0 !== h ? h : 1
    this.view = null
    this.filmGauge = 35
    this.filmOffset = 0
    this.updateProjectionMatrix()
  }
  function Qc(e, h, a, b) {
    E.call(this)
    this.type = 'CubeCamera'
    var c = new na(90, 1, e, h)
    c.up.set(0, -1, 0)
    c.lookAt(new q(1, 0, 0))
    this.add(c)
    var d = new na(90, 1, e, h)
    d.up.set(0, -1, 0)
    d.lookAt(new q(-1, 0, 0))
    this.add(d)
    var f = new na(90, 1, e, h)
    f.up.set(0, 0, 1)
    f.lookAt(new q(0, 1, 0))
    this.add(f)
    var g = new na(90, 1, e, h)
    g.up.set(0, 0, -1)
    g.lookAt(new q(0, -1, 0))
    this.add(g)
    var k = new na(90, 1, e, h)
    k.up.set(0, -1, 0)
    k.lookAt(new q(0, 0, 1))
    this.add(k)
    var m = new na(90, 1, e, h)
    m.up.set(0, -1, 0)
    m.lookAt(new q(0, 0, -1))
    this.add(m)
    b = b || { format: 1022, magFilter: 1006, minFilter: 1006 }
    this.renderTarget = new Ib(a, a, b)
    this.renderTarget.texture.name = 'CubeCamera'
    this.update = function (a, b) {
      null === this.parent && this.updateMatrixWorld()
      var e = a.getRenderTarget(),
        h = this.renderTarget,
        n = h.texture.generateMipmaps
      h.texture.generateMipmaps = !1
      a.setRenderTarget(h, 0)
      a.render(b, c)
      a.setRenderTarget(h, 1)
      a.render(b, d)
      a.setRenderTarget(h, 2)
      a.render(b, f)
      a.setRenderTarget(h, 3)
      a.render(b, g)
      a.setRenderTarget(h, 4)
      a.render(b, k)
      h.texture.generateMipmaps = n
      a.setRenderTarget(h, 5)
      a.render(b, m)
      a.setRenderTarget(e)
    }
    this.clear = function (a, b, c, d) {
      for (
        var e = a.getRenderTarget(), f = this.renderTarget, g = 0;
        6 > g;
        g++
      )
        a.setRenderTarget(f, g), a.clear(b, c, d)
      a.setRenderTarget(e)
    }
  }
  function Ib(e, h, a) {
    sa.call(this, e, h, a)
  }
  function hc(e, h, a, b, c, d, f, g, k, m, n, p) {
    S.call(this, null, d, f, g, k, m, b, c, n, p)
    this.image = { data: e || null, width: h || 1, height: a || 1 }
    this.magFilter = void 0 !== k ? k : 1003
    this.minFilter = void 0 !== m ? m : 1003
    this.flipY = this.generateMipmaps = !1
    this.unpackAlignment = 1
    this.needsUpdate = !0
  }
  function Sd(e, h, a, b, c, d) {
    this.planes = [
      void 0 !== e ? e : new Sa(),
      void 0 !== h ? h : new Sa(),
      void 0 !== a ? a : new Sa(),
      void 0 !== b ? b : new Sa(),
      void 0 !== c ? c : new Sa(),
      void 0 !== d ? d : new Sa(),
    ]
  }
  function zg() {
    function e(c, d) {
      !1 !== a && (b(c, d), h.requestAnimationFrame(e))
    }
    var h = null,
      a = !1,
      b = null
    return {
      start: function () {
        !0 !== a && null !== b && (h.requestAnimationFrame(e), (a = !0))
      },
      stop: function () {
        a = !1
      },
      setAnimationLoop: function (a) {
        b = a
      },
      setContext: function (a) {
        h = a
      },
    }
  }
  function Tj(e) {
    function h(a, c) {
      var b = a.array,
        f = a.usage,
        g = e.createBuffer()
      e.bindBuffer(c, g)
      e.bufferData(c, b, f)
      a.onUploadCallback()
      c = 5126
      b instanceof Float32Array
        ? (c = 5126)
        : b instanceof Float64Array
        ? console.warn(
            'THREE.WebGLAttributes: Unsupported data buffer format: Float64Array.',
          )
        : b instanceof Uint16Array
        ? (c = 5123)
        : b instanceof Int16Array
        ? (c = 5122)
        : b instanceof Uint32Array
        ? (c = 5125)
        : b instanceof Int32Array
        ? (c = 5124)
        : b instanceof Int8Array
        ? (c = 5120)
        : b instanceof Uint8Array && (c = 5121)
      return {
        buffer: g,
        type: c,
        bytesPerElement: b.BYTES_PER_ELEMENT,
        version: a.version,
      }
    }
    var a = new WeakMap()
    return {
      get: function (b) {
        b.isInterleavedBufferAttribute && (b = b.data)
        return a.get(b)
      },
      remove: function (b) {
        b.isInterleavedBufferAttribute && (b = b.data)
        var c = a.get(b)
        c && (e.deleteBuffer(c.buffer), a.delete(b))
      },
      update: function (b, c) {
        b.isInterleavedBufferAttribute && (b = b.data)
        var d = a.get(b)
        if (void 0 === d) a.set(b, h(b, c))
        else if (d.version < b.version) {
          var f = b.array,
            g = b.updateRange
          e.bindBuffer(c, d.buffer)
          ;-1 === g.count
            ? e.bufferSubData(c, 0, f)
            : (e.bufferSubData(
                c,
                g.offset * f.BYTES_PER_ELEMENT,
                f.subarray(g.offset, g.offset + g.count),
              ),
              (g.count = -1))
          d.version = b.version
        }
      },
    }
  }
  function Td(e, h, a, b) {
    P.call(this)
    this.type = 'PlaneGeometry'
    this.parameters = {
      width: e,
      height: h,
      widthSegments: a,
      heightSegments: b,
    }
    this.fromBufferGeometry(new ic(e, h, a, b))
    this.mergeVertices()
  }
  function ic(e, h, a, b) {
    G.call(this)
    this.type = 'PlaneBufferGeometry'
    this.parameters = {
      width: e,
      height: h,
      widthSegments: a,
      heightSegments: b,
    }
    e = e || 1
    h = h || 1
    var c = e / 2,
      d = h / 2
    a = Math.floor(a) || 1
    b = Math.floor(b) || 1
    var f = a + 1,
      g = b + 1,
      k = e / a,
      m = h / b,
      n = [],
      p = [],
      y = [],
      t = []
    for (e = 0; e < g; e++) {
      var r = e * m - d
      for (h = 0; h < f; h++)
        p.push(h * k - c, -r, 0),
          y.push(0, 0, 1),
          t.push(h / a),
          t.push(1 - e / b)
    }
    for (e = 0; e < b; e++)
      for (h = 0; h < a; h++)
        (c = h + f * (e + 1)),
          (d = h + 1 + f * (e + 1)),
          (g = h + 1 + f * e),
          n.push(h + f * e, c, g),
          n.push(c, d, g)
    this.setIndex(n)
    this.setAttribute('position', new F(p, 3))
    this.setAttribute('normal', new F(y, 3))
    this.setAttribute('uv', new F(t, 2))
  }
  function Uj(e, h, a, b) {
    function c(a, c) {
      h.buffers.color.setClear(a.r, a.g, a.b, c, b)
    }
    var d = new D(0),
      f = 0,
      g,
      k,
      m = null,
      n = 0
    return {
      getClearColor: function () {
        return d
      },
      setClearColor: function (a, b) {
        d.set(a)
        f = void 0 !== b ? b : 1
        c(d, f)
      },
      getClearAlpha: function () {
        return f
      },
      setClearAlpha: function (a) {
        f = a
        c(d, f)
      },
      render: function (b, h, t, r) {
        h = h.background
        t = e.vr
        ;(t = t.getSession && t.getSession()) &&
          'additive' === t.environmentBlendMode &&
          (h = null)
        null === h
          ? (c(d, f), (m = null), (n = 0))
          : h && h.isColor && (c(h, 1), (r = !0), (m = null), (n = 0))
        ;(e.autoClear || r) &&
          e.clear(e.autoClearColor, e.autoClearDepth, e.autoClearStencil)
        if (h && (h.isCubeTexture || h.isWebGLRenderTargetCube)) {
          void 0 === k &&
            ((k = new ia(
              new Ud(1, 1, 1),
              new Aa({
                type: 'BackgroundCubeMaterial',
                uniforms: gc(ib.cube.uniforms),
                vertexShader: ib.cube.vertexShader,
                fragmentShader: ib.cube.fragmentShader,
                side: 1,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
              }),
            )),
            k.geometry.deleteAttribute('normal'),
            k.geometry.deleteAttribute('uv'),
            (k.onBeforeRender = function (a, b, c) {
              this.matrixWorld.copyPosition(c.matrixWorld)
            }),
            Object.defineProperty(k.material, 'map', {
              get: function () {
                return this.uniforms.tCube.value
              },
            }),
            a.update(k))
          r = h.isWebGLRenderTargetCube ? h.texture : h
          k.material.uniforms.tCube.value = r
          k.material.uniforms.tFlip.value = h.isWebGLRenderTargetCube ? 1 : -1
          if (m !== h || n !== r.version)
            (k.material.needsUpdate = !0), (m = h), (n = r.version)
          b.unshift(k, k.geometry, k.material, 0, 0, null)
        } else if (h && h.isTexture) {
          void 0 === g &&
            ((g = new ia(
              new ic(2, 2),
              new Aa({
                type: 'BackgroundMaterial',
                uniforms: gc(ib.background.uniforms),
                vertexShader: ib.background.vertexShader,
                fragmentShader: ib.background.fragmentShader,
                side: 0,
                depthTest: !1,
                depthWrite: !1,
                fog: !1,
              }),
            )),
            g.geometry.deleteAttribute('normal'),
            Object.defineProperty(g.material, 'map', {
              get: function () {
                return this.uniforms.t2D.value
              },
            }),
            a.update(g))
          g.material.uniforms.t2D.value = h
          !0 === h.matrixAutoUpdate && h.updateMatrix()
          g.material.uniforms.uvTransform.value.copy(h.matrix)
          if (m !== h || n !== h.version)
            (g.material.needsUpdate = !0), (m = h), (n = h.version)
          b.unshift(g, g.geometry, g.material, 0, 0, null)
        }
      },
    }
  }
  function Vj(e, h, a, b) {
    var c = b.isWebGL2,
      d
    this.setMode = function (a) {
      d = a
    }
    this.render = function (b, c) {
      e.drawArrays(d, b, c)
      a.update(c, d)
    }
    this.renderInstances = function (b, g, k, m) {
      if (0 !== m) {
        if (c) {
          b = e
          var f = 'drawArraysInstanced'
        } else if (
          ((b = h.get('ANGLE_instanced_arrays')),
          (f = 'drawArraysInstancedANGLE'),
          null === b)
        ) {
          console.error(
            'THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.',
          )
          return
        }
        b[f](d, g, k, m)
        a.update(k, d, m)
      }
    }
  }
  function Wj(e, h, a) {
    function b(a) {
      if ('highp' === a) {
        if (
          0 < e.getShaderPrecisionFormat(35633, 36338).precision &&
          0 < e.getShaderPrecisionFormat(35632, 36338).precision
        )
          return 'highp'
        a = 'mediump'
      }
      return 'mediump' === a &&
        0 < e.getShaderPrecisionFormat(35633, 36337).precision &&
        0 < e.getShaderPrecisionFormat(35632, 36337).precision
        ? 'mediump'
        : 'lowp'
    }
    var c,
      d =
        ('undefined' !== typeof WebGL2RenderingContext &&
          e instanceof WebGL2RenderingContext) ||
        ('undefined' !== typeof WebGL2ComputeRenderingContext &&
          e instanceof WebGL2ComputeRenderingContext),
      f = void 0 !== a.precision ? a.precision : 'highp',
      g = b(f)
    g !== f &&
      (console.warn(
        'THREE.WebGLRenderer:',
        f,
        'not supported, using',
        g,
        'instead.',
      ),
      (f = g))
    a = !0 === a.logarithmicDepthBuffer
    g = e.getParameter(34930)
    var k = e.getParameter(35660),
      m = e.getParameter(3379),
      n = e.getParameter(34076),
      p = e.getParameter(34921),
      y = e.getParameter(36347),
      t = e.getParameter(36348),
      r = e.getParameter(36349),
      l = 0 < k,
      v = d || !!h.get('OES_texture_float'),
      q = l && v,
      x = d ? e.getParameter(36183) : 0
    return {
      isWebGL2: d,
      getMaxAnisotropy: function () {
        if (void 0 !== c) return c
        var a = h.get('EXT_texture_filter_anisotropic')
        return (c =
          null !== a ? e.getParameter(a.MAX_TEXTURE_MAX_ANISOTROPY_EXT) : 0)
      },
      getMaxPrecision: b,
      precision: f,
      logarithmicDepthBuffer: a,
      maxTextures: g,
      maxVertexTextures: k,
      maxTextureSize: m,
      maxCubemapSize: n,
      maxAttributes: p,
      maxVertexUniforms: y,
      maxVaryings: t,
      maxFragmentUniforms: r,
      vertexTextures: l,
      floatFragmentTextures: v,
      floatVertexTextures: q,
      maxSamples: x,
    }
  }
  function Xj() {
    function e() {
      m.value !== b && ((m.value = b), (m.needsUpdate = 0 < c))
      a.numPlanes = c
      a.numIntersection = 0
    }
    function h(b, c, d, e) {
      var f = null !== b ? b.length : 0,
        h = null
      if (0 !== f) {
        h = m.value
        if (!0 !== e || null === h) {
          e = d + 4 * f
          c = c.matrixWorldInverse
          k.getNormalMatrix(c)
          if (null === h || h.length < e) h = new Float32Array(e)
          for (e = 0; e !== f; ++e, d += 4)
            g.copy(b[e]).applyMatrix4(c, k),
              g.normal.toArray(h, d),
              (h[d + 3] = g.constant)
        }
        m.value = h
        m.needsUpdate = !0
      }
      a.numPlanes = f
      return h
    }
    var a = this,
      b = null,
      c = 0,
      d = !1,
      f = !1,
      g = new Sa(),
      k = new ka(),
      m = { value: null, needsUpdate: !1 }
    this.uniform = m
    this.numIntersection = this.numPlanes = 0
    this.init = function (a, e, f) {
      var g = 0 !== a.length || e || 0 !== c || d
      d = e
      b = h(a, f, 0)
      c = a.length
      return g
    }
    this.beginShadows = function () {
      f = !0
      h(null)
    }
    this.endShadows = function () {
      f = !1
      e()
    }
    this.setState = function (a, g, k, t, r, l) {
      if (!d || null === a || 0 === a.length || (f && !k)) f ? h(null) : e()
      else {
        k = f ? 0 : c
        var n = 4 * k,
          p = r.clippingState || null
        m.value = p
        p = h(a, t, n, l)
        for (a = 0; a !== n; ++a) p[a] = b[a]
        r.clippingState = p
        this.numIntersection = g ? this.numPlanes : 0
        this.numPlanes += k
      }
    }
  }
  function Yj(e) {
    var h = {}
    return {
      get: function (a) {
        if (void 0 !== h[a]) return h[a]
        switch (a) {
          case 'WEBGL_depth_texture':
            var b =
              e.getExtension('WEBGL_depth_texture') ||
              e.getExtension('MOZ_WEBGL_depth_texture') ||
              e.getExtension('WEBKIT_WEBGL_depth_texture')
            break
          case 'EXT_texture_filter_anisotropic':
            b =
              e.getExtension('EXT_texture_filter_anisotropic') ||
              e.getExtension('MOZ_EXT_texture_filter_anisotropic') ||
              e.getExtension('WEBKIT_EXT_texture_filter_anisotropic')
            break
          case 'WEBGL_compressed_texture_s3tc':
            b =
              e.getExtension('WEBGL_compressed_texture_s3tc') ||
              e.getExtension('MOZ_WEBGL_compressed_texture_s3tc') ||
              e.getExtension('WEBKIT_WEBGL_compressed_texture_s3tc')
            break
          case 'WEBGL_compressed_texture_pvrtc':
            b =
              e.getExtension('WEBGL_compressed_texture_pvrtc') ||
              e.getExtension('WEBKIT_WEBGL_compressed_texture_pvrtc')
            break
          default:
            b = e.getExtension(a)
        }
        null === b &&
          console.warn(
            'THREE.WebGLRenderer: ' + a + ' extension not supported.',
          )
        return (h[a] = b)
      },
    }
  }
  function Zj(e, h, a) {
    function b(c) {
      var e = c.target
      c = d.get(e)
      null !== c.index && h.remove(c.index)
      for (var g in c.attributes) h.remove(c.attributes[g])
      e.removeEventListener('dispose', b)
      d.delete(e)
      if ((g = f.get(c))) h.remove(g), f.delete(c)
      a.memory.geometries--
    }
    function c(a) {
      var b = [],
        c = a.index,
        d = a.attributes.position
      if (null !== c) {
        var e = c.array
        c = c.version
        d = 0
        for (var g = e.length; d < g; d += 3) {
          var t = e[d + 0],
            r = e[d + 1],
            l = e[d + 2]
          b.push(t, r, r, l, l, t)
        }
      } else for (e = d.array, c = d.version, d = 0, g = e.length / 3 - 1; d < g; d += 3) (t = d + 0), (r = d + 1), (l = d + 2), b.push(t, r, r, l, l, t)
      b = new (65535 < Wh(b) ? cc : bc)(b, 1)
      b.version = c
      h.update(b, 34963)
      ;(e = f.get(a)) && h.remove(e)
      f.set(a, b)
    }
    var d = new WeakMap(),
      f = new WeakMap()
    return {
      get: function (c, e) {
        var f = d.get(e)
        if (f) return f
        e.addEventListener('dispose', b)
        e.isBufferGeometry
          ? (f = e)
          : e.isGeometry &&
            (void 0 === e._bufferGeometry &&
              (e._bufferGeometry = new G().setFromObject(c)),
            (f = e._bufferGeometry))
        d.set(e, f)
        a.memory.geometries++
        return f
      },
      update: function (a) {
        var b = a.index,
          c = a.attributes
        null !== b && h.update(b, 34963)
        for (var d in c) h.update(c[d], 34962)
        a = a.morphAttributes
        for (d in a) {
          b = a[d]
          c = 0
          for (var e = b.length; c < e; c++) h.update(b[c], 34962)
        }
      },
      getWireframeAttribute: function (a) {
        var b = f.get(a)
        if (b) {
          var d = a.index
          null !== d && b.version < d.version && c(a)
        } else c(a)
        return f.get(a)
      },
    }
  }
  function ak(e, h, a, b) {
    var c = b.isWebGL2,
      d,
      f,
      g
    this.setMode = function (a) {
      d = a
    }
    this.setIndex = function (a) {
      f = a.type
      g = a.bytesPerElement
    }
    this.render = function (b, c) {
      e.drawElements(d, c, f, b * g)
      a.update(c, d)
    }
    this.renderInstances = function (b, m, n, p) {
      if (0 !== p) {
        if (c) {
          b = e
          var k = 'drawElementsInstanced'
        } else if (
          ((b = h.get('ANGLE_instanced_arrays')),
          (k = 'drawElementsInstancedANGLE'),
          null === b)
        ) {
          console.error(
            'THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.',
          )
          return
        }
        b[k](d, n, f, m * g, p)
        a.update(n, d, p)
      }
    }
  }
  function bk(e) {
    var h = { frame: 0, calls: 0, triangles: 0, points: 0, lines: 0 }
    return {
      memory: { geometries: 0, textures: 0 },
      render: h,
      programs: null,
      autoReset: !0,
      reset: function () {
        h.frame++
        h.calls = 0
        h.triangles = 0
        h.points = 0
        h.lines = 0
      },
      update: function (a, b, c) {
        c = c || 1
        h.calls++
        switch (b) {
          case 4:
            h.triangles += (a / 3) * c
            break
          case 5:
          case 6:
            h.triangles += c * (a - 2)
            break
          case 1:
            h.lines += (a / 2) * c
            break
          case 3:
            h.lines += c * (a - 1)
            break
          case 2:
            h.lines += c * a
            break
          case 0:
            h.points += c * a
            break
          default:
            console.error('THREE.WebGLInfo: Unknown draw mode:', b)
        }
      },
    }
  }
  function ck(e, h) {
    return Math.abs(h[1]) - Math.abs(e[1])
  }
  function dk(e) {
    var h = {},
      a = new Float32Array(8)
    return {
      update: function (b, c, d, f) {
        var g = b.morphTargetInfluences,
          k = g.length
        b = h[c.id]
        if (void 0 === b) {
          b = []
          for (var m = 0; m < k; m++) b[m] = [m, 0]
          h[c.id] = b
        }
        var n = d.morphTargets && c.morphAttributes.position
        d = d.morphNormals && c.morphAttributes.normal
        for (m = 0; m < k; m++) {
          var p = b[m]
          0 !== p[1] &&
            (n && c.deleteAttribute('morphTarget' + m),
            d && c.deleteAttribute('morphNormal' + m))
        }
        for (m = 0; m < k; m++) (p = b[m]), (p[0] = m), (p[1] = g[m])
        b.sort(ck)
        for (m = 0; 8 > m; m++) {
          if ((p = b[m]))
            if (((g = p[0]), (k = p[1]))) {
              n && c.setAttribute('morphTarget' + m, n[g])
              d && c.setAttribute('morphNormal' + m, d[g])
              a[m] = k
              continue
            }
          a[m] = 0
        }
        f.getUniforms().setValue(e, 'morphTargetInfluences', a)
      },
    }
  }
  function ek(e, h, a, b) {
    var c = {}
    return {
      update: function (d) {
        var e = b.render.frame,
          g = d.geometry,
          k = h.get(d, g)
        c[k.id] !== e &&
          (g.isGeometry && k.updateFromObject(d), h.update(k), (c[k.id] = e))
        d.isInstancedMesh && a.update(d.instanceMatrix, 34962)
        return k
      },
      dispose: function () {
        c = {}
      },
    }
  }
  function vb(e, h, a, b, c, d, f, g, k, m) {
    e = void 0 !== e ? e : []
    S.call(
      this,
      e,
      void 0 !== h ? h : 301,
      a,
      b,
      c,
      d,
      void 0 !== f ? f : 1022,
      g,
      k,
      m,
    )
    this.flipY = !1
  }
  function Rc(e, h, a, b) {
    S.call(this, null)
    this.image = {
      data: e || null,
      width: h || 1,
      height: a || 1,
      depth: b || 1,
    }
    this.minFilter = this.magFilter = 1003
    this.wrapR = 1001
    this.flipY = this.generateMipmaps = !1
    this.needsUpdate = !0
  }
  function Sc(e, h, a, b) {
    S.call(this, null)
    this.image = {
      data: e || null,
      width: h || 1,
      height: a || 1,
      depth: b || 1,
    }
    this.minFilter = this.magFilter = 1003
    this.wrapR = 1001
    this.flipY = this.generateMipmaps = !1
    this.needsUpdate = !0
  }
  function Tc(e, h, a) {
    var b = e[0]
    if (0 >= b || 0 < b) return e
    var c = h * a,
      d = ai[c]
    void 0 === d && ((d = new Float32Array(c)), (ai[c] = d))
    if (0 !== h)
      for (b.toArray(d, 0), b = 1, c = 0; b !== h; ++b)
        (c += a), e[b].toArray(d, c)
    return d
  }
  function Oa(e, h) {
    if (e.length !== h.length) return !1
    for (var a = 0, b = e.length; a < b; a++) if (e[a] !== h[a]) return !1
    return !0
  }
  function Ja(e, h) {
    for (var a = 0, b = h.length; a < b; a++) e[a] = h[a]
  }
  function bi(e, h) {
    var a = ci[h]
    void 0 === a && ((a = new Int32Array(h)), (ci[h] = a))
    for (var b = 0; b !== h; ++b) a[b] = e.allocateTextureUnit()
    return a
  }
  function fk(e, h) {
    var a = this.cache
    a[0] !== h && (e.uniform1f(this.addr, h), (a[0] = h))
  }
  function gk(e, h) {
    var a = this.cache
    if (void 0 !== h.x) {
      if (a[0] !== h.x || a[1] !== h.y)
        e.uniform2f(this.addr, h.x, h.y), (a[0] = h.x), (a[1] = h.y)
    } else Oa(a, h) || (e.uniform2fv(this.addr, h), Ja(a, h))
  }
  function hk(e, h) {
    var a = this.cache
    if (void 0 !== h.x) {
      if (a[0] !== h.x || a[1] !== h.y || a[2] !== h.z)
        e.uniform3f(this.addr, h.x, h.y, h.z),
          (a[0] = h.x),
          (a[1] = h.y),
          (a[2] = h.z)
    } else if (void 0 !== h.r) {
      if (a[0] !== h.r || a[1] !== h.g || a[2] !== h.b)
        e.uniform3f(this.addr, h.r, h.g, h.b),
          (a[0] = h.r),
          (a[1] = h.g),
          (a[2] = h.b)
    } else Oa(a, h) || (e.uniform3fv(this.addr, h), Ja(a, h))
  }
  function ik(e, h) {
    var a = this.cache
    if (void 0 !== h.x) {
      if (a[0] !== h.x || a[1] !== h.y || a[2] !== h.z || a[3] !== h.w)
        e.uniform4f(this.addr, h.x, h.y, h.z, h.w),
          (a[0] = h.x),
          (a[1] = h.y),
          (a[2] = h.z),
          (a[3] = h.w)
    } else Oa(a, h) || (e.uniform4fv(this.addr, h), Ja(a, h))
  }
  function jk(e, h) {
    var a = this.cache,
      b = h.elements
    void 0 === b
      ? Oa(a, h) || (e.uniformMatrix2fv(this.addr, !1, h), Ja(a, h))
      : Oa(a, b) || (di.set(b), e.uniformMatrix2fv(this.addr, !1, di), Ja(a, b))
  }
  function kk(e, h) {
    var a = this.cache,
      b = h.elements
    void 0 === b
      ? Oa(a, h) || (e.uniformMatrix3fv(this.addr, !1, h), Ja(a, h))
      : Oa(a, b) || (ei.set(b), e.uniformMatrix3fv(this.addr, !1, ei), Ja(a, b))
  }
  function lk(e, h) {
    var a = this.cache,
      b = h.elements
    void 0 === b
      ? Oa(a, h) || (e.uniformMatrix4fv(this.addr, !1, h), Ja(a, h))
      : Oa(a, b) || (fi.set(b), e.uniformMatrix4fv(this.addr, !1, fi), Ja(a, b))
  }
  function mk(e, h, a) {
    var b = this.cache,
      c = a.allocateTextureUnit()
    b[0] !== c && (e.uniform1i(this.addr, c), (b[0] = c))
    a.safeSetTexture2D(h || gi, c)
  }
  function nk(e, h, a) {
    var b = this.cache,
      c = a.allocateTextureUnit()
    b[0] !== c && (e.uniform1i(this.addr, c), (b[0] = c))
    a.setTexture2DArray(h || ok, c)
  }
  function pk(e, h, a) {
    var b = this.cache,
      c = a.allocateTextureUnit()
    b[0] !== c && (e.uniform1i(this.addr, c), (b[0] = c))
    a.setTexture3D(h || qk, c)
  }
  function rk(e, h, a) {
    var b = this.cache,
      c = a.allocateTextureUnit()
    b[0] !== c && (e.uniform1i(this.addr, c), (b[0] = c))
    a.safeSetTextureCube(h || hi, c)
  }
  function sk(e, h) {
    var a = this.cache
    a[0] !== h && (e.uniform1i(this.addr, h), (a[0] = h))
  }
  function tk(e, h) {
    var a = this.cache
    Oa(a, h) || (e.uniform2iv(this.addr, h), Ja(a, h))
  }
  function uk(e, h) {
    var a = this.cache
    Oa(a, h) || (e.uniform3iv(this.addr, h), Ja(a, h))
  }
  function vk(e, h) {
    var a = this.cache
    Oa(a, h) || (e.uniform4iv(this.addr, h), Ja(a, h))
  }
  function wk(e) {
    switch (e) {
      case 5126:
        return fk
      case 35664:
        return gk
      case 35665:
        return hk
      case 35666:
        return ik
      case 35674:
        return jk
      case 35675:
        return kk
      case 35676:
        return lk
      case 35678:
      case 36198:
        return mk
      case 35679:
        return pk
      case 35680:
        return rk
      case 36289:
        return nk
      case 5124:
      case 35670:
        return sk
      case 35667:
      case 35671:
        return tk
      case 35668:
      case 35672:
        return uk
      case 35669:
      case 35673:
        return vk
    }
  }
  function xk(e, h) {
    e.uniform1fv(this.addr, h)
  }
  function yk(e, h) {
    e.uniform1iv(this.addr, h)
  }
  function zk(e, h) {
    e.uniform2iv(this.addr, h)
  }
  function Ak(e, h) {
    e.uniform3iv(this.addr, h)
  }
  function Bk(e, h) {
    e.uniform4iv(this.addr, h)
  }
  function Ck(e, h) {
    h = Tc(h, this.size, 2)
    e.uniform2fv(this.addr, h)
  }
  function Dk(e, h) {
    h = Tc(h, this.size, 3)
    e.uniform3fv(this.addr, h)
  }
  function Ek(e, h) {
    h = Tc(h, this.size, 4)
    e.uniform4fv(this.addr, h)
  }
  function Fk(e, h) {
    h = Tc(h, this.size, 4)
    e.uniformMatrix2fv(this.addr, !1, h)
  }
  function Gk(e, h) {
    h = Tc(h, this.size, 9)
    e.uniformMatrix3fv(this.addr, !1, h)
  }
  function Hk(e, h) {
    h = Tc(h, this.size, 16)
    e.uniformMatrix4fv(this.addr, !1, h)
  }
  function Ik(e, h, a) {
    var b = h.length,
      c = bi(a, b)
    e.uniform1iv(this.addr, c)
    for (e = 0; e !== b; ++e) a.safeSetTexture2D(h[e] || gi, c[e])
  }
  function Jk(e, h, a) {
    var b = h.length,
      c = bi(a, b)
    e.uniform1iv(this.addr, c)
    for (e = 0; e !== b; ++e) a.safeSetTextureCube(h[e] || hi, c[e])
  }
  function Kk(e) {
    switch (e) {
      case 5126:
        return xk
      case 35664:
        return Ck
      case 35665:
        return Dk
      case 35666:
        return Ek
      case 35674:
        return Fk
      case 35675:
        return Gk
      case 35676:
        return Hk
      case 35678:
        return Ik
      case 35680:
        return Jk
      case 5124:
      case 35670:
        return yk
      case 35667:
      case 35671:
        return zk
      case 35668:
      case 35672:
        return Ak
      case 35669:
      case 35673:
        return Bk
    }
  }
  function Lk(e, h, a) {
    this.id = e
    this.addr = a
    this.cache = []
    this.setValue = wk(h.type)
  }
  function ii(e, h, a) {
    this.id = e
    this.addr = a
    this.cache = []
    this.size = h.size
    this.setValue = Kk(h.type)
  }
  function ji(e) {
    this.id = e
    this.seq = []
    this.map = {}
  }
  function Jb(e, h) {
    this.seq = []
    this.map = {}
    for (var a = e.getProgramParameter(h, 35718), b = 0; b < a; ++b) {
      var c = e.getActiveUniform(h, b),
        d = e.getUniformLocation(h, c.name),
        f = this,
        g = c.name,
        k = g.length
      for (Ag.lastIndex = 0; ; ) {
        var m = Ag.exec(g),
          n = Ag.lastIndex,
          p = m[1],
          y = m[3]
        ']' === m[2] && (p |= 0)
        if (void 0 === y || ('[' === y && n + 2 === k)) {
          g = f
          c = void 0 === y ? new Lk(p, c, d) : new ii(p, c, d)
          g.seq.push(c)
          g.map[c.id] = c
          break
        } else
          (y = f.map[p]),
            void 0 === y &&
              ((y = new ji(p)),
              (p = f),
              (f = y),
              p.seq.push(f),
              (p.map[f.id] = f)),
            (f = y)
      }
    }
  }
  function ki(e, h, a) {
    h = e.createShader(h)
    e.shaderSource(h, a)
    e.compileShader(h)
    return h
  }
  function li(e) {
    switch (e) {
      case 3e3:
        return ['Linear', '( value )']
      case 3001:
        return ['sRGB', '( value )']
      case 3002:
        return ['RGBE', '( value )']
      case 3004:
        return ['RGBM', '( value, 7.0 )']
      case 3005:
        return ['RGBM', '( value, 16.0 )']
      case 3006:
        return ['RGBD', '( value, 256.0 )']
      case 3007:
        return ['Gamma', '( value, float( GAMMA_FACTOR ) )']
      case 3003:
        return ['LogLuv', '( value )']
      default:
        throw Error('unsupported encoding: ' + e)
    }
  }
  function mi(e, h, a) {
    var b = e.getShaderParameter(h, 35713),
      c = e.getShaderInfoLog(h).trim()
    if (b && '' === c) return ''
    e = e.getShaderSource(h).split('\n')
    for (h = 0; h < e.length; h++) e[h] = h + 1 + ': ' + e[h]
    e = e.join('\n')
    return 'THREE.WebGLShader: gl.getShaderInfoLog() ' + a + '\n' + c + e
  }
  function Ze(e, h) {
    h = li(h)
    return (
      'vec4 ' +
      e +
      '( vec4 value ) { return ' +
      h[0] +
      'ToLinear' +
      h[1] +
      '; }'
    )
  }
  function Mk(e, h) {
    h = li(h)
    return (
      'vec4 ' + e + '( vec4 value ) { return LinearTo' + h[0] + h[1] + '; }'
    )
  }
  function Nk(e, h) {
    switch (h) {
      case 1:
        h = 'Linear'
        break
      case 2:
        h = 'Reinhard'
        break
      case 3:
        h = 'Uncharted2'
        break
      case 4:
        h = 'OptimizedCineon'
        break
      case 5:
        h = 'ACESFilmic'
        break
      default:
        throw Error('unsupported toneMapping: ' + h)
    }
    return (
      'vec3 ' + e + '( vec3 color ) { return ' + h + 'ToneMapping( color ); }'
    )
  }
  function Ok(e, h, a) {
    e = e || {}
    return [
      e.derivatives ||
      h.envMapCubeUV ||
      h.bumpMap ||
      h.tangentSpaceNormalMap ||
      h.clearcoatNormalMap ||
      h.flatShading
        ? '#extension GL_OES_standard_derivatives : enable'
        : '',
      (e.fragDepth || h.logarithmicDepthBuffer) && a.get('EXT_frag_depth')
        ? '#extension GL_EXT_frag_depth : enable'
        : '',
      e.drawBuffers && a.get('WEBGL_draw_buffers')
        ? '#extension GL_EXT_draw_buffers : require'
        : '',
      (e.shaderTextureLOD || h.envMap) && a.get('EXT_shader_texture_lod')
        ? '#extension GL_EXT_shader_texture_lod : enable'
        : '',
    ]
      .filter(Vd)
      .join('\n')
  }
  function Pk(e) {
    var h = [],
      a
    for (a in e) {
      var b = e[a]
      !1 !== b && h.push('#define ' + a + ' ' + b)
    }
    return h.join('\n')
  }
  function Vd(e) {
    return '' !== e
  }
  function ni(e, h) {
    return e
      .replace(/NUM_DIR_LIGHTS/g, h.numDirLights)
      .replace(/NUM_SPOT_LIGHTS/g, h.numSpotLights)
      .replace(/NUM_RECT_AREA_LIGHTS/g, h.numRectAreaLights)
      .replace(/NUM_POINT_LIGHTS/g, h.numPointLights)
      .replace(/NUM_HEMI_LIGHTS/g, h.numHemiLights)
      .replace(/NUM_DIR_LIGHT_SHADOWS/g, h.numDirLightShadows)
      .replace(/NUM_SPOT_LIGHT_SHADOWS/g, h.numSpotLightShadows)
      .replace(/NUM_POINT_LIGHT_SHADOWS/g, h.numPointLightShadows)
  }
  function oi(e, h) {
    return e
      .replace(/NUM_CLIPPING_PLANES/g, h.numClippingPlanes)
      .replace(
        /UNION_CLIPPING_PLANES/g,
        h.numClippingPlanes - h.numClipIntersection,
      )
  }
  function Bg(e, h) {
    e = Q[h]
    if (void 0 === e) throw Error('Can not resolve #include <' + h + '>')
    return e.replace(Cg, Bg)
  }
  function pi(e, h, a, b) {
    e = ''
    for (h = parseInt(h); h < parseInt(a); h++)
      e += b
        .replace(/\[ i \]/g, '[ ' + h + ' ]')
        .replace(/UNROLLED_LOOP_INDEX/g, h)
    return e
  }
  function qi(e) {
    var h =
      'precision ' + e.precision + ' float;\nprecision ' + e.precision + ' int;'
    'highp' === e.precision
      ? (h += '\n#define HIGH_PRECISION')
      : 'mediump' === e.precision
      ? (h += '\n#define MEDIUM_PRECISION')
      : 'lowp' === e.precision && (h += '\n#define LOW_PRECISION')
    return h
  }
  function Qk(e) {
    var h = 'SHADOWMAP_TYPE_BASIC'
    1 === e.shadowMapType
      ? (h = 'SHADOWMAP_TYPE_PCF')
      : 2 === e.shadowMapType
      ? (h = 'SHADOWMAP_TYPE_PCF_SOFT')
      : 3 === e.shadowMapType && (h = 'SHADOWMAP_TYPE_VSM')
    return h
  }
  function Rk(e) {
    var h = 'ENVMAP_TYPE_CUBE'
    if (e.envMap)
      switch (e.envMapMode) {
        case 301:
        case 302:
          h = 'ENVMAP_TYPE_CUBE'
          break
        case 306:
        case 307:
          h = 'ENVMAP_TYPE_CUBE_UV'
          break
        case 303:
        case 304:
          h = 'ENVMAP_TYPE_EQUIREC'
          break
        case 305:
          h = 'ENVMAP_TYPE_SPHERE'
      }
    return h
  }
  function Sk(e) {
    var h = 'ENVMAP_MODE_REFLECTION'
    if (e.envMap)
      switch (e.envMapMode) {
        case 302:
        case 304:
          h = 'ENVMAP_MODE_REFRACTION'
      }
    return h
  }
  function Tk(e) {
    var h = 'ENVMAP_BLENDING_MULTIPLY'
    if (e.envMap)
      switch (e.combine) {
        case 0:
          h = 'ENVMAP_BLENDING_MULTIPLY'
          break
        case 1:
          h = 'ENVMAP_BLENDING_MIX'
          break
        case 2:
          h = 'ENVMAP_BLENDING_ADD'
      }
    return h
  }
  function Uk(e, h, a, b, c, d) {
    var f = e.getContext(),
      g = b.defines,
      k = c.vertexShader,
      m = c.fragmentShader,
      n = Qk(d),
      p = Rk(d),
      y = Sk(d),
      t = Tk(d),
      r = 0 < e.gammaFactor ? e.gammaFactor : 1,
      l = d.isWebGL2 ? '' : Ok(b.extensions, d, h),
      v = Pk(g),
      q = f.createProgram(),
      x = d.numMultiviewViews
    b.isRawShaderMaterial
      ? ((g = [v].filter(Vd).join('\n')),
        0 < g.length && (g += '\n'),
        (h = [l, v].filter(Vd).join('\n')),
        0 < h.length && (h += '\n'))
      : ((g = [
          qi(d),
          '#define SHADER_NAME ' + c.name,
          v,
          d.instancing ? '#define USE_INSTANCING' : '',
          d.supportsVertexTextures ? '#define VERTEX_TEXTURES' : '',
          '#define GAMMA_FACTOR ' + r,
          '#define MAX_BONES ' + d.maxBones,
          d.useFog && d.fog ? '#define USE_FOG' : '',
          d.useFog && d.fogExp2 ? '#define FOG_EXP2' : '',
          d.map ? '#define USE_MAP' : '',
          d.envMap ? '#define USE_ENVMAP' : '',
          d.envMap ? '#define ' + y : '',
          d.lightMap ? '#define USE_LIGHTMAP' : '',
          d.aoMap ? '#define USE_AOMAP' : '',
          d.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
          d.bumpMap ? '#define USE_BUMPMAP' : '',
          d.normalMap ? '#define USE_NORMALMAP' : '',
          d.normalMap && d.objectSpaceNormalMap
            ? '#define OBJECTSPACE_NORMALMAP'
            : '',
          d.normalMap && d.tangentSpaceNormalMap
            ? '#define TANGENTSPACE_NORMALMAP'
            : '',
          d.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
          d.displacementMap && d.supportsVertexTextures
            ? '#define USE_DISPLACEMENTMAP'
            : '',
          d.specularMap ? '#define USE_SPECULARMAP' : '',
          d.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
          d.metalnessMap ? '#define USE_METALNESSMAP' : '',
          d.alphaMap ? '#define USE_ALPHAMAP' : '',
          d.vertexTangents ? '#define USE_TANGENT' : '',
          d.vertexColors ? '#define USE_COLOR' : '',
          d.vertexUvs ? '#define USE_UV' : '',
          d.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',
          d.flatShading ? '#define FLAT_SHADED' : '',
          d.skinning ? '#define USE_SKINNING' : '',
          d.useVertexTexture ? '#define BONE_TEXTURE' : '',
          d.morphTargets ? '#define USE_MORPHTARGETS' : '',
          d.morphNormals && !1 === d.flatShading
            ? '#define USE_MORPHNORMALS'
            : '',
          d.doubleSided ? '#define DOUBLE_SIDED' : '',
          d.flipSided ? '#define FLIP_SIDED' : '',
          d.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
          d.shadowMapEnabled ? '#define ' + n : '',
          d.sizeAttenuation ? '#define USE_SIZEATTENUATION' : '',
          d.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
          d.logarithmicDepthBuffer && (d.isWebGL2 || h.get('EXT_frag_depth'))
            ? '#define USE_LOGDEPTHBUF_EXT'
            : '',
          'uniform mat4 modelMatrix;',
          'uniform mat4 modelViewMatrix;',
          'uniform mat4 projectionMatrix;',
          'uniform mat4 viewMatrix;',
          'uniform mat3 normalMatrix;',
          'uniform vec3 cameraPosition;',
          'uniform bool isOrthographic;',
          '#ifdef USE_INSTANCING',
          ' attribute mat4 instanceMatrix;',
          '#endif',
          'attribute vec3 position;',
          'attribute vec3 normal;',
          'attribute vec2 uv;',
          '#ifdef USE_TANGENT',
          '\tattribute vec4 tangent;',
          '#endif',
          '#ifdef USE_COLOR',
          '\tattribute vec3 color;',
          '#endif',
          '#ifdef USE_MORPHTARGETS',
          '\tattribute vec3 morphTarget0;',
          '\tattribute vec3 morphTarget1;',
          '\tattribute vec3 morphTarget2;',
          '\tattribute vec3 morphTarget3;',
          '\t#ifdef USE_MORPHNORMALS',
          '\t\tattribute vec3 morphNormal0;',
          '\t\tattribute vec3 morphNormal1;',
          '\t\tattribute vec3 morphNormal2;',
          '\t\tattribute vec3 morphNormal3;',
          '\t#else',
          '\t\tattribute vec3 morphTarget4;',
          '\t\tattribute vec3 morphTarget5;',
          '\t\tattribute vec3 morphTarget6;',
          '\t\tattribute vec3 morphTarget7;',
          '\t#endif',
          '#endif',
          '#ifdef USE_SKINNING',
          '\tattribute vec4 skinIndex;',
          '\tattribute vec4 skinWeight;',
          '#endif',
          '\n',
        ]
          .filter(Vd)
          .join('\n')),
        (h = [
          l,
          qi(d),
          '#define SHADER_NAME ' + c.name,
          v,
          d.alphaTest
            ? '#define ALPHATEST ' + d.alphaTest + (d.alphaTest % 1 ? '' : '.0')
            : '',
          '#define GAMMA_FACTOR ' + r,
          d.useFog && d.fog ? '#define USE_FOG' : '',
          d.useFog && d.fogExp2 ? '#define FOG_EXP2' : '',
          d.map ? '#define USE_MAP' : '',
          d.matcap ? '#define USE_MATCAP' : '',
          d.envMap ? '#define USE_ENVMAP' : '',
          d.envMap ? '#define ' + p : '',
          d.envMap ? '#define ' + y : '',
          d.envMap ? '#define ' + t : '',
          d.lightMap ? '#define USE_LIGHTMAP' : '',
          d.aoMap ? '#define USE_AOMAP' : '',
          d.emissiveMap ? '#define USE_EMISSIVEMAP' : '',
          d.bumpMap ? '#define USE_BUMPMAP' : '',
          d.normalMap ? '#define USE_NORMALMAP' : '',
          d.normalMap && d.objectSpaceNormalMap
            ? '#define OBJECTSPACE_NORMALMAP'
            : '',
          d.normalMap && d.tangentSpaceNormalMap
            ? '#define TANGENTSPACE_NORMALMAP'
            : '',
          d.clearcoatNormalMap ? '#define USE_CLEARCOAT_NORMALMAP' : '',
          d.specularMap ? '#define USE_SPECULARMAP' : '',
          d.roughnessMap ? '#define USE_ROUGHNESSMAP' : '',
          d.metalnessMap ? '#define USE_METALNESSMAP' : '',
          d.alphaMap ? '#define USE_ALPHAMAP' : '',
          d.sheen ? '#define USE_SHEEN' : '',
          d.vertexTangents ? '#define USE_TANGENT' : '',
          d.vertexColors ? '#define USE_COLOR' : '',
          d.vertexUvs ? '#define USE_UV' : '',
          d.uvsVertexOnly ? '#define UVS_VERTEX_ONLY' : '',
          d.gradientMap ? '#define USE_GRADIENTMAP' : '',
          d.flatShading ? '#define FLAT_SHADED' : '',
          d.doubleSided ? '#define DOUBLE_SIDED' : '',
          d.flipSided ? '#define FLIP_SIDED' : '',
          d.shadowMapEnabled ? '#define USE_SHADOWMAP' : '',
          d.shadowMapEnabled ? '#define ' + n : '',
          d.premultipliedAlpha ? '#define PREMULTIPLIED_ALPHA' : '',
          d.physicallyCorrectLights ? '#define PHYSICALLY_CORRECT_LIGHTS' : '',
          d.logarithmicDepthBuffer ? '#define USE_LOGDEPTHBUF' : '',
          d.logarithmicDepthBuffer && (d.isWebGL2 || h.get('EXT_frag_depth'))
            ? '#define USE_LOGDEPTHBUF_EXT'
            : '',
          ((b.extensions && b.extensions.shaderTextureLOD) || d.envMap) &&
          (d.isWebGL2 || h.get('EXT_shader_texture_lod'))
            ? '#define TEXTURE_LOD_EXT'
            : '',
          'uniform mat4 viewMatrix;',
          'uniform vec3 cameraPosition;',
          'uniform bool isOrthographic;',
          0 !== d.toneMapping ? '#define TONE_MAPPING' : '',
          0 !== d.toneMapping ? Q.tonemapping_pars_fragment : '',
          0 !== d.toneMapping ? Nk('toneMapping', d.toneMapping) : '',
          d.dithering ? '#define DITHERING' : '',
          d.outputEncoding ||
          d.mapEncoding ||
          d.matcapEncoding ||
          d.envMapEncoding ||
          d.emissiveMapEncoding
            ? Q.encodings_pars_fragment
            : '',
          d.mapEncoding ? Ze('mapTexelToLinear', d.mapEncoding) : '',
          d.matcapEncoding ? Ze('matcapTexelToLinear', d.matcapEncoding) : '',
          d.envMapEncoding ? Ze('envMapTexelToLinear', d.envMapEncoding) : '',
          d.emissiveMapEncoding
            ? Ze('emissiveMapTexelToLinear', d.emissiveMapEncoding)
            : '',
          d.outputEncoding ? Mk('linearToOutputTexel', d.outputEncoding) : '',
          d.depthPacking ? '#define DEPTH_PACKING ' + b.depthPacking : '',
          '\n',
        ]
          .filter(Vd)
          .join('\n')))
    k = k.replace(Cg, Bg)
    k = ni(k, d)
    k = oi(k, d)
    m = m.replace(Cg, Bg)
    m = ni(m, d)
    m = oi(m, d)
    k = k.replace(ri, pi)
    m = m.replace(ri, pi)
    d.isWebGL2 &&
      !b.isRawShaderMaterial &&
      ((n = !1),
      (p = /^\s*#version\s+300\s+es\s*\n/),
      b.isShaderMaterial &&
        null !== k.match(p) &&
        null !== m.match(p) &&
        ((n = !0), (k = k.replace(p, '')), (m = m.replace(p, ''))),
      (g =
        '#version 300 es\n\n#define attribute in\n#define varying out\n#define texture2D texture\n' +
        g),
      (h =
        [
          '#version 300 es\n\n#define varying in',
          n ? '' : 'out highp vec4 pc_fragColor;',
          n ? '' : '#define gl_FragColor pc_fragColor',
          '#define gl_FragDepthEXT gl_FragDepth\n#define texture2D texture\n#define textureCube texture\n#define texture2DProj textureProj\n#define texture2DLodEXT textureLod\n#define texture2DProjLodEXT textureProjLod\n#define textureCubeLodEXT textureLod\n#define texture2DGradEXT textureGrad\n#define texture2DProjGradEXT textureProjGrad\n#define textureCubeGradEXT textureGrad',
        ].join('\n') +
        '\n' +
        h),
      0 < x &&
        ((g = g.replace(
          '#version 300 es\n',
          [
            '#version 300 es\n\n#extension GL_OVR_multiview2 : require',
            'layout(num_views = ' + x + ') in;',
            '#define VIEW_ID gl_ViewID_OVR',
          ].join('\n'),
        )),
        (g = g.replace(
          'uniform mat4 modelViewMatrix;\nuniform mat4 projectionMatrix;\nuniform mat4 viewMatrix;\nuniform mat3 normalMatrix;',
          [
            'uniform mat4 modelViewMatrices[' + x + '];',
            'uniform mat4 projectionMatrices[' + x + '];',
            'uniform mat4 viewMatrices[' + x + '];',
            'uniform mat3 normalMatrices[' + x + '];',
            '#define modelViewMatrix modelViewMatrices[VIEW_ID]\n#define projectionMatrix projectionMatrices[VIEW_ID]\n#define viewMatrix viewMatrices[VIEW_ID]\n#define normalMatrix normalMatrices[VIEW_ID]',
          ].join('\n'),
        )),
        (h = h.replace(
          '#version 300 es\n',
          '#version 300 es\n\n#extension GL_OVR_multiview2 : require\n#define VIEW_ID gl_ViewID_OVR',
        )),
        (h = h.replace(
          'uniform mat4 viewMatrix;',
          [
            'uniform mat4 viewMatrices[' + x + '];',
            '#define viewMatrix viewMatrices[VIEW_ID]',
          ].join('\n'),
        ))))
    m = h + m
    k = ki(f, 35633, g + k)
    m = ki(f, 35632, m)
    f.attachShader(q, k)
    f.attachShader(q, m)
    void 0 !== b.index0AttributeName
      ? f.bindAttribLocation(q, 0, b.index0AttributeName)
      : !0 === d.morphTargets && f.bindAttribLocation(q, 0, 'position')
    f.linkProgram(q)
    if (e.debug.checkShaderErrors) {
      e = f.getProgramInfoLog(q).trim()
      d = f.getShaderInfoLog(k).trim()
      n = f.getShaderInfoLog(m).trim()
      y = p = !0
      if (!1 === f.getProgramParameter(q, 35714))
        (p = !1),
          (t = mi(f, k, 'vertex')),
          (r = mi(f, m, 'fragment')),
          console.error(
            'THREE.WebGLProgram: shader error: ',
            f.getError(),
            '35715',
            f.getProgramParameter(q, 35715),
            'gl.getProgramInfoLog',
            e,
            t,
            r,
          )
      else if ('' !== e)
        console.warn('THREE.WebGLProgram: gl.getProgramInfoLog()', e)
      else if ('' === d || '' === n) y = !1
      y &&
        (this.diagnostics = {
          runnable: p,
          material: b,
          programLog: e,
          vertexShader: { log: d, prefix: g },
          fragmentShader: { log: n, prefix: h },
        })
    }
    f.deleteShader(k)
    f.deleteShader(m)
    var B
    this.getUniforms = function () {
      void 0 === B && (B = new Jb(f, q))
      return B
    }
    var C
    this.getAttributes = function () {
      if (void 0 === C) {
        for (
          var a = {}, b = f.getProgramParameter(q, 35721), c = 0;
          c < b;
          c++
        ) {
          var d = f.getActiveAttrib(q, c).name
          a[d] = f.getAttribLocation(q, d)
        }
        C = a
      }
      return C
    }
    this.destroy = function () {
      f.deleteProgram(q)
      this.program = void 0
    }
    this.name = c.name
    this.id = Vk++
    this.cacheKey = a
    this.usedTimes = 1
    this.program = q
    this.vertexShader = k
    this.fragmentShader = m
    this.numMultiviewViews = x
    return this
  }
  function Wk(e, h, a) {
    function b(a, b) {
      if (a)
        a.isTexture
          ? (c = a.encoding)
          : a.isWebGLRenderTarget &&
            (console.warn(
              "THREE.WebGLPrograms.getTextureEncodingFromMap: don't use render targets as textures. Use their .texture property instead.",
            ),
            (c = a.texture.encoding))
      else var c = 3e3
      3e3 === c && b && (c = 3007)
      return c
    }
    var c = [],
      d = a.isWebGL2,
      f = a.logarithmicDepthBuffer,
      g = a.floatVertexTextures,
      k = a.precision,
      m = a.maxVertexUniforms,
      n = a.vertexTextures,
      p = {
        MeshDepthMaterial: 'depth',
        MeshDistanceMaterial: 'distanceRGBA',
        MeshNormalMaterial: 'normal',
        MeshBasicMaterial: 'basic',
        MeshLambertMaterial: 'lambert',
        MeshPhongMaterial: 'phong',
        MeshToonMaterial: 'phong',
        MeshStandardMaterial: 'physical',
        MeshPhysicalMaterial: 'physical',
        MeshMatcapMaterial: 'matcap',
        LineBasicMaterial: 'basic',
        LineDashedMaterial: 'dashed',
        PointsMaterial: 'points',
        ShadowMaterial: 'shadow',
        SpriteMaterial: 'sprite',
      },
      y = 'precision isWebGL2 supportsVertexTextures outputEncoding instancing numMultiviewViews map mapEncoding matcap matcapEncoding envMap envMapMode envMapEncoding envMapCubeUV lightMap aoMap emissiveMap emissiveMapEncoding bumpMap normalMap objectSpaceNormalMap tangentSpaceNormalMap clearcoatNormalMap displacementMap specularMap roughnessMap metalnessMap gradientMap alphaMap combine vertexColors vertexTangents vertexUvs uvsVertexOnly fog useFog fogExp2 flatShading sizeAttenuation logarithmicDepthBuffer skinning maxBones useVertexTexture morphTargets morphNormals maxMorphTargets maxMorphNormals premultipliedAlpha numDirLights numPointLights numSpotLights numHemiLights numRectAreaLights numDirLightShadows numPointLightShadows numSpotLightShadows shadowMapEnabled shadowMapType toneMapping physicallyCorrectLights alphaTest doubleSided flipSided numClippingPlanes numClipIntersection depthPacking dithering sheen'.split(
        ' ',
      )
    this.getParameters = function (c, h, y, l, q, x, B) {
      var r = p[c.type]
      if (B.isSkinnedMesh) {
        var t = B.skeleton.bones
        if (g) t = 1024
        else {
          var u = Math.min(Math.floor((m - 20) / 4), t.length)
          u < t.length
            ? (console.warn(
                'THREE.WebGLRenderer: Skeleton has ' +
                  t.length +
                  ' bones. This GPU supports ' +
                  u +
                  '.',
              ),
              (t = 0))
            : (t = u)
        }
      } else t = 0
      null !== c.precision &&
        ((k = a.getMaxPrecision(c.precision)),
        k !== c.precision &&
          console.warn(
            'THREE.WebGLProgram.getParameters:',
            c.precision,
            'not supported, using',
            k,
            'instead.',
          ))
      u = e.getRenderTarget()
      return {
        isWebGL2: d,
        shaderID: r,
        precision: k,
        instancing: !0 === B.isInstancedMesh,
        supportsVertexTextures: n,
        numMultiviewViews: u && u.isWebGLMultiviewRenderTarget ? u.numViews : 0,
        outputEncoding: b(u ? u.texture : null, e.gammaOutput),
        map: !!c.map,
        mapEncoding: b(c.map, e.gammaInput),
        matcap: !!c.matcap,
        matcapEncoding: b(c.matcap, e.gammaInput),
        envMap: !!c.envMap,
        envMapMode: c.envMap && c.envMap.mapping,
        envMapEncoding: b(c.envMap, e.gammaInput),
        envMapCubeUV:
          !!c.envMap && (306 === c.envMap.mapping || 307 === c.envMap.mapping),
        lightMap: !!c.lightMap,
        aoMap: !!c.aoMap,
        emissiveMap: !!c.emissiveMap,
        emissiveMapEncoding: b(c.emissiveMap, e.gammaInput),
        bumpMap: !!c.bumpMap,
        normalMap: !!c.normalMap,
        objectSpaceNormalMap: 1 === c.normalMapType,
        tangentSpaceNormalMap: 0 === c.normalMapType,
        clearcoatNormalMap: !!c.clearcoatNormalMap,
        displacementMap: !!c.displacementMap,
        roughnessMap: !!c.roughnessMap,
        metalnessMap: !!c.metalnessMap,
        specularMap: !!c.specularMap,
        alphaMap: !!c.alphaMap,
        gradientMap: !!c.gradientMap,
        sheen: !!c.sheen,
        combine: c.combine,
        vertexTangents: c.normalMap && c.vertexTangents,
        vertexColors: c.vertexColors,
        vertexUvs:
          !!c.map ||
          !!c.bumpMap ||
          !!c.normalMap ||
          !!c.specularMap ||
          !!c.alphaMap ||
          !!c.emissiveMap ||
          !!c.roughnessMap ||
          !!c.metalnessMap ||
          !!c.clearcoatNormalMap ||
          !!c.displacementMap,
        uvsVertexOnly:
          !(
            c.map ||
            c.bumpMap ||
            c.normalMap ||
            c.specularMap ||
            c.alphaMap ||
            c.emissiveMap ||
            c.roughnessMap ||
            c.metalnessMap ||
            c.clearcoatNormalMap
          ) && !!c.displacementMap,
        fog: !!l,
        useFog: c.fog,
        fogExp2: l && l.isFogExp2,
        flatShading: c.flatShading,
        sizeAttenuation: c.sizeAttenuation,
        logarithmicDepthBuffer: f,
        skinning: c.skinning && 0 < t,
        maxBones: t,
        useVertexTexture: g,
        morphTargets: c.morphTargets,
        morphNormals: c.morphNormals,
        maxMorphTargets: e.maxMorphTargets,
        maxMorphNormals: e.maxMorphNormals,
        numDirLights: h.directional.length,
        numPointLights: h.point.length,
        numSpotLights: h.spot.length,
        numRectAreaLights: h.rectArea.length,
        numHemiLights: h.hemi.length,
        numDirLightShadows: h.directionalShadowMap.length,
        numPointLightShadows: h.pointShadowMap.length,
        numSpotLightShadows: h.spotShadowMap.length,
        numClippingPlanes: q,
        numClipIntersection: x,
        dithering: c.dithering,
        shadowMapEnabled: e.shadowMap.enabled && 0 < y.length,
        shadowMapType: e.shadowMap.type,
        toneMapping: c.toneMapped ? e.toneMapping : 0,
        physicallyCorrectLights: e.physicallyCorrectLights,
        premultipliedAlpha: c.premultipliedAlpha,
        alphaTest: c.alphaTest,
        doubleSided: 2 === c.side,
        flipSided: 1 === c.side,
        depthPacking: void 0 !== c.depthPacking ? c.depthPacking : !1,
      }
    }
    this.getProgramCacheKey = function (a, b) {
      var c = []
      b.shaderID
        ? c.push(b.shaderID)
        : (c.push(a.fragmentShader), c.push(a.vertexShader))
      if (void 0 !== a.defines)
        for (var d in a.defines) c.push(d), c.push(a.defines[d])
      for (d = 0; d < y.length; d++) c.push(b[y[d]])
      c.push(a.onBeforeCompile.toString())
      c.push(e.gammaOutput)
      c.push(e.gammaFactor)
      return c.join()
    }
    this.acquireProgram = function (a, b, d, f) {
      for (var g, k = 0, m = c.length; k < m; k++) {
        var n = c[k]
        if (n.cacheKey === f) {
          g = n
          ++g.usedTimes
          break
        }
      }
      void 0 === g && ((g = new Uk(e, h, f, a, b, d)), c.push(g))
      return g
    }
    this.releaseProgram = function (a) {
      if (0 === --a.usedTimes) {
        var b = c.indexOf(a)
        c[b] = c[c.length - 1]
        c.pop()
        a.destroy()
      }
    }
    this.programs = c
  }
  function Xk() {
    var e = new WeakMap()
    return {
      get: function (h) {
        var a = e.get(h)
        void 0 === a && ((a = {}), e.set(h, a))
        return a
      },
      remove: function (h) {
        e.delete(h)
      },
      update: function (h, a, b) {
        e.get(h)[a] = b
      },
      dispose: function () {
        e = new WeakMap()
      },
    }
  }
  function Yk(e, h) {
    return e.groupOrder !== h.groupOrder
      ? e.groupOrder - h.groupOrder
      : e.renderOrder !== h.renderOrder
      ? e.renderOrder - h.renderOrder
      : e.program !== h.program
      ? e.program.id - h.program.id
      : e.material.id !== h.material.id
      ? e.material.id - h.material.id
      : e.z !== h.z
      ? e.z - h.z
      : e.id - h.id
  }
  function Zk(e, h) {
    return e.groupOrder !== h.groupOrder
      ? e.groupOrder - h.groupOrder
      : e.renderOrder !== h.renderOrder
      ? e.renderOrder - h.renderOrder
      : e.z !== h.z
      ? h.z - e.z
      : e.id - h.id
  }
  function si() {
    function e(b, c, e, m, n, p) {
      var f = h[a]
      void 0 === f
        ? ((f = {
            id: b.id,
            object: b,
            geometry: c,
            material: e,
            program: e.program || d,
            groupOrder: m,
            renderOrder: b.renderOrder,
            z: n,
            group: p,
          }),
          (h[a] = f))
        : ((f.id = b.id),
          (f.object = b),
          (f.geometry = c),
          (f.material = e),
          (f.program = e.program || d),
          (f.groupOrder = m),
          (f.renderOrder = b.renderOrder),
          (f.z = n),
          (f.group = p))
      a++
      return f
    }
    var h = [],
      a = 0,
      b = [],
      c = [],
      d = { id: -1 }
    return {
      opaque: b,
      transparent: c,
      init: function () {
        a = 0
        b.length = 0
        c.length = 0
      },
      push: function (a, d, h, m, n, p) {
        a = e(a, d, h, m, n, p)
        ;(!0 === h.transparent ? c : b).push(a)
      },
      unshift: function (a, d, h, m, n, p) {
        a = e(a, d, h, m, n, p)
        ;(!0 === h.transparent ? c : b).unshift(a)
      },
      sort: function () {
        1 < b.length && b.sort(Yk)
        1 < c.length && c.sort(Zk)
      },
    }
  }
  function $k() {
    function e(a) {
      a = a.target
      a.removeEventListener('dispose', e)
      h.delete(a)
    }
    var h = new WeakMap()
    return {
      get: function (a, b) {
        var c = h.get(a)
        if (void 0 === c) {
          var d = new si()
          h.set(a, new WeakMap())
          h.get(a).set(b, d)
          a.addEventListener('dispose', e)
        } else (d = c.get(b)), void 0 === d && ((d = new si()), c.set(b, d))
        return d
      },
      dispose: function () {
        h = new WeakMap()
      },
    }
  }
  function al() {
    var e = {}
    return {
      get: function (h) {
        if (void 0 !== e[h.id]) return e[h.id]
        switch (h.type) {
          case 'DirectionalLight':
            var a = {
              direction: new q(),
              color: new D(),
              shadow: !1,
              shadowBias: 0,
              shadowRadius: 1,
              shadowMapSize: new z(),
            }
            break
          case 'SpotLight':
            a = {
              position: new q(),
              direction: new q(),
              color: new D(),
              distance: 0,
              coneCos: 0,
              penumbraCos: 0,
              decay: 0,
              shadow: !1,
              shadowBias: 0,
              shadowRadius: 1,
              shadowMapSize: new z(),
            }
            break
          case 'PointLight':
            a = {
              position: new q(),
              color: new D(),
              distance: 0,
              decay: 0,
              shadow: !1,
              shadowBias: 0,
              shadowRadius: 1,
              shadowMapSize: new z(),
              shadowCameraNear: 1,
              shadowCameraFar: 1e3,
            }
            break
          case 'HemisphereLight':
            a = { direction: new q(), skyColor: new D(), groundColor: new D() }
            break
          case 'RectAreaLight':
            a = {
              color: new D(),
              position: new q(),
              halfWidth: new q(),
              halfHeight: new q(),
            }
        }
        return (e[h.id] = a)
      },
    }
  }
  function bl(e, h) {
    return (h.castShadow ? 1 : 0) - (e.castShadow ? 1 : 0)
  }
  function cl() {
    for (
      var e = new al(),
        h = {
          version: 0,
          hash: {
            directionalLength: -1,
            pointLength: -1,
            spotLength: -1,
            rectAreaLength: -1,
            hemiLength: -1,
            numDirectionalShadows: -1,
            numPointShadows: -1,
            numSpotShadows: -1,
          },
          ambient: [0, 0, 0],
          probe: [],
          directional: [],
          directionalShadowMap: [],
          directionalShadowMatrix: [],
          spot: [],
          spotShadowMap: [],
          spotShadowMatrix: [],
          rectArea: [],
          point: [],
          pointShadowMap: [],
          pointShadowMatrix: [],
          hemi: [],
          numDirectionalShadows: -1,
          numPointShadows: -1,
          numSpotShadows: -1,
        },
        a = 0;
      9 > a;
      a++
    )
      h.probe.push(new q())
    var b = new q(),
      c = new I(),
      d = new I()
    return {
      setup: function (a, g, k) {
        for (var f = 0, n = 0, p = 0, y = 0; 9 > y; y++) h.probe[y].set(0, 0, 0)
        var l = (g = 0),
          r = 0,
          u = 0,
          v = 0,
          q = 0,
          x = 0,
          B = 0
        k = k.matrixWorldInverse
        a.sort(bl)
        y = 0
        for (var C = a.length; y < C; y++) {
          var A = a[y],
            Ka = A.color,
            W = A.intensity,
            Ca = A.distance,
            oa = A.shadow && A.shadow.map ? A.shadow.map.texture : null
          if (A.isAmbientLight)
            (f += Ka.r * W), (n += Ka.g * W), (p += Ka.b * W)
          else if (A.isLightProbe)
            for (oa = 0; 9 > oa; oa++)
              h.probe[oa].addScaledVector(A.sh.coefficients[oa], W)
          else if (A.isDirectionalLight) {
            var H = e.get(A)
            H.color.copy(A.color).multiplyScalar(A.intensity)
            H.direction.setFromMatrixPosition(A.matrixWorld)
            b.setFromMatrixPosition(A.target.matrixWorld)
            H.direction.sub(b)
            H.direction.transformDirection(k)
            if ((H.shadow = A.castShadow))
              (W = A.shadow),
                (H.shadowBias = W.bias),
                (H.shadowRadius = W.radius),
                (H.shadowMapSize = W.mapSize),
                (h.directionalShadowMap[g] = oa),
                (h.directionalShadowMatrix[g] = A.shadow.matrix),
                q++
            h.directional[g] = H
            g++
          } else if (A.isSpotLight) {
            H = e.get(A)
            H.position.setFromMatrixPosition(A.matrixWorld)
            H.position.applyMatrix4(k)
            H.color.copy(Ka).multiplyScalar(W)
            H.distance = Ca
            H.direction.setFromMatrixPosition(A.matrixWorld)
            b.setFromMatrixPosition(A.target.matrixWorld)
            H.direction.sub(b)
            H.direction.transformDirection(k)
            H.coneCos = Math.cos(A.angle)
            H.penumbraCos = Math.cos(A.angle * (1 - A.penumbra))
            H.decay = A.decay
            if ((H.shadow = A.castShadow))
              (W = A.shadow),
                (H.shadowBias = W.bias),
                (H.shadowRadius = W.radius),
                (H.shadowMapSize = W.mapSize),
                (h.spotShadowMap[r] = oa),
                (h.spotShadowMatrix[r] = A.shadow.matrix),
                B++
            h.spot[r] = H
            r++
          } else if (A.isRectAreaLight)
            (H = e.get(A)),
              H.color.copy(Ka).multiplyScalar(W),
              H.position.setFromMatrixPosition(A.matrixWorld),
              H.position.applyMatrix4(k),
              d.identity(),
              c.copy(A.matrixWorld),
              c.premultiply(k),
              d.extractRotation(c),
              H.halfWidth.set(0.5 * A.width, 0, 0),
              H.halfHeight.set(0, 0.5 * A.height, 0),
              H.halfWidth.applyMatrix4(d),
              H.halfHeight.applyMatrix4(d),
              (h.rectArea[u] = H),
              u++
          else if (A.isPointLight) {
            H = e.get(A)
            H.position.setFromMatrixPosition(A.matrixWorld)
            H.position.applyMatrix4(k)
            H.color.copy(A.color).multiplyScalar(A.intensity)
            H.distance = A.distance
            H.decay = A.decay
            if ((H.shadow = A.castShadow))
              (W = A.shadow),
                (H.shadowBias = W.bias),
                (H.shadowRadius = W.radius),
                (H.shadowMapSize = W.mapSize),
                (H.shadowCameraNear = W.camera.near),
                (H.shadowCameraFar = W.camera.far),
                (h.pointShadowMap[l] = oa),
                (h.pointShadowMatrix[l] = A.shadow.matrix),
                x++
            h.point[l] = H
            l++
          } else
            A.isHemisphereLight &&
              ((H = e.get(A)),
              H.direction.setFromMatrixPosition(A.matrixWorld),
              H.direction.transformDirection(k),
              H.direction.normalize(),
              H.skyColor.copy(A.color).multiplyScalar(W),
              H.groundColor.copy(A.groundColor).multiplyScalar(W),
              (h.hemi[v] = H),
              v++)
        }
        h.ambient[0] = f
        h.ambient[1] = n
        h.ambient[2] = p
        a = h.hash
        if (
          a.directionalLength !== g ||
          a.pointLength !== l ||
          a.spotLength !== r ||
          a.rectAreaLength !== u ||
          a.hemiLength !== v ||
          a.numDirectionalShadows !== q ||
          a.numPointShadows !== x ||
          a.numSpotShadows !== B
        )
          (h.directional.length = g),
            (h.spot.length = r),
            (h.rectArea.length = u),
            (h.point.length = l),
            (h.hemi.length = v),
            (h.directionalShadowMap.length = q),
            (h.pointShadowMap.length = x),
            (h.spotShadowMap.length = B),
            (h.directionalShadowMatrix.length = q),
            (h.pointShadowMatrix.length = x),
            (h.spotShadowMatrix.length = B),
            (a.directionalLength = g),
            (a.pointLength = l),
            (a.spotLength = r),
            (a.rectAreaLength = u),
            (a.hemiLength = v),
            (a.numDirectionalShadows = q),
            (a.numPointShadows = x),
            (a.numSpotShadows = B),
            (h.version = dl++)
      },
      state: h,
    }
  }
  function ti() {
    var e = new cl(),
      h = [],
      a = []
    return {
      init: function () {
        h.length = 0
        a.length = 0
      },
      state: { lightsArray: h, shadowsArray: a, lights: e },
      setupLights: function (b) {
        e.setup(h, a, b)
      },
      pushLight: function (a) {
        h.push(a)
      },
      pushShadow: function (b) {
        a.push(b)
      },
    }
  }
  function el() {
    function e(a) {
      a = a.target
      a.removeEventListener('dispose', e)
      h.delete(a)
    }
    var h = new WeakMap()
    return {
      get: function (a, b) {
        if (!1 === h.has(a)) {
          var c = new ti()
          h.set(a, new WeakMap())
          h.get(a).set(b, c)
          a.addEventListener('dispose', e)
        } else
          !1 === h.get(a).has(b)
            ? ((c = new ti()), h.get(a).set(b, c))
            : (c = h.get(a).get(b))
        return c
      },
      dispose: function () {
        h = new WeakMap()
      },
    }
  }
  function Kb(e) {
    R.call(this)
    this.type = 'MeshDepthMaterial'
    this.depthPacking = 3200
    this.morphTargets = this.skinning = !1
    this.displacementMap = this.alphaMap = this.map = null
    this.displacementScale = 1
    this.displacementBias = 0
    this.wireframe = !1
    this.wireframeLinewidth = 1
    this.fog = !1
    this.setValues(e)
  }
  function Lb(e) {
    R.call(this)
    this.type = 'MeshDistanceMaterial'
    this.referencePosition = new q()
    this.nearDistance = 1
    this.farDistance = 1e3
    this.morphTargets = this.skinning = !1
    this.displacementMap = this.alphaMap = this.map = null
    this.displacementScale = 1
    this.displacementBias = 0
    this.fog = !1
    this.setValues(e)
  }
  function ui(e, h, a) {
    function b(a, b, c) {
      c = (a << 0) | (b << 1) | (c << 2)
      var d = p[c]
      void 0 === d &&
        ((d = new Kb({ depthPacking: 3201, morphTargets: a, skinning: b })),
        (p[c] = d))
      return d
    }
    function c(a, b, c) {
      c = (a << 0) | (b << 1) | (c << 2)
      var d = l[c]
      void 0 === d &&
        ((d = new Lb({ morphTargets: a, skinning: b })), (l[c] = d))
      return d
    }
    function d(a, d, f, h, g, k) {
      var m = a.geometry,
        n = b,
        p = a.customDepthMaterial
      !0 === f.isPointLight && ((n = c), (p = a.customDistanceMaterial))
      void 0 === p
        ? ((p = !1),
          !0 === d.morphTargets &&
            (!0 === m.isBufferGeometry
              ? (p =
                  m.morphAttributes &&
                  m.morphAttributes.position &&
                  0 < m.morphAttributes.position.length)
              : !0 === m.isGeometry &&
                (p = m.morphTargets && 0 < m.morphTargets.length)),
          (m = !1),
          !0 === a.isSkinnedMesh &&
            (!0 === d.skinning
              ? (m = !0)
              : console.warn(
                  'THREE.WebGLShadowMap: THREE.SkinnedMesh with material.skinning set to false:',
                  a,
                )),
          (a = n(p, m, !0 === a.isInstancedMesh)))
        : (a = p)
      e.localClippingEnabled &&
        !0 === d.clipShadows &&
        0 !== d.clippingPlanes.length &&
        ((p = a.uuid),
        (n = d.uuid),
        (m = t[p]),
        void 0 === m && ((m = {}), (t[p] = m)),
        (p = m[n]),
        void 0 === p && ((p = a.clone()), (m[n] = p)),
        (a = p))
      a.visible = d.visible
      a.wireframe = d.wireframe
      a.side =
        3 === k
          ? null !== d.shadowSide
            ? d.shadowSide
            : d.side
          : null !== d.shadowSide
          ? d.shadowSide
          : r[d.side]
      a.clipShadows = d.clipShadows
      a.clippingPlanes = d.clippingPlanes
      a.clipIntersection = d.clipIntersection
      a.wireframeLinewidth = d.wireframeLinewidth
      a.linewidth = d.linewidth
      !0 === f.isPointLight &&
        !0 === a.isMeshDistanceMaterial &&
        (a.referencePosition.setFromMatrixPosition(f.matrixWorld),
        (a.nearDistance = h),
        (a.farDistance = g))
      return a
    }
    function f(a, b, c, k, m) {
      if (!1 !== a.visible) {
        if (
          a.layers.test(b.layers) &&
          (a.isMesh || a.isLine || a.isPoints) &&
          (a.castShadow || (a.receiveShadow && 3 === m)) &&
          (!a.frustumCulled || g.intersectsObject(a))
        ) {
          a.modelViewMatrix.multiplyMatrices(
            c.matrixWorldInverse,
            a.matrixWorld,
          )
          var n = h.update(a),
            p = a.material
          if (Array.isArray(p))
            for (var r = n.groups, l = 0, y = r.length; l < y; l++) {
              var t = r[l],
                u = p[t.materialIndex]
              u &&
                u.visible &&
                ((u = d(a, u, k, c.near, c.far, m)),
                e.renderBufferDirect(c, null, n, u, a, t))
            }
          else
            p.visible &&
              ((u = d(a, p, k, c.near, c.far, m)),
              e.renderBufferDirect(c, null, n, u, a, null))
        }
        a = a.children
        n = 0
        for (p = a.length; n < p; n++) f(a[n], b, c, k, m)
      }
    }
    var g = new Sd(),
      k = new z(),
      m = new z(),
      n = new ca(),
      p = [],
      l = [],
      t = {},
      r = { 0: 1, 1: 0, 2: 2 },
      u = new Aa({
        defines: { SAMPLE_RATE: 0.25, HALF_SAMPLE_RATE: 0.125 },
        uniforms: {
          shadow_pass: { value: null },
          resolution: { value: new z() },
          radius: { value: 4 },
        },
        vertexShader:
          'void main() {\n\tgl_Position = vec4( position, 1.0 );\n}',
        fragmentShader:
          'uniform sampler2D shadow_pass;\nuniform vec2 resolution;\nuniform float radius;\n#include <packing>\nvoid main() {\n  float mean = 0.0;\n  float squared_mean = 0.0;\n  \n\tfloat depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy  ) / resolution ) );\n  for ( float i = -1.0; i < 1.0 ; i += SAMPLE_RATE) {\n    #ifdef HORIZONAL_PASS\n      vec2 distribution = decodeHalfRGBA ( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( i, 0.0 ) * radius ) / resolution ) );\n      mean += distribution.x;\n      squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;\n    #else\n      float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0,  i )  * radius ) / resolution ) );\n      mean += depth;\n      squared_mean += depth * depth;\n    #endif\n  }\n  mean = mean * HALF_SAMPLE_RATE;\n  squared_mean = squared_mean * HALF_SAMPLE_RATE;\n  float std_dev = pow( squared_mean - mean * mean, 0.5 );\n  gl_FragColor = encodeHalfRGBA( vec2( mean, std_dev ) );\n}',
      }),
      v = u.clone()
    v.defines.HORIZONAL_PASS = 1
    var q = new G()
    q.setAttribute(
      'position',
      new O(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3),
    )
    var x = new ia(q, u),
      B = this
    this.enabled = !1
    this.autoUpdate = !0
    this.needsUpdate = !1
    this.type = 1
    this.render = function (b, c, d) {
      if (
        !1 !== B.enabled &&
        (!1 !== B.autoUpdate || !1 !== B.needsUpdate) &&
        0 !== b.length
      ) {
        var p = e.getRenderTarget(),
          r = e.getActiveCubeFace(),
          l = e.getActiveMipmapLevel(),
          y = e.state
        y.setBlending(0)
        y.buffers.color.setClear(1, 1, 1, 1)
        y.buffers.depth.setTest(!0)
        y.setScissorTest(!1)
        for (var t = 0, q = b.length; t < q; t++) {
          var w = b[t],
            C = w.shadow
          if (void 0 === C)
            console.warn('THREE.WebGLShadowMap:', w, 'has no shadow.')
          else {
            k.copy(C.mapSize)
            var A = C.getFrameExtents()
            k.multiply(A)
            m.copy(C.mapSize)
            if (k.x > a || k.y > a)
              console.warn(
                'THREE.WebGLShadowMap:',
                w,
                'has shadow exceeding max texture size, reducing',
              ),
                k.x > a &&
                  ((m.x = Math.floor(a / A.x)),
                  (k.x = m.x * A.x),
                  (C.mapSize.x = m.x)),
                k.y > a &&
                  ((m.y = Math.floor(a / A.y)),
                  (k.y = m.y * A.y),
                  (C.mapSize.y = m.y))
            null !== C.map ||
              C.isPointLightShadow ||
              3 !== this.type ||
              ((A = { minFilter: 1006, magFilter: 1006, format: 1023 }),
              (C.map = new sa(k.x, k.y, A)),
              (C.map.texture.name = w.name + '.shadowMap'),
              (C.mapPass = new sa(k.x, k.y, A)),
              C.camera.updateProjectionMatrix())
            null === C.map &&
              ((A = { minFilter: 1003, magFilter: 1003, format: 1023 }),
              (C.map = new sa(k.x, k.y, A)),
              (C.map.texture.name = w.name + '.shadowMap'),
              C.camera.updateProjectionMatrix())
            e.setRenderTarget(C.map)
            e.clear()
            A = C.getViewportCount()
            for (var z = 0; z < A; z++) {
              var Ka = C.getViewport(z)
              n.set(m.x * Ka.x, m.y * Ka.y, m.x * Ka.z, m.y * Ka.w)
              y.viewport(n)
              C.updateMatrices(w, z)
              g = C.getFrustum()
              f(c, d, C.camera, w, this.type)
            }
            C.isPointLightShadow ||
              3 !== this.type ||
              ((w = C),
              (C = d),
              (A = h.update(x)),
              (u.uniforms.shadow_pass.value = w.map.texture),
              (u.uniforms.resolution.value = w.mapSize),
              (u.uniforms.radius.value = w.radius),
              e.setRenderTarget(w.mapPass),
              e.clear(),
              e.renderBufferDirect(C, null, A, u, x, null),
              (v.uniforms.shadow_pass.value = w.mapPass.texture),
              (v.uniforms.resolution.value = w.mapSize),
              (v.uniforms.radius.value = w.radius),
              e.setRenderTarget(w.map),
              e.clear(),
              e.renderBufferDirect(C, null, A, v, x, null))
          }
        }
        B.needsUpdate = !1
        e.setRenderTarget(p, r, l)
      }
    }
  }
  function fl(e, h, a) {
    function b(a, b, c) {
      var d = new Uint8Array(4),
        f = e.createTexture()
      e.bindTexture(a, f)
      e.texParameteri(a, 10241, 9728)
      e.texParameteri(a, 10240, 9728)
      for (a = 0; a < c; a++)
        e.texImage2D(b + a, 0, 6408, 1, 1, 0, 6408, 5121, d)
      return f
    }
    function c(a, b) {
      q[a] = 1
      0 === w[a] && (e.enableVertexAttribArray(a), (w[a] = 1))
      x[a] !== b &&
        ((l ? e : h.get('ANGLE_instanced_arrays'))[
          l ? 'vertexAttribDivisor' : 'vertexAttribDivisorANGLE'
        ](a, b),
        (x[a] = b))
    }
    function d(a) {
      !0 !== B[a] && (e.enable(a), (B[a] = !0))
    }
    function f(a) {
      !1 !== B[a] && (e.disable(a), (B[a] = !1))
    }
    function g(a, b, c, h, g, k, m, n) {
      if (0 === a) A && (f(3042), (A = !1))
      else if ((A || (d(3042), (A = !0)), 5 !== a)) {
        if (a !== z || n !== E) {
          if (100 !== W || 100 !== H) e.blendEquation(32774), (H = W = 100)
          if (n)
            switch (a) {
              case 1:
                e.blendFuncSeparate(1, 771, 1, 771)
                break
              case 2:
                e.blendFunc(1, 1)
                break
              case 3:
                e.blendFuncSeparate(0, 0, 769, 771)
                break
              case 4:
                e.blendFuncSeparate(0, 768, 0, 770)
                break
              default:
                console.error('THREE.WebGLState: Invalid blending: ', a)
            }
          else
            switch (a) {
              case 1:
                e.blendFuncSeparate(770, 771, 1, 771)
                break
              case 2:
                e.blendFunc(770, 1)
                break
              case 3:
                e.blendFunc(0, 769)
                break
              case 4:
                e.blendFunc(0, 768)
                break
              default:
                console.error('THREE.WebGLState: Invalid blending: ', a)
            }
          F = Wd = oa = Ca = null
          z = a
          E = n
        }
      } else {
        g = g || b
        k = k || c
        m = m || h
        if (b !== W || g !== H)
          e.blendEquationSeparate(Uc[b], Uc[g]), (W = b), (H = g)
        if (c !== Ca || h !== oa || k !== Wd || m !== F)
          e.blendFuncSeparate(L[c], L[h], L[k], L[m]),
            (Ca = c),
            (oa = h),
            (Wd = k),
            (F = m)
        z = a
        E = null
      }
    }
    function k(a) {
      G !== a && (a ? e.frontFace(2304) : e.frontFace(2305), (G = a))
    }
    function m(a) {
      0 !== a
        ? (d(2884),
          a !== D &&
            (1 === a
              ? e.cullFace(1029)
              : 2 === a
              ? e.cullFace(1028)
              : e.cullFace(1032)))
        : f(2884)
      D = a
    }
    function n(a, b, c) {
      if (a) {
        if ((d(32823), M !== b || P !== c))
          e.polygonOffset(b, c), (M = b), (P = c)
      } else f(32823)
    }
    function p(a) {
      void 0 === a && (a = 33984 + O - 1)
      N !== a && (e.activeTexture(a), (N = a))
    }
    var l = a.isWebGL2,
      t = new (function () {
        var a = !1,
          b = new ca(),
          c = null,
          d = new ca(0, 0, 0, 0)
        return {
          setMask: function (b) {
            c === b || a || (e.colorMask(b, b, b, b), (c = b))
          },
          setLocked: function (b) {
            a = b
          },
          setClear: function (a, c, f, h, g) {
            !0 === g && ((a *= h), (c *= h), (f *= h))
            b.set(a, c, f, h)
            !1 === d.equals(b) && (e.clearColor(a, c, f, h), d.copy(b))
          },
          reset: function () {
            a = !1
            c = null
            d.set(-1, 0, 0, 0)
          },
        }
      })(),
      r = new (function () {
        var a = !1,
          b = null,
          c = null,
          h = null
        return {
          setTest: function (a) {
            a ? d(2929) : f(2929)
          },
          setMask: function (c) {
            b === c || a || (e.depthMask(c), (b = c))
          },
          setFunc: function (a) {
            if (c !== a) {
              if (a)
                switch (a) {
                  case 0:
                    e.depthFunc(512)
                    break
                  case 1:
                    e.depthFunc(519)
                    break
                  case 2:
                    e.depthFunc(513)
                    break
                  case 3:
                    e.depthFunc(515)
                    break
                  case 4:
                    e.depthFunc(514)
                    break
                  case 5:
                    e.depthFunc(518)
                    break
                  case 6:
                    e.depthFunc(516)
                    break
                  case 7:
                    e.depthFunc(517)
                    break
                  default:
                    e.depthFunc(515)
                }
              else e.depthFunc(515)
              c = a
            }
          },
          setLocked: function (b) {
            a = b
          },
          setClear: function (a) {
            h !== a && (e.clearDepth(a), (h = a))
          },
          reset: function () {
            a = !1
            h = c = b = null
          },
        }
      })(),
      u = new (function () {
        var a = !1,
          b = null,
          c = null,
          h = null,
          g = null,
          k = null,
          m = null,
          n = null,
          p = null
        return {
          setTest: function (b) {
            a || (b ? d(2960) : f(2960))
          },
          setMask: function (c) {
            b === c || a || (e.stencilMask(c), (b = c))
          },
          setFunc: function (a, b, d) {
            if (c !== a || h !== b || g !== d)
              e.stencilFunc(a, b, d), (c = a), (h = b), (g = d)
          },
          setOp: function (a, b, c) {
            if (k !== a || m !== b || n !== c)
              e.stencilOp(a, b, c), (k = a), (m = b), (n = c)
          },
          setLocked: function (b) {
            a = b
          },
          setClear: function (a) {
            p !== a && (e.clearStencil(a), (p = a))
          },
          reset: function () {
            a = !1
            p = n = m = k = g = h = c = b = null
          },
        }
      })()
    a = e.getParameter(34921)
    var q = new Uint8Array(a),
      w = new Uint8Array(a),
      x = new Uint8Array(a),
      B = {},
      C = null,
      A = null,
      z = null,
      W = null,
      Ca = null,
      oa = null,
      H = null,
      Wd = null,
      F = null,
      E = !1,
      G = null,
      D = null,
      K = null,
      M = null,
      P = null,
      O = e.getParameter(35661),
      R = !1
    a = 0
    a = e.getParameter(7938)
    ;-1 !== a.indexOf('WebGL')
      ? ((a = parseFloat(/^WebGL ([0-9])/.exec(a)[1])), (R = 1 <= a))
      : -1 !== a.indexOf('OpenGL ES') &&
        ((a = parseFloat(/^OpenGL ES ([0-9])/.exec(a)[1])), (R = 2 <= a))
    var N = null,
      Ua = {},
      jc = new ca(),
      vi = new ca(),
      Eg = {}
    Eg[3553] = b(3553, 3553, 1)
    Eg[34067] = b(34067, 34069, 6)
    t.setClear(0, 0, 0, 1)
    r.setClear(1)
    u.setClear(0)
    d(2929)
    r.setFunc(3)
    k(!1)
    m(1)
    d(2884)
    g(0)
    var Uc = { 100: 32774, 101: 32778, 102: 32779 }
    l
      ? ((Uc[103] = 32775), (Uc[104] = 32776))
      : ((a = h.get('EXT_blend_minmax')),
        null !== a && ((Uc[103] = a.MIN_EXT), (Uc[104] = a.MIN_EXT)))
    var L = {
      200: 0,
      201: 1,
      202: 768,
      204: 770,
      210: 776,
      208: 774,
      206: 772,
      203: 769,
      205: 771,
      209: 775,
      207: 773,
    }
    return {
      buffers: { color: t, depth: r, stencil: u },
      initAttributes: function () {
        for (var a = 0, b = q.length; a < b; a++) q[a] = 0
      },
      enableAttribute: function (a) {
        c(a, 0)
      },
      enableAttributeAndDivisor: c,
      disableUnusedAttributes: function () {
        for (var a = 0, b = w.length; a !== b; ++a)
          w[a] !== q[a] && (e.disableVertexAttribArray(a), (w[a] = 0))
      },
      enable: d,
      disable: f,
      useProgram: function (a) {
        return C !== a ? (e.useProgram(a), (C = a), !0) : !1
      },
      setBlending: g,
      setMaterial: function (a, b) {
        2 === a.side ? f(2884) : d(2884)
        var c = 1 === a.side
        b && (c = !c)
        k(c)
        1 === a.blending && !1 === a.transparent
          ? g(0)
          : g(
              a.blending,
              a.blendEquation,
              a.blendSrc,
              a.blendDst,
              a.blendEquationAlpha,
              a.blendSrcAlpha,
              a.blendDstAlpha,
              a.premultipliedAlpha,
            )
        r.setFunc(a.depthFunc)
        r.setTest(a.depthTest)
        r.setMask(a.depthWrite)
        t.setMask(a.colorWrite)
        b = a.stencilWrite
        u.setTest(b)
        b &&
          (u.setMask(a.stencilWriteMask),
          u.setFunc(a.stencilFunc, a.stencilRef, a.stencilFuncMask),
          u.setOp(a.stencilFail, a.stencilZFail, a.stencilZPass))
        n(a.polygonOffset, a.polygonOffsetFactor, a.polygonOffsetUnits)
      },
      setFlipSided: k,
      setCullFace: m,
      setLineWidth: function (a) {
        a !== K && (R && e.lineWidth(a), (K = a))
      },
      setPolygonOffset: n,
      setScissorTest: function (a) {
        a ? d(3089) : f(3089)
      },
      activeTexture: p,
      bindTexture: function (a, b) {
        null === N && p()
        var c = Ua[N]
        void 0 === c && ((c = { type: void 0, texture: void 0 }), (Ua[N] = c))
        if (c.type !== a || c.texture !== b)
          e.bindTexture(a, b || Eg[a]), (c.type = a), (c.texture = b)
      },
      unbindTexture: function () {
        var a = Ua[N]
        void 0 !== a &&
          void 0 !== a.type &&
          (e.bindTexture(a.type, null), (a.type = void 0), (a.texture = void 0))
      },
      compressedTexImage2D: function () {
        try {
          e.compressedTexImage2D.apply(e, arguments)
        } catch (Y) {
          console.error('THREE.WebGLState:', Y)
        }
      },
      texImage2D: function () {
        try {
          e.texImage2D.apply(e, arguments)
        } catch (Y) {
          console.error('THREE.WebGLState:', Y)
        }
      },
      texImage3D: function () {
        try {
          e.texImage3D.apply(e, arguments)
        } catch (Y) {
          console.error('THREE.WebGLState:', Y)
        }
      },
      scissor: function (a) {
        !1 === jc.equals(a) && (e.scissor(a.x, a.y, a.z, a.w), jc.copy(a))
      },
      viewport: function (a) {
        !1 === vi.equals(a) && (e.viewport(a.x, a.y, a.z, a.w), vi.copy(a))
      },
      reset: function () {
        for (var a = 0; a < w.length; a++)
          1 === w[a] && (e.disableVertexAttribArray(a), (w[a] = 0))
        B = {}
        N = null
        Ua = {}
        D = G = z = C = null
        t.reset()
        r.reset()
        u.reset()
      },
    }
  }
  function gl(e, h, a, b, c, d, f) {
    function g(a, b) {
      return K
        ? new OffscreenCanvas(a, b)
        : V.createElementNS('http://www.w3.org/1999/xhtml', 'canvas')
    }
    function k(a, b, c, d) {
      var e = 1
      if (a.width > d || a.height > d) e = d / Math.max(a.width, a.height)
      if (1 > e || !0 === b) {
        if (
          ('undefined' !== typeof HTMLImageElement &&
            a instanceof HTMLImageElement) ||
          ('undefined' !== typeof HTMLCanvasElement &&
            a instanceof HTMLCanvasElement) ||
          ('undefined' !== typeof ImageBitmap && a instanceof ImageBitmap)
        )
          return (
            (d = b ? N.floorPowerOfTwo : Math.floor),
            (b = d(e * a.width)),
            (e = d(e * a.height)),
            void 0 === D && (D = g(b, e)),
            (c = c ? g(b, e) : D),
            (c.width = b),
            (c.height = e),
            c.getContext('2d').drawImage(a, 0, 0, b, e),
            console.warn(
              'THREE.WebGLRenderer: Texture has been resized from (' +
                a.width +
                'x' +
                a.height +
                ') to (' +
                b +
                'x' +
                e +
                ').',
            ),
            c
          )
        'data' in a &&
          console.warn(
            'THREE.WebGLRenderer: Image in DataTexture is too big (' +
              a.width +
              'x' +
              a.height +
              ').',
          )
      }
      return a
    }
    function m(a) {
      return N.isPowerOfTwo(a.width) && N.isPowerOfTwo(a.height)
    }
    function n(a, b) {
      return (
        a.generateMipmaps && b && 1003 !== a.minFilter && 1006 !== a.minFilter
      )
    }
    function p(a, c, d, f) {
      e.generateMipmap(a)
      b.get(c).__maxMipLevel = Math.log(Math.max(d, f)) * Math.LOG2E
    }
    function l(a, b) {
      if (!1 === oa) return a
      var c = a
      6403 === a &&
        (5126 === b && (c = 33326),
        5131 === b && (c = 33325),
        5121 === b && (c = 33321))
      6407 === a &&
        (5126 === b && (c = 34837),
        5131 === b && (c = 34843),
        5121 === b && (c = 32849))
      6408 === a &&
        (5126 === b && (c = 34836),
        5131 === b && (c = 34842),
        5121 === b && (c = 32856))
      33325 === c || 33326 === c || 34842 === c || 34836 === c
        ? h.get('EXT_color_buffer_float')
        : (34843 === c || 34837 === c) &&
          console.warn(
            'THREE.WebGLRenderer: Floating point textures with RGB format not supported. Please use RGBA instead.',
          )
      return c
    }
    function t(a) {
      return 1003 === a || 1004 === a || 1005 === a ? 9728 : 9729
    }
    function r(a) {
      a = a.target
      a.removeEventListener('dispose', r)
      var c = b.get(a)
      void 0 !== c.__webglInit &&
        (e.deleteTexture(c.__webglTexture), b.remove(a))
      a.isVideoTexture && G.delete(a)
      f.memory.textures--
    }
    function u(a) {
      a = a.target
      a.removeEventListener('dispose', u)
      var c = b.get(a),
        d = b.get(a.texture)
      if (a) {
        void 0 !== d.__webglTexture && e.deleteTexture(d.__webglTexture)
        a.depthTexture && a.depthTexture.dispose()
        if (a.isWebGLRenderTargetCube)
          for (d = 0; 6 > d; d++)
            e.deleteFramebuffer(c.__webglFramebuffer[d]),
              c.__webglDepthbuffer &&
                e.deleteRenderbuffer(c.__webglDepthbuffer[d])
        else
          e.deleteFramebuffer(c.__webglFramebuffer),
            c.__webglDepthbuffer && e.deleteRenderbuffer(c.__webglDepthbuffer)
        if (a.isWebGLMultiviewRenderTarget) {
          e.deleteTexture(c.__webglColorTexture)
          e.deleteTexture(c.__webglDepthStencilTexture)
          f.memory.textures -= 2
          d = 0
          for (var h = c.__webglViewFramebuffers.length; d < h; d++)
            e.deleteFramebuffer(c.__webglViewFramebuffers[d])
        }
        b.remove(a.texture)
        b.remove(a)
      }
      f.memory.textures--
    }
    function q(c, d) {
      var e = b.get(c)
      if (c.isVideoTexture) {
        var h = f.render.frame
        G.get(c) !== h && (G.set(c, h), c.update())
      }
      if (0 < c.version && e.__version !== c.version)
        if (((h = c.image), void 0 === h))
          console.warn(
            'THREE.WebGLRenderer: Texture marked for update but image is undefined',
          )
        else if (!1 === h.complete)
          console.warn(
            'THREE.WebGLRenderer: Texture marked for update but image is incomplete',
          )
        else {
          A(e, c, d)
          return
        }
      a.activeTexture(33984 + d)
      a.bindTexture(3553, e.__webglTexture)
    }
    function w(c, f) {
      if (6 === c.image.length) {
        var h = b.get(c)
        if (0 < c.version && h.__version !== c.version) {
          C(h, c)
          a.activeTexture(33984 + f)
          a.bindTexture(34067, h.__webglTexture)
          e.pixelStorei(37440, c.flipY)
          var g = c && c.isCompressedTexture
          f = c.image[0] && c.image[0].isDataTexture
          for (var r = [], y = 0; 6 > y; y++)
            r[y] =
              g || f
                ? f
                  ? c.image[y].image
                  : c.image[y]
                : k(c.image[y], !1, !0, Wd)
          var t = r[0],
            u = m(t) || oa,
            q = d.convert(c.format),
            v = d.convert(c.type),
            x = l(q, v)
          B(34067, c, u)
          if (g) {
            for (y = 0; 6 > y; y++) {
              var w = r[y].mipmaps
              for (g = 0; g < w.length; g++) {
                var A = w[g]
                1023 !== c.format && 1022 !== c.format
                  ? null !== q
                    ? a.compressedTexImage2D(
                        34069 + y,
                        g,
                        x,
                        A.width,
                        A.height,
                        0,
                        A.data,
                      )
                    : console.warn(
                        'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()',
                      )
                  : a.texImage2D(
                      34069 + y,
                      g,
                      x,
                      A.width,
                      A.height,
                      0,
                      q,
                      v,
                      A.data,
                    )
              }
            }
            h.__maxMipLevel = w.length - 1
          } else {
            w = c.mipmaps
            for (y = 0; 6 > y; y++)
              if (f)
                for (
                  a.texImage2D(
                    34069 + y,
                    0,
                    x,
                    r[y].width,
                    r[y].height,
                    0,
                    q,
                    v,
                    r[y].data,
                  ),
                    g = 0;
                  g < w.length;
                  g++
                )
                  (A = w[g]),
                    (A = A.image[y].image),
                    a.texImage2D(
                      34069 + y,
                      g + 1,
                      x,
                      A.width,
                      A.height,
                      0,
                      q,
                      v,
                      A.data,
                    )
              else
                for (
                  a.texImage2D(34069 + y, 0, x, q, v, r[y]), g = 0;
                  g < w.length;
                  g++
                )
                  (A = w[g]),
                    a.texImage2D(34069 + y, g + 1, x, q, v, A.image[y])
            h.__maxMipLevel = w.length
          }
          n(c, u) && p(34067, c, t.width, t.height)
          h.__version = c.version
          if (c.onUpdate) c.onUpdate(c)
        } else
          a.activeTexture(33984 + f), a.bindTexture(34067, h.__webglTexture)
      }
    }
    function x(c, d) {
      a.activeTexture(33984 + d)
      a.bindTexture(34067, b.get(c).__webglTexture)
    }
    function B(a, d, f) {
      f
        ? (e.texParameteri(a, 10242, P[d.wrapS]),
          e.texParameteri(a, 10243, P[d.wrapT]),
          (32879 !== a && 35866 !== a) || e.texParameteri(a, 32882, P[d.wrapR]),
          e.texParameteri(a, 10240, R[d.magFilter]),
          e.texParameteri(a, 10241, R[d.minFilter]))
        : (e.texParameteri(a, 10242, 33071),
          e.texParameteri(a, 10243, 33071),
          (32879 !== a && 35866 !== a) || e.texParameteri(a, 32882, 33071),
          (1001 === d.wrapS && 1001 === d.wrapT) ||
            console.warn(
              'THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.',
            ),
          e.texParameteri(a, 10240, t(d.magFilter)),
          e.texParameteri(a, 10241, t(d.minFilter)),
          1003 !== d.minFilter &&
            1006 !== d.minFilter &&
            console.warn(
              'THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.',
            ))
      !(f = h.get('EXT_texture_filter_anisotropic')) ||
        (1015 === d.type && null === h.get('OES_texture_float_linear')) ||
        (1016 === d.type &&
          null === (oa || h.get('OES_texture_half_float_linear'))) ||
        !(1 < d.anisotropy || b.get(d).__currentAnisotropy) ||
        (e.texParameterf(
          a,
          f.TEXTURE_MAX_ANISOTROPY_EXT,
          Math.min(d.anisotropy, c.getMaxAnisotropy()),
        ),
        (b.get(d).__currentAnisotropy = d.anisotropy))
    }
    function C(a, b) {
      void 0 === a.__webglInit &&
        ((a.__webglInit = !0),
        b.addEventListener('dispose', r),
        (a.__webglTexture = e.createTexture()),
        f.memory.textures++)
    }
    function A(b, c, f) {
      var h = 3553
      c.isDataTexture2DArray && (h = 35866)
      c.isDataTexture3D && (h = 32879)
      C(b, c)
      a.activeTexture(33984 + f)
      a.bindTexture(h, b.__webglTexture)
      e.pixelStorei(37440, c.flipY)
      e.pixelStorei(37441, c.premultiplyAlpha)
      e.pixelStorei(3317, c.unpackAlignment)
      f = oa
        ? !1
        : 1001 !== c.wrapS ||
          1001 !== c.wrapT ||
          (1003 !== c.minFilter && 1006 !== c.minFilter)
      f = f && !1 === m(c.image)
      f = k(c.image, f, !1, F)
      var g = m(f) || oa,
        y = d.convert(c.format),
        r = d.convert(c.type),
        t = l(y, r)
      B(h, c, g)
      var u = c.mipmaps
      if (c.isDepthTexture) {
        t = 6402
        if (1015 === c.type) {
          if (!1 === oa)
            throw Error('Float Depth Texture only supported in WebGL2.0')
          t = 36012
        } else oa && (t = 33189)
        1026 === c.format &&
          6402 === t &&
          1012 !== c.type &&
          1014 !== c.type &&
          (console.warn(
            'THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.',
          ),
          (c.type = 1012),
          (r = d.convert(c.type)))
        1027 === c.format &&
          ((t = 34041),
          1020 !== c.type &&
            (console.warn(
              'THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.',
            ),
            (c.type = 1020),
            (r = d.convert(c.type))))
        a.texImage2D(3553, 0, t, f.width, f.height, 0, y, r, null)
      } else if (c.isDataTexture)
        if (0 < u.length && g) {
          for (var q = 0, v = u.length; q < v; q++)
            (h = u[q]),
              a.texImage2D(3553, q, t, h.width, h.height, 0, y, r, h.data)
          c.generateMipmaps = !1
          b.__maxMipLevel = u.length - 1
        } else
          a.texImage2D(3553, 0, t, f.width, f.height, 0, y, r, f.data),
            (b.__maxMipLevel = 0)
      else if (c.isCompressedTexture) {
        q = 0
        for (v = u.length; q < v; q++)
          (h = u[q]),
            1023 !== c.format && 1022 !== c.format
              ? null !== y
                ? a.compressedTexImage2D(
                    3553,
                    q,
                    t,
                    h.width,
                    h.height,
                    0,
                    h.data,
                  )
                : console.warn(
                    'THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()',
                  )
              : a.texImage2D(3553, q, t, h.width, h.height, 0, y, r, h.data)
        b.__maxMipLevel = u.length - 1
      } else if (c.isDataTexture2DArray)
        a.texImage3D(35866, 0, t, f.width, f.height, f.depth, 0, y, r, f.data),
          (b.__maxMipLevel = 0)
      else if (c.isDataTexture3D)
        a.texImage3D(32879, 0, t, f.width, f.height, f.depth, 0, y, r, f.data),
          (b.__maxMipLevel = 0)
      else if (0 < u.length && g) {
        q = 0
        for (v = u.length; q < v; q++)
          (h = u[q]), a.texImage2D(3553, q, t, y, r, h)
        c.generateMipmaps = !1
        b.__maxMipLevel = u.length - 1
      } else a.texImage2D(3553, 0, t, y, r, f), (b.__maxMipLevel = 0)
      n(c, g) && p(3553, c, f.width, f.height)
      b.__version = c.version
      if (c.onUpdate) c.onUpdate(c)
    }
    function z(c, f, h, g) {
      var k = d.convert(f.texture.format),
        m = d.convert(f.texture.type),
        n = l(k, m)
      a.texImage2D(g, 0, n, f.width, f.height, 0, k, m, null)
      e.bindFramebuffer(36160, c)
      e.framebufferTexture2D(36160, h, g, b.get(f.texture).__webglTexture, 0)
      e.bindFramebuffer(36160, null)
    }
    function W(a, b, c) {
      e.bindRenderbuffer(36161, a)
      if (b.depthBuffer && !b.stencilBuffer)
        c
          ? ((c = Ca(b)),
            e.renderbufferStorageMultisample(
              36161,
              c,
              33189,
              b.width,
              b.height,
            ))
          : e.renderbufferStorage(36161, 33189, b.width, b.height),
          e.framebufferRenderbuffer(36160, 36096, 36161, a)
      else if (b.depthBuffer && b.stencilBuffer)
        c
          ? ((c = Ca(b)),
            e.renderbufferStorageMultisample(
              36161,
              c,
              35056,
              b.width,
              b.height,
            ))
          : e.renderbufferStorage(36161, 34041, b.width, b.height),
          e.framebufferRenderbuffer(36160, 33306, 36161, a)
      else {
        a = d.convert(b.texture.format)
        var f = d.convert(b.texture.type)
        a = l(a, f)
        c
          ? ((c = Ca(b)),
            e.renderbufferStorageMultisample(36161, c, a, b.width, b.height))
          : e.renderbufferStorage(36161, a, b.width, b.height)
      }
      e.bindRenderbuffer(36161, null)
    }
    function Ca(a) {
      return oa && a.isWebGLMultisampleRenderTarget ? Math.min(E, a.samples) : 0
    }
    var oa = c.isWebGL2,
      H = c.maxTextures,
      Wd = c.maxCubemapSize,
      F = c.maxTextureSize,
      E = c.maxSamples,
      G = new WeakMap(),
      D,
      K =
        'undefined' !== typeof OffscreenCanvas &&
        null !== new OffscreenCanvas(1, 1).getContext('2d'),
      M = 0,
      P = { 1e3: 10497, 1001: 33071, 1002: 33648 },
      R = {
        1003: 9728,
        1004: 9984,
        1005: 9986,
        1006: 9729,
        1007: 9985,
        1008: 9987,
      },
      O = !1,
      I = !1
    this.allocateTextureUnit = function () {
      var a = M
      a >= H &&
        console.warn(
          'THREE.WebGLTextures: Trying to use ' +
            a +
            ' texture units while this GPU supports only ' +
            H,
        )
      M += 1
      return a
    }
    this.resetTextureUnits = function () {
      M = 0
    }
    this.setTexture2D = q
    this.setTexture2DArray = function (c, d) {
      var e = b.get(c)
      0 < c.version && e.__version !== c.version
        ? A(e, c, d)
        : (a.activeTexture(33984 + d), a.bindTexture(35866, e.__webglTexture))
    }
    this.setTexture3D = function (c, d) {
      var e = b.get(c)
      0 < c.version && e.__version !== c.version
        ? A(e, c, d)
        : (a.activeTexture(33984 + d), a.bindTexture(32879, e.__webglTexture))
    }
    this.setTextureCube = w
    this.setTextureCubeDynamic = x
    this.setupRenderTarget = function (c) {
      var g = b.get(c),
        k = b.get(c.texture)
      c.addEventListener('dispose', u)
      k.__webglTexture = e.createTexture()
      f.memory.textures++
      var y = !0 === c.isWebGLRenderTargetCube,
        r = !0 === c.isWebGLMultisampleRenderTarget,
        t = !0 === c.isWebGLMultiviewRenderTarget,
        v = m(c) || oa
      if (y) {
        g.__webglFramebuffer = []
        for (var x = 0; 6 > x; x++)
          g.__webglFramebuffer[x] = e.createFramebuffer()
      } else if (((g.__webglFramebuffer = e.createFramebuffer()), r))
        if (oa) {
          g.__webglMultisampledFramebuffer = e.createFramebuffer()
          g.__webglColorRenderbuffer = e.createRenderbuffer()
          e.bindRenderbuffer(36161, g.__webglColorRenderbuffer)
          r = d.convert(c.texture.format)
          var w = d.convert(c.texture.type)
          r = l(r, w)
          w = Ca(c)
          e.renderbufferStorageMultisample(36161, w, r, c.width, c.height)
          e.bindFramebuffer(36160, g.__webglMultisampledFramebuffer)
          e.framebufferRenderbuffer(
            36160,
            36064,
            36161,
            g.__webglColorRenderbuffer,
          )
          e.bindRenderbuffer(36161, null)
          c.depthBuffer &&
            ((g.__webglDepthRenderbuffer = e.createRenderbuffer()),
            W(g.__webglDepthRenderbuffer, c, !0))
          e.bindFramebuffer(36160, null)
        } else
          console.warn(
            'THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.',
          )
      else if (t) {
        x = c.width
        var C = c.height
        r = c.numViews
        e.bindFramebuffer(36160, g.__webglFramebuffer)
        var A = h.get('OVR_multiview2')
        f.memory.textures += 2
        w = e.createTexture()
        e.bindTexture(35866, w)
        e.texParameteri(35866, 10240, 9728)
        e.texParameteri(35866, 10241, 9728)
        e.texImage3D(35866, 0, 32856, x, C, r, 0, 6408, 5121, null)
        A.framebufferTextureMultiviewOVR(36160, 36064, w, 0, 0, r)
        var H = e.createTexture()
        e.bindTexture(35866, H)
        e.texParameteri(35866, 10240, 9728)
        e.texParameteri(35866, 10241, 9728)
        e.texImage3D(35866, 0, 35056, x, C, r, 0, 34041, 34042, null)
        A.framebufferTextureMultiviewOVR(36160, 33306, H, 0, 0, r)
        C = Array(r)
        for (x = 0; x < r; ++x)
          (C[x] = e.createFramebuffer()),
            e.bindFramebuffer(36160, C[x]),
            e.framebufferTextureLayer(36160, 36064, w, 0, x)
        g.__webglColorTexture = w
        g.__webglDepthStencilTexture = H
        g.__webglViewFramebuffers = C
        e.bindFramebuffer(36160, null)
        e.bindTexture(35866, null)
      }
      if (y) {
        a.bindTexture(34067, k.__webglTexture)
        B(34067, c.texture, v)
        for (x = 0; 6 > x; x++) z(g.__webglFramebuffer[x], c, 36064, 34069 + x)
        n(c.texture, v) && p(34067, c.texture, c.width, c.height)
        a.bindTexture(34067, null)
      } else
        t ||
          (a.bindTexture(3553, k.__webglTexture),
          B(3553, c.texture, v),
          z(g.__webglFramebuffer, c, 36064, 3553),
          n(c.texture, v) && p(3553, c.texture, c.width, c.height),
          a.bindTexture(3553, null))
      if (c.depthBuffer) {
        g = b.get(c)
        k = !0 === c.isWebGLRenderTargetCube
        if (c.depthTexture) {
          if (k)
            throw Error(
              'target.depthTexture not supported in Cube render targets',
            )
          if (c && c.isWebGLRenderTargetCube)
            throw Error(
              'Depth Texture with cube render targets is not supported',
            )
          e.bindFramebuffer(36160, g.__webglFramebuffer)
          if (!c.depthTexture || !c.depthTexture.isDepthTexture)
            throw Error(
              'renderTarget.depthTexture must be an instance of THREE.DepthTexture',
            )
          ;(b.get(c.depthTexture).__webglTexture &&
            c.depthTexture.image.width === c.width &&
            c.depthTexture.image.height === c.height) ||
            ((c.depthTexture.image.width = c.width),
            (c.depthTexture.image.height = c.height),
            (c.depthTexture.needsUpdate = !0))
          q(c.depthTexture, 0)
          g = b.get(c.depthTexture).__webglTexture
          if (1026 === c.depthTexture.format)
            e.framebufferTexture2D(36160, 36096, 3553, g, 0)
          else if (1027 === c.depthTexture.format)
            e.framebufferTexture2D(36160, 33306, 3553, g, 0)
          else throw Error('Unknown depthTexture format')
        } else if (k)
          for (g.__webglDepthbuffer = [], k = 0; 6 > k; k++)
            e.bindFramebuffer(36160, g.__webglFramebuffer[k]),
              (g.__webglDepthbuffer[k] = e.createRenderbuffer()),
              W(g.__webglDepthbuffer[k], c)
        else
          e.bindFramebuffer(36160, g.__webglFramebuffer),
            (g.__webglDepthbuffer = e.createRenderbuffer()),
            W(g.__webglDepthbuffer, c)
        e.bindFramebuffer(36160, null)
      }
    }
    this.updateRenderTargetMipmap = function (c) {
      var d = c.texture,
        e = m(c) || oa
      if (n(d, e)) {
        e = c.isWebGLRenderTargetCube ? 34067 : 3553
        var f = b.get(d).__webglTexture
        a.bindTexture(e, f)
        p(e, d, c.width, c.height)
        a.bindTexture(e, null)
      }
    }
    this.updateMultisampleRenderTarget = function (a) {
      if (a.isWebGLMultisampleRenderTarget)
        if (oa) {
          var c = b.get(a)
          e.bindFramebuffer(36008, c.__webglMultisampledFramebuffer)
          e.bindFramebuffer(36009, c.__webglFramebuffer)
          c = a.width
          var d = a.height,
            f = 16384
          a.depthBuffer && (f |= 256)
          a.stencilBuffer && (f |= 1024)
          e.blitFramebuffer(0, 0, c, d, 0, 0, c, d, f, 9728)
        } else
          console.warn(
            'THREE.WebGLRenderer: WebGLMultisampleRenderTarget can only be used with WebGL2.',
          )
    }
    this.safeSetTexture2D = function (a, b) {
      a &&
        a.isWebGLRenderTarget &&
        (!1 === O &&
          (console.warn(
            "THREE.WebGLTextures.safeSetTexture2D: don't use render targets as textures. Use their .texture property instead.",
          ),
          (O = !0)),
        (a = a.texture))
      q(a, b)
    }
    this.safeSetTextureCube = function (a, b) {
      a &&
        a.isWebGLRenderTargetCube &&
        (!1 === I &&
          (console.warn(
            "THREE.WebGLTextures.safeSetTextureCube: don't use cube render targets as textures. Use their .texture property instead.",
          ),
          (I = !0)),
        (a = a.texture))
      ;(a && a.isCubeTexture) ||
      (Array.isArray(a.image) && 6 === a.image.length)
        ? w(a, b)
        : x(a, b)
    }
  }
  function wi(e, h, a) {
    var b = a.isWebGL2
    return {
      convert: function (a) {
        if (1009 === a) return 5121
        if (1017 === a) return 32819
        if (1018 === a) return 32820
        if (1019 === a) return 33635
        if (1010 === a) return 5120
        if (1011 === a) return 5122
        if (1012 === a) return 5123
        if (1013 === a) return 5124
        if (1014 === a) return 5125
        if (1015 === a) return 5126
        if (1016 === a) {
          if (b) return 5131
          var c = h.get('OES_texture_half_float')
          return null !== c ? c.HALF_FLOAT_OES : null
        }
        if (1021 === a) return 6406
        if (1022 === a) return 6407
        if (1023 === a) return 6408
        if (1024 === a) return 6409
        if (1025 === a) return 6410
        if (1026 === a) return 6402
        if (1027 === a) return 34041
        if (1028 === a) return 6403
        if (33776 === a || 33777 === a || 33778 === a || 33779 === a)
          if (((c = h.get('WEBGL_compressed_texture_s3tc')), null !== c)) {
            if (33776 === a) return c.COMPRESSED_RGB_S3TC_DXT1_EXT
            if (33777 === a) return c.COMPRESSED_RGBA_S3TC_DXT1_EXT
            if (33778 === a) return c.COMPRESSED_RGBA_S3TC_DXT3_EXT
            if (33779 === a) return c.COMPRESSED_RGBA_S3TC_DXT5_EXT
          } else return null
        if (35840 === a || 35841 === a || 35842 === a || 35843 === a)
          if (((c = h.get('WEBGL_compressed_texture_pvrtc')), null !== c)) {
            if (35840 === a) return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG
            if (35841 === a) return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG
            if (35842 === a) return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG
            if (35843 === a) return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG
          } else return null
        if (36196 === a)
          return (
            (c = h.get('WEBGL_compressed_texture_etc1')),
            null !== c ? c.COMPRESSED_RGB_ETC1_WEBGL : null
          )
        if (
          37808 === a ||
          37809 === a ||
          37810 === a ||
          37811 === a ||
          37812 === a ||
          37813 === a ||
          37814 === a ||
          37815 === a ||
          37816 === a ||
          37817 === a ||
          37818 === a ||
          37819 === a ||
          37820 === a ||
          37821 === a
        )
          return (
            (c = h.get('WEBGL_compressed_texture_astc')), null !== c ? a : null
          )
        if (1020 === a) {
          if (b) return 34042
          c = h.get('WEBGL_depth_texture')
          return null !== c ? c.UNSIGNED_INT_24_8_WEBGL : null
        }
      },
    }
  }
  function Fg(e, h, a, b) {
    sa.call(this, e, h, b)
    this.stencilBuffer = this.depthBuffer = !1
    this.numViews = a
  }
  function hl(e, h) {
    function a(a) {
      if (a.isArrayCamera) return a.cameras
      n[0] = a
      return n
    }
    function b(a) {
      if (void 0 === a.isArrayCamera) return !0
      a = a.cameras
      if (a.length > l) return !1
      for (var b = 1, c = a.length; b < c; b++)
        if (
          a[0].viewport.z !== a[b].viewport.z ||
          a[0].viewport.w !== a[b].viewport.w
        )
          return !1
      return !0
    }
    var c = e.extensions,
      d = e.properties,
      f,
      g,
      k,
      m,
      n,
      p,
      y,
      l = 0
    this.isAvailable = function () {
      if (void 0 === y) {
        var a = c.get('OVR_multiview2')
        if ((y = null !== a && !1 === h.getContextAttributes().antialias))
          for (
            l = h.getParameter(a.MAX_VIEWS_OVR),
              f = new Fg(0, 0, 2),
              p = new z(),
              m = [],
              k = [],
              n = [],
              a = 0;
            a < l;
            a++
          )
            (m[a] = new I()), (k[a] = new ka())
      }
      return y
    }
    this.attachCamera = function (a) {
      if (!1 !== b(a)) {
        ;(g = e.getRenderTarget())
          ? p.set(g.width, g.height)
          : e.getDrawingBufferSize(p)
        if (a.isArrayCamera) {
          var c = a.cameras[0].viewport
          f.setSize(c.z, c.w)
          f.setNumViews(a.cameras.length)
        } else f.setSize(p.x, p.y), f.setNumViews(2)
        e.setRenderTarget(f)
      }
    }
    this.detachCamera = function (a) {
      if (f === e.getRenderTarget()) {
        e.setRenderTarget(g)
        var b = f,
          c = b.numViews,
          k = d.get(b).__webglViewFramebuffers,
          m = b.width
        b = b.height
        if (a.isArrayCamera)
          for (var n = 0; n < c; n++) {
            var y = a.cameras[n].viewport,
              l = y.x,
              r = y.y,
              t = l + y.z
            y = r + y.w
            h.bindFramebuffer(36008, k[n])
            h.blitFramebuffer(0, 0, m, b, l, r, t, y, 16384, 9728)
          }
        else
          h.bindFramebuffer(36008, k[0]),
            h.blitFramebuffer(0, 0, m, b, 0, 0, p.x, p.y, 16384, 9728)
      }
    }
    this.updateCameraProjectionMatricesUniform = function (b, c) {
      b = a(b)
      for (var d = 0; d < b.length; d++) m[d].copy(b[d].projectionMatrix)
      c.setValue(h, 'projectionMatrices', m)
    }
    this.updateCameraViewMatricesUniform = function (b, c) {
      b = a(b)
      for (var d = 0; d < b.length; d++) m[d].copy(b[d].matrixWorldInverse)
      c.setValue(h, 'viewMatrices', m)
    }
    this.updateObjectMatricesUniforms = function (b, c, d) {
      c = a(c)
      for (var e = 0; e < c.length; e++)
        m[e].multiplyMatrices(c[e].matrixWorldInverse, b.matrixWorld),
          k[e].getNormalMatrix(m[e])
      d.setValue(h, 'modelViewMatrices', m)
      d.setValue(h, 'normalMatrices', k)
    }
  }
  function Vc() {
    E.call(this)
    this.type = 'Group'
  }
  function Yd(e) {
    na.call(this)
    this.cameras = e || []
  }
  function xi(e, h, a) {
    yi.setFromMatrixPosition(h.matrixWorld)
    zi.setFromMatrixPosition(a.matrixWorld)
    var b = yi.distanceTo(zi),
      c = h.projectionMatrix.elements,
      d = a.projectionMatrix.elements,
      f = c[14] / (c[10] - 1)
    a = c[14] / (c[10] + 1)
    var g = (c[9] + 1) / c[5],
      k = (c[9] - 1) / c[5],
      m = (c[8] - 1) / c[0],
      n = (d[8] + 1) / d[0]
    c = f * m
    d = f * n
    n = b / (-m + n)
    m = n * -m
    h.matrixWorld.decompose(e.position, e.quaternion, e.scale)
    e.translateX(m)
    e.translateZ(n)
    e.matrixWorld.compose(e.position, e.quaternion, e.scale)
    e.matrixWorldInverse.getInverse(e.matrixWorld)
    h = f + n
    f = a + n
    e.projectionMatrix.makePerspective(
      c - m,
      d + (b - m),
      ((g * a) / f) * h,
      ((k * a) / f) * h,
      h,
      f,
    )
  }
  function Gg(e) {
    function h() {
      return null !== g && !0 === g.isPresenting
    }
    function a() {
      if (h()) {
        var a = g.getEyeParameters('left')
        c = 2 * a.renderWidth * l
        d = a.renderHeight * l
        Ka = e.getPixelRatio()
        e.getSize(A)
        e.setDrawingBufferSize(c, d, 1)
        x.viewport.set(0, 0, c / 2, d)
        B.viewport.set(c / 2, 0, c / 2, d)
        Ca.start()
        f.dispatchEvent({ type: 'sessionstart' })
      } else f.enabled && e.setDrawingBufferSize(A.width, A.height, Ka), Ca.stop(), f.dispatchEvent({ type: 'sessionend' })
    }
    function b(a, b) {
      null !== b &&
        4 === b.length &&
        a.set(b[0] * c, b[1] * d, b[2] * c, b[3] * d)
    }
    var c,
      d,
      f = this,
      g = null,
      k = null,
      m = null,
      n = [],
      p = new I(),
      y = new I(),
      l = 1,
      r = 'local-floor'
    'undefined' !== typeof kc &&
      'VRFrameData' in kc &&
      ((k = new fa()), Th('vrdisplaypresentchange', a))
    var u = new I(),
      v = new ya(),
      w = new q(),
      x = new na()
    x.viewport = new ca()
    x.layers.enable(1)
    var B = new na()
    B.viewport = new ca()
    B.layers.enable(2)
    var C = new Yd([x, B])
    C.layers.enable(1)
    C.layers.enable(2)
    var A = new z(),
      Ka,
      W = []
    this.enabled = !1
    this.getController = function (a) {
      var b = n[a]
      void 0 === b &&
        ((b = new Vc()),
        (b.matrixAutoUpdate = !1),
        (b.visible = !1),
        (n[a] = b))
      return b
    }
    this.getDevice = function () {
      return g
    }
    this.setDevice = function (a) {
      void 0 !== a && (g = a)
      Ca.setContext(a)
    }
    this.setFramebufferScaleFactor = function (a) {
      l = a
    }
    this.setReferenceSpaceType = function (a) {
      r = a
    }
    this.setPoseTarget = function (a) {
      void 0 !== a && (m = a)
    }
    this.getCamera = function (a) {
      var c = 'local-floor' === r ? 1.6 : 0
      if (!1 === h()) return a.position.set(0, c, 0), a.rotation.set(0, 0, 0), a
      g.depthNear = a.near
      g.depthFar = a.far
      g.getFrameData(k)
      if ('local-floor' === r) {
        var d = g.stageParameters
        d
          ? p.fromArray(d.sittingToStandingTransform)
          : p.makeTranslation(0, c, 0)
      }
      c = k.pose
      d = null !== m ? m : a
      d.matrix.copy(p)
      d.matrix.decompose(d.position, d.quaternion, d.scale)
      null !== c.orientation &&
        (v.fromArray(c.orientation), d.quaternion.multiply(v))
      null !== c.position &&
        (v.setFromRotationMatrix(p),
        w.fromArray(c.position),
        w.applyQuaternion(v),
        d.position.add(w))
      d.updateMatrixWorld()
      x.near = a.near
      B.near = a.near
      x.far = a.far
      B.far = a.far
      x.matrixWorldInverse.fromArray(k.leftViewMatrix)
      B.matrixWorldInverse.fromArray(k.rightViewMatrix)
      y.getInverse(p)
      'local-floor' === r &&
        (x.matrixWorldInverse.multiply(y), B.matrixWorldInverse.multiply(y))
      a = d.parent
      null !== a &&
        (u.getInverse(a.matrixWorld),
        x.matrixWorldInverse.multiply(u),
        B.matrixWorldInverse.multiply(u))
      x.matrixWorld.getInverse(x.matrixWorldInverse)
      B.matrixWorld.getInverse(B.matrixWorldInverse)
      x.projectionMatrix.fromArray(k.leftProjectionMatrix)
      B.projectionMatrix.fromArray(k.rightProjectionMatrix)
      xi(C, x, B)
      a = g.getLayers()
      a.length &&
        ((a = a[0]), b(x.viewport, a.leftBounds), b(B.viewport, a.rightBounds))
      a: for (a = 0; a < n.length; a++) {
        c = n[a]
        b: {
          d = a
          for (
            var e = navigator.getGamepads && navigator.getGamepads(),
              f = 0,
              l = e.length;
            f < l;
            f++
          ) {
            var t = e[f]
            if (
              t &&
              ('Daydream Controller' === t.id ||
                'Gear VR Controller' === t.id ||
                'Oculus Go Controller' === t.id ||
                'OpenVR Gamepad' === t.id ||
                t.id.startsWith('Oculus Touch') ||
                t.id.startsWith('HTC Vive Focus') ||
                t.id.startsWith('Spatial Controller'))
            ) {
              var q = t.hand
              if (
                (0 === d && ('' === q || 'right' === q)) ||
                (1 === d && 'left' === q)
              ) {
                d = t
                break b
              }
            }
          }
          d = void 0
        }
        if (void 0 !== d && void 0 !== d.pose) {
          if (null === d.pose) break a
          e = d.pose
          !1 === e.hasPosition && c.position.set(0.2, -0.6, -0.05)
          null !== e.position && c.position.fromArray(e.position)
          null !== e.orientation && c.quaternion.fromArray(e.orientation)
          c.matrix.compose(c.position, c.quaternion, c.scale)
          c.matrix.premultiply(p)
          c.matrix.decompose(c.position, c.quaternion, c.scale)
          c.matrixWorldNeedsUpdate = !0
          c.visible = !0
          e = 'Daydream Controller' === d.id ? 0 : 1
          void 0 === W[a] && (W[a] = !1)
          W[a] !== d.buttons[e].pressed &&
            ((W[a] = d.buttons[e].pressed),
            !0 === W[a]
              ? c.dispatchEvent({ type: 'selectstart' })
              : (c.dispatchEvent({ type: 'selectend' }),
                c.dispatchEvent({ type: 'select' })))
        } else c.visible = !1
      }
      return C
    }
    this.getStandingMatrix = function () {
      return p
    }
    this.isPresenting = h
    var Ca = new zg()
    this.setAnimationLoop = function (a) {
      Ca.setAnimationLoop(a)
      h() && Ca.start()
    }
    this.submitFrame = function () {
      h() && g.submitFrame()
    }
    this.dispose = function () {
      'undefined' !== typeof kc && Uh('vrdisplaypresentchange', a)
    }
    this.setFrameOfReferenceType = function () {
      console.warn(
        'THREE.WebVRManager: setFrameOfReferenceType() has been deprecated.',
      )
    }
  }
  function Ai(e, h) {
    function a() {
      return null !== m && null !== n
    }
    function b(a) {
      for (var b = 0; b < l.length; b++)
        r[b] === a.inputSource && l[b].dispatchEvent({ type: a.type })
    }
    function c() {
      e.setFramebuffer(null)
      e.setRenderTarget(e.getRenderTarget())
      B.stop()
      k.dispatchEvent({ type: 'sessionend' })
    }
    function d(a) {
      n = a
      B.setContext(m)
      B.start()
      k.dispatchEvent({ type: 'sessionstart' })
    }
    function f() {
      for (var a = 0; a < l.length; a++) {
        var b = a
        a: {
          var c = m.inputSources
          for (var d = 0; d < c.length; d++) {
            var e = c[d],
              f = e.handedness
            if (0 === a && ('none' === f || 'right' === f)) {
              c = e
              break a
            }
            if (1 === a && 'left' === f) {
              c = e
              break a
            }
          }
          c = void 0
        }
        r[b] = c
      }
    }
    function g(a, b) {
      null === b
        ? a.matrixWorld.copy(a.matrix)
        : a.matrixWorld.multiplyMatrices(b.matrixWorld, a.matrix)
      a.matrixWorldInverse.getInverse(a.matrixWorld)
    }
    var k = this,
      m = null,
      n = null,
      p = 'local-floor',
      y = null,
      l = [],
      r = [],
      u = new na()
    u.layers.enable(1)
    u.viewport = new ca()
    var q = new na()
    q.layers.enable(2)
    q.viewport = new ca()
    var w = new Yd([u, q])
    w.layers.enable(1)
    w.layers.enable(2)
    this.enabled = !1
    this.getController = function (a) {
      var b = l[a]
      void 0 === b &&
        ((b = new Vc()),
        (b.matrixAutoUpdate = !1),
        (b.visible = !1),
        (l[a] = b))
      return b
    }
    this.setFramebufferScaleFactor = function () {}
    this.setReferenceSpaceType = function (a) {
      p = a
    }
    this.getSession = function () {
      return m
    }
    this.setSession = function (a) {
      m = a
      null !== m &&
        (m.addEventListener('select', b),
        m.addEventListener('selectstart', b),
        m.addEventListener('selectend', b),
        m.addEventListener('end', c),
        m.updateRenderState({ baseLayer: new XRWebGLLayer(m, h) }),
        m.requestReferenceSpace(p).then(d),
        m.addEventListener('inputsourceschange', f),
        f())
    }
    this.getCamera = function (b) {
      if (a()) {
        var c = b.parent,
          d = w.cameras
        g(w, c)
        for (var e = 0; e < d.length; e++) g(d[e], c)
        b.matrixWorld.copy(w.matrixWorld)
        b = b.children
        e = 0
        for (c = b.length; e < c; e++) b[e].updateMatrixWorld(!0)
        xi(w, u, q)
        return w
      }
      return b
    }
    this.isPresenting = a
    var x = null,
      B = new zg()
    B.setAnimationLoop(function (a, b) {
      y = b.getViewerPose(n)
      if (null !== y) {
        var c = y.views,
          d = m.renderState.baseLayer
        e.setFramebuffer(d.framebuffer)
        for (var f = 0; f < c.length; f++) {
          var g = c[f],
            h = d.getViewport(g),
            k = w.cameras[f]
          k.matrix.fromArray(g.transform.inverse.matrix).getInverse(k.matrix)
          k.projectionMatrix.fromArray(g.projectionMatrix)
          k.viewport.set(h.x, h.y, h.width, h.height)
          0 === f && w.matrix.copy(k.matrix)
        }
      }
      for (f = 0; f < l.length; f++) {
        c = l[f]
        if ((d = r[f]))
          if (((d = b.getPose(d.targetRaySpace, n)), null !== d)) {
            c.matrix.fromArray(d.transform.matrix)
            c.matrix.decompose(c.position, c.rotation, c.scale)
            c.visible = !0
            continue
          }
        c.visible = !1
      }
      x && x(a)
    })
    this.setAnimationLoop = function (a) {
      x = a
    }
    this.dispose = function () {}
    this.getStandingMatrix = function () {
      console.warn(
        'THREE.WebXRManager: getStandingMatrix() is no longer needed.',
      )
      return new I()
    }
    this.getDevice = function () {
      console.warn('THREE.WebXRManager: getDevice() has been deprecated.')
    }
    this.setDevice = function () {
      console.warn('THREE.WebXRManager: setDevice() has been deprecated.')
    }
    this.setFrameOfReferenceType = function () {
      console.warn(
        'THREE.WebXRManager: setFrameOfReferenceType() has been deprecated.',
      )
    }
    this.submitFrame = function () {}
  }
  function Hg(e) {
    var h
    function a() {
      ta = new Yj(J)
      Ea = new Wj(J, ta, e)
      !1 === Ea.isWebGL2 &&
        (ta.get('WEBGL_depth_texture'),
        ta.get('OES_texture_float'),
        ta.get('OES_texture_half_float'),
        ta.get('OES_texture_half_float_linear'),
        ta.get('OES_standard_derivatives'),
        ta.get('OES_element_index_uint'),
        ta.get('ANGLE_instanced_arrays'))
      ta.get('OES_texture_float_linear')
      la = new wi(J, ta, Ea)
      ba = new fl(J, ta, Ea)
      ba.scissor(Z.copy(ia).multiplyScalar(ha).floor())
      ba.viewport(S.copy(U).multiplyScalar(ha).floor())
      fa = new bk(J)
      aa = new Xk()
      ea = new gl(J, ta, ba, aa, Ea, la, fa)
      ka = new Tj(J)
      va = new Zj(J, ka, fa)
      ra = new ek(J, va, ka, fa)
      xa = new dk(J)
      pa = new Wk(D, ta, Ea)
      wa = new $k()
      ua = new el()
      ma = new Uj(D, ba, ra, F)
      ya = new Vj(J, ta, fa, Ea)
      Aa = new ak(J, ta, fa, Ea)
      fa.programs = pa.programs
      D.capabilities = Ea
      D.extensions = ta
      D.properties = aa
      D.renderLists = wa
      D.state = ba
      D.info = fa
    }
    function b(a) {
      a.preventDefault()
      console.log('THREE.WebGLRenderer: Context Lost.')
      M = !0
    }
    function c() {
      console.log('THREE.WebGLRenderer: Context Restored.')
      M = !1
      a()
    }
    function d(a) {
      a = a.target
      a.removeEventListener('dispose', d)
      f(a)
      aa.remove(a)
    }
    function f(a) {
      var b = aa.get(a).program
      a.program = void 0
      void 0 !== b && pa.releaseProgram(b)
    }
    function g(a, b) {
      a.render(function (a) {
        D.renderBufferImmediate(a, b)
      })
    }
    function k(a, b, c, d) {
      if (!1 !== a.visible) {
        if (a.layers.test(b.layers))
          if (a.isGroup) c = a.renderOrder
          else if (a.isLOD) !0 === a.autoUpdate && a.update(b)
          else if (a.isLight) E.pushLight(a), a.castShadow && E.pushShadow(a)
          else if (a.isSprite) {
            if (!a.frustumCulled || Dg.intersectsSprite(a)) {
              d && Mb.setFromMatrixPosition(a.matrixWorld).applyMatrix4(Xd)
              var e = ra.update(a),
                f = a.material
              f.visible && H.push(a, e, f, c, Mb.z, null)
            }
          } else if (a.isImmediateRenderObject)
            d && Mb.setFromMatrixPosition(a.matrixWorld).applyMatrix4(Xd),
              H.push(a, null, a.material, c, Mb.z, null)
          else if (a.isMesh || a.isLine || a.isPoints)
            if (
              (a.isSkinnedMesh &&
                a.skeleton.frame !== fa.render.frame &&
                (a.skeleton.update(), (a.skeleton.frame = fa.render.frame)),
              !a.frustumCulled || Dg.intersectsObject(a))
            )
              if (
                (d && Mb.setFromMatrixPosition(a.matrixWorld).applyMatrix4(Xd),
                (e = ra.update(a)),
                (f = a.material),
                Array.isArray(f))
              )
                for (var g = e.groups, h = 0, m = g.length; h < m; h++) {
                  var n = g[h],
                    p = f[n.materialIndex]
                  p && p.visible && H.push(a, e, p, c, Mb.z, n)
                }
              else f.visible && H.push(a, e, f, c, Mb.z, null)
        a = a.children
        h = 0
        for (m = a.length; h < m; h++) k(a[h], b, c, d)
      }
    }
    function m(a, b, c, d) {
      for (var e = 0, f = a.length; e < f; e++) {
        var g = a[e],
          h = g.object,
          k = g.geometry,
          m = void 0 === d ? g.material : d
        g = g.group
        if (c.isArrayCamera)
          if (((jc = c), ja.enabled && sa.isAvailable())) n(h, b, c, k, m, g)
          else
            for (var p = c.cameras, l = 0, y = p.length; l < y; l++) {
              var r = p[l]
              h.layers.test(r.layers) &&
                (ba.viewport(S.copy(r.viewport)),
                E.setupLights(r),
                n(h, b, r, k, m, g))
            }
        else (jc = null), n(h, b, c, k, m, g)
      }
    }
    function n(a, b, c, d, e, f) {
      a.onBeforeRender(D, b, c, d, e, f)
      E = ua.get(b, jc || c)
      a.modelViewMatrix.multiplyMatrices(c.matrixWorldInverse, a.matrixWorld)
      a.normalMatrix.getNormalMatrix(a.modelViewMatrix)
      if (a.isImmediateRenderObject) {
        ba.setMaterial(e)
        var k = y(c, b.fog, e, a)
        bf = h = null
        T = !1
        g(a, k)
      } else D.renderBufferDirect(c, b.fog, d, e, a, f)
      a.onAfterRender(D, b, c, d, e, f)
      E = ua.get(b, jc || c)
    }
    function p(a, b, c) {
      var e = aa.get(a),
        g = E.state.lights,
        h = g.state.version
      c = pa.getParameters(
        a,
        g.state,
        E.state.shadowsArray,
        b,
        Ta.numPlanes,
        Ta.numIntersection,
        c,
      )
      var k = pa.getProgramCacheKey(a, c),
        m = e.program,
        n = !0
      if (void 0 === m) a.addEventListener('dispose', d)
      else if (m.cacheKey !== k) f(a)
      else {
        if (e.lightsStateVersion !== h) e.lightsStateVersion = h
        else if (void 0 !== c.shaderID) return
        n = !1
      }
      n &&
        (c.shaderID
          ? ((k = ib[c.shaderID]),
            (e.shader = {
              name: a.type,
              uniforms: gc(k.uniforms),
              vertexShader: k.vertexShader,
              fragmentShader: k.fragmentShader,
            }))
          : (e.shader = {
              name: a.type,
              uniforms: a.uniforms,
              vertexShader: a.vertexShader,
              fragmentShader: a.fragmentShader,
            }),
        a.onBeforeCompile(e.shader, D),
        (k = pa.getProgramCacheKey(a, c)),
        (m = pa.acquireProgram(a, e.shader, c, k)),
        (e.program = m),
        (a.program = m))
      c = m.getAttributes()
      if (a.morphTargets)
        for (k = a.numSupportedMorphTargets = 0; k < D.maxMorphTargets; k++)
          0 <= c['morphTarget' + k] && a.numSupportedMorphTargets++
      if (a.morphNormals)
        for (k = a.numSupportedMorphNormals = 0; k < D.maxMorphNormals; k++)
          0 <= c['morphNormal' + k] && a.numSupportedMorphNormals++
      c = e.shader.uniforms
      if ((!a.isShaderMaterial && !a.isRawShaderMaterial) || !0 === a.clipping)
        (e.numClippingPlanes = Ta.numPlanes),
          (e.numIntersection = Ta.numIntersection),
          (c.clippingPlanes = Ta.uniform)
      e.fog = b
      e.needsLights =
        a.isMeshLambertMaterial ||
        a.isMeshPhongMaterial ||
        a.isMeshStandardMaterial ||
        a.isShadowMaterial ||
        (a.isShaderMaterial && !0 === a.lights)
      e.lightsStateVersion = h
      e.needsLights &&
        ((c.ambientLightColor.value = g.state.ambient),
        (c.lightProbe.value = g.state.probe),
        (c.directionalLights.value = g.state.directional),
        (c.spotLights.value = g.state.spot),
        (c.rectAreaLights.value = g.state.rectArea),
        (c.pointLights.value = g.state.point),
        (c.hemisphereLights.value = g.state.hemi),
        (c.directionalShadowMap.value = g.state.directionalShadowMap),
        (c.directionalShadowMatrix.value = g.state.directionalShadowMatrix),
        (c.spotShadowMap.value = g.state.spotShadowMap),
        (c.spotShadowMatrix.value = g.state.spotShadowMatrix),
        (c.pointShadowMap.value = g.state.pointShadowMap),
        (c.pointShadowMatrix.value = g.state.pointShadowMatrix))
      a = e.program.getUniforms()
      a = Jb.seqWithValue(a.seq, c)
      e.uniformsList = a
    }
    function y(a, b, c, d) {
      ea.resetTextureUnits()
      var e = aa.get(c),
        f = E.state.lights
      $e &&
        (qa || a !== Ua) &&
        Ta.setState(
          c.clippingPlanes,
          c.clipIntersection,
          c.clipShadows,
          a,
          e,
          a === Ua && c.id === af,
        )
      !1 === c.needsUpdate &&
        (void 0 === e.program
          ? (c.needsUpdate = !0)
          : c.fog && e.fog !== b
          ? (c.needsUpdate = !0)
          : e.needsLights && e.lightsStateVersion !== f.state.version
          ? (c.needsUpdate = !0)
          : void 0 === e.numClippingPlanes ||
            (e.numClippingPlanes === Ta.numPlanes &&
              e.numIntersection === Ta.numIntersection) ||
            (c.needsUpdate = !0))
      c.needsUpdate && (p(c, b, d), (c.needsUpdate = !1))
      var g = !1,
        h = !1,
        k = !1
      f = e.program
      var m = f.getUniforms(),
        n = e.shader.uniforms
      ba.useProgram(f.program) && (k = h = g = !0)
      c.id !== af && ((af = c.id), (h = !0))
      if (g || Ua !== a) {
        0 < f.numMultiviewViews
          ? sa.updateCameraProjectionMatricesUniform(a, m)
          : m.setValue(J, 'projectionMatrix', a.projectionMatrix)
        Ea.logarithmicDepthBuffer &&
          m.setValue(J, 'logDepthBufFC', 2 / (Math.log(a.far + 1) / Math.LN2))
        Ua !== a && ((Ua = a), (k = h = !0))
        if (
          c.isShaderMaterial ||
          c.isMeshPhongMaterial ||
          c.isMeshStandardMaterial ||
          c.envMap
        )
          (g = m.map.cameraPosition),
            void 0 !== g &&
              g.setValue(J, Mb.setFromMatrixPosition(a.matrixWorld))
        ;(c.isMeshPhongMaterial ||
          c.isMeshLambertMaterial ||
          c.isMeshBasicMaterial ||
          c.isMeshStandardMaterial ||
          c.isShaderMaterial) &&
          m.setValue(J, 'isOrthographic', !0 === a.isOrthographicCamera)
        if (
          c.isMeshPhongMaterial ||
          c.isMeshLambertMaterial ||
          c.isMeshBasicMaterial ||
          c.isMeshStandardMaterial ||
          c.isShaderMaterial ||
          c.skinning
        )
          0 < f.numMultiviewViews
            ? sa.updateCameraViewMatricesUniform(a, m)
            : m.setValue(J, 'viewMatrix', a.matrixWorldInverse)
      }
      if (
        c.skinning &&
        (m.setOptional(J, d, 'bindMatrix'),
        m.setOptional(J, d, 'bindMatrixInverse'),
        (g = d.skeleton))
      ) {
        var y = g.bones
        if (Ea.floatVertexTextures) {
          if (void 0 === g.boneTexture) {
            y = Math.sqrt(4 * y.length)
            y = N.ceilPowerOfTwo(y)
            y = Math.max(y, 4)
            var t = new Float32Array(y * y * 4)
            t.set(g.boneMatrices)
            var q = new hc(t, y, y, 1023, 1015)
            g.boneMatrices = t
            g.boneTexture = q
            g.boneTextureSize = y
          }
          m.setValue(J, 'boneTexture', g.boneTexture, ea)
          m.setValue(J, 'boneTextureSize', g.boneTextureSize)
        } else m.setOptional(J, g, 'boneMatrices')
      }
      if (h || e.receiveShadow !== d.receiveShadow)
        (e.receiveShadow = d.receiveShadow),
          m.setValue(J, 'receiveShadow', d.receiveShadow)
      if (h) {
        m.setValue(J, 'toneMappingExposure', D.toneMappingExposure)
        m.setValue(J, 'toneMappingWhitePoint', D.toneMappingWhitePoint)
        e.needsLights &&
          ((h = k),
          (n.ambientLightColor.needsUpdate = h),
          (n.lightProbe.needsUpdate = h),
          (n.directionalLights.needsUpdate = h),
          (n.pointLights.needsUpdate = h),
          (n.spotLights.needsUpdate = h),
          (n.rectAreaLights.needsUpdate = h),
          (n.hemisphereLights.needsUpdate = h))
        b &&
          c.fog &&
          (n.fogColor.value.copy(b.color),
          b.isFog
            ? ((n.fogNear.value = b.near), (n.fogFar.value = b.far))
            : b.isFogExp2 && (n.fogDensity.value = b.density))
        if (c.isMeshBasicMaterial) l(n, c)
        else if (c.isMeshLambertMaterial)
          l(n, c), c.emissiveMap && (n.emissiveMap.value = c.emissiveMap)
        else if (c.isMeshPhongMaterial)
          l(n, c),
            c.isMeshToonMaterial
              ? (r(n, c),
                c.gradientMap && (n.gradientMap.value = c.gradientMap))
              : r(n, c)
        else if (c.isMeshStandardMaterial)
          l(n, c),
            c.isMeshPhysicalMaterial
              ? (u(n, c),
                (n.reflectivity.value = c.reflectivity),
                (n.clearcoat.value = c.clearcoat),
                (n.clearcoatRoughness.value = c.clearcoatRoughness),
                c.sheen && n.sheen.value.copy(c.sheen),
                c.clearcoatNormalMap &&
                  (n.clearcoatNormalScale.value.copy(c.clearcoatNormalScale),
                  (n.clearcoatNormalMap.value = c.clearcoatNormalMap),
                  1 === c.side && n.clearcoatNormalScale.value.negate()),
                (n.transparency.value = c.transparency))
              : u(n, c)
        else if (c.isMeshMatcapMaterial)
          l(n, c),
            c.matcap && (n.matcap.value = c.matcap),
            c.bumpMap &&
              ((n.bumpMap.value = c.bumpMap),
              (n.bumpScale.value = c.bumpScale),
              1 === c.side && (n.bumpScale.value *= -1)),
            c.normalMap &&
              ((n.normalMap.value = c.normalMap),
              n.normalScale.value.copy(c.normalScale),
              1 === c.side && n.normalScale.value.negate()),
            c.displacementMap &&
              ((n.displacementMap.value = c.displacementMap),
              (n.displacementScale.value = c.displacementScale),
              (n.displacementBias.value = c.displacementBias))
        else if (c.isMeshDepthMaterial)
          l(n, c),
            c.displacementMap &&
              ((n.displacementMap.value = c.displacementMap),
              (n.displacementScale.value = c.displacementScale),
              (n.displacementBias.value = c.displacementBias))
        else if (c.isMeshDistanceMaterial)
          l(n, c),
            c.displacementMap &&
              ((n.displacementMap.value = c.displacementMap),
              (n.displacementScale.value = c.displacementScale),
              (n.displacementBias.value = c.displacementBias)),
            n.referencePosition.value.copy(c.referencePosition),
            (n.nearDistance.value = c.nearDistance),
            (n.farDistance.value = c.farDistance)
        else if (c.isMeshNormalMaterial)
          l(n, c),
            c.bumpMap &&
              ((n.bumpMap.value = c.bumpMap),
              (n.bumpScale.value = c.bumpScale),
              1 === c.side && (n.bumpScale.value *= -1)),
            c.normalMap &&
              ((n.normalMap.value = c.normalMap),
              n.normalScale.value.copy(c.normalScale),
              1 === c.side && n.normalScale.value.negate()),
            c.displacementMap &&
              ((n.displacementMap.value = c.displacementMap),
              (n.displacementScale.value = c.displacementScale),
              (n.displacementBias.value = c.displacementBias))
        else if (c.isLineBasicMaterial)
          n.diffuse.value.copy(c.color),
            (n.opacity.value = c.opacity),
            c.isLineDashedMaterial &&
              ((n.dashSize.value = c.dashSize),
              (n.totalSize.value = c.dashSize + c.gapSize),
              (n.scale.value = c.scale))
        else if (c.isPointsMaterial) {
          n.diffuse.value.copy(c.color)
          n.opacity.value = c.opacity
          n.size.value = c.size * ha
          n.scale.value = 0.5 * Y
          c.map && (n.map.value = c.map)
          c.alphaMap && (n.alphaMap.value = c.alphaMap)
          if (c.map) var v = c.map
          else c.alphaMap && (v = c.alphaMap)
          void 0 !== v &&
            (!0 === v.matrixAutoUpdate && v.updateMatrix(),
            n.uvTransform.value.copy(v.matrix))
        } else if (c.isSpriteMaterial) {
          n.diffuse.value.copy(c.color)
          n.opacity.value = c.opacity
          n.rotation.value = c.rotation
          c.map && (n.map.value = c.map)
          c.alphaMap && (n.alphaMap.value = c.alphaMap)
          if (c.map) var x = c.map
          else c.alphaMap && (x = c.alphaMap)
          void 0 !== x &&
            (!0 === x.matrixAutoUpdate && x.updateMatrix(),
            n.uvTransform.value.copy(x.matrix))
        } else
          c.isShadowMaterial &&
            (n.color.value.copy(c.color), (n.opacity.value = c.opacity))
        void 0 !== n.ltc_1 && (n.ltc_1.value = K.LTC_1)
        void 0 !== n.ltc_2 && (n.ltc_2.value = K.LTC_2)
        Jb.upload(J, e.uniformsList, n, ea)
        c.isShaderMaterial && (c.uniformsNeedUpdate = !1)
      }
      c.isShaderMaterial &&
        !0 === c.uniformsNeedUpdate &&
        (Jb.upload(J, e.uniformsList, n, ea), (c.uniformsNeedUpdate = !1))
      c.isSpriteMaterial && m.setValue(J, 'center', d.center)
      0 < f.numMultiviewViews
        ? sa.updateObjectMatricesUniforms(d, a, m)
        : (m.setValue(J, 'modelViewMatrix', d.modelViewMatrix),
          m.setValue(J, 'normalMatrix', d.normalMatrix))
      m.setValue(J, 'modelMatrix', d.matrixWorld)
      return f
    }
    function l(a, b) {
      a.opacity.value = b.opacity
      b.color && a.diffuse.value.copy(b.color)
      b.emissive &&
        a.emissive.value.copy(b.emissive).multiplyScalar(b.emissiveIntensity)
      b.map && (a.map.value = b.map)
      b.alphaMap && (a.alphaMap.value = b.alphaMap)
      b.specularMap && (a.specularMap.value = b.specularMap)
      b.envMap &&
        ((a.envMap.value = b.envMap),
        (a.flipEnvMap.value = b.envMap.isCubeTexture ? -1 : 1),
        (a.reflectivity.value = b.reflectivity),
        (a.refractionRatio.value = b.refractionRatio),
        (a.maxMipLevel.value = aa.get(b.envMap).__maxMipLevel))
      b.lightMap &&
        ((a.lightMap.value = b.lightMap),
        (a.lightMapIntensity.value = b.lightMapIntensity))
      b.aoMap &&
        ((a.aoMap.value = b.aoMap), (a.aoMapIntensity.value = b.aoMapIntensity))
      if (b.map) var c = b.map
      else
        b.specularMap
          ? (c = b.specularMap)
          : b.displacementMap
          ? (c = b.displacementMap)
          : b.normalMap
          ? (c = b.normalMap)
          : b.bumpMap
          ? (c = b.bumpMap)
          : b.roughnessMap
          ? (c = b.roughnessMap)
          : b.metalnessMap
          ? (c = b.metalnessMap)
          : b.alphaMap
          ? (c = b.alphaMap)
          : b.emissiveMap && (c = b.emissiveMap)
      void 0 !== c &&
        (c.isWebGLRenderTarget && (c = c.texture),
        !0 === c.matrixAutoUpdate && c.updateMatrix(),
        a.uvTransform.value.copy(c.matrix))
    }
    function r(a, b) {
      a.specular.value.copy(b.specular)
      a.shininess.value = Math.max(b.shininess, 1e-4)
      b.emissiveMap && (a.emissiveMap.value = b.emissiveMap)
      b.bumpMap &&
        ((a.bumpMap.value = b.bumpMap),
        (a.bumpScale.value = b.bumpScale),
        1 === b.side && (a.bumpScale.value *= -1))
      b.normalMap &&
        ((a.normalMap.value = b.normalMap),
        a.normalScale.value.copy(b.normalScale),
        1 === b.side && a.normalScale.value.negate())
      b.displacementMap &&
        ((a.displacementMap.value = b.displacementMap),
        (a.displacementScale.value = b.displacementScale),
        (a.displacementBias.value = b.displacementBias))
    }
    function u(a, b) {
      a.roughness.value = b.roughness
      a.metalness.value = b.metalness
      b.roughnessMap && (a.roughnessMap.value = b.roughnessMap)
      b.metalnessMap && (a.metalnessMap.value = b.metalnessMap)
      b.emissiveMap && (a.emissiveMap.value = b.emissiveMap)
      b.bumpMap &&
        ((a.bumpMap.value = b.bumpMap),
        (a.bumpScale.value = b.bumpScale),
        1 === b.side && (a.bumpScale.value *= -1))
      b.normalMap &&
        ((a.normalMap.value = b.normalMap),
        a.normalScale.value.copy(b.normalScale),
        1 === b.side && a.normalScale.value.negate())
      b.displacementMap &&
        ((a.displacementMap.value = b.displacementMap),
        (a.displacementScale.value = b.displacementScale),
        (a.displacementBias.value = b.displacementBias))
      b.envMap && (a.envMapIntensity.value = b.envMapIntensity)
    }
    e = e || {}
    var v =
        void 0 !== e.canvas
          ? e.canvas
          : V.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'),
      w = void 0 !== e.context ? e.context : null,
      x = void 0 !== e.alpha ? e.alpha : !1,
      B = void 0 !== e.depth ? e.depth : !0,
      C = void 0 !== e.stencil ? e.stencil : !0,
      A = void 0 !== e.antialias ? e.antialias : !1,
      F = void 0 !== e.premultipliedAlpha ? e.premultipliedAlpha : !0,
      W = void 0 !== e.preserveDrawingBuffer ? e.preserveDrawingBuffer : !1,
      Ca = void 0 !== e.powerPreference ? e.powerPreference : 'default',
      G =
        void 0 !== e.failIfMajorPerformanceCaveat
          ? e.failIfMajorPerformanceCaveat
          : !1,
      H = null,
      E = null
    this.domElement = v
    this.debug = { checkShaderErrors: !0 }
    this.sortObjects = this.autoClearStencil = this.autoClearDepth = this.autoClearColor = this.autoClear = !0
    this.clippingPlanes = []
    this.localClippingEnabled = !1
    this.gammaFactor = 2
    this.physicallyCorrectLights = this.gammaOutput = this.gammaInput = !1
    this.toneMappingWhitePoint = this.toneMappingExposure = this.toneMapping = 1
    this.maxMorphTargets = 8
    this.maxMorphNormals = 4
    var D = this,
      M = !1,
      P = null,
      R = 0,
      O = 0,
      Q = null,
      X = null,
      af = -1
    var bf = (h = null)
    var T = !1
    var Ua = null,
      jc = null,
      S = new ca(),
      Z = new ca(),
      da = null,
      L = v.width,
      Y = v.height,
      ha = 1,
      U = new ca(0, 0, L, Y),
      ia = new ca(0, 0, L, Y),
      na = !1,
      Dg = new Sd(),
      Ta = new Xj(),
      $e = !1,
      qa = !1,
      Xd = new I(),
      Mb = new q()
    try {
      x = {
        alpha: x,
        depth: B,
        stencil: C,
        antialias: A,
        premultipliedAlpha: F,
        preserveDrawingBuffer: W,
        powerPreference: Ca,
        failIfMajorPerformanceCaveat: G,
        xrCompatible: !0,
      }
      v.addEventListener('webglcontextlost', b, !1)
      v.addEventListener('webglcontextrestored', c, !1)
      var J =
        w || v.getContext('webgl', x) || v.getContext('experimental-webgl', x)
      if (null === J) {
        if (null !== v.getContext('webgl'))
          throw Error(
            'Error creating WebGL context with your selected attributes.',
          )
        throw Error('Error creating WebGL context.')
      }
      void 0 === J.getShaderPrecisionFormat &&
        (J.getShaderPrecisionFormat = function () {
          return { rangeMin: 1, rangeMax: 1, precision: 1 }
        })
    } catch (Bi) {
      throw (console.error('THREE.WebGLRenderer: ' + Bi.message), Bi)
    }
    var ta, Ea, ba, fa, aa, ea, ka, va, ra, pa, wa, ua, ma, xa, ya, Aa, la
    a()
    var ja =
      'undefined' !== typeof navigator &&
      'xr' in navigator &&
      'isSessionSupported' in navigator.xr
        ? new Ai(D, J)
        : new Gg(D)
    this.vr = ja
    var sa = new hl(D, J),
      Da = new ui(D, ra, Ea.maxTextureSize)
    this.shadowMap = Da
    this.getContext = function () {
      return J
    }
    this.getContextAttributes = function () {
      return J.getContextAttributes()
    }
    this.forceContextLoss = function () {
      var a = ta.get('WEBGL_lose_context')
      a && a.loseContext()
    }
    this.forceContextRestore = function () {
      var a = ta.get('WEBGL_lose_context')
      a && a.restoreContext()
    }
    this.getPixelRatio = function () {
      return ha
    }
    this.setPixelRatio = function (a) {
      void 0 !== a && ((ha = a), this.setSize(L, Y, !1))
    }
    this.getSize = function (a) {
      void 0 === a &&
        (console.warn(
          'WebGLRenderer: .getsize() now requires a Vector2 as an argument',
        ),
        (a = new z()))
      return a.set(L, Y)
    }
    this.setSize = function (a, b, c) {
      ja.isPresenting()
        ? console.warn(
            "THREE.WebGLRenderer: Can't change size while VR device is presenting.",
          )
        : ((L = a),
          (Y = b),
          (v.width = Math.floor(a * ha)),
          (v.height = Math.floor(b * ha)),
          !1 !== c && ((v.style.width = a + 'px'), (v.style.height = b + 'px')),
          this.setViewport(0, 0, a, b))
    }
    this.getDrawingBufferSize = function (a) {
      void 0 === a &&
        (console.warn(
          'WebGLRenderer: .getdrawingBufferSize() now requires a Vector2 as an argument',
        ),
        (a = new z()))
      return a.set(L * ha, Y * ha).floor()
    }
    this.setDrawingBufferSize = function (a, b, c) {
      L = a
      Y = b
      ha = c
      v.width = Math.floor(a * c)
      v.height = Math.floor(b * c)
      this.setViewport(0, 0, a, b)
    }
    this.getCurrentViewport = function (a) {
      void 0 === a &&
        (console.warn(
          'WebGLRenderer: .getCurrentViewport() now requires a Vector4 as an argument',
        ),
        (a = new ca()))
      return a.copy(S)
    }
    this.getViewport = function (a) {
      return a.copy(U)
    }
    this.setViewport = function (a, b, c, d) {
      a.isVector4 ? U.set(a.x, a.y, a.z, a.w) : U.set(a, b, c, d)
      ba.viewport(S.copy(U).multiplyScalar(ha).floor())
    }
    this.getScissor = function (a) {
      return a.copy(ia)
    }
    this.setScissor = function (a, b, c, d) {
      a.isVector4 ? ia.set(a.x, a.y, a.z, a.w) : ia.set(a, b, c, d)
      ba.scissor(Z.copy(ia).multiplyScalar(ha).floor())
    }
    this.getScissorTest = function () {
      return na
    }
    this.setScissorTest = function (a) {
      ba.setScissorTest((na = a))
    }
    this.getClearColor = function () {
      return ma.getClearColor()
    }
    this.setClearColor = function () {
      ma.setClearColor.apply(ma, arguments)
    }
    this.getClearAlpha = function () {
      return ma.getClearAlpha()
    }
    this.setClearAlpha = function () {
      ma.setClearAlpha.apply(ma, arguments)
    }
    this.clear = function (a, b, c) {
      var d = 0
      if (void 0 === a || a) d |= 16384
      if (void 0 === b || b) d |= 256
      if (void 0 === c || c) d |= 1024
      J.clear(d)
    }
    this.clearColor = function () {
      this.clear(!0, !1, !1)
    }
    this.clearDepth = function () {
      this.clear(!1, !0, !1)
    }
    this.clearStencil = function () {
      this.clear(!1, !1, !0)
    }
    this.dispose = function () {
      v.removeEventListener('webglcontextlost', b, !1)
      v.removeEventListener('webglcontextrestored', c, !1)
      wa.dispose()
      ua.dispose()
      aa.dispose()
      ra.dispose()
      ja.dispose()
      za.stop()
    }
    this.renderBufferImmediate = function (a, b) {
      ba.initAttributes()
      var c = aa.get(a)
      a.hasPositions && !c.position && (c.position = J.createBuffer())
      a.hasNormals && !c.normal && (c.normal = J.createBuffer())
      a.hasUvs && !c.uv && (c.uv = J.createBuffer())
      a.hasColors && !c.color && (c.color = J.createBuffer())
      b = b.getAttributes()
      a.hasPositions &&
        (J.bindBuffer(34962, c.position),
        J.bufferData(34962, a.positionArray, 35048),
        ba.enableAttribute(b.position),
        J.vertexAttribPointer(b.position, 3, 5126, !1, 0, 0))
      a.hasNormals &&
        (J.bindBuffer(34962, c.normal),
        J.bufferData(34962, a.normalArray, 35048),
        ba.enableAttribute(b.normal),
        J.vertexAttribPointer(b.normal, 3, 5126, !1, 0, 0))
      a.hasUvs &&
        (J.bindBuffer(34962, c.uv),
        J.bufferData(34962, a.uvArray, 35048),
        ba.enableAttribute(b.uv),
        J.vertexAttribPointer(b.uv, 2, 5126, !1, 0, 0))
      a.hasColors &&
        (J.bindBuffer(34962, c.color),
        J.bufferData(34962, a.colorArray, 35048),
        ba.enableAttribute(b.color),
        J.vertexAttribPointer(b.color, 3, 5126, !1, 0, 0))
      ba.disableUnusedAttributes()
      J.drawArrays(4, 0, a.count)
      a.count = 0
    }
    this.renderBufferDirect = function (a, b, c, d, e, f) {
      var g = e.isMesh && 0 > e.matrixWorld.determinant()
      ba.setMaterial(d, g)
      var k = y(a, b, d, e),
        m = !1
      if (h !== c.id || bf !== k.id || T !== (!0 === d.wireframe))
        (h = c.id), (bf = k.id), (T = !0 === d.wireframe), (m = !0)
      e.morphTargetInfluences && (xa.update(e, c, d, k), (m = !0))
      g = c.index
      var n = c.attributes.position
      b = 1
      !0 === d.wireframe && ((g = va.getWireframeAttribute(c)), (b = 2))
      a = ya
      if (null !== g) {
        var p = ka.get(g)
        a = Aa
        a.setIndex(p)
      }
      if (m) {
        if (
          !1 !== Ea.isWebGL2 ||
          (!e.isInstancedMesh && !c.isInstancedBufferGeometry) ||
          null !== ta.get('ANGLE_instanced_arrays')
        ) {
          ba.initAttributes()
          m = c.attributes
          k = k.getAttributes()
          var l = d.defaultAttributeValues
          for (A in k) {
            var r = k[A]
            if (0 <= r) {
              var t = m[A]
              if (void 0 !== t) {
                var u = t.normalized,
                  q = t.itemSize,
                  v = ka.get(t)
                if (void 0 !== v) {
                  var x = v.buffer,
                    w = v.type
                  v = v.bytesPerElement
                  if (t.isInterleavedBufferAttribute) {
                    var B = t.data,
                      C = B.stride
                    t = t.offset
                    B && B.isInstancedInterleavedBuffer
                      ? (ba.enableAttributeAndDivisor(r, B.meshPerAttribute),
                        void 0 === c.maxInstancedCount &&
                          (c.maxInstancedCount = B.meshPerAttribute * B.count))
                      : ba.enableAttribute(r)
                    J.bindBuffer(34962, x)
                    J.vertexAttribPointer(r, q, w, u, C * v, t * v)
                  } else
                    t.isInstancedBufferAttribute
                      ? (ba.enableAttributeAndDivisor(r, t.meshPerAttribute),
                        void 0 === c.maxInstancedCount &&
                          (c.maxInstancedCount = t.meshPerAttribute * t.count))
                      : ba.enableAttribute(r),
                      J.bindBuffer(34962, x),
                      J.vertexAttribPointer(r, q, w, u, 0, 0)
                }
              } else if ('instanceMatrix' === A)
                (v = ka.get(e.instanceMatrix)),
                  void 0 !== v &&
                    ((x = v.buffer),
                    (w = v.type),
                    ba.enableAttributeAndDivisor(r + 0, 1),
                    ba.enableAttributeAndDivisor(r + 1, 1),
                    ba.enableAttributeAndDivisor(r + 2, 1),
                    ba.enableAttributeAndDivisor(r + 3, 1),
                    J.bindBuffer(34962, x),
                    J.vertexAttribPointer(r + 0, 4, w, !1, 64, 0),
                    J.vertexAttribPointer(r + 1, 4, w, !1, 64, 16),
                    J.vertexAttribPointer(r + 2, 4, w, !1, 64, 32),
                    J.vertexAttribPointer(r + 3, 4, w, !1, 64, 48))
              else if (void 0 !== l && ((u = l[A]), void 0 !== u))
                switch (u.length) {
                  case 2:
                    J.vertexAttrib2fv(r, u)
                    break
                  case 3:
                    J.vertexAttrib3fv(r, u)
                    break
                  case 4:
                    J.vertexAttrib4fv(r, u)
                    break
                  default:
                    J.vertexAttrib1fv(r, u)
                }
            }
          }
          ba.disableUnusedAttributes()
        }
        null !== g && J.bindBuffer(34963, p.buffer)
      }
      p = Infinity
      null !== g ? (p = g.count) : void 0 !== n && (p = n.count)
      g = c.drawRange.start * b
      n = null !== f ? f.start * b : 0
      var A = Math.max(g, n)
      f = Math.max(
        0,
        Math.min(
          p,
          g + c.drawRange.count * b,
          n + (null !== f ? f.count * b : Infinity),
        ) -
          1 -
          A +
          1,
      )
      if (0 !== f) {
        if (e.isMesh)
          if (!0 === d.wireframe)
            ba.setLineWidth(d.wireframeLinewidth * (null === Q ? ha : 1)),
              a.setMode(1)
          else
            switch (e.drawMode) {
              case 0:
                a.setMode(4)
                break
              case 1:
                a.setMode(5)
                break
              case 2:
                a.setMode(6)
            }
        else
          e.isLine
            ? ((d = d.linewidth),
              void 0 === d && (d = 1),
              ba.setLineWidth(d * (null === Q ? ha : 1)),
              e.isLineSegments
                ? a.setMode(1)
                : e.isLineLoop
                ? a.setMode(2)
                : a.setMode(3))
            : e.isPoints
            ? a.setMode(0)
            : e.isSprite && a.setMode(4)
        e.isInstancedMesh
          ? a.renderInstances(c, A, f, e.count)
          : c.isInstancedBufferGeometry
          ? a.renderInstances(c, A, f, c.maxInstancedCount)
          : a.render(A, f)
      }
    }
    this.compile = function (a, b) {
      E = ua.get(a, b)
      E.init()
      a.traverse(function (a) {
        a.isLight && (E.pushLight(a), a.castShadow && E.pushShadow(a))
      })
      E.setupLights(b)
      a.traverse(function (b) {
        if (b.material)
          if (Array.isArray(b.material))
            for (var c = 0; c < b.material.length; c++)
              p(b.material[c], a.fog, b)
          else p(b.material, a.fog, b)
      })
    }
    var Ba = null,
      za = new zg()
    za.setAnimationLoop(function (a) {
      ja.isPresenting() || (Ba && Ba(a))
    })
    'undefined' !== typeof kc && za.setContext(kc)
    this.setAnimationLoop = function (a) {
      Ba = a
      ja.setAnimationLoop(a)
      za.start()
    }
    this.render = function (a, b, c, d) {
      if (void 0 !== c) {
        console.warn(
          'THREE.WebGLRenderer.render(): the renderTarget argument has been removed. Use .setRenderTarget() instead.',
        )
        var e = c
      }
      if (void 0 !== d) {
        console.warn(
          'THREE.WebGLRenderer.render(): the forceClear argument has been removed. Use .clear() instead.',
        )
        var f = d
      }
      b && b.isCamera
        ? M ||
          ((bf = h = null),
          (T = !1),
          (af = -1),
          (Ua = null),
          !0 === a.autoUpdate && a.updateMatrixWorld(),
          null === b.parent && b.updateMatrixWorld(),
          ja.enabled && (b = ja.getCamera(b)),
          (E = ua.get(a, b)),
          E.init(),
          a.onBeforeRender(D, a, b, e || Q),
          Xd.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse),
          Dg.setFromMatrix(Xd),
          (qa = this.localClippingEnabled),
          ($e = Ta.init(this.clippingPlanes, qa, b)),
          (H = wa.get(a, b)),
          H.init(),
          k(a, b, 0, D.sortObjects),
          !0 === D.sortObjects && H.sort(),
          $e && Ta.beginShadows(),
          Da.render(E.state.shadowsArray, a, b),
          E.setupLights(b),
          $e && Ta.endShadows(),
          this.info.autoReset && this.info.reset(),
          void 0 !== e && this.setRenderTarget(e),
          ja.enabled && sa.isAvailable() && sa.attachCamera(b),
          ma.render(H, a, b, f),
          (c = H.opaque),
          (d = H.transparent),
          a.overrideMaterial
            ? ((e = a.overrideMaterial),
              c.length && m(c, a, b, e),
              d.length && m(d, a, b, e))
            : (c.length && m(c, a, b), d.length && m(d, a, b)),
          a.onAfterRender(D, a, b),
          null !== Q &&
            (ea.updateRenderTargetMipmap(Q),
            ea.updateMultisampleRenderTarget(Q)),
          ba.buffers.depth.setTest(!0),
          ba.buffers.depth.setMask(!0),
          ba.buffers.color.setMask(!0),
          ba.setPolygonOffset(!1),
          ja.enabled &&
            (sa.isAvailable() && sa.detachCamera(b), ja.submitFrame()),
          (E = H = null))
        : console.error(
            'THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.',
          )
    }
    this.setFramebuffer = function (a) {
      P !== a && null === Q && J.bindFramebuffer(36160, a)
      P = a
    }
    this.getActiveCubeFace = function () {
      return R
    }
    this.getActiveMipmapLevel = function () {
      return O
    }
    this.getRenderTarget = function () {
      return Q
    }
    this.setRenderTarget = function (a, b, c) {
      Q = a
      R = b
      O = c
      a && void 0 === aa.get(a).__webglFramebuffer && ea.setupRenderTarget(a)
      var d = P,
        e = !1
      a
        ? ((d = aa.get(a).__webglFramebuffer),
          a.isWebGLRenderTargetCube
            ? ((d = d[b || 0]), (e = !0))
            : (d = a.isWebGLMultisampleRenderTarget
                ? aa.get(a).__webglMultisampledFramebuffer
                : d),
          S.copy(a.viewport),
          Z.copy(a.scissor),
          (da = a.scissorTest))
        : (S.copy(U).multiplyScalar(ha).floor(),
          Z.copy(ia).multiplyScalar(ha).floor(),
          (da = na))
      X !== d && (J.bindFramebuffer(36160, d), (X = d))
      ba.viewport(S)
      ba.scissor(Z)
      ba.setScissorTest(da)
      e &&
        ((a = aa.get(a.texture)),
        J.framebufferTexture2D(
          36160,
          36064,
          34069 + (b || 0),
          a.__webglTexture,
          c || 0,
        ))
    }
    this.readRenderTargetPixels = function (a, b, c, d, e, f, g) {
      if (a && a.isWebGLRenderTarget) {
        var h = aa.get(a).__webglFramebuffer
        a.isWebGLRenderTargetCube && void 0 !== g && (h = h[g])
        if (h) {
          g = !1
          h !== X && (J.bindFramebuffer(36160, h), (g = !0))
          try {
            var k = a.texture,
              m = k.format,
              n = k.type
            1023 !== m && la.convert(m) !== J.getParameter(35739)
              ? console.error(
                  'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.',
                )
              : 1009 === n ||
                la.convert(n) === J.getParameter(35738) ||
                (1015 === n &&
                  (Ea.isWebGL2 ||
                    ta.get('OES_texture_float') ||
                    ta.get('WEBGL_color_buffer_float'))) ||
                (1016 === n &&
                  (Ea.isWebGL2
                    ? ta.get('EXT_color_buffer_float')
                    : ta.get('EXT_color_buffer_half_float')))
              ? 36053 === J.checkFramebufferStatus(36160)
                ? 0 <= b &&
                  b <= a.width - d &&
                  0 <= c &&
                  c <= a.height - e &&
                  J.readPixels(b, c, d, e, la.convert(m), la.convert(n), f)
                : console.error(
                    'THREE.WebGLRenderer.readRenderTargetPixels: readPixels from renderTarget failed. Framebuffer not complete.',
                  )
              : console.error(
                  'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.',
                )
          } finally {
            g && J.bindFramebuffer(36160, X)
          }
        }
      } else
        console.error(
          'THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.',
        )
    }
    this.copyFramebufferToTexture = function (a, b, c) {
      void 0 === c && (c = 0)
      var d = Math.pow(2, -c),
        e = Math.floor(b.image.width * d)
      d = Math.floor(b.image.height * d)
      var f = la.convert(b.format)
      ea.setTexture2D(b, 0)
      J.copyTexImage2D(3553, c, f, a.x, a.y, e, d, 0)
      ba.unbindTexture()
    }
    this.copyTextureToTexture = function (a, b, c, d) {
      var e = b.image.width,
        f = b.image.height,
        g = la.convert(c.format),
        h = la.convert(c.type)
      ea.setTexture2D(c, 0)
      b.isDataTexture
        ? J.texSubImage2D(3553, d || 0, a.x, a.y, e, f, g, h, b.image.data)
        : J.texSubImage2D(3553, d || 0, a.x, a.y, g, h, b.image)
      ba.unbindTexture()
    }
    this.initTexture = function (a) {
      ea.setTexture2D(a, 0)
      ba.unbindTexture()
    }
    'undefined' !== typeof __THREE_DEVTOOLS__ &&
      __THREE_DEVTOOLS__.dispatchEvent(
        new CustomEvent('observe', { detail: this }),
      )
  }
  function cf(e, h) {
    this.name = ''
    this.color = new D(e)
    this.density = void 0 !== h ? h : 2.5e-4
  }
  function df(e, h, a) {
    this.name = ''
    this.color = new D(e)
    this.near = void 0 !== h ? h : 1
    this.far = void 0 !== a ? a : 1e3
  }
  function wb(e, h) {
    this.array = e
    this.stride = h
    this.count = void 0 !== e ? e.length / h : 0
    this.usage = 35044
    this.updateRange = { offset: 0, count: -1 }
    this.version = 0
  }
  function Zd(e, h, a, b) {
    this.data = e
    this.itemSize = h
    this.offset = a
    this.normalized = !0 === b
  }
  function Nb(e) {
    R.call(this)
    this.type = 'SpriteMaterial'
    this.color = new D(16777215)
    this.alphaMap = this.map = null
    this.rotation = 0
    this.transparent = this.sizeAttenuation = !0
    this.setValues(e)
  }
  function $d(e) {
    E.call(this)
    this.type = 'Sprite'
    if (void 0 === Wc) {
      Wc = new G()
      var h = new Float32Array([
        -0.5,
        -0.5,
        0,
        0,
        0,
        0.5,
        -0.5,
        0,
        1,
        0,
        0.5,
        0.5,
        0,
        1,
        1,
        -0.5,
        0.5,
        0,
        0,
        1,
      ])
      h = new wb(h, 5)
      Wc.setIndex([0, 1, 2, 0, 2, 3])
      Wc.setAttribute('position', new Zd(h, 3, 0, !1))
      Wc.setAttribute('uv', new Zd(h, 2, 3, !1))
    }
    this.geometry = Wc
    this.material = void 0 !== e ? e : new Nb()
    this.center = new z(0.5, 0.5)
  }
  function ef(e, h, a, b, c, d) {
    Xc.subVectors(e, a).addScalar(0.5).multiply(b)
    void 0 !== c
      ? ((ae.x = d * Xc.x - c * Xc.y), (ae.y = c * Xc.x + d * Xc.y))
      : ae.copy(Xc)
    e.copy(h)
    e.x += ae.x
    e.y += ae.y
    e.applyMatrix4(Ci)
  }
  function be() {
    E.call(this)
    this.type = 'LOD'
    Object.defineProperties(this, { levels: { enumerable: !0, value: [] } })
    this.autoUpdate = !0
  }
  function ce(e, h) {
    e &&
      e.isGeometry &&
      console.error(
        'THREE.SkinnedMesh no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.',
      )
    ia.call(this, e, h)
    this.type = 'SkinnedMesh'
    this.bindMode = 'attached'
    this.bindMatrix = new I()
    this.bindMatrixInverse = new I()
  }
  function ff(e, h) {
    e = e || []
    this.bones = e.slice(0)
    this.boneMatrices = new Float32Array(16 * this.bones.length)
    this.frame = -1
    if (void 0 === h) this.calculateInverses()
    else if (this.bones.length === h.length) this.boneInverses = h.slice(0)
    else
      for (
        console.warn('THREE.Skeleton boneInverses is the wrong length.'),
          this.boneInverses = [],
          e = 0,
          h = this.bones.length;
        e < h;
        e++
      )
        this.boneInverses.push(new I())
  }
  function Ig() {
    E.call(this)
    this.type = 'Bone'
  }
  function gf(e, h, a) {
    ia.call(this, e, h)
    this.instanceMatrix = new O(new Float32Array(16 * a), 16)
    this.count = a
  }
  function T(e) {
    R.call(this)
    this.type = 'LineBasicMaterial'
    this.color = new D(16777215)
    this.linewidth = 1
    this.linejoin = this.linecap = 'round'
    this.setValues(e)
  }
  function pa(e, h, a) {
    1 === a &&
      console.error(
        'THREE.Line: parameter THREE.LinePieces no longer supported. Use THREE.LineSegments instead.',
      )
    E.call(this)
    this.type = 'Line'
    this.geometry = void 0 !== e ? e : new G()
    this.material =
      void 0 !== h ? h : new T({ color: 16777215 * Math.random() })
  }
  function Z(e, h) {
    pa.call(this, e, h)
    this.type = 'LineSegments'
  }
  function hf(e, h) {
    pa.call(this, e, h)
    this.type = 'LineLoop'
  }
  function Va(e) {
    R.call(this)
    this.type = 'PointsMaterial'
    this.color = new D(16777215)
    this.alphaMap = this.map = null
    this.size = 1
    this.sizeAttenuation = !0
    this.morphTargets = !1
    this.setValues(e)
  }
  function Yc(e, h) {
    E.call(this)
    this.type = 'Points'
    this.geometry = void 0 !== e ? e : new G()
    this.material =
      void 0 !== h ? h : new Va({ color: 16777215 * Math.random() })
    this.updateMorphTargets()
  }
  function Jg(e, h, a, b, c, d, f) {
    var g = Kg.distanceSqToPoint(e)
    g < a &&
      ((a = new q()),
      Kg.closestPointToPoint(e, a),
      a.applyMatrix4(b),
      (e = c.ray.origin.distanceTo(a)),
      e < c.near ||
        e > c.far ||
        d.push({
          distance: e,
          distanceToRay: Math.sqrt(g),
          point: a,
          index: h,
          face: null,
          object: f,
        }))
  }
  function Lg(e, h, a, b, c, d, f, g, k) {
    S.call(this, e, h, a, b, c, d, f, g, k)
    this.format = void 0 !== f ? f : 1022
    this.minFilter = void 0 !== d ? d : 1006
    this.magFilter = void 0 !== c ? c : 1006
    this.generateMipmaps = !1
  }
  function Zc(e, h, a, b, c, d, f, g, k, m, n, p) {
    S.call(this, null, d, f, g, k, m, b, c, n, p)
    this.image = { width: h, height: a }
    this.mipmaps = e
    this.generateMipmaps = this.flipY = !1
  }
  function de(e, h, a, b, c, d, f, g, k) {
    S.call(this, e, h, a, b, c, d, f, g, k)
    this.needsUpdate = !0
  }
  function ee(e, h, a, b, c, d, f, g, k, m) {
    m = void 0 !== m ? m : 1026
    if (1026 !== m && 1027 !== m)
      throw Error(
        'DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat',
      )
    void 0 === a && 1026 === m && (a = 1012)
    void 0 === a && 1027 === m && (a = 1020)
    S.call(this, null, b, c, d, f, g, m, a, k)
    this.image = { width: e, height: h }
    this.magFilter = void 0 !== f ? f : 1003
    this.minFilter = void 0 !== g ? g : 1003
    this.generateMipmaps = this.flipY = !1
  }
  function $c(e) {
    G.call(this)
    this.type = 'WireframeGeometry'
    var h = [],
      a,
      b,
      c,
      d = [0, 0],
      f = {},
      g = ['a', 'b', 'c']
    if (e && e.isGeometry) {
      var k = e.faces
      var m = 0
      for (b = k.length; m < b; m++) {
        var n = k[m]
        for (a = 0; 3 > a; a++) {
          var p = n[g[a]]
          var l = n[g[(a + 1) % 3]]
          d[0] = Math.min(p, l)
          d[1] = Math.max(p, l)
          p = d[0] + ',' + d[1]
          void 0 === f[p] && (f[p] = { index1: d[0], index2: d[1] })
        }
      }
      for (p in f)
        (m = f[p]),
          (g = e.vertices[m.index1]),
          h.push(g.x, g.y, g.z),
          (g = e.vertices[m.index2]),
          h.push(g.x, g.y, g.z)
    } else if (e && e.isBufferGeometry)
      if (((g = new q()), null !== e.index)) {
        k = e.attributes.position
        n = e.index
        var t = e.groups
        0 === t.length && (t = [{ start: 0, count: n.count, materialIndex: 0 }])
        e = 0
        for (c = t.length; e < c; ++e)
          for (
            m = t[e], a = m.start, b = m.count, m = a, b = a + b;
            m < b;
            m += 3
          )
            for (a = 0; 3 > a; a++)
              (p = n.getX(m + a)),
                (l = n.getX(m + ((a + 1) % 3))),
                (d[0] = Math.min(p, l)),
                (d[1] = Math.max(p, l)),
                (p = d[0] + ',' + d[1]),
                void 0 === f[p] && (f[p] = { index1: d[0], index2: d[1] })
        for (p in f)
          (m = f[p]),
            g.fromBufferAttribute(k, m.index1),
            h.push(g.x, g.y, g.z),
            g.fromBufferAttribute(k, m.index2),
            h.push(g.x, g.y, g.z)
      } else
        for (k = e.attributes.position, m = 0, b = k.count / 3; m < b; m++)
          for (a = 0; 3 > a; a++)
            (f = 3 * m + a),
              g.fromBufferAttribute(k, f),
              h.push(g.x, g.y, g.z),
              (f = 3 * m + ((a + 1) % 3)),
              g.fromBufferAttribute(k, f),
              h.push(g.x, g.y, g.z)
    this.setAttribute('position', new F(h, 3))
  }
  function fe(e, h, a) {
    P.call(this)
    this.type = 'ParametricGeometry'
    this.parameters = { func: e, slices: h, stacks: a }
    this.fromBufferGeometry(new ad(e, h, a))
    this.mergeVertices()
  }
  function ad(e, h, a) {
    G.call(this)
    this.type = 'ParametricBufferGeometry'
    this.parameters = { func: e, slices: h, stacks: a }
    var b = [],
      c = [],
      d = [],
      f = [],
      g = new q(),
      k = new q(),
      m = new q(),
      n = new q(),
      p = new q(),
      l,
      t
    3 > e.length &&
      console.error(
        'THREE.ParametricGeometry: Function must now modify a Vector3 as third parameter.',
      )
    var r = h + 1
    for (l = 0; l <= a; l++) {
      var u = l / a
      for (t = 0; t <= h; t++) {
        var v = t / h
        e(v, u, k)
        c.push(k.x, k.y, k.z)
        0 <= v - 1e-5
          ? (e(v - 1e-5, u, m), n.subVectors(k, m))
          : (e(v + 1e-5, u, m), n.subVectors(m, k))
        0 <= u - 1e-5
          ? (e(v, u - 1e-5, m), p.subVectors(k, m))
          : (e(v, u + 1e-5, m), p.subVectors(m, k))
        g.crossVectors(n, p).normalize()
        d.push(g.x, g.y, g.z)
        f.push(v, u)
      }
    }
    for (l = 0; l < a; l++)
      for (t = 0; t < h; t++)
        (e = l * r + t + 1),
          (g = (l + 1) * r + t + 1),
          (k = (l + 1) * r + t),
          b.push(l * r + t, e, k),
          b.push(e, g, k)
    this.setIndex(b)
    this.setAttribute('position', new F(c, 3))
    this.setAttribute('normal', new F(d, 3))
    this.setAttribute('uv', new F(f, 2))
  }
  function ge(e, h, a, b) {
    P.call(this)
    this.type = 'PolyhedronGeometry'
    this.parameters = { vertices: e, indices: h, radius: a, detail: b }
    this.fromBufferGeometry(new Fa(e, h, a, b))
    this.mergeVertices()
  }
  function Fa(e, h, a, b) {
    function c(a) {
      g.push(a.x, a.y, a.z)
    }
    function d(a, b) {
      a *= 3
      b.x = e[a + 0]
      b.y = e[a + 1]
      b.z = e[a + 2]
    }
    function f(a, b, c, d) {
      0 > d && 1 === a.x && (k[b] = a.x - 1)
      0 === c.x && 0 === c.z && (k[b] = d / 2 / Math.PI + 0.5)
    }
    G.call(this)
    this.type = 'PolyhedronBufferGeometry'
    this.parameters = { vertices: e, indices: h, radius: a, detail: b }
    a = a || 1
    b = b || 0
    var g = [],
      k = []
    ;(function (a) {
      for (
        var b = new q(), e = new q(), f = new q(), g = 0;
        g < h.length;
        g += 3
      ) {
        d(h[g + 0], b)
        d(h[g + 1], e)
        d(h[g + 2], f)
        var k,
          m,
          l = b,
          w = e,
          x = f,
          B = Math.pow(2, a),
          C = []
        for (m = 0; m <= B; m++) {
          C[m] = []
          var A = l.clone().lerp(x, m / B),
            z = w.clone().lerp(x, m / B),
            W = B - m
          for (k = 0; k <= W; k++)
            C[m][k] = 0 === k && m === B ? A : A.clone().lerp(z, k / W)
        }
        for (m = 0; m < B; m++)
          for (k = 0; k < 2 * (B - m) - 1; k++)
            (l = Math.floor(k / 2)),
              0 === k % 2
                ? (c(C[m][l + 1]), c(C[m + 1][l]), c(C[m][l]))
                : (c(C[m][l + 1]), c(C[m + 1][l + 1]), c(C[m + 1][l]))
      }
    })(b)
    ;(function (a) {
      for (var b = new q(), c = 0; c < g.length; c += 3)
        (b.x = g[c + 0]),
          (b.y = g[c + 1]),
          (b.z = g[c + 2]),
          b.normalize().multiplyScalar(a),
          (g[c + 0] = b.x),
          (g[c + 1] = b.y),
          (g[c + 2] = b.z)
    })(a)
    ;(function () {
      for (var a = new q(), b = 0; b < g.length; b += 3)
        (a.x = g[b + 0]),
          (a.y = g[b + 1]),
          (a.z = g[b + 2]),
          k.push(
            Math.atan2(a.z, -a.x) / 2 / Math.PI + 0.5,
            1 -
              (Math.atan2(-a.y, Math.sqrt(a.x * a.x + a.z * a.z)) / Math.PI +
                0.5),
          )
      a = new q()
      b = new q()
      for (
        var c = new q(),
          d = new q(),
          e = new z(),
          h = new z(),
          l = new z(),
          v = 0,
          w = 0;
        v < g.length;
        v += 9, w += 6
      ) {
        a.set(g[v + 0], g[v + 1], g[v + 2])
        b.set(g[v + 3], g[v + 4], g[v + 5])
        c.set(g[v + 6], g[v + 7], g[v + 8])
        e.set(k[w + 0], k[w + 1])
        h.set(k[w + 2], k[w + 3])
        l.set(k[w + 4], k[w + 5])
        d.copy(a).add(b).add(c).divideScalar(3)
        var x = Math.atan2(d.z, -d.x)
        f(e, w + 0, a, x)
        f(h, w + 2, b, x)
        f(l, w + 4, c, x)
      }
      for (a = 0; a < k.length; a += 6)
        (b = k[a + 0]),
          (c = k[a + 2]),
          (d = k[a + 4]),
          (e = Math.min(b, c, d)),
          0.9 < Math.max(b, c, d) &&
            0.1 > e &&
            (0.2 > b && (k[a + 0] += 1),
            0.2 > c && (k[a + 2] += 1),
            0.2 > d && (k[a + 4] += 1))
    })()
    this.setAttribute('position', new F(g, 3))
    this.setAttribute('normal', new F(g.slice(), 3))
    this.setAttribute('uv', new F(k, 2))
    0 === b ? this.computeVertexNormals() : this.normalizeNormals()
  }
  function he(e, h) {
    P.call(this)
    this.type = 'TetrahedronGeometry'
    this.parameters = { radius: e, detail: h }
    this.fromBufferGeometry(new bd(e, h))
    this.mergeVertices()
  }
  function bd(e, h) {
    Fa.call(
      this,
      [1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1],
      [2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1],
      e,
      h,
    )
    this.type = 'TetrahedronBufferGeometry'
    this.parameters = { radius: e, detail: h }
  }
  function ie(e, h) {
    P.call(this)
    this.type = 'OctahedronGeometry'
    this.parameters = { radius: e, detail: h }
    this.fromBufferGeometry(new lc(e, h))
    this.mergeVertices()
  }
  function lc(e, h) {
    Fa.call(
      this,
      [1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1, 0, 0, 0, 1, 0, 0, -1],
      [0, 2, 4, 0, 4, 3, 0, 3, 5, 0, 5, 2, 1, 2, 5, 1, 5, 3, 1, 3, 4, 1, 4, 2],
      e,
      h,
    )
    this.type = 'OctahedronBufferGeometry'
    this.parameters = { radius: e, detail: h }
  }
  function je(e, h) {
    P.call(this)
    this.type = 'IcosahedronGeometry'
    this.parameters = { radius: e, detail: h }
    this.fromBufferGeometry(new cd(e, h))
    this.mergeVertices()
  }
  function cd(e, h) {
    var a = (1 + Math.sqrt(5)) / 2
    Fa.call(
      this,
      [
        -1,
        a,
        0,
        1,
        a,
        0,
        -1,
        -a,
        0,
        1,
        -a,
        0,
        0,
        -1,
        a,
        0,
        1,
        a,
        0,
        -1,
        -a,
        0,
        1,
        -a,
        a,
        0,
        -1,
        a,
        0,
        1,
        -a,
        0,
        -1,
        -a,
        0,
        1,
      ],
      [
        0,
        11,
        5,
        0,
        5,
        1,
        0,
        1,
        7,
        0,
        7,
        10,
        0,
        10,
        11,
        1,
        5,
        9,
        5,
        11,
        4,
        11,
        10,
        2,
        10,
        7,
        6,
        7,
        1,
        8,
        3,
        9,
        4,
        3,
        4,
        2,
        3,
        2,
        6,
        3,
        6,
        8,
        3,
        8,
        9,
        4,
        9,
        5,
        2,
        4,
        11,
        6,
        2,
        10,
        8,
        6,
        7,
        9,
        8,
        1,
      ],
      e,
      h,
    )
    this.type = 'IcosahedronBufferGeometry'
    this.parameters = { radius: e, detail: h }
  }
  function ke(e, h) {
    P.call(this)
    this.type = 'DodecahedronGeometry'
    this.parameters = { radius: e, detail: h }
    this.fromBufferGeometry(new dd(e, h))
    this.mergeVertices()
  }
  function dd(e, h) {
    var a = (1 + Math.sqrt(5)) / 2,
      b = 1 / a
    Fa.call(
      this,
      [
        -1,
        -1,
        -1,
        -1,
        -1,
        1,
        -1,
        1,
        -1,
        -1,
        1,
        1,
        1,
        -1,
        -1,
        1,
        -1,
        1,
        1,
        1,
        -1,
        1,
        1,
        1,
        0,
        -b,
        -a,
        0,
        -b,
        a,
        0,
        b,
        -a,
        0,
        b,
        a,
        -b,
        -a,
        0,
        -b,
        a,
        0,
        b,
        -a,
        0,
        b,
        a,
        0,
        -a,
        0,
        -b,
        a,
        0,
        -b,
        -a,
        0,
        b,
        a,
        0,
        b,
      ],
      [
        3,
        11,
        7,
        3,
        7,
        15,
        3,
        15,
        13,
        7,
        19,
        17,
        7,
        17,
        6,
        7,
        6,
        15,
        17,
        4,
        8,
        17,
        8,
        10,
        17,
        10,
        6,
        8,
        0,
        16,
        8,
        16,
        2,
        8,
        2,
        10,
        0,
        12,
        1,
        0,
        1,
        18,
        0,
        18,
        16,
        6,
        10,
        2,
        6,
        2,
        13,
        6,
        13,
        15,
        2,
        16,
        18,
        2,
        18,
        3,
        2,
        3,
        13,
        18,
        1,
        9,
        18,
        9,
        11,
        18,
        11,
        3,
        4,
        14,
        12,
        4,
        12,
        0,
        4,
        0,
        8,
        11,
        9,
        5,
        11,
        5,
        19,
        11,
        19,
        7,
        19,
        5,
        14,
        19,
        14,
        4,
        19,
        4,
        17,
        1,
        12,
        14,
        1,
        14,
        5,
        1,
        5,
        9,
      ],
      e,
      h,
    )
    this.type = 'DodecahedronBufferGeometry'
    this.parameters = { radius: e, detail: h }
  }
  function le(e, h, a, b, c, d) {
    P.call(this)
    this.type = 'TubeGeometry'
    this.parameters = {
      path: e,
      tubularSegments: h,
      radius: a,
      radialSegments: b,
      closed: c,
    }
    void 0 !== d && console.warn('THREE.TubeGeometry: taper has been removed.')
    e = new mc(e, h, a, b, c)
    this.tangents = e.tangents
    this.normals = e.normals
    this.binormals = e.binormals
    this.fromBufferGeometry(e)
    this.mergeVertices()
  }
  function mc(e, h, a, b, c) {
    function d(c) {
      n = e.getPointAt(c / h, n)
      var d = f.normals[c]
      c = f.binormals[c]
      for (l = 0; l <= b; l++) {
        var m = (l / b) * Math.PI * 2,
          p = Math.sin(m)
        m = -Math.cos(m)
        k.x = m * d.x + p * c.x
        k.y = m * d.y + p * c.y
        k.z = m * d.z + p * c.z
        k.normalize()
        r.push(k.x, k.y, k.z)
        g.x = n.x + a * k.x
        g.y = n.y + a * k.y
        g.z = n.z + a * k.z
        t.push(g.x, g.y, g.z)
      }
    }
    G.call(this)
    this.type = 'TubeBufferGeometry'
    this.parameters = {
      path: e,
      tubularSegments: h,
      radius: a,
      radialSegments: b,
      closed: c,
    }
    h = h || 64
    a = a || 1
    b = b || 8
    c = c || !1
    var f = e.computeFrenetFrames(h, c)
    this.tangents = f.tangents
    this.normals = f.normals
    this.binormals = f.binormals
    var g = new q(),
      k = new q(),
      m = new z(),
      n = new q(),
      p,
      l,
      t = [],
      r = [],
      u = [],
      v = []
    for (p = 0; p < h; p++) d(p)
    d(!1 === c ? h : 0)
    for (p = 0; p <= h; p++)
      for (l = 0; l <= b; l++) (m.x = p / h), (m.y = l / b), u.push(m.x, m.y)
    ;(function () {
      for (l = 1; l <= h; l++)
        for (p = 1; p <= b; p++) {
          var a = (b + 1) * l + (p - 1),
            c = (b + 1) * l + p,
            d = (b + 1) * (l - 1) + p
          v.push((b + 1) * (l - 1) + (p - 1), a, d)
          v.push(a, c, d)
        }
    })()
    this.setIndex(v)
    this.setAttribute('position', new F(t, 3))
    this.setAttribute('normal', new F(r, 3))
    this.setAttribute('uv', new F(u, 2))
  }
  function me(e, h, a, b, c, d, f) {
    P.call(this)
    this.type = 'TorusKnotGeometry'
    this.parameters = {
      radius: e,
      tube: h,
      tubularSegments: a,
      radialSegments: b,
      p: c,
      q: d,
    }
    void 0 !== f &&
      console.warn(
        'THREE.TorusKnotGeometry: heightScale has been deprecated. Use .scale( x, y, z ) instead.',
      )
    this.fromBufferGeometry(new ed(e, h, a, b, c, d))
    this.mergeVertices()
  }
  function ed(e, h, a, b, c, d) {
    function f(a, b, c, d, e) {
      var f = Math.sin(a)
      b = (c / b) * a
      c = Math.cos(b)
      e.x = d * (2 + c) * 0.5 * Math.cos(a)
      e.y = d * (2 + c) * f * 0.5
      e.z = d * Math.sin(b) * 0.5
    }
    G.call(this)
    this.type = 'TorusKnotBufferGeometry'
    this.parameters = {
      radius: e,
      tube: h,
      tubularSegments: a,
      radialSegments: b,
      p: c,
      q: d,
    }
    e = e || 1
    h = h || 0.4
    a = Math.floor(a) || 64
    b = Math.floor(b) || 8
    c = c || 2
    d = d || 3
    var g = [],
      k = [],
      m = [],
      n = [],
      p,
      l = new q(),
      t = new q(),
      r = new q(),
      u = new q(),
      v = new q(),
      w = new q(),
      x = new q()
    for (p = 0; p <= a; ++p) {
      var B = (p / a) * c * Math.PI * 2
      f(B, c, d, e, r)
      f(B + 0.01, c, d, e, u)
      w.subVectors(u, r)
      x.addVectors(u, r)
      v.crossVectors(w, x)
      x.crossVectors(v, w)
      v.normalize()
      x.normalize()
      for (B = 0; B <= b; ++B) {
        var C = (B / b) * Math.PI * 2,
          A = -h * Math.cos(C)
        C = h * Math.sin(C)
        l.x = r.x + (A * x.x + C * v.x)
        l.y = r.y + (A * x.y + C * v.y)
        l.z = r.z + (A * x.z + C * v.z)
        k.push(l.x, l.y, l.z)
        t.subVectors(l, r).normalize()
        m.push(t.x, t.y, t.z)
        n.push(p / a)
        n.push(B / b)
      }
    }
    for (B = 1; B <= a; B++)
      for (p = 1; p <= b; p++)
        (e = (b + 1) * B + (p - 1)),
          (h = (b + 1) * B + p),
          (c = (b + 1) * (B - 1) + p),
          g.push((b + 1) * (B - 1) + (p - 1), e, c),
          g.push(e, h, c)
    this.setIndex(g)
    this.setAttribute('position', new F(k, 3))
    this.setAttribute('normal', new F(m, 3))
    this.setAttribute('uv', new F(n, 2))
  }
  function ne(e, h, a, b, c) {
    P.call(this)
    this.type = 'TorusGeometry'
    this.parameters = {
      radius: e,
      tube: h,
      radialSegments: a,
      tubularSegments: b,
      arc: c,
    }
    this.fromBufferGeometry(new fd(e, h, a, b, c))
    this.mergeVertices()
  }
  function fd(e, h, a, b, c) {
    G.call(this)
    this.type = 'TorusBufferGeometry'
    this.parameters = {
      radius: e,
      tube: h,
      radialSegments: a,
      tubularSegments: b,
      arc: c,
    }
    e = e || 1
    h = h || 0.4
    a = Math.floor(a) || 8
    b = Math.floor(b) || 6
    c = c || 2 * Math.PI
    var d = [],
      f = [],
      g = [],
      k = [],
      m = new q(),
      n = new q(),
      p = new q(),
      l,
      t
    for (l = 0; l <= a; l++)
      for (t = 0; t <= b; t++) {
        var r = (t / b) * c,
          u = (l / a) * Math.PI * 2
        n.x = (e + h * Math.cos(u)) * Math.cos(r)
        n.y = (e + h * Math.cos(u)) * Math.sin(r)
        n.z = h * Math.sin(u)
        f.push(n.x, n.y, n.z)
        m.x = e * Math.cos(r)
        m.y = e * Math.sin(r)
        p.subVectors(n, m).normalize()
        g.push(p.x, p.y, p.z)
        k.push(t / b)
        k.push(l / a)
      }
    for (l = 1; l <= a; l++)
      for (t = 1; t <= b; t++)
        (e = (b + 1) * (l - 1) + t - 1),
          (h = (b + 1) * (l - 1) + t),
          (c = (b + 1) * l + t),
          d.push((b + 1) * l + t - 1, e, c),
          d.push(e, h, c)
    this.setIndex(d)
    this.setAttribute('position', new F(f, 3))
    this.setAttribute('normal', new F(g, 3))
    this.setAttribute('uv', new F(k, 2))
  }
  function Di(e, h, a, b, c) {
    for (var d, f = 0, g = h, k = a - b; g < a; g += b)
      (f += (e[k] - e[g]) * (e[g + 1] + e[k + 1])), (k = g)
    if (c === 0 < f) for (c = h; c < a; c += b) d = Ei(c, e[c], e[c + 1], d)
    else for (c = a - b; c >= h; c -= b) d = Ei(c, e[c], e[c + 1], d)
    d && nc(d, d.next) && (oe(d), (d = d.next))
    return d
  }
  function pe(e, h) {
    if (!e) return e
    h || (h = e)
    do {
      var a = !1
      if (e.steiner || (!nc(e, e.next) && 0 !== wa(e.prev, e, e.next)))
        e = e.next
      else {
        oe(e)
        e = h = e.prev
        if (e === e.next) break
        a = !0
      }
    } while (a || e !== h)
    return h
  }
  function qe(e, h, a, b, c, d, f) {
    if (e) {
      if (!f && d) {
        var g = e,
          k = g
        do
          null === k.z && (k.z = Mg(k.x, k.y, b, c, d)),
            (k.prevZ = k.prev),
            (k = k.nextZ = k.next)
        while (k !== g)
        k.prevZ.nextZ = null
        k.prevZ = null
        g = k
        var m,
          n,
          p,
          l,
          t = 1
        do {
          k = g
          var r = (g = null)
          for (n = 0; k; ) {
            n++
            var u = k
            for (m = p = 0; m < t && (p++, (u = u.nextZ), u); m++);
            for (l = t; 0 < p || (0 < l && u); )
              0 !== p && (0 === l || !u || k.z <= u.z)
                ? ((m = k), (k = k.nextZ), p--)
                : ((m = u), (u = u.nextZ), l--),
                r ? (r.nextZ = m) : (g = m),
                (m.prevZ = r),
                (r = m)
            k = u
          }
          r.nextZ = null
          t *= 2
        } while (1 < n)
      }
      for (g = e; e.prev !== e.next; ) {
        k = e.prev
        u = e.next
        if (d) r = il(e, b, c, d)
        else
          a: if (
            ((r = e), (n = r.prev), (p = r), (t = r.next), 0 <= wa(n, p, t))
          )
            r = !1
          else {
            for (m = r.next.next; m !== r.prev; ) {
              if (
                gd(n.x, n.y, p.x, p.y, t.x, t.y, m.x, m.y) &&
                0 <= wa(m.prev, m, m.next)
              ) {
                r = !1
                break a
              }
              m = m.next
            }
            r = !0
          }
        if (r)
          h.push(k.i / a),
            h.push(e.i / a),
            h.push(u.i / a),
            oe(e),
            (g = e = u.next)
        else if (((e = u), e === g)) {
          if (!f) qe(pe(e), h, a, b, c, d, 1)
          else if (1 === f) {
            f = h
            g = a
            k = e
            do
              (u = k.prev),
                (r = k.next.next),
                !nc(u, r) &&
                  Fi(u, k, k.next, r) &&
                  re(u, r) &&
                  re(r, u) &&
                  (f.push(u.i / g),
                  f.push(k.i / g),
                  f.push(r.i / g),
                  oe(k),
                  oe(k.next),
                  (k = e = r)),
                (k = k.next)
            while (k !== e)
            e = k
            qe(e, h, a, b, c, d, 2)
          } else if (2 === f)
            a: {
              f = e
              do {
                for (g = f.next.next; g !== f.prev; ) {
                  if ((k = f.i !== g.i)) {
                    k = f
                    u = g
                    if ((r = k.next.i !== u.i && k.prev.i !== u.i)) {
                      b: {
                        r = k
                        do {
                          if (
                            r.i !== k.i &&
                            r.next.i !== k.i &&
                            r.i !== u.i &&
                            r.next.i !== u.i &&
                            Fi(r, r.next, k, u)
                          ) {
                            r = !0
                            break b
                          }
                          r = r.next
                        } while (r !== k)
                        r = !1
                      }
                      r = !r
                    }
                    if ((r = r && re(k, u) && re(u, k))) {
                      r = k
                      n = !1
                      p = (k.x + u.x) / 2
                      u = (k.y + u.y) / 2
                      do
                        r.y > u !== r.next.y > u &&
                          r.next.y !== r.y &&
                          p <
                            ((r.next.x - r.x) * (u - r.y)) / (r.next.y - r.y) +
                              r.x &&
                          (n = !n),
                          (r = r.next)
                      while (r !== k)
                      r = n
                    }
                    k = r
                  }
                  if (k) {
                    e = Gi(f, g)
                    f = pe(f, f.next)
                    e = pe(e, e.next)
                    qe(f, h, a, b, c, d)
                    qe(e, h, a, b, c, d)
                    break a
                  }
                  g = g.next
                }
                f = f.next
              } while (f !== e)
            }
          break
        }
      }
    }
  }
  function il(e, h, a, b) {
    var c = e.prev,
      d = e.next
    if (0 <= wa(c, e, d)) return !1
    var f = c.x > e.x ? (c.x > d.x ? c.x : d.x) : e.x > d.x ? e.x : d.x,
      g = c.y > e.y ? (c.y > d.y ? c.y : d.y) : e.y > d.y ? e.y : d.y,
      k = Mg(
        c.x < e.x ? (c.x < d.x ? c.x : d.x) : e.x < d.x ? e.x : d.x,
        c.y < e.y ? (c.y < d.y ? c.y : d.y) : e.y < d.y ? e.y : d.y,
        h,
        a,
        b,
      )
    h = Mg(f, g, h, a, b)
    a = e.prevZ
    for (b = e.nextZ; a && a.z >= k && b && b.z <= h; ) {
      if (
        a !== e.prev &&
        a !== e.next &&
        gd(c.x, c.y, e.x, e.y, d.x, d.y, a.x, a.y) &&
        0 <= wa(a.prev, a, a.next)
      )
        return !1
      a = a.prevZ
      if (
        b !== e.prev &&
        b !== e.next &&
        gd(c.x, c.y, e.x, e.y, d.x, d.y, b.x, b.y) &&
        0 <= wa(b.prev, b, b.next)
      )
        return !1
      b = b.nextZ
    }
    for (; a && a.z >= k; ) {
      if (
        a !== e.prev &&
        a !== e.next &&
        gd(c.x, c.y, e.x, e.y, d.x, d.y, a.x, a.y) &&
        0 <= wa(a.prev, a, a.next)
      )
        return !1
      a = a.prevZ
    }
    for (; b && b.z <= h; ) {
      if (
        b !== e.prev &&
        b !== e.next &&
        gd(c.x, c.y, e.x, e.y, d.x, d.y, b.x, b.y) &&
        0 <= wa(b.prev, b, b.next)
      )
        return !1
      b = b.nextZ
    }
    return !0
  }
  function jl(e, h) {
    return e.x - h.x
  }
  function kl(e, h) {
    var a = h,
      b = e.x,
      c = e.y,
      d = -Infinity
    do {
      if (c <= a.y && c >= a.next.y && a.next.y !== a.y) {
        var f = a.x + ((c - a.y) * (a.next.x - a.x)) / (a.next.y - a.y)
        if (f <= b && f > d) {
          d = f
          if (f === b) {
            if (c === a.y) return a
            if (c === a.next.y) return a.next
          }
          var g = a.x < a.next.x ? a : a.next
        }
      }
      a = a.next
    } while (a !== h)
    if (!g) return null
    if (b === d) return g.prev
    h = g
    f = g.x
    var k = g.y,
      m = Infinity
    for (a = g.next; a !== h; ) {
      if (
        b >= a.x &&
        a.x >= f &&
        b !== a.x &&
        gd(c < k ? b : d, c, f, k, c < k ? d : b, c, a.x, a.y)
      ) {
        var n = Math.abs(c - a.y) / (b - a.x)
        ;(n < m || (n === m && a.x > g.x)) && re(a, e) && ((g = a), (m = n))
      }
      a = a.next
    }
    return g
  }
  function Mg(e, h, a, b, c) {
    e = 32767 * (e - a) * c
    h = 32767 * (h - b) * c
    e = (e | (e << 8)) & 16711935
    e = (e | (e << 4)) & 252645135
    e = (e | (e << 2)) & 858993459
    h = (h | (h << 8)) & 16711935
    h = (h | (h << 4)) & 252645135
    h = (h | (h << 2)) & 858993459
    return ((e | (e << 1)) & 1431655765) | (((h | (h << 1)) & 1431655765) << 1)
  }
  function ll(e) {
    var h = e,
      a = e
    do {
      if (h.x < a.x || (h.x === a.x && h.y < a.y)) a = h
      h = h.next
    } while (h !== e)
    return a
  }
  function gd(e, h, a, b, c, d, f, g) {
    return (
      0 <= (c - f) * (h - g) - (e - f) * (d - g) &&
      0 <= (e - f) * (b - g) - (a - f) * (h - g) &&
      0 <= (a - f) * (d - g) - (c - f) * (b - g)
    )
  }
  function wa(e, h, a) {
    return (h.y - e.y) * (a.x - h.x) - (h.x - e.x) * (a.y - h.y)
  }
  function nc(e, h) {
    return e.x === h.x && e.y === h.y
  }
  function Fi(e, h, a, b) {
    return (nc(e, a) && nc(h, b)) || (nc(e, b) && nc(a, h))
      ? !0
      : 0 < wa(e, h, a) !== 0 < wa(e, h, b) &&
          0 < wa(a, b, e) !== 0 < wa(a, b, h)
  }
  function re(e, h) {
    return 0 > wa(e.prev, e, e.next)
      ? 0 <= wa(e, h, e.next) && 0 <= wa(e, e.prev, h)
      : 0 > wa(e, h, e.prev) || 0 > wa(e, e.next, h)
  }
  function Gi(e, h) {
    var a = new Ng(e.i, e.x, e.y),
      b = new Ng(h.i, h.x, h.y),
      c = e.next,
      d = h.prev
    e.next = h
    h.prev = e
    a.next = c
    c.prev = a
    b.next = a
    a.prev = b
    d.next = b
    b.prev = d
    return b
  }
  function Ei(e, h, a, b) {
    e = new Ng(e, h, a)
    b
      ? ((e.next = b.next), (e.prev = b), (b.next.prev = e), (b.next = e))
      : ((e.prev = e), (e.next = e))
    return e
  }
  function oe(e) {
    e.next.prev = e.prev
    e.prev.next = e.next
    e.prevZ && (e.prevZ.nextZ = e.nextZ)
    e.nextZ && (e.nextZ.prevZ = e.prevZ)
  }
  function Ng(e, h, a) {
    this.i = e
    this.x = h
    this.y = a
    this.nextZ = this.prevZ = this.z = this.next = this.prev = null
    this.steiner = !1
  }
  function Hi(e) {
    var h = e.length
    2 < h && e[h - 1].equals(e[0]) && e.pop()
  }
  function Ii(e, h) {
    for (var a = 0; a < h.length; a++) e.push(h[a].x), e.push(h[a].y)
  }
  function oc(e, h) {
    P.call(this)
    this.type = 'ExtrudeGeometry'
    this.parameters = { shapes: e, options: h }
    this.fromBufferGeometry(new jb(e, h))
    this.mergeVertices()
  }
  function jb(e, h) {
    function a(a) {
      function e(a, b, c) {
        b || console.error('THREE.ExtrudeGeometry: vec does not exist')
        return b.clone().multiplyScalar(c).add(a)
      }
      function f(a, b, c) {
        var d = a.x - b.x
        var e = a.y - b.y
        var f = c.x - a.x
        var g = c.y - a.y,
          h = d * d + e * e
        if (Math.abs(d * g - e * f) > Number.EPSILON) {
          var k = Math.sqrt(h),
            m = Math.sqrt(f * f + g * g)
          h = b.x - e / k
          b = b.y + d / k
          g = ((c.x - g / m - h) * g - (c.y + f / m - b) * f) / (d * g - e * f)
          f = h + d * g - a.x
          d = b + e * g - a.y
          e = f * f + d * d
          if (2 >= e) return new z(f, d)
          e = Math.sqrt(e / 2)
        } else (a = !1), d > Number.EPSILON ? f > Number.EPSILON && (a = !0) : d < -Number.EPSILON ? f < -Number.EPSILON && (a = !0) : Math.sign(e) === Math.sign(g) && (a = !0), a ? ((f = -e), (e = Math.sqrt(h))) : ((f = d), (d = e), (e = Math.sqrt(h / 2)))
        return new z(f / e, d / e)
      }
      function g(a, d) {
        for (L = a.length; 0 <= --L; ) {
          var e = L
          var f = L - 1
          0 > f && (f = a.length - 1)
          var g,
            h = x + 2 * D
          for (g = 0; g < h; g++) {
            var k = Z * g,
              m = Z * (g + 1),
              n = d + f + k,
              p = d + f + m
            m = d + e + m
            r(d + e + k)
            r(n)
            r(m)
            r(n)
            r(p)
            r(m)
            k = c.length / 3
            k = H.generateSideWallUV(b, c, k - 6, k - 3, k - 2, k - 1)
            u(k[0])
            u(k[1])
            u(k[3])
            u(k[1])
            u(k[2])
            u(k[3])
          }
        }
      }
      function k(a, b, c) {
        v.push(a)
        v.push(b)
        v.push(c)
      }
      function l(a, d, e) {
        r(a)
        r(d)
        r(e)
        a = c.length / 3
        a = H.generateTopUV(b, c, a - 3, a - 2, a - 1)
        u(a[0])
        u(a[1])
        u(a[2])
      }
      function r(a) {
        c.push(v[3 * a])
        c.push(v[3 * a + 1])
        c.push(v[3 * a + 2])
      }
      function u(a) {
        d.push(a.x)
        d.push(a.y)
      }
      var v = [],
        w = void 0 !== h.curveSegments ? h.curveSegments : 12,
        x = void 0 !== h.steps ? h.steps : 1,
        B = void 0 !== h.depth ? h.depth : 100,
        C = void 0 !== h.bevelEnabled ? h.bevelEnabled : !0,
        A = void 0 !== h.bevelThickness ? h.bevelThickness : 6,
        E = void 0 !== h.bevelSize ? h.bevelSize : A - 2,
        W = void 0 !== h.bevelOffset ? h.bevelOffset : 0,
        D = void 0 !== h.bevelSegments ? h.bevelSegments : 3,
        F = h.extrudePath,
        H = void 0 !== h.UVGenerator ? h.UVGenerator : ml
      void 0 !== h.amount &&
        (console.warn(
          'THREE.ExtrudeBufferGeometry: amount has been renamed to depth.',
        ),
        (B = h.amount))
      var G = !1
      if (F) {
        var K = F.getSpacedPoints(x)
        G = !0
        C = !1
        var M = F.computeFrenetFrames(x, !1)
        var P = new q()
        var R = new q()
        var O = new q()
      }
      C || (W = E = A = D = 0)
      var N
      w = a.extractPoints(w)
      a = w.shape
      var Q = w.holes
      if (!xb.isClockWise(a)) {
        a = a.reverse()
        var I = 0
        for (N = Q.length; I < N; I++) {
          var S = Q[I]
          xb.isClockWise(S) && (Q[I] = S.reverse())
        }
      }
      var aa = xb.triangulateShape(a, Q),
        X = a
      I = 0
      for (N = Q.length; I < N; I++) (S = Q[I]), (a = a.concat(S))
      var T,
        Z = a.length,
        V,
        ea = aa.length
      w = []
      var L = 0
      var Y = X.length
      var ha = Y - 1
      for (T = L + 1; L < Y; L++, ha++, T++)
        ha === Y && (ha = 0), T === Y && (T = 0), (w[L] = f(X[L], X[ha], X[T]))
      F = []
      var fa = w.concat()
      I = 0
      for (N = Q.length; I < N; I++) {
        S = Q[I]
        var ca = []
        L = 0
        Y = S.length
        ha = Y - 1
        for (T = L + 1; L < Y; L++, ha++, T++)
          ha === Y && (ha = 0),
            T === Y && (T = 0),
            (ca[L] = f(S[L], S[ha], S[T]))
        F.push(ca)
        fa = fa.concat(ca)
      }
      for (ha = 0; ha < D; ha++) {
        Y = ha / D
        var da = A * Math.cos((Y * Math.PI) / 2)
        T = E * Math.sin((Y * Math.PI) / 2) + W
        L = 0
        for (Y = X.length; L < Y; L++) {
          var U = e(X[L], w[L], T)
          k(U.x, U.y, -da)
        }
        I = 0
        for (N = Q.length; I < N; I++)
          for (S = Q[I], ca = F[I], L = 0, Y = S.length; L < Y; L++)
            (U = e(S[L], ca[L], T)), k(U.x, U.y, -da)
      }
      T = E + W
      for (L = 0; L < Z; L++)
        (U = C ? e(a[L], fa[L], T) : a[L]),
          G
            ? (R.copy(M.normals[0]).multiplyScalar(U.x),
              P.copy(M.binormals[0]).multiplyScalar(U.y),
              O.copy(K[0]).add(R).add(P),
              k(O.x, O.y, O.z))
            : k(U.x, U.y, 0)
      for (Y = 1; Y <= x; Y++)
        for (L = 0; L < Z; L++)
          (U = C ? e(a[L], fa[L], T) : a[L]),
            G
              ? (R.copy(M.normals[Y]).multiplyScalar(U.x),
                P.copy(M.binormals[Y]).multiplyScalar(U.y),
                O.copy(K[Y]).add(R).add(P),
                k(O.x, O.y, O.z))
              : k(U.x, U.y, (B / x) * Y)
      for (ha = D - 1; 0 <= ha; ha--) {
        Y = ha / D
        da = A * Math.cos((Y * Math.PI) / 2)
        T = E * Math.sin((Y * Math.PI) / 2) + W
        L = 0
        for (Y = X.length; L < Y; L++)
          (U = e(X[L], w[L], T)), k(U.x, U.y, B + da)
        I = 0
        for (N = Q.length; I < N; I++)
          for (S = Q[I], ca = F[I], L = 0, Y = S.length; L < Y; L++)
            (U = e(S[L], ca[L], T)),
              G
                ? k(U.x, U.y + K[x - 1].y, K[x - 1].x + da)
                : k(U.x, U.y, B + da)
      }
      ;(function () {
        var a = c.length / 3
        if (C) {
          var d = 0 * Z
          for (L = 0; L < ea; L++) (V = aa[L]), l(V[2] + d, V[1] + d, V[0] + d)
          d = Z * (x + 2 * D)
          for (L = 0; L < ea; L++) (V = aa[L]), l(V[0] + d, V[1] + d, V[2] + d)
        } else {
          for (L = 0; L < ea; L++) (V = aa[L]), l(V[2], V[1], V[0])
          for (L = 0; L < ea; L++)
            (V = aa[L]), l(V[0] + Z * x, V[1] + Z * x, V[2] + Z * x)
        }
        b.addGroup(a, c.length / 3 - a, 0)
      })()
      ;(function () {
        var a = c.length / 3,
          d = 0
        g(X, d)
        d += X.length
        I = 0
        for (N = Q.length; I < N; I++) (S = Q[I]), g(S, d), (d += S.length)
        b.addGroup(a, c.length / 3 - a, 1)
      })()
    }
    G.call(this)
    this.type = 'ExtrudeBufferGeometry'
    this.parameters = { shapes: e, options: h }
    e = Array.isArray(e) ? e : [e]
    for (var b = this, c = [], d = [], f = 0, g = e.length; f < g; f++) a(e[f])
    this.setAttribute('position', new F(c, 3))
    this.setAttribute('uv', new F(d, 2))
    this.computeVertexNormals()
  }
  function Ji(e, h, a) {
    a.shapes = []
    if (Array.isArray(e))
      for (var b = 0, c = e.length; b < c; b++) a.shapes.push(e[b].uuid)
    else a.shapes.push(e.uuid)
    void 0 !== h.extrudePath && (a.options.extrudePath = h.extrudePath.toJSON())
    return a
  }
  function se(e, h) {
    P.call(this)
    this.type = 'TextGeometry'
    this.parameters = { text: e, parameters: h }
    this.fromBufferGeometry(new hd(e, h))
    this.mergeVertices()
  }
  function hd(e, h) {
    h = h || {}
    var a = h.font
    if (!a || !a.isFont)
      return (
        console.error(
          'THREE.TextGeometry: font parameter is not an instance of THREE.Font.',
        ),
        new P()
      )
    e = a.generateShapes(e, h.size)
    h.depth = void 0 !== h.height ? h.height : 50
    void 0 === h.bevelThickness && (h.bevelThickness = 10)
    void 0 === h.bevelSize && (h.bevelSize = 8)
    void 0 === h.bevelEnabled && (h.bevelEnabled = !1)
    jb.call(this, e, h)
    this.type = 'TextBufferGeometry'
  }
  function te(e, h, a, b, c, d, f) {
    P.call(this)
    this.type = 'SphereGeometry'
    this.parameters = {
      radius: e,
      widthSegments: h,
      heightSegments: a,
      phiStart: b,
      phiLength: c,
      thetaStart: d,
      thetaLength: f,
    }
    this.fromBufferGeometry(new Ob(e, h, a, b, c, d, f))
    this.mergeVertices()
  }
  function Ob(e, h, a, b, c, d, f) {
    G.call(this)
    this.type = 'SphereBufferGeometry'
    this.parameters = {
      radius: e,
      widthSegments: h,
      heightSegments: a,
      phiStart: b,
      phiLength: c,
      thetaStart: d,
      thetaLength: f,
    }
    e = e || 1
    h = Math.max(3, Math.floor(h) || 8)
    a = Math.max(2, Math.floor(a) || 6)
    b = void 0 !== b ? b : 0
    c = void 0 !== c ? c : 2 * Math.PI
    d = void 0 !== d ? d : 0
    f = void 0 !== f ? f : Math.PI
    var g = Math.min(d + f, Math.PI),
      k,
      m,
      n = 0,
      p = [],
      l = new q(),
      t = new q(),
      r = [],
      u = [],
      v = [],
      w = []
    for (m = 0; m <= a; m++) {
      var x = [],
        B = m / a,
        C = 0
      0 == m && 0 == d
        ? (C = 0.5 / h)
        : m == a && g == Math.PI && (C = -0.5 / h)
      for (k = 0; k <= h; k++) {
        var A = k / h
        l.x = -e * Math.cos(b + A * c) * Math.sin(d + B * f)
        l.y = e * Math.cos(d + B * f)
        l.z = e * Math.sin(b + A * c) * Math.sin(d + B * f)
        u.push(l.x, l.y, l.z)
        t.copy(l).normalize()
        v.push(t.x, t.y, t.z)
        w.push(A + C, 1 - B)
        x.push(n++)
      }
      p.push(x)
    }
    for (m = 0; m < a; m++)
      for (k = 0; k < h; k++)
        (e = p[m][k + 1]),
          (b = p[m][k]),
          (c = p[m + 1][k]),
          (f = p[m + 1][k + 1]),
          (0 !== m || 0 < d) && r.push(e, b, f),
          (m !== a - 1 || g < Math.PI) && r.push(b, c, f)
    this.setIndex(r)
    this.setAttribute('position', new F(u, 3))
    this.setAttribute('normal', new F(v, 3))
    this.setAttribute('uv', new F(w, 2))
  }
  function ue(e, h, a, b, c, d) {
    P.call(this)
    this.type = 'RingGeometry'
    this.parameters = {
      innerRadius: e,
      outerRadius: h,
      thetaSegments: a,
      phiSegments: b,
      thetaStart: c,
      thetaLength: d,
    }
    this.fromBufferGeometry(new id(e, h, a, b, c, d))
    this.mergeVertices()
  }
  function id(e, h, a, b, c, d) {
    G.call(this)
    this.type = 'RingBufferGeometry'
    this.parameters = {
      innerRadius: e,
      outerRadius: h,
      thetaSegments: a,
      phiSegments: b,
      thetaStart: c,
      thetaLength: d,
    }
    e = e || 0.5
    h = h || 1
    c = void 0 !== c ? c : 0
    d = void 0 !== d ? d : 2 * Math.PI
    a = void 0 !== a ? Math.max(3, a) : 8
    b = void 0 !== b ? Math.max(1, b) : 1
    var f = [],
      g = [],
      k = [],
      m = [],
      n = e,
      p = (h - e) / b,
      l = new q(),
      t = new z(),
      r,
      u
    for (r = 0; r <= b; r++) {
      for (u = 0; u <= a; u++)
        (e = c + (u / a) * d),
          (l.x = n * Math.cos(e)),
          (l.y = n * Math.sin(e)),
          g.push(l.x, l.y, l.z),
          k.push(0, 0, 1),
          (t.x = (l.x / h + 1) / 2),
          (t.y = (l.y / h + 1) / 2),
          m.push(t.x, t.y)
      n += p
    }
    for (r = 0; r < b; r++)
      for (h = r * (a + 1), u = 0; u < a; u++)
        (e = u + h),
          (c = e + a + 1),
          (d = e + a + 2),
          (n = e + 1),
          f.push(e, c, n),
          f.push(c, d, n)
    this.setIndex(f)
    this.setAttribute('position', new F(g, 3))
    this.setAttribute('normal', new F(k, 3))
    this.setAttribute('uv', new F(m, 2))
  }
  function ve(e, h, a, b) {
    P.call(this)
    this.type = 'LatheGeometry'
    this.parameters = { points: e, segments: h, phiStart: a, phiLength: b }
    this.fromBufferGeometry(new jd(e, h, a, b))
    this.mergeVertices()
  }
  function jd(e, h, a, b) {
    G.call(this)
    this.type = 'LatheBufferGeometry'
    this.parameters = { points: e, segments: h, phiStart: a, phiLength: b }
    h = Math.floor(h) || 12
    a = a || 0
    b = b || 2 * Math.PI
    b = N.clamp(b, 0, 2 * Math.PI)
    var c = [],
      d = [],
      f = [],
      g = 1 / h,
      k = new q(),
      m = new z(),
      n
    for (n = 0; n <= h; n++) {
      var p = a + n * g * b
      var l = Math.sin(p),
        t = Math.cos(p)
      for (p = 0; p <= e.length - 1; p++)
        (k.x = e[p].x * l),
          (k.y = e[p].y),
          (k.z = e[p].x * t),
          d.push(k.x, k.y, k.z),
          (m.x = n / h),
          (m.y = p / (e.length - 1)),
          f.push(m.x, m.y)
    }
    for (n = 0; n < h; n++)
      for (p = 0; p < e.length - 1; p++)
        (a = p + n * e.length),
          (g = a + e.length),
          (k = a + e.length + 1),
          (m = a + 1),
          c.push(a, g, m),
          c.push(g, k, m)
    this.setIndex(c)
    this.setAttribute('position', new F(d, 3))
    this.setAttribute('uv', new F(f, 2))
    this.computeVertexNormals()
    if (b === 2 * Math.PI)
      for (
        b = this.attributes.normal.array,
          c = new q(),
          d = new q(),
          f = new q(),
          a = h * e.length * 3,
          p = n = 0;
        n < e.length;
        n++, p += 3
      )
        (c.x = b[p + 0]),
          (c.y = b[p + 1]),
          (c.z = b[p + 2]),
          (d.x = b[a + p + 0]),
          (d.y = b[a + p + 1]),
          (d.z = b[a + p + 2]),
          f.addVectors(c, d).normalize(),
          (b[p + 0] = b[a + p + 0] = f.x),
          (b[p + 1] = b[a + p + 1] = f.y),
          (b[p + 2] = b[a + p + 2] = f.z)
  }
  function pc(e, h) {
    P.call(this)
    this.type = 'ShapeGeometry'
    'object' === typeof h &&
      (console.warn('THREE.ShapeGeometry: Options parameter has been removed.'),
      (h = h.curveSegments))
    this.parameters = { shapes: e, curveSegments: h }
    this.fromBufferGeometry(new qc(e, h))
    this.mergeVertices()
  }
  function qc(e, h) {
    function a(a) {
      var e,
        g = c.length / 3
      a = a.extractPoints(h)
      var m = a.shape,
        n = a.holes
      !1 === xb.isClockWise(m) && (m = m.reverse())
      a = 0
      for (e = n.length; a < e; a++) {
        var l = n[a]
        !0 === xb.isClockWise(l) && (n[a] = l.reverse())
      }
      var q = xb.triangulateShape(m, n)
      a = 0
      for (e = n.length; a < e; a++) (l = n[a]), (m = m.concat(l))
      a = 0
      for (e = m.length; a < e; a++)
        (l = m[a]), c.push(l.x, l.y, 0), d.push(0, 0, 1), f.push(l.x, l.y)
      a = 0
      for (e = q.length; a < e; a++)
        (m = q[a]), b.push(m[0] + g, m[1] + g, m[2] + g), (k += 3)
    }
    G.call(this)
    this.type = 'ShapeBufferGeometry'
    this.parameters = { shapes: e, curveSegments: h }
    h = h || 12
    var b = [],
      c = [],
      d = [],
      f = [],
      g = 0,
      k = 0
    if (!1 === Array.isArray(e)) a(e)
    else
      for (var m = 0; m < e.length; m++)
        a(e[m]), this.addGroup(g, k, m), (g += k), (k = 0)
    this.setIndex(b)
    this.setAttribute('position', new F(c, 3))
    this.setAttribute('normal', new F(d, 3))
    this.setAttribute('uv', new F(f, 2))
  }
  function Ki(e, h) {
    h.shapes = []
    if (Array.isArray(e))
      for (var a = 0, b = e.length; a < b; a++) h.shapes.push(e[a].uuid)
    else h.shapes.push(e.uuid)
    return h
  }
  function kd(e, h) {
    G.call(this)
    this.type = 'EdgesGeometry'
    this.parameters = { thresholdAngle: h }
    var a = []
    h = Math.cos(N.DEG2RAD * (void 0 !== h ? h : 1))
    var b = [0, 0],
      c = {},
      d = ['a', 'b', 'c']
    if (e.isBufferGeometry) {
      var f = new P()
      f.fromBufferGeometry(e)
    } else f = e.clone()
    f.mergeVertices()
    f.computeFaceNormals()
    e = f.vertices
    f = f.faces
    for (var g = 0, k = f.length; g < k; g++)
      for (var m = f[g], n = 0; 3 > n; n++) {
        var p = m[d[n]]
        var l = m[d[(n + 1) % 3]]
        b[0] = Math.min(p, l)
        b[1] = Math.max(p, l)
        p = b[0] + ',' + b[1]
        void 0 === c[p]
          ? (c[p] = { index1: b[0], index2: b[1], face1: g, face2: void 0 })
          : (c[p].face2 = g)
      }
    for (p in c)
      if (
        ((b = c[p]),
        void 0 === b.face2 || f[b.face1].normal.dot(f[b.face2].normal) <= h)
      )
        (d = e[b.index1]),
          a.push(d.x, d.y, d.z),
          (d = e[b.index2]),
          a.push(d.x, d.y, d.z)
    this.setAttribute('position', new F(a, 3))
  }
  function rc(e, h, a, b, c, d, f, g) {
    P.call(this)
    this.type = 'CylinderGeometry'
    this.parameters = {
      radiusTop: e,
      radiusBottom: h,
      height: a,
      radialSegments: b,
      heightSegments: c,
      openEnded: d,
      thetaStart: f,
      thetaLength: g,
    }
    this.fromBufferGeometry(new yb(e, h, a, b, c, d, f, g))
    this.mergeVertices()
  }
  function yb(e, h, a, b, c, d, f, g) {
    function k(a) {
      var c,
        d = new z(),
        k = new q(),
        y = 0,
        u = !0 === a ? e : h,
        x = !0 === a ? 1 : -1
      var D = r
      for (c = 1; c <= b; c++)
        p.push(0, v * x, 0), l.push(0, x, 0), t.push(0.5, 0.5), r++
      var E = r
      for (c = 0; c <= b; c++) {
        var F = (c / b) * g + f,
          G = Math.cos(F)
        F = Math.sin(F)
        k.x = u * F
        k.y = v * x
        k.z = u * G
        p.push(k.x, k.y, k.z)
        l.push(0, x, 0)
        d.x = 0.5 * G + 0.5
        d.y = 0.5 * F * x + 0.5
        t.push(d.x, d.y)
        r++
      }
      for (c = 0; c < b; c++)
        (d = D + c),
          (k = E + c),
          !0 === a ? n.push(k, k + 1, d) : n.push(k + 1, k, d),
          (y += 3)
      m.addGroup(w, y, !0 === a ? 1 : 2)
      w += y
    }
    G.call(this)
    this.type = 'CylinderBufferGeometry'
    this.parameters = {
      radiusTop: e,
      radiusBottom: h,
      height: a,
      radialSegments: b,
      heightSegments: c,
      openEnded: d,
      thetaStart: f,
      thetaLength: g,
    }
    var m = this
    e = void 0 !== e ? e : 1
    h = void 0 !== h ? h : 1
    a = a || 1
    b = Math.floor(b) || 8
    c = Math.floor(c) || 1
    d = void 0 !== d ? d : !1
    f = void 0 !== f ? f : 0
    g = void 0 !== g ? g : 2 * Math.PI
    var n = [],
      p = [],
      l = [],
      t = [],
      r = 0,
      u = [],
      v = a / 2,
      w = 0
    ;(function () {
      var d,
        k,
        y = new q(),
        A = new q(),
        z = 0,
        D = (h - e) / a
      for (k = 0; k <= c; k++) {
        var E = [],
          F = k / c,
          H = F * (h - e) + e
        for (d = 0; d <= b; d++) {
          var G = d / b,
            I = G * g + f,
            K = Math.sin(I)
          I = Math.cos(I)
          A.x = H * K
          A.y = -F * a + v
          A.z = H * I
          p.push(A.x, A.y, A.z)
          y.set(K, D, I).normalize()
          l.push(y.x, y.y, y.z)
          t.push(G, 1 - F)
          E.push(r++)
        }
        u.push(E)
      }
      for (d = 0; d < b; d++)
        for (k = 0; k < c; k++)
          (y = u[k + 1][d]),
            (A = u[k + 1][d + 1]),
            (D = u[k][d + 1]),
            n.push(u[k][d], y, D),
            n.push(y, A, D),
            (z += 6)
      m.addGroup(w, z, 0)
      w += z
    })()
    !1 === d && (0 < e && k(!0), 0 < h && k(!1))
    this.setIndex(n)
    this.setAttribute('position', new F(p, 3))
    this.setAttribute('normal', new F(l, 3))
    this.setAttribute('uv', new F(t, 2))
  }
  function we(e, h, a, b, c, d, f) {
    rc.call(this, 0, e, h, a, b, c, d, f)
    this.type = 'ConeGeometry'
    this.parameters = {
      radius: e,
      height: h,
      radialSegments: a,
      heightSegments: b,
      openEnded: c,
      thetaStart: d,
      thetaLength: f,
    }
  }
  function xe(e, h, a, b, c, d, f) {
    yb.call(this, 0, e, h, a, b, c, d, f)
    this.type = 'ConeBufferGeometry'
    this.parameters = {
      radius: e,
      height: h,
      radialSegments: a,
      heightSegments: b,
      openEnded: c,
      thetaStart: d,
      thetaLength: f,
    }
  }
  function ye(e, h, a, b) {
    P.call(this)
    this.type = 'CircleGeometry'
    this.parameters = { radius: e, segments: h, thetaStart: a, thetaLength: b }
    this.fromBufferGeometry(new ld(e, h, a, b))
    this.mergeVertices()
  }
  function ld(e, h, a, b) {
    G.call(this)
    this.type = 'CircleBufferGeometry'
    this.parameters = { radius: e, segments: h, thetaStart: a, thetaLength: b }
    e = e || 1
    h = void 0 !== h ? Math.max(3, h) : 8
    a = void 0 !== a ? a : 0
    b = void 0 !== b ? b : 2 * Math.PI
    var c = [],
      d = [],
      f = [],
      g = [],
      k,
      m = new q(),
      n = new z()
    d.push(0, 0, 0)
    f.push(0, 0, 1)
    g.push(0.5, 0.5)
    var p = 0
    for (k = 3; p <= h; p++, k += 3) {
      var l = a + (p / h) * b
      m.x = e * Math.cos(l)
      m.y = e * Math.sin(l)
      d.push(m.x, m.y, m.z)
      f.push(0, 0, 1)
      n.x = (d[k] / e + 1) / 2
      n.y = (d[k + 1] / e + 1) / 2
      g.push(n.x, n.y)
    }
    for (k = 1; k <= h; k++) c.push(k, k + 1, 0)
    this.setIndex(c)
    this.setAttribute('position', new F(d, 3))
    this.setAttribute('normal', new F(f, 3))
    this.setAttribute('uv', new F(g, 2))
  }
  function sc(e) {
    R.call(this)
    this.type = 'ShadowMaterial'
    this.color = new D(0)
    this.transparent = !0
    this.setValues(e)
  }
  function md(e) {
    Aa.call(this, e)
    this.type = 'RawShaderMaterial'
  }
  function kb(e) {
    R.call(this)
    this.defines = { STANDARD: '' }
    this.type = 'MeshStandardMaterial'
    this.color = new D(16777215)
    this.metalness = this.roughness = 0.5
    this.lightMap = this.map = null
    this.lightMapIntensity = 1
    this.aoMap = null
    this.aoMapIntensity = 1
    this.emissive = new D(0)
    this.emissiveIntensity = 1
    this.bumpMap = this.emissiveMap = null
    this.bumpScale = 1
    this.normalMap = null
    this.normalMapType = 0
    this.normalScale = new z(1, 1)
    this.displacementMap = null
    this.displacementScale = 1
    this.displacementBias = 0
    this.envMap = this.alphaMap = this.metalnessMap = this.roughnessMap = null
    this.envMapIntensity = 1
    this.refractionRatio = 0.98
    this.wireframe = !1
    this.wireframeLinewidth = 1
    this.wireframeLinejoin = this.wireframeLinecap = 'round'
    this.morphNormals = this.morphTargets = this.skinning = !1
    this.setValues(e)
  }
  function tc(e) {
    kb.call(this)
    this.defines = { STANDARD: '', PHYSICAL: '' }
    this.type = 'MeshPhysicalMaterial'
    this.reflectivity = 0.5
    this.clearcoatRoughness = this.clearcoat = 0
    this.sheen = null
    this.clearcoatNormalScale = new z(1, 1)
    this.clearcoatNormalMap = null
    this.transparency = 0
    this.setValues(e)
  }
  function Wa(e) {
    R.call(this)
    this.type = 'MeshPhongMaterial'
    this.color = new D(16777215)
    this.specular = new D(1118481)
    this.shininess = 30
    this.lightMap = this.map = null
    this.lightMapIntensity = 1
    this.aoMap = null
    this.aoMapIntensity = 1
    this.emissive = new D(0)
    this.emissiveIntensity = 1
    this.bumpMap = this.emissiveMap = null
    this.bumpScale = 1
    this.normalMap = null
    this.normalMapType = 0
    this.normalScale = new z(1, 1)
    this.displacementMap = null
    this.displacementScale = 1
    this.displacementBias = 0
    this.envMap = this.alphaMap = this.specularMap = null
    this.combine = 0
    this.reflectivity = 1
    this.refractionRatio = 0.98
    this.wireframe = !1
    this.wireframeLinewidth = 1
    this.wireframeLinejoin = this.wireframeLinecap = 'round'
    this.morphNormals = this.morphTargets = this.skinning = !1
    this.setValues(e)
  }
  function uc(e) {
    Wa.call(this)
    this.defines = { TOON: '' }
    this.type = 'MeshToonMaterial'
    this.gradientMap = null
    this.setValues(e)
  }
  function vc(e) {
    R.call(this)
    this.type = 'MeshNormalMaterial'
    this.bumpMap = null
    this.bumpScale = 1
    this.normalMap = null
    this.normalMapType = 0
    this.normalScale = new z(1, 1)
    this.displacementMap = null
    this.displacementScale = 1
    this.displacementBias = 0
    this.wireframe = !1
    this.wireframeLinewidth = 1
    this.morphNormals = this.morphTargets = this.skinning = this.fog = !1
    this.setValues(e)
  }
  function wc(e) {
    R.call(this)
    this.type = 'MeshLambertMaterial'
    this.color = new D(16777215)
    this.lightMap = this.map = null
    this.lightMapIntensity = 1
    this.aoMap = null
    this.aoMapIntensity = 1
    this.emissive = new D(0)
    this.emissiveIntensity = 1
    this.envMap = this.alphaMap = this.specularMap = this.emissiveMap = null
    this.combine = 0
    this.reflectivity = 1
    this.refractionRatio = 0.98
    this.wireframe = !1
    this.wireframeLinewidth = 1
    this.wireframeLinejoin = this.wireframeLinecap = 'round'
    this.morphNormals = this.morphTargets = this.skinning = !1
    this.setValues(e)
  }
  function xc(e) {
    R.call(this)
    this.defines = { MATCAP: '' }
    this.type = 'MeshMatcapMaterial'
    this.color = new D(16777215)
    this.bumpMap = this.map = this.matcap = null
    this.bumpScale = 1
    this.normalMap = null
    this.normalMapType = 0
    this.normalScale = new z(1, 1)
    this.displacementMap = null
    this.displacementScale = 1
    this.displacementBias = 0
    this.alphaMap = null
    this.morphNormals = this.morphTargets = this.skinning = !1
    this.setValues(e)
  }
  function yc(e) {
    T.call(this)
    this.type = 'LineDashedMaterial'
    this.scale = 1
    this.dashSize = 3
    this.gapSize = 1
    this.setValues(e)
  }
  function La(e, h, a, b) {
    this.parameterPositions = e
    this._cachedIndex = 0
    this.resultBuffer = void 0 !== b ? b : new h.constructor(a)
    this.sampleValues = h
    this.valueSize = a
  }
  function jf(e, h, a, b) {
    La.call(this, e, h, a, b)
    this._offsetNext = this._weightNext = this._offsetPrev = this._weightPrev = -0
  }
  function ze(e, h, a, b) {
    La.call(this, e, h, a, b)
  }
  function kf(e, h, a, b) {
    La.call(this, e, h, a, b)
  }
  function ua(e, h, a, b) {
    if (void 0 === e)
      throw Error('THREE.KeyframeTrack: track name is undefined')
    if (void 0 === h || 0 === h.length)
      throw Error('THREE.KeyframeTrack: no keyframes in track named ' + e)
    this.name = e
    this.times = aa.convertArray(h, this.TimeBufferType)
    this.values = aa.convertArray(a, this.ValueBufferType)
    this.setInterpolation(b || this.DefaultInterpolation)
  }
  function lf(e, h, a) {
    ua.call(this, e, h, a)
  }
  function mf(e, h, a, b) {
    ua.call(this, e, h, a, b)
  }
  function nd(e, h, a, b) {
    ua.call(this, e, h, a, b)
  }
  function nf(e, h, a, b) {
    La.call(this, e, h, a, b)
  }
  function Ae(e, h, a, b) {
    ua.call(this, e, h, a, b)
  }
  function of(e, h, a, b) {
    ua.call(this, e, h, a, b)
  }
  function od(e, h, a, b) {
    ua.call(this, e, h, a, b)
  }
  function Pa(e, h, a) {
    this.name = e
    this.tracks = a
    this.duration = void 0 !== h ? h : -1
    this.uuid = N.generateUUID()
    0 > this.duration && this.resetDuration()
  }
  function nl(e) {
    switch (e.toLowerCase()) {
      case 'scalar':
      case 'double':
      case 'float':
      case 'number':
      case 'integer':
        return nd
      case 'vector':
      case 'vector2':
      case 'vector3':
      case 'vector4':
        return od
      case 'color':
        return mf
      case 'quaternion':
        return Ae
      case 'bool':
      case 'boolean':
        return lf
      case 'string':
        return of
    }
    throw Error('THREE.KeyframeTrack: Unsupported typeName: ' + e)
  }
  function ol(e) {
    if (void 0 === e.type)
      throw Error('THREE.KeyframeTrack: track type undefined, can not parse')
    var h = nl(e.type)
    if (void 0 === e.times) {
      var a = [],
        b = []
      aa.flattenJSON(e.keys, a, b, 'value')
      e.times = a
      e.values = b
    }
    return void 0 !== h.parse
      ? h.parse(e)
      : new h(e.name, e.times, e.values, e.interpolation)
  }
  function Og(e, h, a) {
    var b = this,
      c = !1,
      d = 0,
      f = 0,
      g = void 0,
      k = []
    this.onStart = void 0
    this.onLoad = e
    this.onProgress = h
    this.onError = a
    this.itemStart = function (a) {
      f++
      if (!1 === c && void 0 !== b.onStart) b.onStart(a, d, f)
      c = !0
    }
    this.itemEnd = function (a) {
      d++
      if (void 0 !== b.onProgress) b.onProgress(a, d, f)
      if (d === f && ((c = !1), void 0 !== b.onLoad)) b.onLoad()
    }
    this.itemError = function (a) {
      if (void 0 !== b.onError) b.onError(a)
    }
    this.resolveURL = function (a) {
      return g ? g(a) : a
    }
    this.setURLModifier = function (a) {
      g = a
      return this
    }
    this.addHandler = function (a, b) {
      k.push(a, b)
      return this
    }
    this.removeHandler = function (a) {
      a = k.indexOf(a)
      ;-1 !== a && k.splice(a, 2)
      return this
    }
    this.getHandler = function (a) {
      for (var b = 0, c = k.length; b < c; b += 2) {
        var d = k[b + 1]
        if (k[b].test(a)) return d
      }
      return null
    }
  }
  function X(e) {
    this.manager = void 0 !== e ? e : Li
    this.crossOrigin = 'anonymous'
    this.resourcePath = this.path = ''
  }
  function Qa(e) {
    X.call(this, e)
  }
  function Pg(e) {
    X.call(this, e)
  }
  function Qg(e) {
    X.call(this, e)
  }
  function pf(e) {
    X.call(this, e)
  }
  function pd(e) {
    X.call(this, e)
  }
  function qf(e) {
    X.call(this, e)
  }
  function rf(e) {
    X.call(this, e)
  }
  function M() {
    this.type = 'Curve'
    this.arcLengthDivisions = 200
  }
  function Ma(e, h, a, b, c, d, f, g) {
    M.call(this)
    this.type = 'EllipseCurve'
    this.aX = e || 0
    this.aY = h || 0
    this.xRadius = a || 1
    this.yRadius = b || 1
    this.aStartAngle = c || 0
    this.aEndAngle = d || 2 * Math.PI
    this.aClockwise = f || !1
    this.aRotation = g || 0
  }
  function qd(e, h, a, b, c, d) {
    Ma.call(this, e, h, a, a, b, c, d)
    this.type = 'ArcCurve'
  }
  function Rg() {
    var e = 0,
      h = 0,
      a = 0,
      b = 0
    return {
      initCatmullRom: function (c, d, f, g, k) {
        c = k * (f - c)
        g = k * (g - d)
        e = d
        h = c
        a = -3 * d + 3 * f - 2 * c - g
        b = 2 * d - 2 * f + c + g
      },
      initNonuniformCatmullRom: function (c, d, f, g, k, m, n) {
        c = ((d - c) / k - (f - c) / (k + m) + (f - d) / m) * m
        g = ((f - d) / m - (g - d) / (m + n) + (g - f) / n) * m
        e = d
        h = c
        a = -3 * d + 3 * f - 2 * c - g
        b = 2 * d - 2 * f + c + g
      },
      calc: function (c) {
        var d = c * c
        return e + h * c + a * d + b * d * c
      },
    }
  }
  function la(e, h, a, b) {
    M.call(this)
    this.type = 'CatmullRomCurve3'
    this.points = e || []
    this.closed = h || !1
    this.curveType = a || 'centripetal'
    this.tension = b || 0.5
  }
  function Mi(e, h, a, b, c) {
    h = 0.5 * (b - h)
    c = 0.5 * (c - a)
    var d = e * e
    return (
      (2 * a - 2 * b + h + c) * e * d +
      (-3 * a + 3 * b - 2 * h - c) * d +
      h * e +
      a
    )
  }
  function Be(e, h, a, b) {
    var c = 1 - e
    return c * c * h + 2 * (1 - e) * e * a + e * e * b
  }
  function Ce(e, h, a, b, c) {
    var d = 1 - e,
      f = 1 - e
    return (
      d * d * d * h +
      3 * f * f * e * a +
      3 * (1 - e) * e * e * b +
      e * e * e * c
    )
  }
  function Xa(e, h, a, b) {
    M.call(this)
    this.type = 'CubicBezierCurve'
    this.v0 = e || new z()
    this.v1 = h || new z()
    this.v2 = a || new z()
    this.v3 = b || new z()
  }
  function lb(e, h, a, b) {
    M.call(this)
    this.type = 'CubicBezierCurve3'
    this.v0 = e || new q()
    this.v1 = h || new q()
    this.v2 = a || new q()
    this.v3 = b || new q()
  }
  function Ga(e, h) {
    M.call(this)
    this.type = 'LineCurve'
    this.v1 = e || new z()
    this.v2 = h || new z()
  }
  function Ya(e, h) {
    M.call(this)
    this.type = 'LineCurve3'
    this.v1 = e || new q()
    this.v2 = h || new q()
  }
  function Za(e, h, a) {
    M.call(this)
    this.type = 'QuadraticBezierCurve'
    this.v0 = e || new z()
    this.v1 = h || new z()
    this.v2 = a || new z()
  }
  function mb(e, h, a) {
    M.call(this)
    this.type = 'QuadraticBezierCurve3'
    this.v0 = e || new q()
    this.v1 = h || new q()
    this.v2 = a || new q()
  }
  function $a(e) {
    M.call(this)
    this.type = 'SplineCurve'
    this.points = e || []
  }
  function zb() {
    M.call(this)
    this.type = 'CurvePath'
    this.curves = []
    this.autoClose = !1
  }
  function ab(e) {
    zb.call(this)
    this.type = 'Path'
    this.currentPoint = new z()
    e && this.setFromPoints(e)
  }
  function Pb(e) {
    ab.call(this, e)
    this.uuid = N.generateUUID()
    this.type = 'Shape'
    this.holes = []
  }
  function da(e, h) {
    E.call(this)
    this.type = 'Light'
    this.color = new D(e)
    this.intensity = void 0 !== h ? h : 1
    this.receiveShadow = void 0
  }
  function sf(e, h, a) {
    da.call(this, e, a)
    this.type = 'HemisphereLight'
    this.castShadow = void 0
    this.position.copy(E.DefaultUp)
    this.updateMatrix()
    this.groundColor = new D(h)
  }
  function nb(e) {
    this.camera = e
    this.bias = 0
    this.radius = 1
    this.mapSize = new z(512, 512)
    this.mapPass = this.map = null
    this.matrix = new I()
    this._frustum = new Sd()
    this._frameExtents = new z(1, 1)
    this._viewportCount = 1
    this._viewports = [new ca(0, 0, 1, 1)]
  }
  function tf() {
    nb.call(this, new na(50, 1, 0.5, 500))
  }
  function uf(e, h, a, b, c, d) {
    da.call(this, e, h)
    this.type = 'SpotLight'
    this.position.copy(E.DefaultUp)
    this.updateMatrix()
    this.target = new E()
    Object.defineProperty(this, 'power', {
      get: function () {
        return this.intensity * Math.PI
      },
      set: function (a) {
        this.intensity = a / Math.PI
      },
    })
    this.distance = void 0 !== a ? a : 0
    this.angle = void 0 !== b ? b : Math.PI / 3
    this.penumbra = void 0 !== c ? c : 0
    this.decay = void 0 !== d ? d : 1
    this.shadow = new tf()
  }
  function Sg() {
    nb.call(this, new na(90, 1, 0.5, 500))
    this._frameExtents = new z(4, 2)
    this._viewportCount = 6
    this._viewports = [
      new ca(2, 1, 1, 1),
      new ca(0, 1, 1, 1),
      new ca(3, 1, 1, 1),
      new ca(1, 1, 1, 1),
      new ca(3, 0, 1, 1),
      new ca(1, 0, 1, 1),
    ]
    this._cubeDirections = [
      new q(1, 0, 0),
      new q(-1, 0, 0),
      new q(0, 0, 1),
      new q(0, 0, -1),
      new q(0, 1, 0),
      new q(0, -1, 0),
    ]
    this._cubeUps = [
      new q(0, 1, 0),
      new q(0, 1, 0),
      new q(0, 1, 0),
      new q(0, 1, 0),
      new q(0, 0, 1),
      new q(0, 0, -1),
    ]
  }
  function vf(e, h, a, b) {
    da.call(this, e, h)
    this.type = 'PointLight'
    Object.defineProperty(this, 'power', {
      get: function () {
        return 4 * this.intensity * Math.PI
      },
      set: function (a) {
        this.intensity = a / (4 * Math.PI)
      },
    })
    this.distance = void 0 !== a ? a : 0
    this.decay = void 0 !== b ? b : 1
    this.shadow = new Sg()
  }
  function De(e, h, a, b, c, d) {
    hb.call(this)
    this.type = 'OrthographicCamera'
    this.zoom = 1
    this.view = null
    this.left = void 0 !== e ? e : -1
    this.right = void 0 !== h ? h : 1
    this.top = void 0 !== a ? a : 1
    this.bottom = void 0 !== b ? b : -1
    this.near = void 0 !== c ? c : 0.1
    this.far = void 0 !== d ? d : 2e3
    this.updateProjectionMatrix()
  }
  function wf() {
    nb.call(this, new De(-5, 5, 5, -5, 0.5, 500))
  }
  function xf(e, h) {
    da.call(this, e, h)
    this.type = 'DirectionalLight'
    this.position.copy(E.DefaultUp)
    this.updateMatrix()
    this.target = new E()
    this.shadow = new wf()
  }
  function yf(e, h) {
    da.call(this, e, h)
    this.type = 'AmbientLight'
    this.castShadow = void 0
  }
  function zf(e, h, a, b) {
    da.call(this, e, h)
    this.type = 'RectAreaLight'
    this.width = void 0 !== a ? a : 10
    this.height = void 0 !== b ? b : 10
  }
  function Af(e) {
    X.call(this, e)
    this.textures = {}
  }
  function Bf() {
    G.call(this)
    this.type = 'InstancedBufferGeometry'
    this.maxInstancedCount = void 0
  }
  function Cf(e, h, a, b) {
    'number' === typeof a &&
      ((b = a),
      (a = !1),
      console.error(
        'THREE.InstancedBufferAttribute: The constructor now expects normalized as the third argument.',
      ))
    O.call(this, e, h, a)
    this.meshPerAttribute = b || 1
  }
  function Df(e) {
    X.call(this, e)
  }
  function Ef(e) {
    X.call(this, e)
  }
  function Tg(e) {
    'undefined' === typeof createImageBitmap &&
      console.warn(
        'THREE.ImageBitmapLoader: createImageBitmap() not supported.',
      )
    'undefined' === typeof fetch &&
      console.warn('THREE.ImageBitmapLoader: fetch() not supported.')
    X.call(this, e)
    this.options = void 0
  }
  function Ug() {
    this.type = 'ShapePath'
    this.color = new D()
    this.subPaths = []
    this.currentPath = null
  }
  function Vg(e) {
    this.type = 'Font'
    this.data = e
  }
  function Wg(e) {
    X.call(this, e)
  }
  function Ff(e) {
    X.call(this, e)
  }
  function Gf() {
    this.coefficients = []
    for (var e = 0; 9 > e; e++) this.coefficients.push(new q())
  }
  function bb(e, h) {
    da.call(this, void 0, h)
    this.sh = void 0 !== e ? e : new Gf()
  }
  function Xg(e, h, a) {
    bb.call(this, void 0, a)
    e = new D().set(e)
    a = new D().set(h)
    h = new q(e.r, e.g, e.b)
    e = new q(a.r, a.g, a.b)
    a = Math.sqrt(Math.PI)
    var b = a * Math.sqrt(0.75)
    this.sh.coefficients[0].copy(h).add(e).multiplyScalar(a)
    this.sh.coefficients[1].copy(h).sub(e).multiplyScalar(b)
  }
  function Yg(e, h) {
    bb.call(this, void 0, h)
    e = new D().set(e)
    this.sh.coefficients[0]
      .set(e.r, e.g, e.b)
      .multiplyScalar(2 * Math.sqrt(Math.PI))
  }
  function Ni() {
    this.type = 'StereoCamera'
    this.aspect = 1
    this.eyeSep = 0.064
    this.cameraL = new na()
    this.cameraL.layers.enable(1)
    this.cameraL.matrixAutoUpdate = !1
    this.cameraR = new na()
    this.cameraR.layers.enable(2)
    this.cameraR.matrixAutoUpdate = !1
    this._cache = {
      focus: null,
      fov: null,
      aspect: null,
      near: null,
      far: null,
      zoom: null,
      eyeSep: null,
    }
  }
  function Zg(e) {
    this.autoStart = void 0 !== e ? e : !0
    this.elapsedTime = this.oldTime = this.startTime = 0
    this.running = !1
  }
  function $g() {
    E.call(this)
    this.type = 'AudioListener'
    this.context = ah.getContext()
    this.gain = this.context.createGain()
    this.gain.connect(this.context.destination)
    this.filter = null
    this.timeDelta = 0
    this._clock = new Zg()
  }
  function rd(e) {
    E.call(this)
    this.type = 'Audio'
    this.listener = e
    this.context = e.context
    this.gain = this.context.createGain()
    this.gain.connect(e.getInput())
    this.autoplay = !1
    this.buffer = null
    this.detune = 0
    this.loop = !1
    this.offset = this.loopEnd = this.loopStart = 0
    this.duration = void 0
    this.playbackRate = 1
    this.isPlaying = !1
    this.hasPlaybackControl = !0
    this.sourceType = 'empty'
    this._pausedAt = this._startedAt = 0
    this.filters = []
  }
  function bh(e) {
    rd.call(this, e)
    this.panner = this.context.createPanner()
    this.panner.panningModel = 'HRTF'
    this.panner.connect(this.gain)
  }
  function ch(e, h) {
    this.analyser = e.context.createAnalyser()
    this.analyser.fftSize = void 0 !== h ? h : 2048
    this.data = new Uint8Array(this.analyser.frequencyBinCount)
    e.getOutput().connect(this.analyser)
  }
  function dh(e, h, a) {
    this.binding = e
    this.valueSize = a
    e = Float64Array
    switch (h) {
      case 'quaternion':
        h = this._slerp
        break
      case 'string':
      case 'bool':
        e = Array
        h = this._select
        break
      default:
        h = this._lerp
    }
    this.buffer = new e(4 * a)
    this._mixBufferRegion = h
    this.referenceCount = this.useCount = this.cumulativeWeight = 0
  }
  function Oi(e, h, a) {
    a = a || ja.parseTrackName(h)
    this._targetGroup = e
    this._bindings = e.subscribe_(h, a)
  }
  function ja(e, h, a) {
    this.path = h
    this.parsedPath = a || ja.parseTrackName(h)
    this.node = ja.findNode(e, this.parsedPath.nodeName) || e
    this.rootNode = e
  }
  function Pi() {
    this.uuid = N.generateUUID()
    this._objects = Array.prototype.slice.call(arguments)
    this.nCachedObjects_ = 0
    var e = {}
    this._indicesByUUID = e
    for (var h = 0, a = arguments.length; h !== a; ++h) e[arguments[h].uuid] = h
    this._paths = []
    this._parsedPaths = []
    this._bindings = []
    this._bindingsIndicesByPath = {}
    var b = this
    this.stats = {
      objects: {
        get total() {
          return b._objects.length
        },
        get inUse() {
          return this.total - b.nCachedObjects_
        },
      },
      get bindingsPerObject() {
        return b._bindings.length
      },
    }
  }
  function Qi(e, h, a) {
    this._mixer = e
    this._clip = h
    this._localRoot = a || null
    e = h.tracks
    h = e.length
    a = Array(h)
    for (var b = { endingStart: 2400, endingEnd: 2400 }, c = 0; c !== h; ++c) {
      var d = e[c].createInterpolant(null)
      a[c] = d
      d.settings = b
    }
    this._interpolantSettings = b
    this._interpolants = a
    this._propertyBindings = Array(h)
    this._weightInterpolant = this._timeScaleInterpolant = this._byClipCacheIndex = this._cacheIndex = null
    this.loop = 2201
    this._loopCount = -1
    this._startTime = null
    this.time = 0
    this._effectiveWeight = this.weight = this._effectiveTimeScale = this.timeScale = 1
    this.repetitions = Infinity
    this.paused = !1
    this.enabled = !0
    this.clampWhenFinished = !1
    this.zeroSlopeAtEnd = this.zeroSlopeAtStart = !0
  }
  function eh(e) {
    this._root = e
    this._initMemoryManager()
    this.time = this._accuIndex = 0
    this.timeScale = 1
  }
  function Hf(e, h) {
    'string' === typeof e &&
      (console.warn('THREE.Uniform: Type parameter is no longer needed.'),
      (e = h))
    this.value = e
  }
  function fh(e, h, a) {
    wb.call(this, e, h)
    this.meshPerAttribute = a || 1
  }
  function Ri(e, h, a, b) {
    this.ray = new ac(e, h)
    this.near = a || 0
    this.far = b || Infinity
    this.camera = null
    this.params = {
      Mesh: {},
      Line: {},
      LOD: {},
      Points: { threshold: 1 },
      Sprite: {},
    }
    Object.defineProperties(this.params, {
      PointCloud: {
        get: function () {
          console.warn(
            'THREE.Raycaster: params.PointCloud has been renamed to params.Points.',
          )
          return this.Points
        },
      },
    })
  }
  function Si(e, h) {
    return e.distance - h.distance
  }
  function gh(e, h, a, b) {
    if (!1 !== e.visible && (e.raycast(h, a), !0 === b)) {
      e = e.children
      b = 0
      for (var c = e.length; b < c; b++) gh(e[b], h, a, !0)
    }
  }
  function Ti(e, h, a) {
    this.radius = void 0 !== e ? e : 1
    this.phi = void 0 !== h ? h : 0
    this.theta = void 0 !== a ? a : 0
    return this
  }
  function Ui(e, h, a) {
    this.radius = void 0 !== e ? e : 1
    this.theta = void 0 !== h ? h : 0
    this.y = void 0 !== a ? a : 0
    return this
  }
  function hh(e, h) {
    this.min = void 0 !== e ? e : new z(Infinity, Infinity)
    this.max = void 0 !== h ? h : new z(-Infinity, -Infinity)
  }
  function ih(e, h) {
    this.start = void 0 !== e ? e : new q()
    this.end = void 0 !== h ? h : new q()
  }
  function Ee(e) {
    E.call(this)
    this.material = e
    this.render = function () {}
  }
  function Fe(e, h, a, b) {
    this.object = e
    this.size = void 0 !== h ? h : 1
    e = void 0 !== a ? a : 16711680
    b = void 0 !== b ? b : 1
    h = 0
    ;(a = this.object.geometry) && a.isGeometry
      ? (h = 3 * a.faces.length)
      : a && a.isBufferGeometry && (h = a.attributes.normal.count)
    a = new G()
    h = new F(6 * h, 3)
    a.setAttribute('position', h)
    Z.call(this, a, new T({ color: e, linewidth: b }))
    this.matrixAutoUpdate = !1
    this.update()
  }
  function sd(e, h) {
    E.call(this)
    this.light = e
    this.light.updateMatrixWorld()
    this.matrix = e.matrixWorld
    this.matrixAutoUpdate = !1
    this.color = h
    e = new G()
    h = [
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1,
      0,
      1,
      0,
      0,
      0,
      -1,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      1,
      0,
      0,
      0,
      0,
      -1,
      1,
    ]
    for (var a = 0, b = 1; 32 > a; a++, b++) {
      var c = (a / 32) * Math.PI * 2,
        d = (b / 32) * Math.PI * 2
      h.push(Math.cos(c), Math.sin(c), 1, Math.cos(d), Math.sin(d), 1)
    }
    e.setAttribute('position', new F(h, 3))
    h = new T({ fog: !1 })
    this.cone = new Z(e, h)
    this.add(this.cone)
    this.update()
  }
  function Vi(e) {
    var h = []
    e && e.isBone && h.push(e)
    for (var a = 0; a < e.children.length; a++)
      h.push.apply(h, Vi(e.children[a]))
    return h
  }
  function td(e) {
    for (
      var h = Vi(e),
        a = new G(),
        b = [],
        c = [],
        d = new D(0, 0, 1),
        f = new D(0, 1, 0),
        g = 0;
      g < h.length;
      g++
    ) {
      var k = h[g]
      k.parent &&
        k.parent.isBone &&
        (b.push(0, 0, 0),
        b.push(0, 0, 0),
        c.push(d.r, d.g, d.b),
        c.push(f.r, f.g, f.b))
    }
    a.setAttribute('position', new F(b, 3))
    a.setAttribute('color', new F(c, 3))
    b = new T({
      vertexColors: 2,
      depthTest: !1,
      depthWrite: !1,
      transparent: !0,
    })
    Z.call(this, a, b)
    this.root = e
    this.bones = h
    this.matrix = e.matrixWorld
    this.matrixAutoUpdate = !1
  }
  function ud(e, h, a) {
    this.light = e
    this.light.updateMatrixWorld()
    this.color = a
    e = new Ob(h, 4, 2)
    h = new Ia({ wireframe: !0, fog: !1 })
    ia.call(this, e, h)
    this.matrix = this.light.matrixWorld
    this.matrixAutoUpdate = !1
    this.update()
  }
  function vd(e, h) {
    this.type = 'RectAreaLightHelper'
    this.light = e
    this.color = h
    e = new G()
    e.setAttribute(
      'position',
      new F([1, 1, 0, -1, 1, 0, -1, -1, 0, 1, -1, 0, 1, 1, 0], 3),
    )
    e.computeBoundingSphere()
    h = new T({ fog: !1 })
    pa.call(this, e, h)
    e = new G()
    e.setAttribute(
      'position',
      new F([1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0], 3),
    )
    e.computeBoundingSphere()
    this.add(new ia(e, new Ia({ side: 1, fog: !1 })))
    this.update()
  }
  function wd(e, h, a) {
    E.call(this)
    this.light = e
    this.light.updateMatrixWorld()
    this.matrix = e.matrixWorld
    this.matrixAutoUpdate = !1
    this.color = a
    e = new lc(h)
    e.rotateY(0.5 * Math.PI)
    this.material = new Ia({ wireframe: !0, fog: !1 })
    void 0 === this.color && (this.material.vertexColors = 2)
    h = e.getAttribute('position')
    h = new Float32Array(3 * h.count)
    e.setAttribute('color', new O(h, 3))
    this.add(new ia(e, this.material))
    this.update()
  }
  function xd(e, h) {
    this.lightProbe = e
    this.size = h
    e = new Aa({
      defines: { GAMMA_OUTPUT: '' },
      uniforms: {
        sh: { value: this.lightProbe.sh.coefficients },
        intensity: { value: this.lightProbe.intensity },
      },
      vertexShader:
        'varying vec3 vNormal;\nvoid main() {\n\tvNormal = normalize( normalMatrix * normal );\n\tgl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );\n}',
      fragmentShader:
        '#define RECIPROCAL_PI 0.318309886\nvec3 inverseTransformDirection( in vec3 normal, in mat4 matrix ) {\n\t// matrix is assumed to be orthogonal\n\treturn normalize( ( vec4( normal, 0.0 ) * matrix ).xyz );\n}\nvec3 linearToOutput( in vec3 a ) {\n\t#ifdef GAMMA_OUTPUT\n\t\treturn pow( a, vec3( 1.0 / float( GAMMA_FACTOR ) ) );\n\t#else\n\t\treturn a;\n\t#endif\n}\n// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\t// normal is assumed to have unit length\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\t// band 0\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\t// band 1\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\t// band 2\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nuniform vec3 sh[ 9 ]; // sh coefficients\nuniform float intensity; // light probe intensity\nvarying vec3 vNormal;\nvoid main() {\n\tvec3 normal = normalize( vNormal );\n\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, sh );\n\tvec3 outgoingLight = RECIPROCAL_PI * irradiance * intensity;\n\toutgoingLight = linearToOutput( outgoingLight );\n\tgl_FragColor = vec4( outgoingLight, 1.0 );\n}',
    })
    h = new Ob(1, 32, 16)
    ia.call(this, h, e)
    this.onBeforeRender()
  }
  function If(e, h, a, b) {
    e = e || 10
    h = h || 10
    a = new D(void 0 !== a ? a : 4473924)
    b = new D(void 0 !== b ? b : 8947848)
    var c = h / 2,
      d = e / h,
      f = e / 2
    e = []
    for (var g = [], k = 0, m = 0, n = -f; k <= h; k++, n += d) {
      e.push(-f, 0, n, f, 0, n)
      e.push(n, 0, -f, n, 0, f)
      var p = k === c ? a : b
      p.toArray(g, m)
      m += 3
      p.toArray(g, m)
      m += 3
      p.toArray(g, m)
      m += 3
      p.toArray(g, m)
      m += 3
    }
    h = new G()
    h.setAttribute('position', new F(e, 3))
    h.setAttribute('color', new F(g, 3))
    a = new T({ vertexColors: 2 })
    Z.call(this, h, a)
  }
  function Jf(e, h, a, b, c, d) {
    e = e || 10
    h = h || 16
    a = a || 8
    b = b || 64
    c = new D(void 0 !== c ? c : 4473924)
    d = new D(void 0 !== d ? d : 8947848)
    var f = [],
      g = [],
      k
    for (k = 0; k <= h; k++) {
      var m = (k / h) * 2 * Math.PI
      var n = Math.sin(m) * e
      m = Math.cos(m) * e
      f.push(0, 0, 0)
      f.push(n, 0, m)
      var p = k & 1 ? c : d
      g.push(p.r, p.g, p.b)
      g.push(p.r, p.g, p.b)
    }
    for (k = 0; k <= a; k++) {
      p = k & 1 ? c : d
      var l = e - (e / a) * k
      for (h = 0; h < b; h++)
        (m = (h / b) * 2 * Math.PI),
          (n = Math.sin(m) * l),
          (m = Math.cos(m) * l),
          f.push(n, 0, m),
          g.push(p.r, p.g, p.b),
          (m = ((h + 1) / b) * 2 * Math.PI),
          (n = Math.sin(m) * l),
          (m = Math.cos(m) * l),
          f.push(n, 0, m),
          g.push(p.r, p.g, p.b)
    }
    e = new G()
    e.setAttribute('position', new F(f, 3))
    e.setAttribute('color', new F(g, 3))
    f = new T({ vertexColors: 2 })
    Z.call(this, e, f)
  }
  function yd(e, h, a, b) {
    this.audio = e
    this.range = h || 1
    this.divisionsInnerAngle = a || 16
    this.divisionsOuterAngle = b || 2
    e = new G()
    h = new Float32Array(
      3 * (3 * (this.divisionsInnerAngle + 2 * this.divisionsOuterAngle) + 3),
    )
    e.setAttribute('position', new O(h, 3))
    h = new T({ color: 65280 })
    a = new T({ color: 16776960 })
    pa.call(this, e, [a, h])
    this.update()
  }
  function Ge(e, h, a, b) {
    this.object = e
    this.size = void 0 !== h ? h : 1
    e = void 0 !== a ? a : 16776960
    b = void 0 !== b ? b : 1
    h = 0
    ;(a = this.object.geometry) && a.isGeometry
      ? (h = a.faces.length)
      : console.warn(
          'THREE.FaceNormalsHelper: only THREE.Geometry is supported. Use THREE.VertexNormalsHelper, instead.',
        )
    a = new G()
    h = new F(6 * h, 3)
    a.setAttribute('position', h)
    Z.call(this, a, new T({ color: e, linewidth: b }))
    this.matrixAutoUpdate = !1
    this.update()
  }
  function zd(e, h, a) {
    E.call(this)
    this.light = e
    this.light.updateMatrixWorld()
    this.matrix = e.matrixWorld
    this.matrixAutoUpdate = !1
    this.color = a
    void 0 === h && (h = 1)
    e = new G()
    e.setAttribute(
      'position',
      new F([-h, h, 0, h, h, 0, h, -h, 0, -h, -h, 0, -h, h, 0], 3),
    )
    h = new T({ fog: !1 })
    this.lightPlane = new pa(e, h)
    this.add(this.lightPlane)
    e = new G()
    e.setAttribute('position', new F([0, 0, 0, 0, 0, 1], 3))
    this.targetLine = new pa(e, h)
    this.add(this.targetLine)
    this.update()
  }
  function He(e) {
    function h(b, c, d) {
      a(b, d)
      a(c, d)
    }
    function a(a, b) {
      d.push(0, 0, 0)
      f.push(b.r, b.g, b.b)
      void 0 === g[a] && (g[a] = [])
      g[a].push(d.length / 3 - 1)
    }
    var b = new G(),
      c = new T({ color: 16777215, vertexColors: 1 }),
      d = [],
      f = [],
      g = {},
      k = new D(16755200),
      m = new D(16711680),
      n = new D(43775),
      p = new D(16777215),
      l = new D(3355443)
    h('n1', 'n2', k)
    h('n2', 'n4', k)
    h('n4', 'n3', k)
    h('n3', 'n1', k)
    h('f1', 'f2', k)
    h('f2', 'f4', k)
    h('f4', 'f3', k)
    h('f3', 'f1', k)
    h('n1', 'f1', k)
    h('n2', 'f2', k)
    h('n3', 'f3', k)
    h('n4', 'f4', k)
    h('p', 'n1', m)
    h('p', 'n2', m)
    h('p', 'n3', m)
    h('p', 'n4', m)
    h('u1', 'u2', n)
    h('u2', 'u3', n)
    h('u3', 'u1', n)
    h('c', 't', p)
    h('p', 'c', l)
    h('cn1', 'cn2', l)
    h('cn3', 'cn4', l)
    h('cf1', 'cf2', l)
    h('cf3', 'cf4', l)
    b.setAttribute('position', new F(d, 3))
    b.setAttribute('color', new F(f, 3))
    Z.call(this, b, c)
    this.camera = e
    this.camera.updateProjectionMatrix && this.camera.updateProjectionMatrix()
    this.matrix = e.matrixWorld
    this.matrixAutoUpdate = !1
    this.pointMap = g
    this.update()
  }
  function qa(e, h, a, b, c, d, f) {
    Kf.set(c, d, f).unproject(b)
    e = h[e]
    if (void 0 !== e)
      for (a = a.getAttribute('position'), h = 0, b = e.length; h < b; h++)
        a.setXYZ(e[h], Kf.x, Kf.y, Kf.z)
  }
  function Ab(e, h) {
    this.object = e
    void 0 === h && (h = 16776960)
    e = new Uint16Array([
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      0,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      4,
      0,
      4,
      1,
      5,
      2,
      6,
      3,
      7,
    ])
    var a = new Float32Array(24),
      b = new G()
    b.setIndex(new O(e, 1))
    b.setAttribute('position', new O(a, 3))
    Z.call(this, b, new T({ color: h }))
    this.matrixAutoUpdate = !1
    this.update()
  }
  function Ie(e, h) {
    this.type = 'Box3Helper'
    this.box = e
    h = h || 16776960
    e = new Uint16Array([
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      0,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      4,
      0,
      4,
      1,
      5,
      2,
      6,
      3,
      7,
    ])
    var a = new G()
    a.setIndex(new O(e, 1))
    a.setAttribute(
      'position',
      new F(
        [
          1,
          1,
          1,
          -1,
          1,
          1,
          -1,
          -1,
          1,
          1,
          -1,
          1,
          1,
          1,
          -1,
          -1,
          1,
          -1,
          -1,
          -1,
          -1,
          1,
          -1,
          -1,
        ],
        3,
      ),
    )
    Z.call(this, a, new T({ color: h }))
    this.geometry.computeBoundingSphere()
  }
  function Je(e, h, a) {
    this.type = 'PlaneHelper'
    this.plane = e
    this.size = void 0 === h ? 1 : h
    e = void 0 !== a ? a : 16776960
    h = new G()
    h.setAttribute(
      'position',
      new F(
        [
          1,
          -1,
          1,
          -1,
          1,
          1,
          -1,
          -1,
          1,
          1,
          1,
          1,
          -1,
          1,
          1,
          -1,
          -1,
          1,
          1,
          -1,
          1,
          1,
          1,
          1,
          0,
          0,
          1,
          0,
          0,
          0,
        ],
        3,
      ),
    )
    h.computeBoundingSphere()
    pa.call(this, h, new T({ color: e }))
    h = new G()
    h.setAttribute(
      'position',
      new F([1, 1, 1, -1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1, 1, 1, -1, 1], 3),
    )
    h.computeBoundingSphere()
    this.add(
      new ia(
        h,
        new Ia({ color: e, opacity: 0.2, transparent: !0, depthWrite: !1 }),
      ),
    )
  }
  function Bb(e, h, a, b, c, d) {
    E.call(this)
    void 0 === e && (e = new q(0, 0, 1))
    void 0 === h && (h = new q(0, 0, 0))
    void 0 === a && (a = 1)
    void 0 === b && (b = 16776960)
    void 0 === c && (c = 0.2 * a)
    void 0 === d && (d = 0.2 * c)
    void 0 === Lf &&
      ((Lf = new G()),
      Lf.setAttribute('position', new F([0, 0, 0, 0, 1, 0], 3)),
      (jh = new yb(0, 0.5, 1, 5, 1)),
      jh.translate(0, -0.5, 0))
    this.position.copy(h)
    this.line = new pa(Lf, new T({ color: b }))
    this.line.matrixAutoUpdate = !1
    this.add(this.line)
    this.cone = new ia(jh, new Ia({ color: b }))
    this.cone.matrixAutoUpdate = !1
    this.add(this.cone)
    this.setDirection(e)
    this.setLength(a, c, d)
  }
  function Ke(e) {
    e = e || 1
    var h = [0, 0, 0, e, 0, 0, 0, 0, 0, 0, e, 0, 0, 0, 0, 0, 0, e]
    e = new G()
    e.setAttribute('position', new F(h, 3))
    e.setAttribute(
      'color',
      new F([1, 0, 0, 1, 0.6, 0, 0, 1, 0, 0.6, 1, 0, 0, 0, 1, 0, 0.6, 1], 3),
    )
    h = new T({ vertexColors: 2 })
    Z.call(this, e, h)
  }
  function Wi(e) {
    console.warn(
      'THREE.ClosedSplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.',
    )
    la.call(this, e)
    this.type = 'catmullrom'
    this.closed = !0
  }
  function Xi(e) {
    console.warn(
      'THREE.SplineCurve3 has been deprecated. Use THREE.CatmullRomCurve3 instead.',
    )
    la.call(this, e)
    this.type = 'catmullrom'
  }
  function kh(e) {
    console.warn(
      'THREE.Spline has been removed. Use THREE.CatmullRomCurve3 instead.',
    )
    la.call(this, e)
    this.type = 'catmullrom'
  }
  if (wx.getPerformance) {
    var pl = wx.getSystemInfoSync().platform,
      Mf = wx.getPerformance(),
      ql = Mf.now(),
      rl = Object.assign({}, Mf, {
        now: function () {
          return (Mf.now() - ql) / 1e3
        },
      })
    var sl = 'devtools' === pl ? Mf : rl
  }
  var tl = sl,
    lh = wx.getSystemInfoSync(),
    Yi = lh.screenWidth,
    Zi = lh.screenHeight,
    ul = lh.devicePixelRatio,
    Kc = Yi,
    Lc = Zi,
    vl = {
      width: Yi,
      height: Zi,
      availWidth: Kc,
      availHeight: Lc,
      availLeft: 0,
      availTop: 0,
    },
    Le = new WeakMap(),
    mh = (function () {
      function e() {
        fb(this, e)
        Le.set(this, {})
      }
      Ve(e, [
        {
          key: 'addEventListener',
          value: function (e, a) {
            var b =
                2 < arguments.length && void 0 !== arguments[2]
                  ? arguments[2]
                  : {},
              c = Le.get(this)
            c || ((c = {}), Le.set(this, c))
            c[e] || (c[e] = [])
            c[e].push(a)
            b.capture &&
              console.warn(
                'EventTarget.addEventListener: options.capture is not implemented.',
              )
            b.once &&
              console.warn(
                'EventTarget.addEventListener: options.once is not implemented.',
              )
            b.passive &&
              console.warn(
                'EventTarget.addEventListener: options.passive is not implemented.',
              )
          },
        },
        {
          key: 'removeEventListener',
          value: function (e, a) {
            var b = Le.get(this)
            if (b && (e = b[e]) && 0 < e.length)
              for (b = e.length; b--; 0 < b)
                if (e[b] === a) {
                  e.splice(b, 1)
                  break
                }
          },
        },
        {
          key: 'dispatchEvent',
          value: function () {
            var e =
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : {},
              a = Le.get(this)[e.type]
            if (a) for (var b = 0; b < a.length; b++) a[b](e)
          },
        },
      ])
      return e
    })(),
    $i = (function (e) {
      function h() {
        fb(this, h)
        var a = Xb(this, sb(h).call(this))
        a.className = ''
        a.children = []
        return a
      }
      Wb(h, e)
      Ve(h, [
        {
          key: 'setAttribute',
          value: function (a, b) {
            this[a] = b
          },
        },
        {
          key: 'getAttribute',
          value: function (a) {
            return this[a]
          },
        },
        {
          key: 'setAttributeNS',
          value: function (a, b) {
            this[a] = b
          },
        },
        {
          key: 'getAttributeNS',
          value: function (a) {
            return this[a]
          },
        },
      ])
      return h
    })(
      (function (e) {
        function h() {
          fb(this, h)
          var a = Xb(this, sb(h).call(this))
          a.childNodes = []
          return a
        }
        Wb(h, e)
        Ve(h, [
          {
            key: 'appendChild',
            value: function (a) {
              this.childNodes.push(a)
              if (a instanceof h) this.childNodes.push(a)
              else
                throw new TypeError(
                  "Failed to executed 'appendChild' on 'Node': parameter 1 is not of type 'Node'.",
                )
            },
          },
          {
            key: 'cloneNode',
            value: function () {
              var a = Object.create(this)
              Object.assign(a, this)
              return a
            },
          },
          {
            key: 'removeChild',
            value: function (a) {
              var b = this.childNodes.findIndex(function (b) {
                return b === a
              })
              return -1 < b ? this.childNodes.splice(b, 1) : null
            },
          },
        ])
        return h
      })(mh),
    ),
    zc = (function (e) {
      function h() {
        var a =
            0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : '',
          b = 1 < arguments.length ? arguments[1] : void 0
        fb(this, h)
        var c = Xb(this, sb(h).call(this))
        c.className = ''
        c.children = []
        c.focus = fa
        c.blur = fa
        c.insertBefore = fa
        c.appendChild = fa
        c.removeChild = fa
        c.remove = fa
        c.innerHTML = ''
        c.tagName = a.toUpperCase()
        Ph(tb(c), b)
        a = tb(c)
        a.style = a.style || {}
        Object.assign(a.style, {
          top: '0px',
          left: '0px',
          width: Kc + 'px',
          height: Lc + 'px',
          margin: '0px',
          padding: '0px',
        })
        Qh(tb(c))
        Nj(tb(c))
        a = tb(c)
        'offsetLeft' in a || ((a.offsetLeft = 0), (a.offsetTop = 0))
        'offsetWidth' in a || ((a.offsetWidth = Kc), (a.offsetHeight = Lc))
        a = tb(c)
        'scrollLeft' in a || ((a.scrollLeft = 0), (a.scrollTop = 0))
        'scrollWidth' in a || ((a.scrollWidth = Kc), (a.scrollHeight = Lc))
        return c
      }
      Wb(h, e)
      return h
    })($i),
    ra = null,
    ma = new Map(),
    nh = {
      0: 'animation-delay',
      1: 'animation-direction',
      2: 'animation-duration',
      3: 'animation-fill-mode',
      4: 'animation-iteration-count',
      5: 'animation-name',
      6: 'animation-play-state',
      7: 'animation-timing-function',
      8: 'background-attachment',
      9: 'background-blend-mode',
      10: 'background-clip',
      11: 'background-color',
      12: 'background-image',
      13: 'background-origin',
      14: 'background-position',
      15: 'background-repeat',
      16: 'background-size',
      17: 'border-bottom-color',
      18: 'border-bottom-left-radius',
      19: 'border-bottom-right-radius',
      20: 'border-bottom-style',
      21: 'border-bottom-width',
      22: 'border-collapse',
      23: 'border-image-outset',
      24: 'border-image-repeat',
      25: 'border-image-slice',
      26: 'border-image-source',
      27: 'border-image-width',
      28: 'border-left-color',
      29: 'border-left-style',
      30: 'border-left-width',
      31: 'border-right-color',
      32: 'border-right-style',
      33: 'border-right-width',
      34: 'border-top-color',
      35: 'border-top-left-radius',
      36: 'border-top-right-radius',
      37: 'border-top-style',
      38: 'border-top-width',
      39: 'bottom',
      40: 'box-shadow',
      41: 'box-sizing',
      42: 'break-after',
      43: 'break-before',
      44: 'break-inside',
      45: 'caption-side',
      46: 'clear',
      47: 'clip',
      48: 'color',
      49: 'content',
      50: 'cursor',
      51: 'direction',
      52: 'display',
      53: 'empty-cells',
      54: 'float',
      55: 'font-family',
      56: 'font-kerning',
      57: 'font-size',
      58: 'font-stretch',
      59: 'font-style',
      60: 'font-variant',
      61: 'font-variant-ligatures',
      62: 'font-variant-caps',
      63: 'font-variant-numeric',
      64: 'font-variant-east-asian',
      65: 'font-weight',
      66: 'height',
      67: 'image-rendering',
      68: 'isolation',
      69: 'justify-items',
      70: 'justify-self',
      71: 'left',
      72: 'letter-spacing',
      73: 'line-height',
      74: 'list-style-image',
      75: 'list-style-position',
      76: 'list-style-type',
      77: 'margin-bottom',
      78: 'margin-left',
      79: 'margin-right',
      80: 'margin-top',
      81: 'max-height',
      82: 'max-width',
      83: 'min-height',
      84: 'min-width',
      85: 'mix-blend-mode',
      86: 'object-fit',
      87: 'object-position',
      88: 'offset-distance',
      89: 'offset-path',
      90: 'offset-rotate',
      91: 'opacity',
      92: 'orphans',
      93: 'outline-color',
      94: 'outline-offset',
      95: 'outline-style',
      96: 'outline-width',
      97: 'overflow-anchor',
      98: 'overflow-wrap',
      99: 'overflow-x',
      100: 'overflow-y',
      101: 'padding-bottom',
      102: 'padding-left',
      103: 'padding-right',
      104: 'padding-top',
      105: 'pointer-events',
      106: 'position',
      107: 'resize',
      108: 'right',
      109: 'scroll-behavior',
      110: 'speak',
      111: 'table-layout',
      112: 'tab-size',
      113: 'text-align',
      114: 'text-align-last',
      115: 'text-decoration',
      116: 'text-decoration-line',
      117: 'text-decoration-style',
      118: 'text-decoration-color',
      119: 'text-decoration-skip-ink',
      120: 'text-underline-position',
      121: 'text-indent',
      122: 'text-rendering',
      123: 'text-shadow',
      124: 'text-size-adjust',
      125: 'text-overflow',
      126: 'text-transform',
      127: 'top',
      128: 'touch-action',
      129: 'transition-delay',
      130: 'transition-duration',
      131: 'transition-property',
      132: 'transition-timing-function',
      133: 'unicode-bidi',
      134: 'vertical-align',
      135: 'visibility',
      136: 'white-space',
      137: 'widows',
      138: 'width',
      139: 'will-change',
      140: 'word-break',
      141: 'word-spacing',
      142: 'word-wrap',
      143: 'z-index',
      144: 'zoom',
      145: '-webkit-appearance',
      146: 'backface-visibility',
      147: '-webkit-border-horizontal-spacing',
      148: '-webkit-border-image',
      149: '-webkit-border-vertical-spacing',
      150: '-webkit-box-align',
      151: '-webkit-box-decoration-break',
      152: '-webkit-box-direction',
      153: '-webkit-box-flex',
      154: '-webkit-box-flex-group',
      155: '-webkit-box-lines',
      156: '-webkit-box-ordinal-group',
      157: '-webkit-box-orient',
      158: '-webkit-box-pack',
      159: '-webkit-box-reflect',
      160: 'column-count',
      161: 'column-gap',
      162: 'column-rule-color',
      163: 'column-rule-style',
      164: 'column-rule-width',
      165: 'column-span',
      166: 'column-width',
      167: 'align-content',
      168: 'align-items',
      169: 'align-self',
      170: 'flex-basis',
      171: 'flex-grow',
      172: 'flex-shrink',
      173: 'flex-direction',
      174: 'flex-wrap',
      175: 'justify-content',
      176: '-webkit-font-smoothing',
      177: 'grid-auto-columns',
      178: 'grid-auto-flow',
      179: 'grid-auto-rows',
      180: 'grid-column-end',
      181: 'grid-column-start',
      182: 'grid-template-areas',
      183: 'grid-template-columns',
      184: 'grid-template-rows',
      185: 'grid-row-end',
      186: 'grid-row-start',
      187: 'grid-column-gap',
      188: 'grid-row-gap',
      189: '-webkit-highlight',
      190: 'hyphens',
      191: '-webkit-hyphenate-character',
      192: '-webkit-line-break',
      193: '-webkit-line-clamp',
      194: '-webkit-locale',
      195: '-webkit-margin-before-collapse',
      196: '-webkit-margin-after-collapse',
      197: '-webkit-mask-box-image',
      198: '-webkit-mask-box-image-outset',
      199: '-webkit-mask-box-image-repeat',
      200: '-webkit-mask-box-image-slice',
      201: '-webkit-mask-box-image-source',
      202: '-webkit-mask-box-image-width',
      203: '-webkit-mask-clip',
      204: '-webkit-mask-composite',
      205: '-webkit-mask-image',
      206: '-webkit-mask-origin',
      207: '-webkit-mask-position',
      208: '-webkit-mask-repeat',
      209: '-webkit-mask-size',
      210: 'order',
      211: 'perspective',
      212: 'perspective-origin',
      213: '-webkit-print-color-adjust',
      214: '-webkit-rtl-ordering',
      215: 'shape-outside',
      216: 'shape-image-threshold',
      217: 'shape-margin',
      218: '-webkit-tap-highlight-color',
      219: '-webkit-text-combine',
      220: '-webkit-text-decorations-in-effect',
      221: '-webkit-text-emphasis-color',
      222: '-webkit-text-emphasis-position',
      223: '-webkit-text-emphasis-style',
      224: '-webkit-text-fill-color',
      225: '-webkit-text-orientation',
      226: '-webkit-text-security',
      227: '-webkit-text-stroke-color',
      228: '-webkit-text-stroke-width',
      229: 'transform',
      230: 'transform-origin',
      231: 'transform-style',
      232: '-webkit-user-drag',
      233: '-webkit-user-modify',
      234: 'user-select',
      235: '-webkit-writing-mode',
      236: '-webkit-app-region',
      237: 'buffered-rendering',
      238: 'clip-path',
      239: 'clip-rule',
      240: 'mask',
      241: 'filter',
      242: 'flood-color',
      243: 'flood-opacity',
      244: 'lighting-color',
      245: 'stop-color',
      246: 'stop-opacity',
      247: 'color-interpolation',
      248: 'color-interpolation-filters',
      249: 'color-rendering',
      250: 'fill',
      251: 'fill-opacity',
      252: 'fill-rule',
      253: 'marker-end',
      254: 'marker-mid',
      255: 'marker-start',
      256: 'mask-type',
      257: 'shape-rendering',
      258: 'stroke',
      259: 'stroke-dasharray',
      260: 'stroke-dashoffset',
      261: 'stroke-linecap',
      262: 'stroke-linejoin',
      263: 'stroke-miterlimit',
      264: 'stroke-opacity',
      265: 'stroke-width',
      266: 'alignment-baseline',
      267: 'baseline-shift',
      268: 'dominant-baseline',
      269: 'text-anchor',
      270: 'writing-mode',
      271: 'vector-effect',
      272: 'paint-order',
      273: 'd',
      274: 'cx',
      275: 'cy',
      276: 'x',
      277: 'y',
      278: 'r',
      279: 'rx',
      280: 'ry',
      281: 'caret-color',
      282: 'line-break',
      display: 'inline',
      dominantBaseline: 'auto',
      emptyCells: 'show',
      fill: 'rgb(0, 0, 0)',
      fillOpacity: '1',
      fillRule: 'nonzero',
      filter: 'none',
      flex: '0 1 auto',
      flexBasis: 'auto',
      flexDirection: 'row',
      flexFlow: 'row nowrap',
      flexGrow: '0',
      flexShrink: '1',
      flexWrap: 'nowrap',
      float: 'none',
      floodColor: 'rgb(0, 0, 0)',
      floodOpacity: '1',
      font: 'normal normal 400 normal 16px / normal "PingFang SC"',
      fontDisplay: '',
      fontFamily: '"PingFang SC"',
      fontFeatureSettings: 'normal',
      fontKerning: 'auto',
      fontSize: '16px',
      fontStretch: '100%',
      fontStyle: 'normal',
      fontVariant: 'normal',
      fontVariantCaps: 'normal',
      fontVariantEastAsian: 'normal',
      fontVariantLigatures: 'normal',
      fontVariantNumeric: 'normal',
      fontVariationSettings: 'normal',
      fontWeight: '400',
      grid: 'none / none / none / row / auto / auto',
      gridArea: 'auto / auto / auto / auto',
      gridAutoColumns: 'auto',
      gridAutoFlow: 'row',
      gridAutoRows: 'auto',
      gridColumn: 'auto / auto',
      gridColumnEnd: 'auto',
      gridColumnGap: '0px',
      gridColumnStart: 'auto',
      gridGap: '0px 0px',
      gridRow: 'auto / auto',
      gridRowEnd: 'auto',
      gridRowGap: '0px',
      gridRowStart: 'auto',
      gridTemplate: 'none / none / none',
      gridTemplateAreas: 'none',
      gridTemplateColumns: 'none',
      gridTemplateRows: 'none',
      height: '0px',
      hyphens: 'manual',
      imageRendering: 'auto',
      inlineSize: '0px',
      isolation: 'auto',
      justifyContent: 'normal',
      justifyItems: 'normal',
      justifySelf: 'auto',
      left: 'auto',
      letterSpacing: 'normal',
      lightingColor: 'rgb(255, 255, 255)',
      lineBreak: 'auto',
      lineHeight: 'normal',
      listStyle: 'disc outside none',
      listStyleImage: 'none',
      listStylePosition: 'outside',
      listStyleType: 'disc',
      margin: '0px',
      marginBottom: '0px',
      marginLeft: '0px',
      marginRight: '0px',
      marginTop: '0px',
      marker: '',
      markerEnd: 'none',
      markerMid: 'none',
      markerStart: 'none',
      mask: 'none',
      maskType: 'luminance',
      maxBlockSize: 'none',
      maxHeight: 'none',
      maxInlineSize: 'none',
      maxWidth: 'none',
      maxZoom: '',
      minBlockSize: '0px',
      minHeight: '0px',
      minInlineSize: '0px',
      minWidth: '0px',
      minZoom: '',
      mixBlendMode: 'normal',
      objectFit: 'fill',
      objectPosition: '50% 50%',
      offset: 'none 0px auto 0deg',
      offsetDistance: '0px',
      offsetPath: 'none',
      offsetRotate: 'auto 0deg',
      opacity: '1',
      order: '0',
      orientation: '',
      orphans: '2',
      outline: 'rgb(0, 0, 0) none 0px',
      outlineColor: 'rgb(0, 0, 0)',
      outlineOffset: '0px',
      outlineStyle: 'none',
      outlineWidth: '0px',
      overflow: 'visible',
      overflowAnchor: 'auto',
      overflowWrap: 'normal',
      overflowX: 'visible',
      overflowY: 'visible',
      overscrollBehavior: 'auto auto',
      overscrollBehaviorX: 'auto',
      overscrollBehaviorY: 'auto',
      padding: '0px',
      paddingBottom: '0px',
      paddingLeft: '0px',
      paddingRight: '0px',
      paddingTop: '0px',
      page: '',
      pageBreakAfter: 'auto',
      pageBreakBefore: 'auto',
      pageBreakInside: 'auto',
      paintOrder: 'fill stroke markers',
      perspective: 'none',
      perspectiveOrigin: '0px 0px',
      placeContent: 'normal normal',
      placeItems: 'normal normal',
      placeSelf: 'auto auto',
      pointerEvents: 'auto',
      position: 'static',
      quotes: '',
      r: '0px',
      resize: 'none',
      right: 'auto',
      rx: 'auto',
      ry: 'auto',
      scrollBehavior: 'auto',
      shapeImageThreshold: '0',
      shapeMargin: '0px',
      shapeOutside: 'none',
      shapeRendering: 'auto',
      size: '',
      speak: 'normal',
      src: '',
      stopColor: 'rgb(0, 0, 0)',
      stopOpacity: '1',
      stroke: 'none',
      strokeDasharray: 'none',
      strokeDashoffset: '0px',
      strokeLinecap: 'butt',
      strokeLinejoin: 'miter',
      strokeMiterlimit: '4',
      strokeOpacity: '1',
      strokeWidth: '1px',
      tabSize: '8',
      tableLayout: 'auto',
      textAlign: 'start',
      textAlignLast: 'auto',
      textAnchor: 'start',
      textCombineUpright: 'none',
      textDecoration: 'none solid rgb(0, 0, 0)',
      textDecorationColor: 'rgb(0, 0, 0)',
      textDecorationLine: 'none',
      textDecorationSkipInk: 'auto',
      textDecorationStyle: 'solid',
      textIndent: '0px',
      textOrientation: 'mixed',
      textOverflow: 'clip',
      textRendering: 'auto',
      textShadow: 'none',
      textSizeAdjust: 'auto',
      textTransform: 'none',
      textUnderlinePosition: 'auto',
      top: 'auto',
      touchAction: 'auto',
      transform: 'none',
      transformBox: 'view-box',
      transformOrigin: '0px 0px',
      transformStyle: 'flat',
      transition: 'all 0s ease 0s',
      transitionDelay: '0s',
      transitionDuration: '0s',
      transitionProperty: 'all',
      transitionTimingFunction: 'ease',
      unicodeBidi: 'normal',
      unicodeRange: '',
      userSelect: 'auto',
      userZoom: '',
      vectorEffect: 'none',
      verticalAlign: 'baseline',
      visibility: 'visible',
      webkitAppRegion: 'no-drag',
      webkitAppearance: 'none',
      webkitBorderAfter: '0px none rgb(0, 0, 0)',
      webkitBorderAfterColor: 'rgb(0, 0, 0)',
      webkitBorderAfterStyle: 'none',
      webkitBorderAfterWidth: '0px',
      webkitBorderBefore: '0px none rgb(0, 0, 0)',
      webkitBorderBeforeColor: 'rgb(0, 0, 0)',
      webkitBorderBeforeStyle: 'none',
      webkitBorderBeforeWidth: '0px',
      webkitBorderEnd: '0px none rgb(0, 0, 0)',
      webkitBorderEndColor: 'rgb(0, 0, 0)',
      webkitBorderEndStyle: 'none',
      webkitBorderEndWidth: '0px',
      webkitBorderHorizontalSpacing: '0px',
      webkitBorderImage: 'none',
      webkitBorderStart: '0px none rgb(0, 0, 0)',
      webkitBorderStartColor: 'rgb(0, 0, 0)',
      webkitBorderStartStyle: 'none',
      webkitBorderStartWidth: '0px',
      webkitBorderVerticalSpacing: '0px',
      webkitBoxAlign: 'stretch',
      webkitBoxDecorationBreak: 'slice',
      webkitBoxDirection: 'normal',
      webkitBoxFlex: '0',
      webkitBoxFlexGroup: '1',
      webkitBoxLines: 'single',
      webkitBoxOrdinalGroup: '1',
      webkitBoxOrient: 'horizontal',
      webkitBoxPack: 'start',
      webkitBoxReflect: 'none',
      webkitColumnBreakAfter: 'auto',
      webkitColumnBreakBefore: 'auto',
      webkitColumnBreakInside: 'auto',
      webkitFontSizeDelta: '',
      webkitFontSmoothing: 'auto',
      webkitHighlight: 'none',
      webkitHyphenateCharacter: 'auto',
      webkitLineBreak: 'auto',
      webkitLineClamp: 'none',
      webkitLocale: 'auto',
      webkitLogicalHeight: '0px',
      webkitLogicalWidth: '0px',
      webkitMarginAfter: '0px',
      webkitMarginAfterCollapse: 'collapse',
      webkitMarginBefore: '0px',
      webkitMarginBeforeCollapse: 'collapse',
      webkitMarginBottomCollapse: 'collapse',
      webkitMarginCollapse: '',
      webkitMarginEnd: '0px',
      webkitMarginStart: '0px',
      webkitMarginTopCollapse: 'collapse',
      webkitMask: '',
      webkitMaskBoxImage: 'none',
      webkitMaskBoxImageOutset: '0px',
      webkitMaskBoxImageRepeat: 'stretch',
      webkitMaskBoxImageSlice: '0 fill',
      webkitMaskBoxImageSource: 'none',
      webkitMaskBoxImageWidth: 'auto',
      webkitMaskClip: 'border-box',
      webkitMaskComposite: 'source-over',
      webkitMaskImage: 'none',
      webkitMaskOrigin: 'border-box',
      webkitMaskPosition: '0% 0%',
      webkitMaskPositionX: '0%',
      webkitMaskPositionY: '0%',
      webkitMaskRepeat: 'repeat',
      webkitMaskRepeatX: '',
      webkitMaskRepeatY: '',
      webkitMaskSize: 'auto',
      webkitMaxLogicalHeight: 'none',
      webkitMaxLogicalWidth: 'none',
      webkitMinLogicalHeight: '0px',
      webkitMinLogicalWidth: '0px',
      webkitPaddingAfter: '0px',
      webkitPaddingBefore: '0px',
      webkitPaddingEnd: '0px',
      webkitPaddingStart: '0px',
      webkitPerspectiveOriginX: '',
      webkitPerspectiveOriginY: '',
      webkitPrintColorAdjust: 'economy',
      webkitRtlOrdering: 'logical',
      webkitRubyPosition: 'before',
      webkitTapHighlightColor: 'rgba(0, 0, 0, 0.4)',
      webkitTextCombine: 'none',
      webkitTextDecorationsInEffect: 'none',
      webkitTextEmphasis: '',
      webkitTextEmphasisColor: 'rgb(0, 0, 0)',
      webkitTextEmphasisPosition: 'over right',
      webkitTextEmphasisStyle: 'none',
      webkitTextFillColor: 'rgb(0, 0, 0)',
      webkitTextOrientation: 'vertical-right',
      webkitTextSecurity: 'none',
      webkitTextStroke: '',
      webkitTextStrokeColor: 'rgb(0, 0, 0)',
      webkitTextStrokeWidth: '0px',
      webkitTransformOriginX: '',
      webkitTransformOriginY: '',
      webkitTransformOriginZ: '',
      webkitUserDrag: 'auto',
      webkitUserModify: 'read-only',
      webkitWritingMode: 'horizontal-tb',
      whiteSpace: 'normal',
      widows: '2',
      width: '0px',
      willChange: 'auto',
      wordBreak: 'normal',
      wordSpacing: '0px',
      wordWrap: 'normal',
      writingMode: 'horizontal-tb',
      x: '0px',
      y: '0px',
      zIndex: 'auto',
      zoom: '1',
    },
    pg = function a(h) {
      fb(this, a)
      this.cancelable = this.cancelBubble = !1
      this.currentTarget = this.target = null
      this.stopPropagation = this.preventDefault = fa
      this.type = h
      this.timeStamp = Date.now()
    },
    aj = {
      href: 'app.js',
      reload: function () {},
      replace: function (h) {
        this.href = h
      },
    },
    wl = (function (h) {
      function a() {
        fb(this, a)
        return Xb(this, sb(a).call(this, 'html', 0))
      }
      Wb(a, h)
      return a
    })(zc),
    xl = (function (h) {
      function a() {
        fb(this, a)
        return Xb(this, sb(a).call(this, 'body', 0))
      }
      Wb(a, h)
      return a
    })(zc),
    bj = (function (h) {
      function a(b) {
        fb(this, a)
        b = Xb(this, sb(a).call(this, b))
        b.touches = []
        b.targetTouches = []
        b.changedTouches = []
        b.target = null
        b.currentTarget = null
        return b
      }
      Wb(a, h)
      return a
    })(pg),
    oh = function b(a) {
      fb(this, b)
      this.identifier = a.identifier
      this.force = void 0 === a.force ? 1 : a.force
      this.pageX = a.pageX || a.x
      this.pageY = a.pageY || a.y
      this.clientX = a.clientX || a.x
      this.clientY = a.clientY || a.y
      this.screenX = this.pageX
      this.screenY = this.pageY
    },
    Me = {},
    V = {
      readyState: 'complete',
      visibilityState: 'visible',
      hidden: !1,
      fullscreen: !0,
      location: aj,
      scripts: [],
      style: {},
      ontouchstart: null,
      ontouchmove: null,
      ontouchend: null,
      onvisibilitychange: null,
      parentNode: null,
      parentElement: null,
      createElement: function (a) {
        a = a.toLowerCase()
        if ('canvas' === a) {
          if (null == ra) throw Error('please register a canvas')
          return ra
        }
        return 'img' === a ? new Rh() : new zc(a)
      },
      createElementNS: function (a, b) {
        return this.createElement(b)
      },
      createTextNode: function (a) {
        return a
      },
      getElementById: function (a) {
        return ma.has(a) ? ma.get(a) : null
      },
      getElementsByTagName: function (a) {
        a = a.toLowerCase()
        return 'head' === a
          ? [V.head]
          : 'body' === a
          ? [V.body]
          : 'canvas' === a
          ? ng(ma)
          : []
      },
      getElementsByTagNameNS: function (a, b) {
        return this.getElementsByTagName(b)
      },
      getElementsByName: function (a) {
        return 'head' === a
          ? [V.head]
          : 'body' === a
          ? [V.body]
          : 'canvas' === a
          ? ng(ma)
          : []
      },
      querySelector: function (a) {
        if ('head' === a) return V.head
        if ('body' === a) return V.body
        if ('canvas' === a) return ra
        a = a.slice(1)
        return ma.has(a) ? ma.get(a) : null
      },
      querySelectorAll: function (a) {
        return 'head' === a
          ? [V.head]
          : 'body' === a
          ? [V.body]
          : 'canvas' === a
          ? ng(ma)
          : []
      },
      addEventListener: function (a, b) {
        Me[a] || (Me[a] = [])
        Me[a].push(b)
      },
      removeEventListener: function (a, b) {
        if ((a = Me[a]) && 0 < a.length)
          for (var c = a.length; c--; 0 < c)
            if (a[c] === b) {
              a.splice(c, 1)
              break
            }
      },
      dispatchEvent: function (a) {
        var b = a.type,
          c = Me[b]
        if (c) for (var d = 0; d < c.length; d++) c[d](a)
        if (a.target && 'function' === typeof a.target['on' + b])
          a.target['on' + b](a)
      },
    }
  V.documentElement = new wl()
  V.head = new zc('head')
  V.body = new xl()
  if (wx.onHide) wx.onHide(Sh(!1))
  if (wx.onShow) wx.onShow(Sh(!0))
  var ph = wx.getSystemInfoSync(),
    yl = ph.platform,
    cj = ph.language,
    dj =
      -1 !== ph.system.toLowerCase().indexOf('android')
        ? 'Android; CPU Android 6.0'
        : 'iPhone; CPU iPhone OS 10_3_1 like Mac OS X',
    zl = 'Mozilla/5.0 ('
      .concat(
        dj,
        ') AppleWebKit/603.1.30 (KHTML, like Gecko) Mobile/14E8301 MicroMessenger/6.6.0 MiniGame NetType/WIFI Language/',
      )
      .concat(cj),
    ej = {
      platform: yl,
      language: cj,
      appVersion: '5.0 ('.concat(
        dj,
        ') AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1',
      ),
      userAgent: zl,
      onLine: !0,
      geolocation: {
        getCurrentPosition: fa,
        watchPosition: fa,
        clearWatch: fa,
      },
    }
  if (wx.onNetworkStatusChange)
    wx.onNetworkStatusChange(function (a) {
      ej.onLine = a.isConnected
    })
  var Nf = new WeakMap(),
    Of = new WeakMap(),
    Al = new WeakMap(),
    Ac = (function (a) {
      function b() {
        fb(this, b)
        var a = Xb(this, sb(b).call(this))
        a.onabort = null
        a.onerror = null
        a.onload = null
        a.onloadstart = null
        a.onprogress = null
        a.ontimeout = null
        a.onloadend = null
        a.onreadystatechange = null
        a.readyState = 0
        a.response = null
        a.responseText = null
        a.responseType = 'text'
        a.dataType = 'string'
        a.responseXML = null
        a.status = 0
        a.statusText = ''
        a.upload = {}
        a.withCredentials = !1
        Nf.set(tb(a), { 'content-type': 'application/x-www-form-urlencoded' })
        Of.set(tb(a), {})
        return a
      }
      Wb(b, a)
      Ve(b, [
        {
          key: 'abort',
          value: function () {
            var a = Al.get(this)
            a && a.abort()
          },
        },
        {
          key: 'getAllResponseHeaders',
          value: function () {
            var a = Of.get(this)
            return Object.keys(a)
              .map(function (b) {
                return ''.concat(b, ': ').concat(a[b])
              })
              .join('\n')
          },
        },
        {
          key: 'getResponseHeader',
          value: function (a) {
            return Of.get(this)[a]
          },
        },
        {
          key: 'open',
          value: function (a, d) {
            this._method = a
            this._url = d
            We.call(this, b.OPENED)
          },
        },
        { key: 'overrideMimeType', value: function () {} },
        {
          key: 'send',
          value: function () {
            var a = this,
              d =
                0 < arguments.length && void 0 !== arguments[0]
                  ? arguments[0]
                  : ''
            if (this.readyState !== b.OPENED)
              throw Error(
                "Failed to execute 'send' on 'XMLHttpRequest': The object's state must be OPENED.",
              )
            var f = this._url,
              g = Nf.get(this),
              k = this.responseType,
              m = this.dataType,
              n = !/^(http|https|ftp|wxfile):\/\/.*/i.test(f),
              p
            'arraybuffer' !== k && (p = 'utf8')
            delete this.response
            this.response = null
            var l = function (c) {
                var d = c.data,
                  f = c.statusCode
                c = c.header
                f = void 0 === f ? 200 : f
                if ('string' !== typeof d && !(d instanceof ArrayBuffer))
                  try {
                    d = JSON.stringify(d)
                  } catch (w) {}
                a.status = f
                c && Of.set(a, c)
                Yb.call(a, 'loadstart')
                We.call(a, b.HEADERS_RECEIVED)
                We.call(a, b.LOADING)
                a.response = d
                d instanceof ArrayBuffer
                  ? Object.defineProperty(a, 'responseText', {
                      enumerable: !0,
                      configurable: !0,
                      get: function () {
                        throw (
                          'InvalidStateError : responseType is ' +
                          this.responseType
                        )
                      },
                    })
                  : (a.responseText = d)
                We.call(a, b.DONE)
                Yb.call(a, 'load')
                Yb.call(a, 'loadend')
              },
              t = function (b) {
                b = b.errMsg
                ;-1 !== b.indexOf('abort')
                  ? Yb.call(a, 'abort')
                  : Yb.call(a, 'error', { message: b })
                Yb.call(a, 'loadend')
                n && console.warn(b)
              }
            n
              ? ((d = wx.getFileSystemManager()),
                (f = { filePath: f, success: l, fail: t }),
                p && (f.encoding = p),
                d.readFile(f))
              : wx.request({
                  data: d,
                  url: f,
                  method: this._method,
                  header: g,
                  dataType: m,
                  responseType: k,
                  success: l,
                  fail: t,
                })
          },
        },
        {
          key: 'setRequestHeader',
          value: function (a, b) {
            var c = Nf.get(this)
            c[a] = b
            Nf.set(this, c)
          },
        },
        {
          key: 'addEventListener',
          value: function (a, b) {
            var c = this
            'function' === typeof b &&
              (this['on' + a] = function () {
                var a =
                  0 < arguments.length && void 0 !== arguments[0]
                    ? arguments[0]
                    : {}
                a.target = a.target || c
                b.call(c, a)
              })
          },
        },
        {
          key: 'removeEventListener',
          value: function (a, b) {
            this['on' + a] === b && (this['on' + a] = null)
          },
        },
      ])
      return b
    })(mh)
  Ac.UNSEND = 0
  Ac.OPENED = 1
  Ac.HEADERS_RECEIVED = 2
  Ac.LOADING = 3
  Ac.DONE = 4
  if ('devtools' !== wx.getSystemInfoSync().platform) {
    var fj = wx.getPerformance ? wx.getPerformance() : Date,
      qh = {}
    console.time = function (a) {
      qh[a] = fj.now()
    }
    console.timeEnd = function (a) {
      var b = qh[a]
      b &&
        ((b = fj.now() - b),
        console.log(a + ': ' + b / 1e3 + 'ms'),
        delete qh[a])
    }
  }
  if (wx.onWindowResize)
    wx.onWindowResize(function (a) {
      var b = new pg('resize')
      b.target = V
      b.timeStamp = Date.now()
      b.res = a
      b.windowWidth = a.windowWidth
      b.windowHeight = a.windowHeight
      V.dispatchEvent(b)
    })
  var kc = Object.freeze({
    __proto__: null,
    AudioContext: null,
    Element: $i,
    HTMLElement: zc,
    Image: Rh,
    TouchEvent: bj,
    VRFrameData: fa,
    XMLHttpRequest: Ac,
    _canvasMap: ma,
    addEventListener: Th,
    alert: function (a) {
      console.log(a)
    },
    arrayBufferToBase64: wx.arrayBufferToBase64 || fa,
    base64ToArrayBuffer: wx.base64ToArrayBuffer || fa,
    blur: function () {},
    cancelAnimationFrame: ra ? ra.cancelAnimationFrame : fa,
    get canvas() {
      return ra
    },
    clearCanvas: function () {
      ma.clear()
      ra = null
    },
    devicePixelRatio: ul,
    document: V,
    focus: function () {},
    getComputedStyle: function (a) {
      var b = a.tagName
      return 'CANVAS' === b
        ? ((a = a.getBoundingClientRect()),
          Object.assign(nh, {
            display: 'inline',
            position: 'static',
            inlineSize: a.width + 'px',
            perspectiveOrigin: a.width / 2 + 'px ' + a.height / 2 + 'px',
            transformOrigin: a.width / 2 + 'px ' + a.height / 2 + 'px',
            webkitLogicalWidth: a.width + 'px',
            webkitLogicalHeight: a.height + 'px',
            width: a.width + 'px',
            height: a.height + 'px',
          }))
        : 'IMG' === b
        ? ((b = a.width),
          (a = a.height),
          Object.assign(nh, {
            display: 'inline',
            position: 'static',
            inlineSize: b + 'px',
            perspectiveOrigin: b / 2 + 'px ' + a / 2 + 'px',
            transformOrigin: b / 2 + 'px ' + a / 2 + 'px',
            webkitLogicalWidth: b + 'px',
            webkitLogicalHeight: a + 'px',
            width: b + 'px',
            height: a + 'px',
          }))
        : nh
    },
    innerHeight: Lc,
    innerWidth: Kc,
    location: aj,
    navigator: ej,
    ontouchend: null,
    ontouchmove: null,
    ontouchstart: null,
    performance: tl,
    registerCanvas: function () {
      for (
        var a = null, b = null, c = arguments.length, d = Array(c), f = 0;
        f < c;
        f++
      )
        d[f] = arguments[f]
      if (0 === d.length) throw Error('need arguments')
      1 === d.length && d[0]._canvasId
        ? ((b = d[0]), (a = d[0]._canvasId))
        : 2 === d.length &&
          'string' === typeof d[0] &&
          d[1]._canvasId &&
          ((a = d[0]), (b = d[1]))
      if (!a || !b) throw Error('parameter err')
      if (
        5 <= ma.size &&
        (console.warn('canvas map size bigger 5 please remove unused canvas!'),
        (c = ma.keys().next().value))
      )
        ma['delete'](c)
      ma.has(a)
        ? (ra = ma.get(a))
        : ((b.type = 'canvas'),
          (c = new zc('canvas')),
          og(b, c),
          og(b.constructor.prototype, mh.prototype),
          og(b.constructor.prototype, zc.prototype),
          ma.set(a, b),
          (ra = b))
      return ra
    },
    removeEventListener: Uh,
    requestAnimationFrame: ra ? ra.requestAnimationFrame : fa,
    screen: vl,
    scrollBy: function (a, b) {},
    scrollTo: function (a, b) {},
    scrollX: 0,
    scrollY: 0,
    touchEventHandlerFactory: function (a, b) {
      return function (c) {
        var d = new bj(b)
        d.changedTouches = c.changedTouches.map(function (a) {
          return new oh(a)
        })
        d.touches = c.touches.map(function (a) {
          return new oh(a)
        })
        d.targetTouches = Array.prototype.slice.call(
          c.touches.map(function (a) {
            return new oh(a)
          }),
        )
        d.timeStamp = c.timeStamp
        'document' == a
          ? ((d.target = V), (d.currentTarget = V), V.dispatchEvent(d))
          : ((d.target = ra), (d.currentTarget = ra), ra.dispatchEvent(d))
      }
    },
    unregisterCanvas: function (a) {
      if (!a) throw Error('need arguments')
      if ('string' === typeof a) return ma['delete'](a)
      if (a._canvasId) return ma['delete'](a._canvasId)
      ra = null
      return !1
    },
    webkitAudioContext: null,
  })
  void 0 === Number.EPSILON && (Number.EPSILON = Math.pow(2, -52))
  void 0 === Number.isInteger &&
    (Number.isInteger = function (a) {
      return 'number' === typeof a && isFinite(a) && Math.floor(a) === a
    })
  void 0 === Math.sign &&
    (Math.sign = function (a) {
      return 0 > a ? -1 : 0 < a ? 1 : +a
    })
  !1 === 'name' in Function.prototype &&
    Object.defineProperty(Function.prototype, 'name', {
      get: function () {
        return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]
      },
    })
  void 0 === Object.assign &&
    (Object.assign = function (a) {
      if (void 0 === a || null === a)
        throw new TypeError('Cannot convert undefined or null to object')
      for (var b = Object(a), c = 1; c < arguments.length; c++) {
        var d = arguments[c]
        if (void 0 !== d && null !== d)
          for (var f in d)
            Object.prototype.hasOwnProperty.call(d, f) && (b[f] = d[f])
      }
      return b
    })
  Object.assign(Ra.prototype, {
    addEventListener: function (a, b) {
      void 0 === this._listeners && (this._listeners = {})
      var c = this._listeners
      void 0 === c[a] && (c[a] = [])
      ;-1 === c[a].indexOf(b) && c[a].push(b)
    },
    hasEventListener: function (a, b) {
      if (void 0 === this._listeners) return !1
      var c = this._listeners
      return void 0 !== c[a] && -1 !== c[a].indexOf(b)
    },
    removeEventListener: function (a, b) {
      void 0 !== this._listeners &&
        ((a = this._listeners[a]),
        void 0 !== a && ((b = a.indexOf(b)), -1 !== b && a.splice(b, 1)))
    },
    dispatchEvent: function (a) {
      if (void 0 !== this._listeners) {
        var b = this._listeners[a.type]
        if (void 0 !== b) {
          a.target = this
          b = b.slice(0)
          for (var c = 0, d = b.length; c < d; c++) b[c].call(this, a)
        }
      }
    },
  })
  for (var xa = [], Ne = 0; 256 > Ne; Ne++)
    xa[Ne] = (16 > Ne ? '0' : '') + Ne.toString(16)
  var N = {
    DEG2RAD: Math.PI / 180,
    RAD2DEG: 180 / Math.PI,
    generateUUID: function () {
      var a = (4294967295 * Math.random()) | 0,
        b = (4294967295 * Math.random()) | 0,
        c = (4294967295 * Math.random()) | 0,
        d = (4294967295 * Math.random()) | 0
      return (
        xa[a & 255] +
        xa[(a >> 8) & 255] +
        xa[(a >> 16) & 255] +
        xa[(a >> 24) & 255] +
        '-' +
        xa[b & 255] +
        xa[(b >> 8) & 255] +
        '-' +
        xa[((b >> 16) & 15) | 64] +
        xa[(b >> 24) & 255] +
        '-' +
        xa[(c & 63) | 128] +
        xa[(c >> 8) & 255] +
        '-' +
        xa[(c >> 16) & 255] +
        xa[(c >> 24) & 255] +
        xa[d & 255] +
        xa[(d >> 8) & 255] +
        xa[(d >> 16) & 255] +
        xa[(d >> 24) & 255]
      ).toUpperCase()
    },
    clamp: function (a, b, c) {
      return Math.max(b, Math.min(c, a))
    },
    euclideanModulo: function (a, b) {
      return ((a % b) + b) % b
    },
    mapLinear: function (a, b, c, d, f) {
      return d + ((a - b) * (f - d)) / (c - b)
    },
    lerp: function (a, b, c) {
      return (1 - c) * a + c * b
    },
    smoothstep: function (a, b, c) {
      if (a <= b) return 0
      if (a >= c) return 1
      a = (a - b) / (c - b)
      return a * a * (3 - 2 * a)
    },
    smootherstep: function (a, b, c) {
      if (a <= b) return 0
      if (a >= c) return 1
      a = (a - b) / (c - b)
      return a * a * a * (a * (6 * a - 15) + 10)
    },
    randInt: function (a, b) {
      return a + Math.floor(Math.random() * (b - a + 1))
    },
    randFloat: function (a, b) {
      return a + Math.random() * (b - a)
    },
    randFloatSpread: function (a) {
      return a * (0.5 - Math.random())
    },
    degToRad: function (a) {
      return a * N.DEG2RAD
    },
    radToDeg: function (a) {
      return a * N.RAD2DEG
    },
    isPowerOfTwo: function (a) {
      return 0 === (a & (a - 1)) && 0 !== a
    },
    ceilPowerOfTwo: function (a) {
      return Math.pow(2, Math.ceil(Math.log(a) / Math.LN2))
    },
    floorPowerOfTwo: function (a) {
      return Math.pow(2, Math.floor(Math.log(a) / Math.LN2))
    },
  }
  Object.defineProperties(z.prototype, {
    width: {
      get: function () {
        return this.x
      },
      set: function (a) {
        this.x = a
      },
    },
    height: {
      get: function () {
        return this.y
      },
      set: function (a) {
        this.y = a
      },
    },
  })
  Object.assign(z.prototype, {
    isVector2: !0,
    set: function (a, b) {
      this.x = a
      this.y = b
      return this
    },
    setScalar: function (a) {
      this.y = this.x = a
      return this
    },
    setX: function (a) {
      this.x = a
      return this
    },
    setY: function (a) {
      this.y = a
      return this
    },
    setComponent: function (a, b) {
      switch (a) {
        case 0:
          this.x = b
          break
        case 1:
          this.y = b
          break
        default:
          throw Error('index is out of range: ' + a)
      }
      return this
    },
    getComponent: function (a) {
      switch (a) {
        case 0:
          return this.x
        case 1:
          return this.y
        default:
          throw Error('index is out of range: ' + a)
      }
    },
    clone: function () {
      return new this.constructor(this.x, this.y)
    },
    copy: function (a) {
      this.x = a.x
      this.y = a.y
      return this
    },
    add: function (a, b) {
      if (void 0 !== b)
        return (
          console.warn(
            'THREE.Vector2: .add() now only accepts one argument. Use .addVectors( a, b ) instead.',
          ),
          this.addVectors(a, b)
        )
      this.x += a.x
      this.y += a.y
      return this
    },
    addScalar: function (a) {
      this.x += a
      this.y += a
      return this
    },
    addVectors: function (a, b) {
      this.x = a.x + b.x
      this.y = a.y + b.y
      return this
    },
    addScaledVector: function (a, b) {
      this.x += a.x * b
      this.y += a.y * b
      return this
    },
    sub: function (a, b) {
      if (void 0 !== b)
        return (
          console.warn(
            'THREE.Vector2: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.',
          ),
          this.subVectors(a, b)
        )
      this.x -= a.x
      this.y -= a.y
      return this
    },
    subScalar: function (a) {
      this.x -= a
      this.y -= a
      return this
    },
    subVectors: function (a, b) {
      this.x = a.x - b.x
      this.y = a.y - b.y
      return this
    },
    multiply: function (a) {
      this.x *= a.x
      this.y *= a.y
      return this
    },
    multiplyScalar: function (a) {
      this.x *= a
      this.y *= a
      return this
    },
    divide: function (a) {
      this.x /= a.x
      this.y /= a.y
      return this
    },
    divideScalar: function (a) {
      return this.multiplyScalar(1 / a)
    },
    applyMatrix3: function (a) {
      var b = this.x,
        c = this.y
      a = a.elements
      this.x = a[0] * b + a[3] * c + a[6]
      this.y = a[1] * b + a[4] * c + a[7]
      return this
    },
    min: function (a) {
      this.x = Math.min(this.x, a.x)
      this.y = Math.min(this.y, a.y)
      return this
    },
    max: function (a) {
      this.x = Math.max(this.x, a.x)
      this.y = Math.max(this.y, a.y)
      return this
    },
    clamp: function (a, b) {
      this.x = Math.max(a.x, Math.min(b.x, this.x))
      this.y = Math.max(a.y, Math.min(b.y, this.y))
      return this
    },
    clampScalar: function (a, b) {
      this.x = Math.max(a, Math.min(b, this.x))
      this.y = Math.max(a, Math.min(b, this.y))
      return this
    },
    clampLength: function (a, b) {
      var c = this.length()
      return this.divideScalar(c || 1).multiplyScalar(
        Math.max(a, Math.min(b, c)),
      )
    },
    floor: function () {
      this.x = Math.floor(this.x)
      this.y = Math.floor(this.y)
      return this
    },
    ceil: function () {
      this.x = Math.ceil(this.x)
      this.y = Math.ceil(this.y)
      return this
    },
    round: function () {
      this.x = Math.round(this.x)
      this.y = Math.round(this.y)
      return this
    },
    roundToZero: function () {
      this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x)
      this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y)
      return this
    },
    negate: function () {
      this.x = -this.x
      this.y = -this.y
      return this
    },
    dot: function (a) {
      return this.x * a.x + this.y * a.y
    },
    cross: function (a) {
      return this.x * a.y - this.y * a.x
    },
    lengthSq: function () {
      return this.x * this.x + this.y * this.y
    },
    length: function () {
      return Math.sqrt(this.x * this.x + this.y * this.y)
    },
    manhattanLength: function () {
      return Math.abs(this.x) + Math.abs(this.y)
    },
    normalize: function () {
      return this.divideScalar(this.length() || 1)
    },
    angle: function () {
      var a = Math.atan2(this.y, this.x)
      0 > a && (a += 2 * Math.PI)
      return a
    },
    distanceTo: function (a) {
      return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function (a) {
      var b = this.x - a.x
      a = this.y - a.y
      return b * b + a * a
    },
    manhattanDistanceTo: function (a) {
      return Math.abs(this.x - a.x) + Math.abs(this.y - a.y)
    },
    setLength: function (a) {
      return this.normalize().multiplyScalar(a)
    },
    lerp: function (a, b) {
      this.x += (a.x - this.x) * b
      this.y += (a.y - this.y) * b
      return this
    },
    lerpVectors: function (a, b, c) {
      return this.subVectors(b, a).multiplyScalar(c).add(a)
    },
    equals: function (a) {
      return a.x === this.x && a.y === this.y
    },
    fromArray: function (a, b) {
      void 0 === b && (b = 0)
      this.x = a[b]
      this.y = a[b + 1]
      return this
    },
    toArray: function (a, b) {
      void 0 === a && (a = [])
      void 0 === b && (b = 0)
      a[b] = this.x
      a[b + 1] = this.y
      return a
    },
    fromBufferAttribute: function (a, b, c) {
      void 0 !== c &&
        console.warn(
          'THREE.Vector2: offset has been removed from .fromBufferAttribute().',
        )
      this.x = a.getX(b)
      this.y = a.getY(b)
      return this
    },
    rotateAround: function (a, b) {
      var c = Math.cos(b)
      b = Math.sin(b)
      var d = this.x - a.x,
        f = this.y - a.y
      this.x = d * c - f * b + a.x
      this.y = d * b + f * c + a.y
      return this
    },
  })
  Object.assign(ya, {
    slerp: function (a, b, c, d) {
      return c.copy(a).slerp(b, d)
    },
    slerpFlat: function (a, b, c, d, f, g, k) {
      var m = c[d + 0],
        n = c[d + 1],
        p = c[d + 2]
      c = c[d + 3]
      d = f[g + 0]
      var l = f[g + 1],
        t = f[g + 2]
      f = f[g + 3]
      if (c !== f || m !== d || n !== l || p !== t) {
        g = 1 - k
        var r = m * d + n * l + p * t + c * f,
          u = 0 <= r ? 1 : -1,
          q = 1 - r * r
        q > Number.EPSILON &&
          ((q = Math.sqrt(q)),
          (r = Math.atan2(q, r * u)),
          (g = Math.sin(g * r) / q),
          (k = Math.sin(k * r) / q))
        u *= k
        m = m * g + d * u
        n = n * g + l * u
        p = p * g + t * u
        c = c * g + f * u
        g === 1 - k &&
          ((k = 1 / Math.sqrt(m * m + n * n + p * p + c * c)),
          (m *= k),
          (n *= k),
          (p *= k),
          (c *= k))
      }
      a[b] = m
      a[b + 1] = n
      a[b + 2] = p
      a[b + 3] = c
    },
  })
  Object.defineProperties(ya.prototype, {
    x: {
      get: function () {
        return this._x
      },
      set: function (a) {
        this._x = a
        this._onChangeCallback()
      },
    },
    y: {
      get: function () {
        return this._y
      },
      set: function (a) {
        this._y = a
        this._onChangeCallback()
      },
    },
    z: {
      get: function () {
        return this._z
      },
      set: function (a) {
        this._z = a
        this._onChangeCallback()
      },
    },
    w: {
      get: function () {
        return this._w
      },
      set: function (a) {
        this._w = a
        this._onChangeCallback()
      },
    },
  })
  Object.assign(ya.prototype, {
    isQuaternion: !0,
    set: function (a, b, c, d) {
      this._x = a
      this._y = b
      this._z = c
      this._w = d
      this._onChangeCallback()
      return this
    },
    clone: function () {
      return new this.constructor(this._x, this._y, this._z, this._w)
    },
    copy: function (a) {
      this._x = a.x
      this._y = a.y
      this._z = a.z
      this._w = a.w
      this._onChangeCallback()
      return this
    },
    setFromEuler: function (a, b) {
      if (!a || !a.isEuler)
        throw Error(
          'THREE.Quaternion: .setFromEuler() now expects an Euler rotation rather than a Vector3 and order.',
        )
      var c = a._x,
        d = a._y,
        f = a._z
      a = a.order
      var g = Math.cos,
        k = Math.sin,
        m = g(c / 2),
        n = g(d / 2)
      g = g(f / 2)
      c = k(c / 2)
      d = k(d / 2)
      f = k(f / 2)
      'XYZ' === a
        ? ((this._x = c * n * g + m * d * f),
          (this._y = m * d * g - c * n * f),
          (this._z = m * n * f + c * d * g),
          (this._w = m * n * g - c * d * f))
        : 'YXZ' === a
        ? ((this._x = c * n * g + m * d * f),
          (this._y = m * d * g - c * n * f),
          (this._z = m * n * f - c * d * g),
          (this._w = m * n * g + c * d * f))
        : 'ZXY' === a
        ? ((this._x = c * n * g - m * d * f),
          (this._y = m * d * g + c * n * f),
          (this._z = m * n * f + c * d * g),
          (this._w = m * n * g - c * d * f))
        : 'ZYX' === a
        ? ((this._x = c * n * g - m * d * f),
          (this._y = m * d * g + c * n * f),
          (this._z = m * n * f - c * d * g),
          (this._w = m * n * g + c * d * f))
        : 'YZX' === a
        ? ((this._x = c * n * g + m * d * f),
          (this._y = m * d * g + c * n * f),
          (this._z = m * n * f - c * d * g),
          (this._w = m * n * g - c * d * f))
        : 'XZY' === a &&
          ((this._x = c * n * g - m * d * f),
          (this._y = m * d * g - c * n * f),
          (this._z = m * n * f + c * d * g),
          (this._w = m * n * g + c * d * f))
      !1 !== b && this._onChangeCallback()
      return this
    },
    setFromAxisAngle: function (a, b) {
      b /= 2
      var c = Math.sin(b)
      this._x = a.x * c
      this._y = a.y * c
      this._z = a.z * c
      this._w = Math.cos(b)
      this._onChangeCallback()
      return this
    },
    setFromRotationMatrix: function (a) {
      var b = a.elements,
        c = b[0]
      a = b[4]
      var d = b[8],
        f = b[1],
        g = b[5],
        k = b[9],
        m = b[2],
        n = b[6]
      b = b[10]
      var p = c + g + b
      0 < p
        ? ((c = 0.5 / Math.sqrt(p + 1)),
          (this._w = 0.25 / c),
          (this._x = (n - k) * c),
          (this._y = (d - m) * c),
          (this._z = (f - a) * c))
        : c > g && c > b
        ? ((c = 2 * Math.sqrt(1 + c - g - b)),
          (this._w = (n - k) / c),
          (this._x = 0.25 * c),
          (this._y = (a + f) / c),
          (this._z = (d + m) / c))
        : g > b
        ? ((c = 2 * Math.sqrt(1 + g - c - b)),
          (this._w = (d - m) / c),
          (this._x = (a + f) / c),
          (this._y = 0.25 * c),
          (this._z = (k + n) / c))
        : ((c = 2 * Math.sqrt(1 + b - c - g)),
          (this._w = (f - a) / c),
          (this._x = (d + m) / c),
          (this._y = (k + n) / c),
          (this._z = 0.25 * c))
      this._onChangeCallback()
      return this
    },
    setFromUnitVectors: function (a, b) {
      var c = a.dot(b) + 1
      1e-6 > c
        ? ((c = 0),
          Math.abs(a.x) > Math.abs(a.z)
            ? ((this._x = -a.y), (this._y = a.x), (this._z = 0))
            : ((this._x = 0), (this._y = -a.z), (this._z = a.y)))
        : ((this._x = a.y * b.z - a.z * b.y),
          (this._y = a.z * b.x - a.x * b.z),
          (this._z = a.x * b.y - a.y * b.x))
      this._w = c
      return this.normalize()
    },
    angleTo: function (a) {
      return 2 * Math.acos(Math.abs(N.clamp(this.dot(a), -1, 1)))
    },
    rotateTowards: function (a, b) {
      var c = this.angleTo(a)
      if (0 === c) return this
      this.slerp(a, Math.min(1, b / c))
      return this
    },
    inverse: function () {
      return this.conjugate()
    },
    conjugate: function () {
      this._x *= -1
      this._y *= -1
      this._z *= -1
      this._onChangeCallback()
      return this
    },
    dot: function (a) {
      return this._x * a._x + this._y * a._y + this._z * a._z + this._w * a._w
    },
    lengthSq: function () {
      return (
        this._x * this._x +
        this._y * this._y +
        this._z * this._z +
        this._w * this._w
      )
    },
    length: function () {
      return Math.sqrt(
        this._x * this._x +
          this._y * this._y +
          this._z * this._z +
          this._w * this._w,
      )
    },
    normalize: function () {
      var a = this.length()
      0 === a
        ? ((this._z = this._y = this._x = 0), (this._w = 1))
        : ((a = 1 / a),
          (this._x *= a),
          (this._y *= a),
          (this._z *= a),
          (this._w *= a))
      this._onChangeCallback()
      return this
    },
    multiply: function (a, b) {
      return void 0 !== b
        ? (console.warn(
            'THREE.Quaternion: .multiply() now only accepts one argument. Use .multiplyQuaternions( a, b ) instead.',
          ),
          this.multiplyQuaternions(a, b))
        : this.multiplyQuaternions(this, a)
    },
    premultiply: function (a) {
      return this.multiplyQuaternions(a, this)
    },
    multiplyQuaternions: function (a, b) {
      var c = a._x,
        d = a._y,
        f = a._z
      a = a._w
      var g = b._x,
        k = b._y,
        m = b._z
      b = b._w
      this._x = c * b + a * g + d * m - f * k
      this._y = d * b + a * k + f * g - c * m
      this._z = f * b + a * m + c * k - d * g
      this._w = a * b - c * g - d * k - f * m
      this._onChangeCallback()
      return this
    },
    slerp: function (a, b) {
      if (0 === b) return this
      if (1 === b) return this.copy(a)
      var c = this._x,
        d = this._y,
        f = this._z,
        g = this._w,
        k = g * a._w + c * a._x + d * a._y + f * a._z
      0 > k
        ? ((this._w = -a._w),
          (this._x = -a._x),
          (this._y = -a._y),
          (this._z = -a._z),
          (k = -k))
        : this.copy(a)
      if (1 <= k)
        return (this._w = g), (this._x = c), (this._y = d), (this._z = f), this
      a = 1 - k * k
      if (a <= Number.EPSILON)
        return (
          (k = 1 - b),
          (this._w = k * g + b * this._w),
          (this._x = k * c + b * this._x),
          (this._y = k * d + b * this._y),
          (this._z = k * f + b * this._z),
          this.normalize(),
          this._onChangeCallback(),
          this
        )
      a = Math.sqrt(a)
      var m = Math.atan2(a, k)
      k = Math.sin((1 - b) * m) / a
      b = Math.sin(b * m) / a
      this._w = g * k + this._w * b
      this._x = c * k + this._x * b
      this._y = d * k + this._y * b
      this._z = f * k + this._z * b
      this._onChangeCallback()
      return this
    },
    equals: function (a) {
      return (
        a._x === this._x &&
        a._y === this._y &&
        a._z === this._z &&
        a._w === this._w
      )
    },
    fromArray: function (a, b) {
      void 0 === b && (b = 0)
      this._x = a[b]
      this._y = a[b + 1]
      this._z = a[b + 2]
      this._w = a[b + 3]
      this._onChangeCallback()
      return this
    },
    toArray: function (a, b) {
      void 0 === a && (a = [])
      void 0 === b && (b = 0)
      a[b] = this._x
      a[b + 1] = this._y
      a[b + 2] = this._z
      a[b + 3] = this._w
      return a
    },
    _onChange: function (a) {
      this._onChangeCallback = a
      return this
    },
    _onChangeCallback: function () {},
  })
  var rh = new q(),
    gj = new ya()
  Object.assign(q.prototype, {
    isVector3: !0,
    set: function (a, b, c) {
      this.x = a
      this.y = b
      this.z = c
      return this
    },
    setScalar: function (a) {
      this.z = this.y = this.x = a
      return this
    },
    setX: function (a) {
      this.x = a
      return this
    },
    setY: function (a) {
      this.y = a
      return this
    },
    setZ: function (a) {
      this.z = a
      return this
    },
    setComponent: function (a, b) {
      switch (a) {
        case 0:
          this.x = b
          break
        case 1:
          this.y = b
          break
        case 2:
          this.z = b
          break
        default:
          throw Error('index is out of range: ' + a)
      }
      return this
    },
    getComponent: function (a) {
      switch (a) {
        case 0:
          return this.x
        case 1:
          return this.y
        case 2:
          return this.z
        default:
          throw Error('index is out of range: ' + a)
      }
    },
    clone: function () {
      return new this.constructor(this.x, this.y, this.z)
    },
    copy: function (a) {
      this.x = a.x
      this.y = a.y
      this.z = a.z
      return this
    },
    add: function (a, b) {
      if (void 0 !== b)
        return (
          console.warn(
            'THREE.Vector3: .add() now only accepts one argument. Use .addVectors( a, b ) instead.',
          ),
          this.addVectors(a, b)
        )
      this.x += a.x
      this.y += a.y
      this.z += a.z
      return this
    },
    addScalar: function (a) {
      this.x += a
      this.y += a
      this.z += a
      return this
    },
    addVectors: function (a, b) {
      this.x = a.x + b.x
      this.y = a.y + b.y
      this.z = a.z + b.z
      return this
    },
    addScaledVector: function (a, b) {
      this.x += a.x * b
      this.y += a.y * b
      this.z += a.z * b
      return this
    },
    sub: function (a, b) {
      if (void 0 !== b)
        return (
          console.warn(
            'THREE.Vector3: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.',
          ),
          this.subVectors(a, b)
        )
      this.x -= a.x
      this.y -= a.y
      this.z -= a.z
      return this
    },
    subScalar: function (a) {
      this.x -= a
      this.y -= a
      this.z -= a
      return this
    },
    subVectors: function (a, b) {
      this.x = a.x - b.x
      this.y = a.y - b.y
      this.z = a.z - b.z
      return this
    },
    multiply: function (a, b) {
      if (void 0 !== b)
        return (
          console.warn(
            'THREE.Vector3: .multiply() now only accepts one argument. Use .multiplyVectors( a, b ) instead.',
          ),
          this.multiplyVectors(a, b)
        )
      this.x *= a.x
      this.y *= a.y
      this.z *= a.z
      return this
    },
    multiplyScalar: function (a) {
      this.x *= a
      this.y *= a
      this.z *= a
      return this
    },
    multiplyVectors: function (a, b) {
      this.x = a.x * b.x
      this.y = a.y * b.y
      this.z = a.z * b.z
      return this
    },
    applyEuler: function (a) {
      ;(a && a.isEuler) ||
        console.error(
          'THREE.Vector3: .applyEuler() now expects an Euler rotation rather than a Vector3 and order.',
        )
      return this.applyQuaternion(gj.setFromEuler(a))
    },
    applyAxisAngle: function (a, b) {
      return this.applyQuaternion(gj.setFromAxisAngle(a, b))
    },
    applyMatrix3: function (a) {
      var b = this.x,
        c = this.y,
        d = this.z
      a = a.elements
      this.x = a[0] * b + a[3] * c + a[6] * d
      this.y = a[1] * b + a[4] * c + a[7] * d
      this.z = a[2] * b + a[5] * c + a[8] * d
      return this
    },
    applyMatrix4: function (a) {
      var b = this.x,
        c = this.y,
        d = this.z
      a = a.elements
      var f = 1 / (a[3] * b + a[7] * c + a[11] * d + a[15])
      this.x = (a[0] * b + a[4] * c + a[8] * d + a[12]) * f
      this.y = (a[1] * b + a[5] * c + a[9] * d + a[13]) * f
      this.z = (a[2] * b + a[6] * c + a[10] * d + a[14]) * f
      return this
    },
    applyQuaternion: function (a) {
      var b = this.x,
        c = this.y,
        d = this.z,
        f = a.x,
        g = a.y,
        k = a.z
      a = a.w
      var m = a * b + g * d - k * c,
        n = a * c + k * b - f * d,
        p = a * d + f * c - g * b
      b = -f * b - g * c - k * d
      this.x = m * a + b * -f + n * -k - p * -g
      this.y = n * a + b * -g + p * -f - m * -k
      this.z = p * a + b * -k + m * -g - n * -f
      return this
    },
    project: function (a) {
      return this.applyMatrix4(a.matrixWorldInverse).applyMatrix4(
        a.projectionMatrix,
      )
    },
    unproject: function (a) {
      return this.applyMatrix4(a.projectionMatrixInverse).applyMatrix4(
        a.matrixWorld,
      )
    },
    transformDirection: function (a) {
      var b = this.x,
        c = this.y,
        d = this.z
      a = a.elements
      this.x = a[0] * b + a[4] * c + a[8] * d
      this.y = a[1] * b + a[5] * c + a[9] * d
      this.z = a[2] * b + a[6] * c + a[10] * d
      return this.normalize()
    },
    divide: function (a) {
      this.x /= a.x
      this.y /= a.y
      this.z /= a.z
      return this
    },
    divideScalar: function (a) {
      return this.multiplyScalar(1 / a)
    },
    min: function (a) {
      this.x = Math.min(this.x, a.x)
      this.y = Math.min(this.y, a.y)
      this.z = Math.min(this.z, a.z)
      return this
    },
    max: function (a) {
      this.x = Math.max(this.x, a.x)
      this.y = Math.max(this.y, a.y)
      this.z = Math.max(this.z, a.z)
      return this
    },
    clamp: function (a, b) {
      this.x = Math.max(a.x, Math.min(b.x, this.x))
      this.y = Math.max(a.y, Math.min(b.y, this.y))
      this.z = Math.max(a.z, Math.min(b.z, this.z))
      return this
    },
    clampScalar: function (a, b) {
      this.x = Math.max(a, Math.min(b, this.x))
      this.y = Math.max(a, Math.min(b, this.y))
      this.z = Math.max(a, Math.min(b, this.z))
      return this
    },
    clampLength: function (a, b) {
      var c = this.length()
      return this.divideScalar(c || 1).multiplyScalar(
        Math.max(a, Math.min(b, c)),
      )
    },
    floor: function () {
      this.x = Math.floor(this.x)
      this.y = Math.floor(this.y)
      this.z = Math.floor(this.z)
      return this
    },
    ceil: function () {
      this.x = Math.ceil(this.x)
      this.y = Math.ceil(this.y)
      this.z = Math.ceil(this.z)
      return this
    },
    round: function () {
      this.x = Math.round(this.x)
      this.y = Math.round(this.y)
      this.z = Math.round(this.z)
      return this
    },
    roundToZero: function () {
      this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x)
      this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y)
      this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z)
      return this
    },
    negate: function () {
      this.x = -this.x
      this.y = -this.y
      this.z = -this.z
      return this
    },
    dot: function (a) {
      return this.x * a.x + this.y * a.y + this.z * a.z
    },
    lengthSq: function () {
      return this.x * this.x + this.y * this.y + this.z * this.z
    },
    length: function () {
      return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    },
    manhattanLength: function () {
      return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z)
    },
    normalize: function () {
      return this.divideScalar(this.length() || 1)
    },
    setLength: function (a) {
      return this.normalize().multiplyScalar(a)
    },
    lerp: function (a, b) {
      this.x += (a.x - this.x) * b
      this.y += (a.y - this.y) * b
      this.z += (a.z - this.z) * b
      return this
    },
    lerpVectors: function (a, b, c) {
      return this.subVectors(b, a).multiplyScalar(c).add(a)
    },
    cross: function (a, b) {
      return void 0 !== b
        ? (console.warn(
            'THREE.Vector3: .cross() now only accepts one argument. Use .crossVectors( a, b ) instead.',
          ),
          this.crossVectors(a, b))
        : this.crossVectors(this, a)
    },
    crossVectors: function (a, b) {
      var c = a.x,
        d = a.y
      a = a.z
      var f = b.x,
        g = b.y
      b = b.z
      this.x = d * b - a * g
      this.y = a * f - c * b
      this.z = c * g - d * f
      return this
    },
    projectOnVector: function (a) {
      var b = a.dot(this) / a.lengthSq()
      return this.copy(a).multiplyScalar(b)
    },
    projectOnPlane: function (a) {
      rh.copy(this).projectOnVector(a)
      return this.sub(rh)
    },
    reflect: function (a) {
      return this.sub(rh.copy(a).multiplyScalar(2 * this.dot(a)))
    },
    angleTo: function (a) {
      var b = Math.sqrt(this.lengthSq() * a.lengthSq())
      0 === b &&
        console.error(
          "THREE.Vector3: angleTo() can't handle zero length vectors.",
        )
      a = this.dot(a) / b
      return Math.acos(N.clamp(a, -1, 1))
    },
    distanceTo: function (a) {
      return Math.sqrt(this.distanceToSquared(a))
    },
    distanceToSquared: function (a) {
      var b = this.x - a.x,
        c = this.y - a.y
      a = this.z - a.z
      return b * b + c * c + a * a
    },
    manhattanDistanceTo: function (a) {
      return (
        Math.abs(this.x - a.x) + Math.abs(this.y - a.y) + Math.abs(this.z - a.z)
      )
    },
    setFromSpherical: function (a) {
      return this.setFromSphericalCoords(a.radius, a.phi, a.theta)
    },
    setFromSphericalCoords: function (a, b, c) {
      var d = Math.sin(b) * a
      this.x = d * Math.sin(c)
      this.y = Math.cos(b) * a
      this.z = d * Math.cos(c)
      return this
    },
    setFromCylindrical: function (a) {
      return this.setFromCylindricalCoords(a.radius, a.theta, a.y)
    },
    setFromCylindricalCoords: function (a, b, c) {
      this.x = a * Math.sin(b)
      this.y = c
      this.z = a * Math.cos(b)
      return this
    },
    setFromMatrixPosition: function (a) {
      a = a.elements
      this.x = a[12]
      this.y = a[13]
      this.z = a[14]
      return this
    },
    setFromMatrixScale: function (a) {
      var b = this.setFromMatrixColumn(a, 0).length(),
        c = this.setFromMatrixColumn(a, 1).length()
      a = this.setFromMatrixColumn(a, 2).length()
      this.x = b
      this.y = c
      this.z = a
      return this
    },
    setFromMatrixColumn: function (a, b) {
      return this.fromArray(a.elements, 4 * b)
    },
    equals: function (a) {
      return a.x === this.x && a.y === this.y && a.z === this.z
    },
    fromArray: function (a, b) {
      void 0 === b && (b = 0)
      this.x = a[b]
      this.y = a[b + 1]
      this.z = a[b + 2]
      return this
    },
    toArray: function (a, b) {
      void 0 === a && (a = [])
      void 0 === b && (b = 0)
      a[b] = this.x
      a[b + 1] = this.y
      a[b + 2] = this.z
      return a
    },
    fromBufferAttribute: function (a, b, c) {
      void 0 !== c &&
        console.warn(
          'THREE.Vector3: offset has been removed from .fromBufferAttribute().',
        )
      this.x = a.getX(b)
      this.y = a.getY(b)
      this.z = a.getZ(b)
      return this
    },
  })
  var Bc = new q()
  Object.assign(ka.prototype, {
    isMatrix3: !0,
    set: function (a, b, c, d, f, g, k, m, n) {
      var p = this.elements
      p[0] = a
      p[1] = d
      p[2] = k
      p[3] = b
      p[4] = f
      p[5] = m
      p[6] = c
      p[7] = g
      p[8] = n
      return this
    },
    identity: function () {
      this.set(1, 0, 0, 0, 1, 0, 0, 0, 1)
      return this
    },
    clone: function () {
      return new this.constructor().fromArray(this.elements)
    },
    copy: function (a) {
      var b = this.elements
      a = a.elements
      b[0] = a[0]
      b[1] = a[1]
      b[2] = a[2]
      b[3] = a[3]
      b[4] = a[4]
      b[5] = a[5]
      b[6] = a[6]
      b[7] = a[7]
      b[8] = a[8]
      return this
    },
    setFromMatrix4: function (a) {
      a = a.elements
      this.set(a[0], a[4], a[8], a[1], a[5], a[9], a[2], a[6], a[10])
      return this
    },
    applyToBufferAttribute: function (a) {
      for (var b = 0, c = a.count; b < c; b++)
        (Bc.x = a.getX(b)),
          (Bc.y = a.getY(b)),
          (Bc.z = a.getZ(b)),
          Bc.applyMatrix3(this),
          a.setXYZ(b, Bc.x, Bc.y, Bc.z)
      return a
    },
    multiply: function (a) {
      return this.multiplyMatrices(this, a)
    },
    premultiply: function (a) {
      return this.multiplyMatrices(a, this)
    },
    multiplyMatrices: function (a, b) {
      var c = a.elements,
        d = b.elements
      b = this.elements
      a = c[0]
      var f = c[3],
        g = c[6],
        k = c[1],
        m = c[4],
        n = c[7],
        p = c[2],
        l = c[5]
      c = c[8]
      var t = d[0],
        r = d[3],
        u = d[6],
        q = d[1],
        w = d[4],
        x = d[7],
        B = d[2],
        C = d[5]
      d = d[8]
      b[0] = a * t + f * q + g * B
      b[3] = a * r + f * w + g * C
      b[6] = a * u + f * x + g * d
      b[1] = k * t + m * q + n * B
      b[4] = k * r + m * w + n * C
      b[7] = k * u + m * x + n * d
      b[2] = p * t + l * q + c * B
      b[5] = p * r + l * w + c * C
      b[8] = p * u + l * x + c * d
      return this
    },
    multiplyScalar: function (a) {
      var b = this.elements
      b[0] *= a
      b[3] *= a
      b[6] *= a
      b[1] *= a
      b[4] *= a
      b[7] *= a
      b[2] *= a
      b[5] *= a
      b[8] *= a
      return this
    },
    determinant: function () {
      var a = this.elements,
        b = a[0],
        c = a[1],
        d = a[2],
        f = a[3],
        g = a[4],
        k = a[5],
        m = a[6],
        n = a[7]
      a = a[8]
      return (
        b * g * a - b * k * n - c * f * a + c * k * m + d * f * n - d * g * m
      )
    },
    getInverse: function (a, b) {
      a &&
        a.isMatrix4 &&
        console.error(
          'THREE.Matrix3: .getInverse() no longer takes a Matrix4 argument.',
        )
      var c = a.elements
      a = this.elements
      var d = c[0],
        f = c[1],
        g = c[2],
        k = c[3],
        m = c[4],
        n = c[5],
        p = c[6],
        l = c[7]
      c = c[8]
      var t = c * m - n * l,
        r = n * p - c * k,
        u = l * k - m * p,
        q = d * t + f * r + g * u
      if (0 === q) {
        if (!0 === b)
          throw Error(
            "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0",
          )
        console.warn(
          "THREE.Matrix3: .getInverse() can't invert matrix, determinant is 0",
        )
        return this.identity()
      }
      b = 1 / q
      a[0] = t * b
      a[1] = (g * l - c * f) * b
      a[2] = (n * f - g * m) * b
      a[3] = r * b
      a[4] = (c * d - g * p) * b
      a[5] = (g * k - n * d) * b
      a[6] = u * b
      a[7] = (f * p - l * d) * b
      a[8] = (m * d - f * k) * b
      return this
    },
    transpose: function () {
      var a = this.elements
      var b = a[1]
      a[1] = a[3]
      a[3] = b
      b = a[2]
      a[2] = a[6]
      a[6] = b
      b = a[5]
      a[5] = a[7]
      a[7] = b
      return this
    },
    getNormalMatrix: function (a) {
      return this.setFromMatrix4(a).getInverse(this).transpose()
    },
    transposeIntoArray: function (a) {
      var b = this.elements
      a[0] = b[0]
      a[1] = b[3]
      a[2] = b[6]
      a[3] = b[1]
      a[4] = b[4]
      a[5] = b[7]
      a[6] = b[2]
      a[7] = b[5]
      a[8] = b[8]
      return this
    },
    setUvTransform: function (a, b, c, d, f, g, k) {
      var m = Math.cos(f)
      f = Math.sin(f)
      this.set(
        c * m,
        c * f,
        -c * (m * g + f * k) + g + a,
        -d * f,
        d * m,
        -d * (-f * g + m * k) + k + b,
        0,
        0,
        1,
      )
    },
    scale: function (a, b) {
      var c = this.elements
      c[0] *= a
      c[3] *= a
      c[6] *= a
      c[1] *= b
      c[4] *= b
      c[7] *= b
      return this
    },
    rotate: function (a) {
      var b = Math.cos(a)
      a = Math.sin(a)
      var c = this.elements,
        d = c[0],
        f = c[3],
        g = c[6],
        k = c[1],
        m = c[4],
        n = c[7]
      c[0] = b * d + a * k
      c[3] = b * f + a * m
      c[6] = b * g + a * n
      c[1] = -a * d + b * k
      c[4] = -a * f + b * m
      c[7] = -a * g + b * n
      return this
    },
    translate: function (a, b) {
      var c = this.elements
      c[0] += a * c[2]
      c[3] += a * c[5]
      c[6] += a * c[8]
      c[1] += b * c[2]
      c[4] += b * c[5]
      c[7] += b * c[8]
      return this
    },
    equals: function (a) {
      var b = this.elements
      a = a.elements
      for (var c = 0; 9 > c; c++) if (b[c] !== a[c]) return !1
      return !0
    },
    fromArray: function (a, b) {
      void 0 === b && (b = 0)
      for (var c = 0; 9 > c; c++) this.elements[c] = a[c + b]
      return this
    },
    toArray: function (a, b) {
      void 0 === a && (a = [])
      void 0 === b && (b = 0)
      var c = this.elements
      a[b] = c[0]
      a[b + 1] = c[1]
      a[b + 2] = c[2]
      a[b + 3] = c[3]
      a[b + 4] = c[4]
      a[b + 5] = c[5]
      a[b + 6] = c[6]
      a[b + 7] = c[7]
      a[b + 8] = c[8]
      return a
    },
  })
  var Ad,
    Qb = {
      getDataURL: function (a) {
        if ('undefined' == typeof HTMLCanvasElement) return a.src
        if (!(a instanceof HTMLCanvasElement)) {
          void 0 === Ad &&
            (Ad = V.createElementNS('http://www.w3.org/1999/xhtml', 'canvas'))
          Ad.width = a.width
          Ad.height = a.height
          var b = Ad.getContext('2d')
          a instanceof ImageData
            ? b.putImageData(a, 0, 0)
            : b.drawImage(a, 0, 0, a.width, a.height)
          a = Ad
        }
        return 2048 < a.width || 2048 < a.height
          ? a.toDataURL('image/jpeg', 0.6)
          : a.toDataURL('image/png')
      },
    },
    Oj = 0
  S.DEFAULT_IMAGE = void 0
  S.DEFAULT_MAPPING = 300
  S.prototype = Object.assign(Object.create(Ra.prototype), {
    constructor: S,
    isTexture: !0,
    updateMatrix: function () {
      this.matrix.setUvTransform(
        this.offset.x,
        this.offset.y,
        this.repeat.x,
        this.repeat.y,
        this.rotation,
        this.center.x,
        this.center.y,
      )
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.name = a.name
      this.image = a.image
      this.mipmaps = a.mipmaps.slice(0)
      this.mapping = a.mapping
      this.wrapS = a.wrapS
      this.wrapT = a.wrapT
      this.magFilter = a.magFilter
      this.minFilter = a.minFilter
      this.anisotropy = a.anisotropy
      this.format = a.format
      this.type = a.type
      this.offset.copy(a.offset)
      this.repeat.copy(a.repeat)
      this.center.copy(a.center)
      this.rotation = a.rotation
      this.matrixAutoUpdate = a.matrixAutoUpdate
      this.matrix.copy(a.matrix)
      this.generateMipmaps = a.generateMipmaps
      this.premultiplyAlpha = a.premultiplyAlpha
      this.flipY = a.flipY
      this.unpackAlignment = a.unpackAlignment
      this.encoding = a.encoding
      return this
    },
    toJSON: function (a) {
      var b = void 0 === a || 'string' === typeof a
      if (!b && void 0 !== a.textures[this.uuid]) return a.textures[this.uuid]
      var c = {
        metadata: {
          version: 4.5,
          type: 'Texture',
          generator: 'Texture.toJSON',
        },
        uuid: this.uuid,
        name: this.name,
        mapping: this.mapping,
        repeat: [this.repeat.x, this.repeat.y],
        offset: [this.offset.x, this.offset.y],
        center: [this.center.x, this.center.y],
        rotation: this.rotation,
        wrap: [this.wrapS, this.wrapT],
        format: this.format,
        type: this.type,
        encoding: this.encoding,
        minFilter: this.minFilter,
        magFilter: this.magFilter,
        anisotropy: this.anisotropy,
        flipY: this.flipY,
        premultiplyAlpha: this.premultiplyAlpha,
        unpackAlignment: this.unpackAlignment,
      }
      if (void 0 !== this.image) {
        var d = this.image
        void 0 === d.uuid && (d.uuid = N.generateUUID())
        if (!b && void 0 === a.images[d.uuid]) {
          if (Array.isArray(d)) {
            var f = []
            for (var g = 0, k = d.length; g < k; g++)
              f.push(Qb.getDataURL(d[g]))
          } else f = Qb.getDataURL(d)
          a.images[d.uuid] = { uuid: d.uuid, url: f }
        }
        c.image = d.uuid
      }
      b || (a.textures[this.uuid] = c)
      return c
    },
    dispose: function () {
      this.dispatchEvent({ type: 'dispose' })
    },
    transformUv: function (a) {
      if (300 !== this.mapping) return a
      a.applyMatrix3(this.matrix)
      if (0 > a.x || 1 < a.x)
        switch (this.wrapS) {
          case 1e3:
            a.x -= Math.floor(a.x)
            break
          case 1001:
            a.x = 0 > a.x ? 0 : 1
            break
          case 1002:
            a.x =
              1 === Math.abs(Math.floor(a.x) % 2)
                ? Math.ceil(a.x) - a.x
                : a.x - Math.floor(a.x)
        }
      if (0 > a.y || 1 < a.y)
        switch (this.wrapT) {
          case 1e3:
            a.y -= Math.floor(a.y)
            break
          case 1001:
            a.y = 0 > a.y ? 0 : 1
            break
          case 1002:
            a.y =
              1 === Math.abs(Math.floor(a.y) % 2)
                ? Math.ceil(a.y) - a.y
                : a.y - Math.floor(a.y)
        }
      this.flipY && (a.y = 1 - a.y)
      return a
    },
  })
  Object.defineProperty(S.prototype, 'needsUpdate', {
    set: function (a) {
      !0 === a && this.version++
    },
  })
  Object.defineProperties(ca.prototype, {
    width: {
      get: function () {
        return this.z
      },
      set: function (a) {
        this.z = a
      },
    },
    height: {
      get: function () {
        return this.w
      },
      set: function (a) {
        this.w = a
      },
    },
  })
  Object.assign(ca.prototype, {
    isVector4: !0,
    set: function (a, b, c, d) {
      this.x = a
      this.y = b
      this.z = c
      this.w = d
      return this
    },
    setScalar: function (a) {
      this.w = this.z = this.y = this.x = a
      return this
    },
    setX: function (a) {
      this.x = a
      return this
    },
    setY: function (a) {
      this.y = a
      return this
    },
    setZ: function (a) {
      this.z = a
      return this
    },
    setW: function (a) {
      this.w = a
      return this
    },
    setComponent: function (a, b) {
      switch (a) {
        case 0:
          this.x = b
          break
        case 1:
          this.y = b
          break
        case 2:
          this.z = b
          break
        case 3:
          this.w = b
          break
        default:
          throw Error('index is out of range: ' + a)
      }
      return this
    },
    getComponent: function (a) {
      switch (a) {
        case 0:
          return this.x
        case 1:
          return this.y
        case 2:
          return this.z
        case 3:
          return this.w
        default:
          throw Error('index is out of range: ' + a)
      }
    },
    clone: function () {
      return new this.constructor(this.x, this.y, this.z, this.w)
    },
    copy: function (a) {
      this.x = a.x
      this.y = a.y
      this.z = a.z
      this.w = void 0 !== a.w ? a.w : 1
      return this
    },
    add: function (a, b) {
      if (void 0 !== b)
        return (
          console.warn(
            'THREE.Vector4: .add() now only accepts one argument. Use .addVectors( a, b ) instead.',
          ),
          this.addVectors(a, b)
        )
      this.x += a.x
      this.y += a.y
      this.z += a.z
      this.w += a.w
      return this
    },
    addScalar: function (a) {
      this.x += a
      this.y += a
      this.z += a
      this.w += a
      return this
    },
    addVectors: function (a, b) {
      this.x = a.x + b.x
      this.y = a.y + b.y
      this.z = a.z + b.z
      this.w = a.w + b.w
      return this
    },
    addScaledVector: function (a, b) {
      this.x += a.x * b
      this.y += a.y * b
      this.z += a.z * b
      this.w += a.w * b
      return this
    },
    sub: function (a, b) {
      if (void 0 !== b)
        return (
          console.warn(
            'THREE.Vector4: .sub() now only accepts one argument. Use .subVectors( a, b ) instead.',
          ),
          this.subVectors(a, b)
        )
      this.x -= a.x
      this.y -= a.y
      this.z -= a.z
      this.w -= a.w
      return this
    },
    subScalar: function (a) {
      this.x -= a
      this.y -= a
      this.z -= a
      this.w -= a
      return this
    },
    subVectors: function (a, b) {
      this.x = a.x - b.x
      this.y = a.y - b.y
      this.z = a.z - b.z
      this.w = a.w - b.w
      return this
    },
    multiplyScalar: function (a) {
      this.x *= a
      this.y *= a
      this.z *= a
      this.w *= a
      return this
    },
    applyMatrix4: function (a) {
      var b = this.x,
        c = this.y,
        d = this.z,
        f = this.w
      a = a.elements
      this.x = a[0] * b + a[4] * c + a[8] * d + a[12] * f
      this.y = a[1] * b + a[5] * c + a[9] * d + a[13] * f
      this.z = a[2] * b + a[6] * c + a[10] * d + a[14] * f
      this.w = a[3] * b + a[7] * c + a[11] * d + a[15] * f
      return this
    },
    divideScalar: function (a) {
      return this.multiplyScalar(1 / a)
    },
    setAxisAngleFromQuaternion: function (a) {
      this.w = 2 * Math.acos(a.w)
      var b = Math.sqrt(1 - a.w * a.w)
      1e-4 > b
        ? ((this.x = 1), (this.z = this.y = 0))
        : ((this.x = a.x / b), (this.y = a.y / b), (this.z = a.z / b))
      return this
    },
    setAxisAngleFromRotationMatrix: function (a) {
      a = a.elements
      var b = a[0]
      var c = a[4]
      var d = a[8],
        f = a[1],
        g = a[5],
        k = a[9]
      var m = a[2]
      var n = a[6]
      var p = a[10]
      if (
        0.01 > Math.abs(c - f) &&
        0.01 > Math.abs(d - m) &&
        0.01 > Math.abs(k - n)
      ) {
        if (
          0.1 > Math.abs(c + f) &&
          0.1 > Math.abs(d + m) &&
          0.1 > Math.abs(k + n) &&
          0.1 > Math.abs(b + g + p - 3)
        )
          return this.set(1, 0, 0, 0), this
        a = Math.PI
        b = (b + 1) / 2
        g = (g + 1) / 2
        p = (p + 1) / 2
        c = (c + f) / 4
        d = (d + m) / 4
        k = (k + n) / 4
        b > g && b > p
          ? 0.01 > b
            ? ((n = 0), (c = m = 0.707106781))
            : ((n = Math.sqrt(b)), (m = c / n), (c = d / n))
          : g > p
          ? 0.01 > g
            ? ((n = 0.707106781), (m = 0), (c = 0.707106781))
            : ((m = Math.sqrt(g)), (n = c / m), (c = k / m))
          : 0.01 > p
          ? ((m = n = 0.707106781), (c = 0))
          : ((c = Math.sqrt(p)), (n = d / c), (m = k / c))
        this.set(n, m, c, a)
        return this
      }
      a = Math.sqrt((n - k) * (n - k) + (d - m) * (d - m) + (f - c) * (f - c))
      0.001 > Math.abs(a) && (a = 1)
      this.x = (n - k) / a
      this.y = (d - m) / a
      this.z = (f - c) / a
      this.w = Math.acos((b + g + p - 1) / 2)
      return this
    },
    min: function (a) {
      this.x = Math.min(this.x, a.x)
      this.y = Math.min(this.y, a.y)
      this.z = Math.min(this.z, a.z)
      this.w = Math.min(this.w, a.w)
      return this
    },
    max: function (a) {
      this.x = Math.max(this.x, a.x)
      this.y = Math.max(this.y, a.y)
      this.z = Math.max(this.z, a.z)
      this.w = Math.max(this.w, a.w)
      return this
    },
    clamp: function (a, b) {
      this.x = Math.max(a.x, Math.min(b.x, this.x))
      this.y = Math.max(a.y, Math.min(b.y, this.y))
      this.z = Math.max(a.z, Math.min(b.z, this.z))
      this.w = Math.max(a.w, Math.min(b.w, this.w))
      return this
    },
    clampScalar: function (a, b) {
      this.x = Math.max(a, Math.min(b, this.x))
      this.y = Math.max(a, Math.min(b, this.y))
      this.z = Math.max(a, Math.min(b, this.z))
      this.w = Math.max(a, Math.min(b, this.w))
      return this
    },
    clampLength: function (a, b) {
      var c = this.length()
      return this.divideScalar(c || 1).multiplyScalar(
        Math.max(a, Math.min(b, c)),
      )
    },
    floor: function () {
      this.x = Math.floor(this.x)
      this.y = Math.floor(this.y)
      this.z = Math.floor(this.z)
      this.w = Math.floor(this.w)
      return this
    },
    ceil: function () {
      this.x = Math.ceil(this.x)
      this.y = Math.ceil(this.y)
      this.z = Math.ceil(this.z)
      this.w = Math.ceil(this.w)
      return this
    },
    round: function () {
      this.x = Math.round(this.x)
      this.y = Math.round(this.y)
      this.z = Math.round(this.z)
      this.w = Math.round(this.w)
      return this
    },
    roundToZero: function () {
      this.x = 0 > this.x ? Math.ceil(this.x) : Math.floor(this.x)
      this.y = 0 > this.y ? Math.ceil(this.y) : Math.floor(this.y)
      this.z = 0 > this.z ? Math.ceil(this.z) : Math.floor(this.z)
      this.w = 0 > this.w ? Math.ceil(this.w) : Math.floor(this.w)
      return this
    },
    negate: function () {
      this.x = -this.x
      this.y = -this.y
      this.z = -this.z
      this.w = -this.w
      return this
    },
    dot: function (a) {
      return this.x * a.x + this.y * a.y + this.z * a.z + this.w * a.w
    },
    lengthSq: function () {
      return (
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w
      )
    },
    length: function () {
      return Math.sqrt(
        this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w,
      )
    },
    manhattanLength: function () {
      return (
        Math.abs(this.x) +
        Math.abs(this.y) +
        Math.abs(this.z) +
        Math.abs(this.w)
      )
    },
    normalize: function () {
      return this.divideScalar(this.length() || 1)
    },
    setLength: function (a) {
      return this.normalize().multiplyScalar(a)
    },
    lerp: function (a, b) {
      this.x += (a.x - this.x) * b
      this.y += (a.y - this.y) * b
      this.z += (a.z - this.z) * b
      this.w += (a.w - this.w) * b
      return this
    },
    lerpVectors: function (a, b, c) {
      return this.subVectors(b, a).multiplyScalar(c).add(a)
    },
    equals: function (a) {
      return (
        a.x === this.x && a.y === this.y && a.z === this.z && a.w === this.w
      )
    },
    fromArray: function (a, b) {
      void 0 === b && (b = 0)
      this.x = a[b]
      this.y = a[b + 1]
      this.z = a[b + 2]
      this.w = a[b + 3]
      return this
    },
    toArray: function (a, b) {
      void 0 === a && (a = [])
      void 0 === b && (b = 0)
      a[b] = this.x
      a[b + 1] = this.y
      a[b + 2] = this.z
      a[b + 3] = this.w
      return a
    },
    fromBufferAttribute: function (a, b, c) {
      void 0 !== c &&
        console.warn(
          'THREE.Vector4: offset has been removed from .fromBufferAttribute().',
        )
      this.x = a.getX(b)
      this.y = a.getY(b)
      this.z = a.getZ(b)
      this.w = a.getW(b)
      return this
    },
  })
  sa.prototype = Object.assign(Object.create(Ra.prototype), {
    constructor: sa,
    isWebGLRenderTarget: !0,
    setSize: function (a, b) {
      if (this.width !== a || this.height !== b)
        (this.width = a),
          (this.height = b),
          (this.texture.image.width = a),
          (this.texture.image.height = b),
          this.dispose()
      this.viewport.set(0, 0, a, b)
      this.scissor.set(0, 0, a, b)
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.width = a.width
      this.height = a.height
      this.viewport.copy(a.viewport)
      this.texture = a.texture.clone()
      this.depthBuffer = a.depthBuffer
      this.stencilBuffer = a.stencilBuffer
      this.depthTexture = a.depthTexture
      return this
    },
    dispose: function () {
      this.dispatchEvent({ type: 'dispose' })
    },
  })
  qg.prototype = Object.assign(Object.create(sa.prototype), {
    constructor: qg,
    isWebGLMultisampleRenderTarget: !0,
    copy: function (a) {
      sa.prototype.copy.call(this, a)
      this.samples = a.samples
      return this
    },
  })
  var Na = new q(),
    ea = new I(),
    Bl = new q(0, 0, 0),
    Cl = new q(1, 1, 1),
    Rb = new q(),
    Pf = new q(),
    Da = new q()
  Object.assign(I.prototype, {
    isMatrix4: !0,
    set: function (a, b, c, d, f, g, k, m, n, p, l, t, r, u, q, w) {
      var y = this.elements
      y[0] = a
      y[4] = b
      y[8] = c
      y[12] = d
      y[1] = f
      y[5] = g
      y[9] = k
      y[13] = m
      y[2] = n
      y[6] = p
      y[10] = l
      y[14] = t
      y[3] = r
      y[7] = u
      y[11] = q
      y[15] = w
      return this
    },
    identity: function () {
      this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
      return this
    },
    clone: function () {
      return new I().fromArray(this.elements)
    },
    copy: function (a) {
      var b = this.elements
      a = a.elements
      b[0] = a[0]
      b[1] = a[1]
      b[2] = a[2]
      b[3] = a[3]
      b[4] = a[4]
      b[5] = a[5]
      b[6] = a[6]
      b[7] = a[7]
      b[8] = a[8]
      b[9] = a[9]
      b[10] = a[10]
      b[11] = a[11]
      b[12] = a[12]
      b[13] = a[13]
      b[14] = a[14]
      b[15] = a[15]
      return this
    },
    copyPosition: function (a) {
      var b = this.elements
      a = a.elements
      b[12] = a[12]
      b[13] = a[13]
      b[14] = a[14]
      return this
    },
    extractBasis: function (a, b, c) {
      a.setFromMatrixColumn(this, 0)
      b.setFromMatrixColumn(this, 1)
      c.setFromMatrixColumn(this, 2)
      return this
    },
    makeBasis: function (a, b, c) {
      this.set(a.x, b.x, c.x, 0, a.y, b.y, c.y, 0, a.z, b.z, c.z, 0, 0, 0, 0, 1)
      return this
    },
    extractRotation: function (a) {
      var b = this.elements,
        c = a.elements,
        d = 1 / Na.setFromMatrixColumn(a, 0).length(),
        f = 1 / Na.setFromMatrixColumn(a, 1).length()
      a = 1 / Na.setFromMatrixColumn(a, 2).length()
      b[0] = c[0] * d
      b[1] = c[1] * d
      b[2] = c[2] * d
      b[3] = 0
      b[4] = c[4] * f
      b[5] = c[5] * f
      b[6] = c[6] * f
      b[7] = 0
      b[8] = c[8] * a
      b[9] = c[9] * a
      b[10] = c[10] * a
      b[11] = 0
      b[12] = 0
      b[13] = 0
      b[14] = 0
      b[15] = 1
      return this
    },
    makeRotationFromEuler: function (a) {
      ;(a && a.isEuler) ||
        console.error(
          'THREE.Matrix4: .makeRotationFromEuler() now expects a Euler rotation rather than a Vector3 and order.',
        )
      var b = this.elements,
        c = a.x,
        d = a.y,
        f = a.z,
        g = Math.cos(c)
      c = Math.sin(c)
      var k = Math.cos(d)
      d = Math.sin(d)
      var m = Math.cos(f)
      f = Math.sin(f)
      if ('XYZ' === a.order) {
        a = g * m
        var n = g * f,
          p = c * m,
          l = c * f
        b[0] = k * m
        b[4] = -k * f
        b[8] = d
        b[1] = n + p * d
        b[5] = a - l * d
        b[9] = -c * k
        b[2] = l - a * d
        b[6] = p + n * d
        b[10] = g * k
      } else
        'YXZ' === a.order
          ? ((a = k * m),
            (n = k * f),
            (p = d * m),
            (l = d * f),
            (b[0] = a + l * c),
            (b[4] = p * c - n),
            (b[8] = g * d),
            (b[1] = g * f),
            (b[5] = g * m),
            (b[9] = -c),
            (b[2] = n * c - p),
            (b[6] = l + a * c),
            (b[10] = g * k))
          : 'ZXY' === a.order
          ? ((a = k * m),
            (n = k * f),
            (p = d * m),
            (l = d * f),
            (b[0] = a - l * c),
            (b[4] = -g * f),
            (b[8] = p + n * c),
            (b[1] = n + p * c),
            (b[5] = g * m),
            (b[9] = l - a * c),
            (b[2] = -g * d),
            (b[6] = c),
            (b[10] = g * k))
          : 'ZYX' === a.order
          ? ((a = g * m),
            (n = g * f),
            (p = c * m),
            (l = c * f),
            (b[0] = k * m),
            (b[4] = p * d - n),
            (b[8] = a * d + l),
            (b[1] = k * f),
            (b[5] = l * d + a),
            (b[9] = n * d - p),
            (b[2] = -d),
            (b[6] = c * k),
            (b[10] = g * k))
          : 'YZX' === a.order
          ? ((a = g * k),
            (n = g * d),
            (p = c * k),
            (l = c * d),
            (b[0] = k * m),
            (b[4] = l - a * f),
            (b[8] = p * f + n),
            (b[1] = f),
            (b[5] = g * m),
            (b[9] = -c * m),
            (b[2] = -d * m),
            (b[6] = n * f + p),
            (b[10] = a - l * f))
          : 'XZY' === a.order &&
            ((a = g * k),
            (n = g * d),
            (p = c * k),
            (l = c * d),
            (b[0] = k * m),
            (b[4] = -f),
            (b[8] = d * m),
            (b[1] = a * f + l),
            (b[5] = g * m),
            (b[9] = n * f - p),
            (b[2] = p * f - n),
            (b[6] = c * m),
            (b[10] = l * f + a))
      b[3] = 0
      b[7] = 0
      b[11] = 0
      b[12] = 0
      b[13] = 0
      b[14] = 0
      b[15] = 1
      return this
    },
    makeRotationFromQuaternion: function (a) {
      return this.compose(Bl, a, Cl)
    },
    lookAt: function (a, b, c) {
      var d = this.elements
      Da.subVectors(a, b)
      0 === Da.lengthSq() && (Da.z = 1)
      Da.normalize()
      Rb.crossVectors(c, Da)
      0 === Rb.lengthSq() &&
        (1 === Math.abs(c.z) ? (Da.x += 1e-4) : (Da.z += 1e-4),
        Da.normalize(),
        Rb.crossVectors(c, Da))
      Rb.normalize()
      Pf.crossVectors(Da, Rb)
      d[0] = Rb.x
      d[4] = Pf.x
      d[8] = Da.x
      d[1] = Rb.y
      d[5] = Pf.y
      d[9] = Da.y
      d[2] = Rb.z
      d[6] = Pf.z
      d[10] = Da.z
      return this
    },
    multiply: function (a, b) {
      return void 0 !== b
        ? (console.warn(
            'THREE.Matrix4: .multiply() now only accepts one argument. Use .multiplyMatrices( a, b ) instead.',
          ),
          this.multiplyMatrices(a, b))
        : this.multiplyMatrices(this, a)
    },
    premultiply: function (a) {
      return this.multiplyMatrices(a, this)
    },
    multiplyMatrices: function (a, b) {
      var c = a.elements,
        d = b.elements
      b = this.elements
      a = c[0]
      var f = c[4],
        g = c[8],
        k = c[12],
        m = c[1],
        n = c[5],
        p = c[9],
        l = c[13],
        t = c[2],
        r = c[6],
        q = c[10],
        v = c[14],
        w = c[3],
        x = c[7],
        B = c[11]
      c = c[15]
      var C = d[0],
        A = d[4],
        z = d[8],
        D = d[12],
        E = d[1],
        F = d[5],
        H = d[9],
        G = d[13],
        I = d[2],
        K = d[6],
        M = d[10],
        N = d[14],
        O = d[3],
        P = d[7],
        Q = d[11]
      d = d[15]
      b[0] = a * C + f * E + g * I + k * O
      b[4] = a * A + f * F + g * K + k * P
      b[8] = a * z + f * H + g * M + k * Q
      b[12] = a * D + f * G + g * N + k * d
      b[1] = m * C + n * E + p * I + l * O
      b[5] = m * A + n * F + p * K + l * P
      b[9] = m * z + n * H + p * M + l * Q
      b[13] = m * D + n * G + p * N + l * d
      b[2] = t * C + r * E + q * I + v * O
      b[6] = t * A + r * F + q * K + v * P
      b[10] = t * z + r * H + q * M + v * Q
      b[14] = t * D + r * G + q * N + v * d
      b[3] = w * C + x * E + B * I + c * O
      b[7] = w * A + x * F + B * K + c * P
      b[11] = w * z + x * H + B * M + c * Q
      b[15] = w * D + x * G + B * N + c * d
      return this
    },
    multiplyScalar: function (a) {
      var b = this.elements
      b[0] *= a
      b[4] *= a
      b[8] *= a
      b[12] *= a
      b[1] *= a
      b[5] *= a
      b[9] *= a
      b[13] *= a
      b[2] *= a
      b[6] *= a
      b[10] *= a
      b[14] *= a
      b[3] *= a
      b[7] *= a
      b[11] *= a
      b[15] *= a
      return this
    },
    applyToBufferAttribute: function (a) {
      for (var b = 0, c = a.count; b < c; b++)
        (Na.x = a.getX(b)),
          (Na.y = a.getY(b)),
          (Na.z = a.getZ(b)),
          Na.applyMatrix4(this),
          a.setXYZ(b, Na.x, Na.y, Na.z)
      return a
    },
    determinant: function () {
      var a = this.elements,
        b = a[0],
        c = a[4],
        d = a[8],
        f = a[12],
        g = a[1],
        k = a[5],
        m = a[9],
        n = a[13],
        p = a[2],
        l = a[6],
        t = a[10],
        r = a[14]
      return (
        a[3] *
          (+f * m * l -
            d * n * l -
            f * k * t +
            c * n * t +
            d * k * r -
            c * m * r) +
        a[7] *
          (+b * m * r -
            b * n * t +
            f * g * t -
            d * g * r +
            d * n * p -
            f * m * p) +
        a[11] *
          (+b * n * l -
            b * k * r -
            f * g * l +
            c * g * r +
            f * k * p -
            c * n * p) +
        a[15] *
          (-d * k * p -
            b * m * l +
            b * k * t +
            d * g * l -
            c * g * t +
            c * m * p)
      )
    },
    transpose: function () {
      var a = this.elements
      var b = a[1]
      a[1] = a[4]
      a[4] = b
      b = a[2]
      a[2] = a[8]
      a[8] = b
      b = a[6]
      a[6] = a[9]
      a[9] = b
      b = a[3]
      a[3] = a[12]
      a[12] = b
      b = a[7]
      a[7] = a[13]
      a[13] = b
      b = a[11]
      a[11] = a[14]
      a[14] = b
      return this
    },
    setPosition: function (a, b, c) {
      var d = this.elements
      a.isVector3
        ? ((d[12] = a.x), (d[13] = a.y), (d[14] = a.z))
        : ((d[12] = a), (d[13] = b), (d[14] = c))
      return this
    },
    getInverse: function (a, b) {
      var c = this.elements,
        d = a.elements
      a = d[0]
      var f = d[1],
        g = d[2],
        k = d[3],
        m = d[4],
        n = d[5],
        p = d[6],
        l = d[7],
        t = d[8],
        r = d[9],
        q = d[10],
        v = d[11],
        w = d[12],
        x = d[13],
        B = d[14]
      d = d[15]
      var C =
          r * B * l - x * q * l + x * p * v - n * B * v - r * p * d + n * q * d,
        A =
          w * q * l - t * B * l - w * p * v + m * B * v + t * p * d - m * q * d,
        z =
          t * x * l - w * r * l + w * n * v - m * x * v - t * n * d + m * r * d,
        D =
          w * r * p - t * x * p - w * n * q + m * x * q + t * n * B - m * r * B,
        E = a * C + f * A + g * z + k * D
      if (0 === E) {
        if (!0 === b)
          throw Error(
            "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0",
          )
        console.warn(
          "THREE.Matrix4: .getInverse() can't invert matrix, determinant is 0",
        )
        return this.identity()
      }
      b = 1 / E
      c[0] = C * b
      c[1] =
        (x * q * k -
          r * B * k -
          x * g * v +
          f * B * v +
          r * g * d -
          f * q * d) *
        b
      c[2] =
        (n * B * k -
          x * p * k +
          x * g * l -
          f * B * l -
          n * g * d +
          f * p * d) *
        b
      c[3] =
        (r * p * k -
          n * q * k -
          r * g * l +
          f * q * l +
          n * g * v -
          f * p * v) *
        b
      c[4] = A * b
      c[5] =
        (t * B * k -
          w * q * k +
          w * g * v -
          a * B * v -
          t * g * d +
          a * q * d) *
        b
      c[6] =
        (w * p * k -
          m * B * k -
          w * g * l +
          a * B * l +
          m * g * d -
          a * p * d) *
        b
      c[7] =
        (m * q * k -
          t * p * k +
          t * g * l -
          a * q * l -
          m * g * v +
          a * p * v) *
        b
      c[8] = z * b
      c[9] =
        (w * r * k -
          t * x * k -
          w * f * v +
          a * x * v +
          t * f * d -
          a * r * d) *
        b
      c[10] =
        (m * x * k -
          w * n * k +
          w * f * l -
          a * x * l -
          m * f * d +
          a * n * d) *
        b
      c[11] =
        (t * n * k -
          m * r * k -
          t * f * l +
          a * r * l +
          m * f * v -
          a * n * v) *
        b
      c[12] = D * b
      c[13] =
        (t * x * g -
          w * r * g +
          w * f * q -
          a * x * q -
          t * f * B +
          a * r * B) *
        b
      c[14] =
        (w * n * g -
          m * x * g -
          w * f * p +
          a * x * p +
          m * f * B -
          a * n * B) *
        b
      c[15] =
        (m * r * g -
          t * n * g +
          t * f * p -
          a * r * p -
          m * f * q +
          a * n * q) *
        b
      return this
    },
    scale: function (a) {
      var b = this.elements,
        c = a.x,
        d = a.y
      a = a.z
      b[0] *= c
      b[4] *= d
      b[8] *= a
      b[1] *= c
      b[5] *= d
      b[9] *= a
      b[2] *= c
      b[6] *= d
      b[10] *= a
      b[3] *= c
      b[7] *= d
      b[11] *= a
      return this
    },
    getMaxScaleOnAxis: function () {
      var a = this.elements
      return Math.sqrt(
        Math.max(
          a[0] * a[0] + a[1] * a[1] + a[2] * a[2],
          a[4] * a[4] + a[5] * a[5] + a[6] * a[6],
          a[8] * a[8] + a[9] * a[9] + a[10] * a[10],
        ),
      )
    },
    makeTranslation: function (a, b, c) {
      this.set(1, 0, 0, a, 0, 1, 0, b, 0, 0, 1, c, 0, 0, 0, 1)
      return this
    },
    makeRotationX: function (a) {
      var b = Math.cos(a)
      a = Math.sin(a)
      this.set(1, 0, 0, 0, 0, b, -a, 0, 0, a, b, 0, 0, 0, 0, 1)
      return this
    },
    makeRotationY: function (a) {
      var b = Math.cos(a)
      a = Math.sin(a)
      this.set(b, 0, a, 0, 0, 1, 0, 0, -a, 0, b, 0, 0, 0, 0, 1)
      return this
    },
    makeRotationZ: function (a) {
      var b = Math.cos(a)
      a = Math.sin(a)
      this.set(b, -a, 0, 0, a, b, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
      return this
    },
    makeRotationAxis: function (a, b) {
      var c = Math.cos(b)
      b = Math.sin(b)
      var d = 1 - c,
        f = a.x,
        g = a.y
      a = a.z
      var k = d * f,
        m = d * g
      this.set(
        k * f + c,
        k * g - b * a,
        k * a + b * g,
        0,
        k * g + b * a,
        m * g + c,
        m * a - b * f,
        0,
        k * a - b * g,
        m * a + b * f,
        d * a * a + c,
        0,
        0,
        0,
        0,
        1,
      )
      return this
    },
    makeScale: function (a, b, c) {
      this.set(a, 0, 0, 0, 0, b, 0, 0, 0, 0, c, 0, 0, 0, 0, 1)
      return this
    },
    makeShear: function (a, b, c) {
      this.set(1, b, c, 0, a, 1, c, 0, a, b, 1, 0, 0, 0, 0, 1)
      return this
    },
    compose: function (a, b, c) {
      var d = this.elements,
        f = b._x,
        g = b._y,
        k = b._z,
        m = b._w,
        n = f + f,
        l = g + g,
        q = k + k
      b = f * n
      var t = f * l
      f *= q
      var r = g * l
      g *= q
      k *= q
      n *= m
      l *= m
      m *= q
      q = c.x
      var u = c.y
      c = c.z
      d[0] = (1 - (r + k)) * q
      d[1] = (t + m) * q
      d[2] = (f - l) * q
      d[3] = 0
      d[4] = (t - m) * u
      d[5] = (1 - (b + k)) * u
      d[6] = (g + n) * u
      d[7] = 0
      d[8] = (f + l) * c
      d[9] = (g - n) * c
      d[10] = (1 - (b + r)) * c
      d[11] = 0
      d[12] = a.x
      d[13] = a.y
      d[14] = a.z
      d[15] = 1
      return this
    },
    decompose: function (a, b, c) {
      var d = this.elements,
        f = Na.set(d[0], d[1], d[2]).length(),
        g = Na.set(d[4], d[5], d[6]).length(),
        k = Na.set(d[8], d[9], d[10]).length()
      0 > this.determinant() && (f = -f)
      a.x = d[12]
      a.y = d[13]
      a.z = d[14]
      ea.copy(this)
      a = 1 / f
      d = 1 / g
      var m = 1 / k
      ea.elements[0] *= a
      ea.elements[1] *= a
      ea.elements[2] *= a
      ea.elements[4] *= d
      ea.elements[5] *= d
      ea.elements[6] *= d
      ea.elements[8] *= m
      ea.elements[9] *= m
      ea.elements[10] *= m
      b.setFromRotationMatrix(ea)
      c.x = f
      c.y = g
      c.z = k
      return this
    },
    makePerspective: function (a, b, c, d, f, g) {
      void 0 === g &&
        console.warn(
          'THREE.Matrix4: .makePerspective() has been redefined and has a new signature. Please check the docs.',
        )
      var k = this.elements
      k[0] = (2 * f) / (b - a)
      k[4] = 0
      k[8] = (b + a) / (b - a)
      k[12] = 0
      k[1] = 0
      k[5] = (2 * f) / (c - d)
      k[9] = (c + d) / (c - d)
      k[13] = 0
      k[2] = 0
      k[6] = 0
      k[10] = -(g + f) / (g - f)
      k[14] = (-2 * g * f) / (g - f)
      k[3] = 0
      k[7] = 0
      k[11] = -1
      k[15] = 0
      return this
    },
    makeOrthographic: function (a, b, c, d, f, g) {
      var k = this.elements,
        m = 1 / (b - a),
        n = 1 / (c - d),
        l = 1 / (g - f)
      k[0] = 2 * m
      k[4] = 0
      k[8] = 0
      k[12] = -((b + a) * m)
      k[1] = 0
      k[5] = 2 * n
      k[9] = 0
      k[13] = -((c + d) * n)
      k[2] = 0
      k[6] = 0
      k[10] = -2 * l
      k[14] = -((g + f) * l)
      k[3] = 0
      k[7] = 0
      k[11] = 0
      k[15] = 1
      return this
    },
    equals: function (a) {
      var b = this.elements
      a = a.elements
      for (var c = 0; 16 > c; c++) if (b[c] !== a[c]) return !1
      return !0
    },
    fromArray: function (a, b) {
      void 0 === b && (b = 0)
      for (var c = 0; 16 > c; c++) this.elements[c] = a[c + b]
      return this
    },
    toArray: function (a, b) {
      void 0 === a && (a = [])
      void 0 === b && (b = 0)
      var c = this.elements
      a[b] = c[0]
      a[b + 1] = c[1]
      a[b + 2] = c[2]
      a[b + 3] = c[3]
      a[b + 4] = c[4]
      a[b + 5] = c[5]
      a[b + 6] = c[6]
      a[b + 7] = c[7]
      a[b + 8] = c[8]
      a[b + 9] = c[9]
      a[b + 10] = c[10]
      a[b + 11] = c[11]
      a[b + 12] = c[12]
      a[b + 13] = c[13]
      a[b + 14] = c[14]
      a[b + 15] = c[15]
      return a
    },
  })
  var hj = new I(),
    ij = new ya()
  Zb.RotationOrders = 'XYZ YZX ZXY XZY YXZ ZYX'.split(' ')
  Zb.DefaultOrder = 'XYZ'
  Object.defineProperties(Zb.prototype, {
    x: {
      get: function () {
        return this._x
      },
      set: function (a) {
        this._x = a
        this._onChangeCallback()
      },
    },
    y: {
      get: function () {
        return this._y
      },
      set: function (a) {
        this._y = a
        this._onChangeCallback()
      },
    },
    z: {
      get: function () {
        return this._z
      },
      set: function (a) {
        this._z = a
        this._onChangeCallback()
      },
    },
    order: {
      get: function () {
        return this._order
      },
      set: function (a) {
        this._order = a
        this._onChangeCallback()
      },
    },
  })
  Object.assign(Zb.prototype, {
    isEuler: !0,
    set: function (a, b, c, d) {
      this._x = a
      this._y = b
      this._z = c
      this._order = d || this._order
      this._onChangeCallback()
      return this
    },
    clone: function () {
      return new this.constructor(this._x, this._y, this._z, this._order)
    },
    copy: function (a) {
      this._x = a._x
      this._y = a._y
      this._z = a._z
      this._order = a._order
      this._onChangeCallback()
      return this
    },
    setFromRotationMatrix: function (a, b, c) {
      var d = N.clamp,
        f = a.elements
      a = f[0]
      var g = f[4],
        k = f[8],
        m = f[1],
        n = f[5],
        l = f[9],
        q = f[2],
        t = f[6]
      f = f[10]
      b = b || this._order
      'XYZ' === b
        ? ((this._y = Math.asin(d(k, -1, 1))),
          0.9999999 > Math.abs(k)
            ? ((this._x = Math.atan2(-l, f)), (this._z = Math.atan2(-g, a)))
            : ((this._x = Math.atan2(t, n)), (this._z = 0)))
        : 'YXZ' === b
        ? ((this._x = Math.asin(-d(l, -1, 1))),
          0.9999999 > Math.abs(l)
            ? ((this._y = Math.atan2(k, f)), (this._z = Math.atan2(m, n)))
            : ((this._y = Math.atan2(-q, a)), (this._z = 0)))
        : 'ZXY' === b
        ? ((this._x = Math.asin(d(t, -1, 1))),
          0.9999999 > Math.abs(t)
            ? ((this._y = Math.atan2(-q, f)), (this._z = Math.atan2(-g, n)))
            : ((this._y = 0), (this._z = Math.atan2(m, a))))
        : 'ZYX' === b
        ? ((this._y = Math.asin(-d(q, -1, 1))),
          0.9999999 > Math.abs(q)
            ? ((this._x = Math.atan2(t, f)), (this._z = Math.atan2(m, a)))
            : ((this._x = 0), (this._z = Math.atan2(-g, n))))
        : 'YZX' === b
        ? ((this._z = Math.asin(d(m, -1, 1))),
          0.9999999 > Math.abs(m)
            ? ((this._x = Math.atan2(-l, n)), (this._y = Math.atan2(-q, a)))
            : ((this._x = 0), (this._y = Math.atan2(k, f))))
        : 'XZY' === b
        ? ((this._z = Math.asin(-d(g, -1, 1))),
          0.9999999 > Math.abs(g)
            ? ((this._x = Math.atan2(t, n)), (this._y = Math.atan2(k, a)))
            : ((this._x = Math.atan2(-l, f)), (this._y = 0)))
        : console.warn(
            'THREE.Euler: .setFromRotationMatrix() given unsupported order: ' +
              b,
          )
      this._order = b
      !1 !== c && this._onChangeCallback()
      return this
    },
    setFromQuaternion: function (a, b, c) {
      hj.makeRotationFromQuaternion(a)
      return this.setFromRotationMatrix(hj, b, c)
    },
    setFromVector3: function (a, b) {
      return this.set(a.x, a.y, a.z, b || this._order)
    },
    reorder: function (a) {
      ij.setFromEuler(this)
      return this.setFromQuaternion(ij, a)
    },
    equals: function (a) {
      return (
        a._x === this._x &&
        a._y === this._y &&
        a._z === this._z &&
        a._order === this._order
      )
    },
    fromArray: function (a) {
      this._x = a[0]
      this._y = a[1]
      this._z = a[2]
      void 0 !== a[3] && (this._order = a[3])
      this._onChangeCallback()
      return this
    },
    toArray: function (a, b) {
      void 0 === a && (a = [])
      void 0 === b && (b = 0)
      a[b] = this._x
      a[b + 1] = this._y
      a[b + 2] = this._z
      a[b + 3] = this._order
      return a
    },
    toVector3: function (a) {
      return a
        ? a.set(this._x, this._y, this._z)
        : new q(this._x, this._y, this._z)
    },
    _onChange: function (a) {
      this._onChangeCallback = a
      return this
    },
    _onChangeCallback: function () {},
  })
  Object.assign(rg.prototype, {
    set: function (a) {
      this.mask = (1 << a) | 0
    },
    enable: function (a) {
      this.mask = this.mask | (1 << a) | 0
    },
    enableAll: function () {
      this.mask = -1
    },
    toggle: function (a) {
      this.mask ^= (1 << a) | 0
    },
    disable: function (a) {
      this.mask &= ~((1 << a) | 0)
    },
    disableAll: function () {
      this.mask = 0
    },
    test: function (a) {
      return 0 !== (this.mask & a.mask)
    },
  })
  var Pj = 0,
    jj = new q(),
    Bd = new ya(),
    Cb = new I(),
    Qf = new q(),
    Oe = new q(),
    Dl = new q(),
    El = new ya(),
    kj = new q(1, 0, 0),
    lj = new q(0, 1, 0),
    mj = new q(0, 0, 1),
    Fl = { type: 'added' },
    Gl = { type: 'removed' }
  E.DefaultUp = new q(0, 1, 0)
  E.DefaultMatrixAutoUpdate = !0
  E.prototype = Object.assign(Object.create(Ra.prototype), {
    constructor: E,
    isObject3D: !0,
    onBeforeRender: function () {},
    onAfterRender: function () {},
    applyMatrix: function (a) {
      this.matrixAutoUpdate && this.updateMatrix()
      this.matrix.premultiply(a)
      this.matrix.decompose(this.position, this.quaternion, this.scale)
    },
    applyQuaternion: function (a) {
      this.quaternion.premultiply(a)
      return this
    },
    setRotationFromAxisAngle: function (a, b) {
      this.quaternion.setFromAxisAngle(a, b)
    },
    setRotationFromEuler: function (a) {
      this.quaternion.setFromEuler(a, !0)
    },
    setRotationFromMatrix: function (a) {
      this.quaternion.setFromRotationMatrix(a)
    },
    setRotationFromQuaternion: function (a) {
      this.quaternion.copy(a)
    },
    rotateOnAxis: function (a, b) {
      Bd.setFromAxisAngle(a, b)
      this.quaternion.multiply(Bd)
      return this
    },
    rotateOnWorldAxis: function (a, b) {
      Bd.setFromAxisAngle(a, b)
      this.quaternion.premultiply(Bd)
      return this
    },
    rotateX: function (a) {
      return this.rotateOnAxis(kj, a)
    },
    rotateY: function (a) {
      return this.rotateOnAxis(lj, a)
    },
    rotateZ: function (a) {
      return this.rotateOnAxis(mj, a)
    },
    translateOnAxis: function (a, b) {
      jj.copy(a).applyQuaternion(this.quaternion)
      this.position.add(jj.multiplyScalar(b))
      return this
    },
    translateX: function (a) {
      return this.translateOnAxis(kj, a)
    },
    translateY: function (a) {
      return this.translateOnAxis(lj, a)
    },
    translateZ: function (a) {
      return this.translateOnAxis(mj, a)
    },
    localToWorld: function (a) {
      return a.applyMatrix4(this.matrixWorld)
    },
    worldToLocal: function (a) {
      return a.applyMatrix4(Cb.getInverse(this.matrixWorld))
    },
    lookAt: function (a, b, c) {
      a.isVector3 ? Qf.copy(a) : Qf.set(a, b, c)
      a = this.parent
      this.updateWorldMatrix(!0, !1)
      Oe.setFromMatrixPosition(this.matrixWorld)
      this.isCamera || this.isLight
        ? Cb.lookAt(Oe, Qf, this.up)
        : Cb.lookAt(Qf, Oe, this.up)
      this.quaternion.setFromRotationMatrix(Cb)
      a &&
        (Cb.extractRotation(a.matrixWorld),
        Bd.setFromRotationMatrix(Cb),
        this.quaternion.premultiply(Bd.inverse()))
    },
    add: function (a) {
      if (1 < arguments.length) {
        for (var b = 0; b < arguments.length; b++) this.add(arguments[b])
        return this
      }
      if (a === this)
        return (
          console.error(
            "THREE.Object3D.add: object can't be added as a child of itself.",
            a,
          ),
          this
        )
      a && a.isObject3D
        ? (null !== a.parent && a.parent.remove(a),
          (a.parent = this),
          this.children.push(a),
          a.dispatchEvent(Fl))
        : console.error(
            'THREE.Object3D.add: object not an instance of THREE.Object3D.',
            a,
          )
      return this
    },
    remove: function (a) {
      if (1 < arguments.length) {
        for (var b = 0; b < arguments.length; b++) this.remove(arguments[b])
        return this
      }
      b = this.children.indexOf(a)
      ;-1 !== b &&
        ((a.parent = null), this.children.splice(b, 1), a.dispatchEvent(Gl))
      return this
    },
    attach: function (a) {
      this.updateWorldMatrix(!0, !1)
      Cb.getInverse(this.matrixWorld)
      null !== a.parent &&
        (a.parent.updateWorldMatrix(!0, !1), Cb.multiply(a.parent.matrixWorld))
      a.applyMatrix(Cb)
      a.updateWorldMatrix(!1, !1)
      this.add(a)
      return this
    },
    getObjectById: function (a) {
      return this.getObjectByProperty('id', a)
    },
    getObjectByName: function (a) {
      return this.getObjectByProperty('name', a)
    },
    getObjectByProperty: function (a, b) {
      if (this[a] === b) return this
      for (var c = 0, d = this.children.length; c < d; c++) {
        var f = this.children[c].getObjectByProperty(a, b)
        if (void 0 !== f) return f
      }
    },
    getWorldPosition: function (a) {
      void 0 === a &&
        (console.warn(
          'THREE.Object3D: .getWorldPosition() target is now required',
        ),
        (a = new q()))
      this.updateMatrixWorld(!0)
      return a.setFromMatrixPosition(this.matrixWorld)
    },
    getWorldQuaternion: function (a) {
      void 0 === a &&
        (console.warn(
          'THREE.Object3D: .getWorldQuaternion() target is now required',
        ),
        (a = new ya()))
      this.updateMatrixWorld(!0)
      this.matrixWorld.decompose(Oe, a, Dl)
      return a
    },
    getWorldScale: function (a) {
      void 0 === a &&
        (console.warn(
          'THREE.Object3D: .getWorldScale() target is now required',
        ),
        (a = new q()))
      this.updateMatrixWorld(!0)
      this.matrixWorld.decompose(Oe, El, a)
      return a
    },
    getWorldDirection: function (a) {
      void 0 === a &&
        (console.warn(
          'THREE.Object3D: .getWorldDirection() target is now required',
        ),
        (a = new q()))
      this.updateMatrixWorld(!0)
      var b = this.matrixWorld.elements
      return a.set(b[8], b[9], b[10]).normalize()
    },
    raycast: function () {},
    traverse: function (a) {
      a(this)
      for (var b = this.children, c = 0, d = b.length; c < d; c++)
        b[c].traverse(a)
    },
    traverseVisible: function (a) {
      if (!1 !== this.visible) {
        a(this)
        for (var b = this.children, c = 0, d = b.length; c < d; c++)
          b[c].traverseVisible(a)
      }
    },
    traverseAncestors: function (a) {
      var b = this.parent
      null !== b && (a(b), b.traverseAncestors(a))
    },
    updateMatrix: function () {
      this.matrix.compose(this.position, this.quaternion, this.scale)
      this.matrixWorldNeedsUpdate = !0
    },
    updateMatrixWorld: function (a) {
      this.matrixAutoUpdate && this.updateMatrix()
      if (this.matrixWorldNeedsUpdate || a)
        null === this.parent
          ? this.matrixWorld.copy(this.matrix)
          : this.matrixWorld.multiplyMatrices(
              this.parent.matrixWorld,
              this.matrix,
            ),
          (this.matrixWorldNeedsUpdate = !1),
          (a = !0)
      for (var b = this.children, c = 0, d = b.length; c < d; c++)
        b[c].updateMatrixWorld(a)
    },
    updateWorldMatrix: function (a, b) {
      var c = this.parent
      !0 === a && null !== c && c.updateWorldMatrix(!0, !1)
      this.matrixAutoUpdate && this.updateMatrix()
      null === this.parent
        ? this.matrixWorld.copy(this.matrix)
        : this.matrixWorld.multiplyMatrices(
            this.parent.matrixWorld,
            this.matrix,
          )
      if (!0 === b)
        for (a = this.children, b = 0, c = a.length; b < c; b++)
          a[b].updateWorldMatrix(!1, !0)
    },
    toJSON: function (a) {
      function b(b, c) {
        void 0 === b[c.uuid] && (b[c.uuid] = c.toJSON(a))
        return c.uuid
      }
      function c(a) {
        var b = [],
          c
        for (c in a) {
          var d = a[c]
          delete d.metadata
          b.push(d)
        }
        return b
      }
      var d = void 0 === a || 'string' === typeof a,
        f = {}
      d &&
        ((a = {
          geometries: {},
          materials: {},
          textures: {},
          images: {},
          shapes: {},
        }),
        (f.metadata = {
          version: 4.5,
          type: 'Object',
          generator: 'Object3D.toJSON',
        }))
      var g = {}
      g.uuid = this.uuid
      g.type = this.type
      '' !== this.name && (g.name = this.name)
      !0 === this.castShadow && (g.castShadow = !0)
      !0 === this.receiveShadow && (g.receiveShadow = !0)
      !1 === this.visible && (g.visible = !1)
      !1 === this.frustumCulled && (g.frustumCulled = !1)
      0 !== this.renderOrder && (g.renderOrder = this.renderOrder)
      '{}' !== JSON.stringify(this.userData) && (g.userData = this.userData)
      g.layers = this.layers.mask
      g.matrix = this.matrix.toArray()
      !1 === this.matrixAutoUpdate && (g.matrixAutoUpdate = !1)
      this.isMesh && 0 !== this.drawMode && (g.drawMode = this.drawMode)
      this.isInstancedMesh &&
        ((g.type = 'InstancedMesh'),
        (g.count = this.count),
        (g.instanceMatrix = this.instanceMatrix.toJSON()))
      if (this.isMesh || this.isLine || this.isPoints) {
        g.geometry = b(a.geometries, this.geometry)
        var k = this.geometry.parameters
        if (void 0 !== k && void 0 !== k.shapes)
          if (((k = k.shapes), Array.isArray(k)))
            for (var m = 0, n = k.length; m < n; m++) b(a.shapes, k[m])
          else b(a.shapes, k)
      }
      if (void 0 !== this.material)
        if (Array.isArray(this.material)) {
          k = []
          m = 0
          for (n = this.material.length; m < n; m++)
            k.push(b(a.materials, this.material[m]))
          g.material = k
        } else g.material = b(a.materials, this.material)
      if (0 < this.children.length)
        for (g.children = [], m = 0; m < this.children.length; m++)
          g.children.push(this.children[m].toJSON(a).object)
      if (d) {
        d = c(a.geometries)
        m = c(a.materials)
        n = c(a.textures)
        var l = c(a.images)
        k = c(a.shapes)
        0 < d.length && (f.geometries = d)
        0 < m.length && (f.materials = m)
        0 < n.length && (f.textures = n)
        0 < l.length && (f.images = l)
        0 < k.length && (f.shapes = k)
      }
      f.object = g
      return f
    },
    clone: function (a) {
      return new this.constructor().copy(this, a)
    },
    copy: function (a, b) {
      void 0 === b && (b = !0)
      this.name = a.name
      this.up.copy(a.up)
      this.position.copy(a.position)
      this.quaternion.copy(a.quaternion)
      this.scale.copy(a.scale)
      this.matrix.copy(a.matrix)
      this.matrixWorld.copy(a.matrixWorld)
      this.matrixAutoUpdate = a.matrixAutoUpdate
      this.matrixWorldNeedsUpdate = a.matrixWorldNeedsUpdate
      this.layers.mask = a.layers.mask
      this.visible = a.visible
      this.castShadow = a.castShadow
      this.receiveShadow = a.receiveShadow
      this.frustumCulled = a.frustumCulled
      this.renderOrder = a.renderOrder
      this.userData = JSON.parse(JSON.stringify(a.userData))
      if (!0 === b)
        for (b = 0; b < a.children.length; b++) this.add(a.children[b].clone())
      return this
    },
  })
  Kd.prototype = Object.assign(Object.create(E.prototype), {
    constructor: Kd,
    isScene: !0,
    copy: function (a, b) {
      E.prototype.copy.call(this, a, b)
      null !== a.background && (this.background = a.background.clone())
      null !== a.fog && (this.fog = a.fog.clone())
      null !== a.overrideMaterial &&
        (this.overrideMaterial = a.overrideMaterial.clone())
      this.autoUpdate = a.autoUpdate
      this.matrixAutoUpdate = a.matrixAutoUpdate
      return this
    },
    toJSON: function (a) {
      var b = E.prototype.toJSON.call(this, a)
      null !== this.background &&
        (b.object.background = this.background.toJSON(a))
      null !== this.fog && (b.object.fog = this.fog.toJSON())
      return b
    },
    dispose: function () {
      this.dispatchEvent({ type: 'dispose' })
    },
  })
  var Db = [
      new q(),
      new q(),
      new q(),
      new q(),
      new q(),
      new q(),
      new q(),
      new q(),
    ],
    ob = new q(),
    Cd = new q(),
    Dd = new q(),
    Ed = new q(),
    Sb = new q(),
    Tb = new q(),
    Cc = new q(),
    Pe = new q(),
    Rf = new q(),
    Sf = new q(),
    $b = new q()
  Object.assign(gb.prototype, {
    isBox3: !0,
    set: function (a, b) {
      this.min.copy(a)
      this.max.copy(b)
      return this
    },
    setFromArray: function (a) {
      for (
        var b = Infinity,
          c = Infinity,
          d = Infinity,
          f = -Infinity,
          g = -Infinity,
          k = -Infinity,
          m = 0,
          n = a.length;
        m < n;
        m += 3
      ) {
        var l = a[m],
          q = a[m + 1],
          t = a[m + 2]
        l < b && (b = l)
        q < c && (c = q)
        t < d && (d = t)
        l > f && (f = l)
        q > g && (g = q)
        t > k && (k = t)
      }
      this.min.set(b, c, d)
      this.max.set(f, g, k)
      return this
    },
    setFromBufferAttribute: function (a) {
      for (
        var b = Infinity,
          c = Infinity,
          d = Infinity,
          f = -Infinity,
          g = -Infinity,
          k = -Infinity,
          m = 0,
          n = a.count;
        m < n;
        m++
      ) {
        var l = a.getX(m),
          q = a.getY(m),
          t = a.getZ(m)
        l < b && (b = l)
        q < c && (c = q)
        t < d && (d = t)
        l > f && (f = l)
        q > g && (g = q)
        t > k && (k = t)
      }
      this.min.set(b, c, d)
      this.max.set(f, g, k)
      return this
    },
    setFromPoints: function (a) {
      this.makeEmpty()
      for (var b = 0, c = a.length; b < c; b++) this.expandByPoint(a[b])
      return this
    },
    setFromCenterAndSize: function (a, b) {
      b = ob.copy(b).multiplyScalar(0.5)
      this.min.copy(a).sub(b)
      this.max.copy(a).add(b)
      return this
    },
    setFromObject: function (a) {
      this.makeEmpty()
      return this.expandByObject(a)
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.min.copy(a.min)
      this.max.copy(a.max)
      return this
    },
    makeEmpty: function () {
      this.min.x = this.min.y = this.min.z = Infinity
      this.max.x = this.max.y = this.max.z = -Infinity
      return this
    },
    isEmpty: function () {
      return (
        this.max.x < this.min.x ||
        this.max.y < this.min.y ||
        this.max.z < this.min.z
      )
    },
    getCenter: function (a) {
      void 0 === a &&
        (console.warn('THREE.Box3: .getCenter() target is now required'),
        (a = new q()))
      return this.isEmpty()
        ? a.set(0, 0, 0)
        : a.addVectors(this.min, this.max).multiplyScalar(0.5)
    },
    getSize: function (a) {
      void 0 === a &&
        (console.warn('THREE.Box3: .getSize() target is now required'),
        (a = new q()))
      return this.isEmpty() ? a.set(0, 0, 0) : a.subVectors(this.max, this.min)
    },
    expandByPoint: function (a) {
      this.min.min(a)
      this.max.max(a)
      return this
    },
    expandByVector: function (a) {
      this.min.sub(a)
      this.max.add(a)
      return this
    },
    expandByScalar: function (a) {
      this.min.addScalar(-a)
      this.max.addScalar(a)
      return this
    },
    expandByObject: function (a) {
      var b
      a.updateWorldMatrix(!1, !1)
      var c = a.geometry
      if (void 0 !== c)
        if (c.isGeometry) {
          var d = c.vertices
          c = 0
          for (b = d.length; c < b; c++)
            ob.copy(d[c]),
              ob.applyMatrix4(a.matrixWorld),
              this.expandByPoint(ob)
        } else if (
          c.isBufferGeometry &&
          ((d = c.attributes.position), void 0 !== d)
        )
          for (c = 0, b = d.count; c < b; c++)
            ob.fromBufferAttribute(d, c).applyMatrix4(a.matrixWorld),
              this.expandByPoint(ob)
      a = a.children
      c = 0
      for (b = a.length; c < b; c++) this.expandByObject(a[c])
      return this
    },
    containsPoint: function (a) {
      return a.x < this.min.x ||
        a.x > this.max.x ||
        a.y < this.min.y ||
        a.y > this.max.y ||
        a.z < this.min.z ||
        a.z > this.max.z
        ? !1
        : !0
    },
    containsBox: function (a) {
      return (
        this.min.x <= a.min.x &&
        a.max.x <= this.max.x &&
        this.min.y <= a.min.y &&
        a.max.y <= this.max.y &&
        this.min.z <= a.min.z &&
        a.max.z <= this.max.z
      )
    },
    getParameter: function (a, b) {
      void 0 === b &&
        (console.warn('THREE.Box3: .getParameter() target is now required'),
        (b = new q()))
      return b.set(
        (a.x - this.min.x) / (this.max.x - this.min.x),
        (a.y - this.min.y) / (this.max.y - this.min.y),
        (a.z - this.min.z) / (this.max.z - this.min.z),
      )
    },
    intersectsBox: function (a) {
      return a.max.x < this.min.x ||
        a.min.x > this.max.x ||
        a.max.y < this.min.y ||
        a.min.y > this.max.y ||
        a.max.z < this.min.z ||
        a.min.z > this.max.z
        ? !1
        : !0
    },
    intersectsSphere: function (a) {
      this.clampPoint(a.center, ob)
      return ob.distanceToSquared(a.center) <= a.radius * a.radius
    },
    intersectsPlane: function (a) {
      if (0 < a.normal.x) {
        var b = a.normal.x * this.min.x
        var c = a.normal.x * this.max.x
      } else (b = a.normal.x * this.max.x), (c = a.normal.x * this.min.x)
      0 < a.normal.y
        ? ((b += a.normal.y * this.min.y), (c += a.normal.y * this.max.y))
        : ((b += a.normal.y * this.max.y), (c += a.normal.y * this.min.y))
      0 < a.normal.z
        ? ((b += a.normal.z * this.min.z), (c += a.normal.z * this.max.z))
        : ((b += a.normal.z * this.max.z), (c += a.normal.z * this.min.z))
      return b <= -a.constant && c >= -a.constant
    },
    intersectsTriangle: function (a) {
      if (this.isEmpty()) return !1
      this.getCenter(Pe)
      Rf.subVectors(this.max, Pe)
      Cd.subVectors(a.a, Pe)
      Dd.subVectors(a.b, Pe)
      Ed.subVectors(a.c, Pe)
      Sb.subVectors(Dd, Cd)
      Tb.subVectors(Ed, Dd)
      Cc.subVectors(Cd, Ed)
      a = [
        0,
        -Sb.z,
        Sb.y,
        0,
        -Tb.z,
        Tb.y,
        0,
        -Cc.z,
        Cc.y,
        Sb.z,
        0,
        -Sb.x,
        Tb.z,
        0,
        -Tb.x,
        Cc.z,
        0,
        -Cc.x,
        -Sb.y,
        Sb.x,
        0,
        -Tb.y,
        Tb.x,
        0,
        -Cc.y,
        Cc.x,
        0,
      ]
      if (!sg(a, Cd, Dd, Ed, Rf)) return !1
      a = [1, 0, 0, 0, 1, 0, 0, 0, 1]
      if (!sg(a, Cd, Dd, Ed, Rf)) return !1
      Sf.crossVectors(Sb, Tb)
      a = [Sf.x, Sf.y, Sf.z]
      return sg(a, Cd, Dd, Ed, Rf)
    },
    clampPoint: function (a, b) {
      void 0 === b &&
        (console.warn('THREE.Box3: .clampPoint() target is now required'),
        (b = new q()))
      return b.copy(a).clamp(this.min, this.max)
    },
    distanceToPoint: function (a) {
      return ob.copy(a).clamp(this.min, this.max).sub(a).length()
    },
    getBoundingSphere: function (a) {
      void 0 === a &&
        console.error('THREE.Box3: .getBoundingSphere() target is now required')
      this.getCenter(a.center)
      a.radius = 0.5 * this.getSize(ob).length()
      return a
    },
    intersect: function (a) {
      this.min.max(a.min)
      this.max.min(a.max)
      this.isEmpty() && this.makeEmpty()
      return this
    },
    union: function (a) {
      this.min.min(a.min)
      this.max.max(a.max)
      return this
    },
    applyMatrix4: function (a) {
      if (this.isEmpty()) return this
      Db[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(a)
      Db[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(a)
      Db[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(a)
      Db[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(a)
      Db[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(a)
      Db[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(a)
      Db[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(a)
      Db[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(a)
      this.setFromPoints(Db)
      return this
    },
    translate: function (a) {
      this.min.add(a)
      this.max.add(a)
      return this
    },
    equals: function (a) {
      return a.min.equals(this.min) && a.max.equals(this.max)
    },
  })
  var Hl = new gb()
  Object.assign(ub.prototype, {
    set: function (a, b) {
      this.center.copy(a)
      this.radius = b
      return this
    },
    setFromPoints: function (a, b) {
      var c = this.center
      void 0 !== b ? c.copy(b) : Hl.setFromPoints(a).getCenter(c)
      for (var d = (b = 0), f = a.length; d < f; d++)
        b = Math.max(b, c.distanceToSquared(a[d]))
      this.radius = Math.sqrt(b)
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.center.copy(a.center)
      this.radius = a.radius
      return this
    },
    empty: function () {
      return 0 >= this.radius
    },
    containsPoint: function (a) {
      return a.distanceToSquared(this.center) <= this.radius * this.radius
    },
    distanceToPoint: function (a) {
      return a.distanceTo(this.center) - this.radius
    },
    intersectsSphere: function (a) {
      var b = this.radius + a.radius
      return a.center.distanceToSquared(this.center) <= b * b
    },
    intersectsBox: function (a) {
      return a.intersectsSphere(this)
    },
    intersectsPlane: function (a) {
      return Math.abs(a.distanceToPoint(this.center)) <= this.radius
    },
    clampPoint: function (a, b) {
      var c = this.center.distanceToSquared(a)
      void 0 === b &&
        (console.warn('THREE.Sphere: .clampPoint() target is now required'),
        (b = new q()))
      b.copy(a)
      c > this.radius * this.radius &&
        (b.sub(this.center).normalize(),
        b.multiplyScalar(this.radius).add(this.center))
      return b
    },
    getBoundingBox: function (a) {
      void 0 === a &&
        (console.warn('THREE.Sphere: .getBoundingBox() target is now required'),
        (a = new gb()))
      a.set(this.center, this.center)
      a.expandByScalar(this.radius)
      return a
    },
    applyMatrix4: function (a) {
      this.center.applyMatrix4(a)
      this.radius *= a.getMaxScaleOnAxis()
      return this
    },
    translate: function (a) {
      this.center.add(a)
      return this
    },
    equals: function (a) {
      return a.center.equals(this.center) && a.radius === this.radius
    },
  })
  var Eb = new q(),
    sh = new q(),
    Tf = new q(),
    Ub = new q(),
    th = new q(),
    Uf = new q(),
    uh = new q()
  Object.assign(ac.prototype, {
    set: function (a, b) {
      this.origin.copy(a)
      this.direction.copy(b)
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.origin.copy(a.origin)
      this.direction.copy(a.direction)
      return this
    },
    at: function (a, b) {
      void 0 === b &&
        (console.warn('THREE.Ray: .at() target is now required'), (b = new q()))
      return b.copy(this.direction).multiplyScalar(a).add(this.origin)
    },
    lookAt: function (a) {
      this.direction.copy(a).sub(this.origin).normalize()
      return this
    },
    recast: function (a) {
      this.origin.copy(this.at(a, Eb))
      return this
    },
    closestPointToPoint: function (a, b) {
      void 0 === b &&
        (console.warn(
          'THREE.Ray: .closestPointToPoint() target is now required',
        ),
        (b = new q()))
      b.subVectors(a, this.origin)
      a = b.dot(this.direction)
      return 0 > a
        ? b.copy(this.origin)
        : b.copy(this.direction).multiplyScalar(a).add(this.origin)
    },
    distanceToPoint: function (a) {
      return Math.sqrt(this.distanceSqToPoint(a))
    },
    distanceSqToPoint: function (a) {
      var b = Eb.subVectors(a, this.origin).dot(this.direction)
      if (0 > b) return this.origin.distanceToSquared(a)
      Eb.copy(this.direction).multiplyScalar(b).add(this.origin)
      return Eb.distanceToSquared(a)
    },
    distanceSqToSegment: function (a, b, c, d) {
      sh.copy(a).add(b).multiplyScalar(0.5)
      Tf.copy(b).sub(a).normalize()
      Ub.copy(this.origin).sub(sh)
      var f = 0.5 * a.distanceTo(b),
        g = -this.direction.dot(Tf),
        k = Ub.dot(this.direction),
        m = -Ub.dot(Tf),
        n = Ub.lengthSq(),
        l = Math.abs(1 - g * g)
      if (0 < l) {
        a = g * m - k
        b = g * k - m
        var q = f * l
        0 <= a
          ? b >= -q
            ? b <= q
              ? ((f = 1 / l),
                (a *= f),
                (b *= f),
                (g = a * (a + g * b + 2 * k) + b * (g * a + b + 2 * m) + n))
              : ((b = f),
                (a = Math.max(0, -(g * b + k))),
                (g = -a * a + b * (b + 2 * m) + n))
            : ((b = -f),
              (a = Math.max(0, -(g * b + k))),
              (g = -a * a + b * (b + 2 * m) + n))
          : b <= -q
          ? ((a = Math.max(0, -(-g * f + k))),
            (b = 0 < a ? -f : Math.min(Math.max(-f, -m), f)),
            (g = -a * a + b * (b + 2 * m) + n))
          : b <= q
          ? ((a = 0),
            (b = Math.min(Math.max(-f, -m), f)),
            (g = b * (b + 2 * m) + n))
          : ((a = Math.max(0, -(g * f + k))),
            (b = 0 < a ? f : Math.min(Math.max(-f, -m), f)),
            (g = -a * a + b * (b + 2 * m) + n))
      } else
        (b = 0 < g ? -f : f),
          (a = Math.max(0, -(g * b + k))),
          (g = -a * a + b * (b + 2 * m) + n)
      c && c.copy(this.direction).multiplyScalar(a).add(this.origin)
      d && d.copy(Tf).multiplyScalar(b).add(sh)
      return g
    },
    intersectSphere: function (a, b) {
      Eb.subVectors(a.center, this.origin)
      var c = Eb.dot(this.direction),
        d = Eb.dot(Eb) - c * c
      a = a.radius * a.radius
      if (d > a) return null
      a = Math.sqrt(a - d)
      d = c - a
      c += a
      return 0 > d && 0 > c ? null : 0 > d ? this.at(c, b) : this.at(d, b)
    },
    intersectsSphere: function (a) {
      return this.distanceSqToPoint(a.center) <= a.radius * a.radius
    },
    distanceToPlane: function (a) {
      var b = a.normal.dot(this.direction)
      if (0 === b) return 0 === a.distanceToPoint(this.origin) ? 0 : null
      a = -(this.origin.dot(a.normal) + a.constant) / b
      return 0 <= a ? a : null
    },
    intersectPlane: function (a, b) {
      a = this.distanceToPlane(a)
      return null === a ? null : this.at(a, b)
    },
    intersectsPlane: function (a) {
      var b = a.distanceToPoint(this.origin)
      return 0 === b || 0 > a.normal.dot(this.direction) * b ? !0 : !1
    },
    intersectBox: function (a, b) {
      var c = 1 / this.direction.x
      var d = 1 / this.direction.y
      var f = 1 / this.direction.z,
        g = this.origin
      if (0 <= c) {
        var k = (a.min.x - g.x) * c
        c *= a.max.x - g.x
      } else (k = (a.max.x - g.x) * c), (c *= a.min.x - g.x)
      if (0 <= d) {
        var m = (a.min.y - g.y) * d
        d *= a.max.y - g.y
      } else (m = (a.max.y - g.y) * d), (d *= a.min.y - g.y)
      if (k > d || m > c) return null
      if (m > k || k !== k) k = m
      if (d < c || c !== c) c = d
      0 <= f
        ? ((m = (a.min.z - g.z) * f), (a = (a.max.z - g.z) * f))
        : ((m = (a.max.z - g.z) * f), (a = (a.min.z - g.z) * f))
      if (k > a || m > c) return null
      if (m > k || k !== k) k = m
      if (a < c || c !== c) c = a
      return 0 > c ? null : this.at(0 <= k ? k : c, b)
    },
    intersectsBox: function (a) {
      return null !== this.intersectBox(a, Eb)
    },
    intersectTriangle: function (a, b, c, d, f) {
      th.subVectors(b, a)
      Uf.subVectors(c, a)
      uh.crossVectors(th, Uf)
      b = this.direction.dot(uh)
      if (0 < b) {
        if (d) return null
        d = 1
      } else if (0 > b) (d = -1), (b = -b)
      else return null
      Ub.subVectors(this.origin, a)
      a = d * this.direction.dot(Uf.crossVectors(Ub, Uf))
      if (0 > a) return null
      c = d * this.direction.dot(th.cross(Ub))
      if (0 > c || a + c > b) return null
      a = -d * Ub.dot(uh)
      return 0 > a ? null : this.at(a / b, f)
    },
    applyMatrix4: function (a) {
      this.origin.applyMatrix4(a)
      this.direction.transformDirection(a)
      return this
    },
    equals: function (a) {
      return a.origin.equals(this.origin) && a.direction.equals(this.direction)
    },
  })
  var vh = new q(),
    Il = new q(),
    Jl = new ka()
  Object.assign(Sa.prototype, {
    isPlane: !0,
    set: function (a, b) {
      this.normal.copy(a)
      this.constant = b
      return this
    },
    setComponents: function (a, b, c, d) {
      this.normal.set(a, b, c)
      this.constant = d
      return this
    },
    setFromNormalAndCoplanarPoint: function (a, b) {
      this.normal.copy(a)
      this.constant = -b.dot(this.normal)
      return this
    },
    setFromCoplanarPoints: function (a, b, c) {
      b = vh.subVectors(c, b).cross(Il.subVectors(a, b)).normalize()
      this.setFromNormalAndCoplanarPoint(b, a)
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.normal.copy(a.normal)
      this.constant = a.constant
      return this
    },
    normalize: function () {
      var a = 1 / this.normal.length()
      this.normal.multiplyScalar(a)
      this.constant *= a
      return this
    },
    negate: function () {
      this.constant *= -1
      this.normal.negate()
      return this
    },
    distanceToPoint: function (a) {
      return this.normal.dot(a) + this.constant
    },
    distanceToSphere: function (a) {
      return this.distanceToPoint(a.center) - a.radius
    },
    projectPoint: function (a, b) {
      void 0 === b &&
        (console.warn('THREE.Plane: .projectPoint() target is now required'),
        (b = new q()))
      return b.copy(this.normal).multiplyScalar(-this.distanceToPoint(a)).add(a)
    },
    intersectLine: function (a, b) {
      void 0 === b &&
        (console.warn('THREE.Plane: .intersectLine() target is now required'),
        (b = new q()))
      var c = a.delta(vh),
        d = this.normal.dot(c)
      if (0 === d) {
        if (0 === this.distanceToPoint(a.start)) return b.copy(a.start)
      } else if (
        ((d = -(a.start.dot(this.normal) + this.constant) / d),
        !(0 > d || 1 < d))
      )
        return b.copy(c).multiplyScalar(d).add(a.start)
    },
    intersectsLine: function (a) {
      var b = this.distanceToPoint(a.start)
      a = this.distanceToPoint(a.end)
      return (0 > b && 0 < a) || (0 > a && 0 < b)
    },
    intersectsBox: function (a) {
      return a.intersectsPlane(this)
    },
    intersectsSphere: function (a) {
      return a.intersectsPlane(this)
    },
    coplanarPoint: function (a) {
      void 0 === a &&
        (console.warn('THREE.Plane: .coplanarPoint() target is now required'),
        (a = new q()))
      return a.copy(this.normal).multiplyScalar(-this.constant)
    },
    applyMatrix4: function (a, b) {
      b = b || Jl.getNormalMatrix(a)
      a = this.coplanarPoint(vh).applyMatrix4(a)
      b = this.normal.applyMatrix3(b).normalize()
      this.constant = -a.dot(b)
      return this
    },
    translate: function (a) {
      this.constant -= a.dot(this.normal)
      return this
    },
    equals: function (a) {
      return a.normal.equals(this.normal) && a.constant === this.constant
    },
  })
  var cb = new q(),
    Fb = new q(),
    wh = new q(),
    Gb = new q(),
    Fd = new q(),
    Gd = new q(),
    nj = new q(),
    xh = new q(),
    yh = new q(),
    zh = new q()
  Object.assign(va, {
    getNormal: function (a, b, c, d) {
      void 0 === d &&
        (console.warn('THREE.Triangle: .getNormal() target is now required'),
        (d = new q()))
      d.subVectors(c, b)
      cb.subVectors(a, b)
      d.cross(cb)
      a = d.lengthSq()
      return 0 < a ? d.multiplyScalar(1 / Math.sqrt(a)) : d.set(0, 0, 0)
    },
    getBarycoord: function (a, b, c, d, f) {
      cb.subVectors(d, b)
      Fb.subVectors(c, b)
      wh.subVectors(a, b)
      a = cb.dot(cb)
      b = cb.dot(Fb)
      c = cb.dot(wh)
      var g = Fb.dot(Fb)
      d = Fb.dot(wh)
      var k = a * g - b * b
      void 0 === f &&
        (console.warn('THREE.Triangle: .getBarycoord() target is now required'),
        (f = new q()))
      if (0 === k) return f.set(-2, -1, -1)
      k = 1 / k
      g = (g * c - b * d) * k
      a = (a * d - b * c) * k
      return f.set(1 - g - a, a, g)
    },
    containsPoint: function (a, b, c, d) {
      va.getBarycoord(a, b, c, d, Gb)
      return 0 <= Gb.x && 0 <= Gb.y && 1 >= Gb.x + Gb.y
    },
    getUV: function (a, b, c, d, f, g, k, m) {
      this.getBarycoord(a, b, c, d, Gb)
      m.set(0, 0)
      m.addScaledVector(f, Gb.x)
      m.addScaledVector(g, Gb.y)
      m.addScaledVector(k, Gb.z)
      return m
    },
    isFrontFacing: function (a, b, c, d) {
      cb.subVectors(c, b)
      Fb.subVectors(a, b)
      return 0 > cb.cross(Fb).dot(d) ? !0 : !1
    },
  })
  Object.assign(va.prototype, {
    set: function (a, b, c) {
      this.a.copy(a)
      this.b.copy(b)
      this.c.copy(c)
      return this
    },
    setFromPointsAndIndices: function (a, b, c, d) {
      this.a.copy(a[b])
      this.b.copy(a[c])
      this.c.copy(a[d])
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.a.copy(a.a)
      this.b.copy(a.b)
      this.c.copy(a.c)
      return this
    },
    getArea: function () {
      cb.subVectors(this.c, this.b)
      Fb.subVectors(this.a, this.b)
      return 0.5 * cb.cross(Fb).length()
    },
    getMidpoint: function (a) {
      void 0 === a &&
        (console.warn('THREE.Triangle: .getMidpoint() target is now required'),
        (a = new q()))
      return a
        .addVectors(this.a, this.b)
        .add(this.c)
        .multiplyScalar(1 / 3)
    },
    getNormal: function (a) {
      return va.getNormal(this.a, this.b, this.c, a)
    },
    getPlane: function (a) {
      void 0 === a &&
        (console.warn('THREE.Triangle: .getPlane() target is now required'),
        (a = new Sa()))
      return a.setFromCoplanarPoints(this.a, this.b, this.c)
    },
    getBarycoord: function (a, b) {
      return va.getBarycoord(a, this.a, this.b, this.c, b)
    },
    getUV: function (a, b, c, d, f) {
      return va.getUV(a, this.a, this.b, this.c, b, c, d, f)
    },
    containsPoint: function (a) {
      return va.containsPoint(a, this.a, this.b, this.c)
    },
    isFrontFacing: function (a) {
      return va.isFrontFacing(this.a, this.b, this.c, a)
    },
    intersectsBox: function (a) {
      return a.intersectsTriangle(this)
    },
    closestPointToPoint: function (a, b) {
      void 0 === b &&
        (console.warn(
          'THREE.Triangle: .closestPointToPoint() target is now required',
        ),
        (b = new q()))
      var c = this.a,
        d = this.b,
        f = this.c
      Fd.subVectors(d, c)
      Gd.subVectors(f, c)
      xh.subVectors(a, c)
      var g = Fd.dot(xh),
        k = Gd.dot(xh)
      if (0 >= g && 0 >= k) return b.copy(c)
      yh.subVectors(a, d)
      var m = Fd.dot(yh),
        n = Gd.dot(yh)
      if (0 <= m && n <= m) return b.copy(d)
      var l = g * n - m * k
      if (0 >= l && 0 <= g && 0 >= m)
        return (d = g / (g - m)), b.copy(c).addScaledVector(Fd, d)
      zh.subVectors(a, f)
      a = Fd.dot(zh)
      var y = Gd.dot(zh)
      if (0 <= y && a <= y) return b.copy(f)
      g = a * k - g * y
      if (0 >= g && 0 <= k && 0 >= y)
        return (l = k / (k - y)), b.copy(c).addScaledVector(Gd, l)
      k = m * y - a * n
      if (0 >= k && 0 <= n - m && 0 <= a - y)
        return (
          nj.subVectors(f, d),
          (l = (n - m) / (n - m + (a - y))),
          b.copy(d).addScaledVector(nj, l)
        )
      f = 1 / (k + g + l)
      d = g * f
      l *= f
      return b.copy(c).addScaledVector(Fd, d).addScaledVector(Gd, l)
    },
    equals: function (a) {
      return a.a.equals(this.a) && a.b.equals(this.b) && a.c.equals(this.c)
    },
  })
  var oj = {
      aliceblue: 15792383,
      antiquewhite: 16444375,
      aqua: 65535,
      aquamarine: 8388564,
      azure: 15794175,
      beige: 16119260,
      bisque: 16770244,
      black: 0,
      blanchedalmond: 16772045,
      blue: 255,
      blueviolet: 9055202,
      brown: 10824234,
      burlywood: 14596231,
      cadetblue: 6266528,
      chartreuse: 8388352,
      chocolate: 13789470,
      coral: 16744272,
      cornflowerblue: 6591981,
      cornsilk: 16775388,
      crimson: 14423100,
      cyan: 65535,
      darkblue: 139,
      darkcyan: 35723,
      darkgoldenrod: 12092939,
      darkgray: 11119017,
      darkgreen: 25600,
      darkgrey: 11119017,
      darkkhaki: 12433259,
      darkmagenta: 9109643,
      darkolivegreen: 5597999,
      darkorange: 16747520,
      darkorchid: 10040012,
      darkred: 9109504,
      darksalmon: 15308410,
      darkseagreen: 9419919,
      darkslateblue: 4734347,
      darkslategray: 3100495,
      darkslategrey: 3100495,
      darkturquoise: 52945,
      darkviolet: 9699539,
      deeppink: 16716947,
      deepskyblue: 49151,
      dimgray: 6908265,
      dimgrey: 6908265,
      dodgerblue: 2003199,
      firebrick: 11674146,
      floralwhite: 16775920,
      forestgreen: 2263842,
      fuchsia: 16711935,
      gainsboro: 14474460,
      ghostwhite: 16316671,
      gold: 16766720,
      goldenrod: 14329120,
      gray: 8421504,
      green: 32768,
      greenyellow: 11403055,
      grey: 8421504,
      honeydew: 15794160,
      hotpink: 16738740,
      indianred: 13458524,
      indigo: 4915330,
      ivory: 16777200,
      khaki: 15787660,
      lavender: 15132410,
      lavenderblush: 16773365,
      lawngreen: 8190976,
      lemonchiffon: 16775885,
      lightblue: 11393254,
      lightcoral: 15761536,
      lightcyan: 14745599,
      lightgoldenrodyellow: 16448210,
      lightgray: 13882323,
      lightgreen: 9498256,
      lightgrey: 13882323,
      lightpink: 16758465,
      lightsalmon: 16752762,
      lightseagreen: 2142890,
      lightskyblue: 8900346,
      lightslategray: 7833753,
      lightslategrey: 7833753,
      lightsteelblue: 11584734,
      lightyellow: 16777184,
      lime: 65280,
      limegreen: 3329330,
      linen: 16445670,
      magenta: 16711935,
      maroon: 8388608,
      mediumaquamarine: 6737322,
      mediumblue: 205,
      mediumorchid: 12211667,
      mediumpurple: 9662683,
      mediumseagreen: 3978097,
      mediumslateblue: 8087790,
      mediumspringgreen: 64154,
      mediumturquoise: 4772300,
      mediumvioletred: 13047173,
      midnightblue: 1644912,
      mintcream: 16121850,
      mistyrose: 16770273,
      moccasin: 16770229,
      navajowhite: 16768685,
      navy: 128,
      oldlace: 16643558,
      olive: 8421376,
      olivedrab: 7048739,
      orange: 16753920,
      orangered: 16729344,
      orchid: 14315734,
      palegoldenrod: 15657130,
      palegreen: 10025880,
      paleturquoise: 11529966,
      palevioletred: 14381203,
      papayawhip: 16773077,
      peachpuff: 16767673,
      peru: 13468991,
      pink: 16761035,
      plum: 14524637,
      powderblue: 11591910,
      purple: 8388736,
      rebeccapurple: 6697881,
      red: 16711680,
      rosybrown: 12357519,
      royalblue: 4286945,
      saddlebrown: 9127187,
      salmon: 16416882,
      sandybrown: 16032864,
      seagreen: 3050327,
      seashell: 16774638,
      sienna: 10506797,
      silver: 12632256,
      skyblue: 8900331,
      slateblue: 6970061,
      slategray: 7372944,
      slategrey: 7372944,
      snow: 16775930,
      springgreen: 65407,
      steelblue: 4620980,
      tan: 13808780,
      teal: 32896,
      thistle: 14204888,
      tomato: 16737095,
      turquoise: 4251856,
      violet: 15631086,
      wheat: 16113331,
      white: 16777215,
      whitesmoke: 16119285,
      yellow: 16776960,
      yellowgreen: 10145074,
    },
    Ha = { h: 0, s: 0, l: 0 },
    Vf = { h: 0, s: 0, l: 0 }
  Object.assign(D.prototype, {
    isColor: !0,
    r: 1,
    g: 1,
    b: 1,
    set: function (a) {
      a && a.isColor
        ? this.copy(a)
        : 'number' === typeof a
        ? this.setHex(a)
        : 'string' === typeof a && this.setStyle(a)
      return this
    },
    setScalar: function (a) {
      this.b = this.g = this.r = a
      return this
    },
    setHex: function (a) {
      a = Math.floor(a)
      this.r = ((a >> 16) & 255) / 255
      this.g = ((a >> 8) & 255) / 255
      this.b = (a & 255) / 255
      return this
    },
    setRGB: function (a, b, c) {
      this.r = a
      this.g = b
      this.b = c
      return this
    },
    setHSL: function (a, b, c) {
      a = N.euclideanModulo(a, 1)
      b = N.clamp(b, 0, 1)
      c = N.clamp(c, 0, 1)
      0 === b
        ? (this.r = this.g = this.b = c)
        : ((b = 0.5 >= c ? c * (1 + b) : c + b - c * b),
          (c = 2 * c - b),
          (this.r = tg(c, b, a + 1 / 3)),
          (this.g = tg(c, b, a)),
          (this.b = tg(c, b, a - 1 / 3)))
      return this
    },
    setStyle: function (a) {
      function b(b) {
        void 0 !== b &&
          1 > parseFloat(b) &&
          console.warn(
            'THREE.Color: Alpha component of ' + a + ' will be ignored.',
          )
      }
      var c
      if ((c = /^((?:rgb|hsl)a?)\(\s*([^\)]*)\)/.exec(a))) {
        var d = c[2]
        switch (c[1]) {
          case 'rgb':
          case 'rgba':
            if (
              (c = /^(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                d,
              ))
            )
              return (
                (this.r = Math.min(255, parseInt(c[1], 10)) / 255),
                (this.g = Math.min(255, parseInt(c[2], 10)) / 255),
                (this.b = Math.min(255, parseInt(c[3], 10)) / 255),
                b(c[5]),
                this
              )
            if (
              (c = /^(\d+)%\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                d,
              ))
            )
              return (
                (this.r = Math.min(100, parseInt(c[1], 10)) / 100),
                (this.g = Math.min(100, parseInt(c[2], 10)) / 100),
                (this.b = Math.min(100, parseInt(c[3], 10)) / 100),
                b(c[5]),
                this
              )
            break
          case 'hsl':
          case 'hsla':
            if (
              (c = /^([0-9]*\.?[0-9]+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(,\s*([0-9]*\.?[0-9]+)\s*)?$/.exec(
                d,
              ))
            ) {
              d = parseFloat(c[1]) / 360
              var f = parseInt(c[2], 10) / 100,
                g = parseInt(c[3], 10) / 100
              b(c[5])
              return this.setHSL(d, f, g)
            }
        }
      } else if ((c = /^#([A-Fa-f0-9]+)$/.exec(a))) {
        c = c[1]
        d = c.length
        if (3 === d)
          return (
            (this.r = parseInt(c.charAt(0) + c.charAt(0), 16) / 255),
            (this.g = parseInt(c.charAt(1) + c.charAt(1), 16) / 255),
            (this.b = parseInt(c.charAt(2) + c.charAt(2), 16) / 255),
            this
          )
        if (6 === d)
          return (
            (this.r = parseInt(c.charAt(0) + c.charAt(1), 16) / 255),
            (this.g = parseInt(c.charAt(2) + c.charAt(3), 16) / 255),
            (this.b = parseInt(c.charAt(4) + c.charAt(5), 16) / 255),
            this
          )
      }
      return a && 0 < a.length ? this.setColorName(a) : this
    },
    setColorName: function (a) {
      var b = oj[a]
      void 0 !== b
        ? this.setHex(b)
        : console.warn('THREE.Color: Unknown color ' + a)
      return this
    },
    clone: function () {
      return new this.constructor(this.r, this.g, this.b)
    },
    copy: function (a) {
      this.r = a.r
      this.g = a.g
      this.b = a.b
      return this
    },
    copyGammaToLinear: function (a, b) {
      void 0 === b && (b = 2)
      this.r = Math.pow(a.r, b)
      this.g = Math.pow(a.g, b)
      this.b = Math.pow(a.b, b)
      return this
    },
    copyLinearToGamma: function (a, b) {
      void 0 === b && (b = 2)
      b = 0 < b ? 1 / b : 1
      this.r = Math.pow(a.r, b)
      this.g = Math.pow(a.g, b)
      this.b = Math.pow(a.b, b)
      return this
    },
    convertGammaToLinear: function (a) {
      this.copyGammaToLinear(this, a)
      return this
    },
    convertLinearToGamma: function (a) {
      this.copyLinearToGamma(this, a)
      return this
    },
    copySRGBToLinear: function (a) {
      this.r = ug(a.r)
      this.g = ug(a.g)
      this.b = ug(a.b)
      return this
    },
    copyLinearToSRGB: function (a) {
      this.r = vg(a.r)
      this.g = vg(a.g)
      this.b = vg(a.b)
      return this
    },
    convertSRGBToLinear: function () {
      this.copySRGBToLinear(this)
      return this
    },
    convertLinearToSRGB: function () {
      this.copyLinearToSRGB(this)
      return this
    },
    getHex: function () {
      return (
        ((255 * this.r) << 16) ^ ((255 * this.g) << 8) ^ ((255 * this.b) << 0)
      )
    },
    getHexString: function () {
      return ('000000' + this.getHex().toString(16)).slice(-6)
    },
    getHSL: function (a) {
      void 0 === a &&
        (console.warn('THREE.Color: .getHSL() target is now required'),
        (a = { h: 0, s: 0, l: 0 }))
      var b = this.r,
        c = this.g,
        d = this.b,
        f = Math.max(b, c, d),
        g = Math.min(b, c, d),
        k,
        m = (g + f) / 2
      if (g === f) g = k = 0
      else {
        var n = f - g
        g = 0.5 >= m ? n / (f + g) : n / (2 - f - g)
        switch (f) {
          case b:
            k = (c - d) / n + (c < d ? 6 : 0)
            break
          case c:
            k = (d - b) / n + 2
            break
          case d:
            k = (b - c) / n + 4
        }
        k /= 6
      }
      a.h = k
      a.s = g
      a.l = m
      return a
    },
    getStyle: function () {
      return (
        'rgb(' +
        ((255 * this.r) | 0) +
        ',' +
        ((255 * this.g) | 0) +
        ',' +
        ((255 * this.b) | 0) +
        ')'
      )
    },
    offsetHSL: function (a, b, c) {
      this.getHSL(Ha)
      Ha.h += a
      Ha.s += b
      Ha.l += c
      this.setHSL(Ha.h, Ha.s, Ha.l)
      return this
    },
    add: function (a) {
      this.r += a.r
      this.g += a.g
      this.b += a.b
      return this
    },
    addColors: function (a, b) {
      this.r = a.r + b.r
      this.g = a.g + b.g
      this.b = a.b + b.b
      return this
    },
    addScalar: function (a) {
      this.r += a
      this.g += a
      this.b += a
      return this
    },
    sub: function (a) {
      this.r = Math.max(0, this.r - a.r)
      this.g = Math.max(0, this.g - a.g)
      this.b = Math.max(0, this.b - a.b)
      return this
    },
    multiply: function (a) {
      this.r *= a.r
      this.g *= a.g
      this.b *= a.b
      return this
    },
    multiplyScalar: function (a) {
      this.r *= a
      this.g *= a
      this.b *= a
      return this
    },
    lerp: function (a, b) {
      this.r += (a.r - this.r) * b
      this.g += (a.g - this.g) * b
      this.b += (a.b - this.b) * b
      return this
    },
    lerpHSL: function (a, b) {
      this.getHSL(Ha)
      a.getHSL(Vf)
      a = N.lerp(Ha.h, Vf.h, b)
      var c = N.lerp(Ha.s, Vf.s, b)
      b = N.lerp(Ha.l, Vf.l, b)
      this.setHSL(a, c, b)
      return this
    },
    equals: function (a) {
      return a.r === this.r && a.g === this.g && a.b === this.b
    },
    fromArray: function (a, b) {
      void 0 === b && (b = 0)
      this.r = a[b]
      this.g = a[b + 1]
      this.b = a[b + 2]
      return this
    },
    toArray: function (a, b) {
      void 0 === a && (a = [])
      void 0 === b && (b = 0)
      a[b] = this.r
      a[b + 1] = this.g
      a[b + 2] = this.b
      return a
    },
    toJSON: function () {
      return this.getHex()
    },
  })
  D.NAMES = oj
  Object.assign(Mc.prototype, {
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.a = a.a
      this.b = a.b
      this.c = a.c
      this.normal.copy(a.normal)
      this.color.copy(a.color)
      this.materialIndex = a.materialIndex
      for (var b = 0, c = a.vertexNormals.length; b < c; b++)
        this.vertexNormals[b] = a.vertexNormals[b].clone()
      b = 0
      for (c = a.vertexColors.length; b < c; b++)
        this.vertexColors[b] = a.vertexColors[b].clone()
      return this
    },
  })
  var Qj = 0
  R.prototype = Object.assign(Object.create(Ra.prototype), {
    constructor: R,
    isMaterial: !0,
    onBeforeCompile: function () {},
    setValues: function (a) {
      if (void 0 !== a)
        for (var b in a) {
          var c = a[b]
          if (void 0 === c)
            console.warn("THREE.Material: '" + b + "' parameter is undefined.")
          else if ('shading' === b)
            console.warn(
              'THREE.' +
                this.type +
                ': .shading has been removed. Use the boolean .flatShading instead.',
            ),
              (this.flatShading = 1 === c ? !0 : !1)
          else {
            var d = this[b]
            void 0 === d
              ? console.warn(
                  'THREE.' +
                    this.type +
                    ": '" +
                    b +
                    "' is not a property of this material.",
                )
              : d && d.isColor
              ? d.set(c)
              : d && d.isVector3 && c && c.isVector3
              ? d.copy(c)
              : (this[b] = c)
          }
        }
    },
    toJSON: function (a) {
      function b(a) {
        var b = [],
          c
        for (c in a) {
          var d = a[c]
          delete d.metadata
          b.push(d)
        }
        return b
      }
      var c = void 0 === a || 'string' === typeof a
      c && (a = { textures: {}, images: {} })
      var d = {
        metadata: {
          version: 4.5,
          type: 'Material',
          generator: 'Material.toJSON',
        },
      }
      d.uuid = this.uuid
      d.type = this.type
      '' !== this.name && (d.name = this.name)
      this.color && this.color.isColor && (d.color = this.color.getHex())
      void 0 !== this.roughness && (d.roughness = this.roughness)
      void 0 !== this.metalness && (d.metalness = this.metalness)
      this.sheen && this.sheen.isColor && (d.sheen = this.sheen.getHex())
      this.emissive &&
        this.emissive.isColor &&
        (d.emissive = this.emissive.getHex())
      this.emissiveIntensity &&
        1 !== this.emissiveIntensity &&
        (d.emissiveIntensity = this.emissiveIntensity)
      this.specular &&
        this.specular.isColor &&
        (d.specular = this.specular.getHex())
      void 0 !== this.shininess && (d.shininess = this.shininess)
      void 0 !== this.clearcoat && (d.clearcoat = this.clearcoat)
      void 0 !== this.clearcoatRoughness &&
        (d.clearcoatRoughness = this.clearcoatRoughness)
      this.clearcoatNormalMap &&
        this.clearcoatNormalMap.isTexture &&
        ((d.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(a).uuid),
        (d.clearcoatNormalScale = this.clearcoatNormalScale.toArray()))
      this.map && this.map.isTexture && (d.map = this.map.toJSON(a).uuid)
      this.matcap &&
        this.matcap.isTexture &&
        (d.matcap = this.matcap.toJSON(a).uuid)
      this.alphaMap &&
        this.alphaMap.isTexture &&
        (d.alphaMap = this.alphaMap.toJSON(a).uuid)
      this.lightMap &&
        this.lightMap.isTexture &&
        (d.lightMap = this.lightMap.toJSON(a).uuid)
      this.aoMap &&
        this.aoMap.isTexture &&
        ((d.aoMap = this.aoMap.toJSON(a).uuid),
        (d.aoMapIntensity = this.aoMapIntensity))
      this.bumpMap &&
        this.bumpMap.isTexture &&
        ((d.bumpMap = this.bumpMap.toJSON(a).uuid),
        (d.bumpScale = this.bumpScale))
      this.normalMap &&
        this.normalMap.isTexture &&
        ((d.normalMap = this.normalMap.toJSON(a).uuid),
        (d.normalMapType = this.normalMapType),
        (d.normalScale = this.normalScale.toArray()))
      this.displacementMap &&
        this.displacementMap.isTexture &&
        ((d.displacementMap = this.displacementMap.toJSON(a).uuid),
        (d.displacementScale = this.displacementScale),
        (d.displacementBias = this.displacementBias))
      this.roughnessMap &&
        this.roughnessMap.isTexture &&
        (d.roughnessMap = this.roughnessMap.toJSON(a).uuid)
      this.metalnessMap &&
        this.metalnessMap.isTexture &&
        (d.metalnessMap = this.metalnessMap.toJSON(a).uuid)
      this.emissiveMap &&
        this.emissiveMap.isTexture &&
        (d.emissiveMap = this.emissiveMap.toJSON(a).uuid)
      this.specularMap &&
        this.specularMap.isTexture &&
        (d.specularMap = this.specularMap.toJSON(a).uuid)
      this.envMap &&
        this.envMap.isTexture &&
        ((d.envMap = this.envMap.toJSON(a).uuid),
        (d.reflectivity = this.reflectivity),
        (d.refractionRatio = this.refractionRatio),
        void 0 !== this.combine && (d.combine = this.combine),
        void 0 !== this.envMapIntensity &&
          (d.envMapIntensity = this.envMapIntensity))
      this.gradientMap &&
        this.gradientMap.isTexture &&
        (d.gradientMap = this.gradientMap.toJSON(a).uuid)
      void 0 !== this.size && (d.size = this.size)
      void 0 !== this.sizeAttenuation &&
        (d.sizeAttenuation = this.sizeAttenuation)
      1 !== this.blending && (d.blending = this.blending)
      !0 === this.flatShading && (d.flatShading = this.flatShading)
      0 !== this.side && (d.side = this.side)
      0 !== this.vertexColors && (d.vertexColors = this.vertexColors)
      1 > this.opacity && (d.opacity = this.opacity)
      !0 === this.transparent && (d.transparent = this.transparent)
      d.depthFunc = this.depthFunc
      d.depthTest = this.depthTest
      d.depthWrite = this.depthWrite
      d.stencilWrite = this.stencilWrite
      d.stencilWriteMask = this.stencilWriteMask
      d.stencilFunc = this.stencilFunc
      d.stencilRef = this.stencilRef
      d.stencilFuncMask = this.stencilFuncMask
      d.stencilFail = this.stencilFail
      d.stencilZFail = this.stencilZFail
      d.stencilZPass = this.stencilZPass
      this.rotation && 0 !== this.rotation && (d.rotation = this.rotation)
      !0 === this.polygonOffset && (d.polygonOffset = !0)
      0 !== this.polygonOffsetFactor &&
        (d.polygonOffsetFactor = this.polygonOffsetFactor)
      0 !== this.polygonOffsetUnits &&
        (d.polygonOffsetUnits = this.polygonOffsetUnits)
      this.linewidth && 1 !== this.linewidth && (d.linewidth = this.linewidth)
      void 0 !== this.dashSize && (d.dashSize = this.dashSize)
      void 0 !== this.gapSize && (d.gapSize = this.gapSize)
      void 0 !== this.scale && (d.scale = this.scale)
      !0 === this.dithering && (d.dithering = !0)
      0 < this.alphaTest && (d.alphaTest = this.alphaTest)
      !0 === this.premultipliedAlpha &&
        (d.premultipliedAlpha = this.premultipliedAlpha)
      !0 === this.wireframe && (d.wireframe = this.wireframe)
      1 < this.wireframeLinewidth &&
        (d.wireframeLinewidth = this.wireframeLinewidth)
      'round' !== this.wireframeLinecap &&
        (d.wireframeLinecap = this.wireframeLinecap)
      'round' !== this.wireframeLinejoin &&
        (d.wireframeLinejoin = this.wireframeLinejoin)
      !0 === this.morphTargets && (d.morphTargets = !0)
      !0 === this.morphNormals && (d.morphNormals = !0)
      !0 === this.skinning && (d.skinning = !0)
      !1 === this.visible && (d.visible = !1)
      !1 === this.toneMapped && (d.toneMapped = !1)
      '{}' !== JSON.stringify(this.userData) && (d.userData = this.userData)
      c &&
        ((c = b(a.textures)),
        (a = b(a.images)),
        0 < c.length && (d.textures = c),
        0 < a.length && (d.images = a))
      return d
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.name = a.name
      this.fog = a.fog
      this.blending = a.blending
      this.side = a.side
      this.flatShading = a.flatShading
      this.vertexTangents = a.vertexTangents
      this.vertexColors = a.vertexColors
      this.opacity = a.opacity
      this.transparent = a.transparent
      this.blendSrc = a.blendSrc
      this.blendDst = a.blendDst
      this.blendEquation = a.blendEquation
      this.blendSrcAlpha = a.blendSrcAlpha
      this.blendDstAlpha = a.blendDstAlpha
      this.blendEquationAlpha = a.blendEquationAlpha
      this.depthFunc = a.depthFunc
      this.depthTest = a.depthTest
      this.depthWrite = a.depthWrite
      this.stencilWriteMask = a.stencilWriteMask
      this.stencilFunc = a.stencilFunc
      this.stencilRef = a.stencilRef
      this.stencilFuncMask = a.stencilFuncMask
      this.stencilFail = a.stencilFail
      this.stencilZFail = a.stencilZFail
      this.stencilZPass = a.stencilZPass
      this.stencilWrite = a.stencilWrite
      var b = a.clippingPlanes,
        c = null
      if (null !== b) {
        var d = b.length
        c = Array(d)
        for (var f = 0; f !== d; ++f) c[f] = b[f].clone()
      }
      this.clippingPlanes = c
      this.clipIntersection = a.clipIntersection
      this.clipShadows = a.clipShadows
      this.shadowSide = a.shadowSide
      this.colorWrite = a.colorWrite
      this.precision = a.precision
      this.polygonOffset = a.polygonOffset
      this.polygonOffsetFactor = a.polygonOffsetFactor
      this.polygonOffsetUnits = a.polygonOffsetUnits
      this.dithering = a.dithering
      this.alphaTest = a.alphaTest
      this.premultipliedAlpha = a.premultipliedAlpha
      this.visible = a.visible
      this.toneMapped = a.toneMapped
      this.userData = JSON.parse(JSON.stringify(a.userData))
      return this
    },
    dispose: function () {
      this.dispatchEvent({ type: 'dispose' })
    },
  })
  Ia.prototype = Object.create(R.prototype)
  Ia.prototype.constructor = Ia
  Ia.prototype.isMeshBasicMaterial = !0
  Ia.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.color.copy(a.color)
    this.map = a.map
    this.lightMap = a.lightMap
    this.lightMapIntensity = a.lightMapIntensity
    this.aoMap = a.aoMap
    this.aoMapIntensity = a.aoMapIntensity
    this.specularMap = a.specularMap
    this.alphaMap = a.alphaMap
    this.envMap = a.envMap
    this.combine = a.combine
    this.reflectivity = a.reflectivity
    this.refractionRatio = a.refractionRatio
    this.wireframe = a.wireframe
    this.wireframeLinewidth = a.wireframeLinewidth
    this.wireframeLinecap = a.wireframeLinecap
    this.wireframeLinejoin = a.wireframeLinejoin
    this.skinning = a.skinning
    this.morphTargets = a.morphTargets
    return this
  }
  Object.defineProperty(O.prototype, 'needsUpdate', {
    set: function (a) {
      !0 === a && this.version++
    },
  })
  Object.assign(O.prototype, {
    isBufferAttribute: !0,
    onUploadCallback: function () {},
    setUsage: function (a) {
      this.usage = a
      return this
    },
    copy: function (a) {
      this.name = a.name
      this.array = new a.array.constructor(a.array)
      this.itemSize = a.itemSize
      this.count = a.count
      this.normalized = a.normalized
      this.usage = a.usage
      return this
    },
    copyAt: function (a, b, c) {
      a *= this.itemSize
      c *= b.itemSize
      for (var d = 0, f = this.itemSize; d < f; d++)
        this.array[a + d] = b.array[c + d]
      return this
    },
    copyArray: function (a) {
      this.array.set(a)
      return this
    },
    copyColorsArray: function (a) {
      for (var b = this.array, c = 0, d = 0, f = a.length; d < f; d++) {
        var g = a[d]
        void 0 === g &&
          (console.warn(
            'THREE.BufferAttribute.copyColorsArray(): color is undefined',
            d,
          ),
          (g = new D()))
        b[c++] = g.r
        b[c++] = g.g
        b[c++] = g.b
      }
      return this
    },
    copyVector2sArray: function (a) {
      for (var b = this.array, c = 0, d = 0, f = a.length; d < f; d++) {
        var g = a[d]
        void 0 === g &&
          (console.warn(
            'THREE.BufferAttribute.copyVector2sArray(): vector is undefined',
            d,
          ),
          (g = new z()))
        b[c++] = g.x
        b[c++] = g.y
      }
      return this
    },
    copyVector3sArray: function (a) {
      for (var b = this.array, c = 0, d = 0, f = a.length; d < f; d++) {
        var g = a[d]
        void 0 === g &&
          (console.warn(
            'THREE.BufferAttribute.copyVector3sArray(): vector is undefined',
            d,
          ),
          (g = new q()))
        b[c++] = g.x
        b[c++] = g.y
        b[c++] = g.z
      }
      return this
    },
    copyVector4sArray: function (a) {
      for (var b = this.array, c = 0, d = 0, f = a.length; d < f; d++) {
        var g = a[d]
        void 0 === g &&
          (console.warn(
            'THREE.BufferAttribute.copyVector4sArray(): vector is undefined',
            d,
          ),
          (g = new ca()))
        b[c++] = g.x
        b[c++] = g.y
        b[c++] = g.z
        b[c++] = g.w
      }
      return this
    },
    set: function (a, b) {
      void 0 === b && (b = 0)
      this.array.set(a, b)
      return this
    },
    getX: function (a) {
      return this.array[a * this.itemSize]
    },
    setX: function (a, b) {
      this.array[a * this.itemSize] = b
      return this
    },
    getY: function (a) {
      return this.array[a * this.itemSize + 1]
    },
    setY: function (a, b) {
      this.array[a * this.itemSize + 1] = b
      return this
    },
    getZ: function (a) {
      return this.array[a * this.itemSize + 2]
    },
    setZ: function (a, b) {
      this.array[a * this.itemSize + 2] = b
      return this
    },
    getW: function (a) {
      return this.array[a * this.itemSize + 3]
    },
    setW: function (a, b) {
      this.array[a * this.itemSize + 3] = b
      return this
    },
    setXY: function (a, b, c) {
      a *= this.itemSize
      this.array[a + 0] = b
      this.array[a + 1] = c
      return this
    },
    setXYZ: function (a, b, c, d) {
      a *= this.itemSize
      this.array[a + 0] = b
      this.array[a + 1] = c
      this.array[a + 2] = d
      return this
    },
    setXYZW: function (a, b, c, d, f) {
      a *= this.itemSize
      this.array[a + 0] = b
      this.array[a + 1] = c
      this.array[a + 2] = d
      this.array[a + 3] = f
      return this
    },
    onUpload: function (a) {
      this.onUploadCallback = a
      return this
    },
    clone: function () {
      return new this.constructor(this.array, this.itemSize).copy(this)
    },
    toJSON: function () {
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: Array.prototype.slice.call(this.array),
        normalized: this.normalized,
      }
    },
  })
  Ld.prototype = Object.create(O.prototype)
  Ld.prototype.constructor = Ld
  Md.prototype = Object.create(O.prototype)
  Md.prototype.constructor = Md
  Nd.prototype = Object.create(O.prototype)
  Nd.prototype.constructor = Nd
  Od.prototype = Object.create(O.prototype)
  Od.prototype.constructor = Od
  bc.prototype = Object.create(O.prototype)
  bc.prototype.constructor = bc
  Pd.prototype = Object.create(O.prototype)
  Pd.prototype.constructor = Pd
  cc.prototype = Object.create(O.prototype)
  cc.prototype.constructor = cc
  F.prototype = Object.create(O.prototype)
  F.prototype.constructor = F
  Qd.prototype = Object.create(O.prototype)
  Qd.prototype.constructor = Qd
  Object.assign(Vh.prototype, {
    computeGroups: function (a) {
      var b = [],
        c = void 0
      a = a.faces
      for (var d = 0; d < a.length; d++) {
        var f = a[d]
        if (f.materialIndex !== c) {
          c = f.materialIndex
          void 0 !== g && ((g.count = 3 * d - g.start), b.push(g))
          var g = { start: 3 * d, materialIndex: c }
        }
      }
      void 0 !== g && ((g.count = 3 * d - g.start), b.push(g))
      this.groups = b
    },
    fromGeometry: function (a) {
      var b = a.faces,
        c = a.vertices,
        d = a.faceVertexUvs,
        f = d[0] && 0 < d[0].length,
        g = d[1] && 0 < d[1].length,
        k = a.morphTargets,
        m = k.length
      if (0 < m) {
        var n = []
        for (var l = 0; l < m; l++) n[l] = { name: k[l].name, data: [] }
        this.morphTargets.position = n
      }
      var q = a.morphNormals,
        t = q.length
      if (0 < t) {
        var r = []
        for (l = 0; l < t; l++) r[l] = { name: q[l].name, data: [] }
        this.morphTargets.normal = r
      }
      var u = a.skinIndices,
        v = a.skinWeights,
        w = u.length === c.length,
        x = v.length === c.length
      0 < c.length &&
        0 === b.length &&
        console.error(
          'THREE.DirectGeometry: Faceless geometries are not supported.',
        )
      for (l = 0; l < b.length; l++) {
        var B = b[l]
        this.vertices.push(c[B.a], c[B.b], c[B.c])
        var C = B.vertexNormals
        3 === C.length
          ? this.normals.push(C[0], C[1], C[2])
          : ((C = B.normal), this.normals.push(C, C, C))
        C = B.vertexColors
        3 === C.length
          ? this.colors.push(C[0], C[1], C[2])
          : ((C = B.color), this.colors.push(C, C, C))
        !0 === f &&
          ((C = d[0][l]),
          void 0 !== C
            ? this.uvs.push(C[0], C[1], C[2])
            : (console.warn(
                'THREE.DirectGeometry.fromGeometry(): Undefined vertexUv ',
                l,
              ),
              this.uvs.push(new z(), new z(), new z())))
        !0 === g &&
          ((C = d[1][l]),
          void 0 !== C
            ? this.uvs2.push(C[0], C[1], C[2])
            : (console.warn(
                'THREE.DirectGeometry.fromGeometry(): Undefined vertexUv2 ',
                l,
              ),
              this.uvs2.push(new z(), new z(), new z())))
        for (C = 0; C < m; C++) {
          var A = k[C].vertices
          n[C].data.push(A[B.a], A[B.b], A[B.c])
        }
        for (C = 0; C < t; C++)
          (A = q[C].vertexNormals[l]), r[C].data.push(A.a, A.b, A.c)
        w && this.skinIndices.push(u[B.a], u[B.b], u[B.c])
        x && this.skinWeights.push(v[B.a], v[B.b], v[B.c])
      }
      this.computeGroups(a)
      this.verticesNeedUpdate = a.verticesNeedUpdate
      this.normalsNeedUpdate = a.normalsNeedUpdate
      this.colorsNeedUpdate = a.colorsNeedUpdate
      this.uvsNeedUpdate = a.uvsNeedUpdate
      this.groupsNeedUpdate = a.groupsNeedUpdate
      null !== a.boundingSphere &&
        (this.boundingSphere = a.boundingSphere.clone())
      null !== a.boundingBox && (this.boundingBox = a.boundingBox.clone())
      return this
    },
  })
  var Rj = 1,
    pb = new I(),
    Ah = new E(),
    Wf = new q(),
    Dc = new gb(),
    Bh = new gb(),
    db = new q()
  G.prototype = Object.assign(Object.create(Ra.prototype), {
    constructor: G,
    isBufferGeometry: !0,
    getIndex: function () {
      return this.index
    },
    setIndex: function (a) {
      Array.isArray(a)
        ? (this.index = new (65535 < Wh(a) ? cc : bc)(a, 1))
        : (this.index = a)
    },
    getAttribute: function (a) {
      return this.attributes[a]
    },
    setAttribute: function (a, b) {
      this.attributes[a] = b
      return this
    },
    deleteAttribute: function (a) {
      delete this.attributes[a]
      return this
    },
    addGroup: function (a, b, c) {
      this.groups.push({
        start: a,
        count: b,
        materialIndex: void 0 !== c ? c : 0,
      })
    },
    clearGroups: function () {
      this.groups = []
    },
    setDrawRange: function (a, b) {
      this.drawRange.start = a
      this.drawRange.count = b
    },
    applyMatrix: function (a) {
      var b = this.attributes.position
      void 0 !== b && (a.applyToBufferAttribute(b), (b.needsUpdate = !0))
      var c = this.attributes.normal
      void 0 !== c &&
        ((b = new ka().getNormalMatrix(a)),
        b.applyToBufferAttribute(c),
        (c.needsUpdate = !0))
      c = this.attributes.tangent
      void 0 !== c &&
        ((b = new ka().getNormalMatrix(a)),
        b.applyToBufferAttribute(c),
        (c.needsUpdate = !0))
      null !== this.boundingBox && this.computeBoundingBox()
      null !== this.boundingSphere && this.computeBoundingSphere()
      return this
    },
    rotateX: function (a) {
      pb.makeRotationX(a)
      this.applyMatrix(pb)
      return this
    },
    rotateY: function (a) {
      pb.makeRotationY(a)
      this.applyMatrix(pb)
      return this
    },
    rotateZ: function (a) {
      pb.makeRotationZ(a)
      this.applyMatrix(pb)
      return this
    },
    translate: function (a, b, c) {
      pb.makeTranslation(a, b, c)
      this.applyMatrix(pb)
      return this
    },
    scale: function (a, b, c) {
      pb.makeScale(a, b, c)
      this.applyMatrix(pb)
      return this
    },
    lookAt: function (a) {
      Ah.lookAt(a)
      Ah.updateMatrix()
      this.applyMatrix(Ah.matrix)
      return this
    },
    center: function () {
      this.computeBoundingBox()
      this.boundingBox.getCenter(Wf).negate()
      this.translate(Wf.x, Wf.y, Wf.z)
      return this
    },
    setFromObject: function (a) {
      var b = a.geometry
      if (a.isPoints || a.isLine) {
        a = new F(3 * b.vertices.length, 3)
        var c = new F(3 * b.colors.length, 3)
        this.setAttribute('position', a.copyVector3sArray(b.vertices))
        this.setAttribute('color', c.copyColorsArray(b.colors))
        b.lineDistances &&
          b.lineDistances.length === b.vertices.length &&
          ((a = new F(b.lineDistances.length, 1)),
          this.setAttribute('lineDistance', a.copyArray(b.lineDistances)))
        null !== b.boundingSphere &&
          (this.boundingSphere = b.boundingSphere.clone())
        null !== b.boundingBox && (this.boundingBox = b.boundingBox.clone())
      } else a.isMesh && b && b.isGeometry && this.fromGeometry(b)
      return this
    },
    setFromPoints: function (a) {
      for (var b = [], c = 0, d = a.length; c < d; c++) {
        var f = a[c]
        b.push(f.x, f.y, f.z || 0)
      }
      this.setAttribute('position', new F(b, 3))
      return this
    },
    updateFromObject: function (a) {
      var b = a.geometry
      if (a.isMesh) {
        var c = b.__directGeometry
        !0 === b.elementsNeedUpdate &&
          ((c = void 0), (b.elementsNeedUpdate = !1))
        if (void 0 === c) return this.fromGeometry(b)
        c.verticesNeedUpdate = b.verticesNeedUpdate
        c.normalsNeedUpdate = b.normalsNeedUpdate
        c.colorsNeedUpdate = b.colorsNeedUpdate
        c.uvsNeedUpdate = b.uvsNeedUpdate
        c.groupsNeedUpdate = b.groupsNeedUpdate
        b.verticesNeedUpdate = !1
        b.normalsNeedUpdate = !1
        b.colorsNeedUpdate = !1
        b.uvsNeedUpdate = !1
        b.groupsNeedUpdate = !1
        b = c
      }
      !0 === b.verticesNeedUpdate &&
        ((c = this.attributes.position),
        void 0 !== c && (c.copyVector3sArray(b.vertices), (c.needsUpdate = !0)),
        (b.verticesNeedUpdate = !1))
      !0 === b.normalsNeedUpdate &&
        ((c = this.attributes.normal),
        void 0 !== c && (c.copyVector3sArray(b.normals), (c.needsUpdate = !0)),
        (b.normalsNeedUpdate = !1))
      !0 === b.colorsNeedUpdate &&
        ((c = this.attributes.color),
        void 0 !== c && (c.copyColorsArray(b.colors), (c.needsUpdate = !0)),
        (b.colorsNeedUpdate = !1))
      b.uvsNeedUpdate &&
        ((c = this.attributes.uv),
        void 0 !== c && (c.copyVector2sArray(b.uvs), (c.needsUpdate = !0)),
        (b.uvsNeedUpdate = !1))
      b.lineDistancesNeedUpdate &&
        ((c = this.attributes.lineDistance),
        void 0 !== c && (c.copyArray(b.lineDistances), (c.needsUpdate = !0)),
        (b.lineDistancesNeedUpdate = !1))
      b.groupsNeedUpdate &&
        (b.computeGroups(a.geometry),
        (this.groups = b.groups),
        (b.groupsNeedUpdate = !1))
      return this
    },
    fromGeometry: function (a) {
      a.__directGeometry = new Vh().fromGeometry(a)
      return this.fromDirectGeometry(a.__directGeometry)
    },
    fromDirectGeometry: function (a) {
      var b = new Float32Array(3 * a.vertices.length)
      this.setAttribute('position', new O(b, 3).copyVector3sArray(a.vertices))
      0 < a.normals.length &&
        ((b = new Float32Array(3 * a.normals.length)),
        this.setAttribute('normal', new O(b, 3).copyVector3sArray(a.normals)))
      0 < a.colors.length &&
        ((b = new Float32Array(3 * a.colors.length)),
        this.setAttribute('color', new O(b, 3).copyColorsArray(a.colors)))
      0 < a.uvs.length &&
        ((b = new Float32Array(2 * a.uvs.length)),
        this.setAttribute('uv', new O(b, 2).copyVector2sArray(a.uvs)))
      0 < a.uvs2.length &&
        ((b = new Float32Array(2 * a.uvs2.length)),
        this.setAttribute('uv2', new O(b, 2).copyVector2sArray(a.uvs2)))
      this.groups = a.groups
      for (var c in a.morphTargets) {
        b = []
        for (var d = a.morphTargets[c], f = 0, g = d.length; f < g; f++) {
          var k = d[f],
            m = new F(3 * k.data.length, 3)
          m.name = k.name
          b.push(m.copyVector3sArray(k.data))
        }
        this.morphAttributes[c] = b
      }
      0 < a.skinIndices.length &&
        ((c = new F(4 * a.skinIndices.length, 4)),
        this.setAttribute('skinIndex', c.copyVector4sArray(a.skinIndices)))
      0 < a.skinWeights.length &&
        ((c = new F(4 * a.skinWeights.length, 4)),
        this.setAttribute('skinWeight', c.copyVector4sArray(a.skinWeights)))
      null !== a.boundingSphere &&
        (this.boundingSphere = a.boundingSphere.clone())
      null !== a.boundingBox && (this.boundingBox = a.boundingBox.clone())
      return this
    },
    computeBoundingBox: function () {
      null === this.boundingBox && (this.boundingBox = new gb())
      var a = this.attributes.position,
        b = this.morphAttributes.position
      if (void 0 !== a) {
        if ((this.boundingBox.setFromBufferAttribute(a), b)) {
          a = 0
          for (var c = b.length; a < c; a++)
            Dc.setFromBufferAttribute(b[a]),
              this.boundingBox.expandByPoint(Dc.min),
              this.boundingBox.expandByPoint(Dc.max)
        }
      } else this.boundingBox.makeEmpty()
      ;(isNaN(this.boundingBox.min.x) ||
        isNaN(this.boundingBox.min.y) ||
        isNaN(this.boundingBox.min.z)) &&
        console.error(
          'THREE.BufferGeometry.computeBoundingBox: Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',
          this,
        )
    },
    computeBoundingSphere: function () {
      null === this.boundingSphere && (this.boundingSphere = new ub())
      var a = this.attributes.position,
        b = this.morphAttributes.position
      if (a) {
        var c = this.boundingSphere.center
        Dc.setFromBufferAttribute(a)
        if (b)
          for (var d = 0, f = b.length; d < f; d++) {
            var g = b[d]
            Bh.setFromBufferAttribute(g)
            Dc.expandByPoint(Bh.min)
            Dc.expandByPoint(Bh.max)
          }
        Dc.getCenter(c)
        var k = 0
        d = 0
        for (f = a.count; d < f; d++)
          db.fromBufferAttribute(a, d),
            (k = Math.max(k, c.distanceToSquared(db)))
        if (b)
          for (d = 0, f = b.length; d < f; d++) {
            g = b[d]
            a = 0
            for (var m = g.count; a < m; a++)
              db.fromBufferAttribute(g, a),
                (k = Math.max(k, c.distanceToSquared(db)))
          }
        this.boundingSphere.radius = Math.sqrt(k)
        isNaN(this.boundingSphere.radius) &&
          console.error(
            'THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',
            this,
          )
      }
    },
    computeFaceNormals: function () {},
    computeVertexNormals: function () {
      var a = this.index,
        b = this.attributes
      if (b.position) {
        var c = b.position.array
        if (void 0 === b.normal)
          this.setAttribute('normal', new O(new Float32Array(c.length), 3))
        else
          for (var d = b.normal.array, f = 0, g = d.length; f < g; f++) d[f] = 0
        d = b.normal.array
        var k = new q(),
          m = new q(),
          n = new q(),
          l = new q(),
          y = new q()
        if (a) {
          var t = a.array
          f = 0
          for (g = a.count; f < g; f += 3) {
            a = 3 * t[f + 0]
            var r = 3 * t[f + 1]
            var u = 3 * t[f + 2]
            k.fromArray(c, a)
            m.fromArray(c, r)
            n.fromArray(c, u)
            l.subVectors(n, m)
            y.subVectors(k, m)
            l.cross(y)
            d[a] += l.x
            d[a + 1] += l.y
            d[a + 2] += l.z
            d[r] += l.x
            d[r + 1] += l.y
            d[r + 2] += l.z
            d[u] += l.x
            d[u + 1] += l.y
            d[u + 2] += l.z
          }
        } else
          for (f = 0, g = c.length; f < g; f += 9)
            k.fromArray(c, f),
              m.fromArray(c, f + 3),
              n.fromArray(c, f + 6),
              l.subVectors(n, m),
              y.subVectors(k, m),
              l.cross(y),
              (d[f] = l.x),
              (d[f + 1] = l.y),
              (d[f + 2] = l.z),
              (d[f + 3] = l.x),
              (d[f + 4] = l.y),
              (d[f + 5] = l.z),
              (d[f + 6] = l.x),
              (d[f + 7] = l.y),
              (d[f + 8] = l.z)
        this.normalizeNormals()
        b.normal.needsUpdate = !0
      }
    },
    merge: function (a, b) {
      if (a && a.isBufferGeometry) {
        void 0 === b &&
          ((b = 0),
          console.warn(
            'THREE.BufferGeometry.merge(): Overwriting original geometry, starting at offset=0. Use BufferGeometryUtils.mergeBufferGeometries() for lossless merge.',
          ))
        var c = this.attributes,
          d
        for (d in c)
          if (void 0 !== a.attributes[d]) {
            var f = c[d].array,
              g = a.attributes[d],
              k = g.array,
              m = g.itemSize * b
            g = Math.min(k.length, f.length - m)
            for (var n = 0; n < g; n++, m++) f[m] = k[n]
          }
        return this
      }
      console.error(
        'THREE.BufferGeometry.merge(): geometry not an instance of THREE.BufferGeometry.',
        a,
      )
    },
    normalizeNormals: function () {
      for (var a = this.attributes.normal, b = 0, c = a.count; b < c; b++)
        (db.x = a.getX(b)),
          (db.y = a.getY(b)),
          (db.z = a.getZ(b)),
          db.normalize(),
          a.setXYZ(b, db.x, db.y, db.z)
    },
    toNonIndexed: function () {
      function a(a, b) {
        var c = a.array
        a = a.itemSize
        for (
          var d = new c.constructor(b.length * a),
            f,
            g = 0,
            k = 0,
            m = b.length;
          k < m;
          k++
        ) {
          f = b[k] * a
          for (var n = 0; n < a; n++) d[g++] = c[f++]
        }
        return new O(d, a)
      }
      if (null === this.index)
        return (
          console.warn(
            'THREE.BufferGeometry.toNonIndexed(): Geometry is already non-indexed.',
          ),
          this
        )
      var b = new G(),
        c = this.index.array,
        d = this.attributes,
        f
      for (f in d) {
        var g = d[f]
        g = a(g, c)
        b.setAttribute(f, g)
      }
      var k = this.morphAttributes
      for (f in k) {
        var m = [],
          n = k[f]
        d = 0
        for (var l = n.length; d < l; d++) (g = n[d]), (g = a(g, c)), m.push(g)
        b.morphAttributes[f] = m
      }
      c = this.groups
      d = 0
      for (f = c.length; d < f; d++)
        (g = c[d]), b.addGroup(g.start, g.count, g.materialIndex)
      return b
    },
    toJSON: function () {
      var a = {
        metadata: {
          version: 4.5,
          type: 'BufferGeometry',
          generator: 'BufferGeometry.toJSON',
        },
      }
      a.uuid = this.uuid
      a.type = this.type
      '' !== this.name && (a.name = this.name)
      0 < Object.keys(this.userData).length && (a.userData = this.userData)
      if (void 0 !== this.parameters) {
        var b = this.parameters
        for (l in b) void 0 !== b[l] && (a[l] = b[l])
        return a
      }
      a.data = { attributes: {} }
      b = this.index
      null !== b &&
        (a.data.index = {
          type: b.array.constructor.name,
          array: Array.prototype.slice.call(b.array),
        })
      var c = this.attributes
      for (l in c) {
        b = c[l]
        var d = b.toJSON()
        '' !== b.name && (d.name = b.name)
        a.data.attributes[l] = d
      }
      c = {}
      var f = !1
      for (l in this.morphAttributes) {
        for (
          var g = this.morphAttributes[l], k = [], m = 0, n = g.length;
          m < n;
          m++
        )
          (b = g[m]),
            (d = b.toJSON()),
            '' !== b.name && (d.name = b.name),
            k.push(d)
        0 < k.length && ((c[l] = k), (f = !0))
      }
      f && (a.data.morphAttributes = c)
      var l = this.groups
      0 < l.length && (a.data.groups = JSON.parse(JSON.stringify(l)))
      l = this.boundingSphere
      null !== l &&
        (a.data.boundingSphere = {
          center: l.center.toArray(),
          radius: l.radius,
        })
      return a
    },
    clone: function () {
      return new G().copy(this)
    },
    copy: function (a) {
      var b
      this.index = null
      this.attributes = {}
      this.morphAttributes = {}
      this.groups = []
      this.boundingSphere = this.boundingBox = null
      this.name = a.name
      var c = a.index
      null !== c && this.setIndex(c.clone())
      c = a.attributes
      for (k in c) this.setAttribute(k, c[k].clone())
      var d = a.morphAttributes
      for (k in d) {
        var f = [],
          g = d[k]
        c = 0
        for (b = g.length; c < b; c++) f.push(g[c].clone())
        this.morphAttributes[k] = f
      }
      var k = a.groups
      c = 0
      for (b = k.length; c < b; c++)
        (d = k[c]), this.addGroup(d.start, d.count, d.materialIndex)
      k = a.boundingBox
      null !== k && (this.boundingBox = k.clone())
      k = a.boundingSphere
      null !== k && (this.boundingSphere = k.clone())
      this.drawRange.start = a.drawRange.start
      this.drawRange.count = a.drawRange.count
      this.userData = a.userData
      return this
    },
    dispose: function () {
      this.dispatchEvent({ type: 'dispose' })
    },
  })
  var pj = new I(),
    Ec = new ac(),
    Ch = new ub(),
    dc = new q(),
    ec = new q(),
    fc = new q(),
    Yh = new q(),
    Zh = new q(),
    $h = new q(),
    wg = new q(),
    xg = new q(),
    yg = new q(),
    Nc = new z(),
    Oc = new z(),
    Pc = new z(),
    Rd = new q(),
    Xe = new q()
  ia.prototype = Object.assign(Object.create(E.prototype), {
    constructor: ia,
    isMesh: !0,
    setDrawMode: function (a) {
      this.drawMode = a
    },
    copy: function (a) {
      E.prototype.copy.call(this, a)
      this.drawMode = a.drawMode
      void 0 !== a.morphTargetInfluences &&
        (this.morphTargetInfluences = a.morphTargetInfluences.slice())
      void 0 !== a.morphTargetDictionary &&
        (this.morphTargetDictionary = Object.assign(
          {},
          a.morphTargetDictionary,
        ))
      return this
    },
    updateMorphTargets: function () {
      var a = this.geometry
      if (a.isBufferGeometry) {
        a = a.morphAttributes
        var b = Object.keys(a)
        if (0 < b.length) {
          var c = a[b[0]]
          if (void 0 !== c)
            for (
              this.morphTargetInfluences = [],
                this.morphTargetDictionary = {},
                a = 0,
                b = c.length;
              a < b;
              a++
            ) {
              var d = c[a].name || String(a)
              this.morphTargetInfluences.push(0)
              this.morphTargetDictionary[d] = a
            }
        }
      } else
        (a = a.morphTargets),
          void 0 !== a &&
            0 < a.length &&
            console.error(
              'THREE.Mesh.updateMorphTargets() no longer supports THREE.Geometry. Use THREE.BufferGeometry instead.',
            )
    },
    raycast: function (a, b) {
      var c = this.geometry,
        d = this.material,
        f = this.matrixWorld
      if (
        void 0 !== d &&
        (null === c.boundingSphere && c.computeBoundingSphere(),
        Ch.copy(c.boundingSphere),
        Ch.applyMatrix4(f),
        !1 !== a.ray.intersectsSphere(Ch) &&
          (pj.getInverse(f),
          Ec.copy(a.ray).applyMatrix4(pj),
          null === c.boundingBox || !1 !== Ec.intersectsBox(c.boundingBox)))
      )
        if (0 !== this.drawMode)
          console.warn(
            'THREE.Mesh: TriangleStripDrawMode and TriangleFanDrawMode are not supported by .raycast().',
          )
        else if (c.isBufferGeometry) {
          var g = c.index
          f = c.attributes.position
          var k = c.morphAttributes.position,
            m = c.attributes.uv,
            n = c.attributes.uv2,
            l = c.groups,
            q = c.drawRange,
            t,
            r
          if (null !== g)
            if (Array.isArray(d)) {
              var u = 0
              for (t = l.length; u < t; u++) {
                var v = l[u]
                var w = d[v.materialIndex]
                var x = Math.max(v.start, q.start)
                for (
                  r = c = Math.min(v.start + v.count, q.start + q.count);
                  x < r;
                  x += 3
                ) {
                  c = g.getX(x)
                  var B = g.getX(x + 1)
                  var C = g.getX(x + 2)
                  if ((c = Ye(this, w, a, Ec, f, k, m, n, c, B, C)))
                    (c.faceIndex = Math.floor(x / 3)),
                      (c.face.materialIndex = v.materialIndex),
                      b.push(c)
                }
              }
            } else
              for (
                x = Math.max(0, q.start),
                  c = Math.min(g.count, q.start + q.count),
                  u = x,
                  t = c;
                u < t;
                u += 3
              ) {
                if (
                  ((c = g.getX(u)),
                  (B = g.getX(u + 1)),
                  (C = g.getX(u + 2)),
                  (c = Ye(this, d, a, Ec, f, k, m, n, c, B, C)))
                )
                  (c.faceIndex = Math.floor(u / 3)), b.push(c)
              }
          else if (void 0 !== f)
            if (Array.isArray(d))
              for (u = 0, t = l.length; u < t; u++)
                for (
                  v = l[u],
                    w = d[v.materialIndex],
                    x = Math.max(v.start, q.start),
                    r = c = Math.min(v.start + v.count, q.start + q.count);
                  x < r;
                  x += 3
                ) {
                  if (
                    ((c = x),
                    (B = x + 1),
                    (C = x + 2),
                    (c = Ye(this, w, a, Ec, f, k, m, n, c, B, C)))
                  )
                    (c.faceIndex = Math.floor(x / 3)),
                      (c.face.materialIndex = v.materialIndex),
                      b.push(c)
                }
            else
              for (
                x = Math.max(0, q.start),
                  c = Math.min(f.count, q.start + q.count),
                  u = x,
                  t = c;
                u < t;
                u += 3
              )
                if (
                  ((c = u),
                  (B = u + 1),
                  (C = u + 2),
                  (c = Ye(this, d, a, Ec, f, k, m, n, c, B, C)))
                )
                  (c.faceIndex = Math.floor(u / 3)), b.push(c)
        } else if (c.isGeometry)
          for (
            f = Array.isArray(d),
              k = c.vertices,
              m = c.faces,
              c = c.faceVertexUvs[0],
              0 < c.length && (g = c),
              u = 0,
              t = m.length;
            u < t;
            u++
          )
            if (
              ((v = m[u]),
              (c = f ? d[v.materialIndex] : d),
              void 0 !== c &&
                ((n = k[v.a]),
                (l = k[v.b]),
                (q = k[v.c]),
                (c = Xh(this, c, a, Ec, n, l, q, Rd))))
            )
              g &&
                g[u] &&
                ((w = g[u]),
                Nc.copy(w[0]),
                Oc.copy(w[1]),
                Pc.copy(w[2]),
                (c.uv = va.getUV(Rd, n, l, q, Nc, Oc, Pc, new z()))),
                (c.face = v),
                (c.faceIndex = u),
                b.push(c)
    },
    clone: function () {
      return new this.constructor(this.geometry, this.material).copy(this)
    },
  })
  var Sj = 0,
    qb = new I(),
    Dh = new E(),
    Xf = new q()
  P.prototype = Object.assign(Object.create(Ra.prototype), {
    constructor: P,
    isGeometry: !0,
    applyMatrix: function (a) {
      for (
        var b = new ka().getNormalMatrix(a), c = 0, d = this.vertices.length;
        c < d;
        c++
      )
        this.vertices[c].applyMatrix4(a)
      c = 0
      for (d = this.faces.length; c < d; c++) {
        a = this.faces[c]
        a.normal.applyMatrix3(b).normalize()
        for (var f = 0, g = a.vertexNormals.length; f < g; f++)
          a.vertexNormals[f].applyMatrix3(b).normalize()
      }
      null !== this.boundingBox && this.computeBoundingBox()
      null !== this.boundingSphere && this.computeBoundingSphere()
      this.normalsNeedUpdate = this.verticesNeedUpdate = !0
      return this
    },
    rotateX: function (a) {
      qb.makeRotationX(a)
      this.applyMatrix(qb)
      return this
    },
    rotateY: function (a) {
      qb.makeRotationY(a)
      this.applyMatrix(qb)
      return this
    },
    rotateZ: function (a) {
      qb.makeRotationZ(a)
      this.applyMatrix(qb)
      return this
    },
    translate: function (a, b, c) {
      qb.makeTranslation(a, b, c)
      this.applyMatrix(qb)
      return this
    },
    scale: function (a, b, c) {
      qb.makeScale(a, b, c)
      this.applyMatrix(qb)
      return this
    },
    lookAt: function (a) {
      Dh.lookAt(a)
      Dh.updateMatrix()
      this.applyMatrix(Dh.matrix)
      return this
    },
    fromBufferGeometry: function (a) {
      function b(a, b, d, f) {
        var g =
            void 0 === m
              ? []
              : [c.colors[a].clone(), c.colors[b].clone(), c.colors[d].clone()],
          p =
            void 0 === k
              ? []
              : [
                  new q().fromArray(k, 3 * a),
                  new q().fromArray(k, 3 * b),
                  new q().fromArray(k, 3 * d),
                ]
        f = new Mc(a, b, d, p, g, f)
        c.faces.push(f)
        void 0 !== n &&
          c.faceVertexUvs[0].push([
            new z().fromArray(n, 2 * a),
            new z().fromArray(n, 2 * b),
            new z().fromArray(n, 2 * d),
          ])
        void 0 !== l &&
          c.faceVertexUvs[1].push([
            new z().fromArray(l, 2 * a),
            new z().fromArray(l, 2 * b),
            new z().fromArray(l, 2 * d),
          ])
      }
      var c = this,
        d = null !== a.index ? a.index.array : void 0,
        f = a.attributes
      if (void 0 === f.position)
        return (
          console.error(
            'THREE.Geometry.fromBufferGeometry(): Position attribute required for conversion.',
          ),
          this
        )
      var g = f.position.array,
        k = void 0 !== f.normal ? f.normal.array : void 0,
        m = void 0 !== f.color ? f.color.array : void 0,
        n = void 0 !== f.uv ? f.uv.array : void 0,
        l = void 0 !== f.uv2 ? f.uv2.array : void 0
      void 0 !== l && (this.faceVertexUvs[1] = [])
      for (f = 0; f < g.length; f += 3)
        c.vertices.push(new q().fromArray(g, f)),
          void 0 !== m && c.colors.push(new D().fromArray(m, f))
      var y = a.groups
      if (0 < y.length)
        for (f = 0; f < y.length; f++) {
          g = y[f]
          var t = g.start,
            r = t
          for (t += g.count; r < t; r += 3)
            void 0 !== d
              ? b(d[r], d[r + 1], d[r + 2], g.materialIndex)
              : b(r, r + 1, r + 2, g.materialIndex)
        }
      else if (void 0 !== d)
        for (f = 0; f < d.length; f += 3) b(d[f], d[f + 1], d[f + 2])
      else for (f = 0; f < g.length / 3; f += 3) b(f, f + 1, f + 2)
      this.computeFaceNormals()
      null !== a.boundingBox && (this.boundingBox = a.boundingBox.clone())
      null !== a.boundingSphere &&
        (this.boundingSphere = a.boundingSphere.clone())
      return this
    },
    center: function () {
      this.computeBoundingBox()
      this.boundingBox.getCenter(Xf).negate()
      this.translate(Xf.x, Xf.y, Xf.z)
      return this
    },
    normalize: function () {
      this.computeBoundingSphere()
      var a = this.boundingSphere.center,
        b = this.boundingSphere.radius
      b = 0 === b ? 1 : 1 / b
      var c = new I()
      c.set(b, 0, 0, -b * a.x, 0, b, 0, -b * a.y, 0, 0, b, -b * a.z, 0, 0, 0, 1)
      this.applyMatrix(c)
      return this
    },
    computeFaceNormals: function () {
      for (
        var a = new q(), b = new q(), c = 0, d = this.faces.length;
        c < d;
        c++
      ) {
        var f = this.faces[c],
          g = this.vertices[f.a],
          k = this.vertices[f.b]
        a.subVectors(this.vertices[f.c], k)
        b.subVectors(g, k)
        a.cross(b)
        a.normalize()
        f.normal.copy(a)
      }
    },
    computeVertexNormals: function (a) {
      void 0 === a && (a = !0)
      var b
      var c = Array(this.vertices.length)
      var d = 0
      for (b = this.vertices.length; d < b; d++) c[d] = new q()
      if (a) {
        var f = new q(),
          g = new q()
        a = 0
        for (d = this.faces.length; a < d; a++) {
          b = this.faces[a]
          var k = this.vertices[b.a]
          var m = this.vertices[b.b]
          var l = this.vertices[b.c]
          f.subVectors(l, m)
          g.subVectors(k, m)
          f.cross(g)
          c[b.a].add(f)
          c[b.b].add(f)
          c[b.c].add(f)
        }
      } else
        for (
          this.computeFaceNormals(), a = 0, d = this.faces.length;
          a < d;
          a++
        )
          (b = this.faces[a]),
            c[b.a].add(b.normal),
            c[b.b].add(b.normal),
            c[b.c].add(b.normal)
      d = 0
      for (b = this.vertices.length; d < b; d++) c[d].normalize()
      a = 0
      for (d = this.faces.length; a < d; a++)
        (b = this.faces[a]),
          (k = b.vertexNormals),
          3 === k.length
            ? (k[0].copy(c[b.a]), k[1].copy(c[b.b]), k[2].copy(c[b.c]))
            : ((k[0] = c[b.a].clone()),
              (k[1] = c[b.b].clone()),
              (k[2] = c[b.c].clone()))
      0 < this.faces.length && (this.normalsNeedUpdate = !0)
    },
    computeFlatVertexNormals: function () {
      var a
      this.computeFaceNormals()
      var b = 0
      for (a = this.faces.length; b < a; b++) {
        var c = this.faces[b]
        var d = c.vertexNormals
        3 === d.length
          ? (d[0].copy(c.normal), d[1].copy(c.normal), d[2].copy(c.normal))
          : ((d[0] = c.normal.clone()),
            (d[1] = c.normal.clone()),
            (d[2] = c.normal.clone()))
      }
      0 < this.faces.length && (this.normalsNeedUpdate = !0)
    },
    computeMorphNormals: function () {
      var a, b
      var c = 0
      for (b = this.faces.length; c < b; c++) {
        var d = this.faces[c]
        d.__originalFaceNormal
          ? d.__originalFaceNormal.copy(d.normal)
          : (d.__originalFaceNormal = d.normal.clone())
        d.__originalVertexNormals || (d.__originalVertexNormals = [])
        var f = 0
        for (a = d.vertexNormals.length; f < a; f++)
          d.__originalVertexNormals[f]
            ? d.__originalVertexNormals[f].copy(d.vertexNormals[f])
            : (d.__originalVertexNormals[f] = d.vertexNormals[f].clone())
      }
      var g = new P()
      g.faces = this.faces
      f = 0
      for (a = this.morphTargets.length; f < a; f++) {
        if (!this.morphNormals[f]) {
          this.morphNormals[f] = {}
          this.morphNormals[f].faceNormals = []
          this.morphNormals[f].vertexNormals = []
          d = this.morphNormals[f].faceNormals
          var k = this.morphNormals[f].vertexNormals
          c = 0
          for (b = this.faces.length; c < b; c++) {
            var m = new q()
            var l = { a: new q(), b: new q(), c: new q() }
            d.push(m)
            k.push(l)
          }
        }
        k = this.morphNormals[f]
        g.vertices = this.morphTargets[f].vertices
        g.computeFaceNormals()
        g.computeVertexNormals()
        c = 0
        for (b = this.faces.length; c < b; c++)
          (d = this.faces[c]),
            (m = k.faceNormals[c]),
            (l = k.vertexNormals[c]),
            m.copy(d.normal),
            l.a.copy(d.vertexNormals[0]),
            l.b.copy(d.vertexNormals[1]),
            l.c.copy(d.vertexNormals[2])
      }
      c = 0
      for (b = this.faces.length; c < b; c++)
        (d = this.faces[c]),
          (d.normal = d.__originalFaceNormal),
          (d.vertexNormals = d.__originalVertexNormals)
    },
    computeBoundingBox: function () {
      null === this.boundingBox && (this.boundingBox = new gb())
      this.boundingBox.setFromPoints(this.vertices)
    },
    computeBoundingSphere: function () {
      null === this.boundingSphere && (this.boundingSphere = new ub())
      this.boundingSphere.setFromPoints(this.vertices)
    },
    merge: function (a, b, c) {
      if (a && a.isGeometry) {
        var d,
          f = this.vertices.length,
          g = this.vertices,
          k = a.vertices,
          m = this.faces,
          l = a.faces,
          p = this.colors,
          q = a.colors
        void 0 === c && (c = 0)
        void 0 !== b && (d = new ka().getNormalMatrix(b))
        for (var t = 0, r = k.length; t < r; t++) {
          var u = k[t].clone()
          void 0 !== b && u.applyMatrix4(b)
          g.push(u)
        }
        t = 0
        for (r = q.length; t < r; t++) p.push(q[t].clone())
        t = 0
        for (r = l.length; t < r; t++) {
          k = l[t]
          var v = k.vertexNormals
          q = k.vertexColors
          p = new Mc(k.a + f, k.b + f, k.c + f)
          p.normal.copy(k.normal)
          void 0 !== d && p.normal.applyMatrix3(d).normalize()
          b = 0
          for (g = v.length; b < g; b++)
            (u = v[b].clone()),
              void 0 !== d && u.applyMatrix3(d).normalize(),
              p.vertexNormals.push(u)
          p.color.copy(k.color)
          b = 0
          for (g = q.length; b < g; b++)
            (u = q[b]), p.vertexColors.push(u.clone())
          p.materialIndex = k.materialIndex + c
          m.push(p)
        }
        t = 0
        for (r = a.faceVertexUvs.length; t < r; t++)
          for (
            c = a.faceVertexUvs[t],
              void 0 === this.faceVertexUvs[t] && (this.faceVertexUvs[t] = []),
              b = 0,
              g = c.length;
            b < g;
            b++
          ) {
            d = c[b]
            f = []
            m = 0
            for (l = d.length; m < l; m++) f.push(d[m].clone())
            this.faceVertexUvs[t].push(f)
          }
      } else
        console.error(
          'THREE.Geometry.merge(): geometry not an instance of THREE.Geometry.',
          a,
        )
    },
    mergeMesh: function (a) {
      a && a.isMesh
        ? (a.matrixAutoUpdate && a.updateMatrix(),
          this.merge(a.geometry, a.matrix))
        : console.error(
            'THREE.Geometry.mergeMesh(): mesh not an instance of THREE.Mesh.',
            a,
          )
    },
    mergeVertices: function () {
      var a = {},
        b = [],
        c = [],
        d = Math.pow(10, 4),
        f
      var g = 0
      for (f = this.vertices.length; g < f; g++) {
        var k = this.vertices[g]
        k =
          Math.round(k.x * d) +
          '_' +
          Math.round(k.y * d) +
          '_' +
          Math.round(k.z * d)
        void 0 === a[k]
          ? ((a[k] = g), b.push(this.vertices[g]), (c[g] = b.length - 1))
          : (c[g] = c[a[k]])
      }
      a = []
      g = 0
      for (f = this.faces.length; g < f; g++)
        for (
          d = this.faces[g],
            d.a = c[d.a],
            d.b = c[d.b],
            d.c = c[d.c],
            d = [d.a, d.b, d.c],
            k = 0;
          3 > k;
          k++
        )
          if (d[k] === d[(k + 1) % 3]) {
            a.push(g)
            break
          }
      for (g = a.length - 1; 0 <= g; g--)
        for (
          d = a[g],
            this.faces.splice(d, 1),
            c = 0,
            f = this.faceVertexUvs.length;
          c < f;
          c++
        )
          this.faceVertexUvs[c].splice(d, 1)
      g = this.vertices.length - b.length
      this.vertices = b
      return g
    },
    setFromPoints: function (a) {
      this.vertices = []
      for (var b = 0, c = a.length; b < c; b++) {
        var d = a[b]
        this.vertices.push(new q(d.x, d.y, d.z || 0))
      }
      return this
    },
    sortFacesByMaterialIndex: function () {
      for (var a = this.faces, b = a.length, c = 0; c < b; c++) a[c]._id = c
      a.sort(function (a, b) {
        return a.materialIndex - b.materialIndex
      })
      var d = this.faceVertexUvs[0],
        f = this.faceVertexUvs[1],
        g,
        k
      d && d.length === b && (g = [])
      f && f.length === b && (k = [])
      for (c = 0; c < b; c++) {
        var m = a[c]._id
        g && g.push(d[m])
        k && k.push(f[m])
      }
      g && (this.faceVertexUvs[0] = g)
      k && (this.faceVertexUvs[1] = k)
    },
    toJSON: function () {
      function a(a, b, c) {
        return c ? a | (1 << b) : a & ~(1 << b)
      }
      function b(a) {
        var b = a.x.toString() + a.y.toString() + a.z.toString()
        if (void 0 !== p[b]) return p[b]
        p[b] = l.length / 3
        l.push(a.x, a.y, a.z)
        return p[b]
      }
      function c(a) {
        var b = a.r.toString() + a.g.toString() + a.b.toString()
        if (void 0 !== t[b]) return t[b]
        t[b] = q.length
        q.push(a.getHex())
        return t[b]
      }
      function d(a) {
        var b = a.x.toString() + a.y.toString()
        if (void 0 !== u[b]) return u[b]
        u[b] = r.length / 2
        r.push(a.x, a.y)
        return u[b]
      }
      var f = {
        metadata: {
          version: 4.5,
          type: 'Geometry',
          generator: 'Geometry.toJSON',
        },
      }
      f.uuid = this.uuid
      f.type = this.type
      '' !== this.name && (f.name = this.name)
      if (void 0 !== this.parameters) {
        var g = this.parameters,
          k
        for (k in g) void 0 !== g[k] && (f[k] = g[k])
        return f
      }
      g = []
      for (k = 0; k < this.vertices.length; k++) {
        var m = this.vertices[k]
        g.push(m.x, m.y, m.z)
      }
      m = []
      var l = [],
        p = {},
        q = [],
        t = {},
        r = [],
        u = {}
      for (k = 0; k < this.faces.length; k++) {
        var v = this.faces[k],
          w = void 0 !== this.faceVertexUvs[0][k],
          x = 0 < v.normal.length(),
          B = 0 < v.vertexNormals.length,
          C = 1 !== v.color.r || 1 !== v.color.g || 1 !== v.color.b,
          A = 0 < v.vertexColors.length,
          z = 0
        z = a(z, 0, 0)
        z = a(z, 1, !0)
        z = a(z, 2, !1)
        z = a(z, 3, w)
        z = a(z, 4, x)
        z = a(z, 5, B)
        z = a(z, 6, C)
        z = a(z, 7, A)
        m.push(z)
        m.push(v.a, v.b, v.c)
        m.push(v.materialIndex)
        w && ((w = this.faceVertexUvs[0][k]), m.push(d(w[0]), d(w[1]), d(w[2])))
        x && m.push(b(v.normal))
        B && ((x = v.vertexNormals), m.push(b(x[0]), b(x[1]), b(x[2])))
        C && m.push(c(v.color))
        A && ((v = v.vertexColors), m.push(c(v[0]), c(v[1]), c(v[2])))
      }
      f.data = {}
      f.data.vertices = g
      f.data.normals = l
      0 < q.length && (f.data.colors = q)
      0 < r.length && (f.data.uvs = [r])
      f.data.faces = m
      return f
    },
    clone: function () {
      return new P().copy(this)
    },
    copy: function (a) {
      var b, c, d
      this.vertices = []
      this.colors = []
      this.faces = []
      this.faceVertexUvs = [[]]
      this.morphTargets = []
      this.morphNormals = []
      this.skinWeights = []
      this.skinIndices = []
      this.lineDistances = []
      this.boundingSphere = this.boundingBox = null
      this.name = a.name
      var f = a.vertices
      var g = 0
      for (b = f.length; g < b; g++) this.vertices.push(f[g].clone())
      f = a.colors
      g = 0
      for (b = f.length; g < b; g++) this.colors.push(f[g].clone())
      f = a.faces
      g = 0
      for (b = f.length; g < b; g++) this.faces.push(f[g].clone())
      g = 0
      for (b = a.faceVertexUvs.length; g < b; g++) {
        var k = a.faceVertexUvs[g]
        void 0 === this.faceVertexUvs[g] && (this.faceVertexUvs[g] = [])
        f = 0
        for (c = k.length; f < c; f++) {
          var m = k[f],
            l = []
          var p = 0
          for (d = m.length; p < d; p++) l.push(m[p].clone())
          this.faceVertexUvs[g].push(l)
        }
      }
      p = a.morphTargets
      g = 0
      for (b = p.length; g < b; g++) {
        d = {}
        d.name = p[g].name
        if (void 0 !== p[g].vertices)
          for (d.vertices = [], f = 0, c = p[g].vertices.length; f < c; f++)
            d.vertices.push(p[g].vertices[f].clone())
        if (void 0 !== p[g].normals)
          for (d.normals = [], f = 0, c = p[g].normals.length; f < c; f++)
            d.normals.push(p[g].normals[f].clone())
        this.morphTargets.push(d)
      }
      p = a.morphNormals
      g = 0
      for (b = p.length; g < b; g++) {
        d = {}
        if (void 0 !== p[g].vertexNormals)
          for (
            d.vertexNormals = [], f = 0, c = p[g].vertexNormals.length;
            f < c;
            f++
          )
            (k = p[g].vertexNormals[f]),
              (m = {}),
              (m.a = k.a.clone()),
              (m.b = k.b.clone()),
              (m.c = k.c.clone()),
              d.vertexNormals.push(m)
        if (void 0 !== p[g].faceNormals)
          for (
            d.faceNormals = [], f = 0, c = p[g].faceNormals.length;
            f < c;
            f++
          )
            d.faceNormals.push(p[g].faceNormals[f].clone())
        this.morphNormals.push(d)
      }
      f = a.skinWeights
      g = 0
      for (b = f.length; g < b; g++) this.skinWeights.push(f[g].clone())
      f = a.skinIndices
      g = 0
      for (b = f.length; g < b; g++) this.skinIndices.push(f[g].clone())
      f = a.lineDistances
      g = 0
      for (b = f.length; g < b; g++) this.lineDistances.push(f[g])
      g = a.boundingBox
      null !== g && (this.boundingBox = g.clone())
      g = a.boundingSphere
      null !== g && (this.boundingSphere = g.clone())
      this.elementsNeedUpdate = a.elementsNeedUpdate
      this.verticesNeedUpdate = a.verticesNeedUpdate
      this.uvsNeedUpdate = a.uvsNeedUpdate
      this.normalsNeedUpdate = a.normalsNeedUpdate
      this.colorsNeedUpdate = a.colorsNeedUpdate
      this.lineDistancesNeedUpdate = a.lineDistancesNeedUpdate
      this.groupsNeedUpdate = a.groupsNeedUpdate
      return this
    },
    dispose: function () {
      this.dispatchEvent({ type: 'dispose' })
    },
  })
  var Eh = (function (a) {
      function b(b, d, f, g, k, m) {
        a.call(this)
        this.type = 'BoxGeometry'
        this.parameters = {
          width: b,
          height: d,
          depth: f,
          widthSegments: g,
          heightSegments: k,
          depthSegments: m,
        }
        this.fromBufferGeometry(new Ud(b, d, f, g, k, m))
        this.mergeVertices()
      }
      a && (b.__proto__ = a)
      b.prototype = Object.create(a && a.prototype)
      return (b.prototype.constructor = b)
    })(P),
    Ud = (function (a) {
      function b(b, d, f, g, k, m) {
        function c(a, b, c, d, f, g, k, m, n, p, z) {
          var x = g / n,
            B = k / p,
            A = g / 2,
            C = k / 2,
            D = m / 2
          k = n + 1
          var E = p + 1,
            F = (g = 0),
            G,
            H,
            I = new q()
          for (H = 0; H < E; H++) {
            var K = H * B - C
            for (G = 0; G < k; G++)
              (I[a] = (G * x - A) * d),
                (I[b] = K * f),
                (I[c] = D),
                t.push(I.x, I.y, I.z),
                (I[a] = 0),
                (I[b] = 0),
                (I[c] = 0 < m ? 1 : -1),
                r.push(I.x, I.y, I.z),
                u.push(G / n),
                u.push(1 - H / p),
                (g += 1)
          }
          for (H = 0; H < p; H++)
            for (G = 0; G < n; G++)
              (a = v + G + k * (H + 1)),
                (b = v + (G + 1) + k * (H + 1)),
                (c = v + (G + 1) + k * H),
                y.push(v + G + k * H, a, c),
                y.push(a, b, c),
                (F += 6)
          l.addGroup(w, F, z)
          w += F
          v += g
        }
        a.call(this)
        this.type = 'BoxBufferGeometry'
        this.parameters = {
          width: b,
          height: d,
          depth: f,
          widthSegments: g,
          heightSegments: k,
          depthSegments: m,
        }
        var l = this
        b = b || 1
        d = d || 1
        f = f || 1
        g = Math.floor(g) || 1
        k = Math.floor(k) || 1
        m = Math.floor(m) || 1
        var y = [],
          t = [],
          r = [],
          u = [],
          v = 0,
          w = 0
        c('z', 'y', 'x', -1, -1, f, d, b, m, k, 0)
        c('z', 'y', 'x', 1, -1, f, d, -b, m, k, 1)
        c('x', 'z', 'y', 1, 1, b, f, d, g, m, 2)
        c('x', 'z', 'y', 1, -1, b, f, -d, g, m, 3)
        c('x', 'y', 'z', 1, -1, b, d, f, g, k, 4)
        c('x', 'y', 'z', -1, -1, b, d, -f, g, k, 5)
        this.setIndex(y)
        this.setAttribute('position', new F(t, 3))
        this.setAttribute('normal', new F(r, 3))
        this.setAttribute('uv', new F(u, 2))
      }
      a && (b.__proto__ = a)
      b.prototype = Object.create(a && a.prototype)
      return (b.prototype.constructor = b)
    })(G),
    Kl = { clone: gc, merge: za }
  Aa.prototype = Object.create(R.prototype)
  Aa.prototype.constructor = Aa
  Aa.prototype.isShaderMaterial = !0
  Aa.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.fragmentShader = a.fragmentShader
    this.vertexShader = a.vertexShader
    this.uniforms = gc(a.uniforms)
    this.defines = Object.assign({}, a.defines)
    this.wireframe = a.wireframe
    this.wireframeLinewidth = a.wireframeLinewidth
    this.lights = a.lights
    this.clipping = a.clipping
    this.skinning = a.skinning
    this.morphTargets = a.morphTargets
    this.morphNormals = a.morphNormals
    this.extensions = a.extensions
    return this
  }
  Aa.prototype.toJSON = function (a) {
    var b = R.prototype.toJSON.call(this, a)
    b.uniforms = {}
    for (var c in this.uniforms) {
      var d = this.uniforms[c].value
      b.uniforms[c] =
        d && d.isTexture
          ? { type: 't', value: d.toJSON(a).uuid }
          : d && d.isColor
          ? { type: 'c', value: d.getHex() }
          : d && d.isVector2
          ? { type: 'v2', value: d.toArray() }
          : d && d.isVector3
          ? { type: 'v3', value: d.toArray() }
          : d && d.isVector4
          ? { type: 'v4', value: d.toArray() }
          : d && d.isMatrix3
          ? { type: 'm3', value: d.toArray() }
          : d && d.isMatrix4
          ? { type: 'm4', value: d.toArray() }
          : { value: d }
    }
    0 < Object.keys(this.defines).length && (b.defines = this.defines)
    b.vertexShader = this.vertexShader
    b.fragmentShader = this.fragmentShader
    a = {}
    for (var f in this.extensions) !0 === this.extensions[f] && (a[f] = !0)
    0 < Object.keys(a).length && (b.extensions = a)
    return b
  }
  hb.prototype = Object.assign(Object.create(E.prototype), {
    constructor: hb,
    isCamera: !0,
    copy: function (a, b) {
      E.prototype.copy.call(this, a, b)
      this.matrixWorldInverse.copy(a.matrixWorldInverse)
      this.projectionMatrix.copy(a.projectionMatrix)
      this.projectionMatrixInverse.copy(a.projectionMatrixInverse)
      return this
    },
    getWorldDirection: function (a) {
      void 0 === a &&
        (console.warn(
          'THREE.Camera: .getWorldDirection() target is now required',
        ),
        (a = new q()))
      this.updateMatrixWorld(!0)
      var b = this.matrixWorld.elements
      return a.set(-b[8], -b[9], -b[10]).normalize()
    },
    updateMatrixWorld: function (a) {
      E.prototype.updateMatrixWorld.call(this, a)
      this.matrixWorldInverse.getInverse(this.matrixWorld)
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
  })
  na.prototype = Object.assign(Object.create(hb.prototype), {
    constructor: na,
    isPerspectiveCamera: !0,
    copy: function (a, b) {
      hb.prototype.copy.call(this, a, b)
      this.fov = a.fov
      this.zoom = a.zoom
      this.near = a.near
      this.far = a.far
      this.focus = a.focus
      this.aspect = a.aspect
      this.view = null === a.view ? null : Object.assign({}, a.view)
      this.filmGauge = a.filmGauge
      this.filmOffset = a.filmOffset
      return this
    },
    setFocalLength: function (a) {
      a = (0.5 * this.getFilmHeight()) / a
      this.fov = 2 * N.RAD2DEG * Math.atan(a)
      this.updateProjectionMatrix()
    },
    getFocalLength: function () {
      var a = Math.tan(0.5 * N.DEG2RAD * this.fov)
      return (0.5 * this.getFilmHeight()) / a
    },
    getEffectiveFOV: function () {
      return (
        2 *
        N.RAD2DEG *
        Math.atan(Math.tan(0.5 * N.DEG2RAD * this.fov) / this.zoom)
      )
    },
    getFilmWidth: function () {
      return this.filmGauge * Math.min(this.aspect, 1)
    },
    getFilmHeight: function () {
      return this.filmGauge / Math.max(this.aspect, 1)
    },
    setViewOffset: function (a, b, c, d, f, g) {
      this.aspect = a / b
      null === this.view &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        })
      this.view.enabled = !0
      this.view.fullWidth = a
      this.view.fullHeight = b
      this.view.offsetX = c
      this.view.offsetY = d
      this.view.width = f
      this.view.height = g
      this.updateProjectionMatrix()
    },
    clearViewOffset: function () {
      null !== this.view && (this.view.enabled = !1)
      this.updateProjectionMatrix()
    },
    updateProjectionMatrix: function () {
      var a = this.near,
        b = (a * Math.tan(0.5 * N.DEG2RAD * this.fov)) / this.zoom,
        c = 2 * b,
        d = this.aspect * c,
        f = -0.5 * d,
        g = this.view
      if (null !== this.view && this.view.enabled) {
        var k = g.fullWidth,
          m = g.fullHeight
        f += (g.offsetX * d) / k
        b -= (g.offsetY * c) / m
        d *= g.width / k
        c *= g.height / m
      }
      g = this.filmOffset
      0 !== g && (f += (a * g) / this.getFilmWidth())
      this.projectionMatrix.makePerspective(f, f + d, b, b - c, a, this.far)
      this.projectionMatrixInverse.getInverse(this.projectionMatrix)
    },
    toJSON: function (a) {
      a = E.prototype.toJSON.call(this, a)
      a.object.fov = this.fov
      a.object.zoom = this.zoom
      a.object.near = this.near
      a.object.far = this.far
      a.object.focus = this.focus
      a.object.aspect = this.aspect
      null !== this.view && (a.object.view = Object.assign({}, this.view))
      a.object.filmGauge = this.filmGauge
      a.object.filmOffset = this.filmOffset
      return a
    },
  })
  Qc.prototype = Object.create(E.prototype)
  Qc.prototype.constructor = Qc
  Ib.prototype = Object.create(sa.prototype)
  Ib.prototype.constructor = Ib
  Ib.prototype.isWebGLRenderTargetCube = !0
  Ib.prototype.fromEquirectangularTexture = function (a, b) {
    this.texture.type = b.type
    this.texture.format = b.format
    this.texture.encoding = b.encoding
    var c = new Kd(),
      d = new Aa({
        type: 'CubemapFromEquirect',
        uniforms: gc({ tEquirect: { value: null } }),
        vertexShader:
          'varying vec3 vWorldDirection;\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}',
        fragmentShader:
          'uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tgl_FragColor = texture2D( tEquirect, sampleUV );\n}',
        side: 1,
        blending: 0,
      })
    d.uniforms.tEquirect.value = b
    b = new ia(new Ud(5, 5, 5), d)
    c.add(b)
    d = new Qc(1, 10, 1)
    d.renderTarget = this
    d.renderTarget.texture.name = 'CubeCameraTexture'
    d.update(a, c)
    b.geometry.dispose()
    b.material.dispose()
    return this
  }
  hc.prototype = Object.create(S.prototype)
  hc.prototype.constructor = hc
  hc.prototype.isDataTexture = !0
  var Hd = new ub(),
    Yf = new q()
  Object.assign(Sd.prototype, {
    set: function (a, b, c, d, f, g) {
      var k = this.planes
      k[0].copy(a)
      k[1].copy(b)
      k[2].copy(c)
      k[3].copy(d)
      k[4].copy(f)
      k[5].copy(g)
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      for (var b = this.planes, c = 0; 6 > c; c++) b[c].copy(a.planes[c])
      return this
    },
    setFromMatrix: function (a) {
      var b = this.planes,
        c = a.elements
      a = c[0]
      var d = c[1],
        f = c[2],
        g = c[3],
        k = c[4],
        m = c[5],
        l = c[6],
        p = c[7],
        q = c[8],
        t = c[9],
        r = c[10],
        u = c[11],
        v = c[12],
        w = c[13],
        x = c[14]
      c = c[15]
      b[0].setComponents(g - a, p - k, u - q, c - v).normalize()
      b[1].setComponents(g + a, p + k, u + q, c + v).normalize()
      b[2].setComponents(g + d, p + m, u + t, c + w).normalize()
      b[3].setComponents(g - d, p - m, u - t, c - w).normalize()
      b[4].setComponents(g - f, p - l, u - r, c - x).normalize()
      b[5].setComponents(g + f, p + l, u + r, c + x).normalize()
      return this
    },
    intersectsObject: function (a) {
      var b = a.geometry
      null === b.boundingSphere && b.computeBoundingSphere()
      Hd.copy(b.boundingSphere).applyMatrix4(a.matrixWorld)
      return this.intersectsSphere(Hd)
    },
    intersectsSprite: function (a) {
      Hd.center.set(0, 0, 0)
      Hd.radius = 0.7071067811865476
      Hd.applyMatrix4(a.matrixWorld)
      return this.intersectsSphere(Hd)
    },
    intersectsSphere: function (a) {
      var b = this.planes,
        c = a.center
      a = -a.radius
      for (var d = 0; 6 > d; d++) if (b[d].distanceToPoint(c) < a) return !1
      return !0
    },
    intersectsBox: function (a) {
      for (var b = this.planes, c = 0; 6 > c; c++) {
        var d = b[c]
        Yf.x = 0 < d.normal.x ? a.max.x : a.min.x
        Yf.y = 0 < d.normal.y ? a.max.y : a.min.y
        Yf.z = 0 < d.normal.z ? a.max.z : a.min.z
        if (0 > d.distanceToPoint(Yf)) return !1
      }
      return !0
    },
    containsPoint: function (a) {
      for (var b = this.planes, c = 0; 6 > c; c++)
        if (0 > b[c].distanceToPoint(a)) return !1
      return !0
    },
  })
  var Q = {
      alphamap_fragment:
        '#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, vUv ).g;\n#endif',
      alphamap_pars_fragment:
        '#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif',
      alphatest_fragment:
        '#ifdef ALPHATEST\n\tif ( diffuseColor.a < ALPHATEST ) discard;\n#endif',
      aomap_fragment:
        '#ifdef USE_AOMAP\n\tfloat ambientOcclusion = ( texture2D( aoMap, vUv2 ).r - 1.0 ) * aoMapIntensity + 1.0;\n\treflectedLight.indirectDiffuse *= ambientOcclusion;\n\t#if defined( USE_ENVMAP ) && defined( STANDARD )\n\t\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.specularRoughness );\n\t#endif\n#endif',
      aomap_pars_fragment:
        '#ifdef USE_AOMAP\n\tuniform sampler2D aoMap;\n\tuniform float aoMapIntensity;\n#endif',
      begin_vertex: 'vec3 transformed = vec3( position );',
      beginnormal_vertex:
        'vec3 objectNormal = vec3( normal );\n#ifdef USE_TANGENT\n\tvec3 objectTangent = vec3( tangent.xyz );\n#endif',
      bsdfs:
        'vec2 integrateSpecularBRDF( const in float dotNV, const in float roughness ) {\n\tconst vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );\n\tconst vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );\n\tvec4 r = roughness * c0 + c1;\n\tfloat a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;\n\treturn vec2( -1.04, 1.04 ) * a004 + r.zw;\n}\nfloat punctualLightIntensityToIrradianceFactor( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {\n#if defined ( PHYSICALLY_CORRECT_LIGHTS )\n\tfloat distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );\n\tif( cutoffDistance > 0.0 ) {\n\t\tdistanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );\n\t}\n\treturn distanceFalloff;\n#else\n\tif( cutoffDistance > 0.0 && decayExponent > 0.0 ) {\n\t\treturn pow( saturate( -lightDistance / cutoffDistance + 1.0 ), decayExponent );\n\t}\n\treturn 1.0;\n#endif\n}\nvec3 BRDF_Diffuse_Lambert( const in vec3 diffuseColor ) {\n\treturn RECIPROCAL_PI * diffuseColor;\n}\nvec3 F_Schlick( const in vec3 specularColor, const in float dotLH ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotLH - 6.98316 ) * dotLH );\n\treturn ( 1.0 - specularColor ) * fresnel + specularColor;\n}\nvec3 F_Schlick_RoughnessDependent( const in vec3 F0, const in float dotNV, const in float roughness ) {\n\tfloat fresnel = exp2( ( -5.55473 * dotNV - 6.98316 ) * dotNV );\n\tvec3 Fr = max( vec3( 1.0 - roughness ), F0 ) - F0;\n\treturn Fr * fresnel + F0;\n}\nfloat G_GGX_Smith( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gl = dotNL + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\tfloat gv = dotNV + sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\treturn 1.0 / ( gl * gv );\n}\nfloat G_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {\n\tfloat a2 = pow2( alpha );\n\tfloat gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );\n\tfloat gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );\n\treturn 0.5 / max( gv + gl, EPSILON );\n}\nfloat D_GGX( const in float alpha, const in float dotNH ) {\n\tfloat a2 = pow2( alpha );\n\tfloat denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;\n\treturn RECIPROCAL_PI * a2 / pow2( denom );\n}\nvec3 BRDF_Specular_GGX( const in IncidentLight incidentLight, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat alpha = pow2( roughness );\n\tvec3 halfDir = normalize( incidentLight.direction + viewDir );\n\tfloat dotNL = saturate( dot( normal, incidentLight.direction ) );\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tfloat dotNH = saturate( dot( normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_GGX_SmithCorrelated( alpha, dotNL, dotNV );\n\tfloat D = D_GGX( alpha, dotNH );\n\treturn F * ( G * D );\n}\nvec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {\n\tconst float LUT_SIZE  = 64.0;\n\tconst float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;\n\tconst float LUT_BIAS  = 0.5 / LUT_SIZE;\n\tfloat dotNV = saturate( dot( N, V ) );\n\tvec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );\n\tuv = uv * LUT_SCALE + LUT_BIAS;\n\treturn uv;\n}\nfloat LTC_ClippedSphereFormFactor( const in vec3 f ) {\n\tfloat l = length( f );\n\treturn max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );\n}\nvec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {\n\tfloat x = dot( v1, v2 );\n\tfloat y = abs( x );\n\tfloat a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;\n\tfloat b = 3.4175940 + ( 4.1616724 + y ) * y;\n\tfloat v = a / b;\n\tfloat theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;\n\treturn cross( v1, v2 ) * theta_sintheta;\n}\nvec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {\n\tvec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];\n\tvec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];\n\tvec3 lightNormal = cross( v1, v2 );\n\tif( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );\n\tvec3 T1, T2;\n\tT1 = normalize( V - N * dot( V, N ) );\n\tT2 = - cross( N, T1 );\n\tmat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );\n\tvec3 coords[ 4 ];\n\tcoords[ 0 ] = mat * ( rectCoords[ 0 ] - P );\n\tcoords[ 1 ] = mat * ( rectCoords[ 1 ] - P );\n\tcoords[ 2 ] = mat * ( rectCoords[ 2 ] - P );\n\tcoords[ 3 ] = mat * ( rectCoords[ 3 ] - P );\n\tcoords[ 0 ] = normalize( coords[ 0 ] );\n\tcoords[ 1 ] = normalize( coords[ 1 ] );\n\tcoords[ 2 ] = normalize( coords[ 2 ] );\n\tcoords[ 3 ] = normalize( coords[ 3 ] );\n\tvec3 vectorFormFactor = vec3( 0.0 );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );\n\tvectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );\n\tfloat result = LTC_ClippedSphereFormFactor( vectorFormFactor );\n\treturn vec3( result );\n}\nvec3 BRDF_Specular_GGX_Environment( const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float roughness ) {\n\tfloat dotNV = saturate( dot( normal, viewDir ) );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\treturn specularColor * brdf.x + brdf.y;\n}\nvoid BRDF_Specular_Multiscattering_Environment( const in GeometricContext geometry, const in vec3 specularColor, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {\n\tfloat dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );\n\tvec3 F = F_Schlick_RoughnessDependent( specularColor, dotNV, roughness );\n\tvec2 brdf = integrateSpecularBRDF( dotNV, roughness );\n\tvec3 FssEss = F * brdf.x + brdf.y;\n\tfloat Ess = brdf.x + brdf.y;\n\tfloat Ems = 1.0 - Ess;\n\tvec3 Favg = specularColor + ( 1.0 - specularColor ) * 0.047619;\tvec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );\n\tsingleScatter += FssEss;\n\tmultiScatter += Fms * Ems;\n}\nfloat G_BlinnPhong_Implicit( ) {\n\treturn 0.25;\n}\nfloat D_BlinnPhong( const in float shininess, const in float dotNH ) {\n\treturn RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );\n}\nvec3 BRDF_Specular_BlinnPhong( const in IncidentLight incidentLight, const in GeometricContext geometry, const in vec3 specularColor, const in float shininess ) {\n\tvec3 halfDir = normalize( incidentLight.direction + geometry.viewDir );\n\tfloat dotNH = saturate( dot( geometry.normal, halfDir ) );\n\tfloat dotLH = saturate( dot( incidentLight.direction, halfDir ) );\n\tvec3 F = F_Schlick( specularColor, dotLH );\n\tfloat G = G_BlinnPhong_Implicit( );\n\tfloat D = D_BlinnPhong( shininess, dotNH );\n\treturn F * ( G * D );\n}\nfloat GGXRoughnessToBlinnExponent( const in float ggxRoughness ) {\n\treturn ( 2.0 / pow2( ggxRoughness + 0.0001 ) - 2.0 );\n}\nfloat BlinnExponentToGGXRoughness( const in float blinnExponent ) {\n\treturn sqrt( 2.0 / ( blinnExponent + 2.0 ) );\n}\n#if defined( USE_SHEEN )\nfloat D_Charlie(float roughness, float NoH) {\n\tfloat invAlpha  = 1.0 / roughness;\n\tfloat cos2h = NoH * NoH;\n\tfloat sin2h = max(1.0 - cos2h, 0.0078125);\treturn (2.0 + invAlpha) * pow(sin2h, invAlpha * 0.5) / (2.0 * PI);\n}\nfloat V_Neubelt(float NoV, float NoL) {\n\treturn saturate(1.0 / (4.0 * (NoL + NoV - NoL * NoV)));\n}\nvec3 BRDF_Specular_Sheen( const in float roughness, const in vec3 L, const in GeometricContext geometry, vec3 specularColor ) {\n\tvec3 N = geometry.normal;\n\tvec3 V = geometry.viewDir;\n\tvec3 H = normalize( V + L );\n\tfloat dotNH = saturate( dot( N, H ) );\n\treturn specularColor * D_Charlie( roughness, dotNH ) * V_Neubelt( dot(N, V), dot(N, L) );\n}\n#endif',
      bumpmap_pars_fragment:
        '#ifdef USE_BUMPMAP\n\tuniform sampler2D bumpMap;\n\tuniform float bumpScale;\n\tvec2 dHdxy_fwd() {\n\t\tvec2 dSTdx = dFdx( vUv );\n\t\tvec2 dSTdy = dFdy( vUv );\n\t\tfloat Hll = bumpScale * texture2D( bumpMap, vUv ).x;\n\t\tfloat dBx = bumpScale * texture2D( bumpMap, vUv + dSTdx ).x - Hll;\n\t\tfloat dBy = bumpScale * texture2D( bumpMap, vUv + dSTdy ).x - Hll;\n\t\treturn vec2( dBx, dBy );\n\t}\n\tvec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy ) {\n\t\tvec3 vSigmaX = vec3( dFdx( surf_pos.x ), dFdx( surf_pos.y ), dFdx( surf_pos.z ) );\n\t\tvec3 vSigmaY = vec3( dFdy( surf_pos.x ), dFdy( surf_pos.y ), dFdy( surf_pos.z ) );\n\t\tvec3 vN = surf_norm;\n\t\tvec3 R1 = cross( vSigmaY, vN );\n\t\tvec3 R2 = cross( vN, vSigmaX );\n\t\tfloat fDet = dot( vSigmaX, R1 );\n\t\tfDet *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\tvec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );\n\t\treturn normalize( abs( fDet ) * surf_norm - vGrad );\n\t}\n#endif',
      clipping_planes_fragment:
        '#if NUM_CLIPPING_PLANES > 0\n\tvec4 plane;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {\n\t\tplane = clippingPlanes[ i ];\n\t\tif ( dot( vViewPosition, plane.xyz ) > plane.w ) discard;\n\t}\n\t#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES\n\t\tbool clipped = true;\n\t\t#pragma unroll_loop\n\t\tfor ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {\n\t\t\tplane = clippingPlanes[ i ];\n\t\t\tclipped = ( dot( vViewPosition, plane.xyz ) > plane.w ) && clipped;\n\t\t}\n\t\tif ( clipped ) discard;\n\t#endif\n#endif',
      clipping_planes_pars_fragment:
        '#if NUM_CLIPPING_PLANES > 0\n\t#if ! defined( STANDARD ) && ! defined( PHONG ) && ! defined( MATCAP )\n\t\tvarying vec3 vViewPosition;\n\t#endif\n\tuniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];\n#endif',
      clipping_planes_pars_vertex:
        '#if NUM_CLIPPING_PLANES > 0 && ! defined( STANDARD ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvarying vec3 vViewPosition;\n#endif',
      clipping_planes_vertex:
        '#if NUM_CLIPPING_PLANES > 0 && ! defined( STANDARD ) && ! defined( PHONG ) && ! defined( MATCAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif',
      color_fragment: '#ifdef USE_COLOR\n\tdiffuseColor.rgb *= vColor;\n#endif',
      color_pars_fragment: '#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif',
      color_pars_vertex: '#ifdef USE_COLOR\n\tvarying vec3 vColor;\n#endif',
      color_vertex: '#ifdef USE_COLOR\n\tvColor.xyz = color.xyz;\n#endif',
      common:
        '#define PI 3.14159265359\n#define PI2 6.28318530718\n#define PI_HALF 1.5707963267949\n#define RECIPROCAL_PI 0.31830988618\n#define RECIPROCAL_PI2 0.15915494\n#define LOG2 1.442695\n#define EPSILON 1e-6\n#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\n#define whiteComplement(a) ( 1.0 - saturate( a ) )\nfloat pow2( const in float x ) { return x*x; }\nfloat pow3( const in float x ) { return x*x*x; }\nfloat pow4( const in float x ) { float x2 = x*x; return x2*x2; }\nfloat average( const in vec3 color ) { return dot( color, vec3( 0.3333 ) ); }\nhighp float rand( const in vec2 uv ) {\n\tconst highp float a = 12.9898, b = 78.233, c = 43758.5453;\n\thighp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );\n\treturn fract(sin(sn) * c);\n}\n#ifdef HIGH_PRECISION\n\tfloat precisionSafeLength( vec3 v ) { return length( v ); }\n#else\n\tfloat max3( vec3 v ) { return max( max( v.x, v.y ), v.z ); }\n\tfloat precisionSafeLength( vec3 v ) {\n\t\tfloat maxComponent = max3( abs( v ) );\n\t\treturn length( v / maxComponent ) * maxComponent;\n\t}\n#endif\nstruct IncidentLight {\n\tvec3 color;\n\tvec3 direction;\n\tbool visible;\n};\nstruct ReflectedLight {\n\tvec3 directDiffuse;\n\tvec3 directSpecular;\n\tvec3 indirectDiffuse;\n\tvec3 indirectSpecular;\n};\nstruct GeometricContext {\n\tvec3 position;\n\tvec3 normal;\n\tvec3 viewDir;\n#ifdef CLEARCOAT\n\tvec3 clearcoatNormal;\n#endif\n};\nvec3 transformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );\n}\nvec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {\n\treturn normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );\n}\nvec3 projectOnPlane(in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\tfloat distance = dot( planeNormal, point - pointOnPlane );\n\treturn - distance * planeNormal + point;\n}\nfloat sideOfPlane( in vec3 point, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn sign( dot( point - pointOnPlane, planeNormal ) );\n}\nvec3 linePlaneIntersect( in vec3 pointOnLine, in vec3 lineDirection, in vec3 pointOnPlane, in vec3 planeNormal ) {\n\treturn lineDirection * ( dot( planeNormal, pointOnPlane - pointOnLine ) / dot( planeNormal, lineDirection ) ) + pointOnLine;\n}\nmat3 transposeMat3( const in mat3 m ) {\n\tmat3 tmp;\n\ttmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );\n\ttmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );\n\ttmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );\n\treturn tmp;\n}\nfloat linearToRelativeLuminance( const in vec3 color ) {\n\tvec3 weights = vec3( 0.2126, 0.7152, 0.0722 );\n\treturn dot( weights, color.rgb );\n}\nbool isPerspectiveMatrix( mat4 m ) {\n  return m[ 2 ][ 3 ] == - 1.0;\n}',
      cube_uv_reflection_fragment:
        '#ifdef ENVMAP_TYPE_CUBE_UV\n#define cubeUV_textureSize (1024.0)\nint getFaceFromDirection(vec3 direction) {\n\tvec3 absDirection = abs(direction);\n\tint face = -1;\n\tif( absDirection.x > absDirection.z ) {\n\t\tif(absDirection.x > absDirection.y )\n\t\t\tface = direction.x > 0.0 ? 0 : 3;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\telse {\n\t\tif(absDirection.z > absDirection.y )\n\t\t\tface = direction.z > 0.0 ? 2 : 5;\n\t\telse\n\t\t\tface = direction.y > 0.0 ? 1 : 4;\n\t}\n\treturn face;\n}\n#define cubeUV_maxLods1  (log2(cubeUV_textureSize*0.25) - 1.0)\n#define cubeUV_rangeClamp (exp2((6.0 - 1.0) * 2.0))\nvec2 MipLevelInfo( vec3 vec, float roughnessLevel, float roughness ) {\n\tfloat scale = exp2(cubeUV_maxLods1 - roughnessLevel);\n\tfloat dxRoughness = dFdx(roughness);\n\tfloat dyRoughness = dFdy(roughness);\n\tvec3 dx = dFdx( vec * scale * dxRoughness );\n\tvec3 dy = dFdy( vec * scale * dyRoughness );\n\tfloat d = max( dot( dx, dx ), dot( dy, dy ) );\n\td = clamp(d, 1.0, cubeUV_rangeClamp);\n\tfloat mipLevel = 0.5 * log2(d);\n\treturn vec2(floor(mipLevel), fract(mipLevel));\n}\n#define cubeUV_maxLods2 (log2(cubeUV_textureSize*0.25) - 2.0)\n#define cubeUV_rcpTextureSize (1.0 / cubeUV_textureSize)\nvec2 getCubeUV(vec3 direction, float roughnessLevel, float mipLevel) {\n\tmipLevel = roughnessLevel > cubeUV_maxLods2 - 3.0 ? 0.0 : mipLevel;\n\tfloat a = 16.0 * cubeUV_rcpTextureSize;\n\tvec2 exp2_packed = exp2( vec2( roughnessLevel, mipLevel ) );\n\tvec2 rcp_exp2_packed = vec2( 1.0 ) / exp2_packed;\n\tfloat powScale = exp2_packed.x * exp2_packed.y;\n\tfloat scale = rcp_exp2_packed.x * rcp_exp2_packed.y * 0.25;\n\tfloat mipOffset = 0.75*(1.0 - rcp_exp2_packed.y) * rcp_exp2_packed.x;\n\tbool bRes = mipLevel == 0.0;\n\tscale =  bRes && (scale < a) ? a : scale;\n\tvec3 r;\n\tvec2 offset;\n\tint face = getFaceFromDirection(direction);\n\tfloat rcpPowScale = 1.0 / powScale;\n\tif( face == 0) {\n\t\tr = vec3(direction.x, -direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 1) {\n\t\tr = vec3(direction.y, direction.x, direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 2) {\n\t\tr = vec3(direction.z, direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.75 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? a : offset.y;\n\t}\n\telse if( face == 3) {\n\t\tr = vec3(direction.x, direction.z, direction.y);\n\t\toffset = vec2(0.0+mipOffset,0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse if( face == 4) {\n\t\tr = vec3(direction.y, direction.x, -direction.z);\n\t\toffset = vec2(scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\telse {\n\t\tr = vec3(direction.z, -direction.x, direction.y);\n\t\toffset = vec2(2.0*scale+mipOffset, 0.5 * rcpPowScale);\n\t\toffset.y = bRes && (offset.y < 2.0*a) ? 0.0 : offset.y;\n\t}\n\tr = normalize(r);\n\tfloat texelOffset = 0.5 * cubeUV_rcpTextureSize;\n\tvec2 s = ( r.yz / abs( r.x ) + vec2( 1.0 ) ) * 0.5;\n\tvec2 base = offset + vec2( texelOffset );\n\treturn base + s * ( scale - 2.0 * texelOffset );\n}\n#define cubeUV_maxLods3 (log2(cubeUV_textureSize*0.25) - 3.0)\nvec4 textureCubeUV( sampler2D envMap, vec3 reflectedDirection, float roughness ) {\n\tfloat roughnessVal = roughness* cubeUV_maxLods3;\n\tfloat r1 = floor(roughnessVal);\n\tfloat r2 = r1 + 1.0;\n\tfloat t = fract(roughnessVal);\n\tvec2 mipInfo = MipLevelInfo(reflectedDirection, r1, roughness);\n\tfloat s = mipInfo.y;\n\tfloat level0 = mipInfo.x;\n\tfloat level1 = level0 + 1.0;\n\tlevel1 = level1 > 5.0 ? 5.0 : level1;\n\tlevel0 += min( floor( s + 0.5 ), 5.0 );\n\tvec2 uv_10 = getCubeUV(reflectedDirection, r1, level0);\n\tvec4 color10 = envMapTexelToLinear(texture2D(envMap, uv_10));\n\tvec2 uv_20 = getCubeUV(reflectedDirection, r2, level0);\n\tvec4 color20 = envMapTexelToLinear(texture2D(envMap, uv_20));\n\tvec4 result = mix(color10, color20, t);\n\treturn vec4(result.rgb, 1.0);\n}\n#endif',
      defaultnormal_vertex:
        'vec3 transformedNormal = objectNormal;\n#ifdef USE_INSTANCING\n\ttransformedNormal = mat3( instanceMatrix ) * transformedNormal;\n#endif\ntransformedNormal = normalMatrix * transformedNormal;\n#ifdef FLIP_SIDED\n\ttransformedNormal = - transformedNormal;\n#endif\n#ifdef USE_TANGENT\n\tvec3 transformedTangent = normalMatrix * objectTangent;\n\t#ifdef FLIP_SIDED\n\t\ttransformedTangent = - transformedTangent;\n\t#endif\n#endif',
      displacementmap_pars_vertex:
        '#ifdef USE_DISPLACEMENTMAP\n\tuniform sampler2D displacementMap;\n\tuniform float displacementScale;\n\tuniform float displacementBias;\n#endif',
      displacementmap_vertex:
        '#ifdef USE_DISPLACEMENTMAP\n\ttransformed += normalize( objectNormal ) * ( texture2D( displacementMap, vUv ).x * displacementScale + displacementBias );\n#endif',
      emissivemap_fragment:
        '#ifdef USE_EMISSIVEMAP\n\tvec4 emissiveColor = texture2D( emissiveMap, vUv );\n\temissiveColor.rgb = emissiveMapTexelToLinear( emissiveColor ).rgb;\n\ttotalEmissiveRadiance *= emissiveColor.rgb;\n#endif',
      emissivemap_pars_fragment:
        '#ifdef USE_EMISSIVEMAP\n\tuniform sampler2D emissiveMap;\n#endif',
      encodings_fragment: 'gl_FragColor = linearToOutputTexel( gl_FragColor );',
      encodings_pars_fragment:
        '\nvec4 LinearToLinear( in vec4 value ) {\n\treturn value;\n}\nvec4 GammaToLinear( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( gammaFactor ) ), value.a );\n}\nvec4 LinearToGamma( in vec4 value, in float gammaFactor ) {\n\treturn vec4( pow( value.rgb, vec3( 1.0 / gammaFactor ) ), value.a );\n}\nvec4 sRGBToLinear( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );\n}\nvec4 LinearTosRGB( in vec4 value ) {\n\treturn vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );\n}\nvec4 RGBEToLinear( in vec4 value ) {\n\treturn vec4( value.rgb * exp2( value.a * 255.0 - 128.0 ), 1.0 );\n}\nvec4 LinearToRGBE( in vec4 value ) {\n\tfloat maxComponent = max( max( value.r, value.g ), value.b );\n\tfloat fExp = clamp( ceil( log2( maxComponent ) ), -128.0, 127.0 );\n\treturn vec4( value.rgb / exp2( fExp ), ( fExp + 128.0 ) / 255.0 );\n}\nvec4 RGBMToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * value.a * maxRange, 1.0 );\n}\nvec4 LinearToRGBM( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat M = clamp( maxRGB / maxRange, 0.0, 1.0 );\n\tM = ceil( M * 255.0 ) / 255.0;\n\treturn vec4( value.rgb / ( M * maxRange ), M );\n}\nvec4 RGBDToLinear( in vec4 value, in float maxRange ) {\n\treturn vec4( value.rgb * ( ( maxRange / 255.0 ) / value.a ), 1.0 );\n}\nvec4 LinearToRGBD( in vec4 value, in float maxRange ) {\n\tfloat maxRGB = max( value.r, max( value.g, value.b ) );\n\tfloat D = max( maxRange / maxRGB, 1.0 );\n\tD = min( floor( D ) / 255.0, 1.0 );\n\treturn vec4( value.rgb * ( D * ( 255.0 / maxRange ) ), D );\n}\nconst mat3 cLogLuvM = mat3( 0.2209, 0.3390, 0.4184, 0.1138, 0.6780, 0.7319, 0.0102, 0.1130, 0.2969 );\nvec4 LinearToLogLuv( in vec4 value )  {\n\tvec3 Xp_Y_XYZp = cLogLuvM * value.rgb;\n\tXp_Y_XYZp = max( Xp_Y_XYZp, vec3( 1e-6, 1e-6, 1e-6 ) );\n\tvec4 vResult;\n\tvResult.xy = Xp_Y_XYZp.xy / Xp_Y_XYZp.z;\n\tfloat Le = 2.0 * log2(Xp_Y_XYZp.y) + 127.0;\n\tvResult.w = fract( Le );\n\tvResult.z = ( Le - ( floor( vResult.w * 255.0 ) ) / 255.0 ) / 255.0;\n\treturn vResult;\n}\nconst mat3 cLogLuvInverseM = mat3( 6.0014, -2.7008, -1.7996, -1.3320, 3.1029, -5.7721, 0.3008, -1.0882, 5.6268 );\nvec4 LogLuvToLinear( in vec4 value ) {\n\tfloat Le = value.z * 255.0 + value.w;\n\tvec3 Xp_Y_XYZp;\n\tXp_Y_XYZp.y = exp2( ( Le - 127.0 ) / 2.0 );\n\tXp_Y_XYZp.z = Xp_Y_XYZp.y / value.y;\n\tXp_Y_XYZp.x = value.x * Xp_Y_XYZp.z;\n\tvec3 vRGB = cLogLuvInverseM * Xp_Y_XYZp.rgb;\n\treturn vec4( max( vRGB, 0.0 ), 1.0 );\n}',
      envmap_fragment:
        '#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvec3 cameraToFrag;\n\t\t\n\t\tif ( isOrthographic ) {\n\t\t\tcameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t}  else {\n\t\t\tcameraToFrag = normalize( vWorldPosition - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( normal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvec3 reflectVec = reflect( cameraToFrag, worldNormal );\n\t\t#else\n\t\t\tvec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );\n\t\t#endif\n\t#else\n\t\tvec3 reflectVec = vReflect;\n\t#endif\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tvec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );\n\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\tvec2 sampleUV;\n\t\treflectVec = normalize( reflectVec );\n\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\tvec4 envColor = texture2D( envMap, sampleUV );\n\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\treflectVec = normalize( reflectVec );\n\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0, 0.0, 1.0 ) );\n\t\tvec4 envColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5 );\n\t#else\n\t\tvec4 envColor = vec4( 0.0 );\n\t#endif\n\tenvColor = envMapTexelToLinear( envColor );\n\t#ifdef ENVMAP_BLENDING_MULTIPLY\n\t\toutgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_MIX )\n\t\toutgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );\n\t#elif defined( ENVMAP_BLENDING_ADD )\n\t\toutgoingLight += envColor.xyz * specularStrength * reflectivity;\n\t#endif\n#endif',
      envmap_common_pars_fragment:
        '#ifdef USE_ENVMAP\n\tuniform float envMapIntensity;\n\tuniform float flipEnvMap;\n\tuniform int maxMipLevel;\n\t#ifdef ENVMAP_TYPE_CUBE\n\t\tuniform samplerCube envMap;\n\t#else\n\t\tuniform sampler2D envMap;\n\t#endif\n\t\n#endif',
      envmap_pars_fragment:
        '#ifdef USE_ENVMAP\n\tuniform float reflectivity;\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\tvarying vec3 vWorldPosition;\n\t\tuniform float refractionRatio;\n\t#else\n\t\tvarying vec3 vReflect;\n\t#endif\n#endif',
      envmap_pars_vertex:
        '#ifdef USE_ENVMAP\n\t#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) ||defined( PHONG )\n\t\t#define ENV_WORLDPOS\n\t#endif\n\t#ifdef ENV_WORLDPOS\n\t\t\n\t\tvarying vec3 vWorldPosition;\n\t#else\n\t\tvarying vec3 vReflect;\n\t\tuniform float refractionRatio;\n\t#endif\n#endif',
      envmap_physical_pars_fragment:
        '#if defined( USE_ENVMAP )\n\t#ifdef ENVMAP_MODE_REFRACTION\n\t\tuniform float refractionRatio;\n\t#endif\n\tvec3 getLightProbeIndirectIrradiance( const in GeometricContext geometry, const in int maxMIPLevel ) {\n\t\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryVec, float( maxMIPLevel ) );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryVec = vec3( flipEnvMap * worldNormal.x, worldNormal.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryVec, 1.0 );\n\t\t#else\n\t\t\tvec4 envMapColor = vec4( 0.0 );\n\t\t#endif\n\t\treturn PI * envMapColor.rgb * envMapIntensity;\n\t}\n\tfloat getSpecularMIPLevel( const in float roughness, const in int maxMIPLevel ) {\n\t\tfloat maxMIPLevelScalar = float( maxMIPLevel );\n\t\tfloat sigma = PI * roughness * roughness / ( 1.0 + roughness );\n\t\tfloat desiredMIPLevel = maxMIPLevelScalar + log2( sigma );\n\t\treturn clamp( desiredMIPLevel, 0.0, maxMIPLevelScalar );\n\t}\n\tvec3 getLightProbeIndirectRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in int maxMIPLevel ) {\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t  vec3 reflectVec = reflect( -viewDir, normal );\n\t\t  reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );\n\t\t#else\n\t\t  vec3 reflectVec = refract( -viewDir, normal, refractionRatio );\n\t\t#endif\n\t\treflectVec = inverseTransformDirection( reflectVec, viewMatrix );\n\t\tfloat specularMIPLevel = getSpecularMIPLevel( roughness, maxMIPLevel );\n\t\t#ifdef ENVMAP_TYPE_CUBE\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = textureCubeLodEXT( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = textureCube( envMap, queryReflectVec, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_CUBE_UV )\n\t\t\tvec3 queryReflectVec = vec3( flipEnvMap * reflectVec.x, reflectVec.yz );\n\t\t\tvec4 envMapColor = textureCubeUV( envMap, queryReflectVec, roughness );\n\t\t#elif defined( ENVMAP_TYPE_EQUIREC )\n\t\t\tvec2 sampleUV;\n\t\t\tsampleUV.y = asin( clamp( reflectVec.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\t\t\tsampleUV.x = atan( reflectVec.z, reflectVec.x ) * RECIPROCAL_PI2 + 0.5;\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, sampleUV, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, sampleUV, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#elif defined( ENVMAP_TYPE_SPHERE )\n\t\t\tvec3 reflectView = normalize( ( viewMatrix * vec4( reflectVec, 0.0 ) ).xyz + vec3( 0.0,0.0,1.0 ) );\n\t\t\t#ifdef TEXTURE_LOD_EXT\n\t\t\t\tvec4 envMapColor = texture2DLodEXT( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#else\n\t\t\t\tvec4 envMapColor = texture2D( envMap, reflectView.xy * 0.5 + 0.5, specularMIPLevel );\n\t\t\t#endif\n\t\t\tenvMapColor.rgb = envMapTexelToLinear( envMapColor ).rgb;\n\t\t#endif\n\t\treturn envMapColor.rgb * envMapIntensity;\n\t}\n#endif',
      envmap_vertex:
        '#ifdef USE_ENVMAP\n\t#ifdef ENV_WORLDPOS\n\t\tvWorldPosition = worldPosition.xyz;\n\t#else\n\t\tvec3 cameraToVertex;\n\t\tif ( isOrthographic ) { \n\t\t\tcameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );\n\t\t} else {\n\t\t\tcameraToVertex = normalize( worldPosition.xyz - cameraPosition );\n\t\t}\n\t\tvec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );\n\t\t#ifdef ENVMAP_MODE_REFLECTION\n\t\t\tvReflect = reflect( cameraToVertex, worldNormal );\n\t\t#else\n\t\t\tvReflect = refract( cameraToVertex, worldNormal, refractionRatio );\n\t\t#endif\n\t#endif\n#endif',
      fog_vertex: '#ifdef USE_FOG\n\tfogDepth = -mvPosition.z;\n#endif',
      fog_pars_vertex: '#ifdef USE_FOG\n\tvarying float fogDepth;\n#endif',
      fog_fragment:
        '#ifdef USE_FOG\n\t#ifdef FOG_EXP2\n\t\tfloat fogFactor = 1.0 - exp( - fogDensity * fogDensity * fogDepth * fogDepth );\n\t#else\n\t\tfloat fogFactor = smoothstep( fogNear, fogFar, fogDepth );\n\t#endif\n\tgl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );\n#endif',
      fog_pars_fragment:
        '#ifdef USE_FOG\n\tuniform vec3 fogColor;\n\tvarying float fogDepth;\n\t#ifdef FOG_EXP2\n\t\tuniform float fogDensity;\n\t#else\n\t\tuniform float fogNear;\n\t\tuniform float fogFar;\n\t#endif\n#endif',
      gradientmap_pars_fragment:
        '#ifdef TOON\n\tuniform sampler2D gradientMap;\n\tvec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {\n\t\tfloat dotNL = dot( normal, lightDirection );\n\t\tvec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );\n\t\t#ifdef USE_GRADIENTMAP\n\t\t\treturn texture2D( gradientMap, coord ).rgb;\n\t\t#else\n\t\t\treturn ( coord.x < 0.7 ) ? vec3( 0.7 ) : vec3( 1.0 );\n\t\t#endif\n\t}\n#endif',
      lightmap_fragment:
        '#ifdef USE_LIGHTMAP\n\treflectedLight.indirectDiffuse += PI * texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n#endif',
      lightmap_pars_fragment:
        '#ifdef USE_LIGHTMAP\n\tuniform sampler2D lightMap;\n\tuniform float lightMapIntensity;\n#endif',
      lights_lambert_vertex:
        'vec3 diffuse = vec3( 1.0 );\nGeometricContext geometry;\ngeometry.position = mvPosition.xyz;\ngeometry.normal = normalize( transformedNormal );\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( -mvPosition.xyz );\nGeometricContext backGeometry;\nbackGeometry.position = geometry.position;\nbackGeometry.normal = -geometry.normal;\nbackGeometry.viewDir = geometry.viewDir;\nvLightFront = vec3( 0.0 );\nvIndirectFront = vec3( 0.0 );\n#ifdef DOUBLE_SIDED\n\tvLightBack = vec3( 0.0 );\n\tvIndirectBack = vec3( 0.0 );\n#endif\nIncidentLight directLight;\nfloat dotNL;\nvec3 directLightColor_Diffuse;\n#if NUM_POINT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tgetPointDirectLightIrradiance( pointLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tgetSpotDirectLightIrradiance( spotLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_DIR_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tgetDirectionalDirectLightIrradiance( directionalLights[ i ], geometry, directLight );\n\t\tdotNL = dot( geometry.normal, directLight.direction );\n\t\tdirectLightColor_Diffuse = PI * directLight.color;\n\t\tvLightFront += saturate( dotNL ) * directLightColor_Diffuse;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvLightBack += saturate( -dotNL ) * directLightColor_Diffuse;\n\t\t#endif\n\t}\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\tvIndirectFront += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tvIndirectBack += getHemisphereLightIrradiance( hemisphereLights[ i ], backGeometry );\n\t\t#endif\n\t}\n#endif',
      lights_pars_begin:
        'uniform bool receiveShadow;\nuniform vec3 ambientLightColor;\nuniform vec3 lightProbe[ 9 ];\nvec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {\n\tfloat x = normal.x, y = normal.y, z = normal.z;\n\tvec3 result = shCoefficients[ 0 ] * 0.886227;\n\tresult += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;\n\tresult += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;\n\tresult += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;\n\tresult += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;\n\tresult += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;\n\tresult += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );\n\tresult += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;\n\tresult += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );\n\treturn result;\n}\nvec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in GeometricContext geometry ) {\n\tvec3 worldNormal = inverseTransformDirection( geometry.normal, viewMatrix );\n\tvec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );\n\treturn irradiance;\n}\nvec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {\n\tvec3 irradiance = ambientLightColor;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treturn irradiance;\n}\n#if NUM_DIR_LIGHTS > 0\n\tstruct DirectionalLight {\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];\n\tvoid getDirectionalDirectLightIrradiance( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tdirectLight.color = directionalLight.color;\n\t\tdirectLight.direction = directionalLight.direction;\n\t\tdirectLight.visible = true;\n\t}\n#endif\n#if NUM_POINT_LIGHTS > 0\n\tstruct PointLight {\n\t\tvec3 position;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t\tfloat shadowCameraNear;\n\t\tfloat shadowCameraFar;\n\t};\n\tuniform PointLight pointLights[ NUM_POINT_LIGHTS ];\n\tvoid getPointDirectLightIrradiance( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight directLight ) {\n\t\tvec3 lVector = pointLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tdirectLight.color = pointLight.color;\n\t\tdirectLight.color *= punctualLightIntensityToIrradianceFactor( lightDistance, pointLight.distance, pointLight.decay );\n\t\tdirectLight.visible = ( directLight.color != vec3( 0.0 ) );\n\t}\n#endif\n#if NUM_SPOT_LIGHTS > 0\n\tstruct SpotLight {\n\t\tvec3 position;\n\t\tvec3 direction;\n\t\tvec3 color;\n\t\tfloat distance;\n\t\tfloat decay;\n\t\tfloat coneCos;\n\t\tfloat penumbraCos;\n\t\tint shadow;\n\t\tfloat shadowBias;\n\t\tfloat shadowRadius;\n\t\tvec2 shadowMapSize;\n\t};\n\tuniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];\n\tvoid getSpotDirectLightIrradiance( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight directLight  ) {\n\t\tvec3 lVector = spotLight.position - geometry.position;\n\t\tdirectLight.direction = normalize( lVector );\n\t\tfloat lightDistance = length( lVector );\n\t\tfloat angleCos = dot( directLight.direction, spotLight.direction );\n\t\tif ( angleCos > spotLight.coneCos ) {\n\t\t\tfloat spotEffect = smoothstep( spotLight.coneCos, spotLight.penumbraCos, angleCos );\n\t\t\tdirectLight.color = spotLight.color;\n\t\t\tdirectLight.color *= spotEffect * punctualLightIntensityToIrradianceFactor( lightDistance, spotLight.distance, spotLight.decay );\n\t\t\tdirectLight.visible = true;\n\t\t} else {\n\t\t\tdirectLight.color = vec3( 0.0 );\n\t\t\tdirectLight.visible = false;\n\t\t}\n\t}\n#endif\n#if NUM_RECT_AREA_LIGHTS > 0\n\tstruct RectAreaLight {\n\t\tvec3 color;\n\t\tvec3 position;\n\t\tvec3 halfWidth;\n\t\tvec3 halfHeight;\n\t};\n\tuniform sampler2D ltc_1;\tuniform sampler2D ltc_2;\n\tuniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];\n#endif\n#if NUM_HEMI_LIGHTS > 0\n\tstruct HemisphereLight {\n\t\tvec3 direction;\n\t\tvec3 skyColor;\n\t\tvec3 groundColor;\n\t};\n\tuniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];\n\tvec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in GeometricContext geometry ) {\n\t\tfloat dotNL = dot( geometry.normal, hemiLight.direction );\n\t\tfloat hemiDiffuseWeight = 0.5 * dotNL + 0.5;\n\t\tvec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tirradiance *= PI;\n\t\t#endif\n\t\treturn irradiance;\n\t}\n#endif',
      lights_phong_fragment:
        'BlinnPhongMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb;\nmaterial.specularColor = specular;\nmaterial.specularShininess = shininess;\nmaterial.specularStrength = specularStrength;',
      lights_phong_pars_fragment:
        'varying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\nstruct BlinnPhongMaterial {\n\tvec3\tdiffuseColor;\n\tvec3\tspecularColor;\n\tfloat\tspecularShininess;\n\tfloat\tspecularStrength;\n};\nvoid RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\t#ifdef TOON\n\t\tvec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;\n\t#else\n\t\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\t\tvec3 irradiance = dotNL * directLight.color;\n\t#endif\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\treflectedLight.directDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n\treflectedLight.directSpecular += irradiance * BRDF_Specular_BlinnPhong( directLight, geometry, material.specularColor, material.specularShininess ) * material.specularStrength;\n}\nvoid RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\n#define RE_Direct\t\t\t\tRE_Direct_BlinnPhong\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_BlinnPhong\n#define Material_LightProbeLOD( material )\t(0)',
      lights_physical_fragment:
        'PhysicalMaterial material;\nmaterial.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );\nmaterial.specularRoughness = clamp( roughnessFactor, 0.04, 1.0 );\n#ifdef REFLECTIVITY\n\tmaterial.specularColor = mix( vec3( MAXIMUM_SPECULAR_COEFFICIENT * pow2( reflectivity ) ), diffuseColor.rgb, metalnessFactor );\n#else\n\tmaterial.specularColor = mix( vec3( DEFAULT_SPECULAR_COEFFICIENT ), diffuseColor.rgb, metalnessFactor );\n#endif\n#ifdef CLEARCOAT\n\tmaterial.clearcoat = saturate( clearcoat );\tmaterial.clearcoatRoughness = clamp( clearcoatRoughness, 0.04, 1.0 );\n#endif\n#ifdef USE_SHEEN\n\tmaterial.sheenColor = sheen;\n#endif',
      lights_physical_pars_fragment:
        'struct PhysicalMaterial {\n\tvec3\tdiffuseColor;\n\tfloat\tspecularRoughness;\n\tvec3\tspecularColor;\n#ifdef CLEARCOAT\n\tfloat clearcoat;\n\tfloat clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tvec3 sheenColor;\n#endif\n};\n#define MAXIMUM_SPECULAR_COEFFICIENT 0.16\n#define DEFAULT_SPECULAR_COEFFICIENT 0.04\nfloat clearcoatDHRApprox( const in float roughness, const in float dotNL ) {\n\treturn DEFAULT_SPECULAR_COEFFICIENT + ( 1.0 - DEFAULT_SPECULAR_COEFFICIENT ) * ( pow( 1.0 - dotNL, 5.0 ) * pow( 1.0 - roughness, 2.0 ) );\n}\n#if NUM_RECT_AREA_LIGHTS > 0\n\tvoid RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\t\tvec3 normal = geometry.normal;\n\t\tvec3 viewDir = geometry.viewDir;\n\t\tvec3 position = geometry.position;\n\t\tvec3 lightPos = rectAreaLight.position;\n\t\tvec3 halfWidth = rectAreaLight.halfWidth;\n\t\tvec3 halfHeight = rectAreaLight.halfHeight;\n\t\tvec3 lightColor = rectAreaLight.color;\n\t\tfloat roughness = material.specularRoughness;\n\t\tvec3 rectCoords[ 4 ];\n\t\trectCoords[ 0 ] = lightPos + halfWidth - halfHeight;\t\trectCoords[ 1 ] = lightPos - halfWidth - halfHeight;\n\t\trectCoords[ 2 ] = lightPos - halfWidth + halfHeight;\n\t\trectCoords[ 3 ] = lightPos + halfWidth + halfHeight;\n\t\tvec2 uv = LTC_Uv( normal, viewDir, roughness );\n\t\tvec4 t1 = texture2D( ltc_1, uv );\n\t\tvec4 t2 = texture2D( ltc_2, uv );\n\t\tmat3 mInv = mat3(\n\t\t\tvec3( t1.x, 0, t1.y ),\n\t\t\tvec3(    0, 1,    0 ),\n\t\t\tvec3( t1.z, 0, t1.w )\n\t\t);\n\t\tvec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );\n\t\treflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );\n\t\treflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );\n\t}\n#endif\nvoid RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\tfloat dotNL = saturate( dot( geometry.normal, directLight.direction ) );\n\tvec3 irradiance = dotNL * directLight.color;\n\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\tirradiance *= PI;\n\t#endif\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNL = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );\n\t\tvec3 ccIrradiance = ccDotNL * directLight.color;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tccIrradiance *= PI;\n\t\t#endif\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t\treflectedLight.directSpecular += ccIrradiance * material.clearcoat * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\t#ifdef USE_SHEEN\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_Sheen(\n\t\t\tmaterial.specularRoughness,\n\t\t\tdirectLight.direction,\n\t\t\tgeometry,\n\t\t\tmaterial.sheenColor\n\t\t);\n\t#else\n\t\treflectedLight.directSpecular += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Specular_GGX( directLight, geometry.viewDir, geometry.normal, material.specularColor, material.specularRoughness);\n\t#endif\n\treflectedLight.directDiffuse += ( 1.0 - clearcoatDHR ) * irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {\n\treflectedLight.indirectDiffuse += irradiance * BRDF_Diffuse_Lambert( material.diffuseColor );\n}\nvoid RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {\n\t#ifdef CLEARCOAT\n\t\tfloat ccDotNV = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );\n\t\treflectedLight.indirectSpecular += clearcoatRadiance * material.clearcoat * BRDF_Specular_GGX_Environment( geometry.viewDir, geometry.clearcoatNormal, vec3( DEFAULT_SPECULAR_COEFFICIENT ), material.clearcoatRoughness );\n\t\tfloat ccDotNL = ccDotNV;\n\t\tfloat clearcoatDHR = material.clearcoat * clearcoatDHRApprox( material.clearcoatRoughness, ccDotNL );\n\t#else\n\t\tfloat clearcoatDHR = 0.0;\n\t#endif\n\tfloat clearcoatInv = 1.0 - clearcoatDHR;\n\tvec3 singleScattering = vec3( 0.0 );\n\tvec3 multiScattering = vec3( 0.0 );\n\tvec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;\n\tBRDF_Specular_Multiscattering_Environment( geometry, material.specularColor, material.specularRoughness, singleScattering, multiScattering );\n\tvec3 diffuse = material.diffuseColor * ( 1.0 - ( singleScattering + multiScattering ) );\n\treflectedLight.indirectSpecular += clearcoatInv * radiance * singleScattering;\n\treflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;\n\treflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;\n}\n#define RE_Direct\t\t\t\tRE_Direct_Physical\n#define RE_Direct_RectArea\t\tRE_Direct_RectArea_Physical\n#define RE_IndirectDiffuse\t\tRE_IndirectDiffuse_Physical\n#define RE_IndirectSpecular\t\tRE_IndirectSpecular_Physical\nfloat computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {\n\treturn saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );\n}',
      lights_fragment_begin:
        '\nGeometricContext geometry;\ngeometry.position = - vViewPosition;\ngeometry.normal = normal;\ngeometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );\n#ifdef CLEARCOAT\n\tgeometry.clearcoatNormal = clearcoatNormal;\n#endif\nIncidentLight directLight;\n#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tgetPointDirectLightIrradiance( pointLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )\n\t\tdirectLight.color *= all( bvec3( pointLight.shadow, directLight.visible, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tgetSpotDirectLightIrradiance( spotLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )\n\t\tdirectLight.color *= all( bvec3( spotLight.shadow, directLight.visible, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tgetDirectionalDirectLightIrradiance( directionalLight, geometry, directLight );\n\t\t#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )\n\t\tdirectLight.color *= all( bvec3( directionalLight.shadow, directLight.visible, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t\t#endif\n\t\tRE_Direct( directLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )\n\tRectAreaLight rectAreaLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {\n\t\trectAreaLight = rectAreaLights[ i ];\n\t\tRE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );\n\t}\n#endif\n#if defined( RE_IndirectDiffuse )\n\tvec3 iblIrradiance = vec3( 0.0 );\n\tvec3 irradiance = getAmbientLightIrradiance( ambientLightColor );\n\tirradiance += getLightProbeIrradiance( lightProbe, geometry );\n\t#if ( NUM_HEMI_LIGHTS > 0 )\n\t\t#pragma unroll_loop\n\t\tfor ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {\n\t\t\tirradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry );\n\t\t}\n\t#endif\n#endif\n#if defined( RE_IndirectSpecular )\n\tvec3 radiance = vec3( 0.0 );\n\tvec3 clearcoatRadiance = vec3( 0.0 );\n#endif',
      lights_fragment_maps:
        '#if defined( RE_IndirectDiffuse )\n\t#ifdef USE_LIGHTMAP\n\t\tvec3 lightMapIrradiance = texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t\t#ifndef PHYSICALLY_CORRECT_LIGHTS\n\t\t\tlightMapIrradiance *= PI;\n\t\t#endif\n\t\tirradiance += lightMapIrradiance;\n\t#endif\n\t#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )\n\t\tiblIrradiance += getLightProbeIndirectIrradiance( geometry, maxMipLevel );\n\t#endif\n#endif\n#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )\n\tradiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.normal, material.specularRoughness, maxMipLevel );\n\t#ifdef CLEARCOAT\n\t\tclearcoatRadiance += getLightProbeIndirectRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness, maxMipLevel );\n\t#endif\n#endif',
      lights_fragment_end:
        '#if defined( RE_IndirectDiffuse )\n\tRE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );\n#endif\n#if defined( RE_IndirectSpecular )\n\tRE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );\n#endif',
      logdepthbuf_fragment:
        '#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tgl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;\n#endif',
      logdepthbuf_pars_fragment:
        '#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )\n\tuniform float logDepthBufFC;\n\tvarying float vFragDepth;\n\tvarying float vIsPerspective;\n#endif',
      logdepthbuf_pars_vertex:
        '#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvarying float vFragDepth;\n\t\tvarying float vIsPerspective;\n\t#else\n\t\tuniform float logDepthBufFC;\n\t#endif\n#endif',
      logdepthbuf_vertex:
        '#ifdef USE_LOGDEPTHBUF\n\t#ifdef USE_LOGDEPTHBUF_EXT\n\t\tvFragDepth = 1.0 + gl_Position.w;\n\t\tvIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );\n\t#else\n\t\tif ( isPerspectiveMatrix( projectionMatrix ) ) {\n\t\t\tgl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;\n\t\t\tgl_Position.z *= gl_Position.w;\n\t\t}\n\t#endif\n#endif',
      map_fragment:
        '#ifdef USE_MAP\n\tvec4 texelColor = texture2D( map, vUv );\n\ttexelColor = mapTexelToLinear( texelColor );\n\tdiffuseColor *= texelColor;\n#endif',
      map_pars_fragment: '#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif',
      map_particle_fragment:
        '#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tvec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;\n#endif\n#ifdef USE_MAP\n\tvec4 mapTexel = texture2D( map, uv );\n\tdiffuseColor *= mapTexelToLinear( mapTexel );\n#endif\n#ifdef USE_ALPHAMAP\n\tdiffuseColor.a *= texture2D( alphaMap, uv ).g;\n#endif',
      map_particle_pars_fragment:
        '#if defined( USE_MAP ) || defined( USE_ALPHAMAP )\n\tuniform mat3 uvTransform;\n#endif\n#ifdef USE_MAP\n\tuniform sampler2D map;\n#endif\n#ifdef USE_ALPHAMAP\n\tuniform sampler2D alphaMap;\n#endif',
      metalnessmap_fragment:
        'float metalnessFactor = metalness;\n#ifdef USE_METALNESSMAP\n\tvec4 texelMetalness = texture2D( metalnessMap, vUv );\n\tmetalnessFactor *= texelMetalness.b;\n#endif',
      metalnessmap_pars_fragment:
        '#ifdef USE_METALNESSMAP\n\tuniform sampler2D metalnessMap;\n#endif',
      morphnormal_vertex:
        '#ifdef USE_MORPHNORMALS\n\tobjectNormal += ( morphNormal0 - normal ) * morphTargetInfluences[ 0 ];\n\tobjectNormal += ( morphNormal1 - normal ) * morphTargetInfluences[ 1 ];\n\tobjectNormal += ( morphNormal2 - normal ) * morphTargetInfluences[ 2 ];\n\tobjectNormal += ( morphNormal3 - normal ) * morphTargetInfluences[ 3 ];\n#endif',
      morphtarget_pars_vertex:
        '#ifdef USE_MORPHTARGETS\n\t#ifndef USE_MORPHNORMALS\n\tuniform float morphTargetInfluences[ 8 ];\n\t#else\n\tuniform float morphTargetInfluences[ 4 ];\n\t#endif\n#endif',
      morphtarget_vertex:
        '#ifdef USE_MORPHTARGETS\n\ttransformed += ( morphTarget0 - position ) * morphTargetInfluences[ 0 ];\n\ttransformed += ( morphTarget1 - position ) * morphTargetInfluences[ 1 ];\n\ttransformed += ( morphTarget2 - position ) * morphTargetInfluences[ 2 ];\n\ttransformed += ( morphTarget3 - position ) * morphTargetInfluences[ 3 ];\n\t#ifndef USE_MORPHNORMALS\n\ttransformed += ( morphTarget4 - position ) * morphTargetInfluences[ 4 ];\n\ttransformed += ( morphTarget5 - position ) * morphTargetInfluences[ 5 ];\n\ttransformed += ( morphTarget6 - position ) * morphTargetInfluences[ 6 ];\n\ttransformed += ( morphTarget7 - position ) * morphTargetInfluences[ 7 ];\n\t#endif\n#endif',
      normal_fragment_begin:
        '#ifdef FLAT_SHADED\n\tvec3 fdx = vec3( dFdx( vViewPosition.x ), dFdx( vViewPosition.y ), dFdx( vViewPosition.z ) );\n\tvec3 fdy = vec3( dFdy( vViewPosition.x ), dFdy( vViewPosition.y ), dFdy( vViewPosition.z ) );\n\tvec3 normal = normalize( cross( fdx, fdy ) );\n#else\n\tvec3 normal = normalize( vNormal );\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\t#ifdef USE_TANGENT\n\t\tvec3 tangent = normalize( vTangent );\n\t\tvec3 bitangent = normalize( vBitangent );\n\t\t#ifdef DOUBLE_SIDED\n\t\t\ttangent = tangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t\tbitangent = bitangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t#endif\n#endif\nvec3 geometryNormal = normal;',
      normal_fragment_maps:
        '#ifdef OBJECTSPACE_NORMALMAP\n\tnormal = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t#ifdef FLIP_SIDED\n\t\tnormal = - normal;\n\t#endif\n\t#ifdef DOUBLE_SIDED\n\t\tnormal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t#endif\n\tnormal = normalize( normalMatrix * normal );\n#elif defined( TANGENTSPACE_NORMALMAP )\n\t#ifdef USE_TANGENT\n\t\tmat3 vTBN = mat3( tangent, bitangent, normal );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = normalScale * mapN.xy;\n\t\tnormal = normalize( vTBN * mapN );\n\t#else\n\t\tnormal = perturbNormal2Arb( -vViewPosition, normal, normalScale, normalMap );\n\t#endif\n#elif defined( USE_BUMPMAP )\n\tnormal = perturbNormalArb( -vViewPosition, normal, dHdxy_fwd() );\n#endif',
      normalmap_pars_fragment:
        '#ifdef USE_NORMALMAP\n\tuniform sampler2D normalMap;\n\tuniform vec2 normalScale;\n#endif\n#ifdef OBJECTSPACE_NORMALMAP\n\tuniform mat3 normalMatrix;\n#endif\n#if ! defined ( USE_TANGENT ) && ( defined ( TANGENTSPACE_NORMALMAP ) || defined ( USE_CLEARCOAT_NORMALMAP ) )\n\tvec3 perturbNormal2Arb( vec3 eye_pos, vec3 surf_norm, vec2 normalScale, in sampler2D normalMap ) {\n\t\tvec3 q0 = vec3( dFdx( eye_pos.x ), dFdx( eye_pos.y ), dFdx( eye_pos.z ) );\n\t\tvec3 q1 = vec3( dFdy( eye_pos.x ), dFdy( eye_pos.y ), dFdy( eye_pos.z ) );\n\t\tvec2 st0 = dFdx( vUv.st );\n\t\tvec2 st1 = dFdy( vUv.st );\n\t\tfloat scale = sign( st1.t * st0.s - st0.t * st1.s );\n\t\tvec3 S = normalize( ( q0 * st1.t - q1 * st0.t ) * scale );\n\t\tvec3 T = normalize( ( - q0 * st1.s + q1 * st0.s ) * scale );\n\t\tvec3 N = normalize( surf_norm );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy *= normalScale;\n\t\t#ifdef DOUBLE_SIDED\n\t\t\tbool frontFacing = dot( cross( S, T ), N ) > 0.0;\n\t\t\tmapN.xy *= ( float( frontFacing ) * 2.0 - 1.0 );\n\t\t#else\n\t\t\tmapN.xy *= ( float( gl_FrontFacing ) * 2.0 - 1.0 );\n\t\t#endif\n\t\tmat3 tsn = mat3( S, T, N );\n\t\treturn normalize( tsn * mapN );\n\t}\n#endif',
      clearcoat_normal_fragment_begin:
        '#ifdef CLEARCOAT\n\tvec3 clearcoatNormal = geometryNormal;\n#endif',
      clearcoat_normal_fragment_maps:
        '#ifdef USE_CLEARCOAT_NORMALMAP\n\t#ifdef USE_TANGENT\n\t\tmat3 vTBN = mat3( tangent, bitangent, clearcoatNormal );\n\t\tvec3 mapN = texture2D( normalMap, vUv ).xyz * 2.0 - 1.0;\n\t\tmapN.xy = clearcoatNormalScale * mapN.xy;\n\t\tclearcoatNormal = normalize( vTBN * mapN );\n\t#else\n\t\tclearcoatNormal = perturbNormal2Arb( - vViewPosition, clearcoatNormal, clearcoatNormalScale, clearcoatNormalMap );\n\t#endif\n#endif',
      clearcoat_normalmap_pars_fragment:
        '#ifdef USE_CLEARCOAT_NORMALMAP\n\tuniform sampler2D clearcoatNormalMap;\n\tuniform vec2 clearcoatNormalScale;\n#endif',
      packing:
        'vec3 packNormalToRGB( const in vec3 normal ) {\n\treturn normalize( normal ) * 0.5 + 0.5;\n}\nvec3 unpackRGBToNormal( const in vec3 rgb ) {\n\treturn 2.0 * rgb.xyz - 1.0;\n}\nconst float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;\nconst vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256.,  256. );\nconst vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );\nconst float ShiftRight8 = 1. / 256.;\nvec4 packDepthToRGBA( const in float v ) {\n\tvec4 r = vec4( fract( v * PackFactors ), v );\n\tr.yzw -= r.xyz * ShiftRight8;\treturn r * PackUpscale;\n}\nfloat unpackRGBAToDepth( const in vec4 v ) {\n\treturn dot( v, UnpackFactors );\n}\nvec4 encodeHalfRGBA ( vec2 v ) {\n\tvec4 encoded = vec4( 0.0 );\n\tconst vec2 offset = vec2( 1.0 / 255.0, 0.0 );\n\tencoded.xy = vec2( v.x, fract( v.x * 255.0 ) );\n\tencoded.xy = encoded.xy - ( encoded.yy * offset );\n\tencoded.zw = vec2( v.y, fract( v.y * 255.0 ) );\n\tencoded.zw = encoded.zw - ( encoded.ww * offset );\n\treturn encoded;\n}\nvec2 decodeHalfRGBA( vec4 v ) {\n\treturn vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );\n}\nfloat viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn ( viewZ + near ) / ( near - far );\n}\nfloat orthographicDepthToViewZ( const in float linearClipZ, const in float near, const in float far ) {\n\treturn linearClipZ * ( near - far ) - near;\n}\nfloat viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {\n\treturn (( near + viewZ ) * far ) / (( far - near ) * viewZ );\n}\nfloat perspectiveDepthToViewZ( const in float invClipZ, const in float near, const in float far ) {\n\treturn ( near * far ) / ( ( far - near ) * invClipZ - far );\n}',
      premultiplied_alpha_fragment:
        '#ifdef PREMULTIPLIED_ALPHA\n\tgl_FragColor.rgb *= gl_FragColor.a;\n#endif',
      project_vertex:
        'vec4 mvPosition = vec4( transformed, 1.0 );\n#ifdef USE_INSTANCING\n\tmvPosition = instanceMatrix * mvPosition;\n#endif\nmvPosition = modelViewMatrix * mvPosition;\ngl_Position = projectionMatrix * mvPosition;',
      dithering_fragment:
        '#ifdef DITHERING\n\tgl_FragColor.rgb = dithering( gl_FragColor.rgb );\n#endif',
      dithering_pars_fragment:
        '#ifdef DITHERING\n\tvec3 dithering( vec3 color ) {\n\t\tfloat grid_position = rand( gl_FragCoord.xy );\n\t\tvec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );\n\t\tdither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );\n\t\treturn color + dither_shift_RGB;\n\t}\n#endif',
      roughnessmap_fragment:
        'float roughnessFactor = roughness;\n#ifdef USE_ROUGHNESSMAP\n\tvec4 texelRoughness = texture2D( roughnessMap, vUv );\n\troughnessFactor *= texelRoughness.g;\n#endif',
      roughnessmap_pars_fragment:
        '#ifdef USE_ROUGHNESSMAP\n\tuniform sampler2D roughnessMap;\n#endif',
      shadowmap_pars_fragment:
        '#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n\tfloat texture2DCompare( sampler2D depths, vec2 uv, float compare ) {\n\t\treturn step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );\n\t}\n\tvec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {\n\t\treturn decodeHalfRGBA( texture2D( shadow, uv ) );\n\t}\n\tfloat VSMShadow (sampler2D shadow, vec2 uv, float compare ){\n\t\tfloat occlusion = 1.0;\n\t\tvec2 distribution = texture2DDistribution( shadow, uv );\n\t\tfloat hard_shadow = step( compare , distribution.x );\n\t\tif (hard_shadow != 1.0 ) {\n\t\t\tfloat distance = compare - distribution.x ;\n\t\t\tfloat variance = max( 0.00000, distribution.y * distribution.y );\n\t\t\tfloat softness_probability = variance / (variance + distance * distance );\t\t\tsoftness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );\t\t\tocclusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );\n\t\t}\n\t\treturn occlusion;\n\t}\n\tfloat texture2DShadowLerp( sampler2D depths, vec2 size, vec2 uv, float compare ) {\n\t\tconst vec2 offset = vec2( 0.0, 1.0 );\n\t\tvec2 texelSize = vec2( 1.0 ) / size;\n\t\tvec2 centroidUV = ( floor( uv * size - 0.5 ) + 0.5 ) * texelSize;\n\t\tfloat lb = texture2DCompare( depths, centroidUV + texelSize * offset.xx, compare );\n\t\tfloat lt = texture2DCompare( depths, centroidUV + texelSize * offset.xy, compare );\n\t\tfloat rb = texture2DCompare( depths, centroidUV + texelSize * offset.yx, compare );\n\t\tfloat rt = texture2DCompare( depths, centroidUV + texelSize * offset.yy, compare );\n\t\tvec2 f = fract( uv * size + 0.5 );\n\t\tfloat a = mix( lb, lt, f.y );\n\t\tfloat b = mix( rb, rt, f.y );\n\t\tfloat c = mix( a, b, f.x );\n\t\treturn c;\n\t}\n\tfloat getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {\n\t\tfloat shadow = 1.0;\n\t\tshadowCoord.xyz /= shadowCoord.w;\n\t\tshadowCoord.z += shadowBias;\n\t\tbvec4 inFrustumVec = bvec4 ( shadowCoord.x >= 0.0, shadowCoord.x <= 1.0, shadowCoord.y >= 0.0, shadowCoord.y <= 1.0 );\n\t\tbool inFrustum = all( inFrustumVec );\n\t\tbvec2 frustumTestVec = bvec2( inFrustum, shadowCoord.z <= 1.0 );\n\t\tbool frustumTest = all( frustumTestVec );\n\t\tif ( frustumTest ) {\n\t\t#if defined( SHADOWMAP_TYPE_PCF )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tfloat dx2 = dx0 / 2.0;\n\t\t\tfloat dy2 = dy0 / 2.0;\n\t\t\tfloat dx3 = dx1 / 2.0;\n\t\t\tfloat dy3 = dy1 / 2.0;\n\t\t\tshadow = (\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 17.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_PCF_SOFT )\n\t\t\tvec2 texelSize = vec2( 1.0 ) / shadowMapSize;\n\t\t\tfloat dx0 = - texelSize.x * shadowRadius;\n\t\t\tfloat dy0 = - texelSize.y * shadowRadius;\n\t\t\tfloat dx1 = + texelSize.x * shadowRadius;\n\t\t\tfloat dy1 = + texelSize.y * shadowRadius;\n\t\t\tshadow = (\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy, shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +\n\t\t\t\ttexture2DShadowLerp( shadowMap, shadowMapSize, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#elif defined( SHADOWMAP_TYPE_VSM )\n\t\t\tshadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#else\n\t\t\tshadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );\n\t\t#endif\n\t\t}\n\t\treturn shadow;\n\t}\n\tvec2 cubeToUV( vec3 v, float texelSizeY ) {\n\t\tvec3 absV = abs( v );\n\t\tfloat scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );\n\t\tabsV *= scaleToCube;\n\t\tv *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );\n\t\tvec2 planar = v.xy;\n\t\tfloat almostATexel = 1.5 * texelSizeY;\n\t\tfloat almostOne = 1.0 - almostATexel;\n\t\tif ( absV.z >= almostOne ) {\n\t\t\tif ( v.z > 0.0 )\n\t\t\t\tplanar.x = 4.0 - v.x;\n\t\t} else if ( absV.x >= almostOne ) {\n\t\t\tfloat signX = sign( v.x );\n\t\t\tplanar.x = v.z * signX + 2.0 * signX;\n\t\t} else if ( absV.y >= almostOne ) {\n\t\t\tfloat signY = sign( v.y );\n\t\t\tplanar.x = v.x + 2.0 * signY + 2.0;\n\t\t\tplanar.y = v.z * signY - 2.0;\n\t\t}\n\t\treturn vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );\n\t}\n\tfloat getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {\n\t\tvec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );\n\t\tvec3 lightToPosition = shadowCoord.xyz;\n\t\tfloat dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );\t\tdp += shadowBias;\n\t\tvec3 bd3D = normalize( lightToPosition );\n\t\t#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )\n\t\t\tvec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;\n\t\t\treturn (\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +\n\t\t\t\ttexture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )\n\t\t\t) * ( 1.0 / 9.0 );\n\t\t#else\n\t\t\treturn texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );\n\t\t#endif\n\t}\n#endif',
      shadowmap_pars_vertex:
        '#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t\tuniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];\n\t\tvarying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 spotShadowMatrix[ NUM_SPOT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vSpotShadowCoord[ NUM_SPOT_LIGHT_SHADOWS ];\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t\tuniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];\n\t\tvarying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];\n\t#endif\n#endif',
      shadowmap_vertex:
        '#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tvDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tvSpotShadowCoord[ i ] = spotShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tvPointShadowCoord[ i ] = pointShadowMatrix[ i ] * worldPosition;\n\t}\n\t#endif\n#endif',
      shadowmask_pars_fragment:
        'float getShadowMask() {\n\tfloat shadow = 1.0;\n\t#ifdef USE_SHADOWMAP\n\t#if NUM_DIR_LIGHT_SHADOWS > 0\n\tDirectionalLight directionalLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {\n\t\tdirectionalLight = directionalLights[ i ];\n\t\tshadow *= all( bvec2( directionalLight.shadow, receiveShadow ) ) ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_SPOT_LIGHT_SHADOWS > 0\n\tSpotLight spotLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {\n\t\tspotLight = spotLights[ i ];\n\t\tshadow *= all( bvec2( spotLight.shadow, receiveShadow ) ) ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotShadowCoord[ i ] ) : 1.0;\n\t}\n\t#endif\n\t#if NUM_POINT_LIGHT_SHADOWS > 0\n\tPointLight pointLight;\n\t#pragma unroll_loop\n\tfor ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {\n\t\tpointLight = pointLights[ i ];\n\t\tshadow *= all( bvec2( pointLight.shadow, receiveShadow ) ) ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;\n\t}\n\t#endif\n\t#endif\n\treturn shadow;\n}',
      skinbase_vertex:
        '#ifdef USE_SKINNING\n\tmat4 boneMatX = getBoneMatrix( skinIndex.x );\n\tmat4 boneMatY = getBoneMatrix( skinIndex.y );\n\tmat4 boneMatZ = getBoneMatrix( skinIndex.z );\n\tmat4 boneMatW = getBoneMatrix( skinIndex.w );\n#endif',
      skinning_pars_vertex:
        '#ifdef USE_SKINNING\n\tuniform mat4 bindMatrix;\n\tuniform mat4 bindMatrixInverse;\n\t#ifdef BONE_TEXTURE\n\t\tuniform highp sampler2D boneTexture;\n\t\tuniform int boneTextureSize;\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tfloat j = i * 4.0;\n\t\t\tfloat x = mod( j, float( boneTextureSize ) );\n\t\t\tfloat y = floor( j / float( boneTextureSize ) );\n\t\t\tfloat dx = 1.0 / float( boneTextureSize );\n\t\t\tfloat dy = 1.0 / float( boneTextureSize );\n\t\t\ty = dy * ( y + 0.5 );\n\t\t\tvec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );\n\t\t\tvec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );\n\t\t\tvec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );\n\t\t\tvec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );\n\t\t\tmat4 bone = mat4( v1, v2, v3, v4 );\n\t\t\treturn bone;\n\t\t}\n\t#else\n\t\tuniform mat4 boneMatrices[ MAX_BONES ];\n\t\tmat4 getBoneMatrix( const in float i ) {\n\t\t\tmat4 bone = boneMatrices[ int(i) ];\n\t\t\treturn bone;\n\t\t}\n\t#endif\n#endif',
      skinning_vertex:
        '#ifdef USE_SKINNING\n\tvec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );\n\tvec4 skinned = vec4( 0.0 );\n\tskinned += boneMatX * skinVertex * skinWeight.x;\n\tskinned += boneMatY * skinVertex * skinWeight.y;\n\tskinned += boneMatZ * skinVertex * skinWeight.z;\n\tskinned += boneMatW * skinVertex * skinWeight.w;\n\ttransformed = ( bindMatrixInverse * skinned ).xyz;\n#endif',
      skinnormal_vertex:
        '#ifdef USE_SKINNING\n\tmat4 skinMatrix = mat4( 0.0 );\n\tskinMatrix += skinWeight.x * boneMatX;\n\tskinMatrix += skinWeight.y * boneMatY;\n\tskinMatrix += skinWeight.z * boneMatZ;\n\tskinMatrix += skinWeight.w * boneMatW;\n\tskinMatrix  = bindMatrixInverse * skinMatrix * bindMatrix;\n\tobjectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;\n\t#ifdef USE_TANGENT\n\t\tobjectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;\n\t#endif\n#endif',
      specularmap_fragment:
        'float specularStrength;\n#ifdef USE_SPECULARMAP\n\tvec4 texelSpecular = texture2D( specularMap, vUv );\n\tspecularStrength = texelSpecular.r;\n#else\n\tspecularStrength = 1.0;\n#endif',
      specularmap_pars_fragment:
        '#ifdef USE_SPECULARMAP\n\tuniform sampler2D specularMap;\n#endif',
      tonemapping_fragment:
        '#if defined( TONE_MAPPING )\n\tgl_FragColor.rgb = toneMapping( gl_FragColor.rgb );\n#endif',
      tonemapping_pars_fragment:
        '#ifndef saturate\n#define saturate(a) clamp( a, 0.0, 1.0 )\n#endif\nuniform float toneMappingExposure;\nuniform float toneMappingWhitePoint;\nvec3 LinearToneMapping( vec3 color ) {\n\treturn toneMappingExposure * color;\n}\nvec3 ReinhardToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( color / ( vec3( 1.0 ) + color ) );\n}\n#define Uncharted2Helper( x ) max( ( ( x * ( 0.15 * x + 0.10 * 0.50 ) + 0.20 * 0.02 ) / ( x * ( 0.15 * x + 0.50 ) + 0.20 * 0.30 ) ) - 0.02 / 0.30, vec3( 0.0 ) )\nvec3 Uncharted2ToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( Uncharted2Helper( color ) / Uncharted2Helper( vec3( toneMappingWhitePoint ) ) );\n}\nvec3 OptimizedCineonToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\tcolor = max( vec3( 0.0 ), color - 0.004 );\n\treturn pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );\n}\nvec3 ACESFilmicToneMapping( vec3 color ) {\n\tcolor *= toneMappingExposure;\n\treturn saturate( ( color * ( 2.51 * color + 0.03 ) ) / ( color * ( 2.43 * color + 0.59 ) + 0.14 ) );\n}',
      uv_pars_fragment:
        '#if ( defined( USE_UV ) && ! defined( UVS_VERTEX_ONLY ) )\n\tvarying vec2 vUv;\n#endif',
      uv_pars_vertex:
        '#ifdef USE_UV\n\t#ifdef UVS_VERTEX_ONLY\n\t\tvec2 vUv;\n\t#else\n\t\tvarying vec2 vUv;\n\t#endif\n\tuniform mat3 uvTransform;\n#endif',
      uv_vertex:
        '#ifdef USE_UV\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n#endif',
      uv2_pars_fragment:
        '#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvarying vec2 vUv2;\n#endif',
      uv2_pars_vertex:
        '#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tattribute vec2 uv2;\n\tvarying vec2 vUv2;\n#endif',
      uv2_vertex:
        '#if defined( USE_LIGHTMAP ) || defined( USE_AOMAP )\n\tvUv2 = uv2;\n#endif',
      worldpos_vertex:
        '#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP )\n\tvec4 worldPosition = vec4( transformed, 1.0 );\n\t#ifdef USE_INSTANCING\n\t\tworldPosition = instanceMatrix * worldPosition;\n\t#endif\n\tworldPosition = modelMatrix * worldPosition;\n#endif',
      background_frag:
        'uniform sampler2D t2D;\nvarying vec2 vUv;\nvoid main() {\n\tvec4 texColor = texture2D( t2D, vUv );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}',
      background_vert:
        'varying vec2 vUv;\nuniform mat3 uvTransform;\nvoid main() {\n\tvUv = ( uvTransform * vec3( uv, 1 ) ).xy;\n\tgl_Position = vec4( position.xy, 1.0, 1.0 );\n}',
      cube_frag:
        'uniform samplerCube tCube;\nuniform float tFlip;\nuniform float opacity;\nvarying vec3 vWorldDirection;\nvoid main() {\n\tvec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\tgl_FragColor.a *= opacity;\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}',
      cube_vert:
        'varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\tgl_Position.z = gl_Position.w;\n}',
      depth_frag:
        '#if DEPTH_PACKING == 3200\n\tuniform float opacity;\n#endif\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#if DEPTH_PACKING == 3200\n\t\tdiffuseColor.a = opacity;\n\t#endif\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <logdepthbuf_fragment>\n\t#if DEPTH_PACKING == 3200\n\t\tgl_FragColor = vec4( vec3( 1.0 - gl_FragCoord.z ), opacity );\n\t#elif DEPTH_PACKING == 3201\n\t\tgl_FragColor = packDepthToRGBA( gl_FragCoord.z );\n\t#endif\n}',
      depth_vert:
        '#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n}',
      distanceRGBA_frag:
        '#define DISTANCE\nuniform vec3 referencePosition;\nuniform float nearDistance;\nuniform float farDistance;\nvarying vec3 vWorldPosition;\n#include <common>\n#include <packing>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main () {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( 1.0 );\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\tfloat dist = length( vWorldPosition - referencePosition );\n\tdist = ( dist - nearDistance ) / ( farDistance - nearDistance );\n\tdist = saturate( dist );\n\tgl_FragColor = packDepthToRGBA( dist );\n}',
      distanceRGBA_vert:
        '#define DISTANCE\nvarying vec3 vWorldPosition;\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_DISPLACEMENTMAP\n\t\t#include <beginnormal_vertex>\n\t\t#include <morphnormal_vertex>\n\t\t#include <skinnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\tvWorldPosition = worldPosition.xyz;\n}',
      equirect_frag:
        'uniform sampler2D tEquirect;\nvarying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvec3 direction = normalize( vWorldDirection );\n\tvec2 sampleUV;\n\tsampleUV.y = asin( clamp( direction.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;\n\tsampleUV.x = atan( direction.z, direction.x ) * RECIPROCAL_PI2 + 0.5;\n\tvec4 texColor = texture2D( tEquirect, sampleUV );\n\tgl_FragColor = mapTexelToLinear( texColor );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n}',
      equirect_vert:
        'varying vec3 vWorldDirection;\n#include <common>\nvoid main() {\n\tvWorldDirection = transformDirection( position, modelMatrix );\n\t#include <begin_vertex>\n\t#include <project_vertex>\n}',
      linedashed_frag:
        'uniform vec3 diffuse;\nuniform float opacity;\nuniform float dashSize;\nuniform float totalSize;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tif ( mod( vLineDistance, totalSize ) > dashSize ) {\n\t\tdiscard;\n\t}\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <color_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}',
      linedashed_vert:
        'uniform float scale;\nattribute float lineDistance;\nvarying float vLineDistance;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\tvLineDistance = scale * lineDistance;\n\tvec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}',
      meshbasic_frag:
        'uniform vec3 diffuse;\nuniform float opacity;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\t#ifdef USE_LIGHTMAP\n\t\treflectedLight.indirectDiffuse += texture2D( lightMap, vUv2 ).xyz * lightMapIntensity;\n\t#else\n\t\treflectedLight.indirectDiffuse += vec3( 1.0 );\n\t#endif\n\t#include <aomap_fragment>\n\treflectedLight.indirectDiffuse *= diffuseColor.rgb;\n\tvec3 outgoingLight = reflectedLight.indirectDiffuse;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}',
      meshbasic_vert:
        '#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <skinbase_vertex>\n\t#ifdef USE_ENVMAP\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <worldpos_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <envmap_vertex>\n\t#include <fog_vertex>\n}',
      meshlambert_frag:
        'uniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float opacity;\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <fog_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <emissivemap_fragment>\n\treflectedLight.indirectDiffuse = getAmbientLightIrradiance( ambientLightColor );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.indirectDiffuse += ( gl_FrontFacing ) ? vIndirectFront : vIndirectBack;\n\t#else\n\t\treflectedLight.indirectDiffuse += vIndirectFront;\n\t#endif\n\t#include <lightmap_fragment>\n\treflectedLight.indirectDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb );\n\t#ifdef DOUBLE_SIDED\n\t\treflectedLight.directDiffuse = ( gl_FrontFacing ) ? vLightFront : vLightBack;\n\t#else\n\t\treflectedLight.directDiffuse = vLightFront;\n\t#endif\n\treflectedLight.directDiffuse *= BRDF_Diffuse_Lambert( diffuseColor.rgb ) * getShadowMask();\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
      meshlambert_vert:
        '#define LAMBERT\nvarying vec3 vLightFront;\nvarying vec3 vIndirectFront;\n#ifdef DOUBLE_SIDED\n\tvarying vec3 vLightBack;\n\tvarying vec3 vIndirectBack;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <envmap_pars_vertex>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <lights_lambert_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
      meshmatcap_frag:
        '#define MATCAP\nuniform vec3 diffuse;\nuniform float opacity;\nuniform sampler2D matcap;\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tvec3 viewDir = normalize( vViewPosition );\n\tvec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );\n\tvec3 y = cross( viewDir, x );\n\tvec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;\n\t#ifdef USE_MATCAP\n\t\tvec4 matcapColor = texture2D( matcap, uv );\n\t\tmatcapColor = matcapTexelToLinear( matcapColor );\n\t#else\n\t\tvec4 matcapColor = vec4( 1.0 );\n\t#endif\n\tvec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}',
      meshmatcap_vert:
        '#define MATCAP\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n\t#ifndef FLAT_SHADED\n\t\tvNormal = normalize( transformedNormal );\n\t#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n\tvViewPosition = - mvPosition.xyz;\n}',
      meshphong_frag:
        '#define PHONG\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform vec3 specular;\nuniform float shininess;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_pars_fragment>\n#include <gradientmap_pars_fragment>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <lights_phong_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <specularmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <specularmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_phong_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#include <envmap_fragment>\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
      meshphong_vert:
        '#define PHONG\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <envmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <envmap_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
      meshphysical_frag:
        '#define STANDARD\n#ifdef PHYSICAL\n\t#define REFLECTIVITY\n\t#define CLEARCOAT\n\t#define TRANSPARENCY\n#endif\nuniform vec3 diffuse;\nuniform vec3 emissive;\nuniform float roughness;\nuniform float metalness;\nuniform float opacity;\n#ifdef TRANSPARENCY\n\tuniform float transparency;\n#endif\n#ifdef REFLECTIVITY\n\tuniform float reflectivity;\n#endif\n#ifdef CLEARCOAT\n\tuniform float clearcoat;\n\tuniform float clearcoatRoughness;\n#endif\n#ifdef USE_SHEEN\n\tuniform vec3 sheen;\n#endif\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <packing>\n#include <dithering_pars_fragment>\n#include <color_pars_fragment>\n#include <uv_pars_fragment>\n#include <uv2_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <aomap_pars_fragment>\n#include <lightmap_pars_fragment>\n#include <emissivemap_pars_fragment>\n#include <bsdfs>\n#include <cube_uv_reflection_fragment>\n#include <envmap_common_pars_fragment>\n#include <envmap_physical_pars_fragment>\n#include <fog_pars_fragment>\n#include <lights_pars_begin>\n#include <lights_physical_pars_fragment>\n#include <shadowmap_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <clearcoat_normalmap_pars_fragment>\n#include <roughnessmap_pars_fragment>\n#include <metalnessmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\tReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );\n\tvec3 totalEmissiveRadiance = emissive;\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <color_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\t#include <roughnessmap_fragment>\n\t#include <metalnessmap_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\t#include <clearcoat_normal_fragment_begin>\n\t#include <clearcoat_normal_fragment_maps>\n\t#include <emissivemap_fragment>\n\t#include <lights_physical_fragment>\n\t#include <lights_fragment_begin>\n\t#include <lights_fragment_maps>\n\t#include <lights_fragment_end>\n\t#include <aomap_fragment>\n\tvec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;\n\t#ifdef TRANSPARENCY\n\t\tdiffuseColor.a *= saturate( 1. - transparency + linearToRelativeLuminance( reflectedLight.directSpecular + reflectedLight.indirectSpecular ) );\n\t#endif\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n\t#include <premultiplied_alpha_fragment>\n\t#include <dithering_fragment>\n}',
      meshphysical_vert:
        '#define STANDARD\nvarying vec3 vViewPosition;\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <uv2_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <shadowmap_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <uv2_vertex>\n\t#include <color_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\tvViewPosition = - mvPosition.xyz;\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
      normal_frag:
        '#define NORMAL\nuniform float opacity;\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <packing>\n#include <uv_pars_fragment>\n#include <bumpmap_pars_fragment>\n#include <normalmap_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\t#include <logdepthbuf_fragment>\n\t#include <normal_fragment_begin>\n\t#include <normal_fragment_maps>\n\tgl_FragColor = vec4( packNormalToRGB( normal ), opacity );\n}',
      normal_vert:
        '#define NORMAL\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvarying vec3 vViewPosition;\n#endif\n#ifndef FLAT_SHADED\n\tvarying vec3 vNormal;\n\t#ifdef USE_TANGENT\n\t\tvarying vec3 vTangent;\n\t\tvarying vec3 vBitangent;\n\t#endif\n#endif\n#include <common>\n#include <uv_pars_vertex>\n#include <displacementmap_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <skinning_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\t#include <beginnormal_vertex>\n\t#include <morphnormal_vertex>\n\t#include <skinbase_vertex>\n\t#include <skinnormal_vertex>\n\t#include <defaultnormal_vertex>\n#ifndef FLAT_SHADED\n\tvNormal = normalize( transformedNormal );\n\t#ifdef USE_TANGENT\n\t\tvTangent = normalize( transformedTangent );\n\t\tvBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );\n\t#endif\n#endif\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <skinning_vertex>\n\t#include <displacementmap_vertex>\n\t#include <project_vertex>\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( TANGENTSPACE_NORMALMAP )\n\tvViewPosition = - mvPosition.xyz;\n#endif\n}',
      points_frag:
        'uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <color_pars_fragment>\n#include <map_particle_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_particle_fragment>\n\t#include <color_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <premultiplied_alpha_fragment>\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}',
      points_vert:
        'uniform float size;\nuniform float scale;\n#include <common>\n#include <color_pars_vertex>\n#include <fog_pars_vertex>\n#include <morphtarget_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <color_vertex>\n\t#include <begin_vertex>\n\t#include <morphtarget_vertex>\n\t#include <project_vertex>\n\tgl_PointSize = size;\n\t#ifdef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );\n\t#endif\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <worldpos_vertex>\n\t#include <fog_vertex>\n}',
      shadow_frag:
        'uniform vec3 color;\nuniform float opacity;\n#include <common>\n#include <packing>\n#include <fog_pars_fragment>\n#include <bsdfs>\n#include <lights_pars_begin>\n#include <shadowmap_pars_fragment>\n#include <shadowmask_pars_fragment>\nvoid main() {\n\tgl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );\n\t#include <fog_fragment>\n}',
      shadow_vert:
        '#include <fog_pars_vertex>\n#include <shadowmap_pars_vertex>\nvoid main() {\n\t#include <begin_vertex>\n\t#include <project_vertex>\n\t#include <worldpos_vertex>\n\t#include <shadowmap_vertex>\n\t#include <fog_vertex>\n}',
      sprite_frag:
        'uniform vec3 diffuse;\nuniform float opacity;\n#include <common>\n#include <uv_pars_fragment>\n#include <map_pars_fragment>\n#include <alphamap_pars_fragment>\n#include <fog_pars_fragment>\n#include <logdepthbuf_pars_fragment>\n#include <clipping_planes_pars_fragment>\nvoid main() {\n\t#include <clipping_planes_fragment>\n\tvec3 outgoingLight = vec3( 0.0 );\n\tvec4 diffuseColor = vec4( diffuse, opacity );\n\t#include <logdepthbuf_fragment>\n\t#include <map_fragment>\n\t#include <alphamap_fragment>\n\t#include <alphatest_fragment>\n\toutgoingLight = diffuseColor.rgb;\n\tgl_FragColor = vec4( outgoingLight, diffuseColor.a );\n\t#include <tonemapping_fragment>\n\t#include <encodings_fragment>\n\t#include <fog_fragment>\n}',
      sprite_vert:
        'uniform float rotation;\nuniform vec2 center;\n#include <common>\n#include <uv_pars_vertex>\n#include <fog_pars_vertex>\n#include <logdepthbuf_pars_vertex>\n#include <clipping_planes_pars_vertex>\nvoid main() {\n\t#include <uv_vertex>\n\tvec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );\n\tvec2 scale;\n\tscale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );\n\tscale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );\n\t#ifndef USE_SIZEATTENUATION\n\t\tbool isPerspective = isPerspectiveMatrix( projectionMatrix );\n\t\tif ( isPerspective ) scale *= - mvPosition.z;\n\t#endif\n\tvec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;\n\tvec2 rotatedPosition;\n\trotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;\n\trotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;\n\tmvPosition.xy += rotatedPosition;\n\tgl_Position = projectionMatrix * mvPosition;\n\t#include <logdepthbuf_vertex>\n\t#include <clipping_planes_vertex>\n\t#include <fog_vertex>\n}',
    },
    K = {
      common: {
        diffuse: { value: new D(15658734) },
        opacity: { value: 1 },
        map: { value: null },
        uvTransform: { value: new ka() },
        alphaMap: { value: null },
      },
      specularmap: { specularMap: { value: null } },
      envmap: {
        envMap: { value: null },
        flipEnvMap: { value: -1 },
        reflectivity: { value: 1 },
        refractionRatio: { value: 0.98 },
        maxMipLevel: { value: 0 },
      },
      aomap: { aoMap: { value: null }, aoMapIntensity: { value: 1 } },
      lightmap: { lightMap: { value: null }, lightMapIntensity: { value: 1 } },
      emissivemap: { emissiveMap: { value: null } },
      bumpmap: { bumpMap: { value: null }, bumpScale: { value: 1 } },
      normalmap: {
        normalMap: { value: null },
        normalScale: { value: new z(1, 1) },
      },
      displacementmap: {
        displacementMap: { value: null },
        displacementScale: { value: 1 },
        displacementBias: { value: 0 },
      },
      roughnessmap: { roughnessMap: { value: null } },
      metalnessmap: { metalnessMap: { value: null } },
      gradientmap: { gradientMap: { value: null } },
      fog: {
        fogDensity: { value: 2.5e-4 },
        fogNear: { value: 1 },
        fogFar: { value: 2e3 },
        fogColor: { value: new D(16777215) },
      },
      lights: {
        ambientLightColor: { value: [] },
        lightProbe: { value: [] },
        directionalLights: {
          value: [],
          properties: {
            direction: {},
            color: {},
            shadow: {},
            shadowBias: {},
            shadowRadius: {},
            shadowMapSize: {},
          },
        },
        directionalShadowMap: { value: [] },
        directionalShadowMatrix: { value: [] },
        spotLights: {
          value: [],
          properties: {
            color: {},
            position: {},
            direction: {},
            distance: {},
            coneCos: {},
            penumbraCos: {},
            decay: {},
            shadow: {},
            shadowBias: {},
            shadowRadius: {},
            shadowMapSize: {},
          },
        },
        spotShadowMap: { value: [] },
        spotShadowMatrix: { value: [] },
        pointLights: {
          value: [],
          properties: {
            color: {},
            position: {},
            decay: {},
            distance: {},
            shadow: {},
            shadowBias: {},
            shadowRadius: {},
            shadowMapSize: {},
            shadowCameraNear: {},
            shadowCameraFar: {},
          },
        },
        pointShadowMap: { value: [] },
        pointShadowMatrix: { value: [] },
        hemisphereLights: {
          value: [],
          properties: { direction: {}, skyColor: {}, groundColor: {} },
        },
        rectAreaLights: {
          value: [],
          properties: { color: {}, position: {}, width: {}, height: {} },
        },
      },
      points: {
        diffuse: { value: new D(15658734) },
        opacity: { value: 1 },
        size: { value: 1 },
        scale: { value: 1 },
        map: { value: null },
        alphaMap: { value: null },
        uvTransform: { value: new ka() },
      },
      sprite: {
        diffuse: { value: new D(15658734) },
        opacity: { value: 1 },
        center: { value: new z(0.5, 0.5) },
        rotation: { value: 0 },
        map: { value: null },
        alphaMap: { value: null },
        uvTransform: { value: new ka() },
      },
    },
    ib = {
      basic: {
        uniforms: za([
          K.common,
          K.specularmap,
          K.envmap,
          K.aomap,
          K.lightmap,
          K.fog,
        ]),
        vertexShader: Q.meshbasic_vert,
        fragmentShader: Q.meshbasic_frag,
      },
      lambert: {
        uniforms: za([
          K.common,
          K.specularmap,
          K.envmap,
          K.aomap,
          K.lightmap,
          K.emissivemap,
          K.fog,
          K.lights,
          { emissive: { value: new D(0) } },
        ]),
        vertexShader: Q.meshlambert_vert,
        fragmentShader: Q.meshlambert_frag,
      },
      phong: {
        uniforms: za([
          K.common,
          K.specularmap,
          K.envmap,
          K.aomap,
          K.lightmap,
          K.emissivemap,
          K.bumpmap,
          K.normalmap,
          K.displacementmap,
          K.gradientmap,
          K.fog,
          K.lights,
          {
            emissive: { value: new D(0) },
            specular: { value: new D(1118481) },
            shininess: { value: 30 },
          },
        ]),
        vertexShader: Q.meshphong_vert,
        fragmentShader: Q.meshphong_frag,
      },
      standard: {
        uniforms: za([
          K.common,
          K.envmap,
          K.aomap,
          K.lightmap,
          K.emissivemap,
          K.bumpmap,
          K.normalmap,
          K.displacementmap,
          K.roughnessmap,
          K.metalnessmap,
          K.fog,
          K.lights,
          {
            emissive: { value: new D(0) },
            roughness: { value: 0.5 },
            metalness: { value: 0.5 },
            envMapIntensity: { value: 1 },
          },
        ]),
        vertexShader: Q.meshphysical_vert,
        fragmentShader: Q.meshphysical_frag,
      },
      matcap: {
        uniforms: za([
          K.common,
          K.bumpmap,
          K.normalmap,
          K.displacementmap,
          K.fog,
          { matcap: { value: null } },
        ]),
        vertexShader: Q.meshmatcap_vert,
        fragmentShader: Q.meshmatcap_frag,
      },
      points: {
        uniforms: za([K.points, K.fog]),
        vertexShader: Q.points_vert,
        fragmentShader: Q.points_frag,
      },
      dashed: {
        uniforms: za([
          K.common,
          K.fog,
          {
            scale: { value: 1 },
            dashSize: { value: 1 },
            totalSize: { value: 2 },
          },
        ]),
        vertexShader: Q.linedashed_vert,
        fragmentShader: Q.linedashed_frag,
      },
      depth: {
        uniforms: za([K.common, K.displacementmap]),
        vertexShader: Q.depth_vert,
        fragmentShader: Q.depth_frag,
      },
      normal: {
        uniforms: za([
          K.common,
          K.bumpmap,
          K.normalmap,
          K.displacementmap,
          { opacity: { value: 1 } },
        ]),
        vertexShader: Q.normal_vert,
        fragmentShader: Q.normal_frag,
      },
      sprite: {
        uniforms: za([K.sprite, K.fog]),
        vertexShader: Q.sprite_vert,
        fragmentShader: Q.sprite_frag,
      },
      background: {
        uniforms: { uvTransform: { value: new ka() }, t2D: { value: null } },
        vertexShader: Q.background_vert,
        fragmentShader: Q.background_frag,
      },
      cube: {
        uniforms: {
          tCube: { value: null },
          tFlip: { value: -1 },
          opacity: { value: 1 },
        },
        vertexShader: Q.cube_vert,
        fragmentShader: Q.cube_frag,
      },
      equirect: {
        uniforms: { tEquirect: { value: null } },
        vertexShader: Q.equirect_vert,
        fragmentShader: Q.equirect_frag,
      },
      distanceRGBA: {
        uniforms: za([
          K.common,
          K.displacementmap,
          {
            referencePosition: { value: new q() },
            nearDistance: { value: 1 },
            farDistance: { value: 1e3 },
          },
        ]),
        vertexShader: Q.distanceRGBA_vert,
        fragmentShader: Q.distanceRGBA_frag,
      },
      shadow: {
        uniforms: za([
          K.lights,
          K.fog,
          { color: { value: new D(0) }, opacity: { value: 1 } },
        ]),
        vertexShader: Q.shadow_vert,
        fragmentShader: Q.shadow_frag,
      },
    }
  ib.physical = {
    uniforms: za([
      ib.standard.uniforms,
      {
        transparency: { value: 0 },
        clearcoat: { value: 0 },
        clearcoatRoughness: { value: 0 },
        sheen: { value: new D(0) },
        clearcoatNormalScale: { value: new z(1, 1) },
        clearcoatNormalMap: { value: null },
      },
    ]),
    vertexShader: Q.meshphysical_vert,
    fragmentShader: Q.meshphysical_frag,
  }
  Td.prototype = Object.create(P.prototype)
  Td.prototype.constructor = Td
  ic.prototype = Object.create(G.prototype)
  ic.prototype.constructor = ic
  vb.prototype = Object.create(S.prototype)
  vb.prototype.constructor = vb
  vb.prototype.isCubeTexture = !0
  Object.defineProperty(vb.prototype, 'images', {
    get: function () {
      return this.image
    },
    set: function (a) {
      this.image = a
    },
  })
  Rc.prototype = Object.create(S.prototype)
  Rc.prototype.constructor = Rc
  Rc.prototype.isDataTexture2DArray = !0
  Sc.prototype = Object.create(S.prototype)
  Sc.prototype.constructor = Sc
  Sc.prototype.isDataTexture3D = !0
  var gi = new S(),
    ok = new Rc(),
    qk = new Sc(),
    hi = new vb(),
    ai = [],
    ci = [],
    fi = new Float32Array(16),
    ei = new Float32Array(9),
    di = new Float32Array(4)
  ii.prototype.updateCache = function (a) {
    var b = this.cache
    a instanceof Float32Array &&
      b.length !== a.length &&
      (this.cache = new Float32Array(a.length))
    Ja(b, a)
  }
  ji.prototype.setValue = function (a, b, c) {
    for (var d = this.seq, f = 0, g = d.length; f !== g; ++f) {
      var k = d[f]
      k.setValue(a, b[k.id], c)
    }
  }
  var Ag = /([\w\d_]+)(\])?(\[|\.)?/g
  Jb.prototype.setValue = function (a, b, c, d) {
    b = this.map[b]
    void 0 !== b && b.setValue(a, c, d)
  }
  Jb.prototype.setOptional = function (a, b, c) {
    b = b[c]
    void 0 !== b && this.setValue(a, c, b)
  }
  Jb.upload = function (a, b, c, d) {
    for (var f = 0, g = b.length; f !== g; ++f) {
      var k = b[f],
        m = c[k.id]
      !1 !== m.needsUpdate && k.setValue(a, m.value, d)
    }
  }
  Jb.seqWithValue = function (a, b) {
    for (var c = [], d = 0, f = a.length; d !== f; ++d) {
      var g = a[d]
      g.id in b && c.push(g)
    }
    return c
  }
  var Vk = 0,
    Cg = /^[ \t]*#include +<([\w\d./]+)>/gm,
    ri = /#pragma unroll_loop[\s]+?for \( int i = (\d+); i < (\d+); i \+\+ \) \{([\s\S]+?)(?=\})\}/g,
    dl = 0
  Kb.prototype = Object.create(R.prototype)
  Kb.prototype.constructor = Kb
  Kb.prototype.isMeshDepthMaterial = !0
  Kb.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.depthPacking = a.depthPacking
    this.skinning = a.skinning
    this.morphTargets = a.morphTargets
    this.map = a.map
    this.alphaMap = a.alphaMap
    this.displacementMap = a.displacementMap
    this.displacementScale = a.displacementScale
    this.displacementBias = a.displacementBias
    this.wireframe = a.wireframe
    this.wireframeLinewidth = a.wireframeLinewidth
    return this
  }
  Lb.prototype = Object.create(R.prototype)
  Lb.prototype.constructor = Lb
  Lb.prototype.isMeshDistanceMaterial = !0
  Lb.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.referencePosition.copy(a.referencePosition)
    this.nearDistance = a.nearDistance
    this.farDistance = a.farDistance
    this.skinning = a.skinning
    this.morphTargets = a.morphTargets
    this.map = a.map
    this.alphaMap = a.alphaMap
    this.displacementMap = a.displacementMap
    this.displacementScale = a.displacementScale
    this.displacementBias = a.displacementBias
    return this
  }
  Fg.prototype = Object.assign(Object.create(sa.prototype), {
    constructor: Fg,
    isWebGLMultiviewRenderTarget: !0,
    copy: function (a) {
      sa.prototype.copy.call(this, a)
      this.numViews = a.numViews
      return this
    },
    setNumViews: function (a) {
      this.numViews !== a && ((this.numViews = a), this.dispose())
      return this
    },
  })
  Vc.prototype = Object.assign(Object.create(E.prototype), {
    constructor: Vc,
    isGroup: !0,
  })
  Yd.prototype = Object.assign(Object.create(na.prototype), {
    constructor: Yd,
    isArrayCamera: !0,
  })
  var yi = new q(),
    zi = new q()
  Object.assign(Gg.prototype, Ra.prototype)
  Object.assign(Ai.prototype, Ra.prototype)
  Object.assign(cf.prototype, {
    isFogExp2: !0,
    clone: function () {
      return new cf(this.color, this.density)
    },
    toJSON: function () {
      return {
        type: 'FogExp2',
        color: this.color.getHex(),
        density: this.density,
      }
    },
  })
  Object.assign(df.prototype, {
    isFog: !0,
    clone: function () {
      return new df(this.color, this.near, this.far)
    },
    toJSON: function () {
      return {
        type: 'Fog',
        color: this.color.getHex(),
        near: this.near,
        far: this.far,
      }
    },
  })
  Object.defineProperty(wb.prototype, 'needsUpdate', {
    set: function (a) {
      !0 === a && this.version++
    },
  })
  Object.assign(wb.prototype, {
    isInterleavedBuffer: !0,
    onUploadCallback: function () {},
    setUsage: function (a) {
      this.usage = a
      return this
    },
    copy: function (a) {
      this.array = new a.array.constructor(a.array)
      this.count = a.count
      this.stride = a.stride
      this.usage = a.usage
      return this
    },
    copyAt: function (a, b, c) {
      a *= this.stride
      c *= b.stride
      for (var d = 0, f = this.stride; d < f; d++)
        this.array[a + d] = b.array[c + d]
      return this
    },
    set: function (a, b) {
      void 0 === b && (b = 0)
      this.array.set(a, b)
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    onUpload: function (a) {
      this.onUploadCallback = a
      return this
    },
  })
  Object.defineProperties(Zd.prototype, {
    count: {
      get: function () {
        return this.data.count
      },
    },
    array: {
      get: function () {
        return this.data.array
      },
    },
  })
  Object.assign(Zd.prototype, {
    isInterleavedBufferAttribute: !0,
    setX: function (a, b) {
      this.data.array[a * this.data.stride + this.offset] = b
      return this
    },
    setY: function (a, b) {
      this.data.array[a * this.data.stride + this.offset + 1] = b
      return this
    },
    setZ: function (a, b) {
      this.data.array[a * this.data.stride + this.offset + 2] = b
      return this
    },
    setW: function (a, b) {
      this.data.array[a * this.data.stride + this.offset + 3] = b
      return this
    },
    getX: function (a) {
      return this.data.array[a * this.data.stride + this.offset]
    },
    getY: function (a) {
      return this.data.array[a * this.data.stride + this.offset + 1]
    },
    getZ: function (a) {
      return this.data.array[a * this.data.stride + this.offset + 2]
    },
    getW: function (a) {
      return this.data.array[a * this.data.stride + this.offset + 3]
    },
    setXY: function (a, b, c) {
      a = a * this.data.stride + this.offset
      this.data.array[a + 0] = b
      this.data.array[a + 1] = c
      return this
    },
    setXYZ: function (a, b, c, d) {
      a = a * this.data.stride + this.offset
      this.data.array[a + 0] = b
      this.data.array[a + 1] = c
      this.data.array[a + 2] = d
      return this
    },
    setXYZW: function (a, b, c, d, f) {
      a = a * this.data.stride + this.offset
      this.data.array[a + 0] = b
      this.data.array[a + 1] = c
      this.data.array[a + 2] = d
      this.data.array[a + 3] = f
      return this
    },
  })
  Nb.prototype = Object.create(R.prototype)
  Nb.prototype.constructor = Nb
  Nb.prototype.isSpriteMaterial = !0
  Nb.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.color.copy(a.color)
    this.map = a.map
    this.alphaMap = a.alphaMap
    this.rotation = a.rotation
    this.sizeAttenuation = a.sizeAttenuation
    return this
  }
  var Wc,
    Qe = new q(),
    Id = new q(),
    Jd = new q(),
    Xc = new z(),
    ae = new z(),
    Ci = new I(),
    Zf = new q(),
    Re = new q(),
    $f = new q(),
    qj = new z(),
    Fh = new z(),
    rj = new z()
  $d.prototype = Object.assign(Object.create(E.prototype), {
    constructor: $d,
    isSprite: !0,
    raycast: function (a, b) {
      null === a.camera &&
        console.error(
          'THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.',
        )
      Id.setFromMatrixScale(this.matrixWorld)
      Ci.copy(a.camera.matrixWorld)
      this.modelViewMatrix.multiplyMatrices(
        a.camera.matrixWorldInverse,
        this.matrixWorld,
      )
      Jd.setFromMatrixPosition(this.modelViewMatrix)
      a.camera.isPerspectiveCamera &&
        !1 === this.material.sizeAttenuation &&
        Id.multiplyScalar(-Jd.z)
      var c = this.material.rotation
      if (0 !== c) {
        var d = Math.cos(c)
        var f = Math.sin(c)
      }
      c = this.center
      ef(Zf.set(-0.5, -0.5, 0), Jd, c, Id, f, d)
      ef(Re.set(0.5, -0.5, 0), Jd, c, Id, f, d)
      ef($f.set(0.5, 0.5, 0), Jd, c, Id, f, d)
      qj.set(0, 0)
      Fh.set(1, 0)
      rj.set(1, 1)
      var g = a.ray.intersectTriangle(Zf, Re, $f, !1, Qe)
      if (
        null === g &&
        (ef(Re.set(-0.5, 0.5, 0), Jd, c, Id, f, d),
        Fh.set(0, 1),
        (g = a.ray.intersectTriangle(Zf, $f, Re, !1, Qe)),
        null === g)
      )
        return
      f = a.ray.origin.distanceTo(Qe)
      f < a.near ||
        f > a.far ||
        b.push({
          distance: f,
          point: Qe.clone(),
          uv: va.getUV(Qe, Zf, Re, $f, qj, Fh, rj, new z()),
          face: null,
          object: this,
        })
    },
    clone: function () {
      return new this.constructor(this.material).copy(this)
    },
    copy: function (a) {
      E.prototype.copy.call(this, a)
      void 0 !== a.center && this.center.copy(a.center)
      return this
    },
  })
  var ag = new q(),
    sj = new q()
  be.prototype = Object.assign(Object.create(E.prototype), {
    constructor: be,
    isLOD: !0,
    copy: function (a) {
      E.prototype.copy.call(this, a, !1)
      a = a.levels
      for (var b = 0, c = a.length; b < c; b++) {
        var d = a[b]
        this.addLevel(d.object.clone(), d.distance)
      }
      return this
    },
    addLevel: function (a, b) {
      void 0 === b && (b = 0)
      b = Math.abs(b)
      for (
        var c = this.levels, d = 0;
        d < c.length && !(b < c[d].distance);
        d++
      );
      c.splice(d, 0, { distance: b, object: a })
      this.add(a)
      return this
    },
    getObjectForDistance: function (a) {
      for (
        var b = this.levels, c = 1, d = b.length;
        c < d && !(a < b[c].distance);
        c++
      );
      return b[c - 1].object
    },
    raycast: function (a, b) {
      ag.setFromMatrixPosition(this.matrixWorld)
      var c = a.ray.origin.distanceTo(ag)
      this.getObjectForDistance(c).raycast(a, b)
    },
    update: function (a) {
      var b = this.levels
      if (1 < b.length) {
        ag.setFromMatrixPosition(a.matrixWorld)
        sj.setFromMatrixPosition(this.matrixWorld)
        a = ag.distanceTo(sj)
        b[0].object.visible = !0
        for (var c = 1, d = b.length; c < d; c++)
          if (a >= b[c].distance)
            (b[c - 1].object.visible = !1), (b[c].object.visible = !0)
          else break
        for (; c < d; c++) b[c].object.visible = !1
      }
    },
    toJSON: function (a) {
      a = E.prototype.toJSON.call(this, a)
      a.object.levels = []
      for (var b = this.levels, c = 0, d = b.length; c < d; c++) {
        var f = b[c]
        a.object.levels.push({ object: f.object.uuid, distance: f.distance })
      }
      return a
    },
  })
  ce.prototype = Object.assign(Object.create(ia.prototype), {
    constructor: ce,
    isSkinnedMesh: !0,
    bind: function (a, b) {
      this.skeleton = a
      void 0 === b &&
        (this.updateMatrixWorld(!0),
        this.skeleton.calculateInverses(),
        (b = this.matrixWorld))
      this.bindMatrix.copy(b)
      this.bindMatrixInverse.getInverse(b)
    },
    pose: function () {
      this.skeleton.pose()
    },
    normalizeSkinWeights: function () {
      for (
        var a = new ca(),
          b = this.geometry.attributes.skinWeight,
          c = 0,
          d = b.count;
        c < d;
        c++
      ) {
        a.x = b.getX(c)
        a.y = b.getY(c)
        a.z = b.getZ(c)
        a.w = b.getW(c)
        var f = 1 / a.manhattanLength()
        Infinity !== f ? a.multiplyScalar(f) : a.set(1, 0, 0, 0)
        b.setXYZW(c, a.x, a.y, a.z, a.w)
      }
    },
    updateMatrixWorld: function (a) {
      ia.prototype.updateMatrixWorld.call(this, a)
      'attached' === this.bindMode
        ? this.bindMatrixInverse.getInverse(this.matrixWorld)
        : 'detached' === this.bindMode
        ? this.bindMatrixInverse.getInverse(this.bindMatrix)
        : console.warn(
            'THREE.SkinnedMesh: Unrecognized bindMode: ' + this.bindMode,
          )
    },
    clone: function () {
      return new this.constructor(this.geometry, this.material).copy(this)
    },
  })
  var tj = new I(),
    Ll = new I()
  Object.assign(ff.prototype, {
    calculateInverses: function () {
      this.boneInverses = []
      for (var a = 0, b = this.bones.length; a < b; a++) {
        var c = new I()
        this.bones[a] && c.getInverse(this.bones[a].matrixWorld)
        this.boneInverses.push(c)
      }
    },
    pose: function () {
      var a, b
      var c = 0
      for (b = this.bones.length; c < b; c++)
        (a = this.bones[c]) && a.matrixWorld.getInverse(this.boneInverses[c])
      c = 0
      for (b = this.bones.length; c < b; c++)
        if ((a = this.bones[c]))
          a.parent && a.parent.isBone
            ? (a.matrix.getInverse(a.parent.matrixWorld),
              a.matrix.multiply(a.matrixWorld))
            : a.matrix.copy(a.matrixWorld),
            a.matrix.decompose(a.position, a.quaternion, a.scale)
    },
    update: function () {
      for (
        var a = this.bones,
          b = this.boneInverses,
          c = this.boneMatrices,
          d = this.boneTexture,
          f = 0,
          g = a.length;
        f < g;
        f++
      )
        tj.multiplyMatrices(a[f] ? a[f].matrixWorld : Ll, b[f]),
          tj.toArray(c, 16 * f)
      void 0 !== d && (d.needsUpdate = !0)
    },
    clone: function () {
      return new ff(this.bones, this.boneInverses)
    },
    getBoneByName: function (a) {
      for (var b = 0, c = this.bones.length; b < c; b++) {
        var d = this.bones[b]
        if (d.name === a) return d
      }
    },
  })
  Ig.prototype = Object.assign(Object.create(E.prototype), {
    constructor: Ig,
    isBone: !0,
  })
  gf.prototype = Object.assign(Object.create(ia.prototype), {
    constructor: gf,
    isInstancedMesh: !0,
    raycast: function () {},
    setMatrixAt: function (a, b) {
      b.toArray(this.instanceMatrix.array, 16 * a)
    },
    updateMorphTargets: function () {},
  })
  T.prototype = Object.create(R.prototype)
  T.prototype.constructor = T
  T.prototype.isLineBasicMaterial = !0
  T.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.color.copy(a.color)
    this.linewidth = a.linewidth
    this.linecap = a.linecap
    this.linejoin = a.linejoin
    return this
  }
  var uj = new q(),
    vj = new q(),
    wj = new I(),
    bg = new ac(),
    Se = new ub()
  pa.prototype = Object.assign(Object.create(E.prototype), {
    constructor: pa,
    isLine: !0,
    computeLineDistances: function () {
      var a = this.geometry
      if (a.isBufferGeometry)
        if (null === a.index) {
          for (
            var b = a.attributes.position, c = [0], d = 1, f = b.count;
            d < f;
            d++
          )
            uj.fromBufferAttribute(b, d - 1),
              vj.fromBufferAttribute(b, d),
              (c[d] = c[d - 1]),
              (c[d] += uj.distanceTo(vj))
          a.setAttribute('lineDistance', new F(c, 1))
        } else
          console.warn(
            'THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.',
          )
      else if (a.isGeometry)
        for (
          b = a.vertices, c = a.lineDistances, c[0] = 0, d = 1, f = b.length;
          d < f;
          d++
        )
          (c[d] = c[d - 1]), (c[d] += b[d - 1].distanceTo(b[d]))
      return this
    },
    raycast: function (a, b) {
      var c = a.linePrecision,
        d = this.geometry,
        f = this.matrixWorld
      null === d.boundingSphere && d.computeBoundingSphere()
      Se.copy(d.boundingSphere)
      Se.applyMatrix4(f)
      Se.radius += c
      if (!1 !== a.ray.intersectsSphere(Se)) {
        wj.getInverse(f)
        bg.copy(a.ray).applyMatrix4(wj)
        c /= (this.scale.x + this.scale.y + this.scale.z) / 3
        c *= c
        var g = new q(),
          k = new q()
        f = new q()
        var m = new q(),
          l = this && this.isLineSegments ? 2 : 1
        if (d.isBufferGeometry) {
          var p = d.index,
            y = d.attributes.position.array
          if (null !== p) {
            p = p.array
            d = 0
            for (var t = p.length - 1; d < t; d += l) {
              var r = p[d + 1]
              g.fromArray(y, 3 * p[d])
              k.fromArray(y, 3 * r)
              r = bg.distanceSqToSegment(g, k, m, f)
              r > c ||
                (m.applyMatrix4(this.matrixWorld),
                (r = a.ray.origin.distanceTo(m)),
                r < a.near ||
                  r > a.far ||
                  b.push({
                    distance: r,
                    point: f.clone().applyMatrix4(this.matrixWorld),
                    index: d,
                    face: null,
                    faceIndex: null,
                    object: this,
                  }))
            }
          } else
            for (d = 0, t = y.length / 3 - 1; d < t; d += l)
              g.fromArray(y, 3 * d),
                k.fromArray(y, 3 * d + 3),
                (r = bg.distanceSqToSegment(g, k, m, f)),
                r > c ||
                  (m.applyMatrix4(this.matrixWorld),
                  (r = a.ray.origin.distanceTo(m)),
                  r < a.near ||
                    r > a.far ||
                    b.push({
                      distance: r,
                      point: f.clone().applyMatrix4(this.matrixWorld),
                      index: d,
                      face: null,
                      faceIndex: null,
                      object: this,
                    }))
        } else if (d.isGeometry)
          for (g = d.vertices, k = g.length, d = 0; d < k - 1; d += l)
            (r = bg.distanceSqToSegment(g[d], g[d + 1], m, f)),
              r > c ||
                (m.applyMatrix4(this.matrixWorld),
                (r = a.ray.origin.distanceTo(m)),
                r < a.near ||
                  r > a.far ||
                  b.push({
                    distance: r,
                    point: f.clone().applyMatrix4(this.matrixWorld),
                    index: d,
                    face: null,
                    faceIndex: null,
                    object: this,
                  }))
      }
    },
    clone: function () {
      return new this.constructor(this.geometry, this.material).copy(this)
    },
  })
  var cg = new q(),
    dg = new q()
  Z.prototype = Object.assign(Object.create(pa.prototype), {
    constructor: Z,
    isLineSegments: !0,
    computeLineDistances: function () {
      var a = this.geometry
      if (a.isBufferGeometry)
        if (null === a.index) {
          for (
            var b = a.attributes.position, c = [], d = 0, f = b.count;
            d < f;
            d += 2
          )
            cg.fromBufferAttribute(b, d),
              dg.fromBufferAttribute(b, d + 1),
              (c[d] = 0 === d ? 0 : c[d - 1]),
              (c[d + 1] = c[d] + cg.distanceTo(dg))
          a.setAttribute('lineDistance', new F(c, 1))
        } else
          console.warn(
            'THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.',
          )
      else if (a.isGeometry)
        for (
          b = a.vertices, c = a.lineDistances, d = 0, f = b.length;
          d < f;
          d += 2
        )
          cg.copy(b[d]),
            dg.copy(b[d + 1]),
            (c[d] = 0 === d ? 0 : c[d - 1]),
            (c[d + 1] = c[d] + cg.distanceTo(dg))
      return this
    },
  })
  hf.prototype = Object.assign(Object.create(pa.prototype), {
    constructor: hf,
    isLineLoop: !0,
  })
  Va.prototype = Object.create(R.prototype)
  Va.prototype.constructor = Va
  Va.prototype.isPointsMaterial = !0
  Va.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.color.copy(a.color)
    this.map = a.map
    this.alphaMap = a.alphaMap
    this.size = a.size
    this.sizeAttenuation = a.sizeAttenuation
    this.morphTargets = a.morphTargets
    return this
  }
  var xj = new I(),
    Kg = new ac(),
    Te = new ub(),
    eg = new q()
  Yc.prototype = Object.assign(Object.create(E.prototype), {
    constructor: Yc,
    isPoints: !0,
    raycast: function (a, b) {
      var c = this.geometry,
        d = this.matrixWorld,
        f = a.params.Points.threshold
      null === c.boundingSphere && c.computeBoundingSphere()
      Te.copy(c.boundingSphere)
      Te.applyMatrix4(d)
      Te.radius += f
      if (!1 !== a.ray.intersectsSphere(Te))
        if (
          (xj.getInverse(d),
          Kg.copy(a.ray).applyMatrix4(xj),
          (f /= (this.scale.x + this.scale.y + this.scale.z) / 3),
          (f *= f),
          c.isBufferGeometry)
        ) {
          var g = c.index
          c = c.attributes.position.array
          if (null !== g) {
            var k = g.array
            g = 0
            for (var m = k.length; g < m; g++) {
              var l = k[g]
              eg.fromArray(c, 3 * l)
              Jg(eg, l, f, d, a, b, this)
            }
          } else
            for (g = 0, k = c.length / 3; g < k; g++)
              eg.fromArray(c, 3 * g), Jg(eg, g, f, d, a, b, this)
        } else
          for (c = c.vertices, g = 0, k = c.length; g < k; g++)
            Jg(c[g], g, f, d, a, b, this)
    },
    updateMorphTargets: function () {
      var a = this.geometry
      if (a.isBufferGeometry) {
        a = a.morphAttributes
        var b = Object.keys(a)
        if (0 < b.length) {
          var c = a[b[0]]
          if (void 0 !== c)
            for (
              this.morphTargetInfluences = [],
                this.morphTargetDictionary = {},
                a = 0,
                b = c.length;
              a < b;
              a++
            ) {
              var d = c[a].name || String(a)
              this.morphTargetInfluences.push(0)
              this.morphTargetDictionary[d] = a
            }
        }
      } else
        (a = a.morphTargets),
          void 0 !== a &&
            0 < a.length &&
            console.error(
              'THREE.Points.updateMorphTargets() does not support THREE.Geometry. Use THREE.BufferGeometry instead.',
            )
    },
    clone: function () {
      return new this.constructor(this.geometry, this.material).copy(this)
    },
  })
  Lg.prototype = Object.assign(Object.create(S.prototype), {
    constructor: Lg,
    isVideoTexture: !0,
    update: function () {
      var a = this.image
      a.readyState >= a.HAVE_CURRENT_DATA && (this.needsUpdate = !0)
    },
  })
  Zc.prototype = Object.create(S.prototype)
  Zc.prototype.constructor = Zc
  Zc.prototype.isCompressedTexture = !0
  de.prototype = Object.create(S.prototype)
  de.prototype.constructor = de
  de.prototype.isCanvasTexture = !0
  ee.prototype = Object.create(S.prototype)
  ee.prototype.constructor = ee
  ee.prototype.isDepthTexture = !0
  $c.prototype = Object.create(G.prototype)
  $c.prototype.constructor = $c
  fe.prototype = Object.create(P.prototype)
  fe.prototype.constructor = fe
  ad.prototype = Object.create(G.prototype)
  ad.prototype.constructor = ad
  ge.prototype = Object.create(P.prototype)
  ge.prototype.constructor = ge
  Fa.prototype = Object.create(G.prototype)
  Fa.prototype.constructor = Fa
  he.prototype = Object.create(P.prototype)
  he.prototype.constructor = he
  bd.prototype = Object.create(Fa.prototype)
  bd.prototype.constructor = bd
  ie.prototype = Object.create(P.prototype)
  ie.prototype.constructor = ie
  lc.prototype = Object.create(Fa.prototype)
  lc.prototype.constructor = lc
  je.prototype = Object.create(P.prototype)
  je.prototype.constructor = je
  cd.prototype = Object.create(Fa.prototype)
  cd.prototype.constructor = cd
  ke.prototype = Object.create(P.prototype)
  ke.prototype.constructor = ke
  dd.prototype = Object.create(Fa.prototype)
  dd.prototype.constructor = dd
  le.prototype = Object.create(P.prototype)
  le.prototype.constructor = le
  mc.prototype = Object.create(G.prototype)
  mc.prototype.constructor = mc
  mc.prototype.toJSON = function () {
    var a = G.prototype.toJSON.call(this)
    a.path = this.parameters.path.toJSON()
    return a
  }
  me.prototype = Object.create(P.prototype)
  me.prototype.constructor = me
  ed.prototype = Object.create(G.prototype)
  ed.prototype.constructor = ed
  ne.prototype = Object.create(P.prototype)
  ne.prototype.constructor = ne
  fd.prototype = Object.create(G.prototype)
  fd.prototype.constructor = fd
  var Ml = {
      triangulate: function (a, b, c) {
        c = c || 2
        var d = b && b.length,
          f = d ? b[0] * c : a.length,
          g = Di(a, 0, f, c, !0),
          k = []
        if (!g || g.next === g.prev) return k
        var m
        if (d) {
          var l = c
          d = []
          var p
          var q = 0
          for (p = b.length; q < p; q++) {
            var t = b[q] * l
            var r = q < p - 1 ? b[q + 1] * l : a.length
            t = Di(a, t, r, l, !1)
            t === t.next && (t.steiner = !0)
            d.push(ll(t))
          }
          d.sort(jl)
          for (q = 0; q < d.length; q++) {
            b = d[q]
            l = g
            if ((l = kl(b, l))) (b = Gi(l, b)), pe(b, b.next)
            g = pe(g, g.next)
          }
        }
        if (a.length > 80 * c) {
          var u = (m = a[0])
          var v = (d = a[1])
          for (l = c; l < f; l += c)
            (q = a[l]),
              (b = a[l + 1]),
              q < u && (u = q),
              b < v && (v = b),
              q > m && (m = q),
              b > d && (d = b)
          m = Math.max(m - u, d - v)
          m = 0 !== m ? 1 / m : 0
        }
        qe(g, k, c, u, v, m)
        return k
      },
    },
    xb = {
      area: function (a) {
        for (var b = a.length, c = 0, d = b - 1, f = 0; f < b; d = f++)
          c += a[d].x * a[f].y - a[f].x * a[d].y
        return 0.5 * c
      },
      isClockWise: function (a) {
        return 0 > xb.area(a)
      },
      triangulateShape: function (a, b) {
        var c = [],
          d = [],
          f = []
        Hi(a)
        Ii(c, a)
        var g = a.length
        b.forEach(Hi)
        for (a = 0; a < b.length; a++)
          d.push(g), (g += b[a].length), Ii(c, b[a])
        b = Ml.triangulate(c, d)
        for (a = 0; a < b.length; a += 3) f.push(b.slice(a, a + 3))
        return f
      },
    }
  oc.prototype = Object.create(P.prototype)
  oc.prototype.constructor = oc
  oc.prototype.toJSON = function () {
    var a = P.prototype.toJSON.call(this)
    return Ji(this.parameters.shapes, this.parameters.options, a)
  }
  jb.prototype = Object.create(G.prototype)
  jb.prototype.constructor = jb
  jb.prototype.toJSON = function () {
    var a = G.prototype.toJSON.call(this)
    return Ji(this.parameters.shapes, this.parameters.options, a)
  }
  var ml = {
    generateTopUV: function (a, b, c, d, f) {
      a = b[3 * d]
      d = b[3 * d + 1]
      var g = b[3 * f]
      f = b[3 * f + 1]
      return [new z(b[3 * c], b[3 * c + 1]), new z(a, d), new z(g, f)]
    },
    generateSideWallUV: function (a, b, c, d, f, g) {
      a = b[3 * c]
      var k = b[3 * c + 1]
      c = b[3 * c + 2]
      var m = b[3 * d],
        l = b[3 * d + 1]
      d = b[3 * d + 2]
      var p = b[3 * f],
        q = b[3 * f + 1]
      f = b[3 * f + 2]
      var t = b[3 * g],
        r = b[3 * g + 1]
      b = b[3 * g + 2]
      return 0.01 > Math.abs(k - l)
        ? [new z(a, 1 - c), new z(m, 1 - d), new z(p, 1 - f), new z(t, 1 - b)]
        : [new z(k, 1 - c), new z(l, 1 - d), new z(q, 1 - f), new z(r, 1 - b)]
    },
  }
  se.prototype = Object.create(P.prototype)
  se.prototype.constructor = se
  hd.prototype = Object.create(jb.prototype)
  hd.prototype.constructor = hd
  te.prototype = Object.create(P.prototype)
  te.prototype.constructor = te
  Ob.prototype = Object.create(G.prototype)
  Ob.prototype.constructor = Ob
  ue.prototype = Object.create(P.prototype)
  ue.prototype.constructor = ue
  id.prototype = Object.create(G.prototype)
  id.prototype.constructor = id
  ve.prototype = Object.create(P.prototype)
  ve.prototype.constructor = ve
  jd.prototype = Object.create(G.prototype)
  jd.prototype.constructor = jd
  pc.prototype = Object.create(P.prototype)
  pc.prototype.constructor = pc
  pc.prototype.toJSON = function () {
    var a = P.prototype.toJSON.call(this)
    return Ki(this.parameters.shapes, a)
  }
  qc.prototype = Object.create(G.prototype)
  qc.prototype.constructor = qc
  qc.prototype.toJSON = function () {
    var a = G.prototype.toJSON.call(this)
    return Ki(this.parameters.shapes, a)
  }
  kd.prototype = Object.create(G.prototype)
  kd.prototype.constructor = kd
  rc.prototype = Object.create(P.prototype)
  rc.prototype.constructor = rc
  yb.prototype = Object.create(G.prototype)
  yb.prototype.constructor = yb
  we.prototype = Object.create(rc.prototype)
  we.prototype.constructor = we
  xe.prototype = Object.create(yb.prototype)
  xe.prototype.constructor = xe
  ye.prototype = Object.create(P.prototype)
  ye.prototype.constructor = ye
  ld.prototype = Object.create(G.prototype)
  ld.prototype.constructor = ld
  var Ba = Object.freeze({
    __proto__: null,
    WireframeGeometry: $c,
    ParametricGeometry: fe,
    ParametricBufferGeometry: ad,
    TetrahedronGeometry: he,
    TetrahedronBufferGeometry: bd,
    OctahedronGeometry: ie,
    OctahedronBufferGeometry: lc,
    IcosahedronGeometry: je,
    IcosahedronBufferGeometry: cd,
    DodecahedronGeometry: ke,
    DodecahedronBufferGeometry: dd,
    PolyhedronGeometry: ge,
    PolyhedronBufferGeometry: Fa,
    TubeGeometry: le,
    TubeBufferGeometry: mc,
    TorusKnotGeometry: me,
    TorusKnotBufferGeometry: ed,
    TorusGeometry: ne,
    TorusBufferGeometry: fd,
    TextGeometry: se,
    TextBufferGeometry: hd,
    SphereGeometry: te,
    SphereBufferGeometry: Ob,
    RingGeometry: ue,
    RingBufferGeometry: id,
    PlaneGeometry: Td,
    PlaneBufferGeometry: ic,
    LatheGeometry: ve,
    LatheBufferGeometry: jd,
    ShapeGeometry: pc,
    ShapeBufferGeometry: qc,
    ExtrudeGeometry: oc,
    ExtrudeBufferGeometry: jb,
    EdgesGeometry: kd,
    ConeGeometry: we,
    ConeBufferGeometry: xe,
    CylinderGeometry: rc,
    CylinderBufferGeometry: yb,
    CircleGeometry: ye,
    CircleBufferGeometry: ld,
    BoxGeometry: Eh,
    BoxBufferGeometry: Ud,
  })
  sc.prototype = Object.create(R.prototype)
  sc.prototype.constructor = sc
  sc.prototype.isShadowMaterial = !0
  sc.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.color.copy(a.color)
    return this
  }
  md.prototype = Object.create(Aa.prototype)
  md.prototype.constructor = md
  md.prototype.isRawShaderMaterial = !0
  kb.prototype = Object.create(R.prototype)
  kb.prototype.constructor = kb
  kb.prototype.isMeshStandardMaterial = !0
  kb.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.defines = { STANDARD: '' }
    this.color.copy(a.color)
    this.roughness = a.roughness
    this.metalness = a.metalness
    this.map = a.map
    this.lightMap = a.lightMap
    this.lightMapIntensity = a.lightMapIntensity
    this.aoMap = a.aoMap
    this.aoMapIntensity = a.aoMapIntensity
    this.emissive.copy(a.emissive)
    this.emissiveMap = a.emissiveMap
    this.emissiveIntensity = a.emissiveIntensity
    this.bumpMap = a.bumpMap
    this.bumpScale = a.bumpScale
    this.normalMap = a.normalMap
    this.normalMapType = a.normalMapType
    this.normalScale.copy(a.normalScale)
    this.displacementMap = a.displacementMap
    this.displacementScale = a.displacementScale
    this.displacementBias = a.displacementBias
    this.roughnessMap = a.roughnessMap
    this.metalnessMap = a.metalnessMap
    this.alphaMap = a.alphaMap
    this.envMap = a.envMap
    this.envMapIntensity = a.envMapIntensity
    this.refractionRatio = a.refractionRatio
    this.wireframe = a.wireframe
    this.wireframeLinewidth = a.wireframeLinewidth
    this.wireframeLinecap = a.wireframeLinecap
    this.wireframeLinejoin = a.wireframeLinejoin
    this.skinning = a.skinning
    this.morphTargets = a.morphTargets
    this.morphNormals = a.morphNormals
    return this
  }
  tc.prototype = Object.create(kb.prototype)
  tc.prototype.constructor = tc
  tc.prototype.isMeshPhysicalMaterial = !0
  tc.prototype.copy = function (a) {
    kb.prototype.copy.call(this, a)
    this.defines = { STANDARD: '', PHYSICAL: '' }
    this.reflectivity = a.reflectivity
    this.clearcoat = a.clearcoat
    this.clearcoatRoughness = a.clearcoatRoughness
    this.sheen = a.sheen ? (this.sheen || new D()).copy(a.sheen) : null
    this.clearcoatNormalMap = a.clearcoatNormalMap
    this.clearcoatNormalScale.copy(a.clearcoatNormalScale)
    this.transparency = a.transparency
    return this
  }
  Wa.prototype = Object.create(R.prototype)
  Wa.prototype.constructor = Wa
  Wa.prototype.isMeshPhongMaterial = !0
  Wa.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.color.copy(a.color)
    this.specular.copy(a.specular)
    this.shininess = a.shininess
    this.map = a.map
    this.lightMap = a.lightMap
    this.lightMapIntensity = a.lightMapIntensity
    this.aoMap = a.aoMap
    this.aoMapIntensity = a.aoMapIntensity
    this.emissive.copy(a.emissive)
    this.emissiveMap = a.emissiveMap
    this.emissiveIntensity = a.emissiveIntensity
    this.bumpMap = a.bumpMap
    this.bumpScale = a.bumpScale
    this.normalMap = a.normalMap
    this.normalMapType = a.normalMapType
    this.normalScale.copy(a.normalScale)
    this.displacementMap = a.displacementMap
    this.displacementScale = a.displacementScale
    this.displacementBias = a.displacementBias
    this.specularMap = a.specularMap
    this.alphaMap = a.alphaMap
    this.envMap = a.envMap
    this.combine = a.combine
    this.reflectivity = a.reflectivity
    this.refractionRatio = a.refractionRatio
    this.wireframe = a.wireframe
    this.wireframeLinewidth = a.wireframeLinewidth
    this.wireframeLinecap = a.wireframeLinecap
    this.wireframeLinejoin = a.wireframeLinejoin
    this.skinning = a.skinning
    this.morphTargets = a.morphTargets
    this.morphNormals = a.morphNormals
    return this
  }
  uc.prototype = Object.create(Wa.prototype)
  uc.prototype.constructor = uc
  uc.prototype.isMeshToonMaterial = !0
  uc.prototype.copy = function (a) {
    Wa.prototype.copy.call(this, a)
    this.gradientMap = a.gradientMap
    return this
  }
  vc.prototype = Object.create(R.prototype)
  vc.prototype.constructor = vc
  vc.prototype.isMeshNormalMaterial = !0
  vc.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.bumpMap = a.bumpMap
    this.bumpScale = a.bumpScale
    this.normalMap = a.normalMap
    this.normalMapType = a.normalMapType
    this.normalScale.copy(a.normalScale)
    this.displacementMap = a.displacementMap
    this.displacementScale = a.displacementScale
    this.displacementBias = a.displacementBias
    this.wireframe = a.wireframe
    this.wireframeLinewidth = a.wireframeLinewidth
    this.skinning = a.skinning
    this.morphTargets = a.morphTargets
    this.morphNormals = a.morphNormals
    return this
  }
  wc.prototype = Object.create(R.prototype)
  wc.prototype.constructor = wc
  wc.prototype.isMeshLambertMaterial = !0
  wc.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.color.copy(a.color)
    this.map = a.map
    this.lightMap = a.lightMap
    this.lightMapIntensity = a.lightMapIntensity
    this.aoMap = a.aoMap
    this.aoMapIntensity = a.aoMapIntensity
    this.emissive.copy(a.emissive)
    this.emissiveMap = a.emissiveMap
    this.emissiveIntensity = a.emissiveIntensity
    this.specularMap = a.specularMap
    this.alphaMap = a.alphaMap
    this.envMap = a.envMap
    this.combine = a.combine
    this.reflectivity = a.reflectivity
    this.refractionRatio = a.refractionRatio
    this.wireframe = a.wireframe
    this.wireframeLinewidth = a.wireframeLinewidth
    this.wireframeLinecap = a.wireframeLinecap
    this.wireframeLinejoin = a.wireframeLinejoin
    this.skinning = a.skinning
    this.morphTargets = a.morphTargets
    this.morphNormals = a.morphNormals
    return this
  }
  xc.prototype = Object.create(R.prototype)
  xc.prototype.constructor = xc
  xc.prototype.isMeshMatcapMaterial = !0
  xc.prototype.copy = function (a) {
    R.prototype.copy.call(this, a)
    this.defines = { MATCAP: '' }
    this.color.copy(a.color)
    this.matcap = a.matcap
    this.map = a.map
    this.bumpMap = a.bumpMap
    this.bumpScale = a.bumpScale
    this.normalMap = a.normalMap
    this.normalMapType = a.normalMapType
    this.normalScale.copy(a.normalScale)
    this.displacementMap = a.displacementMap
    this.displacementScale = a.displacementScale
    this.displacementBias = a.displacementBias
    this.alphaMap = a.alphaMap
    this.skinning = a.skinning
    this.morphTargets = a.morphTargets
    this.morphNormals = a.morphNormals
    return this
  }
  yc.prototype = Object.create(T.prototype)
  yc.prototype.constructor = yc
  yc.prototype.isLineDashedMaterial = !0
  yc.prototype.copy = function (a) {
    T.prototype.copy.call(this, a)
    this.scale = a.scale
    this.dashSize = a.dashSize
    this.gapSize = a.gapSize
    return this
  }
  var Nl = Object.freeze({
      __proto__: null,
      ShadowMaterial: sc,
      SpriteMaterial: Nb,
      RawShaderMaterial: md,
      ShaderMaterial: Aa,
      PointsMaterial: Va,
      MeshPhysicalMaterial: tc,
      MeshStandardMaterial: kb,
      MeshPhongMaterial: Wa,
      MeshToonMaterial: uc,
      MeshNormalMaterial: vc,
      MeshLambertMaterial: wc,
      MeshDepthMaterial: Kb,
      MeshDistanceMaterial: Lb,
      MeshBasicMaterial: Ia,
      MeshMatcapMaterial: xc,
      LineDashedMaterial: yc,
      LineBasicMaterial: T,
      Material: R,
    }),
    aa = {
      arraySlice: function (a, b, c) {
        return aa.isTypedArray(a)
          ? new a.constructor(a.subarray(b, void 0 !== c ? c : a.length))
          : a.slice(b, c)
      },
      convertArray: function (a, b, c) {
        return !a || (!c && a.constructor === b)
          ? a
          : 'number' === typeof b.BYTES_PER_ELEMENT
          ? new b(a)
          : Array.prototype.slice.call(a)
      },
      isTypedArray: function (a) {
        return ArrayBuffer.isView(a) && !(a instanceof DataView)
      },
      getKeyframeOrder: function (a) {
        for (var b = a.length, c = Array(b), d = 0; d !== b; ++d) c[d] = d
        c.sort(function (b, c) {
          return a[b] - a[c]
        })
        return c
      },
      sortedArray: function (a, b, c) {
        for (
          var d = a.length, f = new a.constructor(d), g = 0, k = 0;
          k !== d;
          ++g
        )
          for (var m = c[g] * b, l = 0; l !== b; ++l) f[k++] = a[m + l]
        return f
      },
      flattenJSON: function (a, b, c, d) {
        for (var f = 1, g = a[0]; void 0 !== g && void 0 === g[d]; ) g = a[f++]
        if (void 0 !== g) {
          var k = g[d]
          if (void 0 !== k)
            if (Array.isArray(k)) {
              do
                (k = g[d]),
                  void 0 !== k && (b.push(g.time), c.push.apply(c, k)),
                  (g = a[f++])
              while (void 0 !== g)
            } else if (void 0 !== k.toArray) {
              do
                (k = g[d]),
                  void 0 !== k && (b.push(g.time), k.toArray(c, c.length)),
                  (g = a[f++])
              while (void 0 !== g)
            } else {
              do
                (k = g[d]),
                  void 0 !== k && (b.push(g.time), c.push(k)),
                  (g = a[f++])
              while (void 0 !== g)
            }
        }
      },
      subclip: function (a, b, c, d, f) {
        f = f || 30
        a = a.clone()
        a.name = b
        var g = []
        for (b = 0; b < a.tracks.length; ++b) {
          for (
            var k = a.tracks[b], m = k.getValueSize(), l = [], p = [], q = 0;
            q < k.times.length;
            ++q
          ) {
            var t = k.times[q] * f
            if (!(t < c || t >= d))
              for (l.push(k.times[q]), t = 0; t < m; ++t)
                p.push(k.values[q * m + t])
          }
          0 !== l.length &&
            ((k.times = aa.convertArray(l, k.times.constructor)),
            (k.values = aa.convertArray(p, k.values.constructor)),
            g.push(k))
        }
        a.tracks = g
        c = Infinity
        for (b = 0; b < a.tracks.length; ++b)
          c > a.tracks[b].times[0] && (c = a.tracks[b].times[0])
        for (b = 0; b < a.tracks.length; ++b) a.tracks[b].shift(-1 * c)
        a.resetDuration()
        return a
      },
    }
  Object.assign(La.prototype, {
    evaluate: function (a) {
      var b = this.parameterPositions,
        c = this._cachedIndex,
        d = b[c],
        f = b[c - 1]
      a: {
        b: {
          c: {
            d: if (!(a < d)) {
              for (var g = c + 2; ; ) {
                if (void 0 === d) {
                  if (a < f) break d
                  this._cachedIndex = c = b.length
                  return this.afterEnd_(c - 1, a, f)
                }
                if (c === g) break
                f = d
                d = b[++c]
                if (a < d) break b
              }
              d = b.length
              break c
            }
            if (a >= f) break a
            else {
              g = b[1]
              a < g && ((c = 2), (f = g))
              for (g = c - 2; ; ) {
                if (void 0 === f)
                  return (this._cachedIndex = 0), this.beforeStart_(0, a, d)
                if (c === g) break
                d = f
                f = b[--c - 1]
                if (a >= f) break b
              }
              d = c
              c = 0
            }
          }
          for (; c < d; ) (f = (c + d) >>> 1), a < b[f] ? (d = f) : (c = f + 1)
          d = b[c]
          f = b[c - 1]
          if (void 0 === f)
            return (this._cachedIndex = 0), this.beforeStart_(0, a, d)
          if (void 0 === d)
            return (
              (this._cachedIndex = c = b.length), this.afterEnd_(c - 1, f, a)
            )
        }
        this._cachedIndex = c
        this.intervalChanged_(c, f, d)
      }
      return this.interpolate_(c, f, a, d)
    },
    settings: null,
    DefaultSettings_: {},
    getSettings_: function () {
      return this.settings || this.DefaultSettings_
    },
    copySampleValue_: function (a) {
      var b = this.resultBuffer,
        c = this.sampleValues,
        d = this.valueSize
      a *= d
      for (var f = 0; f !== d; ++f) b[f] = c[a + f]
      return b
    },
    interpolate_: function () {
      throw Error('call to abstract method')
    },
    intervalChanged_: function () {},
  })
  Object.assign(La.prototype, {
    beforeStart_: La.prototype.copySampleValue_,
    afterEnd_: La.prototype.copySampleValue_,
  })
  jf.prototype = Object.assign(Object.create(La.prototype), {
    constructor: jf,
    DefaultSettings_: { endingStart: 2400, endingEnd: 2400 },
    intervalChanged_: function (a, b, c) {
      var d = this.parameterPositions,
        f = a - 2,
        g = a + 1,
        k = d[f],
        m = d[g]
      if (void 0 === k)
        switch (this.getSettings_().endingStart) {
          case 2401:
            f = a
            k = 2 * b - c
            break
          case 2402:
            f = d.length - 2
            k = b + d[f] - d[f + 1]
            break
          default:
            ;(f = a), (k = c)
        }
      if (void 0 === m)
        switch (this.getSettings_().endingEnd) {
          case 2401:
            g = a
            m = 2 * c - b
            break
          case 2402:
            g = 1
            m = c + d[1] - d[0]
            break
          default:
            ;(g = a - 1), (m = b)
        }
      a = 0.5 * (c - b)
      d = this.valueSize
      this._weightPrev = a / (b - k)
      this._weightNext = a / (m - c)
      this._offsetPrev = f * d
      this._offsetNext = g * d
    },
    interpolate_: function (a, b, c, d) {
      var f = this.resultBuffer,
        g = this.sampleValues,
        k = this.valueSize
      a *= k
      var m = a - k,
        l = this._offsetPrev,
        p = this._offsetNext,
        q = this._weightPrev,
        t = this._weightNext,
        r = (c - b) / (d - b)
      c = r * r
      d = c * r
      b = -q * d + 2 * q * c - q * r
      q = (1 + q) * d + (-1.5 - 2 * q) * c + (-0.5 + q) * r + 1
      r = (-1 - t) * d + (1.5 + t) * c + 0.5 * r
      t = t * d - t * c
      for (c = 0; c !== k; ++c)
        f[c] = b * g[l + c] + q * g[m + c] + r * g[a + c] + t * g[p + c]
      return f
    },
  })
  ze.prototype = Object.assign(Object.create(La.prototype), {
    constructor: ze,
    interpolate_: function (a, b, c, d) {
      var f = this.resultBuffer,
        g = this.sampleValues,
        k = this.valueSize
      a *= k
      var m = a - k
      b = (c - b) / (d - b)
      c = 1 - b
      for (d = 0; d !== k; ++d) f[d] = g[m + d] * c + g[a + d] * b
      return f
    },
  })
  kf.prototype = Object.assign(Object.create(La.prototype), {
    constructor: kf,
    interpolate_: function (a) {
      return this.copySampleValue_(a - 1)
    },
  })
  Object.assign(ua, {
    toJSON: function (a) {
      var b = a.constructor
      if (void 0 !== b.toJSON) b = b.toJSON(a)
      else {
        b = {
          name: a.name,
          times: aa.convertArray(a.times, Array),
          values: aa.convertArray(a.values, Array),
        }
        var c = a.getInterpolation()
        c !== a.DefaultInterpolation && (b.interpolation = c)
      }
      b.type = a.ValueTypeName
      return b
    },
  })
  Object.assign(ua.prototype, {
    constructor: ua,
    TimeBufferType: Float32Array,
    ValueBufferType: Float32Array,
    DefaultInterpolation: 2301,
    InterpolantFactoryMethodDiscrete: function (a) {
      return new kf(this.times, this.values, this.getValueSize(), a)
    },
    InterpolantFactoryMethodLinear: function (a) {
      return new ze(this.times, this.values, this.getValueSize(), a)
    },
    InterpolantFactoryMethodSmooth: function (a) {
      return new jf(this.times, this.values, this.getValueSize(), a)
    },
    setInterpolation: function (a) {
      switch (a) {
        case 2300:
          var b = this.InterpolantFactoryMethodDiscrete
          break
        case 2301:
          b = this.InterpolantFactoryMethodLinear
          break
        case 2302:
          b = this.InterpolantFactoryMethodSmooth
      }
      if (void 0 === b) {
        b =
          'unsupported interpolation for ' +
          this.ValueTypeName +
          ' keyframe track named ' +
          this.name
        if (void 0 === this.createInterpolant)
          if (a !== this.DefaultInterpolation)
            this.setInterpolation(this.DefaultInterpolation)
          else throw Error(b)
        console.warn('THREE.KeyframeTrack:', b)
        return this
      }
      this.createInterpolant = b
      return this
    },
    getInterpolation: function () {
      switch (this.createInterpolant) {
        case this.InterpolantFactoryMethodDiscrete:
          return 2300
        case this.InterpolantFactoryMethodLinear:
          return 2301
        case this.InterpolantFactoryMethodSmooth:
          return 2302
      }
    },
    getValueSize: function () {
      return this.values.length / this.times.length
    },
    shift: function (a) {
      if (0 !== a)
        for (var b = this.times, c = 0, d = b.length; c !== d; ++c) b[c] += a
      return this
    },
    scale: function (a) {
      if (1 !== a)
        for (var b = this.times, c = 0, d = b.length; c !== d; ++c) b[c] *= a
      return this
    },
    trim: function (a, b) {
      for (
        var c = this.times, d = c.length, f = 0, g = d - 1;
        f !== d && c[f] < a;

      )
        ++f
      for (; -1 !== g && c[g] > b; ) --g
      ++g
      if (0 !== f || g !== d)
        f >= g && ((g = Math.max(g, 1)), (f = g - 1)),
          (a = this.getValueSize()),
          (this.times = aa.arraySlice(c, f, g)),
          (this.values = aa.arraySlice(this.values, f * a, g * a))
      return this
    },
    validate: function () {
      var a = !0,
        b = this.getValueSize()
      0 !== b - Math.floor(b) &&
        (console.error(
          'THREE.KeyframeTrack: Invalid value size in track.',
          this,
        ),
        (a = !1))
      var c = this.times
      b = this.values
      var d = c.length
      0 === d &&
        (console.error('THREE.KeyframeTrack: Track is empty.', this), (a = !1))
      for (var f = null, g = 0; g !== d; g++) {
        var k = c[g]
        if ('number' === typeof k && isNaN(k)) {
          console.error(
            'THREE.KeyframeTrack: Time is not a valid number.',
            this,
            g,
            k,
          )
          a = !1
          break
        }
        if (null !== f && f > k) {
          console.error(
            'THREE.KeyframeTrack: Out of order keys.',
            this,
            g,
            k,
            f,
          )
          a = !1
          break
        }
        f = k
      }
      if (void 0 !== b && aa.isTypedArray(b))
        for (g = 0, c = b.length; g !== c; ++g)
          if (((d = b[g]), isNaN(d))) {
            console.error(
              'THREE.KeyframeTrack: Value is not a valid number.',
              this,
              g,
              d,
            )
            a = !1
            break
          }
      return a
    },
    optimize: function () {
      for (
        var a = this.times,
          b = this.values,
          c = this.getValueSize(),
          d = 2302 === this.getInterpolation(),
          f = 1,
          g = a.length - 1,
          k = 1;
        k < g;
        ++k
      ) {
        var m = !1,
          l = a[k]
        if (l !== a[k + 1] && (1 !== k || l !== l[0]))
          if (d) m = !0
          else {
            var p = k * c,
              q = p - c,
              t = p + c
            for (l = 0; l !== c; ++l) {
              var r = b[p + l]
              if (r !== b[q + l] || r !== b[t + l]) {
                m = !0
                break
              }
            }
          }
        if (m) {
          if (k !== f)
            for (a[f] = a[k], m = k * c, p = f * c, l = 0; l !== c; ++l)
              b[p + l] = b[m + l]
          ++f
        }
      }
      if (0 < g) {
        a[f] = a[g]
        m = g * c
        p = f * c
        for (l = 0; l !== c; ++l) b[p + l] = b[m + l]
        ++f
      }
      f !== a.length &&
        ((this.times = aa.arraySlice(a, 0, f)),
        (this.values = aa.arraySlice(b, 0, f * c)))
      return this
    },
    clone: function () {
      var a = aa.arraySlice(this.times, 0),
        b = aa.arraySlice(this.values, 0)
      a = new this.constructor(this.name, a, b)
      a.createInterpolant = this.createInterpolant
      return a
    },
  })
  lf.prototype = Object.assign(Object.create(ua.prototype), {
    constructor: lf,
    ValueTypeName: 'bool',
    ValueBufferType: Array,
    DefaultInterpolation: 2300,
    InterpolantFactoryMethodLinear: void 0,
    InterpolantFactoryMethodSmooth: void 0,
  })
  mf.prototype = Object.assign(Object.create(ua.prototype), {
    constructor: mf,
    ValueTypeName: 'color',
  })
  nd.prototype = Object.assign(Object.create(ua.prototype), {
    constructor: nd,
    ValueTypeName: 'number',
  })
  nf.prototype = Object.assign(Object.create(La.prototype), {
    constructor: nf,
    interpolate_: function (a, b, c, d) {
      var f = this.resultBuffer,
        g = this.sampleValues,
        k = this.valueSize
      a *= k
      b = (c - b) / (d - b)
      for (c = a + k; a !== c; a += 4) ya.slerpFlat(f, 0, g, a - k, g, a, b)
      return f
    },
  })
  Ae.prototype = Object.assign(Object.create(ua.prototype), {
    constructor: Ae,
    ValueTypeName: 'quaternion',
    DefaultInterpolation: 2301,
    InterpolantFactoryMethodLinear: function (a) {
      return new nf(this.times, this.values, this.getValueSize(), a)
    },
    InterpolantFactoryMethodSmooth: void 0,
  })
  of.prototype = Object.assign(Object.create(ua.prototype), {
    constructor: of,
    ValueTypeName: 'string',
    ValueBufferType: Array,
    DefaultInterpolation: 2300,
    InterpolantFactoryMethodLinear: void 0,
    InterpolantFactoryMethodSmooth: void 0,
  })
  od.prototype = Object.assign(Object.create(ua.prototype), {
    constructor: od,
    ValueTypeName: 'vector',
  })
  Object.assign(Pa, {
    parse: function (a) {
      for (
        var b = [], c = a.tracks, d = 1 / (a.fps || 1), f = 0, g = c.length;
        f !== g;
        ++f
      )
        b.push(ol(c[f]).scale(d))
      return new Pa(a.name, a.duration, b)
    },
    toJSON: function (a) {
      var b = [],
        c = a.tracks
      a = { name: a.name, duration: a.duration, tracks: b, uuid: a.uuid }
      for (var d = 0, f = c.length; d !== f; ++d) b.push(ua.toJSON(c[d]))
      return a
    },
    CreateFromMorphTargetSequence: function (a, b, c, d) {
      for (var f = b.length, g = [], k = 0; k < f; k++) {
        var m = [],
          l = []
        m.push((k + f - 1) % f, k, (k + 1) % f)
        l.push(0, 1, 0)
        var p = aa.getKeyframeOrder(m)
        m = aa.sortedArray(m, 1, p)
        l = aa.sortedArray(l, 1, p)
        d || 0 !== m[0] || (m.push(f), l.push(l[0]))
        g.push(
          new nd('.morphTargetInfluences[' + b[k].name + ']', m, l).scale(
            1 / c,
          ),
        )
      }
      return new Pa(a, -1, g)
    },
    findByName: function (a, b) {
      var c = a
      Array.isArray(a) ||
        (c = (a.geometry && a.geometry.animations) || a.animations)
      for (a = 0; a < c.length; a++) if (c[a].name === b) return c[a]
      return null
    },
    CreateClipsFromMorphTargetSequences: function (a, b, c) {
      for (
        var d = {}, f = /^([\w-]*?)([\d]+)$/, g = 0, k = a.length;
        g < k;
        g++
      ) {
        var m = a[g],
          l = m.name.match(f)
        if (l && 1 < l.length) {
          var p = l[1]
          ;(l = d[p]) || (d[p] = l = [])
          l.push(m)
        }
      }
      a = []
      for (p in d) a.push(Pa.CreateFromMorphTargetSequence(p, d[p], b, c))
      return a
    },
    parseAnimation: function (a, b) {
      if (!a)
        return (
          console.error(
            'THREE.AnimationClip: No animation in JSONLoader data.',
          ),
          null
        )
      var c = function (a, b, c, d, f) {
          if (0 !== c.length) {
            var g = [],
              k = []
            aa.flattenJSON(c, g, k, d)
            0 !== g.length && f.push(new a(b, g, k))
          }
        },
        d = [],
        f = a.name || 'default',
        g = a.length || -1,
        k = a.fps || 30
      a = a.hierarchy || []
      for (var m = 0; m < a.length; m++) {
        var l = a[m].keys
        if (l && 0 !== l.length)
          if (l[0].morphTargets) {
            g = {}
            for (var p = 0; p < l.length; p++)
              if (l[p].morphTargets)
                for (var q = 0; q < l[p].morphTargets.length; q++)
                  g[l[p].morphTargets[q]] = -1
            for (var t in g) {
              var r = [],
                u = []
              for (q = 0; q !== l[p].morphTargets.length; ++q) {
                var v = l[p]
                r.push(v.time)
                u.push(v.morphTarget === t ? 1 : 0)
              }
              d.push(new nd('.morphTargetInfluence[' + t + ']', r, u))
            }
            g = g.length * (k || 1)
          } else
            (p = '.bones[' + b[m].name + ']'),
              c(od, p + '.position', l, 'pos', d),
              c(Ae, p + '.quaternion', l, 'rot', d),
              c(od, p + '.scale', l, 'scl', d)
      }
      return 0 === d.length ? null : new Pa(f, g, d)
    },
  })
  Object.assign(Pa.prototype, {
    resetDuration: function () {
      for (var a = 0, b = 0, c = this.tracks.length; b !== c; ++b) {
        var d = this.tracks[b]
        a = Math.max(a, d.times[d.times.length - 1])
      }
      this.duration = a
      return this
    },
    trim: function () {
      for (var a = 0; a < this.tracks.length; a++)
        this.tracks[a].trim(0, this.duration)
      return this
    },
    validate: function () {
      for (var a = !0, b = 0; b < this.tracks.length; b++)
        a = a && this.tracks[b].validate()
      return a
    },
    optimize: function () {
      for (var a = 0; a < this.tracks.length; a++) this.tracks[a].optimize()
      return this
    },
    clone: function () {
      for (var a = [], b = 0; b < this.tracks.length; b++)
        a.push(this.tracks[b].clone())
      return new Pa(this.name, this.duration, a)
    },
  })
  var Fc = {
      enabled: !1,
      files: {},
      add: function (a, b) {
        !1 !== this.enabled && (this.files[a] = b)
      },
      get: function (a) {
        if (!1 !== this.enabled) return this.files[a]
      },
      remove: function (a) {
        delete this.files[a]
      },
      clear: function () {
        this.files = {}
      },
    },
    Li = new Og()
  Object.assign(X.prototype, {
    load: function () {},
    parse: function () {},
    setCrossOrigin: function (a) {
      this.crossOrigin = a
      return this
    },
    setPath: function (a) {
      this.path = a
      return this
    },
    setResourcePath: function (a) {
      this.resourcePath = a
      return this
    },
  })
  var eb = {}
  Qa.prototype = Object.assign(Object.create(X.prototype), {
    constructor: Qa,
    load: function (a, b, c, d) {
      void 0 === a && (a = '')
      void 0 !== this.path && (a = this.path + a)
      a = this.manager.resolveURL(a)
      var f = this,
        g = Fc.get(a)
      if (void 0 !== g)
        return (
          f.manager.itemStart(a),
          setTimeout(function () {
            b && b(g)
            f.manager.itemEnd(a)
          }, 0),
          g
        )
      if (void 0 !== eb[a]) eb[a].push({ onLoad: b, onProgress: c, onError: d })
      else {
        var k = a.match(/^data:(.*?)(;base64)?,(.*)$/)
        if (k) {
          c = k[1]
          var m = !!k[2]
          k = k[3]
          k = decodeURIComponent(k)
          m && (k = atob(k))
          try {
            var l = (this.responseType || '').toLowerCase()
            switch (l) {
              case 'arraybuffer':
              case 'blob':
                var p = new Uint8Array(k.length)
                for (m = 0; m < k.length; m++) p[m] = k.charCodeAt(m)
                var q =
                  'blob' === l ? new Blob([p.buffer], { type: c }) : p.buffer
                break
              case 'document':
                q = new DOMParser().parseFromString(k, c)
                break
              case 'json':
                q = JSON.parse(k)
                break
              default:
                q = k
            }
            setTimeout(function () {
              b && b(q)
              f.manager.itemEnd(a)
            }, 0)
          } catch (r) {
            setTimeout(function () {
              d && d(r)
              f.manager.itemError(a)
              f.manager.itemEnd(a)
            }, 0)
          }
        } else {
          eb[a] = []
          eb[a].push({ onLoad: b, onProgress: c, onError: d })
          var t = new Ac()
          t.open('GET', a, !0)
          t.addEventListener(
            'load',
            function (b) {
              var c = this.response,
                d = eb[a]
              delete eb[a]
              if (200 === this.status || 0 === this.status) {
                0 === this.status &&
                  console.warn('THREE.FileLoader: HTTP Status 0 received.')
                Fc.add(a, c)
                for (var g = 0, k = d.length; g < k; g++) {
                  var m = d[g]
                  if (m.onLoad) m.onLoad(c)
                }
              } else {
                g = 0
                for (k = d.length; g < k; g++)
                  if (((m = d[g]), m.onError)) m.onError(b)
                f.manager.itemError(a)
              }
              f.manager.itemEnd(a)
            },
            !1,
          )
          t.addEventListener(
            'progress',
            function (b) {
              for (var c = eb[a], d = 0, f = c.length; d < f; d++) {
                var g = c[d]
                if (g.onProgress) g.onProgress(b)
              }
            },
            !1,
          )
          t.addEventListener(
            'error',
            function (b) {
              var c = eb[a]
              delete eb[a]
              for (var d = 0, g = c.length; d < g; d++) {
                var k = c[d]
                if (k.onError) k.onError(b)
              }
              f.manager.itemError(a)
              f.manager.itemEnd(a)
            },
            !1,
          )
          t.addEventListener(
            'abort',
            function (b) {
              var c = eb[a]
              delete eb[a]
              for (var d = 0, g = c.length; d < g; d++) {
                var k = c[d]
                if (k.onError) k.onError(b)
              }
              f.manager.itemError(a)
              f.manager.itemEnd(a)
            },
            !1,
          )
          void 0 !== this.responseType && (t.responseType = this.responseType)
          void 0 !== this.withCredentials &&
            (t.withCredentials = this.withCredentials)
          t.overrideMimeType &&
            t.overrideMimeType(
              void 0 !== this.mimeType ? this.mimeType : 'text/plain',
            )
          for (m in this.requestHeader)
            t.setRequestHeader(m, this.requestHeader[m])
          t.send(null)
        }
        f.manager.itemStart(a)
        return t
      }
    },
    setResponseType: function (a) {
      this.responseType = a
      return this
    },
    setWithCredentials: function (a) {
      this.withCredentials = a
      return this
    },
    setMimeType: function (a) {
      this.mimeType = a
      return this
    },
    setRequestHeader: function (a) {
      this.requestHeader = a
      return this
    },
  })
  Pg.prototype = Object.assign(Object.create(X.prototype), {
    constructor: Pg,
    load: function (a, b, c, d) {
      var f = this,
        g = new Qa(f.manager)
      g.setPath(f.path)
      g.load(
        a,
        function (a) {
          b(f.parse(JSON.parse(a)))
        },
        c,
        d,
      )
    },
    parse: function (a) {
      for (var b = [], c = 0; c < a.length; c++) {
        var d = Pa.parse(a[c])
        b.push(d)
      }
      return b
    },
  })
  Qg.prototype = Object.assign(Object.create(X.prototype), {
    constructor: Qg,
    load: function (a, b, c, d) {
      function f(f) {
        l.load(
          a[f],
          function (a) {
            a = g.parse(a, !0)
            k[f] = {
              width: a.width,
              height: a.height,
              format: a.format,
              mipmaps: a.mipmaps,
            }
            p += 1
            6 === p &&
              (1 === a.mipmapCount && (m.minFilter = 1006),
              (m.format = a.format),
              (m.needsUpdate = !0),
              b && b(m))
          },
          c,
          d,
        )
      }
      var g = this,
        k = [],
        m = new Zc()
      m.image = k
      var l = new Qa(this.manager)
      l.setPath(this.path)
      l.setResponseType('arraybuffer')
      if (Array.isArray(a))
        for (var p = 0, q = 0, t = a.length; q < t; ++q) f(q)
      else
        l.load(
          a,
          function (a) {
            a = g.parse(a, !0)
            if (a.isCubemap)
              for (
                var c = a.mipmaps.length / a.mipmapCount, d = 0;
                d < c;
                d++
              ) {
                k[d] = { mipmaps: [] }
                for (var f = 0; f < a.mipmapCount; f++)
                  k[d].mipmaps.push(a.mipmaps[d * a.mipmapCount + f]),
                    (k[d].format = a.format),
                    (k[d].width = a.width),
                    (k[d].height = a.height)
              }
            else
              (m.image.width = a.width),
                (m.image.height = a.height),
                (m.mipmaps = a.mipmaps)
            1 === a.mipmapCount && (m.minFilter = 1006)
            m.format = a.format
            m.needsUpdate = !0
            b && b(m)
          },
          c,
          d,
        )
      return m
    },
  })
  pf.prototype = Object.assign(Object.create(X.prototype), {
    constructor: pf,
    load: function (a, b, c, d) {
      var f = this,
        g = new hc(),
        k = new Qa(this.manager)
      k.setResponseType('arraybuffer')
      k.setPath(this.path)
      k.load(
        a,
        function (a) {
          if ((a = f.parse(a)))
            void 0 !== a.image
              ? (g.image = a.image)
              : void 0 !== a.data &&
                ((g.image.width = a.width),
                (g.image.height = a.height),
                (g.image.data = a.data)),
              (g.wrapS = void 0 !== a.wrapS ? a.wrapS : 1001),
              (g.wrapT = void 0 !== a.wrapT ? a.wrapT : 1001),
              (g.magFilter = void 0 !== a.magFilter ? a.magFilter : 1006),
              (g.minFilter = void 0 !== a.minFilter ? a.minFilter : 1006),
              (g.anisotropy = void 0 !== a.anisotropy ? a.anisotropy : 1),
              void 0 !== a.format && (g.format = a.format),
              void 0 !== a.type && (g.type = a.type),
              void 0 !== a.mipmaps &&
                ((g.mipmaps = a.mipmaps), (g.minFilter = 1008)),
              1 === a.mipmapCount && (g.minFilter = 1006),
              (g.needsUpdate = !0),
              b && b(g, a)
        },
        c,
        d,
      )
      return g
    },
  })
  pd.prototype = Object.assign(Object.create(X.prototype), {
    constructor: pd,
    load: function (a, b, c, d) {
      function f() {
        l.removeEventListener('load', f, !1)
        l.removeEventListener('error', g, !1)
        Fc.add(a, this)
        b && b(this)
        k.manager.itemEnd(a)
      }
      function g(b) {
        l.removeEventListener('load', f, !1)
        l.removeEventListener('error', g, !1)
        d && d(b)
        k.manager.itemError(a)
        k.manager.itemEnd(a)
      }
      void 0 !== this.path && (a = this.path + a)
      a = this.manager.resolveURL(a)
      var k = this,
        m = Fc.get(a)
      if (void 0 !== m)
        return (
          k.manager.itemStart(a),
          setTimeout(function () {
            b && b(m)
            k.manager.itemEnd(a)
          }, 0),
          m
        )
      var l = V.createElementNS('http://www.w3.org/1999/xhtml', 'img')
      l.addEventListener('load', f, !1)
      l.addEventListener('error', g, !1)
      'data:' !== a.substr(0, 5) &&
        void 0 !== this.crossOrigin &&
        (l.crossOrigin = this.crossOrigin)
      k.manager.itemStart(a)
      l.src = a
      return l
    },
  })
  qf.prototype = Object.assign(Object.create(X.prototype), {
    constructor: qf,
    load: function (a, b, c, d) {
      function f(c) {
        k.load(
          a[c],
          function (a) {
            g.images[c] = a
            m++
            6 === m && ((g.needsUpdate = !0), b && b(g))
          },
          void 0,
          d,
        )
      }
      var g = new vb(),
        k = new pd(this.manager)
      k.setCrossOrigin(this.crossOrigin)
      k.setPath(this.path)
      var m = 0
      for (c = 0; c < a.length; ++c) f(c)
      return g
    },
  })
  rf.prototype = Object.assign(Object.create(X.prototype), {
    constructor: rf,
    load: function (a, b, c, d) {
      var f = new S(),
        g = new pd(this.manager)
      g.setCrossOrigin(this.crossOrigin)
      g.setPath(this.path)
      g.load(
        a,
        function (c) {
          f.image = c
          c =
            0 < a.search(/\.jpe?g($|\?)/i) ||
            0 === a.search(/^data:image\/jpeg/)
          f.format = c ? 1022 : 1023
          f.needsUpdate = !0
          void 0 !== b && b(f)
        },
        c,
        d,
      )
      return f
    },
  })
  Object.assign(M.prototype, {
    getPoint: function () {
      console.warn('THREE.Curve: .getPoint() not implemented.')
      return null
    },
    getPointAt: function (a, b) {
      a = this.getUtoTmapping(a)
      return this.getPoint(a, b)
    },
    getPoints: function (a) {
      void 0 === a && (a = 5)
      for (var b = [], c = 0; c <= a; c++) b.push(this.getPoint(c / a))
      return b
    },
    getSpacedPoints: function (a) {
      void 0 === a && (a = 5)
      for (var b = [], c = 0; c <= a; c++) b.push(this.getPointAt(c / a))
      return b
    },
    getLength: function () {
      var a = this.getLengths()
      return a[a.length - 1]
    },
    getLengths: function (a) {
      void 0 === a && (a = this.arcLengthDivisions)
      if (
        this.cacheArcLengths &&
        this.cacheArcLengths.length === a + 1 &&
        !this.needsUpdate
      )
        return this.cacheArcLengths
      this.needsUpdate = !1
      var b = [],
        c = this.getPoint(0),
        d,
        f = 0
      b.push(0)
      for (d = 1; d <= a; d++) {
        var g = this.getPoint(d / a)
        f += g.distanceTo(c)
        b.push(f)
        c = g
      }
      return (this.cacheArcLengths = b)
    },
    updateArcLengths: function () {
      this.needsUpdate = !0
      this.getLengths()
    },
    getUtoTmapping: function (a, b) {
      var c = this.getLengths(),
        d = c.length
      b = b ? b : a * c[d - 1]
      for (var f = 0, g = d - 1, k; f <= g; )
        if (((a = Math.floor(f + (g - f) / 2)), (k = c[a] - b), 0 > k))
          f = a + 1
        else if (0 < k) g = a - 1
        else {
          g = a
          break
        }
      a = g
      if (c[a] === b) return a / (d - 1)
      f = c[a]
      return (a + (b - f) / (c[a + 1] - f)) / (d - 1)
    },
    getTangent: function (a) {
      var b = a - 1e-4
      a += 1e-4
      0 > b && (b = 0)
      1 < a && (a = 1)
      b = this.getPoint(b)
      return this.getPoint(a).clone().sub(b).normalize()
    },
    getTangentAt: function (a) {
      a = this.getUtoTmapping(a)
      return this.getTangent(a)
    },
    computeFrenetFrames: function (a, b) {
      var c = new q(),
        d = [],
        f = [],
        g = [],
        k = new q(),
        m = new I(),
        l
      for (l = 0; l <= a; l++) {
        var p = l / a
        d[l] = this.getTangentAt(p)
        d[l].normalize()
      }
      f[0] = new q()
      g[0] = new q()
      l = Number.MAX_VALUE
      p = Math.abs(d[0].x)
      var y = Math.abs(d[0].y),
        t = Math.abs(d[0].z)
      p <= l && ((l = p), c.set(1, 0, 0))
      y <= l && ((l = y), c.set(0, 1, 0))
      t <= l && c.set(0, 0, 1)
      k.crossVectors(d[0], c).normalize()
      f[0].crossVectors(d[0], k)
      g[0].crossVectors(d[0], f[0])
      for (l = 1; l <= a; l++)
        (f[l] = f[l - 1].clone()),
          (g[l] = g[l - 1].clone()),
          k.crossVectors(d[l - 1], d[l]),
          k.length() > Number.EPSILON &&
            (k.normalize(),
            (c = Math.acos(N.clamp(d[l - 1].dot(d[l]), -1, 1))),
            f[l].applyMatrix4(m.makeRotationAxis(k, c))),
          g[l].crossVectors(d[l], f[l])
      if (!0 === b)
        for (
          c = Math.acos(N.clamp(f[0].dot(f[a]), -1, 1)),
            c /= a,
            0 < d[0].dot(k.crossVectors(f[0], f[a])) && (c = -c),
            l = 1;
          l <= a;
          l++
        )
          f[l].applyMatrix4(m.makeRotationAxis(d[l], c * l)),
            g[l].crossVectors(d[l], f[l])
      return { tangents: d, normals: f, binormals: g }
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.arcLengthDivisions = a.arcLengthDivisions
      return this
    },
    toJSON: function () {
      var a = {
        metadata: { version: 4.5, type: 'Curve', generator: 'Curve.toJSON' },
      }
      a.arcLengthDivisions = this.arcLengthDivisions
      a.type = this.type
      return a
    },
    fromJSON: function (a) {
      this.arcLengthDivisions = a.arcLengthDivisions
      return this
    },
  })
  Ma.prototype = Object.create(M.prototype)
  Ma.prototype.constructor = Ma
  Ma.prototype.isEllipseCurve = !0
  Ma.prototype.getPoint = function (a, b) {
    b = b || new z()
    for (
      var c = 2 * Math.PI,
        d = this.aEndAngle - this.aStartAngle,
        f = Math.abs(d) < Number.EPSILON;
      0 > d;

    )
      d += c
    for (; d > c; ) d -= c
    d < Number.EPSILON && (d = f ? 0 : c)
    !0 !== this.aClockwise || f || (d = d === c ? -c : d - c)
    c = this.aStartAngle + a * d
    a = this.aX + this.xRadius * Math.cos(c)
    var g = this.aY + this.yRadius * Math.sin(c)
    0 !== this.aRotation &&
      ((c = Math.cos(this.aRotation)),
      (d = Math.sin(this.aRotation)),
      (f = a - this.aX),
      (g -= this.aY),
      (a = f * c - g * d + this.aX),
      (g = f * d + g * c + this.aY))
    return b.set(a, g)
  }
  Ma.prototype.copy = function (a) {
    M.prototype.copy.call(this, a)
    this.aX = a.aX
    this.aY = a.aY
    this.xRadius = a.xRadius
    this.yRadius = a.yRadius
    this.aStartAngle = a.aStartAngle
    this.aEndAngle = a.aEndAngle
    this.aClockwise = a.aClockwise
    this.aRotation = a.aRotation
    return this
  }
  Ma.prototype.toJSON = function () {
    var a = M.prototype.toJSON.call(this)
    a.aX = this.aX
    a.aY = this.aY
    a.xRadius = this.xRadius
    a.yRadius = this.yRadius
    a.aStartAngle = this.aStartAngle
    a.aEndAngle = this.aEndAngle
    a.aClockwise = this.aClockwise
    a.aRotation = this.aRotation
    return a
  }
  Ma.prototype.fromJSON = function (a) {
    M.prototype.fromJSON.call(this, a)
    this.aX = a.aX
    this.aY = a.aY
    this.xRadius = a.xRadius
    this.yRadius = a.yRadius
    this.aStartAngle = a.aStartAngle
    this.aEndAngle = a.aEndAngle
    this.aClockwise = a.aClockwise
    this.aRotation = a.aRotation
    return this
  }
  qd.prototype = Object.create(Ma.prototype)
  qd.prototype.constructor = qd
  qd.prototype.isArcCurve = !0
  var fg = new q(),
    Gh = new Rg(),
    Hh = new Rg(),
    Ih = new Rg()
  la.prototype = Object.create(M.prototype)
  la.prototype.constructor = la
  la.prototype.isCatmullRomCurve3 = !0
  la.prototype.getPoint = function (a, b) {
    b = b || new q()
    var c = this.points,
      d = c.length
    a *= d - (this.closed ? 0 : 1)
    var f = Math.floor(a)
    a -= f
    this.closed
      ? (f += 0 < f ? 0 : (Math.floor(Math.abs(f) / d) + 1) * d)
      : 0 === a && f === d - 1 && ((f = d - 2), (a = 1))
    if (this.closed || 0 < f) var g = c[(f - 1) % d]
    else fg.subVectors(c[0], c[1]).add(c[0]), (g = fg)
    var k = c[f % d]
    var m = c[(f + 1) % d]
    this.closed || f + 2 < d
      ? (c = c[(f + 2) % d])
      : (fg.subVectors(c[d - 1], c[d - 2]).add(c[d - 1]), (c = fg))
    if ('centripetal' === this.curveType || 'chordal' === this.curveType) {
      var l = 'chordal' === this.curveType ? 0.5 : 0.25
      d = Math.pow(g.distanceToSquared(k), l)
      f = Math.pow(k.distanceToSquared(m), l)
      l = Math.pow(m.distanceToSquared(c), l)
      1e-4 > f && (f = 1)
      1e-4 > d && (d = f)
      1e-4 > l && (l = f)
      Gh.initNonuniformCatmullRom(g.x, k.x, m.x, c.x, d, f, l)
      Hh.initNonuniformCatmullRom(g.y, k.y, m.y, c.y, d, f, l)
      Ih.initNonuniformCatmullRom(g.z, k.z, m.z, c.z, d, f, l)
    } else
      'catmullrom' === this.curveType &&
        (Gh.initCatmullRom(g.x, k.x, m.x, c.x, this.tension),
        Hh.initCatmullRom(g.y, k.y, m.y, c.y, this.tension),
        Ih.initCatmullRom(g.z, k.z, m.z, c.z, this.tension))
    b.set(Gh.calc(a), Hh.calc(a), Ih.calc(a))
    return b
  }
  la.prototype.copy = function (a) {
    M.prototype.copy.call(this, a)
    this.points = []
    for (var b = 0, c = a.points.length; b < c; b++)
      this.points.push(a.points[b].clone())
    this.closed = a.closed
    this.curveType = a.curveType
    this.tension = a.tension
    return this
  }
  la.prototype.toJSON = function () {
    var a = M.prototype.toJSON.call(this)
    a.points = []
    for (var b = 0, c = this.points.length; b < c; b++)
      a.points.push(this.points[b].toArray())
    a.closed = this.closed
    a.curveType = this.curveType
    a.tension = this.tension
    return a
  }
  la.prototype.fromJSON = function (a) {
    M.prototype.fromJSON.call(this, a)
    this.points = []
    for (var b = 0, c = a.points.length; b < c; b++) {
      var d = a.points[b]
      this.points.push(new q().fromArray(d))
    }
    this.closed = a.closed
    this.curveType = a.curveType
    this.tension = a.tension
    return this
  }
  Xa.prototype = Object.create(M.prototype)
  Xa.prototype.constructor = Xa
  Xa.prototype.isCubicBezierCurve = !0
  Xa.prototype.getPoint = function (a, b) {
    b = b || new z()
    var c = this.v0,
      d = this.v1,
      f = this.v2,
      g = this.v3
    b.set(Ce(a, c.x, d.x, f.x, g.x), Ce(a, c.y, d.y, f.y, g.y))
    return b
  }
  Xa.prototype.copy = function (a) {
    M.prototype.copy.call(this, a)
    this.v0.copy(a.v0)
    this.v1.copy(a.v1)
    this.v2.copy(a.v2)
    this.v3.copy(a.v3)
    return this
  }
  Xa.prototype.toJSON = function () {
    var a = M.prototype.toJSON.call(this)
    a.v0 = this.v0.toArray()
    a.v1 = this.v1.toArray()
    a.v2 = this.v2.toArray()
    a.v3 = this.v3.toArray()
    return a
  }
  Xa.prototype.fromJSON = function (a) {
    M.prototype.fromJSON.call(this, a)
    this.v0.fromArray(a.v0)
    this.v1.fromArray(a.v1)
    this.v2.fromArray(a.v2)
    this.v3.fromArray(a.v3)
    return this
  }
  lb.prototype = Object.create(M.prototype)
  lb.prototype.constructor = lb
  lb.prototype.isCubicBezierCurve3 = !0
  lb.prototype.getPoint = function (a, b) {
    b = b || new q()
    var c = this.v0,
      d = this.v1,
      f = this.v2,
      g = this.v3
    b.set(
      Ce(a, c.x, d.x, f.x, g.x),
      Ce(a, c.y, d.y, f.y, g.y),
      Ce(a, c.z, d.z, f.z, g.z),
    )
    return b
  }
  lb.prototype.copy = function (a) {
    M.prototype.copy.call(this, a)
    this.v0.copy(a.v0)
    this.v1.copy(a.v1)
    this.v2.copy(a.v2)
    this.v3.copy(a.v3)
    return this
  }
  lb.prototype.toJSON = function () {
    var a = M.prototype.toJSON.call(this)
    a.v0 = this.v0.toArray()
    a.v1 = this.v1.toArray()
    a.v2 = this.v2.toArray()
    a.v3 = this.v3.toArray()
    return a
  }
  lb.prototype.fromJSON = function (a) {
    M.prototype.fromJSON.call(this, a)
    this.v0.fromArray(a.v0)
    this.v1.fromArray(a.v1)
    this.v2.fromArray(a.v2)
    this.v3.fromArray(a.v3)
    return this
  }
  Ga.prototype = Object.create(M.prototype)
  Ga.prototype.constructor = Ga
  Ga.prototype.isLineCurve = !0
  Ga.prototype.getPoint = function (a, b) {
    b = b || new z()
    1 === a
      ? b.copy(this.v2)
      : (b.copy(this.v2).sub(this.v1), b.multiplyScalar(a).add(this.v1))
    return b
  }
  Ga.prototype.getPointAt = function (a, b) {
    return this.getPoint(a, b)
  }
  Ga.prototype.getTangent = function () {
    return this.v2.clone().sub(this.v1).normalize()
  }
  Ga.prototype.copy = function (a) {
    M.prototype.copy.call(this, a)
    this.v1.copy(a.v1)
    this.v2.copy(a.v2)
    return this
  }
  Ga.prototype.toJSON = function () {
    var a = M.prototype.toJSON.call(this)
    a.v1 = this.v1.toArray()
    a.v2 = this.v2.toArray()
    return a
  }
  Ga.prototype.fromJSON = function (a) {
    M.prototype.fromJSON.call(this, a)
    this.v1.fromArray(a.v1)
    this.v2.fromArray(a.v2)
    return this
  }
  Ya.prototype = Object.create(M.prototype)
  Ya.prototype.constructor = Ya
  Ya.prototype.isLineCurve3 = !0
  Ya.prototype.getPoint = function (a, b) {
    b = b || new q()
    1 === a
      ? b.copy(this.v2)
      : (b.copy(this.v2).sub(this.v1), b.multiplyScalar(a).add(this.v1))
    return b
  }
  Ya.prototype.getPointAt = function (a, b) {
    return this.getPoint(a, b)
  }
  Ya.prototype.copy = function (a) {
    M.prototype.copy.call(this, a)
    this.v1.copy(a.v1)
    this.v2.copy(a.v2)
    return this
  }
  Ya.prototype.toJSON = function () {
    var a = M.prototype.toJSON.call(this)
    a.v1 = this.v1.toArray()
    a.v2 = this.v2.toArray()
    return a
  }
  Ya.prototype.fromJSON = function (a) {
    M.prototype.fromJSON.call(this, a)
    this.v1.fromArray(a.v1)
    this.v2.fromArray(a.v2)
    return this
  }
  Za.prototype = Object.create(M.prototype)
  Za.prototype.constructor = Za
  Za.prototype.isQuadraticBezierCurve = !0
  Za.prototype.getPoint = function (a, b) {
    b = b || new z()
    var c = this.v0,
      d = this.v1,
      f = this.v2
    b.set(Be(a, c.x, d.x, f.x), Be(a, c.y, d.y, f.y))
    return b
  }
  Za.prototype.copy = function (a) {
    M.prototype.copy.call(this, a)
    this.v0.copy(a.v0)
    this.v1.copy(a.v1)
    this.v2.copy(a.v2)
    return this
  }
  Za.prototype.toJSON = function () {
    var a = M.prototype.toJSON.call(this)
    a.v0 = this.v0.toArray()
    a.v1 = this.v1.toArray()
    a.v2 = this.v2.toArray()
    return a
  }
  Za.prototype.fromJSON = function (a) {
    M.prototype.fromJSON.call(this, a)
    this.v0.fromArray(a.v0)
    this.v1.fromArray(a.v1)
    this.v2.fromArray(a.v2)
    return this
  }
  mb.prototype = Object.create(M.prototype)
  mb.prototype.constructor = mb
  mb.prototype.isQuadraticBezierCurve3 = !0
  mb.prototype.getPoint = function (a, b) {
    b = b || new q()
    var c = this.v0,
      d = this.v1,
      f = this.v2
    b.set(Be(a, c.x, d.x, f.x), Be(a, c.y, d.y, f.y), Be(a, c.z, d.z, f.z))
    return b
  }
  mb.prototype.copy = function (a) {
    M.prototype.copy.call(this, a)
    this.v0.copy(a.v0)
    this.v1.copy(a.v1)
    this.v2.copy(a.v2)
    return this
  }
  mb.prototype.toJSON = function () {
    var a = M.prototype.toJSON.call(this)
    a.v0 = this.v0.toArray()
    a.v1 = this.v1.toArray()
    a.v2 = this.v2.toArray()
    return a
  }
  mb.prototype.fromJSON = function (a) {
    M.prototype.fromJSON.call(this, a)
    this.v0.fromArray(a.v0)
    this.v1.fromArray(a.v1)
    this.v2.fromArray(a.v2)
    return this
  }
  $a.prototype = Object.create(M.prototype)
  $a.prototype.constructor = $a
  $a.prototype.isSplineCurve = !0
  $a.prototype.getPoint = function (a, b) {
    b = b || new z()
    var c = this.points,
      d = (c.length - 1) * a
    a = Math.floor(d)
    d -= a
    var f = c[0 === a ? a : a - 1],
      g = c[a],
      k = c[a > c.length - 2 ? c.length - 1 : a + 1]
    c = c[a > c.length - 3 ? c.length - 1 : a + 2]
    b.set(Mi(d, f.x, g.x, k.x, c.x), Mi(d, f.y, g.y, k.y, c.y))
    return b
  }
  $a.prototype.copy = function (a) {
    M.prototype.copy.call(this, a)
    this.points = []
    for (var b = 0, c = a.points.length; b < c; b++)
      this.points.push(a.points[b].clone())
    return this
  }
  $a.prototype.toJSON = function () {
    var a = M.prototype.toJSON.call(this)
    a.points = []
    for (var b = 0, c = this.points.length; b < c; b++)
      a.points.push(this.points[b].toArray())
    return a
  }
  $a.prototype.fromJSON = function (a) {
    M.prototype.fromJSON.call(this, a)
    this.points = []
    for (var b = 0, c = a.points.length; b < c; b++) {
      var d = a.points[b]
      this.points.push(new z().fromArray(d))
    }
    return this
  }
  var Jh = Object.freeze({
    __proto__: null,
    ArcCurve: qd,
    CatmullRomCurve3: la,
    CubicBezierCurve: Xa,
    CubicBezierCurve3: lb,
    EllipseCurve: Ma,
    LineCurve: Ga,
    LineCurve3: Ya,
    QuadraticBezierCurve: Za,
    QuadraticBezierCurve3: mb,
    SplineCurve: $a,
  })
  zb.prototype = Object.assign(Object.create(M.prototype), {
    constructor: zb,
    add: function (a) {
      this.curves.push(a)
    },
    closePath: function () {
      var a = this.curves[0].getPoint(0),
        b = this.curves[this.curves.length - 1].getPoint(1)
      a.equals(b) || this.curves.push(new Ga(b, a))
    },
    getPoint: function (a) {
      var b = a * this.getLength(),
        c = this.getCurveLengths()
      for (a = 0; a < c.length; ) {
        if (c[a] >= b)
          return (
            (b = c[a] - b),
            (a = this.curves[a]),
            (c = a.getLength()),
            a.getPointAt(0 === c ? 0 : 1 - b / c)
          )
        a++
      }
      return null
    },
    getLength: function () {
      var a = this.getCurveLengths()
      return a[a.length - 1]
    },
    updateArcLengths: function () {
      this.needsUpdate = !0
      this.cacheLengths = null
      this.getCurveLengths()
    },
    getCurveLengths: function () {
      if (this.cacheLengths && this.cacheLengths.length === this.curves.length)
        return this.cacheLengths
      for (var a = [], b = 0, c = 0, d = this.curves.length; c < d; c++)
        (b += this.curves[c].getLength()), a.push(b)
      return (this.cacheLengths = a)
    },
    getSpacedPoints: function (a) {
      void 0 === a && (a = 40)
      for (var b = [], c = 0; c <= a; c++) b.push(this.getPoint(c / a))
      this.autoClose && b.push(b[0])
      return b
    },
    getPoints: function (a) {
      a = a || 12
      for (var b = [], c, d = 0, f = this.curves; d < f.length; d++) {
        var g = f[d]
        g = g.getPoints(
          g && g.isEllipseCurve
            ? 2 * a
            : g && (g.isLineCurve || g.isLineCurve3)
            ? 1
            : g && g.isSplineCurve
            ? a * g.points.length
            : a,
        )
        for (var k = 0; k < g.length; k++) {
          var m = g[k]
          ;(c && c.equals(m)) || (b.push(m), (c = m))
        }
      }
      this.autoClose &&
        1 < b.length &&
        !b[b.length - 1].equals(b[0]) &&
        b.push(b[0])
      return b
    },
    copy: function (a) {
      M.prototype.copy.call(this, a)
      this.curves = []
      for (var b = 0, c = a.curves.length; b < c; b++)
        this.curves.push(a.curves[b].clone())
      this.autoClose = a.autoClose
      return this
    },
    toJSON: function () {
      var a = M.prototype.toJSON.call(this)
      a.autoClose = this.autoClose
      a.curves = []
      for (var b = 0, c = this.curves.length; b < c; b++)
        a.curves.push(this.curves[b].toJSON())
      return a
    },
    fromJSON: function (a) {
      M.prototype.fromJSON.call(this, a)
      this.autoClose = a.autoClose
      this.curves = []
      for (var b = 0, c = a.curves.length; b < c; b++) {
        var d = a.curves[b]
        this.curves.push(new Jh[d.type]().fromJSON(d))
      }
      return this
    },
  })
  ab.prototype = Object.assign(Object.create(zb.prototype), {
    constructor: ab,
    setFromPoints: function (a) {
      this.moveTo(a[0].x, a[0].y)
      for (var b = 1, c = a.length; b < c; b++) this.lineTo(a[b].x, a[b].y)
      return this
    },
    moveTo: function (a, b) {
      this.currentPoint.set(a, b)
      return this
    },
    lineTo: function (a, b) {
      var c = new Ga(this.currentPoint.clone(), new z(a, b))
      this.curves.push(c)
      this.currentPoint.set(a, b)
      return this
    },
    quadraticCurveTo: function (a, b, c, d) {
      a = new Za(this.currentPoint.clone(), new z(a, b), new z(c, d))
      this.curves.push(a)
      this.currentPoint.set(c, d)
      return this
    },
    bezierCurveTo: function (a, b, c, d, f, g) {
      a = new Xa(
        this.currentPoint.clone(),
        new z(a, b),
        new z(c, d),
        new z(f, g),
      )
      this.curves.push(a)
      this.currentPoint.set(f, g)
      return this
    },
    splineThru: function (a) {
      var b = [this.currentPoint.clone()].concat(a)
      b = new $a(b)
      this.curves.push(b)
      this.currentPoint.copy(a[a.length - 1])
      return this
    },
    arc: function (a, b, c, d, f, g) {
      this.absarc(a + this.currentPoint.x, b + this.currentPoint.y, c, d, f, g)
      return this
    },
    absarc: function (a, b, c, d, f, g) {
      this.absellipse(a, b, c, c, d, f, g)
      return this
    },
    ellipse: function (a, b, c, d, f, g, k, m) {
      this.absellipse(
        a + this.currentPoint.x,
        b + this.currentPoint.y,
        c,
        d,
        f,
        g,
        k,
        m,
      )
      return this
    },
    absellipse: function (a, b, c, d, f, g, k, m) {
      a = new Ma(a, b, c, d, f, g, k, m)
      0 < this.curves.length &&
        ((b = a.getPoint(0)),
        b.equals(this.currentPoint) || this.lineTo(b.x, b.y))
      this.curves.push(a)
      a = a.getPoint(1)
      this.currentPoint.copy(a)
      return this
    },
    copy: function (a) {
      zb.prototype.copy.call(this, a)
      this.currentPoint.copy(a.currentPoint)
      return this
    },
    toJSON: function () {
      var a = zb.prototype.toJSON.call(this)
      a.currentPoint = this.currentPoint.toArray()
      return a
    },
    fromJSON: function (a) {
      zb.prototype.fromJSON.call(this, a)
      this.currentPoint.fromArray(a.currentPoint)
      return this
    },
  })
  Pb.prototype = Object.assign(Object.create(ab.prototype), {
    constructor: Pb,
    getPointsHoles: function (a) {
      for (var b = [], c = 0, d = this.holes.length; c < d; c++)
        b[c] = this.holes[c].getPoints(a)
      return b
    },
    extractPoints: function (a) {
      return { shape: this.getPoints(a), holes: this.getPointsHoles(a) }
    },
    copy: function (a) {
      ab.prototype.copy.call(this, a)
      this.holes = []
      for (var b = 0, c = a.holes.length; b < c; b++)
        this.holes.push(a.holes[b].clone())
      return this
    },
    toJSON: function () {
      var a = ab.prototype.toJSON.call(this)
      a.uuid = this.uuid
      a.holes = []
      for (var b = 0, c = this.holes.length; b < c; b++)
        a.holes.push(this.holes[b].toJSON())
      return a
    },
    fromJSON: function (a) {
      ab.prototype.fromJSON.call(this, a)
      this.uuid = a.uuid
      this.holes = []
      for (var b = 0, c = a.holes.length; b < c; b++) {
        var d = a.holes[b]
        this.holes.push(new ab().fromJSON(d))
      }
      return this
    },
  })
  da.prototype = Object.assign(Object.create(E.prototype), {
    constructor: da,
    isLight: !0,
    copy: function (a) {
      E.prototype.copy.call(this, a)
      this.color.copy(a.color)
      this.intensity = a.intensity
      return this
    },
    toJSON: function (a) {
      a = E.prototype.toJSON.call(this, a)
      a.object.color = this.color.getHex()
      a.object.intensity = this.intensity
      void 0 !== this.groundColor &&
        (a.object.groundColor = this.groundColor.getHex())
      void 0 !== this.distance && (a.object.distance = this.distance)
      void 0 !== this.angle && (a.object.angle = this.angle)
      void 0 !== this.decay && (a.object.decay = this.decay)
      void 0 !== this.penumbra && (a.object.penumbra = this.penumbra)
      void 0 !== this.shadow && (a.object.shadow = this.shadow.toJSON())
      return a
    },
  })
  sf.prototype = Object.assign(Object.create(da.prototype), {
    constructor: sf,
    isHemisphereLight: !0,
    copy: function (a) {
      da.prototype.copy.call(this, a)
      this.groundColor.copy(a.groundColor)
      return this
    },
  })
  Object.assign(nb.prototype, {
    _projScreenMatrix: new I(),
    _lightPositionWorld: new q(),
    _lookTarget: new q(),
    getViewportCount: function () {
      return this._viewportCount
    },
    getFrustum: function () {
      return this._frustum
    },
    updateMatrices: function (a) {
      var b = this.camera,
        c = this.matrix,
        d = this._projScreenMatrix,
        f = this._lookTarget,
        g = this._lightPositionWorld
      g.setFromMatrixPosition(a.matrixWorld)
      b.position.copy(g)
      f.setFromMatrixPosition(a.target.matrixWorld)
      b.lookAt(f)
      b.updateMatrixWorld()
      d.multiplyMatrices(b.projectionMatrix, b.matrixWorldInverse)
      this._frustum.setFromMatrix(d)
      c.set(0.5, 0, 0, 0.5, 0, 0.5, 0, 0.5, 0, 0, 0.5, 0.5, 0, 0, 0, 1)
      c.multiply(b.projectionMatrix)
      c.multiply(b.matrixWorldInverse)
    },
    getViewport: function (a) {
      return this._viewports[a]
    },
    getFrameExtents: function () {
      return this._frameExtents
    },
    copy: function (a) {
      this.camera = a.camera.clone()
      this.bias = a.bias
      this.radius = a.radius
      this.mapSize.copy(a.mapSize)
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    toJSON: function () {
      var a = {}
      0 !== this.bias && (a.bias = this.bias)
      1 !== this.radius && (a.radius = this.radius)
      if (512 !== this.mapSize.x || 512 !== this.mapSize.y)
        a.mapSize = this.mapSize.toArray()
      a.camera = this.camera.toJSON(!1).object
      delete a.camera.matrix
      return a
    },
  })
  tf.prototype = Object.assign(Object.create(nb.prototype), {
    constructor: tf,
    isSpotLightShadow: !0,
    updateMatrices: function (a) {
      var b = this.camera,
        c = 2 * N.RAD2DEG * a.angle,
        d = this.mapSize.width / this.mapSize.height,
        f = a.distance || b.far
      if (c !== b.fov || d !== b.aspect || f !== b.far)
        (b.fov = c), (b.aspect = d), (b.far = f), b.updateProjectionMatrix()
      nb.prototype.updateMatrices.call(this, a)
    },
  })
  uf.prototype = Object.assign(Object.create(da.prototype), {
    constructor: uf,
    isSpotLight: !0,
    copy: function (a) {
      da.prototype.copy.call(this, a)
      this.distance = a.distance
      this.angle = a.angle
      this.penumbra = a.penumbra
      this.decay = a.decay
      this.target = a.target.clone()
      this.shadow = a.shadow.clone()
      return this
    },
  })
  Sg.prototype = Object.assign(Object.create(nb.prototype), {
    constructor: Sg,
    isPointLightShadow: !0,
    updateMatrices: function (a, b) {
      void 0 === b && (b = 0)
      var c = this.camera,
        d = this.matrix,
        f = this._lightPositionWorld,
        g = this._lookTarget,
        k = this._projScreenMatrix
      f.setFromMatrixPosition(a.matrixWorld)
      c.position.copy(f)
      g.copy(c.position)
      g.add(this._cubeDirections[b])
      c.up.copy(this._cubeUps[b])
      c.lookAt(g)
      c.updateMatrixWorld()
      d.makeTranslation(-f.x, -f.y, -f.z)
      k.multiplyMatrices(c.projectionMatrix, c.matrixWorldInverse)
      this._frustum.setFromMatrix(k)
    },
  })
  vf.prototype = Object.assign(Object.create(da.prototype), {
    constructor: vf,
    isPointLight: !0,
    copy: function (a) {
      da.prototype.copy.call(this, a)
      this.distance = a.distance
      this.decay = a.decay
      this.shadow = a.shadow.clone()
      return this
    },
  })
  De.prototype = Object.assign(Object.create(hb.prototype), {
    constructor: De,
    isOrthographicCamera: !0,
    copy: function (a, b) {
      hb.prototype.copy.call(this, a, b)
      this.left = a.left
      this.right = a.right
      this.top = a.top
      this.bottom = a.bottom
      this.near = a.near
      this.far = a.far
      this.zoom = a.zoom
      this.view = null === a.view ? null : Object.assign({}, a.view)
      return this
    },
    setViewOffset: function (a, b, c, d, f, g) {
      null === this.view &&
        (this.view = {
          enabled: !0,
          fullWidth: 1,
          fullHeight: 1,
          offsetX: 0,
          offsetY: 0,
          width: 1,
          height: 1,
        })
      this.view.enabled = !0
      this.view.fullWidth = a
      this.view.fullHeight = b
      this.view.offsetX = c
      this.view.offsetY = d
      this.view.width = f
      this.view.height = g
      this.updateProjectionMatrix()
    },
    clearViewOffset: function () {
      null !== this.view && (this.view.enabled = !1)
      this.updateProjectionMatrix()
    },
    updateProjectionMatrix: function () {
      var a = (this.right - this.left) / (2 * this.zoom),
        b = (this.top - this.bottom) / (2 * this.zoom),
        c = (this.right + this.left) / 2,
        d = (this.top + this.bottom) / 2,
        f = c - a
      c += a
      a = d + b
      b = d - b
      if (null !== this.view && this.view.enabled) {
        c = this.zoom / (this.view.width / this.view.fullWidth)
        b = this.zoom / (this.view.height / this.view.fullHeight)
        var g = (this.right - this.left) / this.view.width
        d = (this.top - this.bottom) / this.view.height
        f += (this.view.offsetX / c) * g
        c = f + (this.view.width / c) * g
        a -= (this.view.offsetY / b) * d
        b = a - (this.view.height / b) * d
      }
      this.projectionMatrix.makeOrthographic(f, c, a, b, this.near, this.far)
      this.projectionMatrixInverse.getInverse(this.projectionMatrix)
    },
    toJSON: function (a) {
      a = E.prototype.toJSON.call(this, a)
      a.object.zoom = this.zoom
      a.object.left = this.left
      a.object.right = this.right
      a.object.top = this.top
      a.object.bottom = this.bottom
      a.object.near = this.near
      a.object.far = this.far
      null !== this.view && (a.object.view = Object.assign({}, this.view))
      return a
    },
  })
  wf.prototype = Object.assign(Object.create(nb.prototype), {
    constructor: wf,
    isDirectionalLightShadow: !0,
    updateMatrices: function (a) {
      nb.prototype.updateMatrices.call(this, a)
    },
  })
  xf.prototype = Object.assign(Object.create(da.prototype), {
    constructor: xf,
    isDirectionalLight: !0,
    copy: function (a) {
      da.prototype.copy.call(this, a)
      this.target = a.target.clone()
      this.shadow = a.shadow.clone()
      return this
    },
  })
  yf.prototype = Object.assign(Object.create(da.prototype), {
    constructor: yf,
    isAmbientLight: !0,
  })
  zf.prototype = Object.assign(Object.create(da.prototype), {
    constructor: zf,
    isRectAreaLight: !0,
    copy: function (a) {
      da.prototype.copy.call(this, a)
      this.width = a.width
      this.height = a.height
      return this
    },
    toJSON: function (a) {
      a = da.prototype.toJSON.call(this, a)
      a.object.width = this.width
      a.object.height = this.height
      return a
    },
  })
  Af.prototype = Object.assign(Object.create(X.prototype), {
    constructor: Af,
    load: function (a, b, c, d) {
      var f = this,
        g = new Qa(f.manager)
      g.setPath(f.path)
      g.load(
        a,
        function (a) {
          b(f.parse(JSON.parse(a)))
        },
        c,
        d,
      )
    },
    parse: function (a) {
      function b(a) {
        void 0 === c[a] &&
          console.warn('THREE.MaterialLoader: Undefined texture', a)
        return c[a]
      }
      var c = this.textures,
        d = new Nl[a.type]()
      void 0 !== a.uuid && (d.uuid = a.uuid)
      void 0 !== a.name && (d.name = a.name)
      void 0 !== a.color && d.color.setHex(a.color)
      void 0 !== a.roughness && (d.roughness = a.roughness)
      void 0 !== a.metalness && (d.metalness = a.metalness)
      void 0 !== a.sheen && (d.sheen = new D().setHex(a.sheen))
      void 0 !== a.emissive && d.emissive.setHex(a.emissive)
      void 0 !== a.specular && d.specular.setHex(a.specular)
      void 0 !== a.shininess && (d.shininess = a.shininess)
      void 0 !== a.clearcoat && (d.clearcoat = a.clearcoat)
      void 0 !== a.clearcoatRoughness &&
        (d.clearcoatRoughness = a.clearcoatRoughness)
      void 0 !== a.vertexColors && (d.vertexColors = a.vertexColors)
      void 0 !== a.fog && (d.fog = a.fog)
      void 0 !== a.flatShading && (d.flatShading = a.flatShading)
      void 0 !== a.blending && (d.blending = a.blending)
      void 0 !== a.combine && (d.combine = a.combine)
      void 0 !== a.side && (d.side = a.side)
      void 0 !== a.opacity && (d.opacity = a.opacity)
      void 0 !== a.transparent && (d.transparent = a.transparent)
      void 0 !== a.alphaTest && (d.alphaTest = a.alphaTest)
      void 0 !== a.depthTest && (d.depthTest = a.depthTest)
      void 0 !== a.depthWrite && (d.depthWrite = a.depthWrite)
      void 0 !== a.colorWrite && (d.colorWrite = a.colorWrite)
      void 0 !== a.stencilWrite && (d.stencilWrite = a.stencilWrite)
      void 0 !== a.stencilWriteMask && (d.stencilWriteMask = a.stencilWriteMask)
      void 0 !== a.stencilFunc && (d.stencilFunc = a.stencilFunc)
      void 0 !== a.stencilRef && (d.stencilRef = a.stencilRef)
      void 0 !== a.stencilFuncMask && (d.stencilFuncMask = a.stencilFuncMask)
      void 0 !== a.stencilFail && (d.stencilFail = a.stencilFail)
      void 0 !== a.stencilZFail && (d.stencilZFail = a.stencilZFail)
      void 0 !== a.stencilZPass && (d.stencilZPass = a.stencilZPass)
      void 0 !== a.wireframe && (d.wireframe = a.wireframe)
      void 0 !== a.wireframeLinewidth &&
        (d.wireframeLinewidth = a.wireframeLinewidth)
      void 0 !== a.wireframeLinecap && (d.wireframeLinecap = a.wireframeLinecap)
      void 0 !== a.wireframeLinejoin &&
        (d.wireframeLinejoin = a.wireframeLinejoin)
      void 0 !== a.rotation && (d.rotation = a.rotation)
      1 !== a.linewidth && (d.linewidth = a.linewidth)
      void 0 !== a.dashSize && (d.dashSize = a.dashSize)
      void 0 !== a.gapSize && (d.gapSize = a.gapSize)
      void 0 !== a.scale && (d.scale = a.scale)
      void 0 !== a.polygonOffset && (d.polygonOffset = a.polygonOffset)
      void 0 !== a.polygonOffsetFactor &&
        (d.polygonOffsetFactor = a.polygonOffsetFactor)
      void 0 !== a.polygonOffsetUnits &&
        (d.polygonOffsetUnits = a.polygonOffsetUnits)
      void 0 !== a.skinning && (d.skinning = a.skinning)
      void 0 !== a.morphTargets && (d.morphTargets = a.morphTargets)
      void 0 !== a.morphNormals && (d.morphNormals = a.morphNormals)
      void 0 !== a.dithering && (d.dithering = a.dithering)
      void 0 !== a.visible && (d.visible = a.visible)
      void 0 !== a.toneMapped && (d.toneMapped = a.toneMapped)
      void 0 !== a.userData && (d.userData = a.userData)
      if (void 0 !== a.uniforms)
        for (var f in a.uniforms) {
          var g = a.uniforms[f]
          d.uniforms[f] = {}
          switch (g.type) {
            case 't':
              d.uniforms[f].value = b(g.value)
              break
            case 'c':
              d.uniforms[f].value = new D().setHex(g.value)
              break
            case 'v2':
              d.uniforms[f].value = new z().fromArray(g.value)
              break
            case 'v3':
              d.uniforms[f].value = new q().fromArray(g.value)
              break
            case 'v4':
              d.uniforms[f].value = new ca().fromArray(g.value)
              break
            case 'm3':
              d.uniforms[f].value = new ka().fromArray(g.value)
            case 'm4':
              d.uniforms[f].value = new I().fromArray(g.value)
              break
            default:
              d.uniforms[f].value = g.value
          }
        }
      void 0 !== a.defines && (d.defines = a.defines)
      void 0 !== a.vertexShader && (d.vertexShader = a.vertexShader)
      void 0 !== a.fragmentShader && (d.fragmentShader = a.fragmentShader)
      if (void 0 !== a.extensions)
        for (var k in a.extensions) d.extensions[k] = a.extensions[k]
      void 0 !== a.shading && (d.flatShading = 1 === a.shading)
      void 0 !== a.size && (d.size = a.size)
      void 0 !== a.sizeAttenuation && (d.sizeAttenuation = a.sizeAttenuation)
      void 0 !== a.map && (d.map = b(a.map))
      void 0 !== a.matcap && (d.matcap = b(a.matcap))
      void 0 !== a.alphaMap &&
        ((d.alphaMap = b(a.alphaMap)), (d.transparent = !0))
      void 0 !== a.bumpMap && (d.bumpMap = b(a.bumpMap))
      void 0 !== a.bumpScale && (d.bumpScale = a.bumpScale)
      void 0 !== a.normalMap && (d.normalMap = b(a.normalMap))
      void 0 !== a.normalMapType && (d.normalMapType = a.normalMapType)
      void 0 !== a.normalScale &&
        ((f = a.normalScale),
        !1 === Array.isArray(f) && (f = [f, f]),
        (d.normalScale = new z().fromArray(f)))
      void 0 !== a.displacementMap && (d.displacementMap = b(a.displacementMap))
      void 0 !== a.displacementScale &&
        (d.displacementScale = a.displacementScale)
      void 0 !== a.displacementBias && (d.displacementBias = a.displacementBias)
      void 0 !== a.roughnessMap && (d.roughnessMap = b(a.roughnessMap))
      void 0 !== a.metalnessMap && (d.metalnessMap = b(a.metalnessMap))
      void 0 !== a.emissiveMap && (d.emissiveMap = b(a.emissiveMap))
      void 0 !== a.emissiveIntensity &&
        (d.emissiveIntensity = a.emissiveIntensity)
      void 0 !== a.specularMap && (d.specularMap = b(a.specularMap))
      void 0 !== a.envMap && (d.envMap = b(a.envMap))
      void 0 !== a.envMapIntensity && (d.envMapIntensity = a.envMapIntensity)
      void 0 !== a.reflectivity && (d.reflectivity = a.reflectivity)
      void 0 !== a.refractionRatio && (d.refractionRatio = a.refractionRatio)
      void 0 !== a.lightMap && (d.lightMap = b(a.lightMap))
      void 0 !== a.lightMapIntensity &&
        (d.lightMapIntensity = a.lightMapIntensity)
      void 0 !== a.aoMap && (d.aoMap = b(a.aoMap))
      void 0 !== a.aoMapIntensity && (d.aoMapIntensity = a.aoMapIntensity)
      void 0 !== a.gradientMap && (d.gradientMap = b(a.gradientMap))
      void 0 !== a.clearcoatNormalMap &&
        (d.clearcoatNormalMap = b(a.clearcoatNormalMap))
      void 0 !== a.clearcoatNormalScale &&
        (d.clearcoatNormalScale = new z().fromArray(a.clearcoatNormalScale))
      return d
    },
    setTextures: function (a) {
      this.textures = a
      return this
    },
  })
  var Kh = {
    decodeText: function (a) {
      if ('undefined' !== typeof TextDecoder) return new TextDecoder().decode(a)
      for (var b = '', c = 0, d = a.length; c < d; c++)
        b += String.fromCharCode(a[c])
      try {
        return decodeURIComponent(escape(b))
      } catch (f) {
        return b
      }
    },
    extractUrlBase: function (a) {
      var b = a.lastIndexOf('/')
      return -1 === b ? './' : a.substr(0, b + 1)
    },
  }
  Bf.prototype = Object.assign(Object.create(G.prototype), {
    constructor: Bf,
    isInstancedBufferGeometry: !0,
    copy: function (a) {
      G.prototype.copy.call(this, a)
      this.maxInstancedCount = a.maxInstancedCount
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    toJSON: function () {
      var a = G.prototype.toJSON.call(this)
      a.maxInstancedCount = this.maxInstancedCount
      a.isInstancedBufferGeometry = !0
      return a
    },
  })
  Cf.prototype = Object.assign(Object.create(O.prototype), {
    constructor: Cf,
    isInstancedBufferAttribute: !0,
    copy: function (a) {
      O.prototype.copy.call(this, a)
      this.meshPerAttribute = a.meshPerAttribute
      return this
    },
    toJSON: function () {
      var a = O.prototype.toJSON.call(this)
      a.meshPerAttribute = this.meshPerAttribute
      a.isInstancedBufferAttribute = !0
      return a
    },
  })
  Df.prototype = Object.assign(Object.create(X.prototype), {
    constructor: Df,
    load: function (a, b, c, d) {
      var f = this,
        g = new Qa(f.manager)
      g.setPath(f.path)
      g.load(
        a,
        function (a) {
          b(f.parse(JSON.parse(a)))
        },
        c,
        d,
      )
    },
    parse: function (a) {
      var b = a.isInstancedBufferGeometry ? new Bf() : new G(),
        c = a.data.index
      if (void 0 !== c) {
        var d = new Lh[c.type](c.array)
        b.setIndex(new O(d, 1))
      }
      c = a.data.attributes
      for (var f in c) {
        var g = c[f]
        d = new Lh[g.type](g.array)
        d = new (g.isInstancedBufferAttribute ? Cf : O)(
          d,
          g.itemSize,
          g.normalized,
        )
        void 0 !== g.name && (d.name = g.name)
        b.setAttribute(f, d)
      }
      var k = a.data.morphAttributes
      if (k)
        for (f in k) {
          var m = k[f],
            l = []
          c = 0
          for (var p = m.length; c < p; c++)
            (g = m[c]),
              (d = new Lh[g.type](g.array)),
              (d = new O(d, g.itemSize, g.normalized)),
              void 0 !== g.name && (d.name = g.name),
              l.push(d)
          b.morphAttributes[f] = l
        }
      f = a.data.groups || a.data.drawcalls || a.data.offsets
      if (void 0 !== f)
        for (c = 0, g = f.length; c !== g; ++c)
          (d = f[c]), b.addGroup(d.start, d.count, d.materialIndex)
      c = a.data.boundingSphere
      void 0 !== c &&
        ((f = new q()),
        void 0 !== c.center && f.fromArray(c.center),
        (b.boundingSphere = new ub(f, c.radius)))
      a.name && (b.name = a.name)
      a.userData && (b.userData = a.userData)
      return b
    },
  })
  var Lh = {
    Int8Array: Int8Array,
    Uint8Array: Uint8Array,
    Uint8ClampedArray:
      'undefined' !== typeof Uint8ClampedArray ? Uint8ClampedArray : Uint8Array,
    Int16Array: Int16Array,
    Uint16Array: Uint16Array,
    Int32Array: Int32Array,
    Uint32Array: Uint32Array,
    Float32Array: Float32Array,
    Float64Array: Float64Array,
  }
  Ef.prototype = Object.assign(Object.create(X.prototype), {
    constructor: Ef,
    load: function (a, b, c, d) {
      var f = this,
        g = '' === this.path ? Kh.extractUrlBase(a) : this.path
      this.resourcePath = this.resourcePath || g
      g = new Qa(f.manager)
      g.setPath(this.path)
      g.load(
        a,
        function (c) {
          var g = null
          try {
            g = JSON.parse(c)
          } catch (n) {
            void 0 !== d && d(n)
            console.error(
              "THREE:ObjectLoader: Can't parse " + a + '.',
              n.message,
            )
            return
          }
          c = g.metadata
          void 0 === c ||
          void 0 === c.type ||
          'geometry' === c.type.toLowerCase()
            ? console.error("THREE.ObjectLoader: Can't load " + a)
            : f.parse(g, b)
        },
        c,
        d,
      )
    },
    parse: function (a, b) {
      var c = this.parseShape(a.shapes)
      c = this.parseGeometries(a.geometries, c)
      var d = this.parseImages(a.images, function () {
        void 0 !== b && b(f)
      })
      d = this.parseTextures(a.textures, d)
      d = this.parseMaterials(a.materials, d)
      var f = this.parseObject(a.object, c, d)
      a.animations && (f.animations = this.parseAnimations(a.animations))
      ;(void 0 !== a.images && 0 !== a.images.length) || void 0 === b || b(f)
      return f
    },
    parseShape: function (a) {
      var b = {}
      if (void 0 !== a)
        for (var c = 0, d = a.length; c < d; c++) {
          var f = new Pb().fromJSON(a[c])
          b[f.uuid] = f
        }
      return b
    },
    parseGeometries: function (a, b) {
      var c = {}
      if (void 0 !== a)
        for (var d = new Df(), f = 0, g = a.length; f < g; f++) {
          var k = a[f]
          switch (k.type) {
            case 'PlaneGeometry':
            case 'PlaneBufferGeometry':
              var m = new Ba[k.type](
                k.width,
                k.height,
                k.widthSegments,
                k.heightSegments,
              )
              break
            case 'BoxGeometry':
            case 'BoxBufferGeometry':
            case 'CubeGeometry':
              m = new Ba[k.type](
                k.width,
                k.height,
                k.depth,
                k.widthSegments,
                k.heightSegments,
                k.depthSegments,
              )
              break
            case 'CircleGeometry':
            case 'CircleBufferGeometry':
              m = new Ba[k.type](
                k.radius,
                k.segments,
                k.thetaStart,
                k.thetaLength,
              )
              break
            case 'CylinderGeometry':
            case 'CylinderBufferGeometry':
              m = new Ba[k.type](
                k.radiusTop,
                k.radiusBottom,
                k.height,
                k.radialSegments,
                k.heightSegments,
                k.openEnded,
                k.thetaStart,
                k.thetaLength,
              )
              break
            case 'ConeGeometry':
            case 'ConeBufferGeometry':
              m = new Ba[k.type](
                k.radius,
                k.height,
                k.radialSegments,
                k.heightSegments,
                k.openEnded,
                k.thetaStart,
                k.thetaLength,
              )
              break
            case 'SphereGeometry':
            case 'SphereBufferGeometry':
              m = new Ba[k.type](
                k.radius,
                k.widthSegments,
                k.heightSegments,
                k.phiStart,
                k.phiLength,
                k.thetaStart,
                k.thetaLength,
              )
              break
            case 'DodecahedronGeometry':
            case 'DodecahedronBufferGeometry':
            case 'IcosahedronGeometry':
            case 'IcosahedronBufferGeometry':
            case 'OctahedronGeometry':
            case 'OctahedronBufferGeometry':
            case 'TetrahedronGeometry':
            case 'TetrahedronBufferGeometry':
              m = new Ba[k.type](k.radius, k.detail)
              break
            case 'RingGeometry':
            case 'RingBufferGeometry':
              m = new Ba[k.type](
                k.innerRadius,
                k.outerRadius,
                k.thetaSegments,
                k.phiSegments,
                k.thetaStart,
                k.thetaLength,
              )
              break
            case 'TorusGeometry':
            case 'TorusBufferGeometry':
              m = new Ba[k.type](
                k.radius,
                k.tube,
                k.radialSegments,
                k.tubularSegments,
                k.arc,
              )
              break
            case 'TorusKnotGeometry':
            case 'TorusKnotBufferGeometry':
              m = new Ba[k.type](
                k.radius,
                k.tube,
                k.tubularSegments,
                k.radialSegments,
                k.p,
                k.q,
              )
              break
            case 'TubeGeometry':
            case 'TubeBufferGeometry':
              m = new Ba[k.type](
                new Jh[k.path.type]().fromJSON(k.path),
                k.tubularSegments,
                k.radius,
                k.radialSegments,
                k.closed,
              )
              break
            case 'LatheGeometry':
            case 'LatheBufferGeometry':
              m = new Ba[k.type](k.points, k.segments, k.phiStart, k.phiLength)
              break
            case 'PolyhedronGeometry':
            case 'PolyhedronBufferGeometry':
              m = new Ba[k.type](k.vertices, k.indices, k.radius, k.details)
              break
            case 'ShapeGeometry':
            case 'ShapeBufferGeometry':
              m = []
              for (var l = 0, p = k.shapes.length; l < p; l++) {
                var q = b[k.shapes[l]]
                m.push(q)
              }
              m = new Ba[k.type](m, k.curveSegments)
              break
            case 'ExtrudeGeometry':
            case 'ExtrudeBufferGeometry':
              m = []
              l = 0
              for (p = k.shapes.length; l < p; l++)
                (q = b[k.shapes[l]]), m.push(q)
              l = k.options.extrudePath
              void 0 !== l &&
                (k.options.extrudePath = new Jh[l.type]().fromJSON(l))
              m = new Ba[k.type](m, k.options)
              break
            case 'BufferGeometry':
            case 'InstancedBufferGeometry':
              m = d.parse(k)
              break
            case 'Geometry':
              'THREE' in kc && 'LegacyJSONLoader' in THREE
                ? (m = new THREE.LegacyJSONLoader().parse(k, this.resourcePath)
                    .geometry)
                : console.error(
                    'THREE.ObjectLoader: You have to import LegacyJSONLoader in order load geometry data of type "Geometry".',
                  )
              break
            default:
              console.warn(
                'THREE.ObjectLoader: Unsupported geometry type "' +
                  k.type +
                  '"',
              )
              continue
          }
          m.uuid = k.uuid
          void 0 !== k.name && (m.name = k.name)
          !0 === m.isBufferGeometry &&
            void 0 !== k.userData &&
            (m.userData = k.userData)
          c[k.uuid] = m
        }
      return c
    },
    parseMaterials: function (a, b) {
      var c = {},
        d = {}
      if (void 0 !== a) {
        var f = new Af()
        f.setTextures(b)
        b = 0
        for (var g = a.length; b < g; b++) {
          var k = a[b]
          if ('MultiMaterial' === k.type) {
            for (var m = [], l = 0; l < k.materials.length; l++) {
              var p = k.materials[l]
              void 0 === c[p.uuid] && (c[p.uuid] = f.parse(p))
              m.push(c[p.uuid])
            }
            d[k.uuid] = m
          } else
            void 0 === c[k.uuid] && (c[k.uuid] = f.parse(k)),
              (d[k.uuid] = c[k.uuid])
        }
      }
      return d
    },
    parseAnimations: function (a) {
      for (var b = [], c = 0; c < a.length; c++) {
        var d = a[c],
          f = Pa.parse(d)
        void 0 !== d.uuid && (f.uuid = d.uuid)
        b.push(f)
      }
      return b
    },
    parseImages: function (a, b) {
      function c(a) {
        d.manager.itemStart(a)
        return g.load(
          a,
          function () {
            d.manager.itemEnd(a)
          },
          void 0,
          function () {
            d.manager.itemError(a)
            d.manager.itemEnd(a)
          },
        )
      }
      var d = this,
        f = {}
      if (void 0 !== a && 0 < a.length) {
        b = new Og(b)
        var g = new pd(b)
        g.setCrossOrigin(this.crossOrigin)
        b = 0
        for (var k = a.length; b < k; b++) {
          var m = a[b],
            l = m.url
          if (Array.isArray(l)) {
            f[m.uuid] = []
            for (var p = 0, q = l.length; p < q; p++) {
              var t = l[p]
              t = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(t) ? t : d.resourcePath + t
              f[m.uuid].push(c(t))
            }
          } else
            (t = /^(\/\/)|([a-z]+:(\/\/)?)/i.test(m.url)
              ? m.url
              : d.resourcePath + m.url),
              (f[m.uuid] = c(t))
        }
      }
      return f
    },
    parseTextures: function (a, b) {
      function c(a, b) {
        if ('number' === typeof a) return a
        console.warn(
          'THREE.ObjectLoader.parseTexture: Constant should be in numeric form.',
          a,
        )
        return b[a]
      }
      var d = {}
      if (void 0 !== a)
        for (var f = 0, g = a.length; f < g; f++) {
          var k = a[f]
          void 0 === k.image &&
            console.warn('THREE.ObjectLoader: No "image" specified for', k.uuid)
          void 0 === b[k.image] &&
            console.warn('THREE.ObjectLoader: Undefined image', k.image)
          var m = Array.isArray(b[k.image])
            ? new vb(b[k.image])
            : new S(b[k.image])
          m.needsUpdate = !0
          m.uuid = k.uuid
          void 0 !== k.name && (m.name = k.name)
          void 0 !== k.mapping && (m.mapping = c(k.mapping, Ol))
          void 0 !== k.offset && m.offset.fromArray(k.offset)
          void 0 !== k.repeat && m.repeat.fromArray(k.repeat)
          void 0 !== k.center && m.center.fromArray(k.center)
          void 0 !== k.rotation && (m.rotation = k.rotation)
          void 0 !== k.wrap &&
            ((m.wrapS = c(k.wrap[0], yj)), (m.wrapT = c(k.wrap[1], yj)))
          void 0 !== k.format && (m.format = k.format)
          void 0 !== k.type && (m.type = k.type)
          void 0 !== k.encoding && (m.encoding = k.encoding)
          void 0 !== k.minFilter && (m.minFilter = c(k.minFilter, zj))
          void 0 !== k.magFilter && (m.magFilter = c(k.magFilter, zj))
          void 0 !== k.anisotropy && (m.anisotropy = k.anisotropy)
          void 0 !== k.flipY && (m.flipY = k.flipY)
          void 0 !== k.premultiplyAlpha &&
            (m.premultiplyAlpha = k.premultiplyAlpha)
          void 0 !== k.unpackAlignment &&
            (m.unpackAlignment = k.unpackAlignment)
          d[k.uuid] = m
        }
      return d
    },
    parseObject: function (a, b, c) {
      function d(a) {
        void 0 === b[a] &&
          console.warn('THREE.ObjectLoader: Undefined geometry', a)
        return b[a]
      }
      function f(a) {
        if (void 0 !== a) {
          if (Array.isArray(a)) {
            for (var b = [], d = 0, f = a.length; d < f; d++) {
              var g = a[d]
              void 0 === c[g] &&
                console.warn('THREE.ObjectLoader: Undefined material', g)
              b.push(c[g])
            }
            return b
          }
          void 0 === c[a] &&
            console.warn('THREE.ObjectLoader: Undefined material', a)
          return c[a]
        }
      }
      switch (a.type) {
        case 'Scene':
          var g = new Kd()
          void 0 !== a.background &&
            Number.isInteger(a.background) &&
            (g.background = new D(a.background))
          void 0 !== a.fog &&
            ('Fog' === a.fog.type
              ? (g.fog = new df(a.fog.color, a.fog.near, a.fog.far))
              : 'FogExp2' === a.fog.type &&
                (g.fog = new cf(a.fog.color, a.fog.density)))
          break
        case 'PerspectiveCamera':
          g = new na(a.fov, a.aspect, a.near, a.far)
          void 0 !== a.focus && (g.focus = a.focus)
          void 0 !== a.zoom && (g.zoom = a.zoom)
          void 0 !== a.filmGauge && (g.filmGauge = a.filmGauge)
          void 0 !== a.filmOffset && (g.filmOffset = a.filmOffset)
          void 0 !== a.view && (g.view = Object.assign({}, a.view))
          break
        case 'OrthographicCamera':
          g = new De(a.left, a.right, a.top, a.bottom, a.near, a.far)
          void 0 !== a.zoom && (g.zoom = a.zoom)
          void 0 !== a.view && (g.view = Object.assign({}, a.view))
          break
        case 'AmbientLight':
          g = new yf(a.color, a.intensity)
          break
        case 'DirectionalLight':
          g = new xf(a.color, a.intensity)
          break
        case 'PointLight':
          g = new vf(a.color, a.intensity, a.distance, a.decay)
          break
        case 'RectAreaLight':
          g = new zf(a.color, a.intensity, a.width, a.height)
          break
        case 'SpotLight':
          g = new uf(
            a.color,
            a.intensity,
            a.distance,
            a.angle,
            a.penumbra,
            a.decay,
          )
          break
        case 'HemisphereLight':
          g = new sf(a.color, a.groundColor, a.intensity)
          break
        case 'SkinnedMesh':
          console.warn(
            'THREE.ObjectLoader.parseObject() does not support SkinnedMesh yet.',
          )
        case 'Mesh':
          g = d(a.geometry)
          var k = f(a.material)
          g = g.bones && 0 < g.bones.length ? new ce(g, k) : new ia(g, k)
          break
        case 'InstancedMesh':
          g = d(a.geometry)
          k = f(a.material)
          var m = a.instanceMatrix
          g = new gf(g, k, a.count)
          g.instanceMatrix = new O(new Float32Array(m.array), 16)
          break
        case 'LOD':
          g = new be()
          break
        case 'Line':
          g = new pa(d(a.geometry), f(a.material), a.mode)
          break
        case 'LineLoop':
          g = new hf(d(a.geometry), f(a.material))
          break
        case 'LineSegments':
          g = new Z(d(a.geometry), f(a.material))
          break
        case 'PointCloud':
        case 'Points':
          g = new Yc(d(a.geometry), f(a.material))
          break
        case 'Sprite':
          g = new $d(f(a.material))
          break
        case 'Group':
          g = new Vc()
          break
        default:
          g = new E()
      }
      g.uuid = a.uuid
      void 0 !== a.name && (g.name = a.name)
      void 0 !== a.matrix
        ? (g.matrix.fromArray(a.matrix),
          void 0 !== a.matrixAutoUpdate &&
            (g.matrixAutoUpdate = a.matrixAutoUpdate),
          g.matrixAutoUpdate &&
            g.matrix.decompose(g.position, g.quaternion, g.scale))
        : (void 0 !== a.position && g.position.fromArray(a.position),
          void 0 !== a.rotation && g.rotation.fromArray(a.rotation),
          void 0 !== a.quaternion && g.quaternion.fromArray(a.quaternion),
          void 0 !== a.scale && g.scale.fromArray(a.scale))
      void 0 !== a.castShadow && (g.castShadow = a.castShadow)
      void 0 !== a.receiveShadow && (g.receiveShadow = a.receiveShadow)
      a.shadow &&
        (void 0 !== a.shadow.bias && (g.shadow.bias = a.shadow.bias),
        void 0 !== a.shadow.radius && (g.shadow.radius = a.shadow.radius),
        void 0 !== a.shadow.mapSize &&
          g.shadow.mapSize.fromArray(a.shadow.mapSize),
        void 0 !== a.shadow.camera &&
          (g.shadow.camera = this.parseObject(a.shadow.camera)))
      void 0 !== a.visible && (g.visible = a.visible)
      void 0 !== a.frustumCulled && (g.frustumCulled = a.frustumCulled)
      void 0 !== a.renderOrder && (g.renderOrder = a.renderOrder)
      void 0 !== a.userData && (g.userData = a.userData)
      void 0 !== a.layers && (g.layers.mask = a.layers)
      void 0 !== a.drawMode && g.setDrawMode(a.drawMode)
      if (void 0 !== a.children)
        for (m = a.children, k = 0; k < m.length; k++)
          g.add(this.parseObject(m[k], b, c))
      if ('LOD' === a.type)
        for (a = a.levels, m = 0; m < a.length; m++) {
          k = a[m]
          var l = g.getObjectByProperty('uuid', k.object)
          void 0 !== l && g.addLevel(l, k.distance)
        }
      return g
    },
  })
  var Ol = {
      UVMapping: 300,
      CubeReflectionMapping: 301,
      CubeRefractionMapping: 302,
      EquirectangularReflectionMapping: 303,
      EquirectangularRefractionMapping: 304,
      SphericalReflectionMapping: 305,
      CubeUVReflectionMapping: 306,
      CubeUVRefractionMapping: 307,
    },
    yj = {
      RepeatWrapping: 1e3,
      ClampToEdgeWrapping: 1001,
      MirroredRepeatWrapping: 1002,
    },
    zj = {
      NearestFilter: 1003,
      NearestMipmapNearestFilter: 1004,
      NearestMipmapLinearFilter: 1005,
      LinearFilter: 1006,
      LinearMipmapNearestFilter: 1007,
      LinearMipmapLinearFilter: 1008,
    }
  Tg.prototype = Object.assign(Object.create(X.prototype), {
    constructor: Tg,
    setOptions: function (a) {
      this.options = a
      return this
    },
    load: function (a, b, c, d) {
      void 0 === a && (a = '')
      void 0 !== this.path && (a = this.path + a)
      a = this.manager.resolveURL(a)
      var f = this,
        g = Fc.get(a)
      if (void 0 !== g)
        return (
          f.manager.itemStart(a),
          setTimeout(function () {
            b && b(g)
            f.manager.itemEnd(a)
          }, 0),
          g
        )
      fetch(a)
        .then(function (a) {
          return a.blob()
        })
        .then(function (a) {
          return void 0 === f.options
            ? createImageBitmap(a)
            : createImageBitmap(a, f.options)
        })
        .then(function (c) {
          Fc.add(a, c)
          b && b(c)
          f.manager.itemEnd(a)
        })
        .catch(function (b) {
          d && d(b)
          f.manager.itemError(a)
          f.manager.itemEnd(a)
        })
      f.manager.itemStart(a)
    },
  })
  Object.assign(Ug.prototype, {
    moveTo: function (a, b) {
      this.currentPath = new ab()
      this.subPaths.push(this.currentPath)
      this.currentPath.moveTo(a, b)
      return this
    },
    lineTo: function (a, b) {
      this.currentPath.lineTo(a, b)
      return this
    },
    quadraticCurveTo: function (a, b, c, d) {
      this.currentPath.quadraticCurveTo(a, b, c, d)
      return this
    },
    bezierCurveTo: function (a, b, c, d, f, g) {
      this.currentPath.bezierCurveTo(a, b, c, d, f, g)
      return this
    },
    splineThru: function (a) {
      this.currentPath.splineThru(a)
      return this
    },
    toShapes: function (a, b) {
      function c(a) {
        for (var b = [], c = 0, d = a.length; c < d; c++) {
          var f = a[c],
            g = new Pb()
          g.curves = f.curves
          b.push(g)
        }
        return b
      }
      function d(a, b) {
        for (var c = b.length, d = !1, f = c - 1, g = 0; g < c; f = g++) {
          var k = b[f],
            m = b[g],
            l = m.x - k.x,
            n = m.y - k.y
          if (Math.abs(n) > Number.EPSILON) {
            if (
              (0 > n && ((k = b[g]), (l = -l), (m = b[f]), (n = -n)),
              !(a.y < k.y || a.y > m.y))
            )
              if (a.y === k.y) {
                if (a.x === k.x) return !0
              } else {
                f = n * (a.x - k.x) - l * (a.y - k.y)
                if (0 === f) return !0
                0 > f || (d = !d)
              }
          } else if (
            a.y === k.y &&
            ((m.x <= a.x && a.x <= k.x) || (k.x <= a.x && a.x <= m.x))
          )
            return !0
        }
        return d
      }
      var f = xb.isClockWise,
        g = this.subPaths
      if (0 === g.length) return []
      if (!0 === b) return c(g)
      b = []
      if (1 === g.length) {
        var k = g[0]
        var m = new Pb()
        m.curves = k.curves
        b.push(m)
        return b
      }
      var l = !f(g[0].getPoints())
      l = a ? !l : l
      m = []
      var p = [],
        q = [],
        t = 0
      p[t] = void 0
      q[t] = []
      for (var r = 0, u = g.length; r < u; r++) {
        k = g[r]
        var v = k.getPoints()
        var w = f(v)
        ;(w = a ? !w : w)
          ? (!l && p[t] && t++,
            (p[t] = { s: new Pb(), p: v }),
            (p[t].s.curves = k.curves),
            l && t++,
            (q[t] = []))
          : q[t].push({ h: k, p: v[0] })
      }
      if (!p[0]) return c(g)
      if (1 < p.length) {
        r = !1
        a = []
        f = 0
        for (g = p.length; f < g; f++) m[f] = []
        f = 0
        for (g = p.length; f < g; f++)
          for (k = q[f], w = 0; w < k.length; w++) {
            l = k[w]
            t = !0
            for (v = 0; v < p.length; v++)
              d(l.p, p[v].p) &&
                (f !== v && a.push({ froms: f, tos: v, hole: w }),
                t ? ((t = !1), m[v].push(l)) : (r = !0))
            t && m[f].push(l)
          }
        0 < a.length && (r || (q = m))
      }
      r = 0
      for (f = p.length; r < f; r++)
        for (m = p[r].s, b.push(m), a = q[r], g = 0, k = a.length; g < k; g++)
          m.holes.push(a[g].h)
      return b
    },
  })
  Object.assign(Vg.prototype, {
    isFont: !0,
    generateShapes: function (a, b) {
      void 0 === b && (b = 100)
      var c = [],
        d = b
      b = this.data
      var f = Array.from ? Array.from(a) : String(a).split('')
      d /= b.resolution
      var g =
        (b.boundingBox.yMax - b.boundingBox.yMin + b.underlineThickness) * d
      a = []
      for (var k = 0, m = 0, l = 0; l < f.length; l++) {
        var p = f[l]
        if ('\n' === p) (k = 0), (m -= g)
        else {
          var q = p
          p = d
          var t = k,
            r = m,
            u = b,
            v = u.glyphs[q] || u.glyphs['?']
          if (v) {
            q = new Ug()
            if (v.o) {
              u = v._cachedOutline || (v._cachedOutline = v.o.split(' '))
              for (var w = 0, x = u.length; w < x; )
                switch (u[w++]) {
                  case 'm':
                    var B = u[w++] * p + t
                    var z = u[w++] * p + r
                    q.moveTo(B, z)
                    break
                  case 'l':
                    B = u[w++] * p + t
                    z = u[w++] * p + r
                    q.lineTo(B, z)
                    break
                  case 'q':
                    var A = u[w++] * p + t
                    var D = u[w++] * p + r
                    var E = u[w++] * p + t
                    var F = u[w++] * p + r
                    q.quadraticCurveTo(E, F, A, D)
                    break
                  case 'b':
                    ;(A = u[w++] * p + t),
                      (D = u[w++] * p + r),
                      (E = u[w++] * p + t),
                      (F = u[w++] * p + r),
                      (B = u[w++] * p + t),
                      (z = u[w++] * p + r),
                      q.bezierCurveTo(E, F, B, z, A, D)
                }
            }
            p = { offsetX: v.ha * p, path: q }
          } else
            console.error(
              'THREE.Font: character "' +
                q +
                '" does not exists in font family ' +
                u.familyName +
                '.',
            ),
              (p = void 0)
          k += p.offsetX
          a.push(p.path)
        }
      }
      b = 0
      for (f = a.length; b < f; b++)
        Array.prototype.push.apply(c, a[b].toShapes())
      return c
    },
  })
  Wg.prototype = Object.assign(Object.create(X.prototype), {
    constructor: Wg,
    load: function (a, b, c, d) {
      var f = this,
        g = new Qa(this.manager)
      g.setPath(this.path)
      g.load(
        a,
        function (a) {
          try {
            var c = JSON.parse(a)
          } catch (n) {
            console.warn(
              'THREE.FontLoader: typeface.js support is being deprecated. Use typeface.json instead.',
            ),
              (c = JSON.parse(a.substring(65, a.length - 2)))
          }
          a = f.parse(c)
          b && b(a)
        },
        c,
        d,
      )
    },
    parse: function (a) {
      return new Vg(a)
    },
  })
  var gg,
    ah = {
      getContext: function () {
        void 0 === gg && (gg = new null())
        return gg
      },
      setContext: function (a) {
        gg = a
      },
    }
  Ff.prototype = Object.assign(Object.create(X.prototype), {
    constructor: Ff,
    load: function (a, b, c, d) {
      var f = new Qa(this.manager)
      f.setResponseType('arraybuffer')
      f.setPath(this.path)
      f.load(
        a,
        function (a) {
          a = a.slice(0)
          ah.getContext().decodeAudioData(a, function (a) {
            b(a)
          })
        },
        c,
        d,
      )
    },
  })
  Object.assign(Gf.prototype, {
    isSphericalHarmonics3: !0,
    set: function (a) {
      for (var b = 0; 9 > b; b++) this.coefficients[b].copy(a[b])
      return this
    },
    zero: function () {
      for (var a = 0; 9 > a; a++) this.coefficients[a].set(0, 0, 0)
      return this
    },
    getAt: function (a, b) {
      var c = a.x,
        d = a.y
      a = a.z
      var f = this.coefficients
      b.copy(f[0]).multiplyScalar(0.282095)
      b.addScale(f[1], 0.488603 * d)
      b.addScale(f[2], 0.488603 * a)
      b.addScale(f[3], 0.488603 * c)
      b.addScale(f[4], 1.092548 * c * d)
      b.addScale(f[5], 1.092548 * d * a)
      b.addScale(f[6], 0.315392 * (3 * a * a - 1))
      b.addScale(f[7], 1.092548 * c * a)
      b.addScale(f[8], 0.546274 * (c * c - d * d))
      return b
    },
    getIrradianceAt: function (a, b) {
      var c = a.x,
        d = a.y
      a = a.z
      var f = this.coefficients
      b.copy(f[0]).multiplyScalar(0.886227)
      b.addScale(f[1], 1.023328 * d)
      b.addScale(f[2], 1.023328 * a)
      b.addScale(f[3], 1.023328 * c)
      b.addScale(f[4], 0.858086 * c * d)
      b.addScale(f[5], 0.858086 * d * a)
      b.addScale(f[6], 0.743125 * a * a - 0.247708)
      b.addScale(f[7], 0.858086 * c * a)
      b.addScale(f[8], 0.429043 * (c * c - d * d))
      return b
    },
    add: function (a) {
      for (var b = 0; 9 > b; b++) this.coefficients[b].add(a.coefficients[b])
      return this
    },
    scale: function (a) {
      for (var b = 0; 9 > b; b++) this.coefficients[b].multiplyScalar(a)
      return this
    },
    lerp: function (a, b) {
      for (var c = 0; 9 > c; c++)
        this.coefficients[c].lerp(a.coefficients[c], b)
      return this
    },
    equals: function (a) {
      for (var b = 0; 9 > b; b++)
        if (!this.coefficients[b].equals(a.coefficients[b])) return !1
      return !0
    },
    copy: function (a) {
      return this.set(a.coefficients)
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    fromArray: function (a, b) {
      void 0 === b && (b = 0)
      for (var c = this.coefficients, d = 0; 9 > d; d++)
        c[d].fromArray(a, b + 3 * d)
      return this
    },
    toArray: function (a, b) {
      void 0 === a && (a = [])
      void 0 === b && (b = 0)
      for (var c = this.coefficients, d = 0; 9 > d; d++)
        c[d].toArray(a, b + 3 * d)
      return a
    },
  })
  Object.assign(Gf, {
    getBasisAt: function (a, b) {
      var c = a.x,
        d = a.y
      a = a.z
      b[0] = 0.282095
      b[1] = 0.488603 * d
      b[2] = 0.488603 * a
      b[3] = 0.488603 * c
      b[4] = 1.092548 * c * d
      b[5] = 1.092548 * d * a
      b[6] = 0.315392 * (3 * a * a - 1)
      b[7] = 1.092548 * c * a
      b[8] = 0.546274 * (c * c - d * d)
    },
  })
  bb.prototype = Object.assign(Object.create(da.prototype), {
    constructor: bb,
    isLightProbe: !0,
    copy: function (a) {
      da.prototype.copy.call(this, a)
      this.sh.copy(a.sh)
      this.intensity = a.intensity
      return this
    },
    toJSON: function (a) {
      return da.prototype.toJSON.call(this, a)
    },
  })
  Xg.prototype = Object.assign(Object.create(bb.prototype), {
    constructor: Xg,
    isHemisphereLightProbe: !0,
    copy: function (a) {
      bb.prototype.copy.call(this, a)
      return this
    },
    toJSON: function (a) {
      return bb.prototype.toJSON.call(this, a)
    },
  })
  Yg.prototype = Object.assign(Object.create(bb.prototype), {
    constructor: Yg,
    isAmbientLightProbe: !0,
    copy: function (a) {
      bb.prototype.copy.call(this, a)
      return this
    },
    toJSON: function (a) {
      return bb.prototype.toJSON.call(this, a)
    },
  })
  var Aj = new I(),
    Bj = new I()
  Object.assign(Ni.prototype, {
    update: function (a) {
      var b = this._cache
      if (
        b.focus !== a.focus ||
        b.fov !== a.fov ||
        b.aspect !== a.aspect * this.aspect ||
        b.near !== a.near ||
        b.far !== a.far ||
        b.zoom !== a.zoom ||
        b.eyeSep !== this.eyeSep
      ) {
        b.focus = a.focus
        b.fov = a.fov
        b.aspect = a.aspect * this.aspect
        b.near = a.near
        b.far = a.far
        b.zoom = a.zoom
        b.eyeSep = this.eyeSep
        var c = a.projectionMatrix.clone(),
          d = b.eyeSep / 2,
          f = (d * b.near) / b.focus,
          g = (b.near * Math.tan(N.DEG2RAD * b.fov * 0.5)) / b.zoom
        Bj.elements[12] = -d
        Aj.elements[12] = d
        d = -g * b.aspect + f
        var k = g * b.aspect + f
        c.elements[0] = (2 * b.near) / (k - d)
        c.elements[8] = (k + d) / (k - d)
        this.cameraL.projectionMatrix.copy(c)
        d = -g * b.aspect - f
        k = g * b.aspect - f
        c.elements[0] = (2 * b.near) / (k - d)
        c.elements[8] = (k + d) / (k - d)
        this.cameraR.projectionMatrix.copy(c)
      }
      this.cameraL.matrixWorld.copy(a.matrixWorld).multiply(Bj)
      this.cameraR.matrixWorld.copy(a.matrixWorld).multiply(Aj)
    },
  })
  Object.assign(Zg.prototype, {
    start: function () {
      this.oldTime = this.startTime = ('undefined' === typeof performance
        ? Date
        : performance
      ).now()
      this.elapsedTime = 0
      this.running = !0
    },
    stop: function () {
      this.getElapsedTime()
      this.autoStart = this.running = !1
    },
    getElapsedTime: function () {
      this.getDelta()
      return this.elapsedTime
    },
    getDelta: function () {
      var a = 0
      if (this.autoStart && !this.running) return this.start(), 0
      if (this.running) {
        var b = ('undefined' === typeof performance ? Date : performance).now()
        a = (b - this.oldTime) / 1e3
        this.oldTime = b
        this.elapsedTime += a
      }
      return a
    },
  })
  var Gc = new q(),
    Cj = new ya(),
    Pl = new q(),
    Hc = new q()
  $g.prototype = Object.assign(Object.create(E.prototype), {
    constructor: $g,
    getInput: function () {
      return this.gain
    },
    removeFilter: function () {
      null !== this.filter &&
        (this.gain.disconnect(this.filter),
        this.filter.disconnect(this.context.destination),
        this.gain.connect(this.context.destination),
        (this.filter = null))
      return this
    },
    getFilter: function () {
      return this.filter
    },
    setFilter: function (a) {
      null !== this.filter
        ? (this.gain.disconnect(this.filter),
          this.filter.disconnect(this.context.destination))
        : this.gain.disconnect(this.context.destination)
      this.filter = a
      this.gain.connect(this.filter)
      this.filter.connect(this.context.destination)
      return this
    },
    getMasterVolume: function () {
      return this.gain.gain.value
    },
    setMasterVolume: function (a) {
      this.gain.gain.setTargetAtTime(a, this.context.currentTime, 0.01)
      return this
    },
    updateMatrixWorld: function (a) {
      E.prototype.updateMatrixWorld.call(this, a)
      a = this.context.listener
      var b = this.up
      this.timeDelta = this._clock.getDelta()
      this.matrixWorld.decompose(Gc, Cj, Pl)
      Hc.set(0, 0, -1).applyQuaternion(Cj)
      if (a.positionX) {
        var c = this.context.currentTime + this.timeDelta
        a.positionX.linearRampToValueAtTime(Gc.x, c)
        a.positionY.linearRampToValueAtTime(Gc.y, c)
        a.positionZ.linearRampToValueAtTime(Gc.z, c)
        a.forwardX.linearRampToValueAtTime(Hc.x, c)
        a.forwardY.linearRampToValueAtTime(Hc.y, c)
        a.forwardZ.linearRampToValueAtTime(Hc.z, c)
        a.upX.linearRampToValueAtTime(b.x, c)
        a.upY.linearRampToValueAtTime(b.y, c)
        a.upZ.linearRampToValueAtTime(b.z, c)
      } else
        a.setPosition(Gc.x, Gc.y, Gc.z),
          a.setOrientation(Hc.x, Hc.y, Hc.z, b.x, b.y, b.z)
    },
  })
  rd.prototype = Object.assign(Object.create(E.prototype), {
    constructor: rd,
    getOutput: function () {
      return this.gain
    },
    setNodeSource: function (a) {
      this.hasPlaybackControl = !1
      this.sourceType = 'audioNode'
      this.source = a
      this.connect()
      return this
    },
    setMediaElementSource: function (a) {
      this.hasPlaybackControl = !1
      this.sourceType = 'mediaNode'
      this.source = this.context.createMediaElementSource(a)
      this.connect()
      return this
    },
    setMediaStreamSource: function (a) {
      this.hasPlaybackControl = !1
      this.sourceType = 'mediaStreamNode'
      this.source = this.context.createMediaStreamSource(a)
      this.connect()
      return this
    },
    setBuffer: function (a) {
      this.buffer = a
      this.sourceType = 'buffer'
      this.autoplay && this.play()
      return this
    },
    play: function (a) {
      void 0 === a && (a = 0)
      if (!0 === this.isPlaying)
        console.warn('THREE.Audio: Audio is already playing.')
      else if (!1 === this.hasPlaybackControl)
        console.warn('THREE.Audio: this Audio has no playback control.')
      else
        return (
          (this._startedAt = this.context.currentTime + a),
          (a = this.context.createBufferSource()),
          (a.buffer = this.buffer),
          (a.loop = this.loop),
          (a.loopStart = this.loopStart),
          (a.loopEnd = this.loopEnd),
          (a.onended = this.onEnded.bind(this)),
          a.start(this._startedAt, this._pausedAt + this.offset, this.duration),
          (this.isPlaying = !0),
          (this.source = a),
          this.setDetune(this.detune),
          this.setPlaybackRate(this.playbackRate),
          this.connect()
        )
    },
    pause: function () {
      if (!1 === this.hasPlaybackControl)
        console.warn('THREE.Audio: this Audio has no playback control.')
      else
        return (
          !0 === this.isPlaying &&
            ((this._pausedAt =
              (this.context.currentTime - this._startedAt) * this.playbackRate),
            this.source.stop(),
            (this.source.onended = null),
            (this.isPlaying = !1)),
          this
        )
    },
    stop: function () {
      if (!1 === this.hasPlaybackControl)
        console.warn('THREE.Audio: this Audio has no playback control.')
      else
        return (
          (this._pausedAt = 0),
          this.source.stop(),
          (this.source.onended = null),
          (this.isPlaying = !1),
          this
        )
    },
    connect: function () {
      if (0 < this.filters.length) {
        this.source.connect(this.filters[0])
        for (var a = 1, b = this.filters.length; a < b; a++)
          this.filters[a - 1].connect(this.filters[a])
        this.filters[this.filters.length - 1].connect(this.getOutput())
      } else this.source.connect(this.getOutput())
      return this
    },
    disconnect: function () {
      if (0 < this.filters.length) {
        this.source.disconnect(this.filters[0])
        for (var a = 1, b = this.filters.length; a < b; a++)
          this.filters[a - 1].disconnect(this.filters[a])
        this.filters[this.filters.length - 1].disconnect(this.getOutput())
      } else this.source.disconnect(this.getOutput())
      return this
    },
    getFilters: function () {
      return this.filters
    },
    setFilters: function (a) {
      a || (a = [])
      !0 === this.isPlaying
        ? (this.disconnect(), (this.filters = a), this.connect())
        : (this.filters = a)
      return this
    },
    setDetune: function (a) {
      this.detune = a
      if (void 0 !== this.source.detune)
        return (
          !0 === this.isPlaying &&
            this.source.detune.setTargetAtTime(
              this.detune,
              this.context.currentTime,
              0.01,
            ),
          this
        )
    },
    getDetune: function () {
      return this.detune
    },
    getFilter: function () {
      return this.getFilters()[0]
    },
    setFilter: function (a) {
      return this.setFilters(a ? [a] : [])
    },
    setPlaybackRate: function (a) {
      if (!1 === this.hasPlaybackControl)
        console.warn('THREE.Audio: this Audio has no playback control.')
      else
        return (
          (this.playbackRate = a),
          !0 === this.isPlaying &&
            this.source.playbackRate.setTargetAtTime(
              this.playbackRate,
              this.context.currentTime,
              0.01,
            ),
          this
        )
    },
    getPlaybackRate: function () {
      return this.playbackRate
    },
    onEnded: function () {
      this.isPlaying = !1
    },
    getLoop: function () {
      return !1 === this.hasPlaybackControl
        ? (console.warn('THREE.Audio: this Audio has no playback control.'), !1)
        : this.loop
    },
    setLoop: function (a) {
      if (!1 === this.hasPlaybackControl)
        console.warn('THREE.Audio: this Audio has no playback control.')
      else
        return (
          (this.loop = a),
          !0 === this.isPlaying && (this.source.loop = this.loop),
          this
        )
    },
    setLoopStart: function (a) {
      this.loopStart = a
      return this
    },
    setLoopEnd: function (a) {
      this.loopEnd = a
      return this
    },
    getVolume: function () {
      return this.gain.gain.value
    },
    setVolume: function (a) {
      this.gain.gain.setTargetAtTime(a, this.context.currentTime, 0.01)
      return this
    },
  })
  var Ic = new q(),
    Dj = new ya(),
    Ql = new q(),
    Jc = new q()
  bh.prototype = Object.assign(Object.create(rd.prototype), {
    constructor: bh,
    getOutput: function () {
      return this.panner
    },
    getRefDistance: function () {
      return this.panner.refDistance
    },
    setRefDistance: function (a) {
      this.panner.refDistance = a
      return this
    },
    getRolloffFactor: function () {
      return this.panner.rolloffFactor
    },
    setRolloffFactor: function (a) {
      this.panner.rolloffFactor = a
      return this
    },
    getDistanceModel: function () {
      return this.panner.distanceModel
    },
    setDistanceModel: function (a) {
      this.panner.distanceModel = a
      return this
    },
    getMaxDistance: function () {
      return this.panner.maxDistance
    },
    setMaxDistance: function (a) {
      this.panner.maxDistance = a
      return this
    },
    setDirectionalCone: function (a, b, c) {
      this.panner.coneInnerAngle = a
      this.panner.coneOuterAngle = b
      this.panner.coneOuterGain = c
      return this
    },
    updateMatrixWorld: function (a) {
      E.prototype.updateMatrixWorld.call(this, a)
      if (!0 !== this.hasPlaybackControl || !1 !== this.isPlaying)
        if (
          (this.matrixWorld.decompose(Ic, Dj, Ql),
          Jc.set(0, 0, 1).applyQuaternion(Dj),
          (a = this.panner),
          a.positionX)
        ) {
          var b = this.context.currentTime + this.listener.timeDelta
          a.positionX.linearRampToValueAtTime(Ic.x, b)
          a.positionY.linearRampToValueAtTime(Ic.y, b)
          a.positionZ.linearRampToValueAtTime(Ic.z, b)
          a.orientationX.linearRampToValueAtTime(Jc.x, b)
          a.orientationY.linearRampToValueAtTime(Jc.y, b)
          a.orientationZ.linearRampToValueAtTime(Jc.z, b)
        } else
          a.setPosition(Ic.x, Ic.y, Ic.z), a.setOrientation(Jc.x, Jc.y, Jc.z)
    },
  })
  Object.assign(ch.prototype, {
    getFrequencyData: function () {
      this.analyser.getByteFrequencyData(this.data)
      return this.data
    },
    getAverageFrequency: function () {
      for (var a = 0, b = this.getFrequencyData(), c = 0; c < b.length; c++)
        a += b[c]
      return a / b.length
    },
  })
  Object.assign(dh.prototype, {
    accumulate: function (a, b) {
      var c = this.buffer,
        d = this.valueSize
      a = a * d + d
      var f = this.cumulativeWeight
      if (0 === f) {
        for (f = 0; f !== d; ++f) c[a + f] = c[f]
        f = b
      } else (f += b), this._mixBufferRegion(c, a, 0, b / f, d)
      this.cumulativeWeight = f
    },
    apply: function (a) {
      var b = this.valueSize,
        c = this.buffer
      a = a * b + b
      var d = this.cumulativeWeight,
        f = this.binding
      this.cumulativeWeight = 0
      1 > d && this._mixBufferRegion(c, a, 3 * b, 1 - d, b)
      d = b
      for (var g = b + b; d !== g; ++d)
        if (c[d] !== c[d + b]) {
          f.setValue(c, a)
          break
        }
    },
    saveOriginalState: function () {
      var a = this.buffer,
        b = this.valueSize,
        c = 3 * b
      this.binding.getValue(a, c)
      for (var d = b; d !== c; ++d) a[d] = a[c + (d % b)]
      this.cumulativeWeight = 0
    },
    restoreOriginalState: function () {
      this.binding.setValue(this.buffer, 3 * this.valueSize)
    },
    _select: function (a, b, c, d, f) {
      if (0.5 <= d) for (d = 0; d !== f; ++d) a[b + d] = a[c + d]
    },
    _slerp: function (a, b, c, d) {
      ya.slerpFlat(a, b, a, b, a, c, d)
    },
    _lerp: function (a, b, c, d, f) {
      for (var g = 1 - d, k = 0; k !== f; ++k) {
        var m = b + k
        a[m] = a[m] * g + a[c + k] * d
      }
    },
  })
  var Rl = /[\[\]\.:\/]/g,
    Sl = '[^' + '\\[\\]\\.:\\/'.replace('\\.', '') + ']',
    Tl = /((?:WC+[\/:])*)/.source.replace('WC', '[^\\[\\]\\.:\\/]'),
    Ul = /(WCOD+)?/.source.replace('WCOD', Sl),
    Vl = /(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace('WC', '[^\\[\\]\\.:\\/]'),
    Wl = /\.(WC+)(?:\[(.+)\])?/.source.replace('WC', '[^\\[\\]\\.:\\/]'),
    Xl = new RegExp('^' + Tl + Ul + Vl + Wl + '$'),
    Yl = ['material', 'materials', 'bones']
  Object.assign(Oi.prototype, {
    getValue: function (a, b) {
      this.bind()
      var c = this._bindings[this._targetGroup.nCachedObjects_]
      void 0 !== c && c.getValue(a, b)
    },
    setValue: function (a, b) {
      for (
        var c = this._bindings,
          d = this._targetGroup.nCachedObjects_,
          f = c.length;
        d !== f;
        ++d
      )
        c[d].setValue(a, b)
    },
    bind: function () {
      for (
        var a = this._bindings,
          b = this._targetGroup.nCachedObjects_,
          c = a.length;
        b !== c;
        ++b
      )
        a[b].bind()
    },
    unbind: function () {
      for (
        var a = this._bindings,
          b = this._targetGroup.nCachedObjects_,
          c = a.length;
        b !== c;
        ++b
      )
        a[b].unbind()
    },
  })
  Object.assign(ja, {
    Composite: Oi,
    create: function (a, b, c) {
      return a && a.isAnimationObjectGroup
        ? new ja.Composite(a, b, c)
        : new ja(a, b, c)
    },
    sanitizeNodeName: function (a) {
      return a.replace(/\s/g, '_').replace(Rl, '')
    },
    parseTrackName: function (a) {
      var b = Xl.exec(a)
      if (!b) throw Error('PropertyBinding: Cannot parse trackName: ' + a)
      b = {
        nodeName: b[2],
        objectName: b[3],
        objectIndex: b[4],
        propertyName: b[5],
        propertyIndex: b[6],
      }
      var c = b.nodeName && b.nodeName.lastIndexOf('.')
      if (void 0 !== c && -1 !== c) {
        var d = b.nodeName.substring(c + 1)
        ;-1 !== Yl.indexOf(d) &&
          ((b.nodeName = b.nodeName.substring(0, c)), (b.objectName = d))
      }
      if (null === b.propertyName || 0 === b.propertyName.length)
        throw Error(
          'PropertyBinding: can not parse propertyName from trackName: ' + a,
        )
      return b
    },
    findNode: function (a, b) {
      if (
        !b ||
        '' === b ||
        'root' === b ||
        '.' === b ||
        -1 === b ||
        b === a.name ||
        b === a.uuid
      )
        return a
      if (a.skeleton) {
        var c = a.skeleton.getBoneByName(b)
        if (void 0 !== c) return c
      }
      if (a.children) {
        var d = function (a) {
          for (var c = 0; c < a.length; c++) {
            var f = a[c]
            if (f.name === b || f.uuid === b || (f = d(f.children))) return f
          }
          return null
        }
        if ((a = d(a.children))) return a
      }
      return null
    },
  })
  Object.assign(ja.prototype, {
    _getValue_unavailable: function () {},
    _setValue_unavailable: function () {},
    BindingType: {
      Direct: 0,
      EntireArray: 1,
      ArrayElement: 2,
      HasFromToArray: 3,
    },
    Versioning: { None: 0, NeedsUpdate: 1, MatrixWorldNeedsUpdate: 2 },
    GetterByBindingType: [
      function (a, b) {
        a[b] = this.node[this.propertyName]
      },
      function (a, b) {
        for (var c = this.resolvedProperty, d = 0, f = c.length; d !== f; ++d)
          a[b++] = c[d]
      },
      function (a, b) {
        a[b] = this.resolvedProperty[this.propertyIndex]
      },
      function (a, b) {
        this.resolvedProperty.toArray(a, b)
      },
    ],
    SetterByBindingTypeAndVersioning: [
      [
        function (a, b) {
          this.targetObject[this.propertyName] = a[b]
        },
        function (a, b) {
          this.targetObject[this.propertyName] = a[b]
          this.targetObject.needsUpdate = !0
        },
        function (a, b) {
          this.targetObject[this.propertyName] = a[b]
          this.targetObject.matrixWorldNeedsUpdate = !0
        },
      ],
      [
        function (a, b) {
          for (var c = this.resolvedProperty, d = 0, f = c.length; d !== f; ++d)
            c[d] = a[b++]
        },
        function (a, b) {
          for (var c = this.resolvedProperty, d = 0, f = c.length; d !== f; ++d)
            c[d] = a[b++]
          this.targetObject.needsUpdate = !0
        },
        function (a, b) {
          for (var c = this.resolvedProperty, d = 0, f = c.length; d !== f; ++d)
            c[d] = a[b++]
          this.targetObject.matrixWorldNeedsUpdate = !0
        },
      ],
      [
        function (a, b) {
          this.resolvedProperty[this.propertyIndex] = a[b]
        },
        function (a, b) {
          this.resolvedProperty[this.propertyIndex] = a[b]
          this.targetObject.needsUpdate = !0
        },
        function (a, b) {
          this.resolvedProperty[this.propertyIndex] = a[b]
          this.targetObject.matrixWorldNeedsUpdate = !0
        },
      ],
      [
        function (a, b) {
          this.resolvedProperty.fromArray(a, b)
        },
        function (a, b) {
          this.resolvedProperty.fromArray(a, b)
          this.targetObject.needsUpdate = !0
        },
        function (a, b) {
          this.resolvedProperty.fromArray(a, b)
          this.targetObject.matrixWorldNeedsUpdate = !0
        },
      ],
    ],
    getValue: function (a, b) {
      this.bind()
      this.getValue(a, b)
    },
    setValue: function (a, b) {
      this.bind()
      this.setValue(a, b)
    },
    bind: function () {
      var a = this.node,
        b = this.parsedPath,
        c = b.objectName,
        d = b.propertyName,
        f = b.propertyIndex
      a ||
        (this.node = a =
          ja.findNode(this.rootNode, b.nodeName) || this.rootNode)
      this.getValue = this._getValue_unavailable
      this.setValue = this._setValue_unavailable
      if (a) {
        if (c) {
          var g = b.objectIndex
          switch (c) {
            case 'materials':
              if (!a.material) {
                console.error(
                  'THREE.PropertyBinding: Can not bind to material as node does not have a material.',
                  this,
                )
                return
              }
              if (!a.material.materials) {
                console.error(
                  'THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.',
                  this,
                )
                return
              }
              a = a.material.materials
              break
            case 'bones':
              if (!a.skeleton) {
                console.error(
                  'THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.',
                  this,
                )
                return
              }
              a = a.skeleton.bones
              for (c = 0; c < a.length; c++)
                if (a[c].name === g) {
                  g = c
                  break
                }
              break
            default:
              if (void 0 === a[c]) {
                console.error(
                  'THREE.PropertyBinding: Can not bind to objectName of node undefined.',
                  this,
                )
                return
              }
              a = a[c]
          }
          if (void 0 !== g) {
            if (void 0 === a[g]) {
              console.error(
                'THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.',
                this,
                a,
              )
              return
            }
            a = a[g]
          }
        }
        g = a[d]
        if (void 0 === g)
          console.error(
            'THREE.PropertyBinding: Trying to update property for track: ' +
              b.nodeName +
              '.' +
              d +
              " but it wasn't found.",
            a,
          )
        else {
          b = this.Versioning.None
          this.targetObject = a
          void 0 !== a.needsUpdate
            ? (b = this.Versioning.NeedsUpdate)
            : void 0 !== a.matrixWorldNeedsUpdate &&
              (b = this.Versioning.MatrixWorldNeedsUpdate)
          c = this.BindingType.Direct
          if (void 0 !== f) {
            if ('morphTargetInfluences' === d) {
              if (!a.geometry) {
                console.error(
                  'THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.',
                  this,
                )
                return
              }
              if (a.geometry.isBufferGeometry) {
                if (!a.geometry.morphAttributes) {
                  console.error(
                    'THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.',
                    this,
                  )
                  return
                }
                for (
                  c = 0;
                  c < this.node.geometry.morphAttributes.position.length;
                  c++
                )
                  if (a.geometry.morphAttributes.position[c].name === f) {
                    f = c
                    break
                  }
              } else {
                if (!a.geometry.morphTargets) {
                  console.error(
                    'THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphTargets.',
                    this,
                  )
                  return
                }
                for (c = 0; c < this.node.geometry.morphTargets.length; c++)
                  if (a.geometry.morphTargets[c].name === f) {
                    f = c
                    break
                  }
              }
            }
            c = this.BindingType.ArrayElement
            this.resolvedProperty = g
            this.propertyIndex = f
          } else
            void 0 !== g.fromArray && void 0 !== g.toArray
              ? ((c = this.BindingType.HasFromToArray),
                (this.resolvedProperty = g))
              : Array.isArray(g)
              ? ((c = this.BindingType.EntireArray),
                (this.resolvedProperty = g))
              : (this.propertyName = d)
          this.getValue = this.GetterByBindingType[c]
          this.setValue = this.SetterByBindingTypeAndVersioning[c][b]
        }
      } else
        console.error(
          'THREE.PropertyBinding: Trying to update node for track: ' +
            this.path +
            " but it wasn't found.",
        )
    },
    unbind: function () {
      this.node = null
      this.getValue = this._getValue_unbound
      this.setValue = this._setValue_unbound
    },
  })
  Object.assign(ja.prototype, {
    _getValue_unbound: ja.prototype.getValue,
    _setValue_unbound: ja.prototype.setValue,
  })
  Object.assign(Pi.prototype, {
    isAnimationObjectGroup: !0,
    add: function () {
      for (
        var a = this._objects,
          b = a.length,
          c = this.nCachedObjects_,
          d = this._indicesByUUID,
          f = this._paths,
          g = this._parsedPaths,
          k = this._bindings,
          m = k.length,
          l = void 0,
          p = 0,
          q = arguments.length;
        p !== q;
        ++p
      ) {
        var t = arguments[p],
          r = t.uuid,
          u = d[r]
        if (void 0 === u) {
          u = b++
          d[r] = u
          a.push(t)
          r = 0
          for (var v = m; r !== v; ++r) k[r].push(new ja(t, f[r], g[r]))
        } else if (u < c) {
          l = a[u]
          var w = --c
          v = a[w]
          d[v.uuid] = u
          a[u] = v
          d[r] = w
          a[w] = t
          r = 0
          for (v = m; r !== v; ++r) {
            var x = k[r],
              B = x[u]
            x[u] = x[w]
            void 0 === B && (B = new ja(t, f[r], g[r]))
            x[w] = B
          }
        } else
          a[u] !== l &&
            console.error(
              'THREE.AnimationObjectGroup: Different objects with the same UUID detected. Clean the caches or recreate your infrastructure when reloading scenes.',
            )
      }
      this.nCachedObjects_ = c
    },
    remove: function () {
      for (
        var a = this._objects,
          b = this.nCachedObjects_,
          c = this._indicesByUUID,
          d = this._bindings,
          f = d.length,
          g = 0,
          k = arguments.length;
        g !== k;
        ++g
      ) {
        var m = arguments[g],
          l = m.uuid,
          p = c[l]
        if (void 0 !== p && p >= b) {
          var q = b++,
            t = a[q]
          c[t.uuid] = p
          a[p] = t
          c[l] = q
          a[q] = m
          m = 0
          for (l = f; m !== l; ++m) {
            t = d[m]
            var r = t[p]
            t[p] = t[q]
            t[q] = r
          }
        }
      }
      this.nCachedObjects_ = b
    },
    uncache: function () {
      for (
        var a = this._objects,
          b = a.length,
          c = this.nCachedObjects_,
          d = this._indicesByUUID,
          f = this._bindings,
          g = f.length,
          k = 0,
          l = arguments.length;
        k !== l;
        ++k
      ) {
        var n = arguments[k].uuid,
          p = d[n]
        if (void 0 !== p)
          if ((delete d[n], p < c)) {
            n = --c
            var q = a[n],
              t = --b,
              r = a[t]
            d[q.uuid] = p
            a[p] = q
            d[r.uuid] = n
            a[n] = r
            a.pop()
            q = 0
            for (r = g; q !== r; ++q) {
              var u = f[q],
                v = u[t]
              u[p] = u[n]
              u[n] = v
              u.pop()
            }
          } else
            for (
              t = --b, r = a[t], d[r.uuid] = p, a[p] = r, a.pop(), q = 0, r = g;
              q !== r;
              ++q
            )
              (u = f[q]), (u[p] = u[t]), u.pop()
      }
      this.nCachedObjects_ = c
    },
    subscribe_: function (a, b) {
      var c = this._bindingsIndicesByPath,
        d = c[a],
        f = this._bindings
      if (void 0 !== d) return f[d]
      var g = this._paths,
        k = this._parsedPaths,
        l = this._objects,
        n = this.nCachedObjects_,
        p = Array(l.length)
      d = f.length
      c[a] = d
      g.push(a)
      k.push(b)
      f.push(p)
      c = n
      for (d = l.length; c !== d; ++c) p[c] = new ja(l[c], a, b)
      return p
    },
    unsubscribe_: function (a) {
      var b = this._bindingsIndicesByPath,
        c = b[a]
      if (void 0 !== c) {
        var d = this._paths,
          f = this._parsedPaths,
          g = this._bindings,
          k = g.length - 1,
          l = g[k]
        b[a[k]] = c
        g[c] = l
        g.pop()
        f[c] = f[k]
        f.pop()
        d[c] = d[k]
        d.pop()
      }
    },
  })
  Object.assign(Qi.prototype, {
    play: function () {
      this._mixer._activateAction(this)
      return this
    },
    stop: function () {
      this._mixer._deactivateAction(this)
      return this.reset()
    },
    reset: function () {
      this.paused = !1
      this.enabled = !0
      this.time = 0
      this._loopCount = -1
      this._startTime = null
      return this.stopFading().stopWarping()
    },
    isRunning: function () {
      return (
        this.enabled &&
        !this.paused &&
        0 !== this.timeScale &&
        null === this._startTime &&
        this._mixer._isActiveAction(this)
      )
    },
    isScheduled: function () {
      return this._mixer._isActiveAction(this)
    },
    startAt: function (a) {
      this._startTime = a
      return this
    },
    setLoop: function (a, b) {
      this.loop = a
      this.repetitions = b
      return this
    },
    setEffectiveWeight: function (a) {
      this.weight = a
      this._effectiveWeight = this.enabled ? a : 0
      return this.stopFading()
    },
    getEffectiveWeight: function () {
      return this._effectiveWeight
    },
    fadeIn: function (a) {
      return this._scheduleFading(a, 0, 1)
    },
    fadeOut: function (a) {
      return this._scheduleFading(a, 1, 0)
    },
    crossFadeFrom: function (a, b, c) {
      a.fadeOut(b)
      this.fadeIn(b)
      if (c) {
        c = this._clip.duration
        var d = a._clip.duration,
          f = c / d
        a.warp(1, d / c, b)
        this.warp(f, 1, b)
      }
      return this
    },
    crossFadeTo: function (a, b, c) {
      return a.crossFadeFrom(this, b, c)
    },
    stopFading: function () {
      var a = this._weightInterpolant
      null !== a &&
        ((this._weightInterpolant = null),
        this._mixer._takeBackControlInterpolant(a))
      return this
    },
    setEffectiveTimeScale: function (a) {
      this.timeScale = a
      this._effectiveTimeScale = this.paused ? 0 : a
      return this.stopWarping()
    },
    getEffectiveTimeScale: function () {
      return this._effectiveTimeScale
    },
    setDuration: function (a) {
      this.timeScale = this._clip.duration / a
      return this.stopWarping()
    },
    syncWith: function (a) {
      this.time = a.time
      this.timeScale = a.timeScale
      return this.stopWarping()
    },
    halt: function (a) {
      return this.warp(this._effectiveTimeScale, 0, a)
    },
    warp: function (a, b, c) {
      var d = this._mixer,
        f = d.time,
        g = this._timeScaleInterpolant,
        k = this.timeScale
      null === g &&
        (this._timeScaleInterpolant = g = d._lendControlInterpolant())
      d = g.parameterPositions
      g = g.sampleValues
      d[0] = f
      d[1] = f + c
      g[0] = a / k
      g[1] = b / k
      return this
    },
    stopWarping: function () {
      var a = this._timeScaleInterpolant
      null !== a &&
        ((this._timeScaleInterpolant = null),
        this._mixer._takeBackControlInterpolant(a))
      return this
    },
    getMixer: function () {
      return this._mixer
    },
    getClip: function () {
      return this._clip
    },
    getRoot: function () {
      return this._localRoot || this._mixer._root
    },
    _update: function (a, b, c, d) {
      if (this.enabled) {
        var f = this._startTime
        if (null !== f) {
          b = (a - f) * c
          if (0 > b || 0 === c) return
          this._startTime = null
          b *= c
        }
        b *= this._updateTimeScale(a)
        c = this._updateTime(b)
        a = this._updateWeight(a)
        if (0 < a) {
          b = this._interpolants
          f = this._propertyBindings
          for (var g = 0, k = b.length; g !== k; ++g)
            b[g].evaluate(c), f[g].accumulate(d, a)
        }
      } else this._updateWeight(a)
    },
    _updateWeight: function (a) {
      var b = 0
      if (this.enabled) {
        b = this.weight
        var c = this._weightInterpolant
        if (null !== c) {
          var d = c.evaluate(a)[0]
          b *= d
          a > c.parameterPositions[1] &&
            (this.stopFading(), 0 === d && (this.enabled = !1))
        }
      }
      return (this._effectiveWeight = b)
    },
    _updateTimeScale: function (a) {
      var b = 0
      if (!this.paused) {
        b = this.timeScale
        var c = this._timeScaleInterpolant
        if (null !== c) {
          var d = c.evaluate(a)[0]
          b *= d
          a > c.parameterPositions[1] &&
            (this.stopWarping(),
            0 === b ? (this.paused = !0) : (this.timeScale = b))
        }
      }
      return (this._effectiveTimeScale = b)
    },
    _updateTime: function (a) {
      var b = this.time + a,
        c = this._clip.duration,
        d = this.loop,
        f = this._loopCount,
        g = 2202 === d
      if (0 === a) return -1 === f ? b : g && 1 === (f & 1) ? c - b : b
      if (2200 === d)
        a: {
          if (
            (-1 === f && ((this._loopCount = 0), this._setEndings(!0, !0, !1)),
            b >= c)
          )
            b = c
          else if (0 > b) b = 0
          else {
            this.time = b
            break a
          }
          this.clampWhenFinished ? (this.paused = !0) : (this.enabled = !1)
          this.time = b
          this._mixer.dispatchEvent({
            type: 'finished',
            action: this,
            direction: 0 > a ? -1 : 1,
          })
        }
      else {
        ;-1 === f &&
          (0 <= a
            ? ((f = 0), this._setEndings(!0, 0 === this.repetitions, g))
            : this._setEndings(0 === this.repetitions, !0, g))
        if (b >= c || 0 > b) {
          d = Math.floor(b / c)
          b -= c * d
          f += Math.abs(d)
          var k = this.repetitions - f
          0 >= k
            ? (this.clampWhenFinished
                ? (this.paused = !0)
                : (this.enabled = !1),
              (this.time = b = 0 < a ? c : 0),
              this._mixer.dispatchEvent({
                type: 'finished',
                action: this,
                direction: 0 < a ? 1 : -1,
              }))
            : (1 === k
                ? ((a = 0 > a), this._setEndings(a, !a, g))
                : this._setEndings(!1, !1, g),
              (this._loopCount = f),
              (this.time = b),
              this._mixer.dispatchEvent({
                type: 'loop',
                action: this,
                loopDelta: d,
              }))
        } else this.time = b
        if (g && 1 === (f & 1)) return c - b
      }
      return b
    },
    _setEndings: function (a, b, c) {
      var d = this._interpolantSettings
      c
        ? ((d.endingStart = 2401), (d.endingEnd = 2401))
        : ((d.endingStart = a ? (this.zeroSlopeAtStart ? 2401 : 2400) : 2402),
          (d.endingEnd = b ? (this.zeroSlopeAtEnd ? 2401 : 2400) : 2402))
    },
    _scheduleFading: function (a, b, c) {
      var d = this._mixer,
        f = d.time,
        g = this._weightInterpolant
      null === g && (this._weightInterpolant = g = d._lendControlInterpolant())
      d = g.parameterPositions
      g = g.sampleValues
      d[0] = f
      g[0] = b
      d[1] = f + a
      g[1] = c
      return this
    },
  })
  eh.prototype = Object.assign(Object.create(Ra.prototype), {
    constructor: eh,
    _bindAction: function (a, b) {
      var c = a._localRoot || this._root,
        d = a._clip.tracks,
        f = d.length,
        g = a._propertyBindings
      a = a._interpolants
      var k = c.uuid,
        l = this._bindingsByRootAndName,
        n = l[k]
      void 0 === n && ((n = {}), (l[k] = n))
      for (l = 0; l !== f; ++l) {
        var p = d[l],
          q = p.name,
          t = n[q]
        if (void 0 === t) {
          t = g[l]
          if (void 0 !== t) {
            null === t._cacheIndex &&
              (++t.referenceCount, this._addInactiveBinding(t, k, q))
            continue
          }
          t = new dh(
            ja.create(c, q, b && b._propertyBindings[l].binding.parsedPath),
            p.ValueTypeName,
            p.getValueSize(),
          )
          ++t.referenceCount
          this._addInactiveBinding(t, k, q)
        }
        g[l] = t
        a[l].resultBuffer = t.buffer
      }
    },
    _activateAction: function (a) {
      if (!this._isActiveAction(a)) {
        if (null === a._cacheIndex) {
          var b = (a._localRoot || this._root).uuid,
            c = a._clip.uuid,
            d = this._actionsByClip[c]
          this._bindAction(a, d && d.knownActions[0])
          this._addInactiveAction(a, c, b)
        }
        b = a._propertyBindings
        c = 0
        for (d = b.length; c !== d; ++c) {
          var f = b[c]
          0 === f.useCount++ && (this._lendBinding(f), f.saveOriginalState())
        }
        this._lendAction(a)
      }
    },
    _deactivateAction: function (a) {
      if (this._isActiveAction(a)) {
        for (var b = a._propertyBindings, c = 0, d = b.length; c !== d; ++c) {
          var f = b[c]
          0 === --f.useCount &&
            (f.restoreOriginalState(), this._takeBackBinding(f))
        }
        this._takeBackAction(a)
      }
    },
    _initMemoryManager: function () {
      this._actions = []
      this._nActiveActions = 0
      this._actionsByClip = {}
      this._bindings = []
      this._nActiveBindings = 0
      this._bindingsByRootAndName = {}
      this._controlInterpolants = []
      this._nActiveControlInterpolants = 0
      var a = this
      this.stats = {
        actions: {
          get total() {
            return a._actions.length
          },
          get inUse() {
            return a._nActiveActions
          },
        },
        bindings: {
          get total() {
            return a._bindings.length
          },
          get inUse() {
            return a._nActiveBindings
          },
        },
        controlInterpolants: {
          get total() {
            return a._controlInterpolants.length
          },
          get inUse() {
            return a._nActiveControlInterpolants
          },
        },
      }
    },
    _isActiveAction: function (a) {
      a = a._cacheIndex
      return null !== a && a < this._nActiveActions
    },
    _addInactiveAction: function (a, b, c) {
      var d = this._actions,
        f = this._actionsByClip,
        g = f[b]
      void 0 === g
        ? ((g = { knownActions: [a], actionByRoot: {} }),
          (a._byClipCacheIndex = 0),
          (f[b] = g))
        : ((b = g.knownActions), (a._byClipCacheIndex = b.length), b.push(a))
      a._cacheIndex = d.length
      d.push(a)
      g.actionByRoot[c] = a
    },
    _removeInactiveAction: function (a) {
      var b = this._actions,
        c = b[b.length - 1],
        d = a._cacheIndex
      c._cacheIndex = d
      b[d] = c
      b.pop()
      a._cacheIndex = null
      b = a._clip.uuid
      c = this._actionsByClip
      d = c[b]
      var f = d.knownActions,
        g = f[f.length - 1],
        k = a._byClipCacheIndex
      g._byClipCacheIndex = k
      f[k] = g
      f.pop()
      a._byClipCacheIndex = null
      delete d.actionByRoot[(a._localRoot || this._root).uuid]
      0 === f.length && delete c[b]
      this._removeInactiveBindingsForAction(a)
    },
    _removeInactiveBindingsForAction: function (a) {
      a = a._propertyBindings
      for (var b = 0, c = a.length; b !== c; ++b) {
        var d = a[b]
        0 === --d.referenceCount && this._removeInactiveBinding(d)
      }
    },
    _lendAction: function (a) {
      var b = this._actions,
        c = a._cacheIndex,
        d = this._nActiveActions++,
        f = b[d]
      a._cacheIndex = d
      b[d] = a
      f._cacheIndex = c
      b[c] = f
    },
    _takeBackAction: function (a) {
      var b = this._actions,
        c = a._cacheIndex,
        d = --this._nActiveActions,
        f = b[d]
      a._cacheIndex = d
      b[d] = a
      f._cacheIndex = c
      b[c] = f
    },
    _addInactiveBinding: function (a, b, c) {
      var d = this._bindingsByRootAndName,
        f = d[b],
        g = this._bindings
      void 0 === f && ((f = {}), (d[b] = f))
      f[c] = a
      a._cacheIndex = g.length
      g.push(a)
    },
    _removeInactiveBinding: function (a) {
      var b = this._bindings,
        c = a.binding,
        d = c.rootNode.uuid
      c = c.path
      var f = this._bindingsByRootAndName,
        g = f[d],
        k = b[b.length - 1]
      a = a._cacheIndex
      k._cacheIndex = a
      b[a] = k
      b.pop()
      delete g[c]
      0 === Object.keys(g).length && delete f[d]
    },
    _lendBinding: function (a) {
      var b = this._bindings,
        c = a._cacheIndex,
        d = this._nActiveBindings++,
        f = b[d]
      a._cacheIndex = d
      b[d] = a
      f._cacheIndex = c
      b[c] = f
    },
    _takeBackBinding: function (a) {
      var b = this._bindings,
        c = a._cacheIndex,
        d = --this._nActiveBindings,
        f = b[d]
      a._cacheIndex = d
      b[d] = a
      f._cacheIndex = c
      b[c] = f
    },
    _lendControlInterpolant: function () {
      var a = this._controlInterpolants,
        b = this._nActiveControlInterpolants++,
        c = a[b]
      void 0 === c &&
        ((c = new ze(
          new Float32Array(2),
          new Float32Array(2),
          1,
          this._controlInterpolantsResultBuffer,
        )),
        (c.__cacheIndex = b),
        (a[b] = c))
      return c
    },
    _takeBackControlInterpolant: function (a) {
      var b = this._controlInterpolants,
        c = a.__cacheIndex,
        d = --this._nActiveControlInterpolants,
        f = b[d]
      a.__cacheIndex = d
      b[d] = a
      f.__cacheIndex = c
      b[c] = f
    },
    _controlInterpolantsResultBuffer: new Float32Array(1),
    clipAction: function (a, b) {
      var c = b || this._root,
        d = c.uuid
      c = 'string' === typeof a ? Pa.findByName(c, a) : a
      a = null !== c ? c.uuid : a
      var f = this._actionsByClip[a],
        g = null
      if (void 0 !== f) {
        g = f.actionByRoot[d]
        if (void 0 !== g) return g
        g = f.knownActions[0]
        null === c && (c = g._clip)
      }
      if (null === c) return null
      b = new Qi(this, c, b)
      this._bindAction(b, g)
      this._addInactiveAction(b, a, d)
      return b
    },
    existingAction: function (a, b) {
      var c = b || this._root
      b = c.uuid
      c = 'string' === typeof a ? Pa.findByName(c, a) : a
      a = this._actionsByClip[c ? c.uuid : a]
      return void 0 !== a ? a.actionByRoot[b] || null : null
    },
    stopAllAction: function () {
      for (
        var a = this._actions,
          b = this._nActiveActions,
          c = this._bindings,
          d = this._nActiveBindings,
          f = (this._nActiveBindings = this._nActiveActions = 0);
        f !== b;
        ++f
      )
        a[f].reset()
      for (f = 0; f !== d; ++f) c[f].useCount = 0
      return this
    },
    update: function (a) {
      a *= this.timeScale
      for (
        var b = this._actions,
          c = this._nActiveActions,
          d = (this.time += a),
          f = Math.sign(a),
          g = (this._accuIndex ^= 1),
          k = 0;
        k !== c;
        ++k
      )
        b[k]._update(d, a, f, g)
      a = this._bindings
      b = this._nActiveBindings
      for (k = 0; k !== b; ++k) a[k].apply(g)
      return this
    },
    setTime: function (a) {
      for (var b = (this.time = 0); b < this._actions.length; b++)
        this._actions[b].time = 0
      return this.update(a)
    },
    getRoot: function () {
      return this._root
    },
    uncacheClip: function (a) {
      var b = this._actions
      a = a.uuid
      var c = this._actionsByClip,
        d = c[a]
      if (void 0 !== d) {
        d = d.knownActions
        for (var f = 0, g = d.length; f !== g; ++f) {
          var k = d[f]
          this._deactivateAction(k)
          var l = k._cacheIndex,
            n = b[b.length - 1]
          k._cacheIndex = null
          k._byClipCacheIndex = null
          n._cacheIndex = l
          b[l] = n
          b.pop()
          this._removeInactiveBindingsForAction(k)
        }
        delete c[a]
      }
    },
    uncacheRoot: function (a) {
      a = a.uuid
      var b = this._actionsByClip
      for (d in b) {
        var c = b[d].actionByRoot[a]
        void 0 !== c &&
          (this._deactivateAction(c), this._removeInactiveAction(c))
      }
      var d = this._bindingsByRootAndName[a]
      if (void 0 !== d)
        for (var f in d)
          (a = d[f]), a.restoreOriginalState(), this._removeInactiveBinding(a)
    },
    uncacheAction: function (a, b) {
      a = this.existingAction(a, b)
      null !== a && (this._deactivateAction(a), this._removeInactiveAction(a))
    },
  })
  Hf.prototype.clone = function () {
    return new Hf(void 0 === this.value.clone ? this.value : this.value.clone())
  }
  fh.prototype = Object.assign(Object.create(wb.prototype), {
    constructor: fh,
    isInstancedInterleavedBuffer: !0,
    copy: function (a) {
      wb.prototype.copy.call(this, a)
      this.meshPerAttribute = a.meshPerAttribute
      return this
    },
  })
  Object.assign(Ri.prototype, {
    linePrecision: 1,
    set: function (a, b) {
      this.ray.set(a, b)
    },
    setFromCamera: function (a, b) {
      b && b.isPerspectiveCamera
        ? (this.ray.origin.setFromMatrixPosition(b.matrixWorld),
          this.ray.direction
            .set(a.x, a.y, 0.5)
            .unproject(b)
            .sub(this.ray.origin)
            .normalize(),
          (this.camera = b))
        : b && b.isOrthographicCamera
        ? (this.ray.origin
            .set(a.x, a.y, (b.near + b.far) / (b.near - b.far))
            .unproject(b),
          this.ray.direction.set(0, 0, -1).transformDirection(b.matrixWorld),
          (this.camera = b))
        : console.error('THREE.Raycaster: Unsupported camera type.')
    },
    intersectObject: function (a, b, c) {
      c = c || []
      gh(a, this, c, b)
      c.sort(Si)
      return c
    },
    intersectObjects: function (a, b, c) {
      c = c || []
      if (!1 === Array.isArray(a))
        return (
          console.warn(
            'THREE.Raycaster.intersectObjects: objects is not an Array.',
          ),
          c
        )
      for (var d = 0, f = a.length; d < f; d++) gh(a[d], this, c, b)
      c.sort(Si)
      return c
    },
  })
  Object.assign(Ti.prototype, {
    set: function (a, b, c) {
      this.radius = a
      this.phi = b
      this.theta = c
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.radius = a.radius
      this.phi = a.phi
      this.theta = a.theta
      return this
    },
    makeSafe: function () {
      this.phi = Math.max(1e-6, Math.min(Math.PI - 1e-6, this.phi))
      return this
    },
    setFromVector3: function (a) {
      return this.setFromCartesianCoords(a.x, a.y, a.z)
    },
    setFromCartesianCoords: function (a, b, c) {
      this.radius = Math.sqrt(a * a + b * b + c * c)
      0 === this.radius
        ? (this.phi = this.theta = 0)
        : ((this.theta = Math.atan2(a, c)),
          (this.phi = Math.acos(N.clamp(b / this.radius, -1, 1))))
      return this
    },
  })
  Object.assign(Ui.prototype, {
    set: function (a, b, c) {
      this.radius = a
      this.theta = b
      this.y = c
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.radius = a.radius
      this.theta = a.theta
      this.y = a.y
      return this
    },
    setFromVector3: function (a) {
      return this.setFromCartesianCoords(a.x, a.y, a.z)
    },
    setFromCartesianCoords: function (a, b, c) {
      this.radius = Math.sqrt(a * a + c * c)
      this.theta = Math.atan2(a, c)
      this.y = b
      return this
    },
  })
  var Ej = new z()
  Object.assign(hh.prototype, {
    set: function (a, b) {
      this.min.copy(a)
      this.max.copy(b)
      return this
    },
    setFromPoints: function (a) {
      this.makeEmpty()
      for (var b = 0, c = a.length; b < c; b++) this.expandByPoint(a[b])
      return this
    },
    setFromCenterAndSize: function (a, b) {
      b = Ej.copy(b).multiplyScalar(0.5)
      this.min.copy(a).sub(b)
      this.max.copy(a).add(b)
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.min.copy(a.min)
      this.max.copy(a.max)
      return this
    },
    makeEmpty: function () {
      this.min.x = this.min.y = Infinity
      this.max.x = this.max.y = -Infinity
      return this
    },
    isEmpty: function () {
      return this.max.x < this.min.x || this.max.y < this.min.y
    },
    getCenter: function (a) {
      void 0 === a &&
        (console.warn('THREE.Box2: .getCenter() target is now required'),
        (a = new z()))
      return this.isEmpty()
        ? a.set(0, 0)
        : a.addVectors(this.min, this.max).multiplyScalar(0.5)
    },
    getSize: function (a) {
      void 0 === a &&
        (console.warn('THREE.Box2: .getSize() target is now required'),
        (a = new z()))
      return this.isEmpty() ? a.set(0, 0) : a.subVectors(this.max, this.min)
    },
    expandByPoint: function (a) {
      this.min.min(a)
      this.max.max(a)
      return this
    },
    expandByVector: function (a) {
      this.min.sub(a)
      this.max.add(a)
      return this
    },
    expandByScalar: function (a) {
      this.min.addScalar(-a)
      this.max.addScalar(a)
      return this
    },
    containsPoint: function (a) {
      return a.x < this.min.x ||
        a.x > this.max.x ||
        a.y < this.min.y ||
        a.y > this.max.y
        ? !1
        : !0
    },
    containsBox: function (a) {
      return (
        this.min.x <= a.min.x &&
        a.max.x <= this.max.x &&
        this.min.y <= a.min.y &&
        a.max.y <= this.max.y
      )
    },
    getParameter: function (a, b) {
      void 0 === b &&
        (console.warn('THREE.Box2: .getParameter() target is now required'),
        (b = new z()))
      return b.set(
        (a.x - this.min.x) / (this.max.x - this.min.x),
        (a.y - this.min.y) / (this.max.y - this.min.y),
      )
    },
    intersectsBox: function (a) {
      return a.max.x < this.min.x ||
        a.min.x > this.max.x ||
        a.max.y < this.min.y ||
        a.min.y > this.max.y
        ? !1
        : !0
    },
    clampPoint: function (a, b) {
      void 0 === b &&
        (console.warn('THREE.Box2: .clampPoint() target is now required'),
        (b = new z()))
      return b.copy(a).clamp(this.min, this.max)
    },
    distanceToPoint: function (a) {
      return Ej.copy(a).clamp(this.min, this.max).sub(a).length()
    },
    intersect: function (a) {
      this.min.max(a.min)
      this.max.min(a.max)
      return this
    },
    union: function (a) {
      this.min.min(a.min)
      this.max.max(a.max)
      return this
    },
    translate: function (a) {
      this.min.add(a)
      this.max.add(a)
      return this
    },
    equals: function (a) {
      return a.min.equals(this.min) && a.max.equals(this.max)
    },
  })
  var Fj = new q(),
    hg = new q()
  Object.assign(ih.prototype, {
    set: function (a, b) {
      this.start.copy(a)
      this.end.copy(b)
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
    copy: function (a) {
      this.start.copy(a.start)
      this.end.copy(a.end)
      return this
    },
    getCenter: function (a) {
      void 0 === a &&
        (console.warn('THREE.Line3: .getCenter() target is now required'),
        (a = new q()))
      return a.addVectors(this.start, this.end).multiplyScalar(0.5)
    },
    delta: function (a) {
      void 0 === a &&
        (console.warn('THREE.Line3: .delta() target is now required'),
        (a = new q()))
      return a.subVectors(this.end, this.start)
    },
    distanceSq: function () {
      return this.start.distanceToSquared(this.end)
    },
    distance: function () {
      return this.start.distanceTo(this.end)
    },
    at: function (a, b) {
      void 0 === b &&
        (console.warn('THREE.Line3: .at() target is now required'),
        (b = new q()))
      return this.delta(b).multiplyScalar(a).add(this.start)
    },
    closestPointToPointParameter: function (a, b) {
      Fj.subVectors(a, this.start)
      hg.subVectors(this.end, this.start)
      a = hg.dot(hg)
      a = hg.dot(Fj) / a
      b && (a = N.clamp(a, 0, 1))
      return a
    },
    closestPointToPoint: function (a, b, c) {
      a = this.closestPointToPointParameter(a, b)
      void 0 === c &&
        (console.warn(
          'THREE.Line3: .closestPointToPoint() target is now required',
        ),
        (c = new q()))
      return this.delta(c).multiplyScalar(a).add(this.start)
    },
    applyMatrix4: function (a) {
      this.start.applyMatrix4(a)
      this.end.applyMatrix4(a)
      return this
    },
    equals: function (a) {
      return a.start.equals(this.start) && a.end.equals(this.end)
    },
  })
  Ee.prototype = Object.create(E.prototype)
  Ee.prototype.constructor = Ee
  Ee.prototype.isImmediateRenderObject = !0
  var rb = new q(),
    Hb = new q(),
    Mh = new ka(),
    Zl = ['a', 'b', 'c']
  Fe.prototype = Object.create(Z.prototype)
  Fe.prototype.constructor = Fe
  Fe.prototype.update = function () {
    this.object.updateMatrixWorld(!0)
    Mh.getNormalMatrix(this.object.matrixWorld)
    var a = this.object.matrixWorld,
      b = this.geometry.attributes.position,
      c = this.object.geometry
    if (c && c.isGeometry)
      for (
        var d = c.vertices, f = c.faces, g = (c = 0), k = f.length;
        g < k;
        g++
      )
        for (var l = f[g], n = 0, p = l.vertexNormals.length; n < p; n++) {
          var q = l.vertexNormals[n]
          rb.copy(d[l[Zl[n]]]).applyMatrix4(a)
          Hb.copy(q)
            .applyMatrix3(Mh)
            .normalize()
            .multiplyScalar(this.size)
            .add(rb)
          b.setXYZ(c, rb.x, rb.y, rb.z)
          c += 1
          b.setXYZ(c, Hb.x, Hb.y, Hb.z)
          c += 1
        }
    else if (c && c.isBufferGeometry)
      for (
        d = c.attributes.position,
          f = c.attributes.normal,
          n = c = 0,
          p = d.count;
        n < p;
        n++
      )
        rb.set(d.getX(n), d.getY(n), d.getZ(n)).applyMatrix4(a),
          Hb.set(f.getX(n), f.getY(n), f.getZ(n)),
          Hb.applyMatrix3(Mh).normalize().multiplyScalar(this.size).add(rb),
          b.setXYZ(c, rb.x, rb.y, rb.z),
          (c += 1),
          b.setXYZ(c, Hb.x, Hb.y, Hb.z),
          (c += 1)
    b.needsUpdate = !0
  }
  var Gj = new q()
  sd.prototype = Object.create(E.prototype)
  sd.prototype.constructor = sd
  sd.prototype.dispose = function () {
    this.cone.geometry.dispose()
    this.cone.material.dispose()
  }
  sd.prototype.update = function () {
    this.light.updateMatrixWorld()
    var a = this.light.distance ? this.light.distance : 1e3,
      b = a * Math.tan(this.light.angle)
    this.cone.scale.set(b, b, a)
    Gj.setFromMatrixPosition(this.light.target.matrixWorld)
    this.cone.lookAt(Gj)
    void 0 !== this.color
      ? this.cone.material.color.set(this.color)
      : this.cone.material.color.copy(this.light.color)
  }
  var Vb = new q(),
    ig = new I(),
    Nh = new I()
  td.prototype = Object.create(Z.prototype)
  td.prototype.constructor = td
  td.prototype.updateMatrixWorld = function (a) {
    var b = this.bones,
      c = this.geometry,
      d = c.getAttribute('position')
    Nh.getInverse(this.root.matrixWorld)
    for (var f = 0, g = 0; f < b.length; f++) {
      var k = b[f]
      k.parent &&
        k.parent.isBone &&
        (ig.multiplyMatrices(Nh, k.matrixWorld),
        Vb.setFromMatrixPosition(ig),
        d.setXYZ(g, Vb.x, Vb.y, Vb.z),
        ig.multiplyMatrices(Nh, k.parent.matrixWorld),
        Vb.setFromMatrixPosition(ig),
        d.setXYZ(g + 1, Vb.x, Vb.y, Vb.z),
        (g += 2))
    }
    c.getAttribute('position').needsUpdate = !0
    E.prototype.updateMatrixWorld.call(this, a)
  }
  ud.prototype = Object.create(ia.prototype)
  ud.prototype.constructor = ud
  ud.prototype.dispose = function () {
    this.geometry.dispose()
    this.material.dispose()
  }
  ud.prototype.update = function () {
    void 0 !== this.color
      ? this.material.color.set(this.color)
      : this.material.color.copy(this.light.color)
  }
  vd.prototype = Object.create(pa.prototype)
  vd.prototype.constructor = vd
  vd.prototype.update = function () {
    this.scale.set(0.5 * this.light.width, 0.5 * this.light.height, 1)
    if (void 0 !== this.color)
      this.material.color.set(this.color),
        this.children[0].material.color.set(this.color)
    else {
      this.material.color
        .copy(this.light.color)
        .multiplyScalar(this.light.intensity)
      var a = this.material.color,
        b = Math.max(a.r, a.g, a.b)
      1 < b && a.multiplyScalar(1 / b)
      this.children[0].material.color.copy(this.material.color)
    }
  }
  vd.prototype.dispose = function () {
    this.geometry.dispose()
    this.material.dispose()
    this.children[0].geometry.dispose()
    this.children[0].material.dispose()
  }
  var $l = new q(),
    Hj = new D(),
    Ij = new D()
  wd.prototype = Object.create(E.prototype)
  wd.prototype.constructor = wd
  wd.prototype.dispose = function () {
    this.children[0].geometry.dispose()
    this.children[0].material.dispose()
  }
  wd.prototype.update = function () {
    var a = this.children[0]
    if (void 0 !== this.color) this.material.color.set(this.color)
    else {
      var b = a.geometry.getAttribute('color')
      Hj.copy(this.light.color)
      Ij.copy(this.light.groundColor)
      for (var c = 0, d = b.count; c < d; c++) {
        var f = c < d / 2 ? Hj : Ij
        b.setXYZ(c, f.r, f.g, f.b)
      }
      b.needsUpdate = !0
    }
    a.lookAt($l.setFromMatrixPosition(this.light.matrixWorld).negate())
  }
  xd.prototype = Object.create(ia.prototype)
  xd.prototype.constructor = xd
  xd.prototype.dispose = function () {
    this.geometry.dispose()
    this.material.dispose()
  }
  xd.prototype.onBeforeRender = function () {
    this.position.copy(this.lightProbe.position)
    this.scale.set(1, 1, 1).multiplyScalar(this.size)
    this.material.uniforms.intensity.value = this.lightProbe.intensity
  }
  If.prototype = Object.assign(Object.create(Z.prototype), {
    constructor: If,
    copy: function (a) {
      Z.prototype.copy.call(this, a)
      this.geometry.copy(a.geometry)
      this.material.copy(a.material)
      return this
    },
    clone: function () {
      return new this.constructor().copy(this)
    },
  })
  Jf.prototype = Object.create(Z.prototype)
  Jf.prototype.constructor = Jf
  yd.prototype = Object.create(pa.prototype)
  yd.prototype.constructor = yd
  yd.prototype.update = function () {
    function a(a, b, d, f) {
      d = (b - a) / d
      u.setXYZ(n, 0, 0, 0)
      p++
      for (q = a; q < b; q += d)
        (t = n + p),
          u.setXYZ(t, Math.sin(q) * c, 0, Math.cos(q) * c),
          u.setXYZ(
            t + 1,
            Math.sin(Math.min(q + d, b)) * c,
            0,
            Math.cos(Math.min(q + d, b)) * c,
          ),
          u.setXYZ(t + 2, 0, 0, 0),
          (p += 3)
      r.addGroup(n, p, f)
      n += p
      p = 0
    }
    var b = this.audio,
      c = this.range,
      d = this.divisionsInnerAngle,
      f = this.divisionsOuterAngle,
      g = N.degToRad(b.panner.coneInnerAngle)
    b = N.degToRad(b.panner.coneOuterAngle)
    var k = g / 2,
      l = b / 2,
      n = 0,
      p = 0,
      q,
      t,
      r = this.geometry,
      u = r.attributes.position
    r.clearGroups()
    a(-l, -k, f, 0)
    a(-k, k, d, 1)
    a(k, l, f, 0)
    u.needsUpdate = !0
    g === b && (this.material[0].visible = !1)
  }
  yd.prototype.dispose = function () {
    this.geometry.dispose()
    this.material[0].dispose()
    this.material[1].dispose()
  }
  var Ue = new q(),
    jg = new q(),
    Jj = new ka()
  Ge.prototype = Object.create(Z.prototype)
  Ge.prototype.constructor = Ge
  Ge.prototype.update = function () {
    this.object.updateMatrixWorld(!0)
    Jj.getNormalMatrix(this.object.matrixWorld)
    var a = this.object.matrixWorld,
      b = this.geometry.attributes.position,
      c = this.object.geometry,
      d = c.vertices
    c = c.faces
    for (var f = 0, g = 0, k = c.length; g < k; g++) {
      var l = c[g],
        n = l.normal
      Ue.copy(d[l.a]).add(d[l.b]).add(d[l.c]).divideScalar(3).applyMatrix4(a)
      jg.copy(n).applyMatrix3(Jj).normalize().multiplyScalar(this.size).add(Ue)
      b.setXYZ(f, Ue.x, Ue.y, Ue.z)
      f += 1
      b.setXYZ(f, jg.x, jg.y, jg.z)
      f += 1
    }
    b.needsUpdate = !0
  }
  var Kj = new q(),
    kg = new q(),
    Lj = new q()
  zd.prototype = Object.create(E.prototype)
  zd.prototype.constructor = zd
  zd.prototype.dispose = function () {
    this.lightPlane.geometry.dispose()
    this.lightPlane.material.dispose()
    this.targetLine.geometry.dispose()
    this.targetLine.material.dispose()
  }
  zd.prototype.update = function () {
    Kj.setFromMatrixPosition(this.light.matrixWorld)
    kg.setFromMatrixPosition(this.light.target.matrixWorld)
    Lj.subVectors(kg, Kj)
    this.lightPlane.lookAt(kg)
    void 0 !== this.color
      ? (this.lightPlane.material.color.set(this.color),
        this.targetLine.material.color.set(this.color))
      : (this.lightPlane.material.color.copy(this.light.color),
        this.targetLine.material.color.copy(this.light.color))
    this.targetLine.lookAt(kg)
    this.targetLine.scale.z = Lj.length()
  }
  var Kf = new q(),
    U = new hb()
  He.prototype = Object.create(Z.prototype)
  He.prototype.constructor = He
  He.prototype.update = function () {
    var a = this.geometry,
      b = this.pointMap
    U.projectionMatrixInverse.copy(this.camera.projectionMatrixInverse)
    qa('c', b, a, U, 0, 0, -1)
    qa('t', b, a, U, 0, 0, 1)
    qa('n1', b, a, U, -1, -1, -1)
    qa('n2', b, a, U, 1, -1, -1)
    qa('n3', b, a, U, -1, 1, -1)
    qa('n4', b, a, U, 1, 1, -1)
    qa('f1', b, a, U, -1, -1, 1)
    qa('f2', b, a, U, 1, -1, 1)
    qa('f3', b, a, U, -1, 1, 1)
    qa('f4', b, a, U, 1, 1, 1)
    qa('u1', b, a, U, 0.7, 1.1, -1)
    qa('u2', b, a, U, -0.7, 1.1, -1)
    qa('u3', b, a, U, 0, 2, -1)
    qa('cf1', b, a, U, -1, 0, 1)
    qa('cf2', b, a, U, 1, 0, 1)
    qa('cf3', b, a, U, 0, -1, 1)
    qa('cf4', b, a, U, 0, 1, 1)
    qa('cn1', b, a, U, -1, 0, -1)
    qa('cn2', b, a, U, 1, 0, -1)
    qa('cn3', b, a, U, 0, -1, -1)
    qa('cn4', b, a, U, 0, 1, -1)
    a.getAttribute('position').needsUpdate = !0
  }
  var lg = new gb()
  Ab.prototype = Object.create(Z.prototype)
  Ab.prototype.constructor = Ab
  Ab.prototype.update = function (a) {
    void 0 !== a &&
      console.warn('THREE.BoxHelper: .update() has no longer arguments.')
    void 0 !== this.object && lg.setFromObject(this.object)
    if (!lg.isEmpty()) {
      a = lg.min
      var b = lg.max,
        c = this.geometry.attributes.position,
        d = c.array
      d[0] = b.x
      d[1] = b.y
      d[2] = b.z
      d[3] = a.x
      d[4] = b.y
      d[5] = b.z
      d[6] = a.x
      d[7] = a.y
      d[8] = b.z
      d[9] = b.x
      d[10] = a.y
      d[11] = b.z
      d[12] = b.x
      d[13] = b.y
      d[14] = a.z
      d[15] = a.x
      d[16] = b.y
      d[17] = a.z
      d[18] = a.x
      d[19] = a.y
      d[20] = a.z
      d[21] = b.x
      d[22] = a.y
      d[23] = a.z
      c.needsUpdate = !0
      this.geometry.computeBoundingSphere()
    }
  }
  Ab.prototype.setFromObject = function (a) {
    this.object = a
    this.update()
    return this
  }
  Ab.prototype.copy = function (a) {
    Z.prototype.copy.call(this, a)
    this.object = a.object
    return this
  }
  Ab.prototype.clone = function () {
    return new this.constructor().copy(this)
  }
  Ie.prototype = Object.create(Z.prototype)
  Ie.prototype.constructor = Ie
  Ie.prototype.updateMatrixWorld = function (a) {
    var b = this.box
    b.isEmpty() ||
      (b.getCenter(this.position),
      b.getSize(this.scale),
      this.scale.multiplyScalar(0.5),
      E.prototype.updateMatrixWorld.call(this, a))
  }
  Je.prototype = Object.create(pa.prototype)
  Je.prototype.constructor = Je
  Je.prototype.updateMatrixWorld = function (a) {
    var b = -this.plane.constant
    1e-8 > Math.abs(b) && (b = 1e-8)
    this.scale.set(0.5 * this.size, 0.5 * this.size, b)
    this.children[0].material.side = 0 > b ? 1 : 0
    this.lookAt(this.plane.normal)
    E.prototype.updateMatrixWorld.call(this, a)
  }
  var Mj = new q(),
    Lf,
    jh
  Bb.prototype = Object.create(E.prototype)
  Bb.prototype.constructor = Bb
  Bb.prototype.setDirection = function (a) {
    0.99999 < a.y
      ? this.quaternion.set(0, 0, 0, 1)
      : -0.99999 > a.y
      ? this.quaternion.set(1, 0, 0, 0)
      : (Mj.set(a.z, 0, -a.x).normalize(),
        this.quaternion.setFromAxisAngle(Mj, Math.acos(a.y)))
  }
  Bb.prototype.setLength = function (a, b, c) {
    void 0 === b && (b = 0.2 * a)
    void 0 === c && (c = 0.2 * b)
    this.line.scale.set(1, Math.max(1e-4, a - b), 1)
    this.line.updateMatrix()
    this.cone.scale.set(c, b, c)
    this.cone.position.y = a
    this.cone.updateMatrix()
  }
  Bb.prototype.setColor = function (a) {
    this.line.material.color.set(a)
    this.cone.material.color.set(a)
  }
  Bb.prototype.copy = function (a) {
    E.prototype.copy.call(this, a, !1)
    this.line.copy(a.line)
    this.cone.copy(a.cone)
    return this
  }
  Bb.prototype.clone = function () {
    return new this.constructor().copy(this)
  }
  Ke.prototype = Object.create(Z.prototype)
  Ke.prototype.constructor = Ke
  M.create = function (a, b) {
    console.log('THREE.Curve.create() has been deprecated')
    a.prototype = Object.create(M.prototype)
    a.prototype.constructor = a
    a.prototype.getPoint = b
    return a
  }
  Object.assign(zb.prototype, {
    createPointsGeometry: function (a) {
      console.warn(
        'THREE.CurvePath: .createPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.',
      )
      a = this.getPoints(a)
      return this.createGeometry(a)
    },
    createSpacedPointsGeometry: function (a) {
      console.warn(
        'THREE.CurvePath: .createSpacedPointsGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.',
      )
      a = this.getSpacedPoints(a)
      return this.createGeometry(a)
    },
    createGeometry: function (a) {
      console.warn(
        'THREE.CurvePath: .createGeometry() has been removed. Use new THREE.Geometry().setFromPoints( points ) instead.',
      )
      for (var b = new P(), c = 0, d = a.length; c < d; c++) {
        var f = a[c]
        b.vertices.push(new q(f.x, f.y, f.z || 0))
      }
      return b
    },
  })
  Object.assign(ab.prototype, {
    fromPoints: function (a) {
      console.warn(
        'THREE.Path: .fromPoints() has been renamed to .setFromPoints().',
      )
      return this.setFromPoints(a)
    },
  })
  Wi.prototype = Object.create(la.prototype)
  Xi.prototype = Object.create(la.prototype)
  kh.prototype = Object.create(la.prototype)
  Object.assign(kh.prototype, {
    initFromArray: function () {
      console.error('THREE.Spline: .initFromArray() has been removed.')
    },
    getControlPointsArray: function () {
      console.error('THREE.Spline: .getControlPointsArray() has been removed.')
    },
    reparametrizeByArcLength: function () {
      console.error(
        'THREE.Spline: .reparametrizeByArcLength() has been removed.',
      )
    },
  })
  If.prototype.setColors = function () {
    console.error(
      'THREE.GridHelper: setColors() has been deprecated, pass them in the constructor instead.',
    )
  }
  td.prototype.update = function () {
    console.error(
      'THREE.SkeletonHelper: update() no longer needs to be called.',
    )
  }
  Object.assign(X.prototype, {
    extractUrlBase: function (a) {
      console.warn(
        'THREE.Loader: .extractUrlBase() has been deprecated. Use THREE.LoaderUtils.extractUrlBase() instead.',
      )
      return Kh.extractUrlBase(a)
    },
  })
  X.Handlers = {
    add: function () {
      console.error(
        'THREE.Loader: Handlers.add() has been removed. Use LoadingManager.addHandler() instead.',
      )
    },
    get: function () {
      console.error(
        'THREE.Loader: Handlers.get() has been removed. Use LoadingManager.getHandler() instead.',
      )
    },
  }
  Object.assign(Ef.prototype, {
    setTexturePath: function (a) {
      console.warn(
        'THREE.ObjectLoader: .setTexturePath() has been renamed to .setResourcePath().',
      )
      return this.setResourcePath(a)
    },
  })
  Object.assign(hh.prototype, {
    center: function (a) {
      console.warn('THREE.Box2: .center() has been renamed to .getCenter().')
      return this.getCenter(a)
    },
    empty: function () {
      console.warn('THREE.Box2: .empty() has been renamed to .isEmpty().')
      return this.isEmpty()
    },
    isIntersectionBox: function (a) {
      console.warn(
        'THREE.Box2: .isIntersectionBox() has been renamed to .intersectsBox().',
      )
      return this.intersectsBox(a)
    },
    size: function (a) {
      console.warn('THREE.Box2: .size() has been renamed to .getSize().')
      return this.getSize(a)
    },
  })
  Object.assign(gb.prototype, {
    center: function (a) {
      console.warn('THREE.Box3: .center() has been renamed to .getCenter().')
      return this.getCenter(a)
    },
    empty: function () {
      console.warn('THREE.Box3: .empty() has been renamed to .isEmpty().')
      return this.isEmpty()
    },
    isIntersectionBox: function (a) {
      console.warn(
        'THREE.Box3: .isIntersectionBox() has been renamed to .intersectsBox().',
      )
      return this.intersectsBox(a)
    },
    isIntersectionSphere: function (a) {
      console.warn(
        'THREE.Box3: .isIntersectionSphere() has been renamed to .intersectsSphere().',
      )
      return this.intersectsSphere(a)
    },
    size: function (a) {
      console.warn('THREE.Box3: .size() has been renamed to .getSize().')
      return this.getSize(a)
    },
  })
  ih.prototype.center = function (a) {
    console.warn('THREE.Line3: .center() has been renamed to .getCenter().')
    return this.getCenter(a)
  }
  Object.assign(N, {
    random16: function () {
      console.warn(
        'THREE.Math: .random16() has been deprecated. Use Math.random() instead.',
      )
      return Math.random()
    },
    nearestPowerOfTwo: function (a) {
      console.warn(
        'THREE.Math: .nearestPowerOfTwo() has been renamed to .floorPowerOfTwo().',
      )
      return N.floorPowerOfTwo(a)
    },
    nextPowerOfTwo: function (a) {
      console.warn(
        'THREE.Math: .nextPowerOfTwo() has been renamed to .ceilPowerOfTwo().',
      )
      return N.ceilPowerOfTwo(a)
    },
  })
  Object.assign(ka.prototype, {
    flattenToArrayOffset: function (a, b) {
      console.warn(
        'THREE.Matrix3: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.',
      )
      return this.toArray(a, b)
    },
    multiplyVector3: function (a) {
      console.warn(
        'THREE.Matrix3: .multiplyVector3() has been removed. Use vector.applyMatrix3( matrix ) instead.',
      )
      return a.applyMatrix3(this)
    },
    multiplyVector3Array: function () {
      console.error('THREE.Matrix3: .multiplyVector3Array() has been removed.')
    },
    applyToBuffer: function (a) {
      console.warn(
        'THREE.Matrix3: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.',
      )
      return this.applyToBufferAttribute(a)
    },
    applyToVector3Array: function () {
      console.error('THREE.Matrix3: .applyToVector3Array() has been removed.')
    },
  })
  Object.assign(I.prototype, {
    extractPosition: function (a) {
      console.warn(
        'THREE.Matrix4: .extractPosition() has been renamed to .copyPosition().',
      )
      return this.copyPosition(a)
    },
    flattenToArrayOffset: function (a, b) {
      console.warn(
        'THREE.Matrix4: .flattenToArrayOffset() has been deprecated. Use .toArray() instead.',
      )
      return this.toArray(a, b)
    },
    getPosition: function () {
      console.warn(
        'THREE.Matrix4: .getPosition() has been removed. Use Vector3.setFromMatrixPosition( matrix ) instead.',
      )
      return new q().setFromMatrixColumn(this, 3)
    },
    setRotationFromQuaternion: function (a) {
      console.warn(
        'THREE.Matrix4: .setRotationFromQuaternion() has been renamed to .makeRotationFromQuaternion().',
      )
      return this.makeRotationFromQuaternion(a)
    },
    multiplyToArray: function () {
      console.warn('THREE.Matrix4: .multiplyToArray() has been removed.')
    },
    multiplyVector3: function (a) {
      console.warn(
        'THREE.Matrix4: .multiplyVector3() has been removed. Use vector.applyMatrix4( matrix ) instead.',
      )
      return a.applyMatrix4(this)
    },
    multiplyVector4: function (a) {
      console.warn(
        'THREE.Matrix4: .multiplyVector4() has been removed. Use vector.applyMatrix4( matrix ) instead.',
      )
      return a.applyMatrix4(this)
    },
    multiplyVector3Array: function () {
      console.error('THREE.Matrix4: .multiplyVector3Array() has been removed.')
    },
    rotateAxis: function (a) {
      console.warn(
        'THREE.Matrix4: .rotateAxis() has been removed. Use Vector3.transformDirection( matrix ) instead.',
      )
      a.transformDirection(this)
    },
    crossVector: function (a) {
      console.warn(
        'THREE.Matrix4: .crossVector() has been removed. Use vector.applyMatrix4( matrix ) instead.',
      )
      return a.applyMatrix4(this)
    },
    translate: function () {
      console.error('THREE.Matrix4: .translate() has been removed.')
    },
    rotateX: function () {
      console.error('THREE.Matrix4: .rotateX() has been removed.')
    },
    rotateY: function () {
      console.error('THREE.Matrix4: .rotateY() has been removed.')
    },
    rotateZ: function () {
      console.error('THREE.Matrix4: .rotateZ() has been removed.')
    },
    rotateByAxis: function () {
      console.error('THREE.Matrix4: .rotateByAxis() has been removed.')
    },
    applyToBuffer: function (a) {
      console.warn(
        'THREE.Matrix4: .applyToBuffer() has been removed. Use matrix.applyToBufferAttribute( attribute ) instead.',
      )
      return this.applyToBufferAttribute(a)
    },
    applyToVector3Array: function () {
      console.error('THREE.Matrix4: .applyToVector3Array() has been removed.')
    },
    makeFrustum: function (a, b, c, d, f, g) {
      console.warn(
        'THREE.Matrix4: .makeFrustum() has been removed. Use .makePerspective( left, right, top, bottom, near, far ) instead.',
      )
      return this.makePerspective(a, b, d, c, f, g)
    },
  })
  Sa.prototype.isIntersectionLine = function (a) {
    console.warn(
      'THREE.Plane: .isIntersectionLine() has been renamed to .intersectsLine().',
    )
    return this.intersectsLine(a)
  }
  ya.prototype.multiplyVector3 = function (a) {
    console.warn(
      'THREE.Quaternion: .multiplyVector3() has been removed. Use is now vector.applyQuaternion( quaternion ) instead.',
    )
    return a.applyQuaternion(this)
  }
  Object.assign(ac.prototype, {
    isIntersectionBox: function (a) {
      console.warn(
        'THREE.Ray: .isIntersectionBox() has been renamed to .intersectsBox().',
      )
      return this.intersectsBox(a)
    },
    isIntersectionPlane: function (a) {
      console.warn(
        'THREE.Ray: .isIntersectionPlane() has been renamed to .intersectsPlane().',
      )
      return this.intersectsPlane(a)
    },
    isIntersectionSphere: function (a) {
      console.warn(
        'THREE.Ray: .isIntersectionSphere() has been renamed to .intersectsSphere().',
      )
      return this.intersectsSphere(a)
    },
  })
  Object.assign(va.prototype, {
    area: function () {
      console.warn('THREE.Triangle: .area() has been renamed to .getArea().')
      return this.getArea()
    },
    barycoordFromPoint: function (a, b) {
      console.warn(
        'THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().',
      )
      return this.getBarycoord(a, b)
    },
    midpoint: function (a) {
      console.warn(
        'THREE.Triangle: .midpoint() has been renamed to .getMidpoint().',
      )
      return this.getMidpoint(a)
    },
    normal: function (a) {
      console.warn(
        'THREE.Triangle: .normal() has been renamed to .getNormal().',
      )
      return this.getNormal(a)
    },
    plane: function (a) {
      console.warn('THREE.Triangle: .plane() has been renamed to .getPlane().')
      return this.getPlane(a)
    },
  })
  Object.assign(va, {
    barycoordFromPoint: function (a, b, c, d, f) {
      console.warn(
        'THREE.Triangle: .barycoordFromPoint() has been renamed to .getBarycoord().',
      )
      return va.getBarycoord(a, b, c, d, f)
    },
    normal: function (a, b, c, d) {
      console.warn(
        'THREE.Triangle: .normal() has been renamed to .getNormal().',
      )
      return va.getNormal(a, b, c, d)
    },
  })
  Object.assign(Pb.prototype, {
    extractAllPoints: function (a) {
      console.warn(
        'THREE.Shape: .extractAllPoints() has been removed. Use .extractPoints() instead.',
      )
      return this.extractPoints(a)
    },
    extrude: function (a) {
      console.warn(
        'THREE.Shape: .extrude() has been removed. Use ExtrudeGeometry() instead.',
      )
      return new oc(this, a)
    },
    makeGeometry: function (a) {
      console.warn(
        'THREE.Shape: .makeGeometry() has been removed. Use ShapeGeometry() instead.',
      )
      return new pc(this, a)
    },
  })
  Object.assign(z.prototype, {
    fromAttribute: function (a, b, c) {
      console.warn(
        'THREE.Vector2: .fromAttribute() has been renamed to .fromBufferAttribute().',
      )
      return this.fromBufferAttribute(a, b, c)
    },
    distanceToManhattan: function (a) {
      console.warn(
        'THREE.Vector2: .distanceToManhattan() has been renamed to .manhattanDistanceTo().',
      )
      return this.manhattanDistanceTo(a)
    },
    lengthManhattan: function () {
      console.warn(
        'THREE.Vector2: .lengthManhattan() has been renamed to .manhattanLength().',
      )
      return this.manhattanLength()
    },
  })
  Object.assign(q.prototype, {
    setEulerFromRotationMatrix: function () {
      console.error(
        'THREE.Vector3: .setEulerFromRotationMatrix() has been removed. Use Euler.setFromRotationMatrix() instead.',
      )
    },
    setEulerFromQuaternion: function () {
      console.error(
        'THREE.Vector3: .setEulerFromQuaternion() has been removed. Use Euler.setFromQuaternion() instead.',
      )
    },
    getPositionFromMatrix: function (a) {
      console.warn(
        'THREE.Vector3: .getPositionFromMatrix() has been renamed to .setFromMatrixPosition().',
      )
      return this.setFromMatrixPosition(a)
    },
    getScaleFromMatrix: function (a) {
      console.warn(
        'THREE.Vector3: .getScaleFromMatrix() has been renamed to .setFromMatrixScale().',
      )
      return this.setFromMatrixScale(a)
    },
    getColumnFromMatrix: function (a, b) {
      console.warn(
        'THREE.Vector3: .getColumnFromMatrix() has been renamed to .setFromMatrixColumn().',
      )
      return this.setFromMatrixColumn(b, a)
    },
    applyProjection: function (a) {
      console.warn(
        'THREE.Vector3: .applyProjection() has been removed. Use .applyMatrix4( m ) instead.',
      )
      return this.applyMatrix4(a)
    },
    fromAttribute: function (a, b, c) {
      console.warn(
        'THREE.Vector3: .fromAttribute() has been renamed to .fromBufferAttribute().',
      )
      return this.fromBufferAttribute(a, b, c)
    },
    distanceToManhattan: function (a) {
      console.warn(
        'THREE.Vector3: .distanceToManhattan() has been renamed to .manhattanDistanceTo().',
      )
      return this.manhattanDistanceTo(a)
    },
    lengthManhattan: function () {
      console.warn(
        'THREE.Vector3: .lengthManhattan() has been renamed to .manhattanLength().',
      )
      return this.manhattanLength()
    },
  })
  Object.assign(ca.prototype, {
    fromAttribute: function (a, b, c) {
      console.warn(
        'THREE.Vector4: .fromAttribute() has been renamed to .fromBufferAttribute().',
      )
      return this.fromBufferAttribute(a, b, c)
    },
    lengthManhattan: function () {
      console.warn(
        'THREE.Vector4: .lengthManhattan() has been renamed to .manhattanLength().',
      )
      return this.manhattanLength()
    },
  })
  Object.assign(P.prototype, {
    computeTangents: function () {
      console.error('THREE.Geometry: .computeTangents() has been removed.')
    },
    computeLineDistances: function () {
      console.error(
        'THREE.Geometry: .computeLineDistances() has been removed. Use THREE.Line.computeLineDistances() instead.',
      )
    },
  })
  Object.assign(E.prototype, {
    getChildByName: function (a) {
      console.warn(
        'THREE.Object3D: .getChildByName() has been renamed to .getObjectByName().',
      )
      return this.getObjectByName(a)
    },
    renderDepth: function () {
      console.warn(
        'THREE.Object3D: .renderDepth has been removed. Use .renderOrder, instead.',
      )
    },
    translate: function (a, b) {
      console.warn(
        'THREE.Object3D: .translate() has been removed. Use .translateOnAxis( axis, distance ) instead.',
      )
      return this.translateOnAxis(b, a)
    },
    getWorldRotation: function () {
      console.error(
        'THREE.Object3D: .getWorldRotation() has been removed. Use THREE.Object3D.getWorldQuaternion( target ) instead.',
      )
    },
  })
  Object.defineProperties(E.prototype, {
    eulerOrder: {
      get: function () {
        console.warn('THREE.Object3D: .eulerOrder is now .rotation.order.')
        return this.rotation.order
      },
      set: function (a) {
        console.warn('THREE.Object3D: .eulerOrder is now .rotation.order.')
        this.rotation.order = a
      },
    },
    useQuaternion: {
      get: function () {
        console.warn(
          'THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.',
        )
      },
      set: function () {
        console.warn(
          'THREE.Object3D: .useQuaternion has been removed. The library now uses quaternions by default.',
        )
      },
    },
  })
  Object.defineProperties(be.prototype, {
    objects: {
      get: function () {
        console.warn('THREE.LOD: .objects has been renamed to .levels.')
        return this.levels
      },
    },
  })
  Object.defineProperty(ff.prototype, 'useVertexTexture', {
    get: function () {
      console.warn('THREE.Skeleton: useVertexTexture has been removed.')
    },
    set: function () {
      console.warn('THREE.Skeleton: useVertexTexture has been removed.')
    },
  })
  ce.prototype.initBones = function () {
    console.error('THREE.SkinnedMesh: initBones() has been removed.')
  }
  Object.defineProperty(M.prototype, '__arcLengthDivisions', {
    get: function () {
      console.warn(
        'THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.',
      )
      return this.arcLengthDivisions
    },
    set: function (a) {
      console.warn(
        'THREE.Curve: .__arcLengthDivisions is now .arcLengthDivisions.',
      )
      this.arcLengthDivisions = a
    },
  })
  na.prototype.setLens = function (a, b) {
    console.warn(
      'THREE.PerspectiveCamera.setLens is deprecated. Use .setFocalLength and .filmGauge for a photographic setup.',
    )
    void 0 !== b && (this.filmGauge = b)
    this.setFocalLength(a)
  }
  Object.defineProperties(da.prototype, {
    onlyShadow: {
      set: function () {
        console.warn('THREE.Light: .onlyShadow has been removed.')
      },
    },
    shadowCameraFov: {
      set: function (a) {
        console.warn('THREE.Light: .shadowCameraFov is now .shadow.camera.fov.')
        this.shadow.camera.fov = a
      },
    },
    shadowCameraLeft: {
      set: function (a) {
        console.warn(
          'THREE.Light: .shadowCameraLeft is now .shadow.camera.left.',
        )
        this.shadow.camera.left = a
      },
    },
    shadowCameraRight: {
      set: function (a) {
        console.warn(
          'THREE.Light: .shadowCameraRight is now .shadow.camera.right.',
        )
        this.shadow.camera.right = a
      },
    },
    shadowCameraTop: {
      set: function (a) {
        console.warn('THREE.Light: .shadowCameraTop is now .shadow.camera.top.')
        this.shadow.camera.top = a
      },
    },
    shadowCameraBottom: {
      set: function (a) {
        console.warn(
          'THREE.Light: .shadowCameraBottom is now .shadow.camera.bottom.',
        )
        this.shadow.camera.bottom = a
      },
    },
    shadowCameraNear: {
      set: function (a) {
        console.warn(
          'THREE.Light: .shadowCameraNear is now .shadow.camera.near.',
        )
        this.shadow.camera.near = a
      },
    },
    shadowCameraFar: {
      set: function (a) {
        console.warn('THREE.Light: .shadowCameraFar is now .shadow.camera.far.')
        this.shadow.camera.far = a
      },
    },
    shadowCameraVisible: {
      set: function () {
        console.warn(
          'THREE.Light: .shadowCameraVisible has been removed. Use new THREE.CameraHelper( light.shadow.camera ) instead.',
        )
      },
    },
    shadowBias: {
      set: function (a) {
        console.warn('THREE.Light: .shadowBias is now .shadow.bias.')
        this.shadow.bias = a
      },
    },
    shadowDarkness: {
      set: function () {
        console.warn('THREE.Light: .shadowDarkness has been removed.')
      },
    },
    shadowMapWidth: {
      set: function (a) {
        console.warn(
          'THREE.Light: .shadowMapWidth is now .shadow.mapSize.width.',
        )
        this.shadow.mapSize.width = a
      },
    },
    shadowMapHeight: {
      set: function (a) {
        console.warn(
          'THREE.Light: .shadowMapHeight is now .shadow.mapSize.height.',
        )
        this.shadow.mapSize.height = a
      },
    },
  })
  Object.defineProperties(O.prototype, {
    length: {
      get: function () {
        console.warn(
          'THREE.BufferAttribute: .length has been deprecated. Use .count instead.',
        )
        return this.array.length
      },
    },
    dynamic: {
      get: function () {
        console.warn(
          'THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead.',
        )
        return 35048 === this.usage
      },
      set: function () {
        console.warn(
          'THREE.BufferAttribute: .dynamic has been deprecated. Use .usage instead.',
        )
        this.setUsage(35048)
      },
    },
  })
  Object.assign(O.prototype, {
    setDynamic: function (a) {
      console.warn(
        'THREE.BufferAttribute: .setDynamic() has been deprecated. Use .setUsage() instead.',
      )
      this.setUsage(!0 === a ? 35048 : 35044)
      return this
    },
    copyIndicesArray: function () {
      console.error(
        'THREE.BufferAttribute: .copyIndicesArray() has been removed.',
      )
    },
    setArray: function () {
      console.error(
        'THREE.BufferAttribute: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers',
      )
    },
  })
  Object.assign(G.prototype, {
    addIndex: function (a) {
      console.warn(
        'THREE.BufferGeometry: .addIndex() has been renamed to .setIndex().',
      )
      this.setIndex(a)
    },
    addAttribute: function (a, b, c) {
      console.warn(
        'THREE.BufferGeometry: .addAttribute() has been renamed to .setAttribute().',
      )
      return (b && b.isBufferAttribute) || (b && b.isInterleavedBufferAttribute)
        ? 'index' === a
          ? (console.warn(
              'THREE.BufferGeometry.addAttribute: Use .setIndex() for index attribute.',
            ),
            this.setIndex(b),
            this)
          : this.setAttribute(a, b)
        : (console.warn(
            'THREE.BufferGeometry: .addAttribute() now expects ( name, attribute ).',
          ),
          this.setAttribute(a, new O(b, c)))
    },
    addDrawCall: function (a, b, c) {
      void 0 !== c &&
        console.warn(
          'THREE.BufferGeometry: .addDrawCall() no longer supports indexOffset.',
        )
      console.warn('THREE.BufferGeometry: .addDrawCall() is now .addGroup().')
      this.addGroup(a, b)
    },
    clearDrawCalls: function () {
      console.warn(
        'THREE.BufferGeometry: .clearDrawCalls() is now .clearGroups().',
      )
      this.clearGroups()
    },
    computeTangents: function () {
      console.warn('THREE.BufferGeometry: .computeTangents() has been removed.')
    },
    computeOffsets: function () {
      console.warn('THREE.BufferGeometry: .computeOffsets() has been removed.')
    },
    removeAttribute: function (a) {
      console.warn(
        'THREE.BufferGeometry: .removeAttribute() has been renamed to .deleteAttribute().',
      )
      return this.deleteAttribute(a)
    },
  })
  Object.defineProperties(G.prototype, {
    drawcalls: {
      get: function () {
        console.error(
          'THREE.BufferGeometry: .drawcalls has been renamed to .groups.',
        )
        return this.groups
      },
    },
    offsets: {
      get: function () {
        console.warn(
          'THREE.BufferGeometry: .offsets has been renamed to .groups.',
        )
        return this.groups
      },
    },
  })
  Object.defineProperties(wb.prototype, {
    dynamic: {
      get: function () {
        console.warn(
          'THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead.',
        )
        return 35048 === this.usage
      },
      set: function (a) {
        console.warn(
          'THREE.InterleavedBuffer: .length has been deprecated. Use .usage instead.',
        )
        this.setUsage(a)
      },
    },
  })
  Object.assign(wb.prototype, {
    setDynamic: function (a) {
      console.warn(
        'THREE.InterleavedBuffer: .setDynamic() has been deprecated. Use .setUsage() instead.',
      )
      this.setUsage(!0 === a ? 35048 : 35044)
      return this
    },
    setArray: function () {
      console.error(
        'THREE.InterleavedBuffer: .setArray has been removed. Use BufferGeometry .setAttribute to replace/resize attribute buffers',
      )
    },
  })
  Object.assign(jb.prototype, {
    getArrays: function () {
      console.error(
        'THREE.ExtrudeBufferGeometry: .getArrays() has been removed.',
      )
    },
    addShapeList: function () {
      console.error(
        'THREE.ExtrudeBufferGeometry: .addShapeList() has been removed.',
      )
    },
    addShape: function () {
      console.error(
        'THREE.ExtrudeBufferGeometry: .addShape() has been removed.',
      )
    },
  })
  Object.defineProperties(Hf.prototype, {
    dynamic: {
      set: function () {
        console.warn(
          'THREE.Uniform: .dynamic has been removed. Use object.onBeforeRender() instead.',
        )
      },
    },
    onUpdate: {
      value: function () {
        console.warn(
          'THREE.Uniform: .onUpdate() has been removed. Use object.onBeforeRender() instead.',
        )
        return this
      },
    },
  })
  Object.defineProperties(R.prototype, {
    wrapAround: {
      get: function () {
        console.warn('THREE.Material: .wrapAround has been removed.')
      },
      set: function () {
        console.warn('THREE.Material: .wrapAround has been removed.')
      },
    },
    overdraw: {
      get: function () {
        console.warn('THREE.Material: .overdraw has been removed.')
      },
      set: function () {
        console.warn('THREE.Material: .overdraw has been removed.')
      },
    },
    wrapRGB: {
      get: function () {
        console.warn('THREE.Material: .wrapRGB has been removed.')
        return new D()
      },
    },
    shading: {
      get: function () {
        console.error(
          'THREE.' +
            this.type +
            ': .shading has been removed. Use the boolean .flatShading instead.',
        )
      },
      set: function (a) {
        console.warn(
          'THREE.' +
            this.type +
            ': .shading has been removed. Use the boolean .flatShading instead.',
        )
        this.flatShading = 1 === a
      },
    },
    stencilMask: {
      get: function () {
        console.warn(
          'THREE.' +
            this.type +
            ': .stencilMask has been removed. Use .stencilFuncMask instead.',
        )
        return this.stencilFuncMask
      },
      set: function (a) {
        console.warn(
          'THREE.' +
            this.type +
            ': .stencilMask has been removed. Use .stencilFuncMask instead.',
        )
        this.stencilFuncMask = a
      },
    },
  })
  Object.defineProperties(Wa.prototype, {
    metal: {
      get: function () {
        console.warn(
          'THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead.',
        )
        return !1
      },
      set: function () {
        console.warn(
          'THREE.MeshPhongMaterial: .metal has been removed. Use THREE.MeshStandardMaterial instead',
        )
      },
    },
  })
  Object.defineProperties(Aa.prototype, {
    derivatives: {
      get: function () {
        console.warn(
          'THREE.ShaderMaterial: .derivatives has been moved to .extensions.derivatives.',
        )
        return this.extensions.derivatives
      },
      set: function (a) {
        console.warn(
          'THREE. ShaderMaterial: .derivatives has been moved to .extensions.derivatives.',
        )
        this.extensions.derivatives = a
      },
    },
  })
  Object.assign(Hg.prototype, {
    clearTarget: function (a, b, c, d) {
      console.warn(
        'THREE.WebGLRenderer: .clearTarget() has been deprecated. Use .setRenderTarget() and .clear() instead.',
      )
      this.setRenderTarget(a)
      this.clear(b, c, d)
    },
    animate: function (a) {
      console.warn(
        'THREE.WebGLRenderer: .animate() is now .setAnimationLoop().',
      )
      this.setAnimationLoop(a)
    },
    getCurrentRenderTarget: function () {
      console.warn(
        'THREE.WebGLRenderer: .getCurrentRenderTarget() is now .getRenderTarget().',
      )
      return this.getRenderTarget()
    },
    getMaxAnisotropy: function () {
      console.warn(
        'THREE.WebGLRenderer: .getMaxAnisotropy() is now .capabilities.getMaxAnisotropy().',
      )
      return this.capabilities.getMaxAnisotropy()
    },
    getPrecision: function () {
      console.warn(
        'THREE.WebGLRenderer: .getPrecision() is now .capabilities.precision.',
      )
      return this.capabilities.precision
    },
    resetGLState: function () {
      console.warn(
        'THREE.WebGLRenderer: .resetGLState() is now .state.reset().',
      )
      return this.state.reset()
    },
    supportsFloatTextures: function () {
      console.warn(
        "THREE.WebGLRenderer: .supportsFloatTextures() is now .extensions.get( 'OES_texture_float' ).",
      )
      return this.extensions.get('OES_texture_float')
    },
    supportsHalfFloatTextures: function () {
      console.warn(
        "THREE.WebGLRenderer: .supportsHalfFloatTextures() is now .extensions.get( 'OES_texture_half_float' ).",
      )
      return this.extensions.get('OES_texture_half_float')
    },
    supportsStandardDerivatives: function () {
      console.warn(
        "THREE.WebGLRenderer: .supportsStandardDerivatives() is now .extensions.get( 'OES_standard_derivatives' ).",
      )
      return this.extensions.get('OES_standard_derivatives')
    },
    supportsCompressedTextureS3TC: function () {
      console.warn(
        "THREE.WebGLRenderer: .supportsCompressedTextureS3TC() is now .extensions.get( 'WEBGL_compressed_texture_s3tc' ).",
      )
      return this.extensions.get('WEBGL_compressed_texture_s3tc')
    },
    supportsCompressedTexturePVRTC: function () {
      console.warn(
        "THREE.WebGLRenderer: .supportsCompressedTexturePVRTC() is now .extensions.get( 'WEBGL_compressed_texture_pvrtc' ).",
      )
      return this.extensions.get('WEBGL_compressed_texture_pvrtc')
    },
    supportsBlendMinMax: function () {
      console.warn(
        "THREE.WebGLRenderer: .supportsBlendMinMax() is now .extensions.get( 'EXT_blend_minmax' ).",
      )
      return this.extensions.get('EXT_blend_minmax')
    },
    supportsVertexTextures: function () {
      console.warn(
        'THREE.WebGLRenderer: .supportsVertexTextures() is now .capabilities.vertexTextures.',
      )
      return this.capabilities.vertexTextures
    },
    supportsInstancedArrays: function () {
      console.warn(
        "THREE.WebGLRenderer: .supportsInstancedArrays() is now .extensions.get( 'ANGLE_instanced_arrays' ).",
      )
      return this.extensions.get('ANGLE_instanced_arrays')
    },
    enableScissorTest: function (a) {
      console.warn(
        'THREE.WebGLRenderer: .enableScissorTest() is now .setScissorTest().',
      )
      this.setScissorTest(a)
    },
    initMaterial: function () {
      console.warn('THREE.WebGLRenderer: .initMaterial() has been removed.')
    },
    addPrePlugin: function () {
      console.warn('THREE.WebGLRenderer: .addPrePlugin() has been removed.')
    },
    addPostPlugin: function () {
      console.warn('THREE.WebGLRenderer: .addPostPlugin() has been removed.')
    },
    updateShadowMap: function () {
      console.warn('THREE.WebGLRenderer: .updateShadowMap() has been removed.')
    },
    setFaceCulling: function () {
      console.warn('THREE.WebGLRenderer: .setFaceCulling() has been removed.')
    },
    allocTextureUnit: function () {
      console.warn('THREE.WebGLRenderer: .allocTextureUnit() has been removed.')
    },
    setTexture: function () {
      console.warn('THREE.WebGLRenderer: .setTexture() has been removed.')
    },
    setTexture2D: function () {
      console.warn('THREE.WebGLRenderer: .setTexture2D() has been removed.')
    },
    setTextureCube: function () {
      console.warn('THREE.WebGLRenderer: .setTextureCube() has been removed.')
    },
    getActiveMipMapLevel: function () {
      console.warn(
        'THREE.WebGLRenderer: .getActiveMipMapLevel() is now .getActiveMipmapLevel().',
      )
      return this.getActiveMipmapLevel()
    },
  })
  Object.defineProperties(Hg.prototype, {
    shadowMapEnabled: {
      get: function () {
        return this.shadowMap.enabled
      },
      set: function (a) {
        console.warn(
          'THREE.WebGLRenderer: .shadowMapEnabled is now .shadowMap.enabled.',
        )
        this.shadowMap.enabled = a
      },
    },
    shadowMapType: {
      get: function () {
        return this.shadowMap.type
      },
      set: function (a) {
        console.warn(
          'THREE.WebGLRenderer: .shadowMapType is now .shadowMap.type.',
        )
        this.shadowMap.type = a
      },
    },
    shadowMapCullFace: {
      get: function () {
        console.warn(
          'THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.',
        )
      },
      set: function () {
        console.warn(
          'THREE.WebGLRenderer: .shadowMapCullFace has been removed. Set Material.shadowSide instead.',
        )
      },
    },
    context: {
      get: function () {
        console.warn(
          'THREE.WebGLRenderer: .context has been removed. Use .getContext() instead.',
        )
        return this.getContext()
      },
    },
  })
  Object.defineProperties(ui.prototype, {
    cullFace: {
      get: function () {
        console.warn(
          'THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.',
        )
      },
      set: function () {
        console.warn(
          'THREE.WebGLRenderer: .shadowMap.cullFace has been removed. Set Material.shadowSide instead.',
        )
      },
    },
    renderReverseSided: {
      get: function () {
        console.warn(
          'THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.',
        )
      },
      set: function () {
        console.warn(
          'THREE.WebGLRenderer: .shadowMap.renderReverseSided has been removed. Set Material.shadowSide instead.',
        )
      },
    },
    renderSingleSided: {
      get: function () {
        console.warn(
          'THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.',
        )
      },
      set: function () {
        console.warn(
          'THREE.WebGLRenderer: .shadowMap.renderSingleSided has been removed. Set Material.shadowSide instead.',
        )
      },
    },
  })
  Object.defineProperties(Ib.prototype, {
    activeCubeFace: {
      set: function () {
        console.warn(
          'THREE.WebGLRenderTargetCube: .activeCubeFace has been removed. It is now the second parameter of WebGLRenderer.setRenderTarget().',
        )
      },
    },
    activeMipMapLevel: {
      set: function () {
        console.warn(
          'THREE.WebGLRenderTargetCube: .activeMipMapLevel has been removed. It is now the third parameter of WebGLRenderer.setRenderTarget().',
        )
      },
    },
  })
  Object.defineProperties(sa.prototype, {
    wrapS: {
      get: function () {
        console.warn('THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.')
        return this.texture.wrapS
      },
      set: function (a) {
        console.warn('THREE.WebGLRenderTarget: .wrapS is now .texture.wrapS.')
        this.texture.wrapS = a
      },
    },
    wrapT: {
      get: function () {
        console.warn('THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.')
        return this.texture.wrapT
      },
      set: function (a) {
        console.warn('THREE.WebGLRenderTarget: .wrapT is now .texture.wrapT.')
        this.texture.wrapT = a
      },
    },
    magFilter: {
      get: function () {
        console.warn(
          'THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.',
        )
        return this.texture.magFilter
      },
      set: function (a) {
        console.warn(
          'THREE.WebGLRenderTarget: .magFilter is now .texture.magFilter.',
        )
        this.texture.magFilter = a
      },
    },
    minFilter: {
      get: function () {
        console.warn(
          'THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.',
        )
        return this.texture.minFilter
      },
      set: function (a) {
        console.warn(
          'THREE.WebGLRenderTarget: .minFilter is now .texture.minFilter.',
        )
        this.texture.minFilter = a
      },
    },
    anisotropy: {
      get: function () {
        console.warn(
          'THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.',
        )
        return this.texture.anisotropy
      },
      set: function (a) {
        console.warn(
          'THREE.WebGLRenderTarget: .anisotropy is now .texture.anisotropy.',
        )
        this.texture.anisotropy = a
      },
    },
    offset: {
      get: function () {
        console.warn('THREE.WebGLRenderTarget: .offset is now .texture.offset.')
        return this.texture.offset
      },
      set: function (a) {
        console.warn('THREE.WebGLRenderTarget: .offset is now .texture.offset.')
        this.texture.offset = a
      },
    },
    repeat: {
      get: function () {
        console.warn('THREE.WebGLRenderTarget: .repeat is now .texture.repeat.')
        return this.texture.repeat
      },
      set: function (a) {
        console.warn('THREE.WebGLRenderTarget: .repeat is now .texture.repeat.')
        this.texture.repeat = a
      },
    },
    format: {
      get: function () {
        console.warn('THREE.WebGLRenderTarget: .format is now .texture.format.')
        return this.texture.format
      },
      set: function (a) {
        console.warn('THREE.WebGLRenderTarget: .format is now .texture.format.')
        this.texture.format = a
      },
    },
    type: {
      get: function () {
        console.warn('THREE.WebGLRenderTarget: .type is now .texture.type.')
        return this.texture.type
      },
      set: function (a) {
        console.warn('THREE.WebGLRenderTarget: .type is now .texture.type.')
        this.texture.type = a
      },
    },
    generateMipmaps: {
      get: function () {
        console.warn(
          'THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.',
        )
        return this.texture.generateMipmaps
      },
      set: function (a) {
        console.warn(
          'THREE.WebGLRenderTarget: .generateMipmaps is now .texture.generateMipmaps.',
        )
        this.texture.generateMipmaps = a
      },
    },
  })
  Object.defineProperties(Gg.prototype, {
    standing: {
      set: function () {
        console.warn('THREE.WebVRManager: .standing has been removed.')
      },
    },
    userHeight: {
      set: function () {
        console.warn('THREE.WebVRManager: .userHeight has been removed.')
      },
    },
  })
  Object.defineProperties(rd.prototype, {
    load: {
      value: function (a) {
        console.warn(
          'THREE.Audio: .load has been deprecated. Use THREE.AudioLoader instead.',
        )
        var b = this
        new Ff().load(a, function (a) {
          b.setBuffer(a)
        })
        return this
      },
    },
    startTime: {
      set: function () {
        console.warn('THREE.Audio: .startTime is now .play( delay ).')
      },
    },
  })
  ch.prototype.getData = function () {
    console.warn('THREE.AudioAnalyser: .getData() is now .getFrequencyData().')
    return this.getFrequencyData()
  }
  Qc.prototype.updateCubeMap = function (a, b) {
    console.warn('THREE.CubeCamera: .updateCubeMap() is now .update().')
    return this.update(a, b)
  }
  Qb.crossOrigin = void 0
  Qb.loadTexture = function (a, b, c, d) {
    console.warn(
      'THREE.ImageUtils.loadTexture has been deprecated. Use THREE.TextureLoader() instead.',
    )
    var f = new rf()
    f.setCrossOrigin(this.crossOrigin)
    a = f.load(a, c, void 0, d)
    b && (a.mapping = b)
    return a
  }
  Qb.loadTextureCube = function (a, b, c, d) {
    console.warn(
      'THREE.ImageUtils.loadTextureCube has been deprecated. Use THREE.CubeTextureLoader() instead.',
    )
    var f = new qf()
    f.setCrossOrigin(this.crossOrigin)
    a = f.load(a, c, void 0, d)
    b && (a.mapping = b)
    return a
  }
  Qb.loadCompressedTexture = function () {
    console.error(
      'THREE.ImageUtils.loadCompressedTexture has been removed. Use THREE.DDSLoader instead.',
    )
  }
  Qb.loadCompressedTextureCube = function () {
    console.error(
      'THREE.ImageUtils.loadCompressedTextureCube has been removed. Use THREE.DDSLoader instead.',
    )
  }
  var am = kc
  'undefined' !== typeof __THREE_DEVTOOLS__ &&
    __THREE_DEVTOOLS__.dispatchEvent(
      new CustomEvent('register', { detail: { revision: '110' } }),
    )
  l.ACESFilmicToneMapping = 5
  l.AddEquation = 100
  l.AddOperation = 2
  l.AdditiveBlending = 2
  l.AlphaFormat = 1021
  l.AlwaysDepth = 1
  l.AlwaysStencilFunc = 519
  l.AmbientLight = yf
  l.AmbientLightProbe = Yg
  l.AnimationClip = Pa
  l.AnimationLoader = Pg
  l.AnimationMixer = eh
  l.AnimationObjectGroup = Pi
  l.AnimationUtils = aa
  l.ArcCurve = qd
  l.ArrayCamera = Yd
  l.ArrowHelper = Bb
  l.Audio = rd
  l.AudioAnalyser = ch
  l.AudioContext = ah
  l.AudioListener = $g
  l.AudioLoader = Ff
  l.AxesHelper = Ke
  l.AxisHelper = function (a) {
    console.warn('THREE.AxisHelper has been renamed to THREE.AxesHelper.')
    return new Ke(a)
  }
  l.BackSide = 1
  l.BasicDepthPacking = 3200
  l.BasicShadowMap = 0
  l.BinaryTextureLoader = function (a) {
    console.warn(
      'THREE.BinaryTextureLoader has been renamed to THREE.DataTextureLoader.',
    )
    return new pf(a)
  }
  l.Bone = Ig
  l.BooleanKeyframeTrack = lf
  l.BoundingBoxHelper = function (a, b) {
    console.warn(
      'THREE.BoundingBoxHelper has been deprecated. Creating a THREE.BoxHelper instead.',
    )
    return new Ab(a, b)
  }
  l.Box2 = hh
  l.Box3 = gb
  l.Box3Helper = Ie
  l.BoxBufferGeometry = Ud
  l.BoxGeometry = Eh
  l.BoxHelper = Ab
  l.BufferAttribute = O
  l.BufferGeometry = G
  l.BufferGeometryLoader = Df
  l.ByteType = 1010
  l.Cache = Fc
  l.Camera = hb
  l.CameraHelper = He
  l.CanvasRenderer = function () {
    console.error('THREE.CanvasRenderer has been removed')
  }
  l.CanvasTexture = de
  l.CatmullRomCurve3 = la
  l.CineonToneMapping = 4
  l.CircleBufferGeometry = ld
  l.CircleGeometry = ye
  l.ClampToEdgeWrapping = 1001
  l.Clock = Zg
  l.ClosedSplineCurve3 = Wi
  l.Color = D
  l.ColorKeyframeTrack = mf
  l.CompressedTexture = Zc
  l.CompressedTextureLoader = Qg
  l.ConeBufferGeometry = xe
  l.ConeGeometry = we
  l.CubeCamera = Qc
  l.CubeGeometry = Eh
  l.CubeReflectionMapping = 301
  l.CubeRefractionMapping = 302
  l.CubeTexture = vb
  l.CubeTextureLoader = qf
  l.CubeUVReflectionMapping = 306
  l.CubeUVRefractionMapping = 307
  l.CubicBezierCurve = Xa
  l.CubicBezierCurve3 = lb
  l.CubicInterpolant = jf
  l.CullFaceBack = 1
  l.CullFaceFront = 2
  l.CullFaceFrontBack = 3
  l.CullFaceNone = 0
  l.Curve = M
  l.CurvePath = zb
  l.CustomBlending = 5
  l.CylinderBufferGeometry = yb
  l.CylinderGeometry = rc
  l.Cylindrical = Ui
  l.DataTexture = hc
  l.DataTexture2DArray = Rc
  l.DataTexture3D = Sc
  l.DataTextureLoader = pf
  l.DecrementStencilOp = 7683
  l.DecrementWrapStencilOp = 34056
  l.DefaultLoadingManager = Li
  l.DepthFormat = 1026
  l.DepthStencilFormat = 1027
  l.DepthTexture = ee
  l.DirectionalLight = xf
  l.DirectionalLightHelper = zd
  l.DirectionalLightShadow = wf
  l.DiscreteInterpolant = kf
  l.DodecahedronBufferGeometry = dd
  l.DodecahedronGeometry = ke
  l.DoubleSide = 2
  l.DstAlphaFactor = 206
  l.DstColorFactor = 208
  l.DynamicBufferAttribute = function (a, b) {
    console.warn(
      'THREE.DynamicBufferAttribute has been removed. Use new THREE.BufferAttribute().setDynamic( true ) instead.',
    )
    return new O(a, b).setDynamic(!0)
  }
  l.DynamicCopyUsage = 35050
  l.DynamicDrawUsage = 35048
  l.DynamicReadUsage = 35049
  l.EdgesGeometry = kd
  l.EdgesHelper = function (a, b) {
    console.warn(
      'THREE.EdgesHelper has been removed. Use THREE.EdgesGeometry instead.',
    )
    return new Z(
      new kd(a.geometry),
      new T({ color: void 0 !== b ? b : 16777215 }),
    )
  }
  l.EllipseCurve = Ma
  l.EqualDepth = 4
  l.EqualStencilFunc = 514
  l.EquirectangularReflectionMapping = 303
  l.EquirectangularRefractionMapping = 304
  l.Euler = Zb
  l.EventDispatcher = Ra
  l.ExtrudeBufferGeometry = jb
  l.ExtrudeGeometry = oc
  l.Face3 = Mc
  l.Face4 = function (a, b, c, d, f, g, k) {
    console.warn(
      'THREE.Face4 has been removed. A THREE.Face3 will be created instead.',
    )
    return new Mc(a, b, c, f, g, k)
  }
  l.FaceColors = 1
  l.FaceNormalsHelper = Ge
  l.FileLoader = Qa
  l.FlatShading = 1
  l.Float32Attribute = function (a, b) {
    console.warn(
      'THREE.Float32Attribute has been removed. Use new THREE.Float32BufferAttribute() instead.',
    )
    return new F(a, b)
  }
  l.Float32BufferAttribute = F
  l.Float64Attribute = function (a, b) {
    console.warn(
      'THREE.Float64Attribute has been removed. Use new THREE.Float64BufferAttribute() instead.',
    )
    return new Qd(a, b)
  }
  l.Float64BufferAttribute = Qd
  l.FloatType = 1015
  l.Fog = df
  l.FogExp2 = cf
  l.Font = Vg
  l.FontLoader = Wg
  l.FrontFaceDirectionCCW = 1
  l.FrontFaceDirectionCW = 0
  l.FrontSide = 0
  l.Frustum = Sd
  l.GammaEncoding = 3007
  l.Geometry = P
  l.GeometryUtils = {
    merge: function (a, b, c) {
      console.warn(
        'THREE.GeometryUtils: .merge() has been moved to Geometry. Use geometry.merge( geometry2, matrix, materialIndexOffset ) instead.',
      )
      if (b.isMesh) {
        b.matrixAutoUpdate && b.updateMatrix()
        var d = b.matrix
        b = b.geometry
      }
      a.merge(b, d, c)
    },
    center: function (a) {
      console.warn(
        'THREE.GeometryUtils: .center() has been moved to Geometry. Use geometry.center() instead.',
      )
      return a.center()
    },
  }
  l.GreaterDepth = 6
  l.GreaterEqualDepth = 5
  l.GreaterEqualStencilFunc = 518
  l.GreaterStencilFunc = 516
  l.GridHelper = If
  l.Group = Vc
  l.HalfFloatType = 1016
  l.HemisphereLight = sf
  l.HemisphereLightHelper = wd
  l.HemisphereLightProbe = Xg
  l.IcosahedronBufferGeometry = cd
  l.IcosahedronGeometry = je
  l.ImageBitmapLoader = Tg
  l.ImageLoader = pd
  l.ImageUtils = Qb
  l.ImmediateRenderObject = Ee
  l.IncrementStencilOp = 7682
  l.IncrementWrapStencilOp = 34055
  l.InstancedBufferAttribute = Cf
  l.InstancedBufferGeometry = Bf
  l.InstancedInterleavedBuffer = fh
  l.InstancedMesh = gf
  l.Int16Attribute = function (a, b) {
    console.warn(
      'THREE.Int16Attribute has been removed. Use new THREE.Int16BufferAttribute() instead.',
    )
    return new Od(a, b)
  }
  l.Int16BufferAttribute = Od
  l.Int32Attribute = function (a, b) {
    console.warn(
      'THREE.Int32Attribute has been removed. Use new THREE.Int32BufferAttribute() instead.',
    )
    return new Pd(a, b)
  }
  l.Int32BufferAttribute = Pd
  l.Int8Attribute = function (a, b) {
    console.warn(
      'THREE.Int8Attribute has been removed. Use new THREE.Int8BufferAttribute() instead.',
    )
    return new Ld(a, b)
  }
  l.Int8BufferAttribute = Ld
  l.IntType = 1013
  l.InterleavedBuffer = wb
  l.InterleavedBufferAttribute = Zd
  l.Interpolant = La
  l.InterpolateDiscrete = 2300
  l.InterpolateLinear = 2301
  l.InterpolateSmooth = 2302
  l.InvertStencilOp = 5386
  l.JSONLoader = function () {
    console.error('THREE.JSONLoader has been removed.')
  }
  l.KeepStencilOp = 7680
  l.KeyframeTrack = ua
  l.LOD = be
  l.LatheBufferGeometry = jd
  l.LatheGeometry = ve
  l.Layers = rg
  l.LensFlare = function () {
    console.error(
      'THREE.LensFlare has been moved to /examples/js/objects/Lensflare.js',
    )
  }
  l.LessDepth = 2
  l.LessEqualDepth = 3
  l.LessEqualStencilFunc = 515
  l.LessStencilFunc = 513
  l.Light = da
  l.LightProbe = bb
  l.LightProbeHelper = xd
  l.LightShadow = nb
  l.Line = pa
  l.Line3 = ih
  l.LineBasicMaterial = T
  l.LineCurve = Ga
  l.LineCurve3 = Ya
  l.LineDashedMaterial = yc
  l.LineLoop = hf
  l.LinePieces = 1
  l.LineSegments = Z
  l.LineStrip = 0
  l.LinearEncoding = 3e3
  l.LinearFilter = 1006
  l.LinearInterpolant = ze
  l.LinearMipMapLinearFilter = 1008
  l.LinearMipMapNearestFilter = 1007
  l.LinearMipmapLinearFilter = 1008
  l.LinearMipmapNearestFilter = 1007
  l.LinearToneMapping = 1
  l.Loader = X
  l.LoaderUtils = Kh
  l.LoadingManager = Og
  l.LogLuvEncoding = 3003
  l.LoopOnce = 2200
  l.LoopPingPong = 2202
  l.LoopRepeat = 2201
  l.LuminanceAlphaFormat = 1025
  l.LuminanceFormat = 1024
  l.MOUSE = { LEFT: 0, MIDDLE: 1, RIGHT: 2, ROTATE: 0, DOLLY: 1, PAN: 2 }
  l.Material = R
  l.MaterialLoader = Af
  l.Math = N
  l.Matrix3 = ka
  l.Matrix4 = I
  l.MaxEquation = 104
  l.Mesh = ia
  l.MeshBasicMaterial = Ia
  l.MeshDepthMaterial = Kb
  l.MeshDistanceMaterial = Lb
  l.MeshFaceMaterial = function (a) {
    console.warn(
      'THREE.MeshFaceMaterial has been removed. Use an Array instead.',
    )
    return a
  }
  l.MeshLambertMaterial = wc
  l.MeshMatcapMaterial = xc
  l.MeshNormalMaterial = vc
  l.MeshPhongMaterial = Wa
  l.MeshPhysicalMaterial = tc
  l.MeshStandardMaterial = kb
  l.MeshToonMaterial = uc
  l.MinEquation = 103
  l.MirroredRepeatWrapping = 1002
  l.MixOperation = 1
  l.MultiMaterial = function (a) {
    void 0 === a && (a = [])
    console.warn('THREE.MultiMaterial has been removed. Use an Array instead.')
    a.isMultiMaterial = !0
    a.materials = a
    a.clone = function () {
      return a.slice()
    }
    return a
  }
  l.MultiplyBlending = 4
  l.MultiplyOperation = 0
  l.NearestFilter = 1003
  l.NearestMipMapLinearFilter = 1005
  l.NearestMipMapNearestFilter = 1004
  l.NearestMipmapLinearFilter = 1005
  l.NearestMipmapNearestFilter = 1004
  l.NeverDepth = 0
  l.NeverStencilFunc = 512
  l.NoBlending = 0
  l.NoColors = 0
  l.NoToneMapping = 0
  l.NormalBlending = 1
  l.NotEqualDepth = 7
  l.NotEqualStencilFunc = 517
  l.NumberKeyframeTrack = nd
  l.Object3D = E
  l.ObjectLoader = Ef
  l.ObjectSpaceNormalMap = 1
  l.OctahedronBufferGeometry = lc
  l.OctahedronGeometry = ie
  l.OneFactor = 201
  l.OneMinusDstAlphaFactor = 207
  l.OneMinusDstColorFactor = 209
  l.OneMinusSrcAlphaFactor = 205
  l.OneMinusSrcColorFactor = 203
  l.OrthographicCamera = De
  l.PCFShadowMap = 1
  l.PCFSoftShadowMap = 2
  l.ParametricBufferGeometry = ad
  l.ParametricGeometry = fe
  l.Particle = function (a) {
    console.warn('THREE.Particle has been renamed to THREE.Sprite.')
    return new $d(a)
  }
  l.ParticleBasicMaterial = function (a) {
    console.warn(
      'THREE.ParticleBasicMaterial has been renamed to THREE.PointsMaterial.',
    )
    return new Va(a)
  }
  l.ParticleSystem = function (a, b) {
    console.warn('THREE.ParticleSystem has been renamed to THREE.Points.')
    return new Yc(a, b)
  }
  l.ParticleSystemMaterial = function (a) {
    console.warn(
      'THREE.ParticleSystemMaterial has been renamed to THREE.PointsMaterial.',
    )
    return new Va(a)
  }
  l.Path = ab
  l.PerspectiveCamera = na
  l.Plane = Sa
  l.PlaneBufferGeometry = ic
  l.PlaneGeometry = Td
  l.PlaneHelper = Je
  l.PointCloud = function (a, b) {
    console.warn('THREE.PointCloud has been renamed to THREE.Points.')
    return new Yc(a, b)
  }
  l.PointCloudMaterial = function (a) {
    console.warn(
      'THREE.PointCloudMaterial has been renamed to THREE.PointsMaterial.',
    )
    return new Va(a)
  }
  l.PointLight = vf
  l.PointLightHelper = ud
  l.Points = Yc
  l.PointsMaterial = Va
  l.PolarGridHelper = Jf
  l.PolyhedronBufferGeometry = Fa
  l.PolyhedronGeometry = ge
  l.PositionalAudio = bh
  l.PositionalAudioHelper = yd
  l.PropertyBinding = ja
  l.PropertyMixer = dh
  l.QuadraticBezierCurve = Za
  l.QuadraticBezierCurve3 = mb
  l.Quaternion = ya
  l.QuaternionKeyframeTrack = Ae
  l.QuaternionLinearInterpolant = nf
  l.REVISION = '110'
  l.RGBADepthPacking = 3201
  l.RGBAFormat = 1023
  l.RGBA_ASTC_10x10_Format = 37819
  l.RGBA_ASTC_10x5_Format = 37816
  l.RGBA_ASTC_10x6_Format = 37817
  l.RGBA_ASTC_10x8_Format = 37818
  l.RGBA_ASTC_12x10_Format = 37820
  l.RGBA_ASTC_12x12_Format = 37821
  l.RGBA_ASTC_4x4_Format = 37808
  l.RGBA_ASTC_5x4_Format = 37809
  l.RGBA_ASTC_5x5_Format = 37810
  l.RGBA_ASTC_6x5_Format = 37811
  l.RGBA_ASTC_6x6_Format = 37812
  l.RGBA_ASTC_8x5_Format = 37813
  l.RGBA_ASTC_8x6_Format = 37814
  l.RGBA_ASTC_8x8_Format = 37815
  l.RGBA_PVRTC_2BPPV1_Format = 35843
  l.RGBA_PVRTC_4BPPV1_Format = 35842
  l.RGBA_S3TC_DXT1_Format = 33777
  l.RGBA_S3TC_DXT3_Format = 33778
  l.RGBA_S3TC_DXT5_Format = 33779
  l.RGBDEncoding = 3006
  l.RGBEEncoding = 3002
  l.RGBEFormat = 1023
  l.RGBFormat = 1022
  l.RGBM16Encoding = 3005
  l.RGBM7Encoding = 3004
  l.RGB_ETC1_Format = 36196
  l.RGB_PVRTC_2BPPV1_Format = 35841
  l.RGB_PVRTC_4BPPV1_Format = 35840
  l.RGB_S3TC_DXT1_Format = 33776
  l.RawShaderMaterial = md
  l.Ray = ac
  l.Raycaster = Ri
  l.RectAreaLight = zf
  l.RectAreaLightHelper = vd
  l.RedFormat = 1028
  l.ReinhardToneMapping = 2
  l.RepeatWrapping = 1e3
  l.ReplaceStencilOp = 7681
  l.ReverseSubtractEquation = 102
  l.RingBufferGeometry = id
  l.RingGeometry = ue
  l.Scene = Kd
  l.SceneUtils = {
    createMultiMaterialObject: function () {
      console.error(
        'THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js',
      )
    },
    detach: function () {
      console.error(
        'THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js',
      )
    },
    attach: function () {
      console.error(
        'THREE.SceneUtils has been moved to /examples/js/utils/SceneUtils.js',
      )
    },
  }
  l.ShaderChunk = Q
  l.ShaderLib = ib
  l.ShaderMaterial = Aa
  l.ShadowMaterial = sc
  l.Shape = Pb
  l.ShapeBufferGeometry = qc
  l.ShapeGeometry = pc
  l.ShapePath = Ug
  l.ShapeUtils = xb
  l.ShortType = 1011
  l.Skeleton = ff
  l.SkeletonHelper = td
  l.SkinnedMesh = ce
  l.SmoothShading = 2
  l.Sphere = ub
  l.SphereBufferGeometry = Ob
  l.SphereGeometry = te
  l.Spherical = Ti
  l.SphericalHarmonics3 = Gf
  l.SphericalReflectionMapping = 305
  l.Spline = kh
  l.SplineCurve = $a
  l.SplineCurve3 = Xi
  l.SpotLight = uf
  l.SpotLightHelper = sd
  l.SpotLightShadow = tf
  l.Sprite = $d
  l.SpriteMaterial = Nb
  l.SrcAlphaFactor = 204
  l.SrcAlphaSaturateFactor = 210
  l.SrcColorFactor = 202
  l.StaticCopyUsage = 35046
  l.StaticDrawUsage = 35044
  l.StaticReadUsage = 35045
  l.StereoCamera = Ni
  l.StreamCopyUsage = 35042
  l.StreamDrawUsage = 35040
  l.StreamReadUsage = 35041
  l.StringKeyframeTrack = of
  l.SubtractEquation = 101
  l.SubtractiveBlending = 3
  l.TOUCH = { ROTATE: 0, PAN: 1, DOLLY_PAN: 2, DOLLY_ROTATE: 3 }
  l.TangentSpaceNormalMap = 0
  l.TetrahedronBufferGeometry = bd
  l.TetrahedronGeometry = he
  l.TextBufferGeometry = hd
  l.TextGeometry = se
  l.Texture = S
  l.TextureLoader = rf
  l.TorusBufferGeometry = fd
  l.TorusGeometry = ne
  l.TorusKnotBufferGeometry = ed
  l.TorusKnotGeometry = me
  l.Triangle = va
  l.TriangleFanDrawMode = 2
  l.TriangleStripDrawMode = 1
  l.TrianglesDrawMode = 0
  l.TubeBufferGeometry = mc
  l.TubeGeometry = le
  l.UVMapping = 300
  l.Uint16Attribute = function (a, b) {
    console.warn(
      'THREE.Uint16Attribute has been removed. Use new THREE.Uint16BufferAttribute() instead.',
    )
    return new bc(a, b)
  }
  l.Uint16BufferAttribute = bc
  l.Uint32Attribute = function (a, b) {
    console.warn(
      'THREE.Uint32Attribute has been removed. Use new THREE.Uint32BufferAttribute() instead.',
    )
    return new cc(a, b)
  }
  l.Uint32BufferAttribute = cc
  l.Uint8Attribute = function (a, b) {
    console.warn(
      'THREE.Uint8Attribute has been removed. Use new THREE.Uint8BufferAttribute() instead.',
    )
    return new Md(a, b)
  }
  l.Uint8BufferAttribute = Md
  l.Uint8ClampedAttribute = function (a, b) {
    console.warn(
      'THREE.Uint8ClampedAttribute has been removed. Use new THREE.Uint8ClampedBufferAttribute() instead.',
    )
    return new Nd(a, b)
  }
  l.Uint8ClampedBufferAttribute = Nd
  l.Uncharted2ToneMapping = 3
  l.Uniform = Hf
  l.UniformsLib = K
  l.UniformsUtils = Kl
  l.UnsignedByteType = 1009
  l.UnsignedInt248Type = 1020
  l.UnsignedIntType = 1014
  l.UnsignedShort4444Type = 1017
  l.UnsignedShort5551Type = 1018
  l.UnsignedShort565Type = 1019
  l.UnsignedShortType = 1012
  l.VSMShadowMap = 3
  l.Vector2 = z
  l.Vector3 = q
  l.Vector4 = ca
  l.VectorKeyframeTrack = od
  l.Vertex = function (a, b, c) {
    console.warn('THREE.Vertex has been removed. Use THREE.Vector3 instead.')
    return new q(a, b, c)
  }
  l.VertexColors = 2
  l.VertexNormalsHelper = Fe
  l.VideoTexture = Lg
  l.WebGLMultisampleRenderTarget = qg
  l.WebGLRenderTarget = sa
  l.WebGLRenderTargetCube = Ib
  l.WebGLRenderer = Hg
  l.WebGLUtils = wi
  l.WireframeGeometry = $c
  l.WireframeHelper = function (a, b) {
    console.warn(
      'THREE.WireframeHelper has been removed. Use THREE.WireframeGeometry instead.',
    )
    return new Z(
      new $c(a.geometry),
      new T({ color: void 0 !== b ? b : 16777215 }),
    )
  }
  l.WrapAroundEnding = 2402
  l.XHRLoader = function (a) {
    console.warn('THREE.XHRLoader has been renamed to THREE.FileLoader.')
    return new Qa(a)
  }
  l.ZeroCurvatureEnding = 2400
  l.ZeroFactor = 200
  l.ZeroSlopeEnding = 2401
  l.ZeroStencilOp = 0
  l.global = am
  l.sRGBEncoding = 3001
  THREE = l
  console.log(THREE,333333)
  Object.defineProperty(l, '__esModule', { value: !0 })
})
console.log(THREE,333333333333333333333)
export default THREE
