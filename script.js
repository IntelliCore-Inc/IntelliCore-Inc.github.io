// ===== 导航栏滚动效果 =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== 导航栏APP链接点击 =====
const navAppLink = document.querySelector('.nav-app-link');
if (navAppLink) {
    navAppLink.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        // 直接滚动到Victo APP独立区域
        const appSection = document.getElementById('victo-app');
        if (appSection) {
            const headerOffset = 60;
            const elementPosition = appSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
}

// ===== 功能标签切换 =====
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const tabId = this.getAttribute('data-tab');

        // 移除所有active类
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // 添加active类到当前点击的标签和对应的内容
        this.classList.add('active');
        const targetPane = document.getElementById(tabId);
        if (targetPane) {
            targetPane.classList.add('active');
        }
    });
});

// ===== FAQ手风琴效果 =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        // 关闭所有FAQ项
        faqItems.forEach(f => f.classList.remove('active'));

        // 如果当前项不是active，则打开它
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== 平滑滚动到锚点 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        // 跳过下载按钮的点击
        if (this.classList.contains('download-btn')) {
            return;
        }

        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 60;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 下载按钮点击效果 =====
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (this.classList.contains('ios')) {
            alert('iOS版即将上线！\n\n敬请期待App Store上架。');
        } else if (this.classList.contains('android')) {
            alert('Android版即将上线！\n\n敬请期待Google Play上架。');
        }
    });
});

// ===== 滚动时元素进入视口动画 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 为所有section添加动画
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// 为卡片元素添加动画
document.querySelectorAll('.feature-card, .module-card, .compare-card, .buy-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ===== 购买按钮点击效果 =====
document.querySelectorAll('.buy-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        if (this.textContent.trim() === '联系客服') {
            alert('客服联系方式：\n电话：400-888-8888\n微信：huiji_service\n邮箱：service@huiji.com');
        } else {
            alert('感谢您的购买！\n\n即将跳转到支付页面...');
        }
    });
});

// ===== 页面加载动画 =====
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ===== 数字动画效果 =====
function animateNumber(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// 当价格区域进入视口时触发数字动画
const priceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const priceNumbers = entry.target.querySelectorAll('.price-number');
            priceNumbers.forEach(num => {
                const value = parseInt(num.textContent.replace(/[^0-9]/g, ''));
                if (value && !num.dataset.animated) {
                    num.dataset.animated = 'true';
                    // 暂时不执行数字动画，保持静态价格显示
                }
            });
            priceObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const buySection = document.getElementById('buy');
if (buySection) {
    priceObserver.observe(buySection);
}

// ===== 回到顶部按钮 =====
const backToTop = document.createElement('button');
backToTop.className = 'back-to-top';
backToTop.innerHTML = '↑';
document.body.appendChild(backToTop);

backToTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

// ===== 触摸设备优化 =====
if ('ontouchstart' in window) {
    document.querySelectorAll('.feature-card, .module-card, .compare-card, .buy-card, .faq-item').forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transition = 'none';
        });
        card.addEventListener('touchend', function() {
            this.style.transition = '';
        });
    });
}

console.log('Swing Core智能网球训练系统 - 产品页面已加载');
console.log('版本: 1.0.0');
console.log('© 2025 龙芯智造（上海）科技有限公司. 保留所有权利.');
