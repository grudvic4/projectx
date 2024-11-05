<template>
  <div class="container py-5">
    <b-row>
      <b-col cols="12">
        <b-breadcrumb>
          <b-breadcrumb-item to="/">Home</b-breadcrumb-item>
          <b-breadcrumb-item active>Dodaj novog klijenta</b-breadcrumb-item>
        </b-breadcrumb>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <novi-klijent class="mb-5" />
      </b-col>
    </b-row>
    <b-row>
      <b-col class="text-center">
        <b-button 
          variant="outline-primary"
          size="xl"
          @click="$router.push('/clients')"
          >
          Pogledaj sve klijente
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import NoviKlijent from "@/components/form/NoviKlijent.vue" // @ is an alias to /src
import PostojeciKlijenti from "@/components/list/PostojeciKlijenti.vue" // @ is an alias to /src

@Component({
  components: {
    NoviKlijent,
    PostojeciKlijenti,
  },
})
export default class newClient extends Vue {}
</script>
