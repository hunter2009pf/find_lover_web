<template>
  <div class="profile-container">
    <h1 class="page-title">个人信息</h1>
    <div class="profile-info">
      <div class="profile-item">
        <label class="item-label">姓名：</label>
        <div class="item-content">
          <template v-if="isEditing">
            <el-input v-model="editedUserInfo.name"></el-input>
          </template>
          <template v-else>
            {{ userInfo.name }}
          </template>
        </div>
      </div>
      <div class="profile-item">
        <label class="item-label">年龄：</label>
        <div class="item-content">
          <template v-if="isEditing">
            <el-input v-model="editedUserInfo.age"></el-input>
          </template>
          <template v-else>
            {{ userInfo.age }}
          </template>
        </div>
      </div>
      <div class="profile-item">
        <label class="item-label">性别：</label>
        <div class="item-content">
          <template v-if="isEditing">
            <el-input v-model="editedUserInfo.gender"></el-input>
          </template>
          <template v-else>
            {{ userInfo.gender }}
          </template>
        </div>
      </div>
      <div class="profile-item">
        <label class="item-label">职业：</label>
        <div class="item-content">
          <template v-if="isEditing">
            <el-input v-model="editedUserInfo.occupation"></el-input>
          </template>
          <template v-else>
            {{ userInfo.occupation }}
          </template>
        </div>
      </div>
      <div class="profile-item">
        <label class="item-label">邮箱：</label>
        <div class="item-content">
          <template v-if="isEditing">
            <el-input v-model="editedUserInfo.email"></el-input>
          </template>
          <template v-else>
            {{ userInfo.email }}
          </template>
        </div>
      </div>
      <div class="profile-item">
        <label class="item-label">电话：</label>
        <div class="item-content">
          <template v-if="isEditing">
            <el-input v-model="editedUserInfo.phone"></el-input>
          </template>
          <template v-else>
            {{ userInfo.phone }}
          </template>
        </div>
      </div>
      <div class="profile-item">
        <label class="item-label">地址：</label>
        <div class="item-content">
          <template v-if="isEditing">
            <el-input v-model="editedUserInfo.address"></el-input>
          </template>
          <template v-else>
            {{ userInfo.address }}
          </template>
        </div>
      </div>
    </div>
    <div class="profile-actions">
      <el-button type="primary" @click="editProfile" v-if="!isEditing"
        >编辑信息</el-button
      >
      <el-button type="success" @click="saveProfile" v-if="isEditing"
        >保存信息</el-button
      >
      <el-button type="danger" @click="cancelEdit" v-if="isEditing"
        >取消编辑</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInfo: {
        name: "John Doe",
        age: 30,
        gender: "Male",
        occupation: "Engineer",
        email: "john.doe@example.com",
        phone: "1234567890",
        address: "123 ABC Street, XYZ City",
      },
      editedUserInfo: {}, // 用于保存编辑后的信息
      isEditing: false,
    };
  },
  methods: {
    editProfile() {
      // 将用户信息复制到编辑信息的对象中
      this.editedUserInfo = { ...this.userInfo };
      this.isEditing = true;
    },
    saveProfile() {
      // 将编辑后的信息保存到原始的用户信息对象中
      this.userInfo = { ...this.editedUserInfo };
      this.isEditing = false;
    },
    cancelEdit() {
      this.isEditing = false;
    },
  },
};
</script>

<style scoped>
/* 略去其他样式 */

.item-content {
  flex: 1;
}

.el-input,
.item-content {
  width: 200px;
}

.profile-actions {
  text-align: center;
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.profile-actions > * {
  margin: 0 10px;
}
</style>
