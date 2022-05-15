const form=document.getElementById("form");
const input=document.getElementById("input");
const ul=document.getElementById("ul");
const tasks=JSON.parse(localStorage.getItem("tasks"));
if(tasks){
    tasks.forEach(task=>{
        add(task);
    });
}

form.addEventListener("submit",function (event){
    event.preventDefault();
    //console.log(input.value);
    add()
});

function add(task){
    let taskText = input.value;
    if(task){
      taskText =task.text;  
    }
    
    if(taskText){
        const li=document.createElement("li");
        li.innerText= taskText;
        li.classList.add("list-group-item");
        if(task && task.completed){
            li.classList.add("text-decoration-line-through");
        }

        li.addEventListener("contextmenu",function(event){
            event.preventDefault();
            li.remove();
            saveData();
        });

        li.addEventListener("click",function(){
            li.classList.toggle("text-decoration-line-through");
            saveData();
        });
        ul.appendChild(li);
        input.value="";
        saveData();
    }
}


function saveData(){
    const lists=document.querySelectorAll("li");
   let tasks=[];
    lists.forEach(list => {
    let task={
        text: list.innerText,
        completed: list.classList.contains("text-decoration-line-through")
    }


      tasks.push(task);
    });

    localStorage.setItem("tasks",JSON.stringify(tasks));
}



