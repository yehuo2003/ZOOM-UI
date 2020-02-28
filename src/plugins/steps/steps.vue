<template>
  <div class="zoom-steps">
    <div class="zoom-steps-normal">
      <div style="width: 25%" class="normal progress-done">
        <div class="steps-icon">
          <span class="zoom-icon icon-success-fill"></span>
        </div>
        <div class="steps-line line-done"></div>
        <div class="node-description">
          <p class="steps-name">Basic Info.</p>
          <p class="steps-status">已完成</p>
        </div>
      </div>
      <div style="width: 25%" class="normal progress-current">
        <div class="steps-icon">
          <span>1</span>
        </div>
        <div class="steps-line"></div>
        <div class="node-description">
          <p class="steps-name">Vics tab.</p>
          <p class="steps-status">进行中</p>
        </div>
      </div>
      <div style="width: 25%" class="normal progress-wait">
        <div class="steps-icon">
          <span>1</span>
        </div>
        <div class="steps-line"></div>
        <div class="node-description">
          <p class="steps-name">not done.</p>
          <p class="steps-status">未完成</p>
        </div>
      </div>
      <div style="width: 25%" class="normal progress-wait">
        <div class="steps-icon">
          <span>1</span>
        </div>
        <div class="steps-line"></div>
        <div class="node-description">
          <p class="steps-name">not done2</p>
          <p class="steps-status">未完成</p>
        </div>
      </div>
    </div>

    <ul class="zoom-steps-advanced">
      <li style="width: 25%;">
        <a>
          <span class="dot doing"></span>
          Base Info.
          <span class="count">3</span>
        </a>
      </li>
      <li style="width: 25%;">
        <a>
          <span class="dot done"></span>
          warning
        </a>
      </li>
      <li style="width: 25%;">
        <a>
          <span class="dot"></span>
          test
        </a>
      </li>
      <li class="current" style="width: 25%;">
        <a>
          <span class="dot doing"></span>
          Involved Parties
          <span class="count">10</span>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "zoom-steps",
  props: {
  },
};
</script>
<style>
.zoom-steps .zoom-steps-advanced li a::after,
.zoom-steps .zoom-steps-advanced li a::before {
  border-top: 14px solid transparent;
  border-bottom: 14px solid transparent;
  top: 0;
  content: "";
}
.zoom-steps .zoom-steps-advanced li a::after {
  border-left: 9px solid #fff;
  position: absolute;
  right: -9px;
  z-index: 1;
}
.zoom-steps .zoom-steps-advanced .count {
  background: #f5222d;
  border-radius: 10px;
  color: #fff;
  display: inline-block;
  font-size: 12px;
  height: 18px;
  line-height: 18px;
  padding: 0 6px;
  text-align: center;
  white-space: nowrap;
  position: absolute;
  top: -10px;
  right: 10px;
}
.zoom-steps .zoom-steps-advanced .dot.done {
  background: #52c41a;
}
.zoom-steps .zoom-steps-advanced .dot.doing {
  background: #fa8c16;
}
.zoom-steps .zoom-steps-advanced .dot {
  height: 8px;
  width: 8px;
  padding: 0;
  right: 0;
  border-radius: 50%;
  display: inline-block;
}
.zoom-steps .zoom-steps-advanced li.current a {
  background: #1890ff;
  color: #fff;
}
.zoom-steps .zoom-steps-advanced li:first-child a {
  border-top-left-radius: 3px;
  border-bottom-left-radius: 3px;
  border-top: 1px solid #d9d9d9;
}
.zoom-steps .zoom-steps-advanced li a {
  border: 1px solid #d9d9d9;
  border-right: none;
  display: block;
  text-align: center;
  position: relative;
  text-decoration: none;
  color: #999;
  font-size: 12px;
}
.zoom-steps .zoom-steps-advanced li {
  line-height: 28px;
  display: inline-block;
  background: #fff;
}

.zoom-steps .zoom-steps-normal .progress-current .name {
  color: #1890ff;
  font-weight: 700;
}
.zoom-steps .zoom-steps-normal .node-description .status {
  font-size: 12px;
  float: left;
  width: 100%;
}
.zoom-steps .zoom-steps-normal .node-description {
  position: relative;
  margin-top: 6px;
  overflow: hidden;
  text-align: center;
}
.zoom-steps .zoom-steps-normal .progress-done .steps-line,
.zoom-steps .zoom-steps-normal .progress-current .steps-line {
  background: #1890ff;
}
.zoom-steps .zoom-steps-normal .normal:last-child .steps-line {
  width: 0;
}
.zoom-steps .zoom-steps-normal .steps-line {
  background: #dbdbdb;
  height: 4px;
  left: 50%;
  top: -8px;
  position: relative;
}
.zoom-steps .zoom-steps-normal .progress-current .steps-icon {
  background: #1890ff;
  color: #fff;
  font-size: 12px;
}
.zoom-steps .zoom-steps-normal .progress-done .steps-icon>.zoom-icon {
  font-size: 20px;
}
.zoom-steps .zoom-steps-normal .progress-done .steps-icon {
  background: #fff;
  color: #1890ff;
  width: 20px;
  height: 20px;
  line-height: 20px;
  font-size: 20px;
}
.zoom-steps .zoom-steps-normal .steps-icon {
  width: 20px;
  height: 20px;
  line-height: 20px;
  position: relative;
  font-size: 12px;
  text-align: center;
  left: calc(50% - 10px);
  top: 4px;
  border-radius: 50%;
  background: #d9d9d9;
  color: #fff;
  cursor: pointer;
  z-index: 15;
}
.zoom-steps .zoom-steps-normal .normal {
  display: block;
  float: left;
}
.zoom-steps .zoom-steps-normal {
  overflow: hidden;
}
</style>