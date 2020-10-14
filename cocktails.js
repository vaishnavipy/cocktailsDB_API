window.addEventListener("load",loadingFunc);

            

function loadingFunc(){

    document.getElementById("grid_container").style.display="block";

    document.getElementById("loading").style.display="block";

    setTimeout(function(){
        document.getElementById("loading").style.display="none";
        displayData();

    },1000);


}




 function displayData(){
    const grid =document.getElementById("grid_container");

    document.getElementById("loading").style.display="none";

    grid.style.display = "grid";

    let image_container_div ;
    let image_elm ;
    let name_div; 
    let id_count=0;
    let all_cocktails;

  // const margarita = document.images.namedItem("img")
  // const image = document.getElementById("img")
   //const drink = document.getElementById("drink")

   const cocktail_array=["A1","abc","ace","adam","at&t","acid","karsk","melya","affair","boxcar","orgasm","apello","avalon","casino","radler","mimosa","paloma","abilene","almeria","mai tai","martini","sazerac","sidecar","veteran"]

   cocktail_array.forEach(function(elm,i){
    id_count++;
    
   

    createCocktailElements();

    
    
    fetch_func(elm,id_count);

    image_container_div.appendChild(image_elm);
    image_container_div.appendChild(name_div);

    grid.appendChild(image_container_div)


   })
   function createCocktailElements(){


    image_container_div = document.createElement("DIV");
   image_container_div.setAttribute("class","image_container");

     image_elm = document.createElement("IMG");
   image_elm.setAttribute("class","thumbnails");
  
   image_elm.setAttribute("id",id_count)

   name_div=document.createElement("DIV");
   name_div.setAttribute("class","name");


   }

   function fetch_func(elm,id_count){
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+elm)
    .then(response => response.json())
    .then(function(data){

        document.getElementById(id_count).setAttribute("src", data["drinks"][0]["strDrinkThumb"]);
       
        document.getElementById(id_count).nextElementSibling.textContent = (data["drinks"][0]["strDrink"]).toUpperCase();

    })
    .catch(err => console.log(err))



   }
  all_cocktails = document.querySelectorAll(".image_container");
   all_cocktails.forEach(elm => elm.addEventListener("click",myFunc));

   function myFunc(){

       let cocktail_name = this.children[1].textContent;
       localStorage.setItem("cocktail_name",cocktail_name);
       location.assign("cocktail_details.html");



   }

   const search_elm = document.getElementById("search");

   let cocktail_names_list = document.querySelectorAll(".name");

   search_elm.oninput = function(){

    grid.textContent ="";
    grid.style.display="grid";
    let search_value = search_elm.value;
    console.log(search_value)
    console.log(cocktail_names_list.length)
    cocktail_names_list.forEach(function(elm,i){


        elm.parentElement.style.display ="none";

    })
    if(search_value == ""){
       /* cocktail_names_list.forEach(function(elm,i){


            elm.parentElement.style.display ="block";

            }) */
            location.reload();

    }


   /* cocktail_names_list.forEach(function(elm,i){
        console.log(search_value.toUpperCase())
        console.log(elm.textContent.includes(search_value.toUpperCase()))

        if(elm.textContent.includes(search_value.toUpperCase())){
            console.log(elm)

            elm.parentElement.style.display ="block";

        }else{
            elm.parentElement.style.display ="none";

        } 



    }) */

    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?s="+search_value)
   
    .then(response => response.json())
    .then(function(data){

        if(data["drinks"]){
            
            for(var j=0; j< data["drinks"].length ; j++){
                id_count++;

                createCocktailElements();
              
              
                image_container_div.appendChild(image_elm);
    image_container_div.appendChild(name_div);

    grid.appendChild(image_container_div);

        document.getElementById(id_count).setAttribute("src", data["drinks"][j]["strDrinkThumb"]);
       
       document.getElementById(id_count).nextElementSibling.textContent = (data["drinks"][j]["strDrink"]).toUpperCase();

       

       all_cocktails = document.querySelectorAll(".image_container");
   all_cocktails.forEach(elm => elm.addEventListener("click",myFunc));



            }

        }else{
            grid.style.display="block";
            grid.textContent ="Sorry No Drinks Matched Your Search!! Try Again..";
            


        }
        cocktail_names_list = document.querySelectorAll(".name");

    })
    .catch(err => console.log(err))




   }





}





