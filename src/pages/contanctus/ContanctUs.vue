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
          <el-form-item label="公司名称：" prop="company_name">
            <el-input type="text" v-model.trim="addForm.company_name" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系电话：" prop="telphone">
            <el-input type="text" v-model.trim="addForm.telphone" clearable></el-input>
          </el-form-item>
          <el-form-item label="深圳地址：" prop="area1">
            <el-input type="text" v-model.trim="addForm.area1" clearable></el-input>
          </el-form-item>
          <el-form-item label="上海地址：" prop="area2">
            <el-input type="text" v-model.trim="addForm.area2" clearable></el-input>
          </el-form-item>
          <el-form-item label="北京地址：" prop="area3">
            <el-input type="text" v-model.trim="addForm.area3" clearable></el-input>
          </el-form-item>
          <el-form-item label="商务合作微信:">
            <el-upload
              action="/api/upload/uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccessbus"
              :before-upload="beforeAvatarUpload"
              accept="image/png, image/gif, image/jpg, image/jpeg"
              list-type="picture"
              :file-list="fileListbus"
              :on-exceed="handleExceed"
              :limit="1"
            >
              <i class="el-icon-plus newicon"></i>
            </el-upload>
            <div class="showimage" v-if="imageUrlbus">
              <img :src="imageUrlbus" referrer="no-referrer|origin|unsafe-url">
              <i @click="deleteImg('bus')" class="el-icon-delete"></i>
            </div>
            <span>
              <span class="col-redtip">图片格式：png jpg</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="col-redtip">大小：90 X 90 px</span>
            </span>
          </el-form-item>
          <el-form-item label="图片地址：" prop="business_weixin_url">
            <el-input type="text" v-model.trim="addForm.business_weixin_url" clearable disabled></el-input>
          </el-form-item>
          <el-form-item label="红人签约微信:">
            <el-upload
              action="/api/upload/uploadImg"
              :show-file-list="false"
              :on-success="handleAvatarSuccessred"
              :before-upload="beforeAvatarUpload"
              accept="image/png, image/gif, image/jpg, image/jpeg"
              list-type="picture"
              :file-list="fileListred"
              :on-exceed="handleExceed"
              :limit="1"
            >
              <i class="el-icon-plus newicon"></i>
            </el-upload>
            <div class="showimage" v-if="imageUrlred">
              <img :src="imageUrlred" referrer="no-referrer|origin|unsafe-url">
              <i @click="deleteImg('red')" class="el-icon-delete"></i>
            </div>
            <span>
              <span class="col-redtip">图片格式：png jpg</span>&nbsp;&nbsp;&nbsp;&nbsp;
              <span class="col-redtip">大小：90 X 90 px</span>
            </span>
          </el-form-item>
          <el-form-item label="图片地址：" prop="red_weixin_url">
            <el-input type="text" v-model.trim="addForm.red_weixin_url" clearable disabled></el-input>
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
        <el-table-column slot="showimgbus" label="商务合作微信" align="center" width="120">
          <template slot-scope="scope">
            <div class="tableshowimg">
              <img
                @click="openShowBigImg(scope.row.business_weixin_url)"
                :src="require('./../../server/public' + scope.row.business_weixin_url)"
                alt="表格图片"
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column slot="showimgred" label="红人签约微信" align="center" width="120">
          <template slot-scope="scope">
            <div class="tableshowimg">
              <img
                @click="openShowBigImg(scope.row.red_weixin_url)"
                :src="require('./../../server/public' + scope.row.red_weixin_url)"
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
import Public_Table from "@/components/PublicTable"; //引入公共封装表格
import {
  selectContanctUs,
  getContanctUsList,
  addContanctUs,
  updateContanctUs,
  deleteContanctUs,
  changeContanctUsInvaild
} from "@/api/api";

