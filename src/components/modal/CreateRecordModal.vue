<script lang="ts" setup>
import Datepicker from "vue3-datepicker";
import { ref } from "vue";

import { postProjectRecord } from "@/util/api";
import { dateToString } from "@/util/dateUtil";

interface Props {
  fetchRecords: () => Promise<void>;
  closeCreateRecordModal: () => void;
}

const props = defineProps<Props>();

const now = new Date();
const startDateRef = ref(now);

const nextMonth = new Date();
nextMonth.setMonth(now.getMonth() + 1);
const endDateRef = ref(nextMonth);

let startDate = "";
let endDate = "";
let projectAbstract = "";
let projectDetail = "";

async function post() {
  console.log("post()が実行されたよ");
  startDate = dateToString(startDateRef.value);
  endDate = dateToString(endDateRef.value);

  if (validate()) {
    console.log("バリデーションOK");
    //バックエンドにpostする
    const requestData = {
      startDate: startDate,
      endDate: endDate,
      projectAbstract: projectAbstract,
      projectDetail: projectDetail,
    };
    try {
      await postProjectRecord(requestData);
      await props.fetchRecords();
      props.closeCreateRecordModal();
      console.log("ok");
    } catch (error) {
      console.log(error);
      props.closeCreateRecordModal();
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
  if (startDateRef.value > endDateRef.value) {
    isValid = false;
    // エラーメッセージ表示
    isInvalidEnddate.value = true;
  } else {
    isInvalidEnddate.value = false;
  }

  // 案件概要の入力チェック
  if (projectAbstract === "") {
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
    id="createRecordModal"
    tabindex="-1"
    aria-labelledby="createRecordModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="createRecordModalLabel">
            案件履歴の追加
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
              v-model="startDateRef"
            />
          </div>
          <div class="mb-3">
            <label for="endDateFormControlInput" class="form-label">終了</label>
            <Datepicker
              class="form-control"
              id="endDateFormControlInput"
              v-model="endDateRef"
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
              v-model="projectAbstract"
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
              v-model="projectDetail"
            ></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" @click="post">
            新規作成
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
