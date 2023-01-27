<script lang="ts" setup>
import Datepicker from "vue3-datepicker";
import { ref } from "vue";

const startDateRef = ref(new Date());
const endDateRef = ref(new Date());

let startDate = "";
let endDate = "";
let projectAbstract = "";
let projectDetail = "";

function post() {
  console.log("post()が実行されたよ");
  startDate = dateToString(startDateRef.value);
  endDate = dateToString(endDateRef.value);

  console.log({
    startDate: startDate,
    endDate: endDate,
    projectAbstract: projectAbstract,
    projectDetail: projectDetail,
  });
}

// DateをYYYY-MM-DD形式にフォーマットする
function dateToString(d: Date): string {
  const year = d.getFullYear();
  const month = ("0" + d.getMonth() + 1).toString().slice(-2);
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
          </div>
          <div class="mb-3">
            <label for="projectDetailFormControlInput" class="form-label"
              >案件詳細</label
            >
            <!-- <input
              type="text"
              class="form-control"
              id="projectDetailFormControlInput"
              v-model="projectDetail"
            /> -->
            <textarea 
            class="form-control" 
            id="projectDetailFormControlInput"
            rows="3"
            v-model="projectDetail"

            ></textarea>

          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="post">
            新規作成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
