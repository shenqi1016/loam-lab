// --- LOAMLAB CORE SCRIPT v3.0 ---
// Global Calculator State
const calcState = {
    planKey: 'hybrid',
    qty: 1,
    selectedAddons: new Set()
};

// Pricing Data
const PLANS = {
    'poc': { name: 'POC 概念驗證', price: 590, desc: '快速生成，適合提案' },
    'hybrid': { name: 'Hybrid 商業競圖', price: 2490, desc: 'AI + 人工精修，最高CP值' },
    'human': { name: '純人工渲染', price: 3990, desc: '極致細節，國際競圖規格' }
};

const ADDONS = {
    'rush': { name: '24h 急件處理', price: 1500 },
    'model': { name: 'SketchUp 建模服務', price: 2000 },
    'source': { name: '購買原始檔 (Source)', price: 3000 }
};

// --- GLOBAL HELPER FUNCTIONS (Exposed to Window) ---

window.formatCurrency = (num) => {
    return new Intl.NumberFormat('zh-TW', { style: 'currency', currency: 'TWD', minimumFractionDigits: 0 }).format(num);
};

window.calculateTotal = () => {
    const base = PLANS[calcState.planKey].price * calcState.qty;
    let addonTotal = 0;
    calcState.selectedAddons.forEach(key => addonTotal += ADDONS[key].price);
    return base + addonTotal;
};

