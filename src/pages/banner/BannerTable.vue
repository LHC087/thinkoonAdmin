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
              <span class="col-redtip">大小：1920 X 900 px</span>
            </span>
          </el-form-item>

          <el-form-item label="图片地址：" prop="banner_img_url">
            <el-input type="text" v-model.trim="addForm.banner_img_url" clearable disabled></el-input>
          </el-form-item>
          <el-form-item label="生效序号：" prop="order_num">
            <el-input
              type="text"
              v-model.trim="addForm.order_num"
              placeholder="输入大于0的数"
              clearable
              @keydown.native="noAllowedInputE"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否生效：" prop="invaild">
            <el-select v-model="addForm.invaild" placeholder="请选择" filterable style="width:100%;">
              <el-option
                v-for="item in invaildList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
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
        <el-table-column slot="showimg" label="图片展示" align="center" width="120">
          <template slot-scope="scope">
            <div class="tableshowimg">
              <img
                @click="openShowBigImg(scope.row.banner_img_url)"
                :src="require('./../../server/public' + scope.row.banner_img_url)"
                alt="表格图片"
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column slot="invaild" label="是否生效" align="center" width="120">
          <template slot-scope="scope">
            <el-switch
              style="display: block"
              v-model="scope.row.invaild"
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="是"
              inactive-text="否"
              @change="changeInvaildFun(scope.row)"
            ></el-switch>
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
import {
  checkTextZeroNum,
  importNoAllowedInputE
} from "../../utils/checkrules.js";
import Public_Table from "@/components/PublicTable"; //引入公共封装表格
import {
  selectBanner,
  getBannerList,
  addBanner,
  updateBanner,
  deleteBanner,
  changeBannerInvaild
} from "@/api/api";

export default {
  name: "BannerTable",
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
          prop: "banner_id",
          width: "50",
          align: "center",
          fixed: "left"
        },
        { slot: "showimg" },
        { label: "图片地址", prop: "banner_img_url", align: "center" },
        {
          label: "图片类型",
          prop: "type",
          align: "center",
          formatter: val => {
            //这里的val是row Object
            return this.typeFormat(val.type);
          }
        },
        { label: "生效序号", prop: "order_num", width: "80", align: "center" },
        { slot: "invaild" },
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
        { value: 0, label: "首页轮播" },
        { value: 1, label: "详情背景" }
      ],
      invaildList: [{ value: 0, label: "生效" }, { value: 1, label: "无效" }],
      addForm: {
        type: 0,
        banner_img_url: "",
        order_num: "",
        invaild: 0
      },
      addRules: {
        type: [{ required: true, message: "不能为空", trigger: "change" }],
        banner_img_url: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        order_num: [
          { required: true, message: "请输入数量", trigger: "blur" },
          {
            validator: checkTextZeroNum,
            trigger: "blur"
          }
        ],
        invaild: [{ required: true, message: "不能为空", trigger: "change" }]
      }
    };
  },

  mounted: function() {
    this.getTableData(); //获取表格数据
  },
  methods: {
    typeFormat(val) {
      return val === 0 ? "首页轮播" : val === 1 ? "详情背景" : " ";
    },
    noAllowedInputE(e) {
      importNoAllowedInputE(e);
    },
    selectFun() {
      selectBanner({ selectKey: this.selectKey }).then(res => {
        this.tableData = res;
        this.tableData.forEach(item => {
          if (item.invaild == 0) {
            item.invaild = true;
          } else if (item.invaild == 1) {
            item.invaild = false;
          }
        });
        this.total = this.tableData.length;
      });
    },
    getTableData() {
      getBannerList().then(res => {
        if (res.length > 0) {
          this.tableData = res;
          this.tableData.forEach(item => {
            if (item.invaild == 0) {
              item.invaild = true;
            } else if (item.invaild == 1) {
              item.invaild = false;
            }
          });
          this.total = this.tableData.length;
        } else {
          this.$message.info("暂无数据");
        }
      });
    },

    getRowKey(row) {
      //表格展开行才添加该属性
      return row.banner_id; //需要数据的唯一值
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
    changeInvaildFun(ins) {
      changeBannerInvaild({
        invaild: ins.invaild == true ? 0 : 1,
        banner_id: ins.banner_id
      })
        .then(res => {
          this.$message.success("操作成功");
          this.getTableData();
        })
        .catch(err => {
          this.$message.error("操作失败，请联系管理员");
        });
    },
    addFun() {
      this.addDialog = true;
      this.publicType = "add";
      this.publicTitle = "添加轮播图";
    },
    updateFun(ins) {
      this.publicType = "update";
      this.publicTitle = "编辑轮播图";
      this.publicId = ins.banner_id;
      this.addForm.type = ins.type;
      this.addForm.banner_img_url = ins.banner_img_url;
      this.addForm.order_num = ins.order_num;
      this.imageUrl =  require("./../../server/public" + ins.banner_img_url);
      if (ins.invaild == true) {
        this.addForm.invaild = 0;
      } else if (ins.invaild == false) {
        this.addForm.invaild = 1;
      }
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
          deleteBanner({
            banner_id: rows.banner_id
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
            addBanner({
              type: that.addForm.type,
              banner_img_url: that.addForm.banner_img_url,
              order_num: that.addForm.order_num,
              invaild: that.addForm.invaild
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
            updateBanner({
              type: that.addForm.type,
              banner_img_url: that.addForm.banner_img_url,
              order_num: that.addForm.order_num,
              invaild: that.addForm.invaild,
              banner_id: that.publicId
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
      this.addForm.banner_img_url = "";
      this.fileList = [];
    },

    //上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.addForm.banner_img_url = res.avatarUrl;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isGIF = file.type === "image/gif";
      const isPNG = file.type === "image/png";
      const isBMP = file.type === "image/bmp";
      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error("上传图片必须是JPG/GIF/PNG/BMP 格式!");
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG || isBMP || isGIF || isPNG || isLt2M;
    },

    resetForm: function(formName) {
      this.loadingbtn = false;
      if (formName == "addForm") {
        this.$refs["addForm"].resetFields();
        this.addForm = {
          type: 0,
          banner_img_url: "",
          order_num: "",
          invaild: 0
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
