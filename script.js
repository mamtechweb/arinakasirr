// 1. DATABASE KARYAWAN & BARANG
const users = [
    { username: "arina", pass: "ceoarinapyp", role: "OWNER" },
    { username: "mayasafittri", pass: "mayapyp", role: "KASIR 1" },
    { username: "anggicahyaandini", pass: "anggipyp", role: "KASIR 2" }
];

const products = [
    { id: '1', name: 'Aqua 600ml', price: 3500, code: '8991001' },
    { id: '2', name: 'Le Minerale 600ml', price: 3000, code: '8991002' },
    { id: '3', name: 'Teh Pucuk 350ml', price: 4000, code: '8991003' },
    { id: '4', name: 'Beras Premium 5kg', price: 78000, code: '8991004' },
    { id: '5', name: 'Minyak Goreng 2L', price: 36000, code: '8991005' },
    { id: '6', name: 'Gula Pasir 1kg', price: 18500, code: '8991006' },
    { id: '7', name: 'Indomie Goreng', price: 3100, code: '8991007' },
    { id: '8', name: 'Susu UHT 250ml', price: 6500, code: '8991008' },
    { id: '9', name: 'Rinso Bubuk 800g', price: 24500, code: '8991009' },
    { id: '10', name: 'Telur Ayam 1kg', price: 29000, code: '8991010' },
    { id: '11', name: 'Pocari Sweat 500ml', price: 7500, code: '8991011' },
    { id: '12', name: 'Oreo Original', price: 9500, code: '8991012' },
    { id: '13', name: 'Kopi Kapal Api', price: 15500, code: '8991013' },
    { id: '14', name: 'Pepsodent 190g', price: 17000, code: '8991014' },
    { id: '15', name: 'Sunlight 460ml', price: 11000, code: '8991015' },
    { id: '16', name: 'Lifebuoy Batang', price: 4500, code: '8991016' },
    { id: '17', name: 'Tango Wafer', price: 8500, code: '8991017' },
    { id: '18', name: 'Roma Kelapa', price: 11500, code: '8991018' },
    { id: '19', name: 'Sedaap Mie Soto', price: 3000, code: '8991019' },
    { id: '20', name: 'Terigu 1kg', price: 13500, code: '8991020' },
    { id: '21', name: 'Mentega BlueBand', price: 12000, code: '8991021' },
    { id: '22', name: 'Garam Cap Kapal', price: 3000, code: '8991022' },
    { id: '23', name: 'Kecap Bango', price: 25500, code: '8991023' },
    { id: '24', name: 'Saus ABC Sambal', price: 16000, code: '8991024' },
    { id: '25', name: 'Tisu Paseo 250s', price: 14500, code: '8991025' },
    { id: '26', name: 'Wipol 750ml', price: 21000, code: '8991026' },
    { id: '27', name: 'Shampoo Sunsilk', price: 25000, code: '8991027' },
    { id: '28', name: 'Mama Lemon', price: 14000, code: '8991028' },
    { id: '29', name: 'Silverqueen', price: 16000, code: '8991029' },
    { id: '30', name: 'Pop Mie Bakso', price: 6500, code: '8991030' },
    { id: '31', name: 'Sardines Kaleng', price: 12500, code: '8991031' },
    { id: '32', name: 'Chitato Sapi Pgg', price: 13500, code: '8991032' }
];

let cart = [];
let currentUser = "";

// 2. FUNGSI LOGIN & PASSWORD MATA
function togglePassword() {
    const p = document.getElementById('admin-pass');
    const e = document.getElementById('eye-icon');
    if(p.type === "password") { p.type = "text"; e.innerText = "🙈"; }
    else { p.type = "password"; e.innerText = "👁️"; }
}

function handleLogin() {
    const uInput = document.getElementById('admin-user').value;
    const pInput = document.getElementById('admin-pass').value;
    const found = users.find(x => x.username === uInput && x.pass === pInput);

    if(found) {
        currentUser = found.role;
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('main-dashboard').classList.remove('hidden');
        document.getElementById('user-badge').innerText = currentUser;
        renderCatalog(); initScanner();
    } else { alert("Login Gagal! Cek Username/Sandi."); }
}

// 3. LOGIKA KERANJANG & KATALOG
function renderCatalog() {
    const list = document.getElementById('product-list');
    list.innerHTML = products.map(p => `
        <div class="product-card" onclick="addToCart('${p.id}')">
            <h4 class="font-black text-[11px] uppercase truncate">${p.name}</h4>
            <div class="flex justify-between items-center mt-3">
                <span class="text-orange-600 font-black text-sm">Rp ${p.price.toLocaleString()}</span>
                <span class="text-[7px] text-slate-300 font-bold">${p.code}</span>
            </div>
        </div>
    `).join('');
}

function addToCart(pid) {
    const p = products.find(x => x.id === pid || x.code === pid);
    if(p) {
        const ex = cart.find(i => i.id === p.id);
        if(ex) ex.qty++; else cart.push({...p, qty: 1});
        updateCart();
    }
}

