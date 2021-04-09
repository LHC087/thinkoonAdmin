<template>
  <el-container>
    <el-main>
      <el-card>
        <el-row :gutter="24">
          <el-col :span="8">
            <div class="grid-content bg-purple"></div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-input
                placeholder="请输入内容"
                v-model.trim="selectKey"
                class="input-with-select"
                size="small"
                clearable
                @clear="selectFun"
              >
                <el-button slot="append" icon="el-icon-search" @click="selectFun">搜索</el-button>
              </el-input>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="grid-content bg-purple">
              <el-button
                type="primary"
                @click="addFun"
                icon="el-icon-plus"
                class="floatright"
                size="small"
              >新增</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>
      <el-dialog
        :title="publicTitle"
        :visible.sync="addDialog"
        @close="resetForm('addForm')"
        align="center"
        :close-on-click-modal="false"
      >
        <el-form :model="addForm" :rules="addRules" ref="addForm" label-width="120px">
          <el-form-item label="图片类型：" prop="type">
            <el-select v-model="addForm.type" placeholder="请选择" filterable style="width:100%;">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传图片:">
            <el-upload
              action="/api/upload/uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              accept="image/png, image/gif, image/jpg, image/jpeg"
              list-type="picture"
              :file-list="fileList"
              :on-exceed="handleExceed"
              :limit="1"
            >
              <i class="el-icon-plus newicon"></i>
            </el-upload>
            <div class="showimage" v-if="imageUrl">
              <img :src="imageUrl" referrer="no-referrer|origin|unsafe-url">
              <i @click="deleteImg()" class="el-icon-delete"></i>
            </div>
            <span>
              <span class="col-redtip">图片格式：png jpg</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="col-redtip">大小：1200 X 594 px</span>
            </span>
          </el-form-item>

          <el-form-item label="图片地址：" prop="reds_img_url">
            <el-input type="text" v-model.trim="addForm.reds_img_url" clearable disabled></el-input>
          </el-form-item>
          <el-form-item label="网页宣传链接：" prop="reds_relate_url">
            <el-input
              type="text"
              v-model.trim="addForm.reds_relate_url"
              placeholder="输入网页宣传链接"
              clearable
            ></el-input>
          </el-form-item>

          <el-button
            type="primary"
            @click.stop="submitForm('addForm')"
            v-preventReClick
            :loading="loadingbtn"
          >提交</el-button>
        </el-form>
      </el-dialog>
      <Public_Table
        :tableData="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
        :colConfigs="colConfigs"
        :highlightcurrentrow="highlightcurrentrow"
        :loading="loading"
        :showPage="showPage"
        @handleSizeChange="handleSizeChange"
        @handleCurrentChange="handleCurrentChange"
        :currentPage="currentPage"
        :pageSizes="pageSizes"
        :pageSize="pageSize"
        :total="total"
        :rowKey="getRowKey"
      >
        <el-table-column slot="sequence" label="序号" align="center" width="60" fixed="left">
          <template slot-scope="scope">
            <span>{{scope.$index+(currentPage - 1) * pageSize + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column slot="showimg" label="封面图" align="center" width="120">
          <template slot-scope="scope">
            <div class="tableshowimg">
              <img
                @click="openShowBigImg(scope.row.reds_img_url)"
                :src="require('./../../server/public' + scope.row.reds_img_url)"
                alt="表格图片"
              >
            </div>
          </template>
        </el-table-column>

        <el-table-column slot="operate" label="操作" align="center" fixed="right" width="100">
          <template slot-scope="scope">
            <el-tooltip content="编辑" placement="top" popper-class="atooltip">
              <i class="el-icon-edit iatooltip" @click="updateFun(scope.row)"></i>
            </el-tooltip>

            <el-tooltip content="删除" placement="top" popper-class="col-bgred">
              <i class="el-icon-delete iatooltip col-red" @click="deleteFun(scope.row)"></i>
            </el-tooltip>
          </template>
        </el-table-column>
      </Public_Table>
      <el-dialog
        title="查看大图"
        :visible.sync="showBigImgDialog"
        align="center"
        :close-on-click-modal="false"
      >
        <img
          v-if="showBigImg"
          :src="require('./../../server/public' + showBigImg)"
          alt="查看大图"
          referrer="no-referrer|origin|unsafe-url"
          style="width:100%;"
        >
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
import Public_Table from "@/components/PublicTable"; //引入公共封装表格
import {
  selectRedRecruiting,
  getRedRecruitingList,
  addRedRecruiting,
  updateRedRecruiting,
  deleteRedRecruiting
} from "@/api/api";

export default {
  name: "RedRecruiting",
  components: { Public_Table },
  data() {
    return {
      //查看大图
      showBigImg: "",
      showBigImgDialog: false,
      //上传图片
      imageUrl: "",
      fileList: [],
      selectKey: "",
      colConfigs: [
        //无表头数据
        { slot: "sequence" }, //插槽，添加序号
        {
          label: "ID",
          prop: "reds_id",
          width: "50",
          align: "center",
          fixed: "left"
        },
        { slot: "showimg" },
        { label: "图片地址", prop: "reds_img_url", align: "center" },
        {
          label: "图片类型",
          prop: "type",
          align: "center",
          formatter: val => {
            //这里的val是row Object
            return this.typeFormat(val.type);
          }
        },
        {
          label: "网页宣传链接",
          prop: "reds_relate_url",
          align: "center"
        },

        { slot: "operate" } //插槽，添加操作列
      ],
      tableData: [], //表格数据
      loading: false, //加载图标
      highlightcurrentrow: true, //选中行是否高光

      //分页
      showPage: true, //是否显示分页
      currentPage: 1, //当前页
      pageSizes: [10, 20, 30, 40, 50], //改变页面大小值
      pageSize: 10, //页面大小
      total: 0, //表总数

      publicTitle: "",
      publicType: "",
      publicId: "",
      addDialog: false,
      loadingbtn: false,
      typeList: [
        { value: 0, label: "首页背景" },
        { value: 1, label: "详情背景" }
      ],
      addForm: {
        type: 0,
        reds_img_url: "",
        reds_relate_url: ""
      },
      addRules: {
        type: [{ required: true, message: "不能为空", trigger: "change" }],
        reds_img_url: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        reds_relate_url: [
          // { required: true, message: "不能为空", trigger: "blur" }
        ]
      }
    };
  },

  mounted: function() {
    this.getTableData(); //获取表格数据
  },
  methods: {
    typeFormat(val) {
      return val === 0 ? "首页背景" : val === 1 ? "详情背景" : " ";
    },
    noAllowedInputE(e) {
      importNoAllowedInputE(e);
    },
    selectFun() {
      selectRedRecruiting({ selectKey: this.selectKey }).then(res => {
        this.tableData = res;

        this.total = this.tableData.length;
      });
    },
    getTableData() {
      getRedRecruitingList().then(res => {
        this.tableData = res;

        this.total = this.tableData.length;
      });
    },

    getRowKey(row) {
      //表格展开行才添加该属性
      return row.reds_id; //需要数据的唯一值
    },
    //分页
    handleSizeChange(val) {
      //改变页面大小事件
      this.pageSize = val;
    },
    handleCurrentChange(val) {
      //翻页事件
      this.currentPage = val;
    },
    openShowBigImg(ins) {
      this.showBigImg = ins;
      this.showBigImgDialog = true;
    },

    addFun() {
      this.addDialog = true;
      this.publicType = "add";
      this.publicTitle = "添加";
    },
    updateFun(ins) {
      this.publicType = "update";
      this.publicTitle = "编辑";
      this.publicId = ins.reds_id;
      this.addForm.type = ins.type;
      this.addForm.reds_img_url = ins.reds_img_url;
      this.addForm.reds_relate_url = ins.reds_relate_url;
      this.imageUrl = require("./../../server/public" + ins.reds_img_url);
      this.addDialog = true;
    },
    deleteFun(rows) {
      var that = this;
      that
        .$confirm("确定要删除次条数据?删除将不可恢复", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          center: true
        })
        .then(() => {
          deleteRedRecruiting({
            reds_id: rows.reds_id
          })
            .then(res => {
              that.$message.success("删除成功");
              that.getTableData();
            })
            .catch(err => {
              that.$message.error("操作失败，请联系管理员");
            });
        })
        .catch(() => {
          that.$message.info("已取消");
        });
    },

    //表单提交
    submitForm: function(formName) {
      var that = this;
      that.$refs[formName].validate(valid => {
        if (valid) {
          that.loadingbtn = true;
          if (that.publicType == "add") {
            addRedRecruiting({
              type: that.addForm.type,
              reds_img_url: that.addForm.reds_img_url,
              reds_relate_url: that.addForm.reds_relate_url
            })
              .then(res => {
                that.$message.success("添加成功");
                that.resetForm("addForm");
                that.getTableData();
              })
              .catch(err => {
                that.$message.error("操作失败，请联系管理员");
              });
          } else if (that.publicType == "update") {
            updateRedRecruiting({
              type: that.addForm.type,
              reds_img_url: that.addForm.reds_img_url,
              reds_relate_url: that.addForm.reds_relate_url,
              reds_id: that.publicId
            })
              .then(res => {
                that.$message.success("编辑成功");
                that.resetForm("addForm");
                that.getTableData();
              })
              .catch(err => {
                that.$message.error("操作失败，请联系管理员");
              });
          }
        } else {
          return false;
        }
      });
    },
    // 文件超出个数限制时的钩子
    handleExceed(files, fileList) {
      this.$message.error("最多上传1张图片");
    },
    deleteImg() {
      this.imageUrl = "";
      this.addForm.reds_img_url = "";
      this.fileList = [];
    },

    //上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.addForm.reds_img_url = res.avatarUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      return isJPG || isBMP || isGIF || isPNG;
    },

    resetForm: function(formName) {
      this.loadingbtn = false;
      if (formName == "addForm") {
        this.$refs["addForm"].resetFields();
        this.addForm = {
          type: 0,
          reds_img_url: "",
          reds_relate_url: ""
        };
        this.deleteImg();
        //将新增的弹出框关闭
        this.addDialog = false;
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
