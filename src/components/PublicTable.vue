<template>
  <div>
    <el-table
      ref="tableData"
      :data="tableData"
      :border="border"
      v-loading="loading"
      :highlight-current-row="highlightcurrentrow"
      :stripe="stripe"
      :height="height"
      :max-height="maxheight"
      :row-class-name="tableRowClassName"
      :show-summary="showSummary"
      :summary-method="getSummaries"
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange"
      :row-key="rowKey"
      class="tableClass"
      style="width:100%;"
    >
      <!-- 展开行 -->
      <el-table-column v-if="expand" label="展开" type="expand" width="60">
        <template slot-scope="scope">
          <el-form label-position="left" inline class="demo-table-expand" label-width="80px">
            <el-form-item
              v-for="(item,index) in detilOptions"
              :label="item.label + ': '"
              :key="index"
            >
              <span v-if="!item.html&&!item.formatter">{{scope.row[item.prop]}}</span>
              <span v-if="!item.html && item.formatter">{{item.formatter(scope.row[item.prop])}}</span>
              <span v-html="scope.row[item.prop]" v-if="item.html"></span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <!-- 单选 -->
      <el-table-column label="单选" v-if="radioShow" align="center">
        <template slot-scope="scope">
          <el-radio
            v-model="selectedRadio"
            :label="scope.row[radioLabel]"
            @change.native="getCurrentRow(scope.row,selectedRadio)"
          >{{scope.row[radioLabel]}}</el-radio>
        </template>
      </el-table-column>
      <!-- 多选 -->
      <el-table-column v-if="selection" type="selection" width="50" :reserve-selection="true"></el-table-column>
      <template v-for="colConfig in colConfigs">
        <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
        <el-table-column v-else v-bind="colConfig" :key="colConfig.index">
          <template v-if="colConfig.children1">
            <template v-for="colConfig1 in colConfig.children1">
              <slot v-if="colConfig1.slot" :name="colConfig1.slot"></slot>
              <el-table-column v-else v-bind="colConfig1" :key="colConfig1.index">
                <template v-if="colConfig1.children2">
                  <template v-for="colConfig2 in colConfig1.children2">
                    <slot v-if="colConfig2.slot" :name="colConfig2.slot"></slot>
                    <el-table-column v-else v-bind="colConfig2" :key="colConfig2.index"></el-table-column>
                  </template>
                </template>
              </el-table-column>
            </template>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <el-pagination
      v-if="showPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "PublicTable",
  props: {
    tableData: {
      //表数据
      type: Array,
      default: function() {
        return [];
      }
    },
    colConfigs: {
      //列名称
      type: Array,
      default: function() {
        return [];
      }
    },
    stripe: {
      // 斑马纹表格
      type: Boolean,
      default: false
    },
    border: {
      // 边框表格
      type: Boolean,
      default: false
    },
    loading: {
      //加载图标
      type: Boolean,
      default: false
    },
    highlightcurrentrow: {
      // 选中行是否高光显示
      type: Boolean,
      default: false
    },
    height: {
      // 固定表头
      type: [String, Number],
      default: null
    },
    maxheight: {
      // 流体高度
      type: [String, Number],
      default: null
    },
    tableRowClassName: {
      //带状态表格
      type: Function
    },
    showSummary: {
      //是否显示合计行
      type: Boolean,
      default: false
    },
    getSummaries: {
      //合计行方法
      type: Function
    },
    radioShow: {
      //是否显示单选
      type: Boolean,
      default: false
    },
    radioLabel: {
      //单选的label名称，需要唯一
      type: [String, Number],
      default: null
    },
    selection: {
      //多选
      type: Boolean,
      default: false
    },
    expand: {
      //是否显示展开行
      type: Boolean,
      default: false
    },
    detilOptions: {
      //展开行数据
      type: Array,
      default: function() {
        return [];
      }
    },
    rowKey: {
      //展开行功能才必须添加该属性
      type: Function
    },

    /*<!--分页-->*/
    showPage: {
      //是否显示分页组件
      type: Boolean,
      default: false
    },
    currentPage: {
      // 当前页
      type: Number,
      default: 1
    },
    pageSize: {
      // 页大小
      type: Number,
      default: 0
    },
    pageSizes: {
      // 分页数组
      type: Array,
      default: function() {
        return [];
      }
    },
    total: {
      // 总数
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedRadio: ""
    };
  },
  components: {},
  computed: {},
  watch: {},
  created() {},
  methods: {
    handleSizeChange(val) {
      //改变分页大小事件
      this.$emit("handleSizeChange", val);
    },
    handleCurrentChange(val) {
      //翻页事件
      this.$emit("handleCurrentChange", val);
    },
    handleSortChange(column) {
      //自定义排序
      this.$emit("handleSortChange", column);
    },
    getCurrentRow(row, val) {
      //单选
      this.$emit("radioChange", row, val);
    },
    handleSelectionChange(val) {
      //当选择项发生变化时会触发该事件
      this.$emit("handleSelectionChange", val);
    }
  }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="less" >
.tableClass {
  .el-table__fixed-right {
    height: 100% !important; //设置高优先，以覆盖内联样式，固定列时需要添加这个改变样式
  }
}

.el-table .warning-row {
  background: #fdf5e6;
}

.el-table .success-row {
  background: #f0f9eb;
}
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
