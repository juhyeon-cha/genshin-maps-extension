// ==UserScript==
// @name         게임닷 원신 맵스 확장
// @namespace    view underground map
// @version      2.4
// @description  원신 맵스에 여러 기능을 추가하는 유저스크립트
// @author       juhyeon-cha
// @match        https://genshin.gamedot.org/?mid=genshinmaps
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamedot.org
// @updatelog    2023/04/16 v2.4 지하 입구 핀 사라지지 않도록 수정
// @homepageURL  https://github.com/juhyeon-cha/genshin-maps-extension/
// @downloadURL  https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/extension.js
// @updateURL    https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/extension.js
// @require      https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/js/select-box.js
// @resource     selectbox_css https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/css/select-box.css
// @resource     extension_css https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/css/extension.css
// @resource     images_json https://github.com/juhyeon-cha/genshin-maps-extension/raw/feature/refactoring/img/images.jsonc
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

let UNDERGROUND_IMAGES = eval(GM_getResourceText("images_json"));

let IS_UNDERGROUND_ACTIVE = false;
let IS_VISIBLE_ACTIVE_MAPS_PIN = true;
let IS_CHEST_PIN_LOADED = {};
IS_CHEST_PIN_LOADED.value = MAPS_PinLoad.filter(value => value.name?.includes("보물상자")).length > 0;

let handlers = Symbol('handlers');

function makeObservable(target) {
    target[handlers] = [];

    target.observe = function (handler) {
        this[handlers].push(handler);
    };

    return new Proxy(target, {
        set(target, property, value, receiver) {
            let success = Reflect.set(...arguments);
            if (success) {
                target[handlers].forEach(handler => handler(property, value));
            }
            return success;
        }
    });
}

function addMapsExtensionSwitch() {
    var template = document.createElement('template');
    template.innerHTML = `
    <div class="maps-extension">
        <div class="chest-pin">
            <div class="maps-extension-switch-label">상자 필터</div>
            <select id="chest-filter" multiple>
                <option value="평범한" style="color: gray;">평범한</option>
                <option value="정교한" style="color: #9ee0d4;">정교한</option>
                <option value="진귀한" style="color: #e6ba7b;">진귀한</option>
                <option value="화려한" style="color: #ff6c38;">화려한</option>
                <option value="신묘한" style="color: #accb29;">신묘한</option>
            </select>
        </div>
        <div class="maps-extension-switch-label">활성맵 핀</div>
        <div id="visibleActiveMapsPinSwitch" class="maps-extension-switch on"></div>
        <div class="maps-extension-switch-label">지하 맵</div>
        <div id="undergroundSwitch" class="maps-extension-switch"></div>
    </div>`;

    template = template.content.childNodes[1];
    document.getElementById('mapsAddonsMenu').after(template);
    document.getElementById('undergroundSwitch').addEventListener('click', clickUndergroundSwitch);
    document.getElementById('visibleActiveMapsPinSwitch').addEventListener('click', clickVisibleActiveMapsPinSwitch);
}

function clickUndergroundSwitch() {
    var undergroundSwitch = document.getElementById('undergroundSwitch');
    IS_UNDERGROUND_ACTIVE = !IS_UNDERGROUND_ACTIVE;
    IS_UNDERGROUND_ACTIVE ? undergroundSwitch.classList.add('on') : undergroundSwitch.classList.remove('on');
    IS_UNDERGROUND_ACTIVE ? addUndergroundLayer() : removeUndergroundLayer();

    setPinObjectRefresh();
}

function clickVisibleActiveMapsPinSwitch() {
    var visibleActiveMapsPinSwitch = document.getElementById('visibleActiveMapsPinSwitch');
    IS_VISIBLE_ACTIVE_MAPS_PIN = !IS_VISIBLE_ACTIVE_MAPS_PIN;
    IS_VISIBLE_ACTIVE_MAPS_PIN ? visibleActiveMapsPinSwitch.classList.add('on') : visibleActiveMapsPinSwitch.classList.remove('on');

    setPinObjectRefresh();
}

function addUndergroundLayer() {
    const layer = document.getElementById('mapsLayerBackground');
    const layerScale = MAPS_ViewSize / MAPS_Size;

    var template = document.createElement('template');
    template.innerHTML = `
    <div id="mapsLayerUnderground" class="underground-layer" style="width: 17920px; height: 17920px; transform: scale(${layerScale});">
    </div>`;
    const undergroundLayer = template.content.childNodes[1];

    UNDERGROUND_IMAGES.forEach((image, index) => {
        const x = image.offset[0] + MAPS_RelativeX;
        const y = image.offset[1] + MAPS_RelativeY;
        const url = `https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/${image.url}`;
        var template = document.createElement('template');
        template.innerHTML = `
        <div class="underground-image" data-index="${index}" data-name="${image.name}" style="width: ${image.size[0]}px; height: ${image.size[1]}px; transform: translate(${x}px, ${y}px) scale(1);">
            <div style="background-image: url(${url}); background-size: ${image.size[2]}%"></div>
        </div>`;

        template = template.content.childNodes[1];
        undergroundLayer.appendChild(template);
    });
    template = document.createElement('template');
    template.innerHTML = '<div style="background-color: black; opacity: 0.5; width: 100%; height: 100%;"></div>';
    template = template.content.childNodes[0];
    undergroundLayer.appendChild(template);
    layer.after(undergroundLayer);
}

