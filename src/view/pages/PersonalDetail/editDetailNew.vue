<template>
  <div class="edit-page">
    <div class="cancel-and-submit">
      <button class="btn-cancel-style" @click="cancel">取消</button>
      <button class="btn-submit-style" @click="submit">提交</button>
    </div>
    <div class="edit-part">
      <div class="show-type-selection">
        <h2 class="header-title">想让别人通过何种方式认识您呢？</h2>
        <label>
          <input
            class="radio-image"
            type="radio"
            value="image"
            v-model="showTypeStr"
          />
          仅通过生活照认识我
        </label>
        <br />
        <label>
          <input
            class="radio-next"
            type="radio"
            value="info"
            v-model="showTypeStr"
          />
          仅通过文本信息认识我
        </label>
        <br />
        <label>
          <input
            class="radio-next"
            type="radio"
            value="both"
            v-model="showTypeStr"
          />
          全方位的展示我自己
        </label>
        <br />
      </div>
      <div
        v-if="showTypeStr === 'image' || showTypeStr === 'both'"
        class="show-image"
      >
        <!-- 显示上传生活照的表单 -->
        <h2 class="header-title">请上传您的生活照</h2>
        <el-upload
          class="photo-uploader"
          :file-list="photoUrls"
          :before-upload="beforeUpload"
          action="*"
          :http-request="customRequest"
          :before-remove="removePhoto"
          accept=".jpg,.jpeg,.png,.webp"
          list-type="picture"
        >
          <el-button v-if="photoUrls.length < 6" size="small" type="primary"
            >点击上传</el-button
          >
          <div slot="tip" class="el-upload__tip">
            只能上传jpg/jpeg/png/webp文件，且不超过5MB
          </div>
        </el-upload>
      </div>
      <div
        v-if="showTypeStr === 'info' || showTypeStr === 'both'"
        class="show-text"
      >
        <!-- 显示填写个人信息的表单 -->
        <h2 class="header-title">请填写您的个人信息</h2>
        <el-card class="scrollable-info">
          <el-form :model="formData" :rules="formRules" ref="form">
            <el-form-item label="姓名：" prop="nick_name">
              <el-input v-model="formData.nick_name" maxlength="64"></el-input>
            </el-form-item>
            <el-form-item label="性别：" prop="is_boy">
              <el-radio-group v-model="formData.is_boy">
                <el-radio :label="true">男</el-radio>
                <el-radio :label="false">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="年龄：" prop="age">
              <el-input-number
                v-model="formData.age"
                :min="18"
              ></el-input-number>
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
              <el-cascader
                size="large"
                :options="pcaTextArr"
                v-model="birthOptions"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="现居地：" prop="current_place">
              <el-cascader
                size="large"
                :options="pcaTextArr"
                v-model="stayOptions"
              >
              </el-cascader>
            </el-form-item>
            <el-form-item label="学历：" prop="degree">
              <el-select v-model="formData.degree">
                <el-option label="高中及以下" value="高中及以下"></el-option>
                <el-option label="大专" value="大专"></el-option>
                <el-option label="本科" value="本科"></el-option>
                <el-option label="硕士" value="硕士"></el-option>
                <el-option label="博士" value="博士"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="婚姻状况：" prop="marry_status">
              <el-radio-group v-model="formData.marry_status">
                <el-radio label="未婚">未婚</el-radio>
                <el-radio label="已婚">离异</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="工作：" prop="job">
              <el-select v-model="formData.job">
                <el-option label="老师" value="老师"></el-option>
                <el-option label="医生" value="医生"></el-option>
                <el-option label="公务员" value="公务员"></el-option>
                <el-option label="事业单位" value="事业单位"></el-option>
                <el-option label="央/国企" value="央/国企"></el-option>
                <el-option label="程序员" value="程序员"></el-option>
                <el-option label="会计" value="会计"></el-option>
                <el-option label="产品经理" value="产品经理"></el-option>
                <el-option label="工程技术" value="工程技术"></el-option>
                <el-option label="个体户" value="个体户"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="房产情况：" prop="house_status">
              <el-select v-model="formData.house_status">
                <el-option label="无房" value="无房"></el-option>
                <el-option label="有房无贷" value="有房无贷"></el-option>
                <el-option label="有房有贷" value="有房有贷"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否有车：" prop="car_status">
              <el-select v-model="formData.car_status">
                <el-option label="无车" value="无车"></el-option>
                <el-option label="有车无贷" value="有车无贷"></el-option>
                <el-option label="有车有贷" value="有车有贷"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否独生子女：" prop="unique_child_status">
              <el-radio-group v-model="formData.unique_child_status">
                <el-radio label="是">是</el-radio>
                <el-radio label="否">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="微信：" prop="wechat">
              <el-input v-model="formData.wechat" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="自我介绍：" prop="introduction">
              <el-input
                :rows="4"
                v-model="formData.introduction"
                type="textarea"
                maxlength="256"
              ></el-input>
            </el-form-item>
            <el-form-item label="期望的ta：" prop="expectation">
              <el-input
                :rows="4"
                v-model="formData.expectation"
                type="textarea"
                maxlength="256"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
import base from "../../../api/index";
import { postPhotos, delPhoto, updateInfo } from "../../../api/getData";
import { pcaTextArr } from "element-china-area-data";

let baseUrl = base.baseUrl;

