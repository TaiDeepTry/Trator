let lists = document.querySelector(".list-cars");
const carList = document.getElementById("carList");
const listCar = JSON.parse(localStorage.getItem("carList")) || [
  {
    id: 1,
    image: "Leonardo_Diffusion_Lamborghini_Aventador_chrome_front_bumber_l_0 (1).jpg",
    name: "Lamborghini Aventador LP 780-4 Ultimae",
    price: "600,000"
  },
  {
    id: 2,
    image: "Leonardo_Diffusion_Lamborghini_Huracn_chrome_front_bumber_lig_0.jpg",
    name: "Lamborghini Huracán EVO",
    price: "261,274"
  },
  {
    id: 3,
    image: "Leonardo_Diffusion_Lamborghini_Urus_chrome_front_bumber_light_0.jpg",
    name: "Lamborghini Urus",
    price: "218,009"
  },
  {
    id: 4,
    image: "Leonardo_Diffusion_Lamborghini_Sian_FKP_37_chrome_front_bumbe_0.jpg",
    name: "Lamborghini Sian FKP 37",
    price: "3,6 000 000 "
  },
  {
    id: 5,
    image: "Leonardo_Diffusion_Lamborghini_Aventador_SVJ_chrome_front_bum_0.jpg",
    name: "Lamborghini Aventador SVJ",
    price: "517,700"
  },
  {
    id: 6,
    image: "Leonardo_Diffusion_Lamborghini_Huracn_Performante_chrome_fron_0.jpg",
    name: "Lamborghini Huracán Performante",
    price: "274,390"
  },
  {
    id: 7,
    image: "Leonardo_Diffusion_LAMBORGHINI_CENTENARIO_chrome_front_bumber_0.jpg",
    name: "Lamborghini Centenario",
    price: "22 000 000 "
  },
  {
    id: 8,
    image: "Leonardo_Diffusion_Lamborghini_Veneno_chrome_front_bumber_ligh_0.jpg",
    name: "Lamborghini Veneno",
    price: "45 000 000"
  },
  {
    id: 9,
    image: "Leonardo_Diffusion_Lamborghini_Diablo_chrome_front_bumber_ligh_0.jpg",
    name: "Lamborghini Diablo",
    price: "300 000"
  },
  {
    id: 10,
    image: "Leonardo_Diffusion_Lamborghini_Diablo_chrome_bumber_lightning_0.jpg",
    name: "Lamborghini Gallardo",
    price: "250 000"
  }
];


function load_item() {
  let id = 1; // Giá trị id ban đầu
  listCar.forEach(value => {
    let newDiv = document.createElement('a');
    newDiv.classList.add('col-md-4', 'pb-3');
    newDiv.href = `product.html?id=${id}`
    newDiv.innerHTML = `
        <div class="gallery_box">
          <div class="gallery_img"><img src="images/galery/${value.image}"></div>
          <h3 class="types_text product-title">${value.name}</h3>
          <p class="looking_text">Đặt trước chỉ từ $${value.price}</p>


          <div class="read_bt">
          <a href="javascript:void(0);" onclick="addToCart(${id})">Thêm vào giỏ hàng</a>
        </div>
        <div class="read_bt">
          <a href="product.html?id=${id}">Mua ngay</a>
        </div>
          
        </div>
      `;
    lists.appendChild(newDiv);
    id++; // Tăng giá trị id sau khi sử dụng
  });
}
load_item();

let cart = document.querySelector(".addtocart");
let cart_here = document.querySelector(".list-item");
let body = document.querySelector("body");
function active_cart() {
  if (!cart_here.classList.contains("active")) {
    cart_here.classList.add("active");
    // body.classList.add("translatex");
  }
}
function close_cart() {
  if (cart_here.classList.contains("active")) {
    cart_here.classList.remove("active");
    // body.classList.remove("translatex");
  }
}
function displayAlert(message) {
  // Lấy tham chiếu đến phần tử .alert
  const alertElement = document.querySelector(".alert");

  // Đặt nội dung thông báo
  const alertMessageElement = document.getElementById("alert");
  alertMessageElement.textContent = message;

  // Thêm class "active" để hiển thị thông báo
  alertElement.classList.add("active");

  // Tự động loại bỏ class "active" sau 2 giây
  setTimeout(() => {
    alertElement.classList.remove("active");
  }, 2000);
}
let added_card = [];