function removeUndergroundLayer() {
    document.getElementById('mapsLayerUnderground').remove();
}

let CHEST_FILTER;
function addChestPinEvent() {
    IS_CHEST_PIN_LOADED = makeObservable(IS_CHEST_PIN_LOADED);
    IS_CHEST_PIN_LOADED.observe((property, isPinLoaded) => {
        const chestPinEl = document.querySelector('.maps-extension > .chest-pin');
        isPinLoaded ? chestPinEl.classList.remove('hide') : chestPinEl.classList.add('hide');
        CHEST_FILTER?.setValue('all');
    });
    const chestPinEl = document.querySelector('.maps-extension > .chest-pin');
    IS_CHEST_PIN_LOADED.value ? chestPinEl.classList.remove('hide') : chestPinEl.classList.add('hide');

    CHEST_FILTER = new vanillaSelectBox("#chest-filter", {
        placeHolder: "상자 선택",
        translations: {
            "all": "전체",
            "item": "item",
            "items": "items",
            "selectAll": "전체",
            "clearAll": "전체"
        },
        disableSelectAll: false,
        keepInlineStyles: false,
        keepInlineCaretStyles: false
    });
    CHEST_FILTER.setValue('all');
    for (const li of CHEST_FILTER.ul.childNodes) {
        if (li.dataset.value !== 'all') {
            li.textContent += ' ■';
        }
    }
    document.getElementById('chest-filter').addEventListener('change', (ev) => {
        setPinObjectRefresh();
    });
}

/**
 * 맵스 핀 레이어를 보정하기 위한 함수
 * 
 */
function adjustMapsLayer() {
    if (Object.prototype.toString.call(MAPS_ViewPin) != '[object Set]' || MAPS_ViewPin.size <= 0) return;

    const filter = document.getElementById('chest-filter');
    const selectedValues = Array.from(filter.selectedOptions).map(v => v.value);
    const OBJECT_PIN_LAYER = document.getElementById("mapsLayerPoint");
    MAPS_ViewPin.forEach((v) => {
        const arrDrawPin = MAPS_PinDraw.get(v);
        if (Object.prototype.toString.call(arrDrawPin) != '[object Array]' || arrDrawPin.length <= 0) return true;

        mapPinGroup = new Map();
        arrDrawPin.forEach((point) => {
            const arrPinData = MAPS_PinLoad[point.pin];
            if (point.category && arrPinData.category[point.category]) {
                const arrCategory = arrPinData.category[point.category];
                if (arrPinData.name?.includes("보물상자")) {
                    if (selectedValues.includes(arrCategory.name) == false) {
                        document.querySelector(`.maps-point[data-pin="${point.pin}"][data-point="${point.point}"]`)?.remove();
                        return true;
                    }
                }
            }
            if (MAPS_State.pinGroup == true) {
                // 핀 그룹화를 위해 평균 구하기.
                let arrPinGroup = mapPinGroup.get(point.pin);
                arrPinGroup = arrPinGroup ? arrPinGroup : { x: 0, y: 0, state: 0, length: 0, points: [], point: point };
                arrPinGroup.x += point.x;
                arrPinGroup.y += point.y;
                arrPinGroup.points.push(point);
                arrPinGroup.length++;
                arrPinGroup.state = point.state ? arrPinGroup.state + 1 : arrPinGroup.state;

                mapPinGroup.set(point.pin, arrPinGroup);
                return false;
            }
        });

        if (MAPS_State.pinGroup) {
            mapPinGroup.forEach((value) => {
                const arrData = v.split("/", 2);
                let state = 0;
                let length = 0;
                let x = 0;
                let y = 0;
                for (const point of value.points) {
                    const pin = document.querySelector(`.maps-point[data-pin="${point.pin}"][data-point="${point.point}"]`);
                    if (pin) {
                        pin.remove();
                    }
                    const isUnderground = point.tag?.includes("지하");
                    if (IS_UNDERGROUND_ACTIVE !== isUnderground && IS_VISIBLE_ACTIVE_MAPS_PIN) {
                        continue;
                    }
                    if (point.state) {
                        state++;
                    }
                    x += point.x;
                    y += point.y;
                    length++;
                }

                let objectPoint;
                if (length > 1) {
                    objectPoint = drawPinObject(true, value.point, arrData);
                    objectPoint.className = "maps-point group";

                    let objectCount = document.createElement("p");
                    objectCount.innerText = state + "/" + length;
                    objectPoint.querySelector("div").appendChild(objectCount);
                    let groupX = x / length;
                    let groupY = y / length;

                    objectPoint.setAttribute(
                        "style",
                        "transform: translate(" + (groupX + MAPS_RelativeX) + "px, " + (groupY + MAPS_RelativeY) + "px);"
                    );
                    objectPoint.setAttribute("data-state", state == length ? "true" : "false");
                    objectPoint.removeAttribute("data-tip");
                    if (IS_UNDERGROUND_ACTIVE !== value.point.tag?.includes("지하")) {
                        objectPoint.removeAttribute("data-is-underground");
                    }

                    // 사이즈 설정
                    objectPoint.style.marginLeft = objectPoint.style.marginTop = "-64px";
                    OBJECT_PIN_LAYER.appendChild(objectPoint);
                } else {
                    for (const point of value.points) {
                        objectPoint = drawPinObject(false, point, arrData);
                        OBJECT_PIN_LAYER.appendChild(objectPoint);
                    }
                }
            });
        }
    });
}

