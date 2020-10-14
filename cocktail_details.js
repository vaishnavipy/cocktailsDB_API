window.addEventListener("load",loadingFunc);

function loadingFunc(){

    document.getElementById("grid_container").style.display ="block";

    document.getElementById("loading").style.display ="block"

    setTimeout(function(){

        document.getElementById("loading").style.display ="none";
        displayData();

    },1000);


}



function displayData(){

  const grid=  document.getElementById("grid_container");
 
  grid.style.display ="grid";

  grid.style.textAlign="left";

    const right_div = document.getElementById("right");

    const left_div = document.getElementById("left");

    right_div.style.display="block";

    left_div.style.display="block";



let selected_cocktail = localStorage.getItem("cocktail_name");

document.title = selected_cocktail;



document.getElementById("cocktailName").innerHTML = selected_cocktail;

fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+selected_cocktail)
.then(response => response.json())
.then(function(data){

    document.getElementById("instructions").innerHTML = data["drinks"][0]["strInstructions"];
    document.images.namedItem("cocktail_image").src = data["drinks"][0]["strDrinkThumb"];

    for(let i=1; i <= 15 ; i++){

       if(data["drinks"][0]["strIngredient"+i] != null){

        let para = document.createElement("P");
        para.setAttribute("class","ingredients");

        let span = document.createElement("SPAN");
        span.setAttribute("class","checkmark");

        span.innerHTML = '<i class="fa fa-check-square">';

        let txtnode = document.createTextNode(data["drinks"][0]["strIngredient"+i]);

        para.appendChild(span);
        para.appendChild(txtnode);

        right_div.insertBefore(para,right_div.lastElementChild);

       }


    }


})
.catch(err => console.log(err))

document.getElementById("all").onclick = function(){

location.assign("cocktails.html");
}


}
