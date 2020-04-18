<template>
<div class="zoom-color-picker">
  <div v-drag ref="color-picker-container" class="color-picker-container" :class="{'active':isShowPicker}">
    <div ref="color" class="color"></div>
    <div ref="wheel" class="wheel"></div>
    <div class="overlay"></div>
    <div ref="h-marker" class="h-marker marker"></div>
    <div ref="sl-marker" class="sl-marker marker"></div>
  </div>
  <button
    v-show="!hideSelect"
    ref="color-picker"
    @click="openPicker"
    :disabled="isdisabled"
    class="select-color"
    :style="'background-color:' + color"
  ></button>
</div>
</template>
<script>
export default {
  name: "zoom-color-picker",
  props:{
		/*由父组件传递的默认颜色*/
		defaultColor:{
			type:String,
			default:"#000000"
    },
    disabled: [Boolean],
    hideSelect: {
      type: Boolean,
      default: false
    }
	},
  data(){
		return {
			isShowPicker:false,
			wheel: this.$refs['wheel'] || '',
      color: this.defaultColor,
      setDisable: false,  //  设置的禁用状态
      isdisabled: false,
			dom:{
				hMarker: null,
				slMarker: null,
				color: null,
				targetElem: null,
				container: null
      },
      temporallyColor: '', //临时颜色
			radius: 84,
			square: 100,
			width: 194
		}
	},
  mounted() {
    this.isdisabled = this.disabled;
    this.color = this.CheckIsColor(this.defaultColor);
    this.dom.container = this.$refs['color-picker-container'];
    this.dom.hMarker = this.$refs['h-marker'];
    this.dom.slMarker = this.$refs['sl-marker'];
    this.dom.color = this.$refs['color'];
    this.dom.targetElem = this.$refs['color-picker'];
    this.init();
  },
  methods: {
    init() {
      this.posInit();
      this.eventBind();
        // Init color
      this.setColor(this.color);
    },
    /**
     * 动态设置禁用属性 传true禁用 false解除
     */
    setDisabled(status) {
      this.setDisable = status;
      this.isdisabled = status;
    },
    /**
     * 验证颜色合法性
     */
    CheckIsColor(bgVal) {
      let color = '#000000';
      if (!bgVal || !bgVal.length) {
        return color
      }
      if (bgVal.indexOf('#') === 0 || bgVal.indexOf('rgb') === 0 || bgVal.indexOf('RGB') === 0) {
        color = bgVal;
      }
      return color;
    },
    /**
     * 主动调用选择框
     */
    picker() {
      this.$refs['color-picker'].click();
    },
    openPicker() {
      if (this.disabled) {
        return
      }
      this.isShowPicker = true;
      this.wheel = this.$refs['wheel'];
      /*色盘打开的时候绑定点击事件*/
      document.addEventListener("click", this.documentClick);
    },
    closePicker() {
      this.isShowPicker = false;
      /*色盘关闭的时候解绑事件*/
      document.removeEventListener("click", this.documentClick);
    },
    eventBind() {
      this.dom.container.addEventListener("mousedown", this.mousedown);
    },
    documentClick(e) {
      /*你可能不需要关闭色盘，那这个方法也是可以不需要的*/
      let parents1 = this.getParents(e, this.dom.container, true);
      let parents2 = this.getParents(e, this.dom.targetElem, true);
      if(parents1.length === 0 && parents2.length === 0){
        this.closePicker();
      }
    },
    posInit() {
      /*色盘的位置计算*/
      let target = this.dom.targetElem;
      let top = this.getElementViewTop(target);
      let left = this.getElementViewLeft(target);
      this.dom.container.style.position = "fixed";
      this.dom.container.style.top = (top) +'px';
      this.dom.container.style.left = (left + this.dom.targetElem.offsetWidth) + 'px';
    },
    getElementViewLeft(element) {
      /*获取元素距离视窗左部距离*/
      let actualLeft = element.offsetLeft;
      let current = element.offsetParent;
      while (current !== null) {
        actualLeft += current.offsetLeft;
        current = current.offsetParent;
      }
      let elementScrollLeft = document.documentElement.scrollLeft;
      if (document.compatMode === 'BackCompat') {
        elementScrollLeft = document.body.scrollLeft;
      }
      return actualLeft - elementScrollLeft;
    },
    getElementViewTop(element) {
      /*获取元素距离视窗顶部距离*/
      let actualTop = element.offsetTop;
      let current = element.offsetParent;
      while (current !== null) {
        actualTop += current. offsetTop;
        current = current.offsetParent;
      }
      let elementScrollTop = document.documentElement.scrollTop;
      if (document.compatMode === 'BackCompat') {
        elementScrollLeft = document.body.scrollTop;
      }
      return actualTop - elementScrollTop;
    },
    getParents(e, parent, andSelf) {
      /*获取祖先节点，返回一个数组*/
      let target = e.target;
      parent = typeof parent==='string' ? document.querySelector(parent) : parent;

      let curTarget = target;

      let arr = typeof andSelf === "undefined" ? [curTarget] : [];
      let result = [];

      while(true) {
        if ((typeof parent !== 'undefined' && curTarget == parent)||
          typeof parent === 'undefined' && curTarget.nodeType === 9) {
          arr.push(curTarget);
          break;
        }
        if (curTarget != undefined) arr.push(curTarget)

        if (curTarget.parentNode != undefined) {
          curTarget = curTarget.parentNode
        } else {
          break;
        }
      }
      if (parent != undefined) {
        return arr.indexOf(parent) > -1 ? arr : [];
      } else {
        return arr;
      }
    },
    getParent(e) {
      /*获取父节点*/
      return e.target.nodeType !== 9 && e.target.parentNode;
    },
    /**
     * 以下为组件内部函数
     * 算法来自网络
     */
    updateValue(event) {
      let that = event.target;
      if (that.value && that.value != this.color) {
          this.setColor(that.value);
      }
    },
    /**
    * Change color with HTML syntax #123456
    */
    setColor(color) {
      let unpack = this.unpack(color);
      if (color && unpack) {
        this.color = color;
        this.rgb = unpack;
        this.hsl = this.RGBToHSL(this.rgb);
        this.updateDisplay();
      }
    },
    /**
    * Change color with HSL triplet [0..1, 0..1, 0..1]
    */
    setHSL(hsl) {
      this.hsl = hsl;
      this.rgb = this.HSLToRGB(hsl);
      this.color = this.pack(this.rgb);
      this.updateDisplay();
    },
    /**
    * Retrieve the coordinates of the given event relative to the center
    * of the widget.
    */
    widgetCoords(event) {
      let x, y;
      let el = event.target || event.srcElement;
      let reference = this.wheel;

      if (typeof event.offsetX != 'undefined') {
        // Use offset coordinates and find common offsetParent
        let pos = { x: event.offsetX, y: event.offsetY };

        // Send the coordinates upwards through the offsetParent chain.
        let e = el;
        while (e) {
          e.mouseX = pos.x;
          e.mouseY = pos.y;
          pos.x += e.offsetLeft;
          pos.y += e.offsetTop;
          e = e.offsetParent;
        }

        // Look for the coordinates starting from the wheel widget.
        e = reference;
        let offset = { x: 0, y: 0 }
        while (e) {
          if (typeof e.mouseX != 'undefined') {
            x = e.mouseX - offset.x;
            y = e.mouseY - offset.y;
            break;
          }
          offset.x += e.offsetLeft;
          offset.y += e.offsetTop;
          e = e.offsetParent;
        }

        // Reset stored coordinates
        e = el;
        while (e) {
          e.mouseX = undefined;
          e.mouseY = undefined;
          e = e.offsetParent;
        }
      }
      else {
        // Use absolute coordinates
        pos = this.absolutePosition(reference);
        x = (event.pageX || 0*(event.clientX + document.documentElement.scrollLeft)) - pos.x;
        y = (event.pageY || 0*(event.clientY + document.documentElement.scrollTop)) - pos.y;
      }
      // Subtract distance to middle
      return { x: x - this.width / 2, y: y - this.width / 2 };
    },
    /**
    * Mousedown handler
    */
    mousedown(event) {
      if (!document.dragging) {
        document.documentElement.addEventListener('mousemove', this.mousemove);
        document.documentElement.addEventListener('mouseup', this.mouseup);
        document.dragging = true;
      }

      // Check which area is being dragged
      let pos = this.widgetCoords(event);
      this.circleDrag = Math.max(Math.abs(pos.x), Math.abs(pos.y)) * 2 > this.square;

      // Process
      this.mousemove(event);
      return false;
    },
    /**
    * Mousemove handler
    */
    mousemove(event) {
      // Get coordinates relative to color picker center
      let pos = this.widgetCoords(event);

      // Set new HSL parameters
      if (this.circleDrag) {
      let hue = Math.atan2(pos.x, -pos.y) / 6.28;
      if (hue < 0) hue += 1;
        this.setHSL([hue, this.hsl[1], this.hsl[2]]);
      }
      else {
        let sat = Math.max(0, Math.min(1, -(pos.x / this.square) + .5));
        let lum = Math.max(0, Math.min(1, -(pos.y / this.square) + .5));
        this.setHSL([this.hsl[0], sat, lum]);
      }
      return false;
    },
    /**
    * Mouseup handler
    */
    mouseup() {
      // Uncapture mouse
      document.documentElement.removeEventListener('mousemove', this.mousemove);
      document.documentElement.removeEventListener('mouseup', this.mouseup);
      document.dragging = false;
    },
    /**
    * Update the markers and styles
    */
    updateDisplay() {
      // Markers
      let angle = this.hsl[0] * 6.28;

      this.dom.hMarker.style.left = Math.round(Math.sin(angle) * this.radius + this.width / 2) + 'px';
      this.dom.hMarker.style.top = Math.round(-Math.cos(angle) * this.radius + this.width / 2) + 'px';

      this.dom.slMarker.style.left = Math.round(this.square * (.5 - this.hsl[1]) + this.width / 2) + 'px';
      this.dom.slMarker.style.top = Math.round(this.square * (.5 - this.hsl[2]) + this.width / 2) + 'px';

      // Saturation/Luminance gradient
      this.dom.color.style.backgroundColor = this.pack(this.HSLToRGB([this.hsl[0], 1, 0.5]));


      // important
      // 将获取到的最新的color值emit出去 使用this.temporallyColor节流
      if (this.temporallyColor !== this.color) {
        this.$emit("onChange",this.color);
        this.temporallyColor = this.color
      }
      //self.dom.targetElem.style.backgroundColor = self.color;
      //self.dom.targetElem.style.color = self.hsl[2] > 0.5 ? '#000' : '#fff';

      // Change linked value
      // if (self.dom.targetElem.value && self.dom.targetElem.value != self.color) {
      //     self.dom.targetElem.value = self.color;
      // }
    },
    /**
    * Get absolute position of element
    */
    absolutePosition(el) {
      let r = { x: el.offsetLeft, y: el.offsetTop };
      // Resolve relative to offsetParent
      if (el.offsetParent) {
        let tmp = this.absolutePosition(el.offsetParent);
        r.x += tmp.x;
        r.y += tmp.y;
      }
      return r;
    },
    /* letious color utility functions */
    pack(rgb) {
      let r = Math.round(rgb[0] * 255);
      let g = Math.round(rgb[1] * 255);
      let b = Math.round(rgb[2] * 255);
      return '#' + (r < 16 ? '0' : '') + r.toString(16) + (g < 16 ? '0' : '') + g.toString(16) + (b < 16 ? '0' : '') + b.toString(16);
    },
    unpack(color) {
      if (color.length == 7) {
        return [
          parseInt('0x' + color.substring(1, 3)) / 255,
          parseInt('0x' + color.substring(3, 5)) / 255,
          parseInt('0x' + color.substring(5, 7)) / 255
        ];
      } else if (color.length == 4) {
        return [
          parseInt('0x' + color.substring(1, 2)) / 15,
          parseInt('0x' + color.substring(2, 3)) / 15,
          parseInt('0x' + color.substring(3, 4)) / 15
        ];
      }
    },
    HSLToRGB(hsl) {
      let m1, m2, r, g, b;
      let h = hsl[0], s = hsl[1], l = hsl[2];
      m2 = (l <= 0.5) ? l * (s + 1) : l + s - l*s;
      m1 = l * 2 - m2;
      return [
        this.hueToRGB(m1, m2, h + 0.33333),
        this.hueToRGB(m1, m2, h),
        this.hueToRGB(m1, m2, h - 0.33333)
      ];
    },
    hueToRGB(m1, m2, h) {
      h = (h < 0) ? h + 1 : ((h > 1) ? h - 1 : h);
      if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
      if (h * 2 < 1) return m2;
      if (h * 3 < 2) return m1 + (m2 - m1) * (0.66666 - h) * 6;
      return m1;
    },
    RGBToHSL(rgb) {
      let min, max, delta, h, s, l;
      let r = rgb[0], g = rgb[1], b = rgb[2];
      min = Math.min(r, Math.min(g, b));
      max = Math.max(r, Math.max(g, b));
      delta = max - min;
      l = (min + max) / 2;
      s = 0;
      if (l > 0 && l < 1) {
        s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));
      }
      h = 0;
      if (delta > 0) {
        if (max == r && max != g) h += (g - b) / delta;
        if (max == g && max != b) h += (2 + (b - r) / delta);
        if (max == b && max != r) h += (4 + (r - g) / delta);
        h /= 6;
      }
      return [h, s, l];
    }
  }
};
</script>
<style>
.zoom-color-picker {
  display: inline-block;
}
.zoom-color-picker .select-color {
  width: 30px;
  height: 30px;
  outline: 0px;
  cursor: pointer;
  border: solid 2px rgba(149, 166, 167, 0.4);
}
.zoom-color-picker .select-color[disabled] {
  border: 1px solid #d9d9d9;
  color: #bfbfbf;
  background: #f5f5f5;
  cursor: not-allowed;
  box-shadow: none;
}
.zoom-color-picker .select-color:not([disabled]):hover {
  box-shadow: 0.4px 0.4px 0.8px rgba(0, 0, 0, 0.042), 1px 1px 2px rgba(0, 0, 0, 0.061), 1.9px 1.9px 3.8px rgba(0, 0, 0, 0.075), 3.4px 3.4px 6.7px rgba(0, 0, 0, 0.089), 6.3px 6.3px 12.5px rgba(0, 0, 0, 0.108), 15px 15px 30px rgba(0, 0, 0, 0.15);
}
.zoom-color-picker .color-picker-container {
  position: fixed;
  z-index: 666;
  display: none;
}
.zoom-color-picker .color-picker-container.active{
  display: block;
}
.zoom-color-picker .color-picker-container * {
  position: absolute;
  cursor: crosshair;
}
.zoom-color-picker .color-picker-container, .zoom-color-picker .color-picker-container .wheel {
  width: 195px;
  height: 195px;
}
.zoom-color-picker .color-picker-container .color, .zoom-color-picker .color-picker-container .overlay {
  top: 47px;
  left: 47px;
  width: 101px;
  height: 101px;
}
.zoom-color-picker .color-picker-container .wheel {
  width: 195px;
  height: 195px;
  background: url(./images/wheel.png) no-repeat;
  -webkit-background-size: 100%;
  background-size: 100%;
}
.zoom-color-picker .color-picker-container .overlay {
  background: url(./images/mask.png) no-repeat;
  -webkit-background-size: 100%;
  background-size: 100%;
}
.zoom-color-picker .color-picker-container .marker {
  width: 17px;
  height: 17px;
  margin: -8px 0 0 -8px;
  overflow: hidden;
  background: url(./images/marker.png) no-repeat;
  -webkit-background-size: 100%;
  background-size: 100%;
}
</style>