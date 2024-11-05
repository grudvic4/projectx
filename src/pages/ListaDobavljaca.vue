<template>
  <div class="container py-5">
    <b-row>
      <b-col cols="12">
        <b-breadcrumb>
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item active>Lista dobavljaca</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row class="mb-5">
      <b-col cols="12">
        <postojeci-dobavljaci />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PostojeciDobavljaci from "@/components/list/PostojeciDobavljaci.vue";// @ is an alias to /src

@Component({
  components: {
    PostojeciDobavljaci,
  },
})
export default class DobavljacList extends Vue {}
</script>
