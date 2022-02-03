import { createStore } from 'vuex';
import axios from 'axios';
import {
  products as PRODUCTS,
  options as OPTIONS,
  defaultAddons as ADDONS,
} from './product_refs.js';
import * as formula from './formulas';

function capitalize(str) {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function focusCard(tab, index) {
  setTimeout(function () {
    let element = document.getElementById(`${tab}-${index}`);
    element.scrollIntoView({
      block: 'center',
      behavior: 'auto',
    });
  }, 0);
}

export default createStore({
  state: JSON.parse(document.getElementById('values').textContent),
  actions: {
    save({ commit, state }) {
      axios
        .put('save', {
          data: {
            state,
            updateTime: window.localStorage.getItem('lastUserInput'),
          },
        })
        .then(function (response) {
          if (response.data.new) {
            window.history.pushState(
              {},
              `Расчет ${response.data.id}`,
              response.data.id
            );
            commit('setId', response.data.id);
          }
        })
        .catch(function (error) {
          alert(error);
        });
    },
    changeTemplate({ commit }, id) {
      axios
        .post('template/get', {
          id,
        })
        .then(function (response) {
          commit('setTemplate', response.data.values);
        })
        .catch(function (error) {
          alert(error);
        });
    },
    saveTemplate({ state }) {
      axios
        .put('template/save', {
          state,
        })
        // .then(function (response) {
        //   commit('setTemplate', response.data.values);
        // })
        .catch(function (error) {
          alert(error);
        });
    },
  },
  getters: {
    totalProductSum: (state, getters) => {
      return {
        discount: getters.productSum.discount + getters.addonSum.discount,
        result: getters.productSum.result + getters.addonSum.result,
        salary: getters.productSum.salary + getters.addonSum.salary,
      };
    },
    overPrice: (state) => {
      return {
        result: Number(state.values.logistics.overPrice),
      };
    },
    materialPrice: (state) => (index) => {
      let card = state.values.material_cards[index];
      return formula.materialPrice(card.materialCount, card.materialPrice);
    },
    materials: (state, getters) => {
      return state.values.material_cards.map((card, index) => {
        let prices = getters.materialPrice(index);
        return {
          name: card.materialName,
          count: card.materialCount,
          result: prices.result,
          salary: prices.salary,
        };
      });
    },
    products: (state, getters) => {
      return state.values.product_cards.map((card, index) => {
        return {
          options: getters.optionsPrices(index),
          name: card.chosenType,
        };
      });
    },

    optionsPrices: (state) => (productIndex) => {
      return state.values.product_cards[productIndex].option_card.map(
        (option) => {
          let price = formula[option.component_type.replace('-', '_')](
            option.data
          );
          price.discount = Math.ceil(
            price.result * (1 - state.values.discount / 100)
          );
          return price;
        }
      );
    },

    installation: (state) => {
      let product_length = state.values.product_cards.filter(
        (card) => card.installation.status
      );

      product_length =
        product_length.length > 0
          ? product_length
              .map((card) => Number(card.installation.length))
              .reduce((x, y) => x + y)
          : 0;
      return formula.mounting({
        product_length,
        distance: state.values.logistics.distance,
        mounting: state.values.logistics.mounting,
      });
    },
    delivery: (state) => {
      return formula.delivery({
        distance: state.values.logistics.distance,
        delivery: state.values.logistics.delivery,
      });
    },
    lifting: (state) => {
      return formula.lifting({
        floor: state.values.logistics.manualLifting,
      });
    },
    measurementPrice: (state) => {
      return formula.measurement({
        distance: state.values.logistics.distance,
        measurement: state.values.logistics.measurement,
      });
    },

    addons: (state, getters) => {
      return state.values.product_cards.map((card, index) => {
        return getters.addonPrices(index);
      });
    },

    addonPrices: (state) => (productIndex) => {
      let addons = state.values.product_cards[productIndex].addons;
      return addons
        .map((addon) => {
          let price = formula['addon'](addon);
          price.discount = Math.ceil(
            price.result * (1 - state.values.discount / 100)
          );
          return price;
        })
        .filter((addon) => addon.result > 0);
    },
    ////////////////////////////

    materialSum: (state, getters) => {
      return getters.materials.length
        ? getters.materials.reduce((x, y) => ({
            result: x.result + y.result,
            salary: x.salary + y.salary,
          }))
        : {
            result: 0,
            salary: 0,
          };
    },
    optionSum: (state, getters) => {
      return getters.products.map((product) =>
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

    productSum: (state, getters) => {
      return getters.optionSum.length > 0
        ? getters.optionSum.reduce((x, y) => ({
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
    additionalWork: (state) => {
      return {
        result: Number(state.values.logistics.additionalWork),
        text: 'Дополнительные работы',
      };
    },
    templates: (state) => {
      return {
        result: Number(state.values.logistics.templatePrice),
        text: 'Изготовление шаблонов',
      };
    },
    logisticsList: (state, getters) => {
      return [
        getters.lifting,
        getters.delivery,
        getters.installation,
        getters.additionalWork,
        getters.templates,
      ].filter((price) => price.result);
    },
    logisticRawSum: (state, getters) => {
      return getters.logisticsList.length > 0
        ? (function getRawSum(logisticsList) {
            const prices = logisticsList.filter(
              (logistic) => typeof logistic.salary != 'undefined'
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
          })(getters.logisticsList)
        : {
            result: 0,
            salary: 0,
          };
    },
    logisticSum: (state, getters) => {
      return {
        result:
          getters.logisticRawSum.result +
          getters.additionalWork.result +
          getters.templates.result,
      };
    },
    addonSumList: (state, getters) => {
      return getters.addons.map((addon) => {
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
    addonSum: (state, getters) => {
      return getters.addonSumList.length > 0
        ? getters.addonSumList.reduce((x, y) => ({
            result: x.result + y.result,
            salary: x.salary + y.salary,
            discount: x.discount + y.discount,
          }))
        : { result: 0, salary: 0, discount: 0 };
    },
    rawTotal: (state, getters) => {
      return [
        getters.materialSum,
        getters.measurementPrice,
        getters.addonSum,
        getters.productSum,
        getters.logisticRawSum,
      ].reduce((x, y) => {
        if (typeof x.discount == 'undefined') {
          x.discount = x.result;
        }
        if (typeof y.discount == 'undefined') {
          y.discount = y.result;
        }
        return {
          result: x.result + y.result,
          salary: x.salary + y.salary,
          discount: x.discount + y.discount,
        };
      });
    },
    total: (state, getters) => {
      console.log(getters.rawTotal);
      return (
        getters.rawTotal.discount +
        getters.templates.result +
        getters.overPrice.result +
        getters.additionalWork.result
      );
    },
    spendings: (state, getters) => {
      return [getters.rawTotal.salary, getters.productSum.consumables]
        .filter((x) => typeof x != 'undefined')
        .reduce((x, y) => x + y);
    },
    recommendedDiscount: (state, getters) => {
      const discount = () => {
        let delta = getters.spendings / getters.rawTotal.result;
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
  mutations: {
    setTemplate(state, template) {
      state.values = template;
    },

    setId(state, id) {
      state.id = id;
    },
    addMaterialCard(state) {
      let cards = state.values.material_cards;
      cards.push({
        materialName: null,
        materialPrice: null,
        materialCount: null,
        result: 0,
      });
      focusCard('material-card', cards.length - 1);
    },
    removeMaterialCard(state, index) {
      state.values.material_cards.splice(index, 1);
    },
    updateMaterialName(state, payload) {
      state.values.material_cards[payload.index].materialName = capitalize(
        payload.value
      );
    },
    updateMaterialField(state, payload) {
      state.values.material_cards[payload.index][payload.field] = payload.value;
    },

    addProductCard(state) {
      let cards = state.values.product_cards;
      cards.push({
        chosenType: '',
        option_card: [],
        installation: { status: false, length: null },
        addons: JSON.parse(JSON.stringify(ADDONS)),
      });
      focusCard('product-card', cards.length - 1);
    },
    removeProductCard(state, index) {
      state.values.product_cards.splice(index, 1);
    },

    updateCardOptions(state, payload) {
      let card = state.values.product_cards[payload.cardIndex];
      card.chosenType = payload.choice;
      card.option_card = PRODUCTS[payload.choice].defaultOptions.map(
        (option) => {
          return {
            component_type: option.component,
            data: JSON.parse(JSON.stringify(option.data)),
            result: null,
          };
        }
      );
    },
    addCardOption(state, payload) {
      if (payload.choice != null) {
        let required_option = OPTIONS[payload.choice];
        let card_option_list =
          state.values.product_cards[payload.cardIndex].option_card;
        card_option_list.push({
          component_type: required_option.component,
          data: JSON.parse(JSON.stringify(required_option.data)),
          result: null,
        });
      }
    },
    removeCardOption(state, payload) {
      state.values.product_cards[payload.cardIndex].option_card.splice(
        payload.optionIndex,
        1
      );
    },

    updateOptionValue(state, payload) {
      let optionCard =
        state.values.product_cards[payload.cardIndex].option_card[
          payload.optionIndex
        ];
      optionCard.data[payload.field] = payload.value;
    },

    insertAddons(state, cardIndex) {
      state.values.product_cards[cardIndex].addons = JSON.parse(
        JSON.stringify(ADDONS)
      );
    },

    updateAddonInput(state, payload) {
      state.values.product_cards[payload.cardIndex].addons[payload.addonIndex][
        payload.field
      ] = payload.value;
    },
    updateAddonSelector(state, payload) {
      state.values.product_cards[payload.cardIndex].addons[payload.addonIndex][
        payload.field
      ].selected = payload.value;
    },
    updateAddonCheckbox(state, payload) {
      let checkbox =
        state.values.product_cards[payload.cardIndex].addons[
          payload.addonIndex
        ];
      checkbox.isChecked = !checkbox.isChecked;
    },

    updateInstallationLength(state, payload) {
      state.values.product_cards[payload.cardIndex].installation.length =
        payload.value;
    },
    updateInstallationStatus(state, payload) {
      state.values.product_cards[payload.cardIndex].installation.status =
        payload.value;
      if (payload.value === true && state.values.logistics.mounting < 1) {
        state.values.logistics.mounting = 1;
      }
    },

    updateLogisticsInfo(state, payload) {
      state.values.logistics[payload.field] = payload.value;
    },

    setDiscount(state, value) {
      state.values.discount = value;
    },
  },
});
