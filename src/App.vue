<template>
  <div class="row mx-0">
    <div class="col-lg-7 gx-2 mb-5">
      <div class="infocard">
        <div class="sticky-top mb-4 bg-white border-top border-bottom">
          <ul class="nav nav-pills nav-fill py-3">
            <li class="nav-item" v-for="tab of tabs" :key="tab.component">
              <button
                class="nav-link category-toggle"
                type="button"
                :id="`head-${tab.component}`"
                :class="{ active: tab.component == chosenTab }"
                @click="switchTab(tab.component)"
                v-html="tab.name"
              ></button>
            </li>
          </ul>
        </div>
        <div class="tab-content" id="mainContent">
          <div
            v-for="tab of tabs"
            class="tab-pane fade px-2 p-lg-0"
            :id="tab.component"
            :key="tab.component"
            :class="{
              active: tab.component == chosenTab,
              show: tab.component == chosenTab,
            }"
          >
            <component
              :is="tab.component"
              :key="tab.component"
              @focusCard="focusCard"
            ></component>
          </div>
        </div>
        <div
          class="offcanvas offcanvas-bottom h-100 border-0"
          tabindex="-1"
          id="offcanvas-result"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title">Итог</h5>
            <button type="button" class="btn btn-primary">Создать КП</button>
          </div>
          <div class="offcanvas-body container">
            <div class="infocard">
              <result class="mb-5"></result>
              <div
                class="
                  position-absolute
                  bottom-0
                  start-50
                  translate-middle-x
                  py-3
                  container
                  bg-white
                  border-top
                "
              >
                <button
                  type="button"
                  class="btn btn-danger w-100"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-5 d-none d-lg-block sticky-top">
      <div class="mb-3 row g-2">
        <select
          class="form-select"
          @change="$store.dispatch('changeTemplate', $event.target.value)"
        >
          <option
            v-for="template in templates"
            :key="template.id"
            :value="template.id"
          >
            {{ template.name }}
          </option>
        </select>
        <temp-control></temp-control>
      </div>
      <div class="card mb-2">
        <div class="card-header bg-card-even row gx-0">
          <ul class="nav nav-tabs card-header-tabs col">
            <li class="nav-item">
              <button
                class="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                Итог
              </button>
            </li>
            <li class="nav-item">
              <button
                class="nav-link"
                id="salary-tab"
                data-bs-toggle="tab"
                data-bs-target="#salary"
                type="button"
                role="tab"
                aria-controls="salary"
                aria-selected="false"
              >
                Затраты
              </button>
            </li>
          </ul>
          <div class="col-3">
            <button class="btn btn-primary p-0 w-100" @click="downloadWithCSS">
              Сохранить
            </button>
          </div>
        </div>
        <div class="card-body px-0">
          <div class="tab-content pb-4 overflow-auto result-block">
            <div
              class="tab-pane fade show active"
              id="home"
              role="tabpanel"
              aria-labelledby="home-tab"
            >
              <result ref="resultComponent"></result>
            </div>
            <div class="tab-pane fade" id="salary" role="tabpanel">
              <salary></salary>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div
    class="fixed-bottom container d-block d-lg-none bg-white border-top pb-2"
  >
    <div class="row py-3">
      <div class="col">
        <button
          class="btn btn-primary w-100"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvas-result"
          v-on:touchstart.passive="save"
        >
          Итог
        </button>
      </div>
      <div class="col" v-if="chosenTab != 'logistics'">
        <button class="btn btn-primary w-100" type="button" @click="addCard">
          +
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import Materials from "./components/Materials.vue";
import Products from "./components/Products.vue";
import Logistics from "./components/Logistics.vue";

import Result from "./components/Result.vue";
import Salary from "./components/Salary.vue";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import TempControl from "./components/utility/TempControl.vue";

export default {
  name: "App",
  data() {
    return {
      tabs: [
        {
          component: "materials",
          name: "Материал",
        },
        {
          component: "products",
          name: "Изделия",
        },
        {
          component: "logistics",
          name: "Логистика",
        },
      ],
      chosenTab: "products",
      templates: null,
    };
  },
  // computed: {
  //   selectedTemplate() {
  //     return this.$store.state
  //   }
  // },
  methods: {
    async setTemplateNames() {
      this.templates = JSON.parse(
        document.getElementById("template_names").textContent
      );
    },
    async setTab() {
      this.chosenTab =
        window.localStorage.getItem("chosenTab") || this.tabs[0].component;
    },

    ...mapMutations(["addMaterialCard", "addProductCard"]),
    ...mapActions(["save"]),
    focusCard(tab, id) {
      setTimeout(function () {
        let element = document.getElementById(`${tab}-${id}`);
        element.scrollIntoView({
          block: "center",
          behavior: "auto",
        });
      }, 0);
    },
    addCard() {
      let functions = {
        materials: this.addMaterialCard,
        products: this.addProductCard,
      };
      functions[this.chosenTab]();
    },
    switchTab(tab) {
      this.chosenTab = tab;
      window.localStorage.setItem("chosenTab", tab);
    },
    download() {
      const doc = new jsPDF();
      console.log(this.$refs.resultComponent.$refs.content.innerHTML);
      const contentHtml = this.$refs.resultComponent.$refs.content.innerHTML;
      doc.html(contentHtml, {
        callback: function (doc) {
          doc.save();
        },
        x: 10,
        y: 10,
      });
      doc.save("sample.pdf");
    },

    downloadWithCSS() {
      // const doc = new jsPDF();
      /** WITH CSS */
      let canvasElement = document.createElement("canvas");
      console.log(canvasElement);
      html2canvas(this.$refs.resultComponent.$refs.content, {
        // canvas: canvasElement,
        scale: 5,
      }).then(function (canvas) {
        // console.log(canvas);
        // const img = canvas.toDataURL("image/jpeg", 0.8);
        // doc.addImage(img, "JPEG", 20, 20);
        // doc.save("sample.pdf");
        let wid;
        let hgt;
        let img = canvas.toDataURL(
          "image/png",
          (wid = canvas.width),
          (hgt = canvas.height)
        ); //image data of canvas
        let hratio = hgt / wid;
        let doc = new jsPDF({
          // orientation: "landscape",
        });
        let width = doc.internal.pageSize.width;
        let height = doc.internal.pageSize.height;
        height = width * hratio;
        doc.addImage(img, "JPEG", width * 0.025, 20, width * 0.8, height * 0.8);
        doc.save("AssetComparison.pdf");
      });
    },
  },
  created() {
    this.setTemplateNames();
    this.setTab();
  },
  components: {
    Materials,
    Products,
    Logistics,
    Result,
    Salary,
    TemplateControl,
  },
};
</script>

<style>
,
TemplateControl.vericaltext {
  width: 1px;
  word-wrap: break-word;
  display: block;
}

#mainContent {
  padding-bottom: 50vh !important;
}

#onload-block {
  display: none;
}

.small-text {
  font-size: 0.8em;
}

.recommended-discount {
  border-color: green !important;
  color: green !important;
}
.recommended-discount:hover {
  background-color: green !important;
  color: white !important;
}
.btn-check:checked + .btn-outline-primary.recommended-discount {
  background-color: green !important;
  color: white !important;
}
</style>
