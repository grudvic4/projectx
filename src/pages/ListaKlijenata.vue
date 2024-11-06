<template>
  <div class="container py-5">
    <b-row>
      <b-col cols="12">
        <b-breadcrumb>
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item active>Lista klijenata</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row class="mb-5">
      <b-col cols="12">
        <postojeci-klijenti />
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import PostojeciKlijenti from "@/components/list/PostojeciKlijenti.vue"

@Component({
  components: {
    PostojeciKlijenti,
  },
})
export default class ClientList extends Vue {}
</script>
