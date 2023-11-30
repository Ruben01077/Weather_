let time = document.querySelector(".time")
let search_btn = document.querySelector(".search_btn")
let search_input = document.querySelector(".search_input")
let city_name = document.querySelector(".city_name")
let temp = document.querySelector(".temp")
let lds_roller = document.querySelector(".lds_roller")
let f_sign = document.querySelector(".f_sign")
let fahrenheit_btn = document.querySelector(".fahrenheit_btn")
let celsius_btn = document.querySelector(".celsius_btn")
let description = document.querySelector(".description")
let sky_img = document.querySelector(".sky_img")
let higher_temp = document.querySelector(".higher_temp")
let lower_temp = document.querySelector(".lower_temp")
let current_data_div = document.querySelector(".current_data_div")
let current_temp_data_container = document.querySelector(".current_temp_data_container")
let c_sign = document.querySelector(".c_sign")
let wind = document.querySelector(".wind")
let humidity = document.querySelector(".humidity")
let visibility = document.querySelector(".visibility")
let season = document.querySelector(".season")
let background_video = document.querySelector(".background_video")
let current_lat
let current_long
let current_time
let current_date
let date
let unit = "metric"




// < get user location 
 function get_user_location(){
const successCallback = (position) => {
    console.log(position.coords);
    current_lat = position.coords.latitude
    current_long = position.coords.longitude    
};

const errorCallback = (error) => {
   
};

navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
}

get_user_location()

// get user location >


function fetch_data(unit){

    setTimeout(()=>{
        let api_url_with_lan_long = "https://api.openweathermap.org/data/2.5/weather?lat="+current_lat+"&lon="+current_long+"&appid=d71a7f93bbef11f3502e1050c73c7deb&units="+unit+""
        let getLocationInfoByLatLong = "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude="+current_lat+"&longitude=-"+current_long+"&localityLanguage=en"
        
         //let new_api = "https://api-bdc.net/data/reverse-geocode-with-timezone?latitude="+current_lat+"&longitude="+current_long+"&localityLanguage=en&key=bdc_9c27d604fb2844248be7990ee7a365a9"


        // fetch(new_api)
        // .then((response) => response.json())
        // .then((data)=>{
        //   console.log(data)
        // })



    function fetch_current_city_name(){

        return new Promise((resolve, reject)=>{
            fetch(getLocationInfoByLatLong)
            .then((response) => response.json())
            .then((data)=>{
                console.log(data)
                city_name.innerHTML = data.city

            })

            
        })

    }

    fetch_current_city_name()


        fetch(api_url_with_lan_long)
            .then((response) => response.json())
            .then((data)=>{
                console.log(data)
                temp.innerHTML = Math.round(data.main.temp) 
                current_data_div.style.display = "inline"
                c_sign.style.display = "flex"
                current_temp_data_container.style.height = "60%"
                description.innerHTML = data.weather[0].main
                sky_img.src = "https://openweathermap.org/img/wn/"+ data.weather[0].icon+"@2x.png"
                higher_temp.innerHTML = "Max temp: "+Math.round(data.main.temp_max)
                lower_temp.innerHTML = "Min temp: "+Math.round(data.main.temp_min)
                wind.innerHTML = "Wind: " + Math.round(data.wind.speed) + " mph"
                humidity.innerHTML = "Humidity: " + data.main.humidity + "%"
                visibility.innerHTML = "Visibility: " + data.visibility + " meter"
                season.innerHTML = "Description: " + data.weather[0].description
               
            
                 
                if(data.weather[0].icon == "01n"){
                    background_video.src = "videos/clear_sky_night_01n.mp4"
                   } else if (data.weather[0].icon == "01d"){
                    background_video.src = "videos/clear_sky_day_01d.mp4"
                   } else if(data.weather[0].icon == "02d"){
                    background_video.src = "videos/few_clouds_02d.mp4"
                   }else if(data.weather[0].icon == "02n"){
                    background_video.src = "videos/few_clouds_02n.mp4"
                   }else if(data.weather[0].icon == "03d"){
                    background_video.src = "videos/broken_clouds_03d_04d.mp4"
                   }else if(data.weather[0].icon == "04d"){
                    background_video.src = "videos/broken_clouds_03d_04d.mp4"
                   }else if(data.weather[0].icon == "03n"){
                    background_video.src = "videos/broken_clouds_03n_04n.mp4"
                   }else if(data.weather[0].icon == "04n"){
                    background_video.src = "videos/broken_clouds_03n_04n.mp4"
                   } else if(data.weather[0].icon == "09d"){
                    background_video.src = "videos/rain_09d_10d.mp4"
                   }else if(data.weather[0].icon == "10d"){
                    background_video.src = "videos/rain_09d_10d.mp4"
                   }else if(data.weather[0].icon == "09n"){
                    background_video.src = "videos/shower_rain_09n.mp4"
                   }else if(data.weather[0].icon == "10n"){
                    background_video.src = "videos/rain_10n.mp4"
                   }else if(data.weather[0].icon == "11n"){
                    background_video.src = "videos/thunderstorm_11n.mp4"
                   }else if(data.weather[0].icon == "11d"){
                    background_video.src = "videos/thunderstorm_11d.mp4"
                   }else if(data.weather[0].icon == "12n"){
                    background_video.src = "videos/snow_12n.mp4"
                   }else if(data.weather[0].icon == "12d"){
                    background_video.src = "videos/snow_12d.mp4"
                   }else{
                    background_video.src = "videos/default.mp4"
                   }

               
            })



    }, 5000)

}