export default {
  props: {
    personInfo: {}, // 当前个人信息
  },
  data() {
    return {
      showTypeStr: "image", // 根据实际情况设置show_type的初始值
      photoUrls: [],
      pcaTextArr,
      birthOptions: [],
      stayOptions: [],
      formData: {
        nick_name: this.personInfo.nick_name || "",
        is_boy: true,
        age: null,
        height: 18,
        weight: null,
        birth_place: "",
        current_place: "",
        degree: "",
        marry_status: "未婚",
        job: "",
        house_status: "",
        car_status: "",
        unique_child_status: "",
        wechat: "",
        introduction: "",
        expectation: "",
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
  created() {
    this.formData = { ...this.personInfo };
    delete this.formData.photo_urls;
    this.photoUrls = this.personInfo.photo_urls.map((url, index) => {
      return {
        uid: index,
        name: url.split("/").pop(),
        url: `${baseUrl}${url}`,
      };
    });
    // 拆分出生地和现居地
    if (this.personInfo.birth_place != "") {
      var part0 = this.personInfo.birth_place.split("/");
      if (part0.length > 1) {
        this.birthOptions = part0;
      }
    }
    if (this.personInfo.current_place != "") {
      var part1 = this.personInfo.current_place.split("/");
      if (part1.length > 1) {
        this.stayOptions = part1;
      }
    }
    console.log("formData: ", this.formData);
  },
  mounted() {
    if (this.personInfo.show_type == 0) {
      this.showTypeStr = "image";
    } else if (this.personInfo.show_type == 1) {
      this.showTypeStr = "info";
    } else if (this.personInfo.show_type == 2) {
      this.showTypeStr = "both";
    }
  },

  methods: {
    cancel() {
      this.$emit("cancelEditing");
    },
    submit() {
      if (this.showTypeStr == "image") {
        this.formData.show_type = 0;
        const infoFormData = new FormData();
        this.personInfo.show_type = 0;
        infoFormData.append("info", JSON.stringify(this.personInfo));
        updateInfo(infoFormData).then((res) => {
          console.log(res);
          if (res.code == 0) {
            this.$emit("doneUpload");
          } else {
            this.$message({
              message: res.message,
              type: "warning",
            });
          }
        });
        return;
      } else if (this.showTypeStr == "info") {
        this.formData.show_type = 1;
        // 拼装出生地和现居地
        if (this.birthOptions.length > 1) {
          this.formData.birth_place = this.birthOptions.join("/");
        }
        if (this.stayOptions.length > 1) {
          this.formData.current_place = this.stayOptions.join("/");
        }
      } else {
        this.formData.show_type = 2;
        if (this.photoUrls.length == 0) {
          this.formData.show_type = 1;
        }
        // 拼装出生地和现居地
        if (this.birthOptions.length > 1) {
          this.formData.birth_place = this.birthOptions.join("/");
        }
        if (this.stayOptions.length > 1) {
          this.formData.current_place = this.stayOptions.join("/");
        }
      }
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 在这里进行表单提交操作
          const infoFormData = new FormData();
          infoFormData.append("info", JSON.stringify(this.formData));
          console.log(this.formData);
          updateInfo(infoFormData).then((res) => {
            console.log(res);
            if (res.code == 0) {
              this.$emit("doneUpload");
            } else {
              this.$message({
                message: res.message,
                type: "warning",
              });
            }
          });
        } else {
          console.log("Form validation failed");
        }
      });
    },
    beforeUpload(file) {
      // 图片类型和大小限制...
    },
    customRequest(options) {
      // 上传图片
      const { file, onSuccess, onError } = options;
      const photoFormData = new FormData();
      photoFormData.append("photo", file);
      postPhotos(photoFormData)
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
      delPhoto(params).then((response) => {
        // 删除成功的回调...
        this.photoUrls = this.photoUrls.filter((f) => f.url !== file.url); // 从文件列表中移除已删除的文件
      });
    },
  },
};
</script>

<style scoped>
.edit-page {
  height: 100%;
  width: 100%;
}
.header-title {
  text-align: center;
  padding-top: 40px;
}
.cancel-and-submit {
  flex: 1;
  display: flex;
  align-items: center;
  width: 100%;
  height: 8%;
}
.btn-cancel-style {
  background-color: white;
  margin-left: 80%;
  width: 120px;
  height: 40px;
  border-radius: 32px;
  border-color: transparent;
  font-size: large;
  border-color: #33ff33;
}
.btn-submit-style {
  background-color: #33ff33;
  margin-left: 16px;
  width: 120px;
  height: 40px;
  border-radius: 32px;
  border-color: transparent;
  font-size: large;
}
.edit-part {
  flex: 1;
  display: flex;
  height: 92%;
}
.show-type-selection {
  background-color: #ccffe5;
  width: 33.3%;
}
.radio-image {
  margin-top: 30%;
  margin-left: 20%;
}
.radio-next {
  margin-top: 40px;
  margin-left: 20%;
}
.show-image {
  background-color: #99ffcc;
  width: 33.3%;
}
.photo-uploader {
  margin-top: 40px;
  margin-left: 16px;
  margin-right: 16px;
}
.photo-container {
  position: relative;
  width: 120px;
  height: 120px;
  margin: 16px;
  border: 1px solid #ccc;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.uploaded-photo {
  max-width: 100%;
  max-height: 100%;
}

.delete-button {
  position: absolute;
  top: 5px;
  right: 5px;
  background-color: #ff0000;
  color: white;
  border: none;
  padding: 5px;
  cursor: pointer;
}

.add-icon {
  width: 100%;
  height: 100%;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hidden-input {
  display: none;
}

.show-text {
  background-color: #66ffb2;
  width: 33.4%;
}
.scrollable-info {
  margin-top: 40px;
  width: 100%; /* Set the desired width */
  height: 85%; /* Set the desired height */
  overflow: auto; /* Enable scrolling */
}
</style>
