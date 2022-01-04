/* eslint-disable */
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
import { defineComponent, ref, resolveComponent, openBlock, createBlock, mergeProps, withModifiers, createSlots, withCtx, renderSlot, inject, onUnmounted, onDeactivated, onActivated, computed, createElementBlock, Fragment, createVNode, unref, createCommentVNode, normalizeClass, isRef, createTextVNode, toDisplayString, onMounted, normalizeStyle, watch, renderList, createElementVNode, withDirectives, vShow, watchEffect } from "vue";
import { Notification, Message } from "@arco-design/web-vue";
import axios from "axios";
const COMPONENT_PREFIX = "C";
const getComponentPrefix = (options) => {
  var _a;
  return (_a = options == null ? void 0 : options.componentPrefix) != null ? _a : COMPONENT_PREFIX;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  props: {
    loading: { type: Boolean, default: false },
    width: null
  },
  emits: ["click"],
  setup(__props, { emit }) {
    const isLoading = ref(false);
    const handleClick = () => {
      isLoading.value = true;
      emit("click", () => {
        setTimeout(() => {
          isLoading.value = false;
        }, 100);
      });
    };
    return (_ctx, _cache) => {
      const _component_a_button = resolveComponent("a-button");
      return openBlock(), createBlock(_component_a_button, mergeProps(_ctx.$attrs, {
        onClick: withModifiers(handleClick, ["stop", "prevent"]),
        loading: __props.loading || isLoading.value,
        style: __props.width ? { width: __props.width > 0 ? `${__props.width}px` : __props.width } : ""
      }), createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 2
      }, [
        _ctx.$slots.icon ? {
          name: "icon",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "icon")
          ])
        } : void 0
      ]), 1040, ["onClick", "loading", "style"]);
    };
  }
});
const component$7 = Object.assign(_sfc_main$8, {
  inheritAttrs: false,
  install: (app, options) => {
    app.component(`${getComponentPrefix(options)}Button`, _sfc_main$8);
  }
});
/*!
  * vue-router v4.0.12
  * (c) 2021 Eduardo San Martin Morote
  * @license MIT
  */
