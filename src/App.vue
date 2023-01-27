<script setup lang="ts">
import { Modal } from "bootstrap";
import { ref, onMounted, type Ref } from "vue";

import Layout from "@/layouts/PageLayout.vue";
import RecordTable from "@/components/RecordTable.vue";
import RecordTableTab from "@/components/RecordTableTab.vue";
import CreateRecordModal from "@/components/modal/CreateRecordModal.vue";

// CreateRecordModal.vue で定義したモーダル
let createRecordModal!: Modal;

function openCreateRecordModal() {
  createRecordModal.show();
}
function closeCreateRecordModal() {
  createRecordModal.hide();
}

onMounted(async () => {
  // モーダルとしてコンテンツをアクティブにする
  // https://getbootstrap.jp/docs/5.0/components/modal/#methods
  const createRecordModalElement =
    document.getElementById("createRecordModal")!;
  createRecordModal = new Modal(createRecordModalElement, {
    keyboard: false,
  });
});
</script>

<template>
  <Layout>
    <RecordTableTab :openCreateRecordModal="openCreateRecordModal" />
    <RecordTable />
  </Layout>
  <CreateRecordModal />
</template>

<style scoped></style>
