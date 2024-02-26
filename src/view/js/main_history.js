

const get_max = (array)=>{
    let current_max = 0
    for(let i in array){
        if(array[i]>current_max){
            current_max = array[i]
        }
    }
    return current_max
}
const get_min = (array)=>{
    let current_min = 9999
    for(let i in array){
        if(array[i]<current_min){
            current_min = array[i]
        }
    }
    return current_min
}
const get_avg = (array)=>{
    let sum = 0;
    for(let i in array){
        sum += array[i]
    }
    return Math.floor(sum/(array.length))
}
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
//Hien thi chi tiet
const display_detail = (_id)=>{
    console.log("asd")
    fetch(`http://localhost:${env.port}/history?`+`_id=${_id}`)
    .then((res)=>{
        return res.json()
    })
    .then((res)=>{
        console.log(res)
        myChart1.data.labels = res.data[0].label_spo2.split(",")
        myChart2.data.labels = res.data[0].label_heart_rate.split(",")
        myChart1.data.datasets[0].data = res.data[0].data_spo2.split(",").map(Number)
        myChart2.data.datasets[0].data = res.data[0].data_heart_rate.split(",").map(Number)
        let avg_spo2
        let avg_heart_rate
        document.getElementById("max_spo2").innerText = "Oxi trong máu: "+ get_max(myChart1.data.datasets[0].data)
        document.getElementById("min_spo2").innerText = "Oxi trong máu: "+ get_min(myChart1.data.datasets[0].data)
        document.getElementById("max_heart_rate").innerText = "Nhịp tim: "+ get_max(myChart2.data.datasets[0].data)
        document.getElementById("min_heart_rate").innerText = "Nhịp tim: "+ get_min(myChart2.data.datasets[0].data)
        document.getElementById("avg_spo2").innerText = "Oxi trong máu: "+ (avg_spo2 = get_avg(myChart1.data.datasets[0].data))
        document.getElementById("p_warning").innerText = ""
        document.getElementById("avg_heart_rate").innerText = "Nhịp tim: "+ (avg_heart_rate = get_avg(myChart2.data.datasets[0].data))
        document.getElementById("p_warning").innerText += (avg_spo2>=95)? "Oxi trong máu bình thường." : "Oxi trong máu thấp."
        if(avg_heart_rate>=60 && avg_heart_rate<=100){
            document.getElementById("p_warning").innerText += " Nhịp tim bình thường. "
            if(avg_spo2 < 95) document.getElementById("p_warning").innerText += " Cần thăm khám cơ sở y tế. "
        }
        else if (avg_heart_rate < 60) {
            document.getElementById("p_warning").innerText += " Nhịp tim thấp "
            document.getElementById("p_warning").innerText += " Cần thăm khám cơ sở y tế. "
        }
        else {
            document.getElementById("p_warning").innerText += " Nhịp tim cao. "
            document.getElementById("p_warning").innerText += " Cần thăm khám cơ sở y tế. "
        }
        
        myChart1.update()
        myChart2.update()
    })
}


//Hien thi danh sach lich su
fetch(`http://localhost:${env.port}/history?`+`user_id=${localStorage.getItem("scare_session_id")}`)
.then((res)=>{
    return res.json()
}) 
.then((res)=>{
    console.log(res)
    for(let i in res.data){
        document.getElementById("div_display_history").innerHTML += `<div  class="d-flex align-items-center pt-2">                               
        <div  onclick="display_detail('${res.data[i]._id}')" class="w-100 ms-3 history">
            <div class="d-flex w-100 align-items-center justify-content-between">
                <span>${(new Date(res.data[i].create_at)).toLocaleDateString() +" "+ (new Date(res.data[i].create_at)).toLocaleTimeString()}</span>
                
            </div>
        </div>
    </div>`
    }
})

