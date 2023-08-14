<template>
  <div class="form-wrap">
    <el-card>
      <el-form :model="formData" :rules="formRules" ref="form">
        <el-form-item label="展示类型：" prop="show_type">
          <el-select v-model="formData.show_type">
            <el-option :label="showType[0]" :value="0"></el-option>
            <el-option :label="showType[1]" :value="1"></el-option>
            <el-option :label="showType[2]" :value="2"></el-option>
          </el-select>
          <div style="float: right">
            <el-button type="primary" @click="dialogVisible = true"
              >上传生活照</el-button
            >
          </div>
        </el-form-item>

        <el-form-item label="姓名：" prop="nick_name">
          <el-input v-model="formData.nick_name"></el-input>
        </el-form-item>
        <el-form-item label="性别：" prop="is_boy">
          <el-radio-group v-model="formData.is_boy">
            <el-radio :label="true">男</el-radio>
            <el-radio :label="false">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄：" prop="age">
          <el-input-number v-model="formData.age" :min="18"></el-input-number>
        </el-form-item>
        <el-form-item label="身高（cm）" prop="height">
          <el-input-number
            v-model="formData.height"
            :min="100"
            :precision="1"
            :formatter="(value) => `${value}cm`"
            :parser="(value) => value.replace('cm', '')"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="体重（kg）" prop="weight">
          <el-input-number
            v-model="formData.weight"
            :min="0"
            :precision="1"
            :formatter="(value) => `${value}%`"
            :parser="(value) => value.replace('%', '')"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="出生地：" prop="birth_place">
          <el-input v-model="formData.birth_place"></el-input>
        </el-form-item>
        <el-form-item label="现居地：" prop="current_place">
          <el-input v-model="formData.current_place"></el-input>
        </el-form-item>
        <el-form-item label="学历：" prop="degree">
          <el-select v-model="formData.degree">
            <el-option label="高中及以下" value="高中及以下"></el-option>
            <el-option label="大专" value="大专"></el-option>
            <el-option label="本科" value="本科"></el-option>
            <el-option label="研究生及以上" value="研究生及以上"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="婚姻状况：" prop="marry_status">
          <el-radio-group v-model="formData.marry_status">
            <el-radio :label="0">未婚</el-radio>
            <el-radio :label="1">离异</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="工作：" prop="job">
          <el-input v-model="formData.job"></el-input>
        </el-form-item>
        <el-form-item label="房产情况：" prop="house_status">
          <el-input v-model="formData.house_status"></el-input>
        </el-form-item>
        <el-form-item label="是否有车：" prop="car_status">
          <el-input v-model="formData.car_status"></el-input>
        </el-form-item>
        <el-form-item label="是否独生子女：" prop="unique_child_status">
          <el-radio-group v-model="formData.unique_child_status">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="微信：" prop="wechat">
          <el-input v-model="formData.wechat"></el-input>
        </el-form-item>
        <el-form-item label="自我介绍：" prop="introduction">
          <el-input v-model="formData.introduction" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="期望类型：" prop="expectation">
          <el-input v-model="formData.expectation" type="textarea"></el-input>
        </el-form-item>

        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button type="primary" @click="resetForm">重置</el-button>
        <el-button type="warning" plain @click="cancelEditing"
          >取消编辑</el-button
        >
      </el-form>
    </el-card>
    <!-- 图片上传弹窗 -->
    <el-dialog
      :visible="dialogVisible"
      title="上传图片"
      @close="handleCloseDialog"
      :modal="false"
    >
      <el-upload
        class="avatar-uploader"
        :file-list="photosList"
        :before-upload="beforeUpload"
        action="*"
        :http-request="customRequest"
        :before-remove="removePhoto"
        accept=".jpg,.jpeg,.png,.webp"
        list-type="picture"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false"
          >确认</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { showType } from "../../../constant/index";
import { postPhotos, delPhoto } from "../../../api/getData";
import base from "../../../api/index";

