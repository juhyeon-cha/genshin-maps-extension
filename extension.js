// ==UserScript==
// @name         게임닷 원신 맵스 확장
// @namespace    view desert underground
// @version      0.1
// @description
// @author       You
// @match        https://genshin.gamedot.org/?mid=genshinmaps
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamedot.org
// @grant        none
// ==/UserScript==

const TOGGLE_OFF = 'data:image/png;base64,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';
const TOGGLE_ON = 'data:image/png;base64,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';
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
        'offset': [5033, 7922]
    },
    {
        'name': '수천삼림_남_0',
        'url': 'https://i.imgur.com/JdnQgjG.png',
        'size': [700, 647, 40],
        'offset': [5078, 8937]
    },
    // {
    //     'name': '아란나라_동_0',
    //     'url': 'https://i.imgur.com/BkbmTpH.png',
    //     'size': [800, 687, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '야스나_유경_남_0',
    //     'url': 'https://i.imgur.com/ckZNZsL.png',
    //     'size': [700, 507, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '차트라캄_동굴_0',
    //     'url': 'https://i.imgur.com/K9iZfPB.png',
    //     'size': [700, 1081, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '다르알시파_0',
    //     'url': 'https://i.imgur.com/3qLdt4p.png',
    //     'size': [700, 828, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '다마반드산_0',
    //     'url': 'https://i.imgur.com/2WHSZFL.png',
    //     'size': [800, 761, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '다섯_오아시스의_생존자_0',
    //     'url': 'https://i.imgur.com/qD1zPv5.png',
    //     'size': [700, 400, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '다흐리_계곡_서_0',
    //     'url': 'https://i.imgur.com/OcLNox6.png',
    //     'size': [700, 856, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '다흐리_계곡_서_1',
    //     'url': 'https://i.imgur.com/28VTfpy.png',
    //     'size': [700, 974, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '도피의_언덕_남서_0',
    //     'url': 'https://i.imgur.com/0GbvGew.png',
    //     'size': [2290, 840, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '부러진_정강이_협곡_0',
    //     'url': 'https://i.imgur.com/SESBHtN.png',
    //     'size': [700, 626, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '세_운하의_땅_0',
    //     'url': 'https://i.imgur.com/LK56eHQ.png',
    //     'size': [800, 637, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '세_운하의_땅_북_0',
    //     'url': 'https://i.imgur.com/iQKgK1j.png',
    //     'size': [600, 621, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '신이_버린_신전_0',
    //     'url': 'https://i.imgur.com/LQqO1Cy.png',
    //     'size': [700, 727, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '신이_버린_신전_북_0',
    //     'url': 'https://i.imgur.com/MmVuqWP.png',
    //     'size': [700, 550, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '신이_버린_신전_북_1',
    //     'url': 'https://i.imgur.com/wbttkgz.png',
    //     'size': [500, 377, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '알_아지프의_모래_0',
    //     'url': 'https://i.imgur.com/qLHMu2T.png',
    //     'size': [700, 760, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '영원의_오아시스_0',
    //     'url': 'https://i.imgur.com/lH0bAk5.png',
    //     'size': [700, 942, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '자갈의_언덕_0',
    //     'url': 'https://i.imgur.com/FTOn4CI.png',
    //     'size': [700, 718, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '자갈의_언덕_1',
    //     'url': 'https://i.imgur.com/5BiYsbf.png',
    //     'size': [700, 1075, 30],
    //     'offset': [4000, 7000]
    // },
    {
        'name': '적왕의_무덤_0',
        'url': 'https://i.imgur.com/4AoJPpC.png',
        'size': [1514, 1579, 60],
        'offset': [2347, 9000]
    },
    {
        'name': '적왕의_무덤_1',
        'url': 'https://i.imgur.com/bbXIMpW.png',
        'size': [700, 1162, 41],
        'offset': [2796, 9333]
    },
    // {
    //     'name': '적왕의_무덤_서_0',
    //     'url': 'https://i.imgur.com/ZrDV2JC.png',
    //     'size': [600, 1398, 30],
    //     'offset': [4000, 7000]
    // },
    // {
    //     'name': '희생_함정_0',
    //     'url': 'https://i.imgur.com/dJhrFfI.png',
    //     'size': [800, 732, 30],
    //     'offset': [4000, 7000]
    // },
];

let IS_UNDERGROUND_ACTIVE = false;
let IS_UNDERGROUND_LAYER_ADDED = false;