function drawUndergroundLayer() {
    if (!IS_UNDERGROUND_ACTIVE) return;

    const layerScale = MAPS_ViewSize / MAPS_Size;
    const undergroundLayer = document.getElementById('mapsLayerUnderground');
    undergroundLayer.style.transform = `scale(${layerScale})`;
}

/**
 * 필요하지 않은 핀 제거
 * 
 * 활성맵핀 옵션이 활성화 되어있다면 동작하지 않는다.
 */
function removeUnnecessaryPin() {
    if (!IS_VISIBLE_ACTIVE_MAPS_PIN) return;

    const dataSelector = IS_UNDERGROUND_ACTIVE ? ':not([data-is-underground]):not([data-tip*="지하 및 실내 구역 입구"])' : '[data-is-underground]';
    document.querySelectorAll(`#mapsLayerPoint > .maps-point${dataSelector}`).forEach(element => element.remove());
}

/**
 * 게임닷에서 지도를 그릴 때 필요한 추가 작업을 위해 전역 함수 덮어쓰기
 */
drawMapsLayer = (function (originDrawMapsLayer) {
    'use strict';

    return (boolPanelHide) => {
        originDrawMapsLayer(boolPanelHide);
        adjustMapsLayer();
        drawUndergroundLayer();
        removeUnnecessaryPin();
    };

}(drawMapsLayer));

/**
 * 게임닷 전역변수 MAPS_PinLoad의 제거 시 다시 프록시 하기 위해 전역 함수 덮어쓰기
 */
removePin = (function (originRemovePin) {
    'use strict';

    const _proxyLoadedPin = () => {
        IS_CHEST_PIN_LOADED.value = MAPS_PinLoad.filter(value => value.name?.includes("보물상자")).length > 0;
        MAPS_PinLoad = makeObservable(MAPS_PinLoad);
        MAPS_PinLoad.observe((index, value) => {
            if (Object.prototype.toString.call(value) == '[object Object]' && value.name?.includes("보물상자")) {
                IS_CHEST_PIN_LOADED.value = true;
            }
        });
    }

    _proxyLoadedPin();
    return (boolGroup, pinIndex, boolTabUpdate) => {
        originRemovePin(boolGroup, pinIndex, boolTabUpdate);
        _proxyLoadedPin();
    };

}(removePin));

// Main
(function () {
    const selectbox_css = GM_getResourceText("selectbox_css");
    GM_addStyle(selectbox_css);
    const extension_css = GM_getResourceText("extension_css");
    GM_addStyle(extension_css);
    addMapsExtensionSwitch();
    addChestPinEvent();

    // 지도 클릭 이벤트
    objectViewer.addEventListener("click", function (e) {
        var x = e.clientX + objectViewer.scrollLeft;
        x = Math.round((x / MAPS_Scale) * 100);
        var y = e.clientY + objectViewer.scrollTop;
        y = Math.round((y / MAPS_Scale) * 100);
        // console.log("{x: " + (x - MAPS_RelativeX) + ",y: " + (y - MAPS_RelativeY) + ",text: ''},");
        // console.log("클릭 위치", e.target, x - MAPS_RelativeX, y - MAPS_RelativeY, Math.floor((x - MAPS_RelativeX) / MAPS_Block), Math.floor((y - MAPS_RelativeY) / MAPS_Block));
    });
}());