let baseUrl = base.baseUrl;
export default {
  data() {
    return {
      showType,
      dialogVisible: false,
      imageUrl: null,
      photosList: null,
      formData: {
        nick_name: this.initialFormData.nick_name || "",
        is_boy: true,
        age: null,
        height: 18,
        weight: null,
        birth_place: "",
        current_place: "",
        degree: "",
        marry_status: 0,
        job: "",
        house_status: "",
        car_status: "",
        unique_child_status: "",
        wechat: "",
        introduction: "",
        expectation: "",
        show_type: 1,
      },
      formRules: {
        nick_name: [
          {
            required: false,
            message: "Please input nick name",
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (this.formData.show_type === "0") {
                callback();
              } else {
                if (value !== "") {
                  callback();
                } else {
                  callback(new Error("Please input nick name"));
                }
              }
            },
          },
        ],
        is_boy: [
          {
            required: false,
            message: "请选择性别",
            trigger: "change",
          },
        ],
        age: [
          {
            required: false,
            message: "Please input age",
            trigger: "blur",
            validator: (rule, value, callback) => {
              if (this.formData.show_type === "0") {
                callback();
              } else {
                if (value !== "") {
                  callback();
                } else {
                  callback(new Error("Please input age"));
                }
              }
            },
          },
        ],

        // 其他字段的校验规则省略
      },
    };
  },
  props: {
    initialFormData: {
      type: Object,
    },
  },
  methods: {
    cancelEditing() {
      this.$emit("cancelEditing");
    },
    showDialog() {
      this.dialogVisible = true;
    },
    handleCloseDialog() {
      this.dialogVisible = false;
    },
    beforeUpload(file) {
      // 图片类型和大小限制...
    },
    customRequest(options) {
      // 上传图片
      console.log(options);
      const { file, onSuccess, onError } = options;

      const formData = new FormData();
      formData.append("photo", file);
      postPhotos(formData)
        .then((response) => {
          onSuccess(response); // 上传成功的回调...
        })
        .catch((error) => {
          onError(error); // 上传失败的回调...
        });
    },
    removePhoto(file) {
      console.log(file);
      const path = file.url.substr(file.url.indexOf(baseUrl) + baseUrl.length);
      const params = { photo_url: path };
      console.log(this.photosList);
      delPhoto(params).then((response) => {
        // 删除成功的回调...
        this.photosList = this.photosList.filter((f) => f.url !== file.url); // 从文件列表中移除已删除的文件
      });
    },
    uploadPhotos(options) {},
    handleUpload() {
      // 确认上传，调用接口上传图片...
    },

    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 在这里进行表单提交操作
          console.log(this.formData);
          // 可以将表单数据提交到后端保存
        } else {
          console.log("Form validation failed");
        }
      });
    },
    resetForm() {
      this.$refs.form.resetFields();
    },
  },
  watch: {
    "formData.show_type": function (newVal) {
      this.$refs.form.clearValidate();
      if (newVal != 1 && this.formData.photo_urls.length == 0) {
        console.log("要上传图片");
        this.dialogVisible = true;
      }
      if (newVal === 0) {
        this.formRules.nick_name = [];
        this.formRules.is_boy = [];
        this.formRules.age = [];
      } else {
        this.formRules.nick_name = [
          {
            required: true,
            message: "请输入姓名",
            trigger: "blur",
          },
        ];
        this.formRules.is_boy = [
          {
            required: true,
            message: "请选择性别",
            trigger: "change",
          },
        ];
        this.formRules.age = [
          { required: true, message: "请输入年龄", trigger: "blur" },
        ];
      }
    },
  },

  created() {
    this.formData = this.initialFormData;
    this.photosList = this.initialFormData.photo_urls.map((url, index) => {
      return {
        uid: index,
        name: url.split("/").pop(),
        url: `${baseUrl}${url}`,
      };
    });
    // this.photosList = this.initialFormData.photo_urls.map(
    //   (url) => `${baseUrl}${url}`
    // );
    console.log(this.photosList);
  },
};
</script>
<style scoped>
.form-wrap {
  height: 500px;
  width: 770px;
  margin: 0 auto;
  overflow: auto;
}
</style>
