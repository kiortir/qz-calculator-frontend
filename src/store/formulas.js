let priceList = {
  materialDelivery: {
    raw: 3300,
    mul: 1.25,
    price() {
      return this.raw * this.mul;
    },
  },
  border: {
    Простой: {
      raw: 500,
      mul: 3,
      price() {
        return this.mul * this.raw;
      },
    },
    Калиброванный: {
      raw: 1000,
      mul: 3,
      price() {
        return this.mul * this.raw;
      },
    },
  },
  edge: {
    type: {
      '№1': {
        raw: 0,
        consumables: 0,
      },
      '№2': {
        raw: 400,
        consumables: 0,
      },
      '№3': {
        raw: 0,
        consumables: 0,
      },
      '№4': {
        raw: 400,
        consumables: 0,
      },
      '№6': {
        raw: 750,
        consumables: 0,
      },
      '№7': {
        raw: 1500,
        consumables: 0,
      },
      'Утиный нос': {
        raw: 750,
        consumables: 0,
      },
      Фигурная: {
        raw: 3130,
        consumables: 1000,
      },
      mul: 3,
      cmul: 3,
      consumables(choice) {
        return this[choice].consumables * this.cmul;
      },
      price(choice) {
        return this[choice].raw * this.mul + this.consumables(choice);
      },
    },
    width: {
      '20 мм': {
        raw: 800,
        consumables: 300,
      },
      '30 мм': {
        raw: 900,
        consumables: 300,
      },
      '40 мм': {
        raw: 1870,
        consumables: 1000,
      },
      Другая: {
        raw: 2170,
        consumables: 1000,
      },
      mul: 3.2,
      cmul: 3,
      consumables(choice) {
        return this[choice].consumables * this.cmul;
      },
      price(choice) {
        return this[choice].raw * this.mul + this.consumables(choice);
      },
    },
    angle: {
      45: {
        raw: 500,
      },
      90: {
        raw: 0,
      },
      mul: 3,
      price(choice) {
        return this[choice].raw * this.mul;
      },
    },
  },
  sink: {
    Накладная: {
      raw: 1000,
    },
    Поджимная: {
      raw: 2500,
    },
    Интегрированная: {
      raw: 12500,
    },
    'Интегрированная 45°': {
      raw: 17500,
    },
    Вровень: {
      raw: 3500,
    },
    mul: 3,
    price(choice) {
      return this[choice].raw * this.mul;
    },
  },
  cookpanel: {
    Накладная: {
      raw: 1000,
    },
    Интегрированная: {
      raw: 3500,
    },
    mul: 3,
    price(choice) {
      return this[choice].raw * this.mul;
    },
  },
  socket: {
    raw: 300,
    mul: 3,
    price() {
      return this.raw * this.mul;
    },
  },
  surface_docking: {
    Прямая: {
      raw: 800,
    },
    Косая: {
      raw: 900,
    },
    mul: 3,
    price(choice) {
      return this[choice].raw * this.mul;
    },
  },
  cutout: {
    raw: 250,
    mul: 3,
    price() {
      return this.mul * this.raw;
    },
  },
  wallpanel_length: {
    raw: 790,
    mul: 3,
    price() {
      return this.raw * this.mul;
    },
  },
  ladder: {
    step: {
      raw: 800,
      mul: 3,
      price() {
        return this.raw * this.mul;
      },
    },
    understep: {
      raw: 800,
      mul: 3,
      price() {
        return this.raw * this.mul;
      },
    },
  },
  mounting: {
    fix: 4000,
    add: 500,
    mul: 1.3,
    distance: 20,
    price(type) {
      return this[type] * this.mul;
    },
  },
  delivery: {
    fix: 1800,
    distance: 40,
    mul: 1.67,
    price(type) {
      return this[type] * this.mul;
    },
  },
  manualLift: {
    raw: 600,
    mul: 1.334,
    price() {
      return this.raw * this.mul;
    },
  },
  measurement: {
    fix: 2000,
    distance: 30,
    mul: 1.2,
    price(type) {
      return this[type] * this.mul;
    },
  },
  template: {
    fix: 800,
    mul: 1.25,
    price() {
      return this.fix * this.mul;
    },
  },
  'Радиусный угол > 12': {
    fix: 1000,
    mul: 3,
    price() {
      return this.fix * this.mul;
    },
  },
  'Другие отверстия': {
    fix: 1000,
    mul: 3,
    price() {
      return this.fix * this.mul;
    },
  },
  'Обход пиластры': {
    fix: 1500,
    mul: 3,
    price() {
      return this.fix * this.mul;
    },
  },
  Конвекция: {
    type: {
      вровень: {
        raw: 500,
      },
      фрезеровка: {
        raw: 3500,
      },
      mul: 3,
      price(type) {
        return this[type].raw * this.mul;
      },
    },
    price() {
      return 0;
    },
  },
  'Лучи под сток воды': {
    fix: 500,
    mul: 3,
    price() {
      return this.fix * this.mul;
    },
  },
  Капельник: {
    fix: 500,
    mul: 3,
    price() {
      return this.fix * this.mul;
    },
  },
  'Монтаж хром опоры заказчика': {
    fix: 1500,
    mul: 3,
    price() {
      return this.fix * this.mul;
    },
  },
  'Стыковка опорной ноги из камня под 45': {
    fix: 500,
    mul: 3,
    price() {
      return this.fix * this.mul;
    },
  },
  'Шлифовка подворота камня': {
    type: {
      'до 150 мм': {
        raw: 300,
      },
      'более 150мм': {
        raw: 2500,
      },
      mul: 3,
      price(type) {
        return this[type].raw * this.mul;
      },
    },
    price() {
      return 0;
    },
  },
  'Подворот из камня': {
    fix: 1000,
    mul: 3,
    price() {
      return this.fix * this.mul;
    },
  },
  'Демонтаж старых изделий (до 6 п.м.)': {
    fix: 4000,
    mul: 1.2,
    price() {
      return this.fix * this.mul;
    },
  },
};

