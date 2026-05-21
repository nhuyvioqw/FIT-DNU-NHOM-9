let isLogin = true;

let users = JSON.parse(localStorage.getItem("users")) || [];

function openAuth(){
  document.getElementById("authModal").classList.add("active");
}

function toggleAuth(){
  isLogin = !isLogin;

  document.getElementById("authTitle").innerText =
    isLogin ? "Đăng nhập" : "Đăng ký";

  document.getElementById("switchText").innerText =
    isLogin ? "Chưa có tài khoản? Đăng ký" : "Đã có tài khoản? Đăng nhập";
}

function submitAuth(){
  let username = document.getElementById("username").value.trim();
  let password = document.getElementById("password").value.trim();

  // VALIDATE
  if(!username || !password){
    alert("❌ Không được để trống!");
    return;
  }

  if(isLogin){
    let user = users.find(u =>
      u.username === username && u.password === password
    );

    if(user){
      localStorage.setItem("currentUser", JSON.stringify(user));
      alert("✅ Đăng nhập thành công!");
      location.reload();
    }else{
      alert("❌ Sai tài khoản hoặc mật khẩu");
    }

  }else{
    let exists = users.find(u => u.username === username);

    if(exists){
      alert("⚠️ Tài khoản đã tồn tại");
      return;
    }

    let newUser = {
      username,
      password
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("🎉 Đăng ký thành công!");
    toggleAuth();
  }
}

function logout(){
  localStorage.removeItem("currentUser");
  location.reload();
}

function checkLogin(){
  let user = JSON.parse(localStorage.getItem("currentUser"));

  if(user){
    document.getElementById("userBox").innerHTML = `
      <div class="user-box">
        <div class="avatar">${user.username[0].toUpperCase()}</div>
        <span>${user.username}</span>
      </div>
    `;

    document.getElementById("loginBtn").style.display = "none";
    document.getElementById("logoutBtn").style.display = "inline-block";
  }
}

checkLogin();