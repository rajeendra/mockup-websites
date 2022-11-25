$(document).ready(function () {

    returnID = "";

    $("#demo-seal").show();
    //$("#pLinkId").attr("href","#project");

    addCheckboxesToSearchbar();
    listProjectsByTags(['ALL']);

    $(".fa-bars").click(function (event) {
      closeProjectDetailSidebar();
    });    

    $(".nav-link").click(function (event) {
      closeProjectDetailSidebar();
    });   
    
    $(".navbar-brand").click(function () {
      closeProjectDetailSidebar();
    });     

    $(".card").click(function (event) {
      if(isCloseProjectSearchbar()){
        showProjectDetail(this.id);
      }
    });  

    $("#top-left-navigator").click(function () {
      showProjects();        
    });
    
    $(".sidebar").click(function () {
      closeProjectDetailSidebar();
    });      

    $(".sidebar-item").click(function () {
      closeProjectDetailSidebar();
    });  

    $(".sidebar-open-btn").click(function () {
      openProjectDetailSidebar();
    }); 

    $("#projectDetailSidebarmarker").click(function () {
      if(this.style.left=="0px" || this.style.left==0){
        openProjectDetailSidebar();
      }else{
        closeProjectDetailSidebar();
      }
    });    
    
    $("#projectSearchbarmarker").click(function () {
      if(this.style.left=="0px" || this.style.left==0){
        openProjectSearchbar();
        $(window).scrollTop($('#project').offset().top); 
      }else{
        closeProjectSearchbar();
      }
    });  
    
    $("#projectSearchBtn").click(function () {
      closeProjectSearchbar();
      allNotChecked = true;
      $(".search-checkbox").each(function() {
        if (this.checked==true){
          allNotChecked = false; 
          return; 
        }
      });

      if(!allNotChecked){
        tags='';
        $(".search-checkbox").each(function() {
          if (this.checked==true){
            if(tags==''){
              tags = $(this).val();
            }else{
              tags = tags + ',' + $(this).val();
            }
          }
        });

        var tagArr = tags.split(',');
        listProjectsByTags(tagArr);
      }

    });   
    
    $(".search-checkbox").click(function () {
      //alert(this.checked);
      //alert($(this).val());
    }); 
    
    function showProjectDetail(projectID){
      addProjectToLayout(projectID);  
      $("#contact").hide();
      $("#project").hide();
      $("#project-detail").show();
      $("#top-left-navigator").css("visibility", "visible");

      returnID = projectID;
      $("#pLinkId").attr("href","#project-detail");  
      $(window).scrollTop($('#project-detail').offset().top); 
      $("#contact").show();       
    }     

    function showProjects(){
      closeProjectDetailSidebar(); 
      $("#contact").hide();
      $("#project-detail").hide();
      $("#top-left-navigator").css("visibility", "hidden");
      
      $("#pLinkId").attr("href","#project");  
      $("#project").show();
      $("#contact").show(); 
      //$(window).scrollTop($('#project').offset().top);            
      $(window).scrollTop($('#'+returnID).offset().top);
    } 

    function listProjectsByTags(searchTags){

      $("#projectCards").empty();

      c = 1;
      html = '';
    
      for (i=0; i<projects.length; i++){
        project = projects[i];
        tagArray = project.tag.split(',');

        isTag = false;
        for (j=0; j<tagArray.length; j++){
          for (k=0; k<searchTags.length; k++){
            if(String(tagArray[j]).trim()==String(searchTags[k]).trim()){
              isTag = true;  
            }
          }
        }

        if (isTag){
          if(c==1){
            html = html + '<div class="card-group" >';
          }

          // c-1,2,3
          html = html + 
            '<div class="card" id="'+ project.id +'">'+
                '<img class="card-img-top" src="' + project.image + '"></img>'+
                '<div class="card-body">'+
                    '<a href="#0" > <h5 class="card-title">' + project.title + '</h5></a>'+
                    '<p class="card-text">' + project.text1 + '</p>'+
                    '<p class="card-text"><small class="text-muted">' + project.text2 + '</small></p>'+
                '</div>'+
            '</div>';  

          if(c==3){
            c=0; 
            html = html + '</div>';                   
          }

          c++; // 1->2, 2->3, 0->1 

        } // End -  is tag
        
      } // End - proects
      if(c==2){
        html = html + 
          '   <div class="card"></div> '+          
          '   <div class="card"></div> '+          
          '</div>'                     
      }
      if(c==3){
        html = html + 
          '   <div class="card"></div> '+          
          '</div>'                    
      }

      $("#projectCards").append(
        html
      );   
 
      // Each time after load cards you should run this 
      $(".card").click(function (event) {
        if(isCloseProjectSearchbar()){
          showProjectDetail(this.id);
        }
      });        
    }    

    function addProjectToLayout(id){
      project = getProjectByID(id);

      if (project.layout=="L1"){
        addProjectToLayoutL1(project);  
      }
    }

    function addProjectToLayoutL1(project){

    components = project.components;

    /*
    {
      "sn": 5,
      "section": "R",
      "cat": "PO",
      "image": "image/cb3.jpeg", 
      "text": ""
    }                
    */

    $("#LCards").empty();
    $("#RCards").empty();    

    $(".project-detail-heading").html(project.title);

    for (i=0; i<components.length; i++){
      component = components[i];
      if(component.section=='L'){
        if(component.cat=='PWT'){
          //Picture with text  
          $("#LCards").append(
            '<div class="card">'+
                '<p></p>'+
                '<img class="card-img-top" src="' + component.image + '">'+
                '<p class="card-text">' + component.text + '</p>'+
            '</div>'                   
          );                      
        }
        else if(component.cat=='TO'){
          //Text only
          $("#LCards").append(
            '<div class="card">'+
                '<p></p>'+
                '<p class="card-text">' + component.text + '</p>'+
            '</div>'                   
          );   
        }
        else if(component.cat=='PO'){
          //Picture only  
          $("#LCards").append(
            '<div class="card">'+
                '<p></p>'+
                '<img class="card-img-top" src="' + component.image + '">'+
            '</div>'                   
          ); 
        }
      }
      else if(component.section=='R'){
        if(component.cat='PWT'){
          //Picture with text 
          $("#RCards").append(
            '<div class="card">'+
                '<p></p>'+
                '<img class="card-img-top" src="' + component.image + '">'+
                '<p class="card-text">' + component.text + '</p>'+
            '</div>'                   
          );                      
        }
        else if(component.cat=='TO'){
          //Text only 
          $("#RCards").append(
            '<div class="card">'+
                '<p></p>'+
                '<p class="card-text">' + component.text + '</p>'+
            '</div>'                   
          );   
        }
        else if(component.cat=='PO'){
          //Picture only 
          $("#RCards").append(
            '<div class="card">'+
                '<p></p>'+
                '<img class="card-img-top" src="' + component.image + '">'+
            '</div>'                   
          ); 
        }                    
      }
    }

    }   

    function getProjectByID(id){
      result = null;
      for (i=0; i<projects.length; i++){
        project = projects[i]
        if(project.id==id){
          result = project;
          break;  
        }
      }
      return result; 
    }             

    function openProjectDetailSidebar() {
      document.getElementById("projectDetailSidebar").style.width = "250px";
      document.getElementById("projectDetailSidebarmarker").style.left = "250px";
    }

    function closeProjectDetailSidebar() {
      document.getElementById("projectDetailSidebar").style.width = "0";
      document.getElementById("projectDetailSidebarmarker").style.left = "0";
    }

    function openProjectSearchbar() {
      document.getElementById("projectSearchbar").style.width = "250px";
      document.getElementById("projectSearchbarmarker").style.left = "250px";
    }

    function closeProjectSearchbar() {
      document.getElementById("projectSearchbar").style.width = "0";
      document.getElementById("projectSearchbarmarker").style.left = "0";
    }

    function isCloseProjectSearchbar(){
      close = true;
      len = document.getElementById("projectSearchbar").style.width;
      if(len=="250px"){
        close = false;
      }
      return close;

    }

    function addCheckboxesToSearchbar(){
      $("#checkboxes").empty();

      html = '';
    
      for (i=0; i<projectCats.length; i++){
        searchOption = projectCats[i];
        html = html +
            '<div class="input-group mb-3">'+
            '<div class="input-group-prepend">'+
                '<input class="search-checkbox" type="checkbox" value="'+ searchOption.cat +'">'+
                    '<span style="color: gray;">' + searchOption.desc + '</span>'+ 
                '</input>'+
            '</div>'+
            '</div>';  
      }

      $("#checkboxes").append(
        html
      );       
      
      
    }


});
