
var postList =[];



var postListTest = [{id: 2, title: 'TITLE1', content: 'CONENT1'}, {id: 3, title: 'TITLE2', content: 'CONENT2'}];

var postTest = {id: 1, title: "testtitle", content: 'testcontent', date: new Date()};


var Post = function(id, title, content, author){
    this.id = id;
    this.title = title;
    this.content = content;
    this.author = author;
    this.date = new Date; // figure out date function
    //maybe id number later
    
    function toString(){
        return this.title;
    }
};


//HOME PAGE
var posthead = document.querySelector('.posthead');
var postbody = document.querySelector('.postbody');//preview text


//INDIVIDUAL POST PAGE
var posttitle = document.querySelector('.posttitle');
var posttext = document.querySelector('.posttext');//full text

var postListContainer = document.querySelector('.container');

//MODEl----------------------------------------------------------------------------------------
//create post & add to postList
var addPost = function(id, title, content, author){
    var newPost = new Post(id, title, content, author);
    console.log("New Post " + newPost.title + newPost.content + newPost.author);
    console.log("PostList BEFORE: " + postList);
    //console.log("PostListTest BEFORE: " + postListTest);
    postList.push(newPost);
    //postListTest.push(newPost);
    console.log("PostList: " + postList);
    //console.log("PostListTest: " + postListTest);
    renderPostList(postList);
}



//delete post
var deletePost = function(i){
    postList.splice(i,1);
}

//edit post ?


//VIEW-----------------------------------------------------------------------------------------

//render single post preview
var renderSinglePost = function(post){
    var $posttitle = document.createElement("H1");
    $posttitle.className = "posttitle";
    var $posttextDiv = document.createElement("DIV");
    $posttextDiv.className = "posttext";
    var $postdate = document.createElement("P");
    $postdate.className = "postdate";
    var title = document.createTextNode(post.title);
    var text = document.createTextNode(post.content);
    var date = document.createTextNode(post.date);
    $posttitle.appendChild(title);
    $posttextDiv.appendChild(text);
    $postdate.appendChild(date);
    
    //document.querySelector('#fullpost').appendChild($posttitle);
    //document.querySelector('#fullpost').appendChild($posttextDiv);
    //document.querySelector('#fullpost').appendChild($postdate);
    
    
    document.querySelector('.container').appendChild($posttitle);
    document.querySelector('.container').appendChild($posttextDiv);
    document.querySelector('.container').appendChild($postdate);
    
}


// renders full* single view page including view post list button and title
var singlePageView = function(post){
    var $blogTitle = document.createElement('h1');
    $blogTitle.innerHTML="blog title*"
    $blogTitle.classList.add('blogtitle');
    document.querySelector('.container').appendChild($blogTitle);
    
    var $switchbutton = document.createElement("button");
    $switchbutton.type ="button";
    $switchbutton.innerHTML = "switch button";
    $switchbutton.addEventListener('click', function(e){
        console.log("oh");
        switchpage("#somethinglater");
    });
    document.querySelector('.container').appendChild($switchbutton);
    renderSinglePost(post);
    
}



//make post preview module
var makePreview = function(post){
    var postDiv = document.createElement("DIV");
    postDiv.className = "post";
    var headDiv = document.createElement("DIV");
    headDiv.className = "posthead";
    var link = document.createElement("a");
    link.setAttribute("href", "#"); //update later..
    var h2 = document.createElement("h2");
    var title = document.createTextNode(post.title);
    
    var bodyDiv = document.createElement("DIV");
    bodyDiv.className = "postbody";
    var para = document.createElement("P");
    var text = document.createTextNode(post.content);
    //body
    para.appendChild(text);
    bodyDiv.appendChild(para);
    //head 
    h2.appendChild(title);
    link.appendChild(h2);
    headDiv.appendChild(link);
    //post container
    postDiv.appendChild(headDiv);
    postDiv.appendChild(bodyDiv);
    postListContainer.appendChild(postDiv);
};


//render post list
var renderPostList = function(postList){
    for(var i = 0; i<postList.length; i++){
        //console.log(postListTest[i].title);
        makePreview(postList[i]);
    }
};


// renders full* postlist view page including title and other elements if need
var postListView = function(postList){
    
    var $blogTitle = document.createElement('h1');
    $blogTitle.innerHTML="multipost blog title"
    $blogTitle.classList.add('blogtitle');
    document.querySelector('.container').appendChild($blogTitle);
    renderPostList(postList);
    
}



//toggle modal
function overlay() {
    var	el = document.querySelector(".overlay");
    //should call a clear form function here
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
}

//CONTROLLER --------------------------------------------------------------------------------

//save new post input from modal
var savePost = function(){
  console.log("save post called");
    var newTitle = document.querySelector("#inTitle").value;
    var newText = document.querySelector("#inText").value;
     //addPost.title = newTitle.value;
     //addPost.content = newText.value;
    var newAuthor = "Shakespeare";
    var newId = "filler"
    console.log("title: " + newTitle);
     addPost(newId, newTitle, newText, newAuthor);
     console.log("called addPost!");
     //add date and author later
};


//Create Post Button (get post input --> call create/add post in MODEL)
document.querySelector("#modalsave").addEventListener('click', savePost);
document.querySelector("#modalsave").addEventListener('click', overlay);

//Close Modal Button
document.querySelector("#modalclose").addEventListener('click',overlay);
//Open Modal Button
document.querySelector('#addPost').addEventListener('click', overlay);



// -------- calls

//renderPostList(postList);
//renderSinglePost(postTest);

//idk
/*
var switchpage2 = function(id){
  var oldbody = document.body.innerHTML;
  document.body.innerHTML = "";
    var $fullpost = document.querySelector("#fullpost");
    var $container = document.createElement("div");

  $fullpost.appendChild($container);
}
*/



// --- new attempt
var $container = document.querySelector(".container");
$container.innerHTML = "";

var switchpage = function(id){ // figure out if want switch by name or id
    $container.innerHTML = '';
    postListView(postListTest);
    
    
}


//singlePageView(postTest);

