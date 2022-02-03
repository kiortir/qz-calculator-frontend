<template>
  <div class="list-group list-group-flush">
    <div class="list-group-item" v-if="materials.length">
      <div class="row justify-content-between g-0 mb-2">
        <span class="col h4 mb-0 py-auto">Материал</span>
        <span class="col text-end fw-bold pb-0" v-if="materialSum.salary != 0"
          >{{ materialSum.salary }}&nbsp;руб.</span
        >
      </div>
      <ul class="res-list">
        <li
          v-for="(material, index) of materials"
          :key="index"
          class="row justify-content-between g-0 mb-2"
        >
          <span class="col h6 my-auto" v-if="material.name">{{
            material.name
          }}</span>
          <span class="col my-auto" v-else>Кварцевый агломерат</span>
          <span class="col text-end my-auto"
            >{{ material.salary }}&nbsp;руб.</span
          >
        </li>
      </ul>
    </div>
    <div class="list-group-item" v-if="optionSum.length">
      <div class="row justify-content-between g-0 mb-2">
        <span class="col h4 mb-0 py-auto">Зарплата</span>
        <span class="col text-end fw-bold pb-0" v-if="specialistSalary"
          >{{ specialistSalary }}&nbsp;руб.</span
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
              optionSum[product_index].salary +
              addonSumList[product_index].salary
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
                >{{ option.salary }}&nbsp;руб.</span
              >
            </li>

            <li
              class="small-text row justify-content-between g-0 mb-2"
              v-for="(addon, addon_index) of addons[product_index]"
              :key="addon_index"
            >
              <span class="col my-auto">{{ addon.name }}</span>
              <span class="col text-end my-auto"
                >{{ addon.salary }}&nbsp;руб.</span
              >
            </li>
          </ul>
        </li>
        <li
          v-for="(logistic, index) of specialistLogistics"
          :key="index"
          class="row justify-content-between g-0 mb-2"
        >
          <span class="col my-auto">{{ logistic.text }}</span>
          <span class="col text-end my-auto" v-if="logistic.salary"
            >{{ logistic.salary }}&nbsp;руб.</span
          >
          <span class="col text-end my-auto" v-else
            >{{ logistic.result }}&nbsp;руб.</span
          >
        </li>
      </ul>
    </div>
    <div class="list-group-item" v-if="logisticsList.length">
      <div class="row justify-content-between g-0 mb-2">
        <span class="col h4 mb-0 py-auto">Траты на логистику</span>
        <!--<span class="col text-end fw-bold pb-0"
          >{{ measurementPrice.salary + overPrice.result }}&nbsp;руб.</span
        >-->
      </div>
      <ul class="res-list">
        <li
          class="row justify-content-between g-0 mt-2"
          v-if="measurementPrice.salary > 0"
        >
          <span class="col my-auto">Замер</span>
          <span class="col text-end my-auto"
            >{{ measurementPrice.salary }}&nbsp;руб.</span
          >
        </li>

        <li
          class="row justify-content-between g-0 mt-2"
          v-if="overPrice.result > 0"
        >
          <span class="col my-auto">Накрутка</span>
          <span class="col text-end my-auto"
            >{{ overPrice.result }}&nbsp;руб.</span
          >
        </li>
      </ul>
    </div>
    <div class="list-group-item">
      <h4>Итог: {{ rawTotal.salary }}</h4>
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
      "recommendedsalary",
      "measurementPrice",
      "overPrice",
      "products",
      "addons",
      "materials",
      "totalProductSum",
      "lifting",
      "installation",
    ]),
    specialistSalary() {
      return (
        (this.totalProductSum.salary || 0) +
        (this.specialistLogistics.reduce((x, y) => {
          return {
            salary: x.salary + y.salary,
          };
        }).salary || 0)
      );
    },
    specialistLogistics() {
      let log_list = [this.installation, this.lifting];
      // let result = {
      //   specialists: [],
      //   other: [],
      // };
      // this.logisticsList.forEach((logistic) => {
      //   result[log_list.includes(logistic.text) ? "specialists" : "other"].push(
      //     logistic
      //   );
      // });
      return log_list;
    },
  },
};
</script>


<style>
.res-list {
  padding-left: 1rem !important;
}
</style>