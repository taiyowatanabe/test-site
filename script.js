// DOM要素の取得
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const reservationForm = document.querySelector('.reservation-form');

// ハンバーガーメニューの切り替え
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ナビゲーションメニューのリンクをクリックした時にハンバーガーメニューを閉じる
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// タブ切り替え機能
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // アクティブクラスを削除
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // クリックされたボタンと対応するコンテンツにアクティブクラスを追加
        button.classList.add('active');
        const targetTab = button.getAttribute('data-tab');
        document.getElementById(targetTab).classList.add('active');
    });
});

// スムーススクロール
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // ナビゲーションバーの高さを考慮
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ナビゲーションバーの背景変更（スクロール時）
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
    }
});

// 予約フォームの処理
if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // フォームデータの取得
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        
        // バリデーション
        if (!data.name || !data.phone || !data.date || !data.time || !data.guests) {
            alert('必須項目を入力してください。');
            return;
        }
        
        // 予約確認メッセージ
        const message = `
予約を受け付けました。

【予約内容】
お名前: ${data.name}
電話番号: ${data.phone}
メールアドレス: ${data.email || '未入力'}
来店日: ${data.date}
来店時間: ${data.time}
人数: ${data.guests}名様
ご要望: ${data.message || '特になし'}

ご予約ありがとうございます。
当日お待ちしております。
        `;
        
        alert(message);
        
        // フォームをリセット
        this.reset();
    });
}

// 日付の最小値を今日に設定
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
}

// アニメーション効果（Intersection Observer）
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// アニメーション対象要素の設定
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.menu-item, .info-item, .staff-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// メニューアイテムのホバー効果
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0) scale(1)';
    });
});

// 電話番号の自動フォーマット
const phoneInput = document.getElementById('phone');
if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = value;
            } else if (value.length <= 7) {
                value = value.slice(0, 3) + '-' + value.slice(3);
            } else {
                value = value.slice(0, 3) + '-' + value.slice(3, 7) + '-' + value.slice(7, 11);
            }
        }
        e.target.value = value;
    });
}

// ローディングアニメーション
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ページ読み込み時の初期設定
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    // 少し遅延させてから表示
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
}); 