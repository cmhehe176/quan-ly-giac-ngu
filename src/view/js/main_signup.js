document.getElementById("button_signup").onclick = ()=>{
    if(document.getElementById("input_username").value.split("@").length < 2){
        document.getElementById("p_warning").style.color = "red"
        document.getElementById("p_warning").innerText = "Yêu cầu sử dụng Email"
        return
    }
    if(document.getElementById("input_password_1").value!=document.getElementById("input_password_2").value){
        document.getElementById("p_warning").style.color = "red"
        document.getElementById("p_warning").innerText = "Mật khẩu không trùng khớp"
        return
    }  
        fetch(`http://localhost:${env.port}/user`, {method: "POST",
        body: JSON.stringify({
            username: document.getElementById("input_username").value,
            password: document.getElementById("input_password_1").value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        console.log(res)
        if(!res.error){
            document.getElementById("p_warning").innerText = "Tạo tài khoản thành công"
            document.getElementById("p_warning").style.color = "#009CFF"
        }
        else{
            document.getElementById("p_warning").innerText = "Tạo tài khoản thất bại"
            document.getElementById("p_warning").style.color = "red"
        }
    })
}