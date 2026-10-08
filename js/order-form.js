document.addEventListener('DOMContentLoaded', function () {

	const rows = document.querySelectorAll('#order-items .order-row');
	const totalInput = document.getElementById('total_price');
	const totalRaw = document.querySelector('input[name="total_price_raw"]');
  
	const labelFields = [
	  document.querySelector('input[name="product_label"]'),
	  document.querySelector('input[name="product_label02"]'),
	  document.querySelector('input[name="product_label03"]'),
	  document.querySelector('input[name="product_label04"]'),
	  document.querySelector('input[name="product_label05"]'),
	];
  
	const qtyFields = [
	  document.querySelector('select[name="quantity"]'),
	  document.querySelector('select[name="quantity02"]'),
	  document.querySelector('select[name="quantity03"]'),
	  document.querySelector('select[name="quantity04"]'),
	  document.querySelector('select[name="quantity05"]'),
	];
  
	// =========================
	// 1) ẨN HẾT, CHỈ HIỆN DÒNG 1
	// =========================
	rows.forEach((row, idx) => {
	  if (idx === 0) {
		row.style.display = 'grid';
	  } else {
		row.style.display = 'none';
	  }
	});
  
	// =========================
	// 2) KHÔI PHỤC ROW KHI BACK (CF7 MULTISTEP)
	// =========================
	function restoreRowsFromCF7() {
	  let anyVisible = false;
  
	  rows.forEach((row, idx) => {
		const productSelect = row.querySelector('.product-select');
		const qtySelect = row.querySelector('.qty-select');
  
		const hasProduct = productSelect && productSelect.value && productSelect.value !== '';
		const hasQty = qtySelect && qtySelect.value && qtySelect.value !== '';
  
		if (hasProduct || hasQty) {
		  row.style.display = 'grid';
		  anyVisible = true;
		} else {
		  row.style.display = 'none';
		}
	  });
  
	  if (!anyVisible && rows[0]) {
		rows[0].style.display = 'grid';
	  }
	}
  
	// =========================
	// 3) NÚT THÊM DÒNG
	// =========================
	const addBtn = document.querySelector('.js-add-row');
	function updateAddButton() {
	if (!addBtn) return;
		const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none').length;
		if (visibleRows >= rows.length) {
			addBtn.style.display = 'none'; // ẩn nút khi đủ dòng
		} else {
			addBtn.style.display = 'flex'; // hiện lại nếu chưa đủ
		}
	}
	if (addBtn) {
		addBtn.addEventListener('click', function () {
			for (let i = 0; i < rows.length; i++) {
			if (rows[i].style.display === 'none') {
				rows[i].style.display = 'grid';
				break;
			}
			}
			updateAddButton(); // check sau khi thêm
		});
	}
  
	// =========================
	// 4) NÚT XOÁ DÒNG
	// =========================
	document.querySelectorAll('.js-remove-row').forEach(btn => {
		btn.addEventListener('click', function () {
		  const row = this.closest('.order-row');
		  if (!row) return;
	  
		  row.querySelectorAll('select').forEach(sel => sel.selectedIndex = 0);
		  row.style.display = 'none';
	  
		  calcTotal();
		  updateAddButton(); // check nút thêm sau khi xóa
		});
	});
  
	// =========================
	// 5) LẮNG NGHE THAY ĐỔI
	// =========================
	document.querySelectorAll('.product-select, .qty-select').forEach(el => {
	  el.addEventListener('change', calcTotal);
	});
  
	// =========================
	// 6) TÍNH TỔNG + SYNC LABEL
	// =========================
	function calcTotal() {
	  let total = 0;
  
	  // reset hidden label
	  labelFields.forEach(f => { if (f) f.value = ''; });
  
	  rows.forEach((row, idx) => {
		if (row.style.display === 'none') return;
  
		const productSelect = row.querySelector('.product-select');
		const qtySelect = row.querySelector('.qty-select');
  
		if (!productSelect || !qtySelect) return;
  
		const opt = productSelect.options[productSelect.selectedIndex];
		const qty = parseInt(qtySelect.value || 0, 10);
  
		if (!opt || !qty) return;
  
		const price = parseInt(opt.getAttribute('data-price') || 0, 10);
		const name = opt.textContent.trim();
  
		total += price * qty;
  
		if (labelFields[idx]) {
		  labelFields[idx].value = name;
		}
	  });
  
	  if (totalInput) totalInput.value = '¥'+total.toLocaleString('en-US');
	  if (totalRaw) totalRaw.value = '¥'+total.toLocaleString('en-US');
	}
  
	// --- 5) Trang confirm: xoá dòng rác ---
	if (document.querySelector('.is-confirm')) {
	  document.querySelectorAll('.checkout-box__desc').forEach(desc => {
		const lines = desc.innerHTML.split('<br>');
		const cleaned = lines.filter(line => {
		  const text = line.replace(/<[^>]*>/g, '').trim();
		  if (!text) return false;
		  if (text === 'x' || text === '-注文数量:') return false;
		  if (/^x\s*/.test(text)) return false;
		  return true;
		});
		desc.innerHTML = cleaned.join('<br>');
	  });
	}
  // =========================
  // 8) INIT
  // =========================
  restoreRowsFromCF7();
  calcTotal();

  // ⚠️ QUAN TRỌNG: CF7 restore value sau DOM load → phải chạy lại
  setTimeout(function () {
    restoreRowsFromCF7();
    calcTotal();
  }, 300);

});

//js add selected từ trang single-item sang trang form order
document.addEventListener('DOMContentLoaded', function () {
	function getParam(name) {
	  const params = new URLSearchParams(window.location.search);
	  return params.get(name);
	}
  
	const productNameFromUrl = getParam('product_name');
	if (!productNameFromUrl) return;
  
	const decodedName = decodeURIComponent(productNameFromUrl).trim();
  
	// Lấy select đầu tiên (product_name)
	const firstSelect = document.querySelector('#order-items .order-row .product-select');
	if (!firstSelect) return;
  
	let found = false;
  
	Array.from(firstSelect.options).forEach(opt => {
	  if (opt.textContent.trim() === decodedName) {
		firstSelect.value = opt.value;
		found = true;
	  }
	});
  
	if (found) {
	  // Nếu có qty select thì set mặc định = 1
	  const firstRow = firstSelect.closest('.order-row');
	  const qtySelect = firstRow ? firstRow.querySelector('.qty-select') : null;
	  if (qtySelect && (!qtySelect.value || qtySelect.value === '')) {
		qtySelect.value = '1';
	  }
  
	  // Hiện row đầu tiên
	  firstRow.style.display = 'grid';
  
	  // Gọi lại hàm tính tổng nếu có
	  if (typeof calcTotal === 'function') {
		calcTotal();
	  }
	}
  
  });