fetch_data(unit)


function search_by_city(unit){
  

    search_btn.addEventListener("click", function (){
    
        if(search_input.value == ""){
            alert("Please Enter City name")
        }
        
            let api_url_with_city_name = "https://api.openweathermap.org/data/2.5/weather?q=" + search_input.value + "&appid=d71a7f93bbef11f3502e1050c73c7deb&units="+unit+""
    
            fetch(api_url_with_city_name)
            .then((response) => response.json())
            .then((data)=>{
                console.log(data)
                city_name.innerHTML = data.name
                temp.innerHTML = Math.round(data.main.temp)
                description.innerHTML = data.weather[0].main
                sky_img.src = "https://openweathermap.org/img/wn/"+ data.weather[0].icon+"@2x.png"
                higher_temp.innerHTML = "Max temp "+Math.round(data.main.temp_max)
                lower_temp.innerHTML = "Min temp "+Math.round(data.main.temp_min)
                wind.innerHTML = "Wind: " + Math.round(data.wind.speed) + " mph"
                humidity.innerHTML = "Humidity: " + data.main.humidity + "%"
                visibility.innerHTML = "Visibility: " + data.visibility + " meter"
                season.innerHTML = "Description: " + data.weather[0].description

               

                if(data.weather[0].icon == "01n"){
                    background_video.src = "videos/clear_sky_night_01n.mp4"
                   } else if (data.weather[0].icon == "01d"){
                    background_video.src = "videos/clear_sky_day_01d.mp4"
                   } else if(data.weather[0].icon == "02d"){
                    background_video.src = "videos/few_clouds_02d.mp4"
                   }else if(data.weather[0].icon == "02n"){
                    background_video.src = "videos/few_clouds_02n.mp4"
                   }else if(data.weather[0].icon == "03d"){
                    background_video.src = "videos/broken_clouds_03d_04d.mp4"
                   }else if(data.weather[0].icon == "04d"){
                    background_video.src = "videos/broken_clouds_03d_04d.mp4"
                   }else if(data.weather[0].icon == "03n"){
                    background_video.src = "videos/broken_clouds_03n_04n.mp4"
                   }else if(data.weather[0].icon == "04n"){
                    background_video.src = "videos/broken_clouds_03n_04n.mp4"
                   } else if(data.weather[0].icon == "09d"){
                    background_video.src = "videos/rain_09d_10d.mp4"
                   }else if(data.weather[0].icon == "10d"){
                    background_video.src = "videos/rain_09d_10d.mp4"
                   }else if(data.weather[0].icon == "09n"){
                    background_video.src = "videos/shower_rain_09n.mp4"
                   }else if(data.weather[0].icon == "10n"){
                    background_video.src = "videos/rain_10n.mp4"
                   }else if(data.weather[0].icon == "11n"){
                    background_video.src = "videos/thunderstorm_11n.mp4"
                   }else if(data.weather[0].icon == "11d"){
                    background_video.src = "videos/thunderstorm_11d.mp4"
                   }else if(data.weather[0].icon == "12n"){
                    background_video.src = "videos/snow_12n.mp4"
                   }else if(data.weather[0].icon == "12d"){
                    background_video.src = "videos/snow_12d.mp4"
                   }else{
                    background_video.src = "videos/default.mp4"
                   }
    

                 

            })



        }
             
    )
    }
    
    search_by_city(unit)        
        

    setTimeout(()=>{
    
        lds_roller.style.display = "none"
       
    },5000)


// < get user date and time
function getData(){
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    date = new Date();
    current_date = months[date.getMonth()]+"/"+ date.getDate() + "/"+ date.getFullYear();
    
    current_time = date.getHours()+":"+date.getMinutes();
    

    time.innerHTML = current_date + " " +  current_time
}

getData()

setInterval(getData, 1000)
// get user date and time >














