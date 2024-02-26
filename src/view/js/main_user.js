

const displayData = ()=>{
     fetch(`http://localhost:${env.port}/user?`+`_id=${localStorage.getItem("scare_session_id")}`)
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
       document.getElementById("input_username").value = res.data[0].username
       document.getElementById("input_name").value = res.data[0].name
       res.data[0].birthday = new Date(res.data[0].birthday)
       let year = res.data[0].birthday.getFullYear()
       let month = (res.data[0].birthday.getMonth()+1)<10?"0"+(res.data[0].birthday.getMonth()+1).toString():(res.data[0].birthday.getMonth()+1).toString()
       let date = (res.data[0].birthday.getDate()+1)<10?"0"+(res.data[0].birthday.getDate()).toString():(res.data[0].birthday.getDate()).toString()
       document.getElementById("input_birthday").value = year+"-"+month+"-"+date
    })
}
displayData()
document.getElementById("button_update_user").onclick = ()=>{    
    console.log(localStorage.getItem("scare_session_id"))
        fetch(`http://localhost:${env.port}/user/`+`${localStorage.getItem("scare_session_id")}`, {method: "put",
        body: JSON.stringify({
            name: document.getElementById("input_name").value,
            birthday: document.getElementById("input_birthday").value
          
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{

    })
}
