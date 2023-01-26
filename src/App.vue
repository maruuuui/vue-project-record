<script setup lang="ts">
import Layout from "@/layouts/PageLayout.vue";
import RecordTable from "@/components/RecordTable.vue";
import RecordTableTab from "@/components/RecordTableTab.vue";
</script>

<template>
  <Layout>
    <RecordTableTab />
    <RecordTable />
  </Layout>
</template>

<style scoped></style>
