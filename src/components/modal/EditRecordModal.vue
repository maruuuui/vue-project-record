<script lang="ts" setup>
import Datepicker from "vue3-datepicker";
import { computed, ref, type Ref } from "vue";

import { updateProjectRecord } from "@/util/api";
import { dateToString } from "@/util/dateUtil";

interface Props {
  id: Ref<number>;
  startDate: Ref<Date>;
  endDate: Ref<Date>;
  projectAbstract: Ref<string>;
  projectDetail: Ref<string>;
  fetchRecords: () => Promise<void>;
  closeEditRecordModal: () => void;
}

const props = defineProps<Props>();

interface Emits {
  (e: "update:startDate", startDate: Ref<Date>): void;
  (e: "update:endDate", endDate: Ref<Date>): void;
  (e: "update:projectAbstract", projectAbstract: Ref<string>): void;
  (e: "update:projectDetail", projectDetail: Ref<string>): void;
}
const emit = defineEmits<Emits>();
const startDate = computed({
  get: () => props.startDate,
  set: (value) => {
    emit("update:startDate", value);
  },
});
const endDate = computed({
  get: () => props.endDate,
  set: (value) => {
    emit("update:endDate", value);
  },
});
const projectAbstract = computed({
  get: () => props.projectAbstract,
  set: (value) => {
    emit("update:projectAbstract", value);
  },
});
const projectDetail = computed({
  get: () => props.projectDetail,
  set: (value) => {
    emit("update:projectDetail", value);
  },
});

async function update() {
  console.log("update()が実行されたよ");
  const startDate = dateToString(props.startDate.value);
  const endDate = dateToString(props.endDate.value);

  if (validate()) {
    console.log("バリデーションOK");
    //バックエンドにpostする
    const requestData = {
      id: props.id.value,
      startDate,
      endDate,
      projectAbstract: props.projectAbstract.value,
      projectDetail: props.projectDetail.value,
    };
    try {
      await updateProjectRecord(requestData);
      console.log("ok");
      await props.fetchRecords();
      props.closeEditRecordModal();
    } catch (error) {
      console.log(error);
      props.closeEditRecordModal();
    }
  }
}

// バリデーションエラーメッセージのだし分けに使う変数
const isInvalidAbstract = ref(false);
const isInvalidEnddate = ref(false);

// バリデーションチェック
function validate(): boolean {
  // 終了日が開始日以降であることをチェック
  let isValid = true;
  if (props.startDate.value > props.endDate.value) {
    isValid = false;
    // エラーメッセージ表示
    isInvalidEnddate.value = true;
  } else {
    isInvalidEnddate.value = false;
  }

  // 案件概要の入力チェック
  if (props.projectAbstract.value === "") {
    isValid = false;
    // エラーメッセージ表示
    isInvalidAbstract.value = true;
  } else {
    isInvalidAbstract.value = false;
  }

  return isValid;
}
</script>

<template>
  <div
    class="modal fade"
    id="editRecordModal"
    tabindex="-1"
    aria-labelledby="editRecordModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="editRecordModalLabel">
            {{ props.id }}案件履歴の編集
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="startDateFormControlInput" class="form-label"
              >開始</label
            >
            <Datepicker
              class="form-control"
              id="startDateFormControlInput"
              v-model="startDate.value"
            />
          </div>
          <div class="mb-3">
            <label for="endDateFormControlInput" class="form-label">終了</label>
            <Datepicker
              class="form-control"
              id="endDateFormControlInput"
              v-model="endDate.value"
            />
            <div
              id="enddate-invalid-message"
              class="invalid-message"
              v-show="isInvalidEnddate"
            >
              終了日には開始日以降を設定してください。
            </div>
          </div>
          <div class="mb-3">
            <label for="projectAbstractFormControlInput" class="form-label"
              >案件概要</label
            >
            <input
              type="text"
              class="form-control"
              id="projectAbstractFormControlInput"
              v-model="projectAbstract.value"
            />
            <div
              id="project-abstract-invalid-message"
              class="invalid-message"
              v-show="isInvalidAbstract"
            >
              このフィールドは必須です。
            </div>
          </div>
          <div class="mb-3">
            <label for="projectDetailFormControlInput" class="form-label"
              >案件詳細</label
            >
            <textarea
              class="form-control"
              id="projectDetailFormControlInput"
              rows="3"
              v-model="projectDetail.value"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" @click="update">
            OK
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.invalid-message {
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>
