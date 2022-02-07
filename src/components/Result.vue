<template>
  <div class="list-group list-group-flush" ref="content" v-if="total > 0">
    <div class="list-group-item" v-if="materialResult > 0">
      <div class="row justify-content-between g-0 mb-2">
        <span class="col h4 mb-0 py-auto">Материал</span>
        <span class="col text-end fw-bold pb-0" v-if="materialSum.result != 0"
          >{{ materialResult }}&nbsp;руб.</span
        >
      </div>
      <ul class="res-list">
        <li
          v-for="(material, index) of c_materials"
          :key="index"
          class="row justify-content-between g-0 mb-2"
        >
          <span class="col h6 my-auto" v-if="material.name">{{
            material.name
          }}</span>
          <span class="col my-auto" v-else>Кварцевый агломерат</span>
          <span class="col text-end my-auto"
            >{{
              material.result + overPrice.result / materials.length
            }}&nbsp;руб.</span
          >
        </li>

        <li
          class="row justify-content-between g-0 mt-2"
          v-if="false_spendings > 0"
        >
          <span class="col my-auto">Материалы / расходники</span>
          <span class="col text-end my-auto"
            >{{ false_spendings }}&nbsp;руб.</span
          >
        </li>
      </ul>
    </div>
    <div class="list-group-item" v-if="optionSum.length">
      <div class="row justify-content-between g-0 mb-2">
        <span class="col h4 mb-0 py-auto">Изделие</span>
        <span class="col text-end fw-bold pb-0" v-if="totalProductSum.discount"
          >{{ totalProductSum.discount }}&nbsp;руб.</span
        >
      </div>
      <ul class="res-list">
        <li
          v-for="(product, product_index) of products"
          :key="product_index"
          class="row justify-content-between g-0 mb-2"
        >
          <span class="col my-auto">{{ product.name }}</span>
          <span class="col text-end my-auto"
            >{{
              optionSum[product_index].discount +
              addonSumList[product_index].discount
            }}&nbsp;руб.</span
          >
          <ul class="col-12 res-list">
            <li
              class="small-text row justify-content-between g-0 mb-2"
              v-for="(option, option_index) of product.options"
              :key="option_index"
            >
              <span class="col my-auto">{{ option.text }}</span>
              <span class="col text-end my-auto"
                >{{ option.discount }}&nbsp;руб.</span
              >
            </li>
            <li
              class="small-text row justify-content-between g-0 mb-2"
              v-for="(addon, addon_index) of addons[product_index]"
              :key="addon_index"
            >
              <span class="col my-auto">{{ addon.name }}</span>
              <span class="col text-end my-auto"
                >{{ addon.discount }}&nbsp;руб.</span
              >
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="list-group-item" v-if="logisticsList.length">
      <div class="row justify-content-between g-0 mb-2">
        <span class="col h4 mb-0 py-auto">Логистика</span>
        <span class="col text-end fw-bold pb-0" v-if="logisticSum.salary"
          >{{ logisticSum.result }}&nbsp;руб.</span
        >
      </div>
      <ul class="res-list">
        <li
          v-for="(logistic, index) of logisticsList"
          :key="index"
          class="row justify-content-between g-0 mb-2"
        >
          <span class="col my-auto">{{ logistic.text }}</span>
          <span class="col text-end my-auto"
            >{{ logistic.result }}&nbsp;руб.</span
          >
        </li>
      </ul>
    </div>
    <div class="list-group-item">
      <h4>Итог: {{ total }}</h4>
      <div class="btn-group w-100" role="group">
        <input
          type="radio"
          class="btn-check"
          name="discountRadio"
          id="discount0"
          value="0"
          autocomplete="off"
          v-model="discount"
        />
        <label
          class="btn btn-outline-primary"
          :class="{ 'recommended-discount': recommendedDiscount == 0 }"
          for="discount0"
          >Без скидки</label
        >

        <input
          type="radio"
          class="btn-check"
          name="discountRadio"
          id="discount10"
          value="10"
          autocomplete="off"
          v-model="discount"
        />
        <label
          class="btn btn-outline-primary"
          :class="{ 'recommended-discount': recommendedDiscount == 10 }"
          for="discount10"
          >Колонка 1</label
        >

        <input
          type="radio"
          class="btn-check"
          name="discountRadio"
          id="discount20"
          value="20"
          autocomplete="off"
          v-model="discount"
        />
        <label
          class="btn btn-outline-primary"
          :class="{ 'recommended-discount': recommendedDiscount == 20 }"
          for="discount20"
          >Колонка 2</label
        >

        <input
          type="radio"
          class="btn-check"
          name="discountRadio"
          id="discount30"
          value="30"
          autocomplete="off"
          v-model="discount"
        />
        <label
          class="btn btn-outline-primary"
          :class="{ 'recommended-discount': recommendedDiscount == 30 }"
          for="discount30"
          >Колонка 3</label
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters([
      "materialSum",
      "optionSum",
      "productSum",
      "additionalWork",
      "templates",
      "logisticsList",
      "logisticRawSum",
      "logisticSum",
      "addonSumList",
      "addonSum",
      "rawTotal",
      "total",
      "spendings",
      "recommendedDiscount",
      "measurementPrice",
      "overPrice",
      "products",
      "addons",
      "materials",
      "totalProductSum",
    ]),
    c_materials() {
      return this.materials.filter(
        (material) => material.name || material.count || material.result
      );
    },
    materialResult() {
      return (
        this.materialSum.result +
        this.measurementPrice.result +
        this.overPrice.result
      );
    },
    false_spendings() {
      return (
        this.measurementPrice.result +
        (this.c_materials.length > 0 ? 0 : this.overPrice.result)
      );
    },
    discount: {
      get() {
        return this.$store.state.values.discount || 0;
      },
      set(value) {
        this.setDiscount(value);
      },
    },
  },

  methods: {
    setDiscount(value) {
      this.$store.commit("setDiscount", value);
    },
  },
};
</script>


<style>
.res-list {
  padding-left: 1rem !important;
}
</style>