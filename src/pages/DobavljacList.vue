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
        <dobavljaci-list-component />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import DobavljaciListComponent from "@/components/DobavljaciListComponent.vue";// @ is an alias to /src

@Component({
  components: {
    DobavljaciListComponent,
  },
})
export default class DobavljacList extends Vue {}
</script>
