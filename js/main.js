// I didn't work with JQuery before so probably there is a better way to do all this :) If it possible I'd like to hear a small feedback 
// on what I did wrong and what can improve. Thanks for the challenge, I enjoyed it!

$(document).ready(() => {
    myUrl = 'http://www.recipepuppy.com/api/?q=';
    proxy = 'https://cors-anywhere.herokuapp.com/';
    finalURL = proxy + myUrl;
    favorites = [];

    $.getJSON(finalURL, function( data ) {
        // console.log(data);
            recipes = data.results;
            output = '';
            $.each(recipes, (index, r) => {
                let num = r.ingredients.split(/[\s\.,;]+/)
                output += `
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${r.thumbnail}">
                        <div class="title">${r.title}</div>
                        <p>Made from ${num.length} ingredients</p>
                        <div onclick="selectFavorite('${r.title}')" class="select-button" id="${r.title}">
                            <span>Add To Favorite</span>  
                        </div>   
                    </div>
                </div>
                `;
            })
            $('#recipes').html(output);
    });

    $('#searchForm').on('keyup', (e) => {
        let searchText = $('#searchText').val();
        getRecipe(searchText);
        e.preventDefault();
    })
})

function getFavorites() {  
    let favFood = JSON.parse(sessionStorage.getItem('title'));
    let output = '';
    $.each(favFood, (index, r) => {   
        output += `  
            <div class="selected-title">   
                <h5>${r}<h5> 
            </div>
        `;
    })      
    $('#favorites').html(output); 
}


function selectFavorite(title) {
    //here I tried to change a text onclick but couldn't make it on a single click
        // $(".select-button").text(function(i,v){
        //     return v === 'Add To Favorite' ? 'ADDED' : 'Add To Favorite'         
        // })    
    favorites.push(title)  
    sessionStorage.setItem('title', JSON.stringify(favorites));  
}

function getRecipe(searchText) {   
    axios.get(this.finalURL +searchText)
    .then((response) => {
        // console.log(response)
        let recipes = response.data.results;
        let output = '';
        $.each(recipes, (index, r) => {
            let num = r.ingredients.split(/[\s\.,;]+/)
            let i =  r.thumbnail || "./image.jpg"
            output += `
            <div class="col-md-3">
                <div class="well text-center">
                    <img src="${i}">
                    <div class="title">${r.title}</div>
                    <p>Made from ${num.length} ingredients</p>
                    <div onclick="selectFavorite('${r.title}')" class="select-button">
                        <span>Add To Favorite</span>  
                    </div>  
                </div>
            </div>
            `;
        })
        $('#recipes').html(output);
    })
    .catch((err) => {
        console.log(err)
    })
}