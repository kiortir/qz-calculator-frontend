<template>

  <div class="list-group list-group-flush">
    <div
      class="list-group-item"
      v-if="materialSum.result + measurementPrice.result + overPrice.result > 0"
    >
      <div class="row justify-content-between g-0 mb-2">
        <span class="col h4 mb-0 py-auto">Материал</span>
        <span class="col text-end fw-bold pb-0" v-if="materialSum.result != 0"
          >{{
            materialSum.result + measurementPrice.result + overPrice.result
          }}&nbsp;руб.</span
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
            >{{
              material.result + overPrice.result / materials.length
            }}&nbsp;руб.</span
          >
        </li>

        <li
          class="row justify-content-between g-0 mt-2"
          v-if="measurementPrice.result > 0"
        >
          <span class="col my-auto">Материалы / расходники</span>
          <span class="col text-end my-auto"
            >{{ measurementPrice.result }}&nbsp;руб.</span
          >
        </li>
      </ul>
    </div>
    <div class="list-group-item" v-if="products.length">
      <h4 class="mb-1">Изделия</h4>
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
        <li
          class="row justify-content-between g-0 mt-2"
          v-if="optionSum.length > 1"
        >
          <span class="col my-auto fst-italic">Подытог:</span>
          <span class="col text-end my-auto fw-bold"
            >{{ productSum.discount + addonSum.discount }}&nbsp;руб.</span
          >
        </li>
      </ul>
    </div>
    <div class="list-group-item" v-if="logisticsList.length">
      <h4>Логистика</h4>
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

        <li
          class="row justify-content-between g-0 mt-2"
          v-if="logisticSum.result != 0"
        >
          <span class="col my-auto fst-italic">Подытог:</span>
          <span class="col text-end my-auto fw-bold"
            >{{ logisticSum.result }}&nbsp;руб.</span
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
export default {
  computed: {
    materials() {
      return this.$store.getters.materials;
    },
    materialSum() {
      return this.materials.length
        ? this.materials.reduce((x, y) => ({
            result: x.result + y.result,
            salary: x.salary + y.salary,
          }))
        : {
            result: 0,
            salary: 0,
          };
    },
    products() {
      return this.$store.getters.products;
    },
    optionSum() {
      return this.products.map((product) =>
        product.options.length > 0
          ? product.options.reduce((x, y) => ({
              result: x.result + y.result,
              salary: x.salary + y.salary,
              discount: x.discount + y.discount,
              consumables: x.consumables + y.consumables,
            }))
          : { result: 0, salary: 0, consumables: 0, discount: 0 }
      );
    },
    productSum() {
      return this.optionSum.length > 0
        ? this.optionSum.reduce((x, y) => ({
            result: x.result + y.result,
            salary: x.salary + y.salary,
            discount: x.discount + y.discount,
            consumables: x.consumables + y.consumables,
          }))
        : {
            result: 0,
            salary: 0,
            consumables: 0,
            discount: 0,
          };
    },
    installation() {
      return this.$store.getters.installationPrice;
    },
    delivery() {
      return this.$store.getters.deliveryPrice;
    },
    additionalWork() {
      return {
        result: Number(this.$store.state.values.logistics.additionalWork),
        text: "Дополнительные работы",
      };
    },
    lifting() {
      return this.$store.getters.manualLifting;
    },
    templates() {
      return {
        result: Number(this.$store.state.values.logistics.templatePrice),
        text: "Изготовление шаблонов",
      };
    },
    logisticsList() {
      return [
        this.lifting,
        this.delivery,
        this.installation,
        this.additionalWork,
        this.templates,
      ].filter((price) => price.result);
    },

    logisticRawSum() {
      return this.logisticsList.length > 0
        ? (function getRawSum(logisticsList) {
            const prices = logisticsList.filter(
              (logistic) => typeof logistic.salary != "undefined"
            );
            return prices.length
              ? prices.reduce((x, y) => ({
                  result: x.result + y.result,
                  salary: x.salary + y.salary,
                }))
              : {
                  result: 0,
                  salary: 0,
                };
          })(this.logisticsList)
        : {
            result: 0,
            salary: 0,
          };
    },
    logisticSum() {
      return {
        result:
          this.logisticRawSum.result +
          this.additionalWork.result +
          this.templates.result,
      };
    },
    measurementPrice() {
      return this.$store.getters.measurementPrice;
    },
    overPrice() {
      return {
        result: Number(this.$store.state.values.logistics.overPrice),
      };
    },
    addons() {
      return this.$store.getters.addons;
    },
    addonSumList() {
      return this.addons.map((addon) => {
        return addon.length > 0
          ? addon.reduce((x, y) => ({
              result: x.result + y.result,
              salary: x.salary + y.salary,
              discount: x.discount + y.discount,
            }))
          : {
              result: 0,
              salary: 0,
              discount: 0,
            };
      });
    },
    addonSum() {
      return this.addonSumList.length > 0
        ? this.addonSumList.reduce((x, y) => ({
            result: x.result + y.result,
            salary: x.salary + y.salary,
            discount: x.discount + y.discount,
          }))
        : { result: 0, salary: 0, discount: 0 };
    },
    rawTotal() {
      return [
        this.materialSum,
        this.measurementPrice,
        this.addonSum,
        this.productSum,
        this.logisticRawSum,
      ].reduce((x, y) => {
        if (typeof x.discount == "undefined") {
          x.discount = x.result;
        }
        if (typeof y.discount == "undefined") {
          y.discount = y.result;
        }
        return {
          result: x.result + y.result,
          salary: x.salary + y.salary,
          discount: x.discount + y.discount,
        };
      });
    },
    total() {
      return (
        this.rawTotal.discount +
        this.templates.result +
        this.overPrice.result +
        this.additionalWork.result
      );
    },
    discount: {
      get() {
        return typeof this.$store.state.values.discount == "undefined"
          ? 0
          : this.$store.state.values.discount;
      },
      set(value) {
        this.setDiscount(value);
      },
    },
    spendings() {
      return [this.rawTotal.salary, this.productSum.consumables]
        .filter((x) => typeof x != "undefined")
        .reduce((x, y) => x + y);
    },
    recommendedDiscount() {
      const discount = () => {
        let delta = this.spendings / this.rawTotal.result;
        console.log(delta);
        if (delta >= 0.9) {
          return 0;
        } else if (delta >= 0.8) {
          return 10;
        } else if (delta >= 0.75) {
          return 20;
        } else if (delta < 0.75) {
          return 30;
        }
      };
      return discount();
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