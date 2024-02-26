let list_alarm = []
fetch(`http://localhost:${env.port}/alarm?user_id=${localStorage.getItem("scare_session_id")}`)
    .then((res) => {
        return res.json()
    })
    .then((res) => {
        list_alarm = res.data
    })
const delete_alarm = (_id) => {
    fetch(`http://localhost:${env.port}/alarm/${_id}`, {
            method: "delete",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            document.getElementById(_id).remove()
        })
}
const display_data_alarm = async(api_string, display_element) => {
    fetch(api_string)
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            for (let i in res.data) {
                display_element.innerHTML += `
            <div class="mb-3" id="${res.data[i]._id}">
                <input type="time" class="form-control" value="${res.data[i].time}"> 
                <button onclick="delete_alarm('${res.data[i]._id}')"  class="btn btn-primary" style=" background-color: transparent; border-style: none;margin-top: 3px"><i style="color: red;" class="fa-solid fa-trash-can"></i></button>                                
                <hr>
            </div>
                    `

            }
        })
}
display_data_alarm(`http://localhost:${env.port}/alarm?user_id=${localStorage.getItem("scare_session_id")}`, document.getElementById("div_display_alarm"))

const create_alarm = () => {
    fetch(`http://localhost:${env.port}/alarm`, {
            method: "POST",
            body: JSON.stringify({
                time: document.getElementById("input_new_alarm").value,
                user_id: localStorage.getItem("scare_session_id")
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            window.location.reload()
        })
}
document.getElementById("button_add_alarm").onclick = () => {
    if (!document.getElementById("input_new_alarm")) {
        document.getElementById("div_display_alarm").innerHTML += `
    <div class="mb-3">
        <input id="input_new_alarm" style="border-color: red" type="time" class="form-control alarm" value="14:30">                                 
    </div>
    <button type="submit" onclick="create_alarm()" class="btn">Lưu</button>
    <hr>   `
    }
}

//Bao thuc
document.getElementById("accept__button--yes").onclick = () => {
    document.getElementById("audio_bell").pause()
    window.location.reload()
}

const turn_alarm = () => {
    document.getElementById("audio_bell").play()
}
const accept = (hh_mm) => {
    document.getElementById("accept__text").innerText = `Báo thức lúc ${hh_mm}. Tắt báo thức?`
    document.getElementById("accept").style.display = "block"
}

const check_alarm = (list_alarm) => {
    let current = new Date()
    let hh_mm = ""
    if (current.getHours() == "0") {
        hh_mm += "00:"
    } else hh_mm += (current.getHours() < 10) ? ("0" + current.getHours().toString()) : current.getHours().toString() + ":"
    hh_mm += (current.getMinutes() < 10) ? ("0" + current.getMinutes().toString()) : current.getMinutes().toString()
    for (let i in list_alarm) {
        console.log(list_alarm[i])
        console.log(current)
        if (list_alarm[i].time == hh_mm) {
            turn_alarm()
            accept(hh_mm)
        }
    }
}
const alarm = async() => {
    setInterval(() => {

        check_alarm(list_alarm)
    }, 60 * 1000)
}
alarm()