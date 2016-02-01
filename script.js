
var myDB = new Firebase('https://cisc479-project4.firebaseio.com/');


    myDB.on("value", function(snapshot){
      var theData = snapshot.val();
      console.log("DB - TheDATA: " + JSON.stringify(theData));
    });

var updateDB = function(post){
   //myDB.set({'posts': postList});
   //for(int i=0; i<posts.le)
   myDB.child('posts').push(post);
};

    
var postList =[];

var PREVIEWCHARLIMIT = 100;

var postLID = postList.length;

var Post = function(id, title, content, author){
    this.id = postLID;
    this.title = title;
    this.content = content;
    this.author = author;
    this.date = new Date; // figure out date function
    //maybe id number later
    
    
};

Post.prototype.toString = function(){
        return "[Title: " + this.title + "]";
    };
    
Post.prototype.getPreviewText = function(){
        return this.content.slice(0, PREVIEWCHARLIMIT);
    };
    


var newId = function(post){
    var post = new Post();
    if (postList.indexOf(post) == 0){
        post.id = 0;
    }else{
        for(var i=1; i<postList.length; i++){
            console.log("id="+post.id);
            post.id = post.id+1;
            console.log("new id="+post.id);
        }
    }
    return post.id;
}

postList.forEach(newId, Post);


//TEST OBJECTS
var postTest1 = new Post(11, "hei", "hei content", "authorananyamous");
var postTest2 = new Post(10, "hay", "hay content", "authorananyamous");
var postListTest2 = [postTest1, postTest2];
//myDB.set({'postDB': postListTest2});


//HOME PAGE
var posthead = document.querySelector('.posthead');
var postbody = document.querySelector('.postbody');//preview text


//INDIVIDUAL POST PAGE
var posttitle = document.querySelector('.posttitle');
var posttext = document.querySelector('.posttext');//full text

var container = document.querySelector('.container');



//MODEl----------------------------------------------------------------------------------------
//create post & add to postList
var addPost = function(id, title, content, author){
    var newPost = new Post(id, title, content, author);
    console.log("[New Post " + newPost.title + ", " + newPost.content + ", " + newPost.author + "]");
    console.log("PostList BEFORE: " + postList);
    //console.log("PostListTest BEFORE: " + postListTest);
    postList.push(newPost);
    //postListTest.push(newPost);
    console.log("PostList: " + postList);
    //console.log("PostListTest: " + postListTest);
    updateDB(newPost);
    container.innerHTML = '';
    postListView(postList); //causing problem?
    postLID ++;
}

//add post to array from JSON object
var loadPostFromJSON = function(object){
    if ("author" in object && "title" in object && "content" in object && "id" in object){
        addPost(object.id, object.title, object.content, object.author);
    }
    else{
        console.log("JSON object missing some Post attribute. Did not addPost for this object.");
    }
}

//load all posts to array from DB list
var loadPostsFromDB = function(){
    var DBlist = myDB.child('posts');
    console.log("loading posts from DB....");
    console.log(DBlist.length);
    for(var i=0; i < DBlist.length; i++){
        console.log("entering DBList");
        var obj = DBlist[i];
        console.log(JSON.stringify(obj));
        loadPostFromJSON(obj);
        console.log("loaded a post");
    }
    console.log("finished loading posts");
};


//delete post
var deletePost = function(i){
    postList.splice(i,1);
    //delete from database *****
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
    
   // var newTitle = document.querySelector("#inTitle").value;//
    $posttitle.appendChild(title);
    $posttextDiv.appendChild(text);
    $postdate.appendChild(date);

    document.querySelector('.container').appendChild($posttitle);
    document.querySelector('.container').appendChild($posttextDiv);
    document.querySelector('.container').appendChild($postdate);
};


// renders full* single view page including view post list button and title
var singlePostView = function(post){
    var $blogTitle = document.createElement('h1');
    $blogTitle.innerHTML="blog title*******";
    $blogTitle.classList.add('blogtitle');
    document.querySelector('.container').appendChild($blogTitle);
    
    var $switchbutton = document.createElement("button");
    $switchbutton.type ="button";
    $switchbutton.innerHTML = "switch button";
    
    $switchbutton.setAttribute("href", post.id);
    $switchbutton.addEventListener('click', function(e){ //idk if need seperate to controller
        nextpost(post.id);
        console.log(post.id);
    });
    document.querySelector('.container').appendChild($switchbutton);
    renderSinglePost(post);
    
};



