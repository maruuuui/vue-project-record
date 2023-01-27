<script lang="ts" setup>
import Datepicker from "vue3-datepicker";
import { ref, reactive } from "vue";

import { postProjectRecord } from "@/util/api";

const now = new Date();
const startDateRef = ref(now);

const nextMonth = new Date();
nextMonth.setMonth(now.getMonth() + 1);
const endDateRef = ref(nextMonth);

let startDate = "";
let endDate = "";
let projectAbstract = "";
let projectDetail = "";

const enddateStyleObject = reactive({
  display: "none",
});
const projectAbstractStyleObject = reactive({
  display: "none",
});

async function post() {
  console.log("post()が実行されたよ");
  startDate = dateToString(startDateRef.value);
  endDate = dateToString(endDateRef.value);

  console.log({
    startDate: startDate,
    endDate: endDate,
    projectAbstract: projectAbstract,
    projectDetail: projectDetail,
  });
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
      console.log("ok");
    } catch (error) {
      console.log(error);
    }
  }
}

// バリデーションチェック
function validate(): boolean {
  // 終了日が開始日以降であることをチェック
  let isValid = true;
  if (startDateRef.value > endDateRef.value) {
    isValid = false;
    // エラーメッセージ表示
    enddateStyleObject.display = "block";
  } else {
    enddateStyleObject.display = "none";
  }

  // 案件概要の入力チェック
  if (projectAbstract === "") {
    isValid = false;
    // エラーメッセージ表示
    projectAbstractStyleObject.display = "block";
  } else {
    projectAbstractStyleObject.display = "none";
  }

  return isValid;
}

// DateをYYYY-MM-DD形式にフォーマットする
function dateToString(d: Date): string {
  const year = d.getFullYear();
  const month = ("0" + (d.getMonth() + 1).toString()).slice(-2);
  const day = ("0" + d.getDate().toString()).slice(-2);
  const formatted = `${year}-${month}-${day}`;
  return formatted;
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
              :style="enddateStyleObject"
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
              :style="projectAbstractStyleObject"
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
  display: none;
  width: 100%;
  margin-top: 0.25rem;
  font-size: 0.875em;
  color: #dc3545;
}
</style>
