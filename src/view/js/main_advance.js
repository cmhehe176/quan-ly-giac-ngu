
let current_spo2 = 0;
let current_heart_rate = 0;
let avg_spo2 = 0;
let avg_heart_rate = 0;
let max_spo2 = 0;
let min_spo2 = 200;
let max_heart_rate = 0;
let min_heart_rate = 1000;
let is_done = 1;
  // spo2 Chart
  var ctx1 = $("#spo2").get(0).getContext("2d");
  var myChart1 = new Chart(ctx1, {
      type: "line",
      data: {
          labels: [], 
          datasets: [{
                  label: "Oxi trong máu",
                  data: [],
                  backgroundColor: "rgba(0, 156, 255, .5)",
                  fill: true
              }
          ]
          },
      options: {
          responsive: true
      }
  });
// heart rate chart  
var ctx2 = document.getElementById("heart-rate").getContext("2d");
var myChart2 = new Chart(ctx2, {
type: "line",
data: {
   labels: [], 
   datasets: [{
           label: "Nhịp tim",
           data: [],
           backgroundColor: "rgba(0, 156, 255, .5)",
           fill: true
       }
   ]
   },
options: {
    responsive: true
}
});
//random function
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const display_status = async (display_element)=>{
    let interval_id = setInterval(()=>{
        if(current_spo2 >= 99){
            display_element.innerText = "Thức"
        }
        else{
            display_element.innerText = "Ngủ"
        }
    }, env.duration)
}
const display_warning = async (display_element) => {
    let interval_id = setInterval(()=>{
        if(current_spo2 <= 95){
            display_element.innerText = "Oxi trong máu thấp. "
            document.getElementById("audio_warning").play()
        }
        else{
            display_element.innerText = " Oxi trong máu bình thường. "
        }
        if(current_heart_rate <=60 && current_heart_rate <=100){
            display_element.innerText += " Nhịp tim bình thường. "
        }
        else if(current_heart_rate > 100){
            display_element.innerText += " Nhịp tim cao. "
        }
        else {
            display_element.innerText += " Nhịp tim thấp. "
        }
    }, env.duration)
}
//Gen data
const genData = async (count)=>{
   setTimeout(() => {
       count++
       myChart1.data.labels.push(count.toString())
       let temp1 = getRandomInt(env.spo2.min, env.spo2.max)
       current_spo2 = temp1
       avg_spo2 = (((count-1)*avg_spo2 + temp1)/(count))
       document.getElementById("avg_spo2").innerText = "Oxi trong máu: " + Math.floor(avg_spo2)

       if(temp1 > max_spo2){
            max_spo2 = temp1;
            document.getElementById("max_spo2").innerText = "Oxi trong máu: " + max_spo2;
       } 
       else if(temp1 < min_spo2){
            min_spo2 = temp1;
            document.getElementById("min_spo2").innerText = "Oxi trong máu: " + min_spo2;
       } 

       myChart1.data.datasets[0].data.push(temp1)

       myChart2.data.labels.push(count.toString())
       let temp2 = getRandomInt(env.heart_rate.min, env.heart_rate.max)
       current_heart_rate = temp2
       avg_heart_rate = (((count-1)*avg_heart_rate + temp2)/(count))
       document.getElementById("avg_heart_rate").innerText = "Nhịp tim: " + Math.floor(avg_heart_rate)

       if(temp2 > max_heart_rate){
            max_heart_rate = temp2;
            document.getElementById("max_heart_rate").innerText = "Nhịp tim: " + max_heart_rate;
       } 
       else if(temp2 < min_heart_rate){
            min_heart_rate = temp2;
            document.getElementById("min_heart_rate").innerText = "Nhịp tim: " + min_heart_rate;
       } 
       document.getElementById("current_spo2").innerText = "Oxi trong máu: " + current_spo2
       document.getElementById("current_heart_rate").innerText = "Nhịp tim: " + current_heart_rate
       myChart2.data.datasets[0].data.push(temp2)

       myChart1.update()
       myChart2.update()
       if(!is_done) genData(count++)
   }, env.duration);
}

//timer function
document.getElementById("accept__button--yes").onclick = ()=>{
    document.getElementById("audio_bell").pause()
    document.getElementById("accept").style.display = "none"
    if(confirm("Bạn muốn lưu dữ liệu?")){
        //luu so lieu
        fetch(`http://localhost:${env.port}/history`, {method: "POST",
        body: JSON.stringify({
            data_spo2: myChart1.data.datasets[0].data.toString(),
            label_spo2: myChart1.data.labels.toString(),
            data_heart_rate: myChart2.data.datasets[0].data.toString(),
            label_heart_rate: myChart2.data.labels.toString(), 
            create_at: new Date(),
            user_id: localStorage.getItem("scare_session_id")      
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

        location.reload()
    }
    else{
        location.reload()
    }
    
}
const turn_alarm = ()=>{
        document.getElementById("audio_bell").play()
}
const accept =  ()=>{
    document.getElementById("accept__text").innerText = `Tắt báo thức?`
   document.getElementById("accept").style.display = "block"
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    let interval_id = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        if(current_spo2 >= 95){
            //Dang thuc, khong tru thoi gian
        }
        else if(timer - 1 >= 0){
            timer--;
            document.getElementById("div_progress_bar").style = `width: ${(duration-timer)/duration*100}%`
        }
        else if (timer -1 < 0) {
            timer--;
            is_done = 1;
            clearInterval(interval_id)
            turn_alarm()
            accept()
        }
    }, 1000);
}
//function handle button undo
const handle_button_undo = ()=>{
    if(confirm("Bạn muốn lưu dữ liệu?")){
        //luu so lieu
        fetch(`http://localhost:${env.port}/history`, {method: "POST",
        body: JSON.stringify({
            data_spo2: myChart1.data.datasets[0].data.toString(),
            label_spo2: myChart1.data.labels.toString(),
            data_heart_rate: myChart2.data.datasets[0].data.toString(),
            label_heart_rate: myChart2.data.labels.toString(), 
            create_at: new Date(),
            user_id: localStorage.getItem("scare_session_id")      
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

        location.reload()
    }
    else{
        location.reload()
    }
}

//function handle button play
const handle_button_play = ()=>{

    if(!document.getElementById("input_timer").value){
        return;    
    }
    is_done = 0;
    let time = document.getElementById("input_timer").value
    let duration_milli = 0
    if(time.split(":").length > 1){
        duration_milli = parseInt(time.split(":")[0]*60*60) + parseInt(time.split(":")[1]*60)
    }
    else if(time.split(":").length <= 1){
        duration_milli = parseInt(time)*60*60
    }
    startTimer(duration_milli, document.getElementById("demo"))
    //exec genData
    genData(0)
    display_status(document.getElementById("p_status"))
    display_warning(document.getElementById("p_warning"))
    document.getElementById("div_button").innerHTML = ` <button id="button_undo" type="button" class="btn btn-square btn-primary m-2"><i class="fa fa-undo"></i></button>`
    
    //handle button undo
     if(document.getElementById("button_undo")){
        document.getElementById("button_undo").onclick = handle_button_undo
    }  
}

//handle button play
document.getElementById("button_play").onclick = handle_button_play



//fetch API


