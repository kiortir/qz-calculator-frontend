<template>
  <div class="row">
    <button
      class="btn btn-primary w-100 col-3"
      @click="$store.dispatch('saveTemplate')"
    >
      Сохранить как шаблон
    </button>
  </div>
</template>

<script>
export default {
  name: "TempControl",
  computed: {
    logistics() {
      return this.$store.state.values.logistics;
    },
  },
  methods: {
    update(field, value) {
      this.$store.commit("updateLogisticsInfo", { field, value });
    },
  },
};
</script>
