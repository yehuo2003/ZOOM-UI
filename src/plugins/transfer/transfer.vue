<template>
  <div class="zoom-transfer transfer-clear">
      <div class="transfer-clear">
        <!-- 左边原始数据 -->
        <div class="transfer-panel">
        <div class="transfer-panel-header">
            所有数据列表
            <span class="transfer-panel-selected">{{list.length}} / {{op && op.data ? op.data.length : 0}}</span>
        </div>
        <div class="transfer-panel-search">
            <zoom-input v-model="inputdata" @keyup.enter.native="serachData" :op="inputOp"></zoom-input>
        </div>
        <div class="transfer-panel-content">
            <zoom-grid ref="grid" :op="gridOp"></zoom-grid>
            <!-- <div class="transfer-panel-pager">
                <zoom-pager></zoom-pager>
            </div> -->
        </div>
        </div>
        <!-- 中间图标 -->
        <div class="transfer-center">
        <span class="zoom-icon icon-trim"></span>
        </div>
        <!-- 右边选中数据 -->
        <div class="transfer-panel select-panel">
        <div class="transfer-panel-header">
            已选中数据列表
            <!-- 计算选中的 -->
            <span class="transfer-panel-selected">{{list.length}}</span>
        </div>
        <div class="transfer-panel-search">
            <zoom-input v-model="addinputdata"  @keyup.enter.native="serachaddData" :op="addinputOp"></zoom-input>
        </div>
        <div class="transfer-panel-content">
            <zoom-grid ref="addGrid" :op="addOp"></zoom-grid>
        </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
    name: 'zoom-transfer',
    props: {
        op: {
            type: Object,
            title:Array,    //  表头
            data: Array,    //  表数据内容
            serach: String  //  需要搜索的字段
        }
    },
    data() {
        return {
            list: [],
            temporary: [],
            addtemporary: [],
            serachName: '',   //  要搜索的字段
            titleList: [{fieId: 'indexId', header: ''}],  //  原始表头数据,两个都是一样的
            addtitleList: [
                {fieId: 'indexId', header: ''},
                {fieId: 'btns', header: '操作',
                    btns: [
                        {
                            title: '移除',
                            css: {
                                icon: 'icon-close'
                            },
                            onClick: val => {
                                //    把点击的行从表中删除
                                let list = [];
                                this.list.forEach(item => {
                                    if (item.indexId !== val.indexId) {
                                        list.push(item);
                                    }
                                });
                                // 取消时候,把左边对应的选中的复选框也去除选中
                                this.$refs['grid'].bodyData.forEach(item => {
                                    if (item.indexId === val.indexId) {
                                        item.checked = false;
                                    }
                                })
                                this.$refs['addGrid'].load(list);
                                this.list = list;
                            }
                        }
                    ]
                }
            ],  //  添加表格的数据,两个都是一样的
            inputdata: '',
            addinputdata: '',
            inputOp: {
                IconStyle: 'icon-search',
                onClick: () => {
                    this.serachData();
                },
                placeHolder: '请输入要搜索的元素内容'
            },
            // 添加数据的输入框
            addinputOp: {
                IconStyle: 'icon-search',
                onClick: () => {
                    this.serachaddData();
                },
                placeHolder: '请输入要搜索的元素内容'
            },
            gridOp: {
                hideIndex: true,
                isChecked: true,
                // 点击行 把点击的数据加入到另一个表格中
                onClick: (dom, element, col, fieId) => {
                    setTimeout(() => {
                        let list = this.list = this.$refs['grid'].getData();
                        this.$refs['addGrid'].load(list);
                    });
                },
                title: [],
                data: []
            },
            addOp: {
               hideIndex: true,
               title: [],
            }
        }
    },
    created() {
        if (this.op && this.op.data && this.op.title) {
            // 获取表头数据
            this.op.title.forEach(item => {
                this.titleList.push(item);
                this.addtitleList.push(item);
            })
            let data = this.op.data;
            // 为表头和表格赋值
            this.gridOp.title = this.titleList;
            this.addOp.title = this.addtitleList;
            this.gridOp.data = data;
            if (this.op.serach) {
                this.serachName = this.op.serach;
            }
        }
    },
    methods: {
        // 动态加载数据
        load(data) {
            this.list = [];
            this.$refs['addGrid'].load(this.list);
            this.$refs['grid'].load(data);
        },
        // 封装搜索功能
        // 传入当前表格数据, input输入框内容和临时数组
        serach(grid, inputdata, temporaryList) {
            if (inputdata) {
                // 搜索功能
                let data = this.$refs[grid].bodyData;
                // 一个临时的数组, 如果临时数组没有数据, 就先拷贝一份
                this.temporaryList = this.temporaryList ? this.temporaryList : [];
                if (this.temporaryList.length === 0) {
                    this.temporaryList = data;
                } else {
                    data = this.temporaryList;
                }
                let list = [];
                // 循环表格里数组, 把查找到复合条件的元素push进list里展示出来
                data.forEach(item => {
                    if (item[this.serachName].indexOf(inputdata) > -1) {
                        list.push(item);
                    }
                });
                this.$refs[grid].load(list);
            } else {
                // 如果搜索框什么内容都没有 把刚才临时数组的数据加回去
                this.$refs[grid].load(this.temporaryList);
            }
        },
        // 搜索表格里数据
        serachData() {
            this.serach.apply(this, ['grid', this.inputdata, this.temporary]);
        },
        // 搜索添加输入框里的数据
        serachaddData() {
            this.serach.apply(this, ['addGrid', this.addinputdata, this.addtemporary]);
        },
    }
}
</script>
<style>
.zoom-transfer .transfer-center .icon-trim {
    font-size: 30px;
    color: #666;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 100%;
    height: 30px;
    transform: rotate(90deg);
}
.zoom-transfer .transfer-center {
    position: relative;
    text-align: center;
    margin: 0 16px;
    float: left;
    width: 36px;
    height: 530px;
}
/* 左边 */
.zoom-transfer .transfer-panel .transfer-panel-pager {
    width: 100%;
    height: 30px;
    padding: 0 8px;
    text-align: right;
    margin: 8px 0;
}
.zoom-transfer .transfer-panel .transfer-panel-content .no-data,
.zoom-transfer .transfer-panel .transfer-panel-content .no--match-data {
    position: absolute;
    width: 100px;
    height: 40px;
    line-height: 40px;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
}
.zoom-transfer .transfer-panel .transfer-panel-content {
    width: 100%;
    min-height: 400px;
    padding: 0 8px;
    position: relative;
    margin-bottom: 10px;
}
.zoom-transfer .transfer-panel .transfer-panel-search>.zoom-input {
    width: 100%;
}
.zoom-transfer .transfer-panel .transfer-panel-search {
    width: 100%;
    margin-top: 8px;
    padding: 0 8px;
    height: 40px;
    text-align: left;
}
.zoom-transfer .transfer-panel .transfer-panel-header .transfer-panel-selected {
    float: right;
    text-align: right;
}
.zoom-transfer .transfer-panel .transfer-panel-header {
    height: 36px;
    width: 100%;
    line-height: 36px;
    background: #f5f5f5;
    padding: 0 8px;
    text-align: left;
    color: #333;
    border-bottom: 1px solid #d9d9d9;
}
.zoom-transfer .transfer-panel {
    width: 45%;
    border: 1px solid #d9d9d9;
    float: left;
    border-radius: 3px;
}
.zoom-transfer {
    width: 100%;
    position: relative;
}
.transfer-clear::after, .transfer-clear::before {
    content: " ";
    display: table;
}
</style>
