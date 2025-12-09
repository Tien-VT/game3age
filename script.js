// ---------- Ẩn tất cả bước ----------
document.querySelectorAll(".quiz-step").forEach(s => s.style.display = "none");
showStep(1);

function showStep(n) {
    document.querySelectorAll(".quiz-step").forEach(s => s.style.display = "none");
    document.getElementById("step" + n)?.style.setProperty("display", "block");
}

// ==================== PHẦN 1 & 2: ĐẾM TÁO ====================
const correctAnswers = {
    1: 4,
    2: 3
};

function checkCount(step, answer) {
    const result = document.getElementById("result" + step);

    if (answer === correctAnswers[step]) {
        result.innerHTML = "🎉 Chính xác!";
        result.style.color = "green";

        setTimeout(() => {
            showStep(step + 1);
        }, 800);

    } else {
        result.innerHTML = "Sai rồi 😢 Con thử lại nhé!";
        result.style.color = "red";
    }
}

// ==================== PHẦN 3: KÉO THẢ ====================
const items = document.querySelectorAll(".drag-item");
const baskets = document.querySelectorAll(".basket");
const result3 = document.getElementById("result3");

let correctDrops = 0;  // Đếm số giỏ được thả đúng

items.forEach(item => {
    item.addEventListener("dragstart", e => {
        e.dataTransfer.setData("num", item.dataset.num);
        e.dataTransfer.setData("src", item.src);
    });
});

baskets.forEach(basket => {
    basket.addEventListener("dragover", e => e.preventDefault());

    basket.addEventListener("drop", e => {
        const itemNum = e.dataTransfer.getData("num");
        const imgSrc = e.dataTransfer.getData("src");
        const accept = basket.dataset.accept;

        if (basket.classList.contains("filled")) {
            result3.innerHTML = "Giỏ này có rồi, con thả giỏ khác nhé!";
            result3.style.color = "orange";
            return;
        }

        if (itemNum === accept) {
            basket.innerHTML = `<img src="${imgSrc}" class="in-basket">`;
            basket.classList.add("filled");
            correctDrops++;

            // ⭐ ẨN HÌNH GỐC SAU KHI KÉO VÀO GIỎ
            const originalItem = document.querySelector(`.drag-item[data-num="${itemNum}"]`);
            if (originalItem) originalItem.style.visibility = "hidden";

            result3.innerHTML = "Con giỏi quá! ✔";
            result3.style.color = "green";

            // Nếu cả 3 giỏ đều đúng → hoàn thành
            if (correctDrops === 3) {
                setTimeout(() => {
                    document.getElementById("finish").style.display = "block";
                }, 700);
            }
        }
    });
});