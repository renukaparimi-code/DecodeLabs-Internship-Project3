let students = [];

async function loadStudents() {

    const response =
    await fetch("/api/students");

    students =
    await response.json();

    displayStudents(students);

    updateDashboard();

    createChart();
}

function displayStudents(data){

    const table =
    document.getElementById(
        "studentTable"
    );

    table.innerHTML = "";

    data.forEach(student=>{

        table.innerHTML += `
        <tr>
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.department}</td>
            <td>
                <button
                class="delete-btn"
                onclick="deleteStudent(${student.id})">
                Delete
                </button>
            </td>
        </tr>
        `;
    });
}

async function addStudent(){

    const name =
    document.getElementById("name").value;

    const roll =
    document.getElementById("roll").value;

    const department =
    document.getElementById("department").value;

    await fetch("/api/students",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify({
            name,
            roll,
            department
        })

    });

    loadStudents();
}

async function deleteStudent(id){

    await fetch(`/api/students/${id}`,{
        method:"DELETE"
    });

    loadStudents();
}

function updateDashboard(){

    document.getElementById(
        "studentCount"
    ).innerText =
    students.length;

    const depts =
    [...new Set(
        students.map(
            s=>s.department
        )
    )];

    document.getElementById(
        "deptCount"
    ).innerText =
    depts.length;
}

function searchStudent(){

    const search =
    document.getElementById(
        "search"
    ).value.toLowerCase();

    const filtered =
    students.filter(student =>
        student.name
        .toLowerCase()
        .includes(search)
    );

    displayStudents(filtered);
}

let chart;

function createChart(){

    const counts = {};

    students.forEach(student=>{

        counts[student.department] =
        (counts[student.department] || 0)
        + 1;
    });

    const ctx =
    document.getElementById(
        "deptChart"
    );

    if(chart){
        chart.destroy();
    }

    chart =
    new Chart(ctx,{

        type:"pie",

        data:{
            labels:Object.keys(counts),

            datasets:[{
                data:Object.values(counts)
            }]
        }
    });
}

loadStudents();