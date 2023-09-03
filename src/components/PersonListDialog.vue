<template>
  <el-dialog
    :title="title"
    :visible.sync="dialogVisible"
    :modal-append-to-body="false"
    @close="closeDialog"
  >
    <el-row>
      <el-col :span="24">
        <div class="people-list">
          <p v-if="people.length === 0">{{ description }}</p>
          <ul v-else>
            <PersonSlice
              v-for="(user, index) in people"
              :key="index"
              :user="user"
            ></PersonSlice>
          </ul>
        </div>
      </el-col>
    </el-row>
  </el-dialog>
</template>

<script>
import PersonSlice from "./PersonSlice.vue";

export default {
  components: {
    PersonSlice,
  },
  props: {
    people: {
      default: [],
    },
    isShown: {
      default: false,
    },
    title: {
      default: "",
    },
    description: {
      default: "",
    },
  },
  computed: {
    dialogVisible: {
      get() {
        return this.isShown;
      },
      set(val) {},
    },
  },
  methods: {
    closeDialog() {
      this.$emit("closeDialog");
    },
  },
};
</script>

<style scoped>
.people-list {
  margin-top: 16px;
  max-height: 560px; /* Adjust the height as per your requirement */
  overflow-y: auto;
}
</style>