export default {
  name: "ContanctUs",
  components: { Public_Table },
  data() {
    return {
      //查看大图
      showBigImg: "",
      showBigImgDialog: false,
      //上传图片
      imageUrlbus: "",
      fileListbus: [],
      imageUrlred: "",
      fileListred: [],
      selectKey: "",
      colConfigs: [
        //无表头数据
        { slot: "sequence" }, //插槽，添加序号
        {
          label: "ID",
          prop: "id",
          width: "50",
          align: "center",
          fixed: "left"
        },
        { label: "公司名称", prop: "company_name", align: "center" },
        { label: "联系电话", prop: "telphone", align: "center" },
        { label: "深圳地址", prop: "area1", align: "center" },
        { label: "上海地址", prop: "area2", align: "center" },
        { label: "北京地址", prop: "area3", align: "center" },
        { slot: "showimgbus" },
        {
          label: "商务合作图片地址",
          prop: "business_weixin_url",
          align: "center"
        },
        { slot: "showimgred" },
        { label: "红人签约图片地址", prop: "red_weixin_url", align: "center" },
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
      invaildList: [{ value: 0, label: "生效" }, { value: 1, label: "无效" }],
      addForm: {
        company_name: "",
        telphone: "",
        area1: "",
        area2: "",
        area3: "",
        business_weixin_url: "",
        red_weixin_url: "",
        invaild: 0
      },
      addRules: {
        company_name: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        telphone: [
          { required: true, message: "不能为空", trigger: "blur" },
          {
            pattern: /^[^\u4e00-\u9fa5]+$/,
            message: "联系电话不能含中文",
            trigger: "blur"
          }
        ],
        area1: [
          // { required: true, message: "不能为空", trigger: "blur" }
        ],
        area2: [
          // { required: true, message: "不能为空", trigger: "blur" }
        ],
        area3: [
          // { required: true, message: "不能为空", trigger: "blur" }
        ],
        business_weixin_url: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        red_weixin_url: [
          { required: true, message: "不能为空", trigger: "blur" }
        ],
        invaild: [{ required: true, message: "不能为空", trigger: "change" }]
      }
    };
  },

  mounted: function() {
    this.getTableData(); //获取表格数据
  },
  methods: {
    noAllowedInputE(e) {
      importNoAllowedInputE(e);
    },
    selectFun() {
      selectContanctUs({ selectKey: this.selectKey }).then(res => {
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
      getContanctUsList().then(res => {
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
      return row.id; //需要数据的唯一值
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
      changeContanctUsInvaild({
        invaild: ins.invaild == true ? 0 : 1,
        id: ins.id
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
      this.publicTitle = "添加";
    },
    updateFun(ins) {
      this.publicType = "update";
      this.publicTitle = "编辑";
      this.publicId = ins.id;
      this.addForm.company_name = ins.company_name;
      this.addForm.telphone = ins.telphone;
      this.addForm.area1 = ins.area1;
      this.addForm.area2 = ins.area2;
      this.addForm.area3 = ins.area3;
      this.addForm.business_weixin_url = ins.business_weixin_url;
      this.imageUrlbus = require("./../../server/public" +
        ins.business_weixin_url);
      this.addForm.red_weixin_url = ins.red_weixin_url;
      this.imageUrlred = require("./../../server/public" + ins.red_weixin_url);
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
          deleteContanctUs({
            id: rows.id
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
            addContanctUs({
              company_name: that.addForm.company_name,
              telphone: that.addForm.telphone,
              area1: that.addForm.area1,
              area2: that.addForm.area2,
              area3: that.addForm.area3,
              business_weixin_url: that.addForm.business_weixin_url,
              red_weixin_url: that.addForm.red_weixin_url,
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
            updateContanctUs({
              company_name: that.addForm.company_name,
              telphone: that.addForm.telphone,
              area1: that.addForm.area1,
              area2: that.addForm.area2,
              area3: that.addForm.area3,
              business_weixin_url: that.addForm.business_weixin_url,
              red_weixin_url: that.addForm.red_weixin_url,
              invaild: that.addForm.invaild,
              id: that.publicId
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
    deleteImg(ins) {
      if (ins == "bus") {
        this.imageUrlbus = "";
        this.addForm.business_weixin_url = "";
        this.fileListbus = [];
      } else if (ins == "red") {
        this.imageUrlred = "";
        this.addForm.red_weixin_url = "";
        this.fileListred = [];
      }
    },

    //上传图片
    handleAvatarSuccessbus(res, file) {
      this.imageUrlbus = URL.createObjectURL(file.raw);
      this.addForm.business_weixin_url = res.avatarUrl;
    },
    //上传图片
    handleAvatarSuccessred(res, file) {
      this.imageUrlred = URL.createObjectURL(file.raw);
      this.addForm.red_weixin_url = res.avatarUrl;
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
          company_name: "",
          telphone: "",
          area1: "",
          area2: "",
          area3: "",
          business_weixin_url: "",
          red_weixin_url: "",
          invaild: 0
        };
        this.deleteImg("bus");
        this.deleteImg("red");
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
