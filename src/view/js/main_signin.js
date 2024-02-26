document.getElementById("button_signin").onclick = ()=>{    
        fetch(`http://localhost:${env.port}/authenticate`, {method: "POST",
        body: JSON.stringify({
            username: document.getElementById("input_username").value,
            password: document.getElementById("input_password").value
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        if(!res.error){
            localStorage.setItem("scare_session_id", res.data[0]._id)
            window.location.replace("/advance")
        }
        else{
            document.getElementById("p_warning").innerText = "Sai tài khoản hoặc sai tên mật khẩu"
        }
    })
}