const hasSymbol = typeof Symbol === "function" && typeof Symbol.toStringTag === "symbol";
const PolySymbol = (name) => hasSymbol ? Symbol(name) : "_vr_" + name;
const matchedRouteKey = /* @__PURE__ */ PolySymbol("rvlm");
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function registerGuard(record, name, guard) {
  const removeFromList = () => {
    record[name].delete(guard);
  };
  onUnmounted(removeFromList);
  onDeactivated(removeFromList);
  onActivated(() => {
    record[name].add(guard);
  });
  record[name].add(guard);
}
function onBeforeRouteLeave(leaveGuard) {
  const activeRecord = inject(matchedRouteKey, {}).value;
  if (!activeRecord) {
    return;
  }
  registerGuard(activeRecord, "leaveGuards", leaveGuard);
}
const opt = Object.prototype.toString;
function isArray(obj) {
  return opt.call(obj) === "[object Array]";
}
function isNull(obj) {
  return opt.call(obj) === "[object Null]";
}
function isObject(obj) {
  return opt.call(obj) === "[object Object]";
}
function isString(obj) {
  return opt.call(obj) === "[object String]";
}
function isNumber(obj) {
  return opt.call(obj) === "[object Number]" && obj === obj;
}
function isUndefined(obj) {
  return obj === void 0;
}
function isFunction(obj) {
  return typeof obj === "function";
}
function isBlank(obj) {
  return !isString(obj) || obj === "";
}
function isImage(file) {
  let url;
  if (isString(file)) {
    url = file;
  } else if (isObject(file)) {
    if (file.type && file.type.indexOf("image/") === 0) {
      return true;
    }
    url = file.url;
  } else {
    return false;
  }
  if (!url)
    return false;
  if (url.toLowerCase().indexOf("jpg") > 0) {
    return true;
  }
  if (url.toLowerCase().indexOf("png") > 0) {
    return true;
  }
  if (url.toLowerCase().indexOf("jpeg") > 0) {
    return true;
  }
  if (url.toLowerCase().indexOf("bmp") > 0) {
    return true;
  }
  if (url.toLowerCase().indexOf("webp") > 0) {
    return true;
  }
  if (url.toLowerCase().indexOf("gif") > 0) {
    return true;
  }
  return false;
}
const beanUtil = {
  copyPropertiesNotEmpty(source, target) {
    if (!source) {
      return source;
    }
    const isObject2 = source.constructor === Object;
    const isArray2 = source.constructor === Array;
    if (isArray2) {
      target = [];
      for (let i = 0, len = source.length; i < len; i += 1) {
        target.push(this.copyPropertiesNotEmpty(source[i], target[i]));
      }
    } else if (isObject2) {
      if (!target) {
        target = {};
      }
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          target[key] = this.copyPropertiesNotEmpty(source[key], target[key]);
        }
      }
    } else {
      target = source;
    }
    return target;
  },
  deepClone(data) {
    const type = Object.prototype.toString.call(data);
    let obj;
    if (type === "[object Array]") {
      obj = [];
      for (let i = 0, len = data.length; i < len; i += 1) {
        obj.push(this.deepClone(data[i]));
      }
    } else if (type === "[object Object]") {
      obj = {};
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          obj[key] = this.deepClone(data[key]);
        }
      }
    } else {
      return data;
    }
    return obj;
  },
  dateFormat(date, format = "yyyy-MM-dd hh:mm:ss") {
    if (date) {
      if (Object.prototype.toString.call(date) !== "[object Date]") {
        return "";
      }
      const o = {
        "M+": date.getMonth() + 1,
        "d+": date.getDate(),
        "D+": date.getDate(),
        "h+": date.getHours(),
        "H+": date.getHours(),
        "m+": date.getMinutes(),
        "s+": date.getSeconds(),
        "q+": Math.floor((date.getMonth() + 3) / 3),
        S: date.getMilliseconds()
      };
      let fmt = format;
      if (/(y+)/.test(format) || /(Y+)/.test(format)) {
        fmt = format.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(format)) {
          fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
        }
      }
      return fmt;
    }
    return "";
  }
};
const customRequest = (option) => {
  const { onProgress, onError, onSuccess, fileItem } = option;
  if (isUndefined(fileItem.file)) {
    onError("not find file");
    return {};
  }
  const forms = new FormData();
  forms.append("file", fileItem.file);
  let http = window.axios;
  if (isUndefined(http)) {
    http = axios;
  }
  let cancel = () => {
  };
  http.post(option.action, forms, {
    headers: { "Content-Type": "multipart/form-data" },
    onUploadProgress: (progressEvent) => {
      onProgress(progressEvent.loaded / progressEvent.total, progressEvent);
    },
    cancelToken: new axios.CancelToken((c) => {
      cancel = c;
    })
  }).then((res) => {
    onSuccess(res);
  }).catch((err) => {
    onError(err);
  });
  return {
    abort() {
      cancel();
    }
  };
};
const initDicData = async (option) => {
  if (option.dicUrl) {
    try {
      let http = axios;
      if (window.axios) {
        http = window.axios;
      }
      if (isUndefined(option.params)) {
        return await http.get(option.dicUrl);
      }
      return await http.post(option.dicUrl, option.params);
    } catch (error) {
      console.error("init dicData error:", error);
      return [];
    }
  }
  if (option.dicData) {
    return option.dicData;
  }
  return [];
};
const findValueByProps = (val, dicData, props) => {
  const findAll = [];
  for (let i = 0; i < dicData.length; i += 1) {
    const item = dicData[i];
    if (isString(item) && i.toString() === val.toString()) {
      findAll.push(item);
    } else if (isArray(val) && val.indexOf(item[props.value]) >= 0) {
      findAll.push(item);
    } else if (item[props.value] === val) {
      findAll.push(item);
    }
  }
  if (findAll.length > 0) {
    let labels = "";
    findAll.forEach((item) => {
      if (isString(item)) {
        labels += `,${item}`;
      } else {
        labels += `,${item[props.label]}`;
      }
    });
    return labels.substring(1);
  }
  return String(val);
};
const filterRangeValue = (item, val) => {
  if (!val) {
    return "";
  }
  let tempVal;
  if (Object.prototype.toString.call(val) === "[object String]") {
    try {
      tempVal = JSON.parse(val);
    } catch (error) {
    }
  } else {
    tempVal = beanUtil.deepClone(val);
  }
  if (Object.prototype.toString.call(tempVal) === "[object Array]") {
    return `${tempVal[0]}\u81F3${tempVal[1]}`;
  }
  return tempVal;
};
const filterValue$1 = (record, column) => {
  const val = record[column.prop];
  if (isUndefined(val) || isNull(val)) {
    return "";
  }
  if (isUndefined(column.type)) {
    return val.toString();
  }
  if (column.type.indexOf("range") > 0) {
    return filterRangeValue(column, val);
  }
  if (column.type.indexOf("tag") === 0 && val) {
    return val.toString();
  }
  if (!column.dicData) {
    return val.toString();
  }
  const props = {
    label: "label",
    value: "value",
    children: "children",
    data: "data"
  };
  beanUtil.copyPropertiesNotEmpty(column.props, props);
  if (val && column.type === "cascader") {
    let dicData = JSON.parse(JSON.stringify(column.dicData));
    let label = "";
    for (let i = 0; i < val.length; i += 1) {
      const find = dicData.find((item) => item[props.value] === val[i]);
      if (find) {
        dicData = find[props.children];
        label += `,${find[props.label]}`;
      }
    }
    return label === "" ? "" : label.substring(1);
  }
  return findValueByProps(val, column.dicData, props);
};
const filterBtnDisplay = (type, option, permissions, record) => {
  const key = `${type}Btn`;
  if (permissions[key] === false) {
    return false;
  }
  if (option[key] === false) {
    return false;
  }
  if (isFunction(option[key])) {
    return option[key](record);
  }
  if (isObject(option[key])) {
    if (option[key].display === false) {
      return false;
    }
    if (isFunction(option[key].display)) {
      return option[key].display(record);
    }
  }
  return true;
};
const filterDisplay = (type, column, record) => {
  if (type === "search") {
    return column.search === true;
  }
  const key = isBlank(type) ? "display" : `${type}Display`;
  if (isFunction(column[key])) {
    return column[key](record);
  }
  return column[key] !== false;
};
const filterDisabled = (column, record) => {
  const key = "disabled";
  if (isFunction(column[key])) {
    return column[key](record);
  }
  return column[key] === true;
};
const getRules = (field, column, record) => {
  if (isFunction(column[field])) {
    return column[field](record);
  }
  if (!isUndefined(column[field])) {
    return column[field];
  }
  return void 0;
};
const filterRules = (type, column, record) => {
  const key = isBlank(type) ? "rules" : `${type}Rules`;
  const rules = getRules(key, column, record);
  if (isUndefined(rules) && type !== "search") {
    return getRules("rules", column, record);
  }
  return rules;
};
const getSpan = (field, column, record) => {
  if (isFunction(column[field])) {
    return column[field](record);
  }
  if (isNumber(column[field])) {
    return column[field];
  }
  return column[field];
};
const filterSpan = (column, option, record, size, defaultSpan) => {
  const key = "span";
  const span = getSpan(key, column, record);
  if (!isUndefined(span)) {
    if (!isObject(span)) {
      return span;
    }
    const sizeSpan = getSpan(size, span, record);
    if (!isUndefined(sizeSpan)) {
      return sizeSpan;
    }
  }
  const rootSpan = getSpan(key, option, record);
  if (!isUndefined(rootSpan)) {
    if (!isObject(rootSpan)) {
      return rootSpan;
    }
    const sizeSpan = getSpan(size, rootSpan, record);
    if (!isUndefined(sizeSpan)) {
      return sizeSpan;
    }
  }
  return defaultSpan;
};
const filterProps = (props) => {
  return {
    value: isObject(props) && isString(props.value) ? props.value : "value",
    label: isObject(props) && isString(props.label) ? props.label : "label"
  };
};
var RenderFunction = defineComponent({
  name: "RenderFunction",
  props: {
    renderFunc: {
      type: Function,
      required: true
    },
    record: {}
  },
  render() {
    return this.renderFunc(this.record);
  }
});
var index_vue_vue_type_style_index_0_scoped_true_lang$1 = "";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  props: {
    option: { default: {
      limit: 0,
      large: false
    } },
    modelValue: null,
    readonly: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const computedAccept = computed(() => {
      if (props.option.accept) {
        return props.option.accept;
      }
      if (props.option.listType === "picture" || props.option.listType === "picture-card") {
        return ".png, .jpg, .jpeg";
      }
      return void 0;
    });
    const isStringify = computed(() => {
      return isString(props.modelValue) || props.option.stringify === true || props.option.stringify === "true";
    });
    const uploadModelValue = (arr) => {
      let tmpArr = arr;
      if (props.option.urlOnly === true) {
        tmpArr = arr.map((item) => item.url);
      }
      let val = tmpArr;
      if (props.option.limit === 1) {
        val = arr.length > 0 ? tmpArr[0] : {};
      }
      try {
        if (isStringify.value) {
          emit("update:modelValue", isString(val) ? val : JSON.stringify(val));
          emit("change", isString(val) ? val : JSON.stringify(val));
          return;
        }
      } catch (e) {
      }
      emit("update:modelValue", val);
      emit("change", val);
    };
    const getFileList = () => {
      const val = props.modelValue;
      if (isUndefined(val) || isNull(val) || val === "undefined" || val === "null") {
        return [];
      }
      if (isString(val) && isBlank(val)) {
        return [];
      }
      let tempFileList = [];
      let tempVal = [];
      if (isStringify.value && isString(val)) {
        try {
          tempVal = JSON.parse(val);
        } catch (e) {
          tempVal.push(val);
        }
      } else {
        tempVal = beanUtil.deepClone(val);
      }
      if (isArray(tempVal)) {
        tempFileList = tempVal;
      } else {
        tempFileList = [tempVal];
      }
      let index = 1e3;
      return tempFileList.map((item) => {
        if (isString(item)) {
          return {
            url: item,
            uid: index += 500
          };
        }
        return Object.assign(item, { uid: index += 500 });
      });
    };
    const defalutFileList = ref(getFileList());
    const fileList = computed({
      get: getFileList,
      set: (val) => {
        const arr = val.map((item) => {
          const res = {
            name: item.file.name,
            size: item.file.size,
            type: item.file.type,
            filename: item.response && item.response.filename ? item.response.filename : item.name,
            url: item.response && item.response.url ? item.response.url : item.url
          };
          if (props.option.autoUpload === false) {
            res.file = item.file;
          }
          return res;
        });
        uploadModelValue(arr);
      }
    });
    const preVisible = ref(false);
    const preCurrent = ref(0);
    const getUrl = (data) => {
      if (isString(data)) {
        return data;
      }
      return data.url;
    };
    const imgList = computed(() => {
      const arr = [];
      if (props.option.limit === 1 && fileList.value.length > 0) {
        if (isImage(fileList.value[0])) {
          arr.push(getUrl(fileList.value[0]));
        }
      } else if (isArray(fileList.value)) {
        fileList.value.forEach((item) => {
          if (isImage(item)) {
            arr.push(getUrl(item));
          }
        });
      }
      return arr;
    });
    const preview = (file) => {
      preCurrent.value = imgList.value.findIndex((img) => {
        if (img === file.url) {
          return true;
        }
        if (file.response && img === file.response.url) {
          return true;
        }
        if (img === file.response) {
          return true;
        }
        return false;
      });
      preVisible.value = true;
    };
    const change = (files) => {
      fileList.value = files;
    };
    const onBeforeRemove = (e) => {
      if (isFunction(props.option.onBeforeRemove)) {
        return props.option.onBeforeRemove(e);
      }
      return Promise.resolve(true);
    };
    const onBeforeUpload = (e) => {
      if (isNumber(props.option.limitSize)) {
        if (e.size > props.option.limitSize) {
          Notification.warning("\u8D85\u51FA\u53EF\u4E0A\u4F20\u6587\u4EF6\u5927\u5C0F\u9650\u5236");
          return Promise.resolve(false);
        }
      }
      if (isFunction(props.option.onBeforeUpload)) {
        return props.option.onBeforeUpload(e);
      }
      return Promise.resolve(true);
    };
    return (_ctx, _cache) => {
      const _component_a_upload = resolveComponent("a-upload");
      const _component_a_image_preview = resolveComponent("a-image-preview");
      const _component_a_image_preview_group = resolveComponent("a-image-preview-group");
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(_component_a_upload, mergeProps(__props.option, {
          accept: unref(computedAccept),
          "custom-request": unref(customRequest),
          "file-list": defalutFileList.value,
          "defalut-file-list": defalutFileList.value,
          onChange: change,
          onPreview: preview,
          "on-before-remove": onBeforeRemove,
          "on-before-upload": onBeforeUpload,
          class: {
            "crco-upload-readonly": __props.readonly,
            "crco-upload-large": __props.option.large
          }
        }), createSlots({ _: 2 }, [
          _ctx.$slots.default ? {
            name: "upload-button",
            fn: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
            ])
          } : void 0
        ]), 1040, ["accept", "custom-request", "file-list", "defalut-file-list", "class"]),
        unref(imgList).length > 0 && __props.option.limit === 1 ? (openBlock(), createBlock(_component_a_image_preview, {
          key: 0,
          src: unref(imgList)[0],
          visible: preVisible.value,
          "onUpdate:visible": _cache[0] || (_cache[0] = ($event) => preVisible.value = $event)
        }, null, 8, ["src", "visible"])) : createCommentVNode("", true),
        props.option.limit !== 1 ? (openBlock(), createBlock(_component_a_image_preview_group, {
          key: 1,
          visible: preVisible.value,
          "onUpdate:visible": _cache[1] || (_cache[1] = ($event) => preVisible.value = $event),
          current: preCurrent.value,
          "onUpdate:current": _cache[2] || (_cache[2] = ($event) => preCurrent.value = $event),
          infinite: "",
          srcList: unref(imgList)
        }, null, 8, ["visible", "current", "srcList"])) : createCommentVNode("", true)
      ], 64);
    };
  }
});
var Upload = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-9c4bb4ae"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  props: {
    column: null,
    record: null
  },
  setup(__props) {
    const props = __props;
    const modelValue = computed(() => {
      return props.record[props.column.prop];
    });
    const hasFormatValue = computed(() => isFunction(props.column.formatValue));
    return (_ctx, _cache) => {
      return props.column.type === "icon" ? (openBlock(), createElementBlock("i", {
        key: 0,
        class: normalizeClass(props.record[props.column.type]),
        "aria-hidden": "true"
      }, null, 2)) : unref(hasFormatValue) ? (openBlock(), createBlock(unref(RenderFunction), {
        key: 1,
        "render-func": props.column.formatValue,
        record: __props.record
      }, null, 8, ["render-func", "record"])) : props.column.type === "upload" ? (openBlock(), createBlock(Upload, {
        key: 2,
        option: props.column,
        readonly: true,
        modelValue: unref(modelValue),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(modelValue) ? modelValue.value = $event : null)
      }, null, 8, ["option", "modelValue"])) : (openBlock(), createElementBlock(Fragment, { key: 3 }, [
        createTextVNode(toDisplayString(unref(filterValue$1)(__props.record, __props.column)), 1)
      ], 64));
    };
  }
});
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    title: null,
    modelValue: null,
    type: { default: "" },
    maxWidth: { default: 1080 }
  },
  setup(__props) {
    const props = __props;
    const clientWidth = ref(1080);
    onMounted(() => {
      clientWidth.value = document.body.clientWidth;
      let timer;
      window.onresize = () => {
        if (timer) {
          return;
        }
        timer = setTimeout(() => {
          clientWidth.value = document.body.clientWidth;
          timer = void 0;
        }, 200);
      };
    });
    const data = computed(() => {
      if (!props.option.columns) {
        return [];
      }
      const arr = [];
      props.option.columns.forEach((item) => {
        if (filterDisplay(props.type, item, props.modelValue)) {
          arr.push({
            label: item.name,
            value: {
              column: __spreadProps(__spreadValues({}, item), {
                large: item.type === "upload" ? true : void 0
              }),
              record: props.modelValue
            }
          });
        }
      });
      return arr;
    });
    return (_ctx, _cache) => {
      const _component_a_descriptions = resolveComponent("a-descriptions");
      const _component_a_space = resolveComponent("a-space");
      return openBlock(), createBlock(_component_a_space, {
        direction: "vertical",
        style: { "width": "100%" }
      }, {
        default: withCtx(() => [
          createVNode(_component_a_descriptions, {
            data: unref(data),
            title: props.title,
            column: 1,
            bordered: clientWidth.value >= 500,
            style: normalizeStyle({ maxWidth: `${__props.maxWidth}px` }),
            layout: clientWidth.value < 500 ? "inline-vertical" : "",
            "label-style": { width: "200px" }
          }, {
            label: withCtx(({ label }) => [
              createTextVNode(toDisplayString(label), 1)
            ]),
            value: withCtx(({ value }) => [
              createVNode(_sfc_main$6, {
                column: value.column,
                record: value.record
              }, null, 8, ["column", "record"])
            ]),
            _: 1
          }, 8, ["data", "title", "bordered", "style", "layout"]),
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      });
    };
  }
});
const _hoisted_1$1 = {
  style: { "width": "100%" },
  class: "flex-row justify-end"
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    modelValue: { default: {} },
    type: { default: "" },
    style: null
  },
  emits: ["submit", "update:modelValue"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const layoutComputed = computed(() => {
      var _a, _b;
      if ((_a = props.option) == null ? void 0 : _a.layout) {
        return (_b = props.option) == null ? void 0 : _b.layout;
      }
      if (props.type === "search") {
        return "inline";
      }
      return "vertical";
    });
    const isLoading = ref(false);
    const formRef = ref();
    const myOption = ref({
      btn: {
        long: false,
        text: "\u63D0\u4EA4"
      },
      layout: "vertical",
      columns: []
    });
    const form = ref({});
    const btnTextComputed = computed(() => {
      if (isObject(myOption.value.btn) && myOption.value.btn.text !== "\u63D0\u4EA4") {
        return myOption.value.btn.text;
      }
      if (props.type === "search") {
        return "\u641C\u7D22";
      }
      return "\u63D0\u4EA4";
    });
    watch(() => props.modelValue, (val) => {
      form.value = val;
    }, {
      immediate: true,
      deep: true
    });
    watch(() => form.value, () => {
      emit("update:modelValue", form.value);
    }, {
      deep: true
    });
    watch(() => props.option, () => {
      beanUtil.copyPropertiesNotEmpty(props.option, myOption.value);
      for (let i = 0; i < myOption.value.columns.length; i += 1) {
        if (!isUndefined(myOption.value.columns[i].value) && isUndefined(form.value[myOption.value.columns[i].prop]) && props.type !== "search") {
          form.value[myOption.value.columns[i].prop] = myOption.value.columns[i].value;
        }
        if (!isBlank(props.type)) {
          Object.keys(myOption.value.columns[i]).forEach((key) => {
            try {
              if (key.length > props.type.length && key.startsWith(props.type)) {
                let resetKey = key.substring(props.type.length, key.length);
                resetKey = resetKey.substring(0, 1).toLowerCase() + resetKey.substring(1, resetKey.length);
                myOption.value.columns[i][resetKey] = myOption.value.columns[i][key];
              }
            } catch (e) {
            }
          });
        }
      }
    }, {
      immediate: true,
      deep: true
    });
    const handleSubmit = () => {
      formRef.value.validate().then((res) => {
        if (!res) {
          isLoading.value = true;
          emit("submit", form.value, () => {
            setTimeout(() => {
              isLoading.value = false;
            }, 200);
          });
        }
      });
    };
    const submit = () => {
      return new Promise((RES, REJ) => {
        formRef.value.validate().then((res) => {
          if (!res) {
            isLoading.value = true;
            RES({
              form: form.value,
              done: () => {
                setTimeout(() => {
                  isLoading.value = false;
                }, 100);
              }
            });
          } else {
            REJ();
          }
        });
      });
    };
    expose({
      submit
    });
    return (_ctx, _cache) => {
      const _component_a_input = resolveComponent("a-input");
      const _component_a_input_password = resolveComponent("a-input-password");
      const _component_a_textarea = resolveComponent("a-textarea");
      const _component_a_input_number = resolveComponent("a-input-number");
      const _component_c_radio = resolveComponent("c-radio");
      const _component_c_select = resolveComponent("c-select");
      const _component_a_switch = resolveComponent("a-switch");
      const _component_c_upload = resolveComponent("c-upload");
      const _component_a_date_picker = resolveComponent("a-date-picker");
      const _component_a_week_picker = resolveComponent("a-week-picker");
      const _component_a_month_picker = resolveComponent("a-month-picker");
      const _component_a_year_picker = resolveComponent("a-year-picker");
      const _component_a_quarter_picker = resolveComponent("a-quarter-picker");
      const _component_a_range_picker = resolveComponent("a-range-picker");
      const _component_a_form_item = resolveComponent("a-form-item");
      const _component_a_col = resolveComponent("a-col");
      const _component_a_row = resolveComponent("a-row");
      const _component_a_button = resolveComponent("a-button");
      const _component_a_form = resolveComponent("a-form");
      const _component_a_spin = resolveComponent("a-spin");
      return openBlock(), createBlock(_component_a_spin, {
        loading: isLoading.value,
        style: normalizeStyle([{ "width": "100%" }, __props.style])
      }, {
        default: withCtx(() => [
          myOption.value.columns.length > 0 ? (openBlock(), createBlock(_component_a_form, {
            key: 0,
            ref_key: "formRef",
            ref: formRef,
            model: form.value,
            layout: unref(layoutComputed)
          }, {
            default: withCtx(() => [
              unref(layoutComputed) !== "inline" ? (openBlock(), createBlock(_component_a_row, {
                key: 0,
                gutter: { xs: 4, sm: 6, md: 12, lg: 24, xl: 36, xxl: 64 }
              }, {
                default: withCtx(() => [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(myOption.value.columns, (column) => {
                    return openBlock(), createElementBlock(Fragment, {
                      key: column.prop
                    }, [
                      unref(filterDisplay)(__props.type, column, form.value) ? (openBlock(), createBlock(_component_a_col, {
                        key: 0,
                        xl: { span: unref(filterSpan)(column, myOption.value, form.value, "xl", 8) },
                        lg: { span: unref(filterSpan)(column, myOption.value, form.value, "lg", 12) },
                        md: { span: unref(filterSpan)(column, myOption.value, form.value, "md", 12) },
                        sm: { span: unref(filterSpan)(column, myOption.value, form.value, "sm", 24) },
                        xs: { span: unref(filterSpan)(column, myOption.value, form.value, "xs", 24) },
                        order: column.order
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_a_form_item, mergeProps(column, {
                            field: column.prop,
                            label: column.name,
                            rules: unref(filterRules)(__props.type, column, form.value),
                            "show-colon": myOption.value.showColon,
                            "no-style": myOption.value.noStyle,
                            "hide-label": myOption.value.hideLabel,
                            disabled: unref(filterDisabled)(column, form.value),
                            type: void 0
                          }), {
                            default: withCtx(() => [
                              renderSlot(_ctx.$slots, column.prop, {}, () => [
                                !column.type || column.type === "input" || column.type === "text" || column.type === "icon" ? (openBlock(), createBlock(_component_a_input, mergeProps({ key: 0 }, column, {
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event
                                }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                column.type === "password" ? (openBlock(), createBlock(_component_a_input_password, {
                                  key: 1,
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                column.type === "textarea" ? (openBlock(), createBlock(_component_a_textarea, mergeProps({ key: 2 }, column, {
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event
                                }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                column.type === "number" ? (openBlock(), createBlock(_component_a_input_number, mergeProps({ key: 3 }, column, {
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                                  "default-value": form.value[column.prop],
                                  type: "text"
                                }), null, 16, ["modelValue", "onUpdate:modelValue", "default-value"])) : createCommentVNode("", true),
                                column.type === "radio" ? (openBlock(), createBlock(_component_c_radio, {
                                  key: 4,
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                                  option: column
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "option"])) : createCommentVNode("", true),
                                column.type === "select" ? (openBlock(), createBlock(_component_c_select, {
                                  key: 5,
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                                  option: column
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "option"])) : createCommentVNode("", true),
                                column.type === "switch" ? (openBlock(), createBlock(_component_a_switch, {
                                  key: 6,
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                column.type === "upload" ? (openBlock(), createBlock(_component_c_upload, {
                                  key: 7,
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                                  option: column
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "option"])) : createCommentVNode("", true),
                                column.type === "date" || column.type === "datetime" ? (openBlock(), createBlock(_component_a_date_picker, mergeProps({ key: 8 }, column, {
                                  "show-time": column.type === "datetime",
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                                  style: { "width": "100%" }
                                }), null, 16, ["show-time", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                column.type === "week" ? (openBlock(), createBlock(_component_a_week_picker, mergeProps({ key: 9 }, column, {
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                                  style: { "width": "100%" }
                                }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                column.type === "month" ? (openBlock(), createBlock(_component_a_month_picker, mergeProps({ key: 10 }, column, {
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                                  style: { "width": "100%" }
                                }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                column.type === "year" ? (openBlock(), createBlock(_component_a_year_picker, mergeProps({ key: 11 }, column, {
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                                  style: { "width": "100%" }
                                }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                column.type === "quarter" ? (openBlock(), createBlock(_component_a_quarter_picker, mergeProps({ key: 12 }, column, {
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                                  style: { "width": "100%" }
                                }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                                column.type === "daterange" ? (openBlock(), createBlock(_component_a_range_picker, mergeProps({ key: 13 }, column, {
                                  modelValue: form.value[column.prop],
                                  "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                                  style: { "width": "100%" }
                                }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                              ])
                            ]),
                            _: 2
                          }, 1040, ["field", "label", "rules", "show-colon", "no-style", "hide-label", "disabled"])
                        ]),
                        _: 2
                      }, 1032, ["xl", "lg", "md", "sm", "xs", "order"])) : createCommentVNode("", true)
                    ], 64);
                  }), 128))
                ]),
                _: 3
              })) : (openBlock(true), createElementBlock(Fragment, { key: 1 }, renderList(myOption.value.columns, (column) => {
                return openBlock(), createElementBlock(Fragment, null, [
                  unref(filterDisplay)(__props.type, column, form.value) ? (openBlock(), createBlock(_component_a_form_item, mergeProps({
                    key: 0,
                    key: column.prop
                  }, column, {
                    field: column.prop,
                    label: column.name,
                    rules: unref(filterRules)(__props.type, column, form.value),
                    "show-colon": myOption.value.showColon,
                    "no-style": myOption.value.noStyle,
                    "hide-label": myOption.value.hideLabel,
                    disabled: unref(filterDisabled)(column, form.value),
                    type: void 0
                  }), {
                    default: withCtx(() => [
                      renderSlot(_ctx.$slots, column.prop, {}, () => [
                        !column.type || column.type === "input" || column.type === "text" || column.type === "icon" ? (openBlock(), createBlock(_component_a_input, mergeProps({ key: 0 }, column, {
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event
                        }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        column.type === "password" ? (openBlock(), createBlock(_component_a_input_password, {
                          key: 1,
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        column.type === "textarea" ? (openBlock(), createBlock(_component_a_textarea, mergeProps({ key: 2 }, column, {
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event
                        }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        column.type === "number" ? (openBlock(), createBlock(_component_a_input_number, mergeProps({ key: 3 }, column, {
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                          "default-value": form.value[column.prop],
                          type: "text"
                        }), null, 16, ["modelValue", "onUpdate:modelValue", "default-value"])) : createCommentVNode("", true),
                        column.type === "radio" ? (openBlock(), createBlock(_component_c_radio, {
                          key: 4,
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                          option: column
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "option"])) : createCommentVNode("", true),
                        column.type === "select" ? (openBlock(), createBlock(_component_c_select, {
                          key: 5,
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                          option: column
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "option"])) : createCommentVNode("", true),
                        column.type === "switch" ? (openBlock(), createBlock(_component_a_switch, {
                          key: 6,
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        column.type === "upload" ? (openBlock(), createBlock(_component_c_upload, {
                          key: 7,
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                          option: column
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "option"])) : createCommentVNode("", true),
                        column.type === "date" || column.type === "datetime" ? (openBlock(), createBlock(_component_a_date_picker, mergeProps({ key: 8 }, column, {
                          "show-time": column.type === "datetime",
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                          style: { "width": "100%" }
                        }), null, 16, ["show-time", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        column.type === "week" ? (openBlock(), createBlock(_component_a_week_picker, mergeProps({ key: 9 }, column, {
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                          style: { "width": "100%" }
                        }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        column.type === "month" ? (openBlock(), createBlock(_component_a_month_picker, mergeProps({ key: 10 }, column, {
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                          style: { "width": "100%" }
                        }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        column.type === "year" ? (openBlock(), createBlock(_component_a_year_picker, mergeProps({ key: 11 }, column, {
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                          style: { "width": "100%" }
                        }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        column.type === "quarter" ? (openBlock(), createBlock(_component_a_quarter_picker, mergeProps({ key: 12 }, column, {
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                          style: { "width": "100%" }
                        }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
                        column.type === "daterange" ? (openBlock(), createBlock(_component_a_range_picker, mergeProps({ key: 13 }, column, {
                          modelValue: form.value[column.prop],
                          "onUpdate:modelValue": ($event) => form.value[column.prop] = $event,
                          style: { "width": "100%" }
                        }), null, 16, ["modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true)
                      ])
                    ]),
                    _: 2
                  }, 1040, ["field", "label", "rules", "show-colon", "no-style", "hide-label", "disabled"])) : createCommentVNode("", true)
                ], 64);
              }), 256)),
              unref(isObject)(myOption.value.btn) && myOption.value.btn.text || _ctx.$slots.btnLeft || _ctx.$slots.btnRight ? (openBlock(), createBlock(_component_a_form_item, { key: 2 }, {
                default: withCtx(() => [
                  createElementVNode("div", _hoisted_1$1, [
                    renderSlot(_ctx.$slots, "btnLeft"),
                    unref(isObject)(myOption.value.btn) && myOption.value.btn.text ? (openBlock(), createBlock(_component_a_button, {
                      key: 0,
                      type: "primary",
                      onClick: handleSubmit,
                      long: myOption.value.btn.long
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(btnTextComputed)), 1)
                      ]),
                      _: 1
                    }, 8, ["long"])) : createCommentVNode("", true),
                    renderSlot(_ctx.$slots, "btnRight")
                  ])
                ]),
                _: 3
              })) : createCommentVNode("", true)
            ]),
            _: 3
          }, 8, ["model", "layout"])) : createCommentVNode("", true)
        ]),
        _: 3
      }, 8, ["loading", "style"]);
    };
  }
});
var index_vue_vue_type_style_index_0_lang = "";
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  props: {
    type: null,
    okButtonProps: { default: () => {
      return { size: "mini" };
    } },
    cancelButtonProps: { default: () => {
      return { size: "mini" };
    } }
  },
  emits: ["ok"],
  setup(__props, { emit }) {
    const props = __props;
    const handleOnBeforeOk = (done) => {
      emit("ok", (flag = true) => {
        done(flag === true);
      });
    };
    return (_ctx, _cache) => {
      const _component_a_popconfirm = resolveComponent("a-popconfirm");
      return openBlock(), createBlock(_component_a_popconfirm, mergeProps(_ctx.$attrs, {
        "content-class": { "crco-popconfirm-icon-hide": unref(isUndefined)(props.type) },
        "ok-button-props": __spreadProps(__spreadValues({}, __props.okButtonProps), {
          size: "mini"
        }),
        "cancel-button-props": __spreadProps(__spreadValues({}, __props.cancelButtonProps), {
          size: "mini"
        }),
        onBeforeOk: handleOnBeforeOk
      }), createSlots({
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 2
      }, [
        _ctx.$slots.content ? {
          name: "content",
          fn: withCtx(() => [
            renderSlot(_ctx.$slots, "content")
          ])
        } : void 0
      ]), 1040, ["content-class", "ok-button-props", "cancel-button-props"]);
    };
  }
});
var index_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = {
  key: 1,
  class: "justify-between align-start md-row-column"
};
const _hoisted_2 = { class: "crco-table-header-left flex-row" };
const _hoisted_3 = { class: "crco-table-header-right md-row-column" };
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  props: {
    option: null,
    params: { default: {} },
    permissions: { default: () => {
      return {
        viewBtn: true,
        addBtn: true,
        editBtn: true,
        delBtn: true
      };
    } },
    before: null
  },
  emits: ["load", "add", "edit", "del"],
  setup(__props, { expose, emit }) {
    const props = __props;
    const type = ref("");
    onMounted(() => {
      let nextCall = null;
      window.addEventListener("popstate", (event) => {
        if (nextCall) {
          if (type.value !== "") {
            nextCall(false);
            type.value = "";
            nextCall = null;
          }
        }
      });
      if (isFunction(onBeforeRouteLeave)) {
        onBeforeRouteLeave((to, from, next) => {
          nextCall = next;
          setTimeout(() => {
            if (nextCall) {
              nextCall();
            }
          }, 10);
        });
      }
    });
    const myOption = ref({
      dialog: false,
      addBtn: {
        text: "\u65B0\u589E"
      },
      viewBtn: {
        text: "\u67E5\u770B"
      },
      editBtn: {
        text: "\u7F16\u8F91"
      },
      delBtn: {
        text: "\u5220\u9664"
      },
      menuProps: {
        width: 220
      },
      subtitle: "",
      columns: []
    });
    const searchForm = ref({});
    watch(() => props.option, () => {
      searchForm.value = {};
      beanUtil.copyPropertiesNotEmpty(props.option, myOption.value);
      for (let i = 0; i < myOption.value.columns.length; i += 1) {
        if (isString(myOption.value.columns[i].dicUrl)) {
          initDicData(myOption.value.columns[i]).then((res) => {
            myOption.value.columns[i].dicData = res;
            myOption.value.columns[i].dicUrl = void 0;
          });
        }
        if (!isUndefined(myOption.value.columns[i].searchValue)) {
          searchForm.value[myOption.value.columns[i].prop] = myOption.value.columns[i].searchValue;
        }
      }
    }, {
      immediate: true,
      deep: true
    });
    const pagination = ref({
      total: 0,
      current: 1,
      pageSize: 10,
      showTotal: true,
      showJumper: true,
      showPageSize: true,
      pageSizeOptions: [10, 20, 40, 50, 100]
    });
    const hasSearch = computed(() => {
      return myOption.value.columns.findIndex((column) => column.search === true) >= 0;
    });
    const loading = ref(false);
    const tableDatas = ref([]);
    const myParams = {};
    const load = (reset = false, done) => {
      let isDone = false;
      setTimeout(() => {
        if (!isDone) {
          loading.value = true;
        }
      }, 400);
      if (reset) {
        pagination.value.current = 1;
      }
      emit("load", __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, searchForm.value), props.params), myParams), {
        current: pagination.value.current,
        size: pagination.value.pageSize
      }), (res) => {
        isDone = true;
        loading.value = false;
        if (isObject(res)) {
          tableDatas.value = res.records;
          pagination.value.total = res.total;
          pagination.value.current = res.current;
        }
        if (done) {
          done(res);
        }
      });
    };
    const pageChange = (current) => {
      pagination.value.current = current;
      load();
    };
    const pageSizeChange = (pageSize) => {
      pagination.value.pageSize = pageSize;
      load();
    };
    const isFilterMultiple = (prop, columns) => {
      const find = columns.find((column) => column.prop === prop);
      return find && find.filterable && find.filterable.multiple;
    };
    const filterChange = (prop, filterValues) => {
      const multiple = isFilterMultiple(prop, props.option.columns);
      if (filterValues && filterValues.length > 0) {
        myParams[`${prop}${multiple ? "Filter" : ""}`] = multiple ? filterValues : filterValues[0];
      } else {
        myParams[`${prop}${multiple ? "Filter" : ""}`] = void 0;
      }
      load();
    };
    load();
    const form = ref({});
    const typeLabel = computed(() => {
      if (isObject(myOption.value[`${type.value}Btn`])) {
        return myOption.value[`${type.value}Btn`].text;
      }
      switch (type.value) {
        case "view":
          return "\u8BE6\u60C5";
        case "add":
          return "\u6DFB\u52A0";
        case "edit":
          return "\u4FEE\u6539";
        case "del":
          return "\u5220\u9664";
        default:
          return "";
      }
    });
    const operation = (val, data) => {
      form.value = __spreadValues({}, data);
      if (isFunction(props.before)) {
        props.before(val, form.value, (callbackData) => {
          if (!isUndefined(callbackData)) {
            form.value = __spreadValues(__spreadValues({}, form.value), callbackData);
          }
          type.value = val;
        });
      } else {
        type.value = val;
      }
    };
    const handleSubmit = (val, done) => {
      const handleDone = (flag = true) => {
        if (flag === true) {
          Message.success(`${typeLabel.value}\u6210\u529F`);
          type.value = "";
          load();
        } else {
          done();
        }
      };
      switch (type.value) {
        case "add":
          emit(type.value, val, handleDone);
          break;
        case "edit":
          emit(type.value, val, handleDone);
          break;
        case "del":
          emit(type.value, val, handleDone);
          break;
      }
    };
    const handleSearch = (val, done) => {
      load(false, () => {
        done();
      });
    };
    const handleToDel = (record, done) => {
      emit("del", record, (flag = true) => {
        if (flag === true) {
          Message.success(`\u5220\u9664\u6210\u529F`);
          load();
        }
        done(flag);
      });
    };
    expose({
      load,
      add: (data) => {
        operation("add", isUndefined(data) ? {} : data);
      }
    });
    return (_ctx, _cache) => {
      const _component_a_button = resolveComponent("a-button");
      const _component_icon_refresh = resolveComponent("icon-refresh");
      const _component_a_table_column = resolveComponent("a-table-column");
      const _component_a_table = resolveComponent("a-table");
      const _component_a_space = resolveComponent("a-space");
      const _component_icon_arrow_left = resolveComponent("icon-arrow-left");
      const _component_a_breadcrumb_item = resolveComponent("a-breadcrumb-item");
      const _component_a_breadcrumb = resolveComponent("a-breadcrumb");
      const _component_a_modal = resolveComponent("a-modal");
      return openBlock(), createElementBlock(Fragment, null, [
        withDirectives(createVNode(_component_a_space, {
          direction: "vertical",
          style: { "width": "100%" },
          size: "medium"
        }, {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "top", {}, void 0, true),
            unref(hasSearch) && myOption.value.searchTop === true ? (openBlock(), createBlock(_sfc_main$4, {
              key: 0,
              option: myOption.value,
              onSubmit: handleSearch,
              modelValue: searchForm.value,
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => searchForm.value = $event),
              type: "search"
            }, createSlots({ _: 2 }, [
              renderList(myOption.value.columns, (item) => {
                return {
                  name: item.prop,
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, item.prop + "Search", { record: form.value }, void 0, true)
                  ])
                };
              })
            ]), 1032, ["option", "modelValue"])) : createCommentVNode("", true),
            myOption.value.headerDisplay !== false ? (openBlock(), createElementBlock("div", _hoisted_1, [
              createElementVNode("div", _hoisted_2, [
                unref(filterBtnDisplay)("add", myOption.value, props.permissions, {}) ? (openBlock(), createBlock(_component_a_button, {
                  key: 0,
                  type: "primary",
                  onClick: _cache[1] || (_cache[1] = ($event) => operation("add", {}))
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(isObject)(myOption.value.addBtn) && myOption.value.addBtn.text ? myOption.value.addBtn.text : "\u65B0\u589E"), 1)
                  ]),
                  _: 1
                })) : createCommentVNode("", true),
                renderSlot(_ctx.$slots, "headerLeft", {}, void 0, true)
              ]),
              createElementVNode("div", _hoisted_3, [
                renderSlot(_ctx.$slots, "headerRight", {}, void 0, true),
                unref(hasSearch) && myOption.value.searchTop !== true ? (openBlock(), createBlock(_sfc_main$4, {
                  key: 0,
                  option: __spreadProps(__spreadValues({}, myOption.value), {
                    hideLabel: true
                  }),
                  onSubmit: handleSearch,
                  modelValue: searchForm.value,
                  "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => searchForm.value = $event),
                  type: "search"
                }, createSlots({ _: 2 }, [
                  renderList(myOption.value.columns, (item) => {
                    return {
                      name: item.prop,
                      fn: withCtx(() => [
                        renderSlot(_ctx.$slots, item.prop + "Search", { record: form.value }, void 0, true)
                      ])
                    };
                  })
                ]), 1032, ["option", "modelValue"])) : createCommentVNode("", true),
                myOption.value.refreshBtn !== false ? (openBlock(), createBlock(_component_a_button, {
                  key: 1,
                  onClick: load,
                  shape: "circle"
                }, {
                  icon: withCtx(() => [
                    createVNode(_component_icon_refresh)
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ])
            ])) : createCommentVNode("", true),
            createVNode(_component_a_table, mergeProps({
              onPageChange: pageChange,
              onPageSizeChange: pageSizeChange,
              onFilterChange: filterChange
            }, myOption.value, {
              data: tableDatas.value,
              pagination: pagination.value,
              loading: loading.value,
              "row-key": unref(isString)(myOption.value.rowKey) ? myOption.value.rowKey : "id"
            }), {
              columns: withCtx(() => [
                (openBlock(true), createElementBlock(Fragment, null, renderList(myOption.value.columns, (column, index) => {
                  return openBlock(), createElementBlock(Fragment, {
                    key: column.prop
                  }, [
                    unref(filterDisplay)("", column, tableDatas.value[index]) ? (openBlock(), createBlock(_component_a_table_column, mergeProps({ key: 0 }, column, {
                      title: column.name,
                      dataIndex: column.prop
                    }), {
                      cell: withCtx(({ record }) => [
                        renderSlot(_ctx.$slots, column.prop, {
                          column,
                          record
                        }, () => [
                          createVNode(_sfc_main$6, {
                            column,
                            record
                          }, null, 8, ["column", "record"])
                        ], true)
                      ]),
                      _: 2
                    }, 1040, ["title", "dataIndex"])) : createCommentVNode("", true)
                  ], 64);
                }), 128)),
                myOption.value.menuDisplay !== false ? (openBlock(), createBlock(_component_a_table_column, mergeProps({ key: 0 }, myOption.value.menuProps, {
                  title: "\u64CD\u4F5C",
                  width: myOption.value.menuProps && myOption.value.menuProps.width ? myOption.value.menuProps.width : 220
                }), {
                  cell: withCtx(({ record, rowIndex }) => [
                    _ctx.$slots.menuLeft ? renderSlot(_ctx.$slots, "menuLeft", {
                      key: 0,
                      record
                    }, void 0, true) : createCommentVNode("", true),
                    _ctx.$slots.menuleft ? renderSlot(_ctx.$slots, "menuleft", {
                      key: 1,
                      record
                    }, void 0, true) : createCommentVNode("", true),
                    unref(filterBtnDisplay)("view", myOption.value, props.permissions, record) ? (openBlock(), createBlock(_component_a_button, {
                      key: 2,
                      type: "text",
                      onClick: ($event) => operation("view", __spreadProps(__spreadValues({}, record), {
                        rowIndex
                      }))
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(isObject)(myOption.value.viewBtn) && myOption.value.viewBtn.text ? myOption.value.viewBtn.text : "\u67E5\u770B"), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : createCommentVNode("", true),
                    unref(filterBtnDisplay)("edit", myOption.value, props.permissions, record) ? (openBlock(), createBlock(_component_a_button, {
                      key: 3,
                      type: "text",
                      onClick: ($event) => operation("edit", __spreadProps(__spreadValues({}, record), {
                        rowIndex
                      }))
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(isObject)(myOption.value.editBtn) && myOption.value.editBtn.text ? myOption.value.editBtn.text : "\u4FEE\u6539"), 1)
                      ]),
                      _: 2
                    }, 1032, ["onClick"])) : createCommentVNode("", true),
                    unref(filterBtnDisplay)("del", myOption.value, props.permissions, record) ? (openBlock(), createBlock(_sfc_main$3, {
                      key: 4,
                      content: "\u8BF7\u786E\u8BA4\u662F\u5426\u5220\u9664?",
                      onOk: (done) => handleToDel(__spreadProps(__spreadValues({}, record), {
                        rowIndex
                      }), done),
                      "ok-button-props": { status: "danger" }
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_a_button, {
                          type: "text",
                          status: "danger"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(isObject)(myOption.value.delBtn) && myOption.value.delBtn.text ? myOption.value.delBtn.text : "\u5220\u9664"), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 2
                    }, 1032, ["onOk"])) : createCommentVNode("", true),
                    _ctx.$slots.menuRight ? renderSlot(_ctx.$slots, "menuRight", {
                      key: 5,
                      record
                    }, void 0, true) : createCommentVNode("", true),
                    _ctx.$slots.menuright ? renderSlot(_ctx.$slots, "menuright", {
                      key: 6,
                      record
                    }, void 0, true) : createCommentVNode("", true)
                  ]),
                  _: 3
                }, 16, ["width"])) : createCommentVNode("", true)
              ]),
              _: 3
            }, 16, ["data", "pagination", "loading", "row-key"])
          ]),
          _: 3
        }, 512), [
          [vShow, !type.value || myOption.value.dialog === true]
        ]),
        type.value !== "" && myOption.value.dialog !== true ? (openBlock(), createBlock(_component_a_space, {
          key: 0,
          direction: "vertical",
          style: { "width": "100%" },
          size: "medium"
        }, {
          default: withCtx(() => [
            createVNode(_component_a_breadcrumb, null, {
              default: withCtx(() => [
                createVNode(_component_a_breadcrumb_item, null, {
                  default: withCtx(() => [
                    createVNode(_component_a_button, {
                      type: "text",
                      onClick: _cache[3] || (_cache[3] = ($event) => type.value = "")
                    }, {
                      icon: withCtx(() => [
                        createVNode(_component_icon_arrow_left)
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_a_breadcrumb_item, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(typeLabel)) + toDisplayString(myOption.value.subtitle), 1)
                  ]),
                  _: 1
                })
              ]),
              _: 1
            }),
            type.value === "view" ? (openBlock(), createBlock(_sfc_main$5, mergeProps({ key: 0 }, myOption.value.viewProps, {
              type: type.value,
              option: myOption.value,
              modelValue: form.value,
              "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.value = $event)
            }), {
              default: withCtx(() => [
                _ctx.$slots.viewFooter ? renderSlot(_ctx.$slots, "viewFooter", {
                  key: 0,
                  record: form.value
                }, void 0, true) : createCommentVNode("", true)
              ]),
              _: 3
            }, 16, ["type", "option", "modelValue"])) : (openBlock(), createBlock(_sfc_main$4, {
              key: 1,
              option: myOption.value,
              onSubmit: handleSubmit,
              modelValue: form.value,
              "onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => form.value = $event),
              type: type.value
            }, createSlots({ _: 2 }, [
              renderList(myOption.value.columns, (item) => {
                return {
                  name: item.prop,
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, item.prop + "Form", { record: form.value }, void 0, true)
                  ])
                };
              })
            ]), 1032, ["option", "modelValue", "type"]))
          ]),
          _: 3
        })) : createCommentVNode("", true),
        createVNode(_component_a_modal, {
          visible: type.value !== "" && myOption.value.dialog === true,
          title: unref(typeLabel) + myOption.value.subtitle,
          footer: false,
          onCancel: _cache[8] || (_cache[8] = ($event) => type.value = "")
        }, {
          default: withCtx(() => [
            type.value === "view" ? (openBlock(), createBlock(_sfc_main$5, mergeProps({ key: 0 }, myOption.value.viewProps, {
              type: type.value,
              option: myOption.value,
              modelValue: form.value,
              "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => form.value = $event)
            }), {
              default: withCtx(() => [
                _ctx.$slots.viewFooter ? renderSlot(_ctx.$slots, "viewFooter", {
                  key: 0,
                  record: form.value
                }, void 0, true) : createCommentVNode("", true)
              ]),
              _: 3
            }, 16, ["type", "option", "modelValue"])) : type.value !== "" ? (openBlock(), createBlock(_sfc_main$4, {
              key: 1,
              option: myOption.value,
              onSubmit: handleSubmit,
              modelValue: form.value,
              "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => form.value = $event),
              type: type.value
            }, createSlots({ _: 2 }, [
              renderList(myOption.value.columns, (item) => {
                return {
                  name: item.prop,
                  fn: withCtx(() => [
                    renderSlot(_ctx.$slots, item.prop + "Form", { record: form.value }, void 0, true)
                  ])
                };
              })
            ]), 1032, ["option", "modelValue", "type"])) : createCommentVNode("", true)
          ]),
          _: 3
        }, 8, ["visible", "title"])
      ], 64);
    };
  }
});
var Table = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-6c3c972a"]]);
const component$6 = Object.assign(Table, {
  inheritAttrs: false,
  install: (app, options) => {
    app.component(`${getComponentPrefix(options)}Table`, Table);
  }
});
const component$5 = Object.assign(_sfc_main$4, {
  inheritAttrs: false,
  install: (app, options) => {
    app.component(`${getComponentPrefix(options)}Form`, _sfc_main$4);
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    option: { default: {} },
    modelValue: null,
    disabled: { type: Boolean }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const dicData = ref([]);
    const dicProps = computed(() => filterProps(props.option.props));
    const hasProps = computed(() => {
      return props.option.props !== false;
    });
    const getDefaultValue = () => {
      if (!isUndefined(props.modelValue)) {
        return props.modelValue;
      }
      if (!isUndefined(props.option.value)) {
        return props.option.value;
      }
      return "";
    };
    const value = ref(getDefaultValue());
    watchEffect(() => {
      value.value = props.modelValue;
    });
    watch(value, (val) => {
      setTimeout(() => {
        emit("change", val);
      }, 0);
    });
    const handleChange = (val) => {
      value.value = val;
      emit("update:modelValue", val);
    };
    initDicData(props.option).then((res) => {
      dicData.value = res;
    });
    return (_ctx, _cache) => {
      const _component_a_radio = resolveComponent("a-radio");
      const _component_a_radio_group = resolveComponent("a-radio-group");
      return openBlock(), createBlock(_component_a_radio_group, {
        type: "button",
        modelValue: value.value,
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
        onChange: handleChange
      }, {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(dicData.value, (item, index) => {
            return openBlock(), createBlock(_component_a_radio, {
              value: unref(hasProps) ? item[unref(dicProps).value] : index,
              key: index
            }, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(hasProps) ? item[unref(dicProps).label] : item), 1)
              ]),
              _: 2
            }, 1032, ["value"]);
          }), 128))
        ]),
        _: 1
      }, 8, ["modelValue"]);
    };
  }
});
const component$4 = Object.assign(_sfc_main$1, {
  inheritAttrs: false,
  install: (app, options) => {
    app.component(`${getComponentPrefix(options)}Radio`, _sfc_main$1);
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  props: {
    option: { default: {} },
    modelValue: { default: "" },
    disabled: { type: Boolean, default: false }
  },
  emits: ["update:modelValue", "change"],
  setup(__props, { emit }) {
    const props = __props;
    const dicData = ref([]);
    const dicProps = computed(() => filterProps(props.option.props));
    const hasProps = computed(() => {
      return props.option.props !== false;
    });
    const loading = ref(false);
    const value = computed({
      get: () => {
        return props.modelValue;
      },
      set: (val) => {
        emit("update:modelValue", val === "" ? void 0 : val);
        const find = dicData.value.find((item) => {
          return hasProps.value ? val === item[dicProps.value.value] : val === item;
        });
        emit("change", val === "" ? void 0 : val, find);
      }
    });
    loading.value = true;
    initDicData(props.option).then((res) => {
      dicData.value = res;
      loading.value = false;
    }).catch(() => {
      loading.value = false;
    });
    return (_ctx, _cache) => {
      const _component_a_option = resolveComponent("a-option");
      const _component_a_select = resolveComponent("a-select");
      return openBlock(), createBlock(_component_a_select, mergeProps({
        modelValue: unref(value),
        "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => isRef(value) ? value.value = $event : null)
      }, __props.option, {
        loading: loading.value,
        disabled: props.disabled
      }), {
        default: withCtx(() => [
          (openBlock(true), createElementBlock(Fragment, null, renderList(dicData.value, (item, index) => {
            return openBlock(), createBlock(_component_a_option, {
              value: unref(hasProps) ? item[unref(dicProps).value] : index,
              key: index
            }, {
              default: withCtx(() => [
                renderSlot(_ctx.$slots, "default", {
                  item,
                  index,
                  dicData: dicData.value
                }, () => [
                  createTextVNode(toDisplayString(unref(hasProps) ? item[unref(dicProps).label] : item), 1)
                ])
              ]),
              _: 2
            }, 1032, ["value"]);
          }), 128))
        ]),
        _: 3
      }, 16, ["modelValue", "loading", "disabled"]);
    };
  }
});
const component$3 = Object.assign(_sfc_main, {
  inheritAttrs: false,
  install: (app, options) => {
    app.component(`${getComponentPrefix(options)}Select`, _sfc_main);
  }
});
const component$2 = Object.assign(Upload, {
  inheritAttrs: false,
  install: (app, options) => {
    app.component(`${getComponentPrefix(options)}Upload`, Upload);
  }
});
const component$1 = Object.assign(_sfc_main$5, {
  inheritAttrs: false,
  install: (app, options) => {
    app.component(`${getComponentPrefix(options)}Descriptions`, _sfc_main$5);
  }
});
const component = Object.assign(_sfc_main$3, {
  inheritAttrs: false,
  install: (app, options) => {
    app.component(`${getComponentPrefix(options)}Popconfirm`, _sfc_main$3);
  }
});
var extend = () => {
  Date.prototype.format = function(format = "yyyy-MM-dd hh:mm:ss") {
    return beanUtil.dateFormat(this, format);
  };
  Date.prototype.lastMonth = function() {
    if (this.getMonth() === 0) {
      this.setFullYear(this.getFullYear() - 1);
      this.setMonth(11);
    } else {
      this.setMonth(this.getMonth() - 1);
    }
    return this;
  };
};
var flex = "";
extend();
const components = {
  CButton: component$7,
  CRadio: component$4,
  CTable: component$6,
  CForm: component$5,
  CSelect: component$3,
  CUpload: component$2,
  CPopconfirm: component,
  CDescriptions: component$1
};
function filterValue(record, column) {
  return filterValue$1(record, column);
}
const crco = {
  install(app, options) {
    if (options !== void 0 && options.axios !== void 0) {
      window.axios = options.axios;
    }
    Object.keys(components).forEach((key) => {
      app.use(components[key], options);
    });
  }
};
window.crco = crco;
export { crco as default, filterValue };
