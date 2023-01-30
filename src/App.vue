<script setup lang="ts">
import { Modal } from "bootstrap";
import { ref, onMounted, type Ref } from "vue";

import Layout from "@/layouts/PageLayout.vue";
import RecordTable from "@/components/RecordTable.vue";
import RecordTableTab from "@/components/RecordTableTab.vue";
import CreateRecordModal from "@/components/modal/CreateRecordModal.vue";
import EditRecordModal from "@/components/modal/EditRecordModal.vue";
import type { ProjectRecord } from "./types";
import { stringToDate } from "./util/dateUtil";
import { getProjectRecords } from "@/util/api";

const records: Ref<ProjectRecord[]> = ref([]);

async function fetchRecords() {
  records.value = await getProjectRecords();
}

// CreateRecordModal.vue で定義したモーダル
let createRecordModal!: Modal;

function openCreateRecordModal() {
  createRecordModal.show();
}
function closeCreateRecordModal() {
  createRecordModal.hide();
}

// EditRecordModal.vue で定義したモーダル
let editRecordModal!: Modal;

// editRecordModal に表示する情報
const idOnEditRecordModal: Ref<number> = ref(0);
const startDateOnEditRecordModal: Ref<Date> = ref(new Date());
const endDateOnEditRecordModal: Ref<Date> = ref(new Date());
const projectAbstractOnEditRecordModal: Ref<string> = ref("");
const projectDetailOnEditRecordModal: Ref<string> = ref("");

function openEditRecordModal(projectRecord: ProjectRecord) {
  idOnEditRecordModal.value = projectRecord.id;
  startDateOnEditRecordModal.value = stringToDate(projectRecord.startDate);
  endDateOnEditRecordModal.value = stringToDate(projectRecord.endDate);
  projectAbstractOnEditRecordModal.value = projectRecord.projectAbstract;
  projectDetailOnEditRecordModal.value = projectRecord.projectDetail;
  console.log(projectRecord);

  editRecordModal.show();
}
function closeEditRecordModal() {
  editRecordModal.hide();
}

onMounted(async () => {
  // モーダルとしてコンテンツをアクティブにする
  // https://getbootstrap.jp/docs/5.0/components/modal/#methods
  const createRecordModalElement =
    document.getElementById("createRecordModal")!;
  createRecordModal = new Modal(createRecordModalElement, {
    keyboard: false,
  });
  const editRecordModalElement = document.getElementById("editRecordModal")!;
  editRecordModal = new Modal(editRecordModalElement, {
    keyboard: false,
  });
});
</script>

<template>
  <Layout>
    <RecordTableTab :openCreateRecordModal="openCreateRecordModal" />
    <RecordTable
      :records="ref(records)"
      :openEditRecordModal="openEditRecordModal"
      :fetchRecords="fetchRecords"
    />
  </Layout>
  <CreateRecordModal
    :closeCreateRecordModal="closeCreateRecordModal"
    :fetchRecords="fetchRecords"
  />
  <EditRecordModal
    :id="ref(idOnEditRecordModal)"
    :startDate="ref(startDateOnEditRecordModal)"
    :endDate="ref(endDateOnEditRecordModal)"
    :projectAbstract="ref(projectAbstractOnEditRecordModal)"
    :projectDetail="ref(projectDetailOnEditRecordModal)"
    :fetchRecords="fetchRecords"
    :closeEditRecordModal="closeEditRecordModal"
  />
</template>

<style scoped></style>