function addExtensionStyle() {
    const style = document.createElement('style');
    style.innerHTML = `
    .underground {
        user-select: none;
        display: block;
        position: fixed;
    }
    .underground-switch {
        right: 20px;
        bottom: 70px;
        width: 72px;
        height: 36px;
        background-image: url(${TOGGLE_OFF});
        background-position: 50%;
        background-repeat: no-repeat;
        background-size: 100%;
        cursor: pointer;
    }
    .underground-switch.on {
        background-image: url(${TOGGLE_ON});
    }
    .underground-switch-label {
        right: 20px;
        bottom: 90px;
        width: 72px;
        height: 36px;
        color: #ece5d8;
        text-shadow: -1px 0 #3b4354, 0 1px #3b4354, 1px 0 #3b4354, 0 -1px #3b4354;
        font-size: 18px;
        margin-bottom: 4px;
        padding-left: 8px;
    }
    .underground-layer {
        position: absolute;
        left: 0;
        top: 0;
        transform-origin: 0 0;
        contain: strict;
    }
    .underground-image {
        position: absolute;
        background-size: 100%;
        z-index: 2;
        opacity: 1;
    }
    .underground-image>div {
        width: 100%;
        height: 100%;
        background-position: center;
        background-repeat: no-repeat;
    }
    `;
    document.head.appendChild(style);
}

function addUndergroundSwitch() {
    var template = document.createElement('template');
    template.innerHTML = `
    <div id="undergroundSwitchWrapper" class="pc-only underground">
        <div id="undergroundSwitchLabel" class="underground underground-switch-label">지하 맵</div>
        <div id="undergroundSwitch" class="underground underground-switch"></div>
    </div>`;

    template = template.content.childNodes[1];
    document.body.appendChild(template);
    document.getElementById('undergroundSwitch').addEventListener('click', clickUndergroundSwitch);
}

function clickUndergroundSwitch() {
    var undergroundSwitch = document.getElementById('undergroundSwitch');
    IS_UNDERGROUND_ACTIVE = !IS_UNDERGROUND_ACTIVE;
    IS_UNDERGROUND_ACTIVE ? undergroundSwitch.classList.add('on') : undergroundSwitch.classList.remove('on');

    (IS_UNDERGROUND_ACTIVE && !IS_UNDERGROUND_LAYER_ADDED) ? addUndergroundLayer() : removeUndergroundLayer();
    drawMapsLayer();
}

function addUndergroundLayer() {
    const layer = document.getElementById('mapsLayerBackground');
    const layerScale = MAPS_ViewSize / MAPS_Size;

    var template = document.createElement('template');
    template.innerHTML = `
    <div id="mapsLayerUnderground" class="pc-only underground-layer" style="width: 17920px; height: 17920px; transform: scale(${layerScale});">
    </div>`;
    const undergroundLayer = template.content.childNodes[1];

    UNDERGROUND_IMAGES.forEach((image, index) => {
        var template = document.createElement('template');
        template.innerHTML = `
        <div class="pc-only underground-image" data-index="${index}" style="width: ${image.size[0]}px; height: ${image.size[1]}px; transform: translate(${image.offset[0]}px, ${image.offset[1]}px) scale(1);">
            <div style="background-image: url(${image.url}); background-size: ${image.size[2]}%"></div>
        </div>`;

        template = template.content.childNodes[1];
        undergroundLayer.appendChild(template);
    });
    template = document.createElement('template');
    template.innerHTML = '<div style="background-color: black; opacity: 0.6; width: 100%; height: 100%;"></div>';
    template = template.content.childNodes[0];
    undergroundLayer.appendChild(template);
    layer.after(undergroundLayer);
}

function removeUndergroundLayer() {
    document.getElementById('mapsLayerUnderground').remove();
}

function setUndergroundLayerScale() {
    if (!IS_UNDERGROUND_ACTIVE) return;

    const layerScale = MAPS_ViewSize / MAPS_Size;
    const undergroundLayer = document.getElementById('mapsLayerUnderground');
    undergroundLayer.style.transform = `scale(${layerScale})`;
}

// 
drawMapsLayer = (function (originDrawMapsLayer) {
    'use strict';

    return (boolPanelHide) => {
        originDrawMapsLayer(boolPanelHide);
        setUndergroundLayerScale();
    };

}(drawMapsLayer));

// Main
(function () {
    addExtensionStyle();
    addUndergroundSwitch();
}());