export function materialPrice(count, price) {
  return count > 0 && price > 0
    ? {
        result:
          count * price + // чистая цена материала
          (count % 1 ? 1500 : 0) + // цена распила
          priceList.materialDelivery.price() + // надбавка за доставку
          (price >= 100000 ? 10000 * count : price * 0.1 * count),
        salary:
          count * price + // чистая цена материала
          (count % 1 ? 1500 : 0) + // цена распила
          priceList.materialDelivery.raw, // надбавка за доставку,
      }
    : {
        result: 0,
        salary: 0,
      };
}

export function wallpanel_length(payload) {
  return payload.length > 0
    ? {
        result: priceList.wallpanel_length.price() * payload.length,
        salary: priceList.wallpanel_length.raw * payload.length,
        consumables: 0,
        text: `Обработка, ${payload.length} п.м.`,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function ladder(payload) {
  return payload.stepLength
    ? {
        result:
          (priceList.ladder.step.price() + priceList.edge.type.price('№2')) *
            payload.stepLength +
          priceList.ladder.understep.price() * payload.underStepLength,
        salary:
          (priceList.ladder.step.raw + priceList.edge.type['№2'].raw) *
            payload.stepLength +
          priceList.ladder.understep.raw * payload.underStepLength,
        consumables: 0,
        text: `Обработка ступеней`,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function border(payload) {
  return payload.length > 0
    ? {
        result: priceList.border[payload.type].price() * payload.length,
        salary: priceList.border[payload.type].raw * payload.length,
        consumables: 0,
        text: `${payload.type} бортик, ${payload.length} п.м.`,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function edge(payload) {
  let [type, width, angle, length] = [
    payload.type,
    payload.width,
    payload.angle,
    payload.length,
  ];
  let pricelist = priceList.edge;
  return type && width && angle && length > 0
    ? {
        result:
          length *
          (pricelist.angle.price(angle) +
            pricelist.width.price(width) +
            pricelist.type.price(type)),
        salary:
          length *
          (pricelist.angle[angle].raw +
            pricelist.width[width].raw +
            pricelist.type[type].raw),
        consumables:
          length *
          (pricelist.width[width].consumables +
            pricelist.type[type].consumables),
        text: `Кромка ${type}, ${width}, склейка ${angle}°, ${length} п.м.`,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function sink(payload) {
  return payload.quantity > 0 && payload.type
    ? {
        result: priceList.sink.price(payload.type) * payload.quantity,
        salary: priceList.sink[payload.type].raw * payload.quantity,
        consumables: 0,
        text: `${payload.type} мойка, ${payload.quantity} шт.`,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function socket(payload) {
  return payload.quantity
    ? {
        result: priceList.socket.price() * payload.quantity,
        salary: priceList.socket.raw * payload.quantity,
        consumables: 0,
        text: `Вырез под розетку, ${payload.quantity} шт.`,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function surface_docking(payload) {
  return payload.quantity && payload.type
    ? {
        result:
          priceList.surface_docking.price(payload.type) * payload.quantity,
        salary: priceList.surface_docking[payload.type].raw * payload.quantity,
        consumables: 0,
        text: `Стыковка плоскостей ${payload.type.toLowerCase()}, ${
          payload.quantity
        } шт.`,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function cutout(payload) {
  return payload.quantity
    ? {
        result: priceList.cutout.price() * payload.quantity,
        salary: priceList.cutout.raw * payload.quantity,
        consumables: 0,
        text: `Простой вырез, ${payload.quantity} шт.`,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function cookpanel(payload) {
  return payload.quantity > 0 && payload.type
    ? {
        result: priceList.cookpanel.price(payload.type) * payload.quantity,
        salary: priceList.cookpanel[payload.type].raw * payload.quantity,
        consumables: 0,
        text: `${payload.type} варочная панель, ${payload.quantity} шт.`,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function mounting(payload) {
  return payload.mounting > 0 && payload.product_length > 0
    ? {
        text: 'Установка изделий',
        result:
          (payload.product_length >= 2
            ? priceList.mounting.price('add') * payload.product_length
            : 0) +
          (payload.distance * priceList.mounting.price('distance') +
            priceList.mounting.price('fix')) *
            payload.mounting,
        salary:
          (payload.product_length >= 2
            ? priceList.mounting.add * payload.product_length
            : 0) +
          (payload.distance * priceList.mounting.distance +
            priceList.mounting.fix) *
            payload.mounting,
        consumables: 0,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function delivery(payload) {
  return payload.delivery
    ? {
        text: 'Доставка изделий',
        result: Math.ceil(
          (priceList.delivery.price('fix') +
            priceList.delivery.price('distance') * payload.distance) *
            payload.delivery
        ),
        salary:
          (priceList.delivery.fix +
            priceList.delivery.distance * payload.distance) *
          payload.delivery,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function lifting(payload) {
  return payload.floor > 0
    ? {
        text: `Ручной подъем, ${payload.floor} этаж`,
        result: Math.ceil(priceList.manualLift.price() * payload.floor),
        salary: priceList.manualLift.raw * payload.floor,
      }
    : {
        result: 0,
        salary: 0,
        consumables: 0,
        text: 'Незаполненная опция',
      };
}

export function measurement(payload) {
  return payload.measurement > 0
    ? {
        result:
          (priceList.measurement.price('fix') +
            payload.distance * priceList.measurement.price('distance') +
            priceList.template.price()) *
          payload.measurement,
        salary:
          (priceList.measurement.fix +
            payload.distance * priceList.measurement.distance +
            priceList.template.fix) *
          payload.measurement,
      }
    : {
        result: 0,
        salary: 0,
        text: 'Незаполненная опция',
      };
}

export function addon(payload) {
  let type = typeof payload.type != 'undefined' ? payload.type.selected : false;
  let count = typeof payload.count != 'undefined' ? payload.count : 0;
  let isChecked =
    typeof payload.isChecked != 'undefined' ? payload.isChecked : 0;
  let addon_pricelist = priceList[payload.name];
  return {
    name: payload.name,
    result:
      count *
        (addon_pricelist.price() +
          (type ? addon_pricelist.type.price(type) : 0)) +
      Number(isChecked) * addon_pricelist.price(),
    salary:
      count *
        (addon_pricelist.fix
          ? addon_pricelist.fix
          : 0 + (type ? addon_pricelist.type[type].raw : 0)) +
      Number(isChecked) * (addon_pricelist.fix ? addon_pricelist.fix : 0),
  };
}
