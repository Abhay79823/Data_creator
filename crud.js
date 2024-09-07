window.onload = function(){
    var addStudents = document.getElementById("add-students");

    addStudents.onclick = function(e){
        e.preventDefault();
        Swal.fire({
            title: "Student Form",
            showConfirmButton: false,
            html:`
                 <form id=student-form>
                    <label>Student Name</label>
                    <input id="student-name" type="text" value="swer"/>
                    <label>Roll No.</label>
                    <input id="student-roll" type="text" value="34"/>
                    <label>Class</label>
                    <input id="student-class" type="text" value="7"/>
                    <label>Email Id</label>
                    <input id="student-email" type="email" value="abc123@gmail.com"/>
                   
                    <button type="submit" id="submit-form">
                    Submit
                 </button>
                 </form>
                 
                 `
          })
         
          var submitForm = document.getElementById("submit-form");
          submitForm.onclick = function(e){
             e.preventDefault();
             var studentName = document.getElementById("student-name").value;
          var studentRoll = document.getElementById("student-roll").value;
          var studentClass = document.getElementById("student-class").value;
          var studentEmail = document.getElementById("student-email").value;

          var students ={
            name :studentName,
            roll : studentRoll,
            class: studentClass,
            email : studentEmail
          }
          
          var data =localStorage.getItem("student");
          if(data == null){ 

            localStorage.setItem("student", JSON.stringify([students]));

            Swal.fire({
                icon:'success',
                title:'Data Added'
             }).then(function(){
                window.location = location.href;
            })

          }
          else{
             var oldData = JSON.parse(data);
              
             var existingUserWithEmail = oldData.find(user => user.email === students.email);
             if (existingUserWithEmail) {
               Swal.fire({
                 icon: 'error',
                 title: 'Data Already Exists',
                 text: 'The data for this email already exists.'
               });
               return;
             }

     // Check if a user with the same class and roll already exists
             var existingUserWithClassAndRoll = oldData.find(user => user.class === students.class && user.roll === students.roll);
             if (existingUserWithClassAndRoll) {
               Swal.fire({
                 icon: 'error',
                 title: 'Data Already Exists',
                 text: 'The data for this class and roll already exists.'
               });
               return;
             }
             oldData.push(students);
             var allData = JSON.stringify(oldData);
             localStorage.setItem("student" , allData);

             Swal.fire({
                icon:'success',
                title:'Data Added'
             }).then(function(){
                 window.location = location.href;
             })
          }
        }
    }
    var data1 =localStorage.getItem("student");
    if(data1 != null){
              
        var original= JSON.parse(data1);
        for(var i=0; i<original.length; i++)
        {
            
            
            var tr= document.createElement("tr");

            var SnoTd = document.createElement("td");
            tr.append(SnoTd);
            SnoTd.innerHTML = (i+1);

            var nameTd = document.createElement("td");
            nameTd.innerHTML = (original[i].name);
            var rollTd = document.createElement("td");
            rollTd.innerHTML =original[i].roll;
            var classTd = document.createElement("td");
            classTd.innerHTML =original[i].class;
            var emailTd = document.createElement("td");
            emailTd.innerHTML = original[i].email;
            var actionTd =document.createElement("td");
            var editBtn =document .createElement("button");
            var deleteBtn =document .createElement("button");

            
            tr.append(nameTd);
            tr.append(rollTd);
            tr.append(classTd);
            tr.append(emailTd);
            tr.append(actionTd);

            actionTd.append(editBtn);
            actionTd.append(deleteBtn);

            editBtn.innerHTML ="<i class='ri-file-edit-fill'></i>";
            editBtn.className= "edit-button";
            editBtn.setAttribute("row-index", i);

            deleteBtn.innerHTML ="<i class='ri-delete-bin-7-line'></i>"
            deleteBtn.className ="delete-button"

            var studentTable =document.getElementById("student-table");
            studentTable.append(tr);

         

            deleteBtn.onclick =function(){
               var index = this.id;
               original.splice(index,1);

               localStorage.setItem("student",JSON.stringify(original));
               window.location=location.href;
               
            }

            editBtn.onclick =function(){
               
               var index = this.getAttribute("row-index");
               var editableStudent =original[index];

               Swal.fire({
                  title: "Update Form",
                  showConfirmButton: false,
                  html:`
                       <form id=student-form>
                          <label>Student Name</label>
                          <input value="${editableStudent.name}" id="student-name" type="text"/>
                          <label>Roll No.</label>
                          <input value=${editableStudent.roll} id="student-roll" type="text"/>
                          <label>Class</label>
                          <input value=${editableStudent.class} id="student-class" type="text"/>
                          <label>Email Id</label>
                          <input value=${editableStudent.email} id="student-email" type="email" />
      
                          <button type="submit" id="update-form">
                          Update
                       </button>
                       </form>
                       
                       `
                })

                //save edited data
                var form = document.getElementById("student-form");
                form.onsubmit = function(e){
                  e.preventDefault();
                  
                  var studentName = document.getElementById("student-name").value;
                  var studentRoll = document.getElementById("student-roll").value;
                  var studentClass = document.getElementById("student-class").value;
                  var studentEmail = document.getElementById("student-email").value;

                  var newStudent ={
                     name :studentName,
                     roll : studentRoll,
                     class: studentClass,
                     email : studentEmail
                   } 

                   original[index]= newStudent;

                   localStorage.setItem("student",JSON.stringify(original));
                    
                   Swal.fire({
                     icon:'success',
                     title:'Data Updated'
                  }).then(function(){
                      window.location = location.href;
                  })

                  }
                }
            }
            
    }

    //Print the data

    var printBtn =document.getElementById("print-btn");
    
    printBtn.onclick = function(){
      window.print();
    }

}

    
