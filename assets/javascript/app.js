var config = {
    // Initialize Firebase
    apiKey: "AIzaSyDb7poLCVH9HCHKCYwQIiGz-lCwda5rn8s",
    authDomain: "shopsmartfinal.firebaseapp.com",
    databaseURL: "https://shopsmartfinal.firebaseio.com",
    projectId: "shopsmartfinal",
    storageBucket: "shopsmartfinal.appspot.com",
    messagingSenderId: "673627430003"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

// Initial Values
var name = "";

// Capture Button Click
$("#add-user").on("click", function (event)
{
    event.preventDefault();

    name = $("#name-input").val().trim();


    // Code for the push
    dataRef.ref().push({
        name: name,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});

// Firebase watcher + initial loader HINT: This code behaves similarly to .on("value")
dataRef.ref().on("child_added", function (childSnapshot)
{

    // Log everything that's coming out of snapshot
    console.log(childSnapshot.val().name);


    // full list of items to the well
    $("#full-member-list").append("<div class='well'><span class='member-name'> " + childSnapshot.val().name);

    // Handle the errors
}, function (errorObject)
    {
        console.log("Errors handled: " + errorObject.code);
    });

dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot)
{
    // Change the HTML to reflect
    $("#name-display").text(snapshot.val().name);

});


///////////////////////////////////////////AARON WORKING SECTION////////////////////////////////////////////////////

var SendWalmartParams = function (searchTerm, numItems, categoryId)
{
    console.log(searchTerm);
    console.log(numItems);
    console.log(categoryId);
    if (searchTerm === undefined)
    {
        console.log("Error, No Search Term Used")
    }
    else
    {
        var base = {
            'apiKey': 'c6esnayv43u5sguw64sac6cz',
            'format': 'json',
            'responseGroup': 'full',
            'query': searchTerm
        }
    }

    if (numItems)
    {
        console.log("ITEM LIMIT")
        var ItemLimit =
            {
                'numItems': numItems
            }
        Object.assign(base, ItemLimit)
        console.log("Add ItemLimit" + base);
    }

    if (categoryId)
    {
        var Category = {
            'categoryId': categoryId
        }
        Object.assign(base, Category)
        console.log("CATEGORY")
    }

    console.log("PARAMSEND" + JSON.stringify(base))
    GetWalmartProduct(base)
}

var GetWalmartProduct = function (queryParams)
{
    console.log("GETWLAMARTPROD" + JSON.stringify(queryParams))
    var url = "http://api.walmartlabs.com/v1/search";
    url += '?' + $.param(queryParams);

    console.log(url)
    $.ajax({
        url: url,
        method: 'GET',
        dataType: 'jsonp'
    }).done(function (result)
    {
        var Item = result.items
        for (var i = 0; i < Item.length; i++)
        {
            console.log(result);
            console.log(Item[i].name);
            console.log(Item[i].salePrice);
            console.log(Item[i].upc);
            console.log(Item[i].largeImage);
            console.log(Item[i].productUrl);

            DrawProductCard(Item[i].name, Item[i].salePrice, Item[i].upc, Item[i].largeImage, Item[i].productUrl)
        }


    }).fail(function (err)
    {
        throw err;
    });
}
SendWalmartParams("Ipod", 2);

//If we want to do category search we need to defione the categories
//And then I can use the API to designate category id with in 
// the search criteria

///Return OBJ Values
/*
Card Info on landing
name
salePrice
shortDescription
customerRating


brandName
name
color
customerRating
customerRatingImage
itemId
modelNumber
largeImage - mediumImage - thumbnailImage
longDescription - shortDescription
productUrl
msrp
salePrice
stock
upc
categoryNode
categoryPath
*/


var DrawProductCard = function (name, price, upc, imageSrc, siteLink)
{
    var divCol = $("<div class='col-md-3 product-grid'>");
    var divImage = $("<div class='image'>");

    var alink = $("<a>");
    alink.attr("href", "#");

    var img = $("<img class='w-100 cardimage'>");
    img.attr("src", imageSrc);

    var divOverlay = $("<div class='overlay'>");

    var divDetails = $("<div class='detail'>");
    divDetails.text("View Details")

    divOverlay.append(divDetails);
    alink.append(img);
    alink.append(divOverlay);
    divImage.append(alink);
    divCol.append(divImage);

    var h5Title = $("<h5 class='text-center'>")
    h5Title.text(name);
    divCol.append(h5Title);

    var star1 = $("<span class='fa fa-star'>");
    divCol.append(star1);
    var star2 = $("<span class='fa fa-star'>");
    divCol.append(star2);
    var star3 = $("<span class='fa fa-star'>");
    divCol.append(star3);
    var star4 = $("<span class='fa fa-star'>");
    divCol.append(star4);
    var star5 = $("<span class='fa fa-star'>");
    divCol.append(star5);

    var h5Price = $("<h5 class='text-center'>");
    h5Price.text("Price: $" + price);
    divCol.append(h5Price);

    var aSiteLink = $("<a class='btn buy'>");
    aSiteLink.attr("href", siteLink);
    aSiteLink.text("BUY");
    divCol.append(aSiteLink);

    $(".hot").append(divCol);



}


///////////////////////////////////////////AARON WORKING SECTION////////////////////////////////////////////////////