function updateCart() {
    const cont = document.getElementById('cart-items');
    cont.innerHTML = cart.map((i, idx) => `
        <div class="flex justify-between items-center bg-slate-50 p-4 rounded-2xl">
            <div class="text-[11px] font-bold">
                <p class="text-slate-800 uppercase">${i.name}</p>
                <p class="text-orange-500">${i.qty} x Rp ${i.price.toLocaleString()}</p>
            </div>
            <button onclick="cart.splice(${idx},1);updateCart()" class="text-red-400 font-bold text-[9px] hover:text-red-600 uppercase">Batal</button>
        </div>
    `).join('');
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    document.getElementById('total-price').innerText = `Rp ${total.toLocaleString()}`;
    document.getElementById('cart-count').innerText = cart.length;
    calculateChange();
}

function toggleCashInput() {
    const m = document.getElementById('payment-method').value;
    document.getElementById('cash-section').style.display = (m === "Tunai") ? 'block' : 'none';
}

function calculateChange() {
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    const cash = parseFloat(document.getElementById('cash-amount').value) || 0;
    const change = cash - total;
    document.getElementById('change-display').innerText = `Rp ${change < 0 ? 0 : change.toLocaleString()}`;
}

// 4. PROSES CETAK STRUK DI LAMAN BARU
function prosesPembayaran() {
    const total = cart.reduce((s, i) => s + (i.price * i.qty), 0);
    const method = document.getElementById('payment-method').value;
    const cash = parseFloat(document.getElementById('cash-amount').value) || 0;
    
    if(cart.length === 0) return alert("Keranjang Kosong!");
    if(method === "Tunai" && cash < total) return alert("Uang Kurang!");

    const change = (method === "Tunai") ? (cash - total) : 0;
    const date = new Date().toLocaleString('id-ID');

    const receiptHTML = `
        <html>
        <head>
            <title>TOKO ARINA </title>
            <style>
                body { font-family: 'Courier New', monospace; width: 300px; margin: 20px auto; padding: 10px; border: 1px solid #eee; }
                .center { text-align: center; }
                .flex { display: flex; justify-content: space-between; font-size: 13px; margin: 5px 0; }
                .line { border-bottom: 1px dashed black; margin: 10px 0; }
                .btn-print { background: #FF5F00; color: white; border: none; padding: 10px; width: 100%; font-weight: bold; cursor: pointer; margin-bottom: 20px; }
                @media print { .no-print { display: none; } }
            </style>
        </head>
       <body>
        <button class="btn-print no-print" onclick="window.print()">🖨️ CETAK SEKARANG</button>
        
        <div class="center">
            <h3 style="margin:0; font-size: 18px;">TOKO ARINA</h3>
            <p style="font-size:11px; margin:0;">JL. Merpati GG V Pamolokan</p>
            <p style="font-size:11px; margin:0;">Sumenep, Jawa Timur</p>
            <div class="line"></div>
        </div>

        ${cart.map(i => `
            <div class="flex">
                <span>${i.name} x${i.qty}</span>
                <span>${(i.qty * i.price).toLocaleString()}</span>
            </div>
        `).join('')}
        
        <div class="line"></div>
        
        <div class="flex" style="font-weight:bold; font-size:16px;">
            <span>TOTAL</span>
            <span>Rp ${total.toLocaleString()}</span>
        </div>
        
        <div class="flex" style="font-size:11px;">
            <span>METODE</span>
            <span>${method}</span>
        </div>

        ${method === "Tunai" ? `
            <div class="flex" style="font-size:11px;"><span>BAYAR</span><span>Rp ${cash.toLocaleString()}</span></div>
            <div class="flex" style="font-weight:bold;"><span>KEMBALI</span><span>Rp ${change.toLocaleString()}</span></div>
        ` : `<p style="text-align:right; font-weight:bold; margin: 5px 0;">LUNAS (NON-TUNAI)</p>`}
        
        <div class="line"></div>
        
        <div class="center" style="font-size: 11px; line-height: 1.5;">
            <p style="margin: 5px 0; font-weight: bold; font-size: 12px;">✨ TERIMA KASIH ✨</p>
            <p style="margin: 0;">Terima kasih sudah berbelanja!</p>
            <p style="margin: 0;">Barang yang sudah dibeli tidak dapat</p>
            <p style="margin: 0;">ditukar atau dikembalikan.</p>
            
            <div style="margin-top: 10px;">
                <p style="margin: 0;">KASIR: ${currentUser}</p>
                <p style="margin: 0;">${date}</p>
            </div>
            
            <p style="margin-top: 10px; font-weight: bold;">SEMOGA HARI ANDA MENYENANGKAN</p>
            <p style="font-style: italic; font-size: 9px; margin-top: 5px; color: #888;">Toko Arina v3.0</p>
        </div>
    </body>
        </html>
    `;

    const win = window.open('', '_blank', 'width=400,height=600');
    win.document.write(receiptHTML);
    win.document.close();

    cart = []; updateCart();
    document.getElementById('cash-amount').value = '';
}

function initScanner() {
    const scanner = new Html5QrcodeScanner("reader", { fps: 10, qrbox: 250 });
    scanner.render((text) => addToCart(text));
}

function searchProduct() {
    const q = document.getElementById('search-input').value.toLowerCase();
    const cards = document.querySelectorAll('.product-card');
    products.forEach((p, i) => cards[i].style.display = p.name.toLowerCase().includes(q) ? 'block' : 'none');
}

setInterval(() => { document.getElementById('live-clock').innerText = new Date().toLocaleString(); }, 1000);