// Step 1: Configuration UI
window.renderStep1 = () => {
    const modalOverlay = document.getElementById('modal-overlay');
    if (!modalOverlay) return;

    const plan = PLANS[calcState.planKey];

    modalOverlay.innerHTML = `
        <div class="calc-modal">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <div class="calc-header">
                <div class="calc-step-badge">STEP 1/3</div>
                <h2>配置您的方案</h2>
                <p>${plan.name} - ${plan.desc}</p>
            </div>

            <div class="calc-body">
                <!-- Quantity -->
                <div class="calc-group">
                    <label>張數 / 視角數量</label>
                    <div class="qty-control">
                        <button onclick="updateQty(-1)">-</button>
                        <span id="qty-display">${calcState.qty}</span>
                        <button onclick="updateQty(1)">+</button>
                    </div>
                </div>

                <!-- Add-ons -->
                <div class="calc-group">
                    <label>加值服務</label>
                    <div class="addon-list">
                        ${Object.keys(ADDONS).map(key => `
                            <div class="addon-item ${calcState.selectedAddons.has(key) ? 'selected' : ''}" 
                                 onclick="toggleAddon('${key}')">
                                <div class="addon-info">
                                    <span class="addon-name">${ADDONS[key].name}</span>
                                    <span class="addon-price">+NT$${ADDONS[key].price}</span>
                                </div>
                                <div class="addon-check"></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="calc-footer">
                <div class="total-price">
                    <small>預估總價</small>
                    <span id="total-display">${window.formatCurrency(window.calculateTotal())}</span>
                </div>
                <button class="btn-primary" onclick="renderStep2()">下一步：確認訂單 &rarr;</button>
            </div>
        </div>
    `;
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
};

// Step 2: Review UI
window.renderStep2 = () => {
    const modalOverlay = document.getElementById('modal-overlay');
    const plan = PLANS[calcState.planKey];
    const total = window.calculateTotal();

    let addonHtml = '';
    calcState.selectedAddons.forEach(key => {
        addonHtml += `<div class="invoice-row"><span>${ADDONS[key].name}</span><span>NT$${ADDONS[key].price}</span></div>`;
    });

    modalOverlay.innerHTML = `
        <div class="calc-modal">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <div class="calc-header">
                <div class="calc-step-badge">STEP 2/3</div>
                <h2>確認訂單明細</h2>
                <p>請確認您的需求無誤</p>
            </div>

            <div class="invoice-box">
                <div class="invoice-row main">
                    <span>${plan.name} x ${calcState.qty}</span>
                    <span>NT$${plan.price * calcState.qty}</span>
                </div>
                ${addonHtml}
                <div class="invoice-divider"></div>
                <div class="invoice-row total">
                    <span>TOTAL</span>
                    <span>${window.formatCurrency(total)}</span>
                </div>
            </div>
            
            <div class="payment-note">
                <p>📢 點擊下方按鈕將前往付款頁面或產生匯款帳號。</p>
                <p>訂金比例：60% (NT$${Math.round(total * 0.6)})</p>
            </div>

            <div class="calc-footer">
                <button class="btn-secondary" onclick="renderStep1()">&larr; 返回修改</button>
                <button class="btn-primary" onclick="renderStep3()">前往結帳 Pay &rarr;</button>
            </div>
        </div>
    `;
};

// Step 3: Success UI
window.renderStep3 = () => {
    const modalOverlay = document.getElementById('modal-overlay');
    modalOverlay.innerHTML = `
        <div class="calc-modal centered">
            <button class="modal-close" onclick="closeModal()">&times;</button>
            <div class="success-icon">🎉</div>
            <h2>訂單已建立！</h2>
            <p>Order #LM${Math.floor(Math.random() * 10000)}</p>
            
            <div class="bank-info">
                <strong>模擬匯款帳號 (Bank Transfer)</strong><br>
                玉山銀行 (808) <br>
                帳號：0059-123-456789<br>
                戶名：土窟設計工作室
            </div>
            
            <p style="color:#aaa; font-size:14px; margin-top:20px;">
                系統已發送確認信至您的信箱。<br>
                請上傳匯款證明至後台，我們將即刻動工。
            </p>

            <button class="btn-primary" style="margin-top:20px; width:100%;" onclick="closeModal()">
                進入客戶專區 (Client Portal)
            </button>
        </div>
    `;
};

// Logic Controllers
window.openQuoteModal = (planKey) => {
    calcState.planKey = planKey || 'hybrid';
    calcState.qty = 1;
    calcState.selectedAddons.clear();
    window.renderStep1();
};

window.updateQty = (delta) => {
    calcState.qty = Math.max(1, calcState.qty + delta);
    window.renderStep1();
};

window.toggleAddon = (key) => {
    if (calcState.selectedAddons.has(key)) {
        calcState.selectedAddons.delete(key);
    } else {
        calcState.selectedAddons.add(key);
    }
    window.renderStep1();
};

// Master Function called by Buttons
window.selectPlan = (planName) => {
    console.log('Selecting Plan:', planName);
    let key = 'hybrid';
    if (planName.includes('POC')) key = 'poc';
    if (planName.includes('人工')) key = 'human';
    window.openQuoteModal(key);
};

// General Modal Close
window.closeModal = function () {
    const modalOverlay = document.getElementById('modal-overlay');
    if (modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
        setTimeout(() => { modalOverlay.innerHTML = ''; }, 500);
    }
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {

    // Inject Styles for Calculator
    const style = document.createElement('style');
    style.innerHTML = `
        .calc-modal {
            background: linear-gradient(135deg, #111, #0a0a0a);
            border: 1px solid #333;
            border-radius: 12px;
            width: 90%;
            max-width: 500px;
            padding: 30px;
            color: #fff;
            position: relative;
            box-shadow: 0 20px 50px rgba(0,0,0,0.8);
            margin: 50px auto; /* Centered visually */
            animation: slide-up-fade 0.3s ease-out;
        }
        .calc-header { margin-bottom: 25px; border-bottom: 1px solid #222; padding-bottom: 20px; }
        .calc-step-badge { font-size: 10px; color: var(--accent-color); letter-spacing: 1px; margin-bottom: 5px; }
        .calc-group { margin-bottom: 25px; }
        
        .qty-control { display: flex; align-items: center; gap: 15px; background: #222; padding: 5px; border-radius: 5px; width: fit-content; }
        .qty-control button { width: 30px; height: 30px; background: #444; border: none; color:#fff; border-radius: 4px; cursor: pointer; }
        .qty-control button:hover { background: #666; }
        #qty-display { min-width: 30px; text-align: center; font-weight: bold; }

        .addon-item { display: flex; justify-content: space-between; align-items: center; padding: 15px; background: rgba(255,255,255,0.03); border: 1px solid #333; margin-bottom: 10px; cursor: pointer; border-radius: 6px; transition: all 0.2s; }
        .addon-item:hover { border-color: #666; }
        .addon-item.selected { border-color: var(--accent-color); background: rgba(255,0,0,0.05); }
        .addon-check { width: 20px; height: 20px; border: 2px solid #555; border-radius: 50%; }
        .addon-item.selected .addon-check { background: var(--accent-color); border-color: var(--accent-color); }
        
        .calc-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #222; }
        .total-price span { font-size: 24px; font-weight: bold; color: #fff; }

        .invoice-box { background: #fff; color: #000; padding: 20px; border-radius: 4px; font-family: monospace; }
        .invoice-row { display: flex; justify-content: space-between; margin-bottom: 10px; font-size: 14px; }
        .invoice-row.main { font-weight: bold; font-size: 16px; border-bottom: 1px dashed #ccc; padding-bottom: 10px; }
        .invoice-row.total { font-size: 20px; font-weight: 800; border-top: 2px solid #000; padding-top: 10px; margin-top: 10px; }
        .bank-info { background: #222; padding: 20px; border-radius: 8px; margin-top: 20px; font-family: monospace; color: #ddd; line-height: 1.6; }
        .centered { text-align: center; }
        .success-icon { font-size: 60px; margin-bottom: 20px; }
    `;
    document.head.appendChild(style);

    // Initial log
    console.log('LoamLab v3.0 Loaded - Calculator Ready');
});
