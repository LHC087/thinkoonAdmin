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
          <el-form-item label="资源类型：" prop="species" v-if="addForm.type===1">
            <el-select v-model="addForm.species" placeholder="请选择" filterable style="width:100%;">
              <el-option
                v-for="item in speciesList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资源名称：" prop="resource_name">
            <el-input type="text" v-model.trim="addForm.resource_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="上传头像:">
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
              <span class="col-redtip">大小：290 X 290 px</span>
            </span>
          </el-form-item>
          <el-form-item label="头像地址：" prop="resource_img_url">
            <el-input type="text" v-model.trim="addForm.resource_img_url" clearable disabled></el-input>
          </el-form-item>
          <el-form-item label="资源简短概述：">
            <vue-tags-input
              v-model.trim="tag"
              :tags="tags"
              @tags-changed="newTags => tags = newTags"
              placeholder="请填写资源简短概述：（按Enter键或换行键确定）"
            />
          </el-form-item>
          <el-form-item label="资源关联外链：" prop="resource_relate_url">
            <el-input type="text" v-model.trim="addForm.resource_relate_url" clearable></el-input>
          </el-form-item>
          <el-form-item label="资源排序：" prop="order_num">
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
        <el-table-column slot="showimg" label="头像展示" align="center" width="120">
          <template slot-scope="scope">
            <div class="tableshowimg">
              <img
                @click="openShowBigImg(scope.row.resource_img_url)"
                :src="require('./../../server/public' + scope.row.resource_img_url)"
                alt="表格图片"
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column slot="tag" label="资源简短概述" align="center" min-width="200">
          <template slot-scope="scope">
            <div
              v-for="(item,index) in scope.row.resource_desc.split(',')"
              :key="index"
              class="showtabletag"
            >
              <el-tag>{{item}}</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column slot="link" label="资源关联外链" align="center">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top" popper-class="col-bluetip">
              <span>{{scope.row.resource_relate_url}}</span>
              <div slot="reference" class="name-wrapper">
                <a
                  :href="scope.row.resource_relate_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="buttonText"
                >{{scope.row.resource_relate_url}}</a>
              </div>
            </el-popover>
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
import VueTagsInput from "@johmun/vue-tags-input";
import Public_Table from "@/components/PublicTable"; //引入公共封装表格
import {
  selectResourceMatrix,
  getResourceMatrixList,
  addResourceMatrix,
  updateResourceMatrix,
  deleteResourceMatrix,
  changeResourceMatrixInvaild
} from "@/api/api";

export default {
  name: "ResourceMatrix",
  components: { Public_Table, VueTagsInput },
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
          prop: "resource_id",
          width: "50",
          align: "center",
          fixed: "left"
        },
        { label: "资源名称", prop: "resource_name", align: "center" },
        { slot: "showimg" },
        { label: "头像地址", prop: "resource_img_url", align: "center" },
        { slot: "tag" },
        { slot: "link" },
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
          label: "资源类型",
          prop: "species",
          align: "center",
          formatter: val => {
            //这里的val是row Object
            return this.speciesTypeFormat(val.type, val.species);
          }
        },
        { label: "资源排序", prop: "order_num", width: "80", align: "center" },
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
        { value: 0, label: "首页资源" },
        { value: 1, label: "详情资源" }
      ],
      speciesList: [
        { value: 0, label: "独家KOL" },
        { value: 1, label: "白鹿美妆" },
        { value: 2, label: "石榴美食" },
        { value: 3, label: "有宝母婴" }
      ],
      invaildList: [{ value: 0, label: "生效" }, { value: 1, label: "无效" }],
      tag: "",
      tags: [],
      addForm: {
        type: 0,
        species: "",
        resource_name: "",
        resource_img_url: "",
        resource_desc: "",
        resource_relate_url: "",
        order_num: "",
        invaild: 0
      },
      addRules: {
        type: [{ required: true, message: "不能为空", trigger: "change" }],
        species: [{ required: true, message: "不能为空", trigger: "change" }],
        resource_name: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        resource_img_url: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        // resource_desc: [
        //    { required: true, message: "不能为空", trigger: "blur" }
        // ],
        resource_relate_url: [
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
      return val === 0 ? "首页资源" : val === 1 ? "详情资源" : " ";
    },
    speciesTypeFormat(val1, val2) {
      switch (val1) {
        case 0:
          switch (val2) {
            default:
              return "首页资源不分类";
              break;
          }
          break;
        case 1:
          switch (val2) {
            case 0:
              return "独家KOL";
              break;
            case 1:
              return "白鹿美妆";
              break;
            case 2:
              return "石榴美食";
              break;
            case 3:
              return "有宝母婴";
              break;
          }
          break;
      }
    },
    noAllowedInputE(e) {
      importNoAllowedInputE(e);
    },
    selectFun() {
      selectResourceMatrix({ selectKey: this.selectKey }).then(res => {
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
      getResourceMatrixList().then(res => {
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

    getRowKey(row) {
      //表格展开行才添加该属性
      return row.resource_id; //需要数据的唯一值
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
      changeResourceMatrixInvaild({
        invaild: ins.invaild == true ? 0 : 1,
        resource_id: ins.resource_id
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
      this.publicTitle = "添加资源";
    },
    updateFun(ins) {
      this.publicType = "update";
      this.publicTitle = "编辑资源";
      this.publicId = ins.resource_id;
      this.addForm.type = ins.type;
      this.addForm.species = ins.species;
      this.addForm.resource_name = ins.resource_name;
      this.addForm.resource_img_url = ins.resource_img_url;
      this.addForm.resource_desc = "";
      let arr = ins.resource_desc.split(",");
      let all = [];
      for (var i = 0; i < arr.length; i++) {
        all.push({ text: arr[i] });
      }
      this.tags = all;
      this.addForm.resource_relate_url = ins.resource_relate_url;
      this.addForm.order_num = ins.order_num;
      this.imageUrl = require("./../../server/public" + ins.resource_img_url);
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
          deleteResourceMatrix({
            resource_id: rows.resource_id
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
          let arr = [];
          let str = "";
          if (that.tags.length == 0) {
            that.$message.info("请输入资源简短概述，按Enter键或换行键确定");
          } else {
            for (var i = 0; i < that.tags.length; i++) {
              arr.push(that.tags[i].text);
            }
            for (var i = 0; i < arr.length; i++) {
              str += arr[i] + ",";
            }
            if (str.length > 0) {
              str = str.substr(0, str.length - 1);
            }
            that.loadingbtn = true;
            if (that.publicType == "add") {
              addResourceMatrix({
                type: that.addForm.type,
                species: that.addForm.species,
                resource_name: that.addForm.resource_name,
                resource_img_url: that.addForm.resource_img_url,
                resource_desc: str,
                resource_relate_url: that.addForm.resource_relate_url,
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
              updateResourceMatrix({
                type: that.addForm.type,
                species: that.addForm.species,
                resource_name: that.addForm.resource_name,
                resource_img_url: that.addForm.resource_img_url,
                resource_desc: str,
                resource_relate_url: that.addForm.resource_relate_url,
                order_num: that.addForm.order_num,
                invaild: that.addForm.invaild,
                resource_id: that.publicId
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
      this.addForm.resource_img_url = "";
      this.fileList = [];
    },

    //上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.addForm.resource_img_url = res.avatarUrl;
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
          species: "",
          resource_name: "",
          resource_img_url: "",
          resource_desc: "",
          resource_relate_url: "",
          order_num: "",
          invaild: 0
        };
        this.tags = [];
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