function addToCart(productId) {
  // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
  const existingProduct = added_card.find((item) => item.id === productId);

  if (!existingProduct) {
    // Tìm sản phẩm từ mảng listCar bằng cách dựa vào id sản phẩm
    const selectedProduct = listCar.find((item) => item.id === productId);

    // Kiểm tra nếu sản phẩm tồn tại trong danh sách listCar
    if (selectedProduct) {
      // Thêm sản phẩm vào mảng added_card và thêm thuộc tính quantity với giá trị mặc định là 1
      added_card.push({ ...selectedProduct, quantity: 1 });
      displayAlert(`Sản phẩm "${selectedProduct.name}" đã được thêm vào giỏ hàng.`);

      // Cập nhật số lượng trong phần tử .quantity
      updateCartQuantity();

      // Hiển thị thông tin sản phẩm trong giỏ hàng
      displayCartItems();
    } else {
      displayAlert("Sản phẩm không tồn tại trong danh sách.");
    }
  } else {
    displayAlert("Sản phẩm đã có trong giỏ hàng.");
  }
}

function updateCartQuantity() {
  // Lấy phần tử .quantity để hiển thị số lượng
  const quantityElement = document.querySelector(".quantity span");

  // Tính tổng số lượng sản phẩm trong giỏ hàng
  const totalQuantity = added_card.reduce((total, item) => total + (item.quantity || 1), 0);

  // Cập nhật số lượng sản phẩm trong phần tử .quantity
  quantityElement.textContent = totalQuantity.toString();
}

function displayCartItems() {
  // Lấy div để hiển thị thông tin sản phẩm trong giỏ hàng
  const cartItemsDiv = document.getElementById("cart-items");

  // Xóa nội dung cũ trong div
  cartItemsDiv.innerHTML = "";

  // Hiển thị thông tin từng sản phẩm trong giỏ hàng
  added_card.forEach((item) => {
    const productDiv = document.createElement("div");
    productDiv.classList.add("added-item");
    productDiv.innerHTML = `
    <div class="added-img">
    <img src="./images/galery/${item.image}" alt="lamborghini">
 </div>
 <div class="added-info">
    <div class="name">
       ${item.name}
    </div>
    <div class="sub-info">
       Biểu tượng tốc độ và sang trọng
    </div>
 </div>
 <div class="price-and-caculator">
    <span>${item.price}</span>
    <div class="caculator">
       <div class="subtract" onclick="changeQuantity(${item.id}, -1)">
          <i class="fa-solid fa-minus"></i>
       </div>
       <div class="quantity">${item.quantity || 1}</div> 
       <div class="plus" onclick="changeQuantity(${item.id}, 1)">
          <i class="fa-solid fa-plus"></i>
       </div>   
    </div>
 </div>
    `;
    cartItemsDiv.appendChild(productDiv);
  });

  // Cập nhật tổng giá tiền
  updateTotal();
}

function changeQuantity(productId, amount) {
  // Tìm sản phẩm từ mảng added_card bằng cách dựa vào id sản phẩm
  const selectedProduct = added_card.find((item) => item.id === productId);

  // Kiểm tra nếu sản phẩm tồn tại trong danh sách added_card
  if (selectedProduct) {
    // Thay đổi số lượng sản phẩm
    selectedProduct.quantity = (selectedProduct.quantity || 1) + amount;

    // Kiểm tra nếu số lượng nhỏ hơn 1 thì xóa sản phẩm khỏi giỏ hàng
    if (selectedProduct.quantity < 1) {
      added_card = added_card.filter((item) => item.id !== productId);
    }

    // Cập nhật số lượng trong phần tử .quantity
    updateCartQuantity();

    // Cập nhật lại giỏ hàng
    displayCartItems();
  }
}

function updateTotal() {
  // Lấy tổng giá tiền của từng sản phẩm
  const total = added_card.reduce((total, item) => {
    const quantity = item.quantity || 1; // Lấy số lượng, nếu không có thì mặc định là 1
    const price = parseFloat(item.price.replace(/,/g, " ")); // Chuyển giá tiền thành số
    return total + quantity * price;
  }, 0);

  // Lấy phần tử .total để hiển thị tổng giá
  const totalElement = document.querySelector(".total span");
  totalElement.textContent = `Tổng giá tiền: $ ${total * 1000} `;
}
function proceedToCheckout() {
  // Lưu thông tin giỏ hàng vào LocalStorage để có thể truyền sang trang khác
  localStorage.setItem("cartItems", JSON.stringify(added_card));

  // Chuyển đến trang khác hiển thị thông tin giỏ hàng và số tiền cần thanh toán
  window.location.href = "checkout.html"; // Thay đổi "checkout.html" thành đường dẫn đến trang checkout của bạn
}