//make single post preview module
var makePreview = function(post, postListContainer){
    var postDiv = document.createElement("DIV");
    postDiv.className = "post";
    var headDiv = document.createElement("DIV");
    headDiv.className = "posthead";
    var link = document.createElement("a");
    link.setAttribute("href", "#post" + post.id); //update later..
    
    postDiv.setAttribute('id', "#post" + post.id);
    console.log("POSTID " + post.id + " postLID " + postLID);
    
    var h2 = document.createElement("h2");
    var title = document.createTextNode(post.title);
    
    var bodyDiv = document.createElement("DIV");
    bodyDiv.className = "postbody";
    var para = document.createElement("P");
    
    //NOTE: this only works on instantiated Post objects, NOT JSON objects
    var text = document.createTextNode(post.getPreviewText());
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
    var postListContainer = document.createElement("div");
    postListContainer.setAttribute('id', '#postListContainer');
    container.appendChild(postListContainer);
    for(var i = 0; i<postList.length; i++){// var i = postLID
        //console.log(postListTest[i].title);
        makePreview(postList[i], postListContainer);
        console.log(postLID);
    }
};






// renders full* postlist view page including title and other elements if need
var postListView = function(postList){
    var $blogTitle = document.createElement('h1');
    $blogTitle.innerHTML="multipost blog title";
    $blogTitle.classList.add('blogtitle');
    document.querySelector('.container').appendChild($blogTitle);
    renderPostList(postList);

    
};



//toggle modal
function overlay() {
    var	el = document.querySelector(".overlay");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";
	//clear form 
	document.querySelector("#inTitle").value = "";
    document.querySelector("#inText").value= "";
}

//CONTROLLER --------------------------------------------------------------------------------

var homepage = function(postList){
    container.innerHTML = '';
    console.log(postList);
    postListView(postList);
};




// location routing with hash
var handleHash = function(){
        var postId = location.hash.substring(5);
        if (postId.length >=1){
          specificPage(postId);
          console.log("specific page plea");
        } else {
          homepage(postList);
          console.log("hom");
        }
        console.log(postId);
};

window.addEventListener("hashchange", handleHash);
window.addEventListener("load", handleHash);

var loadSinglePost = function(id){
          var thePost = {};
          postList.forEach(function(post){
            if (post.id == id){
              thePost = post;
            }
});
        
        container.innerHTML = '';
        singlePostView(thePost);

};


 var specificPage = function(id){
         loadSinglePost(id);
       };
       


var nextpost = function(postIndex){
    
            postIndex = (postIndex + 1) % postList.length;
            
            document.location = "#post" + postIndex;
          //loadSinglePost(postList[postIndex].id);
          //postIndex = (postIndex + 1) % postList.length;
          
       };
       






//save new post input from modal
var savePost = function(){
  console.log("save post called");
    var newTitle = document.querySelector("#inTitle").value;
    var newText = document.querySelector("#inText").value;
    var newAuthor = "Shakespeare";
    
    if (newText.length > 0 && newTitle.length >0){
     addPost(newId(), newTitle, newText, newAuthor); //newId()
     console.log("title: " + newTitle);
     console.log("called addPost!");
    }else{
        return 0;
    }
     //add date and author later
     //assign specific link to post
     
    
};


//Create Post Button (get post input --> call create/add post in MODEL)
document.querySelector("#modalsave").addEventListener('click', savePost);
document.querySelector("#modalsave").addEventListener('click', overlay);

//Close Modal Button
//document.querySelector("#modalclose").addEventListener('click',overlay);
//Open Modal Button
document.querySelector('#addPost').addEventListener('click', overlay);



// -------- calls

//renderPostList(postList);
//renderSinglePost(postTest);
loadPostsFromDB();
//loadPostFromJSON({"author":"me", "content": "this is added on each refresh", "id":0,"title":"default post"});






