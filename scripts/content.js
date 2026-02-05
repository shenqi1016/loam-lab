// =================================================================
// LOAMLAB CONTENT CONFIGURATION
// 土窟設計 - 網站內容設定檔
// =================================================================
// 說明：在此檔案中修改文字與圖片連結，網頁會自動更新。
// 圖片建議尺寸：
// - 列表縮圖 (image): 800x600 (4:3)
// - 階段圖片 (stages): 600x400 或更大
// =================================================================

const portfolioData = [
    {
        id: "project-01", // 唯一識別碼 (英文)
        title: "迴夢劇場",
        category: "Residential / Taipei",
        // 列表顯示的主圖 (請將圖片放入 images 資料夾，例如 'images/project1-main.jpg')
        image: "https://placehold.co/800x600/0a0a0a/fff?text=Dream+Theater",
        desc: "將老宅的樑柱視為骨骼，在沈睡的結構中植入新的展演。",

        // 點擊後開啟的三階段內容
        stages: {
            raw: {
                text: "捕捉條件：40年老屋，漏水嚴重，但保留了極美的檜木斜屋頂結構。",
                img: "https://placehold.co/800x600/1a1a1a/444?text=Raw+Condition"
            },
            process: {
                text: "孕育過程：透過結構補強，將生活動線重新編排，讓光線成為新的隔間。",
                img: "https://placehold.co/800x600/1a1a1a/444?text=Design+Process"
            },
            final: {
                text: "呼吸瞬間：當清晨第一道光打在修復後的木樑上，空間甦醒了。",
                img: "https://placehold.co/800x600/1a1a1a/fff?text=Final+Breath"
            }
        }
    },
    {
        id: "project-02",
        title: "毛胚呼吸",
        category: "Office / Taichung",
        image: "https://placehold.co/800x600/0a0a0a/fff?text=Rough+Breath",
        desc: "保留混凝土的粗糙肌理，讓辦公空間在不修飾中找到平靜。",
        stages: {
            raw: { text: "捕捉條件：全新毛胚商辦，冰冷、空洞、回音巨大。", img: "https://placehold.co/800x600/1a1a1a/444?text=Raw+Concrete" },
            process: { text: "孕育過程：不封天花板，僅用線性燈光引導氣流與視線。", img: "https://placehold.co/800x600/1a1a1a/444?text=Lighting+Plan" },
            final: { text: "呼吸瞬間：員工說，在這裡工作像是在洞穴裡冥想。", img: "https://placehold.co/800x600/1a1a1a/fff?text=Cave+Office" }
        }
    },
    {
        id: "project-03",
        title: "光影實驗",
        category: "Showroom / Tainan",
        image: "https://placehold.co/800x600/0a0a0a/fff?text=Light+Experiment",
        desc: "系統櫃不只是收納，更是攔截光線的容器。",
        stages: {
            raw: { text: "捕捉條件：長型街屋，採光僅來自單面。", img: "https://placehold.co/800x600/1a1a1a/444?text=Dark+Tunnel" },
            process: { text: "孕育過程：利用半透材質與鏡面反射，將光線接力傳遞至深處。", img: "https://placehold.co/800x600/1a1a1a/444?text=Mirror+Study" },
            final: { text: "呼吸瞬間：櫃體消失了，只剩下漂浮的光。", img: "https://placehold.co/800x600/1a1a1a/fff?text=Floating+Light" }
        }
    },
    {
        id: "project-04",
        title: "記憶縫隙",
        category: "Commercial / Kaohsiung",
        image: "https://placehold.co/800x600/0a0a0a/fff?text=Memory+Gap",
        desc: "商業空間的過道，是城市記憶暫存的百葉窗。",
        stages: {
            raw: { text: "捕捉條件：夾在兩棟高樓間的狹長店面。", img: "https://placehold.co/800x600/1a1a1a/444?text=Narrow+Alley" },
            process: { text: "孕育過程：將牆面內縮，創造出一條讓人願意停留的'縫隙'。", img: "https://placehold.co/800x600/1a1a1a/444?text=Gap+Design" },
            final: { text: "呼吸瞬間：行人駐足，不再只是匆匆路過。", img: "https://placehold.co/800x600/1a1a1a/fff?text=Urban+Pause" }
        }
    },
    {
        id: "project-05",
        title: "植光寓所",
        category: "Residential / Hsinchu",
        image: "https://placehold.co/800x600/0a0a0a/fff?text=Plant+House",
        desc: "讓植物成為房子的主人，人只是借住的客。",
        stages: {
            raw: { text: "捕捉條件：被鐵窗封死的舊公寓陽台。", img: "https://placehold.co/800x600/1a1a1a/444?text=Cage+Balcony" },
            process: { text: "孕育過程：退縮室內界線，將陽台擴大為溫室。", img: "https://placehold.co/800x600/1a1a1a/444?text=Greenhouse+Plan" },
            final: { text: "呼吸瞬間：風穿過樹葉的聲音，是最好的白噪音。", img: "https://placehold.co/800x600/1a1a1a/fff?text=Living+with+Green" }
        }
    },
    {
        id: "project-06",
        title: "靜謐茶屋",
        category: "Commercial / Yilan",
        image: "https://placehold.co/800x600/0a0a0a/fff?text=Quiet+Tea",
        desc: "在嘈雜的觀光夜市旁，鑿出一口安靜的井。",
        stages: {
            raw: { text: "捕捉條件：緊鄰夜市的透天厝，噪音與氣味干擾嚴重。", img: "https://placehold.co/800x600/1a1a1a/444?text=Noisy+Street" },
            process: { text: "孕育過程：利用內庭院與以土牆隔絕外部，創造內向風景。", img: "https://placehold.co/800x600/1a1a1a/444?text=Inner+Court" },
            final: { text: "呼吸瞬間：只聞茶香，不聞車聲。", img: "https://placehold.co/800x600/1a1a1a/fff?text=Tea+Silence" }
        }
    }
];
