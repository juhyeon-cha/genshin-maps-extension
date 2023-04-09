// ==UserScript==
// @name         게임닷 원신 맵스 확장
// @namespace    view underground map
// @version      2.0
// @description  원신 맵스에 여러 기능을 추가하는 유저스크립트
// @author       juhyeon-cha
// @match        https://genshin.gamedot.org/?mid=genshinmaps
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamedot.org
// @updatelog    2023/04/09 v2.0 보물상자 필터링 기능 추가
// @homepageURL  https://github.com/juhyeon-cha/genshin-maps-extension/
// @downloadURL  https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/extension.js
// @updateURL    https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/extension.js
// @require      https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/js/select-box.js
// @resource     selectbox_css https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/css/select-box.css
// @resource     extension_css https://github.com/juhyeon-cha/genshin-maps-extension/raw/main/css/extension.css
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

const UNDERGROUND_IMAGES = [
    {
        'name': '간다르바_성곽_북_0',
        'url': 'https://i.imgur.com/IAWkgXA.png',
        'size': [700, 778, 38],
        'offset': [6037, 7673]
    },
    {
        'name': '간다언덕_동_0',
        'url': 'https://i.imgur.com/oYuceah.png',
        'size': [700, 1080, 32],
        'offset': [6067, 7242]
    },
    {
        'name': '과거의_바나라나',
        'url': 'https://i.imgur.com/OSf2gnh.png',
        'size': [700, 552, 74],
        'offset': [4438, 7847]
    },
    {
        'name': '과거의_바나라나_북_0',
        'url': 'https://i.imgur.com/mVAg3fY.png',
        'size': [800, 1149, 32],
        'offset': [4398, 7041]
    },
    {
        'name': '과거의_바나라나_북_1',
        'url': 'https://i.imgur.com/1FghM9T.png',
        'size': [700, 871, 26],
        'offset': [4440, 7374]
    },
    {
        'name': '다흐리의_폐허_0',
        'url': 'https://i.imgur.com/IhyqBG5.png',
        'size': [800, 396, 47],
        'offset': [4769, 8992]
    },
    {
        'name': '데반타카산_남동_0',
        'url': 'https://i.imgur.com/TnRoFcb.png',
        'size': [700, 640, 52],
        'offset': [6158, 8732]
    },
    {
        'name': '데반타카산_남서_0',
        'url': 'https://i.imgur.com/BOSKeFK.png',
        'size': [800, 665, 46],
        'offset': [5673, 8679]
    },
    {
        'name': '데반타카산_동_0',
        'url': 'https://i.imgur.com/ehQGwq3.png',
        'size': [700, 503, 25],
        'offset': [6433, 8502]
    },
    {
        'name': '데반타카산_북동_0',
        'url': 'https://i.imgur.com/YluvQYF.png',
        'size': [600, 692, 49],
        'offset': [6232, 8277]
    },
    {
        'name': '마우티이마_숲_남동_0',
        'url': 'https://i.imgur.com/GsOR3Uv.png',
        'size': [700, 739, 38],
        'offset': [6200, 6928]
    },
    {
        'name': '마우티이마_숲_남동_1',
        'url': 'https://i.imgur.com/L4I3MJU.png',
        'size': [296, 200, 42],
        'offset': [6444, 7422]
    },
    {
        'name': '마우티이마_숲_북동_0',
        'url': 'https://i.imgur.com/TZNzERN.png',
        'size': [700, 576, 52],
        'offset': [5870, 6625]
    },
    {
        'name': '마우티이마_숲_서_0',
        'url': 'https://i.imgur.com/d85lP4L.png',
        'size': [700, 964, 30],
        'offset': [5885, 6738]
    },
    {
        'name': '비마라_마을_남서_0',
        'url': 'https://i.imgur.com/so8atDV.png',
        'size': [700, 627, 45],
        'offset': [5515, 8422]
    },
    {
        'name': '비마라_마을_동_0',
        'url': 'https://i.imgur.com/3GRx15c.png',
        'size': [700, 337, 40],
        'offset': [5869, 8427]
    },
    {
        'name': '선나원_북_0',
        'url': 'https://i.imgur.com/kvKcR5C.png',
        'size': [802, 658, 41],
        'offset': [5089, 7973]
    },
    {
        'name': '선나원_북_1',
        'url': 'https://i.imgur.com/gB87N9O.png',
        'size': [700, 558, 62],
        'offset': [5060, 7912]
    },
    {
        'name': '수천삼림_남_0',
        'url': 'https://i.imgur.com/JdnQgjG.png',
        'size': [700, 647, 40],
        'offset': [5078, 8937]
    },
    {
        'name': '아란나라_동_0',
        'url': 'https://i.imgur.com/BkbmTpH.png',
        'size': [800, 687, 39],
        'offset': [4983, 7371]
    },
    {
        'name': '야스나_유경_남_0',
        'url': 'https://i.imgur.com/ckZNZsL.png',
        'size': [700, 507, 55],
        'offset': [4629, 8360]
    },
    {
        'name': '차트라캄_동굴_0',
        'url': 'https://i.imgur.com/K9iZfPB.png',
        'size': [700, 1081, 43],
        'offset': [5434, 6830]
    },
    {
        'name': '다르알시파_0',
        'url': 'https://i.imgur.com/3qLdt4p.png',
        'size': [700, 828, 34],
        'offset': [4335, 9405]
    },
    {
        'name': '다마반드산_0',
        'url': 'https://i.imgur.com/2WHSZFL.png',
        'size': [800, 761, 52],
        'offset': [3321, 7948]
    },
    {
        'name': '다섯_오아시스의_생존자_0',
        'url': 'https://i.imgur.com/qD1zPv5.png',
        'size': [700, 400, 71],
        'offset': [3589, 7450]
    },
    {
        'name': '다흐리_계곡_서_0',
        'url': 'https://i.imgur.com/OcLNox6.png',
        'size': [700, 856, 42],
        'offset': [3554, 10095]
    },
    {
        'name': '다흐리_계곡_서_1',
        'url': 'https://i.imgur.com/28VTfpy.png',
        'size': [700, 974, 42],
        'offset': [3793, 10023]
    },
    {
        'name': '도피의_언덕_남서_0',
        'url': 'https://i.imgur.com/0GbvGew.png',
        'size': [2290, 840, 14],
        'offset': [2117, 9974]
    },
    {
        'name': '부러진_정강이_협곡_0',
        'url': 'https://i.imgur.com/SESBHtN.png',
        'size': [700, 626, 74],
        'offset': [2485, 7944]
    },
    {
        'name': '세_운하의_땅_북_0',
        'url': 'https://i.imgur.com/iQKgK1j.png',
        'size': [600, 621, 61],
        'offset': [2784, 7347]
    },
    {
        'name': '세_운하의_땅_0',
        'url': 'https://i.imgur.com/LK56eHQ.png',
        'size': [800, 637, 60],
        'offset': [2881, 7510]
    },
    {
        'name': '적왕의_무덤_0',
        'url': 'https://i.imgur.com/4AoJPpC.png',
        'size': [1514, 1579, 57],
        'offset': [2354, 9001]
    },
    {
        'name': '적왕의_무덤_1',
        'url': 'https://i.imgur.com/bbXIMpW.png',
        'size': [700, 1162, 41],
        'offset': [2796, 9333]
    },
    {
        'name': '적왕의_무덤_서_0',
        'url': 'https://i.imgur.com/ZrDV2JC.png',
        'size': [600, 1398, 42],
        'offset': [2452, 8904]
    },
    {
        'name': '신이_버린_신전_0',
        'url': 'https://i.imgur.com/LQqO1Cy.png',
        'size': [700, 727, 70],
        'offset': [2671, 8808]
    },
    {
        'name': '신이_버린_신전_북_0',
        'url': 'https://i.imgur.com/MmVuqWP.png',
        'size': [700, 550, 70],
        'offset': [2820, 8358]
    },
    {
        'name': '신이_버린_신전_북_1',
        'url': 'https://i.imgur.com/wbttkgz.png',
        'size': [500, 377, 32],
        'offset': [3076, 8653]
    },
    {
        'name': '알_아지프의_모래_0',
        'url': 'https://i.imgur.com/qLHMu2T.png',
        'size': [700, 760, 76],
        'offset': [3760, 7927]
    },
    {
        'name': '영원의_오아시스_0',
        'url': 'https://i.imgur.com/lH0bAk5.png',
        'size': [700, 942, 48],
        'offset': [3081, 7727]
    },
    {
        'name': '자갈의_언덕_0',
        'url': 'https://i.imgur.com/FTOn4CI.png',
        'size': [700, 718, 66],
        'offset': [2609, 9701]
    },
    {
        'name': '자갈의_언덕_1',
        'url': 'https://i.imgur.com/5BiYsbf.png',
        'size': [700, 1075, 29],
        'offset': [2402, 9663]
    },
    {
        'name': '희생_함정_0',
        'url': 'https://i.imgur.com/dJhrFfI.png',
        'size': [800, 732, 73],
        'offset': [3871, 9349]
    },
];

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
        var template = document.createElement('template');
        template.innerHTML = `
        <div class="underground-image" data-index="${index}" data-name="${image.name}" style="width: ${image.size[0]}px; height: ${image.size[1]}px; transform: translate(${image.offset[0]}px, ${image.offset[1]}px) scale(1);">
            <div style="background-image: url(${image.url}); background-size: ${image.size[2]}%"></div>
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

function adjustMapsLayer() {
    if (IS_VISIBLE_ACTIVE_MAPS_PIN === false) return;
    if (Object.prototype.toString.call(MAPS_ViewPin) != '[object Set]' || MAPS_ViewPin.size <= 0) return;

    const filter = document.getElementById('chest-filter');
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
                    const selectedValues = Array.from(filter.selectedOptions).map(v => v.value);
                    if (selectedValues.includes(arrCategory.name) == false) {
                        document.querySelector(`.maps-point[data-pin="${point.pin}"][data-point="${point.point}"]`)?.remove();
                        return true;
                    }
                }
            }
            if (MAPS_State.pinGroup == true && arrPinData.offcombine == false) {
                // 핀 그룹화를 위해 평균 구하기.
                let arrPinGroup = mapPinGroup.get(point.pin);
                const isUnderground = point.tag?.includes("지하");
                arrPinGroup = arrPinGroup ? arrPinGroup : { x: 0, y: 0, state: 0, length: 0, points: [], underground_state: 0, underground_length: 0, point: point };
                if (IS_UNDERGROUND_ACTIVE === isUnderground) {
                    arrPinGroup.x += point.x;
                    arrPinGroup.y += point.y;
                }
                arrPinGroup.points.push(point);
                arrPinGroup.length++;
                arrPinGroup.state = point.state ? arrPinGroup.state + 1 : arrPinGroup.state;
                if (isUnderground) {
                    arrPinGroup.underground_state = point.state ? arrPinGroup.underground_state + 1 : arrPinGroup.underground_state;
                    arrPinGroup.underground_length++;
                }

                mapPinGroup.set(point.pin, arrPinGroup);
                return false;
            }
        });

        if (MAPS_State.pinGroup == true) {
            mapPinGroup.forEach((value) => {
                const arrData = v.split("/", 2);
                const pt = value.point;
                const pin = document.querySelector(`.maps-point.group[data-pin="${pt.pin}"][data-point="${pt.point}"]`);
                if (pin) {
                    pin.remove();
                    const state = IS_UNDERGROUND_ACTIVE ? value.underground_state : (value.state - value.underground_state);
                    const length = IS_UNDERGROUND_ACTIVE ? value.underground_length : (value.length - value.underground_length);

                    let objectPoint;
                    if (length > 1) {
                        objectPoint = drawPinObject(true, value.point, arrData);
                        objectPoint.className = "maps-point group";

                        let objectCount = document.createElement("p");
                        objectCount.innerText = state + "/" + length;
                        objectPoint.querySelector("div").appendChild(objectCount);
                        let groupX = value.x / length;
                        let groupY = value.y / length;

                        objectPoint.setAttribute(
                            "style",
                            "transform: translate(" + (groupX + MAPS_RelativeX) + "px, " + (groupY + MAPS_RelativeY) + "px);"
                        );
                        objectPoint.setAttribute("data-state", state == length ? "true" : "false");
                        objectPoint.removeAttribute("data-tip");

                        // 사이즈 설정
                        objectPoint.style.marginLeft = objectPoint.style.marginTop = "-64px";
                        OBJECT_PIN_LAYER.appendChild(objectPoint);
                    } else {
                        for (const point of value.points) {
                            objectPoint = drawPinObject(false, point, arrData);
                            OBJECT_PIN_LAYER.appendChild(objectPoint);
                        }
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

function removeDisabledMapsPin() {
    if (!IS_VISIBLE_ACTIVE_MAPS_PIN) return;

    const dataSelector = IS_UNDERGROUND_ACTIVE ? ':not([data-is-underground])' : '[data-is-underground]';
    document.querySelectorAll(`#mapsLayerPoint > .maps-point${dataSelector}`).forEach(element => element.remove());
}

drawMapsLayer = (function (originDrawMapsLayer) {
    'use strict';

    return (boolPanelHide) => {
        originDrawMapsLayer(boolPanelHide);
        adjustMapsLayer();
        drawUndergroundLayer();
        removeDisabledMapsPin();
    };

}(drawMapsLayer));

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
}());
