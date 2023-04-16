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
// @grant        GM_getResourceText
// @grant        GM_addStyle
// ==/UserScript==

let UNDERGROUND_IMAGES = [
    // 숲
    {
        "name": "간다르바_성곽_북_0",
        "url": "/img/숲/간다르바_성곽_북_0.png",
        "size": [
            700,
            778,
            38
        ],
        "offset": [
            -3423,
            2566
        ]
    },
    {
        "name": "간다언덕_동_0",
        "url": "/img/숲/간다언덕_동_0.png",
        "size": [
            700,
            1080,
            32
        ],
        "offset": [
            -3393,
            2135
        ]
    },
    {
        "name": "과거의_바나라나",
        "url": "/img/숲/과거의_바나라나.png",
        "size": [
            700,
            552,
            74
        ],
        "offset": [
            -5022,
            2740
        ]
    },
    {
        "name": "과거의_바나라나_북_0",
        "url": "/img/숲/과거의_바나라나_북_0.png",
        "size": [
            800,
            1149,
            32
        ],
        "offset": [
            -5062,
            1934
        ]
    },
    {
        "name": "과거의_바나라나_북_1",
        "url": "/img/숲/과거의_바나라나_북_1.png",
        "size": [
            700,
            871,
            26
        ],
        "offset": [
            -5020,
            2267
        ]
    },
    {
        "name": "다흐리의_폐허_0",
        "url": "/img/숲/다흐리의_폐허_0.png",
        "size": [
            800,
            396,
            47
        ],
        "offset": [
            -4691,
            3885
        ]
    },
    {
        "name": "데반타카산_남동_0",
        "url": "/img/숲/데반타카산_남동_0.png",
        "size": [
            700,
            640,
            52
        ],
        "offset": [
            -3302,
            3625
        ]
    },
    {
        "name": "데반타카산_남서_0",
        "url": "/img/숲/데반타카산_남서_0.png",
        "size": [
            800,
            665,
            46
        ],
        "offset": [
            -3787,
            3572
        ]
    },
    {
        "name": "데반타카산_동_0",
        "url": "/img/숲/데반타카산_동_0.png",
        "size": [
            700,
            503,
            25
        ],
        "offset": [
            -3027,
            3395
        ]
    },
    {
        "name": "데반타카산_북동_0",
        "url": "/img/숲/데반타카산_북동_0.png",
        "size": [
            600,
            692,
            49
        ],
        "offset": [
            -3228,
            3170
        ]
    },
    {
        "name": "마우티이마_숲_남동_0",
        "url": "/img/숲/마우티이마_숲_남동_0.png",
        "size": [
            700,
            739,
            38
        ],
        "offset": [
            -3260,
            1821
        ]
    },
    {
        "name": "마우티이마_숲_남동_1",
        "url": "/img/숲/마우티이마_숲_남동_1.png",
        "size": [
            296,
            200,
            42
        ],
        "offset": [
            -3016,
            2315
        ]
    },
    {
        "name": "마우티이마_숲_북동_0",
        "url": "/img/숲/마우티이마_숲_북동_0.png",
        "size": [
            700,
            576,
            52
        ],
        "offset": [
            -3590,
            1518
        ]
    },
    {
        "name": "마우티이마_숲_서_0",
        "url": "/img/숲/마우티이마_숲_서_0.png",
        "size": [
            700,
            964,
            30
        ],
        "offset": [
            -3575,
            1631
        ]
    },
    {
        "name": "비마라_마을_남서_0",
        "url": "/img/숲/비마라_마을_남서_0.png",
        "size": [
            700,
            627,
            45
        ],
        "offset": [
            -3945,
            3315
        ]
    },
    {
        "name": "비마라_마을_동_0",
        "url": "/img/숲/비마라_마을_동_0.png",
        "size": [
            700,
            337,
            40
        ],
        "offset": [
            -3591,
            3320
        ]
    },
    {
        "name": "선나원_북_0",
        "url": "/img/숲/선나원_북_0.png",
        "size": [
            802,
            658,
            41
        ],
        "offset": [
            -4371,
            2866
        ]
    },
    {
        "name": "선나원_북_1",
        "url": "/img/숲/선나원_북_1.png",
        "size": [
            700,
            558,
            62
        ],
        "offset": [
            -4400,
            2805
        ]
    },
    {
        "name": "수천삼림_남_0",
        "url": "/img/숲/수천삼림_남_0.png",
        "size": [
            700,
            647,
            40
        ],
        "offset": [
            -4382,
            3830
        ]
    },
    {
        "name": "아란나라_동_0",
        "url": "/img/숲/아란나라_동_0.png",
        "size": [
            800,
            687,
            39
        ],
        "offset": [
            -4477,
            2264
        ]
    },
    {
        "name": "야스나_유경_남_0",
        "url": "/img/숲/야스나_유경_남_0.png",
        "size": [
            700,
            507,
            55
        ],
        "offset": [
            -4831,
            3253
        ]
    },
    {
        "name": "차트라캄_동굴_0",
        "url": "/img/숲/차트라캄_동굴_0.png",
        "size": [
            700,
            1081,
            43
        ],
        "offset": [
            -4026,
            1723
        ]
    },
    // 사막
    {
        "name": "다르알시파_0",
        "url": "/img/사막/다르알시파_0.png",
        "size": [
            700,
            828,
            34
        ],
        "offset": [
            -5125,
            4298
        ]
    },
    {
        "name": "다마반드산_0",
        "url": "/img/사막/다마반드산_0.png",
        "size": [
            800,
            761,
            52
        ],
        "offset": [
            -6139,
            2841
        ]
    },
    {
        "name": "다섯_오아시스의_생존자_0",
        "url": "/img/사막/다섯_오아시스의_생존자_0.png",
        "size": [
            700,
            400,
            71
        ],
        "offset": [
            -5871,
            2343
        ]
    },
    {
        "name": "다흐리_계곡_서_0",
        "url": "/img/사막/다흐리_계곡_서_0.png",
        "size": [
            700,
            856,
            42
        ],
        "offset": [
            -5906,
            4988
        ]
    },
    {
        "name": "다흐리_계곡_서_1",
        "url": "/img/사막/다흐리_계곡_서_1.png",
        "size": [
            700,
            974,
            42
        ],
        "offset": [
            -5667,
            4916
        ]
    },
    {
        "name": "도피의_언덕_남서_0",
        "url": "/img/사막/도피의_언덕_남서_0.png",
        "size": [
            2290,
            840,
            14
        ],
        "offset": [
            -7343,
            4867
        ]
    },
    {
        "name": "부러진_정강이_협곡_0",
        "url": "/img/사막/부러진_정강이_협곡_0.png",
        "size": [
            700,
            626,
            74
        ],
        "offset": [
            -6975,
            2837
        ]
    },
    {
        "name": "세_운하의_땅_북_0",
        "url": "/img/사막/세_운하의_땅_북_0.png",
        "size": [
            600,
            621,
            61
        ],
        "offset": [
            -6676,
            2240
        ]
    },
    {
        "name": "세_운하의_땅_0",
        "url": "/img/사막/세_운하의_땅_0.png",
        "size": [
            800,
            637,
            60
        ],
        "offset": [
            -6579,
            2403
        ]
    },
    {
        "name": "적왕의_무덤_0",
        "url": "/img/사막/적왕의_무덤_0.png",
        "size": [
            1514,
            1579,
            57
        ],
        "offset": [
            -7106,
            3894
        ]
    },
    {
        "name": "적왕의_무덤_1",
        "url": "/img/사막/적왕의_무덤_1.png",
        "size": [
            700,
            1162,
            41
        ],
        "offset": [
            -6664,
            4226
        ]
    },
    {
        "name": "적왕의_무덤_서_0",
        "url": "/img/사막/적왕의_무덤_서_0.png",
        "size": [
            600,
            1398,
            42
        ],
        "offset": [
            -7008,
            3797
        ]
    },
    {
        "name": "신이_버린_신전_0",
        "url": "/img/사막/신이_버린_신전_0.png",
        "size": [
            700,
            727,
            70
        ],
        "offset": [
            -6789,
            3701
        ]
    },
    {
        "name": "신이_버린_신전_북_0",
        "url": "/img/사막/신이_버린_신전_북_0.png",
        "size": [
            700,
            550,
            70
        ],
        "offset": [
            -6640,
            3251
        ]
    },
    {
        "name": "신이_버린_신전_북_1",
        "url": "/img/사막/신이_버린_신전_북_1.png",
        "size": [
            500,
            377,
            32
        ],
        "offset": [
            -6384,
            3546
        ]
    },
    {
        "name": "알_아지프의_모래_0",
        "url": "/img/사막/알_아지프의_모래_0.png",
        "size": [
            700,
            760,
            76
        ],
        "offset": [
            -5700,
            2820
        ]
    },
    {
        "name": "영원의_오아시스_0",
        "url": "/img/사막/영원의_오아시스_0.png",
        "size": [
            700,
            942,
            48
        ],
        "offset": [
            -6379,
            2620
        ]
    },
    {
        "name": "자갈의_언덕_0",
        "url": "/img/사막/자갈의_언덕_0.png",
        "size": [
            700,
            718,
            66
        ],
        "offset": [
            -6851,
            4594
        ]
    },
    {
        "name": "자갈의_언덕_1",
        "url": "/img/사막/자갈의_언덕_1.png",
        "size": [
            700,
            1075,
            29
        ],
        "offset": [
            -7058,
            4556
        ]
    },
    {
        "name": "희생_함정_0",
        "url": "/img/사막/희생_함정_0.png",
        "size": [
            800,
            732,
            73
        ],
        "offset": [
            -5589,
            4242
        ]
    },
    // 3.6
    {
        "name": "감로_꽃바다_북_0",
        "url": "/img/사막/3.6/감로_꽃바다_북_0.png",
        "size": [
            4000,
            2600,
            19
        ],
        "offset": [
            -8436,
            160
        ]
    },
    {
        "name": "바르솜_정상_0",
        "url": "/img/사막/3.6/바르솜_정상_0.png",
        "size": [
            4000,
            2600,
            9
        ],
        "offset": [
            -8681,
            19
        ]
    },
    {
        "name": "아시파트라바나_늪_북_0",
        "url": "/img/사막/3.6/아시파트라바나_늪_북_0.png",
        "size": [
            4000,
            2600,
            15
        ],
        "offset": [
            -8933,
            90
        ]
    },
    {
        "name": "아시파트라바나_늪_서_0",
        "url": "/img/사막/3.6/아시파트라바나_늪_서_0.png",
        "size": [
            2630,
            2767,
            21
        ],
        "offset": [
            -8493,
            -82
        ]
    },
    {
        "name": "테미르산_동_1",
        "url": "/img/사막/3.6/테미르산_동_1.png",
        "size": [
            4000,
            2600,
            19
        ],
        "offset": [
            -8820,
            741
        ]
    },
    {
        "name": "테미르산_동_0",
        "url": "/img/사막/3.6/테미르산_동_0.png",
        "size": [
            4000,
            2600,
            18
        ],
        "offset": [
            -8856,
            646
        ]
    },
    {
        "name": "투니기_흑연_0",
        "url": "/img/사막/3.6/투니기_흑연_0.png",
        "size": [
            5005,
            2699,
            20
        ],
        "offset": [
            -9731,
            430
        ]
    }
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

function removeDisabledMapsPin() {
    if (!IS_VISIBLE_ACTIVE_MAPS_PIN) return;

    const dataSelector = IS_UNDERGROUND_ACTIVE ? ':not([data-is-underground]):not([data-tip*="지하 및 실내 구역 입구"])' : '[data-is-underground]';
